import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import { DotButton, useDotButton } from '~/components/carousel/EmblaCarouselDotButton';
import Autoplay from 'embla-carousel-autoplay';
import SidebarCard from '~/components/SidebarCard';

const Sidebar = ({data}) => {
	const options: EmblaOptionsType = {
		loop: false,
		active: true,
		breakpoints: {
			'(min-width: 768px)': { active: false },
		},
	};
	const [emblaRef3, emblaApi3] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: false, delay: 3000 })
	]);
	const { selectedIndex: idx3, onDotButtonClick: onClick3 } = useDotButton(emblaApi3);
	const PER_PAGE = 2;
	const GROUPED_INDEX = Array.from(Array(Math.ceil(data.length / PER_PAGE)).keys());
	return (
		<aside className="blog-post-grid__sidebar lg:sticky w-full mt-2 lg:mt-0 mb-0 lg:mb-auto self-end flex lg:block flex-wrap lg:px-g sm:px-hg">
			<section className="px-g py-3 lg:px-[1.5625em] lg:py-4 w-[-webkit-fill-available] order-2 bg-gray-400 -mx-g lg:mx-auto">
				<h2 className="mb-3 text-center block h1">Popular reads</h2>
				<Carousel.Wrapper emblaApi={emblaApi3} className="sm:min-h-[16em]">
					<Carousel.Inner emblaRef={emblaRef3} className="lg:flex-col">
						{GROUPED_INDEX.map((_, index) => {
							const pNum = _ + 1;
							const splitItem = data.slice((pNum - 1) * PER_PAGE, pNum * PER_PAGE);
							return splitItem.length > 0 && (
								<div key={index} className="flex-grow-0 flex-shrink-0 w-full basis-full">
									{splitItem.map((item: any) => <SidebarCard key={item.id} data={item} />)}
								</div>
							)
						})}
					</Carousel.Inner>
					<Carousel.Navigation>
						<ol className="carousel__dots justify-center lg:hidden mb-0">
							{GROUPED_INDEX.map((_: any, index: number) => (
								<li key={index} className={`bg-primary ${index === idx3 ? ' opacity-1' : ' opacity-50'}`}>
									<DotButton
										onClick={() => onClick3(index)}
										className="carousel__dot"
									/>
								</li>
							))}
						</ol>
					</Carousel.Navigation>
				</Carousel.Wrapper>
			</section>
		</aside>
	);
};

export default Sidebar;
