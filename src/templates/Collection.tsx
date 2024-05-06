import Modal from "~/components/Modal";
import Terms from "~/components/modal/Terms";
import ProductCard from "~/compounds/ProductCard";
import ProductCardQuiz from "~/compounds/ProductCardQuiz";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCollectionSettings, useCollectionSingle } from "~/hooks/useCollection";
import ModalWaitlist from "~/components/modal/Waitlist";
import usePreview from "~/hooks/usePreview";


const Inner = ({ isLoading, title, bannerData, bannerLoading }) => {
    return (
        <figure className="w-full relative items-center px-0 mb-0 lg:mb-g">
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

	const { collectionBanner } = strapiBanner.mainSettings;

	const bannerData = universalEnabled ? {
	    img_mob: universalImgMob,
	    img_desk: universalImgDesk,
	    url: universalUrl,
	    enabled: universalEnabled,
	} : collectionBanner.collectionBanner[strapiBanner.store];
    return (
        <>
            {!strapiBanner.isLoading && bannerData.url === '' && <Inner isLoading={isLoading} title={title} bannerData={bannerData} bannerLoading={strapiBanner.isLoading} />}
            {!strapiBanner.isLoading && bannerData.url !== '' && (
                <Link href={bannerData.url}>
                    <Inner isLoading={isLoading} title={title} bannerData={bannerData} bannerLoading={strapiBanner.isLoading} />
                </Link>
            )}
        </>
    );
}

const Collection = (props: any) => {
    const {
        products,
        isLoading,
        mainCollections,
        handle,
        currentCollection,
        showSpinner,
        childrenCollections,
        parentCollection,
        globalSettings,
    } = props;

    const sidebarRef = useRef(null);
    const subCatRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [isOpen, toggle] = useState(false);
    const [waitlistData, setWaitlistData] = useState({
        open: false,
        title: '',
        image: ''
    });
	const handlOpenModal = (open: boolean) => {
		toggle(open);
	};
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const sortedByAvailable = products.sort((a, b) => b.availableForSale - a.availableForSale);
    const mainCollHandles = mainCollections.map((coll) => coll.collection.handle);


    let collectionTitle = currentCollection.title.replace('d-lg-none', 'lg:hidden');
    if (handle !== 'all') {
        collectionTitle = collectionTitle.replace (/^/,'Shop ');
    }

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

    const showQuizCard = handle === 'tan' || handle === 'tan-and-spf' || handle === 'tan-sets' || parentCollection?.collection?.handle === 'tan' || parentCollection?.collection?.handle === 'tan-and-spf';

    const selectFilterChange = (e: any) => {
        showLoading(e);
        router.push(`/collections/${e.target.value}`);
    };
    let selectFilterValue = currentCollection?.handle;
    if (parentCollection && parentCollection.collection) {
        selectFilterValue = parentCollection.collection.handle;
    }

    const selectSortValue = searchParams.get('sort');

    const selectSortChange = (e: any) => {
        showLoading(e);
        router.push(pathname + '?' + createQueryString('sort', e.target.value));
    };

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    useEffect(() => setLoading(false), [currentCollection]);
    const collectionSettings = useCollectionSettings(handle);
    const collectionSingle = useCollectionSingle(handle);
    const footerAbout = collectionSingle.collectionSingle?.about_our_products || false;

    const variantWatlist = [];
    const waitlistProducts = sortedByAvailable.filter((item: any) => !item.availableForSale);
    const waitlistVariants = sortedByAvailable.map((item: any) => {
        const variantOos = item.variants.nodes.filter((node: any) => !node.availableForSale);
        if (variantOos.length > 0) variantWatlist.push(variantOos);
    });

    let MODAL_WAITLIST = {
        title: 'Oh coco-nuts!',
        desc: 'Our <strong>Miracle Hair Elixir</strong>  has become a worldwide hit and we\'re struggling to keep up with the demand. But don\'t worry, we\'re on it! Sign up to join the waitlist.',
        date: 'RESTOCKING 6th OCTOBER',
        invalidEmail: 'Invalid Email Address',
        email: 'Enter your email',
        ctaText: 'Yes, notify me!',
        image: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/b653f2b3-08b7-421c-351a-3a5b70a27e00/public'
    };

    if (!globalSettings.isLoading) {
        const { isPreview } = usePreview();
        const store = (isPreview) ? 'dev' : 'us';
        const waitlistPopup = globalSettings?.data?.ThemeSettings.find((t: any) => t.__component === 'theme.product-waitlist-popup');
        const waitlistPopupData = waitlistPopup?.waitlistPopup?.waitlistPopup[store];
        MODAL_WAITLIST = {
            title: waitlistPopupData.waitlist_popup_form_title,
            desc: `${waitlistData.title} ${waitlistPopupData.waitlist_popup_form_description_2}`,
            date: '',
            invalidEmail: waitlistPopupData.email_invalid,
            email: waitlistPopupData.email_placeholder,
            ctaText: waitlistPopupData.waitlist_popup_form_submit,
            image: waitlistData.image,
        };
    }

    return (
        <>
            {!collectionSettings.isLoading && (
                <Banner isLoading={isLoading} title={collectionTitle} strapiBanner={collectionSettings} />
            )}

            {!isLoading && (
                <>
                    <div className="text-left terms--link mt-25">
                        <a onClick={() => handlOpenModal(true)} className="px-1 py-1 underline text-primary font-size-sm">Terms and Conditions</a>
                    </div>

                    <Modal className="modal" isOpen={isOpen} handleClose={() => handlOpenModal(false)}>
                        <Terms handleClose={() => handlOpenModal(false)} />
                    </Modal>
                </>
            )}

            <div className="container mt-3 px-0 lg:px-g">
                <div className="flex flex-wrap overflow-hidden lg:-mx-g">
                    {!isLoading && mainCollections.length > 0 && (
                        <aside className="w-1/4 hidden px-g lg:block">
                            <span className="block collection-sidebar-label mb-1 mt-3"><strong>Category</strong></span>
                            <ul className="collection__sidebar list-unstyled border border-body p-2 w-2/3 rounded" ref={sidebarRef}>
                                {mainCollections.sort((a, b) => a.idx - b.idx).map((parent: any) => {
                                    const { collection } = parent;
                                    const html = collection.title.replace('d-lg-none', 'lg:hidden');
                                    const parentHandle = parentCollection ? parentCollection?.collection?.handle : null;
                                    return (
                                    <li className="mb-1" key={parent.idx}>
                                        <Link
                                            onClick={showLoading}
                                            className={`hover:no-underline hover:text-primary
                                                ${handle === collection.handle || collection.handle === parentHandle ? 'text-primary' : 'text-body'}`}
                                            href={`/collections/${collection.handle}`}
                                            dangerouslySetInnerHTML={{ __html: html }}
                                        />
                                    </li>)
                                })}
                            </ul>
                        </aside>
                    )}
                    <div className="w-full lg:w-3/4 collection-template__products flex flex-wrap">
                        <div className={`flex flex-wrap w-full justify-between mb-25 lg:mb-0 lg:px-g ${handle === 'all' ? 'lg:mb-2' : ''}`}>
                            <h2 className="h1 hidden lg:block w-full lg:w-3/5 lg:order-first self-center"
                                dangerouslySetInnerHTML={{ __html: collectionTitle ?? 'Shop All' }}
                            />
                            {!isLoading && (
                                <>
                                    <div className="w-1/2 lg:hidden px-hg">
                                        <select onChange={selectFilterChange} className="custom-select p-1 rounded bg-white mb-2 border border-body w-full min-h-[50px]" defaultValue={selectFilterValue}>
                                            <option>Filter by</option>
                                            {mainCollections.map((parent: any) => {
                                                const { collection } = parent;
                                                const html = collection.title.replace('d-lg-none', 'lg:hidden');
                                                return (<option key={parent.idx} value={collection.handle} dangerouslySetInnerHTML={{ __html: html }} />);
                                            })}
                                        </select>
                                    </div>
                                    <div className="w-1/2 lg:w-2/5 lg:flex items-center justify-end px-hg">
                                        <select name="sort" onChange={selectSortChange} className="custom-select p-1 w-full lg:w-auto rounded mb-2 lg:mb-0 custom-select bg-white border border-body pr-1 lg:pr-3 min-h-[50px]" defaultValue={selectSortValue}>
                                            <option value="featured">Sort By</option>
                                            <option value="best-selling">Best Selling</option>
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
                                        {childrenCollections.length > 0 && childrenCollections.sort((a, b) => a.idx - b.idx).map((children) => {
                                            const { collection } = children;
                                            if (collection && collection.handle) {
                                                const html = mainCollHandles.includes(collection.handle) ? 'All' : collection.title.replace('d-lg-none', 'lg:hidden');
                                                return (
                                                    <Link
                                                        key={children.idx}
                                                        href={`/collections/${collection.handle}`}
                                                        className={`rounded-full text-nowrap mr-1 py-1 px-2 hover:no-underline
                                                            ${collection.handle === handle ? 'text-white bg-primary hover:text-white' : 'bg-gray-400 text-gray-600 hover:text-gray-600'}`}
                                                        onClick={showLoading}
                                                        dangerouslySetInnerHTML={{ __html: html }}
                                                    />
                                                );
                                            }
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                        {!isLoading && (
                            <div className="flex flex-wrap collection-grid overflow-hidden w-full">
                                {(showSpinner || loading) && (
                                    <div className="mb-3 px-hg lg:px-g text-center w-full">
                                        <div className="mx-auto h-3 w-3 animate-spin rounded-full border-4 border-body border-t-white" />
                                    </div>
                                )}
                                {sortedByAvailable.length > 0 && sortedByAvailable.map((item: any, index: number) => {
                                    if (!item.src) {
                                        item.src = item.featuredImage?.url.replace('.jpg', '_320x320_crop_center.jpg');
                                        item.srcSet = item.featuredImage?.url.replace('.jpg', '_540x540_crop_center.jpg');
                                    }
                                    return showQuizCard && index === 2 ? (
                                        <>
                                            <ProductCardQuiz key={item.id} />
                                            <ProductCard
                                                key={item.id}
                                                product={item}
                                                className="relative mb-5 flex flex-col w-1/2 md:w-1/3 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
                                                button={true}
                                                setWaitlistData={setWaitlistData}
                                            />
                                        </>
                                    ) : (
                                        <ProductCard
                                            key={item.id}
                                            product={item}
                                            className="relative mb-5 flex flex-col w-1/2 md:w-1/3 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
                                            button={true}
                                            setWaitlistData={setWaitlistData}
                                        />
                                    )
                                })}
                                {products.length <= 0 && <p className="collection-grid--empty">Sorry, there are no products in this collection.</p>}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {!collectionSingle.isLoading && footerAbout.enabled && (
                <>
                    {!isLoading && <hr className="collection-footer border-gray-400 my-2" />}
                    <div className="container py-2 mb-2">
                        {collectionSingle.collectionSingle.about_our_products.title && <h2 className="mb-2">{collectionSingle.collectionSingle.about_our_products.title}</h2>}
                        {!isLoading && (
                            <div
                                dangerouslySetInnerHTML={{ __html: collectionSingle.collectionSingle.about_our_products.content_body }}
                            />
                        )}
                    </div>
                </>
            )}

            {!isLoading && !globalSettings.isLoading && waitlistProducts.length > 0 && waitlistVariants.length > 0 && (
                <Modal className="modal-lg" isOpen={waitlistData.open} handleClose={() => setWaitlistData({...waitlistData, ...{open: false}})}>
                    <ModalWaitlist data={MODAL_WAITLIST} handleClose={() => setWaitlistData({...waitlistData, ...{open: false}})} />
                </Modal>
            )}
        </>
    )
}

export default Collection;
