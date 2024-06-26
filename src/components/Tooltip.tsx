import CloseCircle from '~/images/icons/close-circle.svg';

const Tooltip = (props: any) => {
	const { tooltipShow, closeTip, checkoutUrl } = props;
	return (
		<div className={`[transition:all_.4s_ease-in-out] right-[0] left-auto absolute before:absolute before:top-0 before:right-0 w-full lg:w-1/3 pr-4 pl-4 tooltip bg-primary text-white text-center py-g overflow-hidden ${tooltipShow ? 'translate-y-[0%] visible opacity-100' : '-translate-y-full invisible opacity-0'}`}>
			<CloseCircle onClick={closeTip} className="fill-[white] h-[1em] text-white cursor-pointer absolute right-[0.5em] top-2/4 -translate-y-1/2 text-[1.1875em]" />
			Item added to cart
			<a href={checkoutUrl} className="block text-white underline hover:text-white">Proceed to checkout</a>
		</div>
	);
}

export default Tooltip;