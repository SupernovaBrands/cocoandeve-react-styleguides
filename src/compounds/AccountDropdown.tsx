import { useEffect, useRef, useState } from 'react';
import SocialLogin from './SocialLogin';
import Link from 'next/link';
import { Button } from '~/components/index';
import { useRouter } from 'next/router';

const AccountDropdown = (props) => {
    const [newsOptIn, setNewsOptIn] = useState(false);
	const [tosAgree, setTosAgree] = useState(false);
	const [validPass, setValidPass] = useState(true);
	const [allowSubmit, setAllowSubmit] = useState(false);
    const { openAccountBox, toggleAccountDropdown } = props;
    const [activeFrame, setActiveFrame] = useState(true);
    const firstRef = useRef(null);
	const lastRef = useRef(null);
	const emailRef = useRef(null);
	const passRef = useRef(null);
    const validPassword = (e) => {
		const val = e.target.value;
		if (val !== '') {
			setValidPass(/^(?=[^0-9\s]*[0-9])\S{6,}$/.test(e.target.value));
		} else {
			setValidPass(true);
		}
	};
    const handleSubmit = async (e) => {
        const router = useRouter();
        e.preventDefault();
        // console.log('handle submit form dropdown');
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
			router.push('/account');
		}
    };
    const handleChange = () => {
		const firstname = firstRef?.current?.value !== '';
		const lastname = lastRef?.current?.value !== '';
		const pass = passRef?.current?.value !== '' && validPass;
		const email = emailRef?.current?.value !== '' && /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(emailRef?.current?.value);
        setAllowSubmit(firstname && lastname && pass && email && tosAgree);
	};
    useEffect(() => {
		handleChange();
	}, [tosAgree]);
    return (
        <div id="account-dropdown" className={`w-full lg:w-[330px] top-[6em] lg:top-[3em] right-0 left-auto border-0 rounded-0 pb-0 -mt-[1px] lg:mt-0 pt-0 fixed lg:absolute z-[1030] float-none  ${openAccountBox ? 'block' : 'hidden'}`}>
                {activeFrame && (
                    <div className='flex'>
                        <form id="dropdown__login" className="p-g [box-shadow:0_0.5rem_1rem_rgba(0,0,0,0.15)!important] bg-white w-full">
                            <p className="font-bold text-center px-2 mb-2">Earn and redeem points from purchases</p>
                            <SocialLogin idSuffix={'loginDropdown'} />
                            <p className="text-center auth-buttons mb-g">or login with email</p>
                            <div className="mb-2">
                                <label htmlFor="dropdownLoginFormEmail" id="dropdownLoginFormEmailLabel" className="sr-only">Email</label>
                                <input type="email" className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-gray-400 text-gray-800  rounded border-0 focus:outline-none" id="dropdownLoginFormEmail" placeholder="Email" aria-labelledby="dropdownLoginFormEmailLabelheaderDropdown" />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="dropdownLoginFormPassword" id="dropdownLoginFormPasswordLabel" className="sr-only">Password</label>
                                <input type="password" className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-gray-400 text-gray-800 border-gray-200 rounded border-0 focus:outline-none" id="dropdownLoginFormPassword" placeholder="Password" aria-labelledby="dropdownLoginFormPasswordLabel" />
                            </div>
                            <input type="submit" className="align-middle text-center select-none border whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline text-white block w-full mt-g bg-primary font-bold" disabled value="Log In" />
                            <ul className="d-flex justify-content-between mt-2 mb-1 list-unstyled">
                                <li className='flex justify-between'>
                                    <button type="button" className="text-underline text-primary underline">Forgot your password?</button>
                                    <button type="button" className="text-underline text-primary underline" onClick={() => setActiveFrame(!activeFrame)}>Sign up</button>
                                </li>
                            </ul>
                        </form>
                    </div>
                )}
                {!activeFrame && (
                    <div className={`flex `}>
                        <form onSubmit={handleSubmit} id="dropdown__register" className="p-g [box-shadow:0_0.5rem_1rem_rgba(0,0,0,0.15)!important] bg-white w-full">
                            <p className=" font-bold  text-center px-2 mb-2">Welcome</p>
                            <SocialLogin idSuffix={'registerDropdown'} />
                            <p className="mb-g text-center auth-buttons">-- or --</p>
                            <div className="flex flex-wrap">
                                <div className="form-group w-1/2 pr-1 mb-1 lg:mb-2">
                                    <label htmlFor="dropdownFormFName" id="dropdownFormFNameLabel" className="sr-only">First name</label>
                                    <input ref={firstRef} onChange={handleChange} type="text" className="block mb-0 appearance-none w-full py-g px-1 leading-normal bg-gray-400 text-gray-800 rounded text-sm" id="dropdownFormFName" placeholder="First Name" aria-labelledby="dropdownFormFNameLabel" />
                                </div>
                                <div className="form-group w-1/2 pl-1 mb-1 lg:mb-2">
                                    <label htmlFor="dropdownRegisterFormLName" id="dropdownRegisterFormLNameLabel" className="sr-only">Last Name</label>
                                    <input ref={lastRef} onChange={handleChange} type="text" className="block mb-0 appearance-none w-full py-g px-1 leading-normal bg-gray-400 text-gray-800 rounded text-sm" id="dropdownRegisterFormLName" placeholder="Last Name" aria-labelledby="dropdownRegisterFormLNameLabel" />
                                </div>
                                <div className="form-group w-full mb-1 lg:mb-2">
                                    <label htmlFor="dropdownRegisterFormEmail" id="dropdownRegisterFormEmailLabel" className="sr-only">Email</label>
                                    <input ref={emailRef} onChange={handleChange} type="email" className="block mb-0 appearance-none w-full py-g px-1 leading-normal bg-gray-400 text-gray-800 rounded text-sm" id="dropdownRegisterFormEmail" placeholder="Email" aria-labelledby="dropdownRegisterFormEmailLabel" />
                                </div>
                                <div className="form-group w-full mb-1 lg:mb-2">
                                    <label htmlFor="dropdownRegisterFormPassword" id="dropdownRegisterFormPasswordLabel" className="sr-only">Password</label>
                                    <input ref={passRef} onChange={validPassword} type="password" className="block mb-0 appearance-none w-full py-g px-1 leading-normal bg-gray-400 text-gray-800 rounded text-sm" id="dropdownRegisterFormPassword" placeholder="Password" aria-labelledby="dropdownRegisterFormPasswordLabel" />
                                </div>
                            </div>
                            <div className="custom-control custom-checkbox flex justify-start text-sm mb-1 items-start">
                                <input onChange={() => setNewsOptIn(!newsOptIn)} type="checkbox" name="offers" value={newsOptIn.toString()} className="custom-control-input" id="offers" required={true} aria-required="true" aria-invalid="true" />
                                <label htmlFor="offers" className="custom-control-label lg:pl-1">Keep me up to date on news and exclusive offers</label>
                            </div>
                            <div className="custom-control custom-checkbox flex justify-start text-sm items-start">
                                <input onChange={() => setTosAgree(!tosAgree)} type="checkbox" name="agreement" value={tosAgree.toString()} className="custom-control-input" id="agreement" required={true} aria-required="true" aria-invalid="true" />
                                <label htmlFor="agreement" className="custom-control-label lg:pl-1">
                                <span>By clicking here, I agree to the <Link className="font-size-sm" href="/pages/terms-and-conditions">Terms of Use</Link>, <Link className="font-size-sm" href="/pages/privacy-policy">Privacy Policy</Link> and <Link className="font-size-sm" href="/pages/bali-beauty-club-terms-and-conditions">Bali Beauty Club Terms and Conditions</Link>.&nbsp; By opening an account you will be signed up to the Bali Beauty Club.&nbsp; You may opt out at any time, see Bali Beauty Club Terms and Conditions for details</span>
                                </label>
                            </div>
                            {/* <input type="submit" className="align-middle text-center select-none border whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline text-white block w-full mt-g bg-primary font-bold" value="Create Account" /> */}
                            <Button type="submit" buttonClass="btn-primary w-full border-0 py-1 mt-1" disabled={!allowSubmit}>Create Account</Button>
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
