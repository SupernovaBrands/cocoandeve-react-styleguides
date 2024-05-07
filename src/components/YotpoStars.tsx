import '~/config';
import React, { useState, useEffect } from 'react';
import ReviewStar from './ReviewStar';
import Link from 'next/link';
import { currentTime, encryptParam } from '~/modules/utils';

const YotpoStar = (props: any) => {
	const [init, setInit] = useState(false);
	const [score, setScore] = useState(0);
	const [total, setTotal] = useState(0);
	const apiUrl = 'https://reviews-api.cocoandeve.com/api';
	const signature = encryptParam(`{sku:'${props.sku}',time:${currentTime()}}`);
	const localeParam = 'en';

	useEffect(() => {
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
	}, [props.productId]);

	return init ? (
		<div className={`flex ${props.className}`}>
			<ReviewStar score={score} />
			{props.showScore && score && <span className="ml-25">({`${score?.toFixed(0)}`})</span>}
			{props.showTotal && (
				<span className="ml-25">
					<Link href={`${props.productUrl}#write-a-review`} className="text-black hover:text-primary underline">({total?.toFixed(0)})</Link>
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
};

export default YotpoStar;
