import Prev from '../../src/images/icons/chevron-prev.svg';
import Next from '../../src/images/icons/chevron-next.svg';
import { useState, useRef, useEffect } from 'react';
import { Carousel } from "react-bootstrap";

// https://github.com/react-bootstrap/react-bootstrap/issues/5749
const CarouselLoop = (props) => {
	const totalItems = props.slideNumber * 2;
	const [activeIndex, setActiveIndex] = useState(1);
	const [carouselPaddedRight, setCarouselPaddedRight] = useState([]);
	const [carouselPaddedLeft, setCarouselPaddedLeft] = useState([]);

	let carouselItems = [];
	for (let i = 0; i < totalItems; i++) {
		carouselItems.push({
			index: i,
			label: `Slide ${i + 1}`
		});
	}
	const [primaryList, setPrimaryList] = useState(carouselItems);

	const carouselNext = () => {
		setActiveIndex(activeIndex + 1);
	};
	const carouselPrev = () => {
		setActiveIndex(activeIndex <= 0 ? 4 : activeIndex - 1);
	};
	const onSlide = (e, direction) => {
		const itemsPerSlide = props.slideNumber ? props.slideNumber : 3;
		const totalItems = itemsPerSlide * 2;
		let idx = activeIndex;
		if (props.centered) {
			idx += 2;
		}

		console.log('activeIndex', activeIndex);
		if (direction === 'end' && activeIndex <= 0) {
			const lastElem = [primaryList.pop()];
			console.log('lastElem', lastElem);
			setCarouselPaddedLeft(lastElem);

		}

		if (idx >= totalItems - (itemsPerSlide - 1)) {
			const it = itemsPerSlide - (totalItems - idx);

			for (let i = 0; i < it; i += 1) {
				if (direction === 'start') {
					const firstElem = primaryList[i];
					setCarouselPaddedRight([firstElem]);
				}
			}
		}
	};
	const onSlid = (e, direction) => {
		if (carouselPaddedRight.length > 0 && direction === 'start') {
			primaryList.push(...carouselPaddedRight);
		}
		console.log('activeIndex', activeIndex);
		if (carouselPaddedLeft.length > 0 && direction === 'end') {
			primaryList.push(...carouselPaddedLeft);
		}
	};
	return (
		<div className="position-relative">
			<Carousel
				id="carouselLoopCentered1"
				className={`carousel--loop carousel--swipe ${props.centered ? 'carousel--centered' : ''}`}
				indicators={false}
				activeIndex={activeIndex}
				interval={null}
				controls={true}
				onSlide={onSlide}
				wrap={true}
				onSlid={onSlid}>
					{props.slideNumber > 0 && primaryList.map((item, i) => (
						<Carousel.Item key={i} className={`${props.className} ${`item${item.index}`}`}>
							<img className="img-fluid" src={`//via.placeholder.com/600x400?text=${item.label}`} alt={`slide ${item.index}`}/>
						</Carousel.Item>
					))}
			</Carousel>
			<button
				onClick={carouselPrev}
				className="carousel-control carousel-control-prev carousel-control--background floating-out-start justify-content-start text-primary">
				<span className="carousel-control-prev-icon d-flex justify-content-center align-items-center" aria-hidden="true">
					<Prev className="svg" />
				</span>
				<span className="visually-hidden">Previous</span>
			</button>
			<button
				onClick={carouselNext}
				className="carousel-control carousel-control-next carousel-control--background floating-out-end justify-content-end text-primary">
				<span className="carousel-control-next-icon d-flex justify-content-center align-items-center" aria-hidden="true">
					<Next className="svg" />
				</span>
				<span className="visually-hidden">Next</span>
			</button>
		</div>
	);
};

export default CarouselLoop;
