import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Close from '../../src/images/icons/close.svg';
import Loading from '../../src/images/icons/loading.svg';
import Search from '../../src/images/icons/search-thin.svg';
import SearchProductCard from './SearchProductCard';
const CarouselScroll = dynamic(() => import('@/components/CarouselScroll'), {
	ssr: false,
});

const SearchBox = (props: any) => {
	const [keyword, setKeyword] = useState('');
	const [products, setProducts] = useState([]);
	const onChange = (e) => {
		e.target.value;
		setKeyword(e.target.value);
	}

	useEffect(() => {
		setResult();
	}, [keyword]);

	async function setResult () {
		console.log('setting result...');
		const productsResult = [
			{
				product_id: '000',
				img: 'https://via.placeholder.com/444x558',
				title: 'Search result 1',
				handle: '',
				url: '/'
			},
			{
				product_id: '000',
				img: 'https://via.placeholder.com/444x558',
				title: 'Search result 2',
				handle: '',
				url: '/'
			},
			{
				product_id: '000',
				img: 'https://via.placeholder.com/444x558',
				title: 'Search result 3',
				handle: '',
				url: '/'
			},
			{
				product_id: '000',
				img: 'https://via.placeholder.com/444x558',
				title: 'Search result 4',
				handle: '',
				url: '/'
			},
			{
				product_id: '000',
				img: 'https://via.placeholder.com/444x558',
				title: 'Search result 2',
				handle: '',
				url: '/'
			},
			{
				product_id: '000',
				img: 'https://via.placeholder.com/444x558',
				title: 'Search result 6',
				handle: '',
				url: '/'
			},
			{
				product_id: '000',
				img: 'https://via.placeholder.com/444x558',
				title: 'Search result 7',
				handle: '',
				url: '/'
			},
			{
				product_id: '000',
				img: 'https://via.placeholder.com/444x558',
				title: 'Search result 8',
				handle: '',
				url: '/'
			},
			{
				product_id: '000',
				img: 'https://via.placeholder.com/444x558',
				title: 'Search result 9',
				handle: '',
				url: '/'
			}
		]

		setProducts(productsResult);
	}

	return (
		<div className={`z-[1000] search-panel w-100 overflow-hidden bg-white mt-lg-0 ${props.openSearchBox ? 'block' : 'hidden'}`}>
			<div className="border-b border-gray-400 w-100 border-t">
				<div className="bg-white px-g">
					<div className="container relative flex items-center px-0 lg:px-g">
						<Search className="absolute text-lg mb-0 z-[1000] h-[1em]" />
						<input type="text" placeholder="Search" name="q" className="w-full py-2 pl-4 lg:pl-4 border-0 focus:outline-none" aria-label="search" onChange={onChange} value={keyword} />
						<span className="search-panel__clear absolute items-center disabled right-[3em] opacity-50" role="button" onClick={() => setKeyword('')}>Clear</span>
						<span className="search-panel__close absolute items-center font-bold flex right-1" role="button">
							<Close className="h-[1em]" onClick={() => props.onToggleSearchBox()} />
						</span>
					</div>
				</div>
			</div>
			<div className="py-3 container hidden">
				<p className="font-bold">0 results</p>
				<p className="mb-0">Whoops, there it isn’t. Try a new search or check out our <a href="#" className="text-underline">shop all page</a>.</p>
			</div>
			<div className="search-panel__loading py-3 container hidden text-center">
				<Loading className="svg text-primary" />
			</div>
			{keyword === '' ? (
				<div className="container px-g lg:px-g pt-3">
					<div className="flex flex-wrap ">
						<h4 className="w-full lg:w-1/3 lg:mb-2 font-normal order-1  text-base px-0 mb-1">Popular searched items</h4>
						<h4 className="w-full lg:w-2/3 lg:mb-2 mb-1 font-normal order-3 lg:order-2  text-base px-0 lg:px-g">Popular searched products</h4>
						<div className="w-full lg:w-1/3 order-2 mb-3">
							<span className="search-panel__tag p-1 me-1 inline-block mb-1 rounded bg-gray-400 text-gray-600">Mask</span>
							<span className="search-panel__tag p-1 me-1 inline-block mb-1 rounded bg-gray-400 text-gray-600">Shampoo</span>
							<span className="search-panel__tag p-1 me-1 inline-block mb-1 rounded bg-gray-400 text-gray-600">Tan</span>
							<span className="search-panel__tag p-1 me-1 inline-block mb-1 rounded bg-gray-400 text-gray-600">Scul scrub</span>
							<span className="search-panel__tag p-1 me-1 inline-block mb-1 rounded bg-gray-400 text-gray-600">Mitt</span>
							<span className="search-panel__tag p-1 me-1 inline-block mb-1 rounded bg-gray-400 text-gray-600">Bali Bod Bundle</span>
						</div>
						<div className='w-full lg:w-2/3 flex order-4 flex-wrap'>
							<SearchProductCard title="Bali Bronzing Foam in two lines" classes="mb-1 order-4 w-full lg:w-1/4" />
							<SearchProductCard title="Bali Bronzing Foam in two lines" classes="mb-1 order-4 w-full lg:w-1/4" />
							<SearchProductCard title="Bali Bronzing Foam in two lines" classes="mb-1 order-4 w-full lg:w-1/4" />
							<SearchProductCard title="Bali Bronzing Foam in two lines" classes="mb-4 order-4 w-full lg:w-1/4" />
						</div>
					</div>
				</div>
			) : (
				<div className="container lg:mt-2 px-g">
					<div className="flex flex-wrap ">
						<h4 className="container mx-auto mt-2 lg:mt-0 text-base mb-1 px-0">{products.length} results</h4>
						<div className='w-full flex order-2 px-0 flex-wrap'>
							<SearchProductCard title="Bali Bronzing Foam in two lines" classes="mb-1 order-4 w-full lg:w-1/4" />
							<SearchProductCard title="Bali Bronzing Foam in two lines" classes="mb-1 order-4 w-full lg:w-1/4" />
							<SearchProductCard title="Bali Bronzing Foam in two lines" classes="mb-1 order-4 w-full lg:w-1/4" />
							<SearchProductCard title="Bali Bronzing Foam in two lines" classes="mb-4 order-4 w-full lg:w-1/4" />
							<SearchProductCard title="Bali Bronzing Foam in two lines" classes="mb-4 order-4 w-full lg:w-1/4" />
							<SearchProductCard title="Bali Bronzing Foam in two lines" classes="mb-4 order-4 w-full lg:w-1/4" />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default SearchBox;
