import React, { useCallback, useEffect } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import { DotButton, useDotButton } from '@/components/carousel/EmblaCarouselDotButton';
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
} from '@/components/carousel/EmblaCarouselArrowButtons';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay'

type PropType = {
	slides: number[]
	options?: EmblaOptionsType
};

const EmblaCarousel: React.FC<PropType> = (props) => {
	const { slides, options } = props;
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: true, delay: 5000 })
	]);

	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
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

	useEffect(() => {
		const autoplay = emblaApi?.plugins()?.autoplay;
		if (!autoplay) return;
	}, [emblaApi]);

	return (
		<>
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex carousel__container touch-pan-y">
					{slides.map((index) => (
						<div className="carousel__slide" key={index}>
							<div className="flex items-center justify-center">
								<img className="block w-full" src={`https://via.placeholder.com/300x100/?text=${index + 1}`} alt={`slide ${index + 1}`} />
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="carousel__controls grid justify-between mt-3">
				<div className="carousel__buttons grid items-center">
					<PrevButton onClick={() => onButtonAutoplayClick(onPrevButtonClick)} disabled={prevBtnDisabled} />
					<NextButton onClick={() => onButtonAutoplayClick(onNextButtonClick)} disabled={nextBtnDisabled} />
				</div>
			</div>
			<div className="carousel__dots flex flex-wrap justify-end items-center mr-3">
				{scrollSnaps.map((_, index) => (
					<DotButton
						key={index}
						onClick={() => onDotButtonClick(index)}
						className={'carousel__dot'.concat(
							index === selectedIndex ? ' carousel__dot--selected' : ''
						)}
					/>
				))}
			</div>
		</>
	);
};

export default EmblaCarousel;
