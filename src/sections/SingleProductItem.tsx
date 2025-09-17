import { useEffect, useState, useCallback } from 'react';
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import { DotButton, useDotButton } from '~/components/carousel/EmblaCarouselDotButton';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const options: EmblaOptionsType = {
	loop: true,
};

const SingleProductItem = (props: any) => {
    const { data, addToCart } = props;
    const [adding, setAdding] = useState(false);
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
        Autoplay({ playOnInit: true, delay: 6000 })
    ]);
    const { selectedIndex: idx1, onDotButtonClick: onClick1 } = useDotButton(emblaApi);
    useEffect(() => {
        if (!emblaApi) return;
        const autoplay = emblaApi?.plugins()?.autoplay;
        if (!autoplay) return;
    }, [emblaApi]);

    const onAdd = async () => {
        setAdding(true);
        const addLine = await addToCart({
            id: `gid://shopify/ProductVariant/${data.variant_id}`,
            quantity: 1,
            attributes: [
                { key: '_free_sample', value: "yes" },
            ],
            bubble: true,
        });
        setAdding(false);
        return addLine;
    }

    return (
        <>
            <div className={`container px-0 text-center py-3 lg:pb-0 lg:px-0 mb-0 lg:pb-4 lg:pt-[60px]`}>
                <h2 className="text-xl lg:text-2xl text-center mb-g lg:mb-1 mx-5 lg:mx-0 ">{data?.heading}</h2>
                <p className='mb-g mx-4 lg:mx-0 lg:mb-3'>{data?.heading}</p>

                <div className="flex mx-0 mb-0 flex-wrap lg:flex-row-reverse flex-row ">
                    {data?.images?.length > 0 && (
                        <div className="single-product-item__left  w-full  lg:w-1/2 grid gap-x-[30px] content-center pt-0 pb-4 px-g lg:max-w-none lg:flex lg:flex-wrap mb-0 lg:mx-0;">
                            <Carousel.Wrapper emblaApi={emblaApi}>
                                <Carousel.Inner emblaRef={emblaRef} className="">
                                    {data?.images?.map((image: any) => {
                                        return (
                                            <div key={0} className='flex-grow-0 flex-shrink-0 w-full basis-full'>
                                                <picture className="block w-full rounded-[32px] overflow-hidden">
                                                    <source
                                                        srcSet={image?.desktop?.url || null}
                                                        media="(min-width: 992px)" width="1362" height="1162"/>
                                                    <img
                                                        src={image?.mobile?.url || null}
                                                        className="object-cover h-full w-full" loading="lazy" height="357" width="414" alt={"Product banner and comparison image"} />
                                                </picture>
                                            </div>
                                        )
                                    })}
                                </Carousel.Inner>

                                <Carousel.Navigation>
                                    <ol className="carousel__dots justify-end">
                                        <li key={0} className={`border border-white ${0 === idx1 ? ' bg-white' : ''}`}>
                                            <DotButton
                                                onClick={() => onClick1(0)}
                                                className="carousel__dot"
                                            />
                                        </li>
                                        <li key={1} className={`border border-white ${1 === idx1 ? ' bg-white' : ''}`}>
                                            <DotButton
                                                onClick={() => onClick1(1)}
                                                className="carousel__dot"
                                            />
                                        </li>
                                    </ol>
                                </Carousel.Navigation>
                            </Carousel.Wrapper>
                        </div>
                    )}
                    
                    {/* <div className="single-product-item__left  w-full  lg:w-1/2 grid gap-x-[30px] content-center pt-0 pb-4 px-g lg:max-w-none lg:flex lg:flex-wrap mb-0 lg:mx-0;">
                        <picture className="block w-full rounded-[32px] overflow-hidden">
                            <source
                                srcSet={data?.img_desk?.url || null}
                                media="(min-width: 992px)" width="1362" height="1162"/>
                            <img
                                src={data?.img_mob?.url || null}
                                className="object-cover h-full w-full" loading="lazy" height="357" width="414" alt={"Product banner and comparison image"} />
                        </picture>
                    </div> */}
                    <div className="single-product-item__right text-left w-full lg:w-1/2 relative   mb-0 mx-auto   flex justify-center lg:block">
                        <div className="rounded-[32px] bg-white  p-[16px] pt-[20px] lg:my-[30px] lg:p-[30px] max-w-[315px] lg:max-w-[570px] mt-[-85px] lg:mr-[-90px] lg:ml-auto">
                            <div className="flex mb-[8px] items-center"><h2 className="text-md lg:text-xl lg:font-bold mb-0">{data?.product_title || ''}</h2> <span className="block mx-[5px] text-sm">•</span> <span className="text-sm">5ml</span></div>
                            <p className="text-sm mb-[8px] lg:mb-[16px] lg:max-w-[410px]">{data?.description}</p>
                            <ul className="text-sm  list-check page-product-list ">
                                {data?.list?.split('\n').map((li: any) => {
                                    return (
                                        <li className="lg:!mb-[10px]">{li}</li>
                                    )
                                })}
                            </ul>
                            {data?.variant_id && (
                                <button onClick={() => onAdd()} className="btn btn-large btn-primary mt-[20px] rounded-[32px] w-full p-g lg:max-w-[236px] font-normal hover:text-color hover:text-white hover:no-underline">
                                    {adding ? (
										<span className="spinner-border spinner-border-sm !w-[15px] !h-[15px]" role="status" aria-hidden="true" />
									) : data?.button_label}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SingleProductItem;