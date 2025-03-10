import CloseButton from '~/components/modal/CloseButton';
import InputCountry from '~/components/InputCountry';
import Button from '~/components/Button';
import Paste from '~/images/icons/paste.svg';
import BrandLogo from '~/images/ce-logo.svg';
import { useEffect, useState, useRef } from 'react';
import {
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
    trackEvent: any
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

const Newsletter: React.FC<NewsletterProp> = ({ handleClose, data, store, trackEvent }) => {
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
        // send event to ga4
        trackEvent('newsletter_popup_view', {
            category: 'Newsletter Registration',
            target: 'newsletter_popup_register',
        });
    }, []);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePhone = (e) => {
        setPhone(e.target.value);
    };

    const handleCode = (e) => {
        setaActiveCountryCode(e);
    };

    const validateForm = (email, phone) => {
        const emailValid = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isPhoneEmpty = !phone || phone.trim() === '';
        const emailRequired = isPhoneEmpty && !email;
        return { emailValid, emailRequired };
    };
    
    const handleForm = (e) => {
        e.preventDefault();
        const { emailValid, emailRequired } = validateForm(email, phone);
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
                setFormCompleted(true);
            }
            if (phone && phone !== '') {
                submitsToSmsBumpAPi(phone, smsBump, activeCountryCode).then((resp) => {
                    if (resp.status === 'error') {
                        setPhoneError({ valid: false, error: resp.message || 'Invalid phone number' });
                    } else {
                        setFormCompleted(true);
                    }
                });
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
            
            // send event to ga4
            trackEvent('newsletter_popup', {
                category: 'Newsletter Registration',
                target: 'newsletter_popup_register',
            });
            setCookie('signup_popup', 'signup_popup', 30);
        }
    };

    const copyCode = (e) => {
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
        <div className={`modal-content flex flex-col w-full outline-0 bg-clip-padding bg-pink-light`}>
            {/* <picture className="absolute w-full lg:w-auto lg:h-full">
                <source srcSet={nbp_img_lg?.url} media="(min-width: 992px)" />
                <img src={nbp_img?.url} className="w-full h-full" />
            </picture> */}
            <div className="modal-body px-3 pt-3 pb-5 lg:px-4 lg:pt-4 lg:pb-[5rem]">
                <CloseButton handleClose={handleClose} className="!h-auto !w-auto">
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="5.33325" y="4.96094" width="15.0845" height="1.88558" rx="0.942789" transform="rotate(45 5.33325 4.96094)" fill="#4E4E4E"/>
                        <rect x="4" y="15.6273" width="15.0845" height="1.88555" rx="0.942776" transform="rotate(-45 4 15.6273)" fill="#4E4E4E"/>
                    </svg>
                </CloseButton>

                <div className="flex flex-wrap flex-col justify-center items-center mx-0">
                    <BrandLogo className="lg:h-[2.578rem] mb-3 w-[5rem] lg:w-[6.25rem] " />
                    {!formCompleted && (
                        <form className="relative" onSubmit={handleForm}>
                            <span className='block text-center text-sm mb-25 lg:text-base'>UNLOCK</span>
                            <h2 className={` ${nbp_heading_color || 'text-body'} text-xl lg:text-2xl text-center mb-0 leading-[1.25!important]`}>{nbp_heading}</h2>
                            <p className={` ${nbp_heading_2_color || 'text-body'} text-lg lg:text-xl text-center mb-[1rem] font-bold leading-[1.25]`}>{nbp_heading_2}</p>
                            <p className={`font-size-sm mb-2 lg:mb-[1.5rem] leading-[1.25!important] text-center text-gray-600`} dangerouslySetInnerHTML={{__html: nbp_desc}} />
                            <div className="relative flex items-stretch w-full mb-0 flex-wrap mb-25">
                                <input ref={emailRef} value={email} onChange={handleEmail} id="modal--newsletter__email" className="bg-clip-padding block w-full mb-0 bg-white py-[14px] px-[16px] leading-[1.25] h-[3.125rem] rounded-[.5rem] border border-gray-500" type="email" placeholder={nbp_email_ph || 'Enter email here'} aria-label="email" />
                            </div>
                            {!emailError.valid && <span className='text-[#dc3545] text-xs block'>{emailError.error}</span>}
                            {/* <p className={`text-center mb-1 mt-1`}>and / or</p>
                            <div className="relative flex items-stretch w-full flex-wrap mb-25">
                                <InputCountry store={store} id="modal--newsletter__country" chevronCls="svg absolute fill-[#4e4e4e] h-[.75em] right-[.625em] top-[50%] [transform:translateY(-50%)]" handleCode={handleCode} activeCountry={activeCountryCode} className="bg-gray-400 py-[14px] px-[16px] rounded-h relative flex-[1_1_auto] w-[1%!important] bg-clip-padding" />
                                <input value={phone} onChange={handlePhone} id="modal--newsletter__phone" className="bg-clip-padding block w-full -ml-[1px] bg-gray-400 border-l-0 rounded-tl-none rounded-bl-none py-[14px] px-[16px] leading-[1.25] h-[3.125rem] rounded-h border border-gray-400 flex-[1_1_auto] w-[1%] lg:basis-[57.5%] sm:basis-[55%]" type="tel" placeholder={nbp_phone_ph} aria-label="phone" />
                            </div> */}
                            {!phoneError.valid && <span className='text-[#dc3545] text-xs block'>{phoneError.error}</span>}
                            <p className="text-xs text-gray-600 mt-g text-center mt-1 mb-2 leading-[1.25!important]" dangerouslySetInnerHTML={{__html: nbp_note.replace('class="', 'class="text-xs leading-[1.25!important] font-bold underline ').replace('text-primary', 'text-gray-600').replace('font-normal', 'font-bold').replace('no-underline', 'underline')}} />
                            <button type="submit" className="relative hover:bg-primary-dark w-full border-2 border-transparent rounded bg-primary py-[13px] px-[54px] text-white font-bold align-middle block text-base mb-1">Yes please</button>
                            <button type="button" onClick={handleClose} className="relative hover:bg-primary-dark w-full border border-primary rounded bg-white py-[13px] px-[54px] text-primary font-bold align-middle block text-base hover:bg-white">I’ll pass</button>
                        </form>
                    )}
                    {formCompleted && (
                        <div className="modal--newsletter__completed flex items-center justify-center">
                            <div className="flex flex-wrap justify-center items-center">
                                <h2 className={`text-xl lg:text-2xl leading-[1.25!important] mb-1 lg:mb-2 text-center w-full ${nbp_heading_2_color || 'text-body'}`} dangerouslySetInnerHTML={{__html: nbp_completed}} /><br />
                                <h3 className={`font-normal text-center leading-[1.25!important] px-3 lg:px-5 ${nbp_heading_2_color || 'text-body'} mb-g`} dangerouslySetInnerHTML={{__html: nbp_completed_desc}} />
                                {!copied ? (
                                    <Button onClick={copyCode} data-code="WELCOME" buttonClass="w-full items-center border-2 border-primary bg-primary text-white inline-flex justify-center relative">
                                        COPY: WELCOME <Paste className="ml-25 svg--current-color svg" />
                                    </Button>
                                ) : (
                                    <Button buttonClass="w-full border-2 border-primary bg-primary text-white inline-flex justify-center items-center relative">COPIED</Button>
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
