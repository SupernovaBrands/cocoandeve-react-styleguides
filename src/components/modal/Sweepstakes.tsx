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
	email_en: boolean
	phone_en: boolean
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
	sweepstakes_popup_title_color: string,
	sweepstakes_popup_desc_color: string,
	sweepstakes_popup_tos_class: string,
	sweepstakes_text_color: string,
	sweepstakes_foot_note_color: string,
	sweepstakes_popup_title_color_mob: string,
	sweepstakes_popup_desc_color_mob: string,
	sweepstakes_foot_note_color_mob: string,
	sweepstakes_popup_thank_title_color_mob: string,
	sweepstakes_popup_thank_desc_color_mob: string,
	sweepstakes_popup_submit: string,
	source_name: string,
	sbp_close_color: string,
}

type SweepstakesProp = {
	handleClose: () => void
	data: SweepstakesData
	trackBluecoreLaunchWaitlistEvent: (email: string, pageType: string) => void
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

const Sweepstakes: React.FC<SweepstakesProp> = ({ handleClose, data, trackBluecoreLaunchWaitlistEvent, store }) => {
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
		setEmail(e.target.value);
	};

	const handlePhone = (e) => {
		setPhone(e.target.value);
	};

	const handleCode = (e) => {
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

		if (validateForm(email, phone)) {
			if (validForm.email) {
				if (!validForm.phone) {
					subscribeBluecoreWaitlist(email, '', '', 'Sweepstakes', '', true);
					trackBluecoreLaunchWaitlistEvent(email, 'Sweepstakes');
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
			submitsToSmsBumpAPi(phone, data?.smsbump, activeCountryCode, store, "Sweepstakes Pop-up").then((resp) => {
				console.log('submitsToSmsBump', resp);
				// if (resp.status === 'error' && !validForm.email) {
				// 	setPhoneError({ valid: false, error: resp.message || 'Invalid phone number' });
				// } else {
				// 	setFormCompleted(true);
				// }
			});
			if (validForm.email || email === '') {
				subscribeBluecoreWaitlist(email, '', '', 'Sweepstakes', phone, true);
				trackBluecoreLaunchWaitlistEvent(email, 'Sweepstakes');
				setFormCompleted(true);
			}
		}
		setCookie('sweepstakes_signup_popup', 'sweepstakes_signup_popup', 30);

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
	}

	useEffect(() => {
        let numberCodeDef = 65;
		if (store === 'us') {
			numberCodeDef = 1;
		} else if (store === 'au') {
			numberCodeDef = 61;
		} else if (store === 'uk') {
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
	// console.log('content,', data);
	return (
		<>
			{/* @ts-ignore */}
			<div style={styles} className="modal-content mx-0 lg:mx-4 bg-center bg-cover lg:min-h-[500px] lg:flex lg:items-center">
				<div className="modal-body px-0 py-0 bg-white lg:bg-transparent">
					<picture className="w-full lg:hidden">
						<source srcSet={data?.sweepstakes_popup_img_lg?.url} media="(min-width: 992px)" />
						<img src={data?.sweepstakes_popup_img?.url} className="w-full h-full" alt="Sweepstakes mobile banner" />
					</picture>
					{!formCompleted ? (
						<div className="px-3 lg:px-4 py-3 lg:py-4">
							<div className="flex flex-wrap -mx-hg lg:-mx-g justify-end lg:mb-g mb-0 ">
								<div className="hidden lg:block w-3/4 lg:w-8/12 lg:pl-0 text-center pr-0 lg:pr-g">
									<h2 className={`modal--sweepstakes__title h1 mb-0 text-bold mt-1 lg:mt-1 lg:mb-0 ${data?.sweepstakes_popup_title_color ? data?.sweepstakes_popup_title_color  : 'text-body'}`}>{data?.sweepstakes_popup_title}</h2>
									<p className={`lg:mb-0 lg:mt-1 ${data?.sweepstakes_popup_desc_color ? data?.sweepstakes_popup_desc_color  : 'text-body'}`} dangerouslySetInnerHTML={{ __html: data?.sweepstakes_popup_desc }} />
								</div>
								<div className="lg:hidden w-full pl-0 lg:pl-0 text-center pr-0 lg:pr-g -mx-hg">
									<h2 className={`modal--sweepstakes__title h2 mb-1 text-bold mt-1 lg:mt-1 lg:mb-0 ${data?.sweepstakes_popup_title_color_mob ? data?.sweepstakes_popup_title_color_mob  : 'text-body'}`}>{data?.sweepstakes_popup_title}</h2>
									<p className={`lg:mb-0 lg:mt-1 font-size-sm mb-1 ${data?.sweepstakes_popup_desc_color_mob ? data?.sweepstakes_popup_desc_color_mob  : 'text-body'} px-0  lg:px-0`} dangerouslySetInnerHTML={{ __html: data?.sweepstakes_popup_desc }} />
								</div>
							</div>
							<div id="waitlist-page" className="flex flex-wrap justify-end " data-page-type="Sweepstakes" data-form-id="#sweepstakes-popup__form" data-email-form="#sweepstakes__email">
								<form onSubmit={handleForm} id="sweepstakes-popup__form" data-page="sweeptakes" className="modal--sweepstakes__form lg:min-w-[378px] lg:w-8/12 lg:pl-0 mt-1 lg:mt-0" data-thank-you-message="You’re in!">
									{data?.email_en && (
										<div className="relative flex items-stretch w-full mb-25">
											<input aria-label="Sweepstakes email input" value={email} onChange={handleEmail} id="sweepstakes__email" data-regsource="sweepstakes" data-page="sweepstakes" className="block w-full bg-gray-400 text-gray-800 focus:outline-none focus:border-gray-400 active:border-gray-400  focus-visible:border-gray-400 px-[16px] py-[14px] rounded-[4px] border-[1px]" type="email" placeholder={data?.sweepstakes_popup_email} />
										</div>
									)}
									{!emailError.valid && data?.email_en && <span className='text-[#dc3545] text-xs block'>{emailError.error}</span>}
									<input aria-label="Sweepstakes input accept terms and conditions" type="checkbox" name="tos" className="hidden" value="true" checked />
									{data?.email_en && data?.phone_en && (
										<>
											<div className={`text-center mb-25 sweepstakes-popup__separator hidden lg:block ${data?.sweepstakes_popup_desc_color}`}>and / or</div>
											<div className={`text-center mb-25 sweepstakes-popup__separator lg:hidden  ${data?.sweepstakes_popup_desc_color_mob}`}>and / or</div>
										</>
									)}
									{data?.phone_en && (
										<div className="relative flex items-stretch w-full flex-wrap mb-[5px]">
											<InputCountry store={store} id="modal--sweepstakes__country" chevronCls="svg absolute fill-[#4e4e4e] h-[.75em] right-[.625em] top-[50%] [transform:translateY(-50%)]" className="bg-gray-400 py-[14px] px-[16px] rounded-h relative flex-[1_1_auto] w-[1%!important] bg-clip-padding" handleCode={handleCode} activeCountry={activeCountryCode} />
											<input aria-label="Sweepstakes phone number input" value={phone} onChange={handlePhone} className="bg-clip-padding block w-full mb-0 -ml-[1px] bg-gray-400 border-l-0 rounded-tl-none rounded-bl-none py-[14px] px-[16px] leading-[1.25] h-[3.125rem] rounded-h border flex-[1_1_auto] w-[1%] lg:basis-[57.5%] sm:basis-[55%] active:border-[#ffffff] focus:border-[#ffffff] border-[#ffffff]" type="phone" placeholder={data?.sweepstakes_popup_phone} />
										</div>
									)}
									{!phoneError.valid && data?.phone_en && <span className='text-[#dc3545] text-xs block'>{phoneError.error}</span>}
									<p className={`hidden lg:block sweepstakes-popup__toc text-center mb-1 mt-2 font-size-xs ${data?.sweepstakes_foot_note_color ? data?.sweepstakes_foot_note_color  : 'text-body'}`} dangerouslySetInnerHTML={{__html: data?.sweepstakes_foot_note.replace('text-underline', ' text-underline ') }}></p>
									<Button  type="submit" buttonClass="btn-primary w-full border-0 py-g mt-2 lg:mt-0">{data.sweepstakes_popup_submit || 'Register now'}</Button>
									<p className={`lg:hidden sweepstakes-popup__toc text-center mb-1 mt-1 text-[8px] ${data?.sweepstakes_foot_note_color_mob ? data?.sweepstakes_foot_note_color_mob  : 'text-body'}`} dangerouslySetInnerHTML={{__html: data?.sweepstakes_foot_note.replace('text-underline', ' text-underline ') }}></p>
								</form>
							</div>
						</div>
					) : (
						<div className="px-3 lg:px-4 py-3 lg:py-4 ">
							<div className="flex flex-wrap  justify-end lg:-mx-g">
								<div className="sweepstakes-popup__thank-you text-center lg:w-1/2 flex-col items-center justify-center mt-1 mb-1 lg:my-[60px] text-gray-600 flex lg:px-g">
									<div className="flex flex-wrap  justify-center lg:justify-center">
										<div className="w-full hidden lg:block">
											<h3 className={`mb-g sweepstakes-popup__title font-bold h1 ${data.sweepstakes_popup_thank_title_color}`}>{data.sweepstakes_popup_thank_title}</h3>
											<p className={`mb-3 ${data.sweepstakes_popup_thank_desc_color}`}>{data.sweepstakes_popup_thank_desc}</p>
										</div>
										<div className="w-full lg:hidden">
											<h3 className={`mb-g sweepstakes-popup__title font-bold h1 ${data.sweepstakes_popup_thank_title_color_mob}`}>{data.sweepstakes_popup_thank_title}</h3>
											<p className={`mb-3 ${data.sweepstakes_popup_thank_desc_color_mob}`}>{data.sweepstakes_popup_thank_desc}</p>
										</div>
									</div>
									<a href={data.sweepstakes_popup_thank_shopnow_url} className="btn btn-lg btn-primary block w-full border-primary hover:border-primary hover:text-white !no-underline">{data.sweepstakes_popup_thank_shopnow}</a>
								</div>
							</div>
						</div>
					)}

					<CloseButton handleClose={onClose} className={`${data?.sbp_close_color ?? 'fill-[#000]'} h-[1em!important] text-sm [width:auto!important]`}   />
				</div>
			</div>
		</>
	);
};

export default Sweepstakes;
