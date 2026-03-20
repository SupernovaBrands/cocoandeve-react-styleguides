import parse from 'html-react-parser';
import Benefit1 from '~/images/icons/affiliate-benefits-1-money.svg';
import Benefit2 from '~/images/icons/affiliate-benefits-2-vip-card.svg';
import Benefit3 from '~/images/icons/affiliate-benefits-3-cookie.svg';
import Benefit4 from '~/images/icons/affiliate-benefits-4-photos.svg';
import Benefit5 from '~/images/icons/affiliate-benefits-5-exchange.svg';
import Benefit6 from '~/images/icons/affiliate-benefits-6-exchange.svg';

import { EmblaOptionsType } from 'embla-carousel';
import Carousel from "~/components/carousel/EmblaCarouselMulti";
import useEmblaCarousel from 'embla-carousel-react';
import { NextButton, PrevButton, controlAutoplay, usePrevNextButtons } from '~/components/carousel/EmblaCarouselArrowButtons';
import { useState, useCallback, useEffect, useRef } from 'react';
import { EmblaCarouselType } from 'embla-carousel';
import AccordionPDP from '~/components/AccordionPDP';
import ChevronNext from '~/images/icons/chevron-next.svg';
import ChevronPrev from '~/images/icons/chevron-prev.svg';

const screenLG = 992;

const Affiliate = (props: any) => {
	const innerWidth = globalThis.window ? globalThis.window.innerWidth : 0;

	const { banner, content, benefit, hiw, generalSetting } = props;
	const [dataAccordion, setDataAccordion] = useState([]);

	useEffect(() => {
		setDataAccordion([
			{
				id: 1,
				title: content.faq_title_1,
				text: content.faq_content_1.replace('<p', '<p class="text-sm leading-[17px] mb-3 lg:mb-[1rem]"'),
			},
			{
				id: 2,
				title: content.faq_title_2,
				text: content.faq_content_2.replace('<p', '<p class="text-sm leading-[17px] mb-3 lg:mb-[1rem]"'),
			},
		]);
	}, [content])



	const options: EmblaOptionsType = {
		loop: innerWidth >= screenLG,
		align: 'start'
	};

	const [emblaRef, emblaApi] = useEmblaCarousel(options);
	const [scrollProgress, setScrollProgress] = useState(0);

	const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
		const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
		setScrollProgress(progress * 100 / 1.5);
	}, []);

	const [openIndex, setOpenIndex] = useState(0);

	const toggleCard = (id: number) => {
		if (id === openIndex) {
			setOpenIndex(0);
		} else {
			setOpenIndex(id);
		}
	};

	return (
		<>
			{banner && (
				<figure className="relative block bg-affiliate mb-0">
					<picture>
						<source srcSet={banner.back_img.url.replace('public', '1920x')} media="(min-width: 992px)" />
						<img src={banner.back_img_2.url.replace('public', '828x')} alt={banner.title} className="w-full" loading="lazy" />
					</picture>

					<figcaption className="relative bg-affiliate lg:bg-transparent lg:absolute w-full -top-2 lg:top-0 bottom-0 left-0 right-0">
						{/* <div className="polygon-path bg-affiliate h-[5.625rem] absolute -translate-y-[50%] top-[1px] left-0 right-0 lg:hidden"></div> */}
						<div className="container lg:h-full">
							<div className="flex justify-center items-center h-full">
								<div className="grow-0 shrink-0 basis-[40%] hidden lg:block"></div>
								{/* <div className="f-text lg:border-t lg:border-t-transparent text-center lg:flex-1 text-affiliate-black">
									<h5 className="text-base tracking-[.8px] lg:text-xl lg:leading-[29px] lg:tracking-[1.2px]">{banner.introducing}</h5>
									<h1 className="text-[2rem] leading-[2.25rem] mt-25 mb-1 max-w-[80%] mx-auto lg:my-2 lg:text-hero lg:leading-[4.5rem] lg:max-w-[90%]">{banner.title}</h1>
									<h2 className="hidden lg:block text-xl font-normal mb-[2.813rem] leading-[1.5rem]">{banner.subtitle}</h2>
									<h2 className="lg:hidden text-base text-[#000] font-normal mb-2">
										{banner.subtitle.split(' ').map((text: string, idx: number) => {
											return idx === 3 ? parse(`${text}${"<br />"}`) : `${text} `
										})}
									</h2>
									<a
										href={banner.cta}
										className={`btn ${generalSetting?.bfcm_cta_bg_color === 'bg-dark' ? 'bg-dark lg:border-dark text-white' : 'btn-primary lg:border-primary'} block lg:inline-block fixed lg:static bottom-0 left-0 right-0 h-[3.125rem] z-10 w-full
											lg:w-auto rounded-none text-base border-0 py-g lg:min-w-[13.438rem] lg:rounded-[6px] lg:text-lg lg:h-auto hover:no-underline hover:text-white lg:pt-[14px] lg:pb-g lg:border-[1px]`}
										>{banner.cta_label}</a>
								</div> */}
							</div>
						</div>
					</figcaption>
				</figure>
			)}
			{hiw && (
				<div className="relative">
					<section className="pt-[60px]  mb-[60px]">
						<div className="container">
							<h2 className="text-[24px] leading-[30px] mt-[0] lg:mt-[20px] mb-[24px] lg:mb-[40px] text-[#000] lg:text-[2rem] lg:leading-[40px] text-center">{hiw.section_title}</h2>
						</div>
						<div className="container px-g">
							<div className="flex justify-center flex-wrap lg:flex-row">
								<div className="basis-full lg:basis-[418px] order-2">
									{hiw.result_img_1 && (
										<div className=" w-full lg:w-full z-[2] ">
											<img src={hiw.result_img_1.url} className="w-full" loading="lazy" alt="" />
										</div>
									)}
								</div>
								<div className="grow-0 shrink-0 basis-full lg:flex-1 order-1 lg:pt-[20px]">
									<div className="max-w-[654px] mx-auto text-left lg:text-left">
										
										<div className="lg:max-w-[85%] mx-auto lg:mx-0 lg:max-w-none">
											{parse(hiw.section_p.replace('<p>', '<p class=" mb-[1rem]">'))}
										</div>
										<div className="flex  badge-awards flex-wrap gap-[8px] lg:gap-[12px] justify-center lg:justify-start mb-[24px]">
											{hiw.beauty_awards.map((award) => (
												<div key={award.id} className="text-center grow-0 shrink-0 basis-1/7 lg:flex lg:justify-center">
													<img src={award.url.replace('public', '86x')} className="w-full max-w-[64px] lg:max-w-[74px]" loading="lazy" alt="" />
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			)}

			{benefit && (
				<section className="lg:max-w-[1160px] mx-auto ">
					<div className="container">
						<h2 className="text-[24px] leading-[30px] lg:text-[2rem] lg:leading-[40px] mb-[24px] lg:mb-[4.063rem] text-center mt-2 lg:mt-0">{benefit.section_title}</h2>
						<div className="flex flex-wrap justify-center benefits ">
							{[...Array(6)].map((data, i) => (
								<div key={`benefit-${i}`} className="w-1/2 lg:w-1/6 text-center mb-0 lg:mb-0">
									<div className="w-[6.25rem] h-[44px] lg:h-[54px] inline-block rounded-full relative mx-auto " role="presentation">
										{i === 0 && <Benefit1 className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]" />}
										{i === 1 && <Benefit2 className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]" />}
										{i === 2 && <Benefit3 className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]" />}
										{i === 3 && <Benefit4 className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]" />}
										{i === 4 && <Benefit5 className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]" />}
										{i === 5 && <Benefit6 className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]" />}
									</div>
									<p className="text-[14px] leading-[18px] mt-[8px] lg:mt-[16px] mx-auto max-w-[166px] lg:max-w-[176px] mb-[12px] lg:mb-0">
										{parse(benefit[`txt_${i + 1}`])}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>
			)}

			{content && (
				<section className="mt-[48px] lg:mt-[60px] overflow-hidden">
					<h2 className="text-center text-[#000] mb-[24px] lg:mb-[40px] mt-[0] text-[24px] leading-[30px] lg:text-[2rem] lg:leading-[40px]">{content.section_title}</h2>
					<Carousel.Wrapper emblaApi={emblaApi} className="mb-1 max-w-[1160px] mx-auto carousel__page-affiliate">
						<Carousel.Inner emblaRef={emblaRef} className="ml-[9px]">
							{[...Array(3)].map((idx, i) => (
								<div key={`affiliate-content-${i}`} className='flex-grow-0 flex-shrink-0 w-[90%] lg:w-full basis-[90%] lg:basis-full flex items-center px-[6px] lg:px-[15px] flex-col lg:flex-row'>
									<div className={`w-full lg:w-1/2 flex gap-[8px] lg:gap-[16px] flex-col pt-[12px] lg:py-[30px] bg-[#fff] lg:-mr-[40px] order-1 lg:order-0 lg:pl-2`}>
										<h3 className="text-[14px] leading-[18px] lg:text-[16px] lg:leading-[20px]">{content[`section_ct_step_${i + 1}`]}</h3>
										<h2 className='text-[16px] leading-[20px] lg:text-[24px] lg:leading-[30px] max-w-[380px]'>{content[`section_ct_title_${i + 1}`]}</h2>

										{i === 0 && (
											<p className="m-0 max-w-none lg:max-w-none text-[16px] lg:leading-[20px] lg:mb-[1rem] rounded-0">
												<>{parse(content[`section_ct_text_${i + 1}`].replace('btn', `btn rounded-none w-full lg:w-[243px] font-normal h-[50px] flex items-center justify-center ${generalSetting?.bfcm_cta_bg_color === 'bg-dark' ? 'bg-dark border-dark text-white' : 'btn-primary border-primary'} mt-0 border rounded-[6px] lg:text-[1.125rem] lg:leading-[22.5px] py-[9px] hover:text-white hover:no-underline lg:min-w-[215px] lg:px-[1.75em] lg:py-[.5625em]`))}</>
											</p>
										)}
										{i == 1 && (
											<p className="mt-0 max-w-none lg:max-w-none text-[16px] lg:leading-[20px] lg:mb-[1rem] rounded-0">
												<>{parse(content[`section_ct_text_${i + 1}`])}</>
											</p>
										)}
										{i === 2 && (
											<div className="affiliate--content-li text-left px-0 lg:mb-[1rem]">
												{i === 2 && (
													<>{parse(content[`section_ct_text_${i + 1}`].replace('<li', '<li class="mb-0 lg:mb-[1.25rem]"'))}</>
												)}
											</div>
										)}
									</div>
									<div className={`w-full lg:w-[calc(50%+40px)] order-0 lg:order-1`}>
										<img src={content[`section_ct_img_${i + 1}`].url} className="w-full" loading="lazy" alt="" />
									</div>
								</div>
							))}
						</Carousel.Inner>
						<Carousel.Navigation>
                                <PrevButton
                                    onClick={() => emblaApi.scrollPrev() }
                                    className="lg:w-auto lg:h-0 hidden lg:flex"
                                >
                                    <span className="absolute z-[-1] flex justify-center items-center">
                                        <ChevronPrev className="svg--current-color" />
                                    </span>
                                </PrevButton>
                                <NextButton
                                    onClick={() => emblaApi.scrollNext() }
                                    className="lg:w-auto lg:h-0 hidden lg:flex"
                                >
                                    <span className="absolute z-[-1] flex justify-center items-center">
                                        <ChevronNext className="svg--current-color" />
                                    </span>
                                </NextButton>
                            </Carousel.Navigation>
					</Carousel.Wrapper>
				</section>
			)}
			{content && (
				<section className="mt-2 mb-1 lg:mb-4 overflow-hidden">
					<div className="container px-g">
						<div className="max-w-[53rem] mx-auto mb-[4.375rem] lg:mb-0 px-0 lg:px-2">
							<h2 className="text-[#000] mb-[12px] text-[24px] lg:text-[32px] leading-[30px] lg:leading-[40px] lg:mb-[60px] text-center">{content.faq_heading}</h2>

							{dataAccordion && (<AccordionPDP noWrapperBorder={true} data={dataAccordion} onClick={toggleCard} openIndex={openIndex} itemClasses="max-w-[250px lg:max-w-none" />)}
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default Affiliate;
