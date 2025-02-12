import { EmblaOptionsType } from 'embla-carousel';
import TabNav from '~/components/TabNav';
import TabContent from '~/components/TabContent';
import { useEffect, useState } from 'react';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import useEmblaCarousel from 'embla-carousel-react';
// import Autoplay from 'embla-carousel-autoplay';
import ChevronNext from '~/images/icons/chevron-next.svg';
import ChevronPrev from '~/images/icons/chevron-prev.svg';
import Modal from "~/components/Modal";
import ModalWaitlist from "~/components/modal/Waitlist";
import {
	PrevButton,
	NextButton,
} from '~/components/carousel/EmblaCarouselArrowButtons';
// import ProductCard from "~/compounds/ProductCard";
import ProductCardTest from '~/compounds/ProductCardTest';

const optionsAbTest: EmblaOptionsType = {
	loop: true,
	align: 'start',
	breakpoints: {
		'(min-width: 992px)': {
			watchDrag: false,
			duration: 40,
		}
	}
}

const ProductCarouselTest = (props: any) => {
	const [waitlistData, setWaitlistData] = useState({
        open: false,
        title: '',
        image: '',
        handle: undefined,
		date: '',
    });

	const { waitlistPdpSetting, store, isStyleguide, products, data, addToCart, trackEvent, trackBluecoreEvent, preOrders, generalSetting } = props;
	let productsData = data;
	if (isStyleguide && !data) {
		productsData = {
			tab1: { products },
			tab2: { products },
			tab3: { products },
		}
	}

	const [activeTab, setActiveTab] = useState('bestsellers');

    const [isHomepage, setIsHomepage] = useState(false);
    const [isProduct, setIsProduct] = useState(false);

	//tab 1
	const [emblaRef1, emblaApi1] = useEmblaCarousel(optionsAbTest);
	// const {
	// 	onPrevButtonClick: arrowClickPrev1,
	// 	onNextButtonClick: arrowClickNext1
	// } = usePrevNextButtons(emblaApi1);
	// const autoPlayClick1 = controlAutoplay(emblaApi1);

	//tab 2
	const [emblaRef2, emblaApi2] = useEmblaCarousel(optionsAbTest);
	// const {
	// 	onPrevButtonClick: arrowClickPrev2,
	// 	onNextButtonClick: arrowClickNext2
	// } = usePrevNextButtons(emblaApi2);
	// const autoPlayClick2 = controlAutoplay(emblaApi2);

	//tab 3
	const [emblaRef3, emblaApi3] = useEmblaCarousel(optionsAbTest);
	// const {
	// 	onPrevButtonClick: arrowClickPrev3,
	// 	onNextButtonClick: arrowClickNext3
	// } = usePrevNextButtons(emblaApi3);
	// const autoPlayClick3 = controlAutoplay(emblaApi3);

	useEffect(() => {
        if (waitlistData.open) document.body.classList.add('overflow-y-hidden');
        else document.body.classList.remove('overflow-y-hidden');
    }, [waitlistData]);

	const newTabCount = productsData?.tab1?.products.length;
	const newTabProducts = newTabCount > 4 ? productsData?.tab1?.products : productsData?.tab1?.products.concat(productsData?.tab1?.products);

	useEffect(() => {
        setIsHomepage(['/'].indexOf(window.location.pathname) >= 0);
        setIsProduct(window.location.pathname.includes('/products/'));
	}, [])

	return (
		<>
		<div className={`container px-0 text-center product__carousel product__carousel-homepage py-3 lg:pb-0 lg:px-0 ${isProduct ? 'mb-4 lg:mb-5 lg:pb-4' : ''}`}>
			{!isHomepage && (<h2 className="text-xl lg:text-2xl text-center mb-g lg:mb-2">You may also like</h2>)}
			<div className="row">
				<div>
					<div className="product__carousel-nav-container lg:flex lg:justify-between lg:items-center container lg:px-g">
						<ul className="product__carousel-nav list-style-none mx-auto lg:mx-0 flex flex-wrap border-b-0 text-center pb-g lg:pb-3 justify-start px-hg lg:px-0">
							<li><TabNav className={`lg:!leading-[40px] w-[7.5rem] lg:w-[9.375rem] px-g hover:text-body focus:text-body visited:text-body ${activeTab === 'bestsellers' ? 'text-body font-bold nav--active' : ''}`} title='Best Sellers' active={activeTab === 'bestsellers'} onNavChange={() => setActiveTab('bestsellers')} /></li>
							<li><TabNav className={`lg:!leading-[40px] w-[7.5rem] lg:w-[9.375rem] px-g hover:text-body focus:text-body visited:text-body ${activeTab === 'new' ? 'text-body font-bold nav--active' : ''}`} title='New' active={activeTab === 'new'} onNavChange={() => setActiveTab('new')} /></li>
							<li><TabNav className={`lg:!leading-[40px] w-[7.5rem] lg:w-[9.375rem] px-g hover:text-body focus:text-body visited:text-body ${activeTab === 'valuesets' ? 'text-body font-bold nav--active' : ''}`} title='Value Sets' active={activeTab === 'valuesets'} onNavChange={() => setActiveTab('valuesets')} /></li>
						</ul>
						<a href="/collections/all" className="hidden lg:inline mt-2 btn btn-lg btn-outline-primary rounded-full border-2 hover:no-underline px-[3.375em] py-[.8125em] lg:px-[1.625em] lg:py-[.5em] mb-2">Shop All</a>
					</div>
					<div className="product__carousel-body pl-[.5625em] lg:px-0 text-center">
						<TabContent active={activeTab === 'new'}>
							<Carousel.Wrapper emblaApi={emblaApi2} className="carousel__products">
								<Carousel.Inner emblaRef={emblaRef2}>
									{productsData?.tab1?.products && newTabProducts.map((item: any, index: number) => {
										return <ProductCardTest
                                            key={`${activeTab}-${item.id}-${index}`}
                                            keyName={`${activeTab}-${item.id}-${index}`}
                                            product={item}
                                            className="relative mb-0 lg:mb-0 flex-grow-0 flex-shrink-0 flex flex-col w-[172px] basis-[172px] md:w-1/4 md:basis-1/4 pr-[.375em] pl-[.375em] lg:px-g text-center"
                                            button={true}
                                            setWaitlistData={setWaitlistData}
                                            smSingleStar={false}
                                            carousel={true}
                                            addToCart={addToCart}
                                            trackEvent={trackEvent}
                                            preOrders={preOrders}
                                            generalSetting={generalSetting}
                                            homePage={props.homePage || false}
                                        />
									})}
								</Carousel.Inner>
								<Carousel.Navigation>
									<PrevButton
										onClick={() => emblaApi2.scrollPrev() }
										className="lg:w-auto lg:h-0 hidden lg:flex"
									>
										<span className="absolute z-[-1] flex justify-center items-center">
											<ChevronPrev className="svg--current-color" />
										</span>
									</PrevButton>
									<NextButton
										onClick={() => emblaApi2.scrollNext() }
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
							<Carousel.Wrapper emblaApi={emblaApi1} className="carousel__products bests">
								<Carousel.Inner emblaRef={emblaRef1}>
									{productsData?.tab2?.products && productsData.tab2.products.map((item: any, index: number) => {
										return <ProductCardTest
                                            key={`${activeTab}-${item.id}-${index}`}
                                            keyName={`${activeTab}-${item.id}-${index}`}
                                            product={item}
                                            className="relative mb-0 lg:mb-0 flex-grow-0 flex-shrink-0 flex flex-col w-[172px] basis-[172px] md:w-1/4 md:basis-1/4 pr-[.375em] pl-[.375em] lg:px-g text-center"
                                            button={true}
                                            setWaitlistData={setWaitlistData}
                                            smSingleStar={false}
                                            carousel={true}
                                            addToCart={addToCart}
                                            trackEvent={trackEvent}
                                            preOrders={preOrders}
                                            generalSetting={generalSetting}
                                            homePage={props.homePage || false}
                                        />
									})}
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
						</TabContent>
						<TabContent active={activeTab === 'valuesets'}>
							<Carousel.Wrapper emblaApi={emblaApi3} className="carousel__products">
								<Carousel.Inner emblaRef={emblaRef3}>
									{productsData?.tab3?.products && productsData.tab3.products.map((item: any, index: number) => {
										return <ProductCardTest
                                            key={`${activeTab}-${item.id}-${index}`}
                                            keyName={`${activeTab}-${item.id}-${index}`}
                                            product={item}
                                            className="relative mb-0 lg:mb-0 flex-grow-0 flex-shrink-0 flex flex-col w-[172px] basis-[172px] md:w-1/4 md:basis-1/4 pr-[.375em] pl-[.375em] lg:px-g text-center"
                                            button={true}
                                            setWaitlistData={setWaitlistData}
                                            smSingleStar={false}
                                            carousel={true}
                                            addToCart={addToCart}
                                            trackEvent={trackEvent}
                                            preOrders={preOrders}
                                            generalSetting={generalSetting}
                                            homePage={props.homePage || false}
                                        />
									})}
								</Carousel.Inner>
								<Carousel.Navigation>
									<PrevButton
										onClick={() => emblaApi3.scrollPrev() }
										className="lg:w-auto lg:h-0 hidden lg:flex"
									>
										<span className="absolute z-[-1] flex justify-center items-center">
											<ChevronPrev className="svg--current-color" />
										</span>
									</PrevButton>
									<NextButton
										onClick={() => emblaApi3.scrollNext() }
										className="lg:w-auto lg:h-0 hidden lg:flex"
									>
										<span className="absolute z-[-1] flex justify-center items-center">
											<ChevronNext className="svg--current-color" />
										</span>
									</NextButton>
								</Carousel.Navigation>
							</Carousel.Wrapper>
						</TabContent>
						<a href="/collections/all" className="lg:hidden mt-2 btn btn-lg btn-outline-primary rounded-full border-2 hover:no-underline px-[3.375em] py-[.8125em]">Shop All</a>
					</div>
				</div>
			</div>
		</div>
			<Modal className="modal-lg lg:max-w-[43.125rem] modal-dialog-centered" isOpen={waitlistData.open} handleClose={() => setWaitlistData({...waitlistData, ...{ open: false }})}>
                <ModalWaitlist waitlistPdp={waitlistPdpSetting} store={store} data={waitlistData} trackBluecoreEvent={trackBluecoreEvent} handleClose={() => setWaitlistData({...waitlistData, open: false })} />
        	</Modal>
		</>
	);
};

export default ProductCarouselTest;
