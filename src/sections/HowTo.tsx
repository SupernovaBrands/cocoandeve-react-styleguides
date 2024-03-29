import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Carousel from '@/components/carousel/EmblaCarouselMulti';
import Autoplay from 'embla-carousel-autoplay';

import {
    PrevButton,
    NextButton,
    usePrevNextButtons,
    controlAutoplay,
} from '@/components/carousel/EmblaCarouselArrowButtons';

import ChevronNext from '@/images/icons/chevron-next.svg';
import ChevronPrev from '@/images/icons/chevron-prev.svg';

interface Item {
    label: string;
    title: string;
    srcSet: string;
    src: string;
    tags: string[];
}

const HowToCarousel: React.FC = () => {
    const options: EmblaOptionsType = {
        loop: true,
    };

    const [emblaRef7, emblaApi7] = useEmblaCarousel({ align: 'start', ...options }, [
        Autoplay({ playOnInit: false, delay: 3000 })
    ]);

    const {
        prevBtnDisabled: prevDisabled7,
        nextBtnDisabled: nextDisabled7,
        onPrevButtonClick: arrowClickPrev7,
        onNextButtonClick: arrowClickNext7
    } = usePrevNextButtons(emblaApi7);

    const autoPlayClick7 = controlAutoplay(emblaApi7);

    const items: Item[] = [
        {
            label: 'Slide 1',
            title: '5 things you’re doing wrong with your hair care routine',
            srcSet: 'https://via.placeholder.com/375x340.jpg/EFADBA',
            src: 'https://via.placeholder.com/375x340.jpg/EFADBA',
            tags: ['TAN', 'NEW'],
        },
        {
            label: 'Slide 2',
            title: '5 things you’re doing wrong with your hair care routine',
            srcSet: 'https://via.placeholder.com/375x340.jpg/EFADBA',
            src: 'https://via.placeholder.com/375x340.jpg/EFADBA',
            tags: ['HAIR', 'HOT'],
        },
        {
            label: 'Slide 3',
            title: '5 things you’re doing wrong with your hair care routine',
            srcSet: 'https://via.placeholder.com/375x340.jpg/EFADBA',
            src: 'https://via.placeholder.com/375x340.jpg/EFADBA',
            tags: ['BODY', 'FEATURED'],
        }
    ];

    const colors: Record<string, { bg: string; text: string }> = {
        new: { bg: 'bg-secondary', text: 'text-white' },
        tan: { bg: 'bg-yellow-light', text: 'text-gray-600' },
        hair: { bg: 'bg-secondary-light', text: 'text-gray-600' },
        body: { bg: 'bg-primary-light', text: 'text-gray-600' },
        hot: { bg: 'bg-primary', text: 'text-white' },
        featured: { bg: 'bg-gray-400', text: 'text-gray-600' },
    };

	return (
		<section className="how-to py-2 no-gutters__in-container mb-5">
			<h2 className="text-center h1 py-2 py-lg-1 mb-0">The Ultimate How-Tos</h2>
			<Carousel.Wrapper emblaApi={emblaApi7} className="-mx-hg">
				<Carousel.Inner emblaRef={emblaRef7} className="lg:-mx-g">
					{items.map((item, index) => (
						<div className="carousel__slide flex-grow-0 flex-shrink-0 w-full basis-full lg:w-1/2 lg:basis-1/2 px-hg lg:px-g">
							<figure className="border border-secondary-light">
								<a href="/" className="relative">
									<picture className="w-full aspect-[4/3] m-0">
										<img className="w-full aspect-[4/3] max-h-[18.625em] object-cover" alt="Image Alt" loading="lazy" src="https://via.placeholder.com/375x340.jpg/EFADBA"/>
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 54"
											className="absolute text-white size-[4em] fill-white top-0 bottom-0 m-auto w-full">
												<path d="M27 0a27 27 0 1027 27A27 27 0 0027 0zm11.371 27.86a1.929 1.929 0 01-.866.866v.01L22.076 36.45a1.929 1.929 0 01-2.791-1.736V19.286a1.929 1.929 0 012.791-1.726L37.5 25.274a1.928 1.928 0 01.871 2.586z"></path>
												</svg>
									</picture>
								</a>
								<figcaption className="p-2">
									{ item.tags.map((tag) =>
										<span className={`${colors[tag.toLowerCase()].bg} ${colors[tag.toLowerCase()].text} font-weight-normal p-25 mr-1 rounded`}>{tag}</span>
									)}
									<p className="h2 mt-2">5 things you’re doing wrong with your hair care routine</p>
								</figcaption>
							</figure>
						</div>
					))}
				</Carousel.Inner>
				<Carousel.Navigation>
					<PrevButton
						onClick={() => autoPlayClick7(arrowClickPrev7)}
						disabled={prevDisabled7}
						className="absolute left-0 top-0 lg:-left-g bottom-0 z-[1] flex items-center justify-center w-[10%] p-0 text-center bg-none border-0"
					>
						<span className="top-[30%] shadow-md left-0 bg-white w-[3.75em] h-[3.75em] absolute z-[-1] flex justify-center items-center right-0 rounded-full">
							<ChevronPrev className="w-[1em] h-[1em] svg--current-color" />
						</span>
					</PrevButton>
					<NextButton
						onClick={() => autoPlayClick7(arrowClickNext7)}
						disabled={nextDisabled7}
						className="absolute right-0 lg:-right-g top-0 bottom-0 z-[1] flex items-center justify-center w-[10%] p-0 text-center bg-none border-0"
					>
						<span className="top-[30%] shadow-md right-0 bg-white w-[3.75em] h-[3.75em] absolute z-[-1] flex justify-center items-center rounded-full">
							<ChevronNext className="w-[1em] h-[1em] svg--current-color" />
						</span>
					</NextButton>
				</Carousel.Navigation>
			</Carousel.Wrapper>

		</section>
	);
};

export default HowToCarousel;
