export const setCookie = (name, value, days = 1, path = '/', domain) => {
	let expires = '';
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = `; expires=${date.toUTCString()}`;
	}
	document.cookie = `${name}=${value || ''}${expires}; path=${path}${(domain) ? `;domain=${domain}` : ''}`;
};

export const getCookie = (name) => {
	const nameEQ = `${name}=`;
	// const ca = document.cookie.split(';');
	const ca = '';
	for (let i = 0; i < ca.length; i += 1) {
		let c = ca[i];
		while (c.charAt(0) === ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
};

export const removeCookie = (name) => {
	setCookie(name, null);
};

export const validateEmail = function (t) {
	return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(t).toLowerCase());
};

export const validatePhone = (phone) => /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g.test(phone);

export const formatMoney = (cents, roundedNoComma = false) => {
	const formatString = tSettings.moneyFormat;
	if (typeof cents === 'string') {
		// eslint-disable-next-line no-param-reassign
		cents = cents.replace('.', '');
	}
	let value = '';
	const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
	function formatWithDelimiters(number, precision = 2, thousands = ',', decimal = '.') {
		if (Number.isNaN(number) || number == null) {
			return 0;
		}
		// eslint-disable-next-line no-param-reassign
		number = (number / 100.0).toFixed(precision);
		const parts = number.split('.');
		const dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1${thousands}`);
		const centsAmount = parts[1] ? (decimal + parts[1]) : '';
		return dollarsAmount + centsAmount;
	}
	// eslint-disable-next-line default-case
	switch (formatString.match(placeholderRegex)[1]) {
		case 'amount':
			value = formatWithDelimiters(cents, 2);
			break;
		case 'amount_no_decimals':
			value = formatWithDelimiters(cents, 0);
			break;
		case 'amount_with_comma_separator':
			value = formatWithDelimiters(cents, 2, '.', ',');
			break;
		case 'amount_no_decimals_with_comma_separator':
			value = formatWithDelimiters(cents, 0, '.', ',');
			break;
		case 'amount_no_decimals_with_space_separator':
			value = formatWithDelimiters(cents, 0, ' ');
			break;
	}
	if (typeof roundedNoComma === 'boolean' && roundedNoComma) {
		value = Math.floor(value);
	}
	return formatString.replace(placeholderRegex, value);
};

export const isSwellCode = (code) => {
	if (code) {
		return code.indexOf('SWL_') > -1;
	}
	return false;
};

export const getId = (shopifyId) => {
	const arrString = shopifyId.split('/');
	return arrString[arrString.length - 1];
};

export const getCartId = () => {
	if (getLSWithExpiry('cartData')) {
		const { id } = JSON.parse(getLSWithExpiry('cartData'));
		return id;
	}
	return null;
};

export const isCodeAllowed = (code) => tSettings.cart_code_whitelist_rejection
	.filter((discountCode) => discountCode.toLowerCase() === code.toLowerCase()).length > 0;

export const isABTest = (store, testID) => new Promise((resolve) => {
	if (tSettings.store === store) {
		waitFor(() => window.google_optimize && window.google_optimize.get, () => {
			const testValue = window.google_optimize.get(testID);
			if (!testValue) {
				resolve({ test: false });
			} else {
				resolve({ test: true, value: `${testValue}` });
			}
		});
	} else {
		resolve({ test: false });
	}
});

export const kebabCase = (text) => (typeof text === 'string' ? text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
	.map((x) => x.toLowerCase())
	.join('-') : '');

export const isItemIdInKey = (key, id) => (
	`${key.split(':')[0]}` === `${id}`
);

export const debounce = function debounce(func, wait, immediate) {
	let timeout;
	return function (...args) {
		const context = this;
		const later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};