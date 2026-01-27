import '~/config';
import CryptoJS from 'crypto-js';
// eslint-disable-next-line import/no-unresolved,import/extensions
import secrets from '~/secret';
import countriesCode from '~/modules/countries';

const tSettings = global.config.tSettings;
const tStrings = global.config.tStrings;

export const get = (obj, path, defValue) => {
	if (!path) return undefined;
	const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
	return (
		pathArray.reduce((prevObj, key) => prevObj && prevObj[key], obj) || defValue
	);
};

export const encryptSHA256 = (content) => {
	const hash = CryptoJS.SHA256(content);
	return hash.toString(CryptoJS.enc.Base64);
};

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
	const ca = document.cookie.split(';');
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

export const subscribeTiktok = (email, phone) => {
	let submit = false;
	const countryCode = getCookie('_shopify_country_code');
	const phoneCode = countriesCode.find((countryPhone) => countryPhone.code === countryCode);

	if (typeof ttq === 'object' && email && phone && validatePhone(phone)) {
		submit = true;
		let phoneNumber = phone;
		if (!phone.startsWith('+') && phoneCode) {
			phoneNumber = `${phoneCode.dial_code}${phone}`;
		}
		ttq.instance('CC3JF1JC77U9MSBJLS5G').identify({
			email,
			auto_email: email,
			phone_number: phoneNumber,
			auto_phone_number: phoneNumber,
		});
	} else if (typeof ttq === 'object' && phone && validatePhone(phone)) {
		submit = true;
		let phoneNumber = phone;
		if (!phone.startsWith('+') && phoneCode) {
			phoneNumber = `${phoneCode.dial_code}${phone}`;
		}
		ttq.instance('CC3JF1JC77U9MSBJLS5G').identify({
			phone_number: phoneNumber,
			auto_phone_number: phoneNumber,
		});
	} else if (typeof ttq === 'object' && email) {
		submit = true;
		ttq.instance('CC3JF1JC77U9MSBJLS5G').identify({
			email,
			auto_email: email,
		});
	}

	if (typeof ttq === 'object' && submit) ttq.instance('CC3JF1JC77U9MSBJLS5G').track('Subscribe');
};

export const currentTime = () => new Date().getTime();

export const encryptParam = (content) => {
	const encryptedMessage = {};
	const code = CryptoJS.AES.encrypt(content, CryptoJS.enc.Utf8.parse(secrets.key), {
		iv: CryptoJS.enc.Utf8.parse(secrets.vector),
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
	});
	encryptedMessage.data = code.ciphertext.toString(CryptoJS.enc.Base64);
	return encryptedMessage.data;
};

export const waitFor = (condition, cb) => {
	if (typeof condition === 'function' && typeof cb === 'function') {
		setTimeout(() => {
			if (condition()) { cb(); } else { waitFor(condition, cb); }
		}, 200);
	}
};

export const objectToQueryString = (obj, prefix) => {
	const str = [];
	let p;
	// eslint-disable-next-line no-restricted-syntax
	for (p in obj) {
		// eslint-disable-next-line no-prototype-builtins
		if (obj.hasOwnProperty(p)) {
			const k = prefix ? `${prefix}[${p}]` : p;
			const v = obj[p];
			str.push((v !== null && typeof v === 'object') ? objectToQueryString(v, k) : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
		}
	}
	return str.join('&');
};

export const kebabCase = (text) => (typeof text === 'string' ? text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
	.map((x) => x.toLowerCase())
	.join('-') : '');

export const isSameText = (text1, text2) => typeof text1 === 'string' && typeof text2 === 'string' && text1.toLowerCase() === text2.toLowerCase();

// To search for intersection of 2 array
export const intersectTwo = (a, b) => a.filter((x) => b.some((y) => Object.is(x, y)));

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

export const bindAllMethods = (instance) => {
	Object.getOwnPropertyNames(Object.getPrototypeOf(instance))
		.forEach((key) => {
			// eslint-disable-next-line no-param-reassign
			if (instance[key] instanceof Function && key !== 'constructor') instance[key] = instance[key].bind(instance);
		});
};

export const Base64 = {
	decode(str) {
		return decodeURIComponent(
			atob(str)
				.split('')
				.map(function (c) {
					return `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`;
				})
				.join(''),
		);
	},
	encode(str) {
		return btoa(
			encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
				return String.fromCharCode(`0x${p1}`);
			}),
		);
	},
};

export const daysToTime = (days = 1) => days * 24 * 60 * 60 * 1000;

export const setLSWithExpiry = (key, value, ttl = 60 * 60 * 1000) => {
	const now = new Date();
	const item = {
		value,
		expiry: now.getTime() + ttl,
	};
	localStorage.setItem(key, JSON.stringify(item));
};

export const getLSWithExpiry = (key) => {
	const itemStr = localStorage.getItem(key);
	if (!itemStr) { return null; }
	const item = JSON.parse(itemStr);
	const now = new Date();
	if (now.getTime() > item.expiry) {
		localStorage.removeItem(key);
		return null;
	}
	return item.value;
};

export const removeLS = (key) => {
	localStorage.removeItem(key);
};

export const ajaxPromise = (options) => new Promise((resolve, reject) => {
	if (typeof $ === 'function') {
		$.ajax({
			...options,
			dataType: options.dataType || 'json',
			success: resolve,
			error: reject,
		});
	}
});

export const isItemHasProp = (item, prop, value) => {
	if (!item.properties) return false;
	if (Array.isArray(item.properties)) {
		const findProp = item.properties.find((p) => p[0] === prop);
		return findProp && findProp[0] === prop && (
			!value
						|| (!!value && findProp[1] && findProp[1].toLowerCase() === value.toLowerCase())
		);
	}
	return item.properties[prop] && (
		!value
						|| (!!value && item.properties[prop] && item.properties[prop].toLowerCase() === value.toLowerCase())
	);
};

export const isFreeItem = (item) => (
	item.line_price === 0
						|| item.total_discount === item.original_price * item.quantity
						|| isItemHasProp(item, '_discount_code')
						|| isItemHasProp(item, '_auto_discount_code')
						|| isItemHasProp(item, '_auto_gwp')
						|| isItemHasProp(item, '_campaign_type', 'auto_gwp')
						|| isItemHasProp(item, '_campaign_type', 'manual_gwp')
						|| isItemHasProp(item, '_campaign_type', 'discount_code')
						|| isItemHasProp(item, '_campaign_type', 'auto_discount_code')
);

export const isItemIdInKey = (key, id) => (
	`${key.split(':')[0]}` === `${id}`
);

export const variantStyleDisplay = (style) => {
	const handle = kebabCase(style);
	const label = handle.includes('leaf-print') || handle.includes('girl-print') || handle.includes('pool-print') ? 'Hair Wrap' : 'Style';
	let image = false;
	if (handle.includes('leaf-print')) {
		image = assetUrl('ce-towel-leaf.svg');
	} else if (handle.includes('girl-print')) {
		image = assetUrl('ce-towel-girl.svg');
	} else if (handle.includes('pool-print')) {
		image = assetUrl('ce-pool-print.svg');
	} else if (handle === 'green' || handle === 'grün') {
		image = assetUrl('ce-eyemask-green.svg');
	} else if (handle === 'pink') {
		image = assetUrl('ce-eyemask-pink.svg');
	} else if (handle === 'lychee-dragonfruit') {
		image = assetUrl('scent-lychee-dragonfruit.svg');
	} else if (handle === 'tropical-mango') {
		image = assetUrl('scent-sweet-manggo.svg');
	}
	return { style, label, image };
};

export function getFormatString (store = 'us') {
	let format = '${{amount}}';
	switch(store) {
		case 'int': {
			format = 'S${{amount}}';
			break;
		}
		case 'uk': {
			format = '£{{amount}}'
			break;
		}
		case 'eu': {
			format = '{{amount_with_comma_separator}}€'
			break;
		}
		case 'my': {
			format = 'RM{{amount}}'
			break;
		}
	}
	return format;
}


export const formatMoney = (cents, roundedNoComma = false, store = 'us') => {
	const formatString = getFormatString(store);
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
		value = Math.floor(parseFloat(value));
	}
	return formatString.replace(placeholderRegex, value).replace('.00', '').replace(',00', '');
};

export const addXMLRequestCallback = function (callback) {
	let oldSend; let i;
	if (XMLHttpRequest.callbacks) {
		XMLHttpRequest.callbacks.push(callback);
	} else {
		XMLHttpRequest.callbacks = [callback];
		oldSend = XMLHttpRequest.prototype.send;
		XMLHttpRequest.prototype.send = function (...args) {
			for (i = 0; i < XMLHttpRequest.callbacks.length; i += 1) {
				XMLHttpRequest.callbacks[i](this, args);
			}
			oldSend.apply(this, args);
		};
	}
};

export const submitToKlaviyo = async ({store, email, phoneNumber, source}) => {
	console.log('submit to klaviyo', store, email, phoneNumber);
	const klaviyoList = {
		dev: 'UmMRZB',
		us: 'XigzGv',
		uk: 'XGPBp7',
		ca:  'TqyMrz',
		au: 'UBCCt3',
		eu: 'Y9pDee',
		my: 'XhdR9u',
		int: 'StauX5'
	}

	const klaviyoPK = {
		dev: 'ULW9Jz',
		us: 'VQmHzA',
		uk: 'TPtP96',
		ca:  'UZ7U4p',
		au: 'WYtipg',
		eu: 'XLgmDM',
		my: 'QTMSqX',
		int: 'WH4iKb'
	}

	const phone_number = phoneNumber && phoneNumber.startsWith("+") ? phoneNumber.replace("++", "+") : `+${phoneNumber}`;

	if (klaviyoPK[store] && klaviyoList[store]) {
		const url = `https://a.klaviyo.com/client/subscriptions?company_id=${klaviyoPK[store]}`;
		const data = {
			data: {
			type: "subscription",
			attributes: {
				custom_source: source,
				profile: {
				data: {
					type: "profile",
					attributes: {
						subscriptions: {
							email: {
								marketing: {
									consent: "SUBSCRIBED"
								},
							},
						},
						email,
					}
				}
				}
			},
			relationships: {
				list: {
				data: {
					type: 'list',
					id: klaviyoList[store],
				}
				}
			}
			}
		}

		try {
			globalThis.klaviyo.push([
				'identify', {
					$email: email
				}
			]);
		} catch(e) {
			console.log(e, 'Error on identifying email for klaviyo');
		}

		const options = {
			method: 'POST',
			headers: {revision: '2025-10-15', 'content-type': 'application/vnd.api+json'},
			body: JSON.stringify(data),
		};
		return fetch(url, options)
			.then(res => res.json())
			.then(json => json)
			.catch(err => err);
	}
	return {};
}

export const subscribeBluecoreWaitlist = async (email, productId, variantID, regSource, phone, welcome, igHandle) => {
	const countryCode = getCookie('country_code');
	const country = countriesCode.find((c) => c.code === countryCode)?.name || '';
	const date = new Date();
	const tse = date.getTime();
	const content = `{email:'${email}',time:${tse}}`;
	const signature = encryptParam(content);
	const region = getCookie('region');

	const data = {
		email,
		country,
		brand: `cocoandeve`,
		store: region,
		domain: window.location.hostname,
		product: productId,
		phone: phone || '',
		signature,
		welcome: true,
	};

	if (regSource) {
		data.reg_source = regSource;
	}

	if (variantID) {
		data.variant = variantID;
	}

	if (welcome) {
		data.welcome = true;
	}

	if (igHandle) {
		data.ig_handle = igHandle;
	}

	subscribeTiktok(email, phone);
	if (typeof globalThis.window.fbq === 'function') {
		globalThis.window.fbq('track', 'Lead');
	}

	try {
		const store = getCookie('region');
		submitToKlaviyo({store, email: data.email, phoneNumber: data.phone, source: regSource})
	} catch(e) {
		console.log(e, 'submit to klaviyo')
	}

	const response = await fetch('https://s-app.cocoandeve.com/bluecore/waitlist.json', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data)
	});
	return response.json();
};

export const subscribeBluecoreRegistration = (
	email,
	phone,
	regSource = 'Newsletter Popup',
) => {
	const country = getCookie('country_code');
	const region = getCookie('region');

	const date = new Date();
	const tse = date.getTime();
	const content = `{email:'${email}',time:${tse}}`;
	const signature = encryptParam(content);

	const data = {
		email,
		country,
		store: region,
		brand: 'cocoandeve',
		domain: window.location.hostname,
		phone: phone || '',
		reg_source: regSource,
		signature,
	};

	subscribeTiktok(email, phone);
	try {
		if (typeof window.fbq) {
			window.fbq('track', 'Lead');
		}
	} catch (e) {
		console.log(e);
	}

	try {
		const store = getCookie('region');
		submitToKlaviyo({store, email: data.email, phoneNumber: data.phone, source: regSource})
	} catch(e) {
		console.log(e, 'submit to klaviyo')
	}

	const ajaxRequest = new XMLHttpRequest();
	ajaxRequest.open('POST', `https://s-app.cocoandeve.com/bluecore/registrations`, true);
	ajaxRequest.setRequestHeader('Content-type', 'application/json');
	const jsonData = JSON.stringify(data);
	return ajaxRequest.send(jsonData);
};

export const submitPhoneKlaviyo = async ({store, phoneNumber, source}) => {
	console.log('submit to klaviyo', store, phoneNumber);
	const klaviyoList = {
		dev: 'UYNUCe',
		us: 'UkrRia',
		uk: 'WsMw9R',
		ca:  'Sf9WxH',
		au: 'X35yA9',
		eu: 'WkXKHK',
		my: 'XUeTL7',
		int: 'Yttc79'
	}

	const klaviyoPK = {
		dev: 'ULW9Jz',
		us: 'VQmHzA',
		uk: 'TPtP96',
		ca:  'UZ7U4p',
		au: 'WYtipg',
		eu: 'XLgmDM',
		my: 'QTMSqX',
		int: 'WH4iKb'
	}

	const phone_number = phoneNumber && phoneNumber.startsWith("+") ? phoneNumber.replace("++", "+") : `+${phoneNumber}`;

	if (klaviyoPK[store] && klaviyoList[store]) {
		const url = `https://a.klaviyo.com/client/subscriptions?company_id=${klaviyoPK[store]}`;
		const data = {
			data: {
			type: "subscription",
			attributes: {
				custom_source: source,
				profile: {
				data: {
					type: "profile",
					attributes: {
						subscriptions: {
							sms: {
								marketing: {
									consent: "SUBSCRIBED"
								},
								transactional: {
									consent: "SUBSCRIBED"
								}
							},
						},
						phone_number,
					}
				}
				}
			},
			relationships: {
				list: {
				data: {
					type: 'list',
					id: klaviyoList[store],
				}
				}
			}
			}
		}

		const options = {
			method: 'POST',
			headers: {revision: '2025-10-15', 'content-type': 'application/vnd.api+json'},
			body: JSON.stringify(data),
		};
		return fetch(url, options)
			.then(res => res.json())
			.then(json => json)
			.catch(err => err);
	}
	return {};
}

export const submitsToSmsBumpAPi = async (phone, formId, countryPhoneCode, region, source='Newsletter') => {
	let phoneNumber = `+${countryPhoneCode}${phone.replace(/^0+/, '')}`;
	// if (!['int', 'my'].includes(region)) {
		phoneNumber = `${countryPhoneCode}${phone.replace(/^0+/, '')}`;
		return submitPhoneKlaviyo({store: region, phoneNumber, source});
	// }

	const date = new Date();
	const tse = date.getTime();
	const content = `{phone:'${phoneNumber}',time:${tse},brand:'${`cocoandeve_shopify_${getCookie('region')}`}',list_id:${formId}}`;
	const signature = encryptParam(content);

	return fetch(`${tSettings.apiEndpoint}/smsbump/subscribe`, {
		body: JSON.stringify({
			phone: phoneNumber, list_id: formId, brand: `cocoandeve_shopify_${getCookie('region')}`, signature,
		}),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'POST',
	}).then((data) => data.json());
};


export const submitsToSmsBump = (phone, formId, countryLetterCode = false, countryPhoneCode = null) => {
	if (['ca', 'dev'].includes(tSettings.store)) {
		return submitsToSmsBumpAPi(phone, formId, countryPhoneCode);
	}
	const country = countryLetterCode || getCookie('_shopify_country_code');
	const phoneData = JSON.stringify({
		country,
		phone,
		email: '',
		form_id: formId,
	});
	return $.ajax({
		url: 'https://api.smsbump.com/v2/formsPublic/subscribe',
		method: 'POST',
		cache: false,
		data: phoneData,
		contentType: 'application/json; charset=utf-8',
		headers: { 'X-SMSBump-Platform': 'shopify' },
		success(res) {
			if (res.message) {
				console.log(res.message);
			} else {
				console.log('smsbumperror');
			}
		},
	});
};

export const scrollToElement = (targetSelector, offset = -70) => {
	const targetElement = document.querySelector(targetSelector);
	if (targetElement) {
		const topPosition = targetElement.getBoundingClientRect().top + window.pageYOffset + offset;
		window.scrollTo({
			top: topPosition,
			behavior: 'smooth'
		});
	}
};

export const decodeHtml = (html) => {
	const txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
};

export const updateItemInArray = (array, compareFunc, modFunc) => {
	const index = array.findIndex(compareFunc);
	const item = array[index];
	return [
		...array.slice(0, index),
		modFunc(item),
		...array.slice(index + 1),
	];
};

export const popOver = () => {
	// popover
	if ($('[data-toggle="popover"]').length) {
		$(function () {
			const popoverConfig = {
				flip: 'top',
				fallbackPlacement: ['top'],
				placement: 'top',
				delay: {
					show: 100,
				},
				offset: window.innerWidth >= screenLG ? $('[data-toggle="popover"]').attr('data-offset-lg') : $('[data-toggle="popover"]').attr('data-offset'),
				html: true,
			};
			$(document).find('[data-toggle="popover"]').popover(popoverConfig);
		});

		// Dismissable popover click out side
		$(document).on('click', function (e) {
			$(document).find('[data-toggle=popover]').each(function () {
				if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0 && !$(e.target).hasClass('custom-control-input')) {
					$(this).popover('hide');
				}
			});
		});
	}
};

export const isSwellCode = (code) => {
	if (code) {
		return code.toLowerCase().indexOf('swl_') > -1;
	}
	return false;
};

export const isCodeAllowed = (code) => {
	const whitelistedCode = tSettings.cart_code_whitelist_rejection
		.filter((discountCode) => discountCode.toLowerCase() === code.toLowerCase()).length > 0;

	return whitelistedCode; // || isSwellCode(code); allowed swell code
};

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

export const copyToClipboard = (element, copied) => {
	const $temp = $('<input>');
	$('body').append($temp);
	$temp.val($(element).data('share')).select();
	document.execCommand('copy');
	$temp.remove();
	$(element).text(copied);
};

export const productBadge = function () {
	const isBfcmSaleLink = window.location.href.includes('campaign=bfcm');
	if (isBfcmSaleLink || tSettings.allProductTags.enabled) {
		$('.product-image-carousel__container').addClass('product-card');
	}

	const productCards = $('.product-card') || 0;
	if (productCards.length > 0) {
		productCards.each((index, card) => {
			const handle = $(card).data('product-handle');
			if (handle) {
				$.get(`/products/${handle}.json`, function (data) {
					const lowestVar = data.product.variants.sort((a, b) => a.price - b.price);
					const price = lowestVar[0].price;
					const compareAtprice = lowestVar[0].compare_at_price;
					const isBfcmSale = $(card).data('campaign') === 'bfcm';
					const findSingleTag = tSettings.singleProductTags.find((item) => item.handle === handle);
					if (findSingleTag) {
						const storeTag = findSingleTag.tags?.[tSettings.store];
						const el = $(card).find('.badge--square');
						if (storeTag) el.html(storeTag.label);
					} else if (isBfcmSaleLink || isBfcmSale) {
						let skus = $(card).find('.badge--square-bfcm').data('sku');
						const productType = $(card).find('.badge--square-bfcm').data('product-type');
						if (skus) {
							skus = skus.split(',');
						}

						const selectedRule = tSettings.bfcmMechanics.rules.find((rule) => rule.sku.some((r) => skus.indexOf(r) >= 0));
						let activeLang = 'en';
						if (window.location.search.includes('testlang=de') || tSettings.store === 'de') {
							activeLang = 'de';
						} else if (window.location.search.includes('testlang=fr') || tSettings.store === 'fr') {
							activeLang = 'fr';
						}
						let textTag = productType && productType.toLowerCase() === 'bundle' ? tSettings.bfcmMechanics.content[activeLang].bundleTag : tSettings.bfcmMechanics.content[activeLang].singleTag;
						$(card).find('.badge--square:not(.badge--square-bfcm)').addClass('d-none');

						if ($('.template-product').length) {
							const selected = $('.template-product').find('[name="product-variant"]:checked');
							const idVariant = $(selected).attr('id');
							if (idVariant) {
								if (idVariant.includes('bundle') || idVariant.includes('kit') || idVariant.includes('set')) { textTag = tSettings.bfcmMechanics.content[activeLang].bundleTag; }
							}
						}

						if (selectedRule) {
							$(card).find('.badge--square-bfcm').removeClass('d-none');
							$(card).find('.badge--square-bfcm').text(textTag.replace('x%', `${selectedRule.discountAmount}%`));
							$('.template-product [data-cy="pdp-addtocart-btn"]').removeClass('btn-primary').addClass('btn-dark');
						}
					} else if (tSettings.allProductTags.enabled) {
						const el = $(card).find('.badge--square');
						const productType = el.data('product-type');
						let textTag = productType && productType.toLowerCase() === 'bundle' ? tSettings.allProductTags.bundleText : tSettings.allProductTags.singleText;
						const productExclude = tSettings.allProductTags.exception;
						if (!productExclude.includes(handle)) {
							el.text(textTag);
						}
						if ($('.template-product').length > 0 && !productExclude.includes(window.productHandle)) {
							const selected = $('.template-product').find('[name="product-variant"]:checked');
							const idVariant = $(selected).attr('id');
							if (idVariant) {
								if (idVariant.includes('bundle') || idVariant.includes('kit') || idVariant.includes('set')) {
									textTag = tSettings.allProductTags.bundleText;
								} else {
									textTag = tSettings.allProductTags.singleText;
								}
								$(card).find('.badge--square-bfcm').removeClass('d-none');
								$(card).find('.badge--square-bfcm').text(textTag);
							}
						}
					} else if (window.tSettings.productNewTagHandles_1.includes(handle)) {
						const el = $(card).find('.badge--square');
						el.html(window.tSettings.productNewTagText_1);
					} else if (window.tSettings.productNewTagHandles_2.includes(handle)) {
						const el = $(card).find('.badge--square');
						el.html(window.tSettings.productNewTagText_2);
					} else if (window.tSettings.productNewTagHandles_3.includes(handle)) {
						const el = $(card).find('.badge--square');
						el.html(window.tSettings.productNewTagText_3);
					} else if (parseInt(price, 10) < parseInt(compareAtprice, 10)) {
						const percent = Math.round(((compareAtprice - price) / compareAtprice) * 100);
						const badgeLabel = `${percent}% OFF`;
						const el = $(card).find('.badge--square');
						el.html(badgeLabel);
						el.addClass('percentage-badge');
					}
				});
			}
		});
	}
};

export const utmParams = function () {
	const loc = window.location.hostname.split('.')[0];
	let store = loc === 'www' || loc === 'dev' ? 'us' : loc;
	store = store === 'de' ? 'eu' : store;
	const utmname = `popup_signup_submit_${store}`;
	const locations = window.location.href.split('?');
	let query = '';
	if (locations.length > 1) {
		query = locations[1];
	}
	const newQuery = [];
	let utmFound = false;
	query.split('&').forEach(function (value) {
		const v = value.split('=');
		if (v[0] === 'utm_source') {
			utmFound = true;
			newQuery.push(['utm_source=supopup']);
		} else if (v[0] === 'utm_medium') {
			utmFound = true;
			newQuery.push('utm_medium=display');
		} else if (v[0] === 'utm_campaign') {
			utmFound = true;
			newQuery.push(`utm_campaign=${utmname}`);
		} else {
			newQuery.push(v.join('='));
		}
	});
	let stringQuery = newQuery.join('&');
	if (!utmFound) {
		if (stringQuery) {
			stringQuery += `&utm_source=supopup&utm_medium=display&utm_campaign=${utmname}`;
		} else {
			stringQuery += `utm_source=supopup&utm_medium=display&utm_campaign=${utmname}`;
		}
	}
	const nurl = `${window.location.pathname}?${stringQuery}`;
	window.history.pushState({ href: nurl }, '', nurl);
};

export const namshiCountry = () => {
	const country = getCookie('_shopify_country_code');
	const namshiCountries = [
		{
			countrID: 'AE',
			url: 'https://en-ae.namshi.com/coco_eve/',
		},
		{
			countrID: 'OM',
			url: 'https://en-oman.namshi.com/coco_eve/',
		},
		{
			countrID: 'QA',
			url: 'https://en-qatar.namshi.com/coco_eve/',
		},
		{
			countrID: 'SA',
			url: 'https://en-sa.namshi.com/coco_eve/',
		},
		{
			countrID: 'BH',
			url: 'https://en-bahrain.namshi.com/coco_eve/',
		},
		{
			countrID: 'KW',
			url: 'https://en-kuwait.namshi.com/coco_eve/',
		},
		{
			countrID: 'IQ',
			url: 'https://en-iq.namshi.com/coco_eve/',
		},
	];
	return namshiCountries.find((i) => i.countrID === country);
};

export const saveResult = () => {
	if (window.isLoggedIn && window.customerId) {
		const shop = `cocoandeve_shopify_${window.tSettings.store}`;
		const handle = getCookie('surveyResult');
		const sku = getCookie('surveyResultSku');

		if (handle && (getCookie('surveySubmitNew') === 'true' || getCookie('saveResultAfterLogin') === 'true')) {
			const dataSurvey = {
				shop,
				handle,
				sku,
				customer_id: window.customerId,
			};

			const url = `${window.tSettings.apiEndpoint}/surveys/save_results`;
			setCookie('surveySubmitNew', 'false');
			setCookie('saveResultAfterLogin', 'false');
			setCookie('saveResultSaved', true);
			return ajaxPromise({ url, method: 'POST', data: dataSurvey });
		}
	}
	return new Promise((resolve) => resolve(true));
};

export const updateResult = () => {
	if (window.pageTemplate === 'customers/account') {
		$.get('/account').done((e) => {
			const domAccount = $('<div></div>').append($.parseHTML(e));
			const content = domAccount.find('#quiz-content').html();
			$('#quiz-content').html(content);
			window.checkLazyImages();
		});
	}
};

export const printNamshiBtn = () => {
	if (namshiCountry()) {
		const namshiLogo = "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='137px' height='16px' viewBox='0 0 137 16' version='1.1'><g id='surface1'><path style='stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;' d='M 18.097656 0.078125 L 13.058594 11.917969 L 15.105469 11.929688 L 16.277344 9.089844 L 21.65625 9.097656 L 22.808594 11.941406 L 24.917969 11.949219 L 19.933594 0.0859375 Z M 17.03125 7.25 L 19 2.546875 L 20.957031 7.261719 Z M 2.011719 3.492188 L 8.367188 11.941406 L 10.054688 11.949219 L 10.085938 0.0976562 L 8.097656 0.0976562 L 8.074219 8.28125 L 1.902344 0.078125 L 0.03125 0.078125 L 0 11.917969 L 1.992188 11.929688 Z M 37.964844 11.949219 L 37.988281 0.109375 L 35.84375 0.0976562 L 32.351562 5.691406 L 28.878906 0.078125 L 26.734375 0.078125 L 26.714844 11.917969 L 28.683594 11.929688 L 28.707031 3.460938 L 32.273438 9.023438 L 32.339844 9.023438 L 35.976562 3.449219 L 35.941406 11.949219 Z M 63.027344 11.667969 L 63.058594 0 L 65.148438 0 L 65.117188 11.667969 Z M 59.121094 5.019531 L 53.667969 5.007812 L 53.679688 0.078125 L 51.667969 0.078125 L 51.632812 11.917969 L 53.65625 11.929688 L 53.667969 6.933594 L 59.109375 6.957031 L 59.097656 11.941406 L 61.101562 11.949219 L 61.132812 0.0976562 L 59.132812 0.0976562 Z M 44.972656 5.09375 C 42.777344 4.558594 42.253906 4.15625 42.253906 3.253906 C 42.253906 2.480469 42.949219 1.871094 44.136719 1.871094 C 45.179688 1.871094 46.214844 2.285156 47.25 3.058594 L 48.335938 1.523438 C 47.171875 0.578125 45.84375 0.0664062 44.167969 0.0664062 C 41.882812 0.0546875 40.242188 1.402344 40.242188 3.417969 C 40.230469 5.5625 41.613281 6.292969 44.050781 6.890625 C 46.183594 7.390625 46.640625 7.835938 46.640625 8.6875 C 46.640625 9.578125 45.84375 10.15625 44.605469 10.144531 C 43.179688 10.144531 42.070312 9.601562 40.96875 8.632812 L 39.75 10.078125 C 41.132812 11.320312 42.785156 11.929688 44.539062 11.929688 C 46.953125 11.941406 48.652344 10.65625 48.652344 8.480469 C 48.671875 6.5625 47.402344 5.691406 44.972656 5.09375 Z M 107.738281 2.089844 L 107.738281 0.03125 L 109.828125 0.0429688 L 109.828125 2.089844 Z M 134.78125 2.15625 L 134.792969 0.0976562 L 136.878906 0.109375 L 136.871094 2.15625 Z M 103.015625 2.066406 L 103.027344 0.0117188 L 105.117188 0.0234375 L 105.117188 2.066406 Z M 73.777344 14.910156 L 73.777344 12.867188 L 75.867188 12.867188 L 75.867188 14.921875 Z M 98.316406 2.046875 L 98.316406 0 L 100.40625 0.0117188 L 100.40625 2.058594 Z M 77.816406 14.921875 L 77.816406 12.875 L 79.914062 12.875 L 79.902344 14.933594 Z M 127.433594 11.875 L 134.878906 11.898438 L 136.945312 11.90625 L 136.96875 3.125 L 134.898438 3.113281 L 134.878906 9.808594 L 127.445312 9.785156 C 126.976562 7.390625 124.890625 5.574219 122.375 5.5625 C 119.871094 5.550781 117.78125 7.359375 117.292969 9.730469 L 109.871094 9.707031 L 109.894531 3.035156 L 107.828125 3.027344 L 107.804688 9.699219 L 105.148438 9.699219 L 105.171875 3.027344 L 103.105469 3.015625 L 103.082031 9.6875 L 100.40625 9.675781 L 100.425781 2.992188 L 98.359375 2.980469 L 98.335938 9.664062 L 91.253906 9.644531 L 91.273438 2.972656 L 88.542969 2.960938 C 86.042969 2.949219 84.007812 4.984375 83.996094 7.476562 L 83.972656 9.609375 L 73.753906 9.578125 L 73.753906 9.554688 C 73.765625 7.042969 75.800781 5.007812 78.304688 5.007812 L 79.882812 5.019531 L 79.894531 2.929688 L 78.316406 2.917969 C 74.667969 2.90625 71.6875 5.886719 71.675781 9.554688 L 71.675781 11.65625 L 86.042969 11.699219 L 86.050781 7.464844 C 86.050781 6.128906 87.160156 5.039062 88.523438 5.039062 L 89.175781 5.039062 L 89.152344 11.710938 L 117.273438 11.777344 C 117.75 14.160156 119.828125 15.96875 122.332031 15.976562 C 124.84375 16.03125 126.933594 14.246094 127.433594 11.875 Z M 122.363281 13.933594 C 120.65625 13.933594 119.261719 12.515625 119.261719 10.785156 C 119.261719 9.054688 120.667969 7.652344 122.375 7.652344 C 124.082031 7.652344 125.476562 9.066406 125.476562 10.796875 C 125.464844 12.527344 124.074219 13.933594 122.363281 13.933594 Z M 122.363281 13.933594 '/></g></svg>";
		const { url } = namshiCountry();

		if ($('.main-product-form').length > 0) {
			$('.main-product-form').each(function () {
				const dataHandle = $(this).data('handle-pdp');
				const pdpBtn = `<a target='_blank' data-handle=${dataHandle} href='${url}' class='namshi-cta btn btn-lg btn-dark btn-block text-nowrap mb-1 font-weight-normal' type='submit'>Buy at  ${namshiLogo}</a>`;
				$(this).append(pdpBtn);
				$(this).find('.d-flex').remove();
			});
			$('.namshi-cta').on('click', function () {
				const handle = $(this).data('handle');
				dataLayer.push({
					event: 'namshi',
					category: 'Redirection',
					product: handle,
				});
			});
		}

		if ($('.product-card').length > 0) {
			$('.product-card').each(function () {
				let btn = $(this).find('button[data-handle]');
				if (btn.length === 0) btn = $(this).find('button[data-product-handle]');
				const dataHandle = btn.data('handle') || btn.data('product-handle');
				const cardBtn = `<a target='_blank' data-handle=${dataHandle} href='${url}' type='button' class='namshi-cta btn btn-lg btn-dark btn-choose btn-block px-0 text-white font-weight-normal data-handle=''>Buy at ${namshiLogo}</a>`;
				btn.not('.namshi-cta').remove();
				$(this).append(cardBtn);
			});
			$('.namshi-cta').on('click', function () {
				const handle = $(this).data('handle');
				dataLayer.push({
					event: 'namshi',
					category: 'Redirection',
					product: handle,
				});
			});
		}

		if ($('.product-swatch-mobile__action').length > 0) {
			$('.product-swatch-mobile__action').each(function () {
				const dataHandle = window.location.pathname.replace('/products/', '') || '';
				const mobileBtn = `<a target='_blank' data-handle=${dataHandle} href='${url}' class='namshi-cta btn btn-lg btn-dark btn-block m-0  font-weight-normal' type='submit'>Buy at  ${namshiLogo}</a>`;

				$('.product-swatch-mobile__action button').not('.namshi-cta').remove();
				$('.product-swatch-mobile__action').append(mobileBtn);
				$('.product-swatch-mobile.fixed-bottom button').not('.namshi-cta').remove();
				$('.product-swatch-mobile.fixed-bottom').append(mobileBtn);
			});
			$('.namshi-cta').on('click', function () {
				const handle = $(this).data('handle');
				dataLayer.push({
					event: 'namshi',
					category: 'Redirection',
					product: handle,
				});
			});
		}
	}
};

export const isSwellRedemption = (item) => item.properties.some((prop) => prop.includes('_swell_redemption_token'));

export const isContainPOBOX = (txt) => {
	// const regEx = /^([ A-Za-z0-9_:/#,]*)((((((p(ost(al)?)?)|(mail(ing)?)))([ \\./#-]*)((((o|0)(ffice)?)|(b(ox|in)?)))?)|(b(ox|in)?))([ \\./#-]*))(b(ox|in)?)?(([ \\./#-]*)((n(um(ber)?)?)|no)?)([ \\.:/#-]*)([0-9]+)([ A-Za-z0-9_:/#,]*)$/im;
	const identifyPobox = ['po box', 'post office', 'p o box', 'p.o.box', 'p.o. box', 'p.o box', 'pobox',
		'post office box', 'post box', 'p. o. box', 'po. box', 'postal box', 'box ', 'p.o.b', 'pob '];
	return identifyPobox.find((item) => txt.includes(item));
};

export const calculateInstallment = (price, installmentNum) => {
	const installmentAmt = parseInt(price, 10) / installmentNum;
	return formatMoney(Math.round(installmentAmt));
};

export const isItemsIncludeSwell = (items) => {
	let hasSwellItem = false;
	if (items.length > 0) {
		hasSwellItem = items.some((item) => isItemHasProp(item, '_swell_redemption_token'));
	}
	return hasSwellItem;
};

export const afterpayHandle = (qty) => {
	if (!tSettings.payment.afterpay || typeof Afterpay !== 'object') {
		return false;
	}

	if (qty <= 0) {
		$('afterpay-placement').remove();
		return false;
	}

	const itemPrice = $('.custom-control-input:checked~.custom-control-label').find('.product-variant__price').data('orig');
	const totalPrice = qty * itemPrice;

	$('afterpay-placement').remove();

	let cur = Afterpay.currency.USD;
	let locale = Afterpay.locale.EN_US;
	if (tSettings.store === 'au') {
		cur = Afterpay.currency.AUD;
		locale = Afterpay.locale.EN_AU;
	} else if (tSettings.store === 'ca') {
		cur = Afterpay.currency.CAD;
		locale = Afterpay.locale.EN_CA;
	}

	const attributes = {
		locale,
		currency: cur,
		amount: totalPrice / 100,
	};

	Afterpay.createPlacements({
		targetSelector: '.pdp-afterpay-selector',
		attributes,
	});

	const attributes2 = {
		locale,
		currency: cur,
		amount: totalPrice / 100,
		introText: 'pay',
		modalLinkStyle: 'learn-more-text',
		showWith: false,
		size: 'sm',
	};
	Afterpay.createPlacements({
		targetSelector: '#pdp-afterpay-line',
		attributes: attributes2,
	});

	if ($('.product-form afterpay-placement').length > 0) {
		const apElement = $('.product-form afterpay-placement')[0].shadowRoot;
		$(apElement).find('.afterpay-link').attr('data-cy', 'pdp-afterpay-icon');
		// $(apElement).find('.afterpay-link').attr('data-cy', 'pdp-afterpay-icon');
	}
	if ($('.klarna-free-shipping afterpay-placement').length > 0) {
		try {
			const apElement = $('.klarna-free-shipping afterpay-placement')[0].shadowRoot;
			$('.klarna-free-shipping afterpay-placement').addClass('my-0');
			if (apElement) {
				$(apElement).find('.afterpay-paragraph').css({ 'line-height': '1.5' });
				$(apElement).find('.afterpay-link').css({ 'font-family': 'sofia-pro,Helvetica Neue,Arial,sans-serif', 'font-size': '14px' });
				$(apElement).find('.afterpay-logo').remove();
				const mainText = $(apElement).find('.afterpay-main-text');
				if (mainText) {
					const payText = mainText.text().replace('pay', '');
					mainText.html(`${payText}<br/>`);
				}
			}
		} catch (e) {
			console.log(e);
		}
	}

	return totalPrice;
};

export const klarnaHandle = (qty) => {
	if (!tSettings.payment.klarna) {
		return false;
	}

	const itemPrice = $('.custom-control-input:checked~.custom-control-label').find('.product-variant__price').data('orig');
	const totalPrice = qty * itemPrice;
	const ceil = Math.ceil(totalPrice / tSettings.payment.klarna_installment);
	$('.klarna__amount').find('b').html(formatMoney(ceil));
	return true;
};

export const shopPayHandle = (count = 0) => {
	try {
		if ($('.product-form shopify-payment-terms').length > 0) {
			setTimeout(() => {
				const apElement = $('.product-form shopify-payment-terms')[0].shadowRoot;
				if (apElement) {
					const shopPayInstallmentsBanner = $(apElement).find('shop-pay-installments-banner');
					const InstallmentBannerRoot = shopPayInstallmentsBanner[0].shadowRoot;
					if (InstallmentBannerRoot) {
						$(InstallmentBannerRoot).find('shop-pay-logo')?.remove();
						const copy = $(InstallmentBannerRoot).find('.shopify-installments__content');
						const line = copy?.text()?.replace('with', '');
						$('#shoppay-line').html(line);
						$('.shoppay-wrapper').removeClass('.d-none').addClass('d-flex');
					}
				}
			}, 500);
		} else if (count < 5) {
			setTimeout(() => {
				shopPayHandle(count + 1);
			}, 500);
		}
	} catch (e) {
		console.log(e);
	}
};

export const checkCurrency = (elems) => {
	if (elems.length > 0) {
		elems.each((i, obj) => {
			const priceNum = $(obj).text().trim();
			if (priceNum.indexOf('€') === 0) {
				$(obj).text(`${priceNum.replace('.', ',').replace('€', '')}€`);
			}
		});
	}
};

export const checkCurrencyElems = () => {
	if (typeof $ === 'function') {
		const shippingOptions = $('[data-shipping-methods] .content-box__emphasis');
		checkCurrency(shippingOptions);
		const shippingTotals = $('[data-checkout-total-shipping-target]');
		checkCurrency(shippingTotals);
		const taxesLines = $('[data-checkout-total-taxes-target]');
		checkCurrency(taxesLines);
		const gTotals = $('[data-checkout-payment-due-target]');
		checkCurrency(gTotals);
		const reviewLines = $('.content-box__row .review-block .emphasis');
		checkCurrency(reviewLines);
	}
};

export const isNeedPersonalID = (country) => tSettings.personalIdCountry.find((item) => {
	if (item.includes('-')) {
		let provs = item.split('-');
		provs = provs[provs.length - 1].split('::');
		const provSelected = $(document).find('#checkout_shipping_address_province').val();
		return provs.find((i) => i === provSelected);
	}
	return item === country;
});

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

export const getIndexTotalQuantityAndManualGwp = (edges, findIndex, id) => {
	const manualGwp = [];
	let totalQuantity = 0;
	for (let i = 0; i < edges.length; i += 1) {
		const lineItem = edges[i].node;
		const isManualGwp = edges[i].node.attributes.find((attr) => attr.key === '_campaign_type' && attr.value === 'manual_gwp');
		// eslint-disable-next-line no-param-reassign
		if (lineItem.id === id && !isManualGwp) { findIndex = i; }
		if (isManualGwp) { manualGwp.push(edges[i]); } else { totalQuantity += lineItem.quantity; }
	}
	return { totalQuantity, manualGwp, findIndex };
};

export const getItemPrice = async (handle) => {
	let data = {
		price: 0,
		compare_at_price: '',
	};
	if (handle === '') {
		return data;
	}
	data = await fetch(`/products/${handle}.json`).then((response) => response.json())
		.then((resp) => {
			const product = resp.product;
			const variant = product.variants[0];
			return {
				price: variant.price,
				compare_at_price: variant.compare_at_price,
			};
		});
	return data;
};

export const isGiftCard = (item) => item.gift_card || item.handle.includes('gift-card');

export const isGiftCardOnly = (items) => {
	const giftCards = items.filter((i) => isGiftCard(i));
	return items.length === giftCards.length;
};

export const isContainGiftCard = (items) => {
	const giftCards = items.filter((i) => isGiftCard(i));
	return giftCards.length > 0;
};

export const isArrayIdentical = (a, b) => {
	const isIdentical = (a && b)
									&& (a.length === b.length)
									&& a.every(function (element, index) {
										return element === b[index];
									});
	return isIdentical;
};

export const processURL = () => {
	const url = window.location.href;
	const splits = url.split('?');

	const queries = {};
	if (splits.length > 1) {
		window.history.pushState({ href: splits[0] }, '', splits[0]);
		const query = splits[splits.length - 1].split('&');
		query.forEach((item) => {
			const [key, value] = item.split('=');
			queries[key] = value;
		});
	}
	return queries;
};

export const getFeaturedImages = () => {
	return new Promise((resolve, reject) => {
		// if (getLSWithExpiry('featuredImages')) {
		// 	resolve(JSON.parse(getLSWithExpiry('featuredImages')));
		// } else {
			fetch(`/api/getFeaturedImages`).then(
				res => {
					res.json().then(data => {
						// setLSWithExpiry('featuredImages', JSON.stringify(data?.body || []), daysToTime(14));
						resolve(data.body);
					})
				},
			);
		// }
	});
};

export const handleVariantSubtitle = (activeShade) => {
	// variant swatch subtitle handle for pdp with sttyle/color/scent variant
	try {
		const swatchEls = $('input[name="product-variant"] ~ label .product-swatch button[data-swatch-label!=""]');
		if (swatchEls.length > 0) {
			$('.swatch-label-for-shades').empty();
			const addedHandles = [];
			swatchEls.each((k, el) => {
				const handleSwatch = $(el).data('swatch-label-handle');
				if (addedHandles.indexOf(handleSwatch) === -1) {
					const labelSwatch = $(el).data('swatch-label');
					const element = `<p class="font-size-sm w-100 mt-1 mb-0 swatch-label-${handleSwatch} ${activeShade !== labelSwatch ? 'd-none' : ''}"><b>${labelSwatch}</b></p>`;
					$('.swatch-label-for-shades').append(element);
					addedHandles.push(handleSwatch);
				}
			});
		}
	} catch (e) {
		console.log('subtitle changes failed');
	}
};

export const getVideoCoverByUrl = (videoUrl, seekTo = 0.0) => new Promise((resolve, reject) => {
	// load the file to a video player
	const defaultCover = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCABkAGQDAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJ/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//Z';
	const videoPlayer = document.createElement('video');
	videoPlayer.setAttribute('src', videoUrl);
	videoPlayer.crossOrigin = 'anonymous';
	videoPlayer.load();
	videoPlayer.addEventListener('error', (ex) => {
		// eslint-disable-next-line prefer-promise-reject-errors
		reject('error when loading video file', ex);
	});
	// load metadata of the video to get video duration and dimensions
	videoPlayer.addEventListener('loadeddata', () => {
		// seek to user defined timestamp (in seconds) if possible
		if (videoPlayer.duration < seekTo) {
			// eslint-disable-next-line prefer-promise-reject-errors
			reject('video is too short.');
			return;
		}
		// delay seeking or else 'seeked' event won't fire on Safari
		setTimeout(() => {
			videoPlayer.currentTime = seekTo;
		}, 200);
		// extract video thumbnail once seeking is complete
		videoPlayer.addEventListener('seeked', () => {
			// console.log('video is now paused at %ss.', seekTo);
			// define a canvas to have the same dimension as the video
			try {
				const canvas = document.createElement('canvas');
				canvas.width = videoPlayer.videoWidth;
				canvas.height = videoPlayer.videoHeight;
				// draw the video frame to canvas
				const ctx = canvas.getContext('2d');
				ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
				// return the canvas image as a blob
				const dataURI = canvas.toDataURL('image/jpeg');
				resolve(dataURI);
			} catch (e) {
				console.log('error on create cover video');
				resolve(defaultCover);
			}
		});
	});
});

export const capitalizeString = (str) => str.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

export const escapeHtml = (htmlString) => {
	const div = document.createElement('div');
	div.appendChild(document.createTextNode(htmlString));
	return div.innerHTML;
};

export const checkPreOrder1 = (item, variantId) => (
	tSettings.variantNotification.indexOf(parseInt(variantId, 10)) !== -1
									&& tSettings.enable_tan_change && item.discountAllocations.length === 0);

export const checkPreOrder2 = (item, variantId) => (
	tSettings.variantNotification_2.indexOf(parseInt(variantId, 10)) !== -1 && tSettings.enable_tan_change_2
										&& item.discountAllocations.length === 0);

export const checkPreOrder3 = (item, variantId) => (
	tSettings.variantNotification_3.indexOf(parseInt(variantId, 10)) !== -1 && tSettings.enable_tan_change_3
											&& item.discountAllocations.length === 0);

export const handleSwipe = (selector, callback) => {
	let xDown = null;
	let yDown = null;
	let direction = null;

	const getTouches = (evt) => evt.touches || evt.originalEvent.touches;

	const handleTouchEnd = () => {
		if ((direction === 'left' || direction === 'right') && typeof callback === 'function') {
			callback(direction);
		}
	};

	const handleTouchStart = (evt) => {
		const firstTouch = getTouches(evt)[0];
		xDown = firstTouch.clientX;
		yDown = firstTouch.clientY;
	};

	const handleTouchMove = (evt) => {
		if (!xDown || !yDown) {
			return;
		}

		const xUp = evt.touches[0].clientX;
		const yUp = evt.touches[0].clientY;

		const xDiff = xDown - xUp;
		const yDiff = yDown - yUp;
		if (Math.abs(xDiff) > Math.abs(yDiff)) {
			if (xDiff > 0) {
				direction = 'right';
			} else {
				direction = 'left';
			}
		} else {
			direction = null;
			xDown = null;
			yDown = null;
		}
	};

	try {
		if (selector) {
			selector.removeEventListener('touchstart', handleTouchStart);
			selector.removeEventListener('touchmove', handleTouchMove);
			selector.removeEventListener('touchend', handleTouchEnd);
			selector.addEventListener('touchstart', handleTouchStart, false);
			selector.addEventListener('touchmove', handleTouchMove, false);
			selector.addEventListener('touchend', handleTouchEnd, false);
		}
	} catch (e) {
		console.log(e);
	}
};

export const handleUrl = (url) => (
	url.replace('-cocoandeve.myshopify.com', '.cocoandeve.com')
		.replace('cocoandeve.myshopify.com', window.location.hostname)
		.replace('www.cocoandeve.com', window.location.hostname)
);

export const isWaitlist = (data = []) => {
	const variantWatlist = [];
    const waitlistProducts = data.filter((item) => !item.availableForSale);
    data.map((item) => {
        const variantOos = item.variants?.nodes?.filter((node) => !node.availableForSale) || [];
        if (variantOos.length > 0) variantWatlist.push(variantOos);
    });
	return waitlistProducts.length > 0 || variantWatlist.length > 0;
};

export const checkLaunchWLBox = (launchWL, handle) => {
	let isLaunchWL = false;
	let launchBox = 1;
	if (launchWL) {
		if (launchWL?.launch_wl_handles?.split(',')?.map((v) => v.trim())?.includes(handle)) {
			isLaunchWL = true;
			launchBox = 1;
		} else if (launchWL?.launch_wl2_handles?.split(',')?.map((v) => v.trim())?.includes(handle)) {
			isLaunchWL = true;
			launchBox = 2;
		} else if (launchWL?.launch_wl3_handles?.split(',')?.map((v) => v.trim())?.includes(handle)) {
			isLaunchWL = true;
			launchBox = 3;
		}
    }
	return { isLaunchWL, launchBox };
}

export const removeObjectWithId = (arr, idToRemove) => arr.filter((obj) => obj.id !== idToRemove);
