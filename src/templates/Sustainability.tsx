import { useState } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Carousel from '@/components/carousel/EmblaCarouselMulti';
import { DotButton, useDotButton } from '@/components/carousel/EmblaCarouselDotButton';
// import Header from '@/sections/Header';
// import Footer from '@/sections/Footer';
// import Next from '@/src/images/icons/chevron-next.svg';
// import Prev from '@/src/images/icons/chevron-prev.svg';
// import { Carousel } from "react-bootstrap";
import DimethiconeFree from '@/images/icons/dimethicone-free.svg';
import ToxinFree from '@/images/icons/toxin-free.svg';
import ParabelFree from '@/images/icons/paraben-free.svg';
import Gluten from '@/images/icons/gluten.svg';
import CrueltyFree from '@/images/icons/cruelty-free.svg';
import Vegan from '@/images/icons/vegan.svg';
// import { Tabs, Tab } from "react-bootstrap";
import Link from "next/link";
import ChevronNext from '@/images/icons/chevron-next.svg';
import ChevronPrev from '@/images/icons/chevron-prev.svg';
import ProductCard from "@/compounds/ProductCard";
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
	controlAutoplay,
} from '@/components/carousel/EmblaCarouselArrowButtons';
import {
    useSelectedSnapDisplay
} from '@/components/carousel/EmblaCarouselSelected';
import TabNav from "@/components/TabNav";
import TabContent from '@/components/TabContent';
import PackagingCard from "@/components/PackagingCard";

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
            src: 'https://via.placeholder.com/300x135.jpg/EFADBA',
            srcSet: 'https://via.placeholder.com/300x135.jpg/EFADBA',
            title: 'Sustainable packaging',
            body: 'It’s not just about ingredients, either. We’re constantly challenging ourselves to take a holistic approach to sustainable packaging with containers that are environmentally-friendly, durable and unBALIevably good looking! Way too cute for a single use, our shelfie-ready pots and jars are designed to be repurposed. Our tip? Brighten up your bathroom shelves by upcycling your empties into hair accessory or cotton pad holders.',

        },
        {
            id: 2,
            src: 'https://via.placeholder.com/300x135.jpg/EFADBA',
            srcSet: 'https://via.placeholder.com/300x135.jpg/EFADBA',
            title: '100% recyclable',
            body: 'Need to bin something? All our packaging is 100% recyclable. Only our travel size tube caps and bottle caps are made from plastic which might be hard to recycle (depending on which country you live in). And you can rest assured we’re working hard to ensure they’re soon recyclable across the world!',
        },
        {
            id: 3,
            src: 'https://via.placeholder.com/300x135.jpg/EFADBA',
            srcSet: 'https://via.placeholder.com/300x135.jpg/EFADBA',
            title: 'FSC certified',
            body: '100% of our cardboards and paper are sourced from sustainably managed forests (FSC Certified), and we minimise our plastic use where we can. This means that we only use paper materials to ship our products to you – no plastic bubble wraps here! The EVA bags used for our accessories are 100% biodegradable. However, for hygiene reasons we will sometimes use plastic covers on smaller items.',
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
	];

    const [activeTab2, setActiveTab2] = useState('formula-1');

    // carousel 1
	const [emblaRef1, emblaApi1] = useEmblaCarousel({
        loop: false
    }, [
		Autoplay({ playOnInit: true, delay: 3000 })
	]);
	const {
		prevBtnDisabled: prevDisabled1,
		nextBtnDisabled: nextDisabled1,
		onPrevButtonClick: arrowClickPrev1,
		onNextButtonClick: arrowClickNext1
	} = usePrevNextButtons(emblaApi1);
	const autoPlayClick1 = controlAutoplay(emblaApi1);
    const { selected, count } = useSelectedSnapDisplay(emblaApi1);

    // carousel 2
	const [emblaRef2, emblaApi2] = useEmblaCarousel({
        loop: true,
        align: 'start'
    }, [
		Autoplay({ playOnInit: false, delay: 3000 })
	]);
    const { selectedIndex: idx2, onDotButtonClick: onClick2 } = useDotButton(emblaApi2);

    // carousel 3
	const [emblaRef3, emblaApi3] = useEmblaCarousel({
        loop: true
    }, [
		Autoplay({ playOnInit: false, delay: 3000 })
	]);
	const {
		onPrevButtonClick: arrowClickPrev3,
		onNextButtonClick: arrowClickNext3
	} = usePrevNextButtons(emblaApi3);
	const autoPlayClick3 = controlAutoplay(emblaApi3);


    return (
		<>
            <section className="relative">
                <Link href="#">
                    <picture>
                        <source srcSet="https://via.placeholder.com/1336x361.jpg/2596be" media="(min-width: 992px)" />
                        <img className="block w-full" alt="/" src="https://via.placeholder.com/375x260.jpg/EFADBA" />
                    </picture>
                    <h1 className="absolute text-white m-auto w-full text-center px-g top-[40%]">Paradise lost? Not on our watch!</h1>
                </Link>
            </section>
            <section>
                <div className="container py-4">
                    <div className="flex flex-wrap -mx-hg lg:-mx-g">
                        <div className="w-full lg:w-1/2 lg:order-2 text-center lg:text-left flex content-center flex-wrap justify-center lg:justify-start px-g">
                            <h2 className="mb-1 lg:mb-2">Thoughtful at every step</h2>
                            <p className="mb-g">At Coco & Eve, we’re passionate about creating the very best products for your hair, skin and body, while taking care of our one precious planet. Inspired by the incredible plants, wildlife and people of our beautiful birthplace of Bali, we’re committed to making a positive, lasting impact.</p>
                            <p className="mb-g">We consider every action we take to ensure our slice of Paradise survives and thrives – ready to enchant future generations of explorers. </p>
                        </div>
                        <div className="px-hg lg:px-g w-full lg:w-1/2 lg:order-1">
                            <img src="https://cdn.shopify.com/s/files/1/0243/8817/3888/t/113/assets/sustainability-infographic.svg" className="w-full" alt="Thoughtful at every step" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="container p-0">
                <h2 className="text-center mb-3">What are we doing?</h2>
                <div className="flex flex-wrap bg-primary-light mx-0">
                    <div className="w-full lg:w-7/12 px-0">
                        <picture>
                            <source srcSet="https://via.placeholder.com/670x350.jpg/2596be" media="(min-width: 992px)" />
                            <img className="w-full" alt="/" src="https://via.placeholder.com/375x440.jpg/EFADBA" />
                        </picture>
                    </div>
                    <div className="w-full lg:w-5/12 py-4 px-g lg:px-3">
                        <h3 className="mb-1">Responsible Sourcing</h3>
                        <Carousel.Wrapper emblaApi={emblaApi1}>
                            <Carousel.Inner emblaRef={emblaRef1} className="lg:-mx-g">
                                <div className="flex-grow-0 flex-shrink-0 w-full basis-full lg:px-g" key={1}>
                                    <p className="mb-g">We believe you are the company you keep. This means that we work with only the most ethical and environmentally conscious suppliers – such as Ecocert-approved conscious partners. Our Coconut, Fig, Cacao and Mango are all from traceable sources that have no negative effect on the environment. A sustainable beauty award winner, our Shea Butter is also derived from renewable sources, while our Papaya and Prickly Pear are COSMOS certified</p>
                                </div>
                                <div className="flex-grow-0 flex-shrink-0 w-full basis-full lg:px-g" key={2}>
                                    <p className="mb-g">Wastage drives us (coco)nuts, so we go out of our way to avoid it. We love finding creative ways to use whole fruits, rather than throwing half an ingredient away. Take our hero, coconut, for example. We use the extract in our Hair Masque, the oil in our Elixir, the ground shell in our Scalp Scrub and even a sugar made from the flower in our Body Scrub!</p>
                                </div>
                                <div className="flex-grow-0 flex-shrink-0 w-full basis-full lg:px-g" key={3}>
                                    <p className="mb-g">As for shipping, we always look to transport items from our suppliers to our warehouses with the smallest possible carbon footprint. That means our products move around the world less by air, and more by boat! (After all, who doesn’t love a good cruise?)</p>
                                </div>
                            </Carousel.Inner>
                            <Carousel.Navigation>
                                <div className="flex relative mx-auto lg:mx-0 mt-3 justify-center w-[5em]">
                                    <PrevButton
                                        onClick={() => autoPlayClick1(arrowClickPrev1)}
                                        disabled={prevDisabled1}
                                        className={`${prevDisabled1 ? 'text-gray-600 pointer-events-none' : 'text-primary'}`}
                                    >
                                        <ChevronPrev className="w-[16px] h-[16px] svg--current-color" />
                                    </PrevButton>
                                    <span>{selected + 1} of {count}</span>
                                    <NextButton
                                        onClick={() => autoPlayClick1(arrowClickNext1)}
                                        disabled={nextDisabled1}
                                        className={`${nextDisabled1 ? 'text-gray-600 pointer-events-none' : 'text-primary'}`}
                                    >
                                        <ChevronNext className="w-[16px] h-[16px] svg--current-color" />
                                    </NextButton>
                                </div>
                            </Carousel.Navigation>
                        </Carousel.Wrapper>
                    </div>
                </div>
            </section>
            <section className="pt-5">
                <div className="container bg-secondary-light px-g py-3 lg:p-4">
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-1/2 lg:order-2">
                            <h2 className="block lg:hidden text-center lg:text-left mb-1">No Nasties Formula</h2>
                            <ul className="list-none mx-auto flex flex-wrap text-center justify-center lg:justify-start border-b border-gray-400">
                                <li className="text-center"><TabNav className={`-mb-[1px] pt-0 pb-1 px-[6px] lg:px-2 ${activeTab2 === 'formula-1' ? 'border-secondary border-b-2 hover:text-body' : ''}`} title='Finest ingredients' active={activeTab2 === 'formula-1'} onNavChange={() => setActiveTab2('formula-1')} /></li>
                                <li className="text-center"><TabNav className={`-mb-[1px] pt-0 pb-1 px-[6px] lg:px-2 ${activeTab2 === 'formula-2' ? 'border-secondary border-b-2 hover:text-body' : ''}`} title='Microbead-free' active={activeTab2 === 'formula-2'} onNavChange={() => setActiveTab2('formula-2')} /></li>
                                <li className="text-center"><TabNav className={`-mb-[1px] pt-0 pb-1 px-[6px] lg:px-2 ${activeTab2 === 'formula-3' ? 'border-secondary border-b-2 hover:text-body' : ''}`} title='FAQ' active={activeTab2 === 'formula-3'} onNavChange={() => setActiveTab2('formula-3')} /></li>
                            </ul>
                            <div className='px-0'>
                                <TabContent className="mt-2" active={activeTab2 === 'formula-1'}>
                                    <p className="mb-g">Creating market beating products is our M.O., so we scour the globe to find the best quality natural botanicals, then pair these with superior laboratory-made ingredients to create our award-winning formulations. Made with the finest ingredients, all our products are free from sulfates, parabens, petroleum, phthalates, mineral oils, palm oil and other common nasties. You can find a full list of what we’ve excluded – and included – on each product page.</p>
                                </TabContent>
                                <TabContent className="mt-2" active={activeTab2 === 'formula-2'}>
                                    <p className="mb-g">The beauty world moves fast, so we’re constantly reviewing our ingredients to ensure our products are safe for our customers and kind to the environment. Worried about our oceans? Don’t be – we’re 100% microbead-free! Any manual exfoliants are made from natural, biodegradable particles that’ll get you glowing without clogging your drains or harming marine life.</p>
                                </TabContent>
                                <TabContent className="mt-2" active={activeTab2 === 'formula-3'}>
                                    <h4 className="mb-1 font-bold">Why do we use synthetic and natural ingredients?</h4>
                                    <p className="mb-g">While we’re committed to minimising the use of synthetics in our formulas, we will sometimes need to use them to deliver you the best possible product. For example, our fragrances are derived from synthetic ingredients. This is because natural fragrances like essential oils can be irritable on the skin –and they’re not necessarily more sustainable. In fact, it can take 10 times more flowers to create a natural fragrance than a synthetic one!</p>
                                </TabContent>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 lg:order-1">
                            <h2 className="hidden lg:block mb-1">No Nasties Formula</h2>
                            <ul className="list-none flex flex-wrap -mx-hg lg:-mx-g mt-3 w-full lg:w-3/4 p-0">
                                <li className="w-1/3 flex items-center mb-2 flex-wrap text-center justify-center"><DimethiconeFree className="svg block w-full mb-1 h-[32px]" />Silicone Free</li>
                                <li className="w-1/3 flex items-center mb-2 flex-wrap text-center justify-center"><ToxinFree className="svg block w-full mb-1 h-[32px]" />Toxin-free</li>
                                <li className="w-1/3 flex items-center mb-2 flex-wrap text-center justify-center"><ParabelFree className="svg block w-full mb-1 h-[32px]" />Paraben Free</li>
                                <li className="w-1/3 flex items-center mb-2 flex-wrap text-center justify-center"><Gluten className="svg block w-full mb-1 h-[32px]" />Gluten Free</li>
                                <li className="w-1/3 flex items-center mb-2 flex-wrap text-center justify-center"><CrueltyFree className="svg block w-full mb-1 h-[32px]"/>Cruelty Free</li>
                                <li className="w-1/3 flex items-center mb-2 flex-wrap text-center justify-center"><Vegan className="svg block w-full mb-1 h-[32px]" />Vegan</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-4 pb-4 relative">
                <div className="container p-0 md:p-1">
                    <p className="pb-2 mb-0 h3 text-center">Thoughtful Packaging</p>
                    <Carousel.Wrapper emblaApi={emblaApi2} className="pl-1 lg:pl-0">
                        <Carousel.Inner emblaRef={emblaRef2} className="lg:!transform-none">
                            {PACKAGING.map((data) => (
                                <PackagingCard src={data.src} className="flex-grow-0 flex-shrink-0 w-3/4 basis-3/4 lg:w-1/3 lg:basis-1/3 px-hg lg:px-g">
                                    <h6 className="mb-2 font-bold">{data.title}</h6>
                                    <p className="mb-g">{data.body}</p>
                                </PackagingCard>
                            ))}
                        </Carousel.Inner>
                        <Carousel.Navigation>
                            <ol className="carousel__dots justify-center my-2 lg:hidden static">
                                {PACKAGING.map((_, index) => (
                                    <li key={index} className={`border border-primary ${index === idx2 ? ' bg-primary' : 'bg-white opacity-50'}`}>
                                        <DotButton
                                            onClick={() => onClick2(index)}
                                            className="carousel__dot"
                                        />
                                    </li>
                                ))}
                            </ol>
                        </Carousel.Navigation>
                    </Carousel.Wrapper>
                </div>
            </section>
            <section className="sustainability-image-text">
                <div className="flex flex-wrap bg-primary-light mx-0">
                    <div className="w-full lg:w-7/12 px-0">
                        <picture>
                            <source srcSet="https://via.placeholder.com/670x270.jpg/2596be" media="(min-width: 992px)" />
                            <img className="fit--cover w-full" alt="/" src="https://via.placeholder.com/375x180.jpg/EFADBA" />
                        </picture>
                    </div>
                    <div className="w-full lg:w-5/12 py-2 flex flex-wrap content-center px-g lg:px-3 text-center lg:text-left justify-center lg:justify-start">
                        <h3 className="mb-1">Cruelty Free & Vegan</h3>
                        <p className="mb-0 text-left">Bali is home to amazingly diverse wildlife and plants – and we want to keep it that way! As deforestation and loss of natural habitat poses a threat to many of our furry friends, we only use FSC paper and card from sustainably managed forests. We also ensure our natural ingredients are from eco-conscious suppliers, and we are proudly 100% vegan and PETA approved! </p>
                    </div>
                </div>
            </section>
            <section className="py-4 lg:py-5">
                <div className="container text-center">
                    <h2 className="text-center mx-5 mb-1">Like what we are doing? Shop now!</h2>
                    <Carousel.Wrapper emblaApi={emblaApi3} className="pt-2">
						<Carousel.Inner emblaRef={emblaRef3} className="lg:-mx-g">
							{FEATURED.map((data) => (
								<ProductCard
									product={data}
									className="relative mb-5 flex-grow-0 flex-shrink-0 flex flex-col w-3/4 basis-3/4 md:w-1/4 md:basis-1/4 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
									button={true}
								/>
							))}
						</Carousel.Inner>
						<Carousel.Navigation>
							<PrevButton
								onClick={() => autoPlayClick3(arrowClickPrev3)}
								className="lg:-left-[1.25em] lg:w-4 text-primary"
							>
								<span className="bg-white w-4 h-4 absolute z-[-1] flex justify-center items-center top-[28%] md:top-[6.25em] lg:top-[8.125em]">
									<ChevronPrev className="w-[16px] h-[16px] svg--current-color" />
								</span>
							</PrevButton>
							<NextButton
								onClick={() => autoPlayClick3(arrowClickNext3)}
								className="lg:-right-[1.25em] lg:w-4 text-primary"
							>
								<span className="bg-white w-4 h-4 absolute z-[-1] flex justify-center items-center top-[28%] md:top-[6.25em] lg:top-[8.125em]">
									<ChevronNext className="w-[16px] h-[16px] svg--current-color" />
								</span>
							</NextButton>
						</Carousel.Navigation>
					</Carousel.Wrapper>
                    <Link href="/collection/all" className="mb-2 lg:mb-3 btn btn-lg btn-outline-primary border-2 hover:no-underline">Shop All</Link>
                </div>
            </section>
		</>
    );
}

export default Sustainability;
