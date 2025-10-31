import { useEffect, useRef, useState } from "react";
import ChevronDown from '~/images/icons/chevron-down.svg';
import CountriesOptions from "~/components/countries-options";
import InputCountry from '~/components/InputCountry';
import parse from 'html-react-parser';

import {
	validateEmail,
	validatePhone,
	submitsToSmsBumpAPi,
	subscribeBluecoreWaitlist,
} from '~/modules/utils';

const validForm = {
	email: false,
	phone: false,
};

const Sweepstakes = (props) => {
    const { content, store, trackBluecoreLaunchWaitlistEvent } = props;
    const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
    const [emailError, setEmailError] = useState<{ valid: boolean, error: string }>({ valid: true, error: 'Please enter valid email' });
	const [phoneError, setPhoneError] = useState<{ valid: boolean, error: string }>({ valid: true, error: 'Please enter valid phone number' });
    const [formCompleted, setFormCompleted] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [countryCode, setCountryCode] = useState(65);
    const [isDesktop, setIsDesktop] = useState(false);
    const [allowSubmit, setAllowSubmit] = useState(false);
    const [activeCountryCode, setaActiveCountryCode] = useState();
	const [social, setSocial] = useState('');
    let tiktokUrl = 'https://www.tiktok.com/@coco_and_eve?lang=en';
    const emailRef = useRef(null);

    const toggleCart = () => {
		setShowCart(!showCart);
	}

    const codeChangeHandler = (selectedCode) => {
        setCountryCode(selectedCode);
    }

    const handleEmail = (e) => {
		const email = e.target.value !== '' && /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(e.target.value);
        setEmail(e.target.value);
        setAllowSubmit(email);
	};

    const handlePhone = (e) => {
		setPhone(e.target.value);
		setAllowSubmit(true);
	};

    const handleCode = (e) => {
		// console.log(e);
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

	const handleSocial = (e) => {
		setSocial(e.target.value);
	};

    const handleForm = (e) => {
		e.preventDefault();
		// console.log('onSubmit');
		// console.log(email, phone);

		if (validateForm(email, phone)) {
			if (validForm.email) {
				if (!validForm.phone) {
					subscribeBluecoreWaitlist(email, '', '', 'Sweepstakes', '', true, social);
				} else {
					setPhoneError({ valid: false, error: 'Please enter a valid phone number' });
				}
				trackBluecoreLaunchWaitlistEvent(email, 'Sweepstakes');
				setFormCompleted(true);
				window.scrollTo({ top: 0, behavior: 'smooth' });
			} else {
				setEmailError({ valid: false, error: 'Please enter a valid email address' });
			}
		} else {
			setEmailError({ valid: false, error: 'Please enter a valid email address' });
			setPhoneError({ valid: false, error: 'Please enter a valid phone number' });
		}

		if (validForm.phone) {
			submitsToSmsBumpAPi(phone, content?.smsbump, activeCountryCode, store, content?.source_name || 'Sweepstakes Page').then((resp) => {
				// console.log('submitsToSmsBump', resp);
				if (resp.status === 'error' && !validForm.email) {
					setPhoneError({ valid: false, error: resp.message || 'Invalid phone number' });
				} else {
					setFormCompleted(true);
					window.scrollTo({ top: 0, behavior: 'smooth' });
				}
			});
			if (validForm.email || email === '') {
				subscribeBluecoreWaitlist(email, '', '', 'Sweepstakes', phone, true, social);
				setFormCompleted(true);
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
		}
	}

	useEffect(() => {
		if (store === 'us' || store === 'ca') {
			// @ts-ignore
			setaActiveCountryCode(1);
		} else if (store === 'au') {
			// @ts-ignore
			setaActiveCountryCode(61);
		} else if (store === 'uk') {
			// @ts-ignore
			setaActiveCountryCode(44);
		} else if (store === 'eu' || store === 'fr') {
			// @ts-ignore
			setaActiveCountryCode(33);
		} else if (store === 'de') {
			// @ts-ignore
			setaActiveCountryCode(49);
		} else if (store === 'my' || store === 'my') {
			// @ts-ignore
			setaActiveCountryCode(60);
		} else {
			// @ts-ignore
			setaActiveCountryCode(65)
		}
    }, [store]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setIsDesktop(window.innerWidth >= 991);
            };

            handleResize();
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    const backgroundStyle = {
		backgroundImage: `url(${content.sweepstakes_img.url})`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'top',
	};

	const backgroundStyleDesktop = {
		backgroundImage: `url(${content.sweepstakes_lg.url})`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
	};

	const bgValue = `
        .sweepstakes__cover {
            background-image: url(${content.sweepstakes_img.url});
            background-size: cover;
            background-repeat: no-repeat;
            
        }
        @media (min-width: 992px) {
            .sweepstakes__cover{
                background-image: url(${content.sweepstakes_lg.url});
				background-position: center;
            }
        }
    `;

    return (
        <>
			<style>{bgValue}</style>
            <section className={`sweepstakes sweepstakes__cover ${content?.bg_color ? content?.bg_color : 'bg-primary-light'}`}>
                <div className="container px-0">
                    <div className="flex flex-wrap m-0 items-center place-content-end lg:min-h-[880px] lg:flex-nowrap">
                        <div className="sweepstakes__content px-g lg:w-5/12 lg:order-1 lg:my-4">
                            {!formCompleted ? (
                                <form onSubmit={handleForm} id="sweepstakes__form" className="px-4 py-3 bg-white text-center rounded-h mt-2 lg:mt-0">
                                    <h1 className={`${content.heading_col} mb-1`}>{content.heading}</h1>
                                    <p className={`${content.subheading_col} mb-[1rem]`}>{parse(`${content.subheading}`)}</p>
									{content.social_en && (
										<div className="flex flew-wrap -mx-2 flex-col lg:flex-row">
											<div className="w-full pr-2 pl-2">
												<input className="block appearance-none w-full py-[14px] px-[16px] mb-2 text-base leading-base bg-gray-400 text-gray-800 border-0 rounded-h outline-none mb-0 sm:mb-1 lg:mb-2 sweepstakes__social-media" type="text" onChange={handleSocial} placeholder={content.social_ph} />
											</div>
										</div>
									)}

									{content.email_en && (
										<div className="flex flew-wrap -mx-2 flex-col lg:flex-row">
											<div className="w-full pr-2 pl-2">
												<input value={email} onChange={handleEmail} type="email" placeholder="Type email here" id="sweepstakes__email" className="block appearance-none w-full py-[14px] px-[16px] mb-2 text-base leading-base bg-gray-400 text-gray-800 border-0 rounded-h outline-none mb-0 sm:mb-1 lg:mb-2"></input>
											</div>
											<small className="col-12 text-danger email-error hidden">Please enter a valid email address</small>
										</div>
									)}

                                    {content.email_en && content.phone_en && (
										<div className="text-sm sm:mb-1 lg:mb-2">- or -</div>
									)}
                                    {content.phone_en && (
										<div className="flex flex-wrap">
											<div className="relative flex items-stretch w-full sm:mb-1 lg:mb-2">
												{activeCountryCode && <InputCountry store={store} id="modal--sweepstakes__country" className={`bg-gray-400 mb-[0!important]`} handleCode={handleCode} activeCountry={activeCountryCode} chevronCls="svg absolute  h-[.75em] right-[.625em] top-[50%] [transform:translateY(-50%)]" />}
												<input value={phone} onChange={handlePhone} className="mb-0 basis-[100%!important] block w-full py-[14px] px-[16px] -ml-[1px] border-l-0 rounded-h bg-gray-400 text-gray-800 focus:outline-none focus:border-gray-400 active:border-gray-400  focus-visible:border-gray-400" type="phone" placeholder="Phone number" />
											</div>
											<small className="col-12 text-danger phone-error hidden">Please enter a valid phone number</small>
										</div>
									)}
                                    {/* <div className="flex flex-wrap items-center place-content-center my-2">
                                        <div className="custom-control custom-checkbox relative flex-grow max-w-full flex flex-wrap items-center place-content-center">
                                            <input type="checkbox" name="tos" className="custom-control-input" required id="sweepstakes__toc" />
                                            <label className="custom-control-label text-sm ml-1" htmlFor="sweepstakes__toc">
                                                I agree to <a href="#" className="text-sm">Privacy Policy & ToS</a>
                                            </label>
                                        </div>
                                        <small className="col-12 text-danger terms-error hidden">You have not agreed to the Privacy Policy & ToS</small>
                                    </div> */}
                                    {/* <div className="hidden input-error toc-error text-xs text-primary mb-2">You have not agreed to the Privacy Policy & ToS</div> */}
                                    <p className={`text-[10px] mb-[1rem] leading-[13px] ${content.note_col}`} dangerouslySetInnerHTML={{ __html: content.tos_label }} />
                                    <div className="lg:mb-2 sm:mb-1">
                                        <button id="sweepstakes__submit" type="submit" className="bg-primary hover:bg-primary-darken w-full rounded border border-transparent font-bold text-white py-[13px] px-[54px] btn-primary" disabled={!allowSubmit}>{content?.submit || 'Sign me up!'}</button>
                                    </div>
                                </form>
                            ) : (
                                <div className="sweepstakes__thank-you px-4 py-3 bg-white text-center rounded">
                                    <h2 className={`h1 ${content.heading_col} mb-1`}>{content.thank_title}</h2>
                                    <p className="mb-[1rem]">{content.thank_desc}</p>
                                    <a href={content?.sweepstakes_popup_thank_shopnow_url} className="btn btn-lg btn-primary btn-block hover:text-white hover:no-underline w-full border-2 border border-primary">{content?.sweepstakes_popup_thank_shopnow || 'Shop Coco & Eve'}</a>
                                </div>
                            )}
                            <p className={`text-xs my-2 lg:mb-0 ${content.desc_col}`} dangerouslySetInnerHTML={{ __html: content.foot_note }} />
							{content?.social_icon_color === 'dark' ? (
								<div className="social-icon flex justify-center mt-4 mb-4">
									<a className="mx-1 mt-2" href="https://www.facebook.com/cocoandeve" target="_blank" rel="noreferrer">
										<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.3047 0H2.69532C1.20645 0 0 1.20645 0 2.69532V17.3047C0 18.7936 1.20645 20 2.69532 20H9.90023L9.91251 12.8526H8.05602C7.81504 12.8526 7.61857 12.6577 7.6178 12.4167L7.60936 10.1128C7.60783 9.8703 7.80429 9.67307 8.04681 9.67307H9.90023V7.44667C9.90023 4.86417 11.4781 3.45741 13.7828 3.45741H15.6738C15.9156 3.45741 16.1113 3.65311 16.1113 3.89563V5.83807C16.1113 6.07982 15.9156 6.27552 15.6738 6.27629H14.5134C13.2602 6.27629 13.0176 6.87184 13.0176 7.74598V9.67307H15.7713C16.0338 9.67307 16.2372 9.90254 16.2064 10.1627L15.9332 12.4666C15.9071 12.6869 15.7199 12.8526 15.4981 12.8526H13.0299L13.0176 20H17.3047C18.7928 20 20 18.7936 20 17.3047V2.69532C20 1.20645 18.7928 0 17.3047 0" fill="black" /></svg>
									</a>
									<a className="mx-1 mt-2" href="https://www.instagram.com/cocoandeve/" target="_blank" rel="noreferrer">
										<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M5.877 19.9395C4.9104 19.8954 4.1616 19.7523 3.4497 19.4751C2.7513 19.2042 2.205 18.8478 1.6785 18.3213C1.152 17.7957 0.7965 17.2494 0.5247 16.5501C0.2475 15.8364 0.1044 15.0876 0.0603 14.1228C0.0117 13.0518 0 12.6972 0 9.9999C0 7.3026 0.0117 6.948 0.0603 5.877C0.1044 4.914 0.2475 4.1652 0.5247 3.4497C0.7956 2.7513 1.152 2.205 1.6785 1.6785C2.205 1.152 2.7513 0.7956 3.4497 0.5247C4.1652 0.2475 4.914 0.1044 5.877 0.0603C6.948 0.0117 7.3026 0 9.9999 0C12.6972 0 13.0518 0.0117 14.1228 0.0603C15.0876 0.1044 15.8364 0.2475 16.5501 0.5247C17.2494 0.7965 17.7957 1.152 18.3213 1.6785C18.8478 2.205 19.2042 2.7513 19.4751 3.4497C19.7523 4.1616 19.8954 4.9104 19.9395 5.877C19.9881 6.948 19.9998 7.3026 19.9998 9.9999C19.9998 12.6972 19.9881 13.0518 19.9395 14.1228C19.8954 15.0903 19.7523 15.8391 19.4751 16.5501C19.2033 17.2494 18.8478 17.7957 18.3213 18.3213C17.7957 18.8478 17.2494 19.2033 16.5501 19.4751C15.8391 19.7523 15.0903 19.8954 14.1228 19.9395C13.0518 19.9881 12.6972 19.9998 9.9999 19.9998C7.3026 19.9998 6.948 19.9881 5.877 19.9395ZM5.9589 1.8603C4.9851 1.9044 4.455 2.0673 4.1022 2.2041C3.6351 2.3859 3.3021 2.6028 2.952 2.9529C2.6028 3.3021 2.3859 3.6351 2.2041 4.1022C2.0673 4.455 1.9044 4.9851 1.8603 5.9589C1.8117 7.0065 1.8018 7.3215 1.8018 9.9999C1.8018 12.6783 1.8117 12.9933 1.8603 14.0409C1.9044 15.0165 2.0673 15.5457 2.2041 15.8976C2.3859 16.3638 2.6019 16.6968 2.952 17.0478C3.3012 17.397 3.6342 17.6139 4.1022 17.7957C4.455 17.9325 4.9851 18.0954 5.9589 18.1395C7.0065 18.1881 7.3215 18.198 9.9999 18.198C12.6783 18.198 12.9933 18.1881 14.0409 18.1395C15.0165 18.0954 15.5457 17.9325 15.8976 17.7957C16.3656 17.6139 16.6986 17.397 17.0478 17.0478C17.3979 16.6968 17.6139 16.3638 17.7957 15.8976C17.9325 15.5457 18.0954 15.0165 18.1395 14.0409C18.1881 12.9933 18.198 12.6783 18.198 9.9999C18.198 7.3215 18.1881 7.0065 18.1395 5.9589C18.0954 4.9851 17.9325 4.455 17.7957 4.1022C17.6139 3.636 17.3979 3.303 17.0478 2.952C16.6968 2.6019 16.3638 2.3859 15.8976 2.2041C15.5457 2.0673 15.0165 1.9044 14.0409 1.8603C12.9933 1.8117 12.6783 1.8018 9.9999 1.8018C7.3215 1.8018 7.0065 1.8117 5.9589 1.8603ZM4.8645 9.9999C4.8645 7.1685 7.1685 4.8645 9.9999 4.8645C12.8313 4.8645 15.1344 7.1685 15.1344 9.9999C15.1344 12.8313 12.8313 15.1344 9.9999 15.1344C7.1685 15.1344 4.8645 12.8313 4.8645 9.9999ZM6.6663 9.9999C6.6663 11.8377 8.1621 13.3326 9.9999 13.3326C11.8377 13.3326 13.3326 11.8377 13.3326 9.9999C13.3326 8.1621 11.8377 6.6663 9.9999 6.6663C8.1621 6.6663 6.6663 8.1621 6.6663 9.9999ZM14.1381 4.662C14.1381 3.9996 14.6754 3.4623 15.3378 3.4623C16.0011 3.4623 16.5384 3.9996 16.5384 4.662C16.5384 5.3244 16.0011 5.8617 15.3378 5.8617C14.6754 5.8617 14.1381 5.3244 14.1381 4.662Z" fill="black" /></svg>
									</a>
									<a className="mx-1 mt-2" href={tiktokUrl} target="_blank" rel="noreferrer">
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#000"><path d="M18.77 0H1.23C.55 0 0 .55 0 1.23v17.54C0 19.45.55 20 1.23 20h17.54c.68 0 1.23-.55 1.23-1.23V1.23C20 .55 19.45 0 18.77 0zm-2.96 7.99c-1.06 0-2.04-.36-2.83-.95v5.26a4.4 4.4 0 1 1-3.82-4.36v1.87a2.76 2.76 0 0 0-.57-.06c-1.4 0-2.55 1.14-2.55 2.55 0 1.4 1.14 2.55 2.55 2.55s2.55-1.14 2.55-2.55V3.31h1.85c0 1.56 1.27 2.83 2.83 2.83v1.85z"/></svg>
									</a>
								</div>
							) : (
								<div className="social-icon flex justify-center mt-4 mb-4">
									<a className="mx-1 mt-2" href="https://www.facebook.com/cocoandeve" target="_blank" rel="noreferrer">
										<svg width="20" height="20" viewBox="0 0 20 20" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M17.3047 0H2.69532C1.20645 0 0 1.20645 0 2.69532V17.3047C0 18.7936 1.20645 20 2.69532 20H9.90023L9.91251 12.8526H8.05602C7.81504 12.8526 7.61857 12.6577 7.6178 12.4167L7.60936 10.1128C7.60783 9.8703 7.80429 9.67307 8.04681 9.67307H9.90023V7.44667C9.90023 4.86417 11.4781 3.45741 13.7828 3.45741H15.6738C15.9156 3.45741 16.1113 3.65311 16.1113 3.89563V5.83807C16.1113 6.07982 15.9156 6.27552 15.6738 6.27629H14.5134C13.2602 6.27629 13.0176 6.87184 13.0176 7.74598V9.67307H15.7713C16.0338 9.67307 16.2372 9.90254 16.2064 10.1627L15.9332 12.4666C15.9071 12.6869 15.7199 12.8526 15.4981 12.8526H13.0299L13.0176 20H17.3047C18.7928 20 20 18.7936 20 17.3047V2.69532C20 1.20645 18.7928 0 17.3047 0" fill="white" /></svg>
									</a>
									<a className="mx-1 mt-2" href="https://www.instagram.com/cocoandeve/" target="_blank" rel="noreferrer">
										<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M5.877 19.9395C4.9104 19.8954 4.1616 19.7523 3.4497 19.4751C2.7513 19.2042 2.205 18.8478 1.6785 18.3213C1.152 17.7957 0.7965 17.2494 0.5247 16.5501C0.2475 15.8364 0.1044 15.0876 0.0603 14.1228C0.0117 13.0518 0 12.6972 0 9.9999C0 7.3026 0.0117 6.948 0.0603 5.877C0.1044 4.914 0.2475 4.1652 0.5247 3.4497C0.7956 2.7513 1.152 2.205 1.6785 1.6785C2.205 1.152 2.7513 0.7956 3.4497 0.5247C4.1652 0.2475 4.914 0.1044 5.877 0.0603C6.948 0.0117 7.3026 0 9.9999 0C12.6972 0 13.0518 0.0117 14.1228 0.0603C15.0876 0.1044 15.8364 0.2475 16.5501 0.5247C17.2494 0.7965 17.7957 1.152 18.3213 1.6785C18.8478 2.205 19.2042 2.7513 19.4751 3.4497C19.7523 4.1616 19.8954 4.9104 19.9395 5.877C19.9881 6.948 19.9998 7.3026 19.9998 9.9999C19.9998 12.6972 19.9881 13.0518 19.9395 14.1228C19.8954 15.0903 19.7523 15.8391 19.4751 16.5501C19.2033 17.2494 18.8478 17.7957 18.3213 18.3213C17.7957 18.8478 17.2494 19.2033 16.5501 19.4751C15.8391 19.7523 15.0903 19.8954 14.1228 19.9395C13.0518 19.9881 12.6972 19.9998 9.9999 19.9998C7.3026 19.9998 6.948 19.9881 5.877 19.9395ZM5.9589 1.8603C4.9851 1.9044 4.455 2.0673 4.1022 2.2041C3.6351 2.3859 3.3021 2.6028 2.952 2.9529C2.6028 3.3021 2.3859 3.6351 2.2041 4.1022C2.0673 4.455 1.9044 4.9851 1.8603 5.9589C1.8117 7.0065 1.8018 7.3215 1.8018 9.9999C1.8018 12.6783 1.8117 12.9933 1.8603 14.0409C1.9044 15.0165 2.0673 15.5457 2.2041 15.8976C2.3859 16.3638 2.6019 16.6968 2.952 17.0478C3.3012 17.397 3.6342 17.6139 4.1022 17.7957C4.455 17.9325 4.9851 18.0954 5.9589 18.1395C7.0065 18.1881 7.3215 18.198 9.9999 18.198C12.6783 18.198 12.9933 18.1881 14.0409 18.1395C15.0165 18.0954 15.5457 17.9325 15.8976 17.7957C16.3656 17.6139 16.6986 17.397 17.0478 17.0478C17.3979 16.6968 17.6139 16.3638 17.7957 15.8976C17.9325 15.5457 18.0954 15.0165 18.1395 14.0409C18.1881 12.9933 18.198 12.6783 18.198 9.9999C18.198 7.3215 18.1881 7.0065 18.1395 5.9589C18.0954 4.9851 17.9325 4.455 17.7957 4.1022C17.6139 3.636 17.3979 3.303 17.0478 2.952C16.6968 2.6019 16.3638 2.3859 15.8976 2.2041C15.5457 2.0673 15.0165 1.9044 14.0409 1.8603C12.9933 1.8117 12.6783 1.8018 9.9999 1.8018C7.3215 1.8018 7.0065 1.8117 5.9589 1.8603ZM4.8645 9.9999C4.8645 7.1685 7.1685 4.8645 9.9999 4.8645C12.8313 4.8645 15.1344 7.1685 15.1344 9.9999C15.1344 12.8313 12.8313 15.1344 9.9999 15.1344C7.1685 15.1344 4.8645 12.8313 4.8645 9.9999ZM6.6663 9.9999C6.6663 11.8377 8.1621 13.3326 9.9999 13.3326C11.8377 13.3326 13.3326 11.8377 13.3326 9.9999C13.3326 8.1621 11.8377 6.6663 9.9999 6.6663C8.1621 6.6663 6.6663 8.1621 6.6663 9.9999ZM14.1381 4.662C14.1381 3.9996 14.6754 3.4623 15.3378 3.4623C16.0011 3.4623 16.5384 3.9996 16.5384 4.662C16.5384 5.3244 16.0011 5.8617 15.3378 5.8617C14.6754 5.8617 14.1381 5.3244 14.1381 4.662Z" fill="white" /></svg>
									</a>
									<a className="mx-1 mt-2" href={tiktokUrl} target="_blank" rel="noreferrer">
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#fff"><path d="M18.77 0H1.23C.55 0 0 .55 0 1.23v17.54C0 19.45.55 20 1.23 20h17.54c.68 0 1.23-.55 1.23-1.23V1.23C20 .55 19.45 0 18.77 0zm-2.96 7.99c-1.06 0-2.04-.36-2.83-.95v5.26a4.4 4.4 0 1 1-3.82-4.36v1.87a2.76 2.76 0 0 0-.57-.06c-1.4 0-2.55 1.14-2.55 2.55 0 1.4 1.14 2.55 2.55 2.55s2.55-1.14 2.55-2.55V3.31h1.85c0 1.56 1.27 2.83 2.83 2.83v1.85z"/></svg>
									</a>
								</div>
							)}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Sweepstakes;
