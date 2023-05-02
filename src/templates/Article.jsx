import { useEffect, useState } from "react";
import { Col, Container, Row } from 'react-bootstrap';
import ProgressBar from '@/components/ProgressBar';
import BlogNavTag from '@/compounds/blog-nav-tags';
import CarouselCustom from "@/components/CarouselCustom";
import BlogRecomendation from "@/sections/blog-recomendation";

const Article = (props) => {
    const [offset, setOffset] = useState();

    const items = [
		{
			label: 'Slide 1',
			title: 'Bronzing Face Drops',
			productId: 4543113265187,
			comparePrice: '$44.90',
			price: '$134.90',
			srcSet: 'https://via.placeholder.com/520x520/FFF2F4',
			src: 'https://via.placeholder.com/243x243/FFF2F4',
			swatch: {
				label: 'Choose Style',
				style: true,
				data: [
					{ id: 32068891607075, value: 'girl-print', label: 'Girl Print: Limited edition!', available: false},
					{ id: 32068891639843, value: 'leaf-print', label: 'Leaf Print', available: true},
				]
			}
		},
		{
			label: 'Slide 2',
			title: 'Sunny Honey Bali Bronzing Foam',
			productId: 4543113265187,
			comparePrice: '$144.90',
			price: '$134.90',
			srcSet: 'https://via.placeholder.com/520x520/FFF2F4',
			src: 'https://via.placeholder.com/243x243/FFF2F4',
			swatch: {
                label: 'Add To Cart',
                shade: true,
                data: [
                    { id: 32068891541539, value: 'medium', label: 'Medium', available: true},
                    { id: 32068891607075, value: 'dark', label: 'Dark', available: true},
                    { id: 32068891639843, value: 'ultra-dark', label: 'Ultra Dark', available: true},
                ]
            }
		},
		{
			label: 'Slide 3',
			title: 'Like A Virgin Hair Masque',
			productId: 4543113265187,
			comparePrice: '$44.90',
			price: '$34.90',
			srcSet: 'https://via.placeholder.com/520x520/FFF2F4',
			src: 'https://via.placeholder.com/243x243/FFF2F4',
			badgeText: 'New'
		},
		{
			label: 'Slide 4',
			title: 'Sunny Honey Bali Bronzing Bundle',
			productId: 4543113265187,
			comparePrice: '$44.90',
			price: '$34.90',
			srcSet: 'https://via.placeholder.com/520x520/FFF2F4',
			src: 'https://via.placeholder.com/243x243/FFF2F4',
		}
	];

    const recomendations = [
        {
			src: 'https://via.placeholder.com/375x190.jpg/EFADBA',
            link: '#',
            title: '5 things you’re doing wrong with your hair care routine',
            subtitle: 'Give these myths the brush off for a healthy scalp & shiny hair!',
            tags: [
                {
                    tag: 'Tan',
                    link: '#'
                },
                {
                    tag: 'Hot',
                    link: '#'
                }
            ]
		},
        {
			src: 'https://via.placeholder.com/375x190.jpg/EFADBA',
            link: '#',
            title: '5 things you’re doing wrong with your hair care routine',
            subtitle: 'Give these myths',
            tags: [
                {
                    tag: 'Tan',
                    link: '#'
                },
                {
                    tag: 'Hair',
                    link: '#'
                }
            ]
		},
        {
			src: 'https://via.placeholder.com/375x190.jpg/EFADBA',
            link: '#',
            title: '5 things you’re doing wrong with your hair care routine',
            subtitle: 'Give these myths the brush off for a healthy scalp & shiny hair!',
            tags: [
                {
                    tag: 'Tan',
                    link: '#'
                },
                {
                    tag: 'Hair',
                    link: '#'
                }
            ]
		}
    ]

    useEffect(() => {
        const setProgress = () => {
            const { body, documentElement: html } = document;

            const height = Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.scrollHeight,
                html.offsetHeight,
            );

            const scrollFromTop = (html.scrollTop || body.scrollTop) + html.clientHeight;
			const width = `${(scrollFromTop / height) * 100}%`;
            setOffset(width)
        }

        setProgress();

        window.removeEventListener('scroll', setProgress);
        window.addEventListener('scroll', setProgress, { passive: true });
        
        return () => window.removeEventListener('scroll', setProgress);
    }, []);

    return (
        <>
        <ProgressBar  width={offset} />
        <div className="mobile-wrapper">
		    <Container className="mt-4">
                <h1 className="text-center mb-2">COCO &amp; EVE BLOG</h1>
                <div className="blog-nav-tags mb-4 d-flex mt-2">
                    <BlogNavTag title="All" active={true} />
                    <BlogNavTag title="Hair"/>
                    <BlogNavTag title="Tan"/>
                    <BlogNavTag title="Body"/>
                    <BlogNavTag title="How to's"/>
                </div>
                <article className="blog-post-grid row mt-2 mt-lg-3 mb-4">
                    <div className="blog-post-grid__content col-12 d-lg-block">
                        <h1 className="text-center">{props.title}</h1>
                        <span className={`text-left fw-bold  ${props.quickLinks ? '' : 'd-none'}`}>In this article:</span>
                        <div className={`mt-1 ${props.quickLinks ? '' : 'd-none'}`}>
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
                        <picture className="d-block mt-2 mb-1 no-gutters__in-container">
                            <source srcSet={props.srcSet} media="(min-width: 992px)" />
                            <img className="w-100" src={props.src} />
                        </picture>
                        <div className="article__content">
                            {props.children}
                        </div>
                    </div>

                    <aside className="blog-post-grid__sidebar position-lg-sticky col-12 mt-2 mt-lg-0 mb-3 mb-lg-auto align-self-end d-flex d-lg-block flex-wrap">
                        <section className="no-gutters__in-container sidebar order-2 bg-gray-400">
                            <h2 className="mb-3 text-center d-none d-lg-block h1">Popular reads</h2>
                            <div className="slide carousel--sidebar">
                                <ol className="carousel-indicators carousel-indicators--primary mb-0 d-lg-none">
                                    <li data-target=".carousel--sidebar" data-slide-to="0" className="rounded-circle border-0 active"></li>
                                    <li data-target=".carousel--sidebar" data-slide-to="1" className="rounded-circle border-0 active"></li>
                                </ol>

                                <ul className="list-unstyled carousel-inner mb-0 pb-1">
                                    <li className="carousel-item active">
                                        <article className="post-card d-flex flex-grow-1 mb-3">
                                            <picture className="flex-shrink-0 mr-1">
                                                <source srcSet="//cdn.shopify.com/s/files/1/0243/8817/3888/products/PDP_BondBuildingPre-Shampoo_90x90_crop_center.jpg?v=1663207008" media="(min-width: 992px)" />
                                                <a href="/products/bond-building-pre-shampoo-treatment">
                                                    <img src="//cdn.shopify.com/s/files/1/0243/8817/3888/products/PDP_BondBuildingPre-Shampoo_90x90_crop_center.jpg?v=1663207008" className="w-100" loading="lazy" alt="Bond Building Pre-Shampoo Treatment" />
                                                </a>
                                            </picture>
                                            <figcaption className="d-flex flex-column font-size-sm">
                                                <h3><a href="/cocoandeve-styleguides/docs/templates/article.html" className="link-secondary">6 Scalp Care Myths – Busted!</a></h3>
                                                <p className="mb-0">Give these myths the brush off for a healthy scalp & shiny hair!</p>
                                            </figcaption>
                                        </article>
                                        <article className="post-card d-flex flex-grow-1 mb-3">
                                            <picture className="flex-shrink-0 mr-1">
                                                <source srcSet="//cdn.shopify.com/s/files/1/0243/8817/3888/products/PDP_BondBuildingPre-Shampoo_90x90_crop_center.jpg?v=1663207008" media="(min-width: 992px)" />
                                                <a href="/products/bond-building-pre-shampoo-treatment">
                                                    <img src="//cdn.shopify.com/s/files/1/0243/8817/3888/products/PDP_BondBuildingPre-Shampoo_90x90_crop_center.jpg?v=1663207008" className="w-100" loading="lazy" alt="Bond Building Pre-Shampoo Treatment" />
                                                </a>
                                            </picture>
                                            <figcaption className="d-flex flex-column font-size-sm">
                                                <h3><a href="/cocoandeve-styleguides/docs/templates/article.html" className="link-secondary">6 Scalp Care Myths – Busted!</a></h3>
                                                <p className="mb-0">Give these myths the brush off for a healthy scalp & shiny hair!</p>
                                            </figcaption>
                                        </article>
                                    </li>
                                    <li className="carousel-item active">
                                        <article className="post-card d-flex flex-grow-1 mb-0">
                                            <picture className="flex-shrink-0 mr-1">
                                                <source srcSet="//cdn.shopify.com/s/files/1/0243/8817/3888/products/PDP_BondBuildingPre-Shampoo_90x90_crop_center.jpg?v=1663207008" media="(min-width: 992px)" />
                                                <a href="/products/bond-building-pre-shampoo-treatment">
                                                    <img src="//cdn.shopify.com/s/files/1/0243/8817/3888/products/PDP_BondBuildingPre-Shampoo_90x90_crop_center.jpg?v=1663207008" className="w-100" loading="lazy" alt="Bond Building Pre-Shampoo Treatment" />
                                                </a>
                                            </picture>
                                            <figcaption className="d-flex flex-column font-size-sm">
                                                <h3><a href="/cocoandeve-styleguides/docs/templates/article.html" className="link-secondary">6 Scalp Care Myths – Busted!</a></h3>
                                                <p className="mb-0">Give these myths the brush off for a healthy scalp & shiny hair!</p>
                                            </figcaption>
                                        </article>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </aside>
                </article>
            </Container>
        </div>
        <div className="blog-post-grid__shop-articles py-5 articleCarousel">
            <Container>
                <h4 className="h1 text-center">Shop this article</h4>
                <div className="pt-2">
                    <CarouselCustom shopArticle={true} items={items} id="articleCarousel" slideNumber={4} centered={true} className="position-relative col-9 col-md-3 shop-article text-center" hideControls={false} />
                </div>
            </Container>
        </div>
        <div className="blog-post-grid__recomendation mobile-wrapper bg-pink-light my-4">
            <Container className="pt-3 pb-lg-1">
                <h3 className="text-center h1">You might also like</h3>
                <ul className="row mt-2 mt-lg-3 mb-0 mb-lg-4 list-unstyled">
                    {recomendations.map((item, i) => (
                        <BlogRecomendation
                            key={i}
                            item={item}
                        />
                    ))}
                </ul>
            </Container>
        </div>
        </>
    );
};

export default Article;