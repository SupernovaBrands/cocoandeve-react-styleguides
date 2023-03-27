/* global tSettings */

const tSettings = global.config.tSettings;
const tStrings = global.config.tStrings;

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import SvgChevronPrev from '@/images/icons/chevron-prev.svg';
import SvgChevronNext from '@/images/icons/chevron-next.svg';
import SwellRedemptionCard from '@/components/swell/cart-swell-redemption-card';
import {
	mergeById,
	getRedemptionOptions,
	getRedemptionProducts,
	getCustomersBalance,
} from '@/modules/swell/redemption';

const CartSwellRedemption = (props) => {
	const { errorMsg } = tSettings.cartRedemption;
	const customerEmail = window.customerEmail;
	const customerId = window.customerId;
	const [init, setInit] = useState(false);
	const [initPts, setInitPts] = useState(false);
	const [redeemProducts, setRedeemProducts] = useState([]);
	const [redeemProductsDetail, setRedeemProductsDetail] = useState([]);
	const swellRef = useRef(null);
	const [userPts, setUserPts] = useState(0);
	const { cartData } = props;
	const [isError, setIsError] = useState(false);
	const [swellLoading, setSwellLoading] = useState(false);
	const SCROLL_ITEM = 151;

	const scroll = (direction) => {
		const el = swellRef;
		const left = el.current.scrollLeft;
		const offset = direction === 'left' ? -(SCROLL_ITEM) : SCROLL_ITEM;
		el.current.scrollTo({ left: left + offset });
	};

	const showMessage = (shouldShowMessage) => {
		setIsError(shouldShowMessage);
	};

	const setLoading = (loading) => {
		setSwellLoading(loading);
	};

	const setHeaderPoints = (ptsUsed) => {
		const totalPts = userPts - parseInt(ptsUsed, 10);
		$('.customer-points-placeholder').text(`${totalPts} ${tSettings.loyalty_topbar_points}`);
	};

	useEffect(() => {
		const getItemRedemptions = async () => {
			try {
				const redeemOptions = await getRedemptionOptions();
				setRedeemProducts(redeemOptions);
				const productDetails = await getRedemptionProducts();
				setRedeemProductsDetail(productDetails);
				setInit(true);
				if (customerEmail) {
					const custBalance = await getCustomersBalance(customerEmail);
					setUserPts(custBalance);
					setInitPts(true);
				} else {
					setInitPts(true);
				}
			} catch (err) {
				console.log('error while fetching data1', err);
			}
		};

		getItemRedemptions();
		document.addEventListener('SwellRemoveItemToCart', () => {
			if (customerEmail !== '') {
				getCustomersBalance(customerEmail).then((pts) => {
					setUserPts(pts);
					$('.customer-points-placeholder').text(`${pts} ${tSettings.loyalty_topbar_points}`);
				});
			}
		});

		document.addEventListener('SwellAddItemToCart', () => {
			getCustomersBalance(customerEmail).then((pts) => {
				setUserPts(pts);
			});
		});
	}, []);

	const cartFiltered = cartData.items.filter((item) => item.attributes.find((attr) => attr.key === '_swell_discount_type' && attr.value === 'product'));
	const swellItems = cartFiltered.map((obj) => obj.variant_id);
	let ptsUsed = 0;
	cartFiltered.forEach((elem) => {
		const swellUsed = elem.attributes.find((attr) => attr.key === '_swell_points_used');
		ptsUsed += parseInt(swellUsed?.value, 10);
	});
	const displayPoints = swellItems.length > 0 ? userPts - ptsUsed : userPts;
	const itemPlaceholder = {
		amount: false,
		description: '',
		name: (customerEmail && customerId) ? `You have ${displayPoints} point${displayPoints > 1 ? 's' : ''}!` : 'This could be yours',
	};

	const redeemProductsMerged = mergeById(redeemProducts, redeemProductsDetail);

	return !init || !initPts ? (
		<div className="d-flex justify-content-center mt-4">
			<div className="spinner-border" role="status" aria-hidden="true" />
		</div>
	) : (
		<div className="cart-drawer__swell-redemption position-relative">
			<strong className="d-block mb-1">{(customerEmail && customerId) ? tSettings.cartRedemption.title : tSettings.cartRedemption.titleGuest}</strong>
			{swellItems.length > 0 && isError && (
				<p className="font-size-sm text-primary mb-1">{errorMsg.replace(/(<([^>]+)>)/ig, '')}</p>
			)}
			<button className="position-absolute btn-unstyled text-primary manual-gwp__left" aria-hidden="true" type="button" onClick={() => scroll('left')}>
				<SvgChevronPrev class="svg" />
				<span className="d-none">Left</span>
			</button>
			<button className="position-absolute btn-unstyled text-primary manual-gwp__right" aria-hidden="true" type="button" onClick={() => scroll('right')}>
				<SvgChevronNext class="svg" />
				<span className="d-none">Right</span>
			</button>
			<div className="manual-gwp__container d-flex mb-0 mt-2 text-center" ref={swellRef}>
				{redeemProductsMerged.length > 0 && (
					<SwellRedemptionCard
						item={itemPlaceholder}
						customerEmail={customerEmail}
						customerId={customerId}
						swellItems={swellItems}
						showMessage={showMessage}
						setLoading={setLoading}
						swellLoading={swellLoading}
						setHeaderPoints={setHeaderPoints}
					/>
				)}
				{redeemProductsMerged.map((item) => (
					<SwellRedemptionCard
						item={item}
						customerEmail={customerEmail}
						customerId={customerId}
						userPts={userPts}
						swellItems={swellItems}
						showMessage={showMessage}
						setLoading={setLoading}
						swellLoading={swellLoading}
						setHeaderPoints={setHeaderPoints}
					/>
				))}
			</div>
		</div>
	);
};

CartSwellRedemption.propTypes = {
	cartData: PropTypes.object.isRequired,
};

export default CartSwellRedemption;
