import '~/config';
import React, { useState, useEffect } from 'react';
import ReviewStar from './ReviewStar';
import Link from 'next/link';
import { currentTime, encryptParam } from '~/modules/utils';
import ReviewStarSingle from './ReviewStarSingle';

const YotpoStar = (props: any) => {
	const [init, setInit] = useState(false);
	const [score, setScore] = useState(0);
	const [total, setTotal] = useState(0);
	const apiUrl = 'https://reviews-api.cocoandeve.com/api';
	const signature = encryptParam(`{sku:'${props.sku}',time:${currentTime()}}`);
	const localeParam = 'en';

	const fetchStar = () => {
		// console.log('fetchStar');
		fetch(`${apiUrl}/product/bottomline.json?lang=${localeParam}&sku=${props.sku}&signature=${signature}`)
			.then((response) => response.json())
			.then((data) => {
				if (data.response && data.response.bottomline) {
					setScore(data?.response?.bottomline?.average_score);
					setTotal(data?.response?.bottomline?.total_review);
				}
				if (!init) {
					setInit(true);
				}
		});
	};
	
	// console.log('props.sku123');
	useEffect(() => {
		if (props.sku.length > 0 && !init) fetchStar();
	}, []);

	useEffect(() => {
		// if (total === 0 || score === 0) fetchStar();
	}, [total, score]);

	return init && total > 0 ? (
		<div className={`flex items-center ${props.className}`} data-skus={props.sku}>
			<a href={`/products/${props?.productHandle}#write-a-review`} className="text-sm" aria-label="Write a review for this product">
				{!props.smSingleStarAllDevice && (
					<ReviewStar score={score} className={`${props.smSingleStar ? 'hidden lg:flex' : 'flex'}`} />
				)}
				
			</a>
			{props.smSingleStar && (
				<>
					<a href={`/products/${props?.productHandle}#write-a-review`} aria-label="Write a review for this product">
						<ReviewStarSingle className={`${props.smSingleStarAllDevice ? '' : 'lg:hidden'}`} />
					</a>
					<a href={`/products/${props?.productHandle}#write-a-review`} aria-label="Write a review for this product">
						<span className={`${props.smSingleStarAllDevice ? '' : 'lg:hidden'} ml-25`}>{`${score ? score.toFixed(1) : 0}/5.0`}</span>
					</a>
				</>
			)}
			{props.showScore && score && <span className="ml-25">({`${score?.toFixed(0)}`})</span>}
			{props.showTotal && (
				<span className="ml-25">
					<a href={`/products/${props?.productHandle}#write-a-review`} className={`${props.smSingleStar || props.sustainability ? '' : ''} text-body hover:text-primary underline yotpo-start__number`} aria-label="Total reviews">({total?.toFixed(0)})</a>
				</span>
			)}
		</div>
	) : (<div />);
};

YotpoStar.defaultProps = {
	productUrl: '',
	showScore: false,
	showTotal: true,
	className: '',
	smSingleStar: false,
};

export default YotpoStar;
