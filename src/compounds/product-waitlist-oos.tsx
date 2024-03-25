import CountriesOptions from "@/components/countries-options"; 

const ProductWaitlist = (props: any) => {
	return (
		<>
			<div className="product-waitlist product-waitlist__form w-full p-3 mb-3 rounded bg-pink-light">
				<p className="text-lg font-bold mb-1">Join the waitlist</p>
				<p className="mb-3">Be the first to know when <strong>Sunny Honey Bali Bronzing Foam in medium shade</strong> is back in stock.</p>
				<form data-pdp="false" data-product-id="product-id">
					<div className="row">
						<div className="relative flex items-stretch w-full w-full">
							<label for="waitlist-phone" class="input-group-addon form-control bg-white pr-0">
								<CountriesOptions />
								<span className="align-items-center">+65</span>
								<svg role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.6 22.6" className="svg font-size-sm"><path d="M1.9 5.4l9.4 9.4 9.4-9.4 1.9 1.9-11.3 11.3L0 7.3l1.9-1.9z"></path></svg>
							</label>
							<input id="waitlist-phone" className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded border-left-1 mb-g bg-white rounded" type="tel" placeholder="Phone number" aria-label="phone" />
						</div>
						<small className="col-12 text-danger phone-error d-none">Please enter a valid phone number</small>
					</div>
					<span className="d-block mb-1 text-center">- Or -</span>
					<div className="row">
						<div className="input-group col mb-1">
							<input className="form-control border-0 bg-white rounded" type="email" name="email" placeholder="Enter your email" />
						</div>
						<small className="col-12 text-danger email-error d-none">Please enter a valid email address</small>
					</div>
					<div className="row">
						<div className="input-group col d-flex my-1">
							<div className="custom-control custom-checkbox col d-flex my-1">
								<input type="checkbox" name="tos" className="custom-control-input" required id="agreement"/>
								<label className="custom-control-label font-size-xs" for="agreement">
									I agree to the <a className="link-secondary text-underline" target="_blank" href="/pages/privacy-policy-new" aria-label="Privacy Policy">Privacy Policy</a> and <a class="link-secondary text-underline" href="/pages/terms-and-conditions" target="_blank" aria-label="Terms of Use">Terms of Use</a>
								</label>
							</div>
						</div>
						<small className="col-12 text-danger terms-error d-none">You have not agreed to the Privacy Policy & ToS</small>
					</div>
					<div className="row">
						<div className="form-group col mt-1">
							<input className="btn btn-lg btn-primary btn-block" type="submit" value="Submit" />
						</div>
					</div>
					<p className="font-size-xs">Receive exclusive offers via email or automated marketing SMS (4/mth). For more info see our <a class="link-secondary text-underline" target="_blank" href="/pages/privacy-policy-new" aria-label="Privacy Policy">Privacy Policy</a>. Opt out any time. Msg & data rates may apply. Consent not required for purchase.</p>
				</form>
			</div>
			<div className="product-waitlist product-waitlist--launch product-waitlist__submitted w-100 p-3 mb-3 rounded text-center {{ class }} d-none">
				<h3 className="mx-4 mx-lg-5">Thank you for subcribing to our waitlist!</h3>
				<p className="font-size-sm mb-0">We'll keep you posted on our Bronzing Face Drop launch!. We hope you're exited as much as we are.</p>
			</div>
		</>
	);
};

export default ProductWaitlist;