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
    const { store, reviewsData } = props;

    const [emblaRef1, emblaApi1] = useEmblaCarousel({ align: 'start', ...options});
    const [scrollProgress, setScrollProgress] = useState(0);

    const REVIEWS = [
        {
            id: 1,
            description: 'This skin care Pink Australian Clay exfoliating treatment is amazing and I highly recommend! @sandandskyaus . I scrub hard with the flats of my hands all over my face and neck. Then I leave it on for 5 minutes and rinse. You are left with the most amazing glowing velvet soft skin. It’s also gets rid of blackouts and Acne.',
            author: 'Bella Chan',
            product_title: 'Like A Virgin Hair Masque',
            first_image: {
                url: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/image_1.png?v=1753189243'
            },
            second_image: {
                url: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/image_1.png?v=1753189243'
            }
        },
        {
            id: 2,
            description: 'This skin care Pink Australian Clay exfoliating treatment is amazing and I highly recommend! @sandandskyaus . I scrub hard with the flats of my hands all over my face and neck. Then I leave it on for 5 minutes and rinse. You are left with the most amazing glowing velvet soft skin. It’s also gets rid of blackouts and Acne.',
            author: 'Bella Chan',
            product_title: 'Like A Virgin Hair Masque',
            first_image: {
                url: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/image_1.png?v=1753189243'
            },
            second_image: {
                url: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/image_1.png?v=1753189243'
            }
        },
        {
            id: 2,
            description: 'This skin care Pink Australian Clay exfoliating treatment is amazing and I highly recommend! @sandandskyaus . I scrub hard with the flats of my hands all over my face and neck. Then I leave it on for 5 minutes and rinse. You are left with the most amazing glowing velvet soft skin. It’s also gets rid of blackouts and Acne.',
            author: 'Bella Chan',
            product_title: 'Like A Virgin Hair Masque',
            first_image: {
                url: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/image_1.png?v=1753189243'
            },
            second_image: {
                url: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/image_1.png?v=1753189243'
            }
        }
    ]

    if (reviewsData?.slide1image2) {
        REVIEWS.push({
            id: 1,
            description: reviewsData?.slide1_text || '',
            author: reviewsData?.slide1_author || '',
            product_title: reviewsData?.slide1_heading || '',
            first_image: {
                url: reviewsData?.slide1image2?.url,
            },
            second_image: {
                url: reviewsData?.slide1image3?.url,
            }
        })
    }

    if (reviewsData?.slide2image2) {
        REVIEWS.push({
            id: 1,
            description: reviewsData?.slide2_text || '',
            author: reviewsData?.slide2_author || '',
            product_title: reviewsData?.slide2_heading || '',
            first_image: {
                url: reviewsData?.slide2image2?.url,
            },
            second_image: {
                url: reviewsData?.slide2image3?.url,
            }
        })
    }

    if (reviewsData?.slide3image2) {
        REVIEWS.push({
            id: 1,
            description: reviewsData?.slide3_text || '',
            author: reviewsData?.slide3_author || '',
            product_title: reviewsData?.slide3_heading || '',
            first_image: {
                url: reviewsData?.slide3image2?.url,
            },
            second_image: {
                url: reviewsData?.slide3image3?.url,
            }
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

    return <>
        {REVIEWS?.length && (
            <div className="lg:bg-gray-400 lg:pt-[60px] lg:pb-[60px]">
                <div className='page-reviews container pt-[30px] lg:pt-[0] px-0' >
                    <div className='px-0'>
                        <Carousel.Wrapper emblaApi={emblaApi1} className="carousel__page-reviews ml-g">
                            <Carousel.Inner emblaRef={emblaRef1} className="gap-[15px] lg:-mx-g ">
                                {REVIEWS.map((data: any, i: number) => (
                                    <PageReviewCard data={data} />
                                ))}
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