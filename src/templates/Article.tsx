import { useEffect, useState } from "react";
import BlogNavTag from '~/compounds/blog-nav-tags';
import PostCard from "~/compounds/PostCard";
import Sidebar from "~/sections/Sidebar";
// import ShopArticle from "~/sections/ShopArticle";
import Twitter from '~/images/icons/twitter-square.svg';
import Facebook from '~/images/icons/facebook-square.svg';
import Pinterest from '~/images/icons/pinterest-square.svg';
import Form from "~/compounds/footer-newsletter-form";
import parse from 'html-react-parser';
import Documents from '~/images/icons/documents.svg';
import ProgressBar from '~/components/ProgressBar';

const ArticleNewsLetter = (props) => {
    const { postNewsletter } = props;

    return (
        <div className="container blog-post-grid__newsletter px-0">
            <div className="w-full flex flex-wrap bg-pink-light mb-2 mx-0 rounded">
                <picture className="lg:w-1/3 w-full p-0">
                    <source srcSet={postNewsletter.blog_ns_image_mob.url} media="(min-width: 992px)" />
                    <img src={postNewsletter.blog_ns_image_desk.url} className="w-full h-full rounded rounded-tr-none rounded-br-none" />
                </picture>
                <div className="lg:w-2/3 w-full p-2 lg:pe-4">
                    <h2 className="mb-1">{postNewsletter.blog_ns_title}</h2>
                    <p className="mb-[1rem]">{postNewsletter.blog_ns_desc}</p>
                    <Form background="bg-white" btnText="Sign Me Up!" placeholder={postNewsletter.blog_ns_email} successMsg={postNewsletter.blog_ns_success} />
                    <div className="blog-post-grid__newsletter--submitted hidden form-group mb-g text-left items-center">
                        <button type="button" className="btn btn-primary btn-lg rounded-lg block d-lg-inline-block mb-0 btn--copy">
                            WELCOME
                            <Documents className="ml-25" />
                        </button>
                    </div>
                    <p className="text-sm mb-0 text-gray-600 mt-2 mb-[0!important]">{parse(postNewsletter.blog_ns_note.replace('<a', '<a class="text-sm [text-decoration-line:none!important]"'))}</p>
                </div>
            </div>
        </div>
    );
};

const ArticlPosteBanner = (props) => {
    const { postBannerInfo, title } = props;
    return (
        <div className="blog-post-banner my-2 hidden text-center">
            {postBannerInfo.blog_banner_title && (
                <a href={postBannerInfo.blog_banner_link} className="text-center d-block font-bold [text-decoration-line:none!important]" aria-label={`Banner Link - ${postBannerInfo.blog_banner_title}`}>{postBannerInfo.blog_banner_title}</a>
            )}
            <a href={postBannerInfo.blog_banner_link} className="block text-center d-block mt-1" aria-label={`Banner Post of ${title}`}>
                <picture className="w-auto mt-2 mb-1 no-gutters__in-container">
                    <source srcSet={postBannerInfo.blog_banner_dektop.url} media="(min-width: 992px)" width="600" height="244" />
                    <img src={postBannerInfo.blog_banner_mobile.url} className="embed-responsive-item object-cover align-middle mx-full" loading="lazy" width="384" height="156" alt={title} />
                </picture>
            </a>
        </div>
    );
};

const Article = (props) => {
    const { content, isLoading, postNewsletter, popularArticles, recomendations, postBannerInfo } = props;
    const [offset, setOffset] = useState<any | null>(null);

    const d = new Date(content.updatedAt);
    const day = d.toLocaleString('default', { day: 'numeric' });
    const month = d.toLocaleString('default', { month: 'short' });
    const year = d.toLocaleString('default', { year: 'numeric' });
    const updateDate = `Updated on ${month} ${day}, ${year}`;

    const storeName = 'dev';
    const featuredImageUrl = content.BlogContentMultiStores[storeName] ? content.BlogContentMultiStores[storeName].featured_image.url : '';
    const featuredImageAlternativeText = content.BlogContentMultiStores[storeName] ? content.BlogContentMultiStores[storeName].featured_image.alt : '';
    const ariaLabel = '<a aria-describedby="articleTitleHeading" class="underline"';
    const bodyContent = content.BlogContentMultiStores[storeName] ? content.BlogContentMultiStores[storeName].body_content.replace('<a', ariaLabel).replace('id="newsletterWrapper"', 'class="newsletterWrapper"') : '';

    useEffect(() => {
        const blogPostGridNewsletter = document.querySelector('.blog-post-grid__newsletter');
        const newsletterWrapper = document.querySelector('.newsletterWrapper');
        if (blogPostGridNewsletter && newsletterWrapper) {
            if (blogPostGridNewsletter.parentNode === newsletterWrapper) {
                return;
            }
            newsletterWrapper.appendChild(blogPostGridNewsletter);
            blogPostGridNewsletter.classList.remove('hidden');
        }
    }, []);

    useEffect(() => {
        const blogPostBanner = document.querySelector('.blog-post-banner');
        const articleNewBanners = document.querySelectorAll('.article-new-banner');
        if (blogPostBanner && articleNewBanners.length > 0) {
            const articleBanners = document.querySelectorAll('.article-banner');
            articleBanners.forEach(banner => banner.remove());
            const clonedBannerExists = document.querySelector('.cloned-banner');
            if (!clonedBannerExists) {
                articleNewBanners.forEach(item => {
                    const clonedBanner = blogPostBanner!.cloneNode(true) as HTMLElement;
                    clonedBanner.classList.remove('blog-post-banner', 'hidden');
                    clonedBanner.classList.add('cloned-banner');
                    item.appendChild(clonedBanner);
                });
            }
        }
    }, []);

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

    useEffect(() => {
        const timer = setTimeout(() => {
            const mainHeader = document.querySelector('.main-header');
            const progressBar = document.querySelector('.reading-proggress-bar');
            console.log('mainHeader', mainHeader)
            if(mainHeader && progressBar) {
                progressBar.classList.remove('hidden');
                mainHeader.appendChild(progressBar);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    // const PRODUCTS = [
	// 	{
	// 		id: 1,
	// 		src: '//via.placeholder.com/520x520/FFF2F4',
	// 		srcSet: '//via.placeholder.com/520x520/FFF2F4',
	// 		title: 'Sunny Honey Bronzing Bundle',
	// 		comparePrice: '$34.90',
	// 		price: '$24.90',
	// 		productId: 4543113265187,
	// 	},
	// 	{
	// 		id: 2,
	// 		src: 'https://via.placeholder.com/520x520/FFF2F4',
	// 		srcSet: 'https://via.placeholder.com/520x520/FFF2F4',
	// 		title: 'Miracle Hair',
	// 		comparePrice: '$34.90',
	// 		price: '$24.90',
	// 		productId: 4543113265187,
	// 		swatch: {
	// 			label: 'Choose Style',
	// 			style: true,
	// 			data: [
	// 				{ id: 32068891607075, value: 'girl-print', label: 'Girl Print: Limited edition!', available: true},
	// 				{ id: 32068891639843, value: 'leaf-print', label: 'Leaf Print', available: true},
	// 			]
	// 		}
	// 	},
	// 	{
	// 		src: 'https://via.placeholder.com/520x520/FFF2F4',
	// 		srcSet: 'https://via.placeholder.com/520x520/FFF2F4',
	// 		title: 'Sunny Honey Bronzing Bundle',
	// 		comparePrice: '$34.90',
	// 		price: '$24.90',
	// 		productId: 4543113265187,
	// 		swatch: {
	// 			label: 'Choose Shade',
	// 			shade: true,
	// 			data: [
	// 				{ id: 32068891541539, value: 'medium', label: 'Medium', available: false},
	// 				{ id: 32068891607075, value: 'dark', label: 'Dark', available: true},
	// 				{ id: 32068891639843, value: 'ultra-dark', label: 'Ultra Dark', available: true},
	// 			]
	// 		}
	// 	}
    // ]

    return (
        <>
        <div className="mobile-wrapper relative">
            <ProgressBar width={offset} />
		    <div className="container mt-4">
                <h1 className="text-center mb-2">COCO &amp; EVE BLOG</h1>
                {!isLoading && (
                    <div className="blog-nav-tags mb-4 flex mt-2">
                        <BlogNavTag href="/blogs/news" title="ALL" active={true} />
                        <BlogNavTag href="/blogs/news/tagged/hair" title="Hair"/>
                        <BlogNavTag href="/blogs/news/tagged/tan" title="Tan & SPF"/>
                        <BlogNavTag href="/blogs/news/tagged/skin" title="Skin"/>
                        <BlogNavTag href="/blogs/news/tagged/body" title="Body"/>
                        <BlogNavTag href="/blogs/news#how-to-tab" title="How to's"/>
                    </div>
                )}
                <article className="blog-post-grid flex flex-wrap mt-2 lg:mt-3 mb-4">
                    <div className="blog-post-grid__content w-full lg:block lg:px-g sm:px-hg">
                        <h1 className="text-center mb-1">{content.title}</h1>
                        <span className="mb-1 article__published-at">{updateDate}</span>
                        {/* <span className={`text-left font-bold  ${props.quickLinks ? '' : 'hidden'}`}>In this article:</span>
                        <div className={`mt-1 ${props.quickLinks ? '' : 'hidden'}`}>
                            <Link href="#link-1" className="blog-post-quick-links">
                                <span>Overall hair care</span>
                            </Link>
                            <Link href="#link-2" className="blog-post-quick-links">
                                <span>Heat Styling</span>
                            </Link>
                            <Link href="#link-3" className="blog-post-quick-links">
                                <span>Chemically processed</span>
                            </Link>
                            <Link href="#link-4" className="blog-post-quick-links">
                                <span>Growth</span>
                            </Link>
                            <Link href="#link-5" className="blog-post-quick-links">
                                <span>Dryness &amp; dullness</span>
                            </a>
                        </div> */}
                        {!isLoading && (
                            <picture className="relative block mt-2 mb-1 no-gutters__in-container">
                                <source srcSet={featuredImageUrl} media="(min-width: 992px)" />
                                <img className="w-100" src={featuredImageUrl} alt={featuredImageAlternativeText} title={content.title} />
                            </picture>
                        )}
                        <div className="article__content">
                            {parse(bodyContent)}
                            {postNewsletter.post_newsletter_enabled && (
                                <ArticleNewsLetter postNewsletter={postNewsletter} />
                            )}
                            {postBannerInfo.enables && (
                                <ArticlPosteBanner postBannerInfo={postBannerInfo} title={content.title} />
                            )}
                            <ul className="block mb-4 mt-1">
                                <li className="inline-block mr-[0.5rem]">
                                    <a target="_blank" href={`https://twitter.com/intent/tweet?url=https://${storeName}.cocoandeve.com&text=${content.title}`} className="no-underline text-primary text-[1.875em]">
                                        <Twitter className="svg fill-primary h-[1em]" />
                                    </a>
                                </li>
                                <li className="inline-block mr-[0.5rem]">
                                    <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=https://${storeName}.cocoandeve.com`} className="no-underline text-primary text-[1.875em]">
                                        <Facebook className="svg fill-primary h-[1em]" />
                                    </a>
                                </li>
                                <li className="inline-block">
                                    <a target="_blank" href={`https://pinterest.com/pin/create/button/?url=https://${storeName}.cocoandeve.com&media=${featuredImageUrl}&description=${content.title}`} className="no-underline text-primary text-[1.875em]">
                                        <Pinterest className="svg fill-primary h-[1em]" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {!isLoading && (
                        <Sidebar data={popularArticles} />
                    )}
                </article>
            </div>
        </div>
        {/* <div className="blog-post-grid__shop-articles articleCarousel">
            <div className="container">
                <h4 className="h1 text-center mb-1">Shop this article</h4>
                <ShopArticle products={PRODUCTS} />
            </div>
        </div> */}
        <div className="blog-post-grid__recomendation mobile-wrapper my-2">
            <div className="container pt-3 lg:pb-1">
                <h3 className="text-center h1 mb-1">You might also like</h3>
                <div className="flex flex-wrap mb-0 mt-2 -mx-hg lg:-mx-g">
					{recomendations.map((data) =>
						<PostCard key={data.id} className="mb-2 w-full lg:w-1/3 px-0 lg:px-g" data={data} />
					)}
				</div>
            </div>
        </div>
        </>
    );
};

export default Article;