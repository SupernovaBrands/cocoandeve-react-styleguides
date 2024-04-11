import { useState } from 'react';
// import Header from '@/sections/Header';
// import Footer from '@/sections/Footer';
import HeroBanner from '@/sections/HeroBanner';
import ProductCarousel from '@/sections/ProductCarousel';
import Playground from '@/sections/Playground';
import Service from "@/sections/Service";
import Editors from '@/sections/Editors';
import RealResultCarousel from '@/sections/RealResultCarousel';
import Instagram from '@/sections/Instagram';
// import Cart from "@/components/cart/cart";

const Homepage = () => {
    const [showCart, setShowCart] = useState(false);

    const toggleCart = () => {
		setShowCart(!showCart);
	}

	const SLIDE_VIDEOS = [
		{
			id: 1,
			videoUrl: 'https://cdn.shopify.com/videos/c/o/v/80ace9f8f186492bbe4b1fa00dca349a.mp4',
			product: 'Sunny Honey Bali Bronzing Foam',
			author: 'Meredith Langosh',
			url: '/'
		},
		{
			id: 2,
			videoUrl: 'https://cdn.shopify.com/videos/c/o/v/949ea964f27e4bcc982b596cca694036.mp4',
			product: 'Sunny Honey Bali Bronzing Foam',
			author: 'Meredith Langosh',
			url: '/'
		},
		{
			id: 3,
			videoUrl: 'https://cdn.shopify.com/videos/c/o/v/1a172216adc3439d8b10c43574075247.mp4',
			product: 'Sunny Honey Bali Bronzing Foam',
			author: 'Meredith Langosh',
			url: '/'
		},
		{
			id: 4,
			videoUrl: 'https://cdn.shopify.com/videos/c/o/v/57c3e426e86a4d499e50a0cfe8da171f.mp4',
			product: 'Sunny Honey Bali Bronzing Foam',
			author: 'Meredith Langosh',
			url: '/'
		},
		{
			id: 5,
			videoUrl: 'https://cdn.shopify.com/videos/c/o/v/80ace9f8f186492bbe4b1fa00dca349a.mp4',
			product: 'Sunny Honey Bali Bronzing Foam',
			author: 'Meredith Langosh',
			url: '/'
		},
		{
			id: 6,
			videoUrl: 'https://cdn.shopify.com/videos/c/o/v/949ea964f27e4bcc982b596cca694036.mp4',
			product: 'Sunny Honey Bali Bronzing Foam',
			author: 'Meredith Langosh',
			url: '/'
		},
	];

  const PRODUCTS = [
		{
			id: 1,
			src: '//via.placeholder.com/520x520/FFF2F4',
			srcSet: '//via.placeholder.com/520x520/FFF2F4',
			title: 'Sunny Honey Bronzing Bundle',
			comparePrice: '$34.90',
			price: '$24.90',
			productId: 4543113265187,
		},
		{
			id: 2,
			src: 'https://via.placeholder.com/520x520/FFF2F4',
			srcSet: 'https://via.placeholder.com/520x520/FFF2F4',
			title: 'Miracle Hair',
			comparePrice: '$34.90',
			price: '$24.90',
			productId: 4543113265187,
			swatch: {
				label: 'Choose Style',
				style: true,
				data: [
					{ id: 32068891607075, value: 'girl-print', label: 'Girl Print: Limited edition!', available: true},
					{ id: 32068891639843, value: 'leaf-print', label: 'Leaf Print', available: true},
				]
			}
		},
		{
			src: 'https://via.placeholder.com/520x520/FFF2F4',
			srcSet: 'https://via.placeholder.com/520x520/FFF2F4',
			title: 'Sunny Honey Bronzing Bundle',
			comparePrice: '$34.90',
			price: '$24.90',
			productId: 4543113265187,
			swatch: {
				label: 'Choose Shade',
				shade: true,
				data: [
					{ id: 32068891541539, value: 'medium', label: 'Medium', available: false},
					{ id: 32068891607075, value: 'dark', label: 'Dark', available: true},
					{ id: 32068891639843, value: 'ultra-dark', label: 'Ultra Dark', available: true},
				]
			}
		},
		{
			id: 4,
			src: '//via.placeholder.com/520x520/FFF2F4',
			srcSet: '//via.placeholder.com/520x520/FFF2F4',
			title: 'Sunny Honey Bronzing Bundle',
			comparePrice: '$34.90',
			price: '$24.90',
			productId: 4543113265187,
		},
		{
			id: 5,
			src: '//via.placeholder.com/520x520/FFF2F4',
			srcSet: '//via.placeholder.com/520x520/FFF2F4',
			title: 'Sunny Honey Bronzing Bundle',
			comparePrice: '$34.90',
			price: '$24.90',
			productId: 4543113265187,
		},
		{
			src: 'https://via.placeholder.com/520x520/FFF2F4',
			srcSet: 'https://via.placeholder.com/520x520/FFF2F4',
			title: 'Sunny Honey Bronzing Bundle',
			comparePrice: '$34.90',
			price: '$24.90',
			productId: 4543113265187,
			swatch: {
				label: 'Choose Shade',
				shade: true,
				data: [
					{ id: 32068891541539, value: 'medium', label: 'Medium', available: false},
					{ id: 32068891607075, value: 'dark', label: 'Dark', available: true},
					{ id: 32068891639843, value: 'ultra-dark', label: 'Ultra Dark', available: true},
				]
			}
		}
	];

    return (
		<>
            <HeroBanner />
            <ProductCarousel products={PRODUCTS} />
			<RealResultCarousel videos={SLIDE_VIDEOS} />
			<Service />
            <Playground />
            <Editors />
            <Instagram className="bg-pink-light" />
		</>
    );
}

export default Homepage;
