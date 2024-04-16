/* global tSettings tStrings Cart */
import '~/config';

const tSettings = global.config.tSettings;
const tStrings = global.config.tStrings;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SvgStars from '~/images/icons/swell-stars.svg';
import SvgStarsSM from '~/images/icons/swell-stars-cart-sm.svg';

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
		<figure key={props.key} className="w-[5.625em] min-w-[5.625em] cart-drawer__swell-redemption-item bg-gray-400 rounded pb-1 ml-1 flex justify-start items-center flex-col overflow-hidden">
			{!item.amount && (
				<div className="cart-drawer__swell-redemption-item-heading flex items-center h-full justify-center">
					<SvgStars />
				</div>
			)}
			{item.amount > 0 && item.icon !== 'fa-dollar' && (
				<picture className="w-full mb-25">
					<img alt={item.name} src={imgSrc} width="101" />
				</picture>
			)}
			<figcaption className={`flex px-25 items-center flex-col h-full w-full justify-between ${!item.amount ? 'px-1' : ''}`}>
				{!item.amount && !customerEmail && !customerId && (
					<a href="/account/login" className="text-underline">Login/Sign up</a>
				)}
				{!item.amount && customerEmail && customerId && (
					<span className="text-gray-600">Select a gift &gt;</span>
				)}
				{item.amount > 0 && !customerEmail && !customerId && (
					<div className="flex items-center">
						<span className="ml-25">⭐️ {item.amount}</span>
					</div>
				)}
				{item.amount > 0 && customerEmail && customerId && isItemRedeemed && (
					<div className="btn btn-unstyled cart-drawer__swell-redemption-item-btn bg-white border flex items-center w-full py-1 justify-center">
						<span className="font-size-sm">✅ Redeemed</span>
					</div>
				)}
				<button type="button" data-item-id="650226" class="rounded-full btn btn-sm bg-white w-full py-hg px-1 my-1 font-normal border-0 text-sm">Add</button>
			</figcaption>
		</figure>
	);
};

SwellRedemptionCard.propTypes = {
	item: PropTypes.object.isRequired,
	customerEmail: PropTypes.string,
	customerId: PropTypes.string,
	userPts: PropTypes.number,
	swellItems: PropTypes.array.isRequired,
	showMessage: PropTypes.func.isRequired,
	setLoading: PropTypes.func.isRequired,
	swellLoading: PropTypes.bool.isRequired,
	setHeaderPoints: PropTypes.func.isRequired,
};

export default SwellRedemptionCard;
