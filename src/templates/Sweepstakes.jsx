import { useEffect, useState } from "react";
import { Col, Container, Row } from 'react-bootstrap';
import ChevronDown from '../../src/images/icons/chevron-down.svg';

const Sweepstakes = (props) => {
    const [showCart, setShowCart] = useState(false);

    const toggleCart = () => {
		setShowCart(!showCart);
	}

    return (
        <>
            <section className="sweepstakes bg-primary-light">
                <Container className="px-0">
                    <div className="row m-0 align-items-center justify-content-end">
                        <div className="sweepstakes__content px-g col-lg-5 order-lg-1 my-lg-4">
                            <form id="sweepstakes__form" className="px-4 py-3 bg-white text-center rounded  mt-2 mt-lg-0">
                                <h1 className="text-secondary">Coco & Eve Sweepstakes</h1>
                                <p>Add in your email or mobile number to win your fave Coco and Eve products.</p>
                                <ul className="d-inline-block list-check text-left">
                                    <li>First prize is $300 worth of products</li>
                                    <li>Second prize is $200 worth of products</li>
                                    <li>Third prize is $100 worth of products</li>
                                </ul>
                                <div className="input-group form-group">
                                    <input id="sweepstakes__email" className="form-control" type="email" placeholder="Type email here" />
                                </div>

                                <div className="input-group form-group font-size-sm justify-content-center">- or -</div>
                                <div className="input-group form-group">
                                    <label htmlFor="sweepstakes__country" className="input-group-addon form-control">
                                        <span className="position-absolute sweepstakes__country-label align-items-center">+65 <ChevronDown className="svg" fill="black"/></span>
                                        <select defaultValue="SG" id="sweepstakes__country" className="custom-select">
                                            <option value="" disabled="">Select Country</option>
                                            <option value="KH" data-code="855">Cambodia</option>
                                            <option value="HK" data-code="852">Hong Kong</option>
                                            <option value="IL" data-code="972">Israel</option>
                                            <option value="JP" data-code="81">Japan</option>
                                            <option value="KR" data-code="82">South Korea</option>
                                            <option value="LA" data-code="856">Laos</option>
                                            <option value="MO" data-code="853">Macau</option>
                                            <option value="MY" data-code="60">Malaysia</option>
                                            <option value="MV" data-code="960">Maldives</option>
                                            <option value="MM" data-code="95">Myanmar</option>
                                            <option value="PG" data-code="675">Papua New Guinea</option>
                                            <option value="PH" data-code="63">Philippines</option>
                                            <option value="RE" data-code="262">Réunion</option>
                                            <option value="RU" data-code="7">Russia</option>
                                            <option value="SG" data-code="65">Singapore</option>
                                            <option value="LK" data-code="94">Sri Lanka</option>
                                            <option value="TW" data-code="886">Taiwan</option>
                                            <option value="TR" data-code="90">Turkey</option>
                                            <option value="VN" data-code="84">Vietnam</option>
                                        </select>
                                    </label>
                                    <input id="sweepstakes__phone" className="form-control" type="tel" placeholder="Phone number" />
                                    <div className="d-none input-error phone-error font-size-xs text-primary mb-2"></div>
                                </div>

                                <div className="d-flex form-group align-items-center justify-content-center my-2">

                                    <div className="custom-control custom-checkbox col d-flex justify-content-center">
                                        <input type="checkbox" name="tos" className="custom-control-input" id="sweepstakes__toc" />
                                        <label className="custom-control-label font-size-sm" htmlFor="sweepstakes__toc">I agree to <a href="#">Privacy Policy & ToS</a></label>
                                    </div>
                                </div>
                                <div className="d-none input-error toc-error font-size-xs text-primary mb-2">You have not agreed to the Privacy Policy & ToS</div>
                                <p className="font-size-xs">By signing up, you agree to receive exclusive offers via email or automated marketing SMS (4/mth). Msg &amp; data rates may apply. Consent not required for purchase. Opt out any time.</p>
                                <div className="form-group">
                                    <button id="sweepstakes__submit" type="submit" className="btn btn-lg btn-primary btn-block">Sign me up!</button>
                                </div>
                            </form>
                            <div className="d-none sweepstakes__thank-you px-4 py-3 bg-white text-center rounded">
                                <h2 className="h1 text-secondary">Thank you!</h2>
                                <p>Your entry has been registered! Head to Coco & Eve and do some shopping while you wait ;)</p>
                                <a href="#" className="btn btn-lg btn-primary btn-block">Shop Coco & Eve</a>
                            </div>
                            <p className="font-size-xs text-white my-2 mb-lg-0">*Customers who sign up to our sweepstakes through SMS or email address will be given a chance to be one of three to win up to $1000 USD worth of products including our product launch. Contest winners will be notified via SMS or email. Sweepstakes will run from June 1, 2021 12:00am PST to June 11, 2021 11:59pm PST. Sweepstakes prizes cannot be used in conjunction with any other code, offer or promotion. Coco & Eve reserves the right to cancel or alter any promotion without prior notice. In the event of any dispute, the decision of Coco & Eve is final.</p>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default Sweepstakes;