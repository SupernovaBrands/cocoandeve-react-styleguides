import { useEffect, useState } from "react";
import ChevronDown from '../../src/images/icons/chevron-down.svg';
import CountriesOptions from "@/components/countries-options"; 
import { InputFormGroup } from '@/components/index';

const Sweepstakes = (props) => {
    const [showCart, setShowCart] = useState(false);
    const [countryCode, setCountryCode] = useState(65);

    const toggleCart = () => {
		setShowCart(!showCart);
	}

    const codeChangeHandler = (selectedCode) => {
        setCountryCode(selectedCode);
    }

    return (
        <>
            <section className="sweepstakes bg-primary-light">
                <div className="container px-0">
                    <div className="flex flex-wrap m-0 items-center place-content-end">
                        <div className="sweepstakes__content px-g lg:w-5/12 lg:order-1 lg:my-4">
                            <form id="sweepstakes__form" className="px-4 py-3 bg-white text-center rounded  mt-2 lg:mt-0">
                                <h1 className="text-secondary mb-1">Coco & Eve Sweepstakes</h1>
                                <p className="mb-[1rem]">Add in your email or mobile number to win your fave Coco and Eve products.</p>
                                <ul className="inline-block list-check text-start mb-[1rem]">
                                    <li>First prize is $300 worth of products</li>
                                    <li>Second prize is $200 worth of products</li>
                                    <li>Third prize is $100 worth of products</li>
                                </ul>
                                <div className="flex flew-wrap -mx-2 flex-col lg:flex-row">
                                    <InputFormGroup type="text" id="sweepstakes__email" placeholder="Type email here" groupClass="w-full pr-2 pl-2"></InputFormGroup>
                                    <small className="col-12 text-danger email-error hidden">Please enter a valid email address</small>
                                </div>

                                <div className="mb-2 text-sm">- or -</div>
                                <div className="flex flex-wrap">
                                    <div className="relative flex items-stretch w-full mb-g">
                                        <label htmlFor="waitlist-phone" className="bg-gray-400 border-r max-w-[5em] px-2 text-base font-normal leading-normal text-gray-900 text-center bg-gray-300  border-gray-100 rounded block appearance-none w-full text-gray-800  border-gray-200  pr-0 relative flex-auto min-w-[0] mb-0 rounded-tr-none rounded-br-none">
                                            <CountriesOptions selected={countryCode} onChangeFilter={codeChangeHandler} />
                                            <div className="flex h-full items-center border-l-gray-400">
                                                <span className="mr-1">+{countryCode}</span>
                                                <svg className="h-[1em] font-size-sm" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.6 22.6"><path d="M1.9 5.4l9.4 9.4 9.4-9.4 1.9 1.9-11.3 11.3L0 7.3l1.9-1.9z"></path></svg>
                                            </div>
                                        </label>
                                        <input id="waitlist-phone" className="bg-gray-400 outline-none block border-none appearance-none w-full py-1 px-2 text-base leading-normal text-gray-800 border border-gray-200 rounded border-left-1 rounded-tl-none rounded-bl-none" type="tel" placeholder="Phone number" aria-label="phone" />
                                    </div>
                                    <small className="col-12 text-danger phone-error hidden">Please enter a valid phone number</small>
                                </div>
                                <div className="flex flex-wrap items-center place-content-center my-2">
                                    <div className="custom-control custom-checkbox relative flex-grow max-w-full flex flex-wrap items-center place-content-center">
                                        <input type="checkbox" name="tos" className="custom-control-input" required id="sweepstakes__toc" />
                                        <label className="custom-control-label text-sm ml-1" htmlFor="sweepstakes__toc">
                                            I agree to <a href="#">Privacy Policy & ToS</a>
                                        </label>
                                    </div>
                                    <small className="col-12 text-danger terms-error hidden">You have not agreed to the Privacy Policy & ToS</small>
                                </div>
                                <div className="hidden input-error toc-error text-xs text-primary mb-2">You have not agreed to the Privacy Policy & ToS</div>
                                <p className="text-xs mb-[1rem]">By signing up, you agree to receive exclusive offers via email or automated marketing SMS (4/mth). Msg &amp; data rates may apply. Consent not required for purchase. Opt out any time.</p>
                                <div className="mb-2">
                                    <button id="sweepstakes__submit" type="submit" className="bg-primary hover:bg-primary-darken w-full rounded-lg border border-transparent font-bold text-white py-[13px] px-[54px]">Sign me up!</button>
                                </div>
                            </form>
                            <div className="hidden sweepstakes__thank-you px-4 py-3 bg-white text-center rounded">
                                <h2 className="h1 text-secondary">Thank you!</h2>
                                <p>Your entry has been registered! Head to Coco & Eve and do some shopping while you wait ;)</p>
                                <a href="#" className="btn btn-lg btn-primary btn-block">Shop Coco & Eve</a>
                            </div>
                            <p className="text-xs text-white my-2 mb-lg-0">*Customers who sign up to our sweepstakes through SMS or email address will be given a chance to be one of three to win up to $1000 USD worth of products including our product launch. Contest winners will be notified via SMS or email. Sweepstakes will run from June 1, 2021 12:00am PST to June 11, 2021 11:59pm PST. Sweepstakes prizes cannot be used in conjunction with any other code, offer or promotion. Coco & Eve reserves the right to cancel or alter any promotion without prior notice. In the event of any dispute, the decision of Coco & Eve is final.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Sweepstakes;