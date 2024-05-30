import React, { useState, useEffect} from 'react';
import { CheckBox, InputFormGroup, Select, Button } from "../components";
import { validateEmail, validatePhone } from '~/modules/utils';
import countriesList from '~/modules/countriesList';

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
}

const LaunchWaitList: React.FC<LaunchWaitListProps> = (props) => {
    const countries = countriesList;
    const { loggedInEmail } = props;

    const [email, setEmail] = useState(loggedInEmail ?? '');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneCode, setPhoneCode] = useState(countries[0].maskValue);
    const [tos, setTos] = useState(true);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [validForm, setValidForm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const submitForm = (e:any) => {
        e.preventDefault();

        if (email === '' && phoneNumber === '') {
            setPhoneError(true);
        }

        if (validForm) {
            props.onSubmitLaunchWaitlist({email, phoneCode, phoneNumber, fallback: () => {
                setShowSuccess(true);
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

        if (email !== '' && validateEmail(email) && phoneError) {
            setPhoneError(false);
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

    useEffect(() => {
        if (loggedInEmail) {
            setEmail(loggedInEmail);
        }
    }, [loggedInEmail]);

    return (
        <>
            { !showSuccess && <div ref={props.forwardRef} className={`product-waitlist bg-yellow-light product-waitlist__form w-100 p-3 mb-3 rounded text-center ${props.className}`}>
                <h3 className="mb-1">{props.title}</h3>
                <p className="mb-3 font-size-sm" dangerouslySetInnerHTML={{__html: props.content}}></p>
                <form onSubmit={submitForm} data-pdp="false" data-product-id="product-id">
                    <div className="flex flex-wrap -mx-2">
                        <InputFormGroup type="email" name="email" placeholder="Enter your email" groupClass="w-full pr-2 pl-2" onChange={changeEmail} value={loggedInEmail ?? ''}/>
                        {emailError && <span className="w-full text-primary email-error text-sm mb-g -mt-25">Please enter a valid email address</span> }
                    </div>
                    <span className="block mb-1 -mt-1">or</span>
                    <div className="flex flex-wrap -mx-2">
                        <div className="flex flex-nowrap">
                            <Select onChange={changePhoneCode} border={false} groupClass="block max-w-[28%] md:max-w-[20%] relative pl-2 pr-0" id="select-countries" placeholder="Select Country" masking={true} options={countries} selected={`${phoneCode}`}></Select>
                            <InputFormGroup onChange={changePhone} type="text" name="phone" placeholder="Enter your phone number" groupClass="pr-2 pl-[30px] md:pl-[35px] w-full"/>
                        </div>
                        { phoneError && <span className="w-full text-primary email-error text-sm mb-g -mt-25">Please enter a valid phone number</span> }
                    </div>
                    <div className="flex flex-wrap items-center justify-center mb-2">
                        <CheckBox onChange={changeTos} labelClass="flex justify-content-center my-1 relative pl-3" label={`<a class="text-sm text-body underline font-bold" href="#">I agree to Privacy Policy & ToS<\/a>`} id="agreement-waitlist" checked={true}/>
                        {!tos && <span className="block w-full text-primary terms-error mb-0 mt-0 text-sm">You have not agreed to the Privacy Policy & ToS</span>}
                    </div>
                    <div className="flex flex-wrap px-2 -mx-2 mb-1 mt-1">
                        <Button type="submit" buttonClass="btn-primary w-full border-0">
                            { props.cta ? props.cta : 'Submit Form' }
                        </Button>
                    </div>
                    <p className="font-size-xs font-bold mb-2" dangerouslySetInnerHTML={{__html: props.policy.replace('<a href', '<a class="text-xs underline" href')}}></p>
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
