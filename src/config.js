module.exports = global.config = {
	yotpoKey: '6txi4aUWjmI6eNoVLssUgrIObhvqlGbIfVyePeRW', // Dev Store
	tSettings: {
		cartShippingMeter: {
			"enable": true,
			"inProgressText": "#{shipping_price} away from free shipping!",
			"finalText": "Congrats! Your order qualifies for free shipping!",
			"barColor": "#f4436c"
		},
		payment: {
			"klarna": true,
			"klarna_installment": 3,
			"afterpay": true,
			"clearpay": false,
			"shoppay": false,
			"atome": false,
			"atome_installment": 3
		},
		locale: 'en',
		cartRedemption: {
			"enabled": true,
			"apiKey": "Lqyuh3Sm0JLBSi9Mec3cJQtt",
			"guidKey": "UDQ6dSW-H2Gi-71iOvYtnw",
			"errorMsg": "You can select 1 reward <span class=\"text-uppercase\">per order</span>. To change your reward in cart, first remove item and select the one you want!",
			"title": "Select your free gift",
			"titleGuest": "Sign up to select your free gift"
		},
		autoGwp: {
			"enabled": true,
			"isBuyAny": false,
			"prerequisiteIds": [
				"39930833600547"
			],
			"freeItemIds": [
				"39952986472483"
			],
			"freeQuantity": 1,
			"minPurchase": 0,
			"sameQuantity": true
		},
		cartCombineDiscount: false
	}
};
