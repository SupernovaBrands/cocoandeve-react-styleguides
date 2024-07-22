import dynamic from 'next/dynamic';
import RealResults from '~/templates/RealResults';
// import Cart from "~/components/cart/cart";
import { useState } from 'react';
import Header from '~/sections/Header';
import Footer from '~/sections/Footer';
import { annBar, timerBar, megaMenu, mainMenu, menuBannerCode, menuBannerQuiz, shopMenu, aboutMenu, helpMenu } from '~/modules/placeholders';
const Cart = dynamic(() => import('~/components/cart/cart'), {
    ssr: false,
});

const RealResultsTemplate = () => {
	const [showCart, setShowCart] = useState(false);

    const toggleCart = () => {
		setShowCart(!showCart);
	}
    return (
		<>
			<Header toggleCart={toggleCart}
				annBar={annBar}
				timerBar={timerBar}
				mainMenu={mainMenu}
				megaMenu={megaMenu}
				menuBannerQuiz={menuBannerQuiz}
				menuBannerCode={menuBannerCode}
				dummy={true}  />
        	<RealResults />
			<Footer
				aboutMenu={aboutMenu}
				shopMenu={shopMenu}
				helpMenu={helpMenu} />
			<Cart showCart={showCart} toggleCart={toggleCart} />
		</>
    );
}

export default RealResultsTemplate;
