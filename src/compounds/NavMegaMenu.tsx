import { useEffect, useState } from "react";
import { getFeaturedImages } from '~/modules/utils';

const NavMegaMenu = (props: any) => {
    const { handle, listIds, dummy } = props;
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        const featuredImages = getFeaturedImages();
        if (dummy) {
            {/* @ts-ignore */}
            const selected = [
                { title: 'Title', img: 'https://via.placeholder.com/444x558', url: '/' },
                { title: 'Title', img: 'https://via.placeholder.com/444x558', url: '/' },
                { title: 'Title', img: 'https://via.placeholder.com/444x558', url: '/' },
            ];
            {/* @ts-ignore */}
            setProducts(selected);
        }
        fetch(`/api/collectionProducts?handle=${handle}`).then(
			res => {
				res?.json().then(data => {
                    const plist = data?.products;
                    let selected = [];
					if (handle === 'skin' || handle === 'skincare') {
						[
							{ handle: 'double-cleanser-set', title: 'Double Cleanser Set' },
							{ handle: 'antioxidant-glow-cream', title: 'Antioxidant Glow Cream' },
							{ handle: 'depuff-eye-cream', title: 'Depuff Eye Cream' },
						].forEach((item) => {
							const featuredImg = featuredImages.find((img) => img.handle === item.handle)
								? featuredImages.find((img) => img.handle === item.handle).featured_image_url : null;
                            {/* @ts-ignore */}
							selected.push({
								title: item.title,
								img: featuredImg,
								url: `/products/${item.handle}`,
							});
						});
					} else {
                        for (let i = 0; i < listIds.length; i += 1) {
							const item = plist.find((it) => it.node.id.includes(listIds[i]));
							if (item) {
								const featuredImg = featuredImages.find((img) => img.handle === item.node.handle)
									? featuredImages.find((img) => img.handle === item.node.handle).featured_image_url : null;
								{/* @ts-ignore */}
                                selected.push({
									title: item.node.title,
									img: featuredImg,
									url: `/products/${item.node.handle}`,
								});
							}
						}
                    }
                    if (selected.length < 3) {
						selected = plist.map((item) => {
							const featuredImg = featuredImages.find((img) => img.handle === item.handle)
								? featuredImages.find((img) => img.handle === item.handle).featured_image_url : null;
							return {
								title: item.title,
								img: featuredImg || item.featuredImage?.url,
								url: `/products/${item.handle}`,
							};
						});
					}
                    {/* @ts-ignore */}
					setProducts(selected);
				});
			}
		)
    }, []);

    return (
        <div className="z-[1010] nav-mega-menu hidden left-0 border-t w-full border-top-body mt-[18px] bg-white absolute before:bg-transparent before:w-full before:h-[1.25em] before:absolute before:-mt-[1.25em]">
            <div className="container pt-3 flex flex-wrap items-center justify-between px-g">
                <div className="flex mx-5 px-3">
                    <div className="lg:w-2/5 pr-4 pl-4 mb-3">
                        <a href={props.url} className="block mb-2 h4 text-body underline">{props.title}</a>
                        <ol className="list-unstyled">
                            {props.menus.length > 0 && (
                                props.menus.map((menu, i) => {
                                    return <li className=" mb-1" key={`mobile-menu-${i}`}><a href={`/collections/${menu.handle}`} className="h4 text-body">{menu.title}</a></li>
                                })
                            )}
                        </ol>
                    </div>
                    <div className="lg:w-3/5 pr-4 mb-3 flex flex-wrap ">
                        <span className="block mb-2 text-lg w-full px-g">Best Sellers:</span>
                        {products.length > 0 && (
                            products.map((card, i) => {
                                return (
                                    <figure key={`mobile-card-${i}`} className="relative w-1/3 flex lg:flex-col mb-2 lg:px-g">
                                        {/* @ts-ignore */}
                                        <a href={card.url} className="px-0 !no-underline flex-none max-w-none">
                                            <picture>
                                                {/* @ts-ignore */}
                                                <img src={card.img} alt="Placeholder" className="block w-100 object-cover max-h-[none]" />
                                            </picture>
                                            <figcaption className="flex-grow-1 d-flex flex-column ml-g lg:ml-0 align-self-center">
                                                {/* @ts-ignore */}
                                                <h5 className="product-card__text font-bold text-body mb-0 mt-1">{card.title}</h5>
                                            </figcaption>
                                        </a>
                                    </figure>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>

    );  
};

export default NavMegaMenu;