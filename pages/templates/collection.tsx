import dynamic from 'next/dynamic';
import Footer from '~/sections/Footer';
import Collection from '~/templates/Collection';
import Service from "~/sections/Service";
import { useEffect, useState } from 'react';
import { annBar, megaMenu, mainMenu, menuBannerCode, menuBannerQuiz, shopMenu, aboutMenu, helpMenu } from '~/modules/placeholders';

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

	const footerAbout = {
		id: 4,
		enabled: true,
		title: "About our Hair Care Products 1",
		content_body: "<p>Treat your hair to the ultimate pamper routine with Coco &amp; Eve&rsquo;s hair care products, straight from paradise.</p>\n<p>Explore our <a class=\"text-underline\" href=\"https://us.cocoandeve.com/products/hydrating-shampoo\">hydrating shampoo</a> and <a class=\"text-underline\" href=\"https://us.cocoandeve.com/products/hydrating-conditioner\">conditioner</a> to achieve instant gloss, shine and smoothness. <br><br>Revive and renew your scalp with our <a class=\"text-underline\" href=\"https://us.cocoandeve.com/products/clean-scalp-treatment\">scalp exfoliator</a> and discover our <a class=\"text-underline\" href=\"https://us.cocoandeve.com/products/super-nourishing-coconut-fig-hair-masque\">Like a Virgin Hair Masque </a>and Sweet Repair Hair Masque for hydrated and shiny hair! <br><br>Need a quick fix? Try our <a class=\"text-underline\" href=\"https://us.cocoandeve.com/products/leave-in-conditioner\">Leave in Conditioner</a> to instantly transform your hair.</p>\n<p>Looking to take your hair care routine to the next level? Browse our hair accessories and treat yourself to a <a class=\"text-underline\" href=\"https://us.cocoandeve.com/products/shampoo-brush\">shampoo brush</a> or hair towel wrap for some extra pampering.</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>",
	};

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
				mainMenu={mainMenu}
				megaMenu={megaMenu}
				menuBannerQuiz={menuBannerQuiz}
				menuBannerCode={menuBannerCode}
				dummy={true} />
			<Collection
				isLoading={isLoading}
				products={products}
				footerAbout={footerAbout}
				mainCollections={mainCollections}
				handle={'tan-and-spf'}
				currentCollection={currentCollection}
				showSpinner={false}
				childrenCollections={[]}
				parentCollection={[]}
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
