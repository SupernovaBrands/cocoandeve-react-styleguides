'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

const PlaygroundCard = ({ data, store, imgMb, imgDt, imgAlt }) => (
    <figure className="w-full lg:w-1/4 px-g lg:px-g relative mb-g">
        <a href={store === 'ca' ? data?.button_link.replace('tan-and-spf', 'tan').replace('collections/skin', 'collections/skincare') : data?.button_link?.replace('collections/skin', 'collections/skincare')}>
            <picture className={`rounded-[24px] lg:rounded-[32px] block ${data?.playground_range_bg}`}>
                <source srcSet={imgDt} media="(min-width: 992px)" />
                <img alt={imgAlt} className="rounded-[24px] lg:rounded-[32px] w-full lg:max-h-[320px]" src={imgMb} loading="lazy" />
            </picture>
            <figcaption className="w-2/3 md:w-full text-left lg:text-center absolute px-2 md:px-3 lg:px-g top-[50%] -translate-y-[50%] lg:transform-none lg:!top-[24px] lg:left-0 lg:right-0">
                <p className="text-base md:text-xl font-bold text-body">{store === 'ca' ? data.Title.replace('Tan & SPF', 'Tan') : data.Title}</p>
                <p className="font-size-sm md:text-base lg:px-g text-body text-gray-600" dangerouslySetInnerHTML={{ __html: data.text }} />
                <span className="playground__card-atc hidden font-normal lg:inline-block btn btn-lg rounded-full btn-primary mt-g px-3 py-1 md:px-4 border-0 border-primary no-underline hover:border-primary hover:text-white hover:no-underline lg:min-w-[12.8125em] md:py-1">{store === 'ca' ? data.button_label.replace('Tan & SPF', 'Tan') : data.button_label}</span>
            </figcaption>
        </a>
    </figure>
);

const PlaygroundTest = (props: any) => {
    const { featuredCollection, isStyleguide, store } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [content, setContent] = useState(null);
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
                    <div className="flex flex-wrap lg:-mx-g items-center px-0 lg:px-g">
                        <PlaygroundCard store={store} data={content?.range_1}
                            imgMb={`https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/020b1b8a-d311-4e1f-8420-8579ab0dd800/public`}
                            imgDt={`https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/f8738abb-5f94-47cc-8693-ec76c6714b00/public`}
                            imgAlt={`Playground ${content?.Title} - ${content?.text}`}
                            />
                        <PlaygroundCard store={store} data={content?.range_2} 
                            imgMb={`https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/df4e3bd1-7214-4b0f-a687-62f9770c3200/public`} 
                            imgDt={`https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/3cdbc885-e603-4a69-ec85-12133a72b800/public`}
                            imgAlt={`Playground ${content?.Title} - ${content?.text}`}
                            />
                        <PlaygroundCard store={store} data={content?.range_3} 
                            imgMb={`https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/e0e4d5bb-56be-4d47-7878-f7d054b02900/public`} 
                            imgDt={`https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/2c27447c-170d-4fd6-589d-fd8e90b78200/public`}
                            imgAlt={`Playground ${content?.Title} - ${content?.text}`}
                            />
                        <PlaygroundCard store={store} data={content?.range_4} 
                            imgMb={`https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/46c4a841-3709-4bb0-725b-f60016eb0700/public`} 
                            imgDt={`https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/6cddc9d8-a879-483e-f915-df6cbd6ed900/public`}
                            imgAlt={`Playground ${content?.Title} - ${content?.text}`}
                            />
                    </div>
                </>
            )}
        </section>
    )
};

export default PlaygroundTest;
