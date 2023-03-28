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
			<Modal show={show} onHide={toggleCart} className="cart-drawer">
				<Cart />
			</Modal>
		</div>
	);
}

export default CartDrawerSection;