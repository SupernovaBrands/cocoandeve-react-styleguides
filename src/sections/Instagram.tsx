import { useEffect, useState } from "react";
import {
	getCookie,
	setCookie,
} from '~/modules/utils';
import { instagram_ph } from "~/modules/placeholders";

const Instagram = (props) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        if (getCookie('new_ig_media')) {
            setData(JSON.parse(getCookie('new_ig_media_')));
        } else {
            fetch('https://cdn.cocoandeve.com/instagram/cocoandeve.json').then(
                res => {
                    res?.json().then(data => {
                        console.log('res', data);
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
    return (
        <section className={`instagram pt-4 pb-3 text-center ${props.className} mx-auto`}>
            <div className="w-11/12 lg:w-2/3 text-center mx-auto pb-4 sm:px-hg">
                <p className="h2 mb-1">Get social with us</p>
                <p className="h4 mb-1">
                    <a href="#" target="_blank"  className="text-body lg:text-lg underline">@cocoandeve</a>
                </p>
                <p className="font-normal mb-0 lg:text-lg">Want to feature on our website or instagram? Tag us in your photos/reviews on instagram or social media using the hashtag #cocoandeve and @cocoandeve.</p>
            </div>
            <div className="container instagram--feed container-fluid p-lg-0">
                <div className="flex flex-nowrap sm:p-0 sm:pb-1 md:p-1 -mx-hg lg:-mx-g">
                    <div className="instagram--feed--left w-full p-0">
                        <div className="flex flex-wrap m-0">
                            <div className="w-full lg:w-2/3 p-0">
                                {data[0] && (
                                    <a href={data[0].link} target="_blank"  className='block instagram--feed--link'>
                                        <picture>
                                            <source srcSet={data[0].image} />
                                            <img className="w-full img-big aspect-square object-cover" src={data[0].image} loading="lazy" />
                                        </picture>
                                    </a>
                                )}
                            </div>
                            <div className="w-full lg:w-1/3 p-0">
                                <div className="flex flex-wrap m-0 ">
                                    {data && data.length && data.slice(1, 3).map((item) => (
                                        <div className="lg:w-full w-1/2 p-0">
                                            <a href={item.link} target="_blank"  className='block instagram--feed--link'>
                                                <picture>
                                                    <source srcSet={item.image}/>
                                                    <img className="w-full aspect-square object-cover" src={item.image} loading="lazy" />
                                                </picture>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {data && data.length && data.slice(4, 7).map((item) => (
                                <div className="w-1/2 lg:w-1/3 p-0">
                                    <a href={item.link} target="_blank"  className='block instagram--feed--link'>
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
                                    {data && data.length && data.slice(8, 10).map((item) => (
                                        <div className="lg:w-1/2 p-0">
                                            <a href={item.link} target="_blank"  className='block instagram--feed--link'>
                                                <picture>
                                                    <source srcSet={item.image}/>
                                                    <img className="w-full aspect-square object-cover" src={item.image} />
                                                </picture>
                                            </a>
                                        </div>
                                    ))}
                                    {data && data.length && data.slice(11, 12).map((item) => (
                                        <div className="w-full p-0">
                                            <a href={item.link} target="_blank"  className='block instagram--feed--link'>
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
                                    {data && data.length && data.slice(13, 19).map((item) => (
                                        <div className="lg:w-1/2 p-0">
                                            <a href={item.link} target="_blank"  className='block instagram--feed--link'>
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
        </section>
    );
};

export default Instagram;
