import { useState } from "react";
import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import Next from '../../src/images/icons/chevron-next.svg';
import Prev from '../../src/images/icons/chevron-prev.svg';
import { Carousel } from "react-bootstrap";
import DimethiconeFree from '../../src/images/icons/dimethicone-free.svg';
import ToxinFree from '../../src/images/icons/toxin-free.svg';
import ParabelFree from '../../src/images/icons/paraben-free.svg';
import Gluten from '../../src/images/icons/gluten.svg';
import CrueltyFree from '../../src/images/icons/cruelty-free.svg';
import Vegan from '../../src/images/icons/vegan.svg';
import { Tabs, Tab } from "react-bootstrap";
import CarouselCustom from "@/components/CarouselCustom";

const Sustainability = () => {
    const [index, setIndex] = useState(0);
    const [showCart, setShowCart] = useState(false);

    const toggleCart = () => {
		setShowCart(!showCart);
	}
    
	const sourcingCarouselControlHandlePrev = () => {
		const idx = index - 1 < 0 ? 2 : index - 1;
		setIndex(idx);
	};
	const sourcingCarouselControlHandleNext = () => {
		const idx = index + 1 > 2 ? 0 : index + 1;
		setIndex(idx);
	};

    const PACKAGING = [
        {
            id: 1,
            src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
            srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
            badge: 'Body',
            badgeColor: 'bali-bod-blue',
            title: 'Sustainable packaging',
            body: 'It’s not just about ingredients, either. We’re constantly challenging ourselves to take a holistic approach to sustainable packaging with containers that are environmentally-friendly, durable and unBALIevably good looking! Way too cute for a single use, our shelfie-ready pots and jars are designed to be repurposed. Our tip? Brighten up your bathroom shelves by upcycling your empties into hair accessory or cotton pad holders.',
            
        },
        {
            id: 2,
            src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
            srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
            badge: 'Tan',
            badgeColor: 'sh-purple',
            title: '100% recyclable',
            body: 'Need to bin something? All our packaging is 100% recyclable. Only our travel size tube caps and bottle caps are made from plastic which might be hard to recycle (depending on which country you live in). And you can rest assured we’re working hard to ensure they’re soon recyclable across the world!',
        },
        {
            id: 3,
            src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
            srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
            badge: 'Hair',
            badgeColor: 'secondary',
            title: 'FSC certified',
            body: '100% of our cardboards and paper are sourced from sustainably managed forests (FSC Certified), and we minimise our plastic use where we can. This means that we only use paper materials to ship our products to you – no plastic bubble wraps here! The EVA bags used for our accessories are 100% biodegradable. However, for hygiene reasons we will sometimes use plastic covers on smaller items.',
        },
        {
            id: 1,
            src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
            srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
            badge: 'Body',
            badgeColor: 'bali-bod-blue',
            title: 'Sustainable packaging',
            body: 'It’s not just about ingredients, either. We’re constantly challenging ourselves to take a holistic approach to sustainable packaging with containers that are environmentally-friendly, durable and unBALIevably good looking! Way too cute for a single use, our shelfie-ready pots and jars are designed to be repurposed. Our tip? Brighten up your bathroom shelves by upcycling your empties into hair accessory or cotton pad holders.',
            classes: 'd-lg-none'
        },
        {
            id: 2,
            src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
            srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
            badge: 'Tan',
            badgeColor: 'sh-purple',
            title: '100% recyclable',
            body: 'Need to bin something? All our packaging is 100% recyclable. Only our travel size tube caps and bottle caps are made from plastic which might be hard to recycle (depending on which country you live in). And you can rest assured we’re working hard to ensure they’re soon recyclable across the world!',
            classes: 'd-lg-none'
        },
        {
            id: 3,
            src: 'https://via.placeholder.com/530x378.jpg/EFADBA',
            srcSet: 'https://via.placeholder.com/530x378.jpg/EFADBA',
            badge: 'Hair',
            badgeColor: 'secondary',
            title: 'FSC certified',
            body: '100% of our cardboards and paper are sourced from sustainably managed forests (FSC Certified), and we minimise our plastic use where we can. This means that we only use paper materials to ship our products to you – no plastic bubble wraps here! The EVA bags used for our accessories are 100% biodegradable. However, for hygiene reasons we will sometimes use plastic covers on smaller items.',
            classes: 'd-lg-none'
        },
    ]

    const FEATURED = [
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
		}
	];

    return (
		<>
            <section className="sustainability-banner position-relative">
                <a href="#">
                    <picture>
                        <source srcset="https://via.placeholder.com/1336x361.jpg/2596be" media="(min-width: 992px)" />
                        <img className="d-block w-100" alt="/" src="https://via.placeholder.com/375x260.jpg/EFADBA" />
                    </picture>
                    <h1 className="position-absolute text-white m-auto w-100 text-center px-g">Paradise lost? Not on our watch!</h1>
                </a>
            </section>
            <section>
                <div className="container py-4">
                    <div className="row">
                        <div className="col-12 col-lg-6 order-lg-2 text-center text-lg-left d-flex align-content-center flex-wrap justify-content-center justify-content-lg-start px-g">
                            <h2 className="mb-lg-2">Thoughtful at every step</h2>
                            <p>At Coco & Eve, we’re passionate about creating the very best products for your hair, skin and body, while taking care of our one precious planet. Inspired by the incredible plants, wildlife and people of our beautiful birthplace of Bali, we’re committed to making a positive, lasting impact.</p>
                            <p>We consider every action we take to ensure our slice of Paradise survives and thrives – ready to enchant future generations of explorers. </p>
                        </div>
                        <div className="col-12 col-lg-6 order-lg-1">
                            <img src="https://cdn.shopify.com/s/files/1/0243/8817/3888/t/113/assets/sustainability-infographic.svg" className="w-100" alt="Thoughtful at every step" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="sustainability-image-slider container p-0">
                <h2 className="text-center mb-3">What are we doing?</h2>
                <div className="row bg-primary-light mx-0">
                    <div className="col-12 col-lg-7 px-0">
                        <picture>
                            <source srcset="https://via.placeholder.com/670x350.jpg/2596be" media="(min-width: 992px)" />
                            <img className="fit--cover w-100" alt="/" src="https://via.placeholder.com/375x320.jpg/EFADBA" />
                        </picture>
                    </div>
                    <div className="col-12 col-lg-5 py-4 px-g px-lg-3">
                        <h3>Responsible Sourcing</h3>
                        <Carousel id="sustainability-image-slider" activeIndex={index} controls={false} indicators={false} interval={null}>
                            <Carousel.Item key={0}>
                                <p>We believe you are the company you keep. This means that we work with only the most ethical and environmentally conscious suppliers – such as Ecocert-approved conscious partners. Our Coconut, Fig, Cacao and Mango are all from traceable sources that have no negative effect on the environment. A sustainable beauty award winner, our Shea Butter is also derived from renewable sources, while our Papaya and Prickly Pear are COSMOS certified</p>
                            </Carousel.Item>
                            <Carousel.Item key={1}>
                                <p>Wastage drives us (coco)nuts, so we go out of our way to avoid it. We love finding creative ways to use whole fruits, rather than throwing half an ingredient away. Take our hero, coconut, for example. We use the extract in our Hair Masque, the oil in our Elixir, the ground shell in our Scalp Scrub and even a sugar made from the flower in our Body Scrub!</p>
                            </Carousel.Item>
                            <Carousel.Item key={2}>
                                <p>As for shipping, we always look to transport items from our suppliers to our warehouses with the smallest possible carbon footprint. That means our products move around the world less by air, and more by boat! (After all, who doesn’t love a good cruise?)</p>
                            </Carousel.Item>
                        </Carousel>
                        <div className="sustainability-image-slider__wrapper d-flex position-relative mx-auto mx-lg-0 mt-3 justify-content-center">
                            <button onClick={sourcingCarouselControlHandlePrev} className={`d-sm-none d-lg-flex carousel-control carousel-control-prev ${index === 0 ? 'disabled' : ''}`} data-bs-slide="prev">
                                <span className='carousel-control-prev-icon justify-content-center align-items-center' aria-hidden="true">
                                    <Prev className="svg" />
                                </span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            {index + 1} of 3
                            <button onClick={sourcingCarouselControlHandleNext} className={`d-sm-none d-lg-flex carousel-control carousel-control-next ${index === 2 ? 'disabled' : ''}`} data-bs-slide="next">
                                <span className={`carousel-control-next-icon justify-content-center align-items-center`} aria-hidden="true">
                                    <Next className="svg" />
                                </span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="sustainability-formula pt-5">
                <div className="container bg-secondary-light px-g py-3 p-lg-4">
                    <div className="row">
                        <div className="col-12 col-lg-6 order-lg-2">
                            <h2 className="d-block d-lg-none text-center text-lg-left">No Nasties Formula</h2>
                            <Tabs
                                defaultActiveKey="formula-1"
                                className="mb-2 justify-content-center justify-content-lg-start"
                            >
                                <Tab eventKey="formula-1" title="Finest ingredients" tabClassName="nav-link text-decoration-none mb-0 mx-0 mx-lg-1 font-weight-normal">
                                    <p>Creating market beating products is our M.O., so we scour the globe to find the best quality natural botanicals, then pair these with superior laboratory-made ingredients to create our award-winning formulations. Made with the finest ingredients, all our products are free from sulfates, parabens, petroleum, phthalates, mineral oils, palm oil and other common nasties. You can find a full list of what we’ve excluded – and included – on each product page.</p>
                                </Tab>
                                <Tab eventKey="formula-2" title="Microbead-free" tabClassName="nav-link text-decoration-none mb-0  mx-0 mx-lg-1 font-weight-normal">
                                    <p>The beauty world moves fast, so we’re constantly reviewing our ingredients to ensure our products are safe for our customers and kind to the environment. Worried about our oceans? Don’t be – we’re 100% microbead-free! Any manual exfoliants are made from natural, biodegradable particles that’ll get you glowing without clogging your drains or harming marine life.</p>
                                </Tab>
                                <Tab eventKey="formula-3" title="FAQ" tabClassName="nav-link text-decoration-none mb-0 mx-0 mx-lg-1 font-weight-normal">
                                    <h4>Why do we use synthetic and natural ingredients?</h4>
                                    <p>While we’re committed to minimising the use of synthetics in our formulas, we will sometimes need to use them to deliver you the best possible product. For example, our fragrances are derived from synthetic ingredients. This is because natural fragrances like essential oils can be irritable on the skin –and they’re not necessarily more sustainable. In fact, it can take 10 times more flowers to create a natural fragrance than a synthetic one!</p>
                                </Tab>
                            </Tabs>
                        </div>
                        <div className="col-12 col-lg-6 order-lg-1">
                            <h2 className="d-none d-lg-block">No Nasties Formula</h2>
                            <ul className="list-unstyled row mt-3 col-12 col-lg-9 p-0">
                                <li className="col-4 d-flex align-items-center mb-2 flex-wrap text-center justify-content-center"><DimethiconeFree className="svg d-block w-100 mb-1" />Silicone Free</li>
                                <li className="col-4 d-flex align-items-center mb-2 flex-wrap text-center justify-content-center"><ToxinFree className="svg d-block w-100 mb-1" />Toxin-free</li>
                                <li className="col-4 d-flex align-items-center mb-2 flex-wrap text-center justify-content-center"><ParabelFree className="svg d-block w-100 mb-1" />Paraben Free</li>
                                <li className="col-4 d-flex align-items-center mb-2 flex-wrap text-center justify-content-center"><Gluten className="svg d-block w-100 mb-1" />Gluten Free</li>
                                <li className="col-4 d-flex align-items-center mb-2 flex-wrap text-center justify-content-center"><CrueltyFree className="svg d-block w-100 mb-1"/>Cruelty Free</li>
                                <li className="col-4 d-flex align-items-center mb-2 flex-wrap text-center justify-content-center"><Vegan className="svg d-block w-100 mb-1" />Vegan</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-4 pb-4 position-relative">
                <div className="container p-0 p-md-1">
                    <p className="pb-2 mb-0 h3 text-center">Thoughtful Packaging</p>
                    <CarouselCustom packagingCard={true} items={PACKAGING} id="bestsellersCarousel" slideNumber={PACKAGING.length} centered={true} className="col-9 col-md-3" />
                </div>
            </section>
            <section class="sustainability-image-text">
                <div class="row bg-primary-light mx-0">
                    <div class="col-12 col-lg-7 px-0">
                        <picture>
                            <source srcset="https://via.placeholder.com/670x270.jpg/2596be" media="(min-width: 992px)" />
                            <img class="fit--cover w-100" alt="/" src="https://via.placeholder.com/375x180.jpg/EFADBA" />
                        </picture>
                    </div>
                    <div class="col-12 col-lg-5 py-2 d-flex flex-wrap align-content-center  px-g px-lg-3 text-center text-lg-left justify-content-center justify-content-lg-start">
                        <h3>Cruelty Free & Vegan</h3>
                        <p class="mb-0 text-start">Bali is home to amazingly diverse wildlife and plants – and we want to keep it that way! As deforestation and loss of natural habitat poses a threat to many of our furry friends, we only use FSC paper and card from sustainably managed forests. We also ensure our natural ingredients are from eco-conscious suppliers, and we are proudly 100% vegan and PETA approved! </p>
                    </div>
                </div>
            </section>
            <section class="py-4 py-lg-5">
                <div class="container text-center">
                    <h2 class="text-center mx-5">Like what we are doing? Shop now!</h2>
                    <CarouselCustom productCard={true} items={FEATURED} id="newsCarousel" slideNumber={4} centered={true} className="position-relative col-9 col-md-3 product-card text-center" carouselClass="pt-2" />
                </div>
            </section>
		</>
    );
}

export default Sustainability;