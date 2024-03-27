import { EmblaOptionsType } from 'embla-carousel';
import TabNav from '@/components/TabNav';
import TabContent from '@/components/TabContent';
import { useState } from 'react';
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

const SLIDE_COUNT_2 = 6;
const SLIDES_2 = [
	{
		id: 1,
        src: '//via.placeholder.com/520x520/FFF2F4',
        srcSet: '//via.placeholder.com/520x520/FFF2F4',
        title: 'Sunny Honey Bronzing Bundle',
        comparePrice: '$34.90',
        price: '$24.90',
        productId: 4543113265187,
    },
	{
		id: 2,
        src: '//via.placeholder.com/520x520/FFF2F4',
        srcSet: '//via.placeholder.com/520x520/FFF2F4',
        title: 'Sunny Honey Bronzing Bundle',
        comparePrice: '$34.90',
        price: '$24.90',
        productId: 4543113265187,
    },
	{
		id: 3,
        src: '//via.placeholder.com/520x520/FFF2F4',
        srcSet: '//via.placeholder.com/520x520/FFF2F4',
        title: 'Sunny Honey Bronzing Bundle',
        comparePrice: '$34.90',
        price: '$24.90',
        productId: 4543113265187,
    },
	{
		id: 4,
        src: '//via.placeholder.com/520x520/FFF2F4',
        srcSet: '//via.placeholder.com/520x520/FFF2F4',
        title: 'Sunny Honey Bronzing Bundle',
        comparePrice: '$34.90',
        price: '$24.90',
        productId: 4543113265187,
    },
	{
		id: 5,
        src: '//via.placeholder.com/520x520/FFF2F4',
        srcSet: '//via.placeholder.com/520x520/FFF2F4',
        title: 'Sunny Honey Bronzing Bundle',
        comparePrice: '$34.90',
        price: '$24.90',
        productId: 4543113265187,
    },
	{
		id: 6,
        src: '//via.placeholder.com/520x520/FFF2F4',
        srcSet: '//via.placeholder.com/520x520/FFF2F4',
        title: 'Sunny Honey Bronzing Bundle',
        comparePrice: '$34.90',
        price: '$24.90',
        productId: 4543113265187,
    }
];
const ProductCarousel = () => {

	const [activeTab, setActiveTab] = useState('bestsellers');
	//tab 1
	const [emblaRef1, emblaApi1] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: false, delay: 3000 })
	]);
	const {
		onPrevButtonClick: arrowClickPrev1,
		onNextButtonClick: arrowClickNext1
	} = usePrevNextButtons(emblaApi1);
	const autoPlayClick1 = controlAutoplay(emblaApi1);

	//tab 2
	const [emblaRef2, emblaApi2] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: false, delay: 3000 })
	]);
	const {
		onPrevButtonClick: arrowClickPrev2,
		onNextButtonClick: arrowClickNext2
	} = usePrevNextButtons(emblaApi2);
	const autoPlayClick2 = controlAutoplay(emblaApi2);

	//tab 3
	const [emblaRef3, emblaApi3] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: false, delay: 3000 })
	]);
	const {
		onPrevButtonClick: arrowClickPrev3,
		onNextButtonClick: arrowClickNext3
	} = usePrevNextButtons(emblaApi3);
	const autoPlayClick3 = controlAutoplay(emblaApi3);
	return (
		<div className="container px-0 lg:px-hg pt-4 pb-4 text-center">
			<h2 className="h1 text-center mb-1 lg:mb-2">Our Products</h2>
			<div className="row">
				<div>
					<ul className="list-style-none mx-auto flex flex-wrap border-b-0 text-center pb-4 justify-center">
						<li><TabNav className={`py-[6px] w-[7.5rem] lg:w-[9.375rem] px-g ${activeTab === 'new' ? 'text-body' : 'text-gray-600'}`} title='New' active={activeTab === 'new'} onNavChange={() => setActiveTab('new')} /></li>
						<li><TabNav className={`py-[6px] w-[7.5rem] lg:w-[9.375rem] px-g ${activeTab === 'bestsellers' ? 'text-body' : 'text-gray-600'}`} title='Bestsellers' active={activeTab === 'bestsellers'} onNavChange={() => setActiveTab('bestsellers')} /></li>
						<li><TabNav className={`py-[6px] w-[7.5rem] lg:w-[9.375rem] px-g ${activeTab === 'valuesets' ? 'text-body' : 'text-gray-600'}`} title='Value Sets' active={activeTab === 'valuesets'} onNavChange={() => setActiveTab('valuesets')} /></li>
					</ul>
					<div className="">
						<TabContent active={activeTab === 'new'}>
							<Carousel.Wrapper emblaApi={emblaApi2} className="">
								<Carousel.Inner emblaRef={emblaRef2}>
									{SLIDES_2.map((data) => (
										<ProductCard
											product={data}
											className="relative mb-5 flex-grow-0 flex-shrink-0 flex flex-col w-3/4 basis-3/4 md:w-1/4 md:basis-1/4 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
											button={true}
										/>
									))}
								</Carousel.Inner>
								<Carousel.Navigation>
									<PrevButton
										onClick={() => autoPlayClick2(arrowClickPrev2)}
										className="absolute left-0 top-0 lg:w-auto lg:h-0 bottom-0 z-[1] hidden lg:flex items-center justify-center w-[10%] p-0 text-body text-center bg-none border-0"
									>
										<span className="bg-white lg:-left-[0.5em] w-5 h-5 absolute z-[-1] flex justify-center items-center rounded-full shadow-lg lg:top-[8.125em]">
											<ChevronPrev className="w-[16px] h-[16px] svg--current-color" />
										</span>
									</PrevButton>
									<NextButton
										onClick={() => autoPlayClick2(arrowClickNext2)}
										className="absolute right-0 top-0 bottom-0 z-[1] hidden lg:flex lg:h-0 items-center justify-center w-[10%] lg:w-auto p-0 text-body text-center bg-none border-0"
									>
										<span className="bg-white lg:-right-[0.5em] w-5 h-5 absolute z-[-1] flex justify-center items-center rounded-full shadow-lg lg:top-[8.125em]">
											<ChevronNext className="w-[16px] h-[16px] svg--current-color" />
										</span>
									</NextButton>
								</Carousel.Navigation>
							</Carousel.Wrapper>
						</TabContent>
						<TabContent active={activeTab === 'bestsellers'}>
							<Carousel.Wrapper emblaApi={emblaApi1} className="">
								<Carousel.Inner emblaRef={emblaRef1}>
									{SLIDES_2.map((data) => (
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
						</TabContent>
						<TabContent active={activeTab === 'valuesets'}>
							<Carousel.Wrapper emblaApi={emblaApi3} className="">
								<Carousel.Inner emblaRef={emblaRef3}>
									{SLIDES_2.map((data) => (
										<ProductCard
											product={data}
											className="relative mb-5 flex-grow-0 flex-shrink-0 flex flex-col w-3/4 basis-3/4 md:w-1/4 md:basis-1/4 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
											button={true}
										/>
									))}
								</Carousel.Inner>
								<Carousel.Navigation>
									<PrevButton
										onClick={() => autoPlayClick3(arrowClickPrev3)}
										className="absolute left-0 top-0 lg:w-auto lg:h-0 bottom-0 z-[1] hidden lg:flex items-center justify-center w-[10%] p-0 text-body text-center bg-none border-0"
									>
										<span className="bg-white lg:-left-[0.5em] w-5 h-5 absolute z-[-1] flex justify-center items-center rounded-full shadow-lg lg:top-[8.125em]">
											<ChevronPrev className="w-[16px] h-[16px] svg--current-color" />
										</span>
									</PrevButton>
									<NextButton
										onClick={() => autoPlayClick3(arrowClickNext3)}
										className="absolute right-0 top-0 bottom-0 z-[1] hidden lg:flex lg:h-0 items-center justify-center w-[10%] lg:w-auto p-0 text-body text-center bg-none border-0"
									>
										<span className="bg-white lg:-right-[0.5em] w-5 h-5 absolute z-[-1] flex justify-center items-center rounded-full shadow-lg lg:top-[8.125em]">
											<ChevronNext className="w-[16px] h-[16px] svg--current-color" />
										</span>
									</NextButton>
								</Carousel.Navigation>
							</Carousel.Wrapper>
						</TabContent>

					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCarousel;
