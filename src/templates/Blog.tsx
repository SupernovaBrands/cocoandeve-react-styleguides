// import { Container, Row } from "react-bootstrap";
import BlogNavTag from '~/compounds/blog-nav-tags';
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
import PostTag from "~/components/PostTag";

const options: EmblaOptionsType = {
	loop: true,
	align: 'start',
	breakpoints: {
		'(min-width: 992px)': {
			align: 'start',
			watchDrag: false,
			duration: 40,
		}
	}
};

const Blog = (props) => {

	const { isLoading, postData, videoData, tag, region, generalSetting } = props;
	const [activeFrame, setActiveFrame] = useState(true);
	const [modal, setModal] = useState(false);
	const [videoSrc, setvideoSrc] = useState('');
	const [active, setActive] = useState(false);
	const [tanStatus, setTanStatus] = useState(true);
	const [tanTitle, setTanTitle] = useState('Tan & SPF');
	const [isClient, setIsClient] = useState(false);

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

	let extendedVideoSliders = [...videoSliders];
	if (extendedVideoSliders.length < 3) {
		const slides = 4 - extendedVideoSliders.length;
		extendedVideoSliders = extendedVideoSliders.concat(extendedVideoSliders.slice(0, slides));
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
		suncare: { bg: 'bg-suncare-blue', text: 'text-white' },
        featured: { bg: 'bg-gray-400', text: 'text-gray-600' },
    };

	useEffect(() => {
		if (window.location.href.includes('#how-to-tab') || window.location.href.includes('how-to-tab=true')) {
			setActiveFrame(!activeFrame);
			setActive(true);
		} else {
			setActiveFrame(activeFrame);
			setActive(false);
		}

		setIsClient(true);
	}, []);


	useEffect(() => {
		const tagContainer = document.getElementById('navBlogTags');
		let activeTag = document.querySelector('#navBlogTags a.active');
		if (window.location.href.includes('#how-to-tab') || window.location.href.includes('how-to-tab=true')) {
			activeTag = document.querySelector('#how-to-nav');
		}

		if (tagContainer && activeTag instanceof HTMLElement) {
			const newScrollPosition = activeTag.offsetLeft + activeTag.offsetWidth / 2 - tagContainer.clientWidth / 2;
			tagContainer.scrollLeft = newScrollPosition;
		}
	}, []);

	useEffect(() => {
		const title = region === 'ca' ? 'Tan' : 'Tan & SPF';
		setTanTitle(title);
		if (region === 'int' || region === 'my') setTanStatus(false);
	}, [region]);

	return (
		<div className="mobile-wrapper mt-3 lg:px-0">
			<div className="container px-0">
				<h1 className="text-center mb-[1rem] lg:mb-1 text-xl lg:text-2xl font-bold">{tag === 'all' ? 'COCO & EVE BLOG' : `COCO & EVE ${tag.toUpperCase()} BLOG`}</h1>
				<div className="px-g blog-nav-tags mb-3 flex justify-center gap-[4px] gap-0" id="navBlogTags">
					<BlogNavTag href="/blogs/news" title="All" active={active ? false : (tag === 'all' ? true : false)}/>
					{!['int'].includes(region) && (<BlogNavTag href="/blogs/news/tagged/hair" title="Hair" active={active ? false : (tag === 'hair' ? true : false)}/>)}
					{['us', 'uk', 'eu', 'ca', 'au', 'dev'].includes(region) && (
						<BlogNavTag href="/blogs/news/tagged/tan" title="Tan" active={active ? false : (tag === 'tan' ? true : false)}/>
					)}
					{['us', 'uk', 'eu', 'ca', 'dev'].includes(region) && (
						<BlogNavTag href="/blogs/news/tagged/spf" title="SPF" active={active ? false : (tag === 'suncare' ? true : false)}/>
					)}
					{['my'].includes(region) && (
						<BlogNavTag href="/blogs/news/tagged/skin" title="Skin" active={active ? false : (tag === 'skin' ? true : false)}/>
					)}
					{!['int', 'my'].includes(region) && (
						<BlogNavTag href="/blogs/news/tagged/body" title="Body" active={active ? false : (tag === 'body' ? true : false)}/>
					)}
					<a href="/blogs/news?how-to-tab=true" id="how-to-nav" onClick={handleHowTo} className={`leading-[20px] hover:text-primary lg:leading-[25px] py-[8px] px-[8px] lg:py-1 lg:px-2 hover:no-underline no-underline ${active ? 'active-dark' : ''}`}>How to's</a>
				</div>
				{!activeFrame && (
					<>
						<div className="flex flex-wrap article-list-wrapper lg:-mx-g px-0 lg:px-hg">
							{videoSliders.length > 0 && <HowToCarousel ctaBgColor={generalSetting?.bfcm_cta_bg_color} btnLeft="lg:left-[-4px] sm:left-0" btnRight="lg:right-[-4px] sm:right-0" videoData={extendedVideoSliders} isLoading={isLoading} store={region} />}
							<div className="flex flex-wrap mb-0 mt-2 w-full px-g">
								{videoItems.map((item, index) => (
									<div className="w-full lg:w-1/3 px-0 lg:px-[.5rem]">
										<figure className="no-gutters__in-container lg:mx-0 sm:-mx-g">
											{!isLoading && (
												<picture className="cursor-pointer embed-responsive m-0" data-src={item.video_url} onClick={handlOpenModal}>
													<source srcSet={item.src.replace('/public', '/750x')} media="(min-width: 992px)" width="368" height="192"></source>
													<img className="w-full h-[revert-layer]" alt={``} loading="lazy" width="412" height="214" src={item.src.replace('/public', '/750x')}/>
													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 54"
														className="absolute text-white w-full size-[3.25em] lg:size-[4em] fill-white top-0 bottom-0 m-auto lg:w-full">
															<path d="M27 0a27 27 0 1027 27A27 27 0 0027 0zm11.371 27.86a1.929 1.929 0 01-.866.866v.01L22.076 36.45a1.929 1.929 0 01-2.791-1.736V19.286a1.929 1.929 0 012.791-1.726L37.5 25.274a1.928 1.928 0 01.871 2.586z"></path>
															</svg>
												</picture>
											)}
											<figcaption className="p-[1rem]">
												<div className="badge-blog flex gap-[8px]">
													{ item?.tags?.length > 0 ? item?.tags?.map((tag) => {
														if (isClient && (region === 'int' || region === 'my') && tag.toLowerCase() === 'tan') {
															return null;
														}
														return (
															// <span className={`${colors[tag?.toLowerCase()]?.bg} ${colors[tag?.toLowerCase()]?.text} badge-tag font-weight-normal mr-1 rounded capitalize inline-block badge text-center min-w-[3.375em]`}>{tag}</span>
															<PostTag store={region} widthClass="min-w-[3.375em]" paddingClass="py-[4px] px-[8px] text-xs" key={`video-tag-${tag}-${index}`} tag={tag}>{tag.charAt(0).toUpperCase() + tag.slice(1)}</PostTag>
															
														);
													}) : '' }
												</div>
												<p className="h2 mt-[8px] blog-video-card__title mb-0 cursor-pointer"><a tabIndex={0} role="button" className="no-underline hover:underline hover:text-body h2 text-body" data-src={item.video_url} onClick={handlOpenModal}>{item.title}</a></p>
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
						<div className="flex flex-wrap article-list-wrapper lg:-mx-g px-0 lg:px-hg">
							{!isLoading && (
								<div className="container px-0 m-0">
									{postData.length > 0 &&
										<Carousel.Wrapper emblaApi={emblaApi} className="blog-post__carousel w-full px-hg lg:px-g mx-0 lg:mx-g">
											<Carousel.Inner emblaRef={emblaRef}>
												{extendedPostData.map((data, index) => (
													<PostCard showSubtext={true} readMoreLink={true} carousel={true} key={index} textClass="flex-grow" fontWeight="font-bold" badgePadding="py-[6px] px-[12px] text-xs lg:text-sm" figcaptionPadding="p-[1rem]" pictureClass="blog-carousel__image embed-responsive m-0" className="flex-shrink-0 w-[335px] basis-[335px] px-[.375em] lg:px-[.5rem] lg:w-1/2 lg:basis-1/2" textPrimary={false} template="blog" data={data} bgColor={generalSetting?.bfcm_cta_bg_color} textColor={generalSetting?.bfcm_cta_text_color} store={region} />
												))}
											</Carousel.Inner>
											<Carousel.Navigation>
												<PrevButton
													onClick={() => autoPlayClick(arrowClickPrev)}
													className="lg:w-auto lg:h-0 hidden lg:flex top-[9.3125em]"
												>
													<span className="absolute z-[1] flex justify-center items-center lg:-left-[2em] h-5 w-5 rounded-full">
														<ChevronPrev className="svg--current-color w-g h-g" />
													</span>
												</PrevButton>
												<NextButton
													onClick={() => autoPlayClick(arrowClickNext)}
													className="lg:w-auto lg:h-0 hidden lg:flex top-[9.3125em]"
												>
													<span className="absolute z-[1] flex justify-center items-center lg:-right-[2em] h-5 w-5 rounded-full">
														<ChevronNext className="svg--current-color w-g h-g" />
													</span>
												</NextButton>
											</Carousel.Navigation>
										</Carousel.Wrapper>
									}
								</div>
							)}
							{/* {popularArticles.length > 0 &&<ArticleRecommendation popularArticles={popularArticles} />} */}
							<div id="poppularArticles" className="container"></div>
							<div id="topPostCard" className="px-g blog-post__cards flex flex-wrap mb-0 mt-0 w-full"></div>
						</div>
						{videoData.length > 0 &&
							<div className="how-to-wrapper my-3 lg:my-4 flex flex-wrap lg:-mx-g px-0 lg:px-hg">
								<HowToCarousel ctaBgColor={generalSetting?.bfcm_cta_bg_color} btnLeft="lg:left-[-25px] sm:left-0" btnRight="lg:right-[-25px] sm:right-0" title={true} videoData={extendedVideoData} isLoading={isLoading} store={region} />
							</div>
						}
						<div id="taggedPostCard" className="blog-post__cards article-list-wrapper flex flex-wrap mb-0 mt-0 px-g lg:px-hg"></div>
						<div id="bottomPostCard" className="blog-post__cards px-g"></div>
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
