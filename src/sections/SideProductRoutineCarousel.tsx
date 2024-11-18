// import RealResultCarousel from "~/sections/RealResultCarousel";
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import { useEffect, useState, useCallback } from 'react';
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
	loop: false,
    dragFree: true,
};

const WithCarousel = ({carousel, children, emblaApi1, emblaRef1}) => (carousel ? 
    <Carousel.Wrapper emblaApi={emblaApi1}>
        <Carousel.Inner emblaRef={emblaRef1} className="mx-0">
            {children}
        </Carousel.Inner>
    </Carousel.Wrapper>
    : children
)

const SideProductRoutineCarousel = (props: any) => {
    const { items, store, launchWL, loggedInEmail, trackBluecoreLaunchWaitlistEvent, submitsToSmsBumpAPi, trackEvent, addToCart, generalSetting, buildProductCardModel, badgeData } = props;
    const [launchSubmitted, setLaunchSubmitted] = useState(false);
    const [finalItems, setFinalItems] = useState([]);
    const [scrollProgress, setScrollProgress] = useState(0);

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

    const onScroll = useCallback((emblaApi1: EmblaCarouselType) => {
		const progress = Math.max(0, Math.min(1, emblaApi1.scrollProgress()));
		setScrollProgress(progress * 70);
	}, []);

    useEffect(() => {
		if (!emblaApi1) return;
		emblaApi1.on('reInit', onScroll);
		emblaApi1.on('scroll', onScroll);
	}, [emblaApi1, onScroll]);

    useEffect(() => {
        if (waitlistData.open) document.body.classList.add('overflow-y-hidden');
        else document.body.classList.remove('overflow-y-hidden');
    }, [waitlistData]);

    useEffect(() => {
        const mappedNodes = items.map((item) => {
            const nodes = item.variants.edges.map((variant) => {
                return variant.node;
            })
            return {
                ...item,
                variants: { nodes },
            }
        })
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
        setFinalItems(cardModelmapped || []);
        // const { products } = items;
        // const mapped = products.map((p) => buildProductCardModel(store, p, generalSetting, squareBadge));
    }, []);

	return (
        <>
        <div className="product-side-upsell lg:pb-1 pt-0 md:pt-2">
            <div className="w-full justify-center px-0">
                <p className="h2 w-full mb-3 ">Shop the Routine</p>
                <div className={`mx-0 ${finalItems?.length <= 2 ? 'flex' : ''}`}>
                    <WithCarousel carousel={finalItems?.length > 2} emblaApi1={emblaApi1} emblaRef1={emblaRef1}>
                        {finalItems?.length > 0 && finalItems.map((data: any, index: number) => {
                            const { isLaunchWL, launchBox } = checkLaunchWLBox(launchWL, data.handle);
                            return (
                                <ProductCard
                                    key={`${index}-side-routine`}
                                    product={data}
                                    className={`relative mb-1 flex flex-col w-1/2 md:w-[180px]  text-center ${index === 0 ? 'flex-[0_0_172.5px] pl-0 pr-hg' : index === 2 ? 'flex-[0_0_172.5px] pr-0 pl-hg' : 'flex-[0_0_180px] pr-hg pl-hg'}`}
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
                    </WithCarousel>
                    
                    {finalItems.length > 2 && (
                        <div className="px-0">
                            <div className="carousel__progress bg-gray-400">
                                <div
                                    className="carousel__progress--scroll bg-gray-500"
                                    style={{ left: `${scrollProgress}%`, width: `${((1 / finalItems.length) * 100) + 2.5}%` }} />
                            </div>
                        </div>
                    )}
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
