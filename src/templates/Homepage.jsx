import { useState } from 'react';
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import HeroBanner from '@/sections/HeroBanner';
import ProductCarousel from '@/sections/ProductCarousel';
import Playground from '@/sections/Playground';
import Service from "@/sections/Service";
import Editors from '@/sections/Editors';
import RealResultCarousel from '@/sections/RealResultCarousel';
import Instagram from '@/sections/Instagram';
import Cart from "@/components/cart/cart";

const Homepage = () => {
    const [showCart, setShowCart] = useState(false);

    const toggleCart = () => {
		setShowCart(!showCart);
	}

    return (
		<>
      <HeroBanner />
      <ProductCarousel />
      <Playground />
      <Service />
      <Editors />
      <RealResultCarousel />
      <Instagram />
		</>
    );
}

export default Homepage;