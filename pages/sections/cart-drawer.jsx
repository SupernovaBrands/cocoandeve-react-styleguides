import Cart from "@/components/cart/cart";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';

const CartDrawerSection = () => {
	const [show, setShow] = useState(false);

	const toggleCart = () => {
		setShow(!show);
	}
	return (
		<div className="container">
			<h1>Cart Drawer</h1>
			<button onClick={toggleCart} className="btn btn-primary">Show Cart</button>
			<Cart showCart={show} toggleCart={toggleCart} />
		</div>
	);
}

export default CartDrawerSection;
