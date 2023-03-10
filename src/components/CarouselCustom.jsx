import Prev from '../../src/images/icons/chevron-prev.svg';
import Next from '../../src/images/icons/chevron-next.svg';
import { useState } from 'react';

// https://github.com/react-bootstrap/react-bootstrap/issues/5749
const CarouselCustom = (props) => {
	const totalItems = props.slideNumber * 2;

	const [activeIndex, setActiveIndex] = useState(1);
	const [itemMovingNext, setItemMovingNext] = useState(false);
	const [itemMovingPrev, setItemMovingPrev] = useState(false);

	let carouselItems = [];
	for (let i = 0; i < totalItems; i++) {
		const idx = i + 1;
		const labelIndex = idx > props.slideNumber ? idx - props.slideNumber : idx;
		carouselItems.push({
			index: i,
			label: `Slide ${labelIndex}`
		});
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
		<div className={`position-relative ${props.useRow ? 'row' : ''}`}>
			<div
				id={`carouselLoopCentered${props.id}`}
				className={`carousel--loop carousel--swipe carousel--centered ${props.centered ? 'carousel--centered__custom' : ''} ${!props.centered ? `carousel--centered__custom-nocenter-${props.colLgGrid}` : ''} ${props.useRow ? 'px-0' : ''}`}>
				<div className="carousel-inner d-flex flex-nowrap">
					{props.slideNumber > 0 && primaryList.map((item, i) => (
						<div key={i} className={`${props.className} carousel-item ${activeIndex === item.index ? 'active ' : ''} ${itemMovingNext ? 'carousel-item-next carousel-item-start ' : ''} ${itemMovingPrev ? 'carousel-item-prev carousel-item-end ' : ''}`}>
							<img className="img-fluid" src={`//via.placeholder.com/600x400?text=${item.label}`} alt={`slide ${item.index}`}/>
						</div>
					))}
				</div>
			</div>

			<button
				onClick={carouselPrev}
				className={`carousel-control carousel-control-prev carousel-control--background ${props.roundedControl ? 'carousel-control--loop w-auto' : 'floating-out-start justify-content-start text-primary'}`}>
				<span className="carousel-control-prev-icon d-flex justify-content-center align-items-center" aria-hidden="true">
					<Prev className="svg" />
				</span>
				<span className="visually-hidden">Previous</span>
			</button>
			<button
				onClick={carouselNext}
				className={`carousel-control carousel-control-next carousel-control--background ${props.roundedControl ? 'carousel-control--loop w-auto' : 'floating-out-end justify-content-end text-primary'}`}>
				<span className="carousel-control-next-icon d-flex justify-content-center align-items-center" aria-hidden="true">
					<Next className="svg" />
				</span>
				<span className="visually-hidden">Next</span>
			</button>
		</div>
	);
};

export default CarouselCustom;
