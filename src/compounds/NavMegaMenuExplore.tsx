import { useState, useEffect } from 'react';

const VISIBLE_COUNT = 3;

const PLACEHOLDER_IMAGE = 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/image_133.png?v=1779632775';

const REEL_VIDEO = 'https://cdn.shopify.com/videos/c/o/v/a9a3485723494dc9aae13c936781c5ec.mp4';

const DUMMY_REELS_AS_SEEN = [
    { videoUrl: REEL_VIDEO, author: 'Meredith Langosh', productName: 'Sunny Honey Bali Bronzing Foam', productUrl: '/products/sunny-honey-bali-bronzing-foam' },
    { videoUrl: REEL_VIDEO, author: 'Meredith Langosh', productName: 'Sunny Honey Bali Bronzing Foam', productUrl: '/products/sunny-honey-bali-bronzing-foam' },
    { videoUrl: REEL_VIDEO, author: 'Meredith Langosh', productName: 'Sunny Honey Bali Bronzing Foam', productUrl: '/products/sunny-honey-bali-bronzing-foam' },
    { videoUrl: REEL_VIDEO, author: 'Meredith Langosh', productName: 'Sunny Honey Bali Bronzing Foam', productUrl: '/products/sunny-honey-bali-bronzing-foam' },
];

const DUMMY_ARTICLES_GLOSSARY = [
    { title: '5 things you\'re doing wrong with your hair care', handle: 'things-to-avoid-when-growing-our-hair', blogHandle: 'tropical-glossary', tags: ['Hair', 'Tips'], image: { url: PLACEHOLDER_IMAGE } },
    { title: 'How to get the perfect self-tan every time', handle: 'things-to-avoid-when-growing-our-hair', blogHandle: 'tropical-glossary', tags: ['Tan', 'Guide'], image: { url: PLACEHOLDER_IMAGE } },
    { title: 'The ultimate guide to SPF for your skin type', handle: 'things-to-avoid-when-growing-our-hair', blogHandle: 'tropical-glossary', tags: ['SPF', 'Suncare'], image: { url: PLACEHOLDER_IMAGE } },
    { title: 'Why your hair needs a bond repair treatment', handle: 'things-to-avoid-when-growing-our-hair', blogHandle: 'tropical-glossary', tags: ['Hair', 'New'], image: { url: PLACEHOLDER_IMAGE } },
];

const TABS = [
    {
        key: 'as-seen-on-you',
        title: 'As Seen On You',
        type: 'video',
        blogHandle: 'as-seen-on-you',
        articles: DUMMY_REELS_AS_SEEN,
        featured: {
            title: 'As Seen On You',
            description: 'Real people. Real routines. Real glow.',
            bgColor: 'bg-[#F5EEF5]',
            ctaLabel: 'Get Inspired',
            url: '/blogs/as-seen-on-you',
            image: { url: PLACEHOLDER_IMAGE },
        },
    },
    {
        key: 'tropical-glossary',
        title: 'Tropical Glossary',
        blogHandle: 'tropical-glossary',
        articles: DUMMY_ARTICLES_GLOSSARY,
        featured: {
            title: 'Tropical Glossary',
            description: 'From bronzed skin to glossy hair – discover every secret.',
            bgColor: 'bg-[#F5F0D8]',
            ctaLabel: 'Read Articles',
            url: '/blogs/tropical-glossary',
            image: { url: PLACEHOLDER_IMAGE },
        },
    },
];

const fetchArticle = async (blogHandle: string, handle: string) => {
    try {
        const res = await fetch(`/api/getArticle?blogHandle=${blogHandle}&handle=${handle}`);
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
};

const NavMegaMenuExplore = (props: any) => {
    const { generalSetting, megaMenu } = props;

    const tabs = megaMenu?.tabs || TABS;

    const [activeTab, setActiveTab] = useState(tabs[0]?.key || TABS[0].key);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [enrichedItems, setEnrichedItems] = useState<Record<string, any[]>>({});

    useEffect(() => {
        const glossaryTab = megaMenu?.tabs?.[1];
        if (!glossaryTab) return;
        const items: any[] = glossaryTab.items || [];
        if (!items.length) return;

        const needsEnrich = items.some((item: any) => !item.title || !item.image?.url || !item.tags?.length);
        if (!needsEnrich) {
            setEnrichedItems(prev => ({ ...prev, [glossaryTab.key || glossaryTab.title]: items }));
            return;
        }

        Promise.all(
            items.map(async (item: any) => {
                if (item.title && item.image?.url && item.tags?.length) return item;
                const article = await fetchArticle(item.blogHandle, item.handle);
                if (!article) return item;
                return {
                    ...item,
                    title: item.title || article.title,
                    image: item.image?.url ? item.image : article.image,
                    tags: item.tags?.length ? item.tags : article.tags,
                };
            })
        ).then(resolved => {
            const key = glossaryTab.key || glossaryTab.title;
            setEnrichedItems(prev => ({ ...prev, [key]: resolved }));
        });
    }, [megaMenu]);

    const handleTabHover = (tab: any) => {
        if (activeTab === tab.key) return;
        setActiveTab(tab.key);
        setCarouselIndex(0);
    };
    const currentTab = tabs.find((t: any) => t.key === activeTab) || tabs[0];
    const tabKey = currentTab?.key || currentTab?.title;
    const rawItems = currentTab?.items || currentTab?.articles || [];
    const currentArticles = enrichedItems[tabKey] ?? rawItems;

    const shopAllUrl = megaMenu?.shopAllUrl || generalSetting?.mega_menu_shop_all_url || '/collections/all';
    const buildYourOwnUrl = megaMenu?.buildYourOwnUrl || generalSetting?.mega_menu_button2_url || '/pages/build-your-own-bundle';

    return (
        <div className="z-[1010] nav-mega-menu left-0 border-t w-full border-top-body mt-[18px] lg:mt-[35px] bg-white absolute before:bg-transparent before:w-full before:h-[1.25em] before:absolute before:-mt-[1.25em]">
            {/* Tab bar */}
            <div className="flex items-center justify-between px-0 pt-3 pb-2 mx-auto w-full" style={{ maxWidth: 1160 }}>
                <ul className="flex gap-[.25rem] list-none mb-0 pl-0">
                    {tabs.map((tab: any) => (
                        <li key={tab.key}>
                            <a
                                href={`${tab.blogHandle}`}
                                className={`items-center flex px-2 h-[45px] py-[.375rem] text-base transition-colors whitespace-nowrap no-underline hover:no-underline hover:text-white ${activeTab === tab.key ? 'bg-dark text-white' : 'text-body hover:text-primary'}`}
                                onMouseEnter={() => handleTabHover(tab)}
                            >
                                {tab.title}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="flex gap-3 items-center">
                    <a href={shopAllUrl} className="font-bold text-body hover:text-primary underline underline-offset-2 whitespace-nowrap">
                        Shop All
                    </a>
                    <a href={buildYourOwnUrl} className="font-bold text-body hover:text-primary underline underline-offset-2 whitespace-nowrap">
                        Build Your Own Bundle
                    </a>
                </div>
            </div>

            {/* Content */}
            <div className="px-0 pb-3 mx-auto w-full" style={{ maxWidth: 1160 }}>
                <div className="relative flex items-start gap-[16px]">

                    {/* Cards */}
                    <div className="flex gap-[16px] flex-1 min-w-0">
                        {currentArticles.slice(carouselIndex, carouselIndex + VISIBLE_COUNT).map((item: any, index: number) => (
                            currentTab.type === 'video' ? (
                                <div key={`reel-${index}`} className="flex-shrink-0 flex flex-col" style={{ width: 293 }}>
                                    <div className="rounded-lg overflow-hidden mb-1" style={{ width: 293, height: 385 }}>
                                        <video
                                            src={item.videoUrl}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className="font-bold mb-[5px] text-body" style={{ fontSize: 16, lineHeight: '22px' }}>{item.author}</p>
                                    <a href={item.productUrl} className="text-sm text-body underline underline-offset-2 hover:text-primary">{item.productName}</a>
                                </div>
                            ) : (
                                <a
                                    key={`article-${item.handle}-${index}`}
                                    href={`/blogs/${item.blogHandle}/${item.handle}`}
                                    className="flex-1 min-w-0 no-underline text-body hover:no-underline flex flex-col"
                                >
                                    {item.image?.url && (
                                        <div className="rounded-lg overflow-hidden mb-[16px] w-full">
                                            <img src={item.image.url} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                                        </div>
                                    )}
                                    {item.tags?.length > 0 && (
                                        <div className="flex gap-[6px] flex-wrap mb-[8px] px-[12px]">
                                            {item.tags.map((tag: string, ti: number) => (
                                                <span key={ti} className="font-normal px-[10px] pt-[5px] pb-[4px] h-[20px] bg-secondary-light text-body capitalize rounded-[4px]" style={{ fontSize: 12, lineHeight: 'normal' }}>{tag}</span>
                                            ))}
                                        </div>
                                    )}
                                    <p className="font-normal mb-[14px] text-body px-[12px] leading-[25px] text-[20px]" style={{ fontSize: 20, lineHeight: '25px' }}>{item.title}</p>
                                    <span className="text-[14px] font-normal underline underline-offset-2 px-[12px] text-body hover:text-primary mt-auto">Read More</span>
                                </a>
                            )
                        ))}
                    </div>

                    {/* Featured banner */}
                    <div
                        className="rounded-lg px-[16px] pt-4 relative overflow-hidden flex-shrink-0 flex flex-col text-center"
                        style={{ width: 234, height: currentTab.type === 'video' ? 442 : 327, backgroundColor: currentTab.featured?.bgColor || '#f3f4f6' }}
                    >
                        <div className="mb-[16px]">
                            <h4 className="font-bold mb-[4px]" style={{ fontSize: 20, lineHeight: '25px' }}>{currentTab.featured.title}</h4>
                            <p className="font-normal mb-0" style={{ fontSize: 16, lineHeight: '20px' }}>{currentTab.featured.description}</p>
                        </div>
                        <a
                            href={currentTab.featured.url}
                            className="btn btn-primary inline-flex items-center justify-center font-bold self-center px-[28px] hover:text-white hover:bg-primary-dark  !no-underline border-none"
                            style={{ height: 40, fontSize: 16, lineHeight: '20px' }}
                        >
                            {currentTab.featured.ctaLabel}
                        </a>
                        <div className="flex-shrink-0" style={{ height: 120 }} />
                        {currentTab.featured.image?.url && (
                            <img src={currentTab.featured.image.url} alt={currentTab.featured.title} className="absolute bottom-0 left-0 w-full object-contain" loading="lazy" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavMegaMenuExplore;
