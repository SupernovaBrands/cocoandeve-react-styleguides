import Footer from "@/sections/Footer";
import Header from "@/sections/Header";
import Blog from "@/templates/Blog";
import Cart from "@/components/cart/cart";
import { useState } from 'react';

const BlogTemplate = () => {
	const [showCart, setShowCart] = useState(false);

    const toggleCart = () => {
		setShowCart(!showCart);
	}
	return (
		<>
			<Header toggleCart={toggleCart}  />
			<Blog />
			<Cart showCart={showCart} toggleCart={toggleCart} />
			<Footer />
		</>
	);
};

export default BlogTemplate;
