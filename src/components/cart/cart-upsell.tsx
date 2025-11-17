import React, { useEffect, useState } from 'react';

import SvgChevronPrev from '~/images/icons/chevron-prev.svg';
import SvgChevronNext from '~/images/icons/chevron-next.svg';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import { PrevButton, NextButton } from '~/components/carousel/EmblaCarouselArrowButtons';
import { formatMoney } from '~/modules/utils';

const CartUpsell = (props:any) => {
    const { items: products, addToCart, store } = props;
    const [loading, setLoading] = useState(false);
    const [upsell, setUpsells] = useState(products ?? []);
    console.log('upsell', upsell);
    const addUpsell = async (variant:any, percentage:any) => {
        setLoading(true);
        const addLine = await addToCart({
            id: variant.id,
            quantity: 1,
            attributes: [
                { key: '_front_upsell', value: "true" },
                { key: '_front_upsell_amt', value: `${percentage}` },
            ],
            bubble: false,
        });
        setLoading(false);
        return addLine;
    }

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        // watchDrag: false,
        // dragFree: true,
    }, []);

    const prev = () => {
        emblaApi.scrollPrev();
    }

    const next = () => {
        emblaApi.scrollNext();
    }

    const getCompareAtPrice = (variant:any, percentage:number) => {
        if (percentage) {
            return formatMoney(parseFloat(variant.price.amount) * 100, false, store);;
        } else if (variant.compareAtPrice) {
            return formatMoney(parseFloat(variant.compareAtPrice.amount) * 100, false, store);
        }
        return null;
    }

    const getPrice = (variant:any, percentage:number) => {
        if (percentage) {
            const price = parseFloat(variant.price.amount) * 100;
            const calculatePrice = price - (price * (percentage / 100));
            return formatMoney(calculatePrice, false, store);
        }
        return formatMoney(parseFloat(variant.price.amount) * 100, false, store);
    }

    const getSaving = (variant:any, percentage:number) => {
        if (percentage) {
            return `SAVE ${percentage}%`;
        } else if (variant && variant.compareAtPrice) {
            const comparePrice = parseFloat(variant.compareAtPrice.amount) * 100;
            const price = parseFloat(variant.price.amount) * 100;
            const percent = Math.round(price/comparePrice * 100);
            return `SAVE ${100 - percent}%`;

        }
        return null;
    }

    useEffect(() => {
        if (products.length > 1 && products.length < 4) {
            const merged = [...products, ...products];
            const uniqueMerged = merged.filter((v, i, a) => a.findIndex(t => t.product.handle === v.product.handle) === i);
            setUpsells(uniqueMerged);
        } else {
            const uniqueMerged = products.filter((v, i, a) => a.findIndex(t => t.product.handle === v.product.handle) === i);
            setUpsells(uniqueMerged);
        }
    }, [products]);


    //@ts-ignore
    window.emblaBrow = emblaApi;
    return (
        <>
            <hr className="mt-2 mb-3" />
            <div className="relative mb-3">
                { upsell.length && <p className="text-md font-bold mb-2">You may love:</p> }
                { upsell.length > 1 && (
                    <div className="upsell-navigation absolute top-0 right-[10px] w-[50px]">
                        <Carousel.Navigation>
                            <PrevButton
                                onClick={() => prev()}
                                className="text-primary hidden lg:block h-[25px]"
                            >
                                <SvgChevronPrev className="w-g h-g svg--current-color" />
                            </PrevButton>
                            <NextButton
                                onClick={() => next()}
                                className="text-primary hidden lg:block h-[25px]"
                                                        >
                                <SvgChevronNext className="w-g h-g svg--current-color" />
                            </NextButton>
                        </Carousel.Navigation>
                    </div>
                )}
                <div className={`flex overflow-hidden mt-2 space-x-4 ${upsell.length > 1 ? '-mr-g md:-mr-3' : ''}`}>
                <Carousel.Wrapper emblaApi={emblaApi} className="w-full flex flex-col">
                    <Carousel.Inner emblaRef={emblaRef} className={`flex flex-row w-full`}>
                        {upsell.map((item:any, index:number) => {
                            const { product, variantId } = item;
                            let variantNode = null;
                            try {
                                if (variantId) {
                                    variantNode = product.variants.nodes.find((node:any) => node.id === variantId);
                                } else {
                                    variantNode = product.variants.nodes.find((node:any) => node.availableForSale);
                                }
                            } catch (e) {
                                console.error('Error:', e);
                            }

                            if (variantNode) {
                                const variant = {...variantNode};
                                const img = variant?.image?.url || product.media.nodes[0]?.image?.url;
                                return (
                                    <figure key={`upsell-${index}`} className={`relative flex items-center flex-grow-0 flex-shrink-0 space-x-2 ${upsell.length === 1 ? 'w-full min-w-[100%] max-w-[100%]' : 'w-[270px] md:w-[313px] basis-[270px] md:basis-[313px] mr-1'}`}>
                                        <picture className="w-20 h-20 bg-pink-100">
                                            <img className="block object-contain w-full h-full min-w-[98px] md:min-w-[116px] max-w-[98px] md:max-w-[116px]" src={img} alt={product.title} />
                                        </picture>
                                        <figcaption className="text-base block w-full">
                                            <p className="font-bold">
                                                <span className="text-gray-800">{product.title}</span>
                                            </p>
                                            <p className="mt-1">
                                                {getCompareAtPrice(variant, item.percentage) && (
                                                    <span className="line-through text-gray-500 mr-1">{getCompareAtPrice(variant, item.percentage)}</span>
                                                )}
                                                <span className="text-primary font-bold">{getPrice(variant, item.percentage)}</span>
                                                {getSaving(variant, item.percentage) && <span className="block text-primary">{getSaving(variant, item.percentage)}</span>}
                                            </p>
                                            <button className="btn btn-outline-primary px-4 py-1 mt-1 min-w-[112px] self-start" type="button" onClick={() => addUpsell(variant, item.percentage)}>
                                                {loading && (
                                                    <span className="spinner-border spinner-border-sm !w-[15px] !h-[15px]" role="status" aria-hidden="true" />
                                                )}
                                                {!loading && ('Add')}
                                            </button>
                                            {item?.note && item?.note !== '' && (
                                                <small className='block mt-[5px]'>{item?.note}</small>
                                            )}
                                        </figcaption>
                                    </figure>
                                );
                            }
                            return null;
                        })}
                    </Carousel.Inner>
                </Carousel.Wrapper>
                </div>
            </div>
        </>
    );
}

export default CartUpsell;
