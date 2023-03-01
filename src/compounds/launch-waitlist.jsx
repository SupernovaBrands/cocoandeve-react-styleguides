import CountriesOptions from "@/components/countries-options"; 

const LaunchWaitList = (props) => {
    return (
        <div className="col-12 col-lg-5">
            <div className="product-waitlist product-waitlist--launch product-waitlist__form w-100 p-3 mb-3 rounded text-center">
                <h3>{props.title}</h3>
                <p className="mb-3 font-size-sm">{props.content}</p>
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
                        <div className="input-group col-8 col-lg-9 ps-0 mb-1">
                            <input className="form-control border-0" type="text" name="phone" placeholder="Enter your phone number" />
                        </div>
                        <small className="col-12 text-danger phone-error d-none">Please enter a valid phone number</small>
                    </div>
                    <div className="row">
                        <div className="input-group col d-flex justify-content-center my-1">
                            <div className="ps-sm-2 custom-checkbox col d-flex justify-content-center my-1">
                                <input type="checkbox" name="tos" className="custom-control-input" required id="agreement"/>
                                <label className="custom-control-label font-size-sm text-underline" htmlFor="agreement">I agree to Privacy Policy &amp; ToS</label>
                            </div>
                        </div>
                        <small className="col-12 text-danger terms-error d-none">You have not agreed to the Privacy Policy & ToS</small>
                    </div>
                    <div className="row">
                        <div className="form-group col mt-1 d-grid">
                            <button className="btn btn-lg btn-primary btn-block" type="submit">Submit form</button>
                        </div>
                    </div>
                    <p className="font-size-xs">{props.policy}</p>
                </form>
            </div>
            <div className="product-waitlist product-waitlist--launch product-waitlist__submitted w-100 p-3 mb-3 rounded text-center {{ class }} d-none">
                <h3 className="mx-4 mx-lg-5">{props.success_msg}</h3>
                <p className="font-size-sm mb-0">{props.success_content}</p>
            </div>
        </div>
    );  
};

export default LaunchWaitList;