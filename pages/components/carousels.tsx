import React, { useCallback } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import EmblaCarousel from '@/components/carousel/EmblaCarousel';
import EmblaCarouselMulti from '@/components/carousel/EmblaCarouselMulti';
import { DotButton, useDotButton } from '@/components/carousel/EmblaCarouselDotButton';
import Autoplay from 'embla-carousel-autoplay';
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
} from '@/components/carousel/EmblaCarouselArrowButtons';
import ChevronNext from '@/images/icons/chevron-next.svg';
import ChevronPrev from '@/images/icons/chevron-prev.svg';

const options: EmblaOptionsType = {
	loop: true,
};
const SLIDE_COUNT = 3;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const SLIDE_COUNT_2 = 6;
const SLIDES_2 = Array.from(Array(SLIDE_COUNT_2).keys());

const Carousels: React.FC = () => {
	const controlAutoplay = (api: any) => useCallback(
		(callback: () => void) => {
			const autoplay = api?.plugins()?.autoplay;
			if (!autoplay) return;
			autoplay.reset();
			callback();
		},
		[api]
	);

	// carousel 1
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: true, delay: 3000 })
	]);
	const { selectedIndex: idx1, onDotButtonClick: onClick1 } = useDotButton(emblaApi);

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
			<EmblaCarousel slides={SLIDES} emblaRef={emblaRef} emblaApi={emblaApi}>
				<ol className="carousel__dots flex flex-wrap justify-center items-center absolute right-0 bottom-0 left-0 z-[15] p-0 mr-[10%] ml-[10%] mb-[1rem]">
					{SLIDES.map((_, index) => (
						<li key={index} className={`bg-white ${index === idx1 ? ' opacity-1' : ' opacity-50'}`}>
							<DotButton
								onClick={() => onClick1(index)}
								className="carousel__dot"
							/>
						</li>
					))}
				</ol>
			</EmblaCarousel>

			<h1 className="mb-3">CAROUSEL WITH RIGHT BULLETS INDICATORS</h1>
			<EmblaCarousel slides={SLIDES} emblaRef={emblaRef2} emblaApi={emblaApi2}>
				<ol className="carousel__dots flex flex-wrap justify-end items-center absolute right-0 bottom-0 left-0 z-[15] p-0 mr-[10%] ml-[10%] mb-[1rem]">
					{SLIDES.map((_, index) => (
						<li key={index} className={`border border-white ${index === idx2 ? ' bg-white' : ''}`}>
							<DotButton
								onClick={() => onClick2(index)}
								className="carousel__dot"
							/>
						</li>
					))}
				</ol>
			</EmblaCarousel>

			<h1 className="mb-1 mt-5">CAROUSEL WITH BULLETS PRIMARY COLOR</h1>
			<EmblaCarousel slides={SLIDES} emblaRef={emblaRef3} emblaApi={emblaApi3}>
				<ol className="carousel__dots flex flex-wrap justify-center items-center absolute right-0 bottom-0 left-0 z-[15] p-0 mr-[10%] ml-[10%] mb-[1rem]">
					{SLIDES.map((_, index) => (
						<li key={index} className={`bg-primary ${index === idx3 ? ' opacity-1' : ' opacity-50'}`}>
							<DotButton
								onClick={() => onClick3(index)}
								className="carousel__dot"
							/>
						</li>
					))}
				</ol>
			</EmblaCarousel>

			<h1 className="mb-1 mt-5">CAROUSEL WITH BULLETS BODY COLOR</h1>
			<EmblaCarousel slides={SLIDES} emblaRef={emblaRef4} emblaApi={emblaApi4}>
				<ol className="carousel__dots flex flex-wrap justify-center items-center absolute right-0 bottom-0 left-0 z-[15] p-0 mr-[10%] ml-[10%] mb-[1rem]">
					{SLIDES.map((_, index) => (
						<li key={index} className={`bg-white ${index === idx4 ? ' opacity-1' : ' opacity-50'}`}>
							<DotButton
								onClick={() => onClick4(index)}
								className="carousel__dot"
							/>
						</li>
					))}
				</ol>
			</EmblaCarousel>

			<h1 className="mb-1 mt-5">CAROUSEL WITH CONTROLS</h1>
			<EmblaCarousel slides={SLIDES} emblaRef={emblaRef5} emblaApi={emblaApi5}>
				<PrevButton
					onClick={() => autoPlayClick5(arrowClickPrev5)}
					disabled={prevDisabled5}
					className="absolute left-0 top-0 bottom-0 z-[1] flex items-center justify-center w-[10%] p-0 text-primary text-center bg-none border-0"
				>
					<ChevronPrev className="w-[15px] h-[15px] svg--current-color" />
				</PrevButton>
				<NextButton
					onClick={() => autoPlayClick5(arrowClickNext5)}
					disabled={nextDisabled5}
					className="absolute right-0 top-0 bottom-0 z-[1] flex items-center justify-center w-[10%] p-0 text-primary text-center bg-none border-0"
				>
					<ChevronNext className="w-[15px] h-[15px] svg--current-color" />
				</NextButton>
				<ol className="carousel__dots flex flex-wrap justify-center items-center absolute right-0 bottom-0 left-0 z-[15] p-0 mr-[10%] ml-[10%] mb-[1rem]">
					{SLIDES.map((_, index) => (
						<li key={index} className={`bg-white ${index === idx5 ? ' opacity-1' : ' opacity-50'}`}>
							<DotButton
								onClick={() => onClick5(index)}
								className="carousel__dot"
							/>
						</li>
					))}
				</ol>
			</EmblaCarousel>

			<h1 className="mb-1 mt-5">CAROUSEL WITH GROUPED CONTROLS</h1>
			<EmblaCarousel slides={SLIDES} emblaRef={emblaRef6} emblaApi={emblaApi6}>
				<PrevButton
					onClick={() => autoPlayClick6(arrowClickPrev6)}
					disabled={prevDisabled6}
					className="absolute left-0 top-0 lg:right-[5em] lg:left-auto lg:top-auto bottom-0 lg:bottom-[1em] z-[1] flex items-center justify-center w-[10%] lg:w-[2.5em] lg:h-[2.5em] p-0 text-primary text-center bg-none border-0"
				>
					<span className="bg-white w-[2.5em] h-[2.5em] absolute z-[-1] flex justify-center items-center">
						<ChevronPrev className="w-[15px] h-[15px] svg--current-color" />
					</span>
				</PrevButton>
				<NextButton
					onClick={() => autoPlayClick6(arrowClickNext6)}
					disabled={nextDisabled6}
					className="absolute right-0 lg:right-[1.5em] top-0 lg:top-auto bottom-0 lg:bottom-[1em] z-[1] flex items-center justify-center w-[10%] lg:w-[2.5em] lg:h-[2.5em] p-0 text-primary text-center bg-none border-0"
				>
					<span className="bg-white w-[2.5em] h-[2.5em] absolute z-[-1] flex justify-center items-center">
						<ChevronNext className="w-[15px] h-[15px] svg--current-color" />
					</span>
				</NextButton>
				<ol className="carousel__dots flex flex-wrap justify-center items-center absolute right-0 bottom-0 left-0 z-[15] p-0 mr-[10%] ml-[10%] mb-[1rem]">
					{SLIDES.map((_, index) => (
						<li key={index} className={`bg-white ${index === idx6 ? ' opacity-1' : ' opacity-50'}`}>
							<DotButton
								onClick={() => onClick6(index)}
								className="carousel__dot"
							/>
						</li>
					))}
				</ol>
			</EmblaCarousel>

			<h1 className="mb-1 mt-5">CAROUSEL LOOP 3 ITEMS</h1>
			<EmblaCarouselMulti slides={SLIDES_2} emblaRef={emblaRef7} emblaApi={emblaApi7} className="-mx-hg" itemClass="w-full lg:w-1/3 lg:basis-1/3">
				<PrevButton
					onClick={() => autoPlayClick7(arrowClickPrev7)}
					disabled={prevDisabled7}
					className="absolute left-0 top-0 lg:-left-g bottom-0 z-[1] flex items-center justify-center w-[10%] p-0 text-center bg-none border-0"
				>
					<span className="carousel__button--half-rounded left-0 bg-white w-[48.75px] lg:w-[97.5px] h-[97.5px] absolute z-[-1] flex justify-center items-center right-0 rounded-tr-full rounded-br-full lg:rounded-full">
						<ChevronPrev className="w-[26px] h-[26px] svg--current-color" />
					</span>
				</PrevButton>
				<NextButton
					onClick={() => autoPlayClick7(arrowClickNext7)}
					disabled={nextDisabled7}
					className="absolute right-0 lg:-right-g top-0 bottom-0 z-[1] flex items-center justify-center w-[10%] p-0 text-center bg-none border-0"
				>
					<span className="carousel__button--half-rounded right-0 bg-white w-[48.75px] lg:w-[97.5px] h-[97.5px] absolute z-[-1] flex justify-center items-center rounded-tl-full rounded-bl-full lg:rounded-full">
						<ChevronNext className="w-[26px] h-[26px] svg--current-color" />
					</span>
				</NextButton>
			</EmblaCarouselMulti>

			<h1 className="mb-1 mt-5">CAROUSEL LOOP 4 ITEMS</h1>
			<EmblaCarouselMulti slides={SLIDES_2} emblaRef={emblaRef8} emblaApi={emblaApi8} className="-mx-hg" itemClass="w-full lg:w-1/4 lg:basis-1/4">
				<PrevButton
					onClick={() => autoPlayClick8(arrowClickPrev8)}
					disabled={prevDisabled8}
					className="absolute left-0 top-0 lg:-left-g bottom-0 z-[1] flex items-center justify-center w-[10%] p-0 text-center bg-none border-0"
				>
					<span className="carousel__button--half-rounded left-0 bg-white w-[48.75px] lg:w-[97.5px] h-[97.5px] absolute z-[-1] flex justify-center items-center right-0 rounded-tr-full rounded-br-full lg:rounded-full">
						<ChevronPrev className="w-[26px] h-[26px] svg--current-color" />
					</span>
				</PrevButton>
				<NextButton
					onClick={() => autoPlayClick8(arrowClickNext8)}
					disabled={nextDisabled8}
					className="absolute right-0 lg:-right-g top-0 bottom-0 z-[1] flex items-center justify-center w-[10%] p-0 text-center bg-none border-0"
				>
					<span className="carousel__button--half-rounded right-0 bg-white w-[48.75px] lg:w-[97.5px] h-[97.5px] absolute z-[-1] flex justify-center items-center rounded-tl-full rounded-bl-full lg:rounded-full">
						<ChevronNext className="w-[26px] h-[26px] svg--current-color" />
					</span>
				</NextButton>
			</EmblaCarouselMulti>

			<h1 className="mb-1 mt-5">CAROUSEL LOOP 4 ITEMS CENTERED</h1>
			<EmblaCarouselMulti slides={SLIDES_2} emblaRef={emblaRef9} emblaApi={emblaApi9} className="" itemClass="w-3/4 basis-3/4 lg:w-1/4 lg:basis-1/4">
				<PrevButton
					onClick={() => autoPlayClick9(arrowClickPrev9)}
					disabled={prevDisabled9}
					className="absolute left-0 lg:-left-[1.25em] top-0 lg:w-[2.5em] bottom-0 z-[1] flex items-center justify-center w-[10%] p-0 text-primary text-center bg-none border-0"
				>
					<span className="bg-white w-[2.5em] h-[2.5em] absolute z-[-1] flex justify-center items-center">
						<ChevronPrev className="w-[15px] h-[15px] svg--current-color" />
					</span>
				</PrevButton>
				<NextButton
					onClick={() => autoPlayClick9(arrowClickNext9)}
					disabled={nextDisabled9}
					className="absolute right-0 lg:-right-[1.25em] top-0 bottom-0 z-[1] flex items-center justify-center w-[10%] lg:w-[2.5em] p-0 text-primary text-center bg-none border-0"
				>
					<span className="bg-white w-[2.5em] h-[2.5em] absolute z-[-1] flex justify-center items-center">
						<ChevronNext className="w-[15px] h-[15px] svg--current-color" />
					</span>
				</NextButton>
			</EmblaCarouselMulti>
		</section>
	);
};

export default Carousels;
