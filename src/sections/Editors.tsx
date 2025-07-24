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
            srcSet: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/05e7dd9f-51b5-43c2-603e-f192867cdb00/public',
            src: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/05e7dd9f-51b5-43c2-603e-f192867cdb00/public',
            alt: 'Nylon',
            size: { width: 84, height: 15, widthLg: 106, heightLg: 19 }
        },
        {
            id: 2,
            srcSet: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/90ca804e-f0a1-460d-3bcf-97dd9477d200/public',
            src: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/90ca804e-f0a1-460d-3bcf-97dd9477d200/public',
            alt: 'Cosmopolitan',
            size: { width: 90, height: 17, widthLg: 127, heightLg: 24 }
        },
        {
            id: 3,
            srcSet: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/419db1b0-0851-494d-b3fc-4c080ed08f00/public',
            src: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/419db1b0-0851-494d-b3fc-4c080ed08f00/public',
            alt: 'Elle',
            size: { width: 55, height: 22, widthLg: 65, heightLg: 26 }
        },
        {
            id: 4,
            srcSet: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/4905a8e3-d16e-4e27-a903-6a527bd05100/public',
            src: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/4905a8e3-d16e-4e27-a903-6a527bd05100/public',
            alt: 'Glamour',
            size: { width: 72, height: 17, widthLg: 110, heightLg: 26 }
        },
        // {
        //     id: 5,
        //     srcSet: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/ed711819-5774-4639-08fa-3b4cc255c600/public',
        //     src: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/ed711819-5774-4639-08fa-3b4cc255c600/public',
        //     alt: 'Refinery29',
        //     size: { width: 62, height: 36, widthLg: 68, heightLg: 40 }
        // },
        {
            id: 6,
            srcSet: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/d21469fa-4de6-48d2-d1ba-ed4afbb5ae00/public',
            src: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/d21469fa-4de6-48d2-d1ba-ed4afbb5ae00/public',
            alt: 'Mail Online',
            size: { width: 110, height: 17, widthLg: 169, heightLg: 26 }
        },
        {
            id: 8,
            srcSet: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/d13f6da2-b104-4fb0-c635-7fe1a09ce600/public',
            src: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/d13f6da2-b104-4fb0-c635-7fe1a09ce600/public',
            alt: 'Marie claire',
            size: { width: 110, height: 17, widthLg: 169, heightLg: 26 }
        },
        {
            id: 9,
            srcSet: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/a0a4f933-9b0a-42fa-9007-5c4c5ae52700/public',
            src: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/a0a4f933-9b0a-42fa-9007-5c4c5ae52700/public',
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
