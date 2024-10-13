// import RealResultCarousel from "~/sections/RealResultCarousel";
import { EmblaOptionsType } from 'embla-carousel';
import { useEffect, useState } from 'react';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import ProductCardUpsell from '~/compounds/ProductCardUpsell';
import Modal from '~/components/Modal';
import ModalWaitlist from "~/components/modal/Waitlist";
// import LaunchWaitList from '~/compounds/launch-waitlist';
// import { subscribeBluecoreWaitlist } from '~/modules/utils';
import LaunchWaitlistModals from './LaunchWaitlistModals';
import { checkLaunchWLBox } from '~/modules/utils';

const options: EmblaOptionsType = {
	loop: true,
};

const ProductRoutineCarousel = (props: any) => {
    const { items, store, launchWL, loggedInEmail, trackBluecoreLaunchWaitlistEvent, submitsToSmsBumpAPi } = props;

    const [launchSubmitted, setLaunchSubmitted] = useState(false);
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

	return (
        <>
        <div className="product-upsell-2 pb-[70px] lg:pb-5 pt-0 md:pt-5 overflow-x-hidden product-upsell-2-original">
            <div className="container justify-center">
                <p className="h1 w-full text-center mb-3 lg:px-g sm:px-h1">Shop the Routine</p>
                <div className="container lg:mx-g w-[100vw] lg:w-full px-0 lg:px-g">
                    <Carousel.Wrapper emblaApi={emblaApi1}>
                        <Carousel.Inner emblaRef={emblaRef1} className="mx-0 lg:-mx-g lg:!transform-none lg:justify-center">
                            {items && items.map((data: any, index: number) => {
                                const { isLaunchWL, launchBox } = checkLaunchWLBox(launchWL, data.handle);
                                return (
                                    <ProductCardUpsell
                                        key={`${index}-routine`}
                                        useCardTemplate={true}
                                        useCarousel={true}
                                        className={props.className}
                                        item={data}
                                        waitlistData={waitlistData}
                                        setWaitlistData={setWaitlistData}
                                        title={data?.title}
                                        store={store}
                                        isLaunchWL={isLaunchWL}
                                        launchBox={launchBox}
                                        setLaunchWLModal={setLaunchWLModal}
                                        setLaunchWLModal2={setLaunchWLModal2}
                                        setLaunchWLModal3={setLaunchWLModal3}
                                        />
                                )
                            })}

                            {!items && dummyItems.map((data: any, index: number) => (
                            <ProductCardUpsell
                                key={`${index}-routine`}
                                useCardTemplate={true}
                                useCarousel={true}
                                className={props.className}
                                item={data}
                                title={''}
                                store={store}
                                isLaunchWL={false}
                                launchBox={1}
                                setLaunchWLModal={setLaunchWLModal}
                                setLaunchWLModal2={setLaunchWLModal2}
                                setLaunchWLModal3={setLaunchWLModal3}
                                />
                            ))}

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

export default ProductRoutineCarousel;
