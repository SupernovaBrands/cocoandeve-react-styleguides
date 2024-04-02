import { EmblaOptionsType } from 'embla-carousel';
import Carousel from '@/components/carousel/EmblaCarouselMulti';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import ChevronNext from '@/images/icons/chevron-next.svg';
import ChevronPrev from '@/images/icons/chevron-prev.svg';
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
	controlAutoplay,
} from '@/components/carousel/EmblaCarouselArrowButtons';
import ProductCard from "@/compounds/ProductCard";
const options: EmblaOptionsType = {
	loop: true,
	breakpoints: {
		'(min-width: 992px)': { align: 'start' }
	}
};

const RangeProducts = (props: any) => {
    const { products, heading } = props;
    const [emblaRef1, emblaApi1] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: false, delay: 3000 })
	]);
    const {
		onPrevButtonClick: arrowClickPrev1,
		onNextButtonClick: arrowClickNext1
	} = usePrevNextButtons(emblaApi1);
	const autoPlayClick1 = controlAutoplay(emblaApi1);

    return (
        <div className="container pt-4 lg:pt-2 px-0">
            <h2 className="text-2xl text-center mb-2 block">{heading}</h2>
            <Carousel.Wrapper emblaApi={emblaApi1} className="">
                <Carousel.Inner emblaRef={emblaRef1}>
                    {products.map((data: any) => (
                        <ProductCard
                            product={data}
                            className="relative mb-5 flex-grow-0 flex-shrink-0 flex flex-col w-3/4 basis-3/4 md:w-1/4 md:basis-1/4 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
                            button={true}
                        />
                    ))}
                </Carousel.Inner>
                <Carousel.Navigation>
                    <PrevButton
                        onClick={() => autoPlayClick1(arrowClickPrev1)}
                        className="absolute left-0 top-0 lg:w-auto lg:h-0 bottom-0 z-[1] hidden lg:flex items-center justify-center w-[10%] p-0 text-body text-center bg-none border-0"
                    >
                        <span className="bg-white lg:-left-[0.5em] w-5 h-5 absolute z-[-1] flex justify-center items-center rounded-full shadow-lg lg:top-[8.125em]">
                            <ChevronPrev className="w-[16px] h-[16px] svg--current-color" />
                        </span>
                    </PrevButton>
                    <NextButton
                        onClick={() => autoPlayClick1(arrowClickNext1)}
                        className="absolute right-0 top-0 bottom-0 z-[1] hidden lg:flex lg:h-0 items-center justify-center w-[10%] lg:w-auto p-0 text-body text-center bg-none border-0"
                    >
                        <span className="bg-white lg:-right-[0.5em] w-5 h-5 absolute z-[-1] flex justify-center items-center rounded-full shadow-lg lg:top-[8.125em]">
                            <ChevronNext className="w-[16px] h-[16px] svg--current-color" />
                        </span>
                    </NextButton>
                </Carousel.Navigation>
            </Carousel.Wrapper>
        </div>
    )
};

export default RangeProducts;