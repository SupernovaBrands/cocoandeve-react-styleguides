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
   let { articles } = props;
    // carousel
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: true, delay: 3000 })
	]);

	if (articles.length < 3) {
		articles = articles.concat(articles);
	}

	const {
		onPrevButtonClick: arrowClickPrev,
		onNextButtonClick: arrowClickNext
	} = usePrevNextButtons(emblaApi);
	const autoPlayClick = controlAutoplay(emblaApi);

    return <div className="hidden lg:block container mt-4 lg:pt-2 lg:mb-4">{articles.length > 0 && (<Carousel.Wrapper emblaApi={emblaApi} className="mb-1">
        <Carousel.Inner emblaRef={emblaRef} className="lg:-mx-g">
            {articles.map((data:any) => (
                <PostCard key={data.id} template="pdp" className="flex-grow-0 flex-shrink-0 w-full basis-full px-hg lg:px-g lg:w-1/2 lg:basis-1/2" data={data} />
            ))}
        </Carousel.Inner>
        <Carousel.Navigation>
            <PrevButton
			    onClick={() => autoPlayClick(arrowClickPrev)}
				className="lg:-left-[1em] w-[10%]"
				>
				<span className="absolute z-[-1] flex justify-center items-center bg-white w-[60px] h-[60px] rounded-full left-0 shadow-[0_.25em_.25em_#0003] top-[129px]">
					<ChevronPrev className="svg--current-color size-[1em]" />
				</span>
			</PrevButton>
			<NextButton
				onClick={() => autoPlayClick(arrowClickNext)}
				className="lg:-right-[1em] w-[10%]"
				>
				<span className="absolute z-[-1] flex justify-center items-center bg-white w-[60px] h-[60px] rounded-full right-0 shadow-[0_.25em_.25em_#0003] top-[129px]">
				    <ChevronNext className="svg--current-color size-[1em]" />
				</span>
			</NextButton>
        </Carousel.Navigation>
    </Carousel.Wrapper>)}</div>
}

export default ArticleCarousel;
