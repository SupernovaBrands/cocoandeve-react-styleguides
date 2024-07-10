/* global tSettings Shopify */
import { useState, useEffect } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { formatMoney } from '~/modules/utils';

const CartDiscountMeter = (props) => {
	const {
		target,
		current,
		progressText,
	} = props;

	const [state, setState] = useState({ target, current, progressText, progress: 0, text: '' });

	useEffect(() => {
		const remaining = props.target - props.current;
		const progress = remaining <= 0 ? 100 : Math.floor((current / target) * 100);
		const amount = formatMoney(remaining);
		const text = remaining <= 0 ? progressText : progressText.replace('#{remaining}', amount);
		setState({...state, progress, text})
	}, [props]);

	return (
		<>
			<p className="mb-1">{state.text}</p>
			<div className="progress mb-3 bg-[#e9ecef] rounded flex overflow-hidden h-[5px]">
				<div
					className="progress-bar flex flex-col justify-center overflow-hidden text-white text-center whitespace-nowrap bg-primary [transition:width_.6s_ease]"
					style={{ width: `${state.progress}%` }}
					role="progressbar"
					aria-label="progress"
					aria-valuenow={state.progress}
					aria-valuemin={0}
					aria-valuemax={100}
				/>
			</div>
		</>
	);
};

CartDiscountMeter.propTypes = {
	current: PropTypes.number,
	target: PropTypes.number,
	progressText: PropTypes.string,
};

CartDiscountMeter.defaultProps = {
	current: 0,
	target: 0,
	progressText: 'cartShippingMeter.inProgressText',
};

export default CartDiscountMeter;
