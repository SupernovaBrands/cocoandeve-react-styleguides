import dynamic from 'next/dynamic';

import { useEffect, useState } from "react";
import RealResultCard from '~/compounds/real-result-card';
import TestimonialCarousel from '~/sections/TestimonialCarousel';
import ProductCarousel from '~/sections/ProductCarousel';
import REVIEWS_PH from '~/modules/reviews';
import Instagram from '~/sections/Instagram';
import YotpoReviews from '~/components/yotpo-review-widget';
import TabNav from '~/components/TabNav';
import TabContent from '~/components/TabContent';

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
	const [activeTab, setActiveTab] = useState('tan');

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
					<label htmlFor="real-result__select" className="text-base font-normal mr-3 mb-0 h4">Filter By:</label>
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
						<h2 className="h1 mb-2 w-full text-center">Coco & Eve’s Customer Reviews</h2>
						<div className="flex flex-wrap justify-center lg:-mx-g sm:-mx-hg">
							<ul id="real-result__yotpo-tab" className="flex-wrap list-none pl-0 mb-3 text-center flex" role="tablist">
								<li className="nav-item" role="presentation">
									<TabNav className={`px-3 w-auto block no-underline hover:no-underline text-lg mb-0 border p-0 leading-[2.3] w-[5.625em] rounded-tl-[6px] rounded-br-[0] rounded-tr-[0] rounded-bl-[6px] border-body ${activeTab === 'tan' ? ' bg-primary text-white hover:text-white' : 'bg-white text-body'} `} title='Tan & SPF' active={activeTab === 'tan'} onNavChange={() => setActiveTab('tan')} />
								</li>
								<li className="nav-item" role="presentation">
									<TabNav className={`block no-underline hover:no-underline text-lg mb-0 border border-l-0 p-0 leading-[2.3] w-[5.625em] border-body ${activeTab === 'hair' ? ' bg-primary text-white hover:text-white' : 'bg-white text-body'}`} title='Hair' active={activeTab === 'hair'} onNavChange={() => setActiveTab('hair')} />
								</li>
								<li className="nav-item" role="presentation">
									<TabNav className={`block no-underline hover:no-underline text-lg mb-0 border border-l-0 p-0 leading-[2.3] w-[5.625em] border-body ${activeTab === 'skin' ? ' bg-primary text-white hover:text-white' : 'bg-white text-body'}`} title='Skin' active={activeTab === 'skin'} onNavChange={() => setActiveTab('skin')} />
								</li>
								<li className="nav-item" role="presentation">
									<TabNav className={`block no-underline hover:no-underline text-lg mb-0 border border-l-0 p-0 leading-[2.3] w-[5.625em] border-body rounded-bl-[0] rounded-tl-[0] rounded-br-[6px] rounded-tr-[6px] ${activeTab === 'body' ? ' bg-primary text-white hover:text-white' : 'bg-white text-body'}`} title='Body' active={activeTab === 'body'} onNavChange={() => setActiveTab('body')} />
								</li>
							</ul>
						</div>
						<TabContent active={activeTab === 'tan'}>
							<YotpoReviews
								productId={4543113265187}
								productName='Sunny Honey Bali Bronzing Foam'
								productUrl='https://dev.cocoandeve.com/products/sunny-honey-bali-bronzing-self-tan-mousse'
								productImage='//cdn.shopify.com/s/files/1/0286/1327/9779/products/FOAM_DARK_YELLOW_1_large.jpg%3Fv=1609922006'
								productDesc='<div> <strong></strong>Anti-cellulite, anti-ageing self tan with zero nasties. Created using unique CellushapeTM formula to hydrate and firm the skin.<br> </div> <ul> <li>Blurs Pigmentation and Perfects Skin.</li> <li>Tropical Mango and Guava Scent. (No biscuit smells!)</li> <li>Lightweight, non-sticky formula.</li> <li>Fast drying and develops in just 2 hours</li> <li>Vegan. 100% Natural DHA. No Nasties</li> </ul>'
								productSkus='CE0000072020,CE0000072040,CE0000072060,CE0000036020,CE0000036040,CE0000036060,CE0004012020,CE0000432040,CE0000432030,CE0002382020,CE0002382040,CE0002382060,CE0000852010,CE0000852020,CE0000852030,CE0001512020,CE0003532020,CE0000038040,CE0000102040,CE0002412020,CE0003662020,CE0003152020,CE0002522020,CE0003562020,CE0003562040,CE0003562060,CE0002842080,CE0000042060,CE0000042020,CE0001912020,CE0000052020,CE0002402020,CE0002402040,CE0000054040,CE0000054020'
								canCreate={true}
							/>
						</TabContent>
						<TabContent active={activeTab === 'hair'}>
							<YotpoReviews
								productId={4543113265187}
								productName='Sunny Honey Bali Bronzing Foam'
								productUrl='https://dev.cocoandeve.com/products/sunny-honey-bali-bronzing-self-tan-mousse'
								productImage='//cdn.shopify.com/s/files/1/0286/1327/9779/products/FOAM_DARK_YELLOW_1_large.jpg%3Fv=1609922006'
								productDesc='<div> <strong></strong>Anti-cellulite, anti-ageing self tan with zero nasties. Created using unique CellushapeTM formula to hydrate and firm the skin.<br> </div> <ul> <li>Blurs Pigmentation and Perfects Skin.</li> <li>Tropical Mango and Guava Scent. (No biscuit smells!)</li> <li>Lightweight, non-sticky formula.</li> <li>Fast drying and develops in just 2 hours</li> <li>Vegan. 100% Natural DHA. No Nasties</li> </ul>'
								productSkus='CE0000062020,CE0001672020,CE0001782020,CE0000732020,CE0001242020,CE0001952020,CE0001662020,CE0002992020,CE0000332020,CE0001152020,CE0001592020,CE0002742020,CE0002122020,CE0001252020,CE0000842040,CE0002242020,CE0001272020,CE0001664020,CE0000342040,CE0003432020,CE0003512020,CE0001492020,CE0003522020,CE0003442020,CE0003012040,CE0003572020,CE0002942020,CE0003122020,CE0003112020,CE0002932020,CE0000152080,CE0000152060,CE0000152010,CE0001182020,CE0000022060,CE0000022025,CE0001902020,CE0002342020,CE0002112020,CE0002172020,CE0000312040,CE0000962040,CE0003212020,CE0001932020,CE0002452020'
								canCreate={true}
							/>
						</TabContent>
						<TabContent active={activeTab === 'skin'}>
							<YotpoReviews
								productId={4543113265187}
								productName='Sunny Honey Bali Bronzing Foam'
								productUrl='https://dev.cocoandeve.com/products/sunny-honey-bali-bronzing-self-tan-mousse'
								productImage='//cdn.shopify.com/s/files/1/0286/1327/9779/products/FOAM_DARK_YELLOW_1_large.jpg%3Fv=1609922006'
								productDesc='<div> <strong></strong>Anti-cellulite, anti-ageing self tan with zero nasties. Created using unique CellushapeTM formula to hydrate and firm the skin.<br> </div> <ul> <li>Blurs Pigmentation and Perfects Skin.</li> <li>Tropical Mango and Guava Scent. (No biscuit smells!)</li> <li>Lightweight, non-sticky formula.</li> <li>Fast drying and develops in just 2 hours</li> <li>Vegan. 100% Natural DHA. No Nasties</li> </ul>'
								productSkus='CE0001612025,CE0002712020,CE0001612026,CE0001602020,CE0001612020'
								canCreate={true}
							/>
						</TabContent>
						<TabContent active={activeTab === 'body'}>
							<YotpoReviews
								productId={4543113265187}
								productName='Sunny Honey Bali Bronzing Foam'
								productUrl='https://dev.cocoandeve.com/products/sunny-honey-bali-bronzing-self-tan-mousse'
								productImage='//cdn.shopify.com/s/files/1/0286/1327/9779/products/FOAM_DARK_YELLOW_1_large.jpg%3Fv=1609922006'
								productDesc='<div> <strong></strong>Anti-cellulite, anti-ageing self tan with zero nasties. Created using unique CellushapeTM formula to hydrate and firm the skin.<br> </div> <ul> <li>Blurs Pigmentation and Perfects Skin.</li> <li>Tropical Mango and Guava Scent. (No biscuit smells!)</li> <li>Lightweight, non-sticky formula.</li> <li>Fast drying and develops in just 2 hours</li> <li>Vegan. 100% Natural DHA. No Nasties</li> </ul>'
								productSkus='CE0000112040,CE0000112060,CE0002372040,CE0002372020,CE0001222020,CE0001232020,CE0000122040,CE0000022040,CE0000114075,CE0000114080,CE0000254020,CE0000312060,CE0002842080,CE0003662020,CE0002932020'
								canCreate={true}
							/>
						</TabContent>
					</div>
				</div>
			</div>
			<div className='w-full bg-gray-100 mt-4 py-4'>
				<TestimonialCarousel data={testimonialItems} />
			</div>
			<ProductCarousel products={PRODUCTS} isStyleguide={true} />
			<Instagram className="bg-pink-light" isStyleguide={true} />
		</>
    );
}

export default RealResults;
