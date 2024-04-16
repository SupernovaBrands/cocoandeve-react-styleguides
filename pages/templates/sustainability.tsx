import dynamic from 'next/dynamic';
import Sustainability from '~/templates/Sustainability';
// import Cart from "~/components/cart/cart";
import { useState } from 'react';
import Header from '~/sections/Header';
import Footer from '~/sections/Footer';
const Cart = dynamic(() => import('~/components/cart/cart'), {
    ssr: false,
});
const SustainabilityTemplate = () => {
	const [showCart, setShowCart] = useState(false);

    const toggleCart = () => {
		setShowCart(!showCart);
	}
    return (
		<>
			<Header toggleCart={toggleCart}  />
        	<Sustainability />
            <Footer />
            {/* <Cart showCart={showCart} toggleCart={toggleCart} /> */}
		</>
    );
}

export default SustainabilityTemplate;
