import CloseButton from '~/components/modal/CloseButton';
import Button from '~/components/Button';
import Paste from '~/images/icons/paste.svg';
import { useState, useEffect } from 'react';

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
	const [platform, setPlatform] = useState('');

	const copyCode = (e) => {
		navigator.clipboard.writeText(sbp_code);
		setCopied(true);
	};

	useEffect(() => {
		const userAgent = navigator.userAgent || navigator.vendor;
		let os = 'unknown';

		if (/windows/i.test(userAgent)) {
			os = 'os-win';
		} else if (/macintosh|mac os x/i.test(userAgent)) {
			os = 'os-mac';
		} else if (/iphone|ipad|ipod/i.test(userAgent)) {
			os = 'os-ios';
		} else if (/android/i.test(userAgent)) {
			os = 'os-android';
		}

		setPlatform(os);
	}, []);

	console.log('platform new', platform);

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
                    <h3 className={`${sbp_heading_color || 'text-body'} font-normal text-[1.375em] leading-[1.25]`}>{sbp_heading}</h3>
                    <div className={`flex items-center justify-center ${platform === 'os-win' || platform === 'os-android' ? 'mb-1' : ''} ${platform === 'os-mac' || platform === 'os-ios' ? 'mb-2' : ''}`}>
						<h2 className={`${sbp_percentage_color || 'text-body'} text-[7.25em] ${platform === 'os-win' || platform === 'os-android' ? 'leading-[96px]' : ''} ${platform === 'os-mac' || platform === 'os-ios' ? 'h-[88px] leading-[1]' : ''}`}>{sbp_percentage}</h2>
						<div className="flex flex-col">
							<h2 className={`${sbp_percentage_color || 'text-body'} text-[4.625em] ${platform === 'os-win' || platform === 'os-android' ? 'leading-[74px]' : ''} ${platform === 'os-mac' || platform === 'os-ios' ? 'leading-[1]' : ''}`}>%</h2>
							<h2 className={`${sbp_percentage_color || 'text-body'} font-bold text-[1.75em] ${platform === 'os-win' || platform === 'os-android' ? 'leading-[22px]' : ''} ${platform === 'os-mac' || platform === 'os-ios' ? 'leading-[0.5]' : ''}`}>OFF</h2>
						</div>
					</div>

                    <p className={`${sbp_desc_color || 'text-body'} text-sm text-gray-600 mb-2 leading-[1.25]`}>{sbp_desc}</p>
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
