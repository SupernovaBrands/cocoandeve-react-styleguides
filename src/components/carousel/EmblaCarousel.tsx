import React, { useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import { DotButton, useDotButton } from '@/components/carousel/EmblaCarouselDotButton';
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
} from '@/components/carousel/EmblaCarouselArrowButtons';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { LazyLoadImage } from '@/components/carousel/EmblaCarouselLazyLoadImage';

type PropType = {
	slides: number[]
	options?: EmblaOptionsType
	children: React.ReactNode
};

const EmblaCarousel: React.FC<PropType> = (props) => {
	const { slides, options, children } = props;
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: true, delay: 3000 })
	]);

	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
	const [slidesInView, setSlidesInView] = useState<number[]>([]);
	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick
	} = usePrevNextButtons(emblaApi);

	const onButtonAutoplayClick = useCallback(
		(callback: () => void) => {
			const autoplay = emblaApi?.plugins()?.autoplay;
			if (!autoplay) return;

			const resetOrStop =
				autoplay.options.stopOnInteraction === false
				? autoplay.reset
				: autoplay.stop;

			resetOrStop();
			callback();
		},
		[emblaApi]
	);

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
		});
	}, [emblaApi, updateSlidesInView]);

	return (
		<div className="relative">
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex carousel__container touch-pan-y">
					{slides.map((index) => {
						if (index === 0) {
							return (
								<LazyLoadImage
									key={index}
									imgSrc={`https://via.placeholder.com/300x100/`}
									inView={slidesInView.indexOf(index) > -1}
									index={index}
								/>
							)
						} else {
							return (
								<div className="carousel__slide" key={index}>
									<div className="flex items-center justify-center">
										<img className="block w-full" src={`https://via.placeholder.com/300x100/`} alt={`slide ${index + 1}`} />
									</div>
								</div>
							);
						}
					})}
				</div>
			</div>
			{/* {navArrow && (
				<div className="carousel__controls grid justify-between mt-3">
					<div className="carousel__buttons grid items-center">
						<PrevButton onClick={() => onButtonAutoplayClick(onPrevButtonClick)} disabled={prevBtnDisabled} />
						<NextButton onClick={() => onButtonAutoplayClick(onNextButtonClick)} disabled={nextBtnDisabled} />
					</div>
				</div>
			)} */}
			{/* {navButton && (
				<ol className="carousel__dots flex flex-wrap justify-center items-center absolute right-0 bottom-0 left-0 z-[15] p-0 mr-[10%] ml-[10%] mb-[1rem]">
					{scrollSnaps.map((_, index) => (
						<li key={index}>
							<DotButton
								onClick={() => onDotButtonClick(index)}
								className={'carousel__dot'.concat(
									index === selectedIndex ? ' carousel__dot--selected opacity-1' : ' opacity-50'
								)}
							/>
						</li>
					))}
				</ol>
			)} */}

			{children}
		</div>
	);
};

export default EmblaCarousel;
