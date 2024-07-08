import { useState, useRef } from 'react';
import CheckBox from './CheckBox';
import Help from '~/images/icons/help.svg';

const ProductSubscription = (props:any) => {
    const { tooltipText, productShopify } = props;
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipIndicator = useRef(null);
    const [tooltipPosition, setTooltipPosition] = useState({top: 0, left: 0});

    const tooltipHandler = () => {
        if (!showTooltip) {
            const spaceLeft = 30;
            const spaceTop = 15;
            const el = tooltipIndicator.current;
            const offsets = el.getBoundingClientRect();
            const offsetBody = document.body.getBoundingClientRect();
            const offsetTop  = offsets.top + window.scrollY - spaceTop;
            const offsetLeft = offsets.left - offsetBody.left - spaceLeft;
            setTooltipPosition({ top: offsetTop, left: offsetLeft });
        }
        setShowTooltip(!showTooltip);
    }

    const onChange = (e:any) => {
        props.onSubscriptionChange(e.target.checked);
    }

    return (
        <>
            <div className="sm:-mx-2 lg:-mx-0 no-gutters__in-container items-center pl-2 mb-2 media flex product-subscription lg:rounded-sm overflow-hidden items-center">
                <div className="media-body ml-0 lg:pl-0 pr-1">
                    <span className="text-primary">Save 20% off + free shipping</span><br />when you subscribe!
                    <div className="input-group w-full flex justify-left px-0 lg:px-0 relative items-center mt-1">
                        <CheckBox onChange={onChange} labelClass="flex justify-left mt-0 relative pl-3" label={`<strong>${ productShopify && productShopify.subscriptionText && productShopify.subscriptionText.value ? productShopify.subscriptionText.value : 'I want to subscribe' }</strong>`} id="subscription" checked={false}/>
                        <a className="text-primary ml-1 inline-flex relative" ref={tooltipIndicator} onClick={tooltipHandler} >
                            <Help className="svg fill-primary" />
                        </a>
                    </div>
                </div>
                <picture className="flex grow">
                    <source srcSet="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/2c4aaf19-03e3-4c7f-5261-211916d1e500/200x" media="(min-width: 1260px)"/>
                    <source srcSet="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/03aff718-9e39-4900-2375-09b341da1200/150x" media="(min-width: 992px)"/>
                    <img src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/1bd0d514-6f9e-4c33-8eb7-721355b4fb00/120x" className="sm:max-h-1/2 w-full object-cover" alt="Super Hydrating Shampoo &amp; Conditioner Set"/>
                </picture>
            </div>
            { showTooltip && (<div className="absolute p-1 rounded tooltip bg-primary text-white max-w-[275px] text-sm" style={{willChange: 'transform', left: tooltipPosition.left, top: tooltipPosition.top}}>
                <div className="arrow"></div>
                <div dangerouslySetInnerHTML={{__html: tooltipText}}></div>
            </div>)}
        </>
    );
};

export default ProductSubscription;
