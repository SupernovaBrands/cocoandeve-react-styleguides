import CookieBanner from '@/components/CookieBanner';
import { useState } from 'react';

const CookieBanners = () => {
	console.log('cookie banner');
	const [show, setShow] = useState(false);

	const onAcceptCookie = (active) => {
		setShow(active);
	};

	return (
		<>
			<h1>Cookie Banner</h1>
			{!show && (
				<CookieBanner onAcceptCookie={onAcceptCookie} text="Up to 25% off + Free Gift worth $25.40" />
			)}
		</>
	);
}

export default CookieBanners;
