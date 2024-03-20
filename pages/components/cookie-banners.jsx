import dynamic from 'next/dynamic';
// import CookieBanner from '@/components/CookieBanner';
import { useState } from 'react';
const CookieBanner = dynamic(() => import('@/components/CookieBanner'), {
    ssr: false,
});
const CookieBanners = () => {
	const [show, setShow] = useState(false);

	const onAcceptCookie = (active) => {
		setShow(active);
	};

	return (
		<>
			{!show && (
				<CookieBanner onAcceptCookie={onAcceptCookie} text="Up to 25% off + Free Gift worth $25.40" />
			)}
		</>
	);
}

export default CookieBanners;
