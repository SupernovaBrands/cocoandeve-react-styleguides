/* eslint-disable import/prefer-default-export */
/* global tSettings Cart */
import dynamic from 'next/dynamic';
// import {
// 	isSwellCode,
// } from '@/modules/utils';
const {
	isSwellCode,
} = dynamic(() => import('@/modules/utils'), {
    ssr: false,
});
const apiEndpoint = 'https://loyalty.yotpo.com/api/v2';
const { apiKey, guidKey } = global.config.tSettings.cartRedemption;
const MAX_RETRY = 5;

const filterItems = (data) => data.filter((item) => item.discount_type === 'product')
	.filter((item) => !item.name.toLowerCase().includes('[hide]'))
	.sort((a, b) => b.amount - a.amount);

export const getRedemptionOptions = async () => fetch(`${apiEndpoint}/redemption_options?guid=${guidKey}&api_key=${apiKey}`)
	.then((response) => response.json())
	.then((resp) => filterItems(resp));

export const getRedemptionDiscounts = async () => fetch(`${apiEndpoint}/redemption_options?guid=${guidKey}&api_key=${apiKey}`)
	.then((response) => response.json())
	.then((resp) => resp.filter((item) => item.discount_type === 'fixed_amount')
		.filter((item) => !item.name.toLowerCase().includes('[hide]')));

export const getRedemptionProducts = async (retry = 0) => new Promise((resolve) => {
	const startFetch = (reTry) => {
		fetch(`https://loyalty.yotpo.com/api/public/v1/redemption_options?guid=${guidKey}&discount_types=product`)
			.then((response) => response.json())
			.then((resp) => resolve(filterItems(resp)))
			.catch(() => {
				if (reTry <= MAX_RETRY) {
					// retry
					setTimeout(startFetch(reTry + 1), 1000);
				} else {
					// empty
					resolve([]);
				}
			});
	};
	startFetch(retry);
});

export const getCustomersBalance = (customerEmail, retry = 0) => new Promise((resolve) => {
	const startFetch = (email, reTry) => {
		fetch(`${apiEndpoint}/customers?guid=${guidKey}&api_key=${apiKey}&customer_email=${encodeURIComponent(customerEmail)}`)
			.then((response) => response.json())
			.then((resp) => {
				// resolve(resp.points_balance);
				// from master
				let swellItems = [];
				let points = resp.points_balance;
				Cart.getCart().then((cart) => {
					if (cart.items.length > 0) {
						swellItems = cart.items.filter((item) => item.attributes.find((attr) => attr.key === '_swell_points_used'));
					}

					if (swellItems.length > 0) {
						swellItems.forEach((item) => {
							const swellAttr = item.attributes.find((attr) => attr.key === '_swell_points_used');
							points -= parseInt(swellAttr.value, 10);
						});
					}

					const currentDiscount = cart.discountCodes.length ? cart.discountCodes[0].code : '';

					if (currentDiscount !== '' && isSwellCode(currentDiscount)) {
						getRedemptionDiscounts().then((redemptionDiscounts) => {
							if (redemptionDiscounts.length > 0) {
								const found = redemptionDiscounts.find((disc) => cart.discountData.isValid
								&& disc.discount_amount_cents === cart.discountAmount.amount);

								if (found && found.amount > 0) {
									points -= found.amount;
								}
							}
							resolve(points);
						});
					} else {
						resolve(points);
					}
				});
			})
			.catch(() => {
				if (reTry <= MAX_RETRY) {
					// retry
					setTimeout(startFetch(email, reTry + 1), 250);
				} else {
					// dummy 50 points after retry n times failure
					resolve(50);
				}
			});
	};
	startFetch(customerEmail, retry);
});

export const mergeById = (a1, a2) => a1.map((itm) => ({ ...a2.find((item) => (item.id === itm.id) && item), ...itm }));
