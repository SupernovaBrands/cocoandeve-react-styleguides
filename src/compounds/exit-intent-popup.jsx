import dynamic from 'next/dynamic';
import CloseRounded from '../../src/images/icons/close-rounded.svg';
// import Popup from '@/components/Popup';
const Popup = dynamic(() => import('@/components/Popup'), {
    ssr: false,
});
const ExitIntent = (props) => {
    return (
        <Popup classes="exit-intent-popup" body_classes="p-0">
            <figure className="m-0 position-relative">
                <img src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/d17ae0b2-d981-4cab-7c69-d70ea2ab7e00/public" className="w-100" />
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
