import React, { useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Carousel from '@/components/carousel/EmblaCarouselMulti';
import { DotButton, useDotButton } from '@/components/carousel/EmblaCarouselDotButton';
import Autoplay from 'embla-carousel-autoplay';
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
	controlAutoplay,
} from '@/components/carousel/EmblaCarouselArrowButtons';
import ChevronNext from '@/images/icons/chevron-next.svg';
import ChevronPrev from '@/images/icons/chevron-prev.svg';
import { LazyLoadImage } from '@/components/carousel/EmblaCarouselLazyLoadImage';

const options: EmblaOptionsType = {
	loop: true,
};
const SLIDE_COUNT = 3;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const SLIDE_COUNT_2 = 6;
const SLIDES_2 = Array.from(Array(SLIDE_COUNT_2).keys());

const Carousels: React.FC = () => {

	// carousel 1
	const [slidesInView, setSlidesInView] = useState<number[]>([]);
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: true, delay: 3000 })
	]);
	const { selectedIndex: idx1, onDotButtonClick: onClick1 } = useDotButton(emblaApi);

	const updateSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
		setSlidesInView((slidesInView) => {
			if (slidesInView.length === emblaApi.slideNodes().length) {
				emblaApi.off('slidesInView', updateSlidesInView);
			}
			const inView = emblaApi
				.slidesInView()
				.filter((index) => !slidesInView.includes(index));
			return slidesInView.concat(inView);
		});
	}, []);

	useEffect(() => {
		if (!emblaApi) return;
		const autoplay = emblaApi?.plugins()?.autoplay;
		if (!autoplay) return;
		updateSlidesInView(emblaApi);
		emblaApi.on('slidesInView', updateSlidesInView);
		emblaApi.on('reInit', updateSlidesInView);
		emblaApi.on('select', () => {
			const autoplay = emblaApi?.plugins()?.autoplay;
			if (autoplay) autoplay.reset();
			if (autoplay && !autoplay.isPlaying()) autoplay.play();
		});
	}, [emblaApi, updateSlidesInView]);

	// carousel 2
	const [emblaRef2, emblaApi2] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: true, delay: 3000 })
	]);
	const { selectedIndex: idx2, onDotButtonClick: onClick2 } = useDotButton(emblaApi2);

	// carousel 3
	const [emblaRef3, emblaApi3] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: true, delay: 3000 })
	]);
	const { selectedIndex: idx3, onDotButtonClick: onClick3 } = useDotButton(emblaApi3);

	// carousel 4
	const [emblaRef4, emblaApi4] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: true, delay: 3000 })
	]);
	const { selectedIndex: idx4, onDotButtonClick: onClick4 } = useDotButton(emblaApi4);

	// carousel 5
	const [emblaRef5, emblaApi5] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: true, delay: 3000 })
	]);
	const { selectedIndex: idx5, onDotButtonClick: onClick5 } = useDotButton(emblaApi5);
	const {
		prevBtnDisabled: prevDisabled5,
		nextBtnDisabled: nextDisabled5,
		onPrevButtonClick: arrowClickPrev5,
		onNextButtonClick: arrowClickNext5
	} = usePrevNextButtons(emblaApi5);
	const autoPlayClick5 = controlAutoplay(emblaApi5);

	// carousel 6
	const [emblaRef6, emblaApi6] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: true, delay: 3000 })
	]);
	const { selectedIndex: idx6, onDotButtonClick: onClick6 } = useDotButton(emblaApi6);
	const {
		prevBtnDisabled: prevDisabled6,
		nextBtnDisabled: nextDisabled6,
		onPrevButtonClick: arrowClickPrev6,
		onNextButtonClick: arrowClickNext6
	} = usePrevNextButtons(emblaApi6);
	const autoPlayClick6 = controlAutoplay(emblaApi6);

	// carousel 7
	const [emblaRef7, emblaApi7] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: false, delay: 3000 })
	]);
	const {
		prevBtnDisabled: prevDisabled7,
		nextBtnDisabled: nextDisabled7,
		onPrevButtonClick: arrowClickPrev7,
		onNextButtonClick: arrowClickNext7
	} = usePrevNextButtons(emblaApi7);
	const autoPlayClick7 = controlAutoplay(emblaApi7);

	// carousel 8
	const [emblaRef8, emblaApi8] = useEmblaCarousel({ align: 'start', ...options}, [
		Autoplay({ playOnInit: false, delay: 3000 })
	]);
	const {
		prevBtnDisabled: prevDisabled8,
		nextBtnDisabled: nextDisabled8,
		onPrevButtonClick: arrowClickPrev8,
		onNextButtonClick: arrowClickNext8
	} = usePrevNextButtons(emblaApi8);
	const autoPlayClick8 = controlAutoplay(emblaApi8);

	// carousel 9
	const [emblaRef9, emblaApi9] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: false, delay: 3000 })
	]);
	const {
		prevBtnDisabled: prevDisabled9,
		nextBtnDisabled: nextDisabled9,
		onPrevButtonClick: arrowClickPrev9,
		onNextButtonClick: arrowClickNext9
	} = usePrevNextButtons(emblaApi9);
	const autoPlayClick9 = controlAutoplay(emblaApi9);

	return (
		<section className="container pb-4">
			<h1 className="mb-3">CAROUSEL WITH BULLETS</h1>
			<Carousel.Wrapper emblaApi={emblaApi}>
				<Carousel.Inner emblaRef={emblaRef} className="lg:-mx-g">
					{SLIDES.map((index) => (
						<div className="flex-grow-0 flex-shrink-0 w-full basis-full" key={index}>
							<div className="flex items-center justify-center">
								<img className="block w-full" src={`https://via.placeholder.com/300x100/`} alt={`slide ${index + 1}`} />
							</div>
						</div>
					))}
				</Carousel.Inner>
				<Carousel.Navigation>
					<ol className="carousel__dots justify-center">
						{SLIDES.map((_, index) => (
							<li key={index} className={`bg-white ${index === idx1 ? ' opacity-1' : ' opacity-50'}`}>
								<DotButton
									onClick={() => onClick1(index)}
									className="carousel__dot"
								/>
							</li>
						))}
					</ol>
				</Carousel.Navigation>
			</Carousel.Wrapper>

			<h1 className="mb-3">CAROUSEL WITH RIGHT BULLETS INDICATORS</h1>
			<Carousel.Wrapper emblaApi={emblaApi2}>
				<Carousel.Inner emblaRef={emblaRef2} className="lg:-mx-g">
					{SLIDES.map((index) => (
						<div className="flex-grow-0 flex-shrink-0 w-full basis-full" key={index}>
							<div className="flex items-center justify-center">
								<img className="block w-full" src={`https://via.placeholder.com/300x100/`} alt={`slide ${index + 1}`} />
							</div>
						</div>
					))}
				</Carousel.Inner>
				<Carousel.Navigation>
					<ol className="carousel__dots justify-end">
						{SLIDES.map((_, index) => (
							<li key={index} className={`border border-white ${index === idx2 ? ' bg-white' : ''}`}>
								<DotButton
									onClick={() => onClick2(index)}
									className="carousel__dot"
								/>
							</li>
						))}
					</ol>
				</Carousel.Navigation>
			</Carousel.Wrapper>

			<h1 className="mb-1 mt-5">CAROUSEL WITH BULLETS PRIMARY COLOR</h1>
			<Carousel.Wrapper emblaApi={emblaApi3}>
				<Carousel.Inner emblaRef={emblaRef3} className="lg:-mx-g">
					{SLIDES.map((index) => (
						<div className="flex-grow-0 flex-shrink-0 w-full basis-full" key={index}>
							<div className="flex items-center justify-center">
								<img className="block w-full" src={`https://via.placeholder.com/300x100/`} alt={`slide ${index + 1}`} />
							</div>
						</div>
					))}
				</Carousel.Inner>
				<Carousel.Navigation>
					<ol className="carousel__dots justify-center">
						{SLIDES.map((_, index) => (
							<li key={index} className={`bg-primary ${index === idx3 ? ' opacity-1' : ' opacity-50'}`}>
								<DotButton
									onClick={() => onClick3(index)}
									className="carousel__dot"
								/>
							</li>
						))}
					</ol>
				</Carousel.Navigation>
			</Carousel.Wrapper>

			<h1 className="mb-1 mt-5">CAROUSEL WITH BULLETS BODY COLOR</h1>
			<Carousel.Wrapper emblaApi={emblaApi4}>
				<Carousel.Inner emblaRef={emblaRef4} className="lg:-mx-g">
					{SLIDES.map((index) => (
						<div className="flex-grow-0 flex-shrink-0 w-full basis-full" key={index}>
							<div className="flex items-center justify-center">
								<img className="block w-full" src={`https://via.placeholder.com/300x100/`} alt={`slide ${index + 1}`} />
							</div>
						</div>
					))}
				</Carousel.Inner>
				<Carousel.Navigation>
					<ol className="carousel__dots justify-center">
						{SLIDES.map((_, index) => (
							<li key={index} className={`bg-white ${index === idx4 ? ' opacity-1' : ' opacity-50'}`}>
								<DotButton
									onClick={() => onClick4(index)}
									className="carousel__dot"
								/>
							</li>
						))}
					</ol>
				</Carousel.Navigation>
			</Carousel.Wrapper>

			<h1 className="mb-1 mt-5">CAROUSEL WITH CONTROLS</h1>
			<Carousel.Wrapper emblaApi={emblaApi5}>
				<Carousel.Inner emblaRef={emblaRef5} className="lg:-mx-g">
					{SLIDES.map((index) => (
						<div className="flex-grow-0 flex-shrink-0 w-full basis-full" key={index}>
							<div className="flex items-center justify-center">
								<img className="block w-full" src={`https://via.placeholder.com/300x100/`} alt={`slide ${index + 1}`} />
							</div>
						</div>
					))}
				</Carousel.Inner>
				<Carousel.Navigation>
					<PrevButton
						onClick={() => autoPlayClick5(arrowClickPrev5)}
						disabled={prevDisabled5}
						className="text-primary"
					>
						<ChevronPrev className="w-g h-g svg--current-color" />
					</PrevButton>
					<NextButton
						onClick={() => autoPlayClick5(arrowClickNext5)}
						disabled={nextDisabled5}
						className="text-primary"
					>
						<ChevronNext className="w-g h-g svg--current-color" />
					</NextButton>
					<ol className="carousel__dots justify-center">
						{SLIDES.map((_, index) => (
							<li key={index} className={`bg-white ${index === idx5 ? ' opacity-1' : ' opacity-50'}`}>
								<DotButton
									onClick={() => onClick5(index)}
									className="carousel__dot"
								/>
							</li>
						))}
					</ol>
				</Carousel.Navigation>
			</Carousel.Wrapper>

			<h1 className="mb-1 mt-5">CAROUSEL WITH GROUPED CONTROLS</h1>
			<Carousel.Wrapper emblaApi={emblaApi6}>
				<Carousel.Inner emblaRef={emblaRef6} className="lg:-mx-g">
					{SLIDES.map((index) => (
						<div className="flex-grow-0 flex-shrink-0 w-full basis-full" key={index}>
							<div className="flex items-center justify-center">
								<img className="block w-full" src={`https://via.placeholder.com/300x100/`} alt={`slide ${index + 1}`} />
							</div>
						</div>
					))}
				</Carousel.Inner>
				<Carousel.Navigation>
					<PrevButton
						onClick={() => autoPlayClick6(arrowClickPrev6)}
						disabled={prevDisabled6}
						className="lg:right-[5em] lg:left-auto lg:top-auto lg:bottom-[1em] lg:w-4 lg:h-4 text-primary"
					>
						<span className="bg-white w-4 h-4 absolute z-[-1] flex justify-center items-center">
							<ChevronPrev className="w-g h-g svg--current-color" />
						</span>
					</PrevButton>
					<NextButton
						onClick={() => autoPlayClick6(arrowClickNext6)}
						disabled={nextDisabled6}
						className="lg:right-[1.5em] lg:top-auto lg:bottom-[1em] lg:w-4 lg:h-4 text-primary"
					>
						<span className="bg-white w-4 h-4 absolute z-[-1] flex justify-center items-center">
							<ChevronNext className="w-g h-g svg--current-color" />
						</span>
					</NextButton>
					<ol className="carousel__dots justify-center">
						{SLIDES.map((_, index) => (
							<li key={index} className={`bg-white ${index === idx6 ? ' opacity-1' : ' opacity-50'}`}>
								<DotButton
									onClick={() => onClick6(index)}
									className="carousel__dot"
								/>
							</li>
						))}
					</ol>
				</Carousel.Navigation>
			</Carousel.Wrapper>

			<h1 className="mb-1 mt-5">CAROUSEL LOOP 3 ITEMS</h1>
			<Carousel.Wrapper emblaApi={emblaApi7} className="-mx-hg">
				<Carousel.Inner emblaRef={emblaRef7} className="lg:-mx-g">
					{SLIDES_2.map((index) => (
						<div className="carousel__slide flex-grow-0 flex-shrink-0 w-full basis-full lg:w-1/3 lg:basis-1/3 px-hg lg:px-g" key={index}>
							<div className="flex items-center justify-center">
								<img className="block w-full" src={`https://via.placeholder.com/600x400?text=${index + 1}`} alt={`slide ${index + 1}`} />
							</div>
						</div>
					))}
				</Carousel.Inner>
				<Carousel.Navigation>
					<PrevButton
						onClick={() => autoPlayClick7(arrowClickPrev7)}
						disabled={prevDisabled7}
						className="lg:-left-g"
					>
						<span className="shadow-lg left-0 bg-white w-[3.047em] lg:w-[6.094em] h-[6.094em] absolute z-[-1] flex justify-center items-center right-0 rounded-tr-full rounded-br-full lg:rounded-full">
							<ChevronPrev className="w-[1.625em] h-[1.625em] svg--current-color" />
						</span>
					</PrevButton>
					<NextButton
						onClick={() => autoPlayClick7(arrowClickNext7)}
						disabled={nextDisabled7}
						className="lg:-right-g"
					>
						<span className="shadow-lg right-0 bg-white w-[3.047em] lg:w-[6.094em] h-[6.094em] absolute z-[-1] flex justify-center items-center rounded-tl-full rounded-bl-full lg:rounded-full">
							<ChevronNext className="w-[1.625em] h-[1.625em] svg--current-color" />
						</span>
					</NextButton>
				</Carousel.Navigation>
			</Carousel.Wrapper>

			<h1 className="mb-1 mt-5">CAROUSEL LOOP 4 ITEMS</h1>
			<Carousel.Wrapper emblaApi={emblaApi8} className="-mx-hg">
				<Carousel.Inner emblaRef={emblaRef8} className="lg:-mx-g">
					{SLIDES_2.map((index) => (
						<div className="carousel__slide flex-grow-0 flex-shrink-0 w-full basis-full lg:w-1/4 lg:basis-1/4 px-hg lg:px-g" key={index}>
							<div className="flex items-center justify-center">
								<img className="block w-full" src={`https://via.placeholder.com/600x400?text=${index + 1}`} alt={`slide ${index + 1}`} />
							</div>
						</div>
					))}
				</Carousel.Inner>
				<Carousel.Navigation>
					<PrevButton
						onClick={() => autoPlayClick8(arrowClickPrev8)}
						disabled={prevDisabled8}
						className="lg:-left-g"
					>
						<span className="shadow-lg left-0 bg-white w-[3.047em] lg:w-[6.094em] h-[6.094em] absolute z-[-1] flex justify-center items-center right-0 rounded-tr-full rounded-br-full lg:rounded-full">
							<ChevronPrev className="w-[1.625em] h-[1.625em] svg--current-color" />
						</span>
					</PrevButton>
					<NextButton
						onClick={() => autoPlayClick8(arrowClickNext8)}
						disabled={nextDisabled8}
						className="lg:-right-g"
					>
						<span className="shadow-lg right-0 bg-white w-[3.047em] lg:w-[6.094em] h-[6.094em] absolute z-[-1] flex justify-center items-center rounded-tl-full rounded-bl-full lg:rounded-full">
							<ChevronNext className="w-[1.625em] h-[1.625em] svg--current-color" />
						</span>
					</NextButton>
				</Carousel.Navigation>
			</Carousel.Wrapper>

			<h1 className="mb-1 mt-5">CAROUSEL LOOP 4 ITEMS CENTERED</h1>
			<Carousel.Wrapper emblaApi={emblaApi9} className="">
				<Carousel.Inner emblaRef={emblaRef9} className="lg:-mx-g">
					{SLIDES_2.map((index) => (
						<div className="carousel__slide flex-grow-0 flex-shrink-0 w-3/4 basis-3/4 lg:w-1/4 lg:basis-1/4 px-hg lg:px-g" key={index}>
							<div className="flex items-center justify-center">
								<img className="block w-full" src={`https://via.placeholder.com/600x400?text=${index + 1}`} alt={`slide ${index + 1}`} />
							</div>
						</div>
					))}
				</Carousel.Inner>
				<Carousel.Navigation>
					<PrevButton
						onClick={() => autoPlayClick9(arrowClickPrev9)}
						disabled={prevDisabled9}
						className="lg:-left-[1.25em] lg:w-4 text-primary"
					>
						<span className="bg-white w-4 h-4 absolute z-[-1] flex justify-center items-center">
							<ChevronPrev className="w-g h-g svg--current-color" />
						</span>
					</PrevButton>
					<NextButton
						onClick={() => autoPlayClick9(arrowClickNext9)}
						disabled={nextDisabled9}
						className="lg:-right-[1.25em] lg:w-4 text-primary"
					>
						<span className="bg-white w-4 h-4 absolute z-[-1] flex justify-center items-center">
							<ChevronNext className="w-g h-g svg--current-color" />
						</span>
					</NextButton>
				</Carousel.Navigation>
			</Carousel.Wrapper>
		</section>
	);
};

export default Carousels;
