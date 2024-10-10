// import RealResultCarousel from "~/sections/RealResultCarousel";
import { EmblaOptionsType } from 'embla-carousel';
import { useEffect, useState } from 'react';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import ProductCardSideUpsell from '~/compounds/ProductCardSideUpsell';
import ProductCard from "~/compounds/ProductCard";
import Modal from '~/components/Modal';
import ModalWaitlist from "~/components/modal/Waitlist";
// import LaunchWaitList from '~/compounds/launch-waitlist';
// import { subscribeBluecoreWaitlist } from '~/modules/utils';
import LaunchWaitlistModals from './LaunchWaitlistModals';
import { checkLaunchWLBox } from '~/modules/utils';

const options: EmblaOptionsType = {
	loop: true,
};

const SideProductRoutineCarousel = (props: any) => {
    const { items, store, launchWL, loggedInEmail, trackBluecoreLaunchWaitlistEvent, submitsToSmsBumpAPi, trackEvent, addToCart, generalSetting, buildProductCardModel, badgeData } = props;
    const [launchSubmitted, setLaunchSubmitted] = useState(false);
    const [finalItems, setFinalItems] = useState([]);
    const dummyItems = [
		{
            active: "active lg:flex",
            step: "Step 1",
            nextStep: "Step 2",
            title: "Deluxe Exfoliating Mitt",
            text: "Exfoliates and lifts dead skin cells to preps skin for the perfect, streak-free self-tan",
            nexttitle: "Sunny Honey Bali Bronzing Bundle",
            nexttext: "Perfects and bronzes skin with a gorgeous self-tan without the bad tan smells, and orange tones!",
            comparePrice: "$44.90",
            price: "$34.90",
        },
        {
            active: "active lg:flex",
            step: "Step 2",
            nextStep: "Step 3",
            title: "Sunny Honey Bali Bronzing Bundle",
            text: "Perfects and bronzes skin with a gorgeous self-tan without the bad tan smells, and orange tones!",
            nexttitle: "Sunny Honey Bali Bronzing Bundle",
            nexttext: "Innovative micromist technology allows for an even, hands-free face-tanning experience for a flawless, long-lasting glow.",
            comparePrice: "$44.90",
            price: "$34.90",
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
            active: "active lg:flex",
            step: "Step 3",
            nextStep: "Step 2",
            title: "Antioxidant Face Tanning Micromist",
            text: "Innovative micromist technology allows for an even, hands-free face-tanning experience for a flawless, long-lasting glow.",
            nexttitle: "Sunny Honey Bali Bronzing Bundle",
            nexttext: "Perfects and bronzes skin with a gorgeous self-tan without the bad tan smells, and orange tones! ",
            comparePrice: "$44.90",
            price: "$34.90",
        }
	];

	const [emblaRef1, emblaApi1] = useEmblaCarousel({ align: 'start', ...options}, [
		Autoplay({ playOnInit: false, delay: 3000 })
	]);

    const [waitlistData, setWaitlistData] = useState({
        open: false,
        title: '',
        image: '',
        handle: undefined,
        date: '',
    });

    const [launchWLModal, setLaunchWLModal] = useState({
        open: false,
        variantId: null,
        handle: null,
        tags: [],
        productId: null,
    });
    const [launchWLModal2, setLaunchWLModal2] = useState({
        open: false,
        variantId: null,
        handle: null,
        tags: [],
        productId: null,
    });
    const [launchWLModal3, setLaunchWLModal3] = useState({
        open: false,
        variantId: null,
        handle: null,
        tags: [],
        productId: null,
    });

    const [launchWLSuccess, setLaunchWLSuccess] = useState(false);

    useEffect(() => {
        if (waitlistData.open) document.body.classList.add('overflow-y-hidden');
        else document.body.classList.remove('overflow-y-hidden');
    }, [waitlistData]);

    useEffect(() => {
        const mappedNodes = items.map((item) => {
            const nodes = item.variants.edges.map((variant) => {
                console.log('variant1', variant);
                return variant.node;
            })
            return {
                ...item,
                variants: { nodes },
            }
        })
        console.log('mappedNodes', mappedNodes); 
        const cardModel = mappedNodes?.filter((item) => item.availableForSale)?.map((r:any) => buildProductCardModel(store, r, generalSetting, badgeData)) || [];
        const cardModelmapped = cardModel.map((i) => {
            const { availableForSale, src, srcSet, handle, swatch, title, price, comparePrice, variants, badgeText, label, id, imgHover } = i;
            return {
                availableForSale,
                title,
                handle,
                src,
                srcSet,
                swatch,
                price,
                comparePrice,
                variants,
                badgeText,
                label,
                imgHover,
            }
        })
        console.log('cardModelmapped', cardModelmapped);
        setFinalItems(cardModelmapped || []);
        // const { products } = items;
        // const mapped = products.map((p) => buildProductCardModel(store, p, generalSetting, squareBadge));
    }, []);

	return (
        <>
        <div className="product-upsell-2 lg:pb-5 pt-0 md:pt-5">
            <div className="w-full justify-center px-0">
                <p className="h2 w-full mb-3 ">Shop the Routine</p>
                <div className="mx-0">
                    <Carousel.Wrapper emblaApi={emblaApi1}>
                        <Carousel.Inner emblaRef={emblaRef1} className="mx-0">
                            {finalItems?.length > 0 && finalItems.map((data: any, index: number) => {
                                const { isLaunchWL, launchBox } = checkLaunchWLBox(launchWL, data.handle);
                                return (
                                    <ProductCard
                                        key={`${index}-side-routine`}
                                        product={data}
                                        className={`relative mb-5 flex flex-col w-1/2 md:w-[180px]  text-center ${index === 0 ? 'flex-[0_0_175px] pl-0 pr-hg' : 'flex-[0_0_165px] pr-hg pl-hg'}`}
                                        button={true}
                                        setWaitlistData={setWaitlistData}
                                        smSingleStar={true}
                                        smSingleStarAllDevice={true}
                                        addToCart={addToCart}
                                        trackEvent={trackEvent}
                                        eventNameOnClick='shop_routine_product_card'
                                        isLaunchWL={isLaunchWL}
                                        launchBox={launchBox}
                                        setLaunchWLModal={setLaunchWLModal}
                                        setLaunchWLModal2={setLaunchWLModal2}
                                        setLaunchWLModal3={setLaunchWLModal3}
                                        generalSetting={generalSetting}
                                        collectionTemplate={true}
                                        store={store}
                                        sideUpsell={true}
                                    />
                                )
                            })}

                        </Carousel.Inner>
                    </Carousel.Wrapper>
                </div>
            </div>
        </div>
        { <Modal className="modal-lg lg:max-w-[43.125rem] modal-dialog-centered" isOpen={waitlistData.open} handleClose={() => setWaitlistData({...waitlistData, open: false })}>
            <ModalWaitlist data={waitlistData} handleClose={() => setWaitlistData({...waitlistData, open: false })} />
        </Modal> }

        {launchWL && (
            <LaunchWaitlistModals
                launchWL={launchWL}
                store={store}
                setLaunchWLModal={setLaunchWLModal}
                setLaunchWLModal2={setLaunchWLModal2}
                setLaunchWLModal3={setLaunchWLModal3}
                launchWLModal={launchWLModal}
                launchWLModal2={launchWLModal2}
                launchWLModal3={launchWLModal3}
                loggedInEmail={loggedInEmail}
                setLaunchWLSuccess={setLaunchWLSuccess}
                launchSubmitted={launchSubmitted}
                setLaunchSubmitted={setLaunchSubmitted}
                trackBluecoreLaunchWaitlistEvent={trackBluecoreLaunchWaitlistEvent}
                submitsToSmsBumpAPi={submitsToSmsBumpAPi}
            />
        )}
    </>
	);
};

export default SideProductRoutineCarousel;
