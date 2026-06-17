import { useEffect, useState } from "react";

const ProductCardKit = (props: any) => {
	const title = props.quizSetting?.quiz_title || 'Find the perfect solution for your <br className="hidden lg:block"/>skin’s needs in just a few steps';
    // console.log('quiz setting', props.quizSetting);
    const { data } = props;
    let os = 'unknown';
    const [platform, setPlatform] = useState(os);
    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor;
        
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

	return (
		<figure className={props.className ?? ''}>
            <a href={data?.byob_url || '/pages/build-your-own-bundle'}>
                <picture className="block">
                    <source srcSet={data?.byob_image_desktop?.url?.replace('.jpg', '_417x616_crop_center.jpg') ||'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/BYOB_Card_DT_v2_417x616_crop_center.jpg?v=1776675016'} media="(min-width: 992px)" />
                    <img src={data?.byob_image_mobile?.url?.replace('.jpg', '_x112.jpg') || 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/BYOB_Card_MB_v2_x112.jpg?v=1776675078'} className="w-full" loading="lazy" alt="Illustration of a person taking a quiz to find their perfect self-tan solution" width={384} height={72} />
                </picture>
                <figcaption className="absolute left-[5em] top-2/4 lg:top-0 lg:left-0 lg:right-0 -translate-y-1/2 lg:transform-none text-left lg:text-center pl-25 pr-g lg:px-0 lg:mt-4 lg:pt-0 pb-0 lg:pb-0 w-[75%] lg:w-full items-center [flex-flow:column] justify-center">
                    <p className={`${platform === 'os-mac' || platform === 'os-ios' ? 'relative top-[1px]' : ''} ${platform === 'os-android' ? 'relative top-[1.5px]' : ''} lg:text-xl mb-0 lg:mb-25 font-bold text-body w-full`}>{data?.byob_title || 'Build Your Own Bundle'}</p>
                    <p className={`lg:hidden text-xs text-body ${platform === 'os-mac' || platform === 'os-ios' ? 'relative top-[1px]' : ''} ${platform === 'os-android' ? 'relative top-[1.5px]' : ''}`}
                        dangerouslySetInnerHTML={{
							__html: data.byob_subtitle_mobile || 'Up to 20% OFF your routine',
						}}
                    />
                    <p className="hidden lg:block text-sm lg:text-base mb-g lg:mb-1 text-body"
                        dangerouslySetInnerHTML={{
							__html: data?.byob_text || 'Mix, match & save<br>up to 20% OFF!',
						}}
                    />
                    <span className={`hidden lg:inline-block align-middle text-center select-none border py-1 px-3 leading-normal no-underline ${props.ctaBgColor === 'bg-dark' ? 'bg-dark border-dark hover:bg-dark' : 'bg-primary border-primary hover:primary-dark' } text-white hover:text-white hover:no-underline rounded-none lg:py-[7px] lg:px-[28px] min-w-[157px]`}>{data?.byob_button_cta || 'Get Started'}</span>
                    {/* <svg className="lg:hidden absolute right-[24px] -translate-y-1/2 top-2/4" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="-0.5" y="0.5" width="31" height="31" rx="15.5" transform="matrix(-1 0 0 1 31 0)" fill="white"></rect><rect x="-0.5" y="0.5" width="31" height="31" rx="15.5" transform="matrix(-1 0 0 1 31 0)" stroke="#D62E55"></rect><path d="M13.269 11.0793L18.9258 16.7362L13.269 22.393L14.4004 23.5244L21.1886 16.7362L14.4004 9.94796L13.269 11.0793Z" fill="#D62E55" stroke="#D62E55"></path></svg> */}
                    <svg className="lg:hidden absolute right-[24px] -translate-y-1/2 top-2/4" xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15" fill="none">
                        <path d="M0.706994 1.83814L6.36383 7.49498L0.706993 13.1518L1.83838 14.2832L8.6266 7.49498L1.83838 0.706753L0.706994 1.83814Z" fill="#151515" stroke="#151515"/>
                    </svg>
                </figcaption>
            </a>
		</figure>
	);
};

export default ProductCardKit;
