import React, { useEffect, useRef, useState } from 'react';
import ChevronPrev from '~/images/icons/chevron-prev.svg';
import ChevronNext from '~/images/icons/chevron-next.svg';
import { useWindowSize } from '~/hooks/useWindowSize';

const ProductBannerSlider = (props) => {
	const { isPageReview } = props;
	const compWrapper = useRef(null);
	const compOverlay = useRef(null);
	const compSlider = useRef(null);
	const [sliderStyle, setSliderStyle] = useState({});
	const [imgOverlayStyle, setImgOverlayStyle] = useState({});
	const [clicked, setClicked] = useState(false);
	const [wrapperWidth, setWrapperWidth] = useState(0);
	const [wrapperHeight, setWrapperHeight] = useState({ minHeight: '480px' });
	const [imgPt, setImgPt] = useState('');

	const [width, height] = useWindowSize();

	const initComparisons = () => {
		setWrapperWidth(compWrapper.current.offsetWidth);

		const compareImages = () => {
			/* set the width of the img element to 50%: */
			setImgOverlayStyle({ ...imgOverlayStyle, width: `${(compWrapper.current.offsetWidth / 2)}px` });
			setSliderStyle({
				...sliderStyle,
				left: `${(compWrapper.current.offsetWidth / 2) - 30}px`,
			});
		};

		compareImages();
		
		setTimeout(() => {
			const imgHeight = compOverlay.current?.children?.[0]?.clientHeight;
			if (isPageReview && window.innerWidth < 769) {
				setImgPt('pt-[76.6%]');
			} else if (isPageReview && window.innerWidth >= 769) {
				setImgPt('pt-[55%]');
			} else if (imgHeight < 600) {
				setImgPt('pt-[55%]');
			} else if (window.innerWidth > 1440) {
				setImgPt(`pt-[${imgHeight}px]`);
			} else {
				setImgPt('pt-[86%]');
			}
			
		}, 300); 
	};
	const getCursorPos = (el) => {
		let x = 0;
		const e = (el.changedTouches) ? el.changedTouches[0] : el;

		/* get the x positions of the image: */
		const a = compOverlay.current.getBoundingClientRect();

		/* calculate the cursor's x coordinate, relative to the image: */
		x = e.pageX - a.left;

		/* consider any page scrolling: */
		x -= window.pageXOffset;
		// console.log('getCursorPos compOverlay', x, a);

		return x;
	};

	const slide = (x) => {
		let pos = x - (compSlider.current.offsetWidth / 2);
		if (window.innerWidth < 768 && pos < -30) pos = -30;
		if (window.innerWidth < 768 && pos > window.innerWidth - 30) pos = window.innerWidth - 30;
		setImgOverlayStyle({ ...imgOverlayStyle, width: `${(x)}px` });
		setSliderStyle({ ...sliderStyle, left: `${pos}px` });
	};

	const slideReady = (e) => {
		// e.preventDefault();
		// console.log('handleMouseDown');
		setClicked(true);
		document.body.classList.add('no-select');
	};

	const slideFinish = (e) => {
		// console.log('handleMouseUp');
		// e.preventDefault();
		setClicked(false);
		document.body.classList.remove('no-select');
	};

	const slideMove = (e) => {
        // e.preventDefault();
		if (clicked) {
			let pos = 0;
			pos = getCursorPos(e);
			// console.log('handleSlideMove1', pos);
			/* prevent the slider from being positioned outside the image: */
			if (pos < 0) pos = 0;
			// console.log('handleSlideMove2', pos);
			// console.log('compOverlay.current.offsetWidth', compOverlay.current.offsetWidth);
			// if (pos > compOverlay.current.offsetWidth) pos = compOverlay.current.offsetWidth;
			// console.log('handleSlideMove3', pos);
			/* execute a function that will resize the overlay image according to the cursor: */
			// slide(pos);
		}
	};

	const handleMouseMove = (event) => {
        // event.preventDefault();
		if (clicked) {
			/*
			const rect = event.target.getBoundingClientRect();
			const x = event.clientX - rect.left;
			console.log('handleMouseMove', x);
			*/
			let pos = 0;
			pos = getCursorPos(event);
			if (pos < 0) pos = 0;
			slide(pos);
		}
	};

	useEffect(() => {
		setTimeout(() => {
			initComparisons();
		}, 150);
	}, []);

	useEffect(() => {
		initComparisons();
	}, [width])

	return <>
		{/* <span>Window size: {width} x {height}</span> */}
		{wrapperHeight && (
			<div ref={compWrapper} onMouseMove={handleMouseMove} onTouchMove={handleMouseMove} className="product-banner__slider-wrapper relative w-full h-full overflow-hidden select-none">
				<picture style={{ 'paddingTop': `${compOverlay.current?.children?.[0]?.clientHeight}px`}} className={`block a ${imgPt} w-full overflow-hidden`}>
					<source
						srcSet={props?.second_image?.url}
						media="(min-width: 992px)" width="1362" height="1162"/>
					<img
						src={props.src}
						className="embed-responsive-item object-cover h-full w-full" loading="lazy" height="357" width={wrapperWidth} style={{ width: `${wrapperWidth}px` }} alt={props.alt || "Product image comparison"} />
				</picture>
				<div className="product-banner__slider--compareimg absolute w-full h-full overflow-hidden top-0">
					<img src={props?.second_image?.url} className="block" loading="lazy" alt="product banner 1" width={wrapperWidth} style={{ width: `${wrapperWidth}px` }} />
				</div>
				{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
				<div
					ref={compSlider}
					className="touch-none img-slider absolute flex justify-center items-center top-0"
					style={{ ...sliderStyle }}
					onMouseDown={(e) => {
						e.preventDefault();
						slideReady(e);
					}}
					onMouseUp={slideFinish}
					onMouseMove={slideMove}
					onTouchStart={(e) => {
						e.preventDefault();
						slideReady(e);
					}}
					onTouchEnd={slideFinish}
					onTouchMove={slideMove}
				>
					<span className={`${props.leftArrowClasses ?? 'product-banner__slider-arrow product-banner__slider-arrow--left'} bg-white mr-1 p-[14px]`}>
						<ChevronPrev className={`${props.svgClasses ?? 'chevron-prev'} text-white`} />
					</span>
					<span className={`${props.rightArrowClasses ?? 'product-banner__slider-arrow product-banner__slider-arrow--right'} bg-white ml-1 p-[14px]`}>
						<ChevronNext className={`${props.svgClasses ?? 'chevron-next'} text-white`} />
					</span>
				</div>
				<div ref={compOverlay} style={{ ...imgOverlayStyle }} className="product-banner__slider--compareimg absolute h-auto overflow-hidden img-comp-overlay top-0">
					<img src={props?.first_image?.url} className={`block max-w-none ${props.imgClasses}`} loading="lazy" alt="product banner 2" width={wrapperWidth} style={{ width: `${wrapperWidth}px` }} />
				</div>
			</div>
		)}
	</>
};

export default ProductBannerSlider;
