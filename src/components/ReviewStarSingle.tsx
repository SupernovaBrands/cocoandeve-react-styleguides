import React from 'react';

import SvgFull from '~/images/icons/star-full.svg';

const ReviewStarSingle = (props: any) => (
	<SvgFull role="presentation" className={`svg fill-primary text-primary ${props.className}`} />
);

export default ReviewStarSingle;
