import React, { useEffect, useState } from 'react';
import BeautyConfidence from '~/components/BeautyConfidence';

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

    return (
        <>
            <section className="container text-center stockist px-g">
                <h1 className="mb-25 mt-[25px] lg:mt-4 text-body text-xl lg:text-2xl">{content.title}</h1>
                <form className="flex flex-wrap justify-center items-center -mx-25">
                    <label className="w-auto md:w-auto my-1 lg:text-lg sm:=text-sm font-bold lg:px-25">{content.label_title}</label>
                    <div className="w-auto mt-1 mb-[1rem] lg:mb-1 px-[5px]">
                        <select title="Change your country or region" className="indent-0 border-0 min-w-[190px] lg:min-w-[auto] py-[0.875em] pr-[2em] pl-[1em] custom-select mb-0 md:ml-2 stockist__select rounded" value={region} onChange={regionChangeHandler} >
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
                    <div dangerouslySetInnerHTML={{__html: content.desc.replace(/&nbsp;/g, '').replace('text-underline', 'underline').replace('href', 'aria-label="go to homepage to buy online" href')}} />
                )}
                <p className="font-bold mt-4 mb-g text-left lg:text-center lg:text-lg">{content.stockist_logo_title} <span className="stockist__location">{regionTitle}</span></p>
                <hr className="hidden "></hr>
                {!isLoading && (
                    <div className="flex flex-wrap justify-center -mx-hg lg:-mx-g">
                        {stores.map((filteredItem, idx) => (
                            <figure key={filteredItem.id} className="m-0 w-1/2 md:w-1/5 px-hg lg:px-g" data-toggle={filteredItem.country_tag}>
                                <a href={filteredItem.logo_url} className="block lg:py-g rounded">
                                    <img className="lg:mx-auto lg:!w-auto" src={filteredItem.logo.url} alt={filteredItem.logo.alt || `Stockist logo ${filteredItem.title} ${idx}`} />
                                </a>
                                <figcaption className="my-2 !font-normal text-base lg:text-lg text-body">{filteredItem.title}</figcaption>
                            </figure>
                        ))}
                    </div>
                )}
                <div className="flex my-3 flex-wrap lg:-mx-g lg:my-4">
                    <div className="w-full lg:w-1/2 lg:px-g">
                        <a href="mailto:wholesale@cocoandeve.com" className="flex flex-wrap justify-between items-center bg-[#EBF7F2] rounded py-[1rem] px-[24px] mb-3 lg:hidden">
                            <p className="text-body text-lg font-bold">{content.question_title}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <rect x="-0.5" y="0.5" width="31" height="31" rx="15.5" transform="matrix(-1 0 0 1 31 0)" fill="white"/>
                                <rect x="-0.5" y="0.5" width="31" height="31" rx="15.5" transform="matrix(-1 0 0 1 31 0)" stroke="#D62E55"/>
                                <path d="M13.2671 11.0793L18.9239 16.7362L13.2671 22.393L14.3984 23.5244L21.1867 16.7362L14.3984 9.94796L13.2671 11.0793Z" fill="#D62E55" stroke="#D62E55"/>
                            </svg>
                        </a>
                        <div className="flex-col justify-center items-center bg-[#EBF7F2] rounded hidden lg:flex py-4 md:h-full">
                            <p className="text-body text-xl font-bold mb-[1rem]">{content.question_title}</p>
                            <p className="text-body">No worries, you can email us:</p>
                            <a href="mailto:wholesale@cocoandeve.com" className="text-body underline lg:text-lg font-bold mb-2">wholesale@cocoandeve.com</a>
                            <a href="mailto:wholesale@cocoandeve.com" className="btn btn-primary btn--send-mail rounded-full min-w-[157px] border-primary font-normal hover:no-underline">Send mail</a>
                        </div>
                    </div>
                    <BeautyConfidence parentClass="w-full lg:w-1/2 lg:px-g stockist__beauty-confidence" />
                </div>
                {/* <h2 className="h1 mt-4 mb-1">{content.question_title}</h2>
                <p className="lg:text-lg sm:text-sm font-normal mb-5">No worries, you can email us: <a href="mailto:wholesale@cocoandeve.com" className="underline lg:text-lg font-bold">wholesale@cocoandeve.com</a></p> */}
            </section>
        </>
    );
};

export default Stockist;
