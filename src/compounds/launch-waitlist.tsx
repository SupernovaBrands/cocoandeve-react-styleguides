import React, { useState, useEffect} from 'react';
import { CheckBox, InputFormGroup, Select, Button } from "../components";
import { getCookie, setCookie, validateEmail, validatePhone } from '~/modules/utils';
import countriesList from '~/modules/countriesList';
import countriesRegion from '~/modules/countriesRegion';
import CloseButton from '~/components/modal/CloseButton';
import countriesCode from '~/modules/countries';
import Close from '~/images/icons/close.svg';
import ChevronDown from '~/images/icons/chevron-down.svg';
interface LaunchWaitListProps {
    className?: string;
    title: string;
    content: string;
    policy: string;
    success_msg: string;
    success_content: string;
    tos?: string;
    cta?: string;
    store?: string;
    onSubmitLaunchWaitlist?: any;
    forwardRef?: any;
    loggedInEmail?: any;
    productCard?: boolean;
    handleClose?: any;
    setLaunchWLSuccess?: any;
    launchSubmitted?: boolean;
    onClickDiv?: (e) => {};
    setLaunchSubmitted?: any;
    tags?: any;
    box: number;
    launchModalData?: any;
    handle?: string;
}

const LaunchWaitList: React.FC<LaunchWaitListProps> = (props) => {
    let countries = countriesList;
    const { loggedInEmail, store, tags, box } = props;

    let bgColor:string;
    const tagsLength = tags?.length || 0;
    if (tagsLength > 0) {
        for (let i=0;i<=tagsLength;i++) {
            if (tags[i] === 'Body') {
                bgColor = 'bg-purple-light';
            } else if (tags[i] === 'Tan') {
                bgColor = 'bg-yellow-light';
            } else if (tags[i] === 'Hair') {
                bgColor = 'bg-primary-light';
            } else {
                bgColor = 'bg-secondary-light';
            }
        }
    } else {
        bgColor = 'bg-yellow-light';
    }

    const [email, setEmail] = useState(loggedInEmail ?? '');
    const [phoneNumber, setPhoneNumber] = useState('');

    let defaultPhoneCode = process.env.APP_MODE === 'staging' ? '+65' : countries[0].maskValue;
    const [phoneCode, setPhoneCode] = useState(defaultPhoneCode);

    useEffect(() => {
        const defaultObj = { name: 'Singapore', dial_code: '+65', code: 'SG' };
        const currCountry = getCookie('country_code');
        const getCode = countriesCode.find((code) => code.code === currCountry) || defaultObj;
        defaultPhoneCode = countriesRegion[store].find((c:any) => c.defaultSelected).maskValue;
        if (props.productCard) {
            countries = countriesRegion[store];
            defaultPhoneCode = countriesRegion[store].find((d:any) => d.maskValue === getCode.dial_code)?.maskValue || defaultPhoneCode;
        } else {
            defaultPhoneCode = countries.find((d:any) => d.maskValue === getCode.dial_code)?.maskValue || defaultPhoneCode;
        }
        setPhoneCode(defaultPhoneCode);
        if (props?.launchModalData?.handle && getCookie(`launch_waitlist_${props?.launchModalData?.handle}`) === 'true') {
			setShowSuccess(true);
		} else {
            setShowSuccess(false);
        }
    }, []);

    const [tos, setTos] = useState(false);
    const [tosError, setTosError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [validForm, setValidForm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(props.launchSubmitted || false);
    const [tosClick, setTosClick] = useState(false);

    const submitForm = (e:any) => {
        e.preventDefault();

        if (email === '' && phoneNumber === '') {
            setPhoneError(true);
        }

        if (!tosClick) {
            setTos(false);
            setTosError(true);
            setValidForm(false);
        } else if (validForm) {
            props.onSubmitLaunchWaitlist({box, email, phoneCode, phoneNumber, fallback: () => {
                setShowSuccess(true);
                if (props?.launchModalData?.handle) setCookie(`launch_waitlist_${props.launchModalData.handle}`, true, 1);
                if (typeof props.setLaunchWLSuccess === 'function') {
                    props.setLaunchWLSuccess(true);
                }
                if (props.productCard) {
                    props.setLaunchSubmitted(true);
                }
            }});
        }
    }

    const changeEmail = (e:any) => {
        const val = e.target.value;
        setEmail(val);
        if (val && val.length > 2 && !validateEmail(val)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }

        if (email !== '' && validateEmail(email) && (phoneNumber === '' || !phoneError)) {
            setPhoneError(false);
        }
    }

    const changePhone = (e:any) => {
        const val = e.target.value;

        setPhoneNumber(val);
        if (val && !validatePhone(val)) {
            setPhoneError(true);
        } else {
            setPhoneError(false);
        }
    }

    const changePhoneCode = (e:any) => {
        if (!e.target.value) {
            setPhoneCode(countries[0].maskValue);
        } else {
            const country = countries.find((country) => country.value === e.target.value);
            setPhoneCode(country.maskValue);
        }
    }

    const changeTos = (e:any) => {
        setTos(e.target.checked);
        setTosError(!e.target.checked);
    }

    useEffect(() => {
        if (!emailError && !phoneError && tos && (email || phoneNumber)) {
            setValidForm(true);
        } else {
            setValidForm(false);
        }
    }, [email, phoneNumber, phoneCode, tos]);

    useEffect(() => {
        if (loggedInEmail) {
            setEmail(loggedInEmail);
        }
    }, [loggedInEmail]);

    const tosClickHandle = () => {
        setTosClick(true);
    };

    return (
        <>
            { !showSuccess && <div ref={props.forwardRef} className={`text-body product-waitlist ${bgColor} product-waitlist__form w-100 p-3 ${props.productCard ? '' : 'mb-3'} rounded text-center ${props.className}`} onClick={props.onClickDiv}>
                {props.productCard && (
                    // <CloseButton handleClose={props.handleClose} />
                    <button type="button" className="p-0 bg-transparent border-0 cursor-pointer top-[1em] right-[1em] absolute font-size-sm appearance-[button] leading-[1] float-right" onClick={props.handleClose} aria-label="Close" role="button">
                        <Close className={`svg--current-color w-[14px] h-[14px] overflow-hidden`}/>
                    </button>
                ) }
                {!props.productCard && <h3 className="mb-1">{props.title}</h3>}
                {props.productCard && <h2 className="h1 mx-auto mb-1">{props.title}</h2>}
                <p className={`${props.productCard ? 'mb-2' : 'mb-3 font-size-sm'}`} dangerouslySetInnerHTML={{__html: props?.content}}></p>
                <form noValidate onSubmit={submitForm} data-pdp="false" data-product-id={props.launchModalData?.productId}>
                    <div className="flex flex-wrap -mx-2">
                        <InputFormGroup type="email" name="email" placeholder="Enter your email" groupClass="w-full pr-2 pl-2" onChange={changeEmail} value={loggedInEmail ?? ''} inputClass={props.productCard ? 'h-[3.125rem] !mb-1 px-[1em] py-[0.875em]' : '!py-[13px] px-[.975em]'}/>
                        {emailError && <span className={`w-full text-primary email-error text-sm mb-g -mt-25 ${props.productCard ? 'px-2 text-left' : ''}`}>Please enter a valid email address</span> }
                    </div>
                    <span className={`block mb-1 ${props.productCard ? 'font-bold' : '-mt-1'}`}>or</span>
                    <div className={`flex flex-wrap ${props.productCard ? '' : '-mx-2'}`}>
                        <div className={`flex flex-nowrap ${props.productCard ? 'w-full mb-g' : ''}`}>
                            {props.productCard && (
                                <label htmlFor="select-countries" className="border border-gray-400 input-group-addon px-[1em] py-[0.875em] h-[3.125rem] form-control relative bg-gray-400 rounded-l-[4px] shrink grow basis-auto w-[1%] lg:border-r-[2px] lg:border-r-transparent">
                                    <span className="absolute items-center masking-select left-[1em]">{phoneCode}</span>
                                    <ChevronDown className="h-[.75em] right-[.625em] absolute top-[50%] -translate-y-[50%] fill-[#484848]" />
                                    <select
                                        id="select-countries"
                                        defaultValue={phoneCode.replace('+', '')}
                                        onChange={changePhoneCode}
                                        className="opacity-0 absolute top-0 left-0 w-[84.56px] h-[3.125rem] lg:w-[150.39px]"
                                    >
                                        <option value="" disabled>Select Country</option>
                                        {countries.map((option, index) => (
                                            <option key={`${index}-${option.value}`} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </label>
                            )}
                            <Select fontNormal={props.productCard}
                                    onChange={changePhoneCode}
                                    border={false}
                                    groupClass={`max-w-[25%] relative pr-0 ${props.productCard ? 'h-[3.125rem] md:min-w-[9.375rem] hidden' : 'block md:max-w-[20%] pl-2'}`}
                                    id="select-countries"
                                    placeholder="Select Country"
                                    masking={true} options={countries}
                                    selected={`${phoneCode.replace('+', '')}`}
                                    maskingClass={props.productCard ? 'h-[3.125rem] !mb-0  !opacity-0' : '!py-[13px]'} selectClass={props.productCard ? '!mb-0' : ''}></Select>
                            <InputFormGroup onChange={changePhone} type="text" name="phone" placeholder={`${props.productCard ? 'Phone number' : 'Enter your phone number'}`}
                                groupClass={`${props.productCard ? 'flex-1 basis-[55%] lg:basis-[57.5%] w-[1%] -ml-[1px]' : 'pr-2 pl-3 md:pl-[2.188rem] w-full'}`}
                                inputClass={props.productCard ? 'h-[3.125rem] !mb-0 px-[1rem] py-[0.875em]' : '!py-[13px] px-[.975em]'}/>
                        </div>
                        { phoneError && !props.productCard && <span className="w-full text-primary email-error text-sm mb-g -mt-25 lg:pl-3">Please enter a valid phone number</span> }
                    </div>
                    <div className={`flex flex-wrap items-center justify-center ${props.productCard ? '' : 'mb-2'}`}>
                        {props.productCard && (
                            <div className="flex flex-wrap -mx-hg lg:-mx-g lg:mt-25">
                                <div className="pl-[1.75em] pr-hg custom-control custom-checkbox col flex justify-center my-1 lg:px-g">
                                    <input onClick={tosClickHandle} type="checkbox" onChange={changeTos} name="tos" className="custom-control-input" id="agreement-lw" />
                                    <label className="custom-control-label font-size-sm font-bold" htmlFor="agreement-lw">
                                        <a href="/pages/privacy-policy" className="font-size-sm text-dark underline">I agree to Privacy Policy &amp; ToS</a>
                                    </label>
                                </div>
                            </div>
                        )}
                        {!props.productCard && (
                            <CheckBox onClick={tosClickHandle} borderLight={props.productCard} onChange={changeTos} labelClass="flex justify-content-center my-1 relative pl-3" id="agreement-launch-waitlist" checked={false}>
                                <a className="text-sm text-body underline font-bold hover:text-body" href="/pages/privacy-policy">I agree to Privacy Policy & ToS</a>
                            </CheckBox>
                        )}
                        {tosError && <span className="block w-full text-primary terms-error mb-0 mt-0 text-sm">You have not agreed to the Privacy Policy & ToS</span>}
                    </div>
                    <div className={`flex flex-wrap px-2 -mx-2 mb-1 mt-1 ${props.productCard ? 'lg:mb-2' : ''}`}>
                        <Button type="submit" buttonClass={`btn-primary w-full border-0 ${props.productCard ? 'h-[3.125rem] border-none' : '!py-[15px]'}`}>
                            { props.cta ? props.cta : 'Submit Form' }
                        </Button>
                    </div>
                    <p className={`font-size-xs lg:mt-2 font-bold ${props.productCard ? 'mb-[1rem]' : 'mb-2'}`} dangerouslySetInnerHTML={{__html: props.policy.replace('<a href', `<a class="text-xs ${props.productCard ? '' : 'underline'}" href`)}}></p>
                </form>
            </div> }

            { showSuccess && !props.productCard && <div className={`w-full p-3 mb-3 rounded text-center ${bgColor}`}>
                <h3 className="mx-4 mx-lg-5 mb-[.625rem]" dangerouslySetInnerHTML={{__html: props.success_msg}}></h3>
                <p className="font-size-sm mb-0 font-bold" dangerouslySetInnerHTML={{__html: props.success_content}}></p>
            </div> }
            {showSuccess && props.productCard && (
                <div className={`modal-body relative p-3 lg:p-4 product-waitlist ${bgColor} product-waitlist__form w-100 text-center rounded-[20px] border border-[#00000033] bg-clip-padding outline-0`}>
                    <Close onClick={props.handleClose} className={`svg--current-color cursor-pointer close absolute font-size-sm w-[14px] h-[14px] top-[1em] right-[1em]`}/>
                    <h2 className="h1 mx-auto mb-1">{props.title}</h2>
                    <p className="mb-2" dangerouslySetInnerHTML={{__html: props?.content}}></p>
                    <div className="subscribed p-4">
                        <h2 className="h1 mb-1"><b dangerouslySetInnerHTML={{__html: props.success_msg}} /></h2>
                        <p className="pb-2 font-bold mb-[1em]" dangerouslySetInnerHTML={{__html: props.success_content}} />
                    </div>
                </div>
            )}
        </>
    );
};

export default LaunchWaitList;
