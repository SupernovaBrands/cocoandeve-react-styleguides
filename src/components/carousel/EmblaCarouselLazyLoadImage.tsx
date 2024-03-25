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
		<div className="w-full basis-full flex-grow-0 flex-shrink-0">
			<div className={'relative h-auto'.concat(
				hasLoaded ? ' carousel__lazy-load--has-loaded' : ''
			)}>
				{!hasLoaded && <span className="carousel__lazy-load__spinner border-4 border-gray-500 border-l-white inline-flex absolute m-auto top-0 bottom-0 left-0 right-0 -indent-[9999em] rounded-full w-g h-g after:w-g after:h-g" />}
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
