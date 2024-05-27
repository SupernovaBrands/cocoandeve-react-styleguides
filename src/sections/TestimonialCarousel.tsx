import { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import { DotButton, useDotButton } from '~/components/carousel/EmblaCarouselDotButton';
import ChevronNext from '~/images/icons/chevron-next.svg';
import ChevronPrev from '~/images/icons/chevron-prev.svg';

import QuoteUp from '~/images/icons/quote-up.svg';
import QuoteDown from '~/images/icons/quote-down.svg';
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
	controlAutoplay,
} from '~/components/carousel/EmblaCarouselArrowButtons';

const TestimonialCarousel = (props: any) => {
	const options: EmblaOptionsType = {
		loop: true,
	};
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: false, delay: 3000 })
	]);
	const {
		onPrevButtonClick: arrowClickPrev,
		onNextButtonClick: arrowClickNext
	} = usePrevNextButtons(emblaApi);
	const autoPlayClick = controlAutoplay(emblaApi);
	const { data } = props;
	const { selectedIndex: idx, onDotButtonClick: onClick } = useDotButton(emblaApi);
	return (
		<div className="container text-center">
			<h2 className="h1 mb-0">As seen in</h2>
			<Carousel.Wrapper emblaApi={emblaApi}>
				<Carousel.Inner emblaRef={emblaRef} className="lg:-mx-g">
					{data.map((item: any) => (
						<div className="flex-grow-0 flex-shrink-0 w-full basis-full text-center" key={item.index}>
							<div className="flex flex-col items-center justify-center !font-normal h3 mt-4 px-2 pb-4 lg:pt-2 lg:px-4 testimonials-carousel__quote relative">
								<QuoteDown className="text-primary opacity-30 absolute w-4 h-[2em] left-3 -top-g lg:-top-1 svg--current-color lg:left-4" />
								<QuoteUp className="text-primary opacity-30 absolute w-4 h-[2em] right-3 lg:right-[3.125em] bottom-[50%] lg:bottom-[55%] svg--current-color" />
								<p className="mb-4 lg:pb-3">{item.quote}</p>
								<picture className="block mx-auto">
									<source srcSet={item.srcSet} media="(min-width: 992px)" />
									<img src={item.src} className="w-auto" alt={item.label} />
								</picture>
							</div>
						</div>
					))}
				</Carousel.Inner>
				<Carousel.Navigation>
					<PrevButton
						onClick={() => autoPlayClick(arrowClickPrev)}
						className="text-body hidden lg:flex"
					>
						<span className="left-0 bg-white w-5 h-5 absolute shadow-lg z-[-1] flex justify-center items-center right-0 rounded-tr-full rounded-br-full lg:rounded-full">
							<ChevronPrev className="w-g h-g svg--current-color" />
						</span>
					</PrevButton>
					<NextButton
						onClick={() => autoPlayClick(arrowClickNext)}
						className="text-body hidden lg:flex"
					>
						<span className="right-0 bg-white w-5 h-5 absolute shadow-lg z-[-1] flex justify-center items-center rounded-tr-full rounded-br-full lg:rounded-full">
							<ChevronNext className="w-g h-g svg--current-color" />
						</span>
					</NextButton>
					<Carousel.Navigation>
						<ol className="carousel__dots justify-center mb-0">
							{data.map((_: any, index: number) => (
								<li key={index} className={`border border-gray-600 ${index === idx ? ' bg-body' : ' opacity-50'}`}>
									<DotButton
										onClick={() => onClick(index)}
										className="carousel__dot"
									/>
								</li>
							))}
						</ol>
					</Carousel.Navigation>
				</Carousel.Navigation>
			</Carousel.Wrapper>
		</div>
	);
};

export default TestimonialCarousel;
