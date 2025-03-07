import React, { useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType } from 'embla-carousel';

type MultiPropType = {
	children: React.ReactNode
	emblaApi: EmblaCarouselType
	className?: string
};

const EmblaCarousel: React.FC<MultiPropType> = (props) => {
	const { children, emblaApi, className } = props;

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
const Inner: React.FC<InnerProp> = (props) => {
	return (
		<div className={`overflow-hidden ${props.innerClass ?? ''}`} ref={props.emblaRef}>
			<div className={`flex carousel__container ${props.className}`}>
				{props.children}
			</div>
		</div>
	);
};

EmblaCarousel.defaultProps = {
	className: ''
};

Inner.defaultProps = {
	className: ''
};
const Carousel = { Wrapper: EmblaCarousel, Inner, Navigation };

export default Carousel;
