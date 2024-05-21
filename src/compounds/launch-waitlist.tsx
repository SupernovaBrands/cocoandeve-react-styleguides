import React, { useState, useEffect} from 'react';
import { CheckBox, InputFormGroup, Select, Button } from "../components";
import { validateEmail, validatePhone } from '~/modules/utils';

interface LaunchWaitListProps {
    className?: string;
    title: string;
    content: string;
    policy: string;
    success_msg: string;
    success_content: string;
    tos?: string;
    cta?: string;
    onSubmitLaunchWaitlist?: any;
    forwardRef?: any;
}

const LaunchWaitList: React.FC<LaunchWaitListProps> = (props) => {
    const countries = [{maskValue: '+65', value: 'SG', label: 'Singapore'}, {maskValue: '+1', value: 'US', label: 'United States'}];
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneCode, setPhoneCode] = useState(countries[0].maskValue);
    const [tos, setTos] = useState(true);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [validForm, setValidForm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const submitForm = (e:any) => {
        e.preventDefault();
        props.onSubmitLaunchWaitlist({email, phoneCode, phoneNumber, fallback: () => {
            console.log('after submit');
            setShowSuccess(true);
        }});
    }

    const changeEmail = (e:any) => {
        const val = e.target.value;
        setEmail(val);
        if (val && val.length > 2 && !validateEmail(val)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    }

    const changePhone = (e:any) => {
        const val = e.target.value;

        setPhoneNumber(val);
        if (val && val.length > 4 && !validatePhone(val)) {
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
    }

    useEffect(() => {
        if (!emailError && !phoneError && tos && (email || phoneNumber)) {
            setValidForm(true);
        } else {
            setValidForm(false);
        }
    }, [email, phoneNumber, phoneCode, tos]);

    return (
        <>
            { !showSuccess && <div ref={props.forwardRef} className={`product-waitlist bg-yellow-light product-waitlist__form w-100 p-3 mb-3 rounded text-center ${props.className}`}>
                <h3 className="mb-1">{props.title}</h3>
                <p className="mb-3 font-size-sm" dangerouslySetInnerHTML={{__html: props.content}}></p>
                <form onSubmit={submitForm} data-pdp="false" data-product-id="product-id">
                    <div className="flex flex-wrap -mx-2">
                        <InputFormGroup type="email" name="email" placeholder="Enter your email" groupClass="w-full pr-2 pl-2" onChange={changeEmail}/>
                        {emailError && <small className="w-full text-primary email-error -mt-g">Please enter a valid email address</small> }
                    </div>
                    <span className="block mb-1 -mt-1">or</span>
                    <div className="flex flex-wrap -mx-2">
                        <Select onChange={changePhoneCode} border={false} groupClass="block w-1/3 relative pl-2 pr-0" id="select-countries" placeholder="Select Country" masking={true} options={countries} selected="SG"></Select>
                        <InputFormGroup onChange={changePhone} type="text" name="phone" placeholder="Enter your phone number" groupClass="w-2/3 pr-2 pl-2"/>
                        { phoneError && <small className="w-full text-primary email-error -mt-g">Please enter a valid phone number</small> }
                    </div>
                    <div className="flex flex-wrap items-center justify-start">
                        <div className="-mt-1 w-full">
                            <CheckBox onChange={changeTos} label={`I agree to <a href="#">Privacy Policy & ToS<\/a>`} id="agreement-waitlist" checked={true}/>
                            {!tos && <small className="block w-full text-primary terms-error -mt-1 text-center">You have not agreed to the Privacy Policy & ToS</small>}
                        </div>
                    </div>
                    <div className="flex flex-wrap px-2 -mx-2 mb-1">
                        <Button type="submit" buttonClass="btn-primary w-full border-0" disabled={!validForm}>
                            { props.cta ? props.cta : 'Submit Form' }
                        </Button>
                    </div>
                    <p className="font-size-xs font-bold" dangerouslySetInnerHTML={{__html: props.policy.replace('<a href', '<a class="font-size-xs" href')}}></p>
                </form>
            </div> }

            { showSuccess && <div className="w-full p-3 mb-3 rounded text-center bg-yellow-light">
                <h3 className="mx-4 mx-lg-5" dangerouslySetInnerHTML={{__html: props.success_msg}}></h3>
                <p className="font-size-sm mb-0" dangerouslySetInnerHTML={{__html: props.success_content}}></p>
            </div> }
        </>
    );
};

export default LaunchWaitList;
