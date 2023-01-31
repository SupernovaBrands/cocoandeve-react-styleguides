import CloseCircle from '../../src/images/icons/close-circle.svg';

const Tooltip = (props) => {
	return (
		<div class={`col-lg-4 tooltip bg-primary text-white text-center py-2 overflow-hidden ${props.show ? 'show' : ''}`}>
            <CloseCircle className="svg tooltip__close" />
            Item added to cart
            <a href="#" class="d-block text-white text-underline">Proceed to checkout</a>
        </div>
	);
}

export default Tooltip;