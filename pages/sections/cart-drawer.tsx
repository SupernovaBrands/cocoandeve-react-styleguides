import Button from '~/components/Button';
import dynamic from 'next/dynamic';
import { useState } from "react";
import { ReactElement } from "react"; // Import ReactElement type

const Cart = dynamic(() => import('~/components/cart/cart'), {
    ssr: false,
});

interface CartDrawerSectionProps {} // Define props interface if needed

const CartDrawerSection = (): ReactElement => { // Add type annotation for return value
	const [show, setShow] = useState<boolean>(false); // Add type annotation for state variable

	const toggleCart = (): void => { // Add type annotation for function
		setShow(!show);
	}

	const handleClose = (): void => { // Add type annotation for function
		setShow(false);
	}

	return (
		<div className="container">
			<h1>Cart Drawer</h1>
			<Button type="button" onClick={toggleCart}>Show Cart</Button>
			<Cart showCart={show} handleClose={handleClose} styleguide={true} cartCount={0}
			store={'dev'}
			cartData={{id: 0}} onUpdateCart={() => {}} onDeleteLine={() => {}}
			manualGwpSetting={{id: 1}}
			/>
		</div>
	);
}

export default CartDrawerSection;
