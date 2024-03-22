import React, {
	PropsWithChildren,
	useCallback,
	useEffect,
	useState,
} from 'react';

import { EmblaCarouselType } from 'embla-carousel';
import ChevronNext from '@/images/icons/chevron-next.svg';
import ChevronPrev from '@/images/icons/chevron-prev.svg';

type UsePrevNextButtonsType = {
	prevBtnDisabled: boolean
	nextBtnDisabled: boolean
	onPrevButtonClick: () => void
	onNextButtonClick: () => void
};

export const usePrevNextButtons = (
	emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {

	const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
	const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

	const onPrevButtonClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollPrev();
	}, [emblaApi]);

	const onNextButtonClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollNext();
	}, [emblaApi]);

	const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
		setPrevBtnDisabled(!emblaApi.canScrollPrev());
		setNextBtnDisabled(!emblaApi.canScrollNext());
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		onSelect(emblaApi);
		emblaApi.on('reInit', onSelect);
		emblaApi.on('select', onSelect);
	}, [emblaApi, onSelect])

	return {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	};
};

type PropType = PropsWithChildren<
	React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>
>;

export const PrevButton: React.FC<PropType> = (props) => {
	const { children, ...restProps } = props;
	return (
		<button
			className="carousel__button carousel__button--prev appearance-none bg-transparent touch-manipulation inline-flex cursor-pointer border-0 p-0 m-0 items-center justify-center"
			type="button"
			{...restProps}
		>
			<ChevronPrev className="w-[15px] h-[15px]" />
			{children}
		</button>
	);
};

export const NextButton: React.FC<PropType> = (props) => {
	const { children, ...restProps } = props;
	return (
		<button
			className="carousel__button carousel__button--next appearance-none bg-transparent touch-manipulation inline-flex cursor-pointer border-0 p-0 m-0 items-center justify-center"
			type="button"
			{...restProps}
		>
			<ChevronNext className="w-[15px] h-[15px]" />
			{children}
		</button>
	);
};
