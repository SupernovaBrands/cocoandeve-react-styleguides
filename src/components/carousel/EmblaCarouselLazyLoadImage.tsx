import React, { useState, useCallback } from 'react';

const PLACEHOLDER_SRC = `data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D`;

type PropType = {
	imgSrc: string
	inView: boolean
	index: number
}

export const LazyLoadImage: React.FC<PropType> = (props) => {
	const { imgSrc, inView } = props;
	const [hasLoaded, setHasLoaded] = useState(false);

	const setLoaded = useCallback(() => {
		if (inView) setHasLoaded(true);
	}, [inView, setHasLoaded]);

	return (
		<div className="carousel__slide">
			<div className={'relative h-auto'.concat(
				hasLoaded ? ' carousel__lazy-load--has-loaded' : ''
			)}>
				{!hasLoaded && <span className="carousel__lazy-load__spinner" />}
				<img
					className="carousel__slide__img carousel__lazy-load__img w-full"
					onLoad={setLoaded}
					src={inView ? imgSrc : PLACEHOLDER_SRC}
					alt="Alt Text"
					data-src={imgSrc}
				/>
			</div>
		</div>
	);
};
