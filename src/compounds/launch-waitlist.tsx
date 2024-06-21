import React, { useState, useEffect} from 'react';
import { CheckBox, InputFormGroup, Select, Button } from "../components";
import { getCookie, validateEmail, validatePhone } from '~/modules/utils';
import countriesList from '~/modules/countriesList';
import countriesRegion from '~/modules/countriesRegion';
import CloseButton from '~/components/modal/CloseButton';
import countriesCode from '~/modules/countries';

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
}

const LaunchWaitList: React.FC<LaunchWaitListProps> = (props) => {
    let countries = countriesList;
    const { loggedInEmail, store } = props;

    const [email, setEmail] = useState(loggedInEmail ?? '');
    const [phoneNumber, setPhoneNumber] = useState('');

    let defaultPhoneCode = countries[0].maskValue;
    if (props.productCard) {
        const defaultObj = { name: 'Singapore', dial_code: '+65', code: 'SG' };
        const currCountry = getCookie('country_code');
        const getCode = countriesCode.find((code) => code.code === currCountry) || defaultObj;
        countries = countriesRegion[store];
        defaultPhoneCode = countriesRegion[store].find((c) => c.defaultSelected).maskValue;
        defaultPhoneCode = countriesRegion[store].find((d) => d.maskValue === getCode.dial_code)?.maskValue || defaultPhoneCode;
    }

    const [phoneCode, setPhoneCode] = useState(defaultPhoneCode);
    const [tos, setTos] = useState(false);
    const [tosError, setTosError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [validForm, setValidForm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
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
            props.onSubmitLaunchWaitlist({email, phoneCode, phoneNumber, fallback: () => {
                setShowSuccess(true);
                if (typeof props.setLaunchWLSuccess === 'function') {
                    props.setLaunchWLSuccess(true);
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
            { !showSuccess && <div ref={props.forwardRef} className={`product-waitlist bg-yellow-light product-waitlist__form w-100 p-3 mb-3 rounded text-center ${props.className}`}>
                {props.productCard && <CloseButton handleClose={props.handleClose} /> }
                {!props.productCard && <h3 className="mb-1">{props.title}</h3>}
                {props.productCard && <h2 className="h1 mx-auto mb-1">{props.title}</h2>}
                <p className={`${props.productCard ? 'mb-2' : 'mb-3 font-size-sm'}`} dangerouslySetInnerHTML={{__html: props.content}}></p>
                <form onSubmit={submitForm} data-pdp="false" data-product-id="product-id">
                    <div className="flex flex-wrap -mx-2">
                        <InputFormGroup type="email" name="email" placeholder="Enter your email" groupClass="w-full pr-2 pl-2" onChange={changeEmail} value={loggedInEmail ?? ''} inputClass={props.productCard ? 'h-[3.125rem] !mb-1' : ''}/>
                        {emailError && <span className="w-full text-primary email-error text-sm mb-g -mt-25">Please enter a valid email address</span> }
                    </div>
                    <span className={`block mb-1 ${props.productCard ? 'font-bold' : '-mt-1'}`}>or</span>
                    <div className={`flex flex-wrap ${props.productCard ? '' : '-mx-2'}`}>
                        <div className={`flex flex-nowrap ${props.productCard ? 'w-full mb-g' : ''}`}>
                            <Select fontNormal={props.productCard} onChange={changePhoneCode} border={false} groupClass={`block max-w-[28%] relative pr-0 ${props.productCard ? 'h-[3.125rem] md:max-w-[9.375rem]' : 'md:max-w-[20%] pl-2'}`} id="select-countries" placeholder="Select Country" masking={true} options={countries} selected={`${phoneCode.replace('+', '')}`} maskingClass={props.productCard ? 'h-[3.125rem] !mb-0' : ''} selectClass={props.productCard ? '!mb-0' : ''}></Select>
                            <InputFormGroup onChange={changePhone} type="text" name="phone" placeholder={`${props.productCard ? 'Phone Number' : 'Enter your phone number'}`} groupClass={`${props.productCard ? '' : 'pr-2 pl-3 md:pl-[2.188rem]'}  w-full`} inputClass={props.productCard ? 'h-[3.125rem] !mb-0' : ''}/>
                        </div>
                        { phoneError && <span className="w-full text-primary email-error text-sm mb-g -mt-25">Please enter a valid phone number</span> }
                    </div>
                    <div className={`flex flex-wrap items-center justify-center ${props.productCard ? '' : 'mb-2'}`}>
                        <CheckBox onClick={tosClickHandle} borderLight={props.productCard} onChange={changeTos} labelClass="flex justify-content-center my-1 relative pl-3" id="agreement-launch-waitlist" checked={false}>
                            <a className="text-sm text-body underline font-bold hover:text-body" href="/pages/privacy-policy">I agree to Privacy Policy & ToS</a>
                        </CheckBox>
                        {tosError && <span className="block w-full text-primary terms-error mb-0 mt-0 text-sm">You have not agreed to the Privacy Policy & ToS</span>}
                    </div>
                    <div className={`flex flex-wrap px-2 -mx-2 mb-1 mt-1 ${props.productCard ? 'lg:mb-2' : ''}`}>
                        <Button type="submit" buttonClass={`btn-primary w-full border-0 ${props.productCard ? 'h-[3.125rem] border-none' : ''}`}>
                            { props.cta ? props.cta : 'Submit Form' }
                        </Button>
                    </div>
                    <p className={`font-size-xs lg:mt-2 font-bold ${props.productCard ? 'mb-[1rem]' : 'mb-2'}`} dangerouslySetInnerHTML={{__html: props.policy.replace('<a href', `<a class="text-xs ${props.productCard ? '' : 'underline'}" href`)}}></p>
                </form>
            </div> }

            { showSuccess && !props.productCard && <div className="w-full p-3 mb-3 rounded text-center bg-yellow-light">
                <h3 className="mx-4 mx-lg-5" dangerouslySetInnerHTML={{__html: props.success_msg}}></h3>
                <p className="font-size-sm mb-0 font-bold mt-g" dangerouslySetInnerHTML={{__html: props.success_content}}></p>
            </div> }
            {showSuccess && props.productCard && (
                <div className="modal-body p-3 lg:p-4 product-waitlist bg-yellow-light product-waitlist__form w-100 text-center rounded-[20px]">
                    <CloseButton className="right-[1.563rem] lg:right-[1em]" handleClose={props.handleClose} />
                    <h2 className="h1 mx-auto mb-1">{props.title}</h2>
                    <p className="mb-2" dangerouslySetInnerHTML={{__html: props.content}}></p>
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
