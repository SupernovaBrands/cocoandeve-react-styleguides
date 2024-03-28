import dynamic from 'next/dynamic';
// import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import Collection from '@/templates/Collection';
import Service from "@/sections/Service";
// import Cart from "@/components/cart/cart";
import { useState } from 'react';
const Cart = dynamic(() => import('@/components/cart/cart'), {
    ssr: false,
});
const Header = dynamic(() => import('@/sections/Header'), {
    ssr: false,
});

const CollectionTemplate = () => {
	const [showCart, setShowCart] = useState(false);

    const toggleCart = () => {
		setShowCart(!showCart);
	}
    const products = [
		{
			title: 'Like a Virgin Hair Masque Like a Virgin Hair Masque',
			productId: 4543113265187,
			comparePrice: '$44.90',
			price: '$34.90',
			srcSet: 'https://via.placeholder.com/540x540/FFF2F4',
			src: 'https://via.placeholder.com/243x243/FFF2F4',
			badgeImg: false,
		},
		{
			title: 'Like a Virgin Hair Masque',
			productId: 4543113265187,
			comparePrice: '$44.90',
			price: '$34.90',
			badgeText: '20% OFF* Code: SAVE20',
			srcSet: 'https://via.placeholder.com/540x540/FFF2F4',
			src: 'https://via.placeholder.com/243x243/FFF2F4',
			swatch: {
				label: 'Choose Style',
				style: true,
				data: [
					{ id: 32068891607075, value: 'girl-print', label: 'Girl Print: Limited edition!', available: false},
					{ id: 32068891639843, value: 'leaf-print', label: 'Leaf Print', available: true},
				]
			}
		},
		{
			title: 'Like A Virgin Hair Masque',
			productId: 4543113265187,
			comparePrice: '$44.90',
			price: '$34.90',
			srcSet: 'https://via.placeholder.com/540x540/FFF2F4',
			src: 'https://via.placeholder.com/243x243/FFF2F4',
			swatch: {
				label: 'Choose Style',
				style: true,
				data: [
					{ id: 32068891607075, value: 'girl-print', label: 'Girl Print: Limited edition!', available: false},
					{ id: 32068891639843, value: 'leaf-print', label: 'Leaf Print', available: true},
				]
			}
		},
		{
			title: 'Satin Eye Mask',
			productId: 4543113265187,
			comparePrice: '$44.90',
			price: '$34.90',
			srcSet: 'https://via.placeholder.com/540x540/FFF2F4',
			src: 'https://via.placeholder.com/243x243/FFF2F4',
            swatch: {
				label: 'Choose Shade',
				shade: true,
				data: [
					{ id: 32068891541539, value: 'medium', label: 'Medium', available: true},
					{ id: 32068891607075, value: 'dark', label: 'Dark', available: true},
					{ id: 32068891639843, value: 'ultra-dark', label: 'Ultra Dark', available: true},
				]
			}
		},
		{
			title: 'Like a Virgin Hair Masque',
			productId: 4543113265187,
			comparePrice: '$44.90',
			price: '$34.90',
			srcSet: 'https://via.placeholder.com/540x540/FFF2F4',
			src: 'https://via.placeholder.com/243x243/FFF2F4',
			swatch: {
				label: 'Choose Style',
				style: true,
				data: [
					{ id: 32068891607075, value: 'girl-print', label: 'Girl Print: Limited edition!', available: false},
					{ id: 32068891639843, value: 'leaf-print', label: 'Leaf Print', available: true},
				]
			}
		},
		{
			label: 'Slide 2',
			title: 'Sunny Honey Bali Bronzing Foam',
			productId: 4543113265187,
			comparePrice: '$144.90',
			price: '$134.90',
			srcSet: 'https://via.placeholder.com/540x540/FFF2F4',
			src: 'https://via.placeholder.com/243x243/FFF2F4',
			swatch: {
				label: 'Choose Style',
				style: true,
				data: [
					{ id: 32068891607075, value: 'girl-print', label: 'Girl Print: Limited edition!', available: false},
					{ id: 32068891639843, value: 'leaf-print', label: 'Leaf Print', available: true},
				]
			}
		},
		{
			label: 'Slide 3',
			title: 'Like A Virgin Hair Masque',
			productId: 4543113265187,
			comparePrice: '$44.90',
			price: '$34.90',
			srcSet: 'https://via.placeholder.com/540x540/FFF2F4',
			src: 'https://via.placeholder.com/243x243/FFF2F4',
		},
		{
			label: 'Slide 4',
			title: 'Sunny Honey Bali Bronzing Bundle',
			productId: 4543113265187,
			comparePrice: '$44.90',
			price: '$34.90',
			badgeImg: true,
			srcSet: 'https://via.placeholder.com/540x540/FFF2F4',
			src: 'https://via.placeholder.com/243x243/FFF2F4',
		}
    ];


    return (
		<>
        	{/* <Header toggleCart={toggleCart}  /> */}
			{/* <Collection products={products}/> */}
            <Service />
			<Footer />
			{/* <Cart showCart={showCart} toggleCart={toggleCart} /> */}
		</>
    );
}

export default CollectionTemplate;
