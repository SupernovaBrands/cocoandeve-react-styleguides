import dynamic from 'next/dynamic';
import { useState } from "react";
import { Container, Row, Tabs, Tab, Collapse } from 'react-bootstrap';
import ProductImageCarousel from "@/components/ProductImageCarousel";
import LaunchWaitList from "@/compounds/launch-waitlist";
import ProductVariant from "@/compounds/product-variant";
import ProductSubscription from "@/components/product-subscription";
import UpsellPdp from "@/compounds/upsell-pdp";
// import QuantityBox from '@/components/cart/quantity-box';
import SaveResults from "@/components/save-results";
import YotpoStar from "@/components/YotpoStars";
import NaturalDha from '@/images/icons/natural-dha.svg';
import Vegan from '@/images/icons/vegan.svg';
import DimethiconeFree from '@/images/icons/dimethicone-free.svg';
import CrueltyFree from '@/images/icons/cruelty-free.svg';
import ToxinFree from '@/images/icons/toxin-free.svg';
import Gluten from '@/images/icons/gluten.svg';
import Ethically from '@/images/icons/ethically.svg';
import ParabenFree from '@/images/icons/paraben-free.svg';
import Peta from '@/images/icons/peta.svg';
import Recycle from '@/images/icons/recycle.svg';
import FastDelivery from '@/images/icons/fast-delivery.svg';
import WinnerAward from '@/images/icons/winner-award.svg';
import MoneyBack from '@/images/icons/moneyback.svg';
import Plus from '@/images/icons/plus.svg';
import Minus from '@/images/icons/minus.svg';
const QuantityBox = dynamic(() => import('@/components/cart/quantity-box'), {
    ssr: false,
});
const Product = (props) => {

    const [isMedium, setMedium] = useState(true);
    const [isDark, setDark] = useState(false);
    const [isUltra, setUltra] = useState(false);
    const [open, setOpen] = useState(false);
    const initialState = { 1: false, 2: false, 3: false};
    const [navState, setNavState] = useState(initialState);

    const handleClick = (navId) => setNavState((prev) => {
        return { ...prev, [navId]: !prev[navId] };
    });

    const swatchChange = (event) => {
        if(event.target.getAttribute("data-value") == "medium") {
            setMedium(true);
            setDark(false);
            setUltra(false);
        }
        else if(event.target.getAttribute("data-value") == "dark") {
            setMedium(false);
            setDark(true);
            setUltra(false);
        }
        else if(event.target.getAttribute("data-value") == "ultra-dark") {
            setMedium(false);
            setDark(false);
            setUltra(true);
        }
    }

    return (
        <>
            <Container className="px-g mb-4 mt-lg-5">
                <Row className="align-items-start">
                    <ProductImageCarousel totalSlide={8} />
                    <div className="col-12 col-lg-5 order-lg-3 mt-2 mt-lg-0 d-flex flex-column">
                        <YotpoStar productId={4543113265187} showTotal={true} />
                        <h1 className="mb-2 order-lg-0">Sunny Honey Bali Bronzing Foam</h1>
                        <p className="mb-2 mb-lg-4 font-size-lg order-lg-0">Anti-cellulite, anti-aging self tan</p>
                        <LaunchWaitList
                            title="Join the waitlist"
                            content="Get alerted when our newest product drops, and get a free gift with your purchase. You got to be quick! sign up now cause this is definitely goinf to sell out fast!"
                            policy="By signing up via text you agree to receive recurring automated marketing messages at the phone number provided. Consent is not a condition of purchase. Reply STOP to unsubscribe. HELP for help. Msg & Data rates may apply. View Privacy Policy & ToS."
                            success_msg="Thank you for subcribing to our waitlist!"
                            success_content="We'll keep you posted on our Bronzing Face Drop launch!. We hope you're exited as much as we are."
                            className="order-lg-2"
                        />
                        <form className="product-form order-lg-2 mt-1">
                            <p className="bg-gray-400 py-1 text-center">
                                Not Sure which shade to get? <a href="#" className="take-quiz-line text-body d-block d-lg-inline text-underline">Take our Tan Quiz</a>
                            </p>

                            <p className="product-variant__price-label-abtest d-none mb-0 fw-bold h2 py-2">
                                <span className="mr-25 text-nowrap text-gray-600">$89.80</span>
                                <span className="mr-25 text-nowrap">$44.90</span>
                                <span className="text-primary text-nowrap">(SAVE 30%)</span>
                            </p>

                            <div className="swatch">
                                <ProductVariant
                                    id="product-variant-1-x-sunny-honey-bali-bronzing-foam"
                                    name="product-variant"
                                    title="1x Sunny Honey Bali Bronzing Foam"
                                    value="1-x-sunny-honey-bali-bronzing-foam"
                                    checked={true}
                                    inventory="10"
                                    dataID="32068892426275"
                                    variant_description="1x Masque + Brush"
                                    price="$44.90"
                                    margin="mb-1"
                                    >
                                    <button onClick={swatchChange} type="button" className={`variant-swatch medium me-2 ${isMedium ? 'border-primary' : ''}`} data-value="medium" data-id="32068891541539"></button>
                                    <button onClick={swatchChange} type="button" className={`variant-swatch dark me-2 ${isDark ? 'border-primary' : ''}`} data-value="dark" data-id="32068891607075"></button>
                                    <button onClick={swatchChange} type="button" className={`variant-swatch ultra-dark ${isUltra ? 'border-primary' : ''}`} data-value="ultra-dark" data-id="32068891639843"></button>
                                    {isMedium && <p className="font-size-sm w-100 mt-2 mb-0 swatch-label-medium"><b>Medium</b> - Subtle glow, lighter skin tones</p>}
                                    {isDark && <p className="font-size-sm w-100 mt-2 mb-0 swatch-label-dark"><b>Dark</b> - Subtle glow, lighter skin tones</p>}
                                    {isUltra && <p className="font-size-sm w-100 mt-2 mb-0 swatch-label-ultra-dark"><b>Ultra Dark</b> - Subtle glow, lighter skin tones</p>}
                                </ProductVariant>
                                <ProductVariant
                                    id="product-variant-1-x-sunny-honey-bali-bronzing-bundle"
                                    name="product-variant"
                                    title="1x Sunny Honey Bali Bronzing Bundle"
                                    value="1-x-sunny-honey-bali-bronzing-bundle"
                                    compare={true}
                                    save="(SAVE 30%)"
                                    inventory="10"
                                    dataID="32068892426275"
                                    variant_description="1x Masque + Brush"
                                    note="Ultra dark OOS waitlist, dark oos"
                                    price="$44.90"
                                    comparePrice="$89.80"
                                    margin="mb-1"
                                >
                                    <button onClick={swatchChange} type="button" className={`variant-swatch medium me-2 ${isMedium ? 'border-primary' : ''}`} data-value="medium" data-id="32068891541539"></button>
                                    <button onClick={swatchChange} type="button" className={`variant-swatch dark me-2 oos ${isDark ? 'border-primary' : ''}`} data-value="dark" data-id="32068891607075"></button>
                                    <button onClick={swatchChange} type="button" className={`variant-swatch ultra-dark oos waitlist ${isUltra ? 'border-primary' : ''}`} data-value="ultra-dark" data-id="32068891639843"></button>
                                                {isMedium && <p className="font-size-sm w-100 mt-2 mb-0 swatch-label-medium"><b>Medium</b> - Subtle glow, lighter skin tones</p>}
                                    {isDark && <p className="font-size-sm w-100 mt-2 mb-0 swatch-label-dark"><b>Dark</b> - Subtle glow, lighter skin tones</p>}
                                    {isUltra && <p className="font-size-sm w-100 mt-2 mb-0 swatch-label-ultra-dark"><b>Ultra Dark</b> - Subtle glow, lighter skin tones</p>}
                                </ProductVariant>
                                <ProductVariant
                                    id="product-variant-bronzing-face-drops"
                                    name="product-variant"
                                    title="Bronzing Face Drops"
                                    value="bronzing-face-drops"
                                    compare={true}
                                    save="(SAVE 30%)"
                                    inventory="10"
                                    dataID="32068892426275"
                                    variant_description="1x Masque + Brush"
                                    note="No shade swatch test"
                                    price="$44.90"
                                    comparePrice="$89.80"
                                        hideSwatch={true}
                                    margin="mb-3"
                                />
                                <ProductVariant
                                    id="product-variant-shampoo-conditioner-set"
                                    title_subscription=""
                                    name="product-variant"
                                    title="Shampoo & Conditioner Set"
                                    value="shampoo-conditioner-set"
                                    classes="product-variant--subscription"
                                    compare={true}
                                    save="(SAVE 30%)"
                                    inventory="10"
                                    dataID="32068892426275"
                                    variant_description="1x Masque + Brush"
                                    note="Super Hydrating Shampoo (250s)"
                                    price="$44.90"
                                    comparePrice="$89.80"
                                    hideSwatch={true}
                                    subscription={true}
                                    margin="mb-3"
                                />
                            </div>
                            <ProductSubscription />
                            <div className="results-swatch py-2 border border-primary-light-second border-start-0 border-end-0 mb-2 d-flex align-items-center">
                                <button type="button" className="variant-swatch variant-swatch--lg medium me-2 border-primary" data-value="medium" data-id="32068892295203"></button>
                                <p className="mb-0"><strong>Your perfect shade – Medium</strong> <br/> will give you subtle glow</p>
                            </div>
                            <div className="product-swatch-mobile__trigger">
                                <div className="product-form-submit mb-3 position-relative">
                                    <div className="d-flex">
                                        <QuantityBox
                                            name="quantity-box"
                                            editable={false}
                                            isLastStock={false}
                                            productStock={1}
                                            quantity={1}
                                            productId={32068892426275}
                                        />
                                        <input className="btn btn-lg btn-primary btn-block ms-1 ms-lg-g w-100" type="submit" value="Add to Cart"></input>
                                    </div>
                                </div>
                            </div>
                            <SaveResults />
                            <ul className="pdp-services order-lg-2 list-unstyled row mt-3 my-4 text-center d-none d-lg-flex">
                                <li className="col-4 px-0 d-flex flex-column">
                                    <FastDelivery className="svg h1 fill-secondary" />
                                    Delivery from<br /> US warehouse
                                </li>
                                <li className="col-4 px-0 d-flex flex-column">
                                    <WinnerAward className="svg h1 fill-secondary" />
                                    Award-winning<br /> beauty
                                </li>
                                <li className="col-4 px-0 d-flex flex-column">
                                    <MoneyBack className="svg h1 fill-secondary" />
                                    Money back<br /> guarantee
                                </li>
                            </ul>
                            <div className="product-form-submit pay-wrapper mb-3 mb-lg-4">
                                <div className="mb-1">
                                    or 4 interest-free installments of $15.70 by
                                    <img src="https://supernovabrands.github.io/cocoandeve-styleguides/images/logo-klarna.svg" height="15px" className="ms-1 d-inline-block align-baseline" alt="Klarna" />
                                </div>

                                <div>Fast shipping worldwide</div>
                            </div>
                        </form>
                        <a hreh="/"  className="text-decoration-none order-lg-2 pdp-banner">
                            <figure className="pdp-banner d-flex order-lg-2 mb-3 mb-lg-4">
                                <picture className="flex-shrink-0 col-5 col-lg-4 p-0">
                                    <source srcSet="https://via.placeholder.com/314x314.jpg/EFADBA" media="(min-width: 992px)" />
                                    <img src="https://via.placeholder.com/320x228.jpg/EFADBA" className="w-100" alt="Halloween Sale!" />
                                </picture>
                                <figcaption className="col-7 col-lg-8 px-2 py-1 py-lg-2 bg-gray-400 d-flex flex-column">
                                    <h4 className="mb-0">Halloween Sale!</h4>
                                    <p className="font-size-xs font-size-dt-base mb-0 flex-grow-1 text-decoration-none">*min. spend of $50 applies.</p>
                                    <p className="font-size-sm mb-0 text-primary justify-self-end text-decoration-none">Pick your gift with code: <br />CIRCLE <br />TRIANGLE <br />SQUARE</p>
                                </figcaption>
                            </figure>
                        </a>
                        <div className="order-lg-1 mb-3 mb-lg-4">
                            <Tabs
                                defaultActiveKey="product-benefits-tab"
                                id="product-info-tab"
                                className="product-info-tab nav nav-tabs justify-content-between"
                                role="tablist" >
                                <Tab eventKey="product-benefits-tab" title="Benefits" tabClassName="nav-link border-0 text-body text-decoration-none pt-0 pb-1 w-100">
                                    <ul className="list-check mb-0 mt-2">
                                        <li>Blurs Pigmentation and Perfects Skin.</li>
                                        <li>Tropical Mango and Guava Scent.</li>
                                        <li>Lightweight, non-sticky formula.</li>
                                        <li>Fast drying and develops in just 2 hours</li>
                                        <li>Vegan. 100% Natural DHA. No Nasties</li>
                                    </ul>
                                </Tab>
                                <Tab eventKey="product-proudtobe-tab" title="Proud to be" tabClassName="nav-link border-0 text-body text-decoration-none pt-0 pb-1 w-100">
                                    <ul className="list-unstyled row mt-3 mb-1" id="product-proudtobe">
                                        <li className="col-6 d-flex align-items-center mb-2"><NaturalDha className="svg" /> 100% Natural DHA</li>
                                        <li className="col-6 d-flex align-items-center mb-2"><Vegan className="svg" /> Vegan</li>
                                        <li className="col-6 d-flex align-items-center mb-2"><DimethiconeFree className="svg" /> Silicone Free</li>
                                        <li className="col-6 d-flex align-items-center mb-2"><CrueltyFree className="svg" /> Cruelty Free</li>
                                        <li className="col-6 d-flex align-items-center mb-2"><ToxinFree className="svg" /> Toxin-free</li>
                                        <li className="col-6 d-flex align-items-center mb-2"><Gluten className="svg" /> Gluten Free</li>
                                        <li className="col-6 d-flex align-items-center mb-2"><Ethically className="svg" /> Ethically Sourced</li>
                                        <li className="col-6 d-flex align-items-center mb-2"><ParabenFree className="svg" /> Paraben Free</li>
                                        <li className="col-6 d-flex align-items-center mb-2"><Peta className="svg" /> Peta Approved</li>
                                    </ul>
                                    <a href="#sustainability"><u>More on our sustainability</u></a><Recycle className="svg ms-1 text-primary" />
                                </Tab>
                                <Tab eventKey="product-ingredients-tab" title="Ingredients" tabClassName="nav-link border-0 text-body text-decoration-none pt-0 pb-1 w-100">
                                    <div className="font-size-sm mt-2" id="product-ingredients">
                                        <p className="mb-1">100% Natural DHA:</p>
                                        <p className="mb-1">Get a healthy looking, natural tan in just 2 hours that can last up to 2 weeks.</p>
                                        <p className="mb-1">CellushapeTM:</p>
                                        <p className="mb-1">Anti-cellulite properties to firm & nourish the skin. (explain more - what it is, studies)</p>
                                        <p className="mb-1">Raw Virgin Coconut:</p>
                                        <p className="mb-1">Hydrate and firm skin along with botanicals and amino acids.</p>
                                        <p className="mb-1">Mango, Fig and Cocoa:</p>
                                        <p className="mb-1">Enriched with powerful natural antioxidants to improve signs of ageing.</p>
                                        <a id="product-ingredients__toggle" href="#product-ingredients" className="collapsed text-body text-underline mt-2 mb-1 d-inline-block"
                                            role="button" data-toggle="collapse" data-target="#product-ingredients__full" aria-expanded="false"
                                            aria-controls="product-ingredients">Full ingredients list</a>
                                        <div id="product-ingredients__full" className="collapse" aria-labelledby="product-ingredients__toggle">
                                            Aqua (Water), Dihydroxyacetone, Glycerin, Pentylene Glycol, PEG-40 Hydrogenated Castor Oil, Trideceth-9, Hydroxypropyl Methylcellulose, Coconut Oil Glycereth-8 Esters, Sodium Cocoyl Glutamate, Parfum (Fragrance), Citric Acid, Sodium Benzoate, Potassium Sorbate, Propylene Glycol, Erythrulose, Benzyl Alcohol, Trisodium Ethylenediamine Disuccinate, Lotus Maritimus Flower/Leaf Extract, Musa Sapientum (Banana) Extract, Citrus Aurantium Dulcis (Orange) Peel Extract, Citrus Nobilis (Mandarin Oil Green) Extract, Carica Papaya (Papaya) Fruit Extract, Cocos Nucifera (Coconut) Fruit Extract, Ficus Carica (Fig) Fruit Extract, Garcinia Mangostana Fruit Extract, Mangifera Indica (Mango) Fruit Extract, Theobroma Cacao (Cocoa) Seed Extract, Coumarin, Limonene, Butylphenyl Methylpropional, Benzyl Salicylate, CI 14700 (Red 4), CI 19140 (Yellow 5), CI 42090 (Blue 1).
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                        <ul id="product-collapse" className="list-unstyled border-top mb-4 order-lg-2">
                            <li className="py-3 border-bottom">
                                <button onClick={() => handleClick(1)} id="product-collapse-1__toggle" className={`btn-unstyled w-100 d-flex justify-content-between fw-bold text-body product-collapse__toggle ${navState[1] ? '' : 'collapsed'}`} type="button">
                                    How to Use
                                   <Plus className="icon-plus svg" /><Minus className="icon-minus svg" />
                                </button>
                                <Collapse in={navState[1]}>
                                    <div id="product-collapse-1" className="product-collapse font-size-sm">
                                        <p className="mt-3 mb-1 fw-bold">1. Remove unwanted hair</p>
                                        <p className="mb-3">and exfoliate thoroughly (ideally 6-24 hours before.)</p>
                                        <p className="mb-1 fw-bold">2. Apply to dry skin</p>
                                        <p className="mb-3">free from moisturisers.</p>
                                        <p className="mb-1 fw-bold">3. Use Mitt & Brush</p>
                                        <p className="mb-3">To apply to tricky areas like the feet, hands, face & ears.</p>
                                        <p className="mb-1 fw-bold">4. Allow to develop</p>
                                        <p className="mb-3">for a minimum of 2 hours or overnight for a deeper tan.</p>
                                        <p className="mb-1 fw-bold">5. Shower in warm water</p>
                                        <p className="mb-3">to remove the guide colour and pat skin dry.</p>
                                        <p className="mb-1 fw-bold">6. Repeat every 5-7 days</p>
                                        <p className="mb-3">or when needed. Moisturise daily to maintain results.</p>
                                    </div>
                                </Collapse>
                            </li>
                            <li className="py-3 border-bottom">
                                <button onClick={() => handleClick(2)} id="product-collapse-2__toggle" className={`btn-unstyled w-100 d-flex justify-content-between fw-bold text-body product-collapse__toggle  ${navState[2] ? '' : 'collapsed'}`} type="button" data-toggle="collapse" data-target="#product-collapse-2" aria-expanded="true" aria-controls="product-collapse-2">
                                    FAQ
                                    <Plus className="icon-plus svg" /><Minus className="icon-minus svg" />
                                </button>
                                <Collapse in={navState[2]}>
                                    <div id="product-collapse-2" className="product-collapse font-size-sm">
                                        <p className="mt-3 mb-2">Which Sunny Honey colour should I go for?</p>
                                        <p className="mb-3">Toned and radiant, with brighter eyes, whiter teeth and sculpted cheekbones – there’s no denying the confidence-boosting
                                        power of a good self-tan! But, whether you’re pale, olive or dark-skinned, it can be hard to know where to start.
                                        Thankfully, our ultimate Sunny Honey tan colour guide promises unBALIevable transformations – for all skin tones. To
                                        learn all you need to know about choosing the right self-tan for your skin tone, read on!</p>
                                        <p className="mb-2">How to use Sunny Honey Bali Bronzing Foam?</p>
                                        <p className="mb-3">Don’t freak over streaks or panic over patches – here’s how to use Sunny Honey Bali Bronzing Foam for the best self-tanning results under the sun! Simple to follow but super important, these foolproof tips will level up your self-tanning game – whether you’re a fake tanning first-timer or committed to faux-glow.</p>
                                        <p className="mb-2">How often should I self-tan?</p>
                                        <p className="mb-3">Each bottle has roughly 260 pumps and can last approximately 10-20 full body tanning sessions.</p>
                                        <a className="fw-bold" href="">See all Product FAQs</a>
                                    </div>
                                </Collapse>
                            </li>
                            <li className="py-3 border-bottom">
                                <button onClick={() => handleClick(3)} id="product-collapse-3__toggle" className={`btn-unstyled w-100 d-flex justify-content-between fw-bold text-body product-collapse__toggle ${navState[3] ? '' : 'collapsed'}`} type="button">
                                    Shipping &amp; Returns
                                    <Plus className="icon-plus svg" /><Minus className="icon-minus svg" />
                                </button>
                                <Collapse in={navState[3]}>
                                    <div id="product-collapse-3" className="product-collapse font-size-sm">
                                        <p className="mt-3 mb-2">Enjoy FREE shipping on orders over $39.*</p>
                                        <table className="shipping-table table table-bordered text-center mt-3 mb-2">
                                            <thead>
                                                <tr>
                                                    <th>Country<br />(Minimum Spend)</th>
                                                    <th>Over<br />Minimum Spend</th>
                                                    <th>Below<br />Minimum Spend</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Austria<br />(€48)</td>
                                                    <td>FREE<br />3 - 4 days</td>
                                                    <td>€7.90<br />3 - 4 days</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p className="mb-3">Rest of the countries, <a href="#shipping-modal" data-toggle="modal">click here.</a></p>
                                        <p className="mb-2">Return & Refund Policy</p>
                                        <p className="mb-2">We offer a 30 day return & refund policy with a 100% money back guarantee. For more details see more.</p>
                                        <p>Contact our customer service team, <a href="">click here.</a></p>
                                    </div>
                                </Collapse>
                            </li>
                        </ul>
                        <div className="upsell_product order-2 order-lg-2">
                            <p className="h2 mb-2">Best paired with these products</p>
                            <ul className="list-unstyled mb-0 order-lg-2">
                                <li className="mb-2 mb-lg-3">
                                    <UpsellPdp title="That’s A Wrap Bundle" content="Like A Virgin Coconut Hair Masque, Two-tiered Tangle Tamer." comparePrice="£139.90" price="£129.90" />
                                </li>
                                <li>
                                    <UpsellPdp title="That’s A Wrap Bundle" content="Like A Virgin Coconut Hair Masque, Two-tiered Tangle Tamer." comparePrice="£139.90" price="£129.90" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default Product;
