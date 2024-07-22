import dynamic from 'next/dynamic';
import Sustainability from '~/templates/Sustainability';
// import Cart from "~/components/cart/cart";
import { useEffect, useState } from 'react';
import Header from '~/sections/Header';
import Footer from '~/sections/Footer';
import { annBar, timerBar, megaMenu, mainMenu, menuBannerCode, menuBannerQuiz, shopMenu, aboutMenu, helpMenu } from '~/modules/placeholders';
const Cart = dynamic(() => import('~/components/cart/cart'), {
    ssr: false,
});
const SustainabilityTemplate = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [showCart, setShowCart] = useState(false);

    const toggleCart = () => {
		setShowCart(!showCart);
	}
	const banner = {
		heading: "Paradise lost? Not on our watch!",
		image_desktop: {
			id: 4728,
			url: "https://via.placeholder.com/1336x361.jpg/2596be"
		},
		image_mobile: {
			id: 4723,
			url: "https://via.placeholder.com/375x260.jpg/EFADBA"
		}
	};

	const intro = {
		id: 7,
		heading: "Thoughtful at every step",
		text: "<p>At Coco & Eve, we’re passionate about creating the very best products for your hair, skin and body, while taking care of our one precious planet. Inspired by the incredible plants, wildlife and people of our beautiful birthplace of Bali, we’re committed to making a positive, lasting impact.</p><p>We consider every action we take to ensure our slice of Paradise survives and thrives – ready to enchant future generations of explorers. </p>"
	};

	const imageSlider = {
		heading: "What are we doing?",
		slider_title: "Responsible Sourcing",
		text_1: "We believe you are the company you keep. This means that we work with only the most ethical and environmentally conscious suppliers – such as Ecocert-approved conscious partners. Our Coconut, Fig, Cacao and Mango are all from traceable sources that have no negative effect on the environment. A sustainable beauty award winner, our Shea Butter is also derived from renewable sources, while our Papaya and Prickly Pear are COSMOS certified. ",
		text_2: "Wastage drives us (coco)nuts, so we go out of our way to avoid it. We love finding creative ways to use whole fruits, rather than throwing half an ingredient away. Take our hero, coconut, for example. We use the extract in our Hair Masque, the oil in our Elixir, the ground shell in our Scalp Scrub and even a sugar made from the flower in our Body Scrub!.",
		text_3: "As for shipping, we always look to transport items from our suppliers to our warehouses with the smallest possible carbon footprint. That means our products move around the world less by air, and more by boat! (After all, who doesn’t love a good cruise?).",
		image_desktop: {
			id: 4716,
			url: "https://via.placeholder.com/670x350.jpg/2596be"
		},
		image_mobile: {
			id: 4717,
			url: "https://via.placeholder.com/375x479.jpg/EFADBA?text=375 x 320"
		}
	};

	const formula = {
		heading: "No Nasties Formula",
		text_1: "<p>Creating market beating products is our M.O., so we scour the globe to find the best quality natural botanicals, then pair these with superior laboratory-made ingredients to create our award-winning formulations. Made with the finest ingredients, all our products are free from sulfates, parabens, petroleum, phthalates, mineral oils, palm oil and other common nasties. You can find a full list of what we’ve excluded – and included – on each product page.</p>",
		text_2: "<p>Worried about our oceans? Don’t be – we’re 100% microbead-free! Any manual exfoliants are made from natural, biodegradable particles that’ll get you glowing without clogging your drains or harming marine life.</p>",
		text_3: "<h4 class='mb-1'>Why do we use synthetic and natural ingredients?</h4><p class=\"mb-lg-0\">While we’re committed to minimising the use of synthetics in our formulas, we will sometimes need to use them to deliver you the best possible product. For example, our fragrances are derived from synthetic ingredients. This is because natural fragrances like essential oils can be irritable on the skin –and they’re not necessarily more sustainable. In fact, it can take 10 times more flowers to create a natural fragrance than a synthetic one!</p>",
		tab_1: "Finest Ingredients",
		tab_2: "Microbead-free",
		tab_3: "FAQ"
	};

	const packaging = {
		heading: "Thoughtful Packaging",
		title_1: "Sustainable packaging",
		text_1: "It’s not just about ingredients, either. We’re constantly challenging ourselves to take a holistic approach to sustainable packaging with containers that are environmentally-friendly, durable and unBALIevably good looking! Way too cute for a single use, our shelfie-ready pots and jars are designed to be repurposed. Our tip? Brighten up your bathroom shelves by upcycling your empties into hair accessory or cotton pad holders. ",
		title_2: "100% recyclable",
		text_2: "Need to bin something? All our packaging is 100% recyclable. Only our travel size tube caps and bottle caps are made from plastic which might be hard to recycle (depending on which country you live in). And you can rest assured we’re working hard to ensure they’re soon recyclable across the world!.",
		title_3: "FSC certified",
		text_3: "100% of our cardboards and paper are sourced from sustainably managed forests (FSC Certified), and we minimise our plastic use where we can. This means that we only use paper materials to ship our products to you – no plastic bubble wraps here! The EVA bags used for our accessories are 100% biodegradable. However, for hygiene reasons we will sometimes use plastic covers on smaller items.",
		image_1: {
			id: 5225,
			url: "https://via.placeholder.com/300x135.jpg/EFADBA",
			alternativeText: "packaging_1_v2.jpg",
			width: 370,
			height: 180
		},
		image_2: {
			id: 4719,
			url: "https://via.placeholder.com/300x135.jpg/EFADBA",
			alternativeText: "packaging_2_726x254_crop_center.png",
			width: 370,
			height: 180
		},
		image_3: {
			id: 4720,
			url: "https://via.placeholder.com/300x135.jpg/EFADBA",
			alternativeText: "packaging_3_726x254_crop_center.png",
			width: 370,
			height: 180
		}
	};

	const imageText = {
		heading: "Clean & Cruelty Free",
		text: "Bali is home to amazingly diverse wildlife and plants – and we want to keep it that way! As deforestation and loss of natural habitat poses a threat to many of our furry friends, we only use FSC paper and card from sustainably managed forests. We also ensure our natural ingredients are from eco-conscious suppliers, and we are proudly 100% clean and PETA approved!",
		image_desktop: {
			id: 4721,
			url: "https://via.placeholder.com/670x270.jpg/2596be"
		},
		image_mobile: {
			id: 4722,
			url: "https://via.placeholder.com/375x180.jpg/EFADBA"
		}
	};

	const products = {
		id: 5,
		heading: "Like what we are doing? Shop now!",
		products: [
			{
				label: 'Slide 1',
				title: 'Bronzing Face Drops',
				productId: 4543113265187,
				comparePrice: '$44.90',
				price: '$134.90',
				srcSet: 'https://via.placeholder.com/540x540',
				src: 'https://via.placeholder.com/243x243',
				badgeText: 'New',
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
				label: 'Slide 2',
				title: 'Sunny Honey Bali Bronzing Foam',
				productId: 4543113265187,
				comparePrice: '$144.90',
				price: '$134.90',
				srcSet: 'https://via.placeholder.com/540x540',
				src: 'https://via.placeholder.com/243x243',
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
				srcSet: 'https://via.placeholder.com/540x540',
				src: 'https://via.placeholder.com/243x243',
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
				srcSet: 'https://via.placeholder.com/540x540',
				src: 'https://via.placeholder.com/243x243',
				variants: {
					nodes: [
						{ sku: 'CE0000072020' }
					]
				}
			},
			{
				label: 'Slide 1',
				title: 'Bronzing Face Drops',
				productId: 4543113265187,
				comparePrice: '$44.90',
				price: '$134.90',
				srcSet: 'https://via.placeholder.com/540x540',
				src: 'https://via.placeholder.com/243x243',
				badgeText: 'New',
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
				label: 'Slide 2',
				title: 'Sunny Honey Bali Bronzing Foam',
				productId: 4543113265187,
				comparePrice: '$144.90',
				price: '$134.90',
				srcSet: 'https://via.placeholder.com/540x540',
				src: 'https://via.placeholder.com/243x243',
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
		]
	};

	useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
		<>
			<Header toggleCart={toggleCart}
				annBar={annBar}
				timerBar={timerBar}
				mainMenu={mainMenu}
				megaMenu={megaMenu}
				menuBannerQuiz={menuBannerQuiz}
				menuBannerCode={menuBannerCode}
				dummy={true} />
        	<Sustainability
				banner={banner}
				intro={intro}
				imageSlider={imageSlider}
				formula={formula}
				packaging={packaging}
				imageText={imageText}
				products={products}
				isLoading={isLoading}
				buildProductCardModel={() => null}
				store={'dev'}
				addToCart={() => null}
			/>
            <Footer
				aboutMenu={aboutMenu}
				shopMenu={shopMenu}
				helpMenu={helpMenu} />
            {/* <Cart showCart={showCart} toggleCart={toggleCart} /> */}
		</>
    );
}

export default SustainabilityTemplate;
