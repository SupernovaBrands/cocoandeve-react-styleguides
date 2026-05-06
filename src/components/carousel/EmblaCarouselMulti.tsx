import React, { useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType } from 'embla-carousel';

type MultiPropType = {
	children: React.ReactNode
	emblaApi: EmblaCarouselType
	className?: string
};

const EmblaCarousel: React.FC<MultiPropType> = ({ children, emblaApi, className = '' }) => {

	useEffect(() => {
		if (!emblaApi) return;
		const autoplay = emblaApi?.plugins()?.autoplay;
		if (!autoplay) return;
		emblaApi.on('select', () => {
			const autoplay = emblaApi?.plugins()?.autoplay;
			if (autoplay) autoplay.reset();
		});
	}, [emblaApi]);

	return (
		<div className={`relative ${className}`}>
			{children}
		</div>
	);
};

type NavProp = {
	children: React.ReactNode;
};
const Navigation: React.FC<NavProp> = (props) => props.children;

type InnerProp = {
	emblaRef: any
	children: React.ReactNode
	className?: string
	innerClass?: string
}
const Inner: React.FC<InnerProp> = ({ emblaRef, children, className = '', innerClass }) => {
	return (
		<div className={`overflow-hidden ${innerClass ?? ''}`} ref={emblaRef}>
			<div className={`flex carousel__container ${className}`}>
				{children}
			</div>
		</div>
	);
};

const Carousel = { Wrapper: EmblaCarousel, Inner, Navigation };

export default Carousel;
