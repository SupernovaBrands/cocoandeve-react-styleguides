import Header from '@/sections/Header';
import Stockist from '@/templates/Stockist';
import Footer from '@/sections/Footer';
import Instagram from '@/sections/Instagram';
import Service from '@/sections/Service';
import Cart from "@/components/cart/cart";
import { useState } from 'react';

const stockistTemplate = () => {
	const [showCart, setShowCart] = useState(false);

    const toggleCart = () => {
		setShowCart(!showCart);
	}
    return (
		<>
        	<Header toggleCart={toggleCart}  />
			<Stockist />
			<Instagram />
			<Service />
			<Footer />
			<Cart showCart={showCart} toggleCart={toggleCart} />
		</>
    );
}

export default stockistTemplate;