import { useState } from "react";
import { Carousel } from "react-bootstrap";

import Prev from '@/images/icons/chevron-prev.svg';
import Next from '@/images/icons/chevron-next.svg';
import QuoteUp from '@/images/icons/quote-up.svg';
import QuoteDown from '@/images/icons/quote-down.svg';

const TestimonialCarousel = (props) => {
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
			<Carousel as={props.as} id={props.id} activeIndex={index} controls={false} indicators={false} interval={null} className={props.className}>
				{props.items.map((item, i) => (
					<Carousel.Item key={i}>
                        <p className="h3 fw-normal my-4 px-2 pt-lg-2 pb-lg-3 px-lg-4 testimonials-carousel__quote position-relative">
                            {item.quote}
                            <QuoteUp className="svg fill-primary quote-up" />
                            <QuoteDown className="svg fill-primary quote-down" />
                        </p>
                        <picture className="d-block">
                            <source
                                srcSet={item.srcSet}
                                media="(min-width: 992px)"
                            />
                            <source
                                srcSet={item.src}
                            />
                            <img 
                                className="w-auto"
                                src={item.src}
                                alt={item.label}
                            />
                        </picture>
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
            <ol className={`carousel-indicators position-static mb-0 mt-3 ${props.indicatorClass ? props.indicatorClass : ''}`}>
				{props.items.map((item, i) => (
					<li key={i} onClick={carouselHandle} data-bs-target={`#${props.id}`} data-bs-slide-to={item.index} className={`rounded-circle border border ${i === index ? 'active' : ''} ${!props.indicatorBorder ? 'border-0' : ''}`}></li>
				))}
			</ol>
		</div>
    );
};

export default TestimonialCarousel;