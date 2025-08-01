import { EmblaOptionsType } from 'embla-carousel';
import { useState } from 'react';
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

const HairSolution = (props: any) => {
    const [activeTab, setActiveTab] = useState(0);
    const [productTab, setProductTab] = useState(0);
    const [resultTab, setResultTab] = useState(0);

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

    const [openIndex, setOpenIndex] = useState(-1);

    const onClick = async (id:any) => {
		const afterClick = () => {
			const scrollDiv = globalThis.document.getElementById(`accordionSimple`).offsetTop + 41;
			globalThis.window.scrollTo({ top: scrollDiv - 100, behavior: 'smooth'});
		}

		// props.onClick(id, afterClick);
        // console.log('');
        let openIndexId = id;
        if (id === openIndex) {
            openIndexId = -1;
        }
        await setOpenIndex(openIndexId);
        afterClick();
	}

    const [emblaRef2, emblaApi2] = useEmblaCarousel(options);

    const [emblaRef1, emblaApi1] = useEmblaCarousel({ align: 'start', ...options});

    return (
        <>
            <figure className="w-full relative items-center px-0 mb-0 lg:flex lg:flex-wrap">
                <picture className={``}>
                    <source srcSet="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/9c538654-30de-422f-8eac-bba23c3bc000/public" media="(min-width: 992px)" />
                    <img src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/217998c3-ed10-42fd-81ad-c37a69a44500/540x" className="w-full" alt="Hair Concern Solution Banner" width="375" height="200" fetchPriority="high"/>
                </picture>
                <figcaption className="absolute top-[50%] max-w-[55%] -translate-y-[50%] left-g lg:w-1/2 lg:scroll-ml-1 lg:left-[calc(((100%-960px)/2)+(15px))] xl:left-[calc(((100%-1200px)/2)+(15px))]">
                    <h1 className="text-xl mb-[.5rem] lg:text-2xl">Your Hair's <br className="lg:hidden" />New Best Friend!</h1>
                    <p className="text-sm lg:text-base">Pamper your hair with our exclusive, tailor-made hair care products <br className="hidden lg:block" />crafted for every hair type, texture, and need.</p>
                </figcaption>
            </figure>

            <section className="my-3 lg:my-5">
                <div className="container">
                    <h2 className="text-center text-xl mb-g lg:mb-3 lg:text-2xl">Discover Our Hair Care Range</h2>
                    <div className="product__carousel-nav-container hidden lg:flex lg:justify-center lg:items-center container lg:px-g">
                        <ul className="product__carousel-nav list-style-none mx-auto lg:mx-0 flex flex-wrap border-b-0 text-center pb-g lg:pb-3 justify-start px-hg lg:px-0">
                            <li><TabNav className={`${activeTab === 0 ? 'text-body' : ''} lg:h-[45px]`} title='Like A Virgin' active={activeTab === 0} onNavChange={() => setActiveTab(0)} /></li>
                            <li><TabNav className={`${activeTab === 1 ? 'text-body' : ''} lg:h-[45px]`} title='Pro Youth' active={activeTab === 1} onNavChange={() => setActiveTab(1)} /></li>
                            <li><TabNav className={`${activeTab === 2 ? 'text-body' : ''} lg:h-[45px]`} title='Sweet Repair' active={activeTab === 2} onNavChange={() => setActiveTab(2)} /></li>
                            <li><TabNav className={`${activeTab === 3 ? 'text-body' : ''} lg:h-[45px]`} title='Boost Therapy' active={activeTab === 3} onNavChange={() => setActiveTab(3)} /></li>
                        </ul>
                    </div>
                </div>
                <ConditionalWrap
                    condition={isDesktop}
                    wrap={children => <div className="lg:px-0 text-center">{children}</div>}
                    elseWrap={children => <div className="bg-gray-400 px-g border-t-0 border-b-0 md:border-t md:border-b border-gray-500 accordion w-full accordion-flush" id="accordionSimple">{children}</div>}
                >
                    <ConditionalWrap
                        condition={isDesktop}
                        wrap={children => <TabContent active={activeTab === 0}>{children}</TabContent>}
                        elseWrap={children => (
                            <div className={`accordion-item border-t border-b border-gray-500`}>
                                <div id={`accordion-${0}`} className={`cursor-pointer flex w-full justify-between items-center ${openIndex === 0 ? `pt-3 md:pt-[1.875rem] pb-3` : 'py-3 md:py-[1.875rem]'} ${openIndex === 0 ? 'border-gray-500 accordion-opened' : ''}`} onClick={() => onClick(0)}>
                                    <strong className="text-body no-underline">Like A Virgin</strong>
                                    { openIndex === 0 && <MinusIcon className={`transform transition-transform h-[.75em] w-[.75em] mb-[3px]`}/> }
                                    { openIndex !== 0 && <PlusIcon className={`transform transition-transform h-[.75em] w-[.75em] mb-[3px]`}/> }
                                </div>
                                <div className={`accordion-content ${openIndex === 0 ? 'accordion-content--open' : 'accordion-content--close'}`}>
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
                            src={'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/c2fd9616-f8a8-4722-de2a-ac79d2bbba00/public'}
                            srcSet={'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/2bcd85fe-31fe-4679-f525-52e8ddba4c00/public'}
                        >
                            <h3 className="h1 mb-2 lg:mb-[1.5rem] hidden lg:block">Like A Virgin</h3>
                            <p className="mb-1 text-sm">Reset your hair to its purest state. This ultra-nourishing range gently cleanses, detangles, and restores softness—like a fresh start for stressed strands.</p>
                            <p className="text-sm"><b>Ideal for:</b> First-time detox, post-chemical treatment, or sensitive scalps.</p>
                            <a href="/collections/all" className="mt-[1rem] inline-block lg:mt-[1.5rem] lg:btn lg:btn-lg lg:btn-outline-primary lg:rounded-full underline lg:no-underline hover:no-underline font-bold mb-1">Shop all</a>
                        </ProductBanner>
                    </ConditionalWrap>
                    <ConditionalWrap
                        condition={isDesktop}
                        wrap={children => <TabContent active={activeTab === 1}>{children}</TabContent>}
                        elseWrap={children => (
                            <div className={`accordion-item border-t border-b border-gray-500`}>
                                <div id={`accordion-${1}`} className={`cursor-pointer flex w-full justify-between items-center ${openIndex === 1 ? `pt-3 md:pt-[1.875rem] pb-3` : 'py-3 md:py-[1.875rem]'} ${openIndex === 1 ? 'border-gray-500 accordion-opened' : ''}`} onClick={() => onClick(1)}>
                                    <strong className="text-body no-underline">Pro Youth</strong>
                                    { openIndex === 1 && <MinusIcon className={`transform transition-transform h-[.75em] w-[.75em] mb-[3px]`}/> }
                                    { openIndex !== 1 && <PlusIcon className={`transform transition-transform h-[.75em] w-[.75em] mb-[3px]`}/> }
                                </div>
                                <div className={`accordion-content ${openIndex === 1 ? 'accordion-content--open' : 'accordion-content--close'}`}>
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
                            src={'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/c2fd9616-f8a8-4722-de2a-ac79d2bbba00/public'}
                            srcSet={'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/2bcd85fe-31fe-4679-f525-52e8ddba4c00/public'}
                        >
                            <h3 className="h1 mb-2 lg:mb-[1.5rem] hidden lg:block">Pro Youth</h3>
                            <p className="mb-1 text-sm">Reset your hair to its purest state. This ultra-nourishing range gently cleanses, detangles, and restores softness—like a fresh start for stressed strands.</p>
                            <p className="text-sm"><b>Ideal for:</b> First-time detox, post-chemical treatment, or sensitive scalps.</p>
                            <a href="/collections/all" className="mt-[1rem] inline-block lg:mt-[1.5rem] lg:btn lg:btn-lg lg:btn-outline-primary lg:rounded-full underline lg:no-underline hover:no-underline font-bold mb-1">Shop all</a>
                        </ProductBanner>
                    </ConditionalWrap>
                    <ConditionalWrap
                        condition={isDesktop}
                        wrap={children => <TabContent active={activeTab === 2}>{children}</TabContent>}
                        elseWrap={children => (
                            <div className={`accordion-item border-t border-b border-gray-500`}>
                                <div id={`accordion-${2}`} className={`cursor-pointer flex w-full justify-between items-center ${openIndex === 2 ? `pt-3 md:pt-[1.875rem] pb-3` : 'py-3 md:py-[1.875rem]'} ${openIndex === 2 ? 'border-gray-500 accordion-opened' : ''}`} onClick={() => onClick(2)}>
                                    <strong className="text-body no-underline">Sweet Repair</strong>
                                    { openIndex === 2 && <MinusIcon className={`transform transition-transform h-[.75em] w-[.75em] mb-[3px]`}/> }
                                    { openIndex !== 2 && <PlusIcon className={`transform transition-transform h-[.75em] w-[.75em] mb-[3px]`}/> }
                                </div>
                                <div className={`accordion-content ${openIndex === 2 ? 'accordion-content--open' : 'accordion-content--close'}`}>
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
                            src={'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/c2fd9616-f8a8-4722-de2a-ac79d2bbba00/public'}
                            srcSet={'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/2bcd85fe-31fe-4679-f525-52e8ddba4c00/public'}
                        >
                            <h3 className="h1 mb-2 lg:mb-[1.5rem] hidden lg:block">Sweet Repair</h3>
                            <p className="mb-1 text-sm">Reset your hair to its purest state. This ultra-nourishing range gently cleanses, detangles, and restores softness—like a fresh start for stressed strands.</p>
                            <p className="text-sm"><b>Ideal for:</b> First-time detox, post-chemical treatment, or sensitive scalps.</p>
                            <a href="/collections/all" className="mt-[1rem] inline-block lg:mt-[1.5rem] lg:btn lg:btn-lg lg:btn-outline-primary lg:rounded-full underline lg:no-underline hover:no-underline font-bold mb-1">Shop all</a>
                        </ProductBanner>
                    </ConditionalWrap>
                    <ConditionalWrap
                        condition={isDesktop}
                        wrap={children => <TabContent active={activeTab === 3}>{children}</TabContent>}
                        elseWrap={children => (
                            <div className={`accordion-item border-t border-b border-gray-500`}>
                                <div id={`accordion-${3}`} className={`cursor-pointer flex w-full justify-between items-center ${openIndex === 3 ? `pt-3 md:pt-[1.875rem] pb-3` : 'py-3 md:py-[1.875rem]'} ${openIndex === 3 ? 'border-gray-500 accordion-opened' : ''}`} onClick={() => onClick(3)}>
                                    <strong className="text-body no-underline">Boost Therapy</strong>
                                    { openIndex === 3 && <MinusIcon className={`transform transition-transform h-[.75em] w-[.75em] mb-[3px]`}/> }
                                    { openIndex !== 3 && <PlusIcon className={`transform transition-transform h-[.75em] w-[.75em] mb-[3px]`}/> }
                                </div>
                                <div className={`accordion-content ${openIndex === 3 ? 'accordion-content--open' : 'accordion-content--close'}`}>
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
                            src={'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/c2fd9616-f8a8-4722-de2a-ac79d2bbba00/public'}
                            srcSet={'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/2bcd85fe-31fe-4679-f525-52e8ddba4c00/public'}
                        >
                            <h3 className="h1 mb-2 lg:mb-[1.5rem] hidden lg:block">Boost Therapy</h3>
                            <p className="mb-1 text-sm">Reset your hair to its purest state. This ultra-nourishing range gently cleanses, detangles, and restores softness—like a fresh start for stressed strands.</p>
                            <p className="text-sm"><b>Ideal for:</b> First-time detox, post-chemical treatment, or sensitive scalps.</p>
                            <a href="/collections/all" className="mt-[1rem] inline-block lg:mt-[1.5rem] lg:btn lg:btn-lg lg:btn-outline-primary lg:rounded-full underline lg:no-underline hover:no-underline font-bold mb-1">Shop all</a>
                        </ProductBanner>
                    </ConditionalWrap>
                </ConditionalWrap>
            </section>

            <section className="my-3 lg:mt-5">
                <div className="container px-0 lg:px-g">
                    <h3 className="text-center text-xl mb-g lg:mb-3 lg:text-2xl">Don’t Know What <br className="lg:hidden" />Hair Care Range To Use?</h3>
                    <div className="product__carousel-nav-container flex lg:justify-between lg:items-center container px-0">
                        <ul className="product__carousel-nav list-style-none mx-auto lg:mx-0 flex flex-nowrap overflow-scroll lg:overflow-hidden hide-scrollbar lg:flex-wrap border-b-0 text-center justify-start px-g lg:px-0">
                            <li><TabNav className={`${productTab === 0 ? 'text-body' : ''} whitespace-nowrap lg:h-[45px]`} title='Damaged Hair' active={productTab === 0} onNavChange={() => setProductTab(0)} /></li>
                            <li><TabNav className={`${productTab === 1 ? 'text-body' : ''} whitespace-nowrap lg:h-[45px]`} title='Itchy Scalp' active={productTab === 1} onNavChange={() => setProductTab(1)} /></li>
                            <li><TabNav className={`${productTab === 2 ? 'text-body' : ''} whitespace-nowrap lg:h-[45px]`} title='Fine Hair' active={productTab === 2} onNavChange={() => setProductTab(2)} /></li>
                            <li><TabNav className={`${productTab === 3 ? 'text-body' : ''} whitespace-nowrap lg:h-[45px]`} title='Dry Hair' active={productTab === 3} onNavChange={() => setProductTab(3)} /></li>
                            <li><TabNav className={`${productTab === 4 ? 'text-body' : ''} whitespace-nowrap lg:h-[45px]`} title='Dull Hair' active={productTab === 4} onNavChange={() => setProductTab(4)} /></li>
                            <li><TabNav className={`${productTab === 5 ? 'text-body' : ''} whitespace-nowrap lg:h-[45px]`} title='Aging Hair' active={productTab === 5} onNavChange={() => setProductTab(5)} /></li>
                        </ul>
                        <a href="/collections/all" className="hidden lg:inline-block lg:btn lg:btn-lg lg:btn-outline-primary lg:rounded-full underline lg:no-underline hover:no-underline font-bold">Shop All</a>
                    </div>
                    
                    <div className="pt-g pb-[.5rem] lg:pb-0 lg:pt-3">
                        <TabContent active={productTab === 0}>
                            <ConditionalWrap
                                condition={isDesktop}
                                wrap={children => <div className="flex flex-wrap items-center justify-center lg:-mx-g grid lg:grid-cols-[25%_75%]">{children}</div>}
                                elseWrap={children => children}
                            >
                                <div className="w-full px-g mb-g lg:mb-0">
                                    <picture className="block">
                                        <source srcSet="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/1f2fed09-713b-4e67-d983-4dd6565c6600/public" media="(min-width: 992px)" />
                                        <img src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/56da51f4-f120-44e7-f926-c4e5271f7500/public" className="w-full rounded-[2rem] lg:h-full" alt="Hair Concern Solution Product Banner" />
                                    </picture>
                                </div>

                                <Carousel.Wrapper emblaApi={emblaApi2} className="carousel__products">
                                    <Carousel.Inner innerClass="px-[9px] lg:px-0" emblaRef={emblaRef2}>
                                        {PRODUCTS.map((item: any, index: number) => {
                                            return <ProductCard
                                                key={`${activeTab}-${item.id}-${index}`}
                                                keyName={`${activeTab}-${item.id}-${index}`}
                                                product={item}
                                                className="relative mb-0 lg:mb-0 flex-grow-0 flex-shrink-0 flex flex-col w-[172px] basis-[172px] md:w-1/3 md:basis-1/3 px-[.375rem] lg:px-g text-center"
                                                button={true}
                                                smSingleStar={false}
                                                carousel={true}
                                                homePage={false}
                                                setWaitlistData={() => {}}
                                                addToCart={() => {}}
                                                trackEvent={() => {}}
                                                preOrders={null}
                                                generalSetting={null}
                                                store={'dev'}
                                                customProductTitle={null}
                                            />
                                        })}
                                    </Carousel.Inner>
                                    <Carousel.Navigation>
                                        <PrevButton
                                            onClick={() => emblaApi2.scrollPrev() }
                                            className="lg:w-auto lg:h-full hidden lg:flex lg:items-center lg:justify-center"
                                        >
                                            <span className="absolute z-[-1] flex justify-center items-center lg:!top-auto">
                                                <ChevronPrev className="svg--current-color" />
                                            </span>
                                        </PrevButton>
                                        <NextButton
                                            onClick={() => emblaApi2.scrollNext() }
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
                        <TabContent active={productTab === 1}>Itchy Scalp content</TabContent>
                        <TabContent active={productTab === 2}>Fine Hair content</TabContent>
                        <TabContent active={productTab === 3}>Dry Hair content</TabContent>
                        <TabContent active={productTab === 4}>Dull Hair content</TabContent>
                        <TabContent active={productTab === 5}>Aging Hair content</TabContent>
                    </div>
                    <div className="text-center">
                        <a href="/collections/all" className="inline-block lg:hidden btn btn-lg btn-outline-primary rounded-full no-underline hover:no-underline border-[2px] font-bold mt-g">Shop All</a>
                    </div>
                </div>
            </section>

            <section className="lg:mb-5">
                <ProductBanner
                    background="bg-pink-light"
                    reverse={false}
                    contentData={{
                        first_image: {
                            url: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/78a2b1c7-f110-4c41-2e9e-ce525130c600/public'
                        },
                        second_image: {
                            url: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/31d688c8-5ee8-4f9e-8c4e-5133ea86a800/public'
                        }
                    }}
                    src={'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/2bcd85fe-31fe-4679-f525-52e8ddba4c00/1140x'}
                >
                    <h4 className="h1 mb-2 lg:mb-4">360 Damage Repair</h4>
                    <p>The Ultimate Daily Routine for Damaged Hair!</p>
                    <p>Sweet Repair is a targeted range to repair hair that is weakened by heat, styling, brushing & wear and tear. Scientifically formulated to deeply repair and restore.</p>
                </ProductBanner>
            </section>

            <section className="my-3 lg:my-5 container px-0 overflow-x-hidden">
                <h5 className="text-xl lg:text-2xl mb-g font-bold text-center">Real Results</h5>
                <div className="product__carousel-nav-container flex lg:justify-between lg:items-center container px-0 pb-[1rem] lg:pb-3">
                    <ul className="product__carousel-nav list-style-none mx-auto lg:mx-0 flex flex-nowrap overflow-scroll lg:overflow-hidden hide-scrollbar lg:flex-wrap border-b-0 text-center justify-start px-g lg:px-0">
                        <li><TabNav className={`${resultTab === 0 ? 'text-body' : ''} whitespace-nowrap lg:h-[45px]`} title='Like A Virgin' active={resultTab === 0} onNavChange={() => setResultTab(0)} /></li>
                        <li><TabNav className={`${resultTab === 1 ? 'text-body' : ''} whitespace-nowrap lg:h-[45px]`} title='Pro Youth' active={resultTab === 1} onNavChange={() => setResultTab(1)} /></li>
                        <li><TabNav className={`${resultTab === 2 ? 'text-body' : ''} whitespace-nowrap lg:h-[45px]`} title='Sweet Repair' active={resultTab === 2} onNavChange={() => setResultTab(2)} /></li>
                        <li><TabNav className={`${resultTab === 3 ? 'text-body' : ''} whitespace-nowrap lg:h-[45px]`} title='Boost Therapy' active={resultTab === 3} onNavChange={() => setResultTab(3)} /></li>
                    </ul>
                    <a href="/collections/all" className="hidden lg:inline-block lg:btn lg:btn-lg lg:btn-outline-primary lg:rounded-full underline lg:no-underline hover:no-underline font-bold">See All</a>
                </div>
                <TabContent className="" active={resultTab === 0}>
                    <Carousel.Wrapper emblaApi={emblaApi1} className="-mx-[.25rem] carousel__products">
						<Carousel.Inner innerClass="px-g" emblaRef={emblaRef1} className="lg:-mx-g">
							{VIDEOS.map((data: any, i: number) => (
								<VideoUpsellCard
									key={`all-${data.item_id}-${i}`}
									classes="instagram-reels__card flex-grow-0 flex-shrink-0 w-[83.5%] basis-[83.5%] lg:w-1/4 lg:basis-1/4 mb-0 px-[.25rem] lg:!transform-none"
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
                                onClick={() => emblaApi1.scrollPrev() }
                                className="lg:w-auto lg:h-full hidden lg:flex lg:items-center lg:justify-center"
                            >
                                <span className="absolute z-[-1] flex justify-center items-center lg:!top-auto">
                                    <ChevronPrev className="svg--current-color" />
                                </span>
                            </PrevButton>
                                
                            <NextButton
                                onClick={() => emblaApi1.scrollNext() }
                                className="lg:w-auto lg:h-full hidden lg:flex lg:items-center lg:justify-center"
                            >
                                <span className="absolute z-[-1] flex justify-center items-center lg:!top-auto">
                                    <ChevronNext className="svg--current-color" />
                                </span>
                            </NextButton>
                        </Carousel.Navigation>
					</Carousel.Wrapper>
                </TabContent>
                <TabContent className="" active={resultTab === 1}>Result tab 2</TabContent>
                <TabContent className="" active={resultTab === 2}>Result tab 3</TabContent>
                <TabContent className="" active={resultTab === 3}>Result tab 4</TabContent>
            </section>
        </>
    );
};

export default HairSolution;