import CloseButton from '~/components/modal/CloseButton';
import InputCountry from '~/components/InputCountry';
import Button from '~/components/Button';
import Paste from '~/images/icons/paste.svg';
import { useEffect, useState } from 'react';
import {
	validateEmail,
	validatePhone,
	getCookie,
	setCookie,
	submitsToSmsBumpAPi,
	subscribeBluecoreRegistration,
	utmParams,
} from '~/modules/utils';


interface NewsletterData {
	nbp_img: any
	nbp_img_lg: any
	nbp_code: string
	nbp_desc: string
	nbp_note: string
	nbp_submit: string
	nbp_enabled: boolean
	nbp_heading: string
	nbp_smsbump: string
	floating_btn: string
	nbp_bg_color: string
	nbp_email_ph: string
	nbp_phone_ph: string
	nbp_completed: string
	nbp_heading_2: string
	nbp_desc_color: string
	nbp_heading_color: string
	nbp_completed_desc: string
	nbp_heading_2_color: string
	nbp_comliance_position: string
}

type NewsletterProp = {
	handleClose: () => void
	data: NewsletterData
}

const validForm = {
	email: false,
	phone: false,
};

let store = 'us';
// let letterCodeDef = 'SG';
let numberCodeDef = 65;
if (store === 'us') {
	// letterCodeDef = 'US';
	numberCodeDef = 1;
} else if (store === 'au') {
	// letterCodeDef = 'AU';
	numberCodeDef = 61;
} else if (store === 'UK') {
	// letterCodeDef = 'GB';
	numberCodeDef = 44;
} else if (store === 'ca') {
	// letterCodeDef = 'CA';
	numberCodeDef = 1;
} else if (store === 'eu' || store === 'fr') {
	// letterCodeDef = 'FR';
	numberCodeDef = 33;
} else if (store === 'de') {
	// letterCodeDef = 'DE';
	numberCodeDef = 49;
} else if (store === 'my' || store === 'my') {
	// letterCodeDef = 'MY';
	numberCodeDef = 60;
}

const Newsletter: React.FC<NewsletterProp> = ({ handleClose, data }) => {
	const { nbp_img, nbp_code, nbp_desc, nbp_note, nbp_img_lg, nbp_submit, nbp_enabled, nbp_heading, nbp_smsbump, floating_btn, nbp_bg_color, nbp_email_ph, nbp_phone_ph,
		nbp_completed, nbp_heading_2, nbp_desc_color, nbp_heading_color, nbp_completed_desc, nbp_heading_2_color, nbp_comliance_position
	} = data;
	const [floatingShow, setFloatingShow] = useState(true);
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [code, setCode] = useState();
	const [emailError, setEmailError] = useState<{ valid: boolean, error: string }>({ valid: true, error: 'Please enter valid email' });
	const [phoneError, setPhoneError] = useState<{ valid: boolean, error: string }>({ valid: true, error: 'Please enter valid phone number' });
	const [formCompleted, setFormCompleted] = useState(false);
	const [copied, setCopied] = useState(false);
	const [smsBump, setSmsbump] = useState('');
	const [activeCountryCode, setaActiveCountryCode] = useState(numberCodeDef);

	useEffect(() => {
		setSmsbump(nbp_smsbump || '');
	}, [])

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const handlePhone = (e) => {
		setPhone(e.target.value);
	};

	const handleCode = (e) => {
		console.log(e);
		setaActiveCountryCode(e);
	};

	const validateForm = (em, ph) => {
		validForm.email = false;
		validForm.phone = false;
		if (validateEmail(em)) {
			validForm.email = true;
		}
		if (validatePhone(ph)) {
			validForm.phone = true;
		}
		if (validForm.email || validForm.phone) {
			if (!validForm.email && em !== '') {
				setEmailError({ valid: true, error: '' });
				return false;
			}
			if (!validForm.phone && ph !== '' && validForm.email) {
				setPhoneError({ valid: true, error: '' });
				return false;
			}
			return true;
		}
		return false;
	};

	const handleForm = (e) => {
		e.preventDefault();
		// console.log('onSubmit');
		console.log(email, phone);
		if (validateForm(email, phone)) {
			// console.log('validForm', validForm);
			utmParams();
			if (validForm.email) {
				if (!validForm.phone) {
					subscribeBluecoreRegistration(email, '');
				}
				setFormCompleted(true);
			}
		}

		if (validForm.phone) {
			submitsToSmsBumpAPi(phone, smsBump, code).done((resp) => {
				// console.log('submitsToSmsBump', resp);
				if (resp.status === 'error' && !validForm.email) {
					setPhoneError({ valid: false, error: resp.message || 'Invalid phone number' });
				} else {
					setFormCompleted(true);
				}
			});
			if (validForm.email) subscribeBluecoreRegistration(email, phone);
		}
		/*
		if (typeof fbq === 'function') {
			fbq('track', 'Lead');
		}

		if (typeof ttq === 'object') {
			const phoneCode = `+${code}`;
			const phoneNumber = phone.replace(phoneCode, '');

			const ttqIdentity = {};
			if (validForm.email) ttqIdentity.email = email;
			if (validForm.phone) ttqIdentity.phone_number = `${phoneCode}${phoneNumber}`;
			ttq.identify(ttqIdentity);
		}
		if (window.dataLayer) {
			dataLayer.push({
				event: 'popup',
				category: 'Newsletter Signups',
			});
		}
		*/
		// ga('send', 'event', 'Newsletter Subscription', 'Subscribe', 'Popup Subscription');
		setCookie('signup_popup', 'signup_popup', 30);
	};

	const copyCode = (e) => {
		const dataCode = e.target.dataset.code;
		navigator.clipboard.writeText(dataCode);
		setCopied(true);
	};

	return (
		<div className={`modal-content ${nbp_bg_color}`}>
			<picture className="absolute w-full lg:h-full">
				<source srcSet={nbp_img_lg?.url} media="(min-width: 992px)" />
				<img src={nbp_img?.url} className="w-full h-full" />
			</picture>
			<div className="modal-body px-0 pb-3 pt-[10em] lg:pt-4 lg:pb-3">
				<CloseButton handleClose={handleClose} className={nbp_heading_color} />
				<div className="flex flex-wrap justify-end lg:-mx-g sm:-mx-hg">
					{!formCompleted && (
						<form className="lg:w-1/2 lg:pr-4 pr-3 pl-3 lg:pl-0">
							<h2 className={` ${nbp_heading_color || 'text-body'} h1 text-center mb-0`}>{nbp_heading}</h2>
							<p className={` ${nbp_heading_2_color || 'text-body'} text-lg text-center mb-g font-bold leading-[1.563rem]`}>{nbp_heading_2}</p>
							<p className={`${nbp_desc_color || 'text-white'} font-size-sm mb-g text-center`} dangerouslySetInnerHTML={{__html: nbp_desc}} />
							<div className="relative flex items-stretch w-full mb-0">
								<input value={email} onChange={handleEmail} id="modal--newsletter__email" className="block w-full mb-0 bg-white" type="email" placeholder={nbp_email_ph} aria-label="email" />
							</div>
							<p className={`text-center ${nbp_heading_color} mb-1 mt-1`}>and / or</p>
							<div className="relative flex items-stretch w-full">
								<InputCountry id="modal--newsletter__country" handleCode={handleCode} activeCountry={activeCountryCode} />
								<input value={phone} onChange={handlePhone} id="modal--newsletter__phone" className="block w-full mb-1 -ml-[1px] bg-white border-l-0 rounded-tl-none rounded-bl-none" type="tel" placeholder={nbp_phone_ph} aria-label="phone" />
							</div>
							<p className="text-xs mt-g text-center mb-g mx-1" dangerouslySetInnerHTML={{__html: nbp_note.replace('class="', 'class="text-xs ')}} />
							<Button type="submit" buttonClass="w-full btn-primary border-0 relative" onClick={handleForm}>{nbp_submit}</Button>
						</form>
					)}
					{formCompleted && (
						<div className="modal--newsletter__completed lg:w-1/2 pr-4 pl-4 flex items-center justify-center min-h-[25em]">
							<div className="flex flex-wrap justify-center items-center">
								<h2 className={`h1 text-center w-full ${nbp_heading_2_color || 'text-body'}`} dangerouslySetInnerHTML={{__html: nbp_completed}} /><br />
								<h3 className={`text-center ${nbp_heading_2_color || 'text-body'} mb-g`} dangerouslySetInnerHTML={{__html: nbp_completed_desc}} />
								{!copied ? (
									<Button onClick={copyCode} data-code="WELCOME" buttonClass="w-full border-0 bg-white text-primary inline-flex justify-center items-center relative">
										COPY: WELCOME <Paste className="svg--current-color ml-25" />
									</Button>
								) : (
									<Button buttonClass="w-full border-0 bg-white text-primary inline-flex justify-center items-center relative">COPIED</Button>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
};

export default Newsletter;
