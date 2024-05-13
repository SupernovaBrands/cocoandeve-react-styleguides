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

const PostCards = () => {
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
			<div className="container">
				<h1 className="mb-1">POST CARD</h1>
				<div className="flex flex-wrap mb-0 mt-2 -mx-hg lg:-mx-g">
					{postData.map((data) =>
						<PostCard key={data.id} className="mb-2 w-full lg:w-1/2 px-0 lg:px-g" data={data} template="blog" />
					)}
				</div>
				<h1 className="mb-1">POST CARDS GRID</h1>
				<div className="flex flex-wrap mb-0 mt-2 -mx-hg lg:-mx-g">
					{postData2.map((data) =>
						<PostCard key={data.id} className="mb-2 w-full lg:w-1/3 px-0 lg:px-g" data={data} template="blog" />
					)}
				</div>
				<h1 className="mb-1">POST CARDS GRID NO IMAGE</h1>
				<div className="flex flex-wrap mb-5 mt-2 -mx-hg lg:-mx-g">
					{postData3.map((data) =>
						<PostCard key={data.id} className="mb-2 w-full lg:w-1/3 px-0 lg:px-g" data={data} template="blog" />
					)}
				</div>

				<h1 className="mb-1">POST CARDS CAROUSEL</h1>
				<Carousel.Wrapper emblaApi={emblaApi} className="mb-4">
					<Carousel.Inner emblaRef={emblaRef} className="lg:-mx-g">
						{postData4.map((data) => (
							<PostCard key={data.id} className="flex-grow-0 flex-shrink-0 w-full basis-full px-hg lg:px-g lg:w-1/2 lg:basis-1/2" data={data} template="blog" />
						))}
					</Carousel.Inner>
					<Carousel.Navigation>
						<PrevButton
							onClick={() => autoPlayClick(arrowClickPrev)}
							className="lg:-left-[1.25em] w-[auto] text-primary"
						>
							<span className="bg-pink-light -left-[2%] w-4 h-4 absolute z-[-1] flex justify-center items-center top-[4.313rem] lg:top-[8.063rem]">
								<ChevronPrev className="w-g h-g svg--current-color" />
							</span>
						</PrevButton>
						<NextButton
							onClick={() => autoPlayClick(arrowClickNext)}
							className="lg:-right-[1.25em] w-[auto] text-primary"
						>
							<span className="bg-pink-light -right-[2%] w-4 h-4 absolute z-[-1] flex justify-center items-center top-[4.313rem] lg:top-[8.063rem]">
								<ChevronNext className="w-g h-g svg--current-color" />
							</span>
						</NextButton>
					</Carousel.Navigation>
				</Carousel.Wrapper>
			</div>
		</div>
	);
};

export default PostCards;
