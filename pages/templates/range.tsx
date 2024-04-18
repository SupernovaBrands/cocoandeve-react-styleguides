import RealResults from '~/templates/RealResults';
import { useState } from 'react';
import Header from '~/sections/Header';
import Footer from '~/sections/Footer';
import RangeBanner from '~/sections/RangeBanner';
import RangeIntro from '~/sections/RangeIntro';
import RangeProducts from '~/sections/RangeProducts';
import { annBar, megaMenu, mainMenu, menuBannerCode, menuBannerQuiz, shopMenu, aboutMenu, helpMenu } from '~/modules/placeholders';


const RealResultsTemplate = () => {



    const rangeBannerContent = {
        desktop: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/0cf3879a-ef24-4599-2cfb-3c95bfc44300/public',
        mobile: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/f0834ff6-ac4a-4f7d-57c4-07b962918800/public',
    }

    const rangeIntroContent = [
        {
            desktopImg: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/6a2fb4fd-ec6c-4788-3f77-91363d8d4900/public',
            mobileImg: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/fbf6d90d-f60c-4c1c-eb40-3987e8fbb800/public',
            title: 'Like A Virgin Range',
			content: "<p>Transform your tresses with our award-winning range. Nourishes from root-to-tip as it restores dry, damaged & brittle hair back to its ‘virgin’ condition - your hair's revival in a bottle! </p>",
        },
        {
            desktopImg: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/f8fa9245-cab3-45da-328b-354661015400/public',
            mobileImg: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/ca182fc9-d990-421a-3e87-8fb64236be00/public',
            title: 'Pro Youth Range',
			content: "<p>The world's first retinol-infused honey haircare with game changing results from day 1. A treat for your tresses, designed to hydrate, strengthen & enhance natural shine - for hair that feels as sweet as it looks!</p>",
        },
        {
            desktopImg: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/afc32965-310f-483c-a07f-bc7713e93300/public',
            mobileImg: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/e68d19ca-ada4-45c3-d060-01139f8fc800/public',
            title: 'Hair Essentials Range',
			content: "<p>Elevate your daily hair ritual with our curated collection that repair, nourish & revitalize strands with its transformative power and incredible ingredients, designed to protect & enhance from root to tip.</p>",
        }
    ]

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

    return (
		<>
			<Header  
                annBar={annBar}
				mainMenu={mainMenu}
				megaMenu={megaMenu}
				menuBannerQuiz={menuBannerQuiz}
				menuBannerCode={menuBannerCode}
                dummy={true} />
        	<RangeBanner content={rangeBannerContent} />
            <RangeIntro content={rangeIntroContent} />
            <RangeProducts heading="Products"  products={PRODUCTS} />
			<Footer
				aboutMenu={aboutMenu}
				shopMenu={shopMenu}
				helpMenu={helpMenu} />
		</>
    );
}

export default RealResultsTemplate;