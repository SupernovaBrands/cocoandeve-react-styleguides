import CloseCircle from '~/images/icons/close-circle.svg';

const Tooltip = (props: any) => {
	const { tooltipShow, closeTip, checkoutUrl, generalSetting } = props;
	return (
		<div className={`top-full z-[1035] [transition:all_.4s_ease-in-out] left-[15px] right-[15px] lg:left-auto lg:right-[125px] absolute before:absolute before:top-0 before:right-0 lg:min-w-[400px] pr-4 pl-4 tooltip ${generalSetting?.bfcm_cta_bg_color === 'bg-dark' ? 'bg-dark' : 'bg-primary'} text-white text-center py-g overflow-hidden ${tooltipShow ? 'translate-y-[0%] visible opacity-100' : '-translate-y-full invisible opacity-0'}`}>
			<CloseCircle onClick={closeTip} className="fill-[white] h-[1em] text-white cursor-pointer absolute right-[0.5em] top-2/4 -translate-y-1/2 text-[1.1875em]" />
			Item added to cart
			<a href={checkoutUrl || '/'} className="block text-white underline hover:text-white">Proceed to checkout</a>
		</div>
	);
}

export default Tooltip;