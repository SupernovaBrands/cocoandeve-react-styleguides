import dynamic from 'next/dynamic';
// import Popup from '@/components/Popup';
import { useState, useEffect } from 'react';
import Collapse from 'react-bootstrap/Collapse';
const Popup = dynamic(() => import('@/components/Popup'), {
    ssr: false,
});
const CookiesBannerPopup = (props) => {

    const [open, setOpen] = useState(false);

    return (
        <Popup classes="modal-cookies-banner" cotent_classes="py-g px-2" body_classes="p-0" margin={true} modal_size="modal-md">
            <p className="modal-cookies__text text-center mb-g px-lg-0">We use cookies to enhance your browsing experience, analyse traffic and serve tailored advertisements. <a href="#" className="text-body text-underline">Find out more</a></p>
			<Collapse in={open}>
                <div className="px-lg-1">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" defaultChecked="checked" className="custom-control-input" value="" id="cookieBanner1" />
                        <label className="custom-control-label mb-1" htmlFor="cookieBanner1">
                            <span className="font-size-xs">Functional: These cookies are required for basic site functionality and are therefore always enabled.</span>
                        </label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" defaultChecked="checked" className="custom-control-input" value="" id="cookieBanner2" />
                        <label className="custom-control-label mb-1" htmlFor="cookieBanner2">
                            <span className="font-size-xs">Perfomance: These cookies allow us to improve the site’s functionality by tracking usage on this website.</span>
                        </label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" defaultChecked="checked" className="custom-control-input" value="" id="cookieBanner3" />
                        <label className="custom-control-label mb-3" htmlFor="cookieBanner3">
                            <span className="font-size-xs">Social Media & Advertising: These cookies collect imformation to help better tailor advertising to your interests, both within and beyond Coco & Eve website.</span>
                        </label>
                    </div>
                </div>
            </Collapse>
			<div className="d-flex align-items-center justify-content-center">
				<a href="#cookieBannerCollapse" role="button" aria-expanded="false" aria-controls="cookieBannerCollapse" className="text-body font-size-sm text-underline mx-1" onClick={() => setOpen(!open)}>Change</a>
				<a href="#" className="btn btn-sm btn-primary mx-1" data-dismiss="modal" onClick={props.onHide}>Got it</a>
			</div>
        </Popup>
    );
};

export default CookiesBannerPopup;
