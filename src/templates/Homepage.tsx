import { useState } from 'react';
// import Header from '~/sections/Header';
// import Footer from '~/sections/Footer';
import HeroBanner from '~/sections/HeroBanner';
import ProductCarousel from '~/sections/ProductCarousel';
import Playground from '~/sections/Playground';
import Service from "~/sections/Service";
import Editors from '~/sections/Editors';
import RealResultCarousel from '~/sections/RealResultCarousel';
import Instagram from '~/sections/Instagram';
import QuizReward from '~/sections/QuizReward';
// import Cart from "~/components/cart/cart";

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

	const featuredCollection = {
		title: "Discover the Coco & Eve playground",
		"moblie_title": "The Coco & Eve playground",
		"text": "<p><strong>We're totally coconuts about beauty!</strong></p><p>Which is why we have combined powerful & tropical ingredients into different ranges to provide amazing results and make your life feel like a constant holiday. <br>21 beauty awards. 100% vegan. Cruelty free.</p>",
		"range_1": {
			"id": 10,
			"Title": "Hair",
			"text": "Explore our hair range <br> to find all you’ll need for <br> perfect locks",
			"button_label": "Shop Hair",
			"button_link": "/collections/hair",
			"playground_range_bg": "bg-secondary-light",
			"image": {
				"id": 5690,
				"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/d32b6302-730c-4a75-df44-68902bb77100/public"
			},
			"image_mobile": {
				"id": 2901,
				"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/b46544da-3a84-4309-363b-9778f9090000/public"
			}
		},
		"range_2": {
			"id": 11,
			"Title": "Tan & SPF",
			"text": "<p class=\"playground__subtitle mt-1\">Explore Tan &amp; SPF <br> for a safe &amp; sun-kissed glow!</p>",
			"button_label": "Shop Tan",
			"button_link": "/collections/tan",
			"playground_range_bg": "bg-yellow-light",
			"image": {
				"id": 5691,
				"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/e9285cc9-f4cc-49b2-a159-efd75a4b1800/public"
			},
			"image_mobile": {
				"id": 2903,
				"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/33a889be-891d-4e4d-d04c-88ea7cbb3300/public"
			}
		},
		"range_3": {
			"id": 12,
			"Title": "Skin",
			"text": "Explore our antioxidant <br>skincare for a radiant glow",
			"button_label": "Shop Skin",
			"button_link": "/collections/skin",
			"playground_range_bg": "bg-secondary-light",
			"image": {
				"id": 5693,
				"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/18b2e9f8-fc1f-4a03-8355-1b96f2205600/public"
			},
			"image_mobile": {
				"id": 5694,
				"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/c1820c74-44d7-4cd0-9e1d-273c32b6cc00/public"
			}
		},
		"range_4": {
			"id": 15,
			"Title": "Body",
			"text": "Explore Glow Figure. <br> It's Bali beauty for your <br class=\"d-none d-lg-block\"> bod",
			"button_label": "Shop Body",
			"button_link": "/collections/body",
			"playground_range_bg": "bg-primary-light-second",
			"image": {
				"id": 5692,
				"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/7c000358-bae4-4d76-8d67-5172ce932500/public"
			},
			"image_mobile": {
				"id": 2905,
				"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/10d3f2b0-a667-4606-4c9c-05f3cec3ac00/public"
			}
		}
	};

    return (
		<>
            <HeroBanner isStyleguide={true} />
            <ProductCarousel products={PRODUCTS} isStyleguide={true} />
			<RealResultCarousel videoReviews={SLIDE_VIDEOS} videos={SLIDE_VIDEOS} />
			<Service />
            <Playground featuredCollection={featuredCollection} isStyleguide={true} />
			<QuizReward />
            <Editors />
            <Instagram className="bg-pink-light" isStyleguide={true} />
		</>
    );
}

export default Homepage;
