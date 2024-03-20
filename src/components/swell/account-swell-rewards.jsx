/* global tSettings Cart */
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
// import AccountSwellProductCard from '~comp/swell/account-swell-product-card';
import {
	mergeById,
	getRedemptionOptions,
	getRedemptionProducts,
	getCustomersBalance,
} from '@/modules/swell/redemption';

// import { getId } from '~mod/utils';
const { getId } = dynamic(() => import('@/modules/utils'), {
    ssr: false,
});
const AccountSwellProductCard = dynamic(() => import('@/components/swell/account-swell-product-card'), {
    ssr: false,
});

const AccountSwellRewards = () => {
	const { errorMsg } = tSettings.cartRedemption;
	const customerEmail = window.customerEmail;
	const [init, setInit] = useState(false);
	const [initPts, setInitPts] = useState(false);
	const [initCart, setInitCart] = useState(false);
	const [redeemProducts, setRedeemProducts] = useState([]);
	const [redeemProductsDetail, setRedeemProductsDetail] = useState([]);
	const [userPts, setUserPts] = useState(0);
	const [swellLoading, setSwellLoading] = useState(false);
	const [swellItems, setSwellItems] = useState(false);

	const setLoading = (loading) => {
		setSwellLoading(loading);
	};

	const setHeaderPoints = (ptsUsed) => {
		const totalPts = userPts - parseInt(ptsUsed, 10);
		$('.customer-points-placeholder').text(`${totalPts} ${tSettings.loyalty_topbar_points}`);
	};

	const checkSnCart = () => {
		Cart.getCart().then((cart) => {
			const filtered = cart.items.filter((item) => item.attributes.find((i) => i.key === '_swell_discount_type' && i.value === 'product')).map((item) => getId(item.merchandise.id));
			setSwellItems(filtered);
			setInitCart(true);
		});
	};

	useEffect(() => {
		const getItemRedemptions = async () => {
			try {
				const redeemOptionsItem = await getRedemptionOptions();
				setRedeemProducts(redeemOptionsItem);
				const productDetails = await getRedemptionProducts();
				setRedeemProductsDetail(productDetails);
				setInit(true);
				const custBalance = await getCustomersBalance(customerEmail);
				setUserPts(custBalance);
				setInitPts(true);
				checkSnCart();
			} catch (err) {
				console.log('error while fetching data1', err);
			}
		};

		getItemRedemptions();

		document.addEventListener('SwellRemoveItemToCart', () => {
			setTimeout(() => {
				setInit(false);
				setInitPts(false);
				setInitCart(false);
				getItemRedemptions();
			}, 500);
		});
		document.addEventListener('SwellAddItemToCart', () => {
			setInit(false);
			setInitPts(false);
			setInitCart(false);
			getItemRedemptions();
		});
	}, []);

	const redeemProductsMerged = mergeById(redeemProducts, redeemProductsDetail);

	return !init || !initPts || !initCart ? (
		<div className="d-flex justify-content-center mt-4 col-12 col-lg-9 px-lg-0">
			<div className="spinner-border" role="status" aria-hidden="true" />
		</div>
	) : (
		<>
			<p className="text-body mb-3 col-lg-8 text-center text-lg-left px-lg-0" dangerouslySetInnerHTML={{ __html: errorMsg }} />
			<div className="row">
				{redeemProductsMerged.map((item) => (
					<AccountSwellProductCard
						item={item}
						userPts={userPts}
						setLoading={setLoading}
						swellLoading={swellLoading}
						swellItems={swellItems}
						setHeaderPoints={setHeaderPoints}
					/>
				))}
			</div>
		</>
	);
};

export default AccountSwellRewards;
