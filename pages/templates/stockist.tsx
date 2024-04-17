import dynamic from 'next/dynamic';
import Header from '~/sections/Header';
import Stockist from '~/templates/Stockist';
import Footer from '~/sections/Footer';
import Instagram from '~/sections/Instagram';
import Service from '~/sections/Service';
// import Cart from "~/components/cart/cart";
import { useState } from 'react';
import { annBar, megaMenu, mainMenu, menuBannerCode, menuBannerQuiz, shopMenu, aboutMenu, helpMenu } from '~/modules/placeholders';
const Cart = dynamic(() => import('~/components/cart/cart'), {
    ssr: false,
});

const stockistTemplate = () => {
	const [showCart, setShowCart] = useState(false);

    const toggleCart = () => {
		setShowCart(!showCart);
	}
    return (
		<>
        	<Header toggleCart={toggleCart}
				annBar={annBar}
				mainMenu={mainMenu}
				megaMenu={megaMenu}
				menuBannerQuiz={menuBannerQuiz}
				menuBannerCode={menuBannerCode}/>
			<Stockist />
			<Instagram className="bg-yellow-light" />
			<Service />
			<Footer
				aboutMenu={aboutMenu}
				shopMenu={shopMenu}
				helpMenu={helpMenu} />
			{/* <Cart showCart={showCart} toggleCart={toggleCart} /> */}
		</>
    );
}

export default stockistTemplate;
