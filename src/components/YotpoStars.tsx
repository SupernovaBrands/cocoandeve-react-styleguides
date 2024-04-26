import '~/config';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReviewStar from './ReviewStar';
import Link from 'next/link';

const YotpoStar = (props: any) => {
	const [init, setInit] = useState(false);
	const [score, setScore] = useState(0);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		fetch(`https://api-cdn.yotpo.com/products/${global.config.yotpoKey}/${props.productId}/bottomline`)
			.then((response) => response.json())
			.then((data) => {
				if (data.response && data.response.bottomline) {
					setScore(data.response.bottomline.average_score);
					setTotal(data.response.bottomline.total_reviews);
				}
				if (!init) {
					setInit(true);
				}
		});
	}, [props.productId]);

	return init ? (
		<div className={`flex ${props.className}`}>
			<ReviewStar score={score} />
			{props.showScore && <span className="ml-25">({`${score.toFixed(0)}`})</span>}
			{props.showTotal && (
				<span className="ml-25">
					<Link href={`${props.productUrl}#write-a-review`} className="text-black hover:text-primary underline">({total.toFixed(0)})</Link>
				</span>
			)}
		</div>
	) : (<div />);
};

YotpoStar.propTypes = {
	productId: PropTypes.number.isRequired,
	productUrl: PropTypes.string,
	showScore: PropTypes.bool,
	showTotal: PropTypes.bool,
	className: PropTypes.string,
};

YotpoStar.defaultProps = {
	productUrl: '',
	showScore: false,
	showTotal: true,
	className: '',
};

export default YotpoStar;
