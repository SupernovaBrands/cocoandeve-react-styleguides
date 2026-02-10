import { useEffect, useState, useMemo } from "react";

const NavMegaMenu = (props: any) => {
    const { handle, listIds, dummy, store, getFeaturedImgMeta, cache = {} } = props;
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleUrl = useMemo(() => {
        if (store === 'ca' && handle === 'tan-and-spf') return 'tan';
        return handle;
    }, [handle, store]);

    useEffect(() => {
        if (dummy) {
            {/* @ts-ignore */ }
            const selected = [
                { title: 'Title', img: 'https://via.placeholder.com/444x558', url: '/' },
                { title: 'Title', img: 'https://via.placeholder.com/444x558', url: '/' },
                { title: 'Title', img: 'https://via.placeholder.com/444x558', url: '/' },
            ];
            {/* @ts-ignore */ }
            setProducts(selected);
            setIsLoading(false);
            return;
        }

        if (!handleUrl) {
            setIsLoading(false);
            return;
        }

        // Use cached data if available
        const cacheKey = `${handleUrl}_${store}`;
        if (cache[cacheKey]) {
            setProducts(cache[cacheKey]);
            setIsLoading(false);
            return;
        }

        const controller = new AbortController();

        fetch(`/api/collectionProducts?handle=${handleUrl}&region=${store}`, { signal: controller.signal }).then(
            res => {
                try {
                    res?.json().then(data => {
                        const plist = handleUrl === 'skin' || handleUrl === 'skincare' ? data?.products : data?.products?.filter(product => product.availableForSale);
                        let selected = [];
                        if (handleUrl === 'skin' || handleUrl === 'skincare') {
                            const skin1 = plist.find((p) => p.handle === 'double-cleanser-set') || null;
                            const skin2 = plist.find((p) => p.handle === 'antioxidant-glow-cream') || null;
                            const skin3 = plist.find((p) => p.handle === 'depuff-eye-cream') || null;
                            if (skin1) selected.push({
                                title: skin1.title,
                                handle: skin1.handle,
                                featuredImage: skin1.featuredImage,
                                featuredMeta: skin1.featuredMeta,
                            });
                            if (skin2) selected.push({
                                title: skin2.title,
                                handle: skin2.handle,
                                featuredImage: skin2.featuredImage,
                                featuredMeta: skin2.featuredMeta,
                            });
                            if (skin3) selected.push({
                                title: skin3.title,
                                handle: skin3.handle,
                                featuredImage: skin3.featuredImage,
                                featuredMeta: skin3.featuredMeta,
                            });
                            // plist.filter((p) =>
                            //     p.handle === 'double-cleanser-set' || p.handle === 'antioxidant-glow-cream' || p.handle === 'depuff-eye-cream'
                            // ).forEach((item) => {
                            //     {/* @ts-ignore */}
                            //     selected.push({
                            //         title: item.title,
                            //         handle: item.handle,
                            //         featuredImage: item.featuredImage,
                            //         featuredMeta: item.featuredMeta,
                            //     });
                            // });
                        } else {
                            for (let i = 0; i < listIds.length; i += 1) {
                                const item = plist.find((it) => it.id.includes(listIds[i]));
                                if (item) {
                                    {/* @ts-ignore */ }
                                    selected.push({
                                        title: item.title,
                                        handle: item.handle,
                                        featuredImage: item.featuredImage,
                                        featuredMeta: item.featuredMeta,
                                    });
                                }
                            }
                        }
                        if (selected.length < 3 && plist) {
                            selected = plist.map((item) => {
                                return {
                                    title: item.title,
                                    handle: item.handle,
                                    featuredImage: item.featuredImage,
                                    featuredMeta: item.featuredMeta,
                                };
                            });
                        }

                        const selectedWithImgs = selected.map((item) => {
                            const { img } = getFeaturedImgMeta(item, store);
                            return {
                                title: item.title,
                                img: img || null,
                                url: `/products/${item.handle}`,
                            };
                        });

                        // Store in cache for subsequent hovers
                        cache[cacheKey] = selectedWithImgs;

                        setProducts(selectedWithImgs);
                        setIsLoading(false);

                        // getFeaturedImages().then((data) => {
                        //     if (data?.length > 0) {
                        //         const selectedImgs = selected.map((item) => {
                        //             let featuredImg = data.find((img) => img.handle === item.handle)
                        //             ? data.find((img) => img.handle === item.handle).featured_image_url : null;

                        //             // some featured img in dev store is return null
                        //             if (featuredImg === null && item.handle === 'double-cleanser-set') featuredImg = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/e5913415-4bac-4ace-98f6-d56ab1377100/public';
                        //             if (featuredImg === null && item.handle === 'honey-bliss-hair-set') featuredImg = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/17e65724-7eab-4660-02f6-055876059b00/public';
                        //             if (featuredImg === null && item.handle === 'pro-youth-shampoo-conditioner') featuredImg = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/f1879976-1cc4-405e-4027-4950b96c8d00/public';

                        //             return {
                        //                 title: item.title,
                        //                 img: featuredImg,
                        //                 url: `/products/${item.handle}`,
                        //             };
                        //         })
                        //         {/* @ts-ignore */}
                        //         // setProducts(selectedImgs.filter((i) => i.img));
                        //         setProducts(selectedImgs);
                        //         setIsLoading(false);
                        //     }
                        // })
                    });
                } catch (err) {
                    console.log(err);
                }
            }
        ).catch((err) => {
            if (err.name !== 'AbortError') console.log(err);
        });

        return () => controller.abort();
    }, []);

    return (
        <div className={`z-[1010] nav-mega-menu hidden left-0 border-t w-full border-top-body mt-[18px] bg-white absolute before:bg-transparent before:w-full before:h-[1.25em] before:absolute before:-mt-[1.25em] ${products.length === 0 ? 'hidden' : ''}`}>
            <div className="container pt-3 flex flex-wrap items-center justify-between px-g">
                {!isLoading ? (
                    <div className="flex mx-5 px-3">
                        <div className="lg:w-2/5 pr-4 pl-4 mb-3">
                            <a href={props.url} className="block mb-2 h4 !text-body underline">Shop all {props.title}</a>
                            <ol className="list-unstyled">
                                {props.menus.length > 0 && (
                                    props.menus.map((menu, i) => {
                                        return <li className=" mb-1" key={`mobile-menu-${i}`}><a href={menu.handle} className="h4 !text-body">{menu.title}</a></li>
                                    })
                                )}
                            </ol>
                        </div>
                        <div className="lg:w-3/5 pr-4 mb-3 flex flex-wrap ">
                            <span className="block mb-2 text-lg w-full px-g">Best Sellers:</span>
                            {products.length > 0 && products.slice(0, 3).map((card, i) => {
                                return (
                                    <figure key={`mobile-card-${i}`} className="relative w-1/3 flex lg:flex-col mb-2 lg:px-g">
                                        {/* @ts-ignore */}
                                        <a href={card.url} className="px-0 !no-underline flex-none max-w-none">
                                            <picture>
                                                {/* @ts-ignore */}
                                                <img src={card.img} alt={card.title} className="block w-100 object-cover max-h-[none]" />
                                            </picture>
                                            <figcaption className="flex-grow-1 d-flex flex-column ml-g lg:ml-0 align-self-center">
                                                {/* @ts-ignore */}
                                                <h5 className="product-card__text font-bold text-body mb-0 mt-1">{card.title}</h5>
                                            </figcaption>
                                        </a>
                                    </figure>
                                )
                            })}
                        </div>
                    </div>
                ) : (
                    <>
                        <span className="pb-1 w-full text-center">Loading...</span>
                    </>
                )}
            </div>
        </div>

    );
};

export default NavMegaMenu;
