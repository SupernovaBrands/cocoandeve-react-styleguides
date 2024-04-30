import dynamic from 'next/dynamic';
import Footer from '~/sections/Footer';
import Collection from '~/templates/Collection';
import Service from "~/sections/Service";
import { useEffect, useState } from 'react';
import { annBar, megaMenu, mainMenu, menuBannerCode, menuBannerQuiz, shopMenu, aboutMenu, helpMenu } from '~/modules/placeholders';
const Cart = dynamic(() => import('~/components/cart/cart'), {
    ssr: false,
});
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

	const universalBanner = {
		__component: "collection.universal-collection-setting",
		id: 1,
		filter_handles_img_url_dev: "/collections",
		filter_handles_img_url_us: "/collections",
		filter_handles_img_url_au: "/collections",
		filter_handles_img_url_ca: "/collections",
		filter_handles_img_url_uk: "/collections",
		filter_handles_img_url_int: "/collections",
		filter_handles_img_url_my: "/collections",
		filter_handles_img_url_eu: "/collections",
		filter_handles_img_url_fr: "/collections",
		filter_handles_img_url_de: "/collections",
		universalCollectionSetting: {
			universalCollectionSetting: {
				dev: {
					enabled: true,
					filter_handles_img_mob: {
						alt: "231114_BF_NO ROUNDEL_COLL_MOBILE.jpg",
						url: "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/88806511-9eb3-4207-abc5-7de8122fec00/public"
					},
					filter_handles_img_url: "/collections/all",
					filter_handles_img_desk: {
						alt: "231114_BF_NO ROUNDEL_COLL_DESK.jpg",
						url: "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/f2d46c74-1109-46c2-7195-2329b08fa700/public"
					}
				}
			}
		},
		enabled_banner_dev: null,
		enabled_banner_ca: null,
		enabled_banner_us: null,
		enabled_banner_uk: null,
		enabled_banner_eu: null,
		enabled_banner_au: null,
		enabled_banner_int: null,
		enabled_banner_my: null,
		filter_handles_img_desk_dev: {
			id: 5366,
			url: "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/ff33403d-41ff-4a78-ce08-f4bf1ebc7800/public"
		},
		filter_handles_img_mob_dev: {
			id: 5365,
			url: "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/768884a9-4d4c-4e95-a830-fb5a718a4800/public"
		}
	};

	const mainBanner = {
		__component: "collection.hair-range-collection-setting",
		id: 2,
		range_handles: "shampoo-conditioner,treatments,hair-styling,hair-accessories",
		filter_handles_img_url_dev: "/products/pro-youth-shampoo-conditioner",
		filter_handles_img_url_us: "/collections",
		filter_handles_img_url_au: "/collections",
		filter_handles_img_url_ca: "/collections",
		filter_handles_img_url_uk: "/collections",
		filter_handles_img_url_int: "/collections",
		filter_handles_img_url_my: "/collections",
		filter_handles_img_url_eu: "/collections",
		filter_handles_img_url_fr: "/collections",
		filter_handles_img_url_de: "/collections",
		collectionBanner: {
			collectionBanner: {
				dev: {
					url: "/collections/all",
					enabled: false,
					handles: "",
					img_mob: {
						alt: "acf.230629_-Age-Defying-Results_-Collection-Mob.jpg",
						url: "https://via.placeholder.com/828x442"
					},
					img_desk: {
						alt: "acf.230629_-Age-Defying-Results-Collection-Desk.jpg",
						url: "https://via.placeholder.com/1920x372"
					}
				}
		  }
		},
		enabled_banner_dev: null,
		enabled_banner_ca: null,
		enabled_banner_us: null,
		enabled_banner_uk: null,
		enabled_banner_eu: null,
		enabled_banner_au: null,
		enabled_banner_int: null,
		enabled_banner_my: null,
		filter_handles_img_desk_dev: {
			id: 5268,
			url: "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/6376c79b-6d30-467f-2987-74dc28723b00/public"
		},
		filter_handles_img_mob_dev: {
			id: 5269,
			url: "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/5433412a-3703-4ddf-cac4-8bed96ec4900/public"
		}
	};

	const about = {
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
				store={'dev'}
				mainSettings={[]}
				universalBanner={universalBanner}
				products={products}
				about={about}
				mainCollections={mainCollections}
				handle={'tan-and-spf'}
				preview={''}
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
