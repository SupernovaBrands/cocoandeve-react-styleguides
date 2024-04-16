import { EmblaOptionsType } from 'embla-carousel';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import ChevronNext from '~/images/icons/chevron-next.svg';
import ChevronPrev from '~/images/icons/chevron-prev.svg';
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
	controlAutoplay,
} from '~/components/carousel/EmblaCarouselArrowButtons';

const data = [
    {
        heading: 'Like A Virgin Range Results',
        desc: "Crafted for every hair type, this collection focuses on revitalizing dry, over-processed, and frizz-prone hair that has endured the effects of heat-styling, dyes and environmental stressors. Guaranteed to leave your mane not only looking and smelling out of this world, but the health of it completely restored so it's like a virgin...again",

    }
]

const RangeResults = (props: any) => {
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

    return (
        <div className="container pt-2 pb-1 lg:py-4 px-0">
        </div>
    );
}

export default RangeResults;