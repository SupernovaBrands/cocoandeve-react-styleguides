import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';

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
            <section className="container text-center stockist">
                <h1 className="mb-1 mt-3">{content.title}</h1>
                <form className="flex flex-wrap justify-center items-center -mx-25">
                    <label className="w-full md:w-auto my-1 lg:text-lg sm:=text-sm font-bold lg:px-25">{content.label_title}</label>
                    <div className="w-2/3 md:w-1/4 my-1 px-[5px]">
                        <select className="indent-0 border-body py-[0.875em] pr-[2em] pl-[1em] custom-select mb-0 md:ml-2 stockist__select" value={region} onChange={regionChangeHandler} >
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
                <h2 className="mt-4 mb-3">{content.stockist_logo_title} <span className="stockist__location">{regionTitle}</span></h2>
                <hr className="lg:hidden my-3"></hr>
                {!isLoading && (
                    <div className="flex flex-wrap justify-center -mx-hg lg:-mx-g">
                        {stores.map((filteredItem) => (
                            <figure key={filteredItem.id} className="m-0 w-1/2 md:w-1/3 px-hg lg:px-g" data-toggle={filteredItem.country_tag}>
                                <a href={filteredItem.logo_url} className="block lg:py-g rounded" target="_blank">
                                    <img className="lg:h-[100px] lg:mx-auto lg:!w-auto" src={filteredItem.logo.url} alt={filteredItem.logo.url} />
                                </a>
                                <figcaption className="h4 my-2 lg:mb-4 lg:mx-4">{filteredItem.title}</figcaption>
                            </figure>
                        ))}
                    </div>
                )}
                <h2 className="h1 mt-4 mb-1">{content.question_title}</h2>
                <p className="lg:text-lg sm:text-sm font-normal mb-5">No worries, you can email us: <a href="mailto:wholesale@cocoandeve.com" className="underline lg:text-lg font-bold">wholesale@cocoandeve.com</a></p>
            </section>
        </>
    );
};

export default Stockist;
