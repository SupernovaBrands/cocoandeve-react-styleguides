/* global shippingZones */

import {
	getCookie,
} from './utils';

export default class Shipping {
	/*
		find zone base of customer country
		zone settings data is on metafield shop
	*/
	getCustomerZone = (subsOnlyInCart = false) => {
		const countryCode = getCookie('_shopify_country_code');
		const regionCode = getCookie('_shopify_country_region_name');

		const zone = shippingZones.find((z) => {
			let country = z.countries.find((c) => c.code === countryCode);

			if (z.name.toLowerCase().includes('subscription') !== subsOnlyInCart) {
				return false;
			}

			if (!country) {
				country = z.countries.find((c) => c.code === '*');
			}

			if (country && countryCode === 'US') {
				const region = country.provinces.find((p) => p.code === regionCode);
				return typeof region !== 'undefined';
			}

			return typeof country !== 'undefined';
		});

		return zone;
	};

	/*
		get shipping data base of found zone for a customer
		give results shippingData and shippingMeter
		shippingData: would use for shipping line price
		shippingMeter: would use for top shipping banner on the cart drawer
	*/
	getShippingData = (totalPrice, subsOnlyInCart = false) => {
		const zone = this.getCustomerZone(subsOnlyInCart);
		let shipping = null;
		let freeRate = null;
		if (zone && zone.price_shipping_rates) {
			zone.price_shipping_rates.forEach((r) => {
				const min = r.min_order_subtotal ? parseFloat(r.min_order_subtotal) * 100 : 0;
				const max = r.max_order_subtotal ? parseFloat(r.max_order_subtotal) * 100 : totalPrice;
				const rate = parseFloat(r.price) * 100;
				if (totalPrice >= min && totalPrice <= max && (!shipping || shipping > rate)) {
					shipping = rate;
				}
			});
			const allFree = zone.price_shipping_rates.filter((r) => r.price === '0.00');
			// console.log('here all free shipping rate', allFree);
			if (allFree.length === 1) {
				freeRate = allFree[0];
			} else if (allFree.length > 1) {
				allFree.forEach((r) => {
					if (!freeRate) {
						freeRate = r;
					} else {
						const compareMin = r.min_order_subtotal ? parseFloat(r.min_order_subtotal) * 100 : 0;
						const currentMin = freeRate.min_order_subtotal ? parseFloat(freeRate.min_order_subtotal) * 100 : 0;
						if (compareMin < currentMin) {
							freeRate = r;
						}
					}
				});
			}
		}

		let shippingData = { show: false, amount: 0, freeRate: null };
		let shippingMeter = { enabled: false };
		if (shipping !== null) {
			shippingData = {
				show: shipping !== null,
				amount: shipping || 0,
				freeRate: freeRate || null,
			};

			if (shippingData.freeRate && totalPrice > 0) {
				/*
				force rate min order subtotal as zero in on cart only subscription items
				since subscription item would be always as free shipping
				*/

				if (subsOnlyInCart) {
					shippingData.freeRate.min_order_subtotal = '0.00';
					shippingData.amount = 0;
				}

				shippingMeter = {
					enabled: true,
					target: shippingData.freeRate.min_order_subtotal ? parseFloat(shippingData.freeRate.min_order_subtotal) * 100 : 0,
					current: totalPrice,
				};
			}
			return { shippingData, shippingMeter };
		}
		return { shippingData, shippingMeter };
	};
}
