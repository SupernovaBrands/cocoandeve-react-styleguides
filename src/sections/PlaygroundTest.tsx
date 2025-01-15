'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

const PlaygroundCard = ({ data, store, imgMb, imgDt }) => (
    <figure className="w-full lg:w-1/4 px-g lg:px-g relative mb-g">
        <a href={store === 'ca' ? data?.button_link.replace('tan-and-spf', 'tan').replace('collections/skin', 'collections/skincare') : data?.button_link?.replace('collections/skin', 'collections/skincare')}>
            <picture className={`rounded-[24px] lg:rounded-[32px] block ${data?.playground_range_bg}`}>
                <source srcSet={imgDt} media="(min-width: 992px)" />
                <img className="rounded-[24px] lg:rounded-[32px] w-full" src={imgMb} loading="lazy" />
            </picture>
            <figcaption className="w-2/3 md:w-full text-left lg:text-center absolute px-2 md:px-3 lg:px-g top-[50%] -translate-y-[50%] lg:transform-none lg:top-[24px] lg:left-0 lg:right-0">
                <p className="text-base md:text-xl font-bold text-body">{store === 'ca' ? data.Title.replace('Tan & SPF', 'Tan') : data.Title}</p>
                <p className="font-size-sm md:text-base lg:px-g text-body text-gray-600" dangerouslySetInnerHTML={{ __html: data.text }} />
                <span className="hidden lg:inline-block btn btn-lg rounded-full btn-primary mt-g px-3 py-1 md:px-4 md:py-[12px] border-0 border-primary no-underline hover:border-primary hover:text-white hover:no-underline">{store === 'ca' ? data.button_label.replace('Tan & SPF', 'Tan') : data.button_label}</span>
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
        <section className="container text-center pb-0 playground--collection-list range-banner pt-1 px-0">
            <h1 className="mb-1 text-xl lg:text-2xl lg:mb-3">Discover our Playground</h1>
            {!isLoading && (
                <>
                    {/* <p className="font-bold mb-g">We're totally coco-nuts about beauty!</p>
                    <p className="range-banner__subtitle mb-2 md:mb-4 md:text-lg">Infusing powerful and tropical ingredients <br className="lg:hidden" />for amazing results. <br className="hidden lg:block" />21 beauty awards. <br className="lg:hidden" />100% clean. Cruelty free.</p> */}
                    <div className="flex flex-wrap lg:-mx-g items-center px-0 lg:px-hg">
                        <PlaygroundCard store={store} data={content?.range_1} imgMb={`https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/57bdf721-8ded-4a55-8ef4-c3b1ff864d00/public`} imgDt={`https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/3f3b3fb7-dff7-4887-7de7-48a919c76f00/public`} />
                        <PlaygroundCard store={store} data={content?.range_2} imgMb={`https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/0c3df0eb-6c09-4e39-d954-58660fdacc00/public`} imgDt={`https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/4b5f10df-dab3-411d-3704-6c23d5750000/public`} />
                        <PlaygroundCard store={store} data={content?.range_3} imgMb={`https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/21392fce-c8e4-459b-3d79-1ad03d42f000/public`} imgDt={`https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/3a5e9f7a-f352-426f-bb1f-2a6a03c54e00/public`} />
                        <PlaygroundCard store={store} data={content?.range_4} imgMb={`https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/b3c8f2ce-7b71-41a7-e382-01aa3eb6c100/public`} imgDt={`https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/6fd8c7de-73fd-4e80-4dfa-d918c6f59000/public`} />
                    </div>
                </>
            )}
        </section>
    )
};

export default PlaygroundTest;
