import dynamic from 'next/dynamic';
// import CloseRounded from '../../src/images/icons/close-rounded.svg';
import ChevronDown from '../../src/images/icons/chevron-down.svg';
// import Popup from '@/components/Popup';
const Popup = dynamic(() => import('@/components/Popup'), {
    ssr: false,
});
const SweeptakesPopup = (props) => {
    return (
        <Popup classes="sweepstakes-popup" cotent_classes="mx-g mx-lg-4" body_classes="px-g px-lg-3 py-g" spacing={true}>
            <div className="sweepstakes-popup__heading row mb-3 mb-lg-g">
                <div className="col-9 col-lg-8 pl-lg-0 text-center text-secondary pr-0 pr-lg-g">
                    <h2 className="sweepstakes-popup__title h1 fw-bold mt-1 mt-lg-1 mb-0 mb-lg-1">Win $500 of products</h2>
                    <p className="mb-lg-0 mt-lg-1">and exclusive savings on our Black Friday Deals and<br className="d-lg-none" />future offers!</p>
                </div>
            </div>
            <div className="row justify-content-end">
                <form className="sweepstakes-popup__form col-lg-8 ps-lg-0 mt-lg-0" data-thank-you-message="You are in!">
                    <div className="input-group form-group mb-25">
                        <input id="sweepstakes-popup__email" className="form-control" type="email" placeholder="Email" />
                    </div>
                    <div id="email-error" className="d-none input-error text-danger font-size-xs">Please enter a valid email address</div>
                    <div className="form-group text-center mb-25 sweepstakes-popup__separator text-secondary">and / or</div>
                    <div className="input-group form-group">
                        <label htmlFor="sweepstakes-popup__country" className="input-group-addon form-control">
                            <span className="position-absolute sweepstakes-popup__country-label align-items-center">+65</span>
                            <ChevronDown className="svg position-absolute" />
                            <select id="sweepstakes-popup__country" className="custom-select">
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
                                <option value="SG" data-code="65" defaultValue="">Singapore</option>
                                <option value="LK" data-code="94">Sri Lanka</option>
                                <option value="TW" data-code="886">Taiwan</option>
                                <option value="TR" data-code="90">Turkey</option>
                                <option value="VN" data-code="84">Vietnam</option>
                            </select>
                        </label>
                        <input id="sweepstakes-popup__phone" className="form-control border-left-0" type="phone" placeholder="Phone number" />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-lg btn-primary btn-block">Submit</button>
                    </div>
                    <p className="sweepstakes-popup__toc font-size-sm text-center mt-1 mb-0 font-size-sm">By signing up, you agree to receive exclusive offers via email or automated marketing SMS (4/mth). For more info see our Privacy Policy (opt out any time). Msg & data rates may apply. </p>
                </form>
            </div>
        </Popup>
    );
};

export default SweeptakesPopup;
