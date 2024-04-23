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

const Blog = () => {
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
	const postData3 = [
		{
			id: 1,
			title: 'Our Milky Toner Is the Glowy Skin Secret You Need To Know!',
			description: 'Even experts rave about it!',
			tags: ['hair', 'tan', 'body', 'suncare', 'skin'],
		},
		{
			id: 2,
			title: '5 things you’re doing wrong with your hair care routine',
			description: 'Give these myths the brush off for a healthy scalp & shiny hair!',
			tags: ['hair', 'tan', 'body', 'suncare', 'skin'],
		},
		{
			id: 3,
			title: 'Which Hair Mask Should I Use?',
			description: 'The answer to your burning question ❤️‍🔥',
			tags: ['hair', 'tan', 'body', 'suncare', 'skin'],
		}
	];
	const postData4 = [
		...postData2,
		{
			id: 4,
			img: 'https://via.placeholder.com/828x420.jpg/EFADBA',
			srcSet: 'https://via.placeholder.com/828x420.jpg/EFADBA',
			title: 'Our Milky Toner Is the Glowy Skin Secret You Need To Know!',
			description: 'Even experts rave about it!',
			tags: ['hair', 'tan', 'body', 'suncare', 'skin'],
		},
		{
			id: 5,
			img: 'https://via.placeholder.com/828x420.jpg/EFADBA',
			srcSet: 'https://via.placeholder.com/828x420.jpg/EFADBA',
			title: '5 things you’re doing wrong with your hair care routine',
			description: 'Give these myths the brush off for a healthy scalp & shiny hair!',
			tags: ['hair', 'tan', 'body', 'suncare', 'skin'],
		},
		{
			id: 6,
			img: 'https://via.placeholder.com/828x420.jpg/EFADBA',
			srcSet: 'https://via.placeholder.com/828x420.jpg/EFADBA',
			title: 'Which Hair Mask Should I Use?',
			description: 'The answer to your burning question ❤️‍🔥',
			tags: ['hair', 'tan', 'body', 'suncare', 'skin'],
		}
	];
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
				<h1 className="text-center mb-0">COCO & EVE BLOG</h1>
				<div className="blog-nav-tags mb-4 flex mt-2">
                    <BlogNavTag title="All" active={true} />
                    <BlogNavTag title="Hair"/>
                    <BlogNavTag title="Tan & SPF"/>
					<BlogNavTag title="Skin"/>
                    <BlogNavTag title="Body"/>
                    <BlogNavTag title="How to's"/>
                </div>
				<Carousel.Wrapper emblaApi={emblaApi} className="mb-1">
					<Carousel.Inner emblaRef={emblaRef} className="lg:-mx-g">
						{postData4.map((data) => (
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
					<ArticleRecommendation />
					<div className="flex flex-wrap mb-0 mt-2 -mx-hg lg:-mx-g">
						{postData2.map((data) =>
							<PostCard key={data.id} className="mb-2 w-full lg:w-1/3 px-0 lg:px-g" data={data} />
						)}
					</div>
				</div>
				<HowToCarousel />
				<div className="flex flex-wrap mb-0 mt-2 -mx-hg lg:-mx-g mb-4">
					{postData2.map((data) =>
						<PostCard key={data.id} className="mb-2 w-full lg:w-1/3 px-0 lg:px-g" data={data} />
					)}
				</div>
				<div className="w-100 text-center mb-4">
                	<Link href="#" className="bg-transparent hover:bg-primary hover:text-white border-primary text-primary btn-lg btn hover:no-underline">Load more posts</Link>
				</div>
			</div>
		</div>
	);
};

export default Blog;
