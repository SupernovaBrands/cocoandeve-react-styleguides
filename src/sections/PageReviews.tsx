// import RealResultCarousel from "~/sections/RealResultCarousel";
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import { useEffect, useState, useCallback } from 'react';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import useEmblaCarousel from 'embla-carousel-react';
import ChevronNext from '~/images/icons/chevron-next.svg';
import ChevronPrev from '~/images/icons/chevron-prev.svg';
import Autoplay from 'embla-carousel-autoplay';
import {
    PrevButton,
    NextButton,
} from '~/components/carousel/EmblaCarouselArrowButtons';
import PageReviewCard from '~/compounds/PageReviewCard';
import CarouselScrollbar from '~/components/carousel/CarouselScrollbar';

const options: EmblaOptionsType = {
	loop: false,
    dragFree: true,
    align: 'start',
    breakpoints: {
        '(min-width: 992px)': { 
            watchDrag: false,
            duration: 40,
        }
    }
};

const PageReviews = (props: any) => {
    const { reviewsData } = props;

    const [emblaRef1, emblaApi1] = useEmblaCarousel({ align: 'start', ...options});
    const [scrollProgress, setScrollProgress] = useState(0);

    const REVIEWS = []

    if (reviewsData?.slide1image1?.url) {
        REVIEWS.push({
            id: 1,
            description: reviewsData?.slide1_text || '',
            author: reviewsData?.slide1_author || '',
            image: reviewsData?.slide1image1,
        })
    }

    if (reviewsData?.slide2image1?.url) {
        REVIEWS.push({
            id: 2,
            description: reviewsData?.slide2_text || '',
            author: reviewsData?.slide2_author || '',
            image: reviewsData?.slide2image1,
        })
    }

    if (reviewsData?.slide3image1?.url) {
        REVIEWS.push({
            id: 3,
            description: reviewsData?.slide3_text || '',
            author: reviewsData?.slide3_author || '',
            image: reviewsData?.slide3image1,
        })
    }

    if (reviewsData?.slide4image1?.url) {
        REVIEWS.push({
            id: 4,
            description: reviewsData?.slide4_text || '',
            author: reviewsData?.slide4_author || '',
            image: reviewsData?.slide4image1,
        })
    }

    if (reviewsData?.slide5image1?.url) {
        REVIEWS.push({
            id: 5,
            description: reviewsData?.slide5_text || '',
            author: reviewsData?.slide5_author || '',
            product_title: reviewsData?.slide5_heading || '',
            image: reviewsData?.slide5image1,
        })
    }

    const onScroll = useCallback((emblaApi1: EmblaCarouselType) => {
        const progress = Math.max(0, Math.min(1, emblaApi1.scrollProgress()));
        setScrollProgress(progress * 70);
    }, []);

    useEffect(() => {
		if (!emblaApi1) return;
		emblaApi1.on('reInit', onScroll);
		emblaApi1.on('scroll', onScroll);
	}, [emblaApi1, onScroll]);

    useEffect(() => {
        console.log('reviewsData1', reviewsData);
    }, [])

    return <>
        {REVIEWS?.length && (
            <div className="lg:bg-gray-400 lg:pt-[60px] lg:pb-[60px]">
                <div className='page-reviews container pt-[30px] lg:pt-[0] px-0 lg:px-0' >
                    <div className='px-0'>
                        <Carousel.Wrapper emblaApi={emblaApi1} className="carousel__page-reviews -mx-hg">
                            <Carousel.Inner emblaRef={emblaRef1} className="mx-g lg:mx-0">
                                {REVIEWS.map((data: any, i: number) => data?.image && (
                                    <PageReviewCard data={data} />)
                                )}
                            </Carousel.Inner>
                            <Carousel.Navigation>
                                <PrevButton
                                    onClick={() => emblaApi1.scrollPrev() }
                                    className="lg:w-auto lg:h-0 hidden lg:flex"
                                >
                                    <span className="absolute z-[-1] flex justify-center items-center">
                                        <ChevronPrev className="svg--current-color" />
                                    </span>
                                </PrevButton>
                                <NextButton
                                    onClick={() => emblaApi1.scrollNext() }
                                    className="lg:w-auto lg:h-0 hidden lg:flex"
                                >
                                    <span className="absolute z-[-1] flex justify-center items-center">
                                        <ChevronNext className="svg--current-color" />
                                    </span>
                                </NextButton>
                            </Carousel.Navigation>
                        </Carousel.Wrapper>
                    </div>
                </div>
                <div className='px-[30px] lg:hidden'>                 
                    <CarouselScrollbar
                        emblaApi={emblaApi1}
                        scrollSnaps={emblaApi1?.scrollSnapList()}
                        className="py-2 lg:py-g after:bg-gray-500 after:rounded-[2px]"
                    />
                </div> 
            </div>
        )}
    </>
}

export default PageReviews;