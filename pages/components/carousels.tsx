import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import EmblaCarousel from '@/components/carousel/EmblaCarousel';
import { DotButton, useDotButton } from '@/components/carousel/EmblaCarouselDotButton';
import Autoplay from 'embla-carousel-autoplay';

const options: EmblaOptionsType = {
	loop: true,
};
const SLIDE_COUNT = 3;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const Carousels: React.FC = () => {
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: true, delay: 3000 })
	]);
	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
	return (
		<section className="container pb-4">
			<h1 className="mb-3">CAROUSEL WITH BULLETS</h1>
			<EmblaCarousel slides={SLIDES} options={options}>
				<ol className="carousel__dots flex flex-wrap justify-center items-center absolute right-0 bottom-0 left-0 z-[15] p-0 mr-[10%] ml-[10%] mb-[1rem]">
					{scrollSnaps.map((_, index) => (
						<li key={index}>
							<DotButton
								onClick={() => onDotButtonClick(index)}
								className={'carousel__dot'.concat(
									index === selectedIndex ? ' carousel__dot--selected opacity-1' : ' opacity-50'
								)}
							/>
						</li>
					))}
				</ol>
			</EmblaCarousel>
		</section>
	);
};

export default Carousels;
