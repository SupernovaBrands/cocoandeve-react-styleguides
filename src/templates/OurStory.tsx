import ImageWithText from "~/compounds/ImageWithText";
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import Play from '~/images/icons/play.svg';
import Close from '~/images/icons/close.svg';
import ChevronNext from '~/images/icons/chevron-next.svg';
import ChevronPrev from '~/images/icons/chevron-prev.svg';
import { useState, useRef, useEffect } from "react";
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
	controlAutoplay,
} from '~/components/carousel/EmblaCarouselArrowButtons';
import Modal from "~/components/Modal";

const OurStoryTemplate = (props: any) => {
	const { banner, intro, logo, videoBanner, isLoading } = props;
	const videoElem = useRef(null);
	const [modal, setModal] = useState(false);
	
	// FIX: Get poster image from videoBanner data
	const getPosterImage = () => {
		if (videoBanner?.back_img_mob?.url) {
			return videoBanner.back_img_mob.url;
		}
		return videoBanner?.back_img?.url || '';
	};
	
	const handlOpenModal = (open: boolean) => {
		setModal(open);
		if (open) {
			setTimeout(() => {
				if (videoElem.current) {
					videoElem.current.play().catch(error => {
						console.log("Autoplay prevented:", error);
					});
				}
			}, 100);
		} else {
			if (videoElem.current) {
				videoElem.current.pause();
				if (videoElem.current) videoElem.current.currentTime = 0;
			}
		}
	};

	const options: EmblaOptionsType = {
		loop: true,
		align: 'start',
		breakpoints: {
            '(min-width: 992px)': {
                watchDrag: false,
			    duration: 40,
            }
		}
	};
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: true, delay: 5000 })
	]);
	const {
		onPrevButtonClick: arrowClickPrev,
		onNextButtonClick: arrowClickNext
	} = usePrevNextButtons(emblaApi);
	const autoPlayClick = controlAutoplay(emblaApi);

	const [introEmblaRef, introEmblaApi] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: true, delay: 5000 })
	]);

	const {
		onPrevButtonClick: introArrowPrev,
		onNextButtonClick: introArrowNext
	} = usePrevNextButtons(introEmblaApi);

	const introAutoPlayClick = controlAutoplay(introEmblaApi);

	const [firstLogo, ...restLogos] = logo.logo;
	const reorderLogos = [...restLogos,firstLogo];
	const logos = [...reorderLogos, ...reorderLogos];

	return (
		<>
			<section className="page-banner-image flex relative justify-center items-center p-0 w-full">
				<h1 className="text-center absolute text-xl lg:text-[3em] lg:leading-[1] text-white lg:mx-[16.5%] mx-[10.0%] font-bold">{banner.tiitle}</h1>
				{!isLoading && (
					<picture className="w-full h-full">
						<source srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_a01c51d4-b2ff-4b85-8d1f-f9d5fc03286e.jpg?v=1772039610" media="(min-width: 992px)" />
						<img src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/828x.jpg?v=1772039632" className="w-full lg:h-[264px]" alt={banner.tiitle} />
					</picture>
				)}
			</section>

			<section className="container text-center my-3 lg:my-4">
				<h2 className="mb-1 text-body lg:text-2xl">{intro.title}</h2>
				{!isLoading && (
					<div className="w-full text-body intro__text lg:w-2/3 mx-auto px-hg -mb-g lg:mb-0 lg:px-g" dangerouslySetInnerHTML={{
						__html: intro.description
					}} />
				)}
				<Carousel.Wrapper emblaApi={introEmblaApi} className="mx-0">
					<Carousel.Inner emblaRef={introEmblaRef} className="px-0">
						<div className="carousel__slide flex-grow-0 flex-shrink-0 w-[calc(100%-40px)] basis-[calc(100%-40px)] sm:w-[calc(100%-40px)] sm:basis-[calc(100%-40px)] lg:w-full lg:basis-full">
							<ImageWithText
								src={!isLoading ? 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_1196e378-94f4-4094-a2cf-ef044b0e8e08.jpg?v=1772039650' : null}
								srcSet={'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_a4ba7b46-ca70-4ea0-ae41-d5254ba2a9d3.jpg?v=1772039670'}>
								<h2 className="mb-[.5rem] text-base text-body lg:text-xl">{intro.titleintro_1}</h2>
								{!isLoading && <p className="text-body text-sm lg:text-base">{intro.description_1}</p>}
							</ImageWithText>
						</div>
						<div className="carousel__slide flex-grow-0 flex-shrink-0 w-[calc(100%-40px)] basis-[calc(100%-40px)] sm:w-[calc(100%-40px)] sm:basis-[calc(100%-40px)] lg:w-full lg:basis-full">
							<ImageWithText
								reverse={true}
								src={!isLoading ? 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_61c02a0b-a1e6-42db-9fe6-e55a99d4e863.jpg?v=1772039693' : null}
								srcSet={'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_5c5881ab-3bb8-4e20-856b-f2c62879af84.jpg?v=1772039719'}>
								<h2 className="mb-[.5rem] text-base text-body lg:text-xl">{intro.titleintro_2}</h2>
								{!isLoading && <p className="lg:mb-0 text-body text-sm lg:text-base">{intro.description_2}</p>}
							</ImageWithText>
						</div>
					</Carousel.Inner>
					<Carousel.Navigation>
						<PrevButton
							onClick={() => introAutoPlayClick(introArrowPrev)}
							className="hidden w-auto h-0 lg:flex left-3 top-[50%]"
						>
							<span className="absolute z-[-1] flex justify-center items-center w-5 h-5 rounded-full">
								<svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 11 18" fill="none">
									<path d="M10.4142 16.071L3.34318 8.99993L10.4142 1.92888L9 0.514648L0.514719 8.99993L9 17.4852L10.4142 16.071Z" fill="#151515"/>
								</svg>
							</span>
						</PrevButton>
						<NextButton
							onClick={() => introAutoPlayClick(introArrowNext)}
							className="hidden w-auto h-0 lg:flex right-3 top-[50%]"
						>
							<span className="absolute z-[-1] flex justify-center items-center w-5 h-5 rounded-full">
								<svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 11 18" fill="none">
									<path d="M0.585767 16.071L7.65682 8.99993L0.585767 1.92888L2 0.514648L10.4853 8.99993L2 17.4852L0.585767 16.071Z" fill="#151515"/>
								</svg>
							</span>
						</NextButton>
					</Carousel.Navigation>
				</Carousel.Wrapper>
			</section>

			<section className="page-award-slider bg-gray-400 text-center py-2 lg:px-0 lg:py-4 overflow-hidden">
				<div className="px-g lg:px-0 w-full lg:w-1/3 ml-auto mr-auto">
					<h2 className="mb-1 text-body lg:text-2xl">{logo.Heading}</h2>
					{!isLoading && (
						<p className="ml-auto mr-auto mb-g text-body lg:mb-3">{logo.Description}</p>
					)}
				</div>
				{!isLoading && (
				<div className="container px-0 lg:px-5">
					<Carousel.Wrapper emblaApi={emblaApi} className="mx-0">
						<Carousel.Inner emblaRef={emblaRef} className="px-0">
							{logos.map((data, i) => {
								return (
									<div className={`carousel__slide flex-grow-0 flex-shrink-0 flex-[0_0_calc(100%/3.5)] md:w-1/4 md:basis-1/4 lg:w-[11.1111%] lg:basis-[11.1111%]`} key={data.id}>
										<div className="flex items-center justify-center">
											<img className="block w-full max-w-[100px] lg:min-w-[auto]" src={data.image.url.replace('public', '360x')} alt={`slide ${data.id + 1}`} />
										</div>
									</div>
								)
							})}
						</Carousel.Inner>
						<Carousel.Navigation>
							<PrevButton
								onClick={() => autoPlayClick(arrowClickPrev)}
								className="hidden w-auto h-0 lg:flex -left-3 top-[50%]"
							>
								<span className="absolute z-[-1] flex justify-center items-center w-5 h-5 rounded-full">
									<svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 11 18" fill="none">
										<path d="M10.4142 16.071L3.34318 8.99993L10.4142 1.92888L9 0.514648L0.514719 8.99993L9 17.4852L10.4142 16.071Z" fill="#151515"/>
									</svg>
								</span>
							</PrevButton>
							<NextButton
								onClick={() => autoPlayClick(arrowClickNext)}
								className="hidden w-auto h-0 lg:flex -right-3 top-[50%]"
							>
								<span className="absolute z-[-1] flex justify-center items-center w-5 h-5 rounded-full">
									<svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 11 18" fill="none">
										<path d="M0.585767 16.071L7.65682 8.99993L0.585767 1.92888L2 0.514648L10.4853 8.99993L2 17.4852L0.585767 16.071Z" fill="#151515"/>
									</svg>
								</span>
							</NextButton>
						</Carousel.Navigation>
					</Carousel.Wrapper>
				</div>
				)}
			</section>

			<section className="bg-pink-light w-full flex flex-col-reverse lg:flex-row justify-center items-center p-0">
				<div className="container px-0 lg:absolute">
					<div className="flex flex-wrap mobile-wrapper">
						<div className="px-2 lg:pl-3 lg:pr-0 lg:w-1/3 pt-[1rem] pb-2">
							<h4 className="mb-1 font-normal lg:text-lg">{videoBanner.title}</h4>
							<h2 className="mb-0 text-lg lg:text-2xl">Meet our hair, tan, skin & body ranges!</h2>
						</div>
					</div>
				</div>
				{!isLoading && (
					<figure className="ml-auto w-full lg:w-[718px] lg:basis-[718px] grow-0 p-0 relative mb-0">
						<picture className={`relative block cursor-pointer w-full h-[200px] lg:h-[400px] lg:z-[2]`} onClick={() => handlOpenModal(true)}>
							<source srcSet={'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/d17d9b69-072e-48a0-40ad-4338161a9500/public'} media="(min-width: 992px)" />
							<img src={'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/d17d9b69-072e-48a0-40ad-4338161a9500/public'} className="w-full h-full object-cover rounded-0" alt="Behind the scenes" />
							<div className="absolute top-0 left-0 w-full h-full bg-black/20 z-[1] rounded-0"></div>
							<div className="flex items-center absolute z-[2] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
								<Play className="svg--current-color w-[57px] h-[57px] lg:w-[64px] lg:h-[64px] text-white " />
								{/* <span className="text-white font-bold text-[1.625em] lg:text-[2.75em] ml-1 lg:ml-g">Play Video</span> */}
							</div>
						</picture>
					</figure>
				)}
				
			</section>

			{!isLoading && (
				<Modal className="modal-lg modal-dialog-centered !px-0 " isOpen={modal} handleClose={() => handlOpenModal(false)}>
					<div className="relative lg:border lg:border-[rgba(0,0,0,.2)] bg-black">
						<video 
							ref={videoElem} 
							controls 
							className="rounded-[20px]" 
							autoPlay={false} 
							playsInline 
							webkit-playsinline
							poster={getPosterImage()}
						>
							<source src={videoBanner.video} type="video/mp4" />
						</video>
					</div>
					<button type="button" className="close opacity-60 absolute top-[24px] right-[24px]" onClick={() => handlOpenModal(false)}>
						<Close className="svg--current-color w-[24px] h-[24px]" />
					</button>
				</Modal>
			)}

		</>
	);
};

export default OurStoryTemplate;