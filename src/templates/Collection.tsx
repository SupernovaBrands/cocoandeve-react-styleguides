import Modal from "~/components/Modal";
import Terms from "~/components/modal/Terms";
import ProductCard from "~/compounds/ProductCard";
import ProductCardQuiz from "~/compounds/ProductCardQuiz";
import { useState } from "react";
import Link from "next/link";

const Banner = ({ data, isLoading, title }) => {
    const { img_desk, img_mob } = data;
    return (
        <figure className="w-full relative items-center px-0 mb-g">
            {!isLoading && (
                <picture>
                    <source srcSet={img_desk.url} media="(min-width: 992px)" />
                    <img src={img_mob.url} className="w-full" alt="Collection Banner" />
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

const Collection = (props: any) => {
    const { store, mainSettings, universalBanner, products, about, isLoading, mainCollections, handle, preview, currentCollection, showSpinner, childrenCollections, parentCollection } = props;

    const [loading, setLoading] = useState(false);
    const [isOpen, toggle] = useState(false);
	const handlOpenModal = (open: boolean) => {
		toggle(open);
	};

    const mainCollHandles = mainCollections.map((coll) => coll.collection.handle);

    const { universalCollectionSetting } = universalBanner;
    const {
        filter_handles_img_mob: universalImgMob,
        filter_handles_img_desk: universalImgDesk,
        filter_handles_img_url: universalUrl,
        enabled: universalEnabled,
    } = universalCollectionSetting.universalCollectionSetting[store];

    const { collectionBanner } = mainSettings;

    const bannerData = universalEnabled ? {
        img_mob: universalImgMob,
        img_desk: universalImgDesk,
        url: universalUrl,
        enabled: universalEnabled,
    } : collectionBanner.collectionBanner[store];

    const { enabled, title, content_body } = about;
    let collectionTitle = currentCollection.title.replace('d-lg-none', 'lg:hidden');
    if (handle !== 'all') {
        collectionTitle = collectionTitle.replace (/^/,'Shop ');
    }

    const showLoading = () => {
        setLoading(true);
    };

    const showQuizCard = handle === 'tan' || handle === 'tan-and-spf';

    return (
        <>
            {bannerData.enabled && bannerData.url && (
                <Link href={bannerData.url}>
                    <Banner data={bannerData} isLoading={isLoading} title={collectionTitle} />
                </Link>
            )}
            {bannerData.enabled && !bannerData.url && (
                <Banner data={bannerData} isLoading={isLoading} title={collectionTitle} />
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
                            <ul className="list-unstyled border border-body p-2 w-2/3 rounded">
                                {mainCollections.map((parent: any) => {
                                    const { collection } = parent;
                                    console.log('collection', collection);
                                    const html = collection.title.replace('d-lg-none', 'lg:hidden');
                                    const parentHandle = parentCollection ? parentCollection?.collection?.handle : null;
                                    return (
                                    <li className="mb-1">
                                        <Link
                                            onClick={showLoading}
                                            className={`hover:no-underline hover:text-primary
                                                ${handle === collection.handle || collection.handle === parentHandle ? 'text-primary' : 'text-body'}`}
                                            href={`/collections/${collection.handle}${preview === 'staging' ? `?preview=${preview}` : ''}`}
                                            dangerouslySetInnerHTML={{ __html: html }}
                                        />
                                    </li>)
                                })}
                            </ul>
                        </aside>
                    )}
                    <div className="w-full lg:w-3/4 collection-template__products flex flex-wrap">
                        <div className="flex flex-wrap w-full justify-between mb-25 lg:mb-0 lg:px-g">
                            <h2 className="h1 hidden lg:block w-full lg:w-3/5 lg:order-first self-center"
                                dangerouslySetInnerHTML={{ __html: collectionTitle ?? 'Shop All' }}
                            />
                            {!isLoading && (
                                <>
                                    <div className="w-1/2 lg:hidden px-hg">
                                        <select className="custom-select p-1 rounded bg-white mb-2 border border-body w-full min-h-[50px]">
                                            <option>Filter by</option>
                                            {mainCollections.map((parent: any) => {
                                                const { collection } = parent;
                                                const html = collection.title.replace('d-lg-none', 'lg:hidden');
                                                return (<option value={collection.handle} dangerouslySetInnerHTML={{ __html: html }} />);
                                            })}
                                        </select>
                                    </div>
                                    <div className="w-1/2 lg:w-2/5 lg:flex items-center justify-end px-hg">
                                        <select className="custom-select p-1 w-full lg:w-auto rounded mb-2 lg:mb-0 custom-select bg-white border border-body pr-1 lg:pr-3 min-h-[50px]">
                                            <option value="manual">Sort By</option>
                                            <option value="best-selling">Best Selling</option>
                                            <option value="price-ascending">Price, low to high</option>
                                            <option value="price-descending">Price, high to low</option>
                                            <option value="created-descending">Date, new to old</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            {!isLoading && handle !== 'all' && (
                                <div className="w-full px-hg lg:px-0 mt-1 mb-1">
                                    <div className="collection-grid__tags w-auto overflow-x-scroll mb-4 flex mt-1">
                                        {childrenCollections.length > 0 && childrenCollections.map((children) => {
                                            const { collection } = children;
                                            const html = mainCollHandles.includes(collection.handle) ? 'All' : collection.title.replace('d-lg-none', 'lg:hidden');
                                            return (
                                                <Link
                                                    href={`/collections/${collection.handle}${preview === 'staging' ? `?preview=${preview}` : ''}`}
                                                    className={`rounded-full text-nowrap mr-1 py-1 px-2 hover:no-underline
                                                        ${collection.handle === handle ? 'text-white bg-primary hover:text-white' : 'bg-gray-400 text-gray-600 hover:text-gray-600'}`}
                                                    onClick={showLoading}
                                                    dangerouslySetInnerHTML={{ __html: html }}
                                                />
                                            );
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
                                {products.length > 0 && products.map((item: any, index: number) => {
                                    if (!item.src) {
                                        item.src = item.featuredImage?.url.replace('.jpg', '_320x320_crop_center.jpg');
                                        item.srcSet = item.featuredImage?.url.replace('.jpg', '_540x540_crop_center.jpg');
                                    }
                                    return showQuizCard && index === 2 ? (
                                        <>
                                            <ProductCardQuiz />
                                            <ProductCard
                                                product={item}
                                                className="relative mb-5 flex flex-col w-1/2 md:w-1/3 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
                                                button={true}
                                            />
                                        </>
                                    ) : (
                                        <ProductCard
                                            product={item}
                                            className="relative mb-5 flex flex-col w-1/2 md:w-1/3 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
                                            button={true}
                                        />
                                    )
                                })}
                                {products.length <= 0 && <p className="collection-grid--empty">Sorry, there are no products in this collection.</p>}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {enabled && (
                <>
                    {!isLoading && <hr className="collection-footer border-gray-400 my-2" />}
                    <div className="container py-2 mb-2">
                        {title && <h2 className="mb-2">{title}</h2>}
                        {!isLoading && (
                            <div
                                dangerouslySetInnerHTML={{ __html: content_body }}
                            />
                        )}
                    </div>
                </>
            )}
        </>
    )
}

export default Collection;
