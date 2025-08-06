'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import ObessionSkin from "~/images/obession-skin.jpg";
import ObessionHair from "~/images/obession-hair.jpg";
import ObessionBody from "~/images/obession-body.jpg";
import ObessionTan from "~/images/obession-tan.jpg";


const ObessionCard = ({ data, store, imgMb, imgDt, imgAlt }) => (
    <figure className="w-2/4 lg:w-1/4 px-25 relative mb-0 lg:mb-g">
        <a className="hover:no-underline" href={store === 'ca' ? data?.button_link.replace('tan-and-spf', 'tan').replace('collections/skin', 'collections/skincare') : data?.button_link?.replace('collections/skin', 'collections/skincare')}>
            <picture className={`rounded-[24px] lg:rounded-[32px] block min-h-[150px] lg:min-h-[200px] ${data?.playground_range_bg}`}>
                <Image alt={imgAlt} className="rounded-[24px] lg:rounded-[32px] w-full lg:max-h-[320px]" src={imgMb} loading="lazy" />
            </picture>
            <figcaption className="block w-full text-center px-2 md:px-3 lg:px-g mt-2">
                <p className="text-base md:text-lg font-bold text-body">{store === 'ca' ? data.Title.replace('Tan & SPF', 'Tan') : data.Title}</p>
                {/* <p className="font-size-sm md:text-base lg:px-g text-body text-gray-600" dangerouslySetInnerHTML={{ __html: data.text }} /> */}
                {/* <span className="playground__card-atc hidden font-normal lg:inline-block btn btn-lg rounded-full btn-primary mt-g px-3 py-1 md:px-4 border-0 border-primary no-underline hover:border-primary hover:text-white hover:no-underline lg:min-w-[12.8125em] md:py-1">{store === 'ca' ? data.button_label.replace('Tan & SPF', 'Tan') : data.button_label}</span> */}
            </figcaption>
        </a>
    </figure>
);

const Obession = (props: any) => {
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

    const ranges = {
        'skin': ObessionSkin,
        'body': ObessionBody,
        'tan': ObessionTan,
        'tan & spf': ObessionTan,
        'hair': ObessionHair,
    }

    return (
        <section className="container text-center pb-0 playground--collection-list range-banner px-hg lg:px-0 pt-[1.5625em] lg:pt-1">
            <h1 className="mb-g text-xl lg:text-2xl lg:mb-3">Pick Your Obession</h1>
            {!isLoading && (
                <>
                    {/* <p className="font-bold mb-g">We're totally coco-nuts about beauty!</p>
                    <p className="range-banner__subtitle mb-2 md:mb-4 md:text-lg">Infusing powerful and tropical ingredients <br className="lg:hidden" />for amazing results. <br className="hidden lg:block" />21 beauty awards. <br className="lg:hidden" />100% clean. Cruelty free.</p> */}
                    <div className="flex flex-wrap lg:-mx-g items-center px-0 lg:px-g">
                        <ObessionCard store={store} data={content?.range_1}
                            imgMb={ranges[content?.range_1?.Title?.toLowerCase()]}
                            imgDt={ranges[content?.range_1?.Title?.toLowerCase()]}
                            imgAlt={`${content?.range_1?.Title} Playground - ${content?.range_1?.text?.replace(/(<([^>]+)>)/gi, '')}`}
                        />
                        <ObessionCard store={store} data={content?.range_2}
                            imgMb={ranges[content?.range_2?.Title?.toLowerCase()]}
                            imgDt={ranges[content?.range_2?.Title?.toLowerCase()]}
                            imgAlt={`${content?.range_2?.Title} Playground - ${content?.range_2?.text?.replace(/(<([^>]+)>)/gi, '')}`}
                        />
                        <ObessionCard store={store} data={content?.range_3}
                            imgMb={ranges[content?.range_3?.Title?.toLowerCase()]}
                            imgDt={ranges[content?.range_3?.Title?.toLowerCase()]}
                            imgAlt={`${content?.range_3?.Title} Playground - ${content?.range_3?.text?.replace(/(<([^>]+)>)/gi, '')}`}
                        />
                        <ObessionCard store={store} data={content?.range_4}
                            imgMb={ranges[content?.range_4?.Title?.toLowerCase()]}
                            imgDt={ranges[content?.range_4?.Title?.toLowerCase()]}
                            imgAlt={`${content?.range_4?.Title} Playground - ${content?.range_4?.text?.replace(/(<([^>]+)>)/gi, '')}`}
                        />
                    </div>
                </>
            )}
        </section>
    )
};

export default Obession;
