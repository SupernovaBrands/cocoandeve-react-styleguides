import { useState } from "react";
import { Carousel } from "react-bootstrap";

import ChevronUp from '../../src/images/icons/chevron-up.svg';
import ChevronDown from '../../src/images/icons/chevron-down.svg';
import PlayButton from '../../src/images/icons/play.svg';

const ProductImageIndicator = (props) => {
	const [index, setIndex] = useState(0);
	const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
	const [nextBtnDisabled, setNextBtnDisabled] = useState(false);
	const MIN_SLIDE_ITEM = 5;

	const indicatorHandleDown = () => {
		setIndex(index + 1);
	};
	const indicatorHandleUp = () => {
		setIndex(index - 1);
	};
	const onSlide = () => {
		setPrevBtnDisabled(index === 0);
		setNextBtnDisabled(index + MIN_SLIDE_ITEM === props.totalSlide);
	};
	return (
		<div className="product-image-carousel__indicator col-12 col-lg-1 order-lg-1 mb-lg-0 px-lg-g d-none d-lg-block">
			{props.totalSlide > MIN_SLIDE_ITEM && (
				<button
					className="carousel-indicator chevron-up btn-unstyled d-none d-lg-flex mx-auto mb-1 mb-lg-3 text-center align-items-center"
					href={`#product-image-carousel__indicator${props.num ? props.num : ''}`}
					data-bs-slide="prev"
					aria-hidden="true"
					onClick={indicatorHandleUp}
					disabled={prevBtnDisabled}>
						<ChevronUp className="svg text-primary" />
				</button>
			)}
			<Carousel id={`product-image-carousel__indicator${props.num ? props.num : ''}`}
				className="carousel slide carousel--loop"
				onSlide={onSlide}
				activeIndex={index}
				interval={null}
				indicators={false}
				controls={false}>
				{props.totalSlide > 0 && [...Array(props.totalSlide)].map((e, i) => {
					const isLast = i === props.totalSlide - 1;
					const itemIndex = i + 1;
					return (
						<Carousel.Item key={i}
							className="product-image-carousel__indicator__item col-12 px-lg-0 pb-lg-3 mw-100"
							onClick={e => props.handleSelect(e, i)}>
							<button className={`btn-unstyled border d-block w-100 ${i === props.selectedIndex ? 'border-primary' : 'border-white'}`}>
								<picture className={`${isLast ? 'with-video position-relative' : ''}`}>
									<img className="w-100" src={`https://via.placeholder.com/150x150/EFADBA?text=${itemIndex}`} alt={`Slide ${itemIndex}`} />
									{isLast && (
										<PlayButton className="svg text-white" />
									)}
								</picture>
							</button>
						</Carousel.Item>
					)
				})}
			</Carousel>
			{props.totalSlide > MIN_SLIDE_ITEM && (
				<button
					className="carousel-indicator chevron-down btn-unstyled d-none d-lg-flex mx-auto mt-1 mt-lg-3 text-center align-items-center"
					href={`#product-image-carousel__indicator${props.num ? props.num : ''}`}
					data-bs-slide="next"
					aria-hidden="true"
					disabled={nextBtnDisabled}
					onClick={indicatorHandleDown}>
						<ChevronDown className="svg text-primary" />
				</button>
			)}
		</div>
	);
};

export default ProductImageIndicator;
