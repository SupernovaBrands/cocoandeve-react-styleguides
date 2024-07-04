import Modal from "~/components/Modal";
// import Terms from "~/components/modal/Terms";
import TermCondition from '~/components/modal/TermCondition';
import ProductCard from "~/compounds/ProductCard";
import ProductCardQuiz from "~/compounds/ProductCardQuiz";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCollectionSettings, useCollectionSingle } from "~/hooks/useCollection";
import ModalWaitlist from "~/components/modal/Waitlist";
import { getFeaturedImages, isWaitlist, subscribeBluecoreWaitlist } from "~/modules/utils";
import Service from "~/sections/Service";
import { sidebar_collection_ph } from '~/modules/placeholders';
import LaunchWaitList from "~/compounds/launch-waitlist";

const Inner = ({ isLoading, title, bannerData, bannerLoading }) => {
    return (
        <figure className="w-full relative items-center px-0 mb-0">
            {!isLoading && !bannerLoading && (
                <picture>
                    <source srcSet={bannerData.img_desk.url} media="(min-width: 992px)" />
                    <img src={bannerData.img_mob.url} className="w-full" alt="Collection Banner" />
                </picture>
            )}
            <figcaption className="w=full flex lg:visible absolute w-auto items-center my-auto top-0 bottom-0">
                <h1 className="hidden mb-0"
                    dangerouslySetInnerHTML={{ __html: title ?? 'Shop All' }}
                />
            </figcaption>
        </figure>
    );
}

const Banner = ({ isLoading, title, strapiBanner }) => {

    const { universalCollectionSetting } = strapiBanner.universalBanner;
    const {
	    filter_handles_img_mob: universalImgMob,
	    filter_handles_img_desk: universalImgDesk,
	    filter_handles_img_url: universalUrl,
	    enabled: universalEnabled,
	} = universalCollectionSetting.universalCollectionSetting[strapiBanner.store];
    // by default use universal banner image
    let bannerData = {
        img_mob: universalImgMob,
	    img_desk: universalImgDesk,
	    url: universalUrl,
	    enabled: universalEnabled,
    };

    const { collectionBanner } = strapiBanner.mainSettings;
    if (collectionBanner && collectionBanner.collectionBanner[strapiBanner.store]?.enabled) {
        // use specific collection banner image if its enabled
        bannerData = collectionBanner.collectionBanner[strapiBanner.store];
    }
    return (
        <>
            {!strapiBanner.isLoading && bannerData.url === '' && <Inner isLoading={isLoading} title={title} bannerData={bannerData} bannerLoading={strapiBanner.isLoading} />}
            {!strapiBanner.isLoading && bannerData.url !== '' && (
                <a href={bannerData.url}>
                    <Inner isLoading={isLoading} title={title} bannerData={bannerData} bannerLoading={strapiBanner.isLoading} />
                </a>
            )}
        </>
    );
}

const Collection = (props: any) => {
    const {
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
        store,
        buildProductCardModel,
        trackBluecoreEvent,
        trackEvent,
        preOrders,
        launchWL,
        trackBluecoreLaunchWaitlistEvent,
		submitsToSmsBumpAPi,
		// subscribeBluecoreWaitlist,
        loggedInEmail,
        squareBadge,
    } = props;

    const [featuredImg, setFeaturedImg] = useState<any>([]);
    const [sevenDaysSalesIds, setSevenDaysSalesIds] = useState([]);
    const sidebarRef = useRef(null);
    const subCatRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [isOpen, toggle] = useState(false);
    const [launchHandles, setLaunchHandles] = useState([]);
    const [initSub, setInitSub] = useState(false);
    const [initMain, setInitMain] = useState(false);
    // const [height, setHeight] = useState(0);
    const [launchSubmitted, setLaunchSubmitted] = useState(false);
    const [waitlistData, setWaitlistData] = useState({
        open: false,
        title: '',
        image: '',
        handle: undefined,
    });
    const [launchWLModal, setLaunchWLModal] = useState({
        open: false,
        variantId: null,
        handle: null
    });
    const [launchWLSuccess, setLaunchWLSuccess] = useState(false);
    const [showQuizCard, setShowQuizCard] = useState(false);
	const handlOpenModal = (open: boolean) => {
		toggle(open);
	};
    const router = useRouter();
    const [sidebarMenu, setSidebarMenu] = useState(sidebar_collection_ph);
    const [childMenu, setChildMenu] = useState([]);
    const [defaultSort, setDefaultSort] = useState(sort);

    const mainCollHandles = mainCollectionHandles && mainCollectionHandles.split(',');

    const [collProducts, setCollProducts] = useState(products);

    // let collectionTitle = currentCollection.title.replace('d-lg-none', 'lg:hidden');
    // if (handle !== 'all') {
    //     collectionTitle = collectionTitle.replace (/^/,'Shop ');
    // }

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
                els.classList.add('bg-gray-400','text-gray-600', 'hover:text-gray-600');
                els.classList.remove('text-white', 'bg-primary', 'hover:text-white');
            });
            e.target.classList.add('text-white', 'bg-primary', 'hover:text-white');
            e.target.classList.remove('bg-gray-400','text-gray-600', 'hover:text-gray-600');
        }
        setLoading(true);
    };

    const selectFilterChange = (e: any) => {
        showLoading(e);
        let handle = e.target.value;
        if (e.target.value === '') handle = 'all';
        window.location.href = `/collections/${handle}`;
    };
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
        // console.log('productUnavailable', productUnavailable);
        if (itemsWL.length > 0 && sort === 'best-selling') {
            const index = productUnavailable.length > 5 ? 5 : 3;
            // console.log('iundex', index);
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


    const selectSortChange = (e: any) => {
        showLoading(e);
        const sort = e.target.value === 'best-selling' ? 'featured' : e.target.value;
        fetch(`/api/collectionProducts/?sort=${sort}&handle=${currentCollection.handle}`).then((r) => r.json())
            .then((data) => {
                const { products } = data;
                const mapped = products.map((p) => buildProductCardModel(store, featuredImg, p, generalSetting, squareBadge));
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
        // console.log('currentCollection', currentCollection);
        setShowQuizCard(handle === 'tan' || handle === 'suncare-tan' || handle === 'tan-and-spf' || handle === 'tan-sets' || parentCollection?.collection?.handle === 'tan' || parentCollection?.collection?.handle === 'tan-and-spf');
        setLoading(false);
    }, [currentCollection]);

    const collectionSettings = useCollectionSettings(handle);
    const handleFooter = parentCollection === null ? handle : parentCollection?.collection?.handle;
    const collectionSingle = useCollectionSingle(handleFooter);
    const footerAbout = collectionSingle.collectionSingle?.about_our_products || false;

    const loadWaitlist = isWaitlist(collProducts);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/collectionInfo?${new URLSearchParams({
			parentHandle: mainCollectionHandles,
            childrenHandle: subHandles
		})}`).then((res) => res.json()).then((data) => {
            setSidebarMenu(data.parents);
            setChildMenu(data.childrens);
            if (defaultSort !== 'featured') {
                fetch(`/api/collectionProducts/?sort=${defaultSort}&handle=${currentCollection.handle}`).then((r) => r.json())
                .then((data) => {
                    const { products } = data;
                    const mapped = products.map((p) => buildProductCardModel(store, featuredImg, p, generalSetting, squareBadge));
                    setCollProducts(mapped);
                    setLoading(false);
                });
            }
            setLoading(false);
        });
    }, [handle]);

    useEffect(() => {
        const sortedByAvailable = products.sort((a, b) => b.availableForSale - a.availableForSale);
        setCollProducts(sortedByAvailable);
    }, [products]);

    useEffect(() => {
        if (launchWLModal.open) {
            document.body.classList.add('!overflow-hidden');
            // if (window) setHeight(window.innerHeight);
        } else {
            document.body.classList.remove('!overflow-hidden');
        }
    }, [launchWLModal]);

    useEffect(() => {
        getFeaturedImages().then((dataImg) => setFeaturedImg(dataImg));
        fetch(`/api/sevenDaysSalesIds`).then(
			res => {
				res?.json().then(data => {
					const ids = data?.body?.data?.shop?.listIds?.value?.split(',') || [];
					setSevenDaysSalesIds(ids.map((i) => parseInt(i, 10)));
				})
			}
		);
        setInitMain(parentCollection === null);
        setInitSub(parentCollection !== null);
    }, []);

    useEffect(() => {
        if (launchWL) {
            setLaunchHandles(launchWL.launch_wl_handles.split(',').map((v) => v.trim()) || []);
        }
    }, [launchWL]);

    useEffect(() => {
        if (waitlistData.open) document.body.classList.add('overflow-y-hidden');
        else document.body.classList.remove('overflow-y-hidden');
    }, [waitlistData]);

    useEffect(() => {
        if (isOpen) document.body.classList.add('!overflow-y-hidden');
        else document.body.classList.remove('!overflow-y-hidden');
    }, [isOpen]);

    const onSubmitLaunchWaitlist = ({ email, phoneCode, phoneNumber, fallback }) => {
        const regSource = launchWL.launch_wl_popup_regsource;
        const smsBump = launchWL.launch_wl_smsbump;

        if (email) {
            subscribeBluecoreWaitlist(email, launchWLModal.handle, launchWLModal.variantId, regSource ? regSource : `launch-item-${launchWLModal.handle}`, phoneNumber, true, '');
            trackBluecoreLaunchWaitlistEvent(email, 'Sweepstakes');
        }

        if (phoneNumber && phoneCode) {
            submitsToSmsBumpAPi(phoneNumber, smsBump, phoneCode, store);
        }

        if (typeof(fallback) === 'function') {
            fallback();
        }
    }

    const footerCss = `
    .collection-footer__html p {
        margin-bottom: 1rem;
    }`;

    /* update shop all position to the last item */
    const [first, ...rest] = sidebarMenu;
    const mobileDropdown = [...rest,first];

    return (
        <>
            {!collectionSettings.isLoading && (
                <Banner isLoading={isLoading} title={collectionTitle} strapiBanner={collectionSettings} />
            )}

            {!isLoading && tcPopups?.enabled_collection && (
                <>
                    <div className="text-left terms--link mt-25">
                        <a onClick={() => handlOpenModal(true)} className="px-1 py-1 underline text-primary font-size-sm">{tcPopups.copy}</a>
                    </div>

                    <Modal backdropClasses="lg:overflow-y-hidden" className="modal modal-dialog-centered !px-1 lg:!px-0 mt-0" isOpen={isOpen} handleClose={() => handlOpenModal(false)}>
                        {/* <Terms handleClose={() => handlOpenModal(false)} tcPopups={tcPopups} /> */}
                        <TermCondition content={tcPopups} handleClose={() => handlOpenModal(false)} />
                    </Modal>
                </>
            )}

            <div className="container mt-3 px-0 lg:px-g">
                <div className="flex flex-wrap overflow-hidden lg:-mx-g">
                    {sidebarMenu.length > 0 && (
                        <aside className="w-1/4 hidden px-g lg:block">
                            <span className="block collection-sidebar-label mb-1 mt-3"><strong className="text-body">Category</strong></span>
                            <ul className="collection__sidebar list-unstyled border border-body p-2 w-2/3 rounded lg:mb-g" ref={sidebarRef}>
                                {sidebarMenu.map((parent: any, index:number) => {
                                    const html = parent.title.replace('d-lg-none', 'lg:hidden');
                                    const parentHandle = parentCollection ? parentCollection?.collection?.handle : null;
                                    const isLast = (sidebarMenu.length - 1) === index;
                                    return (
                                    <li className={`${!isLast ? 'mb-1' : ''}`} key={`sidebarr--${parent.handle}-${index}`}>
                                        <a
                                            // onClick={showLoading}
                                            className={`hover:no-underline hover:text-primary
                                                ${handle === parent.handle || parent.handle === parentHandle ? 'text-primary' : 'text-body'}`}
                                            href={`/collections/${parent.handle}`}
                                            dangerouslySetInnerHTML={{ __html: html }}
                                        />
                                    </li>)
                                })}
                            </ul>
                        </aside>
                    )}
                    <div className="w-full lg:w-3/4 collection-template__products flex flex-wrap">
                        <div className={`flex flex-wrap w-full justify-between lg:px-g ${handle === 'all' ? 'lg:mb-2' : 'lg:mb-0'}`}>
                            <h2 className="h1 hidden lg:block w-full lg:w-3/5 lg:order-first self-center text-body"
                                dangerouslySetInnerHTML={{ __html: collectionTitle ?? 'Shop All' }}
                            />
                            {!isLoading && (
                                <>
                                    <div className="w-1/2 lg:hidden px-hg">
                                        <select onChange={selectFilterChange} className={`custom-select p-1 rounded bg-white ${handle === 'all' ? 'mb-2' : ''} border border-body w-full min-h-[3.125em] indent-0`} defaultValue={handle === 'all' ? '' : selectFilterValue}>
                                            <option value="">Filter by</option>
                                            {mobileDropdown.map((parent: any, index: number) => {
                                                const html = parent.title.replace('d-lg-none', 'lg:hidden');
                                                return (<option key={`collection--filter-${parent.handle}-${index}`} value={parent.handle} dangerouslySetInnerHTML={{ __html: html }} />);
                                            })}
                                        </select>
                                    </div>
                                    <div className="w-1/2 lg:w-2/5 lg:flex items-center justify-end px-hg lg:pr-0">
                                        <select name="sort" onChange={selectSortChange} className={`custom-select p-1 w-full lg:w-auto rounded ${handle === 'all' ? 'mb-2' : ''} lg:mb-0 custom-select bg-white border border-body pr-1 lg:pr-3 min-h-[3.125em] indent-0`} defaultValue={defaultSort}>
                                            <option value="featured">Sort By</option>
                                            <option value="best-selling">Best selling</option>
                                            <option value="price-low-high">Price, low to high</option>
                                            <option value="price-high-low">Price, high to low</option>
                                            <option value="newest">Date, new to old</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            {!isLoading && handle !== 'all' && (
                                <div className="w-full px-hg lg:px-0 mt-1 mb-1">
                                    <div className="collection-grid__tags w-auto overflow-x-scroll mb-4 flex mt-1" ref={subCatRef}>
                                        {childMenu.length > 0 && childMenu.map((children, index) => {
                                            if (children && children.handle) {
                                                const html = mainCollHandles.includes(children.handle) ? 'All' : children.title.replace('d-lg-none', 'lg:hidden');
                                                return (
                                                    <Link
                                                        key={`tags--${children.handle}-${index}`}
                                                        href={`/collections/${children.handle}`}
                                                        className={`rounded-full text-nowrap mr-1 py-1 px-2 hover:no-underline
                                                            ${children.handle === handle ? 'text-white bg-primary hover:text-white' : 'bg-gray-400 text-gray-600 hover:text-gray-600'}`}
                                                        onClick={showLoading}
                                                        dangerouslySetInnerHTML={{ __html: children.title.toLowerCase().includes('accessories') ? 'Accessories' : html }}
                                                    />
                                                );
                                            }
                                        })}
                                        {childMenu.length === 0 && (
                                            <Link
                                                href="/collections/all"
                                                className={`rounded-full text-nowrap mr-1 py-1 px-2 hover:no-underline bg-gray-400 text-gray-600 hover:text-gray-600`}
                                                onClick={showLoading}
                                            >
                                                All
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-wrap collection-grid overflow-hidden w-full">
                            {(showSpinner || loading) && (
                                <div className="mb-3 px-hg lg:px-g text-center w-full">
                                    <div className="mx-auto h-3 w-3 animate-spin rounded-full border-4 border-body border-t-white" />
                                </div>
                            )}
                            {collProducts.length > 0 && collProducts.map((item: any, index: number) => {
                                if (!item.src) {
                                    item.src = item.featuredImage?.url.replace('.jpg', '_320x320_crop_center.jpg');
                                    item.srcSet = item.featuredImage?.url.replace('.jpg', '_540x540_crop_center.jpg');
                                }
                                let isLaunchWL = false;
                                if (launchWL && launchWL?.launch_wl_handles.split(',').map((v) => v.trim()).includes(item.handle)) {
                                    isLaunchWL = true;
                                }
                                return showQuizCard && index === 2 ? (
                                    <>
                                        {!collectionSettings.isLoading && (
                                            <ProductCardQuiz quizSetting={collectionSettings.quizSetting} key={`collection-quiz-card-${handle}--${index}`} />
                                        )}
                                        <ProductCard
                                            key={`collection-b-${handle}-${item.id}-${index}`}
                                            product={item}
                                            className="relative mb-5 flex flex-col w-1/2 md:w-1/3 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
                                            button={true}
                                            setWaitlistData={setWaitlistData}
                                            smSingleStar={true}
                                            addToCart={addToCart}
                                            trackEvent={trackEvent}
                                            eventNameOnClick='collection_product_card'
                                            preOrders={preOrders}
                                            isLaunchWL={isLaunchWL}
                                            setLaunchWLModal={setLaunchWLModal}
                                            generalSetting={generalSetting}
                                        />
                                    </>
                                ) : (
                                    <ProductCard
                                        key={`collection-a-${handle}-${item.id}-${index}`}
                                        product={item}
                                        className="relative mb-5 flex flex-col w-1/2 md:w-1/3 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
                                        button={true}
                                        setWaitlistData={setWaitlistData}
                                        smSingleStar={true}
                                        addToCart={addToCart}
                                        trackEvent={trackEvent}
                                        eventNameOnClick='collection_product_card'
                                        preOrders={preOrders}
                                        isLaunchWL={isLaunchWL}
                                        setLaunchWLModal={setLaunchWLModal}
                                        generalSetting={generalSetting}
                                    />
                                )
                            })}
                            {collProducts.length === 2 && showQuizCard && !collectionSettings.isLoading && (
                                 <ProductCardQuiz quizSetting={collectionSettings.quizSetting} key={`collection-quiz-card-${handle}--99`} />
                            )}
                            {products.length <= 0 && <p className="collection-grid--empty">Sorry, there are no products in this collection.</p>}
                        </div>
                    </div>
                </div>
            </div>

            {!collectionSingle.isLoading && footerAbout.enabled && initMain && (
                <>
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

            {!isLoading && (handle === 'all' || (initSub && !['hair-benefits', 'kits-gifts'].includes(parentCollection?.collection?.handle) && handle !== 'kits-gifts')) && <Service className="!text-base" />}
            {!isLoading && (handle === 'hair-benefits' || parentCollection?.collection?.handle === 'hair-benefits') && <Service className="!text-base" />}
            {!isLoading && (handle === 'kits-gifts' || parentCollection?.collection?.handle === 'kits-gifts') && <Service className="!text-base" />}


            {!isLoading && loadWaitlist && (
                <Modal className="modal-lg lg:max-w-[43.125rem] modal-dialog-centered" isOpen={waitlistData.open} handleClose={() => setWaitlistData({...waitlistData, ...{ open: false }})}>
                    <ModalWaitlist trackBluecoreEvent={trackBluecoreEvent} data={waitlistData} handleClose={() => setWaitlistData({...waitlistData, ...{ open: false }})} />
                </Modal>
            )}
            {!isLoading && launchWL && (
                <Modal backdropClasses="md:overflow-y-hidden" className={`modal-lg max-w-[44.063rem] !px-hg lg:!px-0 modal-dialog-centered`} isOpen={launchWLModal.open} handleClose={() => {setLaunchWLModal({...launchWLModal, ...{ open: false }})}}>
                    <LaunchWaitList
                        title={launchWL.launch_wl_title}
                        content={launchWL.launch_wl_subtitle}
                        tos={launchWL.launch_wl_popup_tos}
                        policy={launchWL.launch_wl_popup_privacy}
                        success_msg={launchWL.launch_wl_thanks_title}
                        success_content={launchWL.launch_wl_thanks_subtitle}
                        cta={launchWL.launch_wl_submit}
                        className="modal-content rounded-[20px] lg:p-4 lg:mb-0 lg:min-h-[34.75rem] border border-[#00000033] bg-clip-padding outline-0"
                        store={store}
                        onSubmitLaunchWaitlist={onSubmitLaunchWaitlist}
                        productCard={true}
                        handleClose={() => setLaunchWLModal({...launchWLModal, ...{ open: false }})}
                        loggedInEmail={loggedInEmail}
                        setLaunchWLSuccess={setLaunchWLSuccess}
                        onClickDiv={(e) => e.stopPropagation()}
                        launchSubmitted={launchSubmitted}
                        setLaunchSubmitted={setLaunchSubmitted}
                    />
                </Modal>
            )}
        </>
    )
}

export default Collection;
