import axios from 'axios';
import Cart from './cart';
import { getCookie, setCookie, getId } from './utils';

export default class ManualGWP extends Cart {
	/*
        fetching manual gwp items from the settings
    */
	async getManualGwpData() {
		const { data } = await axios.get('/?section_id=get-gwp');
		const parser = new DOMParser();
		const node = parser.parseFromString(data.toString(), 'text/html').querySelector('.shopify-section');
		let manualGwp = null;

		if (node) {
			const content = (node.textContent || '').trim();
			try {
				manualGwp = JSON.parse(content).manualGwp;
			} catch (e) {
				console.log(e, 'Error when get manual data');
			}
		}

		if (manualGwp) {
			const selected = JSON.parse(getCookie('manualGwpSelected') || '[]');
			const cart = await this.getCart();
			const manualItems = cart.lines.edges.filter((item) => item.node.attributes.find((attr) => attr.key === '_campaign_type' && attr.value === 'manual_gwp'));

			if (selected.length !== manualItems.length) {
				const manualItemsIDs = manualItems.map((item) => getId(item.node.merchandise.id));
				setCookie('manualGwpSelected', JSON.stringify(manualItemsIDs));
				this.toggleManualGwp({ maxSelected: manualGwp.maxSelected });
			} else if (selected.length && !manualItems.length) {
				setCookie('manualGwpSelected', JSON.stringify([selected[0]]));
				this.toggleManualGwp({ maxSelected: manualGwp.maxSelected, getItemQty: 1, getItemProps: { key: '_campaign_type', value: 'manual_gwp' } }, selected[0]);
			}

			return {
				enabled: manualGwp.enabled && manualGwp.items.length > 0,
				buyAllItems: true,
				minPurchase: manualGwp.minPurchase,
				title: manualGwp.title,
				getItems: manualGwp.items.map((item) => item.id),
				getItemQty: 1,
				getItemProps: { key: '_campaign_type', value: 'manual_gwp' },
				campaignType: 'manual_gwp',
				selectedKey: selected,
				maxSelected: manualGwp.maxSelected,
				items: manualGwp.items,
				isGwp: true,
			};
		}

		return { enabled: false };
	}

	/*
        handler action when add item button manual gwp clicked
        when manual gwp exists in the cart drawer will remove and replace by new manual gwp item selected
    */
	toggleManualGwp(data, id) {
		const { maxSelected, getItemQty, getItemProps } = data;
		let selected = JSON.parse(getCookie('manualGwpSelected') || '[]');
		let toAdd = null;
		const toRemove = {};

		if (id) {
			const selectedKey = selected.find((idt) => parseInt(idt, 10) === parseInt(id, 10));
			if (selectedKey) {
				toRemove[selectedKey] = 0;
				selected = selected.filter((key) => key !== selectedKey);
			} else {
				selected.push(`${id}`);
				toAdd = [id, getItemQty, getItemProps];
			}
		}

		while (selected.length > maxSelected) {
			toRemove[selected.shift()] = 0;
		}

		if (toAdd) {
			const { 0: variantId, 1: quantity, 2: props } = toAdd;
			const sellingPlan = null;
			this.sfApi.queueProcess({
				funct: 'addItem',
				args: {
					variantId, quantity, sellingPlan, props, directRefresh: true,
				},
				callback: null,
			});
		}

		if (toRemove) {
			this.getCart().then((cart) => {
				const { lines: { edges } } = cart;
				Object.keys(toRemove).forEach(async (variId) => {
					const line = edges.find((itm) => parseInt(getId(itm.node.merchandise.id), 10) === parseInt(variId, 10));
					if (line) {
						this.sfApi.queueProcess({
							funct: 'removeItem',
							args: { id: line.node.id, directRefresh: true },
							callback: null,
						});
					}
				});
			});
		}

		setCookie('manualGwpSelected', JSON.stringify(selected));
		return selected;
	}
}
