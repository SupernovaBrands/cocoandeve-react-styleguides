'use client'
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import useMediaQuery from '~/hooks/useMediaQuery';
import { useDotButton } from '~/components/carousel/EmblaCarouselDotButton';
// import Link from "next/link";

const PlaygroundCardV2 = ({ data, store, imgMb, imgDt, imgAlt, ctaBgColor, ctaTextColor }) => (
    <figure className="flex-grow-0 flex-shrink-0 w-full basis-full">
        <a className="relative block" href={store === 'ca' ? data?.button_link.replace('tan-and-spf', 'tan').replace('collections/skin', 'collections/skincare') : data?.button_link?.replace('collections/skin', 'collections/skincare')}>
            <picture className={`block ${data?.playground_range_bg}`}>
                <source srcSet={imgDt} media="(min-width: 992px)" width={1440} height={460} />
                <img width="375" height="88" alt={imgAlt} className="w-full" src={imgMb} loading="lazy" decoding="async" />
            </picture>
            <figcaption className="py-[1rem] absolute left-0 right-0 top-0 bottom-0 text-body text-left">
                <div className="px-2 container flex flex-col h-full justify-center">
                    <p className="text-[18px] leading-[22px] lg:text-[55px] lg:leading-[40px] font-bold mb-[.25rem] lg:mb-[1.5rem]">{data?.Title || 'Title'}</p>
                    <p className="text-xs leading-[15px] lg:text-[30px] lg:leading-[36px] lg:mb-[1.5rem]" dangerouslySetInnerHTML={{ __html: data?.text || 'Text' }} />
                    <span className="hidden lg:flex text-[22px] leading-[28px] w-[228px] font-bold border border-body h-[55px] items-center justify-center">Discover</span>
                </div>
            </figcaption>
        </a>
    </figure>
);

// const PlaygroundCard = ({ data, store, imgMb, imgDt, imgAlt, ctaBgColor, ctaTextColor }) => (
//     <figure className="w-full lg:w-1/4 px-g lg:px-g relative mb-g">
//         <a href={store === 'ca' ? data?.button_link.replace('tan-and-spf', 'tan').replace('collections/skin', 'collections/skincare') : data?.button_link?.replace('collections/skin', 'collections/skincare')}>
//             <picture className={`rounded-[24px] lg:rounded-[32px] block ${data?.playground_range_bg}`}>
//                 <source srcSet={imgDt} media="(min-width: 992px)" />
//                 <img width="414" height="320" alt={imgAlt} className="rounded-[24px] lg:rounded-[32px] w-full lg:max-h-[320px]" src={imgMb} loading="lazy" />
//             </picture>
//             <figcaption className="w-2/3 md:w-full text-left lg:text-center absolute px-2 md:px-3 lg:px-g top-[50%] -translate-y-[50%] lg:transform-none lg:!top-[24px] lg:left-0 lg:right-0">
//                 <p className="text-base md:text-xl font-bold text-body">{data?.Title || 'Title'}</p>
//                 <p className="font-size-sm md:text-base lg:px-g text-body text-gray-600" dangerouslySetInnerHTML={{ __html: data?.text || 'Text' }} />
//                 <span className={`playground__card-atc hidden font-normal lg:inline-block btn btn-lg rounded-full ${ctaBgColor === 'bg-dark' ? 'border-dark bg-dark' : 'btn-primary border-primary hover:border-primary hover:text-white'} ${ctaTextColor ? ctaTextColor : 'text-white'} mt-g px-3 py-1 md:px-4 border-0 no-underline hover:no-underline lg:min-w-[12.8125em] md:py-1`}>{store === 'ca' ? data?.button_label.replace('Tan & SPF', 'Tan') : data?.button_label}</span>
//             </figcaption>
//         </a>
//     </figure>
// );

const Playground = (props: any) => {
    const isDesktop = useMediaQuery("(min-width: 992px)");
    const options: EmblaOptionsType = {
        loop: true,
        active: isDesktop
    };

    const { playgroundData, store, generalSetting } = props;
    const ctaBgColor = generalSetting?.bfcm_cta_bg_color;
    const ctaTextColor = generalSetting?.bfcm_cta_text_color;

    const content = playgroundData?.featuredCollection;
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const { selectedIndex: idx1, onDotButtonClick: onClick1 } = useDotButton(emblaApi);

    if (!content) return null;

    return (
        <>
        {/* <div className="container text-center pb-0 playground--collection-list range-banner px-0 pt-[1.5625em] lg:pt-1">
            <h1 className="mb-g text-xl lg:text-2xl lg:mb-3">Discover our Playground</h1>
            {content && (
                <>
                    <div className={`flex flex-wrap lg:-mx-g items-center px-0 lg:px-g mb-g lg:mb-0 ${['int', 'my'].includes(store) ? 'justify-center' : ''} `}>
                        <PlaygroundCard store={store} data={content?.range_1}
                            imgMb={`https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/020b1b8a-d311-4e1f-8420-8579ab0dd800/614x`}
                            imgDt={`https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/f8738abb-5f94-47cc-8693-ec76c6714b00/400x`}
                            imgAlt={`${content?.range_1?.Title} Playground - ${content?.range_1?.text?.replace(/(<([^>]+)>)/gi, '')}`}
                            ctaBgColor={ctaBgColor}
                            ctaTextColor={ctaTextColor}
                        />
                        {['us', 'uk', 'eu', 'dev', 'ca', 'au'].includes(store) && (
                            <PlaygroundCard store={store} data={content?.range_2}
                                imgMb={`https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/df4e3bd1-7214-4b0f-a687-62f9770c3200/614x`}
                                imgDt={`https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/3cdbc885-e603-4a69-ec85-12133a72b800/400x`}
                                imgAlt={`${content?.range_2?.Title} Playground - ${content?.range_2?.text?.replace(/(<([^>]+)>)/gi, '')}`}
                                ctaBgColor={ctaBgColor}
                                ctaTextColor={ctaTextColor}
                            />
                        )}
                        {['us', 'uk', 'eu', 'ca', 'dev'].includes(store) && (
                            <PlaygroundCard store={store} data={content?.range_5}
                                imgMb={content?.range_5?.image_mobile?.url}
                                imgDt={content?.range_5?.image?.url}
                                imgAlt={`${content?.range_5?.Title} Playground - ${content?.range_5?.text?.replace(/(<([^>]+)>)/gi, '')}`}
                                ctaBgColor={ctaBgColor}
                                ctaTextColor={ctaTextColor}
                            />
                        )}
                        {['int', 'my', 'au'].includes(store) && (
                            <PlaygroundCard store={store} data={content?.range_3}
                                imgMb={`https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/e0e4d5bb-56be-4d47-7878-f7d054b02900/614x`}
                                imgDt={`https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/2c27447c-170d-4fd6-589d-fd8e90b78200/400x`}
                                imgAlt={`${content?.range_3?.Title} Playground - ${content?.range_3?.text?.replace(/(<([^>]+)>)/gi, '')}`}
                                ctaBgColor={ctaBgColor}
                                ctaTextColor={ctaTextColor}
                            />
                        )}
                        <PlaygroundCard store={store} data={content?.range_4}
                            imgMb={`https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/46c4a841-3709-4bb0-725b-f60016eb0700/614x`}
                            imgDt={`https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/6cddc9d8-a879-483e-f915-df6cbd6ed900/400x`}
                            imgAlt={`${content?.range_4?.Title} Playground - ${content?.range_4?.text?.replace(/(<([^>]+)>)/gi, '')}`}
                            ctaBgColor={ctaBgColor}
                            ctaTextColor={ctaTextColor}
                        />
                    </div>
                </>
            )}

            
        </div> */}
        {content && (
            <>
            <Carousel.Wrapper emblaApi={emblaApi}>
				<Carousel.Inner emblaRef={emblaRef} className="flex-col lg:flex-row">
                    <PlaygroundCardV2 store={store} data={content?.range_1}
                        imgMb={`https://cdn.shopify.com/s/files/1/0286/1327/9779/files/playground_hair_m_828x.jpg?v=1771226109`}
                        imgDt={`https://cdn.shopify.com/s/files/1/0286/1327/9779/files/playground_hair_d_1920x.jpg?v=1771226885`}
                        imgAlt={`${content?.range_1?.Title} Playground - ${content?.range_1?.text?.replace(/(<([^>]+)>)/gi, '')}`}
                        ctaBgColor={ctaBgColor}
                        ctaTextColor={ctaTextColor}
                    />
                    {/* tan */}
                    {['us', 'uk', 'eu', 'dev', 'ca', 'au'].includes(store) && (
                        <PlaygroundCardV2 store={store} data={content?.range_2}
                            imgMb={`https://cdn.shopify.com/s/files/1/0286/1327/9779/files/playground_tan_m_828x.jpg?v=1771226110`}
                            imgDt={`https://cdn.shopify.com/s/files/1/0286/1327/9779/files/playground_tan_d_1920x.jpg?v=1771226886`}
                            imgAlt={`${content?.range_2?.Title} Playground - ${content?.range_2?.text?.replace(/(<([^>]+)>)/gi, '')}`}
                            ctaBgColor={ctaBgColor}
                            ctaTextColor={ctaTextColor}
                        />
                    )}
                    {/* SPF */}
                    {['us', 'uk', 'eu', 'ca', 'dev'].includes(store) && (
                        <PlaygroundCardV2 store={store} data={content?.range_5}
                            imgMb={`https://cdn.shopify.com/s/files/1/0286/1327/9779/files/playground_skin_m_828x.jpg?v=1771226109`}
                            imgDt={`https://cdn.shopify.com/s/files/1/0286/1327/9779/files/playground_skin_d_1920x.jpg?v=1771226885`}
                            imgAlt={`${content?.range_5?.Title} Playground - ${content?.range_5?.text?.replace(/(<([^>]+)>)/gi, '')}`}
                            ctaBgColor={ctaBgColor}
                            ctaTextColor={ctaTextColor}
                        />
                    )}

                    {/* skin */}
                    {['int', 'my', 'au'].includes(store) && (
                        <PlaygroundCardV2 store={store} data={content?.range_3}
                            imgMb={`https://cdn.shopify.com/s/files/1/0286/1327/9779/files/playground_skin_m_828x.jpg?v=1771226109`}
                            imgDt={`https://cdn.shopify.com/s/files/1/0286/1327/9779/files/playground_skin_d_1920x.jpg?v=1771226885`}
                            imgAlt={`${content?.range_3?.Title} Playground - ${content?.range_3?.text?.replace(/(<([^>]+)>)/gi, '')}`}
                            ctaBgColor={ctaBgColor}
                            ctaTextColor={ctaTextColor}
                        />
                    )}

                    {/* body */}
                    <PlaygroundCardV2 store={store} data={content?.range_4}
                        imgMb={`https://cdn.shopify.com/s/files/1/0286/1327/9779/files/playground_body_m_828x.jpg?v=1771226109`}
                        imgDt={`https://cdn.shopify.com/s/files/1/0286/1327/9779/files/playground_body_d_1920x.jpg?v=1771226880`}
                        imgAlt={`${content?.range_4?.Title} Playground - ${content?.range_4?.text?.replace(/(<([^>]+)>)/gi, '')}`}
                        ctaBgColor={ctaBgColor}
                        ctaTextColor={ctaTextColor}
                    />
                </Carousel.Inner>
                <Carousel.Navigation>
                    <div className="container px-2 hidden lg:block">
                        <ol className="flex items-center absolute bottom-[38px] gap-[.25rem]">
                            <li className="h-4 flex items-center">
                                <button className={`w-5 h-full relative after:absolute after:content-[""] after:left-0 after:right-0 after:bottom-0 after:top-[50%] after:translate-y-[-50%] after:bg-gray-600 ${idx1 === 0 ? 'after:h-[3px]' : 'after:h-[1px]'}`} onClick={() => onClick1(0)} />
                            </li>
                            <li className="h-4 flex items-center">
                                <button className={`w-5 h-full relative after:absolute after:content-[""] after:left-0 after:right-0 after:bottom-0 after:top-[50%] after:translate-y-[-50%] after:bg-gray-600 ${idx1 === 1 ? 'after:h-[3px]' : 'after:h-[1px]'}`} onClick={() => onClick1(1)} />
                            </li>
                            <li className="h-4 flex items-center">
                                <button className={`w-5 h-full relative after:absolute after:content-[""] after:left-0 after:right-0 after:bottom-0 after:top-[50%] after:translate-y-[-50%] after:bg-gray-600 ${idx1 === 2 ? 'after:h-[3px]' : 'after:h-[1px]'}`} onClick={() => onClick1(2)} />
                            </li>
                            {/* int & my only 3 slides */}
                            {!['int', 'my'].includes(store) && (
                                <li className="h-4 flex items-center">
                                    <button className={`w-5 h-full relative after:absolute after:content-[""] after:left-0 after:right-0 after:bottom-0 after:top-[50%] after:translate-y-[-50%] after:bg-gray-600 ${idx1 === 3 ? 'after:h-[3px]' : 'after:h-[1px]'}`} onClick={() => onClick1(3)} />
                                </li>
                            )}
                        </ol>
                    </div>
				</Carousel.Navigation>
            </Carousel.Wrapper>
            {/* New playground Full screen */}
                
            </>
        )}
        </>
    )
};

export default Playground;
