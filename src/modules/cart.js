/* global tSettings */

import StorefrontApi from '@/modules/storefront-api';
import Shipping from '@/modules/shipping';
import Discount from '@/modules/discounts';
import AutoGwp from '@/modules/autogwp';

import {
	setCookie, getCookie, getLSWithExpiry, getId, getCartId, getIndexTotalQuantityAndManualGwp, removeLS, isItemHasProp,
} from '@/modules/utils';
import {
	queryCartCreate, queryAddItem, queryRemoveItem, queryGetCart,
	queryChangeQuantity, queryCartAttributesUpdate,
} from '@/modules/query';

const discounts = new Discount();
let checkingCart = null;
export default class Cart {
	constructor() {
		this.sfApi = new StorefrontApi();
		this.shipping = new Shipping();
		this.autoGwp = new AutoGwp();
		this.recentProducts = (getCookie('recentlyViewedHandle') || '').split(',').filter((el) => el !== '');
		this.cart = {};

		clearTimeout(checkingCart);
		checkingCart = setTimeout(() => {
			this.getCartAPi(null, true);
		});
		if (globalThis.customerEmail) {
			this.getCart().then((cartData) => {
				if ((cartData && cartData.buyerIdentity && cartData.buyerIdentity.email === null && globalThis.customerEmail)
			|| (cartData && cartData.buyerIdentity && cartData.buyerIdentity.countryCode === null)
			|| (cartData && cartData.buyerIdentity && cartData.buyerIdentity.countryCode && cartData.buyerIdentity.countryCode !== getCookie('_shopify_country_code'))) {
					this.sfApi.setBuyerIdentity().then((cart) => {
						this.cart = this.cartModel(cart);
					});
				}
			});
		}
	}

	/*
        get Cart data object, when cartData storage empty will create initialize cart from storefront APi
		when cartData storage exist will give result cart data from storage
    */
	getCart() {
		const _ = this;
		return new Promise((resolve, reject) => {
			const cartCookie = getLSWithExpiry('cartData');
			let query = {};

			// initialize to create cart
			if (!cartCookie) {
				query = {
					query: queryCartCreate,
					variables: {
						input: {},
					},
				};

				this.sfApi.request(query).then((resp) => {
					const { data: { data: { cartCreate: { cart } } } } = resp;
					_.cart = this.cartModel(cart);
					this.sfApi.saveDataLocalStorage(cart);
					resolve(this.cartModel(cart));
				}).catch((error) => reject(error));
			} else {
				const cartData = JSON.parse(getLSWithExpiry('cartData'));
				_.cart = cartData;
				resolve(this.cartModel(cartData));
			}
		});
	}

	/*
        get cart data directly to storefront api with specific cart id
    */
	getCartAPi(cartId = null, loadPage = false) {
		const selectCartId = cartId || getCartId();
		const _ = this;

		return new Promise((resolve, reject) => {
			const query = {
				query: queryGetCart,
				variables: {
					cartId: selectCartId,
				},
			};

			this.sfApi.request(query).then((resp) => {
				if (resp && resp.data && resp.data.data && resp.data.data.cart) {
					const { data: { data: { cart } } } = resp;
					if (loadPage && cart.discountCodes.length) {
						const { 0: discountCode } = cart.discountCodes;
						if (discountCode && !discountCode.applicable && discountCode.code) {
							discounts.removeDiscountCode(cart, cart.id, false);
						}
					}

					resolve(this.cartModel(cart));
				} else {
					removeLS('cartData');
					setCookie('cart', '');
					const dataQuery = {
						query: queryCartCreate,
						variables: {
							input: {},
						},
					};

					this.sfApi.request(dataQuery).then((res) => {
						const { data: { data: { cartCreate: { crt } } } } = res;
						this.sfApi.saveDataLocalStorage(crt);
						_.cart = this.cartModel(crt);
						resolve(this.cartModel(crt));
					}).catch((error) => reject(error));
				}
			}).catch((error) => reject(error));
		});
	}

	/*
        get Variant options for Shade, Style, Scent to display variant selectors in the Cart Drawer
    */
	getVariantOptions(item) {
		const { merchandise: { product: { options } } } = item;
		const swatches = options.filter((opt) => opt.name.toLowerCase().includes('color')
			|| opt.name.toLowerCase().includes('style')
			|| opt.name.toLowerCase().includes('scent')).map((opt) => {
			let { name } = opt;
			if (name.toLowerCase().includes('drops') || name.toLowerCase().includes('foam') || name.toLowerCase().includes('color')) {
				name = 'Shade';
			} else if (name.toLowerCase().includes('style')) {
				name = 'Style';
			} else if (name.toLowerCase().includes('scent')) {
				name = 'Scent';
			}
			return { ...opt, name };
		});

		return swatches;
	}

	/*
        modeling cart fields to add more additional fields to the cart and line items which are necessary on display
    */
	cartModel(cart) {
		// let cartData = { ...cart };
		let cartData = { ...global.config.cart };
		if (cartData && cartData.lines && cartData.lines.edges) {
			let currentTotal = 0;
			// eslint-disable-next-line no-return-assign
			cartData.lines.edges.forEach((item) => currentTotal += item.node.quantity);

			cartData.items = cartData.lines.edges.map((item) => {
				const { node } = item;
				node.isManualGwp = false;
				const checkAttributes = node.attributes.find((i) => i.key === '_campaign_type' && i.value === 'manual_gwp');
				if (checkAttributes) {
					node.isManualGwp = true;
					if (currentTotal === cartData.totalQuantity) { cartData.totalQuantity -= node.quantity; }
				}
				node.diffPriceBundle = 0;
				node.comparePrice = 0;
				node.originalPrice = parseFloat(node.cost.amountPerQuantity.amount) * 100;
				if (node.cost && node.cost.compareAtAmountPerQuantity) {
					node.comparePrice = parseFloat(node.cost.compareAtAmountPerQuantity.amount) * 100;
					node.diffPriceBundle = node.comparePrice - node.originalPrice;
				}
				node.isFreeItem = node.cost.totalAmount.amount === '0.0';
				node.swatches = this.getVariantOptions(node);
				node.variants = node.merchandise.product.variants.edges.map((variant) => variant.node);
				node.selectedSwatch = node.merchandise.selectedOptions.filter((opt) => opt.name.toLowerCase() !== 'size').map((opt) => opt.value);
				return node;
			});
			cartData.items = cartData.items.reverse();
		}

		if (cartData.items) {
			cartData.subtotalPrice = this.calculateSubTotal(cartData.items);
			cartData.discountBundleAmount = this.calculateBundleDiscount(cartData.items);
			cartData.discountManualGwp = this.calculateManualGwpDiscount(cartData.items);
			cartData.discountAmount = this.calculateDiscount(cartData);
			cartData.discountLine = cartData.discountAmount + cartData.discountManualGwp;
			cartData.discountCombineLine = cartData.discountLine + cartData.discountBundleAmount;
			cartData.totalAmount = cartData.subtotalPrice - cartData.discountCombineLine;
			cartData.totalBeforeShipping = cartData.subtotalPrice - cartData.discountCombineLine;

			const { shippingData, shippingMeter } = this.shipping.getShippingData(cartData.totalAmount, false);

			cartData.shippingData = shippingData;
			cartData.shippingMeter = shippingMeter;

			if (cartData.shippingData && cartData.shippingData.amount) {
				cartData.totalAmount += cartData.shippingData.amount;
			}

			cartData.discountMeter = this.checkTierLevel(cartData);
		}

		if (cart && cart.id) {
			cartData.discountData = discounts.getDiscountData(cartData);
		}

		cartData = this.autoGwp.processAutoGwp(cartData);
		return cartData;
	}

	/*
        calculate manual gwp discount amount
    */
	calculateManualGwpDiscount(items) {
		let gwpDiscount = 0;
		items.forEach((item) => {
			if (item.isManualGwp) gwpDiscount += item.comparePrice ? item.comparePrice : item.originalPrice;
		});
		return gwpDiscount;
	}

	/*
        calculate discounts, discount allocations and disocunt line item allocations
    */
	calculateDiscount(cart) {
		let discountAmount = 0;

		cart.discountAllocations.forEach((alloc) => {
			const amount = parseFloat(alloc.discountedAmount.amount) * 100;
			discountAmount += amount;
		});

		cart.items.forEach((item) => (
			item.discountAllocations.forEach((alloc) => {
				const amount = parseFloat(alloc.discountedAmount.amount) * 100;
				discountAmount += amount;
			})
		));
		return discountAmount;
	}

	/*
        calculate sub total, counting from originalPrice or comparePrice
    */
	calculateSubTotal(items) {
		let subTotal = 0;
		items.forEach((item) => {
			subTotal += item.comparePrice ? item.comparePrice * item.quantity : item.originalPrice * item.quantity;
		});
		return subTotal;
	}

	/*
        calculate bundle discount, counting different prices between comparePrice and originalPrice
    */
	calculateBundleDiscount(items) {
		let bundleDiscount = 0;
		items.forEach((item) => {
			if (!item.isManualGwp) { bundleDiscount += (item.diffPriceBundle * item.quantity); }
		});
		return bundleDiscount;
	}

	/*
        add item to the cart and save cart result to the cookie
    */
	addItem(variantId, quantity, sellingPlanId = null, attributes = null, directRefresh = true) {
		return new Promise((resolve, reject) => {
			const line = { quantity, merchandiseId: `gid://shopify/ProductVariant/${variantId}` };

			if (sellingPlanId) line.sellingPlanId = sellingPlanId;
			if (attributes) line.attributes = attributes;

			const queryData = {
				query: queryAddItem,
				variables: { cartId: getCartId(), lines: [line] },
			};

			this.sfApi.requestGraphql('cartLinesAdd', queryData, directRefresh).then((resp) => {
				if (resp.reject) { reject(resp.reject); }
				if (resp.resolve) {
					// sync with cart ajax api shopify to keep analytics shopify, swell and bluecore working
					const data = { id: variantId, quantity };
					if (attributes) {
						data.properties = {};
						attributes.forEach((attr) => { data.properties[attr.key] = attr.value; });
					}
					this.syncCartAjaxApi('/cart/add.js', data);
					resolve(resp.resolve);
				}
			});
		});
	}

	/* get item by id from object cart items */
	getItem(t) {
		if (this.cart && this.cart.items) {
			return this.cart.items.find((item) => item.merchandise.id.includes(t));
		}
		return null;
	}

	/*
        remove item from the cart,
        remove from cookie storage data and remove item from cart server side in background
    */
	removeItem(id, directRefresh = true) {
		const ids = [id];
		return new Promise((resolve, reject) => {
			const cartData = getLSWithExpiry('cartData');
			const swellItems = [];
			if (cartData) {
				const cartJSON = JSON.parse(cartData);
				const { lines: { edges } } = cartJSON;
				if (edges) {
					edges.forEach((edge) => {
						if (edge.node.attributes && edge.node.attributes.find((attr) => attr.key === '_swell_discount_type' && attr.value === 'product')) {
							swellItems.push(edge.node);
						}
					});
					const { findIndex, totalQuantity, manualGwp } = getIndexTotalQuantityAndManualGwp(edges, -1, id);
					if (findIndex > -1) { edges.splice(findIndex, 1); }
					cartJSON.lines.edges = edges;
					if (edges.length === 1 && manualGwp.length) {
						manualGwp.forEach((item) => ids.push(item.node.id));
						setCookie('manualGwpSelected', '[]');
						cartJSON.totalQuantity = 0;
					} else if (edges.length) {
						cartJSON.totalQuantity = totalQuantity + manualGwp.length;
					} else {
						cartJSON.totalQuantity = 0;
					}
					this.sfApi.saveDataLocalStorage(cartJSON, directRefresh);
				}
			}

			const queryData = {
				query: queryRemoveItem,
				variables: { cartId: getCartId(), lineIds: ids },
			};

			const _ = this;
			this.sfApi.requestGraphql('cartLinesRemove', queryData, directRefresh).then((resp) => {
				if (resp.reject) { reject(resp.reject); }
				if (resp.resolve) {
					try {
						_.getCart().then((cart) => {
							if (!cart.items.length) {
								this.syncCartAjaxApi('/cart/clear.js', {});
								if (swellItems.length) {
									removeLS('cartData');
									setCookie('cart', '');
									_.getCart();
								}
							}
						});
					} catch (e) {
						console.log('clear item regular cart');
					}
					resolve(resp.resolve);
				}
			});
		});
	}

	/*
        replace item when new swatch seleted from cart drawer and save cart cookie
    */
	replaceItem(oldId, newId, quantity, sellingPlan = null, attributes = null) {
		return new Promise((resolve) => {
			this.addItem(getId(newId), quantity, sellingPlan, attributes, false).then(() => {
				this.removeItem(oldId, false).then((resp) => resolve(resp));
			});
		});
	}

	/*
		update cart attributes
	*/
	updateCartAttributes(attributes) {
		return new Promise((resolve, reject) => {
			const queryData = {
				query: queryCartAttributesUpdate, variables: { cartId: getCartId(), attributes },
			};

			this.sfApi.requestGraphql('cartAttributesUpdate', queryData).then((resp) => {
				if (resp.reject) { reject(resp.reject); }
				if (resp.resolve) { resolve(resp.resolve); }
			});
		});
	}

	/*
        update line quantity
        update to the cookie storage and update to the cart backend in the background
    */
	changeQuantity(id, qty, directRefresh = true) {
		const lines = [{ quantity: qty, id }];

		return new Promise((resolve, reject) => {
			// update on local data directly
			const cartData = getLSWithExpiry('cartData');
			const swellItems = [];
			if (!id) resolve(false);
			if (cartData) {
				const cartJSON = JSON.parse(cartData);
				const { lines: { edges } } = cartJSON;
				const { findIndex, manualGwp } = getIndexTotalQuantityAndManualGwp(edges, 0, id);

				if (qty < 1) {
					edges.splice(findIndex, 1);
					cartJSON.lines.edges = edges;
					if (edges.length === 1 && manualGwp.length) {
						manualGwp.forEach((item) => {
							lines.push({ quantity: 0, id: item.id });
							edges.splice(edges.indexOf(item));
						});
						cartJSON.totalQuantity = 0;
					} else if (edges.length) {
						cartJSON.totalQuantity -= manualGwp.length;
					} else if (edges.length === 0) {
						cartJSON.totalQuantity = 0;
					}
				} else {
					if (edges[findIndex] && edges[findIndex].node) edges[findIndex].node.quantity = qty;
					cartJSON.lines.edges = edges;
				}
				this.sfApi.saveDataLocalStorage(cartJSON, directRefresh);
				if (edges && edges.length) {
					edges.forEach((edge) => {
						if (edge.node.attributes && edge.node.attributes.find((attr) => attr.key === '_swell_discount_type' && attr.value === 'product')) {
							swellItems.push(edge.node);
						}
					});
				}
			}

			// request to storefront APi
			const queryData = {
				query: queryChangeQuantity, variables: { cartId: getCartId(), lines },
			};

			const _ = this;
			this.sfApi.requestGraphql('cartLinesUpdate', queryData, directRefresh).then((resp) => {
				if (resp.reject) { reject(resp.reject); }
				if (resp.resolve) {
					try {
						_.getCart().then((cart) => {
							if (!cart.items.length) {
								this.syncCartAjaxApi('/cart/clear.js', {});
								if (swellItems.length) {
									removeLS('cartData');
									setCookie('cart', '');
									_.getCart();
								}
							}
						});
					} catch (e) {
						console.log('clear item regular cart');
					}
					resolve(resp.resolve);
				}
			});
		});
	}

	async getRecentProducts() {
		return this.sfApi.getRecentProductsInfo(this.recentProducts);
	}

	syncCartAjaxApi(url, data) {
		fetch(url, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'X-Requested-With': 'XMLHttpRequest',
			},
			body: JSON.stringify(data),
		});
	}

	// check current active discount tier
	checkTierLevel(cart) {
		try {
			let totalOriginalWithoutDiscount = 0;
			let scriptDiscounted = false;
			$.each(cart.items, function (index, cartItem) {
				if (isItemHasProp(cartItem, '_script_discount', 'percentage')) {
					totalOriginalWithoutDiscount += cartItem.originalPrice * cartItem.quantity;
					scriptDiscounted = true;
				}
			});

			if (!scriptDiscounted) {
				$.each(cart.items, function (index, cartItem) {
					if (tSettings.cartDiscountMeter.exclusion.indexOf(cartItem.handle) < 0) {
						totalOriginalWithoutDiscount += cartItem.originalPrice * cartItem.quantity;
					}
				});
			}

			const discountTiers = tSettings.cartDiscountMeter.tiers.filter((i) => i.text !== '');
			const minSpendSorted = discountTiers.sort(function (a, b) {
				return a.min_spend - b.min_spend;
			}).reverse();

			let selectedTier = null;
			let nextOfTier = null;
			for (let y = 0; y < minSpendSorted.length; y += 1) {
				const mSpend = parseFloat(minSpendSorted[y].min_spend) * 100;
				if (totalOriginalWithoutDiscount >= mSpend) {
					selectedTier = minSpendSorted[y];
					nextOfTier = minSpendSorted[y - 1];
					break;
				}
			}

			return [selectedTier, nextOfTier, totalOriginalWithoutDiscount];
		} catch (e) {
			return [];
		}
	}
}

globalThis.Cart = new Cart();
