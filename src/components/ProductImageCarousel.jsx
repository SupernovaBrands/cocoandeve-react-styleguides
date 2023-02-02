import { useState } from "react";
import { Col, Carousel } from "react-bootstrap";
import ProductImageCarouselIndicator from "./ProductImageCarouselIndicator";

const ItemThird = (props) => {
	const isLast = props.itemIndex === props.totalSlide - 1;
	const itemIndex = props.itemIndex + 1;
	const itemThirdIndex = itemIndex + 1 > props.totalSlide ? 1 : itemIndex + 1;
	return (
		<div className={props.className}>
			<picture className={`${isLast ? 'with-video' : ''}`}>
				<source srcSet={`https://via.placeholder.com/1140x1140/EFADBA?text=1140x1140+Slide+${itemIndex}`} media="(min-width: 992px)" />
				<img src={`https://via.placeholder.com/614x614/EFADBA?text=614x614+Slide+${props.last ? itemThirdIndex : itemIndex}`}
					alt={`Slide ${props.last ? itemThirdIndex : itemIndex}`}
					className="w-100"
					loading={`${props.itemIndex === 0 ? '' : 'lazy'}`} />
				{/* {props.isLast && (
					<img className="svg text-white" src="icons/play.svg" replace-to-svg />
				)} */}
			</picture>
		</div>
	);
};

const ProductImageCarousel = (props) => {
	const [index, setIndex] = useState(0);
	const [touchStart, setTouchStart] = useState(null);
	const [touchEnd, setTouchEnd] = useState(null);
	const minSwipeDistance = 10;

	const handleSelect = (e, index) => {
		setIndex(index);
	};
	const onTouchStart = (e) => {
		setTouchEnd(null);
		setTouchStart(e.targetTouches[0].clientX);
	};
	const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
	const onTouchEnd = () => {
		if (!touchStart || !touchEnd) return;
		const distance = touchStart - touchEnd;
		const isLeftSwipe = distance > minSwipeDistance;
		const isRightSwipe = distance < -minSwipeDistance;
		let carouselIndex = 0;
		if (isLeftSwipe) {
			carouselIndex = (props.totalSlide - 1 === index) ? 0 : index + 1;
			setIndex(carouselIndex);
		}
		if (isRightSwipe) {
			carouselIndex = (index - 1 < 0) ? props.totalSlide - 1 : index - 1;
			setIndex(carouselIndex);
		}
	};

	return (
		<>
			<Col xs={12} lg={6} className="product-image-carousel__container position-relative order-lg-2">
				<Carousel as="figure"
					id={`product-image-carousel${props.num ? props.num : ''}`}
					className="product-image-carousel carousel--product-preview mb-1 mb-lg-0 no-gutters__in-container"
					indicators={false}
					interval={null}
					controls={false}
					activeIndex={index}
					onTouchStart={onTouchStart}
					onTouchMove={onTouchMove}
					onTouchEnd={onTouchEnd}
					wrap={true}
					>
					{props.totalSlide > 0 && [...Array(props.totalSlide)].map((e, i) => (
							<Carousel.Item className="col-12 px-0" key={i}>
								<ItemThird className="item-third" itemIndex={i} totalSlide={props.totalSlide} last={false} />
								<ItemThird className="item-third d-lg-none" itemIndex={i} totalSlide={props.totalSlide} last={true} />
							</Carousel.Item>
						))}
				</Carousel>
				<picture className="circle-badge position-absolute rounded-circle bg-primary d-flex p-1 me-0 mt-2 me-lg-1 mt-lg-1">
					<img alt="25% Off" className="w-100" src="/badge-25.svg" />
				</picture>
			</Col>
			<ProductImageCarouselIndicator totalSlide={props.totalSlide} handleSelect={handleSelect} selectedIndex={index} />
		</>
	);
};

export default ProductImageCarousel;
