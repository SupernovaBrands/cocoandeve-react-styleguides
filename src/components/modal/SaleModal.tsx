import CloseButton from '~/components/modal/CloseButton';
import Button from '~/components/Button';
import Paste from '~/images/icons/paste.svg';
import { useState } from 'react';

interface SalesPopupData {
	sbp_img: any
	sbp_img_lg: any
	sbp_code: string
	sbp_desc: string
	sbp_enabled: boolean
	sbp_heading: string
	sbp_bg_color: string
	sbp_desc_color: string
	sbp_heading_color: string
	sbp_cta_text: string
	sbp_cta_url: string
	sbp_percentage: string
	sbp_image_position: string
	sbp_percentage_color: string
}

type SalePopupProp = {
	handleClose: () => void
	data: SalesPopupData
	store: string
}


const SaleModal: React.FC<SalePopupProp> = ({ handleClose, data, store }) => {
	const { sbp_img, sbp_img_lg, sbp_code, sbp_desc, sbp_enabled, sbp_heading, sbp_bg_color, sbp_desc_color, sbp_heading_color, sbp_cta_text, sbp_cta_url, sbp_percentage, sbp_image_position, sbp_percentage_color } = data;
	const [copied, setCopied] = useState(false);

	const copyCode = (e) => {
		//const dataCode = e.currentTarget.getAttribute('data-code');
		navigator.clipboard.writeText(sbp_code);
		setCopied(true);
	};

	return (
		<div className={`flex w-full h-full ${sbp_bg_color} ${sbp_image_position === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} flex-col`}>
            <div className="lg:w-1/2 w-full lg:h-[480px] sm:h-[230px] flex items-center justify-center">
                <picture className="w-full h-full">
                    <source srcSet={sbp_img_lg?.url} media="(min-width: 992px)" />
                    <img src={sbp_img?.url} className="w-full h-full object-cover object-top" />
                </picture>
            </div>
            <div className="lg:w-1/2 w-full flex flex-col items-center justify-center p-3 lg:p-4">
                <CloseButton handleClose={handleClose} className="fill-[#000] h-[1em!important] text-sm [width:auto!important]" />
                <div className="text-center">
                    <h3 className={`${sbp_heading_color || 'text-body'} font-normal text-[1.375em]`}>{sbp_heading}</h3>
                    <div className="flex justify-center items-center mb-2">
                        <h2 className={`${sbp_percentage_color || 'text-body'} text-[7.25em]`}>{sbp_percentage}</h2>
                        <div className="flex flex-col items-start gap-[10px]">
                            <span className={`${sbp_percentage_color || 'text-body'} text-[4.375em] leading-[0.9]`}>%</span>
                            <span className={`${sbp_percentage_color || 'text-body'} text-[1.75em] font-bold leading-[0.3]`}>OFF</span>
                        </div>
                    </div>

                    <p className={`${sbp_desc_color || 'text-body'} text-sm text-gray-600 mb-g`}>{sbp_desc}</p>
                    {!copied ? (
                        <Button onClick={copyCode} data-code={sbp_code} buttonClass="w-full items-center border-2 border-white bg-white text-dark inline-flex justify-center relative rounded-full">
                            Use Code: {sbp_code} <Paste className="svg--current-color svg text-primary ml-1" />
                        </Button>
                    ) : (
                        <Button buttonClass="w-full border-2 border-white bg-white text-primary inline-flex justify-center items-center relative rounded-full">COPIED</Button>
                    )}
                    <a href={sbp_cta_url} className="btn-lg hover:no-underline hover:text-white w-full items-center border-2 border-primary bg-primary text-white inline-flex justify-center relative rounded-full mt-1">
                        {sbp_cta_text}
                    </a>
                </div>
            </div>
        </div>
	)
};

export default SaleModal;
