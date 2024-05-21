import dynamic from 'next/dynamic';
import Footer from "~/sections/Footer";
// import Header from "~/sections/Header";
import Blog from "~/templates/Blog";
// import Cart from "~/components/cart/cart";
import { useEffect, useState } from 'react';
import { annBar, megaMenu, mainMenu, menuBannerCode, menuBannerQuiz, shopMenu, aboutMenu, helpMenu } from '~/modules/placeholders';

const Cart = dynamic(() => import('~/components/cart/cart'), {
    ssr: false,
});
const Header = dynamic(() => import('~/sections/Header'), {
    ssr: false,
});

const BlogTemplate = () => {
	const [showCart, setShowCart] = useState(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const postData = [
		{
			"id": 698,
			"img": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/2e79a990-e61d-4e24-de22-eda803380e00/public",
			"srcSet": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/2e79a990-e61d-4e24-de22-eda803380e00/public",
			"title": "The Power of SPF Primers",
			"description": "<p><span style=\"font-weight: 400;\">Stop rushing your routine by multitasking your morning! Update test 3</span></p>",
			"tags": [
				"suncare",
				"tan"
			]
		},
		{
			"id": 738,
			"img": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/e71032b6-dd48-452d-6ac5-4519c7f3ec00/public",
			"srcSet": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/e71032b6-dd48-452d-6ac5-4519c7f3ec00/public",
			"title": "Why You Need This Skin Perfecting Sunscreen in Your Summer Routine",
			"description": "<p>Prime, protect and radiate with this season's hottest must-have!</p>",
			"tags": [
				"suncare",
				"skin"
			]
		},
		{
			"id": 711,
			"img": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/582fc45e-d8d3-40fb-c89a-b7c0edc85800/public",
			"srcSet": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/582fc45e-d8d3-40fb-c89a-b7c0edc85800/public",
			"title": "Effortless Hair and Skin Care for Glowtrotters",
			"description": "<p>Maintain your glow anywhere, anytime!</p>",
			"tags": [
				"body",
				"hair",
				"suncare",
				"tan",
				"skin"
			]
		}
	]

	const popularArticles = [
		{
			"id": 710,
			"title": "Black Friday Beauty Deals from Coco & Eve - Your Black Friday Beauty Guide",
			"desc": "<p><em>Are you ready for our BIGGEST sale of the year!?</em></p>",
			"src": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/129400e6-41df-47da-471f-e89e3926a900/public"
		},
		{
			"id": 729,
			"title": "How to Apply Coconut Oil to Your Hair The Right Way",
			"desc": "<p>*healthy&nbsp;hair has just entered the chat*</p>",
			"src": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/dcdcb41c-2ec8-4474-d2d8-63bb4c193000/public"
		},
		{
			"id": 359,
			"title": "How to Shower For A Longer Fake Tan",
			"desc": "<p><em>Nail your post-tan care routine with these golden rules ✨</em></p>",
			"src": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/f64192b5-f313-47bf-dbeb-c9b4d5311000/public"
		}
	];

	const articles = [
		{
			"id": 795,
			"img": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/12de1972-c26b-4729-6201-e25c57b37f00/public",
			"srcSet": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/12de1972-c26b-4729-6201-e25c57b37f00/public",
			"title": "6 Reasons Your Skin’s Still Dry After Moisturising (and How to Fix It!)",
			"description": "<p dir=\"ltr\">Unveil the secret to truly hydrated skin!</p>",
			"tags": [
				"body"
			]
		},
		{
			"id": 790,
			"img": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/4b584170-3a12-46df-dde7-e9f9b3874e00/public",
			"srcSet": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/4b584170-3a12-46df-dde7-e9f9b3874e00/public",
			"title": "Is Blow Drying Bad for Your Hair? Everything You Need to Know",
			"description": "<p>Untangle the blow-drying dilemma!</p>",
			"tags": [
				"hair"
			]
		},
		{
			"id": 782,
			"img": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/e21ddd34-ce52-4e77-75aa-5efce6447a00/public",
			"srcSet": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/e21ddd34-ce52-4e77-75aa-5efce6447a00/public",
			"title": "Why Coconut Extract is the IT Ingredient Your Haircare Routine Needs",
			"description": "<p>Discover the UPGRADE to Coconut Oil</p>",
			"tags": [
				"hair"
			]
		},
		{
			"id": 780,
			"img": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/c513d843-e71b-458c-d3d9-b625f6992700/public",
			"srcSet": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/c513d843-e71b-458c-d3d9-b625f6992700/public",
			"title": "How to Deep Condition Hair to Ditch Winter Dryness and Frizz",
			"description": "<p>Strands feeling dry as a cactus &ndash; and looking just as rough?</p>",
			"tags": [
				"hair"
			]
		},
		{
			"id": 778,
			"img": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/d5f3c455-39a8-4c9f-0064-ec0eafacf400/public",
			"srcSet": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/d5f3c455-39a8-4c9f-0064-ec0eafacf400/public",
			"title": "How to Get a Flawless Faux Tan That Lasts Through Party Season and Beyond",
			"description": "<p>Discover the holy grail for a holiday glow!</p>",
			"tags": [
				"tan"
			]
		},
		{
			"id": 774,
			"img": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/160526e5-a0cc-45f5-7dbd-4897e1c2c100/public",
			"srcSet": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/160526e5-a0cc-45f5-7dbd-4897e1c2c100/public",
			"title": "Winter Dandruff: Tips and Natural Remedies for Dandruff",
			"description": "<p>It's time to bid adieu to dandruff!</p>",
			"tags": [
				"hair"
			]
		},
		{
			"id": 772,
			"img": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/de367571-6cd9-4448-924a-5243862bbf00/public",
			"srcSet": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/de367571-6cd9-4448-924a-5243862bbf00/public",
			"title": "1 Sold Every Minute! It’s Called Miracle Hair Elixir for a Reason",
			"description": "<p>Discover why this hair oil is a routine staple!</p>",
			"tags": [
				"hair"
			]
		},
		{
			"id": 766,
			"img": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/6ca7989b-d9b9-4033-0afc-5e22d3a28d00/public",
			"srcSet": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/6ca7989b-d9b9-4033-0afc-5e22d3a28d00/public",
			"title": "5 Common Scalp Issues that Could be Causing You Hair Drama",
			"description": "<p>It's time to get to the bottom of your stressed tresses!</p>",
			"tags": [
				"hair"
			]
		},
		{
			"id": 764,
			"img": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/f20f3e17-b09b-44eb-eb08-27f15656e200/public",
			"srcSet": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/f20f3e17-b09b-44eb-eb08-27f15656e200/public",
			"title": "Our Milky Toner Is the Glowy Skin Secret You Need To Know!",
			"description": "<p><span data-sanitized-data-mce-fragment=\"1\">&nbsp;Even&nbsp;</span><span data-sanitized-data-mce-fragment=\"1\">e</span><span data-sanitized-data-mce-fragment=\"1\">xperts&nbsp;</span><span data-sanitized-data-mce-fragment=\"1\">r</span><span data-sanitized-data-mce-fragment=\"1\">ave about&nbsp;</span><span data-sanitized-data-mce-fragment=\"1\">i</span><span data-sanitized-data-mce-fragment=\"1\">t!</span></p>",
			"tags": [
				"skin"
			]
		}
	]

	const videoData = [
        {
            label: 'Slide 1',
            title: '5 things you’re doing wrong with your hair care routine',
            srcSet: 'https://via.placeholder.com/375x340.jpg/EFADBA',
            src: 'https://via.placeholder.com/375x340.jpg/EFADBA',
            tags: ['TAN', 'NEW'],
        },
        {
            label: 'Slide 2',
            title: '5 things you’re doing wrong with your hair care routine',
            srcSet: 'https://via.placeholder.com/375x340.jpg/EFADBA',
            src: 'https://via.placeholder.com/375x340.jpg/EFADBA',
            tags: ['HAIR', 'HOT'],
        },
        {
            label: 'Slide 3',
            title: '5 things you’re doing wrong with your hair care routine',
            srcSet: 'https://via.placeholder.com/375x340.jpg/EFADBA',
            src: 'https://via.placeholder.com/375x340.jpg/EFADBA',
            tags: ['BODY', 'FEATURED'],
        }
    ];

    const toggleCart = () => {
		setShowCart(!showCart);
	}

	useEffect(() => {
        setIsLoading(false);
    }, []);

	return (
		<>
			<Header toggleCart={toggleCart}
				annBar={annBar}
				mainMenu={mainMenu}
				megaMenu={megaMenu}
				menuBannerQuiz={menuBannerQuiz}
				menuBannerCode={menuBannerCode}
				dummy={true} />
			<Blog isLoading={isLoading} postData={postData} popularArticles={popularArticles} articles={articles} videoData={videoData} tag="all" />
			{/* <Cart showCart={showCart} toggleCart={toggleCart} /> */}
			<Footer
				aboutMenu={aboutMenu}
				shopMenu={shopMenu}
				helpMenu={helpMenu} />
		</>
	);
};

export default BlogTemplate;
