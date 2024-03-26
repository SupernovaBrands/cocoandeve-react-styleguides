import React, { useState, useEffect, useCallback } from 'react';
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { PrevButton, NextButton } from '@/components/carousel/EmblaCarouselArrowButtons';
import ChevronNext from '@/images/icons/chevron-next.svg';
import ChevronPrev from '@/images/icons/chevron-prev.svg';
import Carousel from '@/components/carousel/EmblaCarouselMulti';

type PropType = {
	slides: number[]
	options?: EmblaOptionsType
}

const ProductImageCarousel: React.FC<PropType> = (props) => {
	const { slides, options } = props;
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollProgress, setScrollProgress] = useState(0);
	const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
	const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
		containScroll: 'keepSnaps',
		dragFree: true,
		loop: true,
		align: 'start',
	});

	const pdpImagePrev = () => {
		if (!emblaMainApi || !emblaThumbsApi) return;
		emblaMainApi.scrollPrev();
	};

	const pdpImageNext = () => {
		if (!emblaMainApi || !emblaThumbsApi) return;
		emblaMainApi.scrollNext();
	};

	const onThumbClick = (index: number) => {
		if (!emblaMainApi || !emblaThumbsApi) return;
		emblaMainApi.scrollTo(index);
	};

	const onSelect = useCallback(() => {
		if (!emblaMainApi || !emblaThumbsApi) return;
		setSelectedIndex(emblaMainApi.selectedScrollSnap());
		emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
	}, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

	const onScroll = useCallback((emblaMainApi: EmblaCarouselType) => {
		const progress = Math.max(0, Math.min(1, emblaMainApi.scrollProgress()));
		setScrollProgress(progress * 100);
	}, []);

	useEffect(() => {
		if (!emblaMainApi) return;
		onSelect();
		emblaMainApi.on('select', onSelect);
		emblaMainApi.on('reInit', onSelect);

		emblaMainApi.on('select', onScroll);
		emblaMainApi.on('reInit', onScroll);
		emblaMainApi.on('scroll', onScroll);
	}, [emblaMainApi, onSelect, onScroll]);

	return (
		<>
			<div className="carousel mb-2 lg:sticky lg:px-g">
				<Carousel.Wrapper emblaApi={emblaMainApi}>
					<Carousel.Inner emblaRef={emblaMainRef} className="lg:-mx-g">
						{slides.map((index) => (
							<div className="flex-grow-0 flex-shrink-0 basis-[97.5%] w-[97.5%] pr-[4px] lg:pr-0 lg:basis-full lg:w-full" key={index}>
								<picture className="flex items-center justify-center">
									<source srcSet={`https://via.placeholder.com/1140x1140/EFADBA?text=1140x1140+${`Slide ${index + 1}`}`} media="(min-width: 992px)" />
									<img className="block w-full rounded-md lg:rounded-none" src={`https://via.placeholder.com/614x614/EFADBA?text=614x614 ${`Slide ${index + 1}`}`} alt={`slide ${index + 1}`} />
								</picture>
							</div>
						))}
					</Carousel.Inner>
					<span className="bg-black absolute text-white p-1 w-full text-center left-0 right-0 bottom-0">👻 Get 3 for 2 with code: HALLOWEEN 👻</span>
				</Carousel.Wrapper>
			</div>
			<div className="carousel__progress lg:hidden rounded-sm bg-gray-400 h-[4px] my-1 w-full relative overflow-hidden self-center justify-end">
				<div
					className={`w-[10%] absolute h-[4px] rounded-sm bg-gray-500 top-0 bottom-0`}
					style={{ left: `${scrollProgress}%`, width: `${(1 / slides.length) * 100}%` }}
					/>
			</div>
			<div className="carousel max-w-[90%] mx-auto hidden lg:flex items-center">
				<Carousel.Wrapper className="w-full" emblaApi={emblaMainApi}>
					<Carousel.Inner emblaRef={emblaThumbsRef} className="ml-1">
						{slides.map((index) => (
							<div className="flex-grow-0 mx-1 flex-shrink-0 w-[70px] basis-[70px] flex items-center justify-center" key={index}>
								<button type="button" className={`${selectedIndex === index ? 'border border-primary' : ''}`} onClick={() => onThumbClick(index)}>
									<img src={`https://via.placeholder.com/150x150/EFADBA?text=${index + 1}`} width={70} height={70} />
								</button>
							</div>
						))}
					</Carousel.Inner>
					<Carousel.Navigation>
						<PrevButton
							onClick={pdpImagePrev}
							className="absolute -left-2 top-25 w-5 h-5 rounded-full shadow-lg z-[1] flex items-center justify-center p-0 text-primary text-center bg-white border-0"
						>
							<ChevronPrev className="w-g h-g svg--current-color" />
						</PrevButton>
						<NextButton
							onClick={pdpImageNext}
							className="absolute -right-2 top-25 w-5 h-5 rounded-full shadow-lg z-[1] flex items-center justify-center p-0 text-primary text-center bg-white border-0"
						>
							<ChevronNext className="w-g h-g svg--current-color" />
						</NextButton>
					</Carousel.Navigation>
				</Carousel.Wrapper>
			</div>

		</>
	);
};

export default ProductImageCarousel;
