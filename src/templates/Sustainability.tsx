import { useEffect, useState, useMemo } from "react";
import ImageWithText from "~/compounds/ImageWithText";
import parse from 'html-react-parser';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { EmblaOptionsType } from 'embla-carousel';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import { useWindowSize } from '~/hooks/useWindowSize';
// import { DotButton, useDotButton } from '~/components/carousel/EmblaCarouselDotButton';
import DimethiconeFree from '~/images/icons/dimethicone-free.svg';
import ToxinFree from '~/images/icons/toxin-free.svg';
import ParabelFree from '~/images/icons/paraben-free.svg';
import Gluten from '~/images/icons/gluten.svg';
import CrueltyFree from '~/images/icons/cruelty-free.svg';
import Vegan from '~/images/icons/vegan.svg';
import Link from "next/link";
import ChevronNext from '~/images/icons/chevron-next.svg';
import ChevronPrev from '~/images/icons/chevron-prev.svg';
import PlusIcon from '~/images/icons/plus.svg';
import MinusIcon from '~/images/icons/minus.svg';
import ProductCard from "~/compounds/ProductCard";
// import Infographic from '~/images/sustainability-infographic.svg';
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
	controlAutoplay,
} from '~/components/carousel/EmblaCarouselArrowButtons';
import {
    useSelectedSnapDisplay
} from '~/components/carousel/EmblaCarouselSelected';
import TabNav from "~/components/TabNav";
import TabContent from '~/components/TabContent';
import PackagingCard from "~/components/PackagingCard";
import Modal from "~/components/Modal";
import ModalWaitlist from "~/components/modal/Waitlist";

const Sustainability = (props: any) => {
    const [showCart, setShowCart] = useState(false);
    const [productCarousel, setProductCarousel] = useState([]);
    const [isDesktop, setIsDesktop] = useState(true);
    const [openIndex, setOpenIndex] = useState(0);
    const [width, height] = useWindowSize();
    const [waitlistData, setWaitlistData] = useState({
        open: false,
        title: '',
        image: '',
        handle: undefined,
        date: '',
    });

    const { ConditionalWrap } = props;

    const toggleCart = () => {
		setShowCart(!showCart);
	}

    const onClick = (id) => {
        let openIndexId = id;
        if (id === openIndex) {
            openIndexId = -1;
        }
        setOpenIndex(openIndexId);
    };

    const [activeTab2, setActiveTab2] = useState('formula-1');

    // carousel 1
	const [emblaRef1, emblaApi1] = useEmblaCarousel({
        loop: false,
    });
	const {
		prevBtnDisabled: prevDisabled1,
		nextBtnDisabled: nextDisabled1,
		onPrevButtonClick: arrowClickPrev1,
		onNextButtonClick: arrowClickNext1
	} = usePrevNextButtons(emblaApi1);
	// const autoPlayClick1 = controlAutoplay(emblaApi1);
    const { selected, count } = useSelectedSnapDisplay(emblaApi1);

    // carousel 2
	const [emblaRef2, emblaApi2] = useEmblaCarousel({
        loop: false,
        align: 'center',
        duration: 40,
    });
    // const { selectedIndex: idx2, onDotButtonClick: onClick2 } = useDotButton(emblaApi2);

    // carousel 3
	const [emblaRef3, emblaApi3] = useEmblaCarousel({
        loop: true,
        breakpoints: {
            '(min-width: 992px)': {
                align: 'start',
                watchDrag: false,
			    duration: 40,
            }
        }
    });
	const {
		onPrevButtonClick: arrowClickPrev3,
		onNextButtonClick: arrowClickNext3
	} = usePrevNextButtons(emblaApi3);
	// const autoPlayClick3 = controlAutoplay(emblaApi3);

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
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
        Autoplay({ playOnInit: false, delay: 5000 })
    ]);
    const {
        onPrevButtonClick: arrowClickPrev,
        onNextButtonClick: arrowClickNext
    } = usePrevNextButtons(emblaApi);
    const autoPlayClick = controlAutoplay(emblaApi);

    const [introEmblaRef, introEmblaApi] = useEmblaCarousel(options, [
        Autoplay({ playOnInit: false, delay: 5000 })
    ]);

    const {
        onPrevButtonClick: introArrowPrev,
        onNextButtonClick: introArrowNext
    } = usePrevNextButtons(introEmblaApi);

    const introAutoPlayClick = controlAutoplay(introEmblaApi);

    const { waitlistPdpSetting, banner, generalSetting, squareBadge, intro, imageSlider, formula, packaging, imageText, products, isLoading, buildProductCardModel, store, addToCart } = props;
    const PACKAGING = [
        {
            id: 1,
            src: packaging.image_1.url.replace('public', '592x'),
            srcSet: packaging.image_1.url.replace('public', '726x'),
            title: packaging.title_1,
            body: packaging.text_1,
        },
        {
            id: 2,
            src: packaging.image_2.url.replace('public', '592x'),
            srcSet: packaging.image_2.url.replace('public', '726x'),
            title: packaging.title_2,
            body: packaging.text_2,
        },
        {
            id: 3,
            src: packaging.image_3.url.replace('public', '592x'),
            srcSet: packaging.image_3.url.replace('public', '726x'),
            title: packaging.title_3,
            body: packaging.text_3,
        },
    ];

    const formulas = useMemo(() => {
        if (!formula) return [];
        return [
            {
                key: 'formula-1',
                title: formula.tab_1,
                content: formula.text_1,
            },
            {
                key: 'formula-2',
                title: formula.tab_2,
                content: formula.text_2,
            },
            {
                key: 'formula-3',
                title: formula.tab_3,
                content: formula.text_3?.replace('h4', 'h4 class="mb-1"'),
            },
        ].filter(item => item.title && item.content); // removes empty ones
    }, [formula]);

    useEffect(() => {
        if (products) {

            const getProducts = async () => {
                const pArray = products.products?.split(',');
                pArray.push(pArray.shift());
                const t = [];
                const pInfos = pArray.map(async (handle: string) => await fetch(`/api/getProductInfo?handle=${handle}`).then((r) => r.json()));
                const productData = await Promise.all(pInfos);
                productData.map((obj) => {
                    const { product } = obj;
                    if (product) {
                        // delete product.selectedVariant;
                        const mapped = buildProductCardModel(store, product, generalSetting, squareBadge);
                        t.push(mapped);
                    }
                });
                return t;
            };
            getProducts().then((d) => setProductCarousel(d));
        }
    }, [generalSetting]);

    useEffect(() => {
        if (waitlistData.open) document.body.classList.add('overflow-y-hidden');
        else document.body.classList.remove('overflow-y-hidden');
    }, [waitlistData]);

    useEffect(() => {
        if (globalThis && globalThis.window.innerWidth > 992) {
            setIsDesktop(true);
        } else {
            setIsDesktop(false);
        }
    }, [width]);

    const inlineCss = `
        .sustainability--intro p {
            margin-bottom: 20px;
            font-weight: 400;
        }
    `;

    return (
		<>
            <section className="relative">
                <a href="#">
                    <picture>
                        <source srcSet={banner.image_desktop.url} media="(min-width: 992px)" />
                        <img className="block w-full h-auto lg:h-[264px]" alt={banner.heading} src={banner.image_mobile.url} />
                    </picture>
                    <h1 className="absolute text-white m-auto w-full text-center px-g top-[50%] -translate-y-[50%] lg:text-[3em] lg:leading-[1.25em] sm:font-[400] lg:font-bold">
                        {parse(banner.heading.replace('?', '?<br class="lg:hidden" />'))}
                    </h1>
                </a>
            </section>
            <section>
                <div className="container py-3 lg:py-4 px-g">
                    <h2 className="mb-1 lg:mb-[1rem] text-body text-center text-xl lg:text-2xl">{intro.heading}</h2>
                    <div className="flex flex-wrap -mx-hg lg:-mx-g lg:max-w-[92.5%] lg:mx-auto">
                        <div className="sustainability--intro w-full lg:w-[67%] lg:basis-[67%] lg:order-1 text-center lg:text-left flex content-center flex-wrap justify-center lg:justify-start px-[7px] pt-[7px] lg:px-3 lg:py-3">
                            <style jsx>{inlineCss}</style>
                            <div className="text-sm lg:text-base" dangerouslySetInnerHTML={{
                                __html: intro.text,
                            }}/>
                        </div>
                        <div className="w-full lg:w-[33%] lg:basis-[33%] lg:order-2 my-25 lg:my-0">
                            <picture className="">
                                <source srcSet={'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/strapi-Infographic_1_33c8ce6c2a.jpg?v=1773609993'} media="(min-width: 992px)" />
                                <img className="w-[80%] mx-auto lg:w-full" alt={'Sustainability Infographic'} src={'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/strapi-Infographic_mobile_0af51ef84a.jpg?v=1773622236'} />
                            </picture>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container text-center mb-0 lg:mb-4 px-hg lg:px-0">
				<h2 className="mb-[1rem] text-body lg:text-2xl">{imageSlider.heading}</h2>
				<Carousel.Wrapper emblaApi={introEmblaApi} className="mx-0">
					<Carousel.Inner emblaRef={introEmblaRef} className="px-0">
						<div className="carousel__slide flex-grow-0 flex-shrink-0 w-[calc(100%-40px)] basis-[calc(100%-40px)] sm:w-[calc(100%-40px)] sm:basis-[calc(100%-40px)] lg:w-full lg:basis-full">
							<ImageWithText
								src={!isLoading ? 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/strapi-banner_1_mobile_486782de12.jpg?v=1773751042' : null}
								srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/strapi-banner_1_f6d0259629.jpg?v=1773750805"
                                template="sustainability">
								<h2 className="mb-[.5rem] text-base text-body lg:text-xl">Responsible Sourcing</h2>
								{!isLoading && <p className="text-body text-sm lg:text-base">We believe you are the company you keep. This means that we work with only the most ethical and environmentally conscious suppliers – such as Ecocert-approved conscious partners. Our Coconut, Fig, Cacao and Mango are all from traceable sources that have no negative effect on the environment. A sustainable beauty award winner, our Shea Butter is also derived from renewable sources, while our Papaya and Prickly Pear are COSMOS certified</p>}
							</ImageWithText>
						</div>
                        <div className="carousel__slide flex-grow-0 flex-shrink-0 w-[calc(100%-40px)] basis-[calc(100%-40px)] sm:w-[calc(100%-40px)] sm:basis-[calc(100%-40px)] lg:w-full lg:basis-full">
							<ImageWithText
								src={!isLoading ? 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/strapi-2_1_493ee2731e.jpg?v=1773751041' : null}
								srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/strapi-2_1d56f7ae_f0cb_4d63_8191_4520cb71f80c_b626873232.jpg?v=1773751041"
                                template="sustainability">
								<h2 className="mb-[.5rem] text-base text-body lg:text-xl">Zero Waste Philosophy</h2>
								{!isLoading && <p className="text-body text-sm lg:text-base">Wastage drives us (coco)nuts, so we go out of our way to avoid it. We love finding creative ways to use whole fruits, rather than throwing half an ingredient away. Take our hero, coconut, for example. We use the extract in our Hair Masque, the oil in our Elixir, the ground shell in our Scalp Scrub and even a sugar made from the flower in our Body Scrub!.</p>}
							</ImageWithText>
						</div>
						<div className="carousel__slide flex-grow-0 flex-shrink-0 w-[calc(100%-40px)] basis-[calc(100%-40px)] sm:w-[calc(100%-40px)] sm:basis-[calc(100%-40px)] lg:w-full lg:basis-full">
							<ImageWithText
								src={!isLoading ? 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/strapi-3_1_b873158b54.jpg?v=1773751042' : null}
								srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/strapi-3_3fac32f7_cdc1_4f10_93bc_162655731455_6f839fd5c4.jpg?v=1773751007"
                                template="sustainability">
								<h2 className="mb-[.5rem] text-base text-body lg:text-xl">Lower Carbon Shipping</h2>
								{!isLoading && <p className="text-body text-sm lg:text-base">As for shipping, we always look to transport items from our suppliers to our warehouses with the smallest possible carbon footprint. That means our products move around the world less by air, and more by boat! (After all, who doesn’t love a good cruise?).</p>}
							</ImageWithText>
						</div>
                        <div className="carousel__slide flex-grow-0 flex-shrink-0 w-[calc(100%-40px)] basis-[calc(100%-40px)] sm:w-[calc(100%-40px)] sm:basis-[calc(100%-40px)] lg:w-full lg:basis-full">
							<ImageWithText
								src={!isLoading ? 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/strapi-4_1_8fa8e1f544.jpg?v=1773751041' : null}
								srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/strapi-4_283a3ec64c.jpg?v=1773751041"
                                template="sustainability">
								<h2 className="mb-[.5rem] text-base text-body lg:text-xl">Cruelty Free & Vegan</h2>
								{!isLoading && <p className="text-body text-sm lg:text-base">Bali is home to amazingly diverse wildlife and plants – and we want to keep it that way! As deforestation and loss of natural habitat poses a threat to many of our furry friends, we only use FSC paper and card from sustainably managed forests. We also ensure our natural ingredients are from eco-conscious suppliers, and we are proudly 100% clean!</p>}
							</ImageWithText>
						</div>
					</Carousel.Inner>
					<Carousel.Navigation>
						<PrevButton
							onClick={() => introAutoPlayClick(introArrowPrev)}
							className="hidden w-auto h-0 lg:flex left-3 top-[50%]"
						>
							<span className="absolute z-[-1] flex justify-center items-center w-5 h-5 rounded-full">
								<svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 11 18" fill="none">
									<path d="M10.4142 16.071L3.34318 8.99993L10.4142 1.92888L9 0.514648L0.514719 8.99993L9 17.4852L10.4142 16.071Z" fill="#151515"/>
								</svg>
							</span>
						</PrevButton>
						<NextButton
							onClick={() => introAutoPlayClick(introArrowNext)}
							className="hidden w-auto h-0 lg:flex right-3 top-[50%]"
						>
							<span className="absolute z-[-1] flex justify-center items-center w-5 h-5 rounded-full">
								<svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 11 18" fill="none">
									<path d="M0.585767 16.071L7.65682 8.99993L0.585767 1.92888L2 0.514648L10.4853 8.99993L2 17.4852L0.585767 16.071Z" fill="#151515"/>
								</svg>
							</span>
						</NextButton>
					</Carousel.Navigation>
				</Carousel.Wrapper>
			</section>
            {/* <section className="container p-0 lg:px-g">
                <h2 className="text-center mb-[1rem] lg:mb-3 text-body text-body text-xl lg:text-2xl">{imageSlider.heading}</h2>
                <div className="flex flex-wrap bg-primary-light mx-0 lg:rounded">
                    <div className="w-full lg:w-[calc(100%-501px)] lg:basis-[calc(100%-501px)] py-2 px-g lg:px-3 lg:py-4">
                        <h3 className="mb-1 text-body">{imageSlider.slider_title}</h3>
                        <Carousel.Wrapper emblaApi={emblaApi1}>
                            <Carousel.Inner emblaRef={emblaRef1} className="lg:-mx-g">
                                <div className="flex-grow-0 flex-shrink-0 w-full basis-full lg:px-g" key={`slider-${1}`}>
                                    <p className="text-body leading-[24px] lg:leading-[20px]">{imageSlider.text_1}</p>
                                </div>
                                <div className="flex-grow-0 flex-shrink-0 w-full basis-full lg:px-g" key={`slider-${2}`}>
                                    <p className="text-body leading-[24px] lg:leading-[20px]">{imageSlider.text_2}</p>
                                </div>
                                <div className="flex-grow-0 flex-shrink-0 w-full basis-full lg:px-g" key={`slider-${3}`}>
                                    <p className="text-body leading-[24px] lg:leading-[20px]">{imageSlider.text_3}</p>
                                </div>
                            </Carousel.Inner>
                            <Carousel.Navigation>
                                <div className="flex relative mx-auto lg:mx-0 mt-[18px] lg:mt-4 justify-center w-[120px]">
                                    <PrevButton
                                        onClick={arrowClickPrev1}
                                        disabled={prevDisabled1}
                                        className={`w-auto lg:-ml-[2px] ${prevDisabled1 ? 'text-[#ADADAD] pointer-events-none' : 'text-primary'}`}
                                    >
                                        <ChevronPrev className="w-[24px] h-[24px] svg--current-color" />
                                    </PrevButton>
                                    <span className="mx-1 inline-block lg:px-0">{selected + 1} of {count}</span>
                                    <NextButton
                                        onClick={arrowClickNext1}
                                        disabled={nextDisabled1}
                                        className={`w-auto lg:-mr-[2px] ${nextDisabled1 ? 'text-[#ADADAD] pointer-events-none' : 'text-primary'}`}
                                    >
                                        <ChevronNext className="w-[24px] h-[24px] svg--current-color" />
                                    </NextButton>
                                </div>
                            </Carousel.Navigation>
                        </Carousel.Wrapper>
                    </div>
                    <div className="w-full lg:w-[501px] lg:basis-[501px] px-0">
                        <picture className="">
                            <source srcSet={imageSlider.image_desktop.url} media="(min-width: 992px)" />
                            <img className="w-full lg:rounded-r" alt={imageSlider.heading} src={imageSlider.image_mobile.url.replace('public', '828x')} />
                        </picture>
                    </div>
                </div>
            </section> */}
            <section className="container px-0">
                <div className="px-0 py-3 lg:py-5">
                    <h2 className="mb-[1rem] lg:mb-3 text-body lg:text-2xl text-center">Our Ingredient Standards</h2>
                    <div className="flex flex-wrap lg:-mx-g px-g">
                        <div className="w-full lg:w-1/2 order-2 lg:order-1 px-0 lg:pl-[.5rem] lg:pr-[.5rem]">
                            {/* <h2 className="hidden lg:block mb-1 text-base lg:mb-3">{formula.heading}</h2>
                            {!isLoading && (
                                <ul className="list-none flex flex-wrap -mx-hg lg:-mx-g mt-2 w-full lg:w-3/4 p-0 mb-0 justify-center">
                                    <li className="w-1/3 flex items-center mb-2 flex-wrap text-center justify-center text-body"><DimethiconeFree className="svg block w-full mb-1 h-[32px]" />Silicone Free</li>
                                    <li className="w-1/2 flex items-center mb-2 flex-wrap text-center justify-center text-body"><ToxinFree className="svg block w-full mb-1 h-[32px]" />Toxin-free</li>
                                    <li className="w-1/2 flex items-center mb-2 flex-wrap text-center justify-center text-body"><ParabelFree className="svg block w-full mb-1 h-[32px]" />Paraben Free</li>
                                    <li className="w-1/2 flex items-center mb-0 flex-wrap text-center justify-center text-body"><Gluten className="svg block w-full mb-1 h-[32px]" />Gluten Free</li>
                                    <li className="w-1/2 flex items-center mb-0 flex-wrap text-center justify-center text-body"><Vegan className="svg block w-full mb-1 h-[32px]" />Clean Beauty</li>
                                </ul>
                            )} */}
                            <picture className="">
                                <source srcSet={'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/strapi-ingredients_cc7872fad6.jpg?v=1773620533'} media="(min-width: 992px)" />
                                <img className="w-full" alt={'No Nasties Formula'} src={'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/strapi-ingredients_cc7872fad6.jpg?v=1773620533'} />
                            </picture>
                        </div>
                        <div className="w-full lg:w-1/2 order-1 lg:order-2 px-[.375em] lg:px-[.5rem] hidden lg:block">
                            {/* <h2 className="block lg:hidden text-center lg:text-left mb-2">{formula.heading}</h2> */}
                            {!isLoading && (
                                <div className="h-full px-[1.5rem] py-[1.5rem] bg-gray-100">
                                    <ul className="list-none mx-auto flex flex-wrap text-center justify-center lg:justify-start">
                                        <li className="grow lg:grow-0 text-center"><TabNav className={`-mb-[1px] py-1 pl-0 pr-[6px] lg:px-2 ${activeTab2 === 'formula-1' ? 'bg-dark text-white hover:text-white' : ''}`} title={formula.tab_1} active={activeTab2 === 'formula-1'} onNavChange={() => setActiveTab2('formula-1')} /></li>
                                        <li className="grow lg:grow-0 text-center"><TabNav className={`-mb-[1px] py-1 px-[6px] lg:px-2 ${activeTab2 === 'formula-2' ? 'bg-dark text-white hover:text-white' : ''}`} title={formula.tab_2} active={activeTab2 === 'formula-2'} onNavChange={() => setActiveTab2('formula-2')} /></li>
                                        <li className="grow lg:grow-0 text-center"><TabNav className={`-mb-[1px] py-1 px-1 lg:px-2 ${activeTab2 === 'formula-3' ? 'bg-dark text-white hover:text-white' : ''}`} title={formula.tab_3} active={activeTab2 === 'formula-3'} onNavChange={() => setActiveTab2('formula-3')} /></li>
                                    </ul>
                                    <div className='px-0'>
                                        <TabContent className="mt-2 lg:mt-[1.5rem] lg:min-h-0" active={activeTab2 === 'formula-1'}>
                                            <div className="text-body" dangerouslySetInnerHTML={{
                                                __html: formula.text_1,
                                            }}/>
                                        </TabContent>
                                        <TabContent className="mt-2 lg:mt-[1.5rem] lg:min-h-0" active={activeTab2 === 'formula-2'}>
                                            <div className="text-body" dangerouslySetInnerHTML={{
                                                __html: formula.text_2,
                                            }}/>
                                        </TabContent>
                                        <TabContent className="mt-2 lg:mt-[1.5rem] lg:min-h-0" active={activeTab2 === 'formula-3'}>
                                            <div className="text-body" dangerouslySetInnerHTML={{
                                                __html: formula.text_3.replace('h4', 'h4 class="mb-1"'),
                                            }} />
                                        </TabContent>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="w-full block lg:hidden order-1 mb-[1rem]">
                            {ConditionalWrap && (
                                <ConditionalWrap
                                    condition={isDesktop}
                                    wrap={children => <div className="px-0">{children}</div>}
                                    elseWrap={children => (
                                        <div className="bg-gray-100 px-g border-t-0 border-b-0 md:border-t md:border-b border-gray-500 accordion w-full accordion-flush">
                                            {children}
                                        </div>
                                    )}
                                >
                                {formulas.map((item, index) => (
                                        <ConditionalWrap
                                            key={item.key}
                                            condition={isDesktop}
                                            wrap={children => (
                                                <TabContent
                                                    className="mt-2 lg:mt-[1.5rem] lg:min-h-0"
                                                    active={activeTab2 === item.key}
                                                >
                                                    {children}
                                                </TabContent>
                                            )}
                                            elseWrap={children => (
                                                <div className="accordion-item border-t border-b border-gray-500">
                                                    <div
                                                        className={`cursor-pointer flex w-full justify-between items-center ${
                                                            openIndex === index
                                                                ? 'pt-2 pb-2 accordion-opened'
                                                                : 'py-2'
                                                        }`}
                                                        onClick={() => onClick(index)}
                                                    >
                                                        <strong className="text-body">
                                                            {item.title}
                                                        </strong>

                                                        {openIndex === index ? (
                                                            <MinusIcon className="h-[.75em] w-[.75em]" />
                                                        ) : (
                                                            <PlusIcon className="h-[.75em] w-[.75em]" />
                                                        )}
                                                    </div>
                                                    <div
                                                        className={`accordion-content ${
                                                            openIndex === index
                                                                ? 'accordion-content--open'
                                                                : 'accordion-content--close'
                                                        }`}
                                                    >
                                                        {children}
                                                    </div>
                                                </div>
                                            )}
                                        >
                                            <div className="text-body pb-g">
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.content,
                                                    }}
                                                />
                                            </div>
                                        </ConditionalWrap>
                                    ))}
                                </ConditionalWrap>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            {!isLoading && (
                <section className="pt-0 pb-1 relative">
                    <div className="container pt-2 lg:p-0">
                        <p className="pb-[1rem] mb-0 font-bold text-center text-body text-xl lg:text-2xl">{packaging.heading}</p>
                        <Carousel.Wrapper emblaApi={emblaApi2} className="px-0">
                            <Carousel.Inner emblaRef={emblaRef2} className="lg:mx-0 lg:!transform-none">
                                {PACKAGING.map((data) => (
                                    <PackagingCard key={data.id} srcSet={data.srcSet} src={data.src}
                                        className="flex-grow-0 flex-shrink-0 w-[87.5%] basis-[87.5%] lg:w-1/3 lg:basis-1/3 px-[.375em] lg:px-[.5rem]">
                                        <h6 className="mb-25 lg:mb-[8px] font-bold">{data.title}</h6>
                                        <p className="mb-0 leading-[20px]">{parse(data.body.replace('environmentally-friendly', '<br />environmentally-friendly'))}</p>
                                    </PackagingCard>
                                ))}
                            </Carousel.Inner>
                            {/* <Carousel.Navigation>
                                <ol className="carousel__dots justify-center my-2 lg:hidden static">
                                    {PACKAGING.map((_, index) => (
                                        <li key={index} className={`border border-primary ${index === idx2 ? ' bg-primary' : 'bg-white opacity-50'}`}>
                                            <DotButton
                                                onClick={() => onClick2(index)}
                                                className="carousel__dot"
                                            />
                                        </li>
                                    ))}
                                </ol>
                            </Carousel.Navigation> */}
                        </Carousel.Wrapper>
                    </div>
                </section>
            )}
            <section className="sustainability-image-text container mb-4 lg:mb-4 px-0 lg:px-g hidden">
                <div className="flex flex-wrap bg-primary-light mx-0 lg:items-start lg:rounded">
                    <div className="text-body w-full lg:w-[calc(100%-501px)] lg:basis-[calc(100%-501px)] py-3 lg:py-4 flex flex-wrap content-start px-g lg:px-3 text-left lg:text-left justify-start lg:justify-start">
                        <h3 className="mb-1 text-body">{imageText.heading}</h3>
                        {!isLoading && <p className="mb-0 text-left text-body">{imageText.text}</p>}
                    </div>
                    {!isLoading && (
                        <div className="w-full lg:w-[501px] lg:basis-[501px] px-0">
                            <picture>
                                <source srcSet={imageText.image_desktop.url} media="(min-width: 992px)" />
                                <img className="fit--cover w-full lg:rounded-r" alt="/" src={imageText.image_mobile.url} />
                            </picture>
                        </div>
                    )}
                </div>
            </section>
            {/* <section className="py-4 lg:py-5 overflow-hidden">
                <div className="container text-center">
                    <h2 className="text-center mx-5 mb-1">{products.heading}</h2>
                    {!isLoading && productCarousel.length > 0 && (
                        <>
                            <Carousel.Wrapper emblaApi={emblaApi3} className="pt-2 -mx-hg lg:mx-25">
                                <Carousel.Inner emblaRef={emblaRef3} className="lg:-mx-g">
                                    {productCarousel.map((data: any, id: number) => (
                                        <ProductCard
                                            key={`product-${id}-${data.id}`}
                                            product={data}
                                            className="relative mb-0 flex-grow-0 flex-shrink-0 flex flex-col w-3/4 basis-3/4 md:w-1/4 md:basis-1/4 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
                                            button={true}
                                            carousel={true}
                                            link={data.handle}
                                            sustainability={true}
                                            addToCart={addToCart}
                                            setWaitlistData={setWaitlistData}
                                            generalSetting={generalSetting}
                                        />
                                    ))}
                                </Carousel.Inner>
                                <Carousel.Navigation>
                                    <PrevButton
                                        onClick={arrowClickPrev3}
                                        className="lg:-left-[2%] lg:w-4 text-primary"
                                    >
                                        <span className="bg-white w-4 h-4 absolute z-[-1] flex justify-center items-center top-[28%] md:top-[6.25em] lg:top-[8.125em]">
                                            <ChevronPrev className="w-[16px] h-[16px] svg--current-color" />
                                        </span>
                                    </PrevButton>
                                    <NextButton
                                        onClick={arrowClickNext3}
                                        className="lg:-right-[2%] lg:w-4 text-primary"
                                    >
                                        <span className="bg-white w-4 h-4 absolute z-[-1] flex justify-center items-center top-[28%] md:top-[6.25em] lg:top-[8.125em]">
                                            <ChevronNext className="w-[16px] h-[16px] svg--current-color" />
                                        </span>
                                    </NextButton>
                                </Carousel.Navigation>
                            </Carousel.Wrapper>
                            <a href="/collections/all" className="mb-2 lg:mb-3 btn btn-lg btn-outline-primary border-2 hover:no-underline mt-5">Shop All</a>
                        </>
                    )}
                </div>
            </section> */}

            <Modal className="modal-lg lg:max-w-[43.125rem] modal-dialog-centered" isOpen={waitlistData.open} handleClose={() => setWaitlistData({...waitlistData, ...{ open: false }})}>
                <ModalWaitlist waitlistPdp={waitlistPdpSetting} store={store} data={waitlistData} handleClose={() => setWaitlistData({...waitlistData, ...{ open: false }})} />
            </Modal>
		</>
    );
}

export default Sustainability;
