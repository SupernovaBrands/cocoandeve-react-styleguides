import RealResults from '@/templates/RealResults';
import Cart from "@/components/cart/cart";
import { useState } from 'react';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';

const RealResultsTemplate = () => {
	const [showCart, setShowCart] = useState(false);

    const toggleCart = () => {
		setShowCart(!showCart);
	}
    return (
		<>
			<Header toggleCart={toggleCart}  />
        	<RealResults />
			<Footer />
			<Cart showCart={showCart} toggleCart={toggleCart} />
		</>
    );
}

export default RealResultsTemplate;