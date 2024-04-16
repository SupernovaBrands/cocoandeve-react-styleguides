import React from 'react';
import PropTypes from 'prop-types';

import SvgFull from '~/images/icons/star-full.svg';
import SvgHalf from '~/images/icons/star-half.svg';
import SvgLine from '~/images/icons/star-line.svg';

const ReviewStar = (props) => {
	const full = Math.floor(props.score);
	const line = 5 - Math.ceil(props.score);
	const half = 5 - full - line;

	const stars = [];
	for (let x = 0; x < full; x += 1) {
		stars.push(<SvgFull key={`full-${x}`} role="presentation" className={`svg size-[1em] fill-primary text-primary ${stars.length === 0 ? '' : 'ml-25'}`} />);
	}
	for (let x = 0; x < half; x += 1) {
		stars.push(<SvgHalf key={`half-${x}`} role="presentation" className={`svg size-[1em] fill-primary  text-primary ${stars.length === 0 ? '' : 'ml-25'}`} />);
	}
	for (let x = 0; x < line; x += 1) {
		stars.push(<SvgLine key={`line-${x}`} role="presentation" className={`svg size-[1em] fill-primary  text-primary ${stars.length === 0 ? '' : 'ml-25'}`} />);
	}

	return (
		<div className="flex">
			{stars}
		</div>
	);
};

ReviewStar.propTypes = {
	score: PropTypes.number.isRequired,
};

export default ReviewStar;
