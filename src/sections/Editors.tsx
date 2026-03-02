import Testimonial from '~/sections/Testimonial';
import { EmblaOptionsType } from 'embla-carousel';
import { useEffect, useState } from 'react';
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

const options: EmblaOptionsType = {
	loop: false,
    dragFree: true,
	breakpoints: {
		'(min-width: 992px)': {
			align: 'start',
			watchDrag: false,
			duration: 40,
		}
	}
};

const Editors = (props) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const [prevShow, setPrevShow] = useState(false);
    const [nextShow, setNextShow] = useState(true);

    const onNext = () => {
        emblaApi.scrollNext()
        setNextShow(emblaApi.canScrollNext());
        setPrevShow(emblaApi.canScrollPrev());
    };

    const onPrev = () => {
        emblaApi.scrollPrev()
        setPrevShow(emblaApi.canScrollPrev());
        setNextShow(emblaApi.canScrollNext());
    }

    const DATA = [
        {
            id: 1,
            srcSet: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_f333c0a2-5b72-42eb-a125-69a2b28fdf68.jpg?v=1772038346',
            src: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_3cbed588-c614-423c-bfcb-c31e92de6c15.jpg?v=1772038372',
            alt: 'Nylon',
            size: { width: 84, height: 15, widthLg: 106, heightLg: 19 }
        },
        {
            id: 2,
            srcSet: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/Cosmopolitan_logo_2x_897487d3-c4c5-409a-b99b-995e850a4e05.png?v=1614299638',
            src: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/Cosmopolitan_logo_2x_897487d3-c4c5-409a-b99b-995e850a4e05.png?v=1614299638',
            alt: 'Cosmopolitan',
            size: { width: 90, height: 17, widthLg: 127, heightLg: 24 }
        },
        {
            id: 3,
            srcSet: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/Elle_logo_2x_15d012a5-11f1-4898-a024-1c77d647e406.png?v=1614299637',
            src: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/Elle_logo_2x_15d012a5-11f1-4898-a024-1c77d647e406.png?v=1614299637',
            alt: 'Elle',
            size: { width: 55, height: 22, widthLg: 65, heightLg: 26 }
        },
        {
            id: 4,
            srcSet: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_ca13670d-f260-4697-a8da-7ba96188ed3f.jpg?v=1772038478',
            src: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_ca13670d-f260-4697-a8da-7ba96188ed3f.jpg?v=1772038478',
            alt: 'Glamour',
            size: { width: 72, height: 17, widthLg: 110, heightLg: 26 }
        },
        {
            id: 6,
            srcSet: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/Mail_online_logo_2x_bc784a7a-72f0-48ff-81f3-9fe95ce1f8ab.png?v=1614299637',
            src: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/Mail_online_logo_2x_bc784a7a-72f0-48ff-81f3-9fe95ce1f8ab.png?v=1614299637',
            alt: 'Mail Online',
            size: { width: 110, height: 17, widthLg: 169, heightLg: 26 }
        },
        {
            id: 8,
            srcSet: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/Marie_Claire_logo_wordmark_text_2x_3c8d4d6f-8f05-41a6-8929-386585e59d6d.png?v=1614294473',
            src: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/Marie_Claire_logo_wordmark_text_2x_3c8d4d6f-8f05-41a6-8929-386585e59d6d.png?v=1614294473',
            alt: 'Marie claire',
            size: { width: 110, height: 17, widthLg: 169, heightLg: 26 }
        },
        {
            id: 9,
            srcSet: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_75a09386-9761-4d57-973c-be82682986f3.png?v=1772038586',
            src: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_75a09386-9761-4d57-973c-be82682986f3.png?v=1772038586',
            alt: 'Good Housekeeping',
            size: { width: 110, height: 17, widthLg: 169, heightLg: 26 }
        }
    ];
    // console.log('editor props', props);
    return (
        <section className={`list-logo container mb-g lg:my-[50px] lg:px-g pb-1 lg:pb-0
        px-g pt-2 lg:pt-0 ${props.className ?? ''}`}>
            <Carousel.Wrapper emblaApi={emblaApi} className="carousel__editor lg:pl-3">
                <Carousel.Inner emblaRef={emblaRef} className='items-center'>
                    <figure className="w-auto flex grow-0 shrink-0 pl-0 pr-hg lg:pl-0 lg:pr-g text-[16px] lg:text-[20px] basis-auto lg:grid lg:grid-cols-1 font-normal">
                        Featured in:
                    </figure>
                    {DATA.map((logo) => <Testimonial key={logo.id} data={logo} />)}
                </Carousel.Inner>
                <Carousel.Navigation>
                    {prevShow && (
                        <PrevButton
                            onClick={() => onPrev() }
                            className="lg:w-auto lg:h-0 hidden lg:flex"
                        >
                            <span className="absolute z-[-1] flex justify-center items-center">
                                <ChevronPrev className="svg--current-color" />
                            </span>
                        </PrevButton>
                    )}
                    {nextShow && (
                        <NextButton
                            onClick={() => onNext() }
                            className="lg:w-auto lg:h-0 hidden lg:flex"
                        >
                            <span className="absolute z-[-1] flex justify-center items-center">
                                <ChevronNext className="svg--current-color" />
                            </span>
                        </NextButton>
                    )}
                </Carousel.Navigation>
            </Carousel.Wrapper>
        </section>
    )
}

export default Editors;
