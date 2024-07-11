// import { Container, Row } from "react-bootstrap";
import BlogNavTag from '~/compounds/blog-nav-tags';
import ArticleRecommendation from "~/sections/ArticleRecommendation";
import HowToCarousel from "~/sections/HowTo";
import { EmblaOptionsType } from 'embla-carousel';
import Carousel from "~/components/carousel/EmblaCarouselMulti";
import PostCard from "~/compounds/PostCard";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { NextButton, PrevButton, controlAutoplay, usePrevNextButtons } from '~/components/carousel/EmblaCarouselArrowButtons';
import ChevronNext from '~/images/icons/chevron-next.svg';
import ChevronPrev from '~/images/icons/chevron-prev.svg';
import { useState, useEffect } from "react";
import Modal from "~/components/Modal";
import Close from '~/images/icons/close.svg';

const options: EmblaOptionsType = {
	loop: true,
	align: 'start'
};

const Blog = (props) => {

	const { isLoading, postData, popularArticles, videoData, tag } = props;
	const [activeFrame, setActiveFrame] = useState(true);
	const [modal, setModal] = useState(false);
	const [videoSrc, setvideoSrc] = useState('');
	const [active, setActive] = useState(false);

	const handleHowTo = () => {
		setActiveFrame(!activeFrame);
		setActive(true);
	};
	const handlOpenModal = (e) => {
		const dataSrc = e.currentTarget.getAttribute('data-src');
		setvideoSrc(dataSrc);
		setModal(true);
	};

	const handlCloseModal = (open: boolean) => {
		setModal(open);
	};

	let videoSliders = [];
	if (videoData.length > 0) {
		videoSliders = videoData.filter(r => r.type === 'video_slider');
	}

	let videoItems = [];
	if (videoData.length > 0) {
		videoItems = videoData.filter(r => r.type === 'video_item');
	}

	let extendedPostData = [...postData];
	if (extendedPostData.length < 3) {
		const postItems = 4 - extendedPostData.length;
		extendedPostData = extendedPostData.concat(extendedPostData.slice(0, postItems));
	}

	let extendedVideoData = [...videoData];
	if (extendedVideoData.length < 3) {
		const videoItems = 4 - extendedVideoData.length;
		extendedVideoData = extendedVideoData.concat(extendedVideoData.slice(0, videoItems));
	}

	// carousel
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: false, delay: 3000 })
	]);
	const {
		onPrevButtonClick: arrowClickPrev,
		onNextButtonClick: arrowClickNext
	} = usePrevNextButtons(emblaApi);
	const autoPlayClick = controlAutoplay(emblaApi);

	const colors: Record<string, { bg: string; text: string }> = {
        new: { bg: 'bg-secondary', text: 'text-white' },
        tan: { bg: 'bg-yellow-light', text: 'text-gray-600' },
        hair: { bg: 'bg-secondary-light', text: 'text-gray-600' },
        body: { bg: 'bg-primary-light', text: 'text-gray-600' },
        hot: { bg: 'bg-primary', text: 'text-white' },
        featured: { bg: 'bg-gray-400', text: 'text-gray-600' },
    };

	useEffect(() => {
		if (window.location.href.includes('#how-to-tab')) {
			setActiveFrame(!activeFrame);
			setActive(true);
		} else {
			setActiveFrame(activeFrame);
			setActive(false);
		}
	}, []);


	useEffect(() => {
		const tagContainer = document.getElementById('navBlogTags');
		let activeTag = document.querySelector('#navBlogTags a.active');
		if (window.location.href.includes('#how-to-tab')) {
			activeTag = document.querySelector('#how-to-nav');
		}
		
		if (tagContainer && activeTag instanceof HTMLElement) {
			const newScrollPosition = activeTag.offsetLeft + activeTag.offsetWidth / 2 - tagContainer.clientWidth / 2;
			tagContainer.scrollLeft = newScrollPosition;
		}
	}, []);
	
	return (
		<div className="mobile-wrapper mt-3 lg:mt-5 lg:px-0 sm:px-hg">
			<div className="container">
				<h1 className="text-center mb-2">{tag === 'all' ? 'COCO & EVE BLOG' : `COCO & EVE ${tag.toUpperCase()} BLOG`}</h1>
				<div className="blog-nav-tags mb-4 flex mt-2" id="navBlogTags">
					<BlogNavTag href="/blogs/news" title="ALL" active={active ? false : (tag === 'all' ? true : false)}/>
					<BlogNavTag href="/blogs/news/tagged/hair" title="Hair" active={active ? false : (tag === 'hair' ? true : false)}/>
					<BlogNavTag href="/blogs/news/tagged/tan" title="Tan & SPF" active={active ? false : (tag === 'tan' ? true : false)}/>
					<BlogNavTag href="/blogs/news/tagged/skin" title="Skin" active={active ? false : (tag === 'skin' ? true : false)}/>
					<BlogNavTag href="/blogs/news/tagged/body" title="Body" active={active ? false : (tag === 'body' ? true : false)}/>
					<a href="/blogs/news#how-to-tab" id="how-to-nav" onClick={handleHowTo} className={`me-1 mb-1 py-1 px-2 hover:no-underline sm:font-bold lg:font-normal lg:text-lg no-underline ${tag === 'all' && active === false ? 'active' : ''} ${active ? 'active' : ''}`}>How to's</a>
				</div>
				{!activeFrame && (
					<>
						<div className="how-to-wrapper how-to--top lg:mb-4 flex flex-wrap lg:-mx-g sm:-mx-hg">
							{videoSliders.length > 0 && <HowToCarousel btnLeft="lg:left-[-4px] sm:left-0" btnRight="lg:right-[-4px] sm:right-0" videoData={videoSliders} isLoading={isLoading} />}
							<div className="flex flex-wrap mb-0 mt-2 w-full">
								{videoItems.map((item, index) => (
									<div className="mb-4 lg:mb-3 w-full lg:w-1/3 sm:px-hg lg:px-g">
										<figure className="mb-2 no-gutters__in-container border border-secondary-light lg:mx-0 sm:-mx-g">
											{!isLoading && (
												<picture className="cursor-pointer embed-responsive m-0" data-src={item.video_url} onClick={handlOpenModal}>
													<source srcSet={item.src.replace('/public', '/750x')} media="(min-width: 992px)" width="368" height="192"></source>
													<img className="w-full h-[revert-layer]" alt="Image Alt" loading="lazy" width="412" height="214" src={item.src.replace('/public', '/750x')}/>
													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 54"
														className="absolute text-white w-full size-[3.25em] lg:size-[4em] fill-white top-0 bottom-0 m-auto lg:w-full">
															<path d="M27 0a27 27 0 1027 27A27 27 0 0027 0zm11.371 27.86a1.929 1.929 0 01-.866.866v.01L22.076 36.45a1.929 1.929 0 01-2.791-1.736V19.286a1.929 1.929 0 012.791-1.726L37.5 25.274a1.928 1.928 0 01.871 2.586z"></path>
															</svg>
												</picture>
											)}
											<figcaption className="p-2 ">
												{ item.tags.length > 0 ? item.tags.map((tag) =>
													<span className={`${colors[tag.toLowerCase()].bg} ${colors[tag.toLowerCase()].text} badge-tag font-weight-normal mr-1 rounded capitalize inline-block badge text-center min-w-[3.375em]`}>{tag}</span>
												) : ''}
												<p className="h2 mt-2 blog-video-card__title mb-0 cursor-pointer"><a href="#" className="no-underline hover:underline hover:text-body h2 text-body" data-src={item.video_url} onClick={handlOpenModal}>{item.title}</a></p>
											</figcaption>
										</figure>
									</div>
								))}
							</div>
						</div>
					</>
				)}
				{activeFrame && (
					<>
						<div className="flex flex-wrap article-list-wrapper lg:mb-4 lg:-mx-g sm:-mx-hg">
							<div className="container px-0">
								{postData.length > 0 &&
									<Carousel.Wrapper emblaApi={emblaApi} className="mb-[1rem] blog-post__carousel w-full">
										<Carousel.Inner emblaRef={emblaRef}>
											{extendedPostData.map((data, index) => (
												<PostCard key={index} pictureClass="blog-carousel__image embed-responsive m-0" className="flex-shrink-0 w-full basis-full sm:px-hg lg:px-g lg:w-1/2 lg:basis-1/2" textPrimary={true} template="blog" data={data} />
											))}
										</Carousel.Inner>
										<Carousel.Navigation>
											<PrevButton
												onClick={() => autoPlayClick(arrowClickPrev)}
												className="lg:left-[1em] sm:left-[20px] w-[auto] text-primary"
											>
												<span className="bg-pink-light w-4 h-4 absolute z-[-1] flex justify-center items-center top-[4.313rem] lg:top-[8.063rem]">
													<ChevronPrev className="h-[1em] svg--current-color" />
												</span>
											</PrevButton>
											<NextButton
												onClick={() => autoPlayClick(arrowClickNext)}
												className="sm:right-[20px] lg:right-[1em] w-[auto] text-primary"
											>
												<span className="bg-pink-light w-4 h-4 absolute z-[-1] flex justify-center items-center top-[4.313rem] lg:top-[8.063rem]">
													<ChevronNext className="h-[1em] svg--current-color" />
												</span>
											</NextButton>
										</Carousel.Navigation>
									</Carousel.Wrapper>
								}
							</div>
							{popularArticles.length > 0 &&<ArticleRecommendation popularArticles={popularArticles} />}
							<div id="topPostCard" className="blog-post__cards flex flex-wrap mb-0 mt-2 w-full"></div>
						</div>
						{videoData.length > 0 &&
							<div className="how-to-wrapper mb-4 flex flex-wrap lg:mx-0 sm:-mx-hg">
								<HowToCarousel btnLeft="lg:left-[-19px] sm:left-0" btnRight="lg:right-[-19px] sm:right-0" className="lg:-mx-g" title={true} videoData={extendedVideoData} isLoading={isLoading} />
							</div>
						}
						<div id="taggedPostCard" className="blog-post__cards article-list-wrapper flex flex-wrap mb-0 mt-2 -mx-g"></div>
						<div id="bottomPostCard" className="blog-post__cards"></div>
					</>
				)}
			</div>

			{!isLoading && (
				<Modal className="modal-lg modal-dialog-centered !px-0" contentClass="w-full" isOpen={modal} handleClose={() => handlCloseModal(false)}>
					<div className="relative block w-full overflow-hidden embed-responsive-16by9">
						<iframe className="rounded-[20px] block absolute top-0 bottom-0 left-0 w-full h-full border-none" src={videoSrc}></iframe>
					</div>
					<button type="button" className="close opacity-60 absolute top-[24px] right-[24px]" onClick={() => handlCloseModal(false)}>
						<Close className="svg--current-color w-[24px] h-[24px]" />
					</button>
				</Modal>
			)}
		</div>
	);
};

export default Blog;
