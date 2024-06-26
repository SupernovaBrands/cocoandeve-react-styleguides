import { useEffect, useState, useRef } from "react";
import BlogNavTag from '~/compounds/blog-nav-tags';
import PostCard from "~/compounds/PostCard";
import Sidebar from "~/sections/Sidebar";
import ShopArticle from "~/sections/ShopArticle";
import Twitter from '~/images/icons/twitter-square.svg';
import Facebook from '~/images/icons/facebook-square.svg';
import Pinterest from '~/images/icons/pinterest-square.svg';
import parse from 'html-react-parser';
import CheckCircle from '~/images/icons/check-circle.svg';
import ProgressBar from '~/components/ProgressBar';
import { encryptParam } from "~/modules/utils";

const ArticleNewsLetter = (props) => {
    const { postNewsletter, store } = props;
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = (evt) => {
		evt.preventDefault();
		const ajaxRequest = new XMLHttpRequest();
		ajaxRequest.open('POST', `https://s-app.cocoandeve.com/bluecore/registrations`, true);
		ajaxRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		const date = new Date();
		const tse = date.getTime();
		const content = `{email:'${email}',time:${tse}}`;
		const signature = encryptParam(content);
		ajaxRequest.send(`signature=${signature}&email=${email}&country=&brand=cocoandeve_shopify_${store || 'us'}&reg_source=footer`);
		setSubmitted(true);
	};

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    return (
        <div className="container blog-post-grid__newsletter px-0 hidden">
            <div className="w-full flex flex-wrap bg-pink-light mb-2 mx-0 rounded">
                <picture className="lg:w-1/3 w-full p-0">
                    <source srcSet={postNewsletter.blog_ns_image_mob.url} media="(min-width: 992px)" />
                    <img src={postNewsletter.blog_ns_image_desk.url} className="w-full h-full rounded rounded-tr-none rounded-br-none" />
                </picture>
                <div className="lg:w-2/3 w-full p-2 lg:pe-4">
                    <h2 className="mb-1 blog-post-grid__newsletter-title">{postNewsletter.blog_ns_title}</h2>
                    <p className="mb-[1rem]">{postNewsletter.blog_ns_desc}</p>
                    {!submitted && (
                        <form className="w-full" onSubmit={onSubmit}>
                            <div className="mb-2 relative flex flex-wrap w-full items-stretch">
                                <input required onChange={handleEmail} value={email} type="email" className="bg-white flex-[1_1_auto] w-[1%] focus:outline-none focus:border-gray-400 active:border-gray-400  focus-visible:border-gray-400 block appearance-none py-[14px] px-[16px] mb-0 text-base leading-base border border-[solid] border-gray-400 text-body placeholder:text-gray-500 border-gray-200 rounded-tl rounded-bl -mr-1 relative rounded-tr-none rounded-br-none" placeholder={postNewsletter.blog_ns_email} aria-label={postNewsletter.blog_ns_email} />
                                <div className="input-group-append flex -ml-[1px]">
                                    <button className="py-[9px] px-[28px] relative leading-base font-bold inline-block align-middle text-center select-none border whitespace-no-wrap no-underline bg-primary border-primary text-white rounded-tr rounded-br" type="submit">{postNewsletter.blog_ns_btn}</button>
                                </div>
                            </div>
                        </form>
                    )}
                    {submitted && (
                        <div className="blog-post-grid__newsletter--submitted form-group mb-g text-left items-center flex">
                            <CheckCircle className="svg fill-secondary" />
                            <span className="ml-1">{postNewsletter.blog_ns_success}</span>
                        </div>
                    )}
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
                    <img src={postBannerInfo.blog_banner_mobile.url} className="object-cover align-middle mx-full" loading="lazy" width="384" height="156" alt={title} />
                </picture>
            </a>
        </div>
    );
};

const Article = (props) => {
    const { content, isLoading, postNewsletter, popularArticles, recomendations, postBannerInfo, upsells, store } = props;
    const [offset, setOffset] = useState<any | null>(null);
    const [screenLG, setScreenLG] = useState(992);
    const d = new Date(content.updatedAt);
    const day = d.toLocaleString('default', { day: 'numeric' });
    const month = d.toLocaleString('default', { month: 'short' });
    const year = d.toLocaleString('default', { year: 'numeric' });
    const updateDate = `Updated on ${month} ${day}, ${year}`;

    const storeName = 'dev';
    let bodyContent = '';
    let quickLinks = [];

    const featuredImageUrl = content?.BlogContentMultiStores?.[storeName]?.featured_image?.url || '';
    const featuredImageAlternativeText = content?.BlogContentMultiStores?.[storeName]?.featured_image?.alt || '';
    const ariaLabel = '<a aria-describedby="articleTitleHeading" class="underline"';
    if (content?.BlogContentMultiStores?.[storeName]?.body_content && typeof content.BlogContentMultiStores[storeName].body_content === 'string') {
        bodyContent = content.BlogContentMultiStores[storeName].body_content
            .replace('<a', ariaLabel)
            .replace('id="newsletterWrapper"', 'class="newsletterWrapper"');
    }

    if (content?.quick_links) {
        quickLinks = content.quick_links.split(',');
    }

    const handleClick = (event, href) => {
        event.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    };

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
            if(mainHeader && progressBar) {
                progressBar.classList.remove('hidden');
                mainHeader.appendChild(progressBar);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const manipulateShops = () => {
            const articleShops = document.querySelectorAll('.blog-post-grid__shop-articles');
            const articleContent = document.querySelectorAll('.article__content h2:not(.blog-post-grid__newsletter-title)').length > 1 
            ? document.querySelectorAll('.article__content h2:not(.blog-post-grid__newsletter-title)') 
            : document.querySelectorAll('.article__content h3');
            if (articleShops && articleContent.length) {
                let targetAppend = parseInt((articleContent.length / 2).toString(), 10);
                targetAppend = targetAppend > 1 ? targetAppend - 1 : targetAppend;
                const targetContent = articleContent[targetAppend];
                articleShops.forEach(articleShop => {
                    targetContent.parentNode.insertBefore(articleShop, targetContent);
                });

                if (window.innerWidth > screenLG) {
                    
                    articleShops.forEach(articleShop => {
                        articleShop.querySelectorAll('.product-card-btn:not([data-waitlist]) .product-card-btn__text').forEach(el => el.textContent = 'Add');
                        articleShop.querySelectorAll('.product-card-btn[data-waitlist] .product-card-btn__text').forEach(el => el.textContent = 'Waitlist');
                        articleShop.querySelectorAll('.product-card-btn[data-waitlist] .product-card-btn__prices .text-linethrough').forEach(el => el.remove());
                        articleShop.querySelectorAll('.swatch-overlay > div:first-child').forEach(el => {
                            el.classList.remove('lg:px-1');
                            el.classList.add('lg:px-0');
                        });
                        articleShop.querySelectorAll('.product-card__title').forEach(el => {
                            el.classList.replace('text-base', 'text-sm');
                            el.classList.replace('lg:text-lg', 'text-sm');
                            el.classList.add('[text-decoration-line:none!important]');
                            el.classList.add('hover:[text-decoration-line:underline!important]');
                        });
                        articleShop.querySelectorAll('.review-stars__number').forEach(el => {
                            el.classList.add('text-sm');
                        });
                        articleShop.querySelectorAll('.product-card-btn').forEach(el => {
                            el.classList.replace('md:text-base', 'text-sm');
                        });
                        articleShop.querySelectorAll('.product-title__text').forEach(el => {
                            el.classList.remove('min-h-[2.5em]');
                            el.classList.remove('lg:min-h-[3.125em]');
                            el.classList.remove('lg:mx-[0.625rem]');
                        });
                    });
                }
            }
        }

        const timeoutId = setTimeout(manipulateShops, 1000);
        return () => clearTimeout(timeoutId);

    }, [screenLG]);

    return (
        <>
        <div className="mobile-wrapper sm:px-hg relative">
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
                <article className="blog-post-grid flex flex-wrap mt-2 lg:mt-3 lg:-mx-g sm:-mx-hg lg:mb-4">
                    <div className="blog-post-grid__content w-full lg:block lg:px-g sm:px-hg">
                        <h1 className="text-center mb-1">{content.title}</h1>
                        <span className="mb-1 article__published-at">{updateDate}</span>
                        {!isLoading && (
                            <picture className="mt-2 mb-1 block relative w-auto ratio ratio-1x1 mx-auto lg:mx-0 sm:-mx-g">
                                <source srcSet={featuredImageUrl} media="(min-width: 992px)" />
                                <img className="object-cover absolute w-full h-full top-0 bottom-0 left-0 align-middle" src={featuredImageUrl} alt={featuredImageAlternativeText} title={content.title} />
                            </picture>
                        )}
                        {quickLinks.length > 0 && (
                            <>
                                <span className="text-left font-bold">In this article:</span>
                                <div className="mt-1 mb-2">
                                    {quickLinks.map((quickLink, index) => (
                                        <a onClick={(e) => handleClick(e, `#link-${index + 1}`)} key={index} href={`#link-${index + 1}`} className="blog-post-quick-links">
                                            <span>{quickLink}</span>
                                        </a>
                                    ))}
                                </div>
                            </>
                        )}
                        <div className="article__content">
                            {parse(bodyContent)}
                            {postNewsletter.post_newsletter_enabled && (
                                <ArticleNewsLetter postNewsletter={postNewsletter} store={store} />
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
        {upsells?.length && (
            <div className="blog-post-grid__shop-articles articleCarousel py-5 flex flex-wrap lg:-mx-g sm:-mx-hg">
                <div className="container px-0">
                    <h4 className="h1 text-center mb-1">Shop this article</h4>
                    {!isLoading && ( <ShopArticle products={upsells} /> )}
                </div>
            </div>
        )}
        <div className="blog-post-grid__recomendation mobile-srapper bg-white lg:bg-pink-light overflow-hidden">
            <div className="container pt-3 lg:pb-1">
                <h3 className="text-center h1 mb-1">You might also like</h3>
                <div className="flex flex-wrap mb-0 mt-2 -mx-hg lg:-mx-g lg:mt-3 lg:mt-3 lg:mb-4">
                    {recomendations.map((data) =>
                        <PostCard key={data.id} className="w-full lg:w-1/3 px-0 lg:px-g" template="article" data={data} />
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

export default Article;