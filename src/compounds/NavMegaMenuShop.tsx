import { useState, useEffect, useRef } from 'react';
import ProductCard from '~/compounds/ProductCard';
import ChevronNext from '~/images/icons/chevron-next.svg';
import ChevronPrev from '~/images/icons/chevron-prev.svg';

const VISIBLE_COUNT = 4;

const NavMegaMenuShop = (props: any) => {
    const {
        store, generalSetting, megaMenu,
        buildProductCardModel, addToCart, trackEvent, preOrders, setWaitlistData,
    } = props;

    const tabs = megaMenu?.tabs || [];
    const ranges = megaMenu?.hairRanges || [];

    const tabId = (tab: any) => tab.key || tab.title || '';

    const [activeTab, setActiveTab] = useState(() => tabId(tabs[0] || {}));
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
                        variants: {
                            nodes: rawNodes,
                        },
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
        const firstTab = tabs.find((t: any) => t.handle || t.collectionHandle);
        if (firstTab) fetchTabProducts(firstTab.handle || firstTab.collectionHandle, tabId(firstTab));
    }, []);

    const handleTabHover = (tab: any) => {
        const id = tabId(tab);
        if (activeTab === id) return;
        setActiveTab(id);
        setCarouselIndex(0);
        const handle = tab.handle || tab.collectionHandle;
        if (handle) fetchTabProducts(handle, id);
    };
    const currentProducts = tabProducts[activeTab] || [];
    const canPrev = carouselIndex > 0;
    const canNext = carouselIndex + VISIBLE_COUNT < currentProducts.length;

    const shopAllUrl = megaMenu?.shopAllUrl || generalSetting?.mega_menu_shop_all_url || '/collections/all';
    const shopAllLabel = megaMenu?.shopAllLabel || 'Shop All';
    const buildYourOwnUrl = megaMenu?.buildYourOwnUrl || generalSetting?.mega_menu_button2_url || '/pages/build-your-own-bundle';
    const buildYourOwnLabel = megaMenu?.buildYourOwnLabel || 'Build Your Own Bundle';

    const currentTabData = tabs.find((t: any) => tabId(t) === activeTab);
    const isRangesTab = currentTabData && !currentTabData.handle && !currentTabData.collectionHandle;

    return (
        <div className="z-[1010] nav-mega-menu left-0 border-t w-full border-top-body mt-[18px] lg:mt-[35px] bg-white absolute before:bg-transparent before:w-full before:h-[1.25em] before:absolute before:-mt-[1.25em]">
            {/* Tab bar */}
            <div className="flex items-center justify-between px-0 pt-3 pb-2 mx-auto w-full" style={{ maxWidth: 1160 }}>
                <ul className="flex gap-[.25rem] list-none mb-0 pl-0">
                    {tabs.map((tab: any) => (
                        <li key={tabId(tab)}>
                            <button
                                type="button"
                                className={`px-2 h-[45px] py-[.375rem] text-base transition-colors whitespace-nowrap ${activeTab === tabId(tab) ? 'bg-dark text-white' : 'text-body hover:text-primary'}`}
                                onMouseEnter={() => handleTabHover(tab)}
                            >
                                {tab.title}
                            </button>
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
                {isRangesTab ? (
                    <div className="flex gap-[16px]">
                        {ranges.map((range: any, i: number) => (
                            <div key={i} className="rounded-lg px-[16px] pt-4 relative overflow-hidden flex-shrink-0 text-center flex flex-col" style={{ width: 219, height: 378, backgroundColor: range.bgColor || '#f3f4f6' }}>
                                <h4 className="mb-1 text-[24px] leading-[30px] font-bold">{range.title}</h4>
                                <p className="font-normal mb-0" style={{ fontSize: 16, lineHeight: '20px' }}>{range.description}</p>
                                <a href={range.url || `/collections/${range.handle}`} className="btn btn-primary inline-flex items-center justify-center mt-auto mb-[160px] font-bold hover:text-white hover:bg-primary-dark  !no-underline border-none " style={{ height: 40, fontSize: 16, lineHeight: '20px' }}>
                                    Shop Products
                                </a>
                                {range.image?.url && (
                                    <img src={range.image.url} alt={range.title} className="absolute bottom-0 left-0 w-full object-contain" loading="lazy" />
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="relative">
                        {canPrev && (
                            <button
                                type="button"
                                onClick={() => setCarouselIndex(i => i - 1)}
                                className="absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 bg-white" style={{ left: -30 }}
                                aria-label="Previous products"
                            >
                                <ChevronPrev style={{ width: 15, height: 15 }} />
                            </button>
                        )}
                        <div className="grid gap-[16px] w-full" style={{ gridTemplateColumns: `repeat(${VISIBLE_COUNT}, 1fr)` }}>
                            {isLoading && currentProducts.length === 0 ? (
                                <div className="col-span-full py-4 text-center text-body">Loading...</div>
                            ) : (
                                currentProducts.slice(carouselIndex, carouselIndex + VISIBLE_COUNT).map((product: any, index: number) => (
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
                                className="absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 bg-white no-shadow rounded-full" style={{ right: -30 }}
                                aria-label="Next products"
                            >
                                <ChevronNext style={{ width: 15, height: 15 }} />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavMegaMenuShop;
