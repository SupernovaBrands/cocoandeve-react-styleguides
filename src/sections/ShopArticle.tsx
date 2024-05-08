import { EmblaOptionsType } from 'embla-carousel';
// import { useState } from 'react';
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
import ProductCard from "~/compounds/ProductCard";
import { useState } from 'react';

const options: EmblaOptionsType = {
	loop: true,
	breakpoints: {
		'(min-width: 992px)': { align: 'start' }
	}
};

const ProductCarousel = (props: any) => {

	const { products } = props;

    const [waitlistData, setWaitlistData] = useState({
        open: false,
        title: '',
        image: '',
        handle: undefined,
    });

	//tab 1
	const [emblaRef1, emblaApi1] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: false, delay: 3000 })
	]);
	const {
		onPrevButtonClick: arrowClickPrev1,
		onNextButtonClick: arrowClickNext1
	} = usePrevNextButtons(emblaApi1);
	const autoPlayClick1 = controlAutoplay(emblaApi1);
	return (
		<div className="container px-0 lg:px-hg pt-2 pb-4 text-center">
			<div className="row">
				<div>
					<div className="text-center">
                        <Carousel.Wrapper emblaApi={emblaApi1} className="carousel__products">
                            <Carousel.Inner emblaRef={emblaRef1}>
                                {products.map((data) => (
                                    <ProductCard
                                        product={data}
                                        className="relative mb-5 flex-grow-0 flex-shrink-0 flex flex-col w-3/4 basis-3/4 md:w-1/4 md:basis-1/4 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
                                        button={true}
                                        carousel={true}
                                        setWaitlistData={setWaitlistData}
                                    />
                                ))}
                            </Carousel.Inner>
                            <Carousel.Navigation>
                                <PrevButton
                                    onClick={() => autoPlayClick1(arrowClickPrev1)}
                                    className="lg:-left-[1.25em] lg:w-4 text-primary lg:hidden"
                                >
                                    <span className="bg-white w-4 h-4 absolute z-[-1] flex justify-center items-center top-[28%] md:top-[6.25em] lg:top-[8.125em]">
                                        <ChevronPrev className="w-[16px] h-[16px] svg--current-color" />
                                    </span>
                                </PrevButton>
                                <NextButton
                                    onClick={() => autoPlayClick1(arrowClickNext1)}
                                    className="lg:-right-[1.25em] lg:w-4 text-primary lg:hidden"
                                >
                                    <span className="bg-white w-4 h-4 absolute z-[-1] flex justify-center items-center top-[28%] md:top-[6.25em] lg:top-[8.125em]">
                                        <ChevronNext className="w-[16px] h-[16px] svg--current-color" />
                                    </span>
                                </NextButton>
                            </Carousel.Navigation>
                        </Carousel.Wrapper>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCarousel;
