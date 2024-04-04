import CountriesOptions from "@/components/countries-options"; 

const ProductWaitlist = (props: any) => {
	return (
		<>
			<div className="w-full p-3 mb-3 rounded-lg bg-pink-light">
				<p className="text-lg font-bold mb-1">Join the waitlist</p>
				<p className="mb-3">Be the first to know when <strong>Sunny Honey Bali Bronzing Foam in medium shade</strong> is back in stock.</p>
				<form data-pdp="false" data-product-id="product-id">
					<div className="row">
						<div className="relative flex items-stretch w-full mb-g">
							<label htmlFor="waitlist-phone" className="border-r max-w-[5em] px-2 text-base font-normal leading-normal text-gray-900 text-center bg-gray-300  border-gray-100 rounded block appearance-none w-full text-gray-800  border-gray-200  bg-white pr-0 relative flex-auto min-w-[0] mb-0 rounded-tr-none rounded-br-none">
								<CountriesOptions />
								<div className="flex h-full items-center border-l-gray-400">
									<span className="mr-1">+65</span>
									<svg className="h-[1em] font-size-sm" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.6 22.6"><path d="M1.9 5.4l9.4 9.4 9.4-9.4 1.9 1.9-11.3 11.3L0 7.3l1.9-1.9z"></path></svg>
								</div>
							</label>
							<input id="waitlist-phone" className="focus:outline-none block border-none appearance-none w-full py-1 px-2 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded border-left-1 rounded-tl-none rounded-bl-none" type="tel" placeholder="Phone number" aria-label="phone" />
						</div>
						<small className="col-12 text-danger phone-error hidden">Please enter a valid phone number</small>
					</div>
					<span className="block mb-g text-center w-full ">- Or -</span>
					<div className="row">
						<div className="relative flex items-stretch w-full flex-grow max-w-full flex-1 mb-1">
							<input className="focus:outline-none block appearance-none w-full py-1 px-2 text-base leading-normal bg-white text-gray-800 rounded border-left-1" type="email" name="email" placeholder="Enter your email" />
						</div>
						<small className="col-12 text-danger email-error hidden">Please enter a valid email address</small>
					</div>
					<div className="row">
						<div className="flex my-1">
							<div className="custom-control custom-checkbox relative flex-grow max-w-full flex-1 flex my-1">
								<input type="checkbox" name="tos" className="custom-control-input" required id="agreement"/>
								<label className="custom-control-label text-xs ml-1" htmlFor="agreement">
									I agree to the <a className="link-secondary underline text-body text-xs" target="_blank" href="/pages/privacy-policy-new" aria-label="Privacy Policy">Privacy Policy</a> and <a className="link-secondary underline text-body text-xs" href="/pages/terms-and-conditions" target="_blank" aria-label="Terms of Use">Terms of Use</a>
								</label>
							</div>
						</div>
						<small className="w-full text-danger terms-error hidden">You have not agreed to the Privacy Policy & ToS</small>
					</div>
					<div className="flex my-1">
						<input className="inline-block align-middle text-center select-none border whitespace-no-wrap  px-3  no-underline  leading-tight text-base bg-blue-600 hover:bg-blue-600 w-full bg-primary text-white py-1 font-bold pt-[13px] pb-[13px] rounded-[8px]" type="submit" value="Submit" />
					</div>
					<p className="text-xs">Receive exclusive offers via email or automated marketing SMS (4/mth). For more info see our <a className="link-secondary text-underline text-xs text-body underline" target="_blank" href="/pages/privacy-policy-new" aria-label="Privacy Policy">Privacy Policy</a>. Opt out any time. Msg & data rates may apply. Consent not required for purchase.</p>
				</form>
			</div>
			<div className="w-100 p-3 mb-3 rounded text-center hidden">
				<h3 className="mx-4 mx-lg-5">Thank you for subcribing to our waitlist!</h3>
				<p className="font-size-sm mb-0">We'll keep you posted on our Bronzing Face Drop launch!. We hope you're exited as much as we are.</p>
			</div>
		</>
	);
};

export default ProductWaitlist;