/* global tStrings tSettings Cart */
import '~/config';
import dynamic from 'next/dynamic';
const tSettings = global.config.tSettings;
const tStrings = global.config.tStrings;

// import StorefrontApi from '~/modules/storefront-api';

import {
	queryApplyCode, queryChangeQuantity,
} from '~/modules/query';

// import {
// 	daysToTime, getLSWithExpiry, setLSWithExpiry, getId, removeLS, getCartId, formatMoney,
// } from '~/modules/utils';
const {
	daysToTime, getLSWithExpiry, setLSWithExpiry, getId, removeLS, getCartId, formatMoney,
} = dynamic(() => import('~/modules/utils'), {
    ssr: false,
});
const StorefrontApi = dynamic(() => import('~/modules/storefront-api'), {
    ssr: false,
});

export default class Discounts {
	constructor() {
		this.sfApi = new StorefrontApi();
	}

	/*
        asyncronous apply discount code to storefront api
    */
	async applyDiscountCode(code, cartId) {
		if (code) {
			const priceRule = await this.getPriceRule(code, cartId);
			if (priceRule && code.toLowerCase() === tSettings.customDiscountCode.code.toLowerCase()) {
				const discountData = await this.handlerCustomDiscountCode(code, cartId, priceRule);
				return discountData;
			} if (priceRule && this.isBogoDiscount(priceRule)) {
				const discountData = await this.handlerDiscountBogo(code, cartId, priceRule);
				return discountData;
			}
		}

		const data = await this.processQueryDiscount(code, cartId);
		return data;
	}

	/* check if discount bogo type */
	isBogoDiscount(priceRule) {
		return priceRule.prerequisite_product_ids.length > 0 || priceRule.prerequisite_variant_ids.length > 0;
	}

	/*
	get price rule from cookie when its exist or request to backend to get price rule of code
	*/
	async getPriceRule(code, cartId) {
		return new Promise((resolve) => {
			const priceRuleCookie = getLSWithExpiry('priceRule') && JSON.parse(getLSWithExpiry('priceRule'));
			if (priceRuleCookie && priceRuleCookie.title.toLowerCase() === code.toLowerCase()) {
				resolve(priceRuleCookie);
			} else if (code) {
				this.sfApi.getPriceRule(code, cartId).then((resp) => {
					if (resp.data.data.price_rule) {
						setLSWithExpiry('priceRule', JSON.stringify(resp.data.data.price_rule), daysToTime(14));
						resolve(resp.data.data.price_rule);
					} else {
						removeLS('priceRule');
						resolve(undefined);
					}
				});
			}
		});
	}

	getPriceRuleData() {
		if (getLSWithExpiry('priceRule')) {
			return JSON.parse(getLSWithExpiry('priceRule'));
		}
		return {};
	}

	/*
        post query storefront APi cartDiscountUpdate
        save result to the cookie storage
    */
	async processQueryDiscount(code, cartId, saveCart = true) {
		const queryData = {
			query: queryApplyCode,
			variables: {
				cartId,
				discountCodes: code,
			},
		};

		const req = await this.sfApi.request(queryData);
		const { errors } = req;

		if (!errors) {
			const { data: { data: { cartDiscountCodesUpdate } } } = req;
			if (cartDiscountCodesUpdate && cartDiscountCodesUpdate.cart) {
				if (saveCart) {
					this.sfApi.saveDataLocalStorage(cartDiscountCodesUpdate.cart);
				}
				return cartDiscountCodesUpdate.cart;
			}

			if (cartDiscountCodesUpdate && cartDiscountCodesUpdate.userErrors) {
				return cartDiscountCodesUpdate.userErrors;
			}
		}
		return errors;
	}

	/*
        post query storefront APi to remove discount code
    */
	async removeDiscountCode(cart, cartId, checkApplied = true) {
		const { discountCodes } = cart;
		if (discountCodes) {
			const data = await this.applyDiscountCode('', cartId);
			removeLS('priceRule');
			if (checkApplied) {
				this.checkAppliedDiscounts();
			}
			return data;
		}
		return false;
	}

	/*
        get discount data from cart object discountCodes
    */
	getDiscountData(cart) {
		const { discountCodes, discountAllocations } = cart;

		const automaticDiscount = discountAllocations.find((alloc) => alloc.__typename === 'CartAutomaticDiscountAllocation');
		const { 0: discountCode } = discountCodes;

		const discountData = {
			isValid: false,
			isAuto: !!automaticDiscount,
			code: null,
			error: '',
		};
		if (discountCode) {
			discountData.code = discountCode.code;
			discountData.isValid = discountCode.applicable;
			discountData.error = !discountCode.applicable && discountCode.code ? tStrings.discount_error : '';
			discountData.amount = cart.discountLine;
			const priceRule = this.getPriceRuleData();
			discountData.isBogo = false;
			if (priceRule && priceRule.id && this.isBogoDiscount(priceRule)) {
				discountData.isBogo = true;
			}
			if (discountCode.code && window.customerEmail === '' && tSettings.logged_in_customer_code_valid.indexOf(discountCode.code.toLowerCase()) >= 0) {
				discountData.error = tSettings.logged_in_customer_code_error;
				discountData.isValid = false;
				discountData.amount = null;
			} else if (!discountCode.applicable && discountCode.code && priceRule
				&& priceRule.customer_segment_prerequisite_ids
				&& priceRule.customer_segment_prerequisite_ids.length > 0
				&& priceRule.prerequisite_subtotal_range
				&& priceRule.prerequisite_subtotal_range.greater_than_or_equal_to) {
				discountData.error = tSettings.discode_eligible_items_only_min_spend_error.replace('$minSpend', formatMoney(parseInt(priceRule.prerequisite_subtotal_range.greater_than_or_equal_to, 10) * 100));
			}
		}

		const customCodes = tSettings.custom_codes_code.toUpperCase();
		if (!discountData.isValid && discountData.code
            && discountData.code.toUpperCase() === customCodes && tSettings.enable_custom_codes) {
			discountData.error = tSettings.custom_error_codes_msg;
		}

		return discountData;
	}

	/*
        check applied discount Bogo, will auto add gwp or remove gwp item
        invalid will auto remove gwp item
    */

	async checkAppliedDiscounts() {
		const cart = Cart.cartModel(await Cart.getCartAPi());
		return new Promise((resolve) => {
			const { discountCodes, discountData } = cart;
			const { 0: discountCode } = discountCodes;

			const gwpDiscountItems = cart.items.filter((item) => item.attributes.find((attr) => attr.key === '_campaign_type' && attr.value === 'discount_code'));
			const discountedItemCustomCode = cart.items.filter((item) => item.attributes.find((attr) => attr.key === '_campaign_type' && attr.value === 'custom_code'));

			const captureResult = (() => {
				Cart.getCart().then((crt) => {
					if (crt.discountData.isValid) {
						this.applyDiscountCode(crt.discountData.code, crt.id).then((result) => resolve(Cart.cartModel(result)));
					} else {
						this.applyDiscountCode('', crt.id).then((result) => resolve(Cart.cartModel(result)));
					}
				});
			});

			if (discountCode) {
				// variable discount code applied (all types) on the cart bug applicable status is false
				const discountAppliedIsntApplicable = discountCode && !discountCode.applicable && gwpDiscountItems.length;
				if (discountAppliedIsntApplicable) {
					this.clearGwpDiscountItems(gwpDiscountItems, captureResult);
				} else if (discountCode.code.toLowerCase() === tSettings.customDiscountCode.code.toLowerCase()) {
					this.getPriceRule(discountCode.code, getCartId()).then((priceRule) => {
						if (priceRule && this.isCustomCodeValid(cart, priceRule)) {
							cart.discountData.isValid = true;
							resolve(cart);
						} else {
							resolve(cart);
						}
					});
				} else if (discountedItemCustomCode.length) {
					this.clearDiscountedCustomCode(discountedItemCustomCode).then((crt) => resolve(crt));
				} else if (discountCode && discountCode.applicable && gwpDiscountItems.length && !discountData.isBogo) {
					this.clearGwpDiscountItems(gwpDiscountItems, captureResult);
				} else {
					resolve(cart);
				}
			} else if (gwpDiscountItems.length && !discountCode) {
				this.clearGwpDiscountItems(gwpDiscountItems, captureResult);
			} else if (discountedItemCustomCode.length && !discountCode) {
				this.clearDiscountedCustomCode(discountedItemCustomCode).then((crt) => resolve(crt));
			} else {
				resolve(cart);
			}

			if (!cart.items.length) {
				this.removeDiscountCode(cart, cart.id, false);
			}
		});
	}

	/*
		clear discounted price for custom discount code which discount created from shopify script
	*/
	async clearDiscountedCustomCode(discountedItemCustomCode) {
		return new Promise((resolve) => {
			discountedItemCustomCode.forEach(async (item, index) => {
				const lines = [{
					id: item.id,
					quantity: item.quantity,
					attributes: [],
				}];

				const queryData = {
					query: queryChangeQuantity, variables: { cartId: getCartId(), lines },
				};

				await this.sfApi.requestGraphql('cartLinesUpdate', queryData, false);
				if (index === discountedItemCustomCode.length - 1) { Cart.getCart().then((newCart) => resolve(newCart)); }
			});
		});
	}

	/*
		clear gwp items from discount code when discount code isn't valid or removed
	*/
	clearGwpDiscountItems(gwpDiscountItems, callback) {
		gwpDiscountItems.forEach((item) => {
			this.sfApi.queueProcess({
				funct: 'removeItem',
				args: { id: item.id, directRefresh: false },
				callback,
			});
		});
	}

	/*
	check if custom discount code is valid to apply
	*/
	isCustomCodeValid(cart, priceRule) {
		// eslint-disable-next-line max-len
		const discountedItems = cart.items.filter((item) => priceRule.entitled_variant_ids.includes(parseInt(getId(item.merchandise.id), 10)));
		const minSpend = parseFloat(tSettings.customDiscountCode.minSpend) * 100;
		return discountedItems.length && minSpend < cart.totalBeforeShipping;
	}

	/*
		handle apply discount custom min spend, which discount will setup by shopify script and discount code just as trigger to get a discount
	*/
	handlerCustomDiscountCode(code, cartId, priceRule) {
		const entitledItems = priceRule.entitled_variant_ids;
		return new Promise((resolve) => {
			Cart.getCart().then(async (resp) => {
				const cart = Cart.cartModel(resp);
				// eslint-disable-next-line max-len
				const discountedItems = cart.items.filter((item) => entitledItems.includes(parseInt(getId(item.merchandise.id), 10)));
				const minSpend = parseFloat(tSettings.customDiscountCode.minSpend) * 100;
				if (discountedItems.length && minSpend < cart.totalBeforeShipping) {
					discountedItems.forEach(async (item, index) => {
						const attributes = [
							{ key: '_campaign_type', value: 'custom_code' },
							{ key: '_custom_code', value: code },
							{ key: '_discount_amount', value: tSettings.customDiscountCode.discountAmount },
						];
						const lines = [{
							id: item.id,
							quantity: item.quantity,
							attributes,
						}];

						const queryData = {
							query: queryChangeQuantity, variables: { cartId, lines },
						};

						await this.sfApi.requestGraphql('cartLinesUpdate', queryData, false);
						if (index === discountedItems.length - 1) {
							this.processQueryDiscount(code, cartId, true).then((newCart) => {
								// eslint-disable-next-line max-len
								const discountCode = newCart.discountCodes.find((discCode) => code.toLowerCase() === discCode.code.toLowerCase());
								if (discountCode) {
									discountCode.applicable = true;
								}
								// eslint-disable-next-line no-param-reassign
								newCart.discountCodes = [discountCode];
								resolve(newCart);
							});
						}
					});
				} else {
					this.processQueryDiscount(code, cartId, true).then((newCart) => resolve(newCart));
				}
			});
		});
	}

	/*
        handle apply bogo discount code
        execute only if code exist from bogo list discounts (metafield settings) when apply discount code
        do a test to auto add gwp item to the cart and apply the code, when code is valid add gwp to the current cart and apply the code
    */
	handlerDiscountBogo(code, cartId, priceRule) {
		return new Promise((resolve) => {
			Cart.getCartAPi().then(async (resp) => {
				const currentCart = resp;
				const { items } = currentCart;
				const entitledItems = priceRule.entitled_variant_ids;
				const minSpend = priceRule.prerequisite_to_entitlement_purchase
					&& priceRule.prerequisite_to_entitlement_purchase.prerequisite_amount
					? priceRule.prerequisite_to_entitlement_purchase.prerequisite_amount : '0.0';

				const prequisiteItems = priceRule.prerequisite_variant_ids;
				const entitledFromAnotherCode = items.filter((item) => item.attributes.find((attr) => attr.key === '_discount_code' && attr.value !== code.toLowerCase()));

				if (entitledItems) {
					const entitledItemsonCart = items.filter((item) => {
						const exist = entitledItems.includes(parseInt(getId(item.merchandise.id), 10));
						const targetItems = item.attributes
							.filter((attr) => attr.key === '_discount_code'
                            && attr.value === code.toLowerCase());
						return exist && targetItems.length;
					});

					if (entitledItemsonCart.length) {
						const cart = await this.processQueryDiscount(code, cartId, false);
						const { discountCodes: discCodes } = cart;
						const { 0: discCode } = discCodes;

						if (discCode && !discCode.applicable && entitledItemsonCart) {
							const combineData = entitledFromAnotherCode.concat(entitledItemsonCart);
							combineData.forEach((item) => {
								this.sfApi.queueProcess({
									funct: 'removeItem',
									args: { id: item.id },
									callback: (result) => {
										resolve(result);
									},
								});
							});
						} else if (entitledFromAnotherCode.length) {
							entitledFromAnotherCode.forEach((item) => {
								this.sfApi.queueProcess({
									funct: 'removeItem',
									args: { id: item.id },
									callback: (result) => {
										resolve(result);
									},
								});
							});
						} else {
							resolve(currentCart);
						}
					} else {
						const startBogoDiscountProcess = (cart) => {
							const modelCart = Cart.cartModel(cart);
							const minSpendCents = parseFloat(minSpend) * 100;
							let hasPrequisiteItem = true;
							let { totalBeforeShipping } = modelCart;

							if (prequisiteItems) {
								totalBeforeShipping = 0;
								hasPrequisiteItem = modelCart.items.filter((item) => {
									if (prequisiteItems.includes(parseInt(getId(item.merchandise.id), 10))) {
										totalBeforeShipping += item.originalPrice;
									}
									return prequisiteItems.includes(parseInt(getId(item.merchandise.id), 10));
								});
							}
							totalBeforeShipping *= 100;

							if (totalBeforeShipping > minSpendCents && hasPrequisiteItem) {
								const freeItem = entitledItems[0];
								const attributes = [{ key: '_campaign_type', value: 'discount_code' }, { key: '_discount_code', value: code }];
								Cart.addItem(freeItem, 1, null, attributes, false).then((cartAdd) => {
									this.processQueryDiscount(code, cartAdd.id, true).then((newCart) => {
										resolve(newCart);
									});
								});
							} else {
								this.processQueryDiscount(code, cart.id, true).then((newCart) => {
									resolve(newCart);
								});
							}
						};

						if (entitledFromAnotherCode.length) {
							entitledFromAnotherCode.forEach((item) => {
								this.sfApi.queueProcess({
									funct: 'removeItem',
									args: { id: item.id },
									callback: startBogoDiscountProcess,
								});
							});
						} else {
							startBogoDiscountProcess(currentCart);
						}
					}
				} else {
					// just resolve with current cart when entitled items isn't exist for the code;
					resolve(currentCart);
				}
			});
		});
	}
}
