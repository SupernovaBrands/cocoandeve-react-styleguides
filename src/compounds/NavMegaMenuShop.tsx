import { useState, useEffect, useRef } from 'react';
import ProductCard from '~/compounds/ProductCard';
import ChevronNext from '~/images/icons/chevron-next.svg';
import ChevronPrev from '~/images/icons/chevron-prev.svg';

const TABS = [
    { key: 'tan', title: 'Tan', handle: 'tan' },
    { key: 'hair', title: 'Hair', handle: null },
    { key: 'spf', title: 'SPF', handle: 'spf' },
    { key: 'sets', title: 'Sets', handle: 'kits-gifts' },
    { key: 'bestsellers', title: 'Bestsellers', handle: 'best-seller' },
    { key: 'sale', title: 'Sale', handle: 'sale-special-offers' },
];

const VISIBLE_COUNT = 4;

const RANGE_IMAGE = 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/image_136.png?v=1779629752';

const DUMMY_HAIR_RANGES = [
    { title: 'Like A Virgin', description: 'All hair types, especially dry, damaged or overworked strands in need of renewal.', bgColor: 'bg-[#F5F0E8]', url: '/collections/like-a-virgin', image: { url: RANGE_IMAGE } },
    { title: 'Boost Therapy', description: 'Fine, flat or thinning hair craving lift, bounce and long-term vitality.', bgColor: 'bg-[#EAF0F5]', url: '/collections/boost-therapy', image: { url: RANGE_IMAGE } },
    { title: 'Bond Therapy', description: 'Chemically-treated, brittle or severely damaged hair in need of deep repair.', bgColor: 'bg-[#E8EFF5]', url: '/collections/bond-therapy', image: { url: RANGE_IMAGE } },
    { title: 'Sweet Repair', description: 'Hair weakened by heat styling, brushing or everyday stress.', bgColor: 'bg-[#F5EAE8]', url: '/collections/sweet-repair', image: { url: RANGE_IMAGE } },
    { title: 'Youth Revive', description: 'Loss of volume, dullness or weakening from color, environmental stress or time.', bgColor: 'bg-[#F5F5E0]', url: '/collections/youth-revive', image: { url: RANGE_IMAGE } },
];


const NavMegaMenuShop = (props: any) => {
    const {
        store, generalSetting, hairRanges, megaMenu,
        buildProductCardModel, addToCart, trackEvent, preOrders, setWaitlistData,
    } = props;

    const tabs = megaMenu?.tabs || TABS;
    const ranges = megaMenu?.hairRanges || hairRanges || DUMMY_HAIR_RANGES;

    const [activeTab, setActiveTab] = useState(tabs[0]?.key || 'tan');
    const [tabProducts, setTabProducts] = useState<Record<string, any[]>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const fetchedTabs = useRef<Set<string>>(new Set());

    const fetchTabProducts = async (handle: string, tabKey: string) => {
        if (fetchedTabs.current.has(tabKey)) return;
        fetchedTabs.current.add(tabKey);
        setIsLoading(true);

        try {
            const res = await fetch(`/api/collectionProducts?handle=${handle}&region=${store}&limit=7`);
            const data = await res.json();
            const rawProducts = (data?.products || []).filter((p: any) => p.availableForSale).slice(0, 7);

            if (typeof buildProductCardModel === 'function') {
                const cardModels = await Promise.all(
                    rawProducts.map((p: any) => buildProductCardModel(store, p, generalSetting))
                );
                setTabProducts(prev => ({ ...prev, [tabKey]: cardModels }));
            } else {
                setTabProducts(prev => ({ ...prev, [tabKey]: rawProducts }));
            }
        } catch {
            fetchedTabs.current.delete(tabKey);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const firstTab = tabs.find((t: any) => t.handle || t.collectionHandle);
        if (firstTab) fetchTabProducts(firstTab.handle || firstTab.collectionHandle, firstTab.key);
    }, []);

    const handleTabHover = (tab: any) => {
        if (activeTab === tab.key) return;
        setActiveTab(tab.key);
        setCarouselIndex(0);
        const handle = tab.handle || tab.collectionHandle;
        if (handle) fetchTabProducts(handle, tab.key);
    };

    const currentProducts = tabProducts[activeTab] || [];
    const canPrev = carouselIndex > 0;
    const canNext = carouselIndex + VISIBLE_COUNT < currentProducts.length;

    const shopAllUrl = megaMenu?.shopAllUrl || generalSetting?.mega_menu_shop_all_url || '/collections/all';
    const shopAllLabel = generalSetting?.mega_menu_shop_all_label || 'Shop All';
    const buildYourOwnUrl = megaMenu?.buildYourOwnUrl || generalSetting?.mega_menu_button2_url || '/pages/build-your-own-bundle';
    const buildYourOwnLabel = generalSetting?.mega_menu_button2_label || 'Build Your Own';

    return (
        <div className="z-[1010] nav-mega-menu left-0 border-t w-full border-top-body mt-[18px] bg-white absolute before:bg-transparent before:w-full before:h-[1.25em] before:absolute before:-mt-[1.25em]">
            {/* Tab bar */}
            <div className="flex items-center justify-between px-g pt-3 pb-2 mx-auto w-full" style={{ maxWidth: 1160 }}>
                <ul className="flex gap-[.25rem] list-none mb-0 pl-0">
                    {tabs.map((tab: any) => (
                        <li key={tab.key}>
                            <button
                                type="button"
                                className={`px-3 py-[.375rem] text-base font-bold rounded transition-colors whitespace-nowrap ${activeTab === tab.key ? 'bg-dark text-white' : 'text-body hover:text-primary'}`}
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
            <div className="px-g pb-3 mx-auto w-full" style={{ maxWidth: 1160 }}>
                {activeTab === 'hair' ? (
                    <div className="flex gap-[16px]">
                        {ranges.map((range: any, i: number) => (
                            <div key={i} className={`${range.bgColor || 'bg-gray-100'} rounded-lg px-[16px] pt-4 relative overflow-hidden flex-shrink-0 text-center flex flex-col`} style={{ width: 219, height: 378 }}>
                                <h4 className="mb-1 text-[24px] leading-[30px] font-bold">{range.title}</h4>
                                <p className="font-normal mb-0" style={{ fontSize: 16, lineHeight: '20px' }}>{range.description}</p>
                                <a href={range.url || `/collections/${range.handle}`} className="btn btn-primary inline-flex items-center justify-center mt-auto mb-[160px] font-bold" style={{ height: 40, fontSize: 16, lineHeight: '20px' }}>
                                    Shop Products
                                </a>
                                {range.image?.url && (
                                    <img src={range.image.url} alt={range.title} className="absolute bottom-0 left-0 w-full object-contain" loading="lazy" />
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="relative flex items-center">
                        {canPrev && (
                            <button
                                type="button"
                                onClick={() => setCarouselIndex(i => i - 1)}
                                className="absolute left-[-1.25rem] z-10 flex items-center justify-center w-7 h-7"
                                aria-label="Previous products"
                            >
                                <ChevronPrev className="svg--current-color" />
                            </button>
                        )}
                        <div className="grid grid-cols-4 gap-[16px] w-full">
                            {isLoading && currentProducts.length === 0 ? (
                                <div className="col-span-4 py-4 text-center text-body">Loading...</div>
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
                                className="absolute right-[-1.25rem] z-10 flex items-center justify-center w-7 h-7"
                                aria-label="Next products"
                            >
                                <ChevronNext className="svg--current-color" />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavMegaMenuShop;
