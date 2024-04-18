import dynamic from 'next/dynamic';
// import Header from '~/sections/Header';
import Footer from '~/sections/Footer';
import BlogFiltered from '~/templates/BlogFiltered';
// import Cart from "~/components/cart/cart";
import { useState } from 'react';
import { annBar, megaMenu, mainMenu, menuBannerCode, menuBannerQuiz, shopMenu, aboutMenu, helpMenu } from '~/modules/placeholders';
const Cart = dynamic(() => import('~/components/cart/cart'), {
    ssr: false,
});
const Header = dynamic(() => import('~/sections/Header'), {
    ssr: false,
});

const BlogFilteredTemplate = () => {
	const [showCart, setShowCart] = useState(false);

    const toggleCart = () => {
		setShowCart(!showCart);
	}
    return (
		<>
			<div className="mobile-wrapper">
				<Header  toggleCart={toggleCart}
					annBar={annBar}
					mainMenu={mainMenu}
					megaMenu={megaMenu}
					menuBannerQuiz={menuBannerQuiz}
					menuBannerCode={menuBannerCode}
					dummy={true} />
				<BlogFiltered />
				{/* <Cart showCart={showCart} toggleCart={toggleCart} /> */}
				<Footer
				aboutMenu={aboutMenu}
				shopMenu={shopMenu}
				helpMenu={helpMenu} />
			</div>
		</>
    );
}

export default BlogFilteredTemplate;
