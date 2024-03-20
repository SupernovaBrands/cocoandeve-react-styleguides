/* global tSettings Cart */
import dynamic from 'next/dynamic';
// import StorefrontApi from '@/modules/storefront-api';
import {
	queryChangeQuantity,
} from '@/modules/query';
// import { getId } from '@/modules/utils';
const { getId } = dynamic(() => import('@/modules/utils'), {
    ssr: false,
});
const StorefrontApi = dynamic(() => import('@/modules/storefront-api'), {
    ssr: false,
});
export default class AutoGwp {
	constructor() {
		this.config = global.config.tSettings.autoGwp;
		this.sfApi = new StorefrontApi();
	}

	processAutoGwp(cart) {
		if (this.config.enabled && this.validateAutoGwp(cart)) {
			const freeGwpAtCart = [];
			let freeGwpQuantity = 0;
			let prerequisiteQuantity = 0;
			cart.items.forEach((item) => {
				const autoGwpItem = item.attributes.find((attr) => attr.key === '_campaign_type' && attr.value === 'auto_gwp');

				if (this.config.freeItemIds.includes(getId(item.merchandise.id))
                    && autoGwpItem) {
					freeGwpAtCart.push(item);
					freeGwpQuantity += item.quantity;
				}

				if (this.config.prerequisiteIds.includes(getId(item.merchandise.id))) {
					prerequisiteQuantity += item.quantity;
				}
			});

			if ((freeGwpAtCart.length && this.config.sameQuantity && freeGwpQuantity !== prerequisiteQuantity)
                || (freeGwpAtCart.length && !this.config.sameQuantity
                    && freeGwpQuantity !== this.config.freeQuantity)) {
				const qty = this.config.sameQuantity ? prerequisiteQuantity : this.config.freeQuantity;
				this.updateFreeQuantity(freeGwpAtCart[0], qty, cart.id);
				freeGwpAtCart[0].quantity = qty;
			} else if (!freeGwpAtCart.length) {
				const qty = this.config.sameQuantity ? prerequisiteQuantity : this.config.freeQuantity;
				this.addFreeItem(this.config.freeItemIds[0], qty);
			}
		} else {
			return this.clearAutoGwpItems(cart);
		}
		return cart;
	}

	updateFreeQuantity(item, quantity, cartId) {
		const lines = [{
			id: item.id,
			quantity,
			attributes: item.attributes,
		}];

		const queryData = {
			query: queryChangeQuantity, variables: { cartId, lines },
		};

		this.sfApi.requestGraphql('cartLinesUpdate', queryData, false);
	}

	addFreeItem(item, quantity) {
		const attributes = [{ key: '_campaign_type', value: 'auto_gwp' }];
		Cart.addItem(item, quantity, null, attributes, true);
	}

	validateAutoGwp(cart) {
		if (this.config.isBuyAny && cart.items.length && cart.subtotalPrice > this.config.minPurchase) {
			return true;
		}

		if (!cart.items.length) { return false; }

		const prerequisiteOnTheCart = cart.items.filter((item) => {
			const id = getId(item.merchandise.id);
			return this.config.prerequisiteIds.includes(id);
		});

		return !this.config.isBuyAny && this.config.prerequisiteIds.length
            && prerequisiteOnTheCart.length && cart.subtotalPrice > this.config.minPurchase;
	}

	clearAutoGwpItems(cart) {
		if (cart.items.length) {
			const tempItems = [];
			cart.items.forEach((item) => {
				const autoGwpItem = item.attributes.find((attr) => attr.key === '_campaign_type' && attr.value === 'auto_gwp');
				if (autoGwpItem) {
					this.updateFreeQuantity(item, 0, cart.id);
				} else {
					tempItems.push(item);
				}
			});
			// eslint-disable-next-line no-param-reassign
			cart.items = tempItems;
		}
		return cart;
	}
}
