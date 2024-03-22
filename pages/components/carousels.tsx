import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import EmblaCarousel from '@/components/carousel/EmblaCarousel';

type PropType = {
	slides: number[]
	options?: EmblaOptionsType
};

const OPTIONS: EmblaOptionsType = {
	loop: true,
};
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const Carousels: React.FC = (props) => {

	return (
		<section className="container mt-4">
			<h1>Carousels</h1>
			<EmblaCarousel slides={SLIDES} options={OPTIONS} />
		</section>
	);
};

export default Carousels;
