import CloseRounded from '../../src/images/icons/close-rounded.svg';
import ChevronDown from '../../src/images/icons/chevron-down.svg';
import Popup from '@/components/Popup';

const NewsletterPopup = (props) => {
    return (
        <Popup classes="newsletter-bigger-popup" cotent_classes="bg-secondary" body_classes="py-g" picture={true} spacing={true}>
            <button type="button" className="close position-absolute font-size-sm" onClick={props.onHide}>
                <CloseRounded className="svg" />
            </button>
            <div className="row justify-content-end">
                <form className="newsletter-bigger-popup__form col-lg-6">
                    <h2 className="newsletter-bigger-popup__title h1 text-center text-white mb-0">Join the club <br/>& get a FREE hair wrap! </h2>
                    <p className="text-white text-white font-size-sm mb-g text-center">Get a FREE hair wrap on your first order, plus first access to new product launches, exclusive offers, routines, and beauty tips.</p>
                    <div className="input-group mb-0">
                        <input id="newsletter-bigger-popup__email" className="form-control" type="email" placeholder="Email" aria-label="email" />
                    </div>
                    <p className="text-center newsletter-bigger-popup__separator text-white mb-1 mt-1">and / or</p>
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
                    <p className="font-size-xs text-white mt-g text-center mb-0 mx-1">Receive exclusive offers via email or automated marketing SMS (4/mth). For more info see our Privacy Policy (opt out any time). Msg & data rates may apply. Consent not required for purchase.</p>
                </form>
            </div>
        </Popup>
    );  
};

export default NewsletterPopup;