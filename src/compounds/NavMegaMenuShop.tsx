import { useState, useEffect, useRef } from 'react';
import ProductCard from '~/compounds/ProductCard';
import ChevronNext from '~/images/icons/chevron-next.svg';
import ChevronPrev from '~/images/icons/chevron-prev.svg';

const VISIBLE_COUNT = 4;
const VISIBLE_COUNT_WITH_CHILDREN = 3;

const isRangesType = (tab: any) => tab?.collectionHandle === 'hair';

const NavMegaMenuShop = (props: any) => {
    const {
        store, generalSetting, megaMenu,
        buildProductCardModel, addToCart, trackEvent, preOrders, setWaitlistData,
    } = props;
    const tabs = megaMenu?.tabs || [];
    const ranges = megaMenu?.hairRanges || [];

    const tabId = (tab: any) => tab.key || tab.title || '';
    const childId = (child: any) => child.key || child.label || child.collectionHandle || '';

    const firstTab = tabs[0];
    const firstChildren = firstTab?.children || [];

    const [activeTab, setActiveTab] = useState(() => tabId(firstTab || {}));
    const [activeChild, setActiveChild] = useState<string>(() => {
        if (isRangesType(firstTab)) return '';
        return firstChildren.length > 0 ? childId(firstChildren[0]) : '';
    });
    const [tabProducts, setTabProducts] = useState<Record<string, any[]>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const fetchedTabs = useRef<Set<string>>(new Set());

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
                const mapped = rawProducts.map((p: any) => {
                    const rawNodes = p.variants?.nodes || p.variants?.edges?.map((e: any) => e.node) || [];
                    return {
                        ...p,
                        src: p.featuredImage?.url || '',
                        imgHover: p.images?.edges?.[1]?.node?.url || '',
                        variants: { nodes: rawNodes },
                    };
                });
                setTabProducts(prev => ({ ...prev, [id]: mapped }));
            }
        } catch {
            fetchedTabs.current.delete(id);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (firstTab) {
            if (isRangesType(firstTab)) {
                // ranges tab: no auto-fetch, banners show by default
            } else if (firstChildren.length > 0) {
                const fc = firstChildren[0];
                fetchTabProducts(fc.collectionHandle || fc.handle, childId(fc));
            } else {
                fetchTabProducts(firstTab.handle || firstTab.collectionHandle, tabId(firstTab));
            }
        }
    }, []);

    const handleTabHover = (tab: any) => {
        const id = tabId(tab);
        if (activeTab === id) return;
        setActiveTab(id);
        setCarouselIndex(0);

        if (isRangesType(tab)) {
            // Show range banners by default; don't auto-select a child
            setActiveChild('');
        } else {
            const children = tab.children || [];
            if (children.length > 0) {
                const firstChild = children[0];
                const cid = childId(firstChild);
                setActiveChild(cid);
                const handle = firstChild.collectionHandle || firstChild.handle;
                if (handle) fetchTabProducts(handle, cid);
            } else {
                setActiveChild('');
                const handle = tab.handle || tab.collectionHandle;
                if (handle) fetchTabProducts(handle, id);
            }
        }
    };

    const handleChildHover = (child: any) => {
        const key = childId(child);
        if (activeChild === key) return;
        setActiveChild(key);
        setCarouselIndex(0);
        const handle = child.collectionHandle || child.handle;
        if (handle) fetchTabProducts(handle, key);
    };

    const currentTabData = tabs.find((t: any) => tabId(t) === activeTab);
    const children = currentTabData?.children || [];
    const hasChildren = children.length > 0;
    const isRangesTab = isRangesType(currentTabData);
    const tabRanges = currentTabData?.ranges || ranges;
    const showRangeBanners = isRangesTab && !activeChild;

    const productKey = hasChildren ? activeChild : activeTab;
    const currentProducts = tabProducts[productKey] || [];
    const visibleCount = hasChildren ? VISIBLE_COUNT_WITH_CHILDREN : VISIBLE_COUNT;
    const canPrev = carouselIndex > 0;
    const canNext = carouselIndex + visibleCount < currentProducts.length;

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
                                href={`/collections/${tab.handle || tab.collectionHandle}`}
                                className={`mega-menu-tab items-center flex px-2 h-[45px] py-[.375rem] text-base transition-colors whitespace-nowrap no-underline hover:no-underline hover:text-white ${activeTab === tabId(tab) ? 'bg-dark text-white' : 'text-body hover:text-primary'}`}
                                onMouseEnter={() => handleTabHover(tab)}
                            >
                                {tab.title}
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
                                    const childHandle = child.collectionHandle || child.handle;
                                    return (
                                        <li key={cid}>
                                            <a
                                                href={`/collections/${childHandle}`}
                                                className={`mega-menu-hover block w-full text-left no-underline hover:no-underline not-italic leading-[25px] transition-all ${activeChild === cid ? 'font-bold text-body opacity-100' : 'font-normal text-body opacity-40 hover:font-bold hover:opacity-100'}`}
                                                style={{ fontSize: 20 }}
                                                onMouseEnter={() => handleChildHover(child)}
                                            >
                                                {child.title || child.label}
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
                                    <div key={i} className="rounded-lg px-[16px] pt-[24px] relative overflow-hidden flex-shrink-0 text-center flex flex-col" style={{ width: 207, height: 280, backgroundColor: range.bgColor || '#f3f4f6' }}>
                                        <h4 className="mb-1 text-[24px] leading-[30px] font-bold">{range.title}</h4>
                                        <p className="font-normal mb-0" style={{ fontSize: 16, lineHeight: '20px' }}>{range.description}</p>
                                        {/* <a href={range.url || `/collections/${range.handle}`} className="btn btn-primary inline-flex items-center justify-center mt-auto mb-[160px] font-bold hover:text-white hover:bg-primary-dark !no-underline border-none" style={{ height: 40, fontSize: 16, lineHeight: '20px' }}>
                                            Shop Products
                                        </a> */}
                                        {range.image?.url && (
                                            <img src={range.image.url} alt={range.title} className="absolute bottom-0 left-0 w-full object-contain" loading="lazy" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <>
                                {canPrev && (
                                    <button
                                        type="button"
                                        onClick={() => setCarouselIndex(i => i - 1)}
                                        className="absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 bg-white"
                                        style={{ left: -30 }}
                                        aria-label="Previous products"
                                    >
                                        <ChevronPrev style={{ width: 15, height: 15 }} />
                                    </button>
                                )}
                                <div className="grid gap-[16px] w-full" style={{ gridTemplateColumns: `repeat(${visibleCount}, 1fr)` }}>
                                    {isLoading && currentProducts.length === 0 ? (
                                        <div className="col-span-full py-4 text-center text-body">Loading...</div>
                                    ) : (
                                        currentProducts.slice(carouselIndex, carouselIndex + visibleCount).map((product: any, index: number) => (
                                            <ProductCard
                                                key={`mega-${product.handle}-${index}`}
                                                keyName={`mega-${product.handle}-${index}`}
                                                product={product}
                                                className="relative mb-0 flex flex-col text-center"
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
                                </div>
                                {canNext && (
                                    <button
                                        type="button"
                                        onClick={() => setCarouselIndex(i => i + 1)}
                                        className="absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 bg-white no-shadow rounded-full"
                                        style={{ right: -30 }}
                                        aria-label="Next products"
                                    >
                                        <ChevronNext style={{ width: 15, height: 15 }} />
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavMegaMenuShop;
