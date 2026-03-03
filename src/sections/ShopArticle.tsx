import { EmblaOptionsType } from 'embla-carousel';
// import { useState } from 'react';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import {
	usePrevNextButtons,
	controlAutoplay,
} from '~/components/carousel/EmblaCarouselArrowButtons';
import ProductCard from "~/compounds/ProductCard";
import { useState, useEffect } from 'react';
import Modal from "~/components/Modal";
import ModalWaitlist from "~/components/modal/Waitlist";
import ProductInfo from '~/components/modal/ProductInfo';

const options: EmblaOptionsType = {
	loop: true,
    startIndex: 0,
    align: 'start'
};

const ProductCarousel = (props: any) => {

	const { addToCart, generalSetting, label, store, isLoading, bluecoreProductWaitlist, trackBluecoreEvent, waitlistPdpSetting,
        getActiveWL, getId, subscribeBluecoreWaitlist, submitsToSmsBumpAPi, launchProductWaitlist, buildProductCardModel,
        Faq, FragranceNotes, strapiAutomateHardcode, checkHardcodedImages,
        checkHardcodedTitles, checkHardcodedVariant, checkHardcodedTagline, checkHardcodedFaq, checkHardcodedHowToUse,
        BenefitIngredient, HowToUse, ProductSettings, trackBluecoreLaunchWaitlistEvent, tiktokSubscribe, fbqEvent } = props;
    const [products, setProducts] = useState(props.products);

    useEffect(() => {
        if (props?.products) {
            setProducts(props.products);
        }
    }, [props])

    const [waitlistData, setWaitlistData] = useState({
        open: false,
        title: '',
        image: '',
        handle: undefined,
        date: '',
        productId: null,
    });

    const [productData, setProductData] = useState({
        open: false,
        handle: null,
        selectedVariant: null,
        tab: null,
        swatch: null
    });

    useEffect(() => {
        // console.log('modal detail open', productData.open);
        if (productData.open) document.body.classList.add('!overflow-hidden');
        else document.body.classList.remove('!overflow-hidden');
    }, [productData.open])

    useEffect(() => {
        if (window.innerWidth <= 991) {
            let extendedProducts = [...products];
            if (extendedProducts.length < 3) {
                const productItems = 4 - extendedProducts.length;
                extendedProducts = extendedProducts.concat(extendedProducts.slice(0, productItems));
            }
            // move first elem to last index
            const firstEl = extendedProducts.shift();
            setProducts([...extendedProducts, firstEl]);
        }
    }, []);

	//tab 1
	const [emblaRef1, emblaApi1] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: false, delay: 3000 })
	]);
	const {
		onPrevButtonClick: arrowClickPrev1,
		onNextButtonClick: arrowClickNext1
	} = usePrevNextButtons(emblaApi1);
	const autoPlayClick1 = controlAutoplay(emblaApi1);
	return (
        <>
            <div className="pt-0 text-center">
                {products.length > 0 && (
                    <Carousel.Wrapper emblaApi={emblaApi1} className="carousel__products">
                        <Carousel.Inner emblaRef={emblaRef1} className="lg:justify-center">
                            {products.map((data: any, id: number) => (
                                <ProductCard
                                    key={`product-${id}-${data.id}`}
                                    product={data}
                                    label={label}
                                    className="relative flex-grow-0 flex-shrink-0 flex flex-col w-[175px] basis-[175px] md:w-[180px] md:basis-[180px] lg:px-1 sm:px-hg text-center"
                                    button={true}
                                    link={data.handle}
                                    carousel={true}
                                    addToCart={addToCart}
                                    shopArticle={true}
                                    generalSetting={generalSetting}
                                    setWaitlistData={setWaitlistData}
                                    setProductData={setProductData}
                                    clickShowPopup={true}
                                    badge={false}
                                />)
                            )}
                        </Carousel.Inner>
                        {/* <Carousel.Navigation>
                            <PrevButton
                                onClick={() => autoPlayClick1(arrowClickPrev1)}
                                className="lg:-left-[1.25em] lg:w-4 text-primary lg:hidden"
                            >
                                <span className="bg-white w-4 h-4 absolute z-[-1] flex justify-center items-center top-[24.5%] md:top-[6.25em] lg:top-[8.125em] left-[1.5625em]">
                                    <ChevronPrev className="w-[16px] h-[16px] svg--current-color" />
                                </span>
                            </PrevButton>
                            <NextButton
                                onClick={() => autoPlayClick1(arrowClickNext1)}
                                className="lg:-right-[1.25em] lg:w-4 text-primary lg:hidden"
                            >
                                <span className="bg-white w-4 h-4 absolute z-[-1] flex justify-center items-center top-[24.5%] md:top-[6.25em] lg:top-[8.125em] right-[1.5625em]">
                                    <ChevronNext className="w-[16px] h-[16px] svg--current-color" />
                                </span>
                            </NextButton>
                        </Carousel.Navigation> */}
                    </Carousel.Wrapper>
                )}
            </div>

            {!isLoading && (
                <>
                    <Modal className="modal-lg lg:max-w-[43.125rem] modal-dialog-centered" isOpen={waitlistData.open} handleClose={() => setWaitlistData({...waitlistData, ...{ open: false }})}>
                        <ModalWaitlist store={store} bluecoreProductWaitlist={bluecoreProductWaitlist} trackBluecoreEvent={trackBluecoreEvent} data={waitlistData} waitlistPdp={waitlistPdpSetting} handleClose={() => setWaitlistData({...waitlistData, ...{ open: false }})} />
                    </Modal>
                    <Modal contentClass={'flex-1 rounded-[.5rem]'} className="modal__mini-pdp modal-lg lg:max-w-[1070px] modal-dialog-centered lg:items-center" isOpen={productData.open} handleClose={() => setProductData({...productData, ...{ open: false }})}>
                        <ProductInfo
                            getActiveWL={getActiveWL}
                            getId={getId}
                            waitlistPdpStore={waitlistPdpSetting}
                            launchProductWaitlist={launchProductWaitlist}
                            generalSetting={generalSetting}
                            strapiAutomateHardcode={strapiAutomateHardcode}
                            checkHardcodedImages={checkHardcodedImages}
                            checkHardcodedTitles={checkHardcodedTitles}
                            checkHardcodedVariant={checkHardcodedVariant}
                            checkHardcodedTagline={checkHardcodedTagline}
                            checkHardcodedFaq={checkHardcodedFaq}
                            checkHardcodedHowToUse={checkHardcodedHowToUse}
                            ProductSettings={ProductSettings}
                            BenefitIngredient={BenefitIngredient}
                            HowToUse={HowToUse}
                            Faq={Faq}
                            ctaBgColor={generalSetting?.bfcm_cta_bg_color}
                            FragranceNotes={FragranceNotes}
                            store={store}
                            data={productData}
                            setTab1Selected={() => null}
                            tab1Selected={[]}
                            setTab0Selected={() => null}
                            tab0Selected={[]}
                            activeTab={0}
                            maxItem={5}
                            buildProductCardModel={buildProductCardModel}
                            // useMediaQuery={useMediaQuery}
                            directAddToCart={true}
                            addToCart={addToCart}
                            fbqEvent={fbqEvent}
                            tiktokSubscribe={tiktokSubscribe} 
                            subscribeBluecoreWaitlist={subscribeBluecoreWaitlist}
                            submitsToSmsBumpAPi={submitsToSmsBumpAPi} 
                            bluecoreProductWaitlist={bluecoreProductWaitlist}
                            trackBluecoreLaunchWaitlistEvent={trackBluecoreLaunchWaitlistEvent}
                            handleClose={() => setProductData({...productData, ...{ open: false }})} />
                    </Modal>
                </>
            )}
        </>
	);
};

export default ProductCarousel;
