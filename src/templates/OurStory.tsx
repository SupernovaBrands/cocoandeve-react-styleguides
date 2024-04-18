// import CarouselCustom from "~/components/CarouselCustom";
import ImageWithText from "~/compounds/ImageWithText";
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import Play from '~/images/icons/play.svg';
import Close from '~/images/icons/close.svg';
import ChevronNext from '~/images/icons/chevron-next.svg';
import ChevronPrev from '~/images/icons/chevron-prev.svg';
import { useState, useRef } from "react";
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
	};
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: true, delay: 3000 })
	]);
	const {
		onPrevButtonClick: arrowClickPrev,
		onNextButtonClick: arrowClickNext
	} = usePrevNextButtons(emblaApi);
	const autoPlayClick = controlAutoplay(emblaApi);

	return (
		<>
			<section className="page-banner-image flex relative justify-center items-center p-0 w-full">
				<h1 className="text-center absolute m-1 text-[2em] lg:text-[3.25em] text-white">{banner.tiitle}</h1>
				{!isLoading && (
					<picture>
						<source srcSet={banner.back_img.url} media="(min-width: 992px)" />
						<img src={banner.back_img_mob.url} className="w-full" alt={banner.tiitle} />
					</picture>
				)}
			</section>

			{!isLoading && (
				<>
				<section className="container text-center mt-5 mb-5">
					<h2 className="mb-1">{intro.title}</h2>
					<div dangerouslySetInnerHTML={{
						__html: intro.description
					}} />
					<ImageWithText
						src={intro.back_img_mob_1.url}
						srcSet={intro.back_img_1.url}>
						<h2 className="mb-2">{intro.titleintro_1}</h2>
						<p>{intro.description_1}</p>
					</ImageWithText>

					<ImageWithText
						reverse={true}
						src={intro.back_img_mob_2.url}
						srcSet={intro.back_img_2.url}>
						<h2 className="mb-2 h1">{intro.titleintro_2}</h2>
						<p>{intro.description_2}</p>
					</ImageWithText>
				</section>

				<section className="page-award-slider bg-yellow-light text-center pt-5 pb-5 overflow-hidden">
					<div className="px-hg lg:px-g w-full lg:w-1/3 ml-auto mr-auto">
						<h2 className="mb-1">{logo.Heading}</h2>
						<p className="ml-auto mr-auto mb-5">{logo.Description}</p>
					</div>
					{/* <CarouselCustom id="loop2" imgLogo={true} items={CAROUSEL} slideNumber={4} roundedControl={true} centered={false} colLgGrid={5} useRow={false} /> */}
					<Carousel.Wrapper emblaApi={emblaApi} className="-mx-hg">
						<Carousel.Inner emblaRef={emblaRef} className="lg:-mx-g">
							{logo.logo.map((data, i) => {
								const odd = Math.abs(i % 2) == 1;
								return (
									<div className={`carousel__slide flex-grow-0 flex-shrink-0 w-3/4 basis-3/4 md:w-1/4 md:basis-1/4 lg:w-[20%] lg:basis-[20%] px-hg lg:px-g ${odd ? 'mt-5' : ''}`} key={data.id}>
										<div className="flex items-center justify-center">
											<img className="block w-full" src={data.image.url} alt={`slide ${data.id + 1}`} />
										</div>
									</div>
								)
							})}
						</Carousel.Inner>
						<Carousel.Navigation>
							<PrevButton
								onClick={() => autoPlayClick(arrowClickPrev)}
								className="lg:-left-0 w-[15%] opacity-90"
							>
								<span className="carousel__button--half-rounded left-0 lg:-left-[2.5em] bg-white w-full lg:w-[6.094em] h-[6.094em] absolute z-[-1] flex justify-center items-center right-0 rounded-tr-full rounded-br-full lg:rounded-full">
									<ChevronPrev className="w-[1.625em] h-[1.625em] svg--current-color lg:-mr-[2em]" />
								</span>
							</PrevButton>
							<NextButton
								onClick={() => autoPlayClick(arrowClickNext)}
								className="lg:-right-0 w-[15%] opacity-90"
							>
								<span className="carousel__button--half-rounded right-0 lg:-right-[2.5em] bg-white w-full lg:w-[6.094em] h-[6.094em] absolute z-[-1] flex justify-center items-center rounded-tl-full rounded-bl-full lg:rounded-full">
									<ChevronNext className="w-[1.625em] h-[1.625em] svg--current-color lg:-ml-[2em]" />
								</span>
							</NextButton>
						</Carousel.Navigation>
					</Carousel.Wrapper>
				</section>

				<section className="bg-body-light w-full justify-center lg:flex items-center p-0">
					<figure className="ml-auto lg:w-7/12 lg:basis-7/12 grow-0 p-0 relative mb-0">
						<picture className={`relative block cursor-pointer lg:z-[2]`} onClick={() => handlOpenModal(true)}>
							<source srcSet={videoBanner.back_img.url} media="(min-width: 992px)" />
							<img src={videoBanner.back_img_mob.url} className="w-full rounded-0" alt="Behind the scenes" />
							<div className="flex items-center absolute bottom-[35px] lg:bottom-[44px] left-[32px] lg:left-[48.8893px]">
								<Play className="svg--current-color w-[57px] h-[57px] lg:w-[88px] lg:h-[88px] text-white " />
								<span className="text-white font-bold text-[1.625em] lg:text-[2.75em] ml-1 lg:ml-g">Play Video</span>
							</div>
						</picture>
					</figure>
					<div className="container px-hg lg:absolute">
						<div className="flex flex-wrap mobile-wrapper -mx-hg lg:-mx-g px-hg">
							<div className="px-hg lg:px-g lg:w-1/3 pt-5 pb-5">
								<h4 className="mb-1">{videoBanner.title}</h4>
								<h2 className="mb-1">{videoBanner.description}</h2>
							</div>
						</div>
					</div>
				</section>

				<Modal className="modal-lg" isOpen={modal} handleClose={() => handlOpenModal(false)}>
					<div className="relative">
						<video ref={videoElem} controls className="rounded-[20px]" autoPlay playsInline webkit-playsinline>
							<source src={videoBanner.video} type="video/mp4" />
						</video>
					</div>
					<button type="button" className="close opacity-60 absolute top-[24px] right-[24px]" onClick={() => handlOpenModal(false)}>
						<Close className="svg--current-color w-[24px] h-[24px]" />
					</button>
				</Modal>
				</>
			)}
		</>
	);
};

export default OurStoryTemplate;
