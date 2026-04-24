import Modal from "~/components/Modal";
// import Terms from "~/components/modal/Terms";
import TermCondition from '~/components/modal/TermCondition';
import ProductCard from "~/compounds/ProductCard";
import ProductCardQuiz from "~/compounds/ProductCardQuiz";
import ProductCardKit from "~/compounds/ProductCardKit";
// import ProductCardLoading from "~/compounds/ProductCardLoading";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useCollectionSettings, useCollectionSingle } from "~/hooks/useCollection";
import ModalWaitlist from "~/components/modal/Waitlist";
import { checkLaunchWLBox, isWaitlist } from "~/modules/utils";
// import Service from "~/sections/Service";
// import { sidebar_collection_ph, sidebar_collection_ph_ca } from '~/modules/placeholders';
// import LaunchWaitList from "~/compounds/launch-waitlist";
// import CollectionServices from "~/compounds/CollectionServices";
import LaunchWaitlistModals from "~/sections/LaunchWaitlistModals";

const QuizCardPlaceholder = (props) => {
    return props.split ? (
        <div className="relative flex flex-col gap-[1.5rem] lg:gap-0 w-full lg:justify-between lg:h-full lg:pb-[1rem]">
            <div className="bg-shimmer w-full aspect-[360/64] md:aspect-[218/419] lg:aspect-[278/190]" />
            <div className="bg-shimmer w-full aspect-[360/64] md:aspect-[218/419] lg:aspect-[278/190]" />
        </div>
    ) : (
        <div className="relative w-full lg:h-full">
            <div className="bg-shimmer w-full aspect-[360/64] lg:aspect-[278/391]" />
        </div>
    );
}

const Inner = ({ title, bannerData }) => {
    return (
        <figure className="w-full relative items-center px-0 mb-0 aspect-[375/200] lg:aspect-[1440/279]">
            <picture className={``}>
                <source srcSet={bannerData?.img_desk?.url} media="(min-width: 992px)" />
                <img src={bannerData?.img_mob?.url?.replace('/public', '/540x')}
                    className="w-full" alt="Collection Banner" width="375" height="200"
                    // @ts-ignore
                    fetchpriority="high" />
            </picture>
            <figcaption className="w=full flex lg:visible absolute w-auto items-center my-auto top-0 bottom-0">
                {/* <h1 className="hidden mb-0"
                    dangerouslySetInnerHTML={{ __html: title ?? 'Shop All' }}
                /> */}
            </figcaption>
        </figure>
    );
}

const Banner = ({ title, bannerData }) => {
    return (
        <>
            {bannerData?.url === '' && <Inner title={title} bannerData={bannerData} />}
            {bannerData?.url !== '' && (
                <a href={bannerData?.url} title="Collection page top banner link">
                    <Inner title={title} bannerData={bannerData} />
                </a>
            )}
        </>
    );
}

const Collection = (props: any) => {
    const {
        mainNav,
        products,
        isLoading,
        mainCollectionHandles,
        handle,
        currentCollection,
        showSpinner,
        subHandles,
        parentCollection,
        collectionTitle,
        sort,
        addToCart,
        tcPopups,
        generalSetting,
        waitlistPdpSetting,
        store,
        buildProductCardModel,
        trackBluecoreEvent,
        bluecoreProductWaitlist,
        trackEvent,
        preOrders,
        launchWL,
        trackBluecoreLaunchWaitlistEvent,
        submitsToSmsBumpAPi,
        // subscribeBluecoreWaitlist,
        loggedInEmail,
        squareBadge,
        bannerData,
        customProductTitle,
        childMenuData,
        byobBanner,
    } = props;
    // console.log('mainnav', mainNav);
    // const [featuredImg, setFeaturedImg] = useState<any>([]);
    // const [splitCard, setSplitCard] = useState(false);
    const [sevenDaysSalesIds, setSevenDaysSalesIds] = useState(props.sevenDaysArr || []);
    const sidebarRef = useRef(null);
    const subCatRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [isOpen, toggle] = useState(false);
    // Derived from props — no extra render cycles
    const initMain = parentCollection === null;
    const initSub = parentCollection !== null;
    // const [height, setHeight] = useState(0);
    const [launchSubmitted, setLaunchSubmitted] = useState(false);
    const [waitlistData, setWaitlistData] = useState({
        open: false,
        title: '',
        image: '',
        handle: undefined,
        date: '',
        productId: null,
    });
    const [launchWLModal, setLaunchWLModal] = useState({
        open: false,
        variantId: null,
        handle: null,
        tags: [],
        productId: null,
        emailShow: true,
        phoneShow: true,
    });
    const [launchWLModal2, setLaunchWLModal2] = useState({
        open: false,
        variantId: null,
        handle: null,
        tags: [],
        productId: null,
        emailShow: true,
        phoneShow: true,
    });
    const [launchWLModal3, setLaunchWLModal3] = useState({
        open: false,
        variantId: null,
        handle: null,
        tags: [],
        productId: null,
        emailShow: true,
        phoneShow: true,
    });
    const [launchWLSuccess, setLaunchWLSuccess] = useState(false);
    const showQuizCard = useMemo(() => handle === 'spf' || handle === 'body-suncare' || handle === 'face-suncare' || handle === 'tan' || handle === 'suncare-tan' || handle === 'tan-and-spf' || handle === 'tan-sets' || handle === 'tanning-mitts' || handle === 'body-tan' || handle === 'face-tan' || handle === 'tan-accessories' || parentCollection?.collection?.handle === 'tan' || parentCollection?.collection?.handle === 'tan-and-spf', [handle, parentCollection]);
    const [showByobCard, setShowByobCard] = useState({ show: false, position: 5, dtPosition: 5 });
    const launchHandles = useMemo(() => {
        if (launchWL) return launchWL.launch_wl_handles.split(',').map((v) => v.trim()) || [];
        return [];
    }, [launchWL]);
    const handlOpenModal = (open: boolean) => {
        toggle(open);
    };
    // const [sidebarMenu, setSidebarMenu] = useState(store === 'ca' ? sidebar_collection_ph_ca : sidebar_collection_ph);
    const [parentParam, setParentParam] = useState<string | null>(null);
    const [childMenu, setChildMenu] = useState(() => {
        if (childMenuData && childMenuData.length > 0) return childMenuData;
        if (!subHandles) return [];
        const handles = ((store === 'ca') ? subHandles.replace('tan-and-spf', 'tan') : subHandles).split(',').map((h) => h.trim()).filter(Boolean);
        return handles.map((h) => ({ handle: h, title: h.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') }));
    });
    const [defaultSort, setDefaultSort] = useState(sort);

    const mainCollHandles = mainCollectionHandles && mainCollectionHandles.split(',');

    const [collProducts, setCollProducts] = useState(() =>
        [...products].sort((a, b) => (b.availableForSale ? 1 : 0) - (a.availableForSale ? 1 : 0))
    );

    // console.log('sub nav', subNav);

    // console.log('sub coll', subCollection);

    const navigationScroll = () => {
        // console.log('running nav scroll');
        const collectionNavTags = document.querySelector('.collection-grid__tags');
        if (collectionNavTags) {
            const elemsWidth = [];
            let idx = 0;

            collectionNavTags.querySelectorAll('.collection-grid__tags-link').forEach((el, i) => {
                elemsWidth.push(el.clientWidth);
                if (el.classList.contains('active')) {
                    idx = i;
                }
            });
            if (elemsWidth.length > 0 && idx > 1) {
                const scrollLeft = elemsWidth.slice(0, idx).reduce((a, b) => a + b, 0);
                collectionNavTags.scrollLeft = (scrollLeft - 20);
            }
        }
    };

    useEffect(() => {
        if (childMenu.length > 0) navigationScroll();
    }, [childMenu]);

    const showLoading = (e: any) => {
        if (e.target.closest('.collection__sidebar')) {
            const sidebarLinks = sidebarRef.current.querySelectorAll('li a');
            sidebarLinks.forEach((el) => {
                el.classList.remove('text-primary');
                el.classList.add('text-body');
            });
            e.target.classList.remove('text-body');
            e.target.classList.add('text-primary');
        }
        if (e.target.closest('.collection-grid__tags')) {
            const tagLinks = subCatRef.current.querySelectorAll('a');
            tagLinks.forEach((els) => {
                els.classList.add('text-gray-600', 'hover:text-gray-600');
                els.classList.remove('text-white', 'bg-body', 'hover:text-white');
            });
            e.target.classList.add('text-white', 'bg-body', 'hover:text-white');
            e.target.classList.remove('text-gray-600', 'hover:text-gray-600');
        }
        setLoading(true);
    };

    // const selectFilterChange = (e: any) => {
    //     showLoading(e);
    //     let handle = e.target.value;
    //     if (e.target.value === '') handle = 'all';
    //     window.location.href = `/collections/${handle}`;
    // };
    let selectFilterValue = currentCollection?.handle;
    if (parentCollection && parentCollection.collection) {
        selectFilterValue = parentCollection.collection.handle;
    }

    const handleSevenDaysSort = (a: any, b: any) => {
        const indexNumA = sevenDaysSalesIds.indexOf(parseInt(a.productId, 10));
        const indexNumB = sevenDaysSalesIds.indexOf(parseInt(b.productId, 10));

        if (indexNumA >= 0 && indexNumB < 0) {
            return -1;
        }

        if (indexNumA < 0 && indexNumB >= 0) {
            return 1;
        }

        if (indexNumA >= 0 && indexNumB >= 0) {
            return (indexNumA > indexNumB) ? 0 : -1;
        }

        return 0;
    };

    const sortByAvailability = (itemArray: any, sort: string) => {
        const availableItems = itemArray.filter((v) => v.availableForSale && !launchHandles.includes(v.handle));
        const oosItems = itemArray.filter((v) => !v.availableForSale || launchHandles.includes(v.handle));
        const productUnavailable = [];
        const itemsWL = [];
        [...availableItems, ...oosItems].forEach((obj) => {
            if (sort === 'best-selling') {
                if (!obj.availableForSale || !obj.sortAvailable) {
                    productUnavailable.push(obj);
                }
                if (launchHandles.includes(obj.handle)) {
                    itemsWL.push(obj);
                }
            } else {
                if (!obj.availableForSale || !obj.sortAvailable || launchHandles.includes(obj.handle)) {
                    productUnavailable.push(obj);
                }
            }
        });
        if (itemsWL.length > 0 && sort === 'best-selling') {
            const index = productUnavailable.length > 5 ? 5 : 3;
            productUnavailable.splice(index, 0, ...itemsWL);
        }

        if (sort === 'price-low-high' || sort === 'price-high-low') {
            availableItems.sort((a: any, b: any) => {

                const autoTicks = generalSetting?.auto_tick_variant.split(',').map((v) => parseInt(v, 10));
                let firtsAvailableA = a.variants.nodes.find((obj) => (autoTicks.includes(parseInt(obj.id.replace('gid://shopify/ProductVariant/', ''))))) || null;
                let firtsAvailableB = b.variants.nodes.find((obj) => (autoTicks.includes(parseInt(obj.id.replace('gid://shopify/ProductVariant/', ''))))) || null;

                if (!firtsAvailableA) firtsAvailableA = a.variants.nodes.find((obj) => obj.availableForSale) || { price: { amount: 0 } };
                if (!firtsAvailableB) firtsAvailableB = b.variants.nodes.find((obj) => obj.availableForSale) || { price: { amount: 0 } };

                const aPrice = (parseFloat(firtsAvailableA.price.amount) * 100);
                const bPrice = (parseFloat(firtsAvailableB.price.amount) * 100);
                if (sort === 'price-low-high') {
                    // ascending
                    return aPrice - bPrice;
                }
                if (sort === 'price-high-low') {
                    // descending
                    return bPrice - aPrice;
                }
            });
        }
        return [...availableItems, ...productUnavailable];
    };


    const selectSortChange = async (e: any) => {
        showLoading(e);
        const sort = e.target.value === 'best-selling' ? 'featured' : e.target.value;
        fetch(`/api/collectionProducts/?sort=${sort}&handle=${currentCollection.handle}`).then((r) => r.json())
            .then(async (data) => {
                const { products } = data;
                const mapped = await Promise.all(products.map((p) => buildProductCardModel(store, p, generalSetting, squareBadge)));
                if (e.target.value === 'best-selling' && sevenDaysSalesIds.length > 0) {
                    const sorted = mapped.sort(handleSevenDaysSort);
                    const finalSorted = sortByAvailability(sorted, e.target.value);
                    setCollProducts(finalSorted);
                } else {
                    const finalSorted = sortByAvailability(mapped, e.target.value);
                    setCollProducts(finalSorted);
                }
                setLoading(false);
                setDefaultSort(e.target.value);
            });
    };

    useEffect(() => {
        setLoading(false);

        // console.log('currentCollection', currentCollection);
        const DEFAULT_BYOB_POSITION = currentCollection?.products?.nodes?.length < 6 ? 3 : 5;

        let currentPos = parseInt(byobBanner?.desktop_position, 10);

        if (window.innerWidth < 769) {
            currentPos = parseInt(byobBanner?.mobile_position, 10);
        }

        if (currentPos > 0) {
            setShowByobCard({
                show: true,
                position: currentPos > 0 ? currentPos - 1 : DEFAULT_BYOB_POSITION,
                dtPosition: currentPos > 0 ? currentPos : DEFAULT_BYOB_POSITION,
            });
        }
    }, [currentCollection, byobBanner]);

    const collectionSettings = useCollectionSettings(handle, store);
    const handleFooter = parentCollection === null ? handle : parentCollection?.collection?.handle;
    const collectionSingle = useCollectionSingle(handleFooter, store);
    const footerAbout = collectionSingle.collectionSingle?.about_our_products || false;

    const loadWaitlist = isWaitlist(collProducts);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setParentParam(params.get('p'));
    }, [handle]);

    useEffect(() => {
        if (!mainNav || mainNav.length === 0) {
            if (subHandles) {
                fetch(`/api/collectionInfo?${new URLSearchParams({
                    parentHandle: mainCollectionHandles,
                    childrenHandle: (store === 'ca') ? subHandles?.replace('tan-and-spf', 'tan') : subHandles,
                })}`).then((res) => res.json()).then((data) => {
                    setChildMenu(data.childrens);
                });
            }
            return;
        }

        const pHandle = parentParam;
        let parentMenu = null;

        if (pHandle) {
            parentMenu = mainNav.find((menu: any) =>
                menu.handle?.replace('/collections/', '') === pHandle
            );
        }

        if (!parentMenu) {
            parentMenu = mainNav.find((menu: any) =>
                menu.rows?.some((row: any) =>
                    row.handle?.replace('/collections/', '') === handle
                )
            );
        }

        if (!parentMenu) {
            parentMenu = mainNav.find((menu: any) =>
                menu.handle?.replace('/collections/', '') === handle
            );
        }

        if (parentMenu) {
            const parentHandle = parentMenu.handle?.replace('/collections/', '');
            const children = [
                { handle: parentHandle, title: parentMenu.title },
                ...(parentMenu.rows || []).map((row: any) => ({
                    handle: row.handle?.replace('/collections/', ''),
                    title: row.title,
                })),
            ];
            setChildMenu(children);
        }
    }, [handle, parentParam, mainNav]);

    useEffect(() => {
        setCollProducts([...products].sort((a, b) => (b.availableForSale ? 1 : 0) - (a.availableForSale ? 1 : 0)));
    }, [products]);

    useEffect(() => {
        if (waitlistData.open) document.body.classList.add('overflow-y-hidden');
        else document.body.classList.remove('overflow-y-hidden');
    }, [waitlistData]);

    useEffect(() => {
        if (isOpen) document.body.classList.add('!overflow-y-hidden');
        else document.body.classList.remove('!overflow-y-hidden');
    }, [isOpen]);

    const footerCss = `
    .collection-footer__html p {
        margin-bottom: 1rem;
    }`;

    // const [first, ...rest] = sidebarMenu;
    // const mobileDropdown = [...rest, first];
    // console.log('byobBanner', showByobCard);
    const FilterOptions = (props: any) => (
        <div className={`w-auto lg:w-2/5 lg:flex items-center justify-end px-0 lg:pr-0 ${props.className}`}>
            <select aria-label="Sort collection items by" name="sort" onChange={selectSortChange} className={`border-none custom-select pl-0 bg-white text-sm lg:text-base w-[135px] lg:w-[185px] min-h-[3.125em] indent-0 text-right pr-2 lg:pr-[50px] [background-position:right_0_center]`} defaultValue={defaultSort}>
                <option value="featured">Sort By</option>
                <option value="best-selling">Best selling</option>
                <option value="price-low-high">Price, low to high</option>
                <option value="price-high-low">Price, high to low</option>
                <option value="newest">Date, new to old</option>
            </select>
        </div>
    );


    // console.log('sidebarMenu', sidebarMenu);
    const plainTextTitle = collectionTitle ? collectionTitle.replace(/<[^>]+>/g, '') : 'Shop All';
    const titleCharacterCount = plainTextTitle.length;

    return (
        <>
            <Banner title={collectionTitle} bannerData={bannerData} />

            {tcPopups?.enabled_collection && (
                <>
                    <div className="text-left terms--link container px-g py-[.5rem] lg:px-2 lg:py-1">
                        <a onClick={() => handlOpenModal(true)} className="underline underline-offset-[3px] text-body text-sm" role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handlOpenModal(true)}>{tcPopups.copy ? tcPopups.copy : 'Terms & Conditions'}</a>
                    </div>

                    <Modal backdropClasses="lg:overflow-y-hidden" className="modal modal-dialog-centered !px-1 lg:!px-0 mt-0" isOpen={isOpen} handleClose={() => handlOpenModal(false)}>
                        <TermCondition content={tcPopups} handleClose={() => handlOpenModal(false)} />
                    </Modal>
                </>
            )}

            <div className="container collection__container pt-3 px-0 lg:px-g lg:pt-4 lg:pb-2">
                <div className="flex flex-wrap overflow-hidden lg:-mx-g">
                    {/* {sidebarMenu.length > 0 && (
                        <aside className="w-1/4 hidden px-g lg:block">
                            <span className="block collection-sidebar-label text-lg mb-1 mt-3"><strong className="text-body">Category</strong></span>
                            <ul className="collection__sidebar list-unstyled border border-body p-2 w-2/3 lg:w-[202px] lg:rounded-[2rem] lg:mb-g" ref={sidebarRef}>
                                {sidebarMenu.map((parent: any, index: number) => {
                                    const html = parent.title.replace('d-lg-none', 'lg:hidden');
                                    const parentHandle = parentCollection ? parentCollection?.collection?.handle : null;
                                    const isLast = (sidebarMenu.length - 1) === index;
                                    return (
                                        <li className={`${!isLast ? 'mb-[.75em]' : 'mb-0'}`} key={`sidebarr--${parent.handle}-${index}`}>
                                            <a
                                                className={`hover:no-underline hover:text-primary text-base
                                                ${handle === parent.handle || parent.handle === parentHandle ? 'text-primary' : 'text-body'}`}
                                                href={`/collections/${parent.handle}`}
                                                dangerouslySetInnerHTML={{ __html: html }}
                                            />
                                        </li>)
                                })}
                            </ul>
                        </aside>
                    )} */}
                    <div className={`w-full collection-template__products flex flex-wrap items-start min-h-[400px]`}>
                        <div className={`flex flex-wrap w-full justify-between items-center px-g lg:px-2`}>
                            <h1 className={`${titleCharacterCount > 20 ? 'text-sm' : 'text-lg'} lg:text-2xl leading-[30px] lg:leading-[40px] block w-[calc(100%-135px)] lg:w-3/5 lg:order-first self-center text-body`}
                                dangerouslySetInnerHTML={{ __html: collectionTitle ?? 'Shop All' }}
                            />
                            {/* {collectionSettings.isLoading || loading ? (
                                <>
                                    <div className={`w-1/2 px-hg lg:hidden ${handle === 'all' ? 'mb-2' : ''}`}>
                                        <div className="bg-shimmer pt-[50px] rounded"></div>
                                    </div>
                                    <div className={`w-1/2 lg:w-2/5 items-center justify-end px-hg lg:pr-0 lg:hidden ${handle === 'all' ? 'mb-2' : ''}`}>
                                        <div className="bg-shimmer pt-[50px] rounded"></div>
                                    </div>
                                    {handle !== 'all' && (
                                        <div className="w-full px-hg lg:px-0 mt-1 mb-1">
                                            <div className="collection-grid__tags w-auto overflow-x-scroll mb-4 flex mt-1">
                                                <a className="invisible collection-grid__tags-link rounded-full text-nowrap mr-1 py-1 px-2 hover:no-underline text-white bg-primary hover:text-white">
                                                    All
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : ( */}
                            <>
                                {!isLoading && (
                                    <>
                                        {/* <div className="w-1/2 lg:hidden px-hg">
                                            <select aria-label="Filter collection items by sub collection" onChange={selectFilterChange} className={`custom-select p-1 rounded bg-gray-400 ${handle === 'all' ? 'mb-2' : ''} border border-gray-400 pl-g lg:min-w-[154px] w-full min-h-[3.125em] indent-0`} defaultValue={handle === 'all' ? '' : selectFilterValue}>
                                                <option value="">Filter by</option>
                                                {mobileDropdown.map((parent: any, index: number) => {
                                                    const html = parent.title.replace('d-lg-none', 'lg:hidden');
                                                    return (<option key={`collection--filter-${parent.handle}-${index}`} value={parent.handle} dangerouslySetInnerHTML={{ __html: html }} />);
                                                })}
                                            </select>
                                        </div> */}
                                        <div className="w-auto lg:w-2/5 lg:hidden items-center justify-end px-0 lg:pr-0">
                                            {/* <select aria-label="Sort collection items by" name="sort" onChange={selectSortChange} className={`border-none custom-select pl-0 pr-[.5rem] bg-white w-[170px] min-h-[3.125em] indent-0 text-right pr-[40px]`} defaultValue={defaultSort}>
                                                <option value="featured">Sort By</option>
                                                <option value="best-selling">Best selling</option>
                                                <option value="price-low-high">Price, low to high</option>
                                                <option value="price-high-low">Price, high to low</option>
                                                <option value="newest">Date, new to old</option>
                                            </select> */}
                                            <FilterOptions className="lg:hidden" />
                                        </div>
                                    </>
                                )}
                            </>
                            {/* )} */}

                            {handle === 'all' && <FilterOptions className="hidden lg:flex" />}
                        </div>
                        {/* {handle !== 'all' && ( */}
                        {handle !== 'all' && (
                            <div className="flex lg:justify-between items-center w-full mt-0 lg:mt-[1rem] px-g lg:px-2">
                                <div className="w-full lg:w-8/12">
                                    <div className="collection-grid__tags w-auto overflow-x-scroll flex gap-[.375rem]" ref={subCatRef}>
                                        {childMenu.length > 0 && childMenu.map((children, index) => {
                                            if (children && children.handle && !children.handle.includes('/pages/') && !children.title.toLowerCase().includes('quiz')) {
                                                const html = mainCollHandles.includes(children.handle) ? 'All' : children.title.replace('d-lg-none', 'lg:hidden');
                                                const isSpfTan = childMenu.find((item) => item.handle === 'tan-and-spf');
                                                // let parentHandle = parentCollection !== null ? parentCollection.collection.handle : handle;
                                                // if (window && window.location.search?.includes('p=')) {
                                                //     const params = new URLSearchParams(window.location.search);
                                                //     parentHandle = params.get('p')
                                                // }
                                                return (
                                                    <Link
                                                        scroll={false}
                                                        key={`tags--${children.handle}-${index}`}
                                                        href={`/collections/${children.handle}${isSpfTan
                                                            ? `?main-collection=tan-and-spf&p=${parentParam}`
                                                            : parentParam
                                                                ? `?p=${parentParam}`
                                                                : parentCollection?.collection?.handle
                                                                    ? `?p=${parentCollection.collection.handle}`
                                                                    : ''
                                                            }`}
                                                        className={`collection-grid__tags-link text-nowrap py-1 px-2 hover:no-underline leading-[25px]
                                                                ${children.handle === handle ? `active text-white ${generalSetting?.bfcm_cta_bg_color === 'bg-dark' ? 'bg-dark' : 'bg-body'} hover:text-white` : 'text-gray-600'}`}
                                                        onClick={showLoading}
                                                        dangerouslySetInnerHTML={{ __html: children.title.toLowerCase().includes('accessories') ? 'Accessories' : html }}
                                                    />
                                                );
                                            }
                                        })}
                                        {childMenu.length === 0 && (
                                            <Link
                                                href={`/collections/${handle}`}
                                                className={`text-nowrap mr-1 py-1 px-2 hover:no-underline text-gray-600 hover:text-gray-600`}
                                                onClick={showLoading}
                                                scroll={false}
                                            >All</Link>
                                        )}
                                    </div>
                                </div>
                                <FilterOptions className="hidden lg:flex" />
                            </div>
                        )}
                        {/* )} */}
                        {!showSpinner && !loading && collProducts.length <= 0 && !isLoading && !collectionSettings.isLoading && (
                            <div className="w-full">
                                <p className="px-hg lg:px-0 mb-[1rem] w-full collection-grid--empty">Sorry, there are no products in this collection.</p>
                            </div>
                        )}
                        <div className={`grid grid-cols-2 lg:grid-cols-4 collection-grid ${handle === 'all' ? 'pt-[.5rem]' : 'pt-2'} lg:pt-[1.5rem] overflow-hidden w-full gap-x-g gap-y-[2.375rem] lg:gap-x-[1rem] lg:gap-y-[1.5rem] px-g lg:px-2 pb-[2.375rem] lg:pb-5`}>
                            {(showSpinner || loading || isLoading || collectionSettings.isLoading) && (
                                <div className="mb-3 px-hg lg:px-g text-center w-full block col-span-2 lg:col-span-4">
                                    <div className="mx-auto h-3 w-3 animate-spin rounded-full border-4 border-body border-t-white" />
                                </div>
                            )}
                            {collProducts.length > 0 && collProducts.map((item: any, index: number) => {
                                const { isLaunchWL, launchBox } = checkLaunchWLBox(launchWL, item.handle);
                                const lgOrder = index <= 3 ? index + 1 : index + 2;
                                return (
                                    <Fragment key={`collection-b-${handle}-${item.id}-${index}`}>
                                        {showByobCard.show && index === showByobCard?.position && (
                                            <div className="col-span-2 lg:col-span-1 collection-lg-order" style={{ '--lg-order': showByobCard?.dtPosition } as React.CSSProperties}>
                                                {!collectionSettings.isLoading && (
                                                    <ProductCardKit
                                                        className="relative flex flex-col text-center collection-lg-order"
                                                        store={store}
                                                    />
                                                )}
                                                {collectionSettings.isLoading && (
                                                    <QuizCardPlaceholder />
                                                )}
                                            </div>
                                        )}
                                        {showQuizCard && index === 1 ? (
                                            <>
                                                <ProductCard
                                                    product={item}
                                                    className={`relative flex flex-col text-center collection-lg-order`}
                                                    style={{ '--lg-order': lgOrder } as React.CSSProperties}
                                                    button={true}
                                                    setWaitlistData={setWaitlistData}
                                                    smSingleStar={true}
                                                    addToCart={addToCart}
                                                    trackEvent={trackEvent}
                                                    eventNameOnClick='collection_product_card'
                                                    preOrders={preOrders}
                                                    isLaunchWL={isLaunchWL}
                                                    launchBox={launchBox}
                                                    setLaunchWLModal={setLaunchWLModal}
                                                    setLaunchWLModal2={setLaunchWLModal2}
                                                    setLaunchWLModal3={setLaunchWLModal3}
                                                    generalSetting={generalSetting}
                                                    collectionTemplate={true}
                                                    store={store}
                                                    customProductTitle={customProductTitle}
                                                />

                                                <div className="col-span-2 lg:col-span-1 collection-lg-order" style={{ '--lg-order': 4 } as React.CSSProperties}>
                                                    {!collectionSettings.isLoading && (
                                                        handle === 'spf' || (parentCollection && parentCollection?.collection?.handle === 'spf') ? (
                                                            <ProductCardQuiz
                                                                className="relative w-full lg:h-full"
                                                                href={collectionSettings?.quizSetting?.spf_quiz_button_url}
                                                                title={collectionSettings?.quizSetting?.spf_quiz_title}
                                                                heading="SPF Quiz"
                                                                imgMb="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/d336dfd0-5036-429d-18bb-fef66ee83500/public"
                                                                imgDt="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/7f323caa-7653-498e-bca3-b226fa9b9a00/public"
                                                                key={`collection-quiz-card--spf--${index}`}
                                                                quizSetting={collectionSettings.quizSetting}
                                                                store={store}
                                                                ctaBgColor={generalSetting?.spf_cta_bg_color}
                                                                ctaLabel={collectionSettings.quizSetting?.spf_quiz_button_cta}
                                                            />
                                                        ) : (
                                                            <div className="w-full lg:h-full flex flex-col gap-[.75rem] md:gap-0 lg:justify-between lg:pb-[1rem]">
                                                                <ProductCardQuiz
                                                                    className="relative"
                                                                    href={collectionSettings?.quizSetting?.quiz_button_url}
                                                                    title={collectionSettings?.quizSetting?.quiz_title}
                                                                    ctaLabel={collectionSettings.quizSetting?.quiz_button_cta}
                                                                    imgMb="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/Quiz_Card_MB_x96.jpg?v=1776308056"
                                                                    imgDt="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/Quiz_Card_DT_417x285_crop_center.jpg?v=1776308057"
                                                                    key={`collection-quiz-card--${handle}--${index}`}
                                                                    quizSetting={collectionSettings.quizSetting}
                                                                    store={store}
                                                                    ctaBgColor={generalSetting?.bfcm_cta_bg_color}
                                                                    splitVersion={currentCollection?.handle === 'tan' || !!(parentCollection && parentCollection?.collection?.handle === 'tan')}
                                                                />

                                                                {(currentCollection?.handle === 'tan' || (parentCollection && parentCollection?.collection?.handle === 'tan')) && (
                                                                    <ProductCardQuiz
                                                                        className="relative"
                                                                        imgMb="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/BYOB_Card_MB_x96.jpg?v=1776308056"
                                                                        imgDt="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/BYOB_Card_DT_417x285_crop_center.jpg?v=1776308057"
                                                                        key={`collection-byob-card--${handle}--${index}`}
                                                                        href='/pages/build-your-own-bundle'
                                                                        ctaLabel='Get Started'
                                                                        heading='Build Your Own Bundle'
                                                                        title='Mix, match & save <br />your way!'
                                                                        store={store}
                                                                        ctaBgColor={generalSetting?.bfcm_cta_bg_color}
                                                                    />
                                                                )}
                                                            </div>
                                                        )
                                                    )}

                                                    {collectionSettings.isLoading && (
                                                        <QuizCardPlaceholder split={currentCollection?.handle === 'tan' || !!(parentCollection && parentCollection?.collection?.handle === 'tan')} />
                                                    )}
                                                </div>
                                            </>
                                        ) : (
                                            <ProductCard
                                                product={item}
                                                className={`relative flex flex-col text-center collection-lg-order`}
                                                style={{ '--lg-order': lgOrder } as React.CSSProperties}
                                                button={true}
                                                setWaitlistData={setWaitlistData}
                                                smSingleStar={true}
                                                addToCart={addToCart}
                                                trackEvent={trackEvent}
                                                eventNameOnClick='collection_product_card'
                                                preOrders={preOrders}
                                                isLaunchWL={isLaunchWL}
                                                launchBox={launchBox}
                                                setLaunchWLModal={setLaunchWLModal}
                                                setLaunchWLModal2={setLaunchWLModal2}
                                                setLaunchWLModal3={setLaunchWLModal3}
                                                generalSetting={generalSetting}
                                                collectionTemplate={true}
                                                store={store}
                                                customProductTitle={customProductTitle}
                                            />
                                        )}
                                    </Fragment>
                                );
                            })}
                            {/* {collProducts.length === 2 && showQuizCard && (
                                collectionSettings.isLoading ? (
                                    <ProductCardQuiz
                                        className="relative w-full lg:h-full"
                                        imgMb="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/d336dfd0-5036-429d-18bb-fef66ee83500/public"
                                        imgDt="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/7f323caa-7653-498e-bca3-b226fa9b9a00/public"
                                        key={`collection-quiz-card--${handle}--99`}
                                        quizSetting={collectionSettings.quizSetting}
                                        store={store}
                                        ctaBgColor={generalSetting?.bfcm_cta_bg_color}
                                    />
                                ) : (
                                    <QuizCardPlaceholder />
                                )
                            )} */}
                            {/* {collProducts.length <= 0 && <p className="collection-grid--empty">Sorry, there are no products in this collection.</p>} */}
                        </div>
                        {bannerData?.seo_description && (
                            <div className="w-full">
                                <p className="px-g lg:px-2 mb-[1rem] w-full collection-grid--empty">{bannerData.seo_description}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>


            {!collectionSingle.isLoading && footerAbout.enabled && initMain && (
                <>
                    <hr className="collection-footer border-gray-400 mt-0 mb-25 lg:hidden" />
                    {!isLoading && <hr className="collection-footer border-gray-400 my-2" />}
                    <div className="container py-2 mb-2">
                        {collectionSingle.collectionSingle.about_our_products.title && <h2 className="mb-2">{collectionSingle.collectionSingle.about_our_products.title}</h2>}
                        {!isLoading && (
                            <>
                                <style jsx>{footerCss}</style>
                                <div
                                    className="collection-footer__html"
                                    dangerouslySetInnerHTML={{ __html: collectionSingle.collectionSingle.about_our_products.content_body }}
                                />
                            </>
                        )}
                    </div>
                </>
            )}

            {!isLoading && loadWaitlist && (
                <Modal className="modal-lg lg:max-w-[43.125rem] modal-dialog-centered" isOpen={waitlistData.open} handleClose={() => setWaitlistData({ ...waitlistData, ...{ open: false } })}>
                    <ModalWaitlist store={store} bluecoreProductWaitlist={bluecoreProductWaitlist} trackBluecoreEvent={trackBluecoreEvent} data={waitlistData} waitlistPdp={waitlistPdpSetting} handleClose={() => setWaitlistData({ ...waitlistData, ...{ open: false } })} />
                </Modal>
            )}
            {!isLoading && launchWL && (
                <LaunchWaitlistModals
                    launchWL={launchWL}
                    store={store}
                    setLaunchWLModal={setLaunchWLModal}
                    setLaunchWLModal2={setLaunchWLModal2}
                    setLaunchWLModal3={setLaunchWLModal3}
                    launchWLModal={launchWLModal}
                    launchWLModal2={launchWLModal2}
                    launchWLModal3={launchWLModal3}
                    loggedInEmail={loggedInEmail}
                    setLaunchWLSuccess={setLaunchWLSuccess}
                    launchSubmitted={launchSubmitted}
                    setLaunchSubmitted={setLaunchSubmitted}
                    trackBluecoreLaunchWaitlistEvent={trackBluecoreLaunchWaitlistEvent}
                    submitsToSmsBumpAPi={submitsToSmsBumpAPi}
                />
            )}
        </>
    )
}

export default Collection;
