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
        align: 'start'
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
            const percent = Math.ceil(price/comparePrice * 100);
            return `SAVE ${percent}%`;

        }
        return null;
    }

    useEffect(() => {
    }, []);

    return (
        <>
            <hr className="my-2" />
            <div className="relative mb-4">
                { upsell.length && <p className="text-md font-bold mb-2">You may love:</p> }
                { upsell.length > 1 && (
                    <div className="upsell-navigation absolute top-0 right-0 w-[50px]">
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
                <div className="flex overflow-hidden mt-2 space-x-4">
                <Carousel.Wrapper emblaApi={emblaApi} className="w-full flex flex-col">
                    <Carousel.Inner emblaRef={emblaRef} className="flex flex-row">
                        {upsell.map((item:any, index:number) => {
                            const { product } = item;
                            let variantNode = null;
                            try {
                                variantNode = product.variants.nodes.find((node:any) => node.availableForSale);
                            } catch (e) {
                                console.error('Error:', e);
                            }

                            if (variantNode) {
                                const variant = {...variantNode};
                                const img = product.media.nodes[0]?.image?.url;
                                return (
                                    <figure key={`upsell-${index}`} className={`flex items-center space-x-2 w-full mr-2 ${ upsell.length > 1 ? 'min-w-[85%]' : 'min-w-[100%]' }`}>
                                        <picture className="w-20 h-20 bg-pink-100">
                                            <img className="object-contain w-full h-full min-w-[125px] max-w-[116px]" src={img} alt={product.title} />
                                        </picture>
                                        <figcaption className="text-base block w-full">
                                            <p className="font-bold">
                                                <a className="text-gray-800" href={`/products/${product.handle}`}>{product.title}</a>
                                            </p>
                                            <p className="mt-1">
                                                {getCompareAtPrice(variant, item.percentage) && (
                                                    <span className="line-through text-gray-500 mr-1">{getCompareAtPrice(variant, item.percentage)}</span>
                                                )}
                                                <span className="text-primary font-bold">{getPrice(variant, item.percentage)}</span>
                                                {getSaving(variant, item.percentage) && <span className="block text-primary">{getSaving(variant, item.percentage)}</span>}
                                            </p>
                                            <button className="btn btn-outline-primary px-4 py-1 mt-1 min-w-[112px]" type="button" onClick={() => addUpsell(variant, item.percentage)}>
                                                {loading && (
                                                    <span className="spinner-border spinner-border-sm !w-[15px] !h-[15px]" role="status" aria-hidden="true" />
                                                )}
                                                {!loading && ('Add')}
                                            </button>
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
