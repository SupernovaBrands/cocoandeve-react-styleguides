import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import Stars from '~/images/icons/two-line-stars.svg';
import WinnerAward from '~/images/icons/winner-award.svg';
import MoneyBack from '~/images/icons/moneyback.svg';
import MoneyBackPounds from '~/images/icons/moneyback-pounds.svg';
import MoneyBackEur from '~/images/icons/moneyback-eur.svg';
import FastDelivery from '~/images/icons/fast-delivery.svg';

import {
	encryptParam,
} from '~/modules/utils_v2';

const Stockist = (props: any) => {
    const { content, isLoading, store } = props;
	const [region, setRegion] = useState('australia');
	const [regionTitle, setRegionTitle] = useState('Australia');
	const [stores, setStores] = useState([]);
    const mappedStore = {
        ca: {
            region: 'canada',
            title: 'Canada',
        },
        us: {
            region: 'usa',
            title: 'USA',
        },
        uk: {
            region: 'united-kingdom',
            title: 'United Kingdom',
        },
        eu: {
            region: 'europe',
            title: 'Europe',
        },
        au: {
            region: 'australia',
            title: 'Australia'
        },
        int: {
            region: 'asia',
            title: 'Asia'
        }
    }

	useEffect(() => {
		setStores(content.stockist);
	}, []);

    useEffect(() => {
        if (store) {
            setRegion(mappedStore[store]?.region || 'australia');
            setRegionTitle(mappedStore[store]?.title || 'australia');
        }
    }, [store]);

	const regionChangeHandler = (event) => {
		const index = event.target.selectedIndex;
		const optionElement = event.target.childNodes[index];
		const label = optionElement.getAttribute('data-label');

		setRegion(event.target.value);
		setRegionTitle(label);
	};

	useEffect(() => {
		setStores(content.stockist.filter((item) => item.country_tag.includes(region)));
	}, [region]);

    const [totalReviews, setTotalReviews] = useState(null);
	const apiUrl = 'https://reviews-api.cocoandeve.com/api';
	const SERVICES = [
		{ id: 'stars', label: `__ratings__ 5 stars <br class="hidden lg:block"> <span class="hidden lg:inline"></span> Customer Reviews`},
        { id: 'delivery', label: 'Delivery from US warehouse'},
		{ id: 'winner-award', label: 'Award-winning <br>Beauty'},
		{ id: 'money-back', label: 'Money back <br>guarantee'},
	];

	useEffect(() => {
		const signature = encryptParam(`{brand:'cocoandeve',time:${new Date().getTime()}}`);
		fetch(`${apiUrl}/reviews/total.json?brand=cocoandeve&signature=${signature}`).then((data) => data.json()).then((r) => {
			setTotalReviews(r?.response?.total_reviews?.toLocaleString());
		});
	}, [])

	const moneyBackIcon = (store = 'us') => {
		if (store === 'uk') {
			return <MoneyBackPounds className="text-body" />
		} else if (store === 'eu') {
			return <MoneyBackEur className="text-body" />
		} else {
			return <MoneyBack className="text-body" />
		}
	};

	const icon = moneyBackIcon(props.store);

    return (
        <>
            <section className="container text-center stockist">
                <h1 className="mb-1 mt-3 text-xl lg:text-2xl">{content.title}</h1>
                <form className="flex flex-wrap justify-center items-center -mx-25">
                    <label className="w-auto md:w-auto my-1 lg:text-lg sm:=text-sm font-bold lg:px-25">{content.label_title}</label>
                    <div className="w-auto my-1 px-[5px]">
                        <select className="indent-0 border-0 min-w-[190px] lg:min-w-[auto] py-[0.875em] pr-[2em] pl-[1em] custom-select mb-0 md:ml-2 stockist__select" value={region} onChange={regionChangeHandler} >
                            {content.stockist_dropdown.contry_title1 && (
                                <option value={content.stockist_dropdown.contry_title1.replace(/\s+/g, '-').toLowerCase()} data-label={content.stockist_dropdown.contry_title1}>{content.stockist_dropdown.contry_title1}</option>
                            )}
                            {content.stockist_dropdown.contry_title2 && (
                                <option value={content.stockist_dropdown.contry_title2.replace(/\s+/g, '-').toLowerCase()} data-label={content.stockist_dropdown.contry_title2}>{content.stockist_dropdown.contry_title2}</option>
                            )}
                            {content.stockist_dropdown.contry_title3 && (
                                <option value={content.stockist_dropdown.contry_title3.replace(/\s+/g, '-').toLowerCase()} data-label={content.stockist_dropdown.contry_title3}>{content.stockist_dropdown.contry_title3}</option>
                            )}
                            {content.stockist_dropdown.contry_title4 && (
                                <option value={content.stockist_dropdown.contry_title4.replace(/\s+/g, '-').toLowerCase()} data-label={content.stockist_dropdown.contry_title4}>{content.stockist_dropdown.contry_title4}</option>
                            )}
                            {content.stockist_dropdown.contry_title5 && (
                                <option value={content.stockist_dropdown.contry_title5.replace(/\s+/g, '-').toLowerCase()} data-label={content.stockist_dropdown.contry_title5}>{content.stockist_dropdown.contry_title5}</option>
                            )}
                            {content.stockist_dropdown.contry_title6 && (
                                <option value={content.stockist_dropdown.contry_title6.replace(/\s+/g, '-').toLowerCase()} data-label={content.stockist_dropdown.contry_title6}>{content.stockist_dropdown.contry_title6}</option>
                            )}
                            {content.stockist_dropdown.contry_title7 && (
                                <option value={content.stockist_dropdown.contry_title7.replace(/\s+/g, '-').toLowerCase()} data-label={content.stockist_dropdown.contry_title7}>{content.stockist_dropdown.contry_title7}</option>
                            )}
                            {content.stockist_dropdown.contry_title8 && (
                                <option value={content.stockist_dropdown.contry_title8.replace(/\s+/g, '-').toLowerCase()} data-label={content.stockist_dropdown.contry_title8}>{content.stockist_dropdown.contry_title8}</option>
                            )}
                            {content.stockist_dropdown.contry_title9 && (
                                <option value={content.stockist_dropdown.contry_title9.replace(/\s+/g, '-').toLowerCase()} data-label={content.stockist_dropdown.contry_title9}>{content.stockist_dropdown.contry_title9}</option>
                            )}
                        </select>
                    </div>
                </form>
                {!isLoading && (
                    <>
                        {parse(content.desc.replace('text-underline', 'underline'))}
                    </>
                )}
                <p className="font-bold mt-4 mb-g text-left lg:text-center lg:text-lg">{content.stockist_logo_title} <span className="stockist__location">{regionTitle}</span></p>
                <hr className="hidden "></hr>
                {!isLoading && (
                    <div className="flex flex-wrap justify-center -mx-hg lg:-mx-g">
                        {stores.map((filteredItem) => (
                            <figure key={filteredItem.id} className="m-0 w-1/2 md:w-1/5 px-hg lg:px-g" data-toggle={filteredItem.country_tag}>
                                <a href={filteredItem.logo_url} className="block lg:py-g rounded" target="_blank">
                                    <img className="lg:mx-auto lg:!w-auto" src={filteredItem.logo.url} alt={filteredItem.logo.url} />
                                </a>
                                <figcaption className="my-2 !font-normal text-base lg:text-lg text-body">{filteredItem.title}</figcaption>
                            </figure>
                        ))}
                    </div>
                )}
                <div className="flex my-3 flex-wrap lg:-mx-g lg:my-5">
                    <div className="w-full lg:w-1/2 lg:px-g">
                        <a href="mailto:wholesale@cocoandeve.com" className="flex flex-wrap justify-between items-center bg-[#EBF7F2] rounded py-[11px] px-[24px] mb-g lg:hidden">
                            <p className="text-body text-lg font-bold">{content.question_title}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <rect x="-0.5" y="0.5" width="31" height="31" rx="15.5" transform="matrix(-1 0 0 1 31 0)" fill="white"/>
                                <rect x="-0.5" y="0.5" width="31" height="31" rx="15.5" transform="matrix(-1 0 0 1 31 0)" stroke="#D62E55"/>
                                <path d="M13.2671 11.0793L18.9239 16.7362L13.2671 22.393L14.3984 23.5244L21.1867 16.7362L14.3984 9.94796L13.2671 11.0793Z" fill="#D62E55" stroke="#D62E55"/>
                            </svg>
                        </a>
                        <div className="flex-col justify-center items-center bg-[#EBF7F2] rounded hidden lg:flex py-4">
                            <p className="text-body text-xl font-bold mb-[1rem]">{content.question_title}</p>
                            <p className="text-body">No worries, you can email us:</p>
                            <a href="mailto:wholesale@cocoandeve.com" className="text-body underline lg:text-lg font-bold mb-2">wholesale@cocoandeve.com</a>
                            <a href="mailto:wholesale@cocoandeve.com" className="btn btn-primary rounded-full min-w-[157px] border-primary !text-white font-normal hover:no-underline">Send mail</a>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 lg:px-g">
                        <div className="bg-gray-100 rounded py-3 px-g lg:py-4">
                            <p className="text-center font-bold text-xl hidden lg:block mb-[24px]">Beauty Confidence</p>
                            <ul className="list-unstyled flex flex-wrap lg:items-center justify-center pt-1 pb-1 lg:py-25 pl-0 lg:mx-5 mb-0">
                                {SERVICES.map((list, i) => {
                                    return (
                                        <li key={i} className={`w-1/2 md:w-1/3
                                            ${i == 1 ? 'px-0 mb-3' : 'px-0'}
                                            ${list.id === 'delivery' ? 'lg:hidden' : ''}
                                            ${list.id === 'stars' ? 'lg:order-3' : ''}
                                            ${list.id === 'winner-award' ? 'lg:order-1' : ''}
                                            ${list.id === 'money-back' ? 'lg:order-2' : ''}
                                        `}>
                                            <i className="inline-flex flex-wrap h1 mb-2 lg:mb-[12px]">
                                                {list.id === 'stars' && <Stars className="text-secondary fill-secondary" />}
                                                {list.id === 'winner-award' && <WinnerAward className="text-body" />}
                                                {list.id === 'delivery' && <FastDelivery className="text-secondary fill-secondary" />}
                                                {list.id === 'money-back' && <>{icon}</>}
                                            </i>
                                            {list.id === 'stars' ? (
                                                <>
                                                    {totalReviews && (
                                                        <p className={`title text-base mb-0 ${props.className ?? ''}`}>{list.label.split('<br>').map((item) => (
                                                            <span key={`${item}-services`} dangerouslySetInnerHTML={{ __html: item.replace('__ratings__', totalReviews) + '<br />' }}></span>
                                                        ))}</p>
                                                    )}
                                                </>
                                            ) : (
                                                <p className={`title text-base mb-0 ${props.className ?? ''}`}>{list.label.split('<br>').map((item) => (
                                                    <span key={`${item}-services`} dangerouslySetInnerHTML={{ __html: item + '<br />' }}></span>
                                                ))}</p>
                                            )}

                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                {/* <h2 className="h1 mt-4 mb-1">{content.question_title}</h2>
                <p className="lg:text-lg sm:text-sm font-normal mb-5">No worries, you can email us: <a href="mailto:wholesale@cocoandeve.com" className="underline lg:text-lg font-bold">wholesale@cocoandeve.com</a></p> */}
            </section>
        </>
    );
};

export default Stockist;
