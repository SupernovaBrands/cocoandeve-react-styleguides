import { EmblaOptionsType } from 'embla-carousel';
import { useEffect, useState } from 'react';
import TabNav from '~/components/TabNav';
import TabContent from '~/components/TabContent';
import ProductBanner from '~/compounds/ProductBanner';
import useMediaQuery from '~/hooks/useMediaQuery';
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
import { PRODUCTS } from '~/modules/dummy_products';
import { VIDEOS } from '~/modules/dummy_videos';
import VideoUpsellCard from '~/components/VideoUpsellCard';
import Modal from "~/components/Modal";
import ModalWaitlist from "~/components/modal/Waitlist";

const HairSolution = (props: any) => {
    const { preOrderSetting, data, isLoading, waitlistPdp, store, generalSetting, addToCart, trackEvent, trackBluecoreEvent } = props;
    const [activeTab, setActiveTab] = useState(0);
    const [productTab, setProductTab] = useState(0);
    const [resultTab, setResultTab] = useState(0);

    // const [productEmbla, setProductEmbla] = useState({});

    const isDesktop = useMediaQuery('(min-width: 769px)');
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
        loop: true,
    };

    const [openIndex, setOpenIndex] = useState(-1);

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
    };

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

    // console.log('collectionProducts', data.product);

    return (
        <>
            {data.banner && (
                <figure className="w-full relative items-center px-0 mb-0 lg:flex lg:flex-wrap">
                    <picture className={``}>
                        <source srcSet={data.banner.image_d.url} media="(min-width: 992px)" />
                        <img src={data.banner.image_m.url.replace('public', '540x')} className="w-full" alt="Hair Concern Solution Banner" width="375" height="200" fetchPriority="high"/>
                    </picture>
                    <figcaption className="absolute top-[50%] max-w-[55%] -translate-y-[50%] left-g lg:w-1/2 lg:scroll-ml-1 lg:left-[calc(((100%-960px)/2)+(15px))] xl:left-[calc(((100%-1200px)/2)+(15px))]">
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
                <section className="my-3 lg:my-5">
                    <div className="container">
                        <h2 className="text-center text-xl mb-g lg:mb-3 lg:text-2xl">{data.range.title}</h2>
                        <div className="product__carousel-nav-container hidden lg:flex lg:justify-center lg:items-center container lg:px-g">
                            <ul className="product__carousel-nav list-style-none mx-auto lg:mx-0 flex flex-wrap border-b-0 text-center pb-g lg:pb-3 justify-start px-hg lg:px-0">
                                {data.range.rows && data.range.rows.length > 0 && data.range.rows.map((row, index) => (
                                    <li key={`nav-range-${index}`}><TabNav className={`${activeTab === index ? 'text-body' : ''} lg:h-[45px]`} title={row.tab_title} active={activeTab === index} onNavChange={() => setActiveTab(index)} /></li>    
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
                                            <strong className="text-body no-underline">{row.title}</strong>
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
                                    <a href={row.cta_url} className="mt-[1rem] inline-block lg:mt-[1.5rem] lg:btn lg:btn-lg lg:btn-outline-primary lg:rounded-full underline lg:no-underline hover:no-underline font-bold mb-1">{row.cta_label}</a>
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
                            <ul className="product__carousel-nav list-style-none mx-auto lg:mx-0 flex flex-nowrap overflow-x-scroll lg:overflow-x-scroll hide-scrollbar lg:flex-nowrap border-b-0 text-center justify-start px-g lg:px-0 lg:w-5/6 lg:basis-5/6">
                                {data.product.rows && data.product.rows.length > 0 && data.product.rows.map((row, index) => (
                                    <li key={`hair-concern-product-nav-${index}`}><TabNav className={`${productTab === index ? 'text-body' : ''} whitespace-nowrap lg:h-[45px]`} title={row.title} active={productTab === index} onNavChange={() => setProductTab(index)} /></li>
                                ))}
                            </ul>
                            <a href={data.product.cta_url} className="hidden lg:w-1/6 lg:basis-1/6 lg:inline-block lg:btn lg:btn-lg lg:btn-outline-primary lg:rounded-full underline lg:no-underline hover:no-underline font-bold lg:ml-g">{data.product.cta_label}</a>
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
                                                    {tabRow.products && tabRow.products.length > 0 && tabRow.products.map((item: any, index: number) => {
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
                            <a href="/collections/all" className="inline-block lg:hidden btn btn-lg btn-outline-primary rounded-full no-underline hover:no-underline border-[2px] font-bold mt-g">Shop All</a>
                        </div>
                    </div>
                </section>
            )}

            {data.compare && (
                <section className="lg:mb-5">
                    <ProductBanner
                        background="bg-pink-light"
                        reverse={false}
                        contentData={{
                            first_image: data.compare?.image_right,
                            second_image: data.compare?.image_left
                        }}
                        src={data.compare?.image_right?.url}
                    >
                        <h4 className="h1 mb-2 lg:mb-4">{data.compare.title}</h4>
                        <p className="font-bold mb-[.25rem]">{data.compare.subtitle}</p>
                        <p>{data.compare.description}</p>
                    </ProductBanner>
                </section>
            )}

            <section className="my-3 lg:my-5 container px-0">
                <h5 className="text-xl lg:text-2xl mb-g font-bold text-center">Real Results</h5>
                <div className="product__carousel-nav-container flex lg:justify-between lg:items-center container px-0 pb-[1rem] lg:pb-3 lg:px-g">
                    <ul className="product__carousel-nav list-style-none mx-auto lg:mx-0 flex flex-nowrap overflow-scroll lg:overflow-hidden hide-scrollbar lg:flex-wrap border-b-0 text-center justify-start px-g lg:px-0">
                        <li><TabNav className={`${resultTab === 0 ? 'text-body' : ''} whitespace-nowrap lg:h-[45px]`} title='Like A Virgin' active={resultTab === 0} onNavChange={() => setResultTab(0)} /></li>
                        <li><TabNav className={`${resultTab === 1 ? 'text-body' : ''} whitespace-nowrap lg:h-[45px]`} title='Pro Youth' active={resultTab === 1} onNavChange={() => setResultTab(1)} /></li>
                        <li><TabNav className={`${resultTab === 2 ? 'text-body' : ''} whitespace-nowrap lg:h-[45px]`} title='Sweet Repair' active={resultTab === 2} onNavChange={() => setResultTab(2)} /></li>
                        <li><TabNav className={`${resultTab === 3 ? 'text-body' : ''} whitespace-nowrap lg:h-[45px]`} title='Boost Therapy' active={resultTab === 3} onNavChange={() => setResultTab(3)} /></li>
                    </ul>
                    <a href="/collections/all" className="hidden lg:inline-block lg:btn lg:btn-lg lg:btn-outline-primary lg:rounded-full underline lg:no-underline hover:no-underline font-bold">See All</a>
                </div>
                <TabContent className="lg:px-g" active={resultTab === 0}>
                    <Carousel.Wrapper emblaApi={resultCarousels[`emblaResult0`][1]} className="carousel__products">
						<Carousel.Inner innerClass="px-g" emblaRef={resultCarousels[`emblaResult0`][0]} className="lg:-mx-g">
							{VIDEOS.map((data: any, i: number) => (
								<VideoUpsellCard
									key={`all-${data.item_id}-${i}`}
									classes="instagram-reels__card flex-grow-0 flex-shrink-0 w-[83.5%] basis-[83.5%] lg:w-1/4 lg:basis-1/4 mb-0 px-[.25rem]"
									videoUrl={data.review_url}
									author={data.username}
									product={data.product_link}
									url={data.url}
									index={i}
									title={data.title}
								/>
							))}
						</Carousel.Inner>
                        <Carousel.Navigation>
                            <PrevButton
                                onClick={() => resultCarousels[`emblaResult0`][1].scrollPrev() }
                                className="lg:w-auto lg:h-full hidden lg:flex lg:items-center lg:justify-center lg:-ml-2"
                            >
                                <span className="absolute z-[-1] flex justify-center items-center lg:!top-auto">
                                    <ChevronPrev className="svg--current-color" />
                                </span>
                            </PrevButton>
                                
                            <NextButton
                                onClick={() => resultCarousels[`emblaResult0`][1].scrollNext() }
                                className="lg:w-auto lg:h-full hidden lg:flex lg:items-center lg:justify-center lg:-mr-2"
                            >
                                <span className="absolute z-[-1] flex justify-center items-center lg:!top-auto">
                                    <ChevronNext className="svg--current-color" />
                                </span>
                            </NextButton>
                        </Carousel.Navigation>
					</Carousel.Wrapper>
                </TabContent>
                <TabContent className="lg:px-g" active={resultTab === 1}>Result tab 2</TabContent>
                <TabContent className="lg:px-g" active={resultTab === 2}>Result tab 3</TabContent>
                <TabContent className="lg:px-g" active={resultTab === 3}>Result tab 4</TabContent>
            </section>
            <Modal className="modal-lg lg:max-w-[43.125rem] modal-dialog-centered" isOpen={waitlistData.open} handleClose={() => setWaitlistData({...waitlistData, ...{ open: false }})}>
                <ModalWaitlist waitlistPdp={waitlistPdp} store={store} data={waitlistData} trackBluecoreEvent={trackBluecoreEvent} handleClose={() => setWaitlistData({...waitlistData, open: false })} />
        	</Modal>
        </>
    );
};

export default HairSolution;