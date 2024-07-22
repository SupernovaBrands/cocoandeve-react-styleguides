import dynamic from 'next/dynamic';
import Footer from '~/sections/Footer';
import Collection from '~/templates/Collection';
import Service from "~/sections/Service";
import { useEffect, useState } from 'react';
import { annBar, timerBar, megaMenu, mainMenu, menuBannerCode, menuBannerQuiz, shopMenu, aboutMenu, helpMenu } from '~/modules/placeholders';

const Header = dynamic(() => import('~/sections/Header'), {
    ssr: false,
});

const CollectionTemplate = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
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
			variants: {
				nodes: [
					{ sku: 'CE0000072020' }
				]
			}
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
			},
			variants: {
				nodes: [
					{ sku: 'CE0000072020' }
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
			},
			variants: {
				nodes: [
					{ sku: 'CE0000072020' }
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
			},
			variants: {
				nodes: [
					{ sku: 'CE0000072020' }
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
			},
			variants: {
				nodes: [
					{ sku: 'CE0000072020' }
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
			},
			variants: {
				nodes: [
					{ sku: 'CE0000072020' }
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
			variants: {
				nodes: [
					{ sku: 'CE0000072020' }
				]
			}
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
			variants: {
				nodes: [
					{ sku: 'CE0000072020' }
				]
			}
		}
    ];

	useEffect(() => {
        setIsLoading(false);
    }, []);

	const currentCollection = {
		id: "gid://shopify/Collection/162936881187",
		handle: "all",
		title: "All",
		description: "",
		image: null
	};

	const mainCollections = [
		{
			collection: {
				id: "gid://shopify/Collection/162936881187",
				handle: "all",
				title: "Shop All",
				description: "",
				image: null
			}
		},
		{
			collection: {
				id: "gid://shopify/Collection/162936881187",
				handle: "#",
				title: "Hair",
				description: "",
				image: null
			}
		},
		{
			collection: {
				id: "gid://shopify/Collection/162936881187",
				handle: "#",
				title: "Hair Benefits",
				description: "",
				image: null
			}
		},
		{
			collection: {
				id: "gid://shopify/Collection/162936881187",
				handle: "tan-and-spf",
				title: "Tan & SPF",
				description: "",
				image: null
			}
		},
		{
			collection: {
				id: "gid://shopify/Collection/162936881187",
				handle: "#",
				title: "Skincare",
				description: "",
				image: null
			}
		},
		{
			collection: {
				id: "gid://shopify/Collection/162936881187",
				handle: "#",
				title: "Body",
				description: "",
				image: null
			}
		},
		{
			collection: {
				id: "gid://shopify/Collection/162936881187",
				handle: "#",
				title: "Value Sets",
				description: "",
				image: null
			}
		}
	];

    return (
		<>
        	<Header
				annBar={annBar}
				timerBar={timerBar}
				mainMenu={mainMenu}
				megaMenu={megaMenu}
				menuBannerQuiz={menuBannerQuiz}
				menuBannerCode={menuBannerCode}
				dummy={true} />
			<Collection
				isLoading={isLoading}
				products={products}
				handle={'tan-and-spf'}
				currentCollection={currentCollection}
				showSpinner={false}
				parentCollection={[]}
				subHandles='hair,shampoo-conditioner,treatments,hair-styling,hair-accessories'
				mainCollectionHandles='all,hair,hair-benefits,tan-and-spf,skincare,body,kits-gifts'
				/>
            <Service />
			<Footer
				aboutMenu={aboutMenu}
				shopMenu={shopMenu}
				helpMenu={helpMenu} />
		</>
    );
}

export default CollectionTemplate;
