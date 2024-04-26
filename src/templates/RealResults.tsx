import dynamic from 'next/dynamic';

import { useEffect, useState } from "react";
import RealResultCard from '~/compounds/real-result-card';
import TestimonialCarousel from '~/sections/TestimonialCarousel';
import ProductCarousel from '~/sections/ProductCarousel';
import REVIEWS_PH from '~/modules/reviews';
import Instagram from '~/sections/Instagram';
import YotpoReviews from '~/components/yotpo-review-widget';

const PRODUCTS = [
	{
		id: 1,
		src: '//via.placeholder.com/520x520/FFF2F4',
		srcSet: '//via.placeholder.com/520x520/FFF2F4',
		title: 'Sunny Honey Bronzing Bundle',
		comparePrice: '$34.90',
		price: '$24.90',
		productId: 4543113265187,
	},
	{
		id: 2,
		src: 'https://via.placeholder.com/520x520/FFF2F4',
		srcSet: 'https://via.placeholder.com/520x520/FFF2F4',
		title: 'Miracle Hair',
		comparePrice: '$34.90',
		price: '$24.90',
		productId: 4543113265187,
		swatch: {
			label: 'Choose Style',
			style: true,
			data: [
				{ id: 32068891607075, value: 'girl-print', label: 'Girl Print: Limited edition!', available: true},
				{ id: 32068891639843, value: 'leaf-print', label: 'Leaf Print', available: true},
			]
		}
	},
	{
		src: 'https://via.placeholder.com/520x520/FFF2F4',
		srcSet: 'https://via.placeholder.com/520x520/FFF2F4',
		title: 'Sunny Honey Bronzing Bundle',
		comparePrice: '$34.90',
		price: '$24.90',
		productId: 4543113265187,
		swatch: {
			label: 'Choose Shade',
			shade: true,
			data: [
				{ id: 32068891541539, value: 'medium', label: 'Medium', available: false},
				{ id: 32068891607075, value: 'dark', label: 'Dark', available: true},
				{ id: 32068891639843, value: 'ultra-dark', label: 'Ultra Dark', available: true},
			]
		}
	},
	{
		id: 4,
		src: '//via.placeholder.com/520x520/FFF2F4',
		srcSet: '//via.placeholder.com/520x520/FFF2F4',
		title: 'Sunny Honey Bronzing Bundle',
		comparePrice: '$34.90',
		price: '$24.90',
		productId: 4543113265187,
	},
	{
		id: 5,
		src: '//via.placeholder.com/520x520/FFF2F4',
		srcSet: '//via.placeholder.com/520x520/FFF2F4',
		title: 'Sunny Honey Bronzing Bundle',
		comparePrice: '$34.90',
		price: '$24.90',
		productId: 4543113265187,
	},
	{
		src: 'https://via.placeholder.com/520x520/FFF2F4',
		srcSet: 'https://via.placeholder.com/520x520/FFF2F4',
		title: 'Sunny Honey Bronzing Bundle',
		comparePrice: '$34.90',
		price: '$24.90',
		productId: 4543113265187,
		swatch: {
			label: 'Choose Shade',
			shade: true,
			data: [
				{ id: 32068891541539, value: 'medium', label: 'Medium', available: false},
				{ id: 32068891607075, value: 'dark', label: 'Dark', available: true},
				{ id: 32068891639843, value: 'ultra-dark', label: 'Ultra Dark', available: true},
			]
		}
	}
];

const testimonialItems = [
	{
		index: 0,
		label: 'Slide 1',
		quote: 'Not only is this vegan masque Peta-approved it’s also pined after by many beauty moguls and bloggers',
		srcSet: '//cdn.shopify.com/s/files/1/0075/2163/2309/files/The_Times_logo_wrodmark_2x_8b53f186-43fd-470b-9043-146897718362_x50.png?v=1591087122',
		src: '//cdn.shopify.com/s/files/1/0075/2163/2309/files/The_Times_logo_wrodmark_2x_8b53f186-43fd-470b-9043-146897718362_x25.png?v=1591087122'
	},
	{
		index: 1,
		label: 'Slide 2',
		quote: 'Not only is this vegan masque Peta-approved it’s also pined after by many beauty moguls and bloggers',
		srcSet: '//cdn.shopify.com/s/files/1/0075/2163/2309/files/Glamour_2x_1_x50.png?v=1591087107',
		src: '//cdn.shopify.com/s/files/1/0075/2163/2309/files/Glamour_2x_1_x25.png?v=1591087107'
	},
	{
		index: 2,
		label: 'Slide 3',
		quote: 'Not only is this vegan masque Peta-approved it’s also pined after by many beauty moguls and bloggers',
		srcSet: '//cdn.shopify.com/s/files/1/0075/2163/2309/files/Harpers_Bazaar_logo_logotype_2x_65a7f362-98ec-471c-876e-f7a614a9d237_x50.png?v=1591087114',
		src: '//cdn.shopify.com/s/files/1/0075/2163/2309/files/Harpers_Bazaar_logo_logotype_2x_65a7f362-98ec-471c-876e-f7a614a9d237_x25.png?v=1591087114'
	},
	{
		index: 3,
		label: 'Slide 4',
		quote: 'Not only is this vegan masque Peta-approved it’s also pined after by many beauty moguls and bloggers',
		srcSet: '//cdn.shopify.com/s/files/1/0075/2163/2309/files/The_Times_logo_wrodmark_2x_8b53f186-43fd-470b-9043-146897718362_x50.png?v=1591087122',
		src: '//cdn.shopify.com/s/files/1/0075/2163/2309/files/The_Times_logo_wrodmark_2x_8b53f186-43fd-470b-9043-146897718362_x25.png?v=1591087122'
	}
]

const RealResults = () => {
    const [data, setData] = useState([]);
	const [originalData, setOriginalData] = useState([]);
	const [tabNames, setTabNames] = useState([]);
	const [showMore, setShowMore] = useState(true);
	const [page, setPage] = useState(1);
	const [range, setRange] = useState('all');
    const [activeTab2, setActiveTab2] = useState('tan');

    let store = 'us';

    const init = async () => {
        console.log('REVIEWS_PH', REVIEWS_PH);
		setTabNames(['Hair', 'Tan & SPF', 'Skin', 'Body']);
		let sortType = 'best-seller';
		let sortingHandles = [];

        if (sortType === 'best-seller') {
			/* dont remove, for based on 7 days best seller products */
			/*
			const sevenDaysSalesIds = window.tSettings.sevenDaysSales;
			const query = sevenDaysSalesIds.map((item) => `id:${item}`).join(' OR ');
			await sfApi.productSearchOnlyHandles(query).then((resp) => {
				if (resp.edges) {
					sortingHandles = sevenDaysSalesIds.map((item) => {
						const found = resp.edges.find((attr) => attr.node.id.includes(item));
						return (found) ? { handle: found.node.handle, id: item } : { id: item };
					});
					sortingHandles = sortingHandles.filter((item) => item.handle).map((item) => (item.handle));
				}
			});
			*/
            /*
			await sfApi.productsofACollection('best-seller').then((resp) => {
				if (resp.edges) {
					sortingHandles = resp.edges.map((item) => item.node.handle);
				}
			});
            */
		}

		if (sortType === 'newest') {
            /*
			await sfApi.productsofACollection('new').then((resp) => {
				if (resp.edges) {
					sortingHandles = resp.edges.map((item) => item.node.handle);
				}
			});
            */
		}

		if (sortType === 'manual') {
            /*
			await sfApi.productsofACollection('products-all').then((resp) => {
				if (resp.edges) {
					sortingHandles = resp.edges.map((item) => item.node.handle);
				}
			});
            */
		}

        let newRevs = REVIEWS_PH.filter((item) => item.body && item.body !== '' && !item.hide_review);
        if (store === 'ca') newRevs = newRevs.filter((item) => item.review_type !== 'suncare');
        // if (tSettings.store === 'dev') newRevs = newRevs.filter((item) => item.review_type !== 'skin');
        if (store === 'us') newRevs = newRevs.filter((item) => !item.handles.includes('daily-radiance-primer-spf50') && !item.handles.includes('daily-watergel-spf50-sunscreen') && !item.handles.includes('tan-activating-body-oil-spf30'));
        /*
        const exceptions = tSettings.realResullPage?.productExclusion?.split(',');
        if (exceptions.length > 0) newRevs = newRevs.filter((item) => exceptions.indexOf(item.handle) === -1);
        */
        const arrayToOrder = newRevs.map((item) => {
            const handle = item?.label?.match(/\/products\/([^\s"]+)/)[1] || '';
            return { ...item, handle };
        });
        let sortedData = [];
        sortingHandles.forEach((handle) => {
            const newData = arrayToOrder.filter((i) => i.handle === handle);
            sortedData = [...sortedData, ...newData];
        });
        const remainings = arrayToOrder.filter((i) => sortingHandles.indexOf(i.handle) === -1);
        if (remainings.length > 0) sortedData = [...sortedData, ...remainings].filter((item) => item.review_type !== '');
        setData(sortedData.slice(0, 18));
        setOriginalData(sortedData);
        setPage(1);

    }

    const filterCards = (rangeType) => {
		const newData = (rangeType !== 'all') ? originalData.filter((item) => item.review_type === rangeType) : originalData;
		setData(newData.slice(0, 17));
		setRange(rangeType);
		setPage(1);
		if (newData.length < 17) {
			setShowMore(false);
		} else {
			setShowMore(true);
		}
	};

	const changeTab = (e) => {
        console.log('e.target.dataset.target', e.target.dataset.target);
		filterCards(e.target.dataset.target);
        setActiveTab2(e.target.dataset.target);
	};

	const changeDrop = (e) => {
		filterCards(e.target.options[e.target.selectedIndex].value);
        setActiveTab2(e.target.options[e.target.selectedIndex].value);
	};

	const loadMore = () => {
		if (originalData.length - data.length > 0) {
			const end = 18 * (page + 1);
			const newData = (range !== 'all') ? originalData.filter((item) => item.review_type === range) : originalData;
			setData(newData.slice(0, end));
			setPage(page + 1);
			if (newData.length < end) setShowMore(false);
		}
	};

	useEffect(() => {
		init();
	}, []);

    return (
		<>
			<div className='container py-4'>
				<div className="mb-3 flex flex-wrap  items-center justify-center">
					<h1 className='text-center mb-2 lg:mb-3 block w-full'>Real Customers. Real Reviews</h1>
					<label htmlFor="real-result__select" className="text-base font-normal mr-3 mb-0">Filter By:</label>
					<select id="real-result__select" className="border-body bg-gray-400 custom-select rounded-lg w-2/5 lg:hidden" aria-labelledby="real-result__select" onChange={changeDrop}>
						<option value="all" selected={true}>All</option>
						{tabNames.length > 0 && tabNames.map((tab) => {
							let tabtitleID = tab.toLowerCase().replace(/ /g, '-').replace('autobronzants', 'tan').replace('corps', 'body')
								.replace('tan-&-spf', 'tan')
								.replace('cheveux', 'hair')
								.replace('tan-spf', 'tan');
							return <option value={tabtitleID}>{tab}</option>;
						})}
					</select>
					<ul id="real-result__main-tab" className="flex-wrap list-none pl-0 mb-0 text-center hidden lg:flex" role="tablist">
						<li className="nav-item" role="presentation">
							<a onClick={changeTab} className={`block no-underline hover:no-underline text-lg mb-0 border p-0 leading-[2.3] w-[5.625em] rounded-tl-[6px] rounded-br-[0] rounded-tr-[0] rounded-bl-[6px] border-body ${activeTab2 === 'all' ? ' bg-primary text-white hover:text-white' : 'bg-white text-body'} `} data-toggle="tab" href="#all" role="tab" data-target="all">All</a>
						</li>
						{tabNames.length > 0 && tabNames.map((tab) => {
							let tabtitleID = tab.toLowerCase().replace(/ /g, '-').replace('autobronzants', 'tan').replace('corps', 'body')
								.replace('tan-&-spf', 'tan')
								.replace('cheveux', 'hair')
								.replace('tan-spf', 'tan');

							return (
								<li className="nav-item" role="presentation">
									<a onClick={changeTab} className={`block no-underline hover:no-underline text-lg mb-0 border border-l-0 p-0 leading-[2.3] w-[5.625em] border-body ${tabtitleID === 'body' ? 'rounded-bl-[0] rounded-tl-[0] rounded-br-[6px] rounded-tr-[6px]' : ''} ${activeTab2 === tabtitleID ? ' bg-primary text-white hover:text-white' : 'bg-white text-body'} ${tab === 'Tan & SPF' && 'px-3 w-auto'}`} data-toggle="tab" href={`#${tabtitleID}`} data-target={`${tabtitleID}`} role="tab">{tab}</a>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="flex flex-wrap">
					{data.length > 0 && data.map((item) => (<RealResultCard data={item} />))}
				</div>
				{showMore && (
					<div className="flex flex-wrap justify-center">
						<div className="col text-center">
							<a href="#!" className={`hover:no-underline inline-block border-2 align-middle text-center select-none font-bold whitespace-no-wrap rounded py-1 px-3 no-underline leading-tight text-base border-primary  hover:text-white bg-white hover:bg-primary ${showMore}`} onClick={loadMore}>
								Show more reviews
							</a>
						</div>
					</div>
				)}
			</div>
			<div className="pt-4 pb-2">
				<div className="container">
					<div className="row px-1">
						<h2 className="h1 mb-2 w-full text-center">Customer Reviews</h2>
						<YotpoReviews
							productId={4543113265187}
							productName='Sunny Honey Bali Bronzing Foam'
							productUrl='https://dev.cocoandeve.com/products/sunny-honey-bali-bronzing-self-tan-mousse'
							productImage='//cdn.shopify.com/s/files/1/0286/1327/9779/products/FOAM_DARK_YELLOW_1_large.jpg%3Fv=1609922006'
							productDesc='<div> <strong></strong>Anti-cellulite, anti-ageing self tan with zero nasties. Created using unique CellushapeTM formula to hydrate and firm the skin.<br> </div> <ul> <li>Blurs Pigmentation and Perfects Skin.</li> <li>Tropical Mango and Guava Scent. (No biscuit smells!)</li> <li>Lightweight, non-sticky formula.</li> <li>Fast drying and develops in just 2 hours</li> <li>Vegan. 100% Natural DHA. No Nasties</li> </ul>'
							productSkus='CE0000032020,CE0000032040,CE0000032060,CE0000072020,CE0000072040,CE0000072060'
							canCreate={true}
						/>
					</div>
				</div>
			</div>
			<div className='w-full bg-gray-400 my-4'>
				<TestimonialCarousel data={testimonialItems} />
			</div>
			<ProductCarousel products={PRODUCTS} />
			<Instagram className="bg-pink-light" isStyleguide={true} />
		</>
    );
}

export default RealResults;
