import dynamic from 'next/dynamic';
import CloseRounded from '~/images/icons/close-rounded.svg';
// import Popup from '~/components/Popup';
const Popup = dynamic(() => import('~/components/Popup'), {
    ssr: false,
});
const ExitIntent = (props) => {
    return (
        <Popup classes="exit-intent-popup" body_classes="p-0">
            <figure className="m-0 position-relative">
                <img src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_052fd624-6050-47d7-8c06-987e8313c281.jpg?v=1772038186" className="w-100" />
                <figcaption className="position-absolute text-white px-3 d-flex flex-column justify-content-center text-center">
                    <p className="exit-intent-popup__title fw-bold mb-2">OUR BIGGEST<br />SALE EVER</p>
                    <p className="d-flex align-items-center">
                        <span className="exit-intent-popup__upto fw-bold me-g mb-25">UP<br />TO</span>
                        <span className="exit-intent-popup__discount fw-bold">50% OFF</span>
                    </p>ex
                    <p className="exit-intent-popup__text">Dont’s miss out!</p>
                    <button className="btn btn-primary btn-lg btn-block" data-dismiss="modal">Count me in</button>
                </figcaption>
            </figure>
            <button type="button" className="svg position-absolute exit-intent-popup__close text-white close" onClick={props.onHide}>
                <CloseRounded className="svg" />
            </button>
        </Popup>
    );
};

export default ExitIntent;
