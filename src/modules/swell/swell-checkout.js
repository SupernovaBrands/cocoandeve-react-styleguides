/* global Modal Shopify loadJS */
import { setCookie } from '~mod/utils';

let modal = null;

const formValidation = () => {
	$.validator.addMethod('passwordRegex', (value) => /^(?=[^0-9\s]*[0-9])\S{6,}$/.test(value));
	$.validator.addMethod('customemail', (value) => /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value));

	function checkValidation(form) {
		let validator = null;

		if (form && ['dropdown__register'].includes($(form).attr('id'))) {
			validator = $(form).validate({
				rules: {
					'customer[password]': {
						required: true,
						passwordRegex: true,
					},
				},
				messages: {
					'customer[password]': {
						passwordRegex: 'Please enter at least 6 characters including 1 number.',
					},
					agreement: {
						required: 'You have not agreed to the Privacy Policy & ToS',
					},
				},
				errorPlacement: (error, element) => {
					if (element.hasClass('valid')) return;

					$(error).addClass('error text-primary font-size-sm');
					const parent = element.parent();
					if ($(element).attr('type') === 'checkbox') {
						error.insertAfter(parent);
					} else {
						error.insertAfter(element);
					}
				},
			});
		} else if (form && ['dropdown__forgot'].includes($(form).attr('id'))) {
			validator = $(form).validate({
				rules: {
					email: {
						required: {
							depends() {
								$(this).val($.trim($(this).val()));
								return true;
							},
						},
						customemail: true,
					},
				},
				messages: {
					email: {
						customemail: 'Please enter a valid email address.',
					},
				},
			});
		} else {
			validator = $(form).validate();
		}

		if ($('#CreatePassword-error').length) {
			$('#CreatePassword-error').removeClass('show-error');
		}

		if (validator.errors()) {
			const errorsLabel = validator.errors();
			const passwordRegexError = errorsLabel.filter((key, val) => $(val).attr('id') === 'CreatePassword-error' && !$(val).text().includes('field is required'));
			if (passwordRegexError[0]) {
				$(passwordRegexError[0]).addClass('show-error');
			}
		}

		const valid = $(form).valid();

		if (valid) {
			$(form).find("button[type='submit']").removeAttr('disabled');
			$(form).find("input[type='submit']").removeAttr('disabled');
		} else {
			$(form).find("button[type='submit']").attr('disabled', true);
			$(form).find("input[type='submit']").attr('disabled', true);
		}
	}

	$('#dropdown__login, #dropdown__register, #dropdown__login_existing, #dropdown__forgot').each(function (i, form) {
		if (form && ($(form).attr('id') === 'create_customer' || $(form).attr('id') === 'dropdown__register')) {
			$(form).submit(function (e) {
				e.preventDefault();
				const params = $(this).serializeArray();
				const action = $(this).attr('action');
				const formData = {};
				const email = params.find((param) => param.name === 'customer[email]');
				params.forEach((param) => { formData[param.name] = param.value; return true; });
				$('span.error-popup').remove();
				$.post(action, formData).then((res) => {
					const parser = new DOMParser();
					const newDom = parser.parseFromString(res, 'text/html');
					const errors = newDom.querySelector('.errors');
					if (errors && errors.innerText && errors.innerText.includes('already associated')) {
						$('.collapse.show').removeClass('show');
						$('#dropdown__login_existing').addClass('show');
						if (email) {
							$('#dropdown__login_existing input[type="email"]').val(email.value);
						}
					} else {
						window.ga('send', 'event', {
							eventCategory: 'Swell',
							eventAction: 'checkout_signup',
						});
						window.location.reload();
					}
				});
			});
		} else if (form && ($(form).attr('id') === 'customer_login' || $(form).attr('id') === 'dropdown__login')) {
			$(form).submit(function (e) {
				e.preventDefault();
				if (typeof Shopify === 'object' && Shopify.Checkout.step === 'contact_information') {
					setCookie('checkout_url', window.location.href);
				}

				const params = $(this).serializeArray();
				const action = $(this).attr('action');
				const formData = {};
				params.forEach((param) => { formData[param.name] = param.value; return true; });
				$('span.error-popup').remove();
				$.post(action, formData).then((res) => {
					const parser = new DOMParser();
					const newDom = parser.parseFromString(res, 'text/html');
					const error = newDom.querySelector('.error-div .error-notification');
					if (error) {
						const textError = error.innerHTML;
						$(`<span class='error-popup' style='display:block;text-align:center;color:#d62e55;margin:5px 0px;'>${textError}</span>`).insertBefore('#dropdown__login button[type="submit"]');
						$('#dropdown__login .btn--loading').removeClass('btn--loading');
					} else {
						setCookie('checkout_url', '');
						window.location.reload();
					}
				});
			});
		} else if (form && $(form).attr('id') === 'dropdown__login_existing') {
			$(form).submit(function (e) {
				e.preventDefault();
				if (typeof Shopify === 'object' && Shopify.Checkout.step === 'contact_information') {
					setCookie('checkout_url', window.location.href);
				}

				const params = $(this).serializeArray();
				const action = $(this).attr('action');
				const formData = {};
				params.forEach((param) => { formData[param.name] = param.value; return true; });
				$('span.error-popup').remove();
				$.post(action, formData).then((res) => {
					const parser = new DOMParser();
					const newDom = parser.parseFromString(res, 'text/html');
					const error = newDom.querySelector('.error-div .error-notification');
					if (error) {
						const textError = error.innerHTML;
						$(`<span class='error-popup' style='display:block;text-align:center;color:#d62e55;margin:5px 0px;'>${textError}</span>`).insertBefore('#dropdown__login_existing button[type="submit"]');
						$('#dropdown__login_existing .btn--loading').removeClass('btn--loading');
					} else {
						setCookie('checkout_url', '');
						window.location.reload();
					}
				});
			});
		} else if (form && $(form).attr('id') === 'dropdown__forgot') {
			$(form).submit(function (e) {
				e.preventDefault();
				// check email
				const reg = window.location.hostname.split('.')[0];
				const _this = this;
				$.getJSON(`https://api.cocoandeve.com/shopify/email?brand=cocoandeve_shopify_${reg}&email=${$(this).find('input[name="email"]').val()}`).then((re) => {
					if (re.length) {
						// submit to recover
						const action = $(_this).attr('action');
						const params = $(_this).serializeArray();
						const formData = {};
						params.forEach((param) => { formData[param.name] = param.value; return true; });
						$.post(action, formData).then(() => {
							$('#dropdown__forgot .success-content').removeClass('d-none');
							$('#dropdown__forgot .form-content').addClass('d-none');
						});
					} else {
						const textError = 'We couldn’t find account linked to this email';
						$(`<span class='error-popup' style='display:block;text-align:center;color:#d62e55;margin:5px 0px;'>${textError}</span>`).insertBefore('#dropdown__forgot button[type="submit"]');
						$(form).find('.btn--loading').removeClass('btn--loading');
					}
				});
			});
		}

		$(form).find("button[type='submit']").attr('disabled', true);

		$(form).find('input').focus(function () {
			checkValidation(form);
		});
		$(form).find('input').keyup(function () {
			checkValidation(form);
		});
		$(form).find("input[type='checkbox']").click(function () {
			checkValidation(form);
		});
		$(form).find('fake-checkbox').click(function () {
			checkValidation(form);
		});
	});
};

let openPopup = null;
const onOpen = (e) => {
	clearTimeout(openPopup);
	openPopup = setTimeout(() => {
		$('#dropdown__register, #dropdown__login').removeClass('show');
		if (e.lastActiveElement.getAttribute('data-popup') === 'signup') {
			$('#dropdown__register').addClass('show');
		} else if (e.lastActiveElement.getAttribute('data-popup') === 'login') {
			$('#dropdown__login').addClass('show');
		}

		$('#dropdown__forgot .success-content').addClass('d-none');
		$('#dropdown__forgot .form-content').removeClass('d-none');

		document.querySelectorAll('.modal.modal-extra-class .modal__close-button').forEach((el) => {
			el.addEventListener('click', () => {
				if (modal) {
					modal.hideModal();
				}
			});
		});

		$('[data-toggle]').on('click', (c) => {
			c.preventDefault();
			const target = c.currentTarget.getAttribute('href');
			$('.collapse.show').removeClass('show');
			$(target).addClass('show');
		});

		$('.auth-buttons a').on('click', () => {
			setCookie('checkout_url', window.location.href);
			setCookie('checkout_signup', 'signup');
		});
		formValidation();
	}, 500);
};

const listenPopup = () => {
	modal = new Modal($('#login-signup'));
	document.querySelectorAll('[data-popup]').forEach((el) => {
		el.addEventListener('click', (e) => {
			const targetEl = document.getElementById('login-signup');
			targetEl.backdropExtraClass = 'extra-class';
			targetEl.modalExtraClass = 'modal-extra-class';
			targetEl.html = targetEl.innerHTML;
			targetEl.afterOpen = onOpen;
			modal.showModal(e, targetEl);
		});
	});
};

const variant1 = () => {
	// Swell signup push message on Checkout page only with pop up for login and sign up
	if (typeof Shopify === 'object' && typeof Shopify.Checkout === 'object'
		&& Shopify.Checkout.step === 'contact_information' && !window.isLoggedIn) {
		document.querySelectorAll('.swell-checkout-tip__text a').forEach((tagA) => {
			if (tagA.innerHTML.includes('Sign up')) {
				tagA.setAttribute('data-popup', 'signup');
			} else if (tagA.innerHTML.includes('Log in')) {
				tagA.setAttribute('data-popup', 'login');
			}
		});
		listenPopup();
	}
};

const variant3 = () => {
	// Swell signup push message on both Checkout (pop up for login and sign up) and Thank You page
	variant1();
	if (typeof Shopify === 'object' && typeof Shopify.Checkout === 'object'
		&& (Shopify.Checkout.step === 'thank_you' || Shopify.Checkout.isOrderStatusPage)) {
		const html = document.getElementById('s').innerHTML;
		$(html).insertBefore('[data-order-updates]');

		document.querySelectorAll('.swell-checkout-tip--lg__action a').forEach((tagA) => {
			if (tagA.innerHTML.includes('Create account')) {
				tagA.addEventListener('click', () => {
					setCookie('checkout_signup', 'signup');
				});
			}
		});
		listenPopup();
	}
};

const waitfor$ = () => {
	if (typeof $ === 'function') {
		window.jQuery = $;
		loadJS('https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.min.js');
		variant3();
	} else {
		setTimeout(() => waitfor$(), 500);
	}
};

const swellCheckout = () => {
	waitfor$();
};

export default swellCheckout;
