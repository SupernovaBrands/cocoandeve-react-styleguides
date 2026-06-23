import { useState, useEffect, useRef } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import ProductCard from '~/compounds/ProductCard';
import ChevronNext from '~/images/icons/chevron-next.svg';
import ChevronPrev from '~/images/icons/chevron-prev.svg';

const VISIBLE_COUNT = 4;
const VISIBLE_COUNT_WITH_CHILDREN = 3;

const emblaOptions: EmblaOptionsType = {
    loop: true,
    align: 'start',
};

const getHandleFromUrl = (url?: string) => {
    if (!url) return '';
    const path = url.split('?')[0].split('#')[0];
    const segments = path.split('/').filter(Boolean);
    return segments[segments.length - 1] || '';
};

const isRangesType = (tab: any) => getHandleFromUrl(tab?.url) === 'hair';

const NavMegaMenuShop = (props: any) => {
    const {
        store, generalSetting, megaMenu, subNav,
        buildProductCardModel, getFeaturedImgMeta, addToCart, trackEvent, preOrders, setWaitlistData,
    } = props;
    const tabs = subNav || [];
    const ranges = megaMenu?.hairRanges || [];

    const tabId = (tab: any) => tab.url || tab.label || '';
    const childId = (child: any) => child.url || child.label || '';

    const firstTab = tabs[0];

    const [activeTab, setActiveTab] = useState(() => tabId(firstTab || {}));
    const [activeChild, setActiveChild] = useState<string>('');
    const [tabProducts, setTabProducts] = useState<Record<string, any[]>>({});
    const [isLoading, setIsLoading] = useState(false);
    const fetchedTabs = useRef<Set<string>>(new Set());
    const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);

    const fetchTabProducts = async (handle: string, id: string) => {
        if (fetchedTabs.current.has(id)) return;
        fetchedTabs.current.add(id);
        setIsLoading(true);

        try {
            const res = await fetch(`/api/collectionProducts?handle=${handle}&region=${store}&limit=12`);
            const data = await res.json();
            const rawProducts = (data?.products || []).filter((p: any) => p.availableForSale).slice(0, 12);

            if (typeof buildProductCardModel === 'function') {
                const cardModels = await Promise.all(
                    rawProducts.map((p: any) => buildProductCardModel(store, p, generalSetting))
                );
                setTabProducts(prev => ({ ...prev, [id]: cardModels }));
            } else {
                const mapped = await Promise.all(rawProducts.map(async (p: any) => {
                    const rawNodes = p.variants?.nodes || p.variants?.edges?.map((e: any) => e.node) || [];
                    let src = p.featuredImage?.url || '';
                    let imgHover = p.images?.edges?.[1]?.node?.url || '';
                    if (typeof getFeaturedImgMeta === 'function') {
                        const { img, imgHover: hoverImg } = await getFeaturedImgMeta(p, store);
                        src = img || src;
                        imgHover = hoverImg || imgHover;
                    }
                    return {
                        ...p,
                        src,
                        imgHover,
                        variants: { nodes: rawNodes },
                    };
                }));
                setTabProducts(prev => ({ ...prev, [id]: mapped }));
            }
        } catch {
            fetchedTabs.current.delete(id);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (firstTab && !isRangesType(firstTab)) {
            const handle = getHandleFromUrl(firstTab.url);
            if (handle) fetchTabProducts(handle, tabId(firstTab));
        }
    }, []);

    const handleTabHover = (tab: any) => {
        const id = tabId(tab);
        const isSameTab = activeTab === id;
        if (isSameTab && activeChild === '') return;

        if (!isSameTab) {
            setActiveTab(id);
        }
        setActiveChild('');

        // Default to the tab's own collection; child collections only load on sidebar hover
        if (!isRangesType(tab)) {
            const handle = getHandleFromUrl(tab.url);
            if (handle) fetchTabProducts(handle, id);
        }
    };

    const handleChildHover = (child: any) => {
        const key = childId(child);
        if (activeChild === key) return;
        setActiveChild(key);
        const handle = getHandleFromUrl(child.url);
        if (handle) fetchTabProducts(handle, key);
    };

    const currentTabData = tabs.find((t: any) => tabId(t) === activeTab);
    const children = currentTabData?.children || [];
    const hasChildren = children.length > 0;
    const isRangesTab = isRangesType(currentTabData);
    const tabRanges = currentTabData?.ranges || ranges;
    const showRangeBanners = isRangesTab && !activeChild;

    const productKey = activeChild || activeTab;
    const currentProducts = tabProducts[productKey] || [];
    const visibleCount = hasChildren ? VISIBLE_COUNT_WITH_CHILDREN : VISIBLE_COUNT;

    useEffect(() => {
        if (emblaApi) {
            emblaApi.reInit();
            emblaApi.scrollTo(0, true);
        }
    }, [productKey, currentProducts, hasChildren, emblaApi]);

    const shopAllUrl = megaMenu?.shopAllUrl || generalSetting?.mega_menu_shop_all_url || '/collections/all';
    const shopAllLabel = megaMenu?.shopAllLabel || 'Shop All';
    const buildYourOwnUrl = megaMenu?.buildYourOwnUrl || generalSetting?.mega_menu_button2_url || '/pages/build-your-own-bundle';
    const buildYourOwnLabel = megaMenu?.buildYourOwnLabel || 'Build Your Own Bundle';

    return (
        <div className="z-[1010] nav-mega-menu left-0 border-t w-full border-top-body mt-[18px] lg:mt-[35px] bg-white absolute before:bg-transparent before:w-full before:h-[1.25em] before:absolute before:-mt-[1.25em]">
            {/* Tab bar */}
            <div className="flex items-center justify-between px-0 pt-3 pb-2 mx-auto w-full" style={{ maxWidth: 1160 }}>
                <ul className="flex gap-[.25rem] list-none mb-0 pl-0">
                    {tabs.map((tab: any) => (
                        <li key={tabId(tab)}>
                            <a
                                href={tab.url || '#'}
                                className={`mega-menu-tab items-center flex px-2 h-[45px] py-[.375rem] text-base transition-colors whitespace-nowrap no-underline hover:no-underline hover:text-white ${activeTab === tabId(tab) ? 'bg-dark text-white' : 'text-body hover:text-primary'}`}
                                onMouseEnter={() => handleTabHover(tab)}
                            >
                                {tab.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="flex gap-3 items-center">
                    <a href={shopAllUrl} className="font-bold text-body hover:text-primary underline underline-offset-2 whitespace-nowrap">
                        {shopAllLabel}
                    </a>
                    <a href={buildYourOwnUrl} className="font-bold text-body hover:text-primary underline underline-offset-2 whitespace-nowrap">
                        {buildYourOwnLabel}
                    </a>
                </div>
            </div>

            {/* Content */}
            <div className="px-0 pb-3 mx-auto w-full" style={{ maxWidth: 1160 }}>
                <div className="flex gap-[16px]">
                    {/* Left sidebar — sub-range list */}
                    {hasChildren && (
                        <div className="flex-1">
                            <ul className="list-none pl-0 mb-0 mt-[16px] flex flex-col gap-[8px]">
                                {children.map((child: any) => {
                                    const cid = childId(child);
                                    return (
                                        <li key={cid}>
                                            <a
                                                href={child.url || '#'}
                                                className={`mega-menu-hover block w-full text-left no-underline hover:no-underline not-italic leading-[25px] transition-all ${activeChild === cid ? 'font-bold text-body opacity-100' : 'font-normal text-body opacity-40 hover:font-bold hover:opacity-100'}`}
                                                style={{ fontSize: 20 }}
                                                onMouseEnter={() => handleChildHover(child)}
                                            >
                                                {child.label}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}

                    {/* Right content — range banners or product carousel */}
                    <div className={`relative ${hasChildren && !showRangeBanners ? 'flex-shrink-0' : 'flex-1'}`} style={hasChildren && !showRangeBanners ? { width: 812 } : {}}>
                        {showRangeBanners ? (
                            <div className="flex gap-[16px]">
                                {tabRanges.map((range: any, i: number) => (
                                    <a key={i} href={range.url || (range.handle ? `/collections/${range.handle}` : '#')} className="rounded-lg px-[16px] pt-[24px] relative overflow-hidden flex-shrink-0 text-center flex flex-col !no-underline hover:no-underline text-body hover:text-body" style={{ width: 207, height: 280, backgroundColor: range.bgColor || '#f3f4f6' }}>
                                        <h4 className="mb-1 text-[24px] leading-[30px] font-bold">{range.title}</h4>
                                        <p className="font-normal mb-0" style={{ fontSize: 16, lineHeight: '20px' }}>{range.description}</p>
                                        {range.image?.url && (
                                            <img src={range.image.url} alt={range.title} className="absolute bottom-0 left-0 w-full object-contain" loading="lazy" />
                                        )}
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={() => emblaApi?.scrollPrev()}
                                    className="absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 bg-white"
                                    style={{ left: -30 }}
                                    aria-label="Previous products"
                                >
                                    <ChevronPrev style={{ width: 15, height: 15 }} />
                                </button>
                                <Carousel.Wrapper emblaApi={emblaApi}>
                                    <Carousel.Inner emblaRef={emblaRef}>
                                        {isLoading && currentProducts.length === 0 ? (
                                            <div className="w-full py-4 text-center text-body">Loading...</div>
                                        ) : (
                                            currentProducts.map((product: any, index: number) => (
                                                <ProductCard
                                                    key={`mega-${product.handle}-${index}`}
                                                    keyName={`mega-${product.handle}-${index}`}
                                                    product={product}
                                                    className="relative mb-0 flex-shrink-0 flex flex-col text-center px-[8px]"
                                                    style={{ width: `${100 / visibleCount}%` }}
                                                    button={true}
                                                    setWaitlistData={setWaitlistData || (() => {})}
                                                    smSingleStar={false}
                                                    carousel={true}
                                                    addToCart={addToCart || false}
                                                    trackEvent={trackEvent}
                                                    preOrders={preOrders}
                                                    generalSetting={generalSetting}
                                                    store={store}
                                                />
                                            ))
                                        )}
                                    </Carousel.Inner>
                                </Carousel.Wrapper>
                                <button
                                    type="button"
                                    onClick={() => emblaApi?.scrollNext()}
                                    className="absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 bg-white no-shadow rounded-full"
                                    style={{ right: -30 }}
                                    aria-label="Next products"
                                >
                                    <ChevronNext style={{ width: 15, height: 15 }} />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavMegaMenuShop;
