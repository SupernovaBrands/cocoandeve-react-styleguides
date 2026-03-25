import RealResults from '~/templates/RealResults';
import { useState } from 'react';
import Header from '~/sections/Header';
import Footer from '~/sections/Footer';
import RangeBanner from '~/sections/RangeBanner';
import RangeIntro from '~/sections/RangeIntro';
import RangeProducts from '~/sections/RangeProducts';
import { annBar, timerBar, megaMenu, mainMenu, menuBannerCode, menuBannerQuiz, shopMenu, aboutMenu, helpMenu } from '~/modules/placeholders';


const RealResultsTemplate = () => {



    const rangeBannerContent = {
        desktop: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_4b4cf346-2666-4840-88f8-6986e552349c.jpg?v=1772037304',
        mobile: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_46cbaad1-9587-4e38-a9e4-0daa2794442a.jpg?v=1772037331',
    }

    const rangeIntroContent = [
        {
            desktopImg: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_5f4bf42e-40f5-4e50-b9f9-8d9cf33724f7.jpg?v=1772037354',
            mobileImg: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_443ca219-a9e4-4f82-a5e7-7102c3b111e2.jpg?v=1772037374',
            title: 'Like A Virgin Range',
			content: "<p>Transform your tresses with our award-winning range. Nourishes from root-to-tip as it restores dry, damaged & brittle hair back to its ‘virgin’ condition - your hair's revival in a bottle! </p>",
        },
        {
            desktopImg: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_a7f43613-e550-4646-a959-364ddd69b77c.jpg?v=1772037410',
            mobileImg: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_20d6ab97-fd38-4a11-a5b5-e1d37a1e9776.jpg?v=1772037432',
            title: 'Pro Youth Range',
			content: "<p>The world's first retinol-infused honey haircare with game changing results from day 1. A treat for your tresses, designed to hydrate, strengthen & enhance natural shine - for hair that feels as sweet as it looks!</p>",
        },
        {
            desktopImg: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_4506cf12-639d-4937-aa49-4e4ef74d9fea.jpg?v=1772037457',
            mobileImg: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_0e513140-bbf5-4eab-8d2b-25c66227bd54.jpg?v=1772037483',
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
            variants: {
                nodes: [
                    { sku: 'CE0000072020' }
                ]
            }
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
            },
            variants: {
                nodes: [
                    { sku: 'CE0000072020' }
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
            },
            variants: {
                nodes: [
                    { sku: 'CE0000072020' }
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
            variants: {
                nodes: [
                    { sku: 'CE0000072020' }
                ]
            }
        },
        {
            id: 5,
            src: '//via.placeholder.com/520x520/FFF2F4',
            srcSet: '//via.placeholder.com/520x520/FFF2F4',
            title: 'Sunny Honey Bronzing Bundle',
            comparePrice: '$34.90',
            price: '$24.90',
            productId: 4543113265187,
            variants: {
                nodes: [
                    { sku: 'CE0000072020' }
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
            },
            variants: {
                nodes: [
                    { sku: 'CE0000072020' }
                ]
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
