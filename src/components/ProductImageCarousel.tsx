import React, { useState, useEffect, useCallback } from 'react';
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { PrevButton, NextButton } from '~/components/carousel/EmblaCarouselArrowButtons';
import ChevronNext from '~/images/icons/chevron-next.svg';
import ChevronPrev from '~/images/icons/chevron-prev.svg';
import Carousel from '~/components/carousel/EmblaCarouselMulti';

interface ImageSlide {
	id: number
	src: string
}

type PropType = {
	slides: ImageSlide[]
	bottomBadge?: string
}

const ProductImageCarousel: React.FC<PropType> = ({ slides, bottomBadge }) => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollProgress, setScrollProgress] = useState(0);
	const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true, align: 'start'});
	const alignThumbs = slides.length > 7 ? 'center' : 'start';
	const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
		containScroll: 'keepSnaps',
		dragFree: true,
		loop: true,
		align: alignThumbs,
	});

	const pdpImagePrev = () => {
		if (!emblaMainApi || !emblaThumbsApi) return;
		emblaThumbsApi.scrollPrev();
	};

	const pdpImageNext = () => {
		if (!emblaMainApi || !emblaThumbsApi) return;
		emblaThumbsApi.scrollNext();
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
			<div className="carousel mb-1 lg:mb-2 lg:sticky aspect-ratio overflow-hidden">
				<Carousel.Wrapper emblaApi={emblaMainApi}>
					<Carousel.Inner emblaRef={emblaMainRef} className="w-full">
						{slides.map((slide, index) => (
							<div className="flex-grow-0 flex-shrink-0 basis-[97.5%] w-[97.5%] pr-[4px] lg:pr-0 lg:basis-full lg:w-full" key={index}>
								<picture className="flex items-center justify-center">
									<source srcSet={`${slide.src.replace('_text_', `Slide ${index + 1}`)}`} media="(min-width: 992px)" />
									<img className="block w-full rounded-md lg:rounded-none" src={`${slide.src.replace('1140x1140', '614x614').replace('_text_', `Slide ${index + 1}`)}`} alt={`slide ${index + 1}`} />
								</picture>
							</div>
						))}
					</Carousel.Inner>
					{bottomBadge && (<span className="bg-black absolute text-white p-1 w-full text-center left-0 right-0 bottom-0">{bottomBadge}</span>)}
				</Carousel.Wrapper>
			</div>
			<div className="px-g lg:hidden">
				<div className="carousel__progress bg-gray-400">
					<div
						className="carousel__progress--scroll bg-gray-500"
						style={{ left: `${scrollProgress}%`, width: `${((1 / slides.length) * 100) + 2.5}%` }} />
				</div>
			</div>
			<div className={`carousel max-w-[90%] mx-auto hidden lg:flex items-center mt-3`}>
				<Carousel.Wrapper className={`w-full ${alignThumbs === 'center' ? 'items-center' : 'items-start -mx-g'}`} emblaApi={emblaMainApi}>
					<Carousel.Inner emblaRef={emblaThumbsRef} className={`${slides.length > 7 ? 'ml-1 ' : 'justify-start ml-0'}`}>
						{slides.map((slide, index) => (
							<div className="flex-grow-0 mx-1 flex-shrink-0 w-[4.375em] basis-[4.375em] flex items-center justify-center" key={index}>
								<button type="button" className={`${selectedIndex === index ? 'border border-primary' : ''}`} onClick={() => onThumbClick(index)}>
									<img src={`${slide.src.replace('1140x1140', '150x150').replace('_text_', `${index + 1}`)}`} width={70} height={70} />
								</button>
							</div>
						))}
					</Carousel.Inner>
					<Carousel.Navigation>
						{slides.length > 7 && (
							<>
								<PrevButton
									onClick={pdpImagePrev}
									className="-left-2 top-25 w-5 h-5 rounded-full shadow-lg text-primary bg-white"
								>
									<ChevronPrev className="w-g h-g svg--current-color" />
								</PrevButton>
								<NextButton
									onClick={pdpImageNext}
									className="-right-2 top-25 w-5 h-5 rounded-full shadow-lg text-primary bg-white"
								>
									<ChevronNext className="w-g h-g svg--current-color" />
								</NextButton>
							</>
						)}
					</Carousel.Navigation>
				</Carousel.Wrapper>
			</div>
		</>
	);
};

export default ProductImageCarousel;
