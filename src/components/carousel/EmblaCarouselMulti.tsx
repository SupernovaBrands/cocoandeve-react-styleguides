import React, { useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType } from 'embla-carousel';

type PropType = {
	slides: number[]
	children: React.ReactNode
	emblaRef: any
	emblaApi: any
	itemClass: string
	className: string
};

const EmblaCarouselMulti: React.FC<PropType> = (props) => {
	const { slides, children, emblaRef, emblaApi, itemClass, className } = props;

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
		});
	}, [emblaApi, updateSlidesInView]);

	return (
		<div className={`relative ${className}`}>
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex carousel__container touch-pan-y lg:-mx-g">
					{slides.map((index) => (
						<div className={`carousel__slide flex-grow-0 flex-shrink-0 ${itemClass} px-hg lg:px-g`} key={index}>
							<div className="flex items-center justify-center">
								<img className="block w-full" src={`https://via.placeholder.com/600x400?text=${index + 1}`} alt={`slide ${index + 1}`} />
							</div>
						</div>
					))}
				</div>
			</div>
			{children}
		</div>
	);
};

export default EmblaCarouselMulti;
