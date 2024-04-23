import { useState, useRef } from 'react';
import CheckBox from './CheckBox';
import Help from '~/images/icons/help.svg';

const ProductSubscription = (props) => {
    const { tooltipText } = props;
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

    return (
        <>
            <div className="sm:-mx-2 lg:-mx-0 no-gutters__in-container items-center pl-2 mb-2 media flex product-subscription lg:rounded-sm overflow-hidden items-center">
                <div className="media-body ml-0 lg:pl-0 pr-1">
                    <span className="text-primary">Save 20% off + free shipping</span><br />when you subscribe!
                    <div className="input-group w-full flex justify-left px-0 lg:px-0 relative items-center">
                        <CheckBox labelClass="flex justify-left mt-1 relative pl-3" label={`I want to subscribe`} id="subscribe" checked={false}/>
                        <a className="text-primary ml-1 inline-flex relative" ref={tooltipIndicator} onClick={tooltipHandler} >
                            <Help className="svg fill-primary" />
                        </a>
                    </div>
                </div>
                <picture className="flex grow">
                    <source srcSet="https://via.placeholder.com/154x110/EFADBA" media="(min-width: 992px)" />
                    <img src="https://via.placeholder.com/104x110/EFADBA" alt="Placeholder" className="sm:max-h-1/2 w-full object-cover"/>
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
