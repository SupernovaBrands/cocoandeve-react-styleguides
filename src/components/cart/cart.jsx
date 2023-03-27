/* global tSettings tStrings Shopify */

const tSettings = global.config.tSettings;
const tStrings = global.config.tStrings;

import React from 'react';
import CartShippingMeter from '@/components/cart/cart-shipping-meter';
import CartDiscountMeter from '@/components/cart/cart-discount-meter';
import CartItem from '@/components/cart/cart-item';
import CartDiscountForm from '@/components/cart/cart-discount-form';
import CartManualGwp from '@/components/cart/cart-manual-gwp';
import CartExtras from '@/components/cart/cart-extras';
import CartRecentProducts from '@/components/cart/cart-recent-products';
import CartAction from '@/modules/cart';
import CartSwellRedemption from '@/components/swell/cart-swell-redemption';

import {
	isCodeAllowed,
	getId,
	getCartId,
	isSwellCode,
	formatMoney,
} from '@/modules/utils';

import SvgClose from '@/images/icons/close.svg';
import { gaEvent } from '@/modules/analytics-event';
import Discount from '@/modules/discounts';
import ManualGWP from '@/modules/manual-gwp';
import Shipping from '@/modules/shipping';
import giftCard from '@/modules/gift-card';

const styleguide = true;
export default class Cart extends React.Component {
	constructor(props) {
		super(props);

		this.CartAction = new CartAction();
		this.Discount = new Discount();
		this.ManualGWP = new ManualGWP();
		this.Shipping = new Shipping();
		this.timingType = null;

		this.state = {
			isLastStockKey: '',
			cart: {
				items: [], lines: { edges: [] }, discountAllocations: [], discountCodes: [], buyerIdentity: {},
			},
			loadingInit: true,
			itemCount: 0,
			giftCardData: {},

			discountData: {},
			loadingDiscount: false,
			recentProducts: [],
			manualGwp: {},
			loadingManualGwp: { loading: false, id: -1 },
			shippingData: {},
			shippingMeter: {},
			discountMeter: {},
			combineDiscount: global.config.tSettings.cartCombineDiscount,
			shippingLineHide: false,
			giftCardAmount: 0,
		};
	}

	componentDidMount() {
		this.setCartData();
		this.setManualGWP();
		document.addEventListener('CartUpdated', this.setCartData);
	}

	componentWillUnmount() {
		document.removeEventListener('CartUpdated', this.setCartData);
	}

	setCartCountEl = (count) => {
		const selector = document.querySelector('.cart-drawer__count');
		if (selector) selector.innerHTML = count;
	}

	setManualGWP() {
		return this.ManualGWP.getManualGwpData().then((resp) => {
			this.setState({ manualGwp: resp });
		});
	}

	/* -------------------
		Process cart data for display
	------------------- */
	setCartData = async () => {
		let cart = null;
		cart = await this.CartAction.getCart();
		const discountedItemCustomCode = cart.items.filter((item) => item.attributes.find((attr) => attr.key === '_campaign_type' && attr.value === 'custom_code'));

		// regularly check applied discount only when cart been applied discount
		if ((cart.discountCodes && cart.discountCodes[0] && cart.discountCodes[0].code)
			|| (discountedItemCustomCode.length && !cart.discountCodes[0])
			|| (discountedItemCustomCode.length && cart.discountCodes[0]
				&& cart.discountCodes[0].code.toLowerCase() !== tSettings.customDiscountCode.code.toLowerCase())) {
			cart = await this.Discount.checkAppliedDiscounts();
		}

		let cartDiscountMeter = {};
		if (cart.discountMeter && tSettings.cartDiscountMeter.enable) {
			const tiers = cart.discountMeter;
			const selectedTier = tiers[0];
			const nextTier = tiers[1] || selectedTier;
			const totalOriginal = tiers[2];

			cartDiscountMeter = {
				enabled: true,
				target: parseInt(nextTier.min_spend, 10) * 100,
				current: totalOriginal,
				progressText: selectedTier.text,
				discount: cart.total_discount 	|| 0,
			};
		}

		// TEMP CART FOR STYLEGUIDES
		if (styleguide) {
			this.setState({
				loadingInit: false,
				loadingDiscount: false,
				cart: global.config.cart,
				itemCount: global.config.cart.totalQuantity,
				shippingData: global.config.cart.shippingData,
				shippingMeter: global.config.cart.shippingMeter,
				discountData: global.config.cart.discountData,
				discountMeter: global.config.cartDiscountMeter,
			}, () => {
				this.setCartCountEl(global.config.cart.totalQuantity);
			});

			return;
		}

		this.setState({
			loadingInit: false,
			loadingDiscount: false,
			cart,
			itemCount: cart.totalQuantity,
			shippingData: cart.shippingData,
			shippingMeter: cart.shippingMeter,
			discountData: cart.discountData,
			discountMeter: cartDiscountMeter,
		}, () => {
			const tooltipEl = document.getElementById('form-cart-tooltip');
			if (tooltipEl) {
				tooltipEl.setAttribute('action', cart.checkoutUrl.replace('www', 'us'));
				tooltipEl.setAttribute('method', 'get');
			}

			this.setCartCountEl(cart.totalQuantity);
			if (!cart.totalQuantity) this.setRecentProducts();
		});
	}

	setRecentProducts = async () => {
		const products = await this.CartAction.getRecentProducts();
		this.setState({
			recentProducts: products,
		});
	}

	/* -------------------
		Actions
	------------------- */

	onChangeQuantity = (item, qty, callback) => {
		this.timingType = setTimeout(() => {
			clearTimeout(this.timingType);
			let newQty = qty;
			let lastStock = false;
			if (item.merchandise.quantityAvailable <= parseInt(qty, 10)) {
				newQty = item.merchandise.quantityAvailable;
				lastStock = true;
			}
			this.setState({ isLastStockKey: '' }, () => {
				const quantity = parseInt(newQty, 10);
				this.CartAction.changeQuantity(item.id, quantity).then(() => {
					if (quantity < 0) {
						this.CartAction.getCart().then((cart) => {
							if (!cart.items.length) { document.dispatchEvent(new CustomEvent('SwellRemoveItemToCart')); }
						});
					}
					if (lastStock) {
						this.setState({ isLastStockKey: item.id });
						callback(quantity);
					}
				});
			});
		}, 1000);
	}

	onChangeVariant = (item, newVariantId, lastStock, variant) => {
		const quantity = (lastStock && lastStock.length > 0) ? lastStock[0].quantity : item.quantity;
		if (item.merchandise.id !== newVariantId) {
			const { cart } = this.state;
			const indexOfLine = cart.lines.edges.map((line) => line.node).indexOf(item);
			let lineItem = null;
			if (indexOfLine >= 0) {
				lineItem = this.state.cart.lines.edges[indexOfLine];

				if (lineItem) {
					lineItem.node.merchandise.id = variant.id;
					lineItem.node.merchandise.selectedOptions = variant.selectedOptions;
					lineItem.node.merchandise.quantityAvailable = variant.quantityAvailable;
					lineItem.node.selectedSwatch = variant.selectedOptions.filter((opt) => opt.name.toLowerCase() !== 'size').map((opt) => opt.value);
					if (lineItem.node.selectedSwatch.length > 1) {
						lineItem.node.openAccordion = true;
					}
				}
				this.setState({ cart });
			}

			this.CartAction.replaceItem(item.id, newVariantId, quantity).then((resp) => {
				if (resp && resp.lines && resp.lines.edges) {
					const newLine = resp.lines.edges.find((line) => line.node.merchandise.id === variant.id);
					if (newLine && lineItem) {
						lineItem.node.id = newLine.node.id;
						this.setState({ cart });
					}
				}
			});
		}
	}

	onRemoveItem = (item) => {
		this.CartAction.removeItem(item.id).then((cart) => {
			const cartData = this.CartAction.cartModel(cart);
			if (!cartData.items.length) { document.dispatchEvent(new CustomEvent('SwellRemoveItemToCart')); }
		});
	}

	onAddItem = (data) => {
		this.CartAction.addItem(data.variantId, 1).then(() => {
			document.dispatchEvent(new CustomEvent('SwellAddItemToCart'));
		});
	}

	onApplyDiscountCode = (code) => {
		const { cart: currentCart } = this.state;
		if (currentCart.discountData) {
			currentCart.discountData.code = code;
		}

		this.setState({ loadingDiscount: true, ...currentCart }, () => {
			const allowedCode = isCodeAllowed(code);
			if (code && window.customerEmail === '' && tSettings.logged_in_customer_code_valid.indexOf(code.toLowerCase()) >= 0) {
				this.setState({
					loadingDiscount: false,
					discountData: {
						isValid: false,
						error: tSettings.logged_in_customer_code_error,
					},
				});
			} else if ((allowedCode && tSettings.cart_code_rejection)
				|| !tSettings.cart_code_rejection) {
				this.Discount.applyDiscountCode(code, getCartId()).then((resp) => {
					if (resp) {
						const cart = this.CartAction.cartModel(resp);
						this.setState({
							loadingDiscount: false,
							cart,
							itemCount: cart.totalQuantity,
							shippingData: cart.shippingData,
							shippingMeter: cart.shippingMeter,
							discountData: cart.discountData,
						});
					}
				});
			} else {
				this.setState({
					loadingDiscount: false,
					discountData: {
						isValid: false,
						error: tStrings.cart_code_rejection_msg,
						code_reject: tSettings.cart_code_rejection,
					},
				});
			}
		});
	}

	onRemoveDiscountCode = () => {
		this.setState({ loadingDiscount: true }, () => {
			/* checking the code if code is bogo will remove gwp item from the cart */
			// const currentCode = this.state.cart.discountCodes.map((lineCode) => lineCode.code)[0];
			this.Discount.removeDiscountCode(this.state.cart, getCartId()).then((resp) => {
				if (resp) {
					const cart = this.CartAction.cartModel(resp);
					this.setState({
						loadingDiscount: false,
						cart,
						itemCount: cart.totalQuantity,
						shippingData: cart.shippingData,
						shippingMeter: cart.shippingMeter,
						discountData: cart.discountData,
					});
				}
			});
			document.dispatchEvent(new CustomEvent('SwellRemoveItemToCart'));
		});
	}

	onToggleManualGwp = (id) => {
		this.setState({
			loadingManualGwp: { loading: true, id },
		}, () => {
			const newSelected = this.ManualGWP.toggleManualGwp(this.state.manualGwp, id);
			this.setState((prevState) => ({
				manualGwp: {
					...prevState.manualGwp,
					selectedKey: newSelected,
				},
				loadingManualGwp: { loading: false, id: -1 },
			}));
		});
	}

	handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			e.preventDefault();
		}
	}

	onRemoveGiftCard = () => {
		this.setState({ loadingDiscount: true }, () => {
			giftCard.uncache();
			this.setState({
				loadingDiscount: false,
				giftCardData: {},
			});
			this.setCartData();
		});
	}

	submitForm() {
		gaEvent.send('Cart Drawer', 'Cart Drawer CTA', '', 0);
		gaEvent.tiktokEvent('InitiateCheckout');
		document.getElementById('cart-drawer-form').submit();
	}

	render() {
		const {
			cart,
			loadingInit,
			isLastStockKey,
			itemCount,
			loadingDiscount,
			discountData,
			manualGwp,
			loadingManualGwp,
			shippingData,
			shippingMeter,
			discountMeter,
			recentProducts,
			shippingLineHide,
			combineDiscount,
			giftCardData,
			giftCardAmount,
		} = this.state;

		const isSwellDiscCode = isSwellCode(discountData.code);

		return (
			<div className="modal-content mh-100 border-0 rounded-0">
				<div className="modal-body mobile-wrapper pt-0 px-lg-0">
					<div className="container d-flex flex-column align-items-stretch text-center pt-2">
						<h4 className="font-size-lg font-weight-bold">{tStrings.cart_drawer_title}</h4>
						<button type="button" className="close text-body m-0 px-g pb-2 position-absolute" data-dismiss="modal" aria-label="Close" data-cy="cart-close-icon">
							<SvgClose className="svg" aria-hidden="true" />
						</button>

						{tSettings.cartDiscountMeter && !tSettings.cartDiscountMeter.enable
							&& tSettings.cartShippingMeter.enable
							&& shippingMeter
							&& shippingMeter.enabled
							&& itemCount > 0
							&& (
								<CartShippingMeter
									target={shippingMeter.target}
									current={shippingMeter.current}
								/>
							)}
						{tSettings.cartDiscountMeter && tSettings.cartDiscountMeter.enable && discountMeter
							&& discountMeter.enabled && itemCount > 0 && (
							<CartDiscountMeter
								target={discountMeter.target}
								current={discountMeter.current}
								progressText={discountMeter.progressText}
							/>
						)}
						<hr className="w-100 m-0" />
					</div>

					{loadingInit && (
						<div className="d-flex justify-content-center p-2">
							<div className="spinner-border" role="status" />
						</div>
					)}

					{!loadingInit && (itemCount === 0 ? (
						<div className="pt-3 text-center">
							<div className="container px-g cart-empty-shop-cta">
								<p className="my-3 text-center">{tStrings.cart_empty}</p>
								<a href="/collections" className="btn btn-primary" data-cy="shop-all-btn">Shop all products</a>
							</div>
							<div className="cart-empty-discount-form container text-start d-none">
								<CartDiscountForm
									isApplied={discountData.isValid}
									isEmptyCart={itemCount === 0}
									code={discountData.code}
									discAmount={discountData.amount}
									isAutoDiscount={discountData.isAuto}
									loading={loadingDiscount}
									error={discountData.error}
									errorExtra={discountData.errorExtra}
									onApply={this.onApplyDiscountCode}
									onRemove={this.onRemoveDiscountCode}
									appliedGiftCard={giftCardData}
									onRemoveGiftCard={this.onRemoveGiftCard}
								/>
							</div>
							{recentProducts.length > 0 && (
								<>
									<hr />
									<CartRecentProducts products={recentProducts} onAddToCart={this.onAddItem} />
								</>
							)}
						</div>
					) : (
						// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
						<form
							id="cart-drawer-form"
							className="container"
							action={cart.checkoutUrl.replace('www', 'us')}
							method="get"
							noValidate
							onKeyDown={this.handleKeyDown}
						>
							<input type="hidden" name="checkout" value="Checkout" />

							<ul className="list-unstyled border-bottom">
								{cart.items && cart.items.map((item) => !item.isManualGwp && (
									<CartItem
										key={item.id}
										item={item}
										isLastStock={item.id === isLastStockKey}
										onChangeVariant={this.onChangeVariant}
										onChangeQuantity={this.onChangeQuantity}
										onRemoveItem={this.onRemoveItem}
										productId={getId(item.merchandise.product.id)}
										productStock={item.merchandise.quantityAvailable}
									/>
								))}
							</ul>

							{manualGwp.enabled && (
								<>
									<CartManualGwp
										title={manualGwp.title}
										maxSelected={manualGwp.maxSelected}
										selectedKey={manualGwp.selectedKey}
										items={manualGwp.items}
										onAddItem={this.onToggleManualGwp}
										onRemoveItem={this.onToggleManualGwp}
										loading={loadingManualGwp.loading}
										processingId={loadingManualGwp.id}
									/>
									<hr />
								</>
							)}

							{tSettings.cartRedemption.enabled && (
								<>
									{/*  <CartSwellRedemption cartData={cart} code={discountData.code} discAmount={discountData.amount} /> */}
									{/*<hr />*/}
								</>
							)}

							<CartDiscountForm
								isApplied={discountData.isValid}
								isEmptyCart={itemCount === 0}
								code={discountData.code}
								discAmount={discountData.amount}
								isAutoDiscount={discountData.isAuto}
								loading={loadingDiscount}
								error={discountData.error}
								errorExtra={discountData.errorExtra}
								onApply={this.onApplyDiscountCode}
								onRemove={this.onRemoveDiscountCode}
								appliedGiftCard={giftCardData}
								onRemoveGiftCard={this.onRemoveGiftCard}
							/>
							<hr />

							<div className="row">
								<p className="col-8 mb-1 font-weight-bold" data-cy="cart-subtotal-label">{tStrings.cart_subtotal}</p>
								<p className="col-4 mb-1 font-weight-bold text-end" data-cy="cart-subtotal-value">{formatMoney(cart.subtotalPrice, '${{amount}}')}</p>

								{!combineDiscount && cart.discountBundleAmount > 0 && !isSwellDiscCode && (
									<>
										<p className="col-8 mb-1 font-weight-bold" data-cy="cart-bundledisount-label">{tStrings.cart_bundle_discount}</p>
										<p className="col-4 mb-1 font-weight-bold text-end" data-cy="cart-bundledisount-value">{`-${formatMoney(cart.discountBundleAmount, '${{amount}}')}`}</p>
									</>
								)}

								{!combineDiscount && cart.discountLine > 0 && !isSwellDiscCode && (
									<>
										<p className="col-8 mb-1 font-weight-bold" data-cy="cart-discount-label">{tStrings.cart_discount}</p>
										<p className="col-4 mb-1 font-weight-bold text-end" data-cy="cart-discount-value">{`-${formatMoney(cart.discountLine, '${{amount}}')}`}</p>
									</>
								)}

								{combineDiscount && cart.discountCombineLine > 0 && !isSwellDiscCode && (
									<>
										<p className="col-8 mb-1 font-weight-bold" data-cy="cart-discount-label">{tStrings.cart_discount}</p>
										<p className="col-4 mb-1 font-weight-bold text-end" data-cy="cart-discount-value">{`-${formatMoney(cart.discountCombineLine, '${{amount}}')}`}</p>
									</>
								)}

								{isSwellDiscCode && (
									<>
										<p className="col-8 mb-1 font-weight-bold">Rewards</p>
										<p className="col-4 mb-1 font-weight-bold text-end">{`-${formatMoney(discountData.amount, '${{amount}}')}`}</p>
									</>
								)}

								{shippingData.show && !shippingLineHide && (
									<>
										<p className="d-none d-lg-block col-8 mb-1 font-weight-bold" data-cy="cart-shipping-label">{tStrings.cart_shipping}</p>
										<p className={`d-none d-lg-block col-4 mb-1 font-weight-bold text-end ${shippingData.amount > 0 ? '' : 'text-primary'}`} data-cy="cart-shipping-value">{shippingData.amount > 0 ? formatMoney(shippingData.amount, '${{amount}}') : 'Free'}</p>
									</>
								)}

								{shippingData.show && !shippingLineHide && (
									<>
										<div className="d-flex d-lg-none justify-content-between col-12">
											<p className="mb-1" data-cy="cart-shipping-label">
												<strong>{`${tStrings.cart_shipping} `}</strong>
												{(tSettings.store !== 'fr' && tSettings.store !== 'de') && shippingData.freeRate !== null && shippingData.freeRate.min_order_subtotal > 0 && (
													<span className="font-size-sm">{tSettings.cartShippingLine.shippingLine1.replace('_XX_', formatMoney((parseFloat(shippingData.freeRate.min_order_subtotal)) * 100, '${{amount}}')).replace('.00', '').replace(',00', '')}</span>
												)}
												{(tSettings.store === 'fr' || tSettings.store === 'de') && shippingData.freeRate !== null && shippingData.freeRate.min_order_subtotal > 0 && (
													<span className="font-size-sm">{`${tSettings.cartShippingLine.shippingLine1.replace('_XX_', `${parseFloat(shippingData.freeRate.min_order_subtotal)}€`)}`}</span>
												)}
											</p>
											<p className={`mb-1 font-weight-bold text-end ${shippingData.amount > 0 ? '' : 'text-primary'}`} data-cy="cart-shipping-value">{shippingData.amount > 0 ? formatMoney(shippingData.amount, '${{amount}}') : 'Free'}</p>
										</div>
										<p className="d-lg-none col-12 mb-1 font-size-sm text-gray-600">{tSettings.cartShippingLine.shippingLine2}</p>
									</>
								)}

								{giftCardAmount > 0 && (
									<>
										<p className="col-8 mb-1 font-weight-bold">{tStrings.giftCard}</p>
										<p className="col-4 mb-1 font-weight-bold text-end">{`-${formatMoney(giftCardAmount, '${{amount}}')}`}</p>
									</>
								)}
							</div>

							<hr />
							
							{/* <CartExtras totalPrice={cart.totalAmount} */}
						</form>
					))}
				</div>

				{!loadingInit && itemCount > 0 && (
					<div className="modal-footer px-g">
						<div className="row no-gutters w-100">
							<strong className="col-8 font-size-lg" data-cy="cart-total-label">{tStrings.cart_total}</strong>
							<strong className="col-4 font-size-lg text-end" data-cy="cart-total-value">{formatMoney(cart.totalAmount, '${{amount}}')}</strong>
							<div className="col-12 mt-1">
								<button
									type="button"
									className="btn btn-lg btn-block btn-primary px-1 w-100"
									disabled={loadingDiscount || manualGwp.loading}
									onClick={this.submitForm}
									data-cy="checkout-btn"
								>
									{tStrings.cart_checkout}
								</button>
							</div>
						</div>
						{tStrings.cart_shipping_at_checkout !== '' && (
							<p className="col-12 p-0 text-center mt-1" dangerouslySetInnerHTML={{ __html: tStrings.cart_shipping_at_checkout }} />
						)}
					</div>
				)}
			</div>
		);
	}
}
