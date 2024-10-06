import { EmblaOptionsType } from 'embla-carousel';
import Carousel from "~/components/carousel/EmblaCarouselMulti";
import PostCard from "~/compounds/PostCard";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { NextButton, PrevButton, controlAutoplay, usePrevNextButtons } from '~/components/carousel/EmblaCarouselArrowButtons';
import { useState, useCallback, useEffect, useRef } from 'react';
import { EmblaCarouselType } from 'embla-carousel';

import ChevronNext from '~/images/icons/chevron-next.svg';
import ChevronPrev from '~/images/icons/chevron-prev.svg';

const screenLG = 992;

const ArticleCarousel = (props:any) => {
	const innerWidth = globalThis.window ? globalThis.window.innerWidth : 0;

	const options: EmblaOptionsType = {
		loop: innerWidth >= screenLG,
		align: 'start'
	};

	const [articles, setArticles] = useState(props.articles);
	const [emblaRef, emblaApi] = useEmblaCarousel(options);

	// const {
	// 	onPrevButtonClick: arrowClickPrev,
	// 	onNextButtonClick: arrowClickNext
	// } = usePrevNextButtons(emblaApi);
	// const autoPlayClick = controlAutoplay(emblaApi);

	const [scrollProgress, setScrollProgress] = useState(0);

	const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
		const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
		setScrollProgress(progress * 100 / 2);
	}, []);

	useEffect(() => {
		if (articles.length < 3 && innerWidth >= screenLG) {
			setArticles(articles.concat(articles));
		}
        if (emblaApi) {
            emblaApi.on('select', onScroll);
            emblaApi.on('reInit', onScroll);
            emblaApi.on('scroll', onScroll);
        }
    }, [emblaApi]);

	const scrollThumb = useRef(null);

    return <div className="container mt-4 lg:pt-2 lg:mb-4">
		{articles.length > 0 && (
			<Carousel.Wrapper emblaApi={emblaApi} className="mb-1">
				<Carousel.Inner emblaRef={emblaRef} className="-mx-hg lg:-mx-g">
					{articles.map((data:any, index:number) => (
						<PostCard key={`${data.id}-${index}`} carousel={true} template="pdp" className="flex-grow-0 flex-shrink-0 basis-[91.5%] w-[91.5%] px-hg lg:px-g lg:w-1/2 lg:basis-1/2" data={data} />
					))}
				</Carousel.Inner>
				<Carousel.Navigation>
					<PrevButton
						onClick={() => emblaApi.scrollPrev()}
						className="hidden lg:block lg:-left-[1em] w-[10%]"
						>
						<span className="absolute z-[-1] flex justify-center items-center bg-white w-[60px] h-[60px] rounded-full left-0 shadow-[0_.25em_.25em_#0003] top-[129px]">
							<ChevronPrev className="svg--current-color size-[1em]" />
						</span>
					</PrevButton>
					<NextButton
						onClick={() => emblaApi.scrollNext()}
						className="hidden lg:block lg:-right-[1em] w-[10%]"
						>
						<span className="absolute z-[-1] flex justify-center items-center bg-white w-[60px] h-[60px] rounded-full right-0 shadow-[0_.25em_.25em_#0003] top-[129px]">
							<ChevronNext className="svg--current-color size-[1em]" />
						</span>
					</NextButton>
				</Carousel.Navigation>
			</Carousel.Wrapper>)}
		{ articles.length > 0 && <div className="scrollbar my-3 lg:hidden bg-gray-400 relative h-[4px] rounded rounded-[4px] overflow-hidden">
        	<div className="scrollbar--thumb bg-gray-500 absolute h-[4px] rounded-[4px]" style={{ left: `${scrollProgress}%`, width: `${ ((1 / articles.length) * 100)}%` }} ref={scrollThumb}></div>
        </div>}
	</div>
}

export default ArticleCarousel;
