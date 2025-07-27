import { EmblaOptionsType } from 'embla-carousel';
import TabNav from '~/components/TabNav';
import TabContent from '~/components/TabContent';
import { useEffect, useState } from 'react';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import useEmblaCarousel from 'embla-carousel-react';
import ChevronNext from '~/images/icons/chevron-next.svg';
import ChevronPrev from '~/images/icons/chevron-prev.svg';
import Modal from "~/components/Modal";
import ModalWaitlist from "~/components/modal/Waitlist";
import {
    PrevButton,
    NextButton,
} from '~/components/carousel/EmblaCarouselArrowButtons';
import ProductCard from "~/compounds/ProductCard";

const options: EmblaOptionsType = {
    loop: true,
    align: 'start',
    breakpoints: {
        '(min-width: 992px)': {
            watchDrag: false,
            duration: 40,
        }
    }
}

const SingleProductCarousel = (props: any) => {
    const { waitlistPdpSetting, store, data, addToCart, trackEvent, trackBluecoreEvent, preOrders, generalSetting, products } = props;
    const [waitlistData, setWaitlistData] = useState({
        open: false,
        title: '',
        image: '',
        handle: undefined,
        date: '',
    });

    let productsData = data;
    //tab 1
    const [emblaRef2, emblaApi2] = useEmblaCarousel(options);

    useEffect(() => {
        if (waitlistData.open) document.body.classList.add('overflow-y-hidden');
        else document.body.classList.remove('overflow-y-hidden');
    }, [waitlistData]);

    const onAdd = async (variant:any) => {
        console.log(variant);
        const addLine = await addToCart({
            id: variant.id,
            quantity: 1,
            attributes: [
                { key: '_free_sample', value: "yes" },
            ],
            bubble: true,
        });
    }

    return (
        <>
        <div className={`container px-0 text-center product__carousel product__carousel-homepage py-3 lg:pb-0 lg:px-0 mb-4 lg:mb-5 lg:pb-4`}>
            <h2 className="text-xl lg:text-2xl text-center mb-g lg:mb-1 mx-5 lg:mx-0 ">{data?.heading}</h2>
            <p className='mb-g mx-4 lg:mx-0 '>{data?.subheading}</p>
            <div className="row">
                <div className="product__carousel-body pl-[.5625em] lg:px-0 text-center">
                    <Carousel.Wrapper emblaApi={emblaApi2} className="carousel__products">
                        <Carousel.Inner emblaRef={emblaRef2}>
                            {products?.length > 0 && products.map((item: any, index: number) => {
                                return <ProductCard
                                    key={`singleCarousel-${item.id}-${index}`}
                                    keyName={`singleCarousel-${item.id}-${index}`}
                                    product={item}
                                    className="relative mb-0 lg:mb-0 flex-grow-0 flex-shrink-0 flex flex-col w-[172px] basis-[172px] md:w-1/4 md:basis-1/4 pr-[.375em] pl-[.375em] lg:px-g text-center"
                                    button={true}
                                    setWaitlistData={setWaitlistData}
                                    smSingleStar={false}
                                    carousel={true}
                                    addToCart={() => onAdd(item?.variants?.nodes?.[0])}
                                    trackEvent={trackEvent}
                                    preOrders={preOrders}
                                    generalSetting={generalSetting}
                                    homePage={props.homePage || false}
                                    store={store}
                                />
                            })}
                        </Carousel.Inner>
                        <Carousel.Navigation>
                            <PrevButton
                                onClick={() => emblaApi2.scrollPrev() }
                                className="lg:w-auto lg:h-0 hidden lg:flex"
                            >
                                <span className="absolute z-[-1] flex justify-center items-center">
                                    <ChevronPrev className="svg--current-color" />
                                </span>
                            </PrevButton>
                            <NextButton
                                onClick={() => emblaApi2.scrollNext() }
                                className="lg:w-auto lg:h-0 hidden lg:flex"
                            >
                                <span className="absolute z-[-1] flex justify-center items-center">
                                    <ChevronNext className="svg--current-color" />
                                </span>
                            </NextButton>
                        </Carousel.Navigation>
                    </Carousel.Wrapper>
                    <a href="/collections/all" className="lg:hidden mt-2 btn btn-lg btn-outline-primary rounded-full border-2 hover:no-underline px-[3.375em] py-[.8125em]">Shop All</a>
                </div>
            </div>
        </div>
            <Modal className="modal-lg lg:max-w-[43.125rem] modal-dialog-centered" isOpen={waitlistData.open} handleClose={() => setWaitlistData({...waitlistData, ...{ open: false }})}>
                <ModalWaitlist waitlistPdp={waitlistPdpSetting} store={store} data={waitlistData} trackBluecoreEvent={trackBluecoreEvent} handleClose={() => setWaitlistData({...waitlistData, open: false })} />
            </Modal>
        </>
    );
};

export default SingleProductCarousel;
