import { useEffect, useState } from "react";
import BlogNavTag from '~/compounds/blog-nav-tags';
import ShopArticle from "~/sections/ShopArticle";
import Twitter from '~/images/icons/twitter-square.svg';
import Facebook from '~/images/icons/facebook-square.svg';
import Pinterest from '~/images/icons/pinterest-square.svg';
import parse from 'html-react-parser';
import CheckCircle from '~/images/icons/check-circle.svg';
import ProgressBar from '~/components/ProgressBar';
import { encryptParam } from "~/modules/utils";
import BackToTop from '~/images/icons/back-to-top.svg';
import Breadcrumb from '~/components/Breadcrumb';

import {
	validateEmail,
    subscribeBluecoreRegistration,
} from '~/modules/utils';

const validForm = {
	email: false,
	phone: false,
};

const ArticleNewsLetter = (props) => {
    const { postNewsletter, store } = props;
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState<{ valid: boolean, error: string }>({ valid: true, error: 'Please enter valid email' });
    const [submitted, setSubmitted] = useState(false);
    const [allowSubmit, setAllowSubmit] = useState(false);

    const validateForm = (em) => {
		validForm.email = false;
		if (validateEmail(em)) {
			validForm.email = true;
		}
		if (validForm.email) {
			setEmailError({ valid: true, error: '' });
			return true;
		} else {
            setEmailError({ valid: false, error: 'Please enter valid email' });
        }
		return false;
	};

    const onSubmit = (evt) => {
        evt.preventDefault();

        if (validateForm(email) && allowSubmit) {
			// console.log('validForm', validForm);
			if (validForm.email) {
				if (!validForm.phone) {
					subscribeBluecoreRegistration(email, '');
				}
				setSubmitted(true);
			}
		}
        /*
        if (allowSubmit) {
            const ajaxRequest = new XMLHttpRequest();
            ajaxRequest.open('POST', `https://s-app.cocoandeve.com/bluecore/registrations`, true);
            ajaxRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            const date = new Date();
            const tse = date.getTime();
            const content = `{email:'${email}',time:${tse}}`;
            const signature = encryptParam(content);
            ajaxRequest.send(`signature=${signature}&email=${email}&country=&brand=cocoandeve_shopify_${store || 'us'}&reg_source=footer`);
            setSubmitted(true);
        }
        */
	};

    const handleEmail = (e) => {
        setEmailError({ valid: true, error: ''});
		const email = e.target.value !== '' && /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(e.target.value);
        setEmail(e.target.value);
        setAllowSubmit(email);
	};

    return (
        <div className="container blog-post-grid__newsletter px-0 hidden">
            <div className="w-full flex flex-wrap bg-pink-light mb-2 mx-0 rounded-[1.5em]">
                <picture className="lg:w-[270px] lg:basis-[270px] w-full p-0">
                    <source srcSet={postNewsletter.blog_ns_image_mob.url} media="(min-width: 992px)" />
                    <img src={postNewsletter.blog_ns_image_desk.url} className="w-full h-[160px] object-cover lg:h-full rounded-tl-[1.5em] rounded-tr-[1.5em] lg:rounded-tr-none lg:rounded-bl-[1.5em]" alt="Blog article banner" />
                </picture>
                <div className="lg:w-[calc(100%-270px)] lg:basis-[calc(100%-270px)] w-full px-g py-2 lg:px-3 lg:py-[1.5rem]">
                    <h2 className="mb-g lg:!mb-[1rem] blog-post-grid__newsletter-title !px-0 text-lg text-body">{postNewsletter.blog_ns_title}</h2>
                    <p className="mb-g lg:!mb-[1rem] !px-0 text-body">{postNewsletter.blog_ns_desc}</p>
                    {!submitted && (
                        <form className="w-full mb-g lg:mb-[1rem]" onSubmit={onSubmit}>
                            <div className=" relative flex flex-wrap w-full items-stretch">
                                <input required onChange={handleEmail} value={email} type="email" className="bg-white flex-[1_1_auto] w-[1%] focus:outline-none focus:border-gray-400 active:border-gray-400  focus-visible:border-gray-400 block appearance-none py-[14px] px-[16px] mb-0 text-base leading-base border border-[solid] border-gray-400 text-body placeholder:text-gray-500 border-gray-200 rounded-tl-[2rem] rounded-bl-[2rem] -mr-1 relative rounded-tr-none rounded-br-none" placeholder={postNewsletter.blog_ns_email} aria-label={postNewsletter.blog_ns_email} />
                                <div className="input-group-append flex -ml-[1px]">
                                    <button className="py-[9px] px-2 min-w-[9.375em] lg:min-w-[11.375em] relative leading-base font-normal inline-block align-middle text-center select-none border whitespace-no-wrap no-underline bg-primary hover:bg-primary-dark border-primary text-white rounded-full" type="submit">{postNewsletter.blog_ns_btn}</button>
                                </div>
                            </div>
                            {!emailError.valid && <span className="text-[red] font-size-sm">{emailError.error}</span>}
                        </form>
                    )}
                    {submitted && (
                        <div className="blog-post-grid__newsletter--submitted form-group mb-g text-left items-center flex !px-0">
                            <CheckCircle className="svg fill-secondary" />
                            <span className="ml-1">{postNewsletter.blog_ns_success}</span>
                        </div>
                    )}
                    <p className="text-[10px] lg:text-xs text-gray-600 mb-0 text-gray-600 mt-0 mb-[0!important] !px-0">{parse(postNewsletter.blog_ns_note.replace('<a', '<a class="text-[10px] lg:text-xs underline text-body"'))}</p>
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
                <a href={postBannerInfo.blog_banner_link} className="text-center d-block font-bold [text-decoration-line:none!important] hover:[text-decoration-line:underline!important]" aria-label={`Banner Link - ${postBannerInfo.blog_banner_title}`}>{postBannerInfo.blog_banner_title}</a>
            )}
            <a href={postBannerInfo.blog_banner_link} className="block text-center d-block mt-1" aria-label={`Banner Post of ${title}`}>
                <picture className="w-auto mt-2 mb-1 no-gutters__in-container">
                    <source srcSet={postBannerInfo.blog_banner_dektop.url} media="(min-width: 992px)" width="600" height="244" />
                    <img src={postBannerInfo.blog_banner_dektop.url} className="rounded object-cover align-middle mx-full lg:h-[244px] sm:h-auto" loading="lazy" width="384" height="156" alt={title} />
                </picture>
            </a>
        </div>
    );
};

const Article = (props) => {
    const { content, isLoading, postNewsletter, postBannerInfo, upsells, store, addToCart, generalSetting, region, featuredImg, popArticles, trackBluecoreEvent, bluecoreProductWaitlist, waitlistPdpSetting } = props;
    let body = '';
    
    if (content?.BlogContentMultiStores?.[region]?.body_content && typeof content.BlogContentMultiStores[region].body_content === 'string') {
        const ariaLabel = '<a aria-describedby="articleTitleHeading" class="underline"';
        body = content.BlogContentMultiStores[region].body_content
            .replace('<a', ariaLabel)
            .replace(/<ul>/g, '<ul class="article-list">')
            .replace('id="newsletterWrapper"', 'class="newsletterWrapper"');
    }
    const featuredImageProp = content?.BlogContentMultiStores?.[region]?.featured_image;

    const [offset, setOffset] = useState<any | null>('6%');
    const [showButton, setShowButton] = useState(false);
    const [screenLG, setScreenLG] = useState(992);
    const [label, setLabel] = useState('');
    const [tanTitle, setTanTitle] = useState('');
    const [title, setTitle] = useState(content?.title);
    const [featuredImageUrl, setFeaturedImageUrl] = useState(featuredImg);
    const [featuredImageLink, setFeaturedImageLink] = useState(content?.BlogContentMultiStores?.[store]?.featured_image_link || '');
    const [bodyContent, setBodyContent] = useState('');
    const [quickNav, setQuickNav] = useState([]);

    const d = new Date(content?.updatedAt);
    const day = d.toLocaleString('default', { day: 'numeric' });
    const month = d.toLocaleString('default', { month: 'short' });
    const year = d.toLocaleString('default', { year: 'numeric' });
    const updateDate = `Updated on ${month} ${day}, ${year}`;

    // let quickLinks = [];
    const featuredImageAlternativeText = content?.BlogContentMultiStores?.[store]?.featured_image?.alt || '';

    // if (content?.quick_links) {
    //     quickLinks = content.quick_links.split(',');
    // }

    const handleClick = (event, href) => {
        event.preventDefault();
        const targetElement = document.querySelector(href);
        const mainContent = document.querySelector('.article__content');
        const scrollTop = 0;
        if (targetElement && mainContent) {
            window.scrollTo({
                top: targetElement.offsetTop - (mainContent.scrollTop) - scrollTop + 40,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        if (content?.BlogContentMultiStores?.[region]?.featured_image?.url) {
            const featuredImage = content?.BlogContentMultiStores?.[region]?.featured_image?.url || '';
            setFeaturedImageUrl(featuredImage)
        }
        if (content?.BlogContentMultiStores?.[region]?.featured_image_link) {
            const featuredLink = content?.BlogContentMultiStores?.[region]?.featured_image_link || '';
            setFeaturedImageLink(featuredLink)
        }
        if (content?.BlogContentMultiStores?.[region]?.body_content && typeof content.BlogContentMultiStores[region].body_content === 'string') {
            const ariaLabel = '<a aria-describedby="articleTitleHeading" class="underline"';
            const body = content.BlogContentMultiStores[region].body_content
                .replace('<a', ariaLabel)
                .replace(/<ul>/g, '<ul class="article-list">')
                .replace(/<ol>/g, '<ol class="ordered-list">')
                .replace('id="newsletterWrapper"', 'class="newsletterWrapper"');
            setBodyContent(body);
        }
    }, [content, region]);

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
    }, [bodyContent]);

    useEffect(() => {
        const t = setTimeout(() => {
            const blogPostGridNewsletter = document.querySelector('.blog-post-grid__newsletter');
            // console.log('newslette dom', blogPostGridNewsletter);
            const newsletterWrapper = document.querySelector('.newsletterWrapper');
            // console.log('newsletterWrapper dom', newsletterWrapper);
            if (blogPostGridNewsletter && newsletterWrapper) {
                if (blogPostGridNewsletter.parentNode === newsletterWrapper) {
                    return;
                }
                newsletterWrapper.appendChild(blogPostGridNewsletter);
                blogPostGridNewsletter.classList.remove('hidden');
            }
        }, 1500);
        return () => clearTimeout(t);
    }, [postNewsletter, region]);

    useEffect(() => {
        const blogPostBanner = document.querySelector('.blog-post-banner');
        const articleNewBanners = document.querySelectorAll('.article-new-banner');
        if (blogPostBanner && articleNewBanners.length > 0) {
            const articleBanners = document.querySelectorAll('.article-banner');
            articleBanners.forEach(banner => banner.classList.add('hidden'));
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
    }, [postBannerInfo, bodyContent]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const mainHeader = document.querySelector('.main-header');
            const progressBar = document.querySelector('.reading-proggress-bar');
            if(mainHeader && progressBar) {
                progressBar.classList.remove('hidden');
                mainHeader.appendChild(progressBar);
            }
            document.querySelectorAll('.article__content p img')?.forEach((img) => {
                img.closest('p').classList.add('!px-0');
            });
        }, 250);

        return () => clearTimeout(timer);
    }, [bodyContent]);

    useEffect(() => {
        const manipulateShops = () => {
            const articleShops = document.querySelectorAll('.blog-post-grid__shop-articles');
            const articleContent = document.querySelectorAll('.article__content h2:not(.blog-post-grid__newsletter-title)').length > 1 
            ? document.querySelectorAll('.article__content h2:not(.blog-post-grid__newsletter-title)') 
            : document.querySelectorAll('.article__content h3');
            if (articleShops && articleContent.length) {
                const shopArticles = content?.BlogContentMultiStores[region]?.body_content?.includes('id="shop-articles"');
                let targetAppend = parseInt((articleContent.length / 2).toString(), 10);
                targetAppend = targetAppend > 1 ? targetAppend - 1 : targetAppend;
                const targetContent = articleContent[targetAppend];
                articleShops.forEach(articleShop => {
                    articleShop.classList.remove('w-full');
                    if (shopArticles) {
                        const shopArticlesDiv = document.getElementById(`shop-articles`);
                        shopArticlesDiv.append(articleShop);
                    } else {
                        targetContent.parentNode.insertBefore(articleShop, targetContent);
                    }
                });
                if (window.innerWidth > screenLG) {
                    articleShops.forEach(articleShop => {
                        articleShop.querySelectorAll('.product-card-btn:not([data-waitlist]) .product-card-btn__text').forEach(el => {
                            if (el) setLabel('Add')
                        });
                
                        articleShop.querySelectorAll('.product-card-btn[data-waitlist] .product-card-btn__text').forEach(el => {
                            if (el) el.textContent = 'Waitlist';
                        });
                
                        articleShop.querySelectorAll('.product-card-btn[data-waitlist] .product-card-btn__prices .text-linethrough').forEach(el => {
                            if (el && el.parentNode) {
                                el.parentNode.removeChild(el);
                            }
                        });
                
                        articleShop.querySelectorAll('.swatch-overlay > div:first-child').forEach(el => {
                            if (el) {
                                el.classList.remove('lg:px-1');
                                el.classList.add('lg:px-0');
                            }
                        });
                
                        articleShop.querySelectorAll('.product-card__title').forEach(el => {
                            if (el) {
                                el.classList.replace('text-base', 'text-sm');
                                el.classList.replace('lg:text-lg', 'text-sm');
                                el.classList.add('[text-decoration-line:none!important]');
                                el.classList.add('hover:[text-decoration-line:underline!important]');
                            }
                        });
                
                        articleShop.querySelectorAll('.review-stars__number').forEach(el => {
                            if (el) el.classList.add('text-sm');
                        });
                
                        articleShop.querySelectorAll('.product-card-btn').forEach(el => {
                            if (el) {
                                el.classList.replace('md:text-base', 'text-sm');
                                el.classList.remove('lg:border-0');
                            }
                        });
                
                        articleShop.querySelectorAll('.product-title__text').forEach(el => {
                            if (el) {
                                el.classList.remove('min-h-[2.5em]');
                                el.classList.remove('lg:min-h-[3.125em]');
                                el.classList.remove('lg:mx-[0.625rem]');
                            }
                        });
                    });
                }
            }

            const spanEls = Array.from(document.getElementsByTagName('span'));
            spanEls.forEach((el) => {
                // console.log('text content', el.textContent.toLowerCase());
                if (el.textContent.toLowerCase().includes('edited by')) {
                    el.classList.add('!text-body');
                }
            });

            if (content?.quick_links) {
                setQuickNav(content.quick_links.split(','));
            }
        }

        const timeoutId = setTimeout(manipulateShops, 500);
        return () => clearTimeout(timeoutId);

    }, [screenLG, bodyContent, upsells]);

    useEffect(() => {
        const handleScroll = () => {
            const pageHeight = document.body.offsetHeight;
            const windowWidth = window.innerWidth;
            const scrollTop = window.scrollY;
            
            if (windowWidth >= 768 && pageHeight > 3600) {
                if (scrollTop > 500) {
                    setShowButton(true);
                } else {
                    setShowButton(false);
                }
            } else if (windowWidth < 768 && pageHeight > 2560) {
                if (scrollTop > 700) {
                    setShowButton(true);
                } else {
                    setShowButton(false);
                }
            } else {
                setShowButton(false);
            }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const tikTokScript = document.createElement('script');
        tikTokScript.src = 'https://www.tiktok.com/embed.js';
        tikTokScript.setAttribute('async', '');
        document.body.appendChild(tikTokScript);

        
    }, []);

    useEffect(() => {
		const newtitle = region === 'ca' ? 'Tan' : 'Tan & SPF';
		setTanTitle(newtitle);

        if ((region === 'int' || region === 'au' || region === 'my') && content?.handle === 'how-to-deep-condition-hair') {
            setTitle('How to Deep Condition Hair to Ditch Dryness and Frizz');
        }
	}, [region]);

    const dataBreadcrumb = [
        {
            link: '/',
            title: 'Home',
            className: '',
        },
        {
            link: '/blogs/news',
            title: 'Blog',
			className: '',
        },
        {
            link: null,
            title: title,
			className: '',
        },
    ];

    // console.log('featuredImg', featuredImg);

    return (
        <>
        <div className="mobile-wrapper sm:px-hg relative">
            <ProgressBar width={offset} />
		    <div className="container mt-4">
                <Breadcrumb data={dataBreadcrumb} />
                {/* <h1 className="text-center mb-2">COCO &amp; EVE BLOG</h1> */}
                {/* {!isLoading && (
                    <div className="blog-nav-tags mb-4 flex mt-2">
                        <BlogNavTag href="/blogs/news" title="ALL" active={true} />
                        <BlogNavTag href="/blogs/news/tagged/hair" title="Hair"/>
                        <BlogNavTag href="/blogs/news/tagged/tan" title={tanTitle}/>
                        <BlogNavTag href="/blogs/news/tagged/skin" title="Skin"/>
                        <BlogNavTag href="/blogs/news/tagged/body" title="Body"/>
                        <BlogNavTag href="/blogs/news#how-to-tab" title="How to's"/>
                    </div>
                )} */}
                <article className="flex flex-wrap mt-4 lg:mt-3 lg:-mx-g sm:-mx-hg lg:mb-4">
                    <div className="blog-post-grid__content w-full lg:w-8/12 lg:block lg:px-g sm:px-hg">
                        <h1 id="articleTitleHeading" className="text-center mb-1">{content?.title}</h1>
                        <span className="text-body mb-1 article__published-at">{updateDate}</span>
                        
                        {featuredImg && (
                            featuredImageLink ? (
                                <a href={featuredImageLink}>
                                    <picture className="my-2 lg:mb-1 block relative w-auto ratio ratio-1x1 mx-auto lg:mx-0 sm:-mx-g lg:rounded">
                                        <source srcSet={featuredImg?.url} media="(min-width: 992px)" />
                                        <img className="object-cover absolute w-full h-full top-0 bottom-0 left-0 align-middle lg:rounded" src={featuredImg?.url?.replace('/public', '/540x')} alt={featuredImg?.alt || ''} title={content?.title} fetchPriority="high" />
                                    </picture>
                                </a>
                            ) : (
                                <picture className="my-2 lg:mb-1 block relative w-auto ratio ratio-1x1 mx-auto lg:mx-0 sm:-mx-g lg:rounded">
                                    <source srcSet={featuredImg?.url} media="(min-width: 992px)" />
                                    <img className="object-cover absolute w-full h-full top-0 bottom-0 left-0 align-middle lg:rounded" src={featuredImg?.url?.replace('/public', '/540x')} alt={featuredImg?.alt || ''} title={content?.title} fetchPriority="high" />
                                </picture>
                            )
                        )}

                        {quickNav?.length > 0 && (
                            <>
                                <span className="block mt-1 lg:pt-g text-left font-bold text-body">In this article:</span>
                                <div className="mt-1 mb-2 lg:mb-1 lg:pb-g text-body">
                                    {quickNav.map((quickLink, index) => (
                                        <a onClick={(e) => handleClick(e, `#link-${index + 1}`)} key={index} href={`#link-${index + 1}`} className="blog-post-quick-links">
                                            <span>{quickLink}</span>
                                        </a>
                                    ))}
                                </div>
                            </>
                        )}
                        
                        <div className="article__content mt-4 lg:mt-0">
                            {parse(bodyContent)}
                            <ul className="px-g block mb-1 mt-1 lg:px-0 lg:mb-0">
                                <li className="inline-block mr-[0.75rem]">
                                    <a target="_blank" href={`https://twitter.com/intent/tweet?url=https://${region}.cocoandeve.com&text=${content?.title}`} className="no-underline text-primary text-[1.875em]" aria-label="Share on Twitter">
                                        <Twitter className="svg fill-primary h-[1em]" />
                                    </a>
                                </li>
                                <li className="inline-block mr-[0.75rem]">
                                    <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=https://${region}.cocoandeve.com`} className="no-underline text-primary text-[1.875em]" aria-label="Share on Facebook">
                                        <Facebook className="svg fill-primary h-[1em]" />
                                    </a>
                                </li>
                                <li className="inline-block">
                                    <a target="_blank" href={`https://pinterest.com/pin/create/button/?url=https://${region}.cocoandeve.com&media=${featuredImageUrl}&description=${content?.title}`} className="no-underline text-primary text-[1.875em]" aria-label="Share on Pinterest">
                                        <Pinterest className="svg fill-primary h-[1em]" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {postNewsletter?.post_newsletter_enabled && (
                            <ArticleNewsLetter postNewsletter={postNewsletter} store={region} />
                        )}
                        {postBannerInfo?.enables && (
                            <ArticlPosteBanner postBannerInfo={postBannerInfo} title={content?.title} />
                        )}
                    </div>
                    <div id="sideBarPosts" className="overflow-x-hidden -mx-hg lg:mx-0 lg:w-4/12 lg:px-g"></div>
                </article>
            </div>
        </div>
        {upsells?.length > 0 && (
            <div className="blog-post-grid__shop-articles articleCarousel py-3 flex flex-wrap lg:-mx-g sm:-mx-g w-full">
                <div className="container lg:px-0 sm:pl-0 sm:pr-0">
                    <p className="font-bold text-xl lg:text-2xl text-center !mb-g lg:!mb-4">Shop this article</p>
                    {!isLoading && ( <ShopArticle waitlistPdpSetting={waitlistPdpSetting} bluecoreProductWaitlist={bluecoreProductWaitlist} trackBluecoreEvent={trackBluecoreEvent} store={region} isLoading={isLoading} label={label} products={upsells} addToCart={addToCart} generalSetting={generalSetting} /> )}
                </div>
            </div>
        )}
        <div id="relatedPostCard" className="mb-4 lg:mb-0"></div>
        {quickNav?.length > 0 && (
            <>
                <a className={`blog-back-to-top font-bold h4 m-0 ${showButton ? 'btn--show' : ''}`} id="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <BackToTop className="svg" />
                </a>
            </>
        )}
        </>
    );
};

export default Article;