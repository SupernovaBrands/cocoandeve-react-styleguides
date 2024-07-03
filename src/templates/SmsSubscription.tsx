import { title } from "process";
import { useEffect, useRef, useState } from "react";
import ChevronDown from '~/images/icons/chevron-down.svg';
import CountriesOptions from "~/components/countries-options";
import InputCountry from '~/components/InputCountry';

import {
	validateEmail,
	validatePhone,
	getCookie,
	setCookie,
	submitsToSmsBumpAPi,
	subscribeBluecoreWaitlist,
	utmParams,
} from '~/modules/utils';

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

const SmsSubscription = (props) => {
    const { content } = props;
    const [phone, setPhone] = useState('');
	const [code, setCode] = useState(numberCodeDef);
	const [phoneError, setPhoneError] = useState({ valid: true, error: 'Please enter valid phone number' });
	const [formCompleted, setFormCompleted] = useState(false);
	const [formContent, setFormContent] = useState({ tos: '', cta_text: '', title: '', sub_title: '', description: '', success_title: '', success_desc: '', success_link: '', success_cta: '' });
	const [smsBump, setSmsbump] = useState();
    const [activeCountryCode, setaActiveCountryCode] = useState(numberCodeDef);

    const validateForm = (em, ph) => {
		validForm.phone = false;
		if (validatePhone(ph)) {
			validForm.phone = true;
		}
		if (validForm.phone) {
			if (!validForm.phone && ph !== '' && validForm.email) {
				setPhoneError({ valid: true, error: 'Please enter valid phone number' });
				return false;
			}
			return true;
		}
		return false;
	};

	const handlePhone = (e) => {
		setPhone(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (validateForm('', phone)) {
			if (validForm.phone) {
                subscribeBluecoreWaitlist('', '', '', 'SmsBumpLP', phone, true);;
                if (smsBump !== '') {
                    submitsToSmsBumpAPi(phone, smsBump, activeCountryCode).done((resp) => {
                        if (resp.status === 'error') {
                            setPhoneError({ valid: false, error: resp.message || 'Invalid phone number' });
                        } else if (resp.status === 'success' && resp.message === 'You have been already subscribed!') {
                            setPhoneError({ valid: false, error: 'Invalid phone number' });
                        } else {
                            setFormCompleted(true);
                        }
                    });
                }
			}
		}
	};

    const setContent = () => {
		if (content) {
            console.log(content);
			setFormContent(content);
			// if (content[`sms_id_${store}`]) setSmsbump(parseInt(content[`sms_id_${store}`], 10));
		}
	};

    const handleCode = (e) => {
		console.log(e);
		setaActiveCountryCode(e);
	};

	useEffect(() => {
		setContent();
	}, []);

    return (
        <>
            <div className="flex w-full align-items-center">
                <div className="sms-subscription__image w-full lg:w-2/5">
                    <picture className="embed-responsive h-full">
                        <source srcSet={content?.image_desktop.url} media="(min-width: 992px)" />
                        <img src={content?.image_mobile.url} className="embed-responsive-item" loading="lazy" />
                    </picture>
                </div>
                <div className="w-full lg:w-3/5 text-center">
                    {!formCompleted ? (
                        <form id="sms-subscription__form" className="sms-subscription__form" onSubmit={onSubmit}>
                            <h1 className="sms-subscription__title mt-3 lg:mt-0 mb-0">{ formContent.title }</h1>
                            <p className="sms-subscription__subtitle mb-1 lg:mb-2 text-lg" dangerouslySetInnerHTML={{__html: formContent.sub_title }} />
                            <p className="sms-subscription__description mb-3 lg:mb-4 w-full lg:w-4/5 mx-auto font-size-sm" dangerouslySetInnerHTML={{__html: formContent.description}} />
                            <div className="w-full md:w-4/5 pr-4 pl-4 md:mx-1/6 mx-auto">
                                <div className="flex flex-wrap">
                                    <div className="relative flex items-stretch w-full sm:mb-1 lg:mb-2">
                                        <InputCountry id="modal--sweepstakes__country" chevronCls="svg absolute fill-[#4e4e4e] h-[.75em] right-[.625em] top-[50%] [transform:translateY(-50%)]" className="bg-gray-400 mb-[0!important]" handleCode={handleCode} activeCountry={activeCountryCode} />
                                        <input value={phone} onChange={handlePhone} className="mb-0 basis-[100%!important] block w-full py-[14px] px-[16px] -ml-[1px] border-l-0 rounded-h bg-gray-400 text-gray-800 focus:outline-none focus:border-gray-400 active:border-gray-400  focus-visible:border-gray-400" type="phone" placeholder="Phone number" />
                                    </div>
                                    <small className="col-12 text-danger phone-error hidden">Please enter a valid phone number</small>
                                </div>
                            </div>
                            <div className="sms-subscription__tos !text-sm px-0 mt-2 mb-3 lg:px-5 lg:max-w-[830px]" dangerouslySetInnerHTML={{__html: formContent.tos}} />
                            <div className="row">
                                <div className="w-full md:w-1/2 md:mx-1/4 mx-auto">
                                    <button type="submit" className="w-full btn btn-primary btn-block btn-lg">{formContent.cta_text}</button>
                                    {!phoneError.valid && <p className="mt-1 mb-0 font-size-xs text-danger">{phoneError.error}</p>}
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className="sms-subscription__form-success mt-5 lg:mt-0">
                            <h2 className="sms-subscription__title mb-3">{formContent.success_title}</h2>
                            {formContent.success_desc && (<p className="sms-subscription__success mb-4 lg:pb-4 px-6 lg:px-3">{formContent.success_desc}</p>)}
                            <div className="col-12 lg:col-6 lg:mx-1/4 px-0 mt-6">
                                <a href={formContent.success_link} className="btn btn-primary btn-lg btn-block">{formContent.success_cta}</a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default SmsSubscription;