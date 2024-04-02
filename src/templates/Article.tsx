import { useEffect, useState } from "react";
import ProgressBar from '@/components/ProgressBar';
import BlogNavTag from '@/compounds/blog-nav-tags';
import ProductCard from "@/compounds/ProductCard";
import PostCard from "@/compounds/PostCard";

const Article = (props) => {
    // const [offset, setOffset] = useState();

    // const items = [
	// 	{
	// 		label: 'Slide 1',
	// 		title: 'Bronzing Face Drops',
	// 		productId: 4543113265187,
	// 		comparePrice: '$44.90',
	// 		price: '$134.90',
	// 		srcSet: 'https://via.placeholder.com/520x520/FFF2F4',
	// 		src: 'https://via.placeholder.com/243x243/FFF2F4',
	// 		swatch: {
	// 			label: 'Choose Style',
	// 			style: true,
	// 			data: [
	// 				{ id: 32068891607075, value: 'girl-print', label: 'Girl Print: Limited edition!', available: false},
	// 				{ id: 32068891639843, value: 'leaf-print', label: 'Leaf Print', available: true},
	// 			]
	// 		}
	// 	},
	// 	{
	// 		label: 'Slide 2',
	// 		title: 'Sunny Honey Bali Bronzing Foam',
	// 		productId: 4543113265187,
	// 		comparePrice: '$144.90',
	// 		price: '$134.90',
	// 		srcSet: 'https://via.placeholder.com/520x520/FFF2F4',
	// 		src: 'https://via.placeholder.com/243x243/FFF2F4',
	// 		swatch: {
    //             label: 'Add To Cart',
    //             shade: true,
    //             data: [
    //                 { id: 32068891541539, value: 'medium', label: 'Medium', available: true},
    //                 { id: 32068891607075, value: 'dark', label: 'Dark', available: true},
    //                 { id: 32068891639843, value: 'ultra-dark', label: 'Ultra Dark', available: true},
    //             ]
    //         }
	// 	},
	// 	{
	// 		label: 'Slide 3',
	// 		title: 'Like A Virgin Hair Masque',
	// 		productId: 4543113265187,
	// 		comparePrice: '$44.90',
	// 		price: '$34.90',
	// 		srcSet: 'https://via.placeholder.com/520x520/FFF2F4',
	// 		src: 'https://via.placeholder.com/243x243/FFF2F4',
	// 		badgeText: 'New'
	// 	},
	// 	{
	// 		label: 'Slide 4',
	// 		title: 'Sunny Honey Bali Bronzing Bundle',
	// 		productId: 4543113265187,
	// 		comparePrice: '$44.90',
	// 		price: '$34.90',
	// 		srcSet: 'https://via.placeholder.com/520x520/FFF2F4',
	// 		src: 'https://via.placeholder.com/243x243/FFF2F4',
	// 	}
	// ];

    // const recomendations = [
    //     {
	// 		src: 'https://via.placeholder.com/375x190.jpg/EFADBA',
    //         link: '#',
    //         title: '5 things you’re doing wrong with your hair care routine',
    //         subtitle: 'Give these myths the brush off for a healthy scalp & shiny hair!',
    //         tags: [
    //             {
    //                 tag: 'Tan',
    //                 link: '#'
    //             },
    //             {
    //                 tag: 'Hot',
    //                 link: '#'
    //             }
    //         ]
	// 	},
    //     {
	// 		src: 'https://via.placeholder.com/375x190.jpg/EFADBA',
    //         link: '#',
    //         title: '5 things you’re doing wrong with your hair care routine',
    //         subtitle: 'Give these myths',
    //         tags: [
    //             {
    //                 tag: 'Tan',
    //                 link: '#'
    //             },
    //             {
    //                 tag: 'Hair',
    //                 link: '#'
    //             }
    //         ]
	// 	},
    //     {
	// 		src: 'https://via.placeholder.com/375x190.jpg/EFADBA',
    //         link: '#',
    //         title: '5 things you’re doing wrong with your hair care routine',
    //         subtitle: 'Give these myths the brush off for a healthy scalp & shiny hair!',
    //         tags: [
    //             {
    //                 tag: 'Tan',
    //                 link: '#'
    //             },
    //             {
    //                 tag: 'Hair',
    //                 link: '#'
    //             }
    //         ]
	// 	}
    // ]

    // useEffect(() => {
    //     const setProgress = () => {
    //         const { body, documentElement: html } = document;

    //         const height = Math.max(
    //             body.scrollHeight,
    //             body.offsetHeight,
    //             html.clientHeight,
    //             html.scrollHeight,
    //             html.offsetHeight,
    //         );

    //         const scrollFromTop = (html.scrollTop || body.scrollTop) + html.clientHeight;
	// 		const width = `${(scrollFromTop / height) * 100}%`;
    //         setOffset(width)
    //     }

    //     setProgress();

    //     window.removeEventListener('scroll', setProgress);
    //     window.addEventListener('scroll', setProgress, { passive: true });
        
    //     return () => window.removeEventListener('scroll', setProgress);
    // }, []);

    const product1 = {
        src: 'https://via.placeholder.com/520x520/FFF2F4',
        srcSet: 'https://via.placeholder.com/520x520/FFF2F4',
        title: 'Sunny Honey Bronzing Bundle',
        comparePrice: '$34.90',
        price: '$24.90',
        productId: 4543113265187,
    };
    const product2 = {
        src: 'https://via.placeholder.com/520x520/FFF2F4',
        srcSet: 'https://via.placeholder.com/520x520/FFF2F4',
        title: 'Miracle Hair',
        comparePrice: '$34.90',
        price: '$24.90',
        productId: 4543113265187,
        swatch: {
            label: 'Choose Style',
            style: true,
            data: [
                { id: 32068891607075, value: 'girl-print', label: 'Girl Print: Limited edition!', available: true},
                { id: 32068891639843, value: 'leaf-print', label: 'Leaf Print', available: true},
            ]
        }
    };
    const product3 = {
        src: 'https://via.placeholder.com/520x520/FFF2F4',
        srcSet: 'https://via.placeholder.com/520x520/FFF2F4',
        title: 'Sunny Honey Bronzing Bundle',
        comparePrice: '$34.90',
        price: '$24.90',
        productId: 4543113265187,
        swatch: {
            label: 'Choose Shade',
            shade: true,
            data: [
                { id: 32068891541539, value: 'medium', label: 'Medium', available: false},
                { id: 32068891607075, value: 'dark', label: 'Dark', available: true},
                { id: 32068891639843, value: 'ultra-dark', label: 'Ultra Dark', available: true},
            ]
        }
    };

    const postData = [
		{
			id: 1,
			img: 'https://via.placeholder.com/828x420.jpg/EFADBA',
			srcSet: 'https://via.placeholder.com/828x420.jpg/EFADBA',
			title: 'The Power of SPF Primers',
			description: 'Stop rushing your routine by multitasking your morning! Update test 3',
			tags: ['hair', 'tan', 'body', 'suncare', 'skin'],
		},
		{
			id: 2,
			img: 'https://via.placeholder.com/828x420.jpg/EFADBA',
			srcSet: 'https://via.placeholder.com/828x420.jpg/EFADBA',
			title: 'Why You Need This Skin Perfecting Sunscreen in Your Summer Routine',
			description: 'Prime, protect and radiate with this season\'s hottest must-have!',
			tags: ['hair', 'tan', 'body', 'suncare', 'skin'],
		}
	];
	const postData2 = [
		...postData,
		{
			id: 3,
			img: 'https://via.placeholder.com/828x420.jpg/EFADBA',
			srcSet: 'https://via.placeholder.com/828x420.jpg/EFADBA',
			title: 'How to Get a Flawless Faux Tan That Lasts Through Party Season and Beyond',
			description: 'Discover the holy grail for a holiday glow!',
			tags: ['hair', 'tan', 'body', 'suncare', 'skin'],
		}
	];

    return (
        <>
        {/* <ProgressBar  width={offset} /> */}
        <div className="mobile-wrapper">
		    <div className="container mt-4">
                <h1 className="text-center mb-2">COCO &amp; EVE BLOG</h1>
                <div className="blog-nav-tags mb-4 flex mt-2">
                    <BlogNavTag title="All" active={true} />
                    <BlogNavTag title="Hair"/>
                    <BlogNavTag title="Tan"/>
                    <BlogNavTag title="Body"/>
                    <BlogNavTag title="How to's"/>
                </div>
                <article className="blog-post-grid flex flex-wrap mt-2 lg:mt-3 mb-4">
                    <div className="blog-post-grid__content w-full lg:block lg:px-g sm:px-hg">
                        <h1 className="text-center mb-1">{props.title}</h1>
                        <span className={`text-left font-bold  ${props.quickLinks ? '' : 'hidden'}`}>In this article:</span>
                        <div className={`mt-1 ${props.quickLinks ? '' : 'hidden'}`}>
                            <a href="#link-1" className="blog-post-quick-links">
                                <span>Overall hair care</span>
                            </a>
                            <a href="#link-2" className="blog-post-quick-links">
                                <span>Heat Styling</span>
                            </a>
                            <a href="#link-3" className="blog-post-quick-links">
                                <span>Chemically processed</span>
                            </a>
                            <a href="#link-4" className="blog-post-quick-links">
                                <span>Growth</span>
                            </a>
                            <a href="#link-5" className="blog-post-quick-links">
                                <span>Dryness &amp; dullness</span>
                            </a>
                        </div>
                        <picture className="block mt-2 mb-1 no-gutters__in-container">
                            <source srcSet={props.srcSet} media="(min-width: 992px)" />
                            <img className="w-100" src={props.src} />
                        </picture>
                        <div className="article__content">
                            {props.children}
                        </div>
                    </div>

                    <aside className="blog-post-grid__sidebar lg:sticky col-12 mt-2 lg:mt-0 mb-3 lg:mb-auto self-end flex lg:block flex-wrap lg:px-g sm:px-hg">
                        <section className="no-gutters__in-container sidebar order-2 bg-gray-400">
                            <h2 className="mb-3 text-center hidden lg:block h1">Popular reads</h2>
                            <div>
                                <ul className="mb-0 pb-1">
                                    <li className="">
                                        <article className="post-card flex flex-grow-1 mb-3">
                                            <picture className="flex-shrink-0 mr-1">
                                                <source srcSet="//cdn.shopify.com/s/files/1/0243/8817/3888/products/PDP_BondBuildingPre-Shampoo_90x90_crop_center.jpg?v=1663207008" media="(min-width: 992px)" />
                                                <a href="/products/bond-building-pre-shampoo-treatment">
                                                    <img src="//cdn.shopify.com/s/files/1/0243/8817/3888/products/PDP_BondBuildingPre-Shampoo_90x90_crop_center.jpg?v=1663207008" className="w-100" loading="lazy" alt="Bond Building Pre-Shampoo Treatment" />
                                                </a>
                                            </picture>
                                            <figcaption className="flex flex-col text-sm">
                                                <h3><a href="/cocoandeve-styleguides/docs/templates/article.html" className="text-black hover:text-primary">6 Scalp Care Myths – Busted!</a></h3>
                                                <p className="mb-0">Give these myths the brush off for a healthy scalp & shiny hair!</p>
                                            </figcaption>
                                        </article>
                                        <article className="post-card flex flex-grow-1 mb-3">
                                            <picture className="flex-shrink-0 mr-1">
                                                <source srcSet="//cdn.shopify.com/s/files/1/0243/8817/3888/products/PDP_BondBuildingPre-Shampoo_90x90_crop_center.jpg?v=1663207008" media="(min-width: 992px)" />
                                                <a href="/products/bond-building-pre-shampoo-treatment">
                                                    <img src="//cdn.shopify.com/s/files/1/0243/8817/3888/products/PDP_BondBuildingPre-Shampoo_90x90_crop_center.jpg?v=1663207008" className="w-100" loading="lazy" alt="Bond Building Pre-Shampoo Treatment" />
                                                </a>
                                            </picture>
                                            <figcaption className="flex flex-col text-sm">
                                                <h3><a href="/cocoandeve-styleguides/docs/templates/article.html" className="text-black hover:text-primary">6 Scalp Care Myths – Busted!</a></h3>
                                                <p className="mb-0">Give these myths the brush off for a healthy scalp & shiny hair!</p>
                                            </figcaption>
                                        </article>
                                    </li>
                                    <li className="">
                                        <article className="post-card flex flex-grow-1 mb-0">
                                            <picture className="flex-shrink-0 mr-1">
                                                <source srcSet="//cdn.shopify.com/s/files/1/0243/8817/3888/products/PDP_BondBuildingPre-Shampoo_90x90_crop_center.jpg?v=1663207008" media="(min-width: 992px)" />
                                                <a href="/products/bond-building-pre-shampoo-treatment">
                                                    <img src="//cdn.shopify.com/s/files/1/0243/8817/3888/products/PDP_BondBuildingPre-Shampoo_90x90_crop_center.jpg?v=1663207008" className="w-100" loading="lazy" alt="Bond Building Pre-Shampoo Treatment" />
                                                </a>
                                            </picture>
                                            <figcaption className="flex flex-col text-sm">
                                                <h3><a href="/cocoandeve-styleguides/docs/templates/article.html" className="text-black hover:text-primary">6 Scalp Care Myths – Busted!</a></h3>
                                                <p className="mb-0">Give these myths the brush off for a healthy scalp & shiny hair!</p>
                                            </figcaption>
                                        </article>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </aside>
                </article>
            </div>
        </div>
        <div className="blog-post-grid__shop-articles articleCarousel">
            <div className="container">
                <h4 className="h1 text-center mb-1">Shop this article</h4>
                <div className="pt-2">
                    <div className="flex flex-wrap -mx-1 lg:-mx-2">
                        <ProductCard
                            product={product1}
                            className="relative mb-5 flex flex-col w-1/2 md:w-1/4 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
                            button={true}
                        />
                        <ProductCard
                            product={product2}
                            className="relative mb-5 flex flex-col w-1/2 md:w-1/4 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
                            icon={true}
                        />
                        <ProductCard
                            product={product3}
                            className="relative mb-5 flex flex-col w-1/2 md:w-1/4 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="blog-post-grid__recomendation mobile-wrapper my-2">
            <div className="container pt-3 lg:pb-1">
                <h3 className="text-center h1 mb-1">You might also like</h3>
                <div className="flex flex-wrap mb-0 mt-2 -mx-hg lg:-mx-g">
					{postData2.map((data) =>
						<PostCard key={data.id} className="mb-2 w-full lg:w-1/3 px-0 lg:px-g" data={data} />
					)}
				</div>
            </div>
        </div>
        </>
    );
};

export default Article;