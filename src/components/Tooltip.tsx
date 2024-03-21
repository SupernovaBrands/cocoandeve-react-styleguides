import CloseCircle from '@/images/icons/close-circle.svg';

const Tooltip = (props) => {
	return (
		<div className={`before:absolute before:inset-y-0 before:right-0 lg:w-1/3 pr-4 pl-4 tooltip bg-primary text-white text-center py-2 overflow-hidden ${props.show ? 'show' : ''}`}>
            <CloseCircle className="absolute svg tooltip__close h-[12px] w-[12px] text-white" />
            Item added to cart
            <a href="#" className="d-block text-white text-underline">Proceed to checkout</a>
        </div>
	);
}

export default Tooltip;