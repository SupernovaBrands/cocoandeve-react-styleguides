import { EmblaOptionsType } from 'embla-carousel';
import { useEffect, useRef, useState } from 'react';
import TabNav from '~/components/TabNav';
import TabContent from '~/components/TabContent';
import ProductBanner from '~/compounds/ProductBanner';
// import useMediaQuery from '~/hooks/useMediaQuery';
import PlusIcon from '~/images/icons/plus.svg';
import MinusIcon from '~/images/icons/minus.svg';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import useEmblaCarousel from 'embla-carousel-react';
import ProductCard from "~/compounds/ProductCard";
import ChevronNext from '~/images/icons/chevron-next.svg';
import ChevronPrev from '~/images/icons/chevron-prev.svg';
import {
	PrevButton,
	NextButton,
} from '~/components/carousel/EmblaCarouselArrowButtons';
// import { PRODUCTS } from '~/modules/dummy_products';
// import { VIDEOS } from '~/modules/dummy_videos';
import VideoUpsellCard from '~/components/VideoUpsellCard';
import Modal from "~/components/Modal";
import ModalWaitlist from "~/components/modal/Waitlist";
import { useSelectedSnapDisplay } from '~/components/carousel/EmblaCarouselSelected';
import CarouselScrollbar from '~/components/carousel/CarouselScrollbar';
import { useWindowSize } from '~/hooks/useWindowSize';
import ProductInfo from '~/components/modal/ProductInfo';

const HairSolution = (props: any) => {
    const { getActiveWL, getId, fbqEvent, tiktokSubscribe, subscribeBluecoreWaitlist, submitsToSmsBumpAPi, 
        bluecoreProductWaitlist, trackBluecoreLaunchWaitlistEvent, waitlistPdpStore, launchProductWaitlist, ProductSettings, preOrderSetting, data, formatMoney, waitlistPdp, store, 
        generalSetting, addToCart, trackEvent, trackBluecoreEvent,
        strapiAutomateHardcode, checkHardcodedImages, checkHardcodedTitles,
        checkHardcodedVariant, checkHardcodedTagline, checkHardcodedFaq,
        checkHardcodedHowToUse, BenefitIngredient, HowToUse, Faq, FragranceNotes, buildProductCardModel
    } = props;
    const [activeTab, setActiveTab] = useState(0);
    const [productTab, setProductTab] = useState(0);
    const [resultTab, setResultTab] = useState(0);

    // const [productEmbla, setProductEmbla] = useState({});

    // const isDesktopQuery = useMediaQuery('(min-width: 769px)');
    const [width, height] = useWindowSize();
    const [isDesktop, setIsDesktop] = useState(true);
    const { ConditionalWrap } = props;
    const options: EmblaOptionsType = {
        loop: true,
        align: 'start',
        breakpoints: {
            '(min-width: 992px)': {
                watchDrag: false,
                duration: 40,
            }
        }
    }

    const optionsResults: EmblaOptionsType = {
        align: 'start',
        loop: false,
        breakpoints: {
            '(min-width: 992px)': {
                watchDrag: false,
                duration: 40,
            }
        }
    };

    const [openIndex, setOpenIndex] = useState(0);

    const onClick = async (id:any) => {
		const afterClick = () => {
			const scrollDiv = globalThis.document.getElementById(`accordionSimple`).offsetTop + 41;
			globalThis.window.scrollTo({ top: scrollDiv - 100, behavior: 'smooth'});
		}

        let openIndexId = id;
        if (id === openIndex) {
            openIndexId = -1;
        }
        await setOpenIndex(openIndexId);
        afterClick();
	}

    const resultCarousels = {
        emblaResult0: useEmblaCarousel(optionsResults),
        emblaResult1: useEmblaCarousel(optionsResults),
        emblaResult2: useEmblaCarousel(optionsResults),
        emblaResult3: useEmblaCarousel(optionsResults),
        emblaResult4: useEmblaCarousel(optionsResults),
        prev0: useRef(null),
        prev1: useRef(null),
        prev2: useRef(null),
        prev3: useRef(null),
        prev4: useRef(null),
        next0: useRef(null),
        next1: useRef(null),
        next2: useRef(null),
        next3: useRef(null),
        next4: useRef(null),
    };

    const { selected: selected0 } = useSelectedSnapDisplay(resultCarousels[`emblaResult0`][1]);
    const { selected: selected1 } = useSelectedSnapDisplay(resultCarousels[`emblaResult1`][1]);
    const { selected: selected2 } = useSelectedSnapDisplay(resultCarousels[`emblaResult2`][1]);
    const { selected: selected3 } = useSelectedSnapDisplay(resultCarousels[`emblaResult3`][1]);

    const VISIBLE_IN_SCREEN = 4;

    const checkingResultNavButton = (selectedIndex, prevEl, nextEl) => {
        if (selectedIndex !== 0) prevEl.current?.classList.remove('hidden');
        else prevEl.current?.classList.add('hidden');
        
        if ((VISIBLE_IN_SCREEN + selectedIndex) >= (data?.result?.rows.length)) nextEl.current?.classList.add('hidden');
        else nextEl.current?.classList.remove('hidden');
    };

    useEffect(() => checkingResultNavButton(selected0, resultCarousels.prev0, resultCarousels.next0), [selected0]);
    
    useEffect(() => checkingResultNavButton(selected1, resultCarousels.prev1, resultCarousels.next1), [selected1]);

    useEffect(() => checkingResultNavButton(selected2, resultCarousels.prev2, resultCarousels.next2), [selected2]);

    useEffect(() => checkingResultNavButton(selected3, resultCarousels.prev3, resultCarousels.next3), [selected3]);

    const productCarousels = {
        embla0: useEmblaCarousel(options),
        embla1: useEmblaCarousel(options),
        embla2: useEmblaCarousel(options),
        embla3: useEmblaCarousel(options),
        embla4: useEmblaCarousel(options),
        embla5: useEmblaCarousel(options),
        embla6: useEmblaCarousel(options),
        embla7: useEmblaCarousel(options),
        embla8: useEmblaCarousel(options),
    }
    // const productTabs = data.product?.products?.sort((a, b) => a.rowId - b.rowId);

    const [waitlistData, setWaitlistData] = useState({
        open: false,
        title: '',
        image: '',
        handle: undefined,
		date: '',
    });

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

    const [productData, setProductData] = useState({
        open: false,
        handle: null,
        selectedVariant: null,
        tab: null,
        swatch: null
    });

    useEffect(() => {
        // console.log('modal detail open', productData.open);
        if (productData.open) document.body.classList.add('!overflow-hidden');
        else document.body.classList.remove('!overflow-hidden');
    }, [productData.open])
    
    // const RESULT_VIDEOS_ALL = [{
    //     title: 'Like A Virgin',
    //     data: data.result?.rows?.filter((row) => row.checked1) || [],
    // }, {
    //     title: 'Boost Therapy',
    //     data: data.result?.rows?.filter((row) => row.checked4) || [],
    // }, {
    //     title: 'Bond Therapy',
    //     data: data.result?.rows?.filter((row) => row.checked5) || [],
    // }, {
    //     title: 'Sweet Repair',
    //     data: data.result?.rows?.filter((row) => row.checked3) || [],
    // }, {
    //     title: 'Youth Revive',
    //     data: data.result?.rows?.filter((row) => row.checked2) || [],
    // }]

    // console.log('data.product.rows', data.product);

    const CATEGORY_LABELS = {
        checked1: 'Like A Virgin',
        checked2: 'Youth Revive',
        checked3: 'Sweet Repair',
        checked4: 'Boost Therapy',
        checked5: 'Bond Therapy',
    };

    const DEFAULT_CATEGORY_ORDER = ['checked1', 'checked2', 'checked3', 'checked4', 'checked5'];

    const categoryOrder = data?.result?.category_order || DEFAULT_CATEGORY_ORDER;

    const RESULT_VIDEOS_ALL = categoryOrder.map((key) => ({
        title: CATEGORY_LABELS[key],
        data: data.result?.rows?.filter((row) => row[key]) || [],
    }));

    const sortByAvailability = (itemArray: any) => {
        const availableItems = itemArray?.filter((v) => v.availableForSale) || [];
        const oosItems = itemArray?.filter((v) => !v.availableForSale) || [];
        const productUnavailable = [];
        [...availableItems, ...oosItems].forEach((obj) => {
            if (!obj.availableForSale) {
                productUnavailable.push(obj);
            }
        });
        return [...availableItems, ...productUnavailable];
    };

    return (
        <>
            {(!data.banner.image_d || !data.banner.image_m) && (
                <div className="flex justify-center w-full mt-2 lg:mt-3">
					<div className="spinner-border" role="status" aria-hidden="true" />
				</div>
            )}
            {data.banner && (
                <figure className="w-full relative items-center px-0 mb-0 lg:flex lg:flex-wrap">
                    {data.banner.image_d && data.banner.image_m && (
                        <picture className={``}>
                            <source srcSet={data.banner.image_d?.url} media="(min-width: 992px)" />
                            <img src={data.banner.image_m?.url.replace('public', '540x')} className="w-full" alt="Hair Concern Solution Banner" width="375" height="200" fetchPriority="high"/>
                        </picture>
                    )}
                    <figcaption className="absolute top-[50%] max-w-[55%] -translate-y-[50%] left-g lg:w-1/2 lg:scroll-ml-1 lg:left-[calc(((100%-960px)/2)+(15px))]">
                        <h1 className="text-xl mb-[.5rem] lg:text-2xl"
                            dangerouslySetInnerHTML={{
                                __html: data.banner.title,
                            }}
                        />
                        <p className="text-sm lg:text-base"
                            dangerouslySetInnerHTML={{
                                __html: data.banner.description,
                            }}
                        />
                    </figcaption>
                </figure>
            )}

            {data.range && (
                <section className="mt-3 mb-3 lg:mt-5 lg:mb-5">
                    <div className="container">
                        <h2 className="text-center text-xl mb-g lg:mb-3 lg:text-2xl"
                            dangerouslySetInnerHTML={{
                                __html: data.range.title,
                            }}
                        />
                        <div className="product__carousel-nav-container hidden lg:flex lg:justify-center lg:items-center container lg:px-g">
                            <ul className="product__carousel-nav list-style-none mx-auto lg:mx-0 flex flex-wrap border-b-0 text-center pb-g lg:pb-3 justify-start px-hg lg:px-0">
                                {data.range.rows && data.range.rows.length > 0 && data.range.rows.map((row, index) => (
                                    <li key={`nav-range-${index}`}><TabNav className={`${activeTab === index ? 'text-body' : ''} lg:h-[40px]`} title={row.tab_title} active={activeTab === index} onNavChange={() => setActiveTab(index)} ctaBgColor={generalSetting?.bfcm_cta_bg_color} /></li>    
                                ))}
                            </ul>
                        </div>
                    </div>
                    <ConditionalWrap
                        condition={isDesktop}
                        wrap={children => <div className="lg:px-0 text-center">{children}</div>}
                        elseWrap={children => <div className="bg-gray-400 px-g border-t-0 border-b-0 md:border-t md:border-b border-gray-500 accordion w-full accordion-flush" id="accordionSimple">{children}</div>}
                    >
                        {data.range.rows && data.range.rows.length > 0 && data.range.rows.map((row, index) => (
                            <ConditionalWrap
                                key={`concern-tab-content-${index}`}
                                condition={isDesktop}
                                wrap={children => <TabContent active={activeTab === index}>{children}</TabContent>}
                                elseWrap={children => (
                                    <div className={`accordion-item border-t border-b border-gray-500`}>
                                        <div id={`accordion-${index}`} className={`cursor-pointer flex w-full justify-between items-center ${openIndex === index ? `pt-3 md:pt-[1.875rem] pb-3` : 'py-3 md:py-[1.875rem]'} ${openIndex === index ? 'border-gray-500 accordion-opened' : ''}`} onClick={() => onClick(index)}>
                                            <strong className="text-body no-underline leading-[17px]">{row.title}</strong>
                                            { openIndex === index && <MinusIcon className={`transform transition-transform h-[.75em] w-[.75em] mb-[3px]`}/> }
                                            { openIndex !== index && <PlusIcon className={`transform transition-transform h-[.75em] w-[.75em] mb-[3px]`}/> }
                                        </div>
                                        <div className={`accordion-content ${openIndex === index ? 'accordion-content--open' : 'accordion-content--close'}`}>
                                            {children}
                                        </div>
                                    </div>
                                )}
                            >
                                <ProductBanner
                                    mainClasses={'product__banner--hair-concerns-solutions'}
                                    background="bg-gray-400 lg:bg-gray-100"
                                    reverse={true}
                                    pictureClasses={'pt-0 lg:pt-[56%]'}
                                    imageClasses={'lg:embed-responsive-item lg:object-cover rounded-[.5rem] lg:rounded-[0]'}
                                    textContentClasses={'lg:grid-cols-[1fr_repeat(8,_[_col-start_]_minmax(0,_70px))] lg:!pl-0 lg:!pb-[1rem] !px-0'}
                                    textContentBoxClasses={'lg:col-start-[col-start_2] lg:col-end-[span_5] mb-0 lg:text-start'}
                                    src={row.image_m.url}
                                    srcSet={row.image_d.url}
                                >
                                    <h3 className="h1 mb-2 lg:mb-[1.5rem] hidden lg:block">{row.title}</h3>
                                    <p className="mb-1 text-sm">{row.content}</p>
                                    <p className="text-sm"
                                        dangerouslySetInnerHTML={{
                                            __html: row.ideal_for,
                                        }}
                                    />
                                    <a href={row.cta_url} className={`mt-[1rem] inline-block lg:mt-[1.5rem] btn lg:btn-lg ${generalSetting?.bfcm_cta_bg_color === 'bg-dark' ? 'border-dark text-dark hover:bg-dark hover:text-white' : 'btn-outline-primary' } rounded-full no-underline hover:no-underline font-bold mb-1`}>{row.cta_label}</a>
                                </ProductBanner>
                            </ConditionalWrap>
                        ))}
                    </ConditionalWrap>
                </section>
            )}

            {data.product && data.product.rows && data.product.rows.length > 0 && (
                <section className="my-3 lg:mt-5">
                    <div className="container px-0 lg:px-g">
                        <h3 className="text-center text-xl mb-g lg:mb-3 lg:text-2xl" dangerouslySetInnerHTML={{
                            __html: data.product.title
                        }} />
                        <div className="product__carousel-nav-container flex lg:justify-between lg:items-center container px-0">
                            <ul className={`product__carousel-nav list-style-none mx-auto lg:mx-0 flex flex-nowrap lg:flex-nowrap border-b-0 text-center justify-start px-g lg:px-0 lg:w-5/6 lg:basis-5/6 ${data.product.rows && data.product.rows.length > 7 ? 'overflow-x-scroll hide-scrollbar lg:overflow-x-scroll' : ''}`}>
                                {data.product.rows && data.product.rows.length > 0 && data.product.rows.map((row, index) => (
                                    <li key={`hair-concern-product-nav-${index}`}><TabNav className={`${productTab === index ? 'text-body' : ''} whitespace-nowrap lg:h-[40px]`} title={row.title} active={productTab === index} onNavChange={() => setProductTab(index)} ctaBgColor={generalSetting?.bfcm_cta_bg_color} /></li>
                                ))}
                            </ul>
                            <a href={`/collections/${data.product.rows[productTab].coll_handle}`} className={`hidden lg:w-[168px] lg:basis-[168px] lg:px-g lg:py-[.875rem] lg:inline-block lg:btn lg:btn-lg ${generalSetting?.bfcm_cta_bg_color === 'bg-dark' ? 'border-dark text-dark hover:bg-dark hover:text-white' : 'lg:btn-outline-primary' } lg:rounded-full underline lg:no-underline hover:no-underline font-bold lg:ml-g`}>Shop All</a>
                        </div>
                        
                        <div className="pt-g pb-[.5rem] lg:pb-0 lg:pt-3">
                            {data.product.rows && data.product.rows.length > 0 && data.product.rows.map((tabRow, index) => {
                                // const e = useEmblaCarousel(options)
                                
                                return (
                                    <TabContent active={productTab === index} key={`tab-prooduct-content-${index}`}>
                                        <ConditionalWrap
                                            condition={isDesktop}
                                            wrap={children => <div className="flex flex-wrap items-center justify-center lg:-mx-g grid lg:grid-cols-[25%_75%]">{children}</div>}
                                            elseWrap={children => children}
                                        >
                                            <div className="w-full px-g mb-g lg:mb-0">
                                                <picture className="block">
                                                    <source srcSet={tabRow.image_d.url} media="(min-width: 992px)" />
                                                    <img src={tabRow.image_m.url} className="w-full rounded-[2rem] lg:h-full" alt="Hair Concern Solution Product Banner" />
                                                </picture>
                                            </div>

                                            <Carousel.Wrapper emblaApi={productCarousels[`embla${index}`][1]} className="carousel__products">
                                                <Carousel.Inner innerClass="px-[9px] lg:px-0" emblaRef={productCarousels[`embla${index}`][0]}>
                                                    {tabRow.products && tabRow.products.length > 0 && sortByAvailability(tabRow.products).map((item: any, index: number) => {
                                                        return <ProductCard
                                                            key={`${activeTab}-${item.id}-${index}`}
                                                            keyName={`${activeTab}-${item.id}-${index}`}
                                                            product={item}
                                                            className="relative mb-0 lg:mb-0 flex-grow-0 flex-shrink-0 flex flex-col w-[172px] basis-[172px] md:w-1/3 md:basis-1/3 px-[.375rem] lg:px-g text-center"
                                                            button={true}
                                                            smSingleStar={false}
                                                            carousel={true}
                                                            homePage={false}
                                                            setWaitlistData={setWaitlistData}
                                                            addToCart={addToCart}
                                                            trackEvent={trackEvent}
                                                            preOrders={preOrderSetting}
                                                            generalSetting={generalSetting}
                                                            store={store}
                                                            customProductTitle={null}
                                                            hideUnderline={true}
                                                            setProductData={setProductData}
                                                            clickShowPopup={true}
                                                        />
                                                    })}
                                                </Carousel.Inner>
                                                <Carousel.Navigation>
                                                    <PrevButton
                                                        onClick={() => productCarousels[`embla${index}`][1].scrollPrev() }
                                                        className="lg:w-auto lg:h-full hidden lg:flex lg:items-center lg:justify-center"
                                                    >
                                                        <span className="absolute z-[-1] flex justify-center items-center lg:!top-auto">
                                                            <ChevronPrev className="svg--current-color" />
                                                        </span>
                                                    </PrevButton>
                                                    <NextButton
                                                        onClick={() => productCarousels[`embla${index}`][1].scrollNext() }
                                                        className="lg:w-auto lg:h-full hidden lg:flex lg:items-center lg:justify-center"
                                                    >
                                                        <span className="absolute z-[-1] flex justify-center items-center lg:!top-auto">
                                                            <ChevronNext className="svg--current-color" />
                                                        </span>
                                                    </NextButton>
                                                </Carousel.Navigation>
                                            </Carousel.Wrapper>
                                        </ConditionalWrap>
                                    </TabContent>
                                )
                            })}
                        </div>
                        <div className="text-center">
                            <a href={`/collections/${data.product.rows[productTab].coll_handle}`} className={`inline-block lg:hidden btn btn-lg ${generalSetting?.bfcm_cta_bg_color === 'bg-dark' ? 'border-dark text-dark hover:bg-dark hover:text-white' : 'btn-outline-primary' } rounded-full no-underline hover:no-underline border-[2px] font-bold mt-g`}>Shop All</a>
                        </div>
                    </div>
                    <Modal contentClass={'flex-1 rounded-[.5rem]'} className="modal__mini-pdp modal-lg lg:max-w-[1070px] modal-dialog-centered lg:items-center" isOpen={productData.open} handleClose={() => setProductData({...productData, ...{ open: false }})}>
                        <ProductInfo
                            getActiveWL={getActiveWL}
                            getId={getId}
                            waitlistPdpStore={waitlistPdpStore}
                            launchProductWaitlist={launchProductWaitlist}
                            generalSetting={generalSetting}
                            strapiAutomateHardcode={strapiAutomateHardcode}
                            checkHardcodedImages={checkHardcodedImages}
                            checkHardcodedTitles={checkHardcodedTitles}
                            checkHardcodedVariant={checkHardcodedVariant}
                            checkHardcodedTagline={checkHardcodedTagline}
                            checkHardcodedFaq={checkHardcodedFaq}
                            checkHardcodedHowToUse={checkHardcodedHowToUse}
                            ProductSettings={ProductSettings}
                            BenefitIngredient={BenefitIngredient}
                            HowToUse={HowToUse}
                            Faq={Faq}
                            FragranceNotes={FragranceNotes}
                            store={store}
                            data={productData}
                            setTab1Selected={() => null}
                            tab1Selected={[]}
                            setTab0Selected={() => null}
                            tab0Selected={[]}
                            activeTab={activeTab}
                            maxItem={5}
                            buildProductCardModel={buildProductCardModel}
                            // useMediaQuery={useMediaQuery}
                            directAddToCart={true}
                            addToCart={addToCart}
                            fbqEvent={fbqEvent} tiktokSubscribe={tiktokSubscribe} 
                            subscribeBluecoreWaitlist={subscribeBluecoreWaitlist}
                            submitsToSmsBumpAPi={submitsToSmsBumpAPi} 
                            bluecoreProductWaitlist={bluecoreProductWaitlist}
                            trackBluecoreLaunchWaitlistEvent={trackBluecoreLaunchWaitlistEvent}
                            handleClose={() => setProductData({...productData, ...{ open: false }})} />
                    </Modal>
                </section>
            )}

            {data.product?.rows?.[productTab]?.compare && (
                <section className="lg:mb-5">
                    {data.product.rows[productTab].compare?.image_right?.url ? (
                        <ProductBanner
                            background="bg-pink-light"
                            reverse={false}
                            contentData={{
                                first_image: data.product.rows[productTab].compare?.image_left,
                                second_image: data.product.rows[productTab].compare?.image_right,
                            }}
                            src={data.product.rows[productTab].compare?.image_right?.url}
                            rightArrowClasses="p-hg ml-1 lg:p-[11.5px]"
                            leftArrowClasses="p-hg mr-1 lg:p-[11.5px]"
                            svgClasses="!h-[16.97px]"
                        >
                            <h4 className="text-lg lg:text-2xl mb-2 lg:mb-4 lg:font-bold">
                                {data.product.rows[productTab].compare?.title}
                            </h4>
                            <p className="font-bold mb-[.25rem]">
                                {data.product.rows[productTab].compare?.subtitle}
                            </p>
                            <p>{data.product.rows[productTab].compare?.description}</p>
                        </ProductBanner>
                    ) : (
                        <div className="flex justify-center w-full">
                            <div className="spinner-border" role="status" aria-hidden="true" />
                        </div>
                    )}
                </section>
            )}

            {/* {data.compare && (
                <section className="lg:mb-5">
                    {/* {!data.compare?.image_right?.url && (
                        <div className="flex justify-center w-full">
							<div className="spinner-border" role="status" aria-hidden="true" />
						</div>
                    )}
                    {data.compare?.image_right?.url && (
                        <ProductBanner
                            background="bg-pink-light"
                            reverse={false}
                            contentData={{
                                first_image: data.compare?.image_left,
                                second_image: data.compare?.image_right
                            }}
                            src={data.compare?.image_right?.url}
                            rightArrowClasses={'p-hg ml-1 lg:p-[11.5px]'}
                            leftArrowClasses={'p-hg mr-1 lg:p-[11.5px]'}
                            svgClasses={'!h-[16.97px]'}
                        >
                            <h4 className="text-lg lg:text-2xl mb-2 lg:mb-4 lg:font-bold">{data.compare.title}</h4>
                            <p className="font-bold mb-[.25rem]">{data.compare.subtitle}</p>
                            <p>{data.compare.description}</p>
                        </ProductBanner>
                    )}
                </section>
            )} */}

            {data.result && (
                <section className="my-3 lg:mb-5 lg:mt-5 container px-0">
                    <h5 className="text-xl lg:text-2xl mb-g font-bold text-center">{data.result.title}</h5>
                    <div className="product__carousel-nav-container flex lg:justify-between lg:items-center container px-0 pb-[1rem] lg:pb-3 lg:px-g">
                        <ul className="product__carousel-nav list-style-none mx-auto lg:mx-0 flex flex-nowrap overflow-scroll lg:overflow-hidden hide-scrollbar lg:flex-wrap border-b-0 text-center justify-start px-g lg:px-0">
                            {RESULT_VIDEOS_ALL.length > 0 && RESULT_VIDEOS_ALL.map((row, index) => (
                                <li key={`result-nav-${index}`}><TabNav className={`${resultTab === index ? 'text-body' : ''} whitespace-nowrap lg:h-[40px]`} title={row.title} active={resultTab === index} onNavChange={() => setResultTab(index)} ctaBgColor={generalSetting?.bfcm_cta_bg_color} /></li>
                            ))}
                        </ul>
                        <a href={data.result.cta_url} className={`hidden lg:inline-block lg:btn lg:btn-lg ${generalSetting?.bfcm_cta_bg_color === 'bg-dark' ? 'border-dark text-dark hover:bg-dark hover:text-white' : 'lg:btn-outline-primary' } lg:rounded-full underline lg:no-underline hover:no-underline font-bold`}>{data.result.cta_label}</a>
                    </div>
                    {RESULT_VIDEOS_ALL.length > 0 && RESULT_VIDEOS_ALL.map((row, index) => (
                        <TabContent key={`result-tab-content-${index}`} className="lg:px-g" active={resultTab === index}>
                            <Carousel.Wrapper emblaApi={resultCarousels[`emblaResult${index}`][1]} className="carousel__products">
                                <Carousel.Inner innerClass="px-g" emblaRef={resultCarousels[`emblaResult${index}`][0]} className="lg:-mx-g">
                                    {row.data.length > 0 && row.data.map((data: any, i: number) => (
                                        <VideoUpsellCard
                                            key={`all-${data.item_id}-${i}`}
                                            classes="instagram-reels__card flex-grow-0 flex-shrink-0 w-[83.5%] basis-[83.5%] lg:w-1/4 lg:basis-1/4 mb-0 px-[.25rem]"
                                            videoUrl={data.video_url}
                                            author={data.title}
                                            url={data.url}
                                            index={i}
                                            product={data.product}
                                            generalSetting={generalSetting}
                                            addToCart={addToCart}
                                            trackEvent={trackEvent}
                                            store={store}
                                            formatMoney={formatMoney}
                                        />
                                    ))}
                                </Carousel.Inner>
                                {row.data.length > 4 && (
                                    <Carousel.Navigation>
                                        <PrevButton
                                            onClick={() => resultCarousels[`emblaResult${index}`][1].scrollPrev() }
                                            className="lg:w-auto lg:h-full hidden lg:flex lg:items-center lg:justify-center lg:-ml-2"
                                        >
                                            <span ref={resultCarousels[`prev${index}`]} className="hidden absolute z-[1] flex justify-center items-center lg:!top-auto">
                                                <ChevronPrev className="svg--current-color" />
                                            </span>
                                        </PrevButton>
                                            
                                        <NextButton
                                            onClick={() => resultCarousels[`emblaResult${index}`][1].scrollNext() }
                                            className="lg:w-auto lg:h-full hidden lg:flex lg:items-center lg:justify-center lg:-mr-2"
                                        >
                                            <span ref={resultCarousels[`next${index}`]} className="absolute z-[1] flex justify-center items-center lg:!top-auto">
                                                <ChevronNext className="svg--current-color" />
                                            </span>
                                        </NextButton>
                                    </Carousel.Navigation>
                                )}
                                
                            </Carousel.Wrapper>
                            {row.data.length > 4 && (
                                <div className="px-g lg:px-[.25rem]">
                                    <CarouselScrollbar
                                        emblaApi={resultCarousels[`emblaResult${index}`][1]}
                                        scrollSnaps={resultCarousels[`emblaResult${index}`][1]?.scrollSnapList()}
                                        className="py-2 lg:py-g after:bg-gray-500 after:rounded-[2px]"
                                        prevArrow={resultCarousels[`prev${index}`]}
                                        nextArrow={resultCarousels[`next${index}`]}
                                        visibleInScreen={VISIBLE_IN_SCREEN}
                                        carouselItemLength={row.data.length}
                                    />
                                </div>
                            )}
                        </TabContent>
                    ))}
                    <div className="text-center lg:hidden mt-[.25rem]">
                        <a href="/pages/reviews" className="instagram-reels__button btn btn-lg btn-outline-primary rounded-full border-2 hover:no-underline px-[4em] py-[.8125em] inline-block">
                            See All
                        </a>
                    </div>
                </section>
            )}
            <Modal className="modal-lg lg:max-w-[43.125rem] modal-dialog-centered" isOpen={waitlistData.open} handleClose={() => setWaitlistData({...waitlistData, ...{ open: false }})}>
                <ModalWaitlist waitlistPdp={waitlistPdp} store={store} data={waitlistData} trackBluecoreEvent={trackBluecoreEvent} handleClose={() => setWaitlistData({...waitlistData, open: false })} />
        	</Modal>
        </>
    );
};

export default HairSolution;