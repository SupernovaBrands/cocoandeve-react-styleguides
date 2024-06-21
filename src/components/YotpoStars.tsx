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
		fetch(`${apiUrl}/product/bottomline.json?lang=${localeParam}&sku=${props.sku}&signature=${signature}`, {headers: {cache: 'force-cache'}})
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

	useEffect(() => {
		fetchStar();
	}, [props.sku.length]);

	useEffect(() => {
		if (total === 0 || score === 0) fetchStar();
	}, [total, score]);

	return init ? (
		<div className={`flex ${props.className}`} data-skus={props.sku}>
			<ReviewStar score={score} className={`${props.smSingleStar ? 'hidden lg:flex' : 'flex'}`} />
			{props.smSingleStar && (
				<>
					<ReviewStarSingle className="lg:hidden" />
					<span className="ml-25 lg:hidden">{`${score ? score.toFixed(1) : 0}/5.0`}</span>
				</>
			)}
			{props.showScore && score && <span className="ml-25">({`${score?.toFixed(0)}`})</span>}
			{props.showTotal && (
				<span className="ml-25">
					<a href={`/products/${props?.productHandle}#write-a-review`} className={`${props.smSingleStar ? '' : 'text-sm'} text-black hover:text-primary underline`}>({total?.toFixed(0)})</a>
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
