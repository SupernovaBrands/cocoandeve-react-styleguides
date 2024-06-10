import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import SvgClose from '~/images/icons/close.svg';
import CartShippingMeter from '~/components/cart/cart-shipping-meter';
import CartDiscountMeter from '~/components/cart/cart-discount-meter';
import CartDiscountForm from '~/components/cart/cart-discount-form';
import CartManualGwp from '~/components/cart/cart-manual-gwp';
import CartExtras from '~/components/cart/cart-extras';
import CartItem from "./cart-item";
import CartSwellRedemption from '~/components/swell/cart-swell-redemption';
import { formatMoney } from "~/modules/utils";
import KlarnaModal from '~/components/modal/KlarnaModal';

// import { CartData } from "./types";
// import { getCookie } from "~/modules/utils";

const tSettings = global.config.tSettings;
const tStrings = global.config.tStrings;

interface Props {
	store: string;
    showCart: boolean;
    handleClose: () => void;
	cartCount: number;
	isLoading?: boolean;
	styleguide?: boolean;
	cartData: any;
	itemCount?: any;
	strapiCartSetting?: any;
	onUpdateCart: (item: any, qty: number) => void;
	onDeleteLine: (lineId: string, attributes: Array<any>[]) => void;
	discountMeter?: any;
	shippingMeter?: any;
	shippingData?: any;
	handleDiscount?: any;
	manualGwpSetting?: any;
	discountBanner?: any;
	removeDiscount?: any;
	changeVariant?: any;
	trackEvent?: any;
	tiktokEvent?: any;
	fbqEvent?: any;
	currency?: any;
	user?: any;
	isAuthenticated?: boolean;
}

const Cart: React.FC<Props> = (props) => {
	const { showCart, cartData, itemCount, discountBanner, store,
		onUpdateCart, onDeleteLine, discountMeter, shippingMeter,
		removeDiscount, shippingData, handleDiscount, manualGwpSetting, changeVariant, trackEvent, tiktokEvent, fbqEvent, currency, user, isAuthenticated } = props;
	// const storeApi = new storefrontApi();
	// console.log(discountMeter, 'discountMeter');
	const [loadingInit, setLoadingInit] = useState(props.isLoading);
	const [cart, setCart] = useState({
		id: '', items: [], lines: { edges: [] }, discountAllocations: [], discountCodes: [], buyerIdentity: {},
		discountBundleAmount: 0, checkoutUrl: '', discountCombineLine: 0, discountLine: 0, discountTier: 0, subtotalPrice: 0,
		totalAmount: 0, itemCount: 0, cost: {totalAmount: {amount: 0}},
	});
	const [isLastStockKey, setLastStockKey] = useState('');

	const [combineDiscount, setCombineDiscount] = useState(tSettings.cartCombineDiscount);
	const [isSwellDiscCode, setIsSwellDiscCode] = useState(false);

	const [giftCardData, setGiftCardData] = useState({});

	const [shippingLineHide, setShippingLineHide] = useState(false);
	const [giftCardAmount, setGiftCardAmount] = useState(0);
	const [isModalKlarnaOpen, setIsModalKlarnaOpen] = useState(false);

	const handleOpenModalKlarna = () => {
		setIsModalKlarnaOpen(false);
    }

	const setIsKlarnaOpen = (stateModal:boolean) => {
		setIsModalKlarnaOpen(stateModal);
	}

	useEffect(() => {
		if (cartData) {
			setCart({ ...cartData });
		}
	}, [cartData, itemCount]);

	const onApplyDiscountCode = async (c:any, updateCart = true) => {
		return await handleDiscount(c, updateCart);
	}

	const onRemoveDiscountCode = async () => {
		return await removeDiscount();
	}

	const onRemoveGiftCard = () => {

	}

	const handleKeyDown = () => {

	}

	const onChangeQuantity = (item:any, qty:any, callback: any) => {
		let newQty = qty;
		let lastStock = false;
		if (item.merchandise.quantityAvailable <= parseInt(qty, 10)) {
			newQty = item.merchandise.quantityAvailable;
			lastStock = true;
		}
		setLastStockKey('');
		onUpdateCart(item, qty);
	}

	const onRemoveItem = (item: any, attributes: Array<any> = []) => {
		onDeleteLine(item.id, attributes);
	}

	const getId = (shopifyId: string) => {
		const arrString = shopifyId?.split('/');
		return arrString ? arrString[arrString.length - 1] : '';
	};

	const submitForm = async (e:any) => {
		e.preventDefault();
		try {
			trackEvent('cart_cta', {
				category: "Cart Drawer",
				target: "Checkout"
			});

			const cartId = cart.id.replace('gid://shopify/Cart/', '');
			const payload = {
				value: cart.totalAmount > 0 ? cart.totalAmount / 100 : 0,
				currency,
				contents: [],
				event_id: cartId,
			};

			cart.items.forEach((item) => {
				payload.contents.push({
					content_id: item.merchandise.sku,
					content_name: item.merchandise.title,
					price: parseFloat(item.merchandise.price.amount),
					quantity: item.quantity,
				});
			});

			tiktokEvent('InitiateCheckout', payload, user?.email);
			fbqEvent('track', 'InitiateCheckout');

		} catch(e) {
			console.log(e, 'error on submit checkout');
		}

		if (isAuthenticated) {
			try {
				const { token } = await fetch(`/api/oauth/multipass?return_to=${cart.checkoutUrl}`).then(e => e.json());
				if (token) {
					window.location.href = `https://${store !== 'us' ? `${store}-` : ''}cocoandeve.myshopify.com/account/login/multipass/${token}`;
				} else {
					window.location.href = cart.checkoutUrl;
				}
			} catch (e) {
				window.location.href = cart.checkoutUrl;
			}
		} else {
			window.location.href = cart.checkoutUrl;
		}
	}

	const onToggleManualGwp = async (id:any) => {
		await props.manualGwpSetting.toggleManualGwp(id, manualGwpSetting);
	}
	console.log('cart1', cart);

	return (
		<>
		<Modal className="modal-lg bg-white max-w-[26.875em]" isOpen={showCart} handleClose={() => props.handleClose()} cartDrawer={true}>
				<div className="modal-content mh-100 border-0 rounded-0">
					<div className="cart-drawer modal-body mobile-wrapper pt-0 px-0 relative overflow-y-auto overflow-x-hidden max-h-[100vh]">
						<div className="container flex flex-col align-stretch text-center pt-2 px-g lg:px-3">
							<h4 className="text-lg font-bold mb-1">{tStrings.cart_drawer_title}</h4>
							<button type="button" className="close text-body m-0 absolute top-0 right-0 px-g" onClick={props.handleClose} aria-label="Close" data-cy="cart-close-icon">
								<SvgClose className="svg w-[1em]" aria-hidden="true" />
							</button>

							{discountMeter && !discountMeter.enabled && shippingMeter
								&& shippingMeter.enabled
								&& cart.itemCount > 0
								&& (
									<CartShippingMeter
										target={shippingMeter.target}
										current={shippingMeter.current}
									/>
								)}
							{discountMeter && discountMeter.enabled && discountMeter
								&& discountMeter.enabled && cart.itemCount > 0 && (
								<CartDiscountMeter
									target={discountMeter.target}
									current={discountMeter.current}
									progressText={discountMeter.progressText}
								/>
							)}
							<hr className="w-full m-0" />
						</div>

						{loadingInit && (
							<div className="flex justify-center p-2">
								<div className="text-primary spinner-border" role="status" />
							</div>
						)}
						{!loadingInit && (!cart.itemCount || itemCount === 0 ? (
							<div className="pt-3 text-center">
								<div className="container px-g cart-empty-shop-cta">
									<p className="my-3 text-center">{tStrings.cart_empty}</p>
									<a href="/collections" className="bg-primary text-white hover:text-white hover:bg-primary-dark text-base inline-block align-middle text-center select-none border whitespace-no-wrap rounded py-1 px-2 leading-normal no-underline font-bold" data-cy="shop-all-btn">Shop all products</a>
								</div>
								<div className="cart-empty-discount-form container text-start hidden">
									<CartDiscountForm
										isApplied={cartData?.discountData?.isValid}
										isEmptyCart={itemCount === 0}
										code={cartData?.discountData?.code}
										discAmount={cartData?.discountData?.amount}
										isAutoDiscount={cartData?.discountData?.isAuto}
										error={cartData?.discountData?.error}
										onApply={onApplyDiscountCode}
										onRemove={onRemoveDiscountCode}
										appliedGiftCard={giftCardData}
										onRemoveGiftCard={onRemoveGiftCard}
										discountBanner={discountBanner}
									/>
								</div>
							</div>
						) : (
							// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
							<form
								id="cart-drawer-form"
								className="container px-g lg:px-3 cart-drawer__form"
								action={cart.checkoutUrl?.replace('www', 'us')}
								method="get"
								noValidate
								onKeyDown={handleKeyDown}
								onSubmit={submitForm}
							>
								<input type="hidden" name="checkout" value="Checkout" />

								<ul className="list-unstyled border-b-[1px] pb-0">
									{cart.items && cart.items.map((item) => {
										/* @ts-ignore */
										const cartItemComponent:any = <CartItem key={item.id} item={item}
											isLastStock={item.id === isLastStockKey}
											onChangeVariant={changeVariant}
											onChangeQuantity={onChangeQuantity}
											onRemoveItem={onRemoveItem}
											store={store}
											productId={parseInt(getId(item.merchandise.product.id))}
											productStock={item.merchandise.quantityAvailable}
										/>

										return !item.isManualGwp && cartItemComponent;
									})}
								</ul>

								{tSettings.cartRedemption.enabled && (
									<>
										<CartSwellRedemption cartData={cart} />
										<hr className="my-2"/>
									</>
								)}

								<CartDiscountForm
									isApplied={cartData?.discountData?.isValid}
									isEmptyCart={itemCount === 0}
									code={cartData?.discountData?.code}
									discAmount={cartData?.discountData?.amount}
									isAutoDiscount={cartData?.discountData?.isAuto}
									error={cartData?.discountData?.error}
									onApply={onApplyDiscountCode}
									onRemove={onRemoveDiscountCode}
									appliedGiftCard={giftCardData}
									onRemoveGiftCard={onRemoveGiftCard}
									discountBanner={discountBanner}
								/>
								<hr />

								<div className="flex flex-wrap mt-3 mb-2">
									<p className="w-2/3 mb-1 font-bold " data-cy="cart-subtotal-label">{tStrings.cart_subtotal}</p>
									<p className="w-1/3 mb-1 font-bold text-right" data-cy="cart-subtotal-value">{formatMoney(cart.subtotalPrice, false, store)}</p>

									{!combineDiscount && cart.discountBundleAmount > 0 && !isSwellDiscCode && (
										<>
											<p className="w-2/3 mb-1  font-bold " data-cy="cart-bundledisount-label">{tStrings.cart_bundle_discount}</p>
											<p className="w-1/3 mb-1 font-bold text-right" data-cy="cart-bundledisount-value">{`-${formatMoney(cart.discountBundleAmount, false, store)}`}</p>
										</>
									)}

									{!combineDiscount && ((!cart?.discountTier && cart.discountLine > 0 || cart?.discountTier && (cart.discountLine - cart?.discountTier > 0))) && !isSwellDiscCode && (
										<>
											<p className="w-2/3 mb-1  font-bold " data-cy="cart-discount-label">{tStrings.cart_discount}</p>
											<p className="w-1/3 mb-1 font-bold text-right" data-cy="cart-discount-value">{`-${formatMoney(discountMeter.enabled ? cart.discountLine - cart.discountTier : cart.discountLine, false, store)}`}</p>
										</>
									)}

									{combineDiscount && cart.discountCombineLine > 0 && !isSwellDiscCode && (
										<>
											<p className="w-2/3 mb-1  font-bold " data-cy="cart-discount-label">{tStrings.cart_discount}</p>
											<p className="w-1/3 mb-1 font-bold text-right" data-cy="cart-discount-value">{`-${formatMoney(cart.discountCombineLine, false, store)}`}</p>
										</>
									)}

									{discountMeter.enabled > 0 && cart?.discountTier > 0 && (
										<>
											<p className="w-2/3 mb-1  font-bold " data-cy="cart-discount-label">{discountMeter?.selectedTier?.text}</p>
											<p className="w-1/3 mb-1 font-bold text-right" data-cy="cart-discount-value">{`-${formatMoney(cart.discountTier, false, store)}`}</p>
										</>
									)}

									{isSwellDiscCode && (
										<>
											<p className="w-2/3 mb-1  font-bold ">Rewards</p>
											<p className="w-1/3 mb-1 font-bold text-right">{`-${formatMoney(cartData?.discountData?.amount, false, store)}`}</p>
										</>
									)}

									{giftCardAmount > 0 && (
										<>
											<p className="w-2/3 mb-1  font-bold ">{tStrings.giftCard}</p>
											<p className="w-1/3 mb-1 font-bold text-right">{`-${formatMoney(giftCardAmount, false, store)}`}</p>
										</>
									)}

									{shippingData?.show && !shippingLineHide && (
										<>
											<div className="flex lg:hidden justify-between w-full">
												<p className="mb-1" data-cy="cart-shipping-label">
													<strong>{`${tStrings.cart_shipping} `}</strong>
													<span className="text-sm">{`${shippingData?.freeRate && shippingData.freeRate.min_order_subtotal ? `(free standard shipping over ${formatMoney(parseFloat(shippingData.freeRate.min_order_subtotal) * 100, false, store)})` : ''}`}</span>
												</p>
												<p className={`mb-1 font-bold text-right ${shippingData.amount > 0 ? '' : 'text-primary'}`} data-cy="cart-shipping-value">{shippingData.amount > 0 ? formatMoney(shippingData.amount, false, store) : 'Free'}</p>
											</div>
										</>
									)}
									{!shippingData?.show && shippingData?.freeRate === null && (
										<>
										<div className="flex lg:hidden justify-between w-full">
											<p className="mb-1" data-cy="cart-shipping-label">
												<strong>{`${tStrings.cart_shipping} `}</strong>
											</p>
											<p className={`mb-1 font-bold text-right text-primary`} data-cy="cart-shipping-value">Calculated in Checkout</p>
										</div>
										</>
									)}

									{shippingData?.show && shippingData?.freeRate && (
										<p className="text-sm lg:hidden mb-1">
											Shipping amount shown is a best estimate and may differ from final amount charged.
										</p>
									)}
								</div>

								{manualGwpSetting && manualGwpSetting.enabled && (
									<>
										<hr />
										<CartManualGwp {...manualGwpSetting}
											onAddItem={onToggleManualGwp}
											onRemoveItem={onToggleManualGwp}
										/>
										<hr />
									</>
								)}

								{manualGwpSetting && !manualGwpSetting.enabled && <hr />}

								{/* @ts-ignore */}
								<CartExtras totalPrice={cart.totalAmount} store={store} setIsKlarnaOpen={setIsKlarnaOpen}/>
							</form>
						))}
					</div>

					{!loadingInit && cart.itemCount > 0 && (
						<div className="modal-footer px-g lg:px-3 py-2 fixed bottom-0 left-0 w-full bg-white border-t-[1px] border-gray-600">
							<div className="flex flex-wrap no-gutters w-full">
								<strong className="w-2/3 text-lg" data-cy="cart-total-label">{tStrings.cart_total}</strong>
								<strong className="w-1/3 text-lg text-right" data-cy="cart-total-value">{formatMoney(cart.totalAmount, false, store)}</strong>
								<div className="w-full mt-1">
									<a onClick={submitForm} className="btn w-full btn-lg btn-primary hover:text-white hover:!no-underline" href={cart.checkoutUrl}>{tStrings.cart_checkout}</a>
								</div>
							</div>
							{tStrings.cart_shipping_at_checkout !== '' && (
								<p className="w-full p-0 text-center mt-1" dangerouslySetInnerHTML={{ __html: tStrings.cart_shipping_at_checkout }} />
							)}
						</div>
					)}
				</div>
		</Modal>
		<KlarnaModal isModalKlarnaOpen={isModalKlarnaOpen} handleOpenModalKlarna={handleOpenModalKlarna} setIsKlarnaOpen={setIsKlarnaOpen}/>
		</>
	)
}

export default Cart;
