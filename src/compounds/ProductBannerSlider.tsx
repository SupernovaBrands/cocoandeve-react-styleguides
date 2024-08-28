import React, { useEffect, useRef, useState } from 'react';
import ChevronPrev from '~/images/icons/chevron-prev.svg';
import ChevronNext from '~/images/icons/chevron-next.svg';

const ProductBannerSlider = (props) => {
	const compWrapper = useRef(null);
	const compOverlay = useRef(null);
	const compSlider = useRef(null);
	const [sliderStyle, setSliderStyle] = useState({});
	const [imgOverlayStyle, setImgOverlayStyle] = useState({});
	const [clicked, setClicked] = useState(false);
	const [wrapperWidth, setWrapperWidth] = useState(0);
	const [wrapperHeight, setWrapperHeight] = useState({ minHeight: '480px' });

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

		compareImages(compOverlay);

		setTimeout(() => {
			if (window.innerWidth < 768) {
				const imgHeight = compOverlay.current?.children?.[0]?.clientHeight;
				if (imgHeight) setWrapperHeight({ minHeight: `${imgHeight}px` });
			}
		}, 500);
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
		e.preventDefault();
		// console.log('handleMouseDown');
		setClicked(true);
	};

	const slideFinish = (e) => {
		// console.log('handleMouseUp');
		e.preventDefault();
		setClicked(false);
	};

	const slideMove = (e) => {
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
		initComparisons();
	}, []);

	return (
		<div ref={compWrapper} onMouseMove={handleMouseMove} onTouchMove={handleMouseMove} className="product-banner__slider-wrapper relative w-full h-full overflow-hidden" style={{ ...wrapperHeight }}>
			<div className="absolute w-full h-full overflow-hidden">
				<img src={props?.first_image?.url} className="block" loading="lazy" alt="product banner 1" width={wrapperWidth} style={{ width: `${wrapperWidth}px` }} />
			</div>
			{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
			<div
				ref={compSlider}
				className="img-slider absolute flex justify-center align-center"
				style={{ ...sliderStyle }}
				onMouseDown={slideReady}
				onMouseUp={slideFinish}
				onMouseMove={slideMove}
				onTouchStart={slideReady}
				onTouchEnd={slideFinish}
				onTouchMove={slideMove}
			>
				<span className="rounded-full bg-white mr-1">
					<ChevronPrev className="chevron-prev text-white" />
				</span>
				<span className="rounded-full bg-white ml-1">
					<ChevronNext className="chevron-next text-white" />
				</span>
			</div>
			<div ref={compOverlay} style={{ ...imgOverlayStyle }} className="absolute h-auto overflow-hidden img-comp-overlay">
				<img src={props?.second_image?.url} className="block" loading="lazy" alt="product banner 2" width={wrapperWidth} style={{ width: `${wrapperWidth}px` }} />
			</div>
		</div>
	);
};

export default ProductBannerSlider;
