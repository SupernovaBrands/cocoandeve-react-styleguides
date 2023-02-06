import { useState } from "react";
import { Carousel } from "react-bootstrap";

import Prev from '../../src/images/icons/chevron-prev.svg';
import Next from '../../src/images/icons/chevron-next.svg';

const CarouselFull = (props) => {
	const [index, setIndex] = useState(0);
	const carouselHandle = (e) => {
		setIndex(parseInt(e.target.dataset.bsSlideTo));
	};
	const carouselControlHandlePrev = () => {
		const idx = index - 1 < 0 ? props.items.length - 1 : index - 1;
		setIndex(idx);
	};
	const carouselControlHandleNext = () => {
		const idx = index + 1 > props.items.length - 1 ? 0 : index + 1;
		setIndex(idx);
	};
	return (
		<div className={`position-relative ${props.parentClass ? props.parentClass : ''}`}>
			<ol className={`carousel-indicators ${props.indicatorClass ? props.indicatorClass : ''}`}>
				{props.items.map((item, i) => (
					<li key={i} onClick={carouselHandle} data-bs-target={`#${props.id}`} data-bs-slide-to={item.index} className={`rounded-circle border border-white ${i === index ? 'active' : ''} ${!props.indicatorBorder ? 'border-0' : ''}`}></li>
				))}
			</ol>
			<Carousel as={props.as} id={props.id} activeIndex={index} controls={false} indicators={false} interval={null} className={props.className}>
				{props.items.map((item, i) => (
					<Carousel.Item key={i}>
						<img className="d-block w-100" src={item.img} alt={item.label}></img>
					</Carousel.Item>
				))}
			</Carousel>
			{props.customArrows && (
				<>
					<button onClick={carouselControlHandlePrev} className={`carousel-control carousel-control-prev ${props.groupedControls ? 'carousel-control--background carousel-control--right-lg' : ''}`} data-bs-slide="prev">
						<span className={`carousel-control-prev-icon ${props.groupedControls ? 'd-flex' : ''} justify-content-center align-items-center`} aria-hidden="true">
							<Prev className="svg" />
						</span>
						<span className="visually-hidden">Previous</span>
					</button>
					<button onClick={carouselControlHandleNext} className={`carousel-control carousel-control-next ${props.groupedControls ? 'carousel-control--background carousel-control--right-lg' : ''}`} data-bs-slide="next">
						<span className={`carousel-control-next-icon ${props.groupedControls ? 'd-flex' : ''} justify-content-center align-items-center`} aria-hidden="true">
							<Next className="svg" />
						</span>
						<span className="visually-hidden">Next</span>
					</button>
				</>
			)}
		</div>
	);
};

export default CarouselFull;
