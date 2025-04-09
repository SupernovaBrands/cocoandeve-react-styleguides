import { useEffect, useState } from "react";
import parse from 'html-react-parser';
import useEmblaCarousel from 'embla-carousel-react';
// import Autoplay from 'embla-carousel-autoplay';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
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
import ProductCard from "~/compounds/ProductCard";
// import Infographic from '~/images/sustainability-infographic.svg';
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
	// controlAutoplay,
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
    const [waitlistData, setWaitlistData] = useState({
        open: false,
        title: '',
        image: '',
        handle: undefined,
        date: '',
    });

    const toggleCart = () => {
		setShowCart(!showCart);
	}

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
                        <img className="block w-full" alt={banner.heading} src={banner.image_mobile.url} />
                    </picture>
                    <h1 className="absolute text-white m-auto w-full text-center px-g top-[50%] -translate-y-[50%] lg:text-[3.25em] lg:leading-[1.25em] sm:font-[400] lg:font-bold">
                        {parse(banner.heading.replace('?', '?<br class="lg:hidden" />'))}
                    </h1>
                </a>
            </section>
            <section>
                <div className="container py-4 lg:py-4">
                    <div className="flex flex-wrap -mx-hg lg:-mx-g">
                        <div className="sustainability--intro w-full lg:w-7/12 lg:basis-7/12 lg:order-2 text-center lg:text-left flex content-center flex-wrap justify-center lg:justify-start px-g">
                            <h2 className="mb-1 lg:mb-2 text-body text-xl lg:text-2xl">{intro.heading}</h2>
                            <style jsx>{inlineCss}</style>
                            <div dangerouslySetInnerHTML={{
                                __html: intro.text,
                            }}/>
                        </div>
                        <div className="px-hg lg:px-g w-full lg:w-5/12 lg:basis-5/12 lg:order-1 my-25 lg:my-0">
                            <picture className="">
                                <source srcSet={'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/83ca8477-6853-4e0c-5da1-6397476d2a00/public'} media="(min-width: 992px)" />
                                <img className="w-[60%] mx-auto lg:w-full" alt={'Sustainability Infographic'} src={'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/fffabaea-d734-462a-85b5-69fb6f9c2800/828x'} />
                            </picture>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container p-0 lg:px-g">
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
            </section>
            <section className="container pt-4 px-0 lg:px-g">
                <div className="bg-secondary-light px-g pt-3 pb-4 lg:p-4 border-t border-t-secondary-light lg:rounded">
                    <div className="flex flex-wrap lg:-mx-g">
                        <div className="w-full lg:w-7/12 lg:order-2 lg:px-g">
                            <h2 className="block lg:hidden text-center lg:text-left mb-2">{formula.heading}</h2>
                            {!isLoading && (
                                <>
                                    <ul className="list-none mx-auto flex flex-wrap text-center justify-center lg:justify-start border-b border-[#D8D8D8]">
                                        <li className="grow lg:grow-0 text-center"><TabNav className={`-mb-[1px] pt-0 pb-25 pl-0 pr-[6px] lg:px-2 ${activeTab2 === 'formula-1' ? 'border-secondary border-b-2 hover:text-body' : ''}`} title={formula.tab_1} active={activeTab2 === 'formula-1'} onNavChange={() => setActiveTab2('formula-1')} /></li>
                                        <li className="grow lg:grow-0 text-center"><TabNav className={`-mb-[1px] pt-0 pb-25 px-[6px] lg:px-2 ${activeTab2 === 'formula-2' ? 'border-secondary border-b-2 hover:text-body' : ''}`} title={formula.tab_2} active={activeTab2 === 'formula-2'} onNavChange={() => setActiveTab2('formula-2')} /></li>
                                        <li className="grow lg:grow-0 text-center"><TabNav className={`-mb-[1px] pt-0 pb-25 px-1 lg:px-2 ${activeTab2 === 'formula-3' ? 'border-secondary border-b-2 hover:text-body' : ''}`} title={formula.tab_3} active={activeTab2 === 'formula-3'} onNavChange={() => setActiveTab2('formula-3')} /></li>
                                    </ul>
                                    <div className='px-0'>
                                        <TabContent className="mt-2 lg:mt-3 lg:min-h-0" active={activeTab2 === 'formula-1'}>
                                            <div className="text-body" dangerouslySetInnerHTML={{
                                                __html: formula.text_1,
                                            }}/>
                                        </TabContent>
                                        <TabContent className="mt-2 lg:mt-3 lg:min-h-0" active={activeTab2 === 'formula-2'}>
                                            <div className="text-body" dangerouslySetInnerHTML={{
                                                __html: formula.text_2,
                                            }}/>
                                        </TabContent>
                                        <TabContent className="mt-2 lg:mt-3 lg:min-h-0" active={activeTab2 === 'formula-3'}>
                                            <div className="text-body" dangerouslySetInnerHTML={{
                                                __html: formula.text_3.replace('h4', 'h4 class="mb-1"'),
                                            }} />
                                        </TabContent>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="w-full lg:w-5/12 lg:order-1 lg:px-g">
                            <h2 className="hidden lg:block mb-1 text-base lg:mb-3">{formula.heading}</h2>
                            {!isLoading && (
                                <ul className="list-none flex flex-wrap -mx-hg lg:-mx-g mt-2 w-full lg:w-3/4 p-0 mb-0 justify-center">
                                    <li className="w-1/3 flex items-center mb-2 flex-wrap text-center justify-center text-body"><DimethiconeFree className="svg block w-full mb-1 h-[32px]" />Silicone Free</li>
                                    <li className="w-1/3 flex items-center mb-2 flex-wrap text-center justify-center text-body"><ToxinFree className="svg block w-full mb-1 h-[32px]" />Toxin-free</li>
                                    <li className="w-1/3 flex items-center mb-2 flex-wrap text-center justify-center text-body"><ParabelFree className="svg block w-full mb-1 h-[32px]" />Paraben Free</li>
                                    <li className="w-1/3 flex items-center mb-0 flex-wrap text-center justify-center text-body"><Gluten className="svg block w-full mb-1 h-[32px]" />Gluten Free</li>
                                    <li className="w-1/3 flex items-center mb-0 flex-wrap text-center justify-center text-body"><Vegan className="svg block w-full mb-1 h-[32px]" />Clean Beauty</li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            {!isLoading && (
                <section className="pt-4 pb-4 relative">
                    <div className="container p-0 md:pt-1">
                        <p className="pb-[1rem] mb-0 font-bold text-center text-body text-xl lg:text-2xl">{packaging.heading}</p>
                        <Carousel.Wrapper emblaApi={emblaApi2} className="px-0">
                            <Carousel.Inner emblaRef={emblaRef2} className="lg:mx-0 lg:!transform-none">
                                {PACKAGING.map((data) => (
                                    <PackagingCard key={data.id} srcSet={data.srcSet} src={data.src} 
                                        className="flex-grow-0 flex-shrink-0 w-[87.5%] basis-[87.5%] lg:w-1/3 lg:basis-1/3 px-hg lg:px-g">
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
            <section className="sustainability-image-text container mb-4 lg:mb-4 px-0 lg:px-g">
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
