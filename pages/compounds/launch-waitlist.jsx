import { Container } from "react-bootstrap";
import CountriesOptions from "@/components/countries-options"; 

const LaunchWaitList = () => {
	return (
		<Container className="px-g mt-4">
			<h1>Product Waitlist</h1>
            <div className="row">
                <div className="col-12 col-lg-5">
                <div className="product-waitlist product-waitlist--launch product-waitlist__form w-100 p-3 mb-3 rounded text-center">
                    <h3>Join the waitlist</h3>
                    <p className="mb-3 font-size-sm">Get alerted when our newest product drops, and get a free gift with your purchase. You got to be quick! sign up now cause this is definitely goinf to sell out fast!</p>
                    <form data-pdp="false" data-product-id="product-id">
                        <div className="row">
                            <div className="input-group col mb-1">
                                <input className="form-control border-0" type="email" name="email" placeholder="Enter your email" />
                            </div>
                            <small className="col-12 text-danger email-error d-none">Please enter a valid email address</small>
                        </div>
                        <span className="d-block mb-1">or</span>
                        <div className="row">
                            <div className="input-group col-4 col-lg-3 mb-1">
                                <span className="masking-select position-absolute rounded border-0">+65</span>
                                <CountriesOptions />
                            </div>
                            <div className="input-group col-8 col-lg-9 pl-0 mb-1">
                                <input className="form-control border-0" type="text" name="phone" placeholder="Enter your phone number" />
                            </div>
                            <small className="col-12 text-danger phone-error d-none">Please enter a valid phone number</small>
                        </div>
                        <div className="row">
                            <div className="input-group col d-flex justify-content-center my-1">
                                <div className="custom-control custom-checkbox col d-flex justify-content-center my-1">
                                    <input type="checkbox" name="tos" className="custom-control-input" required id="agreement"/>
                                    <label className="custom-control-label font-size-sm text-underline" htmlFor="agreement">I agree to Privacy Policy &amp; ToS</label>
                                </div>
                            </div>
                            <small className="col-12 text-danger terms-error d-none">You have not agreed to the Privacy Policy & ToS</small>
                        </div>
                        <div className="row">
                            <div className="form-group col mt-1">
                                <button className="btn btn-lg btn-primary btn-block" type="submit">Submit form</button>
                            </div>
                        </div>
                        <p className="font-size-xs">By signing up via text you agree to receive recurring automated marketing messages at the phone number provided. Consent is not a condition of purchase. Reply STOP to unsubscribe. HELP for help. Msg & Data rates may apply. View Privacy Policy & ToS.</p>
                    </form>
                </div>
                <div className="product-waitlist product-waitlist--launch product-waitlist__submitted w-100 p-3 mb-3 rounded text-center {{ class }} d-none">
                    <h3 className="mx-4 mx-lg-5">Thank you for subcribing to our waitlist!</h3>
                    <p className="font-size-sm mb-0">We'll keep you posted on our Bronzing Face Drop launch!. We hope you're exited as much as we are.</p>
                </div>

                </div>
            </div>
		</Container>
	);
};

export default LaunchWaitList;