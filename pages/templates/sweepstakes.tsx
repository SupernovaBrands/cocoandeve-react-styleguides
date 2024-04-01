import dynamic from 'next/dynamic';
// import Header from '@/sections/Header';
import Sweepstakes from '@/templates/Sweepstakes';
import Footer from '@/sections/Footer';
// import Cart from "@/components/cart/cart";
import { useState } from 'react';
const Cart = dynamic(() => import('@/components/cart/cart'), {
    ssr: false,
});
const Header = dynamic(() => import('@/sections/Header'), {
    ssr: false,
});
const sweepstakesTemplate = () => {
	const [showCart, setShowCart] = useState(false);

    const toggleCart = () => {
		setShowCart(!showCart);
	}
    return (
		<>
        	<Header toggleCart={toggleCart}  />
			<Sweepstakes />
			<Footer />
			{/* <Cart showCart={showCart} toggleCart={toggleCart} /> */}
		</>
    );
}

export default sweepstakesTemplate;
