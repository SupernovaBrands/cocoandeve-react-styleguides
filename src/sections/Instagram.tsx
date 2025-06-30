import { useEffect, useState } from "react";
import {
	getCookie,
	setCookie,
} from '~/modules/utils';
import { instagram_ph } from "~/modules/placeholders";

const InstagramTest = (props: any) => {
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
        <section className={`instagram instagram__section pt-3 pb-[1.5625em] lg:py-[3.125em] text-center ${props.className ?? ''} mx-auto bg-pink-light`}>
            <div className="container instagram--feed container-fluid lg:px-g sm:px-hg">
                <div className="flex flex-wrap lg:-mx-g sm:-mx-hg">
                    <div className="w-11/12 lg:w-7/12 text-center mx-auto px-0 pb-1 instagram__caption">
                        <p className="text-xl lg:text-2xl font-bold mb-1">Get social with us</p>
                        {/* <p className="h4 mb-1 instagram__address">
                            <a href="https://www.instagram.com/cocoandeve" target="_blank"  className="text-body hover:text-body no-underline font-bold mb-g">@cocoandeve</a>
                        </p> */}
                        <p className="instagram__desc font-normal mb-0 text-sm lg:text-base lg:max-w-[85%] lg:mx-auto">
                            {props.desc ? (
                                <>{props.desc}</>
                            ) : (
                                <>Want to feature on our website or instagram? Tag us in your photos/reviews on instagram or social media using the hashtag #cocoandeve and @cocoandeve.</>
                            )}
                        </p>
                    </div>
                </div>
                {data?.length > 0 && (
                    <div className="px-1 py-0 lg:p-0 instagram__feeds">
                        <div className="flex flex-nowrap sm:p-0 md:p-1 -mx-hg lg:-mx-g px-hg lg:-px-g instagram__feeds-container pb-0">
                            {/* <div className="instagram--feed--left w-full p-0">
                                <div className="flex flex-wrap m-0">
                                    <div className="w-full lg:w-2/3 p-0">
                                        {data[0] && (
                                            <a href={data[0].link} target="_blank"  className='block instagram--feed--link'  key={`inst1`} aria-label="Visit Instagram profile">
                                                <picture>
                                                    <source srcSet={data[0].image} />
                                                    <img className="w-full img-big aspect-square object-cover" src={data[0].image} loading="lazy" />
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
                            </div> */}
                            <div className="w-full p-0">
                                <div className="flex flex-wrap m-0">
                                    {data && data.length && (
                                        <div className="w-1/2 lg:w-[28.570%] lg:basis-[28.570%] hidden lg:block">
                                            <a href={data[0].link} target="_blank" className='block instagram--feed--link p-25' aria-label="Visit Instagram profile">
                                                <picture>
                                                    <source srcSet={data[0].image}/>
                                                    <img className="w-full aspect-square object-cover rounded-[1.5em] lg:rounded-[2em]" src={data[0].image} alt="Instagram Image" />
                                                </picture>
                                            </a>
                                        </div>
                                    )}
                                    
                                    <div className="w-full lg:w-[71.43%] lg:basis-[71.43] flex flex-wrap">
                                        {data && data.length && data.slice(0, 11).map((item, index) => {
                                            return (
                                                <div className={`w-1/2 lg:w-1/5 lg:basis-1/5 p-0 ${index === 0 ? 'lg:hidden' : ''} ${index > 3 ? 'hidden lg:block' : ''}`}  key={`inst4--${index}`}>
                                                    <a href={item.link} target="_blank"  className='block instagram--feed--link p-25' aria-label="Visit Instagram profile">
                                                        <picture>
                                                            <source srcSet={item.image}/>
                                                            <img className="w-full aspect-square object-cover rounded-[1.5em] lg:rounded-[2em]" src={item.image} alt={`Instagram image ${index + 1}`} />
                                                        </picture>
                                                    </a>
                                                </div>
                                            )
                                        })}
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

export default InstagramTest;
