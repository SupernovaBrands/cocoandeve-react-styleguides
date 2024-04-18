import dynamic from 'next/dynamic';
import Footer from "~/sections/Footer";
import OurStoryTemplate from '~/templates/OurStory';
import { annBar, megaMenu, mainMenu, menuBannerCode, menuBannerQuiz, shopMenu, aboutMenu, helpMenu } from '~/modules/placeholders';
import { useEffect, useState } from 'react';
// import Header from "~/sections/Header";
// import OurStoryTemplate from "~/sections/OurStory";
const Header = dynamic(() => import('~/sections/Header'), {
    ssr: false,
});
const OurStory = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const banner = {
		tiitle: "In a (coco) nutshell? We promise unBALIevably good hair and skin ",
		back_img: {
			id: 2832,
			url: "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/e53e1e88-4ef5-4062-58a7-0fe5ced13e00/public"
		},
		back_img_mob: {
			id: 970,
			url: "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/a210713e-e312-4cb7-4ace-d82b7ea61b00/public"
		}
	};
	const intro = {
		title: 'Our Story',
		description: '<p class="mb-g">Our story begins among the volcanic beaches and lush rainforests of Bali. Aussie expat Emily spent countless holidays exploring the Island paradise. From searching for balance in Ubud, to indulging in the best massages one day, ultra-luxe day spa visits the next, Emily always found endless inspiration – and rejuvenation – in Bali.</p><p class="mb-g">Hiking up a volcano at dawn one day, an idea took root. What if she could bottle that Bali magic, with beauty products that combined luscious tropical ingredients with serious science?</p><p>Doing some digging, Emily discovered Bali really is Eden for beauty lovers, with an endless bounty of skin-and-hair-loving fruits and plants. The jewel in the crown? Raw virgin coconuts – with Indonesia being the world’s largest producer of this nourishing, revitalising superfruit.</p><p class="mb-g">With the final seed planted and the hero ingredient chosen, Coco & Eve was born!</p>',
        description_1: 'We’re passionate about our customers, so we never use drying and damaging sulfates, phthalates or parabens, (unlike 98.9% of beauty products!). We also love our furry friends, so Coco & Eve is proudly 100% clean and cruelty-free.',
        description_2: 'Sourcing the best tropical Balinese ingredients – from coconut oil and cocoa to ripe, juicy mangoes, papayas and guava – we spent years perfecting our formulas to make sure they performed. The result is our award-winning Like A Virgin Hair Masque and Sunny Honey Bali Bronzing Foam – products that are not only gorgeous to use, but deliver incredible results for your hair, body and skin.',
        titleintro_1: 'We\'ve spent years testing, developing and perfecting our formulas',
        titleintro_2: 'We\'ve sourced only the best ingredients',
        back_img_1: {
            id: 978,
            url: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/0a194d82-efaa-420c-9af0-14d13e5da400/public'
        },
        back_img_mob_1: {
            id: 979,
            url: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/b1a5112e-d110-4ec3-f158-e2d731b82800/public'
        },
        back_img_2: {
            id: 977,
            url: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/8f541235-2c46-4816-e1a0-45607ea8e600/public'
        },
        back_img_mob_2: {
            id: 980,
            url: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/2e49b810-539a-415e-fe28-9d90b11c1700/public'
        }
	};
	const logo = {
		Heading: "We're #AwardWinning",
		Description: "With 21 beauty awards under our belt, our products speak for themselves. Here’s a look at how we get down.",
		logo: [
			{
				id: 25,
				image: {
					id: 972,
					url: "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/a9486a6e-e9e7-442f-dac5-aec68b27a400/public",
					alternativeText: "Award nilon"
				}
			},
			{
				id: 26,
				image: {
					id: 973,
					url: "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/59ed32c3-032c-4558-bbdd-29108c38db00/public",
					alternativeText: "Award she find"
				}
			},
			{
				id: 27,
				image: {
					id: 976,
					url: "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/a0d3de24-f27d-4166-bd42-3b9ec6732500/public",
					alternativeText: "Beauty global 2018"
				}
			},
			{
				id: 28,
				image: {
					id: 975,
					url: "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/be1b40c9-97dc-4c89-8335-41dfb27b6d00/public",
					alternativeText: "Beauty global 2019"
				}
			},
			{
				id: 29,
				image: {
					id: 971,
					url: "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/3e31732a-6a98-4ddb-e4bd-7272fbf19200/public",
					alternativeText: "Blink beauty winner 2018"
				}
			},
			{
				id: 30,
				image: {
					id: 974,
					url: "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/ae862554-062f-47f3-6cbf-2157f1cb7f00/public",
					alternativeText: "Fabolous beauty awarcs 2018"
				}
			}
		]
	};

	const videoBanner = {
		title: "Take a trip to paradise",
		description: "Meet our hair, skin, and body ranges!",
		video: "https://cdn.shopify.com/s/files/1/0028/8253/5533/files/Pop_Up_Video_Journalist_-_1_reexport_2.mp4?v=1634105075",
		back_img: {
			id: 4933,
			url: "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/ca199257-8681-4a5a-f901-04872f760d00/public"
		},
		back_img_mob: {
			id: 4934,
			url: "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/612f3ff4-8ce4-45bc-042c-3098f0a69c00/public"
		}
	};

	useEffect(() => {
        setIsLoading(false);
    }, []);

	return (
		<>
			<Header
				annBar={annBar}
				mainMenu={mainMenu}
				megaMenu={megaMenu}
				menuBannerQuiz={menuBannerQuiz}
				menuBannerCode={menuBannerCode}/>
			<OurStoryTemplate
				isLoading={isLoading}
				banner={banner}
				intro={intro}
				logo={logo}
				videoBanner={videoBanner}
			/>
			<Footer
				aboutMenu={aboutMenu}
				shopMenu={shopMenu}
				helpMenu={helpMenu} />
		</>
	);
};

export default OurStory;
