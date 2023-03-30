import Prev from '@/images/icons/chevron-prev.svg';
import Next from '@/images/icons/chevron-next.svg';
import { useState } from 'react';
import ProductCard from '@/compounds/ProductCard';
import ResultCard from '@/compounds/result-card';
import VideoCard from '@/components/video-card';

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
	props.items.map((item, idx) => {
		carouselItems.push({
			...item,
			id: index,
			index,
		});
		index++;
	});
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
		<div className={`position-relative ${props.useRow ? 'row' : ''} ${props.resultCard ? 'carousel--real-result' : ''}`}>
			<div
				id={`carouselLoopCentered${props.id}`}
				className={`carousel--loop carousel--swipe carousel--centered ${props.centered ? 'carousel--centered__custom' : ''} ${!props.centered ? `carousel--centered__custom-nocenter-${props.colLgGrid}` : ''} ${props.useRow ? 'px-0' : ''} ${props.productCard || props.resultCard || props.videoCard ? '' : 'pt-2'}`}>
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
				</div>
			</div>

			<button
				onClick={carouselPrev}
				className={`carousel-control carousel-control-prev carousel-control--background ${props.hideControls ? 'd-none' : ''} ${props.roundedControl ? 'carousel-control--loop w-auto' : 'floating-out-start justify-content-start text-primary'}`}>
				<span className="carousel-control-prev-icon d-flex justify-content-center align-items-center" aria-hidden="true">
					<Prev className="svg svg--current-color" />
				</span>
				<span className="visually-hidden">Previous</span>
			</button>
			<button
				onClick={carouselNext}
				className={`carousel-control carousel-control-next carousel-control--background ${props.hideControls ? 'd-none' : ''} ${props.roundedControl ? 'carousel-control--loop w-auto' : 'floating-out-end justify-content-end text-primary'}`}>
				<span className="carousel-control-next-icon d-flex justify-content-center align-items-center" aria-hidden="true">
					<Next className="svg svg--current-color" />
				</span>
				<span className="visually-hidden">Next</span>
			</button>
		</div>
	);
};

export default CarouselCustom;
