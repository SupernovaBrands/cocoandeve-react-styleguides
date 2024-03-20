/* global tSettings customerEmail */
import dynamic from 'next/dynamic';
// import {
// 	ajaxPromise,
// 	getCookie,
// 	setCookie,
// 	removeCookie,
// 	setLSWithExpiry,
// 	getLSWithExpiry,
// 	removeLS,
// 	daysToTime,
// 	isSameText,
// 	isContainGiftCard,
// } from '@/modules/utils';
const {
	ajaxPromise,
	getCookie,
	setCookie,
	removeCookie,
	setLSWithExpiry,
	getLSWithExpiry,
	removeLS,
	daysToTime,
	isSameText,
	isContainGiftCard,
} = dynamic(() => import('@/modules/utils'), {
    ssr: false,
});
class GiftCard {
	fetchApi = () => {
		const url = `${tSettings.apiEndpoint}/shopify/gift_cards/${this.code}?email=${customerEmail}&brand=cocoandeve_shopify_${tSettings.store}`;
		return ajaxPromise({ url, cache: false }).then(
			(resp) => this.processData(resp, this.code),
			() => this.processData(),
		);
	}

	applyGiftCard = async (code, cart) => {
		const data = await this.getData(code);
		return this.checkGiftCard(data, cart);
	}

	checkAppliedGiftCard = async (cart) => {
		const currentGiftCard = getCookie('currentGiftCard');
		const data = await this.getData(currentGiftCard);
		return this.checkGiftCard(data, cart);
	}

	checkGiftCard = (data, cart) => {
		const canApply = !isContainGiftCard(cart.items);

		if (data.isValid && canApply) {
			this.cache(data.giftCode, data.originalData);
			return {
				enabled: data.enabled,
				isValid: true,
				applied: true,
				code: data.giftCode,
				lastCharacters: `•••• ${data.giftCardLastCharacters}`,
				balance: data.giftCardBalance,
				campaignType: data.campaignType,
			};
		}

		this.uncache();
		const reason = canApply ? data.error : 'product';
		return {
			enabled: data.enabled,
			isValid: false,
			reason: data.giftCode && data.giftCode !== '' ? reason : '',
			campaignType: data.campaignType,
		};
	}

	getData = async (code) => {
		this.code = typeof code === 'string' ? code : '';
		if (!this.code || this.code === '') {
			return this.processData({ code: '', error: true });
		}

		const prevGift = getLSWithExpiry('giftCardData');
		if (prevGift) {
			const parsed = JSON.parse(prevGift);
			if (isSameText(parsed.code, this.code) && isSameText(parsed.email, customerEmail)) {
				return this.processData(parsed);
			}
		}
		return this.fetchApi();
	}

	processData = (data) => {
		const giftCode = data.code ? data.code : this.code;
		const campaignType = 'gift_card';

		if (!data || data.error) {
			return {
				enabled: false,
				isValid: false,
				campaignType,
				error: data.error,
				buyAllItems: true,
			};
		}

		this.originalData = JSON.stringify({ ...data, email: customerEmail, code: giftCode });

		return {
			enabled: !data.error,
			campaignType,
			isValid: !data.error,
			balance: data.gift_card.balance,
			lastCharacters: data.gift_card.last_characters,
			error: data.error,
			giftCode,
			giftCardApplied: true,
			giftCardBalance: parseFloat(data.gift_card.balance, 10) * 100, // set balance in cents
			giftCardLastCharacters: data.gift_card.last_characters,
			originalData: this.originalData,
			buyAllItems: true,
		};
	}

	cache = (code, originalData) => {
		setCookie('currentGiftCard', code || this.code, 1);
		this.code = code || this.code;
		if (originalData && originalData !== '') {
			setLSWithExpiry('giftCardData', originalData || this.originalData, daysToTime(1));
			this.originalData = originalData || this.originalData;
		}
	}

	uncache = () => {
		removeLS('giftCardData');
		removeCookie('currentGiftCard');
		this.code = '';
		this.originalData = {};
	}
}

const giftCard = new GiftCard();
export default giftCard;
