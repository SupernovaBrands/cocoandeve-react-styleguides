import dynamic from 'next/dynamic';
import CloseRounded from '~/images/icons/close-rounded.svg';
// import Popup from '~/components/Popup';
const Popup = dynamic(() => import('~/components/Popup'), {
    ssr: false,
});

const BirthdayPopup = (props) => {
    return (
        <Popup classes="birthday-popup" body_classes="p-0" margin={true}>
            <button type="button" className="close position-absolute font-size-sm p-0" onClick={props.onHide}>
                <CloseRounded className="svg" />
            </button>
            <div className="row justify-content-end p-0">
                <picture className="col-lg-6 p-0">
                    <source srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/DT_db2c8f07-cfcd-47af-b159-d2507acf8e92.png" media="(min-width: 992px)" />
                    <img src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/Mobile_29349535-f982-4299-8c2c-ce6aa5b74ae7.png" className="w-100" />
                </picture>
                <form className="birthday-popup__form col-lg-6 pt-lg-5 pb-5">
                    <h2 className="birthday-popup__title h1 text-center mb-1 pe-lg-g">{props.title}</h2>
                    <p className="font-size-sm mb-3 text-center pe-lg-g px-g">{props.content}</p>
                    <div className="row px-g">
                        <div className="input-group form-group col-5 col-lg-6 ps-0">
                            <input className="form-control" type="number" placeholder="Date" required="" />
                        </div>
                        <div className="input-group form-group col-7 col-lg-6 ps-lg-0 pe-lg-g pl-lg-0">
                            <select className="custom-select p-g"  required="">
                                <option defaultValue="">Select</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                    </div>
                    <div className="row px-g me-0">
                        <button className="btn btn-lg btn-block bg-primary text-white me-lg-g">Submit</button>
                    </div>
                </form>
            </div>
        </Popup>
    );
};

export default BirthdayPopup;
