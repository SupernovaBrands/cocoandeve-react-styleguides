import React from 'react';
import BeautyConfidence from '~/components/BeautyConfidence';
import BannerCard from '~/compounds/BannerCard';

const QuizReward = (props: any) => {
	const { store, generalSetting } = props;
    const ctaBgColor = generalSetting?.bfcm_cta_bg_color;
    const ctaTextColor = generalSetting?.bfcm_cta_text_color;

	return (
        <>
            <section className="container px-0 lg:px-g pt-3 lg:pt-0 pb-2 lg:pb-0 lg:my-5">
                <BeautyConfidence parentClass="w-full px-g mb-0 lg:px-0 block" />
            </section>
            <section className="container text-center mt-4 lg:mt-0 mb-1 lg:mb-5">
                <p className="text-xl lg:text-2xl mb-g lg:mb-3 font-bold">Discover more</p>
                <div className="flex flex-wrap -mx-hg lg:-mx-g justify-center">
                    <BannerCard
                        className="w-full lg:w-1/3 px-g mb-g lg:mb-0 block relative"
                        imgMb="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/7d9c7b41-0156-4100-2cbf-818451545e00/public"
                        imgDt="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/6ac2ef18-3d2f-4c03-891d-0bb1bc6cf900/public"
                        title="Build Your Bundle"
                        description="Mix, match & save <br />your way!"
                        ctaLabel="Build Now"
                        url="/pages/build-your-own-bundle"
                        store={store}
                        imgAlt="Illustration of a person build items to find their perfect bundle"
                        ctaBgColor={ctaBgColor}
                        ctaTextColor={ctaTextColor}
                    />
                    <BannerCard
                        title="Tan Quiz"
                        ctaLabel="Take the Quiz"
                        description={`Find the perfect solution for your <br className="hidden lg:block"/>skin’s needs in just a few steps`}
                        className="w-full lg:w-1/3 px-g mb-g lg:mb-0 block relative"
                        url="/pages/self-tan-quiz"
                        store={store}
                        imgMb="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/d336dfd0-5036-429d-18bb-fef66ee83500/public"
                        imgDt="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/2569ea0a-b963-411d-7320-1bab3cd77000/public"
                        imgAlt="Illustration of a person taking a quiz to find their perfect self-tan solution"
                        ctaBgColor={ctaBgColor}
                        ctaTextColor={ctaTextColor}
                    />
                    {store !== 'my' && (
                        <figure className="w-full lg:w-1/3 px-g mb-g lg:mb-0 block relative rounded">
                            <a href="/pages/rewards">
                                <picture className="block">
                                    <source srcSet="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/704453dd-6f76-4a3a-1c09-c72dc47c5d00/public" media="(min-width: 992px)" />
                                    <img className="w-full rounded-[24px] lg:rounded-[32px]" src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/66f96d20-d935-4759-f5d2-e0fc56748700/public" loading="lazy" alt="Graphic showing the rewards program details, including points and free products" width={384} height={72} />
                                </picture>
                                <figcaption className="absolute left-[5em] top-2/4 lg:top-0 lg:left-0 lg:right-0 -translate-y-1/2 lg:transform-none text-left lg:text-center px-g lg:px-0 lg:mt-4 lg:pt-0 pb-0 lg:pb-0 w-[75%] lg:w-full items-center [flex-flow:column] justify-center">
                                    <p className="lg:text-xl mb-0 lg:mb-25 font-bold text-body">Rewards Program</p>
                                    <p className="hidden lg:block text-sm lg:text-base mb-g lg:mb-1 text-body">Sign up for our reward program and <br className="hidden lg:block"/>stack up your points for free product</p>
                                    {/* <a href="/pages/rewards" className="inline-block align-middle text-center select-none border py-1 px-3 leading-normal no-underline bg-primary text-white hover:primary-dark hover:text-white hover:no-underline rounded-full lg:py-g lg:px-5 font-bold">Join Now</a> */}
                                    <span className={`hidden lg:inline-block align-middle text-center select-none border ${ctaBgColor === 'bg-dark' ? 'border-dark bg-dark': 'border-primary bg-primary hover:primary-dark'} py-1 px-3 leading-normal no-underline text-white hover:text-white hover:no-underline rounded-full lg:py-[7px] lg:px-[28px] min-w-[157px]`}>Join Now</span>
                                    <svg className="lg:hidden absolute right-2 -translate-y-1/2 top-2/4" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="-0.5" y="0.5" width="31" height="31" rx="15.5" transform="matrix(-1 0 0 1 31 0)" fill="white"></rect><rect x="-0.5" y="0.5" width="31" height="31" rx="15.5" transform="matrix(-1 0 0 1 31 0)" stroke="#D62E55"></rect><path d="M13.269 11.0793L18.9258 16.7362L13.269 22.393L14.4004 23.5244L21.1886 16.7362L14.4004 9.94796L13.269 11.0793Z" fill="#D62E55" stroke="#D62E55"></path></svg>
                                </figcaption>
                            </a>
                        </figure>
                    )}
                </div>
            </section>
        </>
	)
}

export default QuizReward;
