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
	const handlOpenModal = (open: boolean) => {
		setModal(open);
		if (videoElem) {
			if (modal) {
				videoElem.current?.play();
			} else {
				videoElem.current?.pause();
				if (videoElem && videoElem.current) videoElem.current.currentTime = 0;
			}
		}
	};

	const options: EmblaOptionsType = {
		loop: true,
		align: 'center',
		breakpoints: {
            '(min-width: 992px)': {
                align: 'start',
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

	const [firstLogo, ...restLogos] = logo.logo;
	const reorderLogos = [...restLogos,firstLogo];
	const logos = [...reorderLogos, ...reorderLogos];

	useEffect(() => {
		document.body.classList.add('p3-site-smaller');
	}, []);

	return (
		<>
			<section className="page-banner-image flex relative justify-center items-center p-0 w-full">
				<h1 className="text-center absolute mx-g my-1 text-xl lg:text-[3.375em] lg:leading-[1] text-white lg:mx-[10%] sm:font-[400] lg:font-bold">{banner.tiitle}</h1>
				{!isLoading && (
					<picture>
						<source srcSet="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/a1dca008-8438-4aaf-d8ba-ad72d7668500/public" media="(min-width: 992px)" />
						<img src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/6d1e9527-c4f1-42dd-4229-ac48de60a500/828x" className="w-full" alt={banner.tiitle} />
					</picture>
				)}
			</section>

			<section className="container text-center my-3 lg:my-[50px]">
				<h2 className="mb-1 text-body lg:text-2xl">{intro.title}</h2>
				{!isLoading && (
					<div className="w-full text-body intro__text lg:w-2/3 mx-auto px-hg -mb-g lg:mb-0 lg:px-g" dangerouslySetInnerHTML={{
						__html: intro.description
					}} />
				)}
				<ImageWithText
					src={!isLoading ? 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/342a6ea4-56aa-4b59-75b5-0bab0cd19700/public' : null}
					srcSet={'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/d2fefbbc-8dcb-4782-db07-ffa713901500/public'}>
					<h2 className="mb-[.5rem] text-lg text-body lg:text-xl">{intro.titleintro_1}</h2>
					{!isLoading && <p className="text-body">{intro.description_1}</p>}
				</ImageWithText>

				<ImageWithText
					reverse={true}
					src={!isLoading ? 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/ad271208-07c1-4920-b861-9de497293a00/public' : null}
					srcSet={'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/8cff9e32-7b24-4fd7-793f-fdea4fc2e600/public'}>
					<h2 className="mb-[.5rem] text-lg text-body lg:text-xl">{intro.titleintro_2}</h2>
					{!isLoading && <p className="mb-[1rem] lg:mb-0 text-body">{intro.description_2}</p>}
				</ImageWithText>
			</section>

			<section className="page-award-slider bg-yellow-light text-center py-3 lg:py-[50px] overflow-hidden">
				<div className="px-hg lg:px-g w-full lg:w-1/3 ml-auto mr-auto">
					<h2 className="mb-1 lg:mb-g text-body lg:text-2xl">{logo.Heading}</h2>
					{!isLoading && (
						<p className="ml-auto mr-auto mb-g text-body lg:mb-3">{logo.Description}</p>
					)}
				</div>
				{!isLoading && (
				<div className="container px-0">
					<Carousel.Wrapper emblaApi={emblaApi} className="mx-0">
						<Carousel.Inner emblaRef={emblaRef} className="px-0">
							{logos.map((data, i) => {
								return (
									<div className={`carousel__slide flex-grow-0 flex-shrink-0 w-1/2 basis-1/2 md:w-1/4 md:basis-1/4 lg:w-[12.5%] lg:basis-[12.5%] px-hg lg:px-g`} key={data.id}>
										<div className="flex items-center justify-center">
											<img className="block w-full min-w-[180px] lg:min-w-[auto] lg:max-w-[120px]" src={data.image.url.replace('public', '360x')} alt={`slide ${data.id + 1}`} />
										</div>
									</div>
								)
							})}
						</Carousel.Inner>
						<Carousel.Navigation>
							<PrevButton
								onClick={() => autoPlayClick(arrowClickPrev)}
								className="w-auto h-0 flex left-3 top-[50%]"
							>
								<span className="absolute z-[-1] flex justify-center items-center w-5 h-5 rounded-full bg-white shadow">
									<svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 11 18" fill="none">
										<path d="M10.4142 16.071L3.34318 8.99993L10.4142 1.92888L9 0.514648L0.514719 8.99993L9 17.4852L10.4142 16.071Z" fill="#151515"/>
									</svg>
								</span>
							</PrevButton>
							<NextButton
								onClick={() => autoPlayClick(arrowClickNext)}
								className="w-auto h-0 flex right-3 top-[50%]"
							>
								<span className="absolute z-[-1] flex justify-center items-center w-5 h-5 rounded-full bg-white shadow">
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


			<section className="bg-pink-light w-full justify-center lg:flex items-center p-0">
				<div className="container px-hg lg:absolute">
					<div className="flex flex-wrap mobile-wrapper -mx-hg lg:-mx-g px-hg">
						<div className="px-hg lg:pl-3 lg:pr-0 lg:w-1/3 pt-[40px] pb-[40px]">
							<h4 className="mb-1 font-normal lg:text-lg">{videoBanner.title}</h4>
							<h2 className="mb-0 lg:text-2xl">{videoBanner.description}</h2>
						</div>
					</div>
				</div>
				{!isLoading && (
					<figure className="ml-auto lg:w-[718px] lg:basis-[718px] grow-0 p-0 relative mb-0">
						<picture className={`relative block cursor-pointer lg:z-[2]`} onClick={() => handlOpenModal(true)}>
							<source srcSet={'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/191aae59-800a-4906-b776-b94aded44d00/public'} media="(min-width: 992px)" />
							<img src={'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/2db1b4fd-acbe-45c4-e5b3-a68312dcd700/public'} className="w-full rounded-0" alt="Behind the scenes" />
							<div className="flex items-center absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
								<Play className="svg--current-color w-[57px] h-[57px] lg:w-[88px] lg:h-[88px] text-white " />
								{/* <span className="text-white font-bold text-[1.625em] lg:text-[2.75em] ml-1 lg:ml-g">Play Video</span> */}
							</div>
						</picture>
					</figure>
				)}
				
			</section>

			{!isLoading && (
				<Modal className="modal-lg modal-dialog-centered !px-0 " isOpen={modal} handleClose={() => handlOpenModal(false)}>
					<div className="relative lg:border lg:border-[rgba(0,0,0,.2)]">
						<video ref={videoElem} controls className="rounded-[20px]" autoPlay={false} playsInline webkit-playsinline>
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
