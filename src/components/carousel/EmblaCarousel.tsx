import React, { useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType } from 'embla-carousel';
import { LazyLoadImage } from '@/components/carousel/EmblaCarouselLazyLoadImage';

type PropType = {
	slides: number[]
	children: React.ReactNode
	emblaRef: any
	emblaApi: any
};

const EmblaCarousel: React.FC<PropType> = (props) => {
	const { slides, children, emblaRef, emblaApi } = props;

	const [slidesInView, setSlidesInView] = useState<number[]>([]);
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
			{children}
		</div>
	);
};

export default EmblaCarousel;
