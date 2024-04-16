import React, {
	PropsWithChildren,
	useCallback,
	useEffect,
	useState,
} from 'react';

import { EmblaCarouselType } from 'embla-carousel';

type UseDotButtonType = {
	selectedIndex: number
	scrollSnaps: number[]
	onDotButtonClick: (index: number) => void
};

export const useDotButton = (
	emblaApi: EmblaCarouselType | undefined
): UseDotButtonType => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

	const onDotButtonClick = useCallback((index: number) => {
		if (!emblaApi) return;
		emblaApi.scrollTo(index);
	}, [emblaApi]);

	const onInit = useCallback((emblaApi: EmblaCarouselType) => {
		if (!emblaApi) return;
		setScrollSnaps(emblaApi.scrollSnapList());
	}, []);

	const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
		if (!emblaApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap());
	}, []);

	useEffect(() => {
		if (!emblaApi) return;
		onInit(emblaApi);
		onSelect(emblaApi);
		emblaApi.on('reInit', onInit);
		emblaApi.on('reInit', onSelect);
		emblaApi.on('select', onSelect);
	}, [emblaApi, onInit, onSelect])

	return {
		selectedIndex,
		scrollSnaps,
		onDotButtonClick
	}
};

type PropType = PropsWithChildren<
	React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>
>;

export const DotButton: React.FC<PropType> = (props) => {
	const { children, ...restProps } = props;
	return (
		<button type="button" {...restProps}>
			{children}
		</button>
	);
};
