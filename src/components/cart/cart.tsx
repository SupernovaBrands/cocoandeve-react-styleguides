import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import SvgClose from '~/images/icons/close.svg';
import CartShippingMeter from '~/components/cart/cart-shipping-meter';
import CartDiscountMeter from '~/components/cart/cart-discount-meter';
import CartDiscountForm from '~/components/cart/cart-discount-form';
import CartManualGwp from '~/components/cart/cart-manual-gwp';
import CartUpsell from '~/components/cart/cart-upsell';
import CartExtras from '~/components/cart/cart-extras';
import CartItem from "./cart-item";
import CartSwellRedemption from '~/components/swell/cart-swell-redemption';
import { formatMoney, getCookie } from "~/modules/utils";
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
	onDeleteLine: (lineId: any, attributes: Array<any>[]) => void;
	discountMeter?: any;
	shippingMeter?: any;
	shippingData?: any;
	handleDiscount?: any;
	manualGwpSetting?: any;
	cartUpsell?: any;
	addToCart?: ({}) => void;
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
		removeDiscount, shippingData, handleDiscount, manualGwpSetting, changeVariant, trackEvent, tiktokEvent, fbqEvent, currency, user, isAuthenticated, strapiCartSetting, cartUpsell, addToCart } = props;
	// const storeApi = new storefrontApi();
	// console.log(discountMeter, 'discountMeter');
	// const [loadingInit, setLoadingInit] = useState(props.isLoading);
	const [cart, setCart] = useState({
		id: '', items: [], lines: { edges: [] }, discountAllocations: [], discountCodes: [], buyerIdentity: {},
		discountBundleAmount: 0, checkoutUrl: '', discountCombineLine: 0, discountLine: 0, discountTier: 0, subtotalPrice: 0,
		totalAmount: 0, itemCount: 0, cost: {totalAmount: {amount: 0}}, combineDiscount: true,
	});

	const discountLabel = strapiCartSetting?.body?.cartGeneral?.drawer_discount || 'Discount';
	const bundleLabel = strapiCartSetting?.body?.cartGeneral?.drawer_bundle_discount || 'Bundle Savings';
	const manualGwpBuyItems = strapiCartSetting?.body?.manualGwp?.customer_buys || '';

	const [isLastStockKey, setLastStockKey] = useState('');

	const [combineDiscount, setCombineDiscount] = useState(cart.combineDiscount);
	const [isSwellDiscCode, setIsSwellDiscCode] = useState(false);

	const [giftCardData, setGiftCardData] = useState({});

	const [shippingLineHide, setShippingLineHide] = useState(false);
	const [giftCardAmount, setGiftCardAmount] = useState(0);
	const [isModalKlarnaOpen, setIsModalKlarnaOpen] = useState(false);
	const [invalidGiftsToDelete, setInvalidGiftsToDelete] = useState([]);

	const handleOpenModalKlarna = () => {
		setIsModalKlarnaOpen(false);
    }

	const setIsKlarnaOpen = (stateModal:boolean) => {
		setIsModalKlarnaOpen(stateModal);
	}

	useEffect(() => {
		if (cartData) {

			// validate for OOS item in cart
			// console.log('manualGwpBuyItems', manualGwpBuyItems);
			const gwpBuyItemInCarts = cartData.lines.filter((line: any) => manualGwpBuyItems.includes(line.merchandise.product.handle));
			if (gwpBuyItemInCarts.length === 0) {
				const manualGwpItems = cartData.lines.filter((line: any) => line.attributes.find((attribute: any) => attribute.key === '_campaign_type' && attribute.value === 'manual_gwp'));
				if (manualGwpItems.length > 0) {
					manualGwpItems.forEach((item: any) => {
						if (!invalidGiftsToDelete.find((invalidId) => invalidId.id === item.id) && manualGwpBuyItems !== '') {
							// if (manualGwpBuyItems !== '') manGwpIds.push(item.id);
							const newIdsToDel = [...invalidGiftsToDelete];
							newIdsToDel.push(item);
							setInvalidGiftsToDelete(newIdsToDel);
						}
					});
				}
			}
			const oosInCarts = cartData.lines.filter((line: any) => !line.merchandise.availableForSale);
			if (oosInCarts.length > 0) {
				oosInCarts.forEach((item: any) => {
					onRemoveItem(item, []);
				})
			}

			setCart({ ...cartData });
			setCombineDiscount(cartData.combineDiscount);
		}
	}, [cartData, itemCount]);

	console.log('cartUpsell1', cartUpsell);

	useEffect(() => {
		if (invalidGiftsToDelete.length > 0) {
			const manGwpIds = invalidGiftsToDelete.map((v) => v.id);
			if (manGwpIds.length > 0) onDeleteLine(manGwpIds, []);
		}
	}, [invalidGiftsToDelete.length]);

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

	const onChangeQuantity = async (item:any, qty:any, callback: any) => {
		let newQty = qty;
		let lastStock = false;
		if (item.merchandise.quantityAvailable <= parseInt(qty, 10)) {
			newQty = item.merchandise.quantityAvailable;
			lastStock = true;
		}
		setLastStockKey('');
		return await onUpdateCart(item, parseInt(qty));
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
		// console.log('toggle manual gwp');
		await props.manualGwpSetting.toggleManualGwp(id, manualGwpSetting);
	}

	// console.log('cart.tsx', cart);
	// const dates = {
	// 	// ca: '15th December',
	// 	// us: 'December 12',
	// 	uk: '19th December',
	// 	// eu: '10th December',
	// 	// au: '18th December',
	// 	// int: '17th December',
	// 	// my: '17th December',
	// 	// dev: 'December 12',
	// }

	// console.log('manualGwpSetting', manualGwpSetting);
	
	useEffect(() => {
		if (!manualGwpSetting) return;

		const maxAllowed = manualGwpSetting?.maxSelected;
		const currentGifts = cartData.lines.filter(line => line.isManualGwp);

		if (currentGifts.length > maxAllowed) {
			const giftsToRemove = currentGifts.slice(0, currentGifts.length - maxAllowed);
			giftsToRemove.forEach(gift => onRemoveItem(gift));
		}
	}, [cartData.items, manualGwpSetting]);

	useEffect(() => {
		if (!cartData?.lines) return;

		const paidItems = cartData.lines.filter((line: any) => !line.isManualGwp);
		const gwpItems = cartData.lines.filter((line: any) => line.isManualGwp);

		if (paidItems.length === 0 && gwpItems.length > 0) {
			const gwpIds = gwpItems.map((item: any) => item.id);
			onDeleteLine(gwpIds, []);
		}
	}, [cartData?.lines]);


	return (
		<>
		<Modal className="modal-lg bg-white max-w-[26.875em] !h-full" isOpen={showCart} handleClose={() => props.handleClose()} cartDrawer={true} backdropClasses="h-full">
				<div className="modal-content mh-100 border-0 rounded-0 flex flex-col h-full overflow-hidden">
					<div className="cart-drawer modal-body mobile-wrapper pt-0 px-0 relative overflow-y-auto overflow-x-hidden h-full">
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
								&& discountMeter.enabled && cart.itemCount > 0 && discountMeter.progressText !== '' && (
								<CartDiscountMeter
									items={cart.items}
									target={discountMeter.target}
									current={discountMeter.current}
									progressText={discountMeter.progressText}
									useQuantity={discountMeter.useQuantity}
								/>
							)}
						</div>

						{props.isLoading && (
							<div className="flex justify-center p-2">
								<div className="spinner-border" role="status" />
							</div>
						)}
						{!props.isLoading && (!cart.itemCount || itemCount === 0 ? (
							<>
							<div className="pt-3 text-center">
								<div className="container px-g cart-empty-shop-cta">
									<p className="mt-3 mb-[1.8rem] text-center">{tStrings.cart_empty}</p>
									<a href="/collections" className="shop--all-url bg-primary text-white !rounded-h hover:no-underline hover:text-white hover:bg-primary-dark text-base inline-block align-middle text-center select-none border whitespace-no-wrap rounded py-[8px] px-[29px] leading-normal no-underline font-bold" data-cy="shop-all-btn">Shop all products</a>
								</div>
								{/* <div className="cart-empty-discount-form container text-start hidden">
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
								</div> */}
							</div>

							{/* {manualGwpSetting && manualGwpSetting.enabled && (
								<div className="px-g lg:px-3 pt-3 hidden lg:block">
									<hr />
									<CartManualGwp {...manualGwpSetting}
										onAddItem={onToggleManualGwp}
										onRemoveItem={onToggleManualGwp}
										disableSelectItem={true}
									/>
								</div>
							)} */}
							</>
						) : (
							// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
							<form
								id="cart-drawer-form"
								className="container px-[16px] lg:px-3 cart-drawer__form pb-g"
								action={cart.checkoutUrl?.replace('www', 'us')}
								method="get"
								noValidate
								onKeyDown={handleKeyDown}
								onSubmit={submitForm}
							>
								<input type="hidden" name="checkout" value="Checkout" />

								<ul className="list-unstyled pb-0">
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
									{/* {dates[store] && (
										<li>
											<p className="text-sm mt-1 mb-2">Last chance for Christmas delivery — shop now before {dates[store]}.</p>
										</li>
									)} */}
								</ul>

								{manualGwpSetting && manualGwpSetting.enabled && (
									<>
										<CartManualGwp {...manualGwpSetting}
											maxSelected={manualGwpSetting?.maxSelected}
											tierMessage={manualGwpSetting?.tierMeta?.tierMessage}
											disableSelectItem={manualGwpSetting?.maxSelected === 0 ? true : false }
											onAddItem={onToggleManualGwp}
											onRemoveItem={onToggleManualGwp}
										/>
									</>
								)}

								{tSettings.cartRedemption.enabled && (
									<>
										<CartSwellRedemption cartData={cart} store={store} />
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
									cart={cartData}
								/>

								<div className="flex flex-wrap mt-4 mb-4 lg:mt-[60px] lg:mb-[50px]">
									<p className="w-2/3 mb-[5px] font-bold" data-cy="cart-subtotal-label">{tStrings.cart_subtotal}</p>
									<p className="w-1/3 mb-[5px] font-bold text-right" data-cy="cart-subtotal-value">{formatMoney(cart.subtotalPrice, false, store)}</p>

									{!combineDiscount && cart.discountBundleAmount > 0 && !isSwellDiscCode && (
										<>
											<p className="w-2/3 mb-[5px] font-bold" data-cy="cart-bundledisount-label">{bundleLabel}</p>
											<p className="w-1/3 mb-[5px] font-bold text-right" data-cy="cart-bundledisount-value">{`-${formatMoney(cart.discountBundleAmount, false, store)}`}</p>
										</>
									)}

									{!combineDiscount && (cart.discountLine) > 0 && !isSwellDiscCode && (
										<>
											<p className="w-2/3 mb-[5px] font-bold" data-cy="cart-discount-label">{discountLabel}</p>
											<p className="w-1/3 mb-[5px] font-bold text-right" data-cy="cart-discount-value">{`-${formatMoney(cart.discountLine, false, store)}`}</p>
										</>
									)}

									{discountMeter.enabled > 0 && cart?.discountTier > 0 && (
										<>
											<p className="w-2/3 mb-[5px] font-bold" data-cy="cart-tier-discount-label">{discountMeter?.selectedTier?.text}</p>
											<p className="w-1/3 mb-[5px] font-bold text-right" data-cy="cart-tier-discount-value">{`-${formatMoney(cart.discountTier, false, store)}`}</p>
										</>
									)}

									{combineDiscount && cart.discountCombineLine > 0 && !isSwellDiscCode && (
										<>
											<p className="w-2/3 mb-[5px] font-bold" data-cy="cart-discount-combine-label">{discountLabel}</p>
											<p className="w-1/3 mb-[5px] font-bold text-right" data-cy="cart-discount-combine-value">{`-${formatMoney(cart.discountCombineLine, false, store)}`}</p>
										</>
									)}

									{isSwellDiscCode && (
										<>
											<p className="w-2/3 mb-[5px]  font-bold ">Rewards</p>
											<p className="w-1/3 mb-[5px] font-bold text-right">{`-${formatMoney(cartData?.discountData?.amount, false, store)}`}</p>
										</>
									)}

									{giftCardAmount > 0 && (
										<>
											<p className="w-2/3 mb-[5px]  font-bold ">{tStrings.giftCard}</p>
											<p className="w-1/3 mb-[5px] font-bold text-right">{`-${formatMoney(giftCardAmount, false, store)}`}</p>
										</>
									)}

									{shippingData?.show && (
										<>
											<>
												<p className="hidden lg:flex w-2/3 mb-1  font-bold" data-cy="cart-shipping-label">{tStrings.cart_shipping}</p>
												<p className={`hidden lg:flex w-1/3 mb-1 font-bold text-end justify-end ${shippingData.amount > 0 ? '' : 'text-primary'}`} data-cy="cart-shipping-value">{shippingData.amount > 0 ? formatMoney(shippingData.amount, false, store) : 'Free'}</p>
											</>
											<div className="flex lg:hidden justify-between w-full">
												<p className="mb-1" data-cy="cart-shipping-label">
													<strong>{`${tStrings.cart_shipping} `}</strong>
													<span className="text-sm block mt-25">{`${shippingData?.freeRate && shippingData.freeRate.min_order_subtotal ? `(free standard shipping over ${formatMoney(parseFloat(shippingData.freeRate.min_order_subtotal) * 100, false, store)})` : ''}`}</span>
												</p>
												<p className={`mb-1 font-bold text-end justify-end ${shippingData.amount > 0 ? '' : 'text-primary'}`} data-cy="cart-shipping-value">{shippingData.amount > 0 ? formatMoney(shippingData.amount, false, store) : 'Free'}</p>
											</div>
										</>
									)}
									{!shippingData?.show && shippingData?.freeRate === null && (
										<>
										<div className="flex justify-between w-full">
											<p className="mb-1" data-cy="cart-shipping-label">
												<strong>{`${tStrings.cart_shipping} `}</strong>
											</p>
											<p className={`mb-1 font-bold text-right text-primary`} data-cy="cart-shipping-value">Calculated in Checkout</p>
										</div>
										</>
									)}
								</div>

								{cartUpsell && cartUpsell.enable && cartUpsell.items.length > 0 && (
									<CartUpsell {...cartUpsell} addToCart={addToCart} store={store}></CartUpsell>
								)}

								<div className="w-full">
									<img src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/services_fb7e577e-8eb1-44b2-819b-c883a1c87b74.png?v=1772005423"/>
								</div>

								<div className="w-full shopify-secure flex justify-center py-2 items-center">
									<svg xmlns="http://www.w3.org/2000/svg" width="114" height="34" viewBox="0 0 114 34" fill="none">
									<g clip-path="url(#clip0_11569_23596)">
										<path d="M6 0H108C110.762 0 113 1.586 113 3.542V30.458C113 32.414 110.762 34 108 34H6C3.239 34 1 32.414 1 30.458V3.542C1 1.586 3.239 0 6 0Z" fill="white"/>
										<path d="M5.54 0H108.46C110.967 0 113 1.458 113 3.255V30.745C113 32.542 110.967 34 108.46 34H5.54C3.034 34 1 32.542 1 30.745V3.255C1 1.458 3.033 0 5.54 0Z" stroke="#D2D0CC"/>
										<path d="M62.262 12.39C62.6084 12.5294 62.9109 12.7596 63.1377 13.0562C63.3645 13.3529 63.5073 13.7051 63.551 14.076C63.551 15.483 62.391 16.262 60.773 16.262C60.1538 16.2791 59.5413 16.1292 59 15.828L59.443 14.574C59.899 14.808 60.402 14.94 60.917 14.961C61.425 14.961 61.699 14.693 61.699 14.359C61.699 14.04 61.503 13.825 60.956 13.516C60.63 13.3776 60.3475 13.1536 60.1385 12.8677C59.9296 12.5818 59.8019 12.2446 59.769 11.892C59.769 10.652 60.858 9.768 62.429 9.768C62.9526 9.71577 63.4801 9.81834 63.946 10.063L63.528 11.317C63.1729 11.165 62.7921 11.0822 62.406 11.073C61.898 11.073 61.572 11.304 61.572 11.661C61.572 11.943 61.806 12.146 62.262 12.39ZM68.702 9.755C69.642 9.755 70.178 10.358 70.178 11.357C70.1695 11.7441 70.1259 12.1297 70.048 12.509L69.343 16.159H67.543L68.221 12.625C68.273 12.368 68.301 12.107 68.301 11.844C68.301 11.459 68.146 11.19 67.742 11.19C67.168 11.19 66.555 11.91 66.321 13.072L65.721 16.159H63.922L65.669 7.129H67.465L66.775 10.678L66.801 10.691C67.0282 10.4026 67.3172 10.1689 67.6467 10.0071C67.9762 9.84523 68.3379 9.75943 68.705 9.756L68.702 9.755ZM74.25 9.756C74.3464 9.75252 74.4429 9.75486 74.539 9.763C75.832 9.868 76.792 10.973 76.683 12.227C76.683 14.417 75.248 16.287 73.123 16.287C73.023 16.292 72.921 16.29 72.819 16.283C71.519 16.183 70.545 15.079 70.649 13.816C70.649 11.676 72.083 9.756 74.247 9.756H74.25ZM73.363 14.93C74.316 14.93 74.85 13.269 74.847 12.177C74.847 11.656 74.639 11.114 74 11.114C73.021 11.114 72.487 12.766 72.487 13.777C72.487 14.417 72.747 14.93 73.361 14.93H73.363ZM81.291 9.76C82.608 9.76 83.143 10.822 83.143 12.013C83.143 14.164 81.761 16.289 79.648 16.289C79.2819 16.3042 78.918 16.2243 78.592 16.057H78.553L78.057 18.669H76.258L77.511 12.203C77.658 11.425 77.78 10.643 77.875 9.858H79.463L79.359 10.806H79.385C79.6019 10.4977 79.8861 10.2429 80.2162 10.061C80.5463 9.87905 80.9136 9.77475 81.29 9.756L81.291 9.76ZM79.568 14.955C80.574 14.955 81.264 13.329 81.264 12.189C81.264 11.715 81.094 11.216 80.546 11.216C79.923 11.216 79.334 11.947 79.125 13.048L78.825 14.699C79.033 14.869 79.296 14.959 79.568 14.955ZM85.708 7.22L85.798 7.221C85.9089 7.22587 86.0178 7.25261 86.1183 7.29967C86.2189 7.34673 86.3092 7.4132 86.384 7.49524C86.4588 7.57729 86.5166 7.6733 86.5542 7.77777C86.5918 7.88224 86.6084 7.9931 86.603 8.104V8.17C86.585 8.718 86.114 9.147 85.552 9.129H85.526C85.4106 9.13323 85.2957 9.11292 85.1887 9.06943C85.0818 9.02593 84.9853 8.96024 84.9056 8.87669C84.8259 8.79313 84.7649 8.69362 84.7265 8.58473C84.6881 8.47584 84.6733 8.36004 84.683 8.245V8.235C84.6843 7.96465 84.7929 7.70589 84.9849 7.51556C85.1769 7.32524 85.4377 7.21893 85.708 7.22ZM84.405 9.896H86.212L84.99 16.16H83.197L84.405 9.896ZM90.799 9.886L90.552 11.216H89.312L88.361 16.159H86.561L87.513 11.217H86.679L86.938 9.884H87.774L87.826 9.59C87.9308 8.82298 88.2996 8.11647 88.869 7.592C89.3676 7.19366 89.9911 6.98465 90.629 7.002C90.964 6.987 91.296 7.04 91.608 7.158L91.256 8.541C91.0703 8.48207 90.8768 8.45172 90.682 8.451C90.082 8.451 89.717 8.989 89.613 9.591L89.548 9.885L90.799 9.886ZM95.129 9.894H97L94.796 14.531C94.2254 15.832 93.4261 17.0202 92.436 18.039C91.9383 18.4984 91.3353 18.8285 90.68 19L90.19 17.501C90.551 17.3848 90.8929 17.2164 91.205 17.001C91.6125 16.7312 91.9488 16.3669 92.185 15.939C92.2113 15.8953 92.2282 15.8466 92.2347 15.796C92.2413 15.7454 92.2373 15.694 92.223 15.645L91.14 9.895H93.032C93.032 9.895 93.44 13.708 93.474 14.198H93.498C94.004 12.68 95.128 9.899 95.128 9.899L95.129 9.894ZM67.89 25.238C67.8878 25.2952 67.8831 25.3522 67.876 25.409C67.762 26.402 66.917 27.106 65.99 26.983C65.008 27.086 64.127 26.337 64 25.289L64.976 25.151L64.977 25.209C65.013 25.772 65.468 26.199 65.994 26.159C66.0199 26.1627 66.0459 26.165 66.072 26.166C66.512 26.178 66.877 25.807 66.889 25.336C66.889 24.808 66.625 24.596 65.844 24.392C64.711 24.108 64.163 23.651 64.163 22.633C64.163 21.681 64.861 21.013 65.95 21.013C66.836 20.899 67.644 21.559 67.776 22.503L66.829 22.641C66.779 22.165 66.389 21.815 65.943 21.843C65.41 21.843 65.125 22.117 65.125 22.553C65.125 23 65.319 23.211 66.132 23.423C67.228 23.707 67.89 24.106 67.89 25.238ZM69.179 26.913V21.083H72.388V21.955H70.193V23.5H71.966V24.327H70.193V26.044H72.506V26.916H69.178L69.179 26.913ZM77.853 25.092C77.71 26.205 76.805 27.024 75.757 26.988C74.3 26.988 73.459 25.962 73.459 24.301V23.691C73.4516 23.6089 73.4483 23.5264 73.449 23.444C73.459 22.091 74.492 21.001 75.757 21.013C76.787 20.917 77.701 21.725 77.807 22.828L76.785 22.974C76.783 22.367 76.32 21.877 75.754 21.88C75.002 21.88 74.521 22.522 74.521 23.67V24.302C74.521 25.458 74.972 26.092 75.761 26.092C76.361 26.076 76.851 25.578 76.899 24.938L77.853 25.092ZM83.048 21.082V24.787C83.066 24.947 83.068 25.107 83.048 25.267C82.926 26.347 82.01 27.117 81.003 26.985C80.8635 27.0025 80.7225 27.0025 80.583 26.985C79.597 26.858 78.891 25.897 79.01 24.837V21.082H80.036V24.775C80.036 25.704 80.313 26.102 81.017 26.102C81.691 26.102 82.028 25.744 82.028 24.726V21.086L83.048 21.082ZM84.535 21.084H86.362C87.545 21.084 88.282 21.598 88.282 22.748V22.87C88.324 23.578 87.872 24.21 87.223 24.353L88.559 26.918H87.46L86.238 24.528H85.551V26.918H84.535V21.084ZM86.345 23.753C86.953 23.753 87.269 23.477 87.269 22.882V22.768C87.269 22.157 86.931 21.938 86.353 21.938H85.549V23.757L86.345 23.753ZM89.672 21.083H92.88V21.953H90.685V23.497H92.458V24.322H90.685V26.032H93V26.903H89.672V21.083Z" fill="black"/>
										<path d="M31.768 10.043C31.78 10.15 34 25.608 34 25.608L28.556 27L16 24.764C16 24.764 17.498 12.835 17.553 12.416C17.628 11.859 17.646 11.842 18.219 11.656L20.164 11.036C20.3414 9.98621 20.7182 8.9801 21.274 8.07201C22.073 6.76701 23.056 6.03201 24.044 6.00201C24.3009 5.98684 24.5577 6.03467 24.7919 6.14133C25.0261 6.24799 25.2308 6.41025 25.388 6.61401C25.442 6.61001 25.494 6.60401 25.548 6.60401C25.9464 6.61967 26.3317 6.75066 26.6571 6.98107C26.9825 7.21149 27.2339 7.53142 27.381 7.90201C27.499 8.13801 27.597 8.38602 27.672 8.64002L28.282 8.44601C28.3555 8.4192 28.4345 8.41048 28.5121 8.42057C28.5897 8.43067 28.6638 8.45929 28.728 8.50401L30.062 9.84201C30.062 9.84201 31.514 9.86402 31.587 9.87102C31.6317 9.87503 31.6738 9.89398 31.7065 9.92481C31.7391 9.95565 31.7604 9.99658 31.767 10.041L31.768 10.043ZM27.034 8.84001C26.876 8.31902 26.512 7.44602 25.769 7.30001C25.969 7.89502 26.069 8.52001 26.067 9.15001L27.034 8.84001ZM25.412 9.36001C25.4383 8.68476 25.3274 8.0112 25.086 7.38001C24.8135 7.50553 24.5708 7.68755 24.374 7.91401C23.8624 8.5276 23.5002 9.25162 23.316 10.029L25.412 9.36001ZM24.066 6.67301C22.544 6.72101 21.21 9.17902 20.87 10.817L22.592 10.267C22.7723 9.23224 23.2205 8.26274 23.892 7.45501C24.112 7.20601 24.372 6.99801 24.66 6.83902C24.4843 6.72325 24.2762 6.66651 24.066 6.67701V6.67301Z" fill="#95BF47"/>
										<path d="M31.782 9.403C31.315 9.39132 30.848 9.38198 30.381 9.375C29.68 9.365 29.265 8.196 29.155 8.079C29.1135 8.03629 29.059 8.00851 29 8V26L34 24.652C34 24.652 31.96 9.672 31.95 9.566C31.9454 9.52364 31.9265 9.48409 31.8966 9.45378C31.8666 9.42346 31.8273 9.40416 31.785 9.399L31.782 9.403Z" fill="#5E8E3E"/>
										<path d="M26 12.24L25.389 14.706C24.9208 14.496 24.4095 14.4001 23.897 14.426C22.709 14.509 22.697 15.316 22.709 15.516C22.773 16.621 25.469 16.862 25.619 19.449C25.739 21.483 24.616 22.875 23.004 22.984C22.4532 23.0331 21.8983 22.96 21.379 22.7699C20.8597 22.5797 20.3888 22.2772 20 21.884L20.41 20.002C20.9574 20.4603 21.6297 20.7439 22.34 20.816C22.763 20.804 23.096 20.428 23.084 19.977L23.082 19.937C22.997 18.497 20.804 18.582 20.665 16.217C20.548 14.225 21.761 12.207 24.438 12.024C24.9673 11.9577 25.5046 12.0308 25.997 12.236L26 12.24Z" fill="white"/>
										<path d="M45 29H46V6H45V29Z" fill="#D2D0CC"/>
									</g>
									<defs>
										<clipPath id="clip0_11569_23596">
										<rect width="114" height="34" fill="white"/>
										</clipPath>
									</defs>
									</svg>
								</div>
								<div className="w-full payment-secure flex justify-center pb-2 items-center">
									<img className="w-[240px]" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/image_36.png?v=1772007208" />
								</div>

								{/* @ts-ignore */}
								<CartExtras totalPrice={cart.totalAmount} store={store} setIsKlarnaOpen={setIsKlarnaOpen} showTopHr={manualGwpSetting && !manualGwpSetting.enabled}/>
							</form>
						))}
					</div>

					{!props.isLoading && cart.itemCount > 0 && (
						<div className="modal-footer px-g lg:px-3 py-2 bottom-0 left-0 w-full bg-white border-t-[1px] border-gray-600 justify-end">
							<div className="flex flex-wrap no-gutters w-full">
								<strong className="w-2/3 text-lg" data-cy="cart-total-label">{tStrings.cart_total}</strong>
								<strong className="w-1/3 text-lg text-right" data-cy="cart-total-value">{formatMoney(cart.totalAmount, false, store)}</strong>
								<div className="w-full mt-1">
									<a onClick={submitForm} className="btn w-full btn-lg btn-primary hover:text-white hover:!no-underline py-[13px] border-[2px] border-primary hover:border-primary checkout-url" href={cart.checkoutUrl}>{tStrings.cart_checkout}</a>
								</div>
							</div>
							{['us','ca'].includes(store) && (
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
