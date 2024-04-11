
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

const SLIDES = [
	{
		imgMob: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/a065e37e-a06d-46ae-f58b-b5caf8b09a00/public',
		imgDesk: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/05aecd00-fd66-426b-9592-c20bf2057000/public',
	},
	{
		imgMob: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/a065e37e-a06d-46ae-f58b-b5caf8b09a00/public',
		imgDesk: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/05aecd00-fd66-426b-9592-c20bf2057000/public',
	}
];

const HeroBanner = (props: any) => {
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: true, delay: 3000 })
	]);

	const { selectedIndex: idx1, onDotButtonClick: onClick1 } = useDotButton(emblaApi);

	useEffect(() => {
		if (!emblaApi) return;
		const autoplay = emblaApi?.plugins()?.autoplay;
		if (!autoplay) return;
	}, [emblaApi]);

	return (
		<section className="pb-4">
			<Carousel.Wrapper emblaApi={emblaApi}>
				<Carousel.Inner emblaRef={emblaRef} className="lg:-mx-g">
					{SLIDES.map((slide, index) => (
						<div className="flex-grow-0 flex-shrink-0 w-full basis-full" key={index}>
							<div className="flex items-center justify-center">
								<picture>
									<source srcSet={slide.imgDesk} media="(min-width: 1025px)" width="1200" height="458" />
									<img className="block w-full" src={slide.imgMob} alt={`slide ${index + 1}`} />
								</picture>
							</div>
						</div>
					))}
				</Carousel.Inner>
				<Carousel.Navigation>
					<ol className="carousel__dots justify-end">
						{SLIDES.map((_, index) => (
							<li key={index} className={`border border-white ${index === idx1 ? ' bg-white' : ''}`}>
								<DotButton
									onClick={() => onClick1(index)}
									className="carousel__dot"
								/>
							</li>
						))}
					</ol>
				</Carousel.Navigation>
			</Carousel.Wrapper>
		</section>
	);
};

export default HeroBanner;
