/* global tSettings tStrings assetUrl */
import '@/config';
// import dynamic from 'next/dynamic';
const tSettings = global.config.tSettings;
const tStrings = global.config.tStrings;

import React from 'react';
import PropTypes from 'prop-types';

import {
	formatMoney,
	assetUrl,
} from '@/modules/utils';

import SvgDelivery from '@/images/icons/fast-delivery.svg';
import SvgAwards from '@/images/icons/winner-award.svg';
import SvgMoneyback from '@/images/icons/moneyback.svg';
import SvgMoneybackPounds from '@/images/icons/moneyback-pounds.svg';
import SvgMoneybackEur from '@/images/icons/moneyback-eur.svg';
// const { assetUrl, formatMoney } = dynamic(() => import('@/modules/utils'), {
//     ssr: false,
// });

let currency;
let locale;
if (tSettings.payment.afterpay) {
	currency = 'USD';
	locale = 'en_US';
	if (tSettings.store === 'au') {
		currency = 'AUD';
		locale = 'en_AU';
	} else if (tSettings.store === 'ca') {
		currency = 'CAD';
		locale = 'en_CA';
	}
} else if (tSettings.payment.clearpay) {
	currency = 'GBP';
	locale = 'en_GB';
}

const showInstallment = tSettings.payment.shoppay
	|| tSettings.payment.afterpay
	|| tSettings.payment.clearpay
	|| tSettings.payment.klarna;

export default class CartExtras extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			totalPrice: props.totalPrice,
			loading: false,
		};

		/*
		$('#modal-klarna').on('show.bs.modal', function () {
			$('body').addClass('show-modal-klarna');
		});

		$('#modal-klarna').on('hidden.bs.modal', function () {
			if ($('.cart-drawer').hasClass('show')) {
				$('body').removeClass('show-modal-klarna').addClass('modal-open');
			} else {
				$('body').removeClass('show-modal-klarna');
			}
		});
		*/
	}

	componentDidMount() {
		if (this.afterpayRef) {
			this.injectCss();
		}
	}

	componentDidUpdate() {
		if (this.afterpayRef) {
			this.injectCss();
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.totalPrice !== prevState.totalPrice) {
			return {
				totalPrice: nextProps.totalPrice,
				loading: true,
			};
		}

		return null;
	}

	injectCss = () => {
		if (!this.afterpayRef.shadowRoot) return;
		const toBeInjected = '.afterpay-logo-badge-background { display: none; } .afterpay-logo-badge-lockup { transform: scale(1.2); transform-origin: center; } .afterpay-logo { margin-top: -2px !important; margin-bottom: 0 !important; } .afterpay-logo-link { display: block; }';
		const existing = this.afterpayRef.shadowRoot.querySelector('style').innerHTML;
		if (!existing.includes(toBeInjected)) {
			this.afterpayRef.shadowRoot.querySelector('style').innerHTML = existing + toBeInjected;
		}

		const apLink = this.afterpayRef.shadowRoot.querySelector('.afterpay-link');
		apLink.setAttribute('data-cy', 'afterpay-icon');
	}

	render() {
		const { totalPrice, loading } = this.state;
		const klarnaIns = tStrings.cart_installment_by
			.replace('[amount]', formatMoney(Math.ceil(totalPrice / tSettings.payment.klarna_installment)))
			.replace('[num]', tSettings.payment.klarna_installment);

		// Hack for Shop Pay message rerender
		if (loading) {
			setTimeout(() => {
				this.setState({ loading: false });
			}, 300);
		}

		const showAfterpay = (tSettings.payment.afterpay || tSettings.payment.clearpay);
		const showShoppay = tSettings.payment.shoppay;
		const showKlarna = tSettings.payment.klarna;

		return (
			<>
				{/* <ul className="cart-drawer__services list-unstyled row mt-3 my-4 text-center">
					{tSettings.cartServices.map((t, index) => (
						<li key={t} className={`col-4 d-flex flex-column ${tSettings.cartServicesIcon[index] === 'awards' ? 'px-0' : ''} `}>
							{(
								<>
									{tSettings.cartServicesIcon[index] === 'delivery' && <SvgDelivery className="svg text-secondary px-2" />}
									{tSettings.cartServicesIcon[index] === 'awards' && <SvgAwards className="svg text-secondary px-2" />}
									{tSettings.cartServicesIcon[index] === 'moneyback' && !['eu', 'de', 'fr', 'uk'].includes(tSettings.store) && <SvgMoneyback className="svg text-secondary px-2" />}
									{tSettings.cartServicesIcon[index] === 'moneyback' && ['eu', 'de', 'fr'].includes(tSettings.store) && <SvgMoneybackEur className="svg text-secondary px-2" />}
									{tSettings.cartServicesIcon[index] === 'moneyback' && tSettings.store === 'uk' && <SvgMoneybackPounds className="svg text-secondary px-2" />}
								</>
							)}
							{t}
						</li>
					))}
				</ul> */}

				{showShoppay && (
					<div className="text-center font-size-sm border-top mt-2 py-2" style={{ minHeight: '5.5em' }}>
						{!loading && (
							<shopify-payment-terms variant-id="123" shopify-meta={`{"type":"product","variants":[{"id":123,"price":"${formatMoney(Math.ceil(totalPrice / 4))}","eligible":${totalPrice >= 5000 ? 'true' : 'false'}}],"min_price":"$50","max_price":"$3000","number_of_payment_terms":4}`} />
						)}
					</div>
				)}

				{showAfterpay && (
					<afterpay-placement ref={(r) => { this.afterpayRef = r; }} className="text-center border-top m-0 pt-2" data-locale={locale} data-currency={currency} data-amount={totalPrice / 100} data-size="sm" />
				)}

				{showKlarna && (
					<p className="text-sm text-center border-top mt-2 mb-2 pt-2">
						<span dangerouslySetInnerHTML={{ __html: klarnaIns }} />
						<br />
						<img className="mx-auto" height="15" src="https://cdn.shopify.com/s/files/1/0073/5186/1332/t/75/assets/logo-klarna.svg?64921"alt="Klarna" loading="lazy" />
						{/* <svg data-toggle="modal" href="#modal-klarna" role="button" data-price={totalPrice} className="svg-info modal-klarna-trigger cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="12" height="12" data-cy="klarna-icon"><path d="M7.2 5.6h1.6V4H7.2M8 14.4A6.4 6.4 0 1114.4 8 6.408 6.408 0 018 14.4M8 0a8 8 0 105.657 2.343A8 8 0 008 0m-.8 12h1.6V7.2H7.2z" /></svg> */}
					</p>
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
		);
	}
}

CartExtras.propTypes = {
	totalPrice: PropTypes.number,
};

CartExtras.defaultProps = {
	totalPrice: 0,
};
