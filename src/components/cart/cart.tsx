// @ts-nocheck
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
import Button from "../Button";
// import storefrontApi from "~/modules/storefront-api";
import { getCart } from '../../modules/shopify/cart';
import { CartData } from "./types";

const tSettings = global.config.tSettings;
const tStrings = global.config.tStrings;

interface Props {
    showCart: boolean;
    handleClose: () => void;
}

const Cart: React.FC<Props> = (props) => {
	// const storeApi = new storefrontApi();
	const [isOpen, setOpen] = useState(props.showCart);
	const [itemCount, setItemCount] = useState(0);
	const [loadingInit, setLoadingInit] = useState(true);
	const [cart, setCart] = useState({
		items: [], lines: { edges: [] }, discountAllocations: [], discountCodes: [], buyerIdentity: {},
		discountBundleAmount: 0, checkoutUrl: '', discountCombineLine: 0, discountLine: 0, subtotalPrice: 0,
		totalAmount: 0,
	});
	const [isLastStockKey, setLastStockKey] = useState('');
	const [giftCardData, setGiftCardData] = useState({});
	const [discountData, setDiscountData] = useState({
		isValid: false, code: '', amount: '0', isAuto: false, error: '', errorExtra: true,
	});

	const [loadingDiscount, setLoadingDiscount] = useState(false);
	const [manualGwp, setManualGwp] = useState({...tSettings.manualGwp, selectedKey: []});

	const [combineDiscount, setCombineDiscount] = useState(false);
	const [loadingManualGwp, setloadingManualGwp] = useState({
		loading: true,
		id: 12345,
	});
	const [isSwellDiscCode, setIsSwellDiscCode] = useState(false);
	const [discountMeter, setDiscountMeter] = useState({
		enabled: false,
		target: 100,
		current: 50,
		progressText: 'Progress discount meter'
	})

	const [shippingMeter, setShippingMeter] = useState({
		target: 100,
		current: 50,
		enabled: true,
	});

	const [shippingLineHide, setShippingLineHide] = useState(false);
	const [shippingData, setShippingData] = useState({
		show: true, amount: 0, freeRate: 100,
	});
	const [giftCardAmount, setGiftCardAmount] = useState(0);

	useEffect(() => {
		setLoadingInit(true);
		getCart().then((e: CartData) => {
			const { discountData, shippingData, shippingMeter, discountMeter } = e;
			setCart(e);
			discountData.code = discountData.code === null ? '' : discountData.code;
			shippingMeter.enabled = true;
			// setShippingData({...shippingData});
			setDiscountData({...discountData});
			setDiscountMeter({...discountMeter});
			setShippingMeter({...shippingMeter});
			setItemCount(e.totalQuantity);
			setLoadingInit(false);
		});
	}, []);


	useEffect(() => {
		setOpen(props.showCart);
	}, [props.showCart])

	const onApplyDiscountCode = () => {

	}

	const onRemoveDiscountCode = () => {

	}

	const onRemoveGiftCard = () => {

	}

	const handleKeyDown = () => {

	}

	const onChangeVariant = () => {

	}

	const onChangeQuantity = () => {

	}

	const onRemoveItem = () => {

	}

	const getId = (shopifyId: string) => {
		const arrString = shopifyId.split('/');
		return arrString[arrString.length - 1];
	};

	const submitForm = () => {

	}

	const onToggleManualGwp = () => {

	}

	return (
		<Modal className="modal-lg bg-white max-w-[26.875em]" isOpen={isOpen} handleClose={() => props.handleClose()} cartDrawer={true}>
				<div className="modal-content mh-100 border-0 rounded-0">
					<div className="cart-drawer modal-body mobile-wrapper pt-0 px-0 relative overflow-y-auto overflow-x-hidden max-h-[100vh]">
						<div className="container flex flex-col align-stretch text-center pt-2 px-g lg:px-3">
							<h4 className="text-lg font-bold ">{tStrings.cart_drawer_title}</h4>
							<button type="button" className="close text-body m-0 absolute top-0 right-0 px-g" onClick={props.handleClose} aria-label="Close" data-cy="cart-close-icon">
								<SvgClose className="svg w-[1em]" aria-hidden="true" />
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
							<hr className="w-full m-0 my-1" />
						</div>

						{loadingInit && (
							<div className="flex justify-center p-2">
								<div className="text-primary spinner-border" role="status" />
							</div>
						)}

						{!loadingInit && (itemCount === 0 ? (
							<div className="pt-3 text-center">
								<div className="container px-g cart-empty-shop-cta">
									<p className="my-3 text-center">{tStrings.cart_empty}</p>
									<a href="/collections" className="bg-primary text-white hover:text-white hover:bg-primary-dark text-base inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-2 leading-normal no-underline" data-cy="shop-all-btn">Shop all products</a>
								</div>
								<div className="cart-empty-discount-form container text-start hidden">
									<CartDiscountForm
										isApplied={discountData.isValid}
										isEmptyCart={itemCount === 0}
										code={discountData.code}
										discAmount={discountData.amount}
										isAutoDiscount={discountData.isAuto}
										loading={loadingDiscount}
										error={discountData.error}
										errorExtra={discountData.errorExtra}
										onApply={onApplyDiscountCode}
										onRemove={onRemoveDiscountCode}
										appliedGiftCard={giftCardData}
										onRemoveGiftCard={onRemoveGiftCard}
									/>
								</div>
							</div>
						) : (
							// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
							<form
								id="cart-drawer-form"
								className="container px-g lg:px-3 cart-drawer__form"
								action={cart.checkoutUrl.replace('www', 'us')}
								method="get"
								noValidate
								onKeyDown={handleKeyDown}
							>
								<input type="hidden" name="checkout" value="Checkout" />

								<ul className="list-unstyled border-b-[1px] pb-1">
									{cart.items && cart.items.map((item) => !item.isManualGwp && (
										<CartItem
											key={item.id}
											item={item}
											isLastStock={item.id === isLastStockKey}
											onChangeVariant={onChangeVariant}
											onChangeQuantity={onChangeQuantity}
											onRemoveItem={onRemoveItem}
											productId={parseInt(getId(item.merchandise.product.id))}
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
											onAddItem={onToggleManualGwp}
											onRemoveItem={onToggleManualGwp}
											loading={loadingManualGwp.loading}
											processingId={loadingManualGwp.id}
										/>
										<hr />
									</>
								)}

								{tSettings.cartRedemption.enabled && (
									<>
										<CartSwellRedemption cartData={cart} />
										<hr className="my-2"/>
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
									onApply={onApplyDiscountCode}
									onRemove={onRemoveDiscountCode}
									appliedGiftCard={giftCardData}
									onRemoveGiftCard={onRemoveGiftCard}
								/>
								<hr />

								<div className="flex flex-wrap mt-2 mb-1">
									<p className="w-2/3 mb-1 font-bold " data-cy="cart-subtotal-label">{tStrings.cart_subtotal}</p>
									<p className="w-1/3 mb-1 font-bold text-right" data-cy="cart-subtotal-value">{formatMoney(cart.subtotalPrice, true)}</p>

									{!combineDiscount && cart.discountBundleAmount > 0 && !isSwellDiscCode && (
										<>
											<p className="w-2/3 mb-1  font-bold " data-cy="cart-bundledisount-label">{tStrings.cart_bundle_discount}</p>
											<p className="w-1/3 mb-1 font-bold text-right" data-cy="cart-bundledisount-value">{`-${formatMoney(cart.discountBundleAmount, true)}`}</p>
										</>
									)}

									{!combineDiscount && cart.discountLine > 0 && !isSwellDiscCode && (
										<>
											<p className="w-2/3 mb-1  font-bold " data-cy="cart-discount-label">{tStrings.cart_discount}</p>
											<p className="w-1/3 mb-1 font-bold text-right" data-cy="cart-discount-value">{`-${formatMoney(cart.discountLine, true)}`}</p>
										</>
									)}

									{combineDiscount && cart.discountCombineLine > 0 && !isSwellDiscCode && (
										<>
											<p className="w-2/3 mb-1  font-bold " data-cy="cart-discount-label">{tStrings.cart_discount}</p>
											<p className="w-1/3 mb-1 font-bold text-right" data-cy="cart-discount-value">{`-${formatMoney(cart.discountCombineLine, true)}`}</p>
										</>
									)}

									{isSwellDiscCode && (
										<>
											<p className="w-2/3 mb-1  font-bold ">Rewards</p>
											<p className="w-1/3 mb-1 font-bold text-right">{`-${formatMoney(discountData.amount, true)}`}</p>
										</>
									)}

									{shippingData.show && !shippingLineHide && (
										<>
											<p className="hidden lg:block w-2/3 mb-1  font-bold " data-cy="cart-shipping-label">{tStrings.cart_shipping}</p>
											<p className={`hidden lg:block w-1/3 mb-1 font-bold text-right ${shippingData.amount > 0 ? '' : 'text-primary'}`} data-cy="cart-shipping-value">{shippingData.amount > 0 ? formatMoney(shippingData.amount, true) : 'Free'}</p>
										</>
									)}

									{shippingData.show && !shippingLineHide && (
										<>
											<div className="flex lg:hidden justify-between w-full">
												<p className="mb-1" data-cy="cart-shipping-label">
													<strong>{`${tStrings.cart_shipping} `}</strong>
												</p>
												<p className={`mb-1 font-bold text-right ${shippingData.amount > 0 ? '' : 'text-primary'}`} data-cy="cart-shipping-value">{shippingData.amount > 0 ? formatMoney(shippingData.amount, true) : 'Free'}</p>
											</div>
										</>
									)}

									{giftCardAmount > 0 && (
										<>
											<p className="w-2/3 mb-1  font-bold ">{tStrings.giftCard}</p>
											<p className="w-1/3 mb-1 font-bold text-right">{`-${formatMoney(giftCardAmount, true)}`}</p>
										</>
									)}
								</div>

								<hr />

								<CartExtras totalPrice={cart.totalAmount} />
							</form>
						))}
					</div>

					{!loadingInit && itemCount > 0 && (
						<div className="modal-footer px-g lg:px-3 py-2 fixed bottom-0 left-0 w-full bg-white border-t-[1px] border-gray-600">
							<div className="flex flex-wrap no-gutters w-full">
								<strong className="w-2/3 text-lg" data-cy="cart-total-label">{tStrings.cart_total}</strong>
								<strong className="w-1/3 text-lg text-right" data-cy="cart-total-value">{formatMoney(cart.totalAmount, true)}</strong>
								<div className="w-full mt-1">
									<Button buttonClass="btn-primary w-full"
										disabled={loadingDiscount || manualGwp.loading}
										onClick={submitForm}
										data-cy="checkout-btn"
										>
										{tStrings.cart_checkout}
									</Button>
								</div>
							</div>
							{tStrings.cart_shipping_at_checkout !== '' && (
								<p className="w-full p-0 text-center mt-1" dangerouslySetInnerHTML={{ __html: tStrings.cart_shipping_at_checkout }} />
							)}
						</div>
					)}
				</div>
		</Modal>
	)
}

export default Cart;