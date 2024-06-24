// import RealResultCarousel from "~/sections/RealResultCarousel";
import { EmblaOptionsType } from 'embla-carousel';
import { useEffect, useState } from 'react';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import ProductCardUpsell from '~/compounds/ProductCardUpsell';
import Modal from '~/components/Modal';
import ModalWaitlist from "~/components/modal/Waitlist";

const options: EmblaOptionsType = {
	loop: true,
};

const ProductRoutineCarousel = (props: any) => {
    const { items, store } = props;

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
    });

    useEffect(() => {
        if (waitlistData.open) document.body.classList.add('overflow-y-hidden');
        else document.body.classList.remove('overflow-y-hidden');
    }, [waitlistData]);

	return (
        <>
        <div className="product-upsell-2 pb-[70px] lg:pb-5 pt-0 md:pt-5">
            <div className="container justify-center">
                <p className="h1 w-full text-center mb-3 lg:px-g sm:px-h1">Shop the Routine</p>
                <div className="container lg:mx-g w-[100vw] lg:w-full px-0 lg:px-g">
                    <Carousel.Wrapper emblaApi={emblaApi1}>
                        <Carousel.Inner emblaRef={emblaRef1} className="mx-0 lg:-mx-g lg:!transform-none">
                            {items && items.map((data: any, index: number) => (
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
                                />
                            ))}

                            {!items && dummyItems.map((data: any, index: number) => (
                            <ProductCardUpsell
                                key={`${index}-routine`}
                                useCardTemplate={true}
                                useCarousel={true}
                                className={props.className}
                                item={data}
                                title={''}
                                store={store}
                                />
                            ))}

                        </Carousel.Inner>
                    </Carousel.Wrapper>
                </div>
            </div>
        </div>
        { <Modal className="modal-lg lg:max-w-[43.125rem]" isOpen={waitlistData.open} handleClose={() => setWaitlistData({...waitlistData, open: false })}>
            <ModalWaitlist data={waitlistData} handleClose={() => setWaitlistData({...waitlistData, open: false })} />
        </Modal> }
        </>
	);
};

export default ProductRoutineCarousel;
