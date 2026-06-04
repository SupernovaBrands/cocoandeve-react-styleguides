/* global tSettings Shopify */
import { useState, useEffect } from 'react';
import React from 'react';
import { formatMoney } from '~/modules/utils';

const CartDiscountMeter = ({
	target = 0,
	current = 0,
	progressText = 'cartShippingMeter.inProgressText',
	useQuantity = false,
	items = [],
}: {
	target?: number,
	current?: number,
	progressText?: string,
	useQuantity?: boolean,
	items?: any[],
}) => {
	const [state, setState] = useState({ progress: 0, text: '' });

	useEffect(() => {
		const remaining = target - current;
		const progress = remaining <= 0 || useQuantity ? 100 : Math.floor((current / target) * 100);
		const amount = formatMoney(remaining);
		const text = remaining <= 0 ? progressText : progressText.replace('#{remaining}', amount);
		setState({ progress, text });
	}, [target, current, progressText, useQuantity]);

	const totalDiscounted = items.reduce((n: any, { totalDiscountAmount }) => n + totalDiscountAmount, 0);

	return totalDiscounted > 0 && (
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


export default CartDiscountMeter;
