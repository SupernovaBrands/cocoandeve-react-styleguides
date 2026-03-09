'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

const PlaygroundCard = ({ data, store, imgMb, imgDt, imgAlt, ctaBgColor, ctaTextColor }) => (
    <figure className="w-full lg:w-1/4 px-g lg:px-g relative mb-g">
        <a href={store === 'ca' ? data?.button_link.replace('tan-and-spf', 'tan').replace('collections/skin', 'collections/skincare') : data?.button_link?.replace('collections/skin', 'collections/skincare')}>
            <picture className={`rounded-[24px] lg:rounded-[32px] block ${data?.playground_range_bg}`}>
                <source srcSet={imgDt} media="(min-width: 992px)" />
                <img alt={imgAlt} className="rounded-[24px] lg:rounded-[32px] w-full lg:max-h-[320px]" src={imgMb} loading="lazy" />
            </picture>
            <figcaption className="w-2/3 md:w-full text-left lg:text-center absolute px-2 md:px-3 lg:px-g top-[50%] -translate-y-[50%] lg:transform-none lg:!top-[24px] lg:left-0 lg:right-0">
                <p className="text-base md:text-xl font-bold text-body">{data?.Title}</p>
                <p className="font-size-sm md:text-base lg:px-g text-body text-gray-600" dangerouslySetInnerHTML={{ __html: data.text }} />
                <span className={`playground__card-atc hidden font-normal lg:inline-block btn btn-lg rounded-full ${ctaBgColor === 'bg-dark' ? 'border-dark bg-dark': 'btn-primary border-primary hover:border-primary hover:text-white'} ${ctaTextColor ? ctaTextColor : 'text-white'} mt-g px-3 py-1 md:px-4 border-0 no-underline hover:no-underline lg:min-w-[12.8125em] md:py-1`}>{store === 'ca' ? data.button_label.replace('Tan & SPF', 'Tan') : data.button_label}</span>
            </figcaption>
        </a>
    </figure>
);

const PlaygroundTest = (props: any) => {
    const { featuredCollection, isStyleguide, store, generalSetting } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [content, setContent] = useState(null);
    const ctaBgColor = generalSetting?.bfcm_cta_bg_color;
    const ctaTextColor = generalSetting?.bfcm_cta_text_color;
    useEffect(() => {
        // console.log('ThemeSettings', ThemeSettings, searchBox);
        if (isStyleguide) {
            setContent(featuredCollection);
            setIsLoading(false);
        } else {
            fetch(`/api/getHomepage`).then(
                res => {
                    res?.json().then(data => {
                        setContent(data?.featuredCollection);
                        setIsLoading(false);
                    })
                }
            );
        }
    }, []);

    return (
        <section className="container text-center pb-0 playground--collection-list range-banner px-0 pt-[1.5625em] lg:pt-1">
            <h1 className="mb-g text-xl lg:text-2xl lg:mb-3">Discover our Playground</h1>
            {!isLoading && (
                <>
                    {/* <p className="font-bold mb-g">We're totally coco-nuts about beauty!</p>
                    <p className="range-banner__subtitle mb-2 md:mb-4 md:text-lg">Infusing powerful and tropical ingredients <br className="lg:hidden" />for amazing results. <br className="hidden lg:block" />21 beauty awards. <br className="lg:hidden" />100% clean. Cruelty free.</p> */}
                    <div className={`flex flex-wrap lg:-mx-g items-center px-0 lg:px-g mb-g lg:mb-0 ${['int', 'my'].includes(store) ? 'justify-center' : ''} `}>
                        <PlaygroundCard store={store} data={content?.range_1}
                            imgMb={`https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_111bfe7e-d857-4df6-8f1e-354218ce673a.jpg?v=1772038666`}
                            imgDt={`https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_1c51a568-d52d-4e7b-9725-fa78727dabd7.jpg?v=1772038686`}
                            imgAlt={`${content?.range_1?.Title} Playground - ${content?.range_1?.text?.replace(/(<([^>]+)>)/gi, '')}`}
                            ctaBgColor={ctaBgColor}
                            ctaTextColor={ctaTextColor}
                        />
                        {['us', 'uk', 'eu', 'dev', 'ca', 'au'].includes(store) && (
                            <PlaygroundCard store={store} data={content?.range_2}
                                imgMb={`https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_2c81882b-9c2e-406d-934f-31f66daaaef2.jpg?v=1772038705`}
                                imgDt={`https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_482bcca9-d4ba-4538-ba28-c2b3983be3cd.jpg?v=1772038724`}
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
                                imgMb={`https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_1cea1022-8bd3-4ff5-a25a-0a027127f08c.jpg?v=1772038747`}
                                imgDt={`https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_8c5d88cb-2992-481a-8186-302ef130253d.jpg?v=1772038776`}
                                imgAlt={`${content?.range_3?.Title} Playground - ${content?.range_3?.text?.replace(/(<([^>]+)>)/gi, '')}`}
                                ctaBgColor={ctaBgColor}
                                ctaTextColor={ctaTextColor}
                            />
                        )}
                        <PlaygroundCard store={store} data={content?.range_4}
                            imgMb={`https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_eb4fcc19-3cf7-4f26-b3a0-fe05193f1ce3.jpg?v=1772038800`}
                            imgDt={`https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_e5940bdf-f680-4671-ac8f-c26549338ee4.jpg?v=1772038829`}
                            imgAlt={`${content?.range_4?.Title} Playground - ${content?.range_4?.text?.replace(/(<([^>]+)>)/gi, '')}`}
                            ctaBgColor={ctaBgColor}
                            ctaTextColor={ctaTextColor}
                        />
                    </div>
                </>
            )}
        </section>
    )
};

export default PlaygroundTest;
