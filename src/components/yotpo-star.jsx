/* global tStrings tSettings */
import '@/config';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ReviewStar from '@/components/review-star';
import SvgFull from '@/images/icons/star-full.svg';
import { encryptParam, currentTime } from '@/modules/utils';

// const { yotpoKey } = tSettings;
const apiUrl = 'https://supernova-reviews.herokuapp.com/api';

const { locale } = global.config.tSettings;
const localeParam = locale.includes('en') ? 'en' : locale;

const YotpoStar = (props) => {
	const [init, setInit] = useState(false);
	const [score, setScore] = useState(0);
	const [total, setTotal] = useState(0);
	const { productSkus } = props;
	const signature = encryptParam(`{sku:'${productSkus}',time:${currentTime()}}`);

	useEffect(() => {
		$.get(`${apiUrl}/product/bottomline.json?lang=${localeParam}&sku=${productSkus}&signature=${signature}`).done(function (data) {
			setScore(data.response.bottomline.average_score);
			setTotal(data.response.bottomline.total_review);
			if (!init) {
				setInit(true);
			}
		});
	}, [props.productId]);

	if (!init) return (<div />);
	return props.hideStars ? (
		<div className={`d-flex ${props.extraClass}`}>
			<SvgFull className="svg text-primary" />
			<span className="ml-25">{`${score ? score.toFixed(1) : 0}/5.0`}</span>
			<span className="ml-25">
				<a className="text-underline text-nowrap" href={`${props.productUrl}#write-a-review`}>{`${total} ${tStrings.yotpo.reviews}`}</a>
			</span>
		</div>
	) : (
		<div className={`d-flex ${props.extraClass}`}>
			<ReviewStar score={score} />
			{props.showScore && <span className="ml-25">{`${score ? score.toFixed(1) : 0} stars`}</span>}
			{props.showTotal && (
				<span className="ml-25">
					(
					<a className="link-secondary text-underline" href={`${props.productUrl}#write-a-review`}>{total}</a>
					)
				</span>
			)}
		</div>
	);
};

YotpoStar.propTypes = {
	productId: PropTypes.number.isRequired,
	productUrl: PropTypes.string,
	showScore: PropTypes.bool,
	showTotal: PropTypes.bool,
	hideStars: PropTypes.bool,
	extraClass: PropTypes.string,
	productSkus: PropTypes.string.isRequired,
};

YotpoStar.defaultProps = {
	productUrl: '',
	showScore: false,
	showTotal: true,
	hideStars: false,
	extraClass: '',
};

export default YotpoStar;
