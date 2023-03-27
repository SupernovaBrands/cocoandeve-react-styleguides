import Cart from "@/components/cart/cart";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';

const CartDrawerSection = () => {
	const [show, setShow] = useState(true);

	const toggleCart = () => {
		setShow(!show);
	}
	return (
		<>
			<h1>Cart Drawer</h1>
			<button onClick={toggleCart}>Show Cart</button>
			<Modal show={show} onHide={toggleCart} className="cart-drawer">
				<Cart />
			</Modal>
			
		</>
	);
}

export default CartDrawerSection;