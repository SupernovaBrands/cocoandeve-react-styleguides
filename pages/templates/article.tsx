import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
// import Header from '~/sections/Header';
import Article from '~/templates/Article';
import Footer from '~/sections/Footer';
import { timerBar, annBar, megaMenu, mainMenu, menuBannerCode, menuBannerQuiz, shopMenu, aboutMenu, helpMenu } from '~/modules/placeholders';
// import Cart from "~/components/cart/cart";
const Cart = dynamic(() => import('~/components/cart/cart'), {
    ssr: false,
});
const Header = dynamic(() => import('~/sections/Header'), {
    ssr: false,
});

const ArticleTemplate = () => {
	const [showCart, setShowCart] = useState(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

    const toggleCart = () => {
		setShowCart(!showCart);
	}

	const content = {
		"id": 698,
		"title": "The Power of SPF Primers",
		"handle": "how-to-apply-primer",
		"blog_handle": "news",
		"createdAt": null,
		"updatedAt": "2024-02-19T04:55:11.535Z",
		"content": "<div style=\"text-align: center;\">&nbsp;</div>\n<p><span style=\"font-weight: 400;\">Are you exhausted from layering an array of skincare and makeup products? Say goodbye to the hassle and embrace the solution: SPF primers. It's time to revolutionise your morning routine and bid farewell to rushed moments. Introducing our game-changing NEW <a href=\"https://www.cocoandeve.com/products/daily-radiance-primer-spf50\">Daily Radiance Primer SPF 50 </a></span><a href=\"https://www.cocoandeve.com/products/daily-radiance-primer-spf50\"><span style=\"font-weight: 400;\">Sunscreen</span></a><span style=\"font-weight: 400;\">, a must-have addition that will transform the way you prepare for the day ahead.</span></p>\n<div class=\"article-new-banner\">&nbsp;</div>\n<h2 style=\"text-align: left;\">&nbsp;</h2>\n<h2 style=\"text-align: left;\"><em><span style=\"color: #134f5c;\">What is a SPF primer?</span></em></h2>\n<p><span style=\"font-weight: 400;\">Discover the transformative power of SPF primers&mdash;a beauty secret that will revolutionise your skincare and makeup routine. We all know that SPF is an absolute must, a non-negotiable step in our daily regimen to safeguard our skin from the damaging effects of UV rays. But let's face it, diligently applying SPF can sometimes feel like a monotonous chore, especially when compared to the excitement of perfecting our makeup.</span></p>\n<p>That's where SPF primers swoop in to save the day. These remarkable multitaskers not only provide essential protection against those dreaded UV rays, but they also boast an array of benefits that go above and beyond. They effortlessly double up as the perfect base for your face, creating an ultra-smooth canvas for your foundation and other products to glide on with ease and precision. The result? A flawless, airbrushed finish that enhances your natural beauty.</p>\n<p style=\"text-align: left;\"><a href=\"https://bit.ly/CE-DPRhowtoDPRproduct-shoppdp\"><img style=\"margin-right: auto; margin-left: auto; float: none; display: block;\" src=\"https://cdn.shopify.com/s/files/1/0286/1327/9779/files/BENEFITS_UK_1_600x600.jpg?v=1689318990\" alt=\"Benefits of Coco and Eve Daily Radiance Primer SPF 50\"></a></p>\n<p><span style=\"font-weight: 400;\">With the introduction of our <a href=\"https://www.cocoandeve.com/products/daily-radiance-primer-spf50\">Daily Radiance Primer SPF 50 </a></span><a href=\"https://www.cocoandeve.com/products/daily-radiance-primer-spf50\"><span style=\"font-weight: 400;\">Sunscreen</span></a><span style=\"font-weight: 400;\">, you can simplify your beauty arsenal and embark on a new era of radiant, protected skin. Prepare to be amazed as the rich, velvety texture of our primer effortlessly melts into your skin, leaving behind a luminous, dewy glow that lasts throughout the day. Its lightweight, non-greasy formula ensures comfortable wear, allowing your skin to breathe while maintaining its natural radiance. Enriched with a carefully curated combination of skin-loving ingredients, our Daily Radiance Primer takes skin defence to the next level.</span></p>\n<p>&nbsp;</p>\n<div style=\"text-align: center;\"><a href=\"https://bit.ly/CE-DPRhowtoDPRba-shoppdp\"><img style=\"margin-right: -5.5px; float: none;\" src=\"https://cdn.shopify.com/s/files/1/0286/1327/9779/files/isabella_c9ca15a6-1553-4431-839b-41840c177bb6_600x600.jpg?v=1689298464\" alt=\"Customer testimonial for Coco and Eve Daily Radiance Primer SPF 50 Sunscreen from Isabella\"></a></div>\n<p><a href=\"https://bit.ly/CE-DPRhowtoDPRba-shoppdp\"> </a></p>\n<p>&nbsp;</p>\n<h2><span style=\"color: #134f5c;\"><em>How do SPF primers work?&nbsp;</em></span></h2>\n<p><span style=\"font-weight: 400;\">Curious about how SPF primers work their magic? Let's dive into the intricacies behind this remarkable multitasker. We've poured great care into formulating our Daily Radiance Primer SPF 50 </span><span style=\"font-weight: 400;\">Sunscreen</span><span style=\"font-weight: 400;\"> to address multiple concerns and streamline your morning routine.</span></p>\n<p><span style=\"font-weight: 400;\">When it comes to sun protection, a broad spectrum coverage formula is your skin's best friend. While shielding yourself from sunburns and the risk of melanoma and other forms of skin cancer caused by UVB rays is crucial, it's equally important to combat sun-induced ageing. That's where broad spectrum coverage comes in. Our <a href=\"https://www.cocoandeve.com/products/daily-radiance-primer-spf50\">Daily Radiance Primer SPF 50 </a></span><a href=\"https://www.cocoandeve.com/products/daily-radiance-primer-spf50\"><span style=\"font-weight: 400;\">Sunscreen</span></a><span style=\"font-weight: 400;\"> provides comprehensive protection against both UVA and UVB rays, ensuring you preserve that coveted youthful glow.</span></p>\n<div id=\"newsletterWrapper\"></div>\n<p><span style=\"font-weight: 400;\">But the benefits don't stop there. By incorporating skin-loving ingredients like Niacinamide and Antioxidants into our SPF primer, we've created a caring formula that doesn&rsquo;t just protect, but also nourishes skin. Niacinamide, hailed as a game-changer in the skincare world, boasts an impressive array of benefits. It minimises the appearance of enlarged pores, evens out skin tone, reduces the visibility of fine lines and wrinkles and banishes dullness. With Niacinamide as a key ingredient, our primer empowers you to protect, perfect and illuminate your skin all in one glorious step.</span></p>\n<p>But that's not all&mdash;our primer goes the extra mile by incorporating antioxidative properties from Vita TE' to soothe inflammation and Vita Ray-Immune to shield against environmental stressors and blue light. With this carefully crafted blend of ingredients, you can trust that our primer provides a comprehensive shield for your skin while infusing it with the nourishment it deserves.</p>\n<p><a href=\"https://bit.ly/CE-DPRhowtoDPRproduct-shoppdp\"><img style=\"margin-right: auto; float: none; display: block; margin-left: auto;\" src=\"https://cdn.shopify.com/s/files/1/0286/1327/9779/files/HOW_TO_USE_886c018c-7b3d-4e7f-b4c2-b10f28d4bb7b_600x600.jpg?v=1689237995\" alt=\"How to use Coco and Eve Daily Radiance Primer SPF 50 Sunscreen\"></a></p>\n<h2><em><span style=\"color: #134f5c;\">How to use SPF Primers<br></span></em></h2>\n<p><span style=\"font-weight: 400;\">Mastering the art of applying SPF primers is easier than you think. We've uncovered the secret to achieving protected and perfected skin and it all comes down to finding the sweet spot in your skincare routine, right before and after applying our Daily Radiance Primer.</span></p>\n<p>Here's your game plan for achieving a flawless canvas: After moisturising, give your skin a precious two minutes to fully absorb and reap the benefits. Then, introduce the star of the show&mdash;our <a href=\"https://www.cocoandeve.com/products/daily-radiance-primer-spf50\">Daily Radiance Primer</a>. Apply it as the final step of your skincare routine, allowing it to fully absorb for a minute. This crucial step ensures that your primer works its magic and sets the stage for your makeup masterpiece. Trust us; this brief waiting time will yield remarkable results in your final look.</p>\n<p>Here's a pro-tip just for you: With the stunning glow our primer imparts, you can confidently skip the illuminator altogether. Our beauty powerhouse does it all, illuminating your skin effortlessly.</p>\n<p><a href=\"https://bit.ly/CE-DPRhowtoDPRba-shoppdp\"><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://cdn.shopify.com/s/files/1/0286/1327/9779/files/Jey_18237da8-f1c4-47c8-8710-049181f48306_600x600.jpg?v=1689220353\" alt=\"Customer testimonial for Coco and Eve Daily Radiance Primer SPF 50 Sunscreen from Jey\"></a></p>\n<h2><em><span style=\"color: #134f5c;\">Final Thoughts</span></em></h2>\n<p><span style=\"font-weight: 400;\">With that said, here&rsquo;s a quick recap. Our <a href=\"https://www.cocoandeve.com/products/daily-radiance-primer-spf50\">Daily Radiance Primer SPF 50 </a></span><a href=\"https://www.cocoandeve.com/products/daily-radiance-primer-spf50\"><span style=\"font-weight: 400;\">Sunscreen</span></a><span style=\"font-weight: 400;\"> is the perfect way to protect your skin from the sun and create a flawless makeup base. It's lightweight, non-greasy and absorbs quickly, so you can be sure that your skin will be protected and your makeup will look its best. So what are you waiting for? Add this multi-tasking hero to your routine today and start enjoying the benefits of protected and perfected skin!</span></p>\n<div style=\"text-align: center;\">&nbsp;</div>\n<p>&nbsp;</p>\n<div class=\"article-new-banner\">&nbsp;</div>\n<p>&nbsp;</p>\n<p><span style=\"color: #e06666;\">Written By: Pip Jarvis&nbsp;<br><br>Edited by:&nbsp;Iris</span></p>\n<p>&nbsp;</p>\n<p><span style=\"color: #e06666;\"><a title=\"Return to Home\" href=\"https://www.cocoandeve.com/\" target=\"_blank\" rel=\"noopener noreferrer\">Done reading? Return to Home.</a><a style=\"color: #e06666;\" title=\"Return to Home\" href=\"https://www.cocoandeve.com/\"><br></a></span></p>",
		"author": "Iris George",
		"tags": "suncare, tan",
		"summary_html": "<p><span style=\"font-weight: 400;\">Stop rushing your routine by multitasking your morning! Update test 3</span></p>",
		"locale": "en",
		"storePreview": true,
		"vuid": "658ee1ff-1424-4658-b8ed-4572bee01f89",
		"contentTypeLabel": "The Power of SPF Primers - DEV",
		"mainId": "646",
		"isVisibleInListView": false,
		"BlogContentMultiStores": {
			"dev": {
				"body_content": "<div style=\"text-align: center;\">&nbsp;</div>\n<p><span style=\"font-weight: 400;\">Are you exhausted from layering an array of skincare and makeup products? Say goodbye to the hassle and embrace the solution: SPF primers. It's time to revolutionise your morning routine and bid farewell to rushed moments. Introducing our game-changing NEW <a href=\"https://www.cocoandeve.com/products/daily-radiance-primer-spf50\">Daily Radiance Primer SPF 50 </a></span><a href=\"https://www.cocoandeve.com/products/daily-radiance-primer-spf50\"><span style=\"font-weight: 400;\">Sunscreen</span></a><span style=\"font-weight: 400;\">, a must-have addition that will transform the way you prepare for the day ahead.</span></p>\n<div class=\"article-new-banner\">&nbsp;</div>\n<h2 style=\"text-align: left;\">&nbsp;</h2>\n<h2 style=\"text-align: left;\"><em><span style=\"color: #134f5c;\">What is a SPF primer?</span></em></h2>\n<p><span style=\"font-weight: 400;\">Discover the transformative power of SPF primers&mdash;a beauty secret that will revolutionise your skincare and makeup routine. We all know that SPF is an absolute must, a non-negotiable step in our daily regimen to safeguard our skin from the damaging effects of UV rays. But let's face it, diligently applying SPF can sometimes feel like a monotonous chore, especially when compared to the excitement of perfecting our makeup.</span></p>\n<p>That's where SPF primers swoop in to save the day. These remarkable multitaskers not only provide essential protection against those dreaded UV rays, but they also boast an array of benefits that go above and beyond. They effortlessly double up as the perfect base for your face, creating an ultra-smooth canvas for your foundation and other products to glide on with ease and precision. The result? A flawless, airbrushed finish that enhances your natural beauty.</p>\n<p style=\"text-align: left;\"><a href=\"https://bit.ly/CE-DPRhowtoDPRproduct-shoppdp\"><img style=\"margin-right: auto; margin-left: auto; float: none; display: block;\" src=\"https://cdn.shopify.com/s/files/1/0286/1327/9779/files/BENEFITS_UK_1_600x600.jpg?v=1689318990\" alt=\"Benefits of Coco and Eve Daily Radiance Primer SPF 50\"></a></p>\n<p><span style=\"font-weight: 400;\">With the introduction of our <a href=\"https://www.cocoandeve.com/products/daily-radiance-primer-spf50\">Daily Radiance Primer SPF 50 </a></span><a href=\"https://www.cocoandeve.com/products/daily-radiance-primer-spf50\"><span style=\"font-weight: 400;\">Sunscreen</span></a><span style=\"font-weight: 400;\">, you can simplify your beauty arsenal and embark on a new era of radiant, protected skin. Prepare to be amazed as the rich, velvety texture of our primer effortlessly melts into your skin, leaving behind a luminous, dewy glow that lasts throughout the day. Its lightweight, non-greasy formula ensures comfortable wear, allowing your skin to breathe while maintaining its natural radiance. Enriched with a carefully curated combination of skin-loving ingredients, our Daily Radiance Primer takes skin defence to the next level.</span></p>\n<p>&nbsp;</p>\n<div style=\"text-align: center;\"><a href=\"https://bit.ly/CE-DPRhowtoDPRba-shoppdp\"><img style=\"margin-right: -5.5px; float: none;\" src=\"https://cdn.shopify.com/s/files/1/0286/1327/9779/files/isabella_c9ca15a6-1553-4431-839b-41840c177bb6_600x600.jpg?v=1689298464\" alt=\"Customer testimonial for Coco and Eve Daily Radiance Primer SPF 50 Sunscreen from Isabella\"></a></div>\n<p><a href=\"https://bit.ly/CE-DPRhowtoDPRba-shoppdp\"> </a></p>\n<p>&nbsp;</p>\n<h2><span style=\"color: #134f5c;\"><em>How do SPF primers work?&nbsp;</em></span></h2>\n<p><span style=\"font-weight: 400;\">Curious about how SPF primers work their magic? Let's dive into the intricacies behind this remarkable multitasker. We've poured great care into formulating our Daily Radiance Primer SPF 50 </span><span style=\"font-weight: 400;\">Sunscreen</span><span style=\"font-weight: 400;\"> to address multiple concerns and streamline your morning routine.</span></p>\n<p><span style=\"font-weight: 400;\">When it comes to sun protection, a broad spectrum coverage formula is your skin's best friend. While shielding yourself from sunburns and the risk of melanoma and other forms of skin cancer caused by UVB rays is crucial, it's equally important to combat sun-induced ageing. That's where broad spectrum coverage comes in. Our <a href=\"https://www.cocoandeve.com/products/daily-radiance-primer-spf50\">Daily Radiance Primer SPF 50 </a></span><a href=\"https://www.cocoandeve.com/products/daily-radiance-primer-spf50\"><span style=\"font-weight: 400;\">Sunscreen</span></a><span style=\"font-weight: 400;\"> provides comprehensive protection against both UVA and UVB rays, ensuring you preserve that coveted youthful glow.</span></p>\n<div id=\"newsletterWrapper\"></div>\n<p><span style=\"font-weight: 400;\">But the benefits don't stop there. By incorporating skin-loving ingredients like Niacinamide and Antioxidants into our SPF primer, we've created a caring formula that doesn&rsquo;t just protect, but also nourishes skin. Niacinamide, hailed as a game-changer in the skincare world, boasts an impressive array of benefits. It minimises the appearance of enlarged pores, evens out skin tone, reduces the visibility of fine lines and wrinkles and banishes dullness. With Niacinamide as a key ingredient, our primer empowers you to protect, perfect and illuminate your skin all in one glorious step.</span></p>\n<p>But that's not all&mdash;our primer goes the extra mile by incorporating antioxidative properties from Vita TE' to soothe inflammation and Vita Ray-Immune to shield against environmental stressors and blue light. With this carefully crafted blend of ingredients, you can trust that our primer provides a comprehensive shield for your skin while infusing it with the nourishment it deserves.</p>\n<p><a href=\"https://bit.ly/CE-DPRhowtoDPRproduct-shoppdp\"><img style=\"margin-right: auto; float: none; display: block; margin-left: auto;\" src=\"https://cdn.shopify.com/s/files/1/0286/1327/9779/files/HOW_TO_USE_886c018c-7b3d-4e7f-b4c2-b10f28d4bb7b_600x600.jpg?v=1689237995\" alt=\"How to use Coco and Eve Daily Radiance Primer SPF 50 Sunscreen\"></a></p>\n<h2><em><span style=\"color: #134f5c;\">How to use SPF Primers<br></span></em></h2>\n<p><span style=\"font-weight: 400;\">Mastering the art of applying SPF primers is easier than you think. We've uncovered the secret to achieving protected and perfected skin and it all comes down to finding the sweet spot in your skincare routine, right before and after applying our Daily Radiance Primer.</span></p>\n<p>Here's your game plan for achieving a flawless canvas: After moisturising, give your skin a precious two minutes to fully absorb and reap the benefits. Then, introduce the star of the show&mdash;our <a href=\"https://www.cocoandeve.com/products/daily-radiance-primer-spf50\">Daily Radiance Primer</a>. Apply it as the final step of your skincare routine, allowing it to fully absorb for a minute. This crucial step ensures that your primer works its magic and sets the stage for your makeup masterpiece. Trust us; this brief waiting time will yield remarkable results in your final look.</p>\n<p>Here's a pro-tip just for you: With the stunning glow our primer imparts, you can confidently skip the illuminator altogether. Our beauty powerhouse does it all, illuminating your skin effortlessly.</p>\n<p><a href=\"https://bit.ly/CE-DPRhowtoDPRba-shoppdp\"><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://cdn.shopify.com/s/files/1/0286/1327/9779/files/Jey_18237da8-f1c4-47c8-8710-049181f48306_600x600.jpg?v=1689220353\" alt=\"Customer testimonial for Coco and Eve Daily Radiance Primer SPF 50 Sunscreen from Jey\"></a></p>\n<h2><em><span style=\"color: #134f5c;\">Final Thoughts</span></em></h2>\n<p><span style=\"font-weight: 400;\">With that said, here&rsquo;s a quick recap. Our <a href=\"https://www.cocoandeve.com/products/daily-radiance-primer-spf50\">Daily Radiance Primer SPF 50 </a></span><a href=\"https://www.cocoandeve.com/products/daily-radiance-primer-spf50\"><span style=\"font-weight: 400;\">Sunscreen</span></a><span style=\"font-weight: 400;\"> is the perfect way to protect your skin from the sun and create a flawless makeup base. It's lightweight, non-greasy and absorbs quickly, so you can be sure that your skin will be protected and your makeup will look its best. So what are you waiting for? Add this multi-tasking hero to your routine today and start enjoying the benefits of protected and perfected skin!</span></p>\n<div style=\"text-align: center;\">&nbsp;</div>\n<p>&nbsp;</p>\n<div class=\"article-new-banner\">&nbsp;</div>\n<p>&nbsp;</p>\n<p><span style=\"color: #e06666;\">Written By: Pip Jarvis&nbsp;<br><br>Edited by:&nbsp;Iris</span></p>\n<p>&nbsp;</p>\n<p><span style=\"color: #e06666;\"><a title=\"Return to Home\" href=\"https://www.cocoandeve.com/\" target=\"_blank\" rel=\"noopener noreferrer\">Done reading? Return to Home.</a><a style=\"color: #e06666;\" title=\"Return to Home\" href=\"https://www.cocoandeve.com/\"><br></a></span></p>",
				"featured_image": {
					"alt": "Feature-DRP-Why-you-need-it.jpg",
					"url": "/ghVX8djKS3R8-n0oGeWHEA/2e79a990-e61d-4e24-de22-eda803380e00/public"
				}
			}
		},
		"subtitle": null,
		"quick_links": null,
		"shopifyCreated": null,
		"localizations": [],
		"upsells": null,
		"image": {
			"id": 5227,
			"url": "/ghVX8djKS3R8-n0oGeWHEA/91cf9e38-2221-4ce0-165b-60621b146700/public",
			"alternativeText": null
		},
		"seo": {
			"id": 1791,
			"page_title": "How to Apply Primer for Best Results | Coco & Eve",
			"meta_desc": "Mastering the art of applying SPF primers. The secret lies in finding the sweet spot in your skincare routine, right before and after applying your primer. Read on to find out more!"
		}
	}

	const postNewsletter = {
		"id": 27,
		"blog_ns_title": "The repository for all things Coco & Eve!",
		"blog_ns_desc": "We share expert tips, hacks, and blog-exclusive deals you’d definitely not want to miss! ",
		"blog_ns_note": "Receive exclusive offers via email/SMS, for more information see our <a href=\"/pages/privacy-policy\">Privacy Policy</a>.",
		"blog_ns_email": "Enter your email",
		"blog_ns_btn": "Sign Me Up!",
		"blog_ns_success": "Thanks! We've got your email!",
		"blog_ns_disc": null,
		"post_newsletter_enabled": true,
		"blog_ns_image_desk": {
			"id": 968,
			"url": "/ghVX8djKS3R8-n0oGeWHEA/d9111994-4df4-425d-23f8-7bfa47a10500/public"
		},
		"blog_ns_image_mob": {
			"id": 968,
			"url": "/ghVX8djKS3R8-n0oGeWHEA/d9111994-4df4-425d-23f8-7bfa47a10500/public"
		}
	}

	const popularArticles = [
		{
			"id": 710,
			"link": "/blogs/news/black-friday-cyber-monday-beauty-deals",
			"title": "Black Friday Beauty Deals from Coco & Eve - Your Black Friday Beauty Guide",
			"desc": "<p>Are you ready for our BIGGEST sale of the year!?</p>",
			"src": "/ghVX8djKS3R8-n0oGeWHEA/129400e6-41df-47da-471f-e89e3926a900/192x",
			"srcSet": "/ghVX8djKS3R8-n0oGeWHEA/129400e6-41df-47da-471f-e89e3926a900/192x"
		},
		{
			"id": 729,
			"link": "/blogs/news/putting-coconut-oil-in-hair",
			"title": "How to Apply Coconut Oil to Your Hair The Right Way",
			"desc": "<p>*healthy&nbsp;hair has just entered the chat*</p>",
			"src": "/ghVX8djKS3R8-n0oGeWHEA/dcdcb41c-2ec8-4474-d2d8-63bb4c193000/192x",
			"srcSet": "/ghVX8djKS3R8-n0oGeWHEA/dcdcb41c-2ec8-4474-d2d8-63bb4c193000/192x"
		},
		{
			"id": 359,
			"link": "/blogs/news/how-to-shower-for-a-longer-fake-tan",
			"title": "How to Shower For A Longer Fake Tan",
			"desc": "<p>Nail your post-tan care routine with these golden rules ✨</p>",
			"src": "/ghVX8djKS3R8-n0oGeWHEA/f64192b5-f313-47bf-dbeb-c9b4d5311000/192x",
			"srcSet": "/ghVX8djKS3R8-n0oGeWHEA/f64192b5-f313-47bf-dbeb-c9b4d5311000/192x"
		},
		{
			"id": 704,
			"link": "/blogs/news/detangling-matted-hair",
			"title": "How to Detangle Matted Hair",
			"desc": "<p>Hellooo gorgeous, gorgeous hair 😍</p>",
			"src": "/ghVX8djKS3R8-n0oGeWHEA/30ae607f-bd41-4537-cc08-60265a1c7400/192x",
			"srcSet": "/ghVX8djKS3R8-n0oGeWHEA/30ae607f-bd41-4537-cc08-60265a1c7400/192x"
		},
		{
			"id": 315,
			"link": "/blogs/news/sunburn-on-scalp",
			"title": "Sunburn: Don't Let It Get to Your Head",
			"desc": "<p>Soothe the burn 🧊</p>",
			"src": "/ghVX8djKS3R8-n0oGeWHEA/f6683873-2c0a-4bde-697f-127695a6ae00/192x",
			"srcSet": "/ghVX8djKS3R8-n0oGeWHEA/f6683873-2c0a-4bde-697f-127695a6ae00/192x"
		},
		{
			"id": 316,
			"link": "/blogs/news/before-after-self-tanner",
			"title": "Insider Tips for a Long Lasting Tan",
			"desc": "<p>It's all about prep and aftercare 😉</p>",
			"src": "/ghVX8djKS3R8-n0oGeWHEA/39f0526e-f175-4b2c-a4af-414bb9cb8f00/192x",
			"srcSet": "/ghVX8djKS3R8-n0oGeWHEA/39f0526e-f175-4b2c-a4af-414bb9cb8f00/192x"
		}
	]

	const recomendations = [
		{
			"handle": "/blogs/news/black-friday-cyber-monday-beauty-deals",
			"id": 738,
			"img": "/ghVX8djKS3R8-n0oGeWHEA/e71032b6-dd48-452d-6ac5-4519c7f3ec00/public",
			"srcSet": "/ghVX8djKS3R8-n0oGeWHEA/e71032b6-dd48-452d-6ac5-4519c7f3ec00/public",
			"title": "Why You Need This Skin Perfecting Sunscreen in Your Summer Routine",
			"description": "<p>Prime, protect and radiate with this season's hottest must-have!</p>",
			"tags": [
				"suncare",
				"skin"
			]
		},
		{
			"handle": "/blogs/news/black-friday-cyber-monday-beauty-deals",
			"id": 737,
			"img": "/ghVX8djKS3R8-n0oGeWHEA/f3cb2969-55f0-495c-df93-368139299100/public",
			"srcSet": "/ghVX8djKS3R8-n0oGeWHEA/f3cb2969-55f0-495c-df93-368139299100/public",
			"title": "Tried the TikTok aged filter? Here’s what to do next…",
			"description": "<p><span data-mce-fragment=\"1\">Hint: It involves a head-to-toe routine featuring our SPF powerhouses!</span></p>",
			"tags": [
				"suncare",
				"skin"
			]
		},
		{
			"handle": "/blogs/news/black-friday-cyber-monday-beauty-deals",
			"id": 677,
			"img": "/ghVX8djKS3R8-n0oGeWHEA/8cd087cf-2da0-48d8-7150-1dc4ea9ed800/public",
			"srcSet": "/ghVX8djKS3R8-n0oGeWHEA/8cd087cf-2da0-48d8-7150-1dc4ea9ed800/public",
			"title": "Beauty Gift Guide: Best Beauty Gifts and Ideas for the Holidays",
			"description": "<p>Gift-giving made easy!</p>",
			"tags": [
				"hair",
				"skin",
				"tan"
			]
		}
	]

	const postBannerInfo = {
		"enables": true,
		"blog_banner_link": "https://bit.ly/447MD6J",
		"blog_banner_title": "Just Dropped: NEW Anti-Aging Tanning Serum!",
		"blog_banner_dektop": {
			"alt": "Tanning Serum_BLOG.jpg",
			"url": "/ghVX8djKS3R8-n0oGeWHEA/2e0e3a9a-744c-4a1b-c4ed-13218d354000/public"
		},
		"blog_banner_mobile": {
			"alt": "Tanning Serum_BLOG.jpg",
			"url": "/ghVX8djKS3R8-n0oGeWHEA/2e0e3a9a-744c-4a1b-c4ed-13218d354000/public"
		}
	}

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

			<Article
				isLoading={isLoading}
				content={content}
				postNewsletter={postNewsletter}
				popularArticles={popularArticles}
				recomendations={recomendations}
				postBannerInfo={postBannerInfo}
			/>
			{/* <Cart showCart={showCart} toggleCart={toggleCart} /> */}
			<Footer
				aboutMenu={aboutMenu}
				shopMenu={shopMenu}
				helpMenu={helpMenu} />
		</>
    );
}

export default ArticleTemplate;
