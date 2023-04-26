import Prev from '@/images/icons/chevron-prev.svg';
import Next from '@/images/icons/chevron-next.svg';
import { useState } from 'react';
import ProductCard from '@/compounds/ProductCard';
import ResultCard from '@/compounds/result-card';
import VideoCard from '@/components/video-card';
import ArticleCard from '@/compounds/ArticleCard';
import PackCard from '@/compounds/PackagingCard';
import ProductCardUpsell from '@/compounds/ProductCardUpsell';

// https://github.com/react-bootstrap/react-bootstrap/issues/5749
const CarouselCustom = (props) => {
	const totalItems = props.slideNumber * 2;

	const [activeIndex, setActiveIndex] = useState(1);
	const [itemMovingNext, setItemMovingNext] = useState(false);
	const [itemMovingPrev, setItemMovingPrev] = useState(false);

	let carouselItems = [];
	let index = 0;
	props.items.map((item, idx) => {
		carouselItems.push({
			...item,
			id: index,
			index,
		});
		index++;
	});
	// process duplicated array of slide
	if (props.packagingCard) {
		props.items.map((item, idx) => {
			carouselItems.push({
				...item,
				addedClasses: 'd-lg-none',
				id: index,
				index,
			});
			index++;
		});
	} else {
		if (props.items.length < 8) {
			props.items.map((item, idx) => {
				carouselItems.push({
					...item,
					id: index,
					index,
				});
				index++;
			});
		}
	}
	const [primaryList, setPrimaryList] = useState(carouselItems);

	const carouselNext = () => {
		const itemsPerSlide = props.slideNumber ? props.slideNumber : 3;
		const totalItems = itemsPerSlide * 2;
		const firstElem = primaryList[0];
		const state = activeIndex >= totalItems - 1 ? 0 : activeIndex + 1;
		primaryList.push(...[firstElem]);
		primaryList.shift();
		setItemMovingNext(true);
		setTimeout(() => {
			console.log(state)
			setActiveIndex(state);
			setItemMovingNext(false);
		}, 600);
	};
	const carouselPrev = () => {
		setItemMovingPrev(true);
		setTimeout(() => {
			const state = activeIndex <= 0 ? totalItems - 1 : activeIndex - 1;
			setActiveIndex(state);
			setItemMovingPrev(false);
			const lastElem = primaryList.pop();
			primaryList.unshift(lastElem);
		}, 600);
	};
	return (
		<div className={`position-relative ${props.useRow ? 'row' : ''} ${props.packagingCard ? 'carousel--packaging carousel--real-result' : ''} ${props.resultCard ? 'carousel--real-result' : ''} ${props.articleCard ? 'blog-carousel' : ''}`}>
			<div
				id={`carouselLoopCentered${props.id}`}
				className={`carousel--loop carousel--swipe carousel--centered ${props.centered ? 'carousel--centered__custom' : ''} ${!props.centered ? `carousel--centered__custom-nocenter-${props.colLgGrid}` : ''} ${props.useRow ? 'px-0' : ''} ${props.productCard || props.resultCard || props.packagingCard || props.videoCard || props.articleCard || props.imgLogo ? '' : 'pt-2'} ${props.carouselClass ? props.carouselClass : ''}`}>
				<div className="carousel-inner d-flex flex-nowrap mx-0">
					{props.productCard && props.slideNumber > 0 && primaryList.map((item, i) => (
						<ProductCard
							key={i}
							useCardTemplate={props.useCardTemplate}
							useCarousel={true}
							className={props.className}
							activeIndex={activeIndex}
							product={item}
							itemMovingNext={itemMovingNext}
							itemMovingPrev={itemMovingPrev}
							/>
					))}
					{props.packagingCard && props.slideNumber > 0 && primaryList.map((item, i) => (
						<PackCard
							key={i}
							useCarousel={true}
							item={item}
							activeIndex={activeIndex}
							itemMovingNext={itemMovingNext}
							itemMovingPrev={itemMovingPrev}
						/>
					))}
					{props.resultCard && props.slideNumber > 0 && primaryList.map((item, i) => (
						<ResultCard
							key={i}
							useCarousel={true}
							item={item}
							activeIndex={activeIndex}
							itemMovingNext={itemMovingNext}
							itemMovingPrev={itemMovingPrev}
						/>
					))}
					{props.videoCard && props.slideNumber > 0 && primaryList.map((item, i) => (
						<VideoCard
							key={i}
							useCardTemplate={props.useCardTemplate}
							useCarousel={true}
							className={props.className}
							activeIndex={activeIndex}
							item={item}
							itemMovingNext={itemMovingNext}
							itemMovingPrev={itemMovingPrev}
						/>
					))}
					{props.productCardUpsell && props.slideNumber > 0 && primaryList.map((item, i) => (
						<ProductCardUpsell
							key={i}
							useCardTemplate={props.useCardTemplate}
							useCarousel={true}
							className={props.className}
							activeIndex={activeIndex}
							item={item}
							itemMovingNext={itemMovingNext}
							itemMovingPrev={itemMovingPrev}
						/>
					))}
					{props.articleCard && props.slideNumber > 0 && primaryList.map((item, i) => (
						<ArticleCard
							key={i}
							className={props.className}
							activeIndex={activeIndex}
							useCarousel={true}
							item={item}
							colLg={6}
							itemMovingNext={itemMovingNext}
							itemMovingPrev={itemMovingPrev} />
					))}

					{props.imgLogo && props.slideNumber > 0 && primaryList.map((item, i) => (
						<div key={i} className={`carousel-item ${item.className} ${item.index === activeIndex ? 'active' : ''} ${itemMovingNext ? 'carousel-item-next carousel-item-start ' : ''} ${itemMovingPrev ? 'carousel-item-prev carousel-item-end ' : ''}`}>
							<img className="img-fluid" src={item.src} alt={`Slide ${i}`} />
						</div>
					))}
				</div>
			</div>

			<button
				onClick={carouselPrev}
				className={`carousel-control carousel-control-prev carousel-control--background ${props.hideControls ? 'd-none' : ''} ${props.roundedControl ? 'carousel-control--loop' : 'floating-out-start justify-content-start text-primary'} ${props.packagingCard ? 'd-lg-none' : ''} w-auto`}>
				<span className="carousel-control-prev-icon d-flex justify-content-center align-items-center" aria-hidden="true">
					<Prev className="svg svg--current-color" />
				</span>
				<span className="visually-hidden">Previous</span>
			</button>
			<button
				onClick={carouselNext}
				className={`carousel-control carousel-control-next carousel-control--background ${props.hideControls ? 'd-none' : ''} ${props.roundedControl ? 'carousel-control--loop' : 'floating-out-end justify-content-end text-primary'} ${props.packagingCard ? 'd-lg-none' : ''} w-auto`}>
				<span className="carousel-control-next-icon d-flex justify-content-center align-items-center" aria-hidden="true">
					<Next className="svg svg--current-color" />
				</span>
				<span className="visually-hidden">Next</span>
			</button>
		</div>
	);
};

export default CarouselCustom;
