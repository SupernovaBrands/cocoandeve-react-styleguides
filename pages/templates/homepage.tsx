import dynamic from 'next/dynamic';
import Homepage from '~/templates/Homepage';
// import Cart from "~/components/cart/cart";
import { useState } from 'react';
// import Header from '~/sections/Header';
import Footer from '~/sections/Footer';
import { annBar, megaMenu, mainMenu, menuBannerCode, menuBannerQuiz, shopMenu, aboutMenu, helpMenu } from '~/modules/placeholders';

// import dynamic from 'next/dynamic';
const Header = dynamic(() => import('~/sections/Header'), {
    ssr: false,
});

const HomepageTemplate = () => {
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
				menuBannerCode={menuBannerCode} />
        	<Homepage />
			<Footer
				aboutMenu={aboutMenu}
				shopMenu={shopMenu}
				helpMenu={helpMenu} />
		</>
    );
}

export default HomepageTemplate;
