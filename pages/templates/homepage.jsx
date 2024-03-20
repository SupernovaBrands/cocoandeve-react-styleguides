import dynamic from 'next/dynamic';
import Homepage from '@/templates/Homepage';
// import Cart from "@/components/cart/cart";
import { useState } from 'react';
// import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
const Cart = dynamic(() => import('@/components/cart/cart'), {
    ssr: false,
});
// import dynamic from 'next/dynamic';
const Header = dynamic(() => import('@/sections/Header'), {
    ssr: false,
});

const HomepageTemplate = () => {
	const [showCart, setShowCart] = useState(false);

    const toggleCart = () => {
		setShowCart(!showCart);
	}
    return (
		<>
			<Header toggleCart={toggleCart}  />
        	<Homepage />
			<Footer />
			<Cart showCart={showCart} toggleCart={toggleCart} />
		</>
    );
}

export default HomepageTemplate;
