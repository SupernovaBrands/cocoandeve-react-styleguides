'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const PlaygroundCard = ({ data }) => (
    <figure className="w-full lg:w-1/4 px-g relative mb-g">
        <Link href="#">
            <picture className={`rounded block ${data?.playground_range_bg}`}>
                <source srcSet={data?.image?.url} media="(min-width: 992px)" />
                <img className="rounded w-full" src={data?.image_mobile?.url} loading="lazy" />
            </picture>
            <figcaption className="w-2/3 md:w-full text-left lg:text-center absolute px-2 md:px-3 lg:px-g top-[50%] -translate-y-[50%] lg:transform-none lg:top-[3.125em] lg:left-0 lg:right-0">
                <p className="text-lg md:text-2xl font-bold md:mb-0 text-body mb-g">{data.Title}</p>
                <p className="font-size-sm md:text-base lg:px-g text-body mb-g" dangerouslySetInnerHTML={{ __html: data.text }} />
                <span className="btn btn-lg rounded-full btn-primary px-3 py-1 md:px-4 md:py-g border-2 border-primary">{data.button_label}</span>
            </figcaption>
        </Link>
    </figure>
);

const Playground = (props: any) => {
    const { featuredCollection, isStyleguide } = props;
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
        <section className="container text-center pb-0 playground--collection-list range-banner pt-5">
            <h1 className="h1 text-nowrap mb-1">{featuredCollection?.title}</h1>
            {!isLoading && (
                <>
                    <p className="font-bold mb-g">We're totally coco-nuts about beauty!</p>
                    <p className="range-banner__subtitle mb-2 md:mb-4 md:text-lg">Infusing powerful and tropical ingredients <br className="lg:hidden" />for amazing results. <br className="hidden lg:block" />21 beauty awards. <br className="lg:hidden" />100% clean. Cruelty free.</p>
                    <div className="flex flex-wrap -mx-hg lg:-mx-g items-center">
                        <PlaygroundCard data={content?.range_1} />
                        <PlaygroundCard data={content?.range_2} />
                        <PlaygroundCard data={content?.range_3} />
                        <PlaygroundCard data={content?.range_4} />
                    </div>
                </>
            )}
        </section>
    )
};

export default Playground;
