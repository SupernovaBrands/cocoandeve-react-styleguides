/* global tSettings tStrings Cart */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SvgStarsSM from '~svg/swell-stars-sm.svg';

const AccountSwellProductCard = (props) => {
	const {
		item,
		userPts,
		swellLoading,
		swellItems,
	} = props;
	const [btnLoading, setBtnLoading] = useState(false);

	const isItemRedeemed = swellItems.length > 0 && swellItems.indexOf(parseInt(item.variant_id, 10)) >= 0;
	const { apiKey, guidKey } = tSettings.cartRedemption;
	const apiEndpoint = 'https://loyalty.yotpo.com/api/v2';
	const customerEmail = window.customerEmail;

	const redeemItem = () => {
		if (swellItems.length > 0) {
			$('#SwellMultipleItemsModal').modal('show');
			// console.log('Free item already redeemed');
			return;
		}
		Cart.getCart().then((cart) => {
			const cartLength = cart.items.length;
			setBtnLoading(true);
			if (cartLength === 0) {
				$('#SwellEmptyCartModal').modal('show');
				setBtnLoading(false);
				Promise.resolve(false);
			} else {
				try {
					const varId = item.variant_id;
					fetch(`${apiEndpoint}/redemptions?guid=${guidKey}&api_key=${apiKey}&customer_email=${encodeURIComponent(customerEmail)}&redemption_option_id=${item.id}&delay_points_deduction=true`, {
						method: 'POST',
					})
						.then((response) => response.json())
						.then((resp) => {
							// console.log('redemption resp', resp);
							if (resp.approved) {
								const itemProps = [
									{ key: '_swell_discount_type', value: item.discount_type },
									{ key: '_swell_points_used', value: item.amount.toString() },
									{ key: '_swell_redemption_id', value: resp.id.toString() },
									{ key: '_swell_redemption_option_id', value: item.id.toString() },
									{ key: '_swell_redemption_token', value: resp.token },
								];
								Cart.addItem(parseInt(varId, 10), 1, null, itemProps).then(() => {
									setTimeout(() => {
										setBtnLoading(false);
										props.setLoading(false);
										props.setHeaderPoints(item.amount);
									});
									document.dispatchEvent(new CustomEvent('SwellAddItemToCart'));
								});
							}
							setBtnLoading(false);
						});
				} catch (err) {
					setBtnLoading(false);
					props.setLoading(false);
					console.log('error while fetching data', err);
				}
			}
		});
	};
	let imgSm;
	let imgLg;
	if (item.icon.includes('_1140x') || item.icon.includes('_614x614')) {
		imgSm = item.icon.replace('_1140x', '_182x244_crop_center').replace('_614x614', '_182x244_crop_center');
		imgLg = item.icon.replace('_1140x', '_244x').replace('_614x614', '_244x');
	} else {
		imgSm = item.icon.replace('.jpg', '_182x244_crop_center.jpg').replace('_614x614', '_182x244_crop_center.jpg');
		imgLg = item.icon.replace('.jpg', '_244x.jpg').replace('.png', '_244x.png');
	}
	return (
		<div className="col-12 col-lg-6">
			<figure className="media align-items-center align-items-center justify-content-center">
				{item.icon !== 'fa-dollar' && (
					<picture className="px-2 bg-account-pink">
						<source srcSet={imgLg} media="(min-width: 992px)" />
						<img className="w-100" src={imgSm} alt={item.name} loading="lazy" />
					</picture>
				)}
				<figcaption className="media-body text-center pl-2 pr-1">
					<strong className="d-block mb-1 text-body">{item.name}</strong>
					{isItemRedeemed && (
						<div className="btn btn-unstyled btn__swell-redemption-item border d-flex align-items-center w-100 py-1 justify-content-center">
							<span className="font-size-sm">✅ Redeemed</span>
						</div>
					)}
					{!isItemRedeemed && (item.quantity === null || item.quantity > 0) && (
						<button type="button" disabled={btnLoading || item.amount > userPts || swellLoading} className="btn btn-unstyled btn__swell-redemption-item border d-flex align-items-center w-100 py-1 justify-content-center" onClick={redeemItem}>
							{!btnLoading && (
								<>
									<SvgStarsSM />
									<strong className="font-size-sm">{item.amount}</strong>
									<strong className="font-size-sm">|</strong>
									<strong className="font-size-sm">Redeem</strong>
								</>
							)}
							{btnLoading && (
								<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
							)}
						</button>
					)}
					{!isItemRedeemed && item.quantity === 0 && (
						<button type="button" disabled className="btn btn-unstyled btn__swell-redemption-item border d-flex align-items-center w-100 py-1 justify-content-center font-size-sm font-weight-bold">
							{tStrings.soldOut}
						</button>
					)}
				</figcaption>
			</figure>
		</div>
	);
};

AccountSwellProductCard.propTypes = {
	item: PropTypes.object.isRequired,
	userPts: PropTypes.number.isRequired,
	swellLoading: PropTypes.bool.isRequired,
	setLoading: PropTypes.func.isRequired,
	swellItems: PropTypes.array.isRequired,
	setHeaderPoints: PropTypes.func.isRequired,
};

export default AccountSwellProductCard;
