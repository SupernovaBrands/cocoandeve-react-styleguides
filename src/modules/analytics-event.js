/* global ttq */
class AnalyticsEvent {
	tiktokEvent = (ev, props = {}) => {
		if (typeof ttq !== 'undefined') { ttq.track(ev, props); }
	}

	send = (category, action, label, value) => {
		if (typeof (ga) === 'function') {
			window.ga('send', 'event', {
				eventCategory: category,
				eventAction: action,
				eventLabel: label,
				eventValue: value,
			});
		}
	}

	trackingUpsell = (resourceFrom) => {
		// this.addToCart('UPSELLITEM', resourceFrom);
		let evtAction = '';
		let evtLabel = '';
		switch (resourceFrom) {
			case 'BLOG':
				evtAction = 'blog_upsell';
				evtLabel = 'Blog Upsell';
				break;
			case 'CART':
				evtAction = 'cart_upsell';
				evtLabel = 'Cart Upsell';
				break;
			default:
				evtAction = 'pdp_upsell';
				evtLabel = 'PDP Upsell';
				break;
		}
		this.send('Upsell', evtAction, evtLabel);
	}

	addToCart = (category, label) => {
		this.send(category, 'add_to_cart', label, 0);
	}

	trackSignin = () => {
		const signinSource = sessionStorage.getItem('signinSource');
		const eventTriggered = sessionStorage.getItem('signinEventTracked');
		if (signinSource && !window.customerEmail) {
			sessionStorage.removeItem('signinSource');
			sessionStorage.removeItem('signinEventTracked');
		} else if (signinSource && window.customerEmail !== '' && eventTriggered !== 'true') {
			sessionStorage.setItem('signinEventTracked', 'true');
			if (signinSource === 'registration') {
				this.send('Customer', 'Create Account');
			} else if (signinSource === 'login') {
				this.send('Customer', 'Log In');
			}
		}
	}
}

// eslint-disable-next-line import/prefer-default-export
export const gaEvent = new AnalyticsEvent();
