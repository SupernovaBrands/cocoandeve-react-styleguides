import React from 'react';

import SvgFull from '~/images/icons/star-full.svg';
import SvgHalf from '~/images/icons/star-half.svg';
import SvgLine from '~/images/icons/star-line.svg';

interface Props {
    score: number;
}

const ReviewStar: React.FC<Props> = ({ score }) => {
    const full = Math.floor(score);
    const line = 5 - Math.ceil(score);
    const half = 5 - full - line;

    const stars: JSX.Element[] = [];
    for (let x = 0; x < full; x += 1) {
        stars.push(<SvgFull key={`full-${x}`} role="presentation" className={`size-[1em] fill-primary ${stars.length === 0 ? '' : 'ml-25'}`} />);
    }
    for (let x = 0; x < half; x += 1) {
        stars.push(<SvgHalf key={`half-${x}`} role="presentation" className={`size-[1em] fill-primary ${stars.length === 0 ? '' : 'ml-25'}`} />);
    }
    for (let x = 0; x < line; x += 1) {
        stars.push(<SvgLine key={`line-${x}`} role="presentation" className={`size-[1em] fill-primary ${stars.length === 0 ? '' : 'ml-25'}`} />);
    }

    return <div className="flex">{stars}</div>;
};

export default ReviewStar;
