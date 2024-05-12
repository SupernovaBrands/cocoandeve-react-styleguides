// import { Container, Row } from "react-bootstrap";
import BlogNavTag from '~/compounds/blog-nav-tags';
import ArticleRecommendation from "~/sections/ArticleRecommendation";
import HowToCarousel from "~/sections/HowTo";
import Link from "next/link";

import { EmblaOptionsType } from 'embla-carousel';
import Carousel from "~/components/carousel/EmblaCarouselMulti";
import PostCard from "~/compounds/PostCard";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { NextButton, PrevButton, controlAutoplay, usePrevNextButtons } from '~/components/carousel/EmblaCarouselArrowButtons';

import ChevronNext from '~/images/icons/chevron-next.svg';
import ChevronPrev from '~/images/icons/chevron-prev.svg';

const options: EmblaOptionsType = {
	loop: true,
	align: 'start'
};

const Blog = (props) => {

	const { isLoading, postData, popularArticles, articles, videoData } = props;
	// carousel
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: true, delay: 3000 })
	]);
	const {
		onPrevButtonClick: arrowClickPrev,
		onNextButtonClick: arrowClickNext
	} = usePrevNextButtons(emblaApi);
	const autoPlayClick = controlAutoplay(emblaApi);

	return (
		<div className="mobile-wrapper">
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
				<Carousel.Wrapper emblaApi={emblaApi} className="mb-1">
					<Carousel.Inner emblaRef={emblaRef} className="lg:-mx-g">
						{postData.map((data) => (
							<PostCard key={data.id} className="flex-grow-0 flex-shrink-0 w-full basis-full px-hg lg:px-g lg:w-1/2 lg:basis-1/2" data={data} />
						))}
					</Carousel.Inner>
					<Carousel.Navigation>
						<PrevButton
							onClick={() => autoPlayClick(arrowClickPrev)}
							className="lg:-left-[1.25em] w-[auto] text-primary"
						>
							<span className="bg-white -left-[2%] w-4 h-4 absolute z-[-1] flex justify-center items-center top-[4.313rem] lg:top-[8.063rem]">
								<ChevronPrev className="w-g h-g svg--current-color" />
							</span>
						</PrevButton>
						<NextButton
							onClick={() => autoPlayClick(arrowClickNext)}
							className="lg:-right-[1.25em] w-[auto] text-primary"
						>
							<span className="bg-white -right-[2%] w-4 h-4 absolute z-[-1] flex justify-center items-center top-[4.313rem] lg:top-[8.063rem]">
								<ChevronNext className="w-g h-g svg--current-color" />
							</span>
						</NextButton>
					</Carousel.Navigation>
				</Carousel.Wrapper>
				<div className="flex flex-wrap article-list-wrapper lg:mb-4">
					<ArticleRecommendation popularArticles={popularArticles} />
					<div className="flex flex-wrap mb-0 mt-2 -mx-hg lg:-mx-g">
						{articles.map((data) =>
							<PostCard key={data.id} className="mb-2 w-full lg:w-1/3 px-0 lg:px-g" data={data} />
						)}
					</div>
				</div>
				<HowToCarousel videoData={videoData} />
				{/* <div className="flex flex-wrap mb-0 mt-2 -mx-hg lg:-mx-g mb-4">
					{articles.map((data) =>
						<PostCard key={data.id} className="mb-2 w-full lg:w-1/3 px-0 lg:px-g" data={data} />
					)}
				</div> */}
				<div className="w-100 text-center mb-4">
                	<Link href="#" className="bg-transparent hover:bg-primary hover:text-white border-primary text-primary btn-lg btn hover:no-underline">Load more posts</Link>
				</div>
			</div>
		</div>
	);
};

export default Blog;
