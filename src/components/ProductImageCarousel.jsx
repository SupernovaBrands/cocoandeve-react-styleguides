import { useState } from "react";
import { Col, Carousel } from "react-bootstrap";
import ProductImageCarouselIndicator from "./ProductImageCarouselIndicator";

const ProductImageCarousel = (props) => {
	const [index, setIndex] = useState(0);
	const [touchStart, setTouchStart] = useState(null);
	const [touchEnd, setTouchEnd] = useState(null);
	const minSwipeDistance = 50;

	const handleSelect = (e, index) => {
		setIndex(index);
	};
	const onSlide = () => {
		console.log('onslide fired');
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
		if (isLeftSwipe || isRightSwipe) console.log('swipe', isLeftSwipe ? 'left' : 'right');
		// add your conditional logic here
		setIndex(index + 1);
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
					onSlide={onSlide}
					onTouchStart={onTouchStart}
					onTouchMove={onTouchMove}
					onTouchEnd={onTouchEnd}
					wrap={true}
					>
					{props.totalSlide > 0 && [...Array(props.totalSlide)].map((e, i) => {
						const isLast = i === props.totalSlide - 1;
						const itemIndex = i + 1;
						return (
							<Carousel.Item className="col-12 px-0" key={i}>
								<div className="item-third">
									<picture className={`${isLast ? 'with-video' : ''}`}>
										<source srcSet={`https://via.placeholder.com/1140x1140/EFADBA?text=1140x1140+Slide+${itemIndex}`} media="(min-width: 992px)" />
										<img src={`https://via.placeholder.com/614x614/EFADBA?text=614x614+Slide+${itemIndex}`}
											alt={`Slide ${itemIndex}`}
											className="w-100"
											loading={`${i === 0 ? '' : 'lazy'}`} />
										{/* {isLast && (
											<img className="svg text-white" src="icons/play.svg" />
										)} */}
									</picture>
								</div>
								<div className="item-third d-lg-none">
									<picture className={`${isLast ? 'with-video' : ''}`}>
										<source srcSet={`https://via.placeholder.com/1140x1140/EFADBA?text=1140x1140+Slide+${itemIndex}`} media="(min-width: 992px)" />
										<img src={`https://via.placeholder.com/614x614/EFADBA?text=614x614+Slide+${itemIndex}`}
											alt={`Slide ${itemIndex}`}
											className="w-100"
											loading={`${i === 0 ? '' : 'lazy'}`} />
										{/* {isLast && (
											<img className="svg text-white" src="icons/play.svg" replace-to-svg />
										)} */}
									</picture>
								</div>
							</Carousel.Item>
						);
					})}
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
