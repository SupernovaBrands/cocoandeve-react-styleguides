import dynamic from 'next/dynamic';
import Sustainability from '~/templates/Sustainability';
// import Cart from "~/components/cart/cart";
import { useState } from 'react';
import Header from '~/sections/Header';
import Footer from '~/sections/Footer';
import { annBar, megaMenu, mainMenu, menuBannerCode, menuBannerQuiz, shopMenu, aboutMenu, helpMenu } from '~/modules/placeholders';
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
			<Header toggleCart={toggleCart}
				annBar={annBar}
				mainMenu={mainMenu}
				megaMenu={megaMenu}
				menuBannerQuiz={menuBannerQuiz}
				menuBannerCode={menuBannerCode}
				dummy={true} />
        	<Sustainability />
            <Footer
				aboutMenu={aboutMenu}
				shopMenu={shopMenu}
				helpMenu={helpMenu} />
            {/* <Cart showCart={showCart} toggleCart={toggleCart} /> */}
		</>
    );
}

export default SustainabilityTemplate;
