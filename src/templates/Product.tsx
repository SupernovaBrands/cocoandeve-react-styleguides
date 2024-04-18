import dynamic from 'next/dynamic';
import { useState } from "react";
import AccordionPDP from '~/components/AccordionPDP';
import { Button } from '../components';
import ProductImageCarousel from "~/components/ProductImageCarousel";
import { EmblaOptionsType } from 'embla-carousel'

import LaunchWaitList from "~/compounds/launch-waitlist";
import ProductVariant from "~/compounds/ProductVariant";
import Help from '~/images/icons/help.svg';
import Image from 'next/image'

import ProductSubscription from "~/components/product-subscription";
import UpsellPdp from "~/compounds/upsell-pdp";
// import QuantityBox from '~/components/cart/quantity-box';
import SaveResults from "~/components/save-results";
import YotpoStar from "~/components/YotpoStars";
import NaturalDha from '~/images/icons/natural-dha.svg';
import Vegan from '~/images/icons/vegan.svg';
import DimethiconeFree from '~/images/icons/dimethicone-free.svg';
import CrueltyFree from '~/images/icons/cruelty-free.svg';
import ToxinFree from '~/images/icons/toxin-free.svg';
import Ethically from '~/images/icons/ethically.svg';
import ParabenFree from '~/images/icons/paraben-free.svg';
import Peta from '~/images/icons/peta.svg';
import FastDelivery from '~/images/icons/fast-delivery.svg';

import TagIcon from '~/images/icons/tag.svg';
import StarFullIcon from '~/images/icons/star-full.svg';

const QuantityBox = dynamic(() => import('~/components/cart/quantity-box'), {
    ssr: false,
});

const SLIDES = [
    { id: 1, src: 'https://via.placeholder.com/1140x1140/EFADBA?text=_text_' },
    { id: 2, src: 'https://via.placeholder.com/1140x1140/EFADBA?text=_text_' },
    { id: 3, src: 'https://via.placeholder.com/1140x1140/EFADBA?text=_text_' },
    { id: 4, src: 'https://via.placeholder.com/1140x1140/EFADBA?text=_text_' },
    { id: 5, src: 'https://via.placeholder.com/1140x1140/EFADBA?text=_text_' },
    { id: 6, src: 'https://via.placeholder.com/1140x1140/EFADBA?text=_text_' },
    { id: 7, src: 'https://via.placeholder.com/1140x1140/EFADBA?text=_text_' },
    { id: 8, src: 'https://via.placeholder.com/1140x1140/EFADBA?text=_text_' },
    { id: 9, src: 'https://via.placeholder.com/1140x1140/EFADBA?text=_text_' },
    { id: 10, src: 'https://via.placeholder.com/1140x1140/EFADBA?text=_text_' },
];

const Product = (props: any) => {
    const [isMedium, setMedium] = useState(true);
    const [isDark, setDark] = useState(false);
    const [isUltra, setUltra] = useState(false);
    const [open, setOpen] = useState(false);
    const initialState = { 1: false, 2: false, 3: false};
    const [navState, setNavState] = useState(initialState);

    const handleClick = (navId) => setNavState((prev) => {
        return { ...prev, [navId]: !prev[navId] };
    });

    // const swatchChange = (event) => {
    //     if(event.target.getAttribute("data-value") == "medium") {
    //         setMedium(true);
    //         setDark(false);
    //         setUltra(false);
    //     }
    //     else if(event.target.getAttribute("data-value") == "dark") {
    //         setMedium(false);
    //         setDark(true);
    //         setUltra(false);
    //     }
    //     else if(event.target.getAttribute("data-value") == "ultra-dark") {
    //         setMedium(false);
    //         setDark(false);
    //         setUltra(true);
    //     }
    // }


	const [shade, setShade] = useState('medium');

	const swatchChange = (event: any) => {
		const shade = event.target.getAttribute('data-value');
		setShade(shade);
	};

	const shadeData = [
		{
			id: 'medium',
			text: '<b>Medium</b> - Subtle glow, lighter skin tones'
		},
		{
			id: 'dark',
			text: '<b>Dark</b> - Subtle glow, lighter skin tones'
		},
		{
			id: 'ultra-dark',
			text: '<b>Ultra Dark</b> - Subtle glow, lighter skin tones'
		},
	];

	const notes = ['1x Masque + Brush', '1x Other items', '1x No shade swatch test'];
	const notes2 = ['1x Masque + Brush', '1x Other items', '1x Super Hydrating Shampoo (250ml)'];


    const [openIndex, setOpenIndex] = useState(0);
    const dataAccordion = [{
		id: 1,
		title: 'Benefits & Ingredients',
		text: `<p className="mb-1"><b> 100% Natural DHA: </b> Get a healthy looking, natural tan in just 2 hours that can last up to 2 weeks. </p><p className="mb-1">
        <b> Cellushape<sup>TM</sup> (Lotus Extract): </b> Strong anti-oxidants against oxidative stress to smooth skin.</p><p className="mb-1">
        <b> Raw Virgin Coconut: </b> Hydrate and firm skin along with botanicals and amino acids.</p><p className="mb-1">
        <b> Mango, Fig and Cocoa: </b> Enriched with powerful natural antioxidants to improve signs of ageing.</p>`
	},{
		id: 2,
		title: 'How to Use',
		text: `<p className="mt-3 mb-3"><b>1. Remove unwanted hair </b> and exfoliate thoroughly (ideally 6-24 hours before.) </p><p className="mt-3 mb-3">
        <b>2. Apply to dry skin, </b> free from moisturisers. </p><p className="mt-3 mb-3">
        <b>3. Use Mitt &amp; Brush </b> to apply to tricky areas like the feet, hands, face &amp; ears. </p><p className="mt-3 mb-3">
        <b>4. Allow to develop </b>for a minimum of 2 hours or overnight for a deeper tan. </p><p className="mt-3 mb-3">
        <b>5. Shower in warm water </b> to remove the guide colour and pat skin dry. </p><p className="mt-3 mb-3">
        <b>6. Repeat every 5-7 days </b> or when needed. Moisturise daily to maintain results.</p>`
	},{
		id: 3,
		title: 'Collapsible FAQ',
		text: `<p className="mt-3 mb-2">Which Sunny Honey colour should I go for?</p>
        <p className="mb-3">Toned and radiant, with brighter eyes, whiter teeth and sculpted cheekbones – there’s no denying the confidence-boosting
        power of a good self-tan! But, whether you’re pale, olive or dark-skinned, it can be hard to know where to start.
        Thankfully, our ultimate Sunny Honey tan colour guide promises unBALIevable transformations – for all skin tones. To
        learn all you need to know about choosing the right self-tan for your skin tone, read on!</p>
        <p className="mb-2">How to use Sunny Honey Bali Bronzing Foam?</p>
        <p className="mb-3">Don’t freak over streaks or panic over patches – here’s how to use Sunny Honey Bali Bronzing Foam for the best self-tanning results under the sun! Simple to follow but super important, these foolproof tips will level up your self-tanning game – whether you’re a fake tanning first-timer or committed to faux-glow.</p>
        <p className="mb-2">How often should I self-tan?</p>
        <p className="mb-3">Each bottle has roughly 260 pumps and can last approximately 10-20 full body tanning sessions.</p>`
	}];

	const toggleCard = (id: number) => {
		if (id === openIndex) {
			setOpenIndex(0);
		} else {
			setOpenIndex(id);
		}
	};

    return (
        <>
            <div className="container sm:px-0 lg:px-g mb-4 lg:mt-5">
                <div className="flex flex-wrap items-start">
                    <div className="product-image-carousel__container w-full lg:w-3/5 lg:order-2 lg:sticky lg:top-[-3em]">
                        <ProductImageCarousel slides={SLIDES} bottomBadge="👻 Get 3 for 2 with code: HALLOWEEN 👻" />
                    </div>
                    <div className="w-full lg:w-2/5 lg:order-3 mt-2 lg:mt-0 flex flex-col px-g">
                        <YotpoStar productId={4543113265187} showTotal={true} className="justify-start"/>
                        <h1 className="mb-2 lg:order-0">Sunny Honey Bali Bronzing Foam</h1>
                        <div className="mb-1">
                            <span className="mr-25 inline-block badge badge--sm py-hg rounded bg-secondary text-white mb-25 font-normal px-1">New</span>
                            <span className="mr-25 whitespace-nowrap inline-block badge badge--sm py-hg rounded bg-dark text-white mb-25 font-normal px-1">
                                <TagIcon className="svg svg--current-color mr-1 text-white float-left"/>
                                20% OFF, code: SINGLES
                            </span>
                            <span className="mr-25 inline-block badge badge--sm py-hg rounded bg-sh-orange text-white mb-25 font-normal px-1">
                                <StarFullIcon className="svg svg--current-color mr-1 text-white float-left"/>
                                Best product on Amazon
                            </span>
                            <span className="mr-25 inline-block badge badge--sm py-hg rounded bg-primary-dark text-white mb-25 font-weight-normal px-1">FREE GIFT</span>
                        </div>

                        <p className="mb-2 lg:mb-4 text-lg lg:order-0">Anti-cellulite, anti-aging self tan</p>
                        <LaunchWaitList
                            title="Join the waitlist"
                            content="Get alerted when our newest product drops, and get a free gift with your purchase. You got to be quick! sign up now cause this is definitely goinf to sell out fast!"
                            policy="By signing up via text you agree to receive recurring automated marketing messages at the phone number provided. Consent is not a condition of purchase. Reply STOP to unsubscribe. HELP for help. Msg & Data rates may apply. View Privacy Policy & ToS."
                            success_msg="Thank you for subcribing to our waitlist!"
                            success_content="We'll keep you posted on our Bronzing Face Drop launch!. We hope you're exited as much as we are."
                            className="lg:order-2"
                        />
                        <form className="product-form lg:order-2 mt-1">
                            <figure className="product-card--quiz relative">
                                <picture className="m-0 h-full">
                                    <source srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/quiz-banner-pdp-mb.jpg" media="(min-width: 992px)" />
                                    <img alt="Tan Quiz" className="w-full h-full rounded-0" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/quiz-banner-pdp-mb.jpg" loading="lazy" width="400" height="110"/>
                                </picture>
                                <figcaption className="absolute px-2 px-lg-3 top-1/2 -translate-y-1/2 top-0 left-0">
                                    <p className="font-bold mb-1">Your true colour match<br/> is 90 seconds away!</p>
                                    <a href="#" className="px-g rounded-full bg-white text-primary text-sm py-1 border border-primary font-bold">Find my Match</a>
                                </figcaption>
                            </figure>

                            <p className="bg-gray-400 py-1 text-center my-1">
                                Not Sure which shade to get? <a href="#" className="take-quiz-line text-body block lg:inline text-underline">Take our Tan Quiz</a>
                            </p>

                            <p className="product-variant__price-label-abtest hidden mb-0 font-bold py-2">
                                <span className="mr-25 text-nowrap text-gray-600">$89.80</span>
                                <span className="mr-25 text-nowrap">$44.90</span>
                                <span className="text-primary text-nowrap">(SAVE 30%)</span>
                            </p>

                            <div className="flex flex-wrap mt-3">
                                    <ProductVariant.Variant
                                        id="1x-sunny-honey-bali-bronzing-foam"
                                        checked={true}
                                        inventory="10"
                                        dataID="32068892426275"
                                        price="$44.90"
                                        className="mb-1"
                                        keyName="product-variant-1"
                                    >
                                        <p className="mb-1 font-bold">
                                            1x Sunny Honey Bali Bronzing Foam
                                        </p>
                                        <p className="product-variant__description mb-1 font-size-sm">1x Masque + Brush</p>
                                        <ProductVariant.Swatch shadeData={shadeData} selectedSwatch={shade}>
                                            <button onClick={swatchChange} type="button" className={`variant-swatch medium me-2 border-[2px] ${shade === 'medium' ? 'border-primary' : 'border-white'}`} data-value="medium" data-id="32068891541539" />
                                            <button onClick={swatchChange} type="button" className={`variant-swatch dark me-2 border-[2px] ${shade === 'dark' ? 'border-primary' : 'border-white'}`} data-value="dark" data-id="32068891607075" />
                                            <button onClick={swatchChange} type="button" className={`variant-swatch ultra-dark border-[2px] ${shade === 'ultra-dark' ? 'border-primary' : 'border-white'}`} data-value="ultra-dark" data-id="32068891639843" />
                                        </ProductVariant.Swatch>
                                    </ProductVariant.Variant>

                                    <ProductVariant.Variant
                                        id="1x-sunny-honey-bali-bronzing-bundle"
                                        inventory="10"
                                        dataID="32068892426275"
                                        price="$44.90"
                                        compare="$89.80"
                                        className="mb-1"
                                        keyName="product-variant-2"
                                    >
                                        <p className="mb-1 font-bold">
                                            1x Sunny Honey Bali Bronzing Bundle
                                            <span className="product-variant__saving">Save 30%</span>
                                        </p>
                                        <p className="product-variant__description mb-1 font-size-sm">1x Masque + Brush</p>
                                        <p className="product-variant__description mb-1 font-size-sm">1x Other items</p>
                                        <p className="product-variant__description mb-1 font-size-sm">1x Ultra dark OOS waitlist, dark oos</p>
                                        <ProductVariant.Swatch shadeData={shadeData} selectedSwatch={shade}>
                                            <button onClick={swatchChange} type="button" className={`variant-swatch medium me-2 border-[2px] ${shade === 'medium' ? 'border-primary' : 'border-white'}`} data-value="medium" data-id="32068891541539" />
                                            <button onClick={swatchChange} type="button" className={`oos variant-swatch dark me-2 border-[2px] ${shade === 'dark' ? 'border-primary' : 'border-white'}`} data-value="dark" data-id="32068891607075" />
                                            <button onClick={swatchChange} type="button" className={`oos variant-swatch ultra-dark border-[2px] ${shade === 'ultra-dark' ? 'border-primary' : 'border-white'}`} data-value="ultra-dark" data-id="32068891639843" />
                                        </ProductVariant.Swatch>
                                    </ProductVariant.Variant>

                                    <ProductVariant.Variant
                                        id="1x-product-variant-bronzing-face-drops"
                                        inventory="10"
                                        dataID="32068892426275"
                                        price="$44.90"
                                        compare="$89.80"
                                        className="mb-3"
                                        keyName="product-variant-3"
                                    >
                                        <p className="mb-1 font-bold">
                                            Bronzing Face Drops <span className="product-variant__saving">Save 30%</span>
                                        </p>
                                        <ProductVariant.Notes notes={notes} />
                                    </ProductVariant.Variant>

                                    <ProductVariant.Variant
                                        id="1x-product-variant-shampoo-conditioner-set"
                                        inventory="10"
                                        dataID="32068892426275"
                                        price="$44.90"
                                        compare="$89.80"
                                        className="mb-3"
                                        keyName="product-variant-4"
                                    >
                                        <p className="mb-1 font-bold flex items-center">
                                            Subscription (20% OFF) <span className="product-variant__saving">Save 30%</span>
                                            <a className="text-primary ms-1" data-container="body" data-toggle="popover" data-placement="top" data-content="<strong>No fuss and frizz, just good hair days ahead.</strong><br/>Keep your hair routine in check and never run out of your washday must-haves every month and free shipping on top of that.<br/><br/>Cancel anytime, and come back when you're ready. ❤️" data-html="true">
                                                <Help className="svg svg--current-color" />
                                            </a>
                                        </p>
                                        <p className="mb-1 font-bold ">Monthly Subscription</p>
                                        <ProductVariant.Notes notes={notes2} />

                                    </ProductVariant.Variant>
                            </div>
                            <ProductSubscription tooltipText="Never run out of your hair must-haves, with free shipping on top of that.<br/><br/>Cancel anytime with no hassle! ❤️"/>
                            <div className="results-swatch py-2 border border-primary-light-second border-l-0 border-r-0 mb-2 flex items-center">
                                <button type="button" className="variant-swatch variant-swatch--lg medium me-2 border border-primary before:m-[1px]" data-value="medium" data-id="32068892295203"></button>
                                <p className="mb-0"><strong>Your perfect shade – Medium</strong> <br/> will give you subtle glow</p>
                            </div>
                            <div className="product-swatch-mobile__trigger">
                                <div className="product-form-submit mb-3 position-relative">
                                    <div className="flex">
                                        <QuantityBox
                                            name="quantity-box"
                                            editable={true}
                                            isLastStock={false}
                                            productStock={20}
                                            quantity={1}
                                            productId={32068892426275}
                                        />
                                        {/* <input className="btn btn-lg btn-primary btn-block ms-1 lg:ml-g w-full" type="submit" value="Add to Cart"></input> */}
                                        <Button type="submit" buttonClass="w-full ml-1 border border-primary bg-primary text-white hover:bg-primary-dark">Add to Cart</Button>
                                    </div>
                                </div>
                            </div>
                            <SaveResults />
                            <div className="flex items-center mb-1 lg:order-2">
                                <div className="klarna-icon flex items-center justify-center bg-light-yellow rounded py-1 min-w-[5.875em]">
                                    <img src="https://supernovabrands.github.io/cocoandeve-styleguides/images/logo-atome.svg" height="15px" className="inline-block align-baseline w-[68px]" alt="Klarna"/>
                                </div>
                                <div className="pl-g text-sm w-full">
                                    <span className="inline-block mr-25">4 interest-free payments of $15.70</span>
                                    <a className="text-sm" href="">Learn more</a>
                                </div>
                            </div>
                            <div className="flex items-center mb-1 lg:order-2">
                                <div className="klarna-icon flex items-center justify-center bg-secondary-light rounded py-1 min-w-[5.875em]">
                                    <img src="https://supernovabrands.github.io/cocoandeve-styleguides/images/logo-shoppay.svg" height="15px" className="inline-block align-baseline w-[68px]" alt="Klarna"/>
                                </div>
                                <div className="pl-g text-sm">
                                    <span className="inline-block mr-25">4 interest-free payments of $15.70</span>
                                    <a className="text-sm" href="">Learn more</a>
                                </div>
                            </div>
                            <div className="flex items-center mb-1 lg:order-2">
                                <div className="klarna-icon flex items-center justify-center bg-light-blue rounded py-1 min-w-[5.875em]">
                                    <img src="https://supernovabrands.github.io/cocoandeve-styleguides/images/logo-afterpay.svg" height="15px" className="inline-block align-baseline w-[68px]" alt="Klarna"/>
                                </div>
                                <div className="pl-g text-sm">
                                    <span className="inline-block mr-25">4 interest-free payments of $15.70</span>
                                    <a className="text-sm" href="">Learn more</a>
                                </div>
                            </div>

                            <div className="flex items-center mb-1 lg:order-2">
                                <div className="klarna-icon flex items-center justify-center bg-pink-light rounded py-1 min-w-[5.875em]">
                                    <img src="https://cdn.shopify.com/s/files/1/0073/5186/1332/t/75/assets/logo-klarna.svg?64921" height="15px" className="inline-block align-baseline w-[68px]" alt="Klarna"/>
                                </div>
                                <div className="pl-g text-sm">
                                    <span className="inline-block mr-25">4 interest-free payments of $15.70</span>
                                    <a className="text-sm" href="">Learn more</a>
                                </div>
                            </div>
                            <div className="flex items-center mb-1 lg:order-2">
                                <div className="free-shipping-icon flex items-center content-center bg-secondary-light rounded py-1 px-3 min-w-[5.875em]">
                                    <FastDelivery className="svg inline-block h-[1em]"/>
                                </div>
                                <div className="pl-g text-sm">
                                    <b className="block">FREE</b>
                                    <span>standard shipping on all orders above $50(SG)</span>
                                </div>
    						</div>
                        </form>
                        <a href="/" className="pdp-banner-click no-underline lg:order-2 pdp-banner-click mb-1 w-full mt-4">
                            <picture className="">
                                <img src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/1557f100-0d32-4fe3-b6f1-f4634cc04900/375x" className="w-full" alt="Halloween Sale!"/>
                            </picture>
                        </a>
                        <a href="#" className="underline text-primary text-sm lg:order-2 mb-2" role="button">Terms and Conditions</a>
                        {/* proud to be and accordion */}
                        <div className="proud-to-be-wrapper mb-2 mt-3 lg:mb-0 lg:order-2">
                            <h2 className="mb-0">Proud to be</h2>
                            <div className="">
                                <div className="carousel--scroll position-relative">
                                    <ul className="[scrollbar-width:none] carousel-inner flex flex-nowrap row w-auto list-unstyled mt-3 mb-1 overflow-x-auto overflow-y-hidden" role="listbox">
                                    <li className="col-2 flex items-center flex-col px-1 carousel-item active">
                                        <NaturalDha className="svg h-[1.625em]" /><span className="text-center flex-grow-1 font-size-sm mt-1">100% Natural DHA</span>
                                    </li>
                                    <li className="col-2 flex items-center flex-col px-1 carousel-item ">
                                        <Vegan className="svg h-[1.625em]" /><span className="text-center flex-grow-1 font-size-sm mt-1">Vegan</span>
                                    </li>
                                    <li className="col-2 flex items-center flex-col px-1 carousel-item ">
                                        <DimethiconeFree className="svg h-[1.625em]" /><span className="text-center flex-grow-1 font-size-sm mt-1">Silicone Free</span>
                                    </li>
                                    <li className="col-2 flex items-center flex-col px-1 carousel-item ">
                                        <CrueltyFree className="svg h-[1.625em]" /><span className="text-center flex-grow-1 font-size-sm mt-1">Cruelty Free</span>
                                    </li>
                                    <li className="col-2 flex items-center flex-col px-1 carousel-item ">
                                        <ToxinFree className="svg h-[1.625em]" /><span className="text-center flex-grow-1 font-size-sm mt-1">Toxin-free</span>
                                    </li>
                                    <li className="col-2 flex items-center flex-col px-1 carousel-item ">
                                        <Ethically className="svg h-[1.625em]" /><span className="text-center flex-grow-1 font-size-sm mt-1">Ethically Sourced</span>
                                    </li>
                                    <li className="col-2 flex items-center flex-col px-1 carousel-item ">
                                        <ParabenFree className="svg h-[1.625em]" /><span className="text-center flex-grow-1 font-size-sm mt-1">Paraben Free</span>
                                    </li>
                                    <li className="col-2 flex items-center flex-col px-1 carousel-item ">
                                        <Peta className="svg h-[1.625em]" /><span className="text-center flex-grow-1 font-size-sm mt-1">Peta Approved</span>
                                    </li>
                                    </ul>
                                    <div className="scrollbar mt-1 lg:mt-3 lg:hidden bg-gray-400">
                                        <div className="scrollbar--thumb bg-gray-500"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3 lg:mt-2 lg:mb-3 lg:order-2">
                            <AccordionPDP data={dataAccordion} onClick={toggleCard} openIndex={openIndex} />
                        </div>
                        {/* end of proud to be and accordion */}
                        <div className="upsell_product order-2">
                            <p className="h2 mb-2">Best paired with these products</p>
                            <ul className="list-unstyled mb-0 lg:order-2">
                                <li className="mb-2 lg:mb-3">
                                    <UpsellPdp title="That’s A Wrap Bundle" content="Like A Virgin Coconut Hair Masque, Two-tiered Tangle Tamer." comparePrice="£139.90" price="£129.90" />
                                </li>
                                <li>
                                    <UpsellPdp title="That’s A Wrap Bundle" content="Like A Virgin Coconut Hair Masque, Two-tiered Tangle Tamer." comparePrice="£139.90" price="£129.90" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;
