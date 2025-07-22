// import RealResultCarousel from "~/sections/RealResultCarousel";
import { EmblaOptionsType } from 'embla-carousel';
import { useEffect, useState } from 'react';
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

const options: EmblaOptionsType = {
	loop: true,
    align: 'start',
    breakpoints: {
        '(min-width: 992px)': { 
            watchDrag: false,
            duration: 40,
        }
    }
};

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
    }
]

const PageReviews = (props: any) => {
    const { videos, store } = props;

    const [emblaRef1, emblaApi1] = useEmblaCarousel({ align: 'start', ...options});

    return (
        <div className="lg:bg-gray-400 lg:pt-[60px] lg:pb-[60px]">
            <div className='page-reviews container' >
                <div className='px-hg'>
                    <Carousel.Wrapper emblaApi={emblaApi1} className="carousel__page-reviews -mx-hg">
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
        </div>
    )
}

export default PageReviews;