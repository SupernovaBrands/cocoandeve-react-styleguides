import InputCountry from '~/components/InputCountry';
import CloseButton from '~/components/modal/CloseButton';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import {
	validateEmail,
	validatePhone,
	getCookie,
	setCookie,
	submitsToSmsBumpAPi,
	subscribeBluecoreWaitlist,
	utmParams,
} from '~/modules/utils';

interface SweepstakesData {
	src: string
	srcSet: string
	sweepstakes_popup_title: string
	sweepstakes_popup_desc: string
	sweepstakes_popup_img_lg: any
	sweepstakes_popup_img: any
	sweepstakes_foot_note,
	sweepstakes_popup_email: string,
	sweepstakes_popup_phone: string,
	smsbump: string,
	sweepstakes_popup_thank_title: string,
	sweepstakes_popup_thank_title_color: string,
	sweepstakes_popup_thank_desc: string,
	sweepstakes_popup_thank_desc_color: string,
	sweepstakes_popup_thank_shopnow_url: string,
	sweepstakes_popup_thank_shopnow: string,
}

type SweepstakesProp = {
	handleClose: () => void
	data: SweepstakesData
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

const Sweepstakes: React.FC<SweepstakesProp> = ({ handleClose, data }) => {
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [emailError, setEmailError] = useState<{ valid: boolean, error: string }>({ valid: true, error: 'Please enter valid email' });
	const [phoneError, setPhoneError] = useState<{ valid: boolean, error: string }>({ valid: true, error: 'Please enter valid phone number' });
	const [formCompleted, setFormCompleted] = useState(false);
	const [activeCountryCode, setaActiveCountryCode] = useState(numberCodeDef);
	
	const isMobile = (globalThis.innerWidth < 769);
	const styles = {
		'background-image': isMobile ? `` : `url(${data?.sweepstakes_popup_img_lg?.url})`,
	};

	const onClose = () => {
		setCookie('sweepstakes_signup_popup', 'sweepstakes_signup_popup', 30);
		handleClose();
	};

	const handleEmail = (e) => {
		console.log(e.target);
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
		console.log('onSubmit');
		console.log(email, phone);

		if (validateForm(email, phone)) {
			if (validForm.email) {
				if (!validForm.phone) {
					subscribeBluecoreWaitlist(email, '', '', 'Sweepstakes', '', true);
				} else {
					setPhoneError({ valid: false, error: 'Please enter a valid phone number' });
				}
				setFormCompleted(true);
			} else {
				setEmailError({ valid: false, error: 'Please enter a valid email address' });
			}
		} else {
			setEmailError({ valid: false, error: 'Please enter a valid email address' });
			setPhoneError({ valid: false, error: 'Please enter a valid phone number' });
		}

		if (validForm.phone) {
			submitsToSmsBumpAPi(phone, data?.smsbump, activeCountryCode).done((resp) => {
				// console.log('submitsToSmsBump', resp);
				if (resp.status === 'error' && !validForm.email) {
					setPhoneError({ valid: false, error: resp.message || 'Invalid phone number' });
				} else {
					setFormCompleted(true);
				}
			});
			if (validForm.email || email === '') {
				subscribeBluecoreWaitlist(email, '', '', 'Sweepstakes', phone, true);
				setFormCompleted(true);
			}
		}
	}

	return (
		<>
			{/* @ts-ignore */}
			<div style={styles} className="modal-content mx-0 lg:mx-4 bg-center bg-cover bg-white">
				<div className="modal-body px-0 py-0">
					<picture className="w-full lg:hidden">
						<source srcSet={data?.sweepstakes_popup_img_lg?.url} media="(min-width: 992px)" />
						<img src={data?.sweepstakes_popup_img?.url} className="w-full h-full" alt="Sweepstakes mobile banner" />
					</picture>
					{!formCompleted ? (
						<div className="px-g lg:px-4 py-3 lg:py-4">
							<div className="flex flex-wrap -mx-hg lg:-mx-g justify-end lg:mb-g mb-0">
								<div className="hidden lg:block w-3/4 lg:w-8/12 lg:pl-0 text-center pr-0 lg:pr-g">
									<h2 className="modal--sweepstakes__title h1 mb-0 text-bold mt-1 lg:mt-1 lg:mb-0 text-body">{data?.sweepstakes_popup_title}</h2>
									<p className="lg:mb-0 lg:mt-1 text-gray-600" dangerouslySetInnerHTML={{ __html: data?.sweepstakes_popup_desc }} />
								</div>
								<div className="lg:hidden w-full pl-0 lg:pl-0 text-center pr-0 lg:pr-g">
									<h2 className="modal--sweepstakes__title h2 mb-1 text-bold mt-1 lg:mt-1 lg:mb-0 text-body">{data?.sweepstakes_popup_title}</h2>
									<p className="lg:mb-0 lg:mt-1 font-size-sm mb-1 text-gray-600" dangerouslySetInnerHTML={{ __html: data?.sweepstakes_popup_desc }} />
								</div>
							</div>
							<div id="waitlist-page" className="flex flex-wrap justify-end" data-page-type="Sweepstakes" data-form-id="#sweepstakes-popup__form" data-email-form="#sweepstakes__email">
								<form onSubmit={handleForm} id="sweepstakes-popup__form" data-page="sweeptakes" className="modal--sweepstakes__form lg:w-8/12 lg:pl-0 mt-1 lg:mt-0" data-thank-you-message="You’re in!">
									<div className="relative flex items-stretch w-full mb-25">
										<input value={email} onChange={handleEmail} id="sweepstakes__email" data-regsource="sweepstakes" data-page="sweepstakes" className="block w-full bg-gray-400 text-gray-800 focus:outline-none focus:border-gray-400 active:border-gray-400  focus-visible:border-gray-400" type="email" placeholder={data?.sweepstakes_popup_email} />
									</div>
									<input type="checkbox" name="tos" className="hidden" value="true" checked />
									<div className="text-center mb-25 sweepstakes-popup__separator">and / or</div>
									<div className="relative flex items-stretch w-full mb-g">
										<InputCountry id="modal--sweepstakes__country" className="bg-gray-400" handleCode={handleCode} activeCountry={activeCountryCode} />
										<input value={phone} onChange={handlePhone} className="block w-full py-g px-2 mb-1 -ml-[1px] border-l-0 rounded-tl-none rounded-bl-none bg-gray-400 text-gray-800 focus:outline-none focus:border-gray-400 active:border-gray-400  focus-visible:border-gray-400" type="phone" placeholder={data?.sweepstakes_popup_phone} />
									</div>
									<p className="hidden lg:block sweepstakes-popup__toc text-center mb-1 mt-1 font-size-sm text-gray-600" dangerouslySetInnerHTML={{__html: data?.sweepstakes_foot_note.replace('text-underline', ' text-underline font-size-sm ') }}></p>
									<p className="lg:hidden sweepstakes-popup__toc text-center mb-1 mt-1 font-size-sm text-gray-600" dangerouslySetInnerHTML={{__html: data?.sweepstakes_foot_note.replace('text-underline', ' text-underline font-size-sm ') }}></p>
									<Button  type="submit" buttonClass="btn-primary w-full border-0">Register now</Button>
									
								</form>
							</div>
						</div>
					) : (
						<div className="px-3 lg:px-4 py-3 lg:py-4 bg-white">
							<div className="flex flex-wrap  justify-end">
								<div className="sweepstakes-popup__thank-you text-center lg:w-1/2 flex-col items-center justify-center mt-1 mb-1 lg:my-[60px] text-gray-600 flex">
									<div className="flex flex-wrap  justify-center lg:justify-center">
										<div className="w-full lg:px-4">
											<h3 className={`mb-g sweepstakes-popup__title font-bold h1 ${data.sweepstakes_popup_thank_title_color}`}>{data.sweepstakes_popup_thank_title}</h3>
											<p className={`mb-3 ${data.sweepstakes_popup_thank_desc_color}`}>{data.sweepstakes_popup_thank_desc}</p>
										</div>
									</div>
									<a href={data.sweepstakes_popup_thank_shopnow_url} className="btn btn-lg btn-primary block w-100 lg:w-auto">{data.sweepstakes_popup_thank_shopnow}</a>
								</div>
							</div>
						</div>
					)}
					
					<CloseButton handleClose={onClose} />
				</div>
			</div>
		</>
	);
};

export default Sweepstakes;
