/* global tStrings tSettings */
import '~/config';
// import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ReviewStar from '~/components/review-star';
import SvgFull from '~/images/icons/star-full.svg';
import { encryptParam, currentTime } from '~/modules/utils';

const tStrings = global.config.tStrings;
const apiUrl = 'https://reviews-api.cocoandeve.com/api';

const { locale } = global.config.tSettings;
const localeParam = locale.includes('en') ? 'en' : locale;

const YotpoStar = (props:any) => {
	const [init, setInit] = useState(false);
	const [score, setScore] = useState(0);
	const [total, setTotal] = useState(0);
	const { productSkus } = props;
	const signature = encryptParam(`{sku:'${productSkus}',time:${currentTime()}}`);

	useEffect(() => {
		fetch(`${apiUrl}/product/bottomline.json?lang=${localeParam}&sku=${productSkus}&signature=${signature}`).then((data) => data.json()).then((r) => {
			const { response } = r;
			setScore(response.bottomline.average_score);
			setTotal(response.bottomline.total_review);
			if (!init) {
				setInit(true);
			}
		});
	}, [props.productId]);

	if (!init) return (<div />);
	return props.hideStars ? (
		<div className={`flex ${props.extraClass}`}>
			<SvgFull className="svg text-primary size-[1em]" />
			<span className="ml-25">{`${score ? score.toFixed(1) : 0}/5.0`}</span>
			<span className="ml-25">
				<a className="underline text-nowrap" href={`${props.productUrl}#write-a-review`}>{`${total} ${tStrings.yotpo.reviews}`}</a>
			</span>
		</div>
	) : (
		<div className={`flex ${props.extraClass}`}>
			<ReviewStar score={score} />
			{props.showScore && <span className="ml-25">{`${score ? score.toFixed(1) : 0} stars`}</span>}
			{props.showTotal && (
				<span className="ml-25">
					(
					<a className="link-secondary underline text-dark hover:text-primary" href={`${props.productUrl}#write-a-review`}>{total}</a>
					)
				</span>
			)}
		</div>
	);
};

YotpoStar.propTypes = {
	productId: PropTypes.number,
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
