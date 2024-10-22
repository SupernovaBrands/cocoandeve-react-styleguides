// @ts-nocheck
import '~/config';
const tSettings = global.config.tSettings;

import React, {useState, useEffect} from 'react';
import Info from '~/images/icons/info.svg';
import AfterPayIcon from '~/images/icons/afterpay.svg';
import Script from 'next/script';

import {
	formatMoney,
} from '~/modules/utils';

const showInstallment = tSettings.payment.shoppay
	|| tSettings.payment.afterpay
	|| tSettings.payment.clearpay
	|| tSettings.payment.klarna;

const CartExtrass = (props:any) => {
	const [store] = useState(props.store);
	const [totalPrice, setTotalPrice] = useState(props.totalPrice);
	const [loading] = useState(false);
	const [showAfterpay, setShowAfterpay] = useState(false);
	const [showShoppay, setShowShoppay] = useState(false);
	const [showKlarna, setShowKlarna] = useState(false);
	const [klarnaIns, setKlarnaInst] = useState('');
	const [afterPayLoaded, setAfterPayLoaded] = useState(false);

	const afterpayLoaded = () => {
        const attributes2 = {
            locale: 'en_US',
            currency: 'USD',
            amount: parseFloat(totalPrice),
            introText: '',
            modalLinkStyle: 'learn-more-text',
            showWith: false,
            size: 'sm',
        };

        //@ts-ignore
        globalThis.window.Afterpay.createPlacements({
            targetSelector: '#cart-afterpay-line',
            attributes: attributes2,
        });
		setAfterPayLoaded(true);
    }

	useEffect(() => {
		if (['dev', 'au', 'ca'].includes(store)) {
			// setShowAfterpay(true);
		}
		if (['us'].includes(store)) {
			setShowShoppay(true);
		}

		if (['dev', 'eu', 'uk'].includes(store)) {
			setShowKlarna(true);
			const klarnaText = 'or [num] interest-free installments of <b>[amount]</b> by'
				.replace('[amount]', formatMoney(Math.ceil(totalPrice / 3), false, store))
				.replace('[num]', 3);
			setKlarnaInst(klarnaText);
		}
	}, [totalPrice]);

	useEffect(() => {
		setTotalPrice(props.totalPrice);
	}, [props.totalPrice]);

	return (
		<>
		{props.showTopHr && (showShoppay || showKlarna || showAfterpay) && <hr />}
		{showShoppay && (
			<div className="text-center font-size-sm border-top py-2" style={{ minHeight: '5.5em' }}>
				{!loading && (
					<span>
						<span>Pay in 4 interest-free installments for orders over <b>$50</b>  with</span>
						<img src="https://supernovabrands.github.io/cocoandeve-styleguides/images/logo-shoppay.svg" height="15px" className="inline-block align-baseline h-[14px] w-[59px] align-middle mb-px ml-[3px] mt-1px mr-1" alt="Shop pay logo"/>
					</span>
				)}
			</div>
		)}

		{showKlarna && (
			<>
				<p className="text-center font-size-sm border-top pt-2 flex items-center justify-center px-2 flex-wrap">
					<span className="block w-full" dangerouslySetInnerHTML={{ __html: klarnaIns }} />
					<img className="mr-hg h-[15px]" height="15" src="https://cdn.shopify.com/s/files/1/0073/5186/1332/t/75/assets/logo-klarna.svg?64921"alt="Klarna" loading="lazy" />
					<Info className="svg cursor-pointer" onClick={() => props.setIsKlarnaOpen(true)}/>
				</p>
			</>
		)}


		{showAfterpay && (
			<>
			<div className='text-center font-size-sm border-top py-2 flex items-center justify-center px-2 flex-wrap'>
				<span className='block w-full'>or 4 interest-free payments of {formatMoney(Math.round(((parseFloat(totalPrice) / 4) + Number.EPSILON)), false, store)} with </span>
				<div className="afterpay-content relative flex items-center">
					<button type="button" className='afterpay-logo brand-afterpay type-badge black-on-mint'>
						{/* <img src="https://supernovabrands.github.io/cocoandeve-styleguides/images/logo-afterpay.svg" height="15px" className="inline-block align-baseline w-[86px] mt-[5px]" alt="Afterpay logo"/> */}
						<AfterPayIcon className="w-[96px] bg-white"/>
					</button>
					<Info className="svg ml-hg cursor-pointer"/>
					<div id="cart-afterpay-line"></div>
					<Script id="afterpay-script" src="https://js.afterpay.com/afterpay-1.x.js" onLoad={afterpayLoaded}/>
				</div>
			</div>
			</>
		)}

		{!showInstallment && (
			<button type="submit" className="text-center w-100 bg-white border-0">
				<div className="cart-drawer__shopify-icon d-flex align-items-center justify-content-center">
					<img className="d-block mx-1" src="" width="112" alt="Shopify Icon" loading="lazy" />
				</div>

				{tSettings.cart_payment_icons && (
					<img className="d-block mx-auto my-2" src={tSettings.cart_payment_icons} width="240" alt="Payments" loading="lazy" />
				)}
			</button>
		)}
	</>

	)

}

export default CartExtrass;