import { useEffect, useRef, useState } from 'react';
import SocialLogin from './SocialLogin';
import Link from 'next/link';
import { setCookie } from '~/modules/utils';
import { Button } from '~/components/index';
import { useRouter } from 'next/navigation';

const AccountDropdown = (props:any) => {
    const { openAccountBox, store, onModal, swellLoyalty, scrolled, annBarEnabled, timerData } = props;
    const defaultCheckedNewsOptIn = !!onModal === true ? !!onModal : !['uk', 'eu'].includes(store);
    const [regInit, setRegInit] = useState(true);
    const [newsOptIn, setNewsOptIn] = useState(defaultCheckedNewsOptIn);
	const [tosAgree, setTosAgree] = useState(false);
	const [validPass, setValidPass] = useState(true);
	const [allowSubmit, setAllowSubmit] = useState(false);
    const [allowLogin, setAllowLogin] = useState(false);
    const [validEmail, setValidEmail] = useState(true);
    const [validLoginEmail, setValidLoginEmail] = useState(true);
    const [emptyPass, setEmptyPass] = useState(false);
    const [activeFrame, setActiveFrame] = useState(true);
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [loadingCreate, setLoadingCreate] = useState(false);
    const firstRef = useRef(null);
	const lastRef = useRef(null);
	const emailRef = useRef(null);
	const passRef = useRef(null);
    const tos = useRef(null);

    const loginEmailRef = useRef(null);
    const loginPassRef = useRef(null);
    const router = useRouter();
    const validPassword = (e) => {
		const val = e.target.value;
        setValidPass(/^(?=[^0-9\s]*[0-9])\S{6,}$/.test(e.target.value));
		if (val !== '') {
            setEmptyPass(false);
		} else {
            setEmptyPass(true);
		}
        handleChange();
	};
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (allowSubmit) {
            setLoadingCreate(true);
            const url = `https://s-app.cocoandeve.com/shopify/email?email=${encodeURIComponent(emailRef.current.value)}&brand=cocoandeve_shopify_${store}`;
            fetch(url).then((d) => d.json()).then(async (data) => {
                const found = data.filter((e) => e.email === emailRef.current.value);
                if (found.length > 0) {
                    setTimeout(() => {
                        window.location.href = '/account/register#taken';
                    }, 250);
                } else {
                    const resp = await fetch('/api/account/create', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: emailRef.current.value,
                            password: passRef.current.value,
                            first_name: firstRef.current.value,
                            last_name: lastRef.current.value,
                            accept_marketing: newsOptIn,
                        })
                    }).then((resp) => resp.json());
                    const { customerCreate } = resp;
                    if (customerCreate.customer !== null) {
                        setTimeout(() => {
                            if (window.location.href.includes('survey=result')) {
                                setCookie('signedInOnResult', 'true');
                            }
                            window.location.href = '/account';
                        }, 250);
                    } else {
                        setTimeout(() => {
                            window.location.href = '/account/register#taken';
                        }, 250);
                    }
                }
            });
        } else {
            passFocus();
        }
    };
    const handleChange = () => {
        const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
		const firstname = firstRef?.current?.value !== '';
		const lastname = lastRef?.current?.value !== '';
		const pass = (passRef?.current?.value !== '') && /^(?=[^0-9\s]*[0-9])\S{6,}$/.test(passRef?.current?.value);
        const validE = emailRegex.test(emailRef?.current?.value);
		const email = emailRef?.current?.value !== '' && validE;
        if (emailRef?.current?.value && emailRef?.current?.value !== '') setValidEmail(validE);
        else setValidEmail(true);
        setAllowSubmit(firstname && lastname && pass && email && tosAgree && !emptyPass);
	};

    const passFocus = () => {
        setEmptyPass(passRef?.current?.value === '');
        setRegInit(false);
    };

    // Login Customer
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setAllowLogin(false);
        setLoadingLogin(true);
		const respLogin = await fetch('/api/account/login', {
			method: 'POST',
			body: JSON.stringify({
				email: loginEmailRef.current.value,
				password: loginPassRef.current.value
			})
		}).then((resp) => resp.json());
		const { customerAccessTokenCreate } = respLogin;
        if (onModal && props.userMutate && customerAccessTokenCreate && customerAccessTokenCreate.customerAccessToken) {
            props.userMutate().then(() => {
                props.closeModal();
                props.callback();
            });
        } else {
            let url: string = '/account/login#error'
            if (customerAccessTokenCreate.customerAccessToken) {
                url = '/account';
            }
            if (window.location.href.includes('survey=result')) {
                setCookie('signedInOnResult', 'true');
            }
            setTimeout(() => {
                window.location.href = url;
            }, 250);
        }
	};
    const handleLoginChange = () => {
        const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		const pass = loginPassRef?.current?.value !== '';
        const validRegex = regex.test(loginEmailRef?.current?.value)
		const email = loginEmailRef?.current?.value !== '' && validRegex;
        setValidLoginEmail(validRegex || loginEmailRef?.current?.value === '');
		setAllowLogin(pass && email);
	};

    const handleTos = () => {
        setTosAgree((prev) => !prev);
        setRegInit(false);
    };

    useEffect(() => {
        const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
		const firstname = firstRef?.current?.value !== '';
		const lastname = lastRef?.current?.value !== '';
		const pass = (passRef?.current?.value !== '') && /^(?=[^0-9\s]*[0-9])\S{6,}$/.test(passRef?.current?.value);
        const validE = emailRegex.test(emailRef?.current?.value);
		const email = emailRef?.current?.value !== '' && validE;
        if (emailRef?.current?.value && emailRef?.current?.value !== '') setValidEmail(validE);
        else setValidEmail(true);
        setAllowSubmit(firstname && lastname && pass && email && tosAgree && !emptyPass);
    }, [tosAgree]);

    return (
        <div id="account-dropdown" className={`dropdown-menu w-full ${scrolled || !annBarEnabled ? 'top-[3.53125em]' : 'top-[6em]'} ${timerData && timerData.notice_bar ? 'lg:top-[3.5em]' : 'lg:top-[3em]'} right-0 left-auto border-0 rounded-0 pb-0 -mt-[1px] lg:mt-0 pt-0 float-none ${!onModal ? 'z-[1030] fixed lg:absolute lg:w-[330px]' : ''} ${openAccountBox ? 'block' : 'hidden'}`}>
                {activeFrame && (
                    <div className='flex dropdown__login__register'>
                        <form onSubmit={handleLoginSubmit} id="dropdown__login" className={`p-g ${!onModal ? '[box-shadow:0_0.5rem_1rem_rgba(0,0,0,0.15)!important]' : ''} bg-white w-full`}>
                            <p className="font-bold text-center px-2 mb-2">
                                {swellLoyalty && swellLoyalty.enable_cart_swell_redemption && (
                                    'Earn and redeem points from purchases'
                                )}
                            </p>
                            <SocialLogin idSuffix={'loginDropdown'} store={store}/>
                            <p className="text-center auth-buttons mb-g">or login with email</p>
                            <div className="mb-2">
                                <label htmlFor="dropdownLoginFormEmail" id="dropdownLoginFormEmailLabel" className="sr-only">Email</label>
                                <input ref={loginEmailRef} onChange={handleLoginChange} type="email" className={`block h-[50px] font-size-sm appearance-none w-full py-1 px-2 ${!validLoginEmail ? 'mb-0' : 'mb-1'} text-base leading-normal bg-gray-400 text-gray-800  rounded border-0 focus:outline-none`} id="dropdownLoginFormEmail" placeholder="Email" aria-labelledby="dropdownLoginFormEmailLabelheaderDropdown" />
                                {!validLoginEmail && (
                                    <label id="dropdownLoginFormEmail-error" className="font-size-xs text-primary" htmlFor="dropdownLoginFormEmail">Please enter a valid email address.</label>
                                )}
                            </div>
                            <div className="lg:mb-2 sm:mb-0">
                                <label htmlFor="dropdownLoginFormPassword" id="dropdownLoginFormPasswordLabel" className="sr-only">Password</label>
                                <input ref={loginPassRef} onChange={handleLoginChange} type="password" className="font-size-sm h-[50px] block appearance-none w-full py-1 px-2 mb-1 leading-normal bg-gray-400 text-gray-800 border-gray-200 rounded border-0 focus:outline-none" id="dropdownLoginFormPassword" placeholder="Password" aria-labelledby="dropdownLoginFormPasswordLabel" />
                            </div>
                            <Button type="submit" buttonClass={`btn-primary w-full border-0 py-1 mt-1 ${!allowLogin ? '!opacity-100' : ''} ${loadingLogin ? '!opacity-70' : ''}`} disabled={!allowLogin}>
                                {!loadingLogin && 'Log In'}
                                {loadingLogin && <div className="mx-auto h-2 w-2 animate-spin rounded-full border-[3px] border-white border-t-primary" />}
                            </Button>
                            <ul className="d-flex justify-content-between mt-2 mb-1 list-unstyled">
                                <li className='flex justify-between'>
                                    <a href="/account/login#recover" className="text-underline text-primary underline">Forgot your password?</a>
                                    <button type="button" className="text-underline text-primary underline" onClick={() => setActiveFrame(!activeFrame)}>Sign up</button>
                                </li>
                            </ul>
                        </form>
                    </div>
                )}
                {!activeFrame && (
                    <div className={`flex dropdown__login__register`}>
                        <form onSubmit={handleSubmit} id="dropdown__register" className={`p-g ${!onModal ? '[box-shadow:0_0.5rem_1rem_rgba(0,0,0,0.15)!important]' : ''} bg-white w-full`}>
                            <p className=" font-bold  text-center px-2 mb-2">Welcome</p>
                            <SocialLogin idSuffix={'registerDropdown'} store={store}/>
                            <p className="mb-g text-center auth-buttons">-- or --</p>
                            <div className="flex flex-wrap">
                                <div className="form-group w-1/2 pr-1 mb-1 lg:mb-2">
                                    <label htmlFor="dropdownFormFName" id="dropdownFormFNameLabel" className="sr-only">First name</label>
                                    <input onFocus={passFocus} ref={firstRef} onChange={handleChange} type="text" className="block mb-0 appearance-none w-full py-g px-1 leading-normal bg-gray-400 text-gray-800 rounded text-sm" id="dropdownFormFName" placeholder="First Name" aria-labelledby="dropdownFormFNameLabel" />
                                </div>
                                <div className="form-group w-1/2 pl-1 mb-1 lg:mb-2">
                                    <label htmlFor="dropdownRegisterFormLName" id="dropdownRegisterFormLNameLabel" className="sr-only">Last Name</label>
                                    <input onFocus={passFocus} ref={lastRef} onChange={handleChange} type="text" className="block mb-0 appearance-none w-full py-g px-1 leading-normal bg-gray-400 text-gray-800 rounded text-sm" id="dropdownRegisterFormLName" placeholder="Last Name" aria-labelledby="dropdownRegisterFormLNameLabel" />
                                </div>
                                <div className="form-group w-full mb-1 lg:mb-2">
                                    <label htmlFor="dropdownRegisterFormEmail" id="dropdownRegisterFormEmailLabel" className="sr-only">Email</label>
                                    <input onFocus={passFocus} ref={emailRef} onChange={handleChange} type="email" className="block mb-0 appearance-none w-full py-g px-1 leading-normal bg-gray-400 text-gray-800 rounded text-sm" id="dropdownRegisterFormEmail" placeholder="Email" aria-labelledby="dropdownRegisterFormEmailLabel" />
                                    {!validEmail && (
                                        <label id="dropdownRegisterFormEmail-error" className="text-primary font-size-sm" htmlFor="dropdownRegisterFormEmail">Please enter a valid email address.</label>
                                    )}
                                </div>
                                <div className="form-group w-full mb-1 lg:mb-2">
                                    <label htmlFor="dropdownRegisterFormPassword" id="dropdownRegisterFormPasswordLabel" className="sr-only">Password</label>
                                    <input onFocus={passFocus} ref={passRef} onChange={validPassword} type="password" className="block mb-0 appearance-none w-full py-g px-1 leading-normal bg-gray-400 text-gray-800 rounded text-sm" id="dropdownRegisterFormPassword" placeholder="Password" aria-labelledby="dropdownRegisterFormPasswordLabel" />
                                    {!validPass && (
                                        <label className="text-primary font-size-sm" htmlFor="CreatePassword">Please enter at least 6 characters including 1 number.</label>
                                    )}
                                    {validPass && emptyPass && (
                                        <label className="text-primary font-size-sm" htmlFor="CreatePassword">This field is required.</label>
                                    )}
                                </div>
                            </div>
                            <div className="custom-control custom-checkbox flex justify-start text-sm mb-1 items-start">
                                <input onChange={() => setNewsOptIn(!newsOptIn)} type="checkbox" name="offers" checked={newsOptIn} value={newsOptIn.toString()} className="custom-control-input" id="offers" required={false} aria-required="true" aria-invalid="true" defaultChecked={!['uk', 'eu'].includes(store)} />
                                <label htmlFor="offers" className={`custom-control-label ${!onModal ? 'lg:pl-1' : ''}`}>Keep me up to date on news and exclusive offers</label>
                            </div>
                            <div className="custom-control custom-checkbox flex justify-start text-sm items-start">
                                <input ref={tos} onClick={handleTos} type="checkbox" name="agreement" value={tosAgree.toString()} className="custom-control-input" id="agreement" required={false} aria-required="true" aria-invalid="true" />
                                <label htmlFor="agreement" className={`custom-control-label ${!onModal ? 'lg:pl-1' : ''}`}>
                                    { !onModal && <span>By clicking here, I agree to the <a className="font-size-sm" href="/pages/terms-and-conditions">Terms of Use</a>, <a className="font-size-sm" href="/pages/privacy-policy">Privacy Policy</a> and <a className="font-size-sm" href="/pages/bali-beauty-club-terms-and-conditions">Bali Beauty Club Terms and Conditions</a>.&nbsp; By opening an account you will be signed up to the Bali Beauty Club.&nbsp; You may opt out at any time, see Bali Beauty Club Terms and Conditions for details</span> }
                                    { onModal && <span>By clicking here, I agree to the <a href="/pages/terms-and-conditions" className="text-primary text-sm" target="_blank" aria-label="Terms of Use">Terms of Use</a> and <a className="text-primary text-sm" target="_blank" href="/pages/privacy-policy-new" aria-label="Privacy Policy">Privacy Policy</a></span>}
                                </label>
                            </div>
                            {/* <input type="submit" className="align-middle text-center select-none border whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline text-white block w-full mt-g bg-primary font-bold" value="Create Account" /> */}
                            <Button type="submit" buttonClass={`btn-primary w-full border-0 py-1 mt-1 ${regInit ? '!opacity-100' : `${!allowSubmit ? '!opacity-65' : ''}`} ${loadingCreate ? '!opacity-70' : ''}`} disabled={!allowSubmit}>
                                {!loadingCreate && 'Create Account'}
                                {loadingCreate && <div className="mx-auto h-2 w-2 animate-spin rounded-full border-[3px] border-white border-t-primary" />}
                            </Button>
                            <div className="form-group text-center mt-2">
                                <button type="button" className="underline text-primary" onClick={() => setActiveFrame(!activeFrame)}>Back to Login</button>
                            </div>
                        </form>
                    </div>
                )}
        </div>
    )
}

export default AccountDropdown;
