import { useEffect, useState } from "react";
import {
	getCookie,
	setCookie,
} from '~/modules/utils';
import { instagram_ph } from "~/modules/placeholders";

const Instagram = (props: any) => {
    const { instagramData: data } = props;
    /*

    useEffect(() => {
        if (getCookie('new_ig_media')) {
            setData(JSON.parse(getCookie('new_ig_media_')));
        } else {
            fetch('https://cdn.cocoandeve.com/instagram/cocoandeve.json').then(
                res => {
                    res?.json().then(data => {
                        if (data.length > 0) {
                            const dataMedia = [];
                            for (let i = 0; i < data.length; i += 1) {
                                const d = data[i];
                                const obj = { link: d.permalink, image: (i === 0 || i === 8) ? d.thumbnail_640_url : d.thumbnail_url };
                                dataMedia.push(obj);
                            }
                            setData(dataMedia);
                            setCookie('new_ig_media_', JSON.stringify(dataMedia));
                        }
                    })
                }
            );
        }

        if (props.isStyleguide) {
            setData(instagram_ph);
        }
    }, []);
    */

    return (
        <section className={`instagram pt-4 pb-3 text-center ${props.className} mx-auto bg-pink-light`}>
            <div className="container instagram--feed container-fluid lg:px-g sm:px-hg">
                <div className="flex flex-wrap lg:-mx-g sm:-mx-hg">
                    <div className="w-11/12 lg:w-7/12 text-center mx-auto pb-g sm:px-hg">
                        <h2 className="h1 mb-1">Get social with us</h2>
                        <p className="h4 mb-1">
                            <a href="https://www.instagram.com/cocoandeve" target="_blank"  className="text-body hover:text-body no-underline font-bold mb-g">@cocoandeve</a>
                        </p>
                        <p className="font-normal mb-0">
                            {props.desc ? (
                                <>{props.desc}</>
                            ) : (
                                <>Want to feature on our website or instagram? Tag us in your photos/reviews on instagram or social media using the hashtag #cocoandeve and @cocoandeve.</>
                            )}
                        </p>
                    </div>
                </div>
                {data?.length > 0 && (
                    <div className="p-1 lg:p-0">
                        <div className="flex flex-nowrap sm:p-0 sm:pb-1 md:p-1 -mx-hg lg:-mx-g px-hg lg:-px-g">
                            <div className="instagram--feed--left w-full p-0">
                                <div className="flex flex-wrap m-0">
                                    <div className="w-full lg:w-2/3 p-0">
                                        {data[0] && (
                                            <a href={data[0].link} target="_blank"  className='block instagram--feed--link'  key={`inst1`} aria-label="Visit Instagram profile">
                                                <picture>
                                                    <source srcSet={data[0].image} />
                                                    <img className="w-full img-big aspect-square object-cover" src={data[0].image} loading="lazy" alt="" />
                                                </picture>
                                            </a>
                                        )}
                                    </div>
                                    <div className="w-full lg:w-1/3 p-0">
                                        <div className="flex flex-wrap m-0 ">
                                            {data && data.length && data.slice(1, 3).map((item, index) => (
                                                <div className="lg:w-full w-1/2 p-0"  key={`inst2--${index}`}>
                                                    <a href={item.link} target="_blank"  className='block instagram--feed--link' aria-label="Visit Instagram profile">
                                                        <picture>
                                                            <source srcSet={item.image}/>
                                                            <img className="w-full aspect-square object-cover" src={item.image} loading="lazy" />
                                                        </picture>
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {data && data.length && data.slice(3, 6).map((item, index) => (
                                        <div className={`w-1/2 lg:w-1/3 p-0 ${index === 2 ? 'hidden lg:block' : ''}`} key={`inst3--${index}`}>
                                            <a href={item.link} target="_blank"  className='block instagram--feed--link' aria-label="Visit Instagram profile">
                                                <picture>
                                                    <source srcSet={item.image}/>
                                                    <img className="w-full aspect-square object-cover" src={item.image} loading="lazy" />
                                                </picture>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="instagram--feed--right w-full hidden p-0 md:inline-block">
                                <div className="flex flex-wrap m-0">
                                    <div className="lg:w-1/2 p-0">
                                        <div className="flex flex-wrap m-0">
                                            {data && data.length && data.slice(6, 8).map((item, index) => (
                                                <div className="lg:w-1/2 p-0"  key={`inst4--${index}`}>
                                                    <a href={item.link} target="_blank"  className='block instagram--feed--link' aria-label="Visit Instagram profile">
                                                        <picture>
                                                            <source srcSet={item.image}/>
                                                            <img className="w-full aspect-square object-cover" src={item.image} />
                                                        </picture>
                                                    </a>
                                                </div>
                                            ))}
                                            {data && data.length && data.slice(8, 9).map((item, index) => (
                                                <div className="w-full p-0"  key={`inst5--${index}`}>
                                                    <a href={item.link} target="_blank"  className='block instagram--feed--link' aria-label="Visit Instagram profile">
                                                        <picture>
                                                            <source srcSet={item.image}/>
                                                            <img className="w-full aspect-square object-cover" src={item.image} />
                                                        </picture>
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="lg:w-1/2 p-0">
                                        <div className="flex flex-wrap m-0 ">
                                            {data && data.length && data.slice(9, 15).map((item, index) => (
                                                <div className="lg:w-1/2 p-0"  key={`inst6--${index}`}>
                                                    <a href={item.link} target="_blank"  className='block instagram--feed--link' aria-label="Visit Instagram profile">
                                                        <picture>
                                                            <source srcSet={item.image}/>
                                                            <img className="w-full aspect-square object-cover" src={item.image} />
                                                        </picture>
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Instagram;
