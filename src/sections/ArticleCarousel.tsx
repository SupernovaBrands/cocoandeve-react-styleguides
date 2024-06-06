import { EmblaOptionsType } from 'embla-carousel';
import Carousel from "~/components/carousel/EmblaCarouselMulti";
import PostCard from "~/compounds/PostCard";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { NextButton, PrevButton, controlAutoplay, usePrevNextButtons } from '~/components/carousel/EmblaCarouselArrowButtons';

import ChevronNext from '~/images/icons/chevron-next.svg';
import ChevronPrev from '~/images/icons/chevron-prev.svg';

const options: EmblaOptionsType = {
	loop: true,
	align: 'start'
};

const ArticleCarousel = (props:any) => {
   const { articles } = props;
    // carousel
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: true, delay: 3000 })
	]);

	const {
		onPrevButtonClick: arrowClickPrev,
		onNextButtonClick: arrowClickNext
	} = usePrevNextButtons(emblaApi);
	const autoPlayClick = controlAutoplay(emblaApi);

    return <div className="container mt-4">{articles.length > 0 && (<Carousel.Wrapper emblaApi={emblaApi} className="mb-1">
        <Carousel.Inner emblaRef={emblaRef} className="lg:-mx-g">
            {articles.map((data:any) => (
                <PostCard key={data.id} template="blog" className="flex-grow-0 flex-shrink-0 w-full basis-full px-hg lg:px-g lg:w-1/2 lg:basis-1/2" data={data} />
            ))}
        </Carousel.Inner>
        <Carousel.Navigation>
            <PrevButton
                onClick={() => autoPlayClick(arrowClickPrev)}
                className="lg:-left-[1.25em] w-[auto] text-primary"
            >
                <span className="bg-white -left-[2%] w-4 h-4 absolute z-[-1] flex justify-center items-center top-[4.313rem] lg:top-[8.063rem]">
                    <ChevronPrev className="w-g h-g svg--current-color" />
                </span>
            </PrevButton>
            <NextButton
                onClick={() => autoPlayClick(arrowClickNext)}
                className="lg:-right-[1.25em] w-[auto] text-primary"
            >
                <span className="bg-white -right-[2%] w-4 h-4 absolute z-[-1] flex justify-center items-center top-[4.313rem] lg:top-[8.063rem]">
                    <ChevronNext className="w-g h-g svg--current-color" />
                </span>
            </NextButton>
        </Carousel.Navigation>
    </Carousel.Wrapper>)}</div>
}

export default ArticleCarousel;
