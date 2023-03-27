/* global tSettings tStrings Cart */
const tSettings = global.config.tSettings;
const tStrings = global.config.tStrings;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SvgStars from '@/images/icons/swell-stars.svg';
import SvgStarsSM from '@/images/icons/swell-stars-cart-sm.svg';

const SwellRedemptionCard = (props) => {
	const {
		item,
		customerEmail,
		customerId,
		userPts,
		swellItems,
		swellLoading,
	} = props;
	const { apiKey, guidKey } = tSettings.cartRedemption;
	const apiEndpoint = 'https://loyalty.yotpo.com/api/v2';
	const [btnLoading, setBtnLoading] = useState(false);

	const isItemRedeemed = swellItems.length > 0 && swellItems.indexOf(parseInt(item.variant_id, 10)) >= 0;

	const redeemItem = () => {
		if (swellItems.length > 0) {
			props.showMessage(true);
			// console.log('Free item already redeemed');
			return;
		}
		try {
			// console.log('start submission post...');
			const varId = parseInt(item.variant_id, 10);
			setBtnLoading(true);
			props.showMessage(false);
			props.setLoading(true);
			fetch(`${apiEndpoint}/redemptions?guid=${guidKey}&api_key=${apiKey}&customer_email=${encodeURIComponent(customerEmail)}&redemption_option_id=${item.id}&delay_points_deduction=true`, {
				method: 'POST',
			})
				.then((response) => response.json())
				.then((resp) => {
					if (resp.approved) {
						const itemProps = [
							{ key: '_swell_discount_type', value: item.discount_type },
							{ key: '_swell_points_used', value: item.amount.toString() },
							{ key: '_swell_redemption_id', value: resp.id.toString() },
							{ key: '_swell_redemption_option_id', value: item.id.toString() },
							{ key: '_swell_redemption_token', value: resp.token },
						];
						Cart.addItem(varId, 1, null, itemProps).then(() => {
							document.dispatchEvent(new CustomEvent('SwellAddItemToCart'));
							setTimeout(function () {
								$('#cart-drawer-form').parent().animate({ scrollTop: 0 }, 'fast');
								setBtnLoading(false);
								props.setLoading(false);
								props.setHeaderPoints(item.amount);
							}, 500);
						});
					}
					setBtnLoading(false);
				});
		} catch (err) {
			setBtnLoading(false);
			props.setLoading(false);
			console.log('error while fetching data', err);
		}
	};
	let imgSrc;
	if (item.amount > 0) {
		if (item.icon.includes('_1140x') || item.icon.includes('_614x614')) {
			imgSrc = item.icon.replace('_1140x', '_202x').replace('_614x614', '_202x');
		} else {
			imgSrc = item.icon.replace('.jpg', '_202x.jpg').replace('.png', '_202x.png');
		}
	}
	return (
		<figure className="cart-drawer__swell-redemption-item bg-gray-400 rounded-lg pb-1 mr-1 d-flex justify-content-start align-items-center flex-column">
			{!item.amount && (
				<div className="cart-drawer__swell-redemption-item-heading d-flex align-items-center h-100 justify-content-center">
					<SvgStars />
				</div>
			)}
			{item.amount > 0 && item.icon !== 'fa-dollar' && (
				<picture className="w-100">
					<img alt={item.name} src={imgSrc} width="101" />
				</picture>
			)}
			<figcaption className={`d-flex px-25 align-items-center flex-column h-100 w-100 justify-content-between ${!item.amount ? 'px-1' : ''}`}>
				<strong className="d-block my-1 mx-25">{item.name}</strong>
				{!item.amount && !customerEmail && !customerId && (
					<a href="/account/login" className="text-underline">Login/Sign up</a>
				)}
				{!item.amount && customerEmail && customerId && (
					<span className="text-gray-600">Select a gift &gt;</span>
				)}
				{item.amount > 0 && !customerEmail && !customerId && (
					<div className="d-flex align-items-center">
						<SvgStarsSM />
						<span className="ml-25">{item.amount}</span>
					</div>
				)}
				{item.amount > 0 && customerEmail && customerId && isItemRedeemed && (
					<div className="btn btn-unstyled cart-drawer__swell-redemption-item-btn bg-white border d-flex align-items-center w-100 py-1 justify-content-center">
						<span className="font-size-sm">✅ Redeemed</span>
					</div>
				)}
				{(item.quantity === null || item.quantity > 0) && item.amount > 0
					&& customerEmail && customerId && !isItemRedeemed && (
					<button type="button" disabled={item.amount > userPts || btnLoading || swellLoading} className="btn btn-unstyled cart-drawer__swell-redemption-item-btn bg-white border d-flex align-items-center w-100 py-1 justify-content-center" onClick={redeemItem}>
						{!btnLoading && (
							<>
								<SvgStarsSM />
								<strong className="ml-25 font-size-sm">{item.amount}</strong>
								<strong className="ml-25 font-size-sm">|</strong>
								<strong className="ml-25 font-size-sm">Redeem</strong>
							</>
						)}
						{btnLoading && (
							<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
						)}
					</button>
				)}
				{item.quantity === 0 && item.amount > 0 && customerEmail && customerId && !isItemRedeemed && (
					<button type="button" disabled className="btn btn-unstyled cart-drawer__swell-redemption-item-btn bg-white border d-flex align-items-center w-100 py-1 justify-content-center">
						<span className="font-weight-bold font-size-sm">{tStrings.soldOut}</span>
					</button>
				)}
			</figcaption>
		</figure>
	);
};

SwellRedemptionCard.propTypes = {
	item: PropTypes.object.isRequired,
	customerEmail: PropTypes.string.isRequired,
	customerId: PropTypes.string.isRequired,
	userPts: PropTypes.number.isRequired,
	swellItems: PropTypes.array.isRequired,
	showMessage: PropTypes.func.isRequired,
	setLoading: PropTypes.func.isRequired,
	swellLoading: PropTypes.bool.isRequired,
	setHeaderPoints: PropTypes.func.isRequired,
};

export default SwellRedemptionCard;
