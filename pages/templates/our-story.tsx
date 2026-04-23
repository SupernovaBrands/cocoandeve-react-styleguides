import dynamic from 'next/dynamic';
import Footer from "~/sections/Footer";
import OurStoryTemplate from '~/templates/OurStory';
import { annBar, timerBar, megaMenu, mainMenu, menuBannerCode, menuBannerQuiz, shopMenu, aboutMenu, helpMenu } from '~/modules/placeholders';
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
			url: "https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_3a91f449-88be-4657-85da-519fc14f33cd.jpg?v=1772003595"
		},
		back_img_mob: {
			id: 970,
			url: "https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_de960b8c-cd64-4563-a7ea-06e483ffbab0.png?v=1772003626"
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
            url: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_9318a497-8da4-4869-a623-ce4d2c55b32f.jpg?v=1772003729'
        },
        back_img_mob_1: {
            id: 979,
            url: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_71b4830f-d726-4b69-b89c-0ca2cf96d5ef.jpg?v=1772003754'
        },
        back_img_2: {
            id: 977,
            url: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_50f67713-d9af-404f-b2a2-eb4c6c3bd748.jpg?v=1772003793'
        },
        back_img_mob_2: {
            id: 980,
            url: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_d06ac580-add5-4cbf-b6e4-ad844d7f22f8.jpg?v=1772003816'
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
					url: "https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_a7daa6b6-adfe-49f4-a577-cdc38a525fa8.png?v=1772003849",
					alternativeText: "Award nilon"
				}
			},
			{
				id: 26,
				image: {
					id: 973,
					url: "https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_2dfaa7d1-33f9-4ddc-ba0a-2474cd7527da.png?v=1772003873",
					alternativeText: "Award she find"
				}
			},
			{
				id: 27,
				image: {
					id: 976,
					url: "https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_7840c81d-6cb2-4093-b0c4-b3cf8a7d0471.png?v=1772037143",
					alternativeText: "Beauty global 2018"
				}
			},
			{
				id: 28,
				image: {
					id: 975,
					url: "https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_52f1c8b2-73dd-423d-8884-2f38c8eaa69c.png?v=1772037172",
					alternativeText: "Beauty global 2019"
				}
			},
			{
				id: 29,
				image: {
					id: 971,
					url: "https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_ff2ff677-d7f5-4903-b898-90030226693e.png?v=1772037196",
					alternativeText: "Blink beauty winner 2018"
				}
			},
			{
				id: 30,
				image: {
					id: 974,
					url: "https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_00969649-e2cf-4730-a99f-075b073e942d.png?v=1772037229",
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
			url: "https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_4b8791c2-b658-4697-b250-5e4c97348591.jpg?v=1772037251"
		},
		back_img_mob: {
			id: 4934,
			url: "https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_a0d1d496-77bb-4074-8532-0341b7fae51e.jpg?v=1772037274"
		}
	};

	useEffect(() => {
        setIsLoading(false);
    }, []);

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
