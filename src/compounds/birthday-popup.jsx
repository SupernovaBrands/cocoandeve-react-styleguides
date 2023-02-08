import CloseRounded from '../../src/images/icons/close-rounded.svg';
import Popup from '@/components/Popup';

const BirthdayPopup = (props) => {
    return (
        <Popup classes="birthday-popup">
            <button type="button" class="close position-absolute font-size-sm" onClick={props.onHide}>
                <CloseRounded className="svg" />
            </button>
            <div class="row justify-content-end p-0">
                <picture class="col-lg-6 p-0">
                    <source srcset="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/DT_db2c8f07-cfcd-47af-b159-d2507acf8e92.png" media="(min-width: 992px)" />
                    <img src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/Mobile_29349535-f982-4299-8c2c-ce6aa5b74ae7.png" class="w-100" />
                </picture>
                <form class="birthday-popup__form col-lg-6 pt-lg-5 pb-5">
                    <h2 class="birthday-popup__title h1 text-center mb-1 pe-lg-g">Don’t forget your birthday gift!</h2>
                    <p class="font-size-sm mb-3 text-center pe-lg-g px-g">Tell us your birthday and enjoy $10 off to celebrate!</p>
                    <div class="row px-g">
                        <div class="input-group form-group col-5 col-lg-6 ps-0">
                            <input class="form-control" type="number" placeholder="Date" required="" />
                        </div>
                        <div class="input-group form-group col-7 col-lg-6 pe-0 pe-lg-g pl-lg-0">
                            <select class="custom-select"  required="">
                                <option selected="">Select</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                    </div>
                    <div class="row px-g mt-lg-0 mt-1">
                        <div class="input-group form-group col-12 px-0 ps-lg-0 pe-lg-g">
                            <button class="btn btn-lg btn-block bg-primary text-white w-100">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </Popup>
    );  
};

export default BirthdayPopup;