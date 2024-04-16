import CloseCircle from '~/images/icons/close-circle.svg';

const Tooltip = (props: any) => {
	return (
		<div className={`absolute right-0 before:absolute before:top-0 before:right-0 lg:w-1/3 pr-4 pl-4 tooltip bg-primary text-white text-center py-2 overflow-hidden [@media(min-width:992px)]:left-auto [@media(min-width:992px)]:right-[0] [@media(min-width:992px)]:mr-[15px] ${props.show ? 'opacity-100 translate-y-[0] visible' : ''}`}>
            <CloseCircle className="fill-[white] h-[12px] w-[12px] text-white cursor-pointer absolute right-[0.5em] top-2/4 -translate-y-1/2 text-[1.1875em]" />
            Item added to cart
            <a href="#" className="block text-white underline">Proceed to checkout</a>
        </div>
	);
}

export default Tooltip;