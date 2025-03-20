import CloseButton from '~/components/modal/CloseButton';
import InputCountry from '~/components/InputCountry';
import Button from '~/components/Button';
import Paste from '~/images/icons/paste.svg';
import { useEffect, useState, useRef } from 'react';
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
	store: string
}

const validForm = {
	email: false,
	phone: false,
};

let store = 'dev';
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

const Newsletter: React.FC<NewsletterProp> = ({ handleClose, data, store }) => {
	const { nbp_img, nbp_code, nbp_desc, nbp_note, nbp_img_lg, nbp_submit, nbp_enabled, nbp_heading, nbp_smsbump, floating_btn, nbp_bg_color, nbp_email_ph, nbp_phone_ph,
		nbp_completed, nbp_heading_2, nbp_desc_color, nbp_heading_color, nbp_completed_desc, nbp_heading_2_color, nbp_comliance_position
	} = data;
	//const [floatingShow, setFloatingShow] = useState(true);
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	//const [code, setCode] = useState();
	const [emailError, setEmailError] = useState<{ valid: boolean, error: string }>({ valid: true, error: 'Please enter valid email' });
	const [phoneError, setPhoneError] = useState<{ valid: boolean, error: string }>({ valid: true, error: 'Please enter valid phone number' });
	const [formCompleted, setFormCompleted] = useState(false);
	const [copied, setCopied] = useState(false);
	const [smsBump, setSmsbump] = useState('');
	const [activeCountryCode, setaActiveCountryCode] = useState(65);
	//const [allowSubmit, setAllowSubmit] = useState(false);
	const emailRef = useRef(null);

	useEffect(() => {
        if (emailRef.current) {
            emailRef.current.focus();
        }
    }, []);

	useEffect(() => {
		setSmsbump(nbp_smsbump || '');
	}, []);

	// const handleEmail = (e) => {
	// 	const email = e.target.value !== '' && /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(e.target.value);
	// 	setEmail(e.target.value);
	// 	setAllowSubmit(email);
	// };

	const handleEmail = (e) => {
		setEmailError({ valid: true, error: 'Please enter valid email' });
		setEmail(e.target.value);
	};

	const handlePhone = (e) => {
		setPhoneError({ valid: true, error: 'Please enter valid phone number' });
		setPhone(e.target.value);
	};

	const handleCode = (e) => {
		setaActiveCountryCode(e);
	};

	const validateForm = (email, phone) => {
		const emailValid = /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
		const phoneValid = /^(?:\+?\d{1,3}[-.\s]?)?(?:\(\d{1,4}\)|\d{1,4})[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(phone);
		const isPhoneEmpty = !phone || phone.trim() === '';
		const emailRequired = isPhoneEmpty;
		return { emailValid, emailRequired, phoneValid };
	};
	
	const handleForm = (e) => {
		e.preventDefault();
		const { emailValid, emailRequired, phoneValid } = validateForm(email, phone);
		// If email is required and not valid, show email validation error
		if (emailRequired && !emailValid) {
			setEmailError({ valid: false, error: 'Please enter a valid email address' });
			setPhoneError({ valid: true, error: '' });
		} else {
			// Clear email error if email is valid or not required
			setEmailError({ valid: true, error: '' });
			// Process form submission
			utmParams();
			if (emailValid || !emailRequired) {
				subscribeBluecoreRegistration(email, phone);
				if (emailValid) setFormCompleted(true);
			}
			if (phone && phone !== '' && phoneValid) {
				submitsToSmsBumpAPi(phone, smsBump, activeCountryCode).then((resp) => {
					if (resp.status === 'error') {
						setPhoneError({ valid: false, error: resp.message || 'Invalid phone number' });
					} else {
						setFormCompleted(true);
					}
				});
			} else {
				setPhoneError({ valid: false, error: 'Please enter valid phone number' });
			}
			// Identify user data for tracking
			try {
				// @ts-ignore
				window.wtba = window.wtba || [];
				// @ts-ignore
				window.wtba.push({
					"type": "identify",
					"phone": phone,
					"email": email
				});
			} catch (e) {
				console.log('error wtba push');
			}

			// setCookie('signup_popup', 'signup_popup', 30);
		}
	};

	// const validateForm = (em, ph) => {
	// 	validForm.email = false;
	// 	validForm.phone = false;
	// 	if (validateEmail(em)) {
	// 		validForm.email = true;
	// 	}
	// 	if (validatePhone(ph)) {
	// 		validForm.phone = true;
	// 	}
	// 	if (validForm.email || validForm.phone) {
	// 		if (!validForm.email && em !== '') {
	// 			setEmailError({ valid: true, error: '' });
	// 			return false;
	// 		}
	// 		if (!validForm.phone && ph !== '' && validForm.email) {
	// 			setPhoneError({ valid: true, error: '' });
	// 			return false;
	// 		}
	// 		return true;
	// 	}
	// 	return false;
	// };

	// const handleForm = (e) => {
	// 	e.preventDefault();
	// 	// console.log('onSubmit');
	// 	if (validateForm(email, phone)) {
	// 		// console.log('validForm', validForm);
	// 		utmParams();
	// 		if (validForm.email) {
	// 			if (!validForm.phone) {
	// 				subscribeBluecoreRegistration(email, '');
	// 			}
	// 			setFormCompleted(true);
	// 		}
	// 	}

	// 	if (validForm.phone) {
	// 		submitsToSmsBumpAPi(phone, smsBump, activeCountryCode).then((resp) => {
	// 			// console.log('submitsToSmsBump', resp);
	// 			if (resp.status === 'error' && !validForm.email) {
	// 				setPhoneError({ valid: false, error: resp.message || 'Invalid phone number' });
	// 			} else {
	// 				setFormCompleted(true);
	// 			}
	// 		});
	// 		if (validForm.email) subscribeBluecoreRegistration(email, phone);
	// 	}

	// 	try {
	// 		// @ts-ignore
	// 		window.wtba = window.wtba || [];
	// 		// @ts-ignore
	// 		window.wtba.push({
	// 			"type": "identify",
	// 			"phone": phone,
	// 			"email": email
	// 		});
	// 	} catch (e) {
	// 		console.log('error wtba push');
	// 	}

	// 	setCookie('signup_popup', 'signup_popup', 30);
	// };

	const copyCode = (e) => {
		//const dataCode = e.currentTarget.getAttribute('data-code');
		navigator.clipboard.writeText('WELCOME');
		setCopied(true);
	};

	useEffect(() => {
        let numberCodeDef = 65;
		if (store === 'us') {
			numberCodeDef = 1;
		} else if (store === 'au') {
			numberCodeDef = 61;
		} else if (store === 'UK') {
			numberCodeDef = 44;
		} else if (store === 'ca') {
			numberCodeDef = 1;
		} else if (store === 'eu' || store === 'fr') {
			numberCodeDef = 33;
		} else if (store === 'de') {
			numberCodeDef = 49;
		} else if (store === 'my' || store === 'my') {
			numberCodeDef = 60;
		}

		setaActiveCountryCode(numberCodeDef)
    }, [store]);

	return (
		<div className={`modal-content flex flex-col w-full outline-0 bg-clip-padding ${nbp_bg_color}`}>
			<picture className="absolute w-full lg:w-auto lg:h-full">
				<source srcSet={nbp_img_lg?.url} media="(min-width: 992px)" />
				<img src={nbp_img?.url} className="w-full h-full" />
			</picture>
			<div className="modal-body px-0 pb-3 pt-[10em] lg:py-4 px-0">
				<CloseButton handleClose={handleClose} className="fill-[#000] h-[1em!important] text-sm [width:auto!important]" />
				<div className="flex flex-wrap justify-end mx-0">
					{!formCompleted && (
						<form className="relative lg:w-1/2 lg:pr-4 pr-3 pl-3 lg:pl-0" onSubmit={handleForm}>
							<h2 className={` ${nbp_heading_color || 'text-body'} h1 text-center mb-0 leading-[1.25!important]`}>{nbp_heading}</h2>
							<p className={` ${nbp_heading_2_color || 'text-body'} text-lg text-center mb-[1rem] font-bold leading-[1.25]`}>{nbp_heading_2}</p>
							<p className={`${nbp_desc_color || 'text-white'} font-size-sm mb-g leading-[1.25!important] text-center`} dangerouslySetInnerHTML={{__html: nbp_desc}} />
							<div className="relative flex items-stretch w-full mb-0 flex-wrap mb-25">
								<input ref={emailRef} value={email} onChange={handleEmail} id="modal--newsletter__email" className="bg-clip-padding block w-full mb-0 bg-gray-400 py-[14px] px-[16px] leading-[1.25] h-[3.125rem] rounded-h border border-gray-400" type="email" placeholder={nbp_email_ph} aria-label="email" />
							</div>
							{!emailError.valid && <span className='text-[#dc3545] text-xs block'>{emailError.error}</span>}
							<p className={`text-center mb-1 mt-1`}>and / or</p>
							<div className="relative flex items-stretch w-full flex-wrap mb-25">
								<InputCountry store={store} id="modal--newsletter__country" chevronCls="svg absolute fill-[#4e4e4e] h-[.75em] right-[.625em] top-[50%] [transform:translateY(-50%)]" handleCode={handleCode} activeCountry={activeCountryCode} className="bg-gray-400 py-[14px] px-[16px] rounded-h relative flex-[1_1_auto] w-[1%!important] bg-clip-padding" />
								<input value={phone} onChange={handlePhone} id="modal--newsletter__phone" className="bg-clip-padding block w-full -ml-[1px] bg-gray-400 border-l-0 rounded-tl-none rounded-bl-none py-[14px] px-[16px] leading-[1.25] h-[3.125rem] rounded-h border border-gray-400 flex-[1_1_auto] w-[1%] lg:basis-[57.5%] sm:basis-[55%]" type="tel" placeholder={nbp_phone_ph} aria-label="phone" />
							</div>
							{!phoneError.valid && <span className='text-[#dc3545] text-xs block'>{phoneError.error}</span>}
							<p className="text-xs mt-g text-center my-g mx-1 leading-[1.25!important]" dangerouslySetInnerHTML={{__html: nbp_note.replace('class="', 'class="text-xs leading-[1.25!important] font-bold underline ')}} />
							<button type="submit" className="relative hover:bg-primary-dark w-full border-2 border-transparent rounded bg-primary py-[13px] px-[54px] text-white font-bold align-middle block text-base">{nbp_submit}</button>
						</form>
					)}
					{formCompleted && (
						<div className="modal--newsletter__completed lg:w-1/2 px-3 lg:px-4 flex items-center justify-center min-h-[25em]">
							<div className="flex flex-wrap justify-center items-center">
								<h2 className={`h1 leading-[1.25!important] mb-1 text-center w-full ${nbp_heading_2_color || 'text-body'}`} dangerouslySetInnerHTML={{__html: nbp_completed}} /><br />
								<h3 className={`text-center leading-[1.25!important] ${nbp_heading_2_color || 'text-body'} mb-g`} dangerouslySetInnerHTML={{__html: nbp_completed_desc}} />
								{!copied ? (
									<Button onClick={copyCode} data-code="WELCOME" buttonClass="w-full items-center border-2 border-white bg-white text-primary inline-flex justify-center relative">
										COPY: WELCOME <Paste className="svg--current-color svg" />
									</Button>
								) : (
									<Button buttonClass="w-full border-2 border-white bg-white text-primary inline-flex justify-center items-center relative">COPIED</Button>
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
