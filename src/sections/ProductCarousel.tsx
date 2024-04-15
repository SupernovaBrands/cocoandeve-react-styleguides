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
import Link from 'next/link';
const options: EmblaOptionsType = {
	loop: true,
	breakpoints: {
		'(min-width: 992px)': { align: 'start' }
	}
};

const ProductCarousel = (props: any) => {

	const { products } = props;

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
					<ul className="list-style-none mx-auto flex flex-wrap border-b-0 text-center pb-4 lg:pb-2 justify-center">
						<li><TabNav className={`w-[7.5rem] lg:w-[9.375rem] px-g hover:text-body focus:text-body visited:text-body lg:text-lg ${activeTab === 'new' ? 'text-body font-bold' : ''}`} title='New' active={activeTab === 'new'} onNavChange={() => setActiveTab('new')} /></li>
						<li><TabNav className={`w-[7.5rem] lg:w-[9.375rem] px-g hover:text-body focus:text-body visited:text-body lg:text-lg ${activeTab === 'bestsellers' ? 'text-body font-bold' : ''}`} title='Bestsellers' active={activeTab === 'bestsellers'} onNavChange={() => setActiveTab('bestsellers')} /></li>
						<li><TabNav className={`w-[7.5rem] lg:w-[9.375rem] px-g hover:text-body focus:text-body visited:text-body lg:text-lg ${activeTab === 'valuesets' ? 'text-body font-bold' : ''}`} title='Value Sets' active={activeTab === 'valuesets'} onNavChange={() => setActiveTab('valuesets')} /></li>
					</ul>
					<div className="text-center">
						<TabContent active={activeTab === 'new'}>
							<Carousel.Wrapper emblaApi={emblaApi2} className="carousel__products">
								<Carousel.Inner emblaRef={emblaRef2}>
									{products.map((data) => (
										<ProductCard
											product={data}
											className="relative mb-5 flex-grow-0 flex-shrink-0 flex flex-col w-3/4 basis-3/4 md:w-1/4 md:basis-1/4 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
											button={true}
											carousel={true}
										/>
									))}
								</Carousel.Inner>
								<Carousel.Navigation>
									<PrevButton
										onClick={() => autoPlayClick2(arrowClickPrev2)}
										className="lg:w-auto lg:h-0 hidden lg:flex"
									>
										<span className="absolute z-[-1] flex justify-center items-center">
											<ChevronPrev className="svg--current-color" />
										</span>
									</PrevButton>
									<NextButton
										onClick={() => autoPlayClick2(arrowClickNext2)}
										className="lg:w-auto lg:h-0 hidden lg:flex"
									>
										<span className="absolute z-[-1] flex justify-center items-center">
											<ChevronNext className="svg--current-color" />
										</span>
									</NextButton>
								</Carousel.Navigation>
							</Carousel.Wrapper>
						</TabContent>
						<TabContent active={activeTab === 'bestsellers'}>
							<Carousel.Wrapper emblaApi={emblaApi1} className="carousel__products">
								<Carousel.Inner emblaRef={emblaRef1}>
									{products.map((data) => (
										<ProductCard
											product={data}
											className="relative mb-5 flex-grow-0 flex-shrink-0 flex flex-col w-3/4 basis-3/4 md:w-1/4 md:basis-1/4 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
											button={true}
											carousel={true}
										/>
									))}
								</Carousel.Inner>
								<Carousel.Navigation>
									<PrevButton
										onClick={() => autoPlayClick1(arrowClickPrev1)}
										className="lg:w-auto lg:h-0 hidden lg:flex"
									>
										<span className="absolute z-[-1] flex justify-center items-center">
											<ChevronPrev className="svg--current-color" />
										</span>
									</PrevButton>
									<NextButton
										onClick={() => autoPlayClick1(arrowClickNext1)}
										className="lg:w-auto lg:h-0 hidden lg:flex"
									>
										<span className="absolute z-[-1] flex justify-center items-center">
											<ChevronNext className="svg--current-color" />
										</span>
									</NextButton>
								</Carousel.Navigation>
							</Carousel.Wrapper>
						</TabContent>
						<TabContent active={activeTab === 'valuesets'}>
							<Carousel.Wrapper emblaApi={emblaApi3} className="carousel__products">
								<Carousel.Inner emblaRef={emblaRef3}>
									{products.map((data) => (
										<ProductCard
											product={data}
											className="relative mb-5 flex-grow-0 flex-shrink-0 flex flex-col w-3/4 basis-3/4 md:w-1/4 md:basis-1/4 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
											button={true}
											carousel={true}
										/>
									))}
								</Carousel.Inner>
								<Carousel.Navigation>
									<PrevButton
										onClick={() => autoPlayClick3(arrowClickPrev3)}
										className="lg:w-auto lg:h-0 hidden lg:flex"
									>
										<span className="absolute z-[-1] flex justify-center items-center">
											<ChevronPrev className="svg--current-color" />
										</span>
									</PrevButton>
									<NextButton
										onClick={() => autoPlayClick3(arrowClickNext3)}
										className="lg:w-auto lg:h-0 hidden lg:flex"
									>
										<span className="absolute z-[-1] flex justify-center items-center">
											<ChevronNext className="svg--current-color" />
										</span>
									</NextButton>
								</Carousel.Navigation>
							</Carousel.Wrapper>
						</TabContent>
						<Link href="#" className="btn btn-lg btn-outline-primary rounded-full border-2 hover:no-underline px-5">Shop All</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCarousel;
