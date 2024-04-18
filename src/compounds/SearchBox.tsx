import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Close from '~/images/icons/close.svg';
import Loading from '~/images/icons/loading.svg';
import Search from '~/images/icons/search-thin.svg';
import SearchProductCard from './SearchProductCard';
import { getFeaturedImages } from '~/modules/utils';

const CarouselScroll = dynamic(() => import('~/components/CarouselScroll'), {
	ssr: false,
});

const SearchBox = (props: any) => {
	const { content, dummy } = props;
	const [keyword, setKeyword] = useState('');
	const [keywords, setKeywords] = useState([]);
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState([]);
	const [popProducts, setPopProducts] = useState([]);
	const [clearDisabled, setClearDisabled] = useState(true);
	const onChange = (e) => {
		e.target.value;
		setKeyword(e.target.value);
	}

	useEffect(() => {
		console.log('content12', content);
	}, []);

	useEffect(() => {
		setResult();
	}, [keyword]);

	useEffect(() => {
		setContent();
	}, [props]);

	async function setResult () {
		
	}

	const setContent = () => {
		const featuredImages = getFeaturedImages();
		if (content?.popular_keywords && content?.popular_keywords !== '') {
			const words = content?.popular_keywords.split(',');
			setKeywords(words);
		}

		if (content?.search_popular_handles && content.search_popular_handles !== '') {
			const handles = content.search_popular_handles.split(',');
			console.log('handles', handles);
			{/* @ts-ignore */}
			const pProducts = [];
			for (let i = 0; i <= handles.length; i += 1) {
				fetch(`/api/getProductInfo?handle=${handles[i]}`).then(
					res => {
						res?.json().then(data => {
							console.log('data1', data);
							const { product } = data;
							if (product) {
								const featuredImg = featuredImages.find((img) => img.handle === product.handle)
									? featuredImages.find((img) => img.handle === product.handle).featured_image_url : null;
								{/* @ts-ignore */}
								pProducts.push({
									...product,
									featuredImgUrl: featuredImg || '',
									url: `/products${product.handle}`,
								});
							}
							{/* @ts-ignore */}
							if (i === handles.length) setPopProducts(pProducts);
						});
					}
				);
			}
			setTimeout(() => {
				{/* @ts-ignore */}
				setPopProducts(pProducts);
			}, 500);
		}
	}

	const onClickTag = (e) => {
		const val = e.target.dataset.keyword;
		// console.log(val);
		setKeyword(val);
	};

	const onClear = () => {
		// console.log('onClear');
		setClearDisabled(false);
		setKeyword('');
	};

	useEffect(() => {
		if (keyword !== '') {
			setClearDisabled(false);
			setResult();
		} else {
			setClearDisabled(true);
			setProducts([]);
		}
	}, [keyword]);


	return (
		<div className={`z-[1000] search-panel w-100 overflow-hidden bg-white mt-lg-0 ${props.openSearchBox ? 'block' : 'hidden'}`}>
			<div className="border-b border-gray-400 w-100 border-t">
				<div className="bg-white px-g">
					<div className="container relative flex items-center px-0 lg:px-g">
						<Search className="absolute text-lg mb-0 z-[1000] h-[1em]" />
						<input type="text" placeholder={content?.search_input_placeholder} name="q" className="w-full py-2 pl-4 lg:pl-4 border-0 focus:outline-none" aria-label="search" onChange={onChange} value={keyword} />
						<span className="search-panel__clear absolute items-center disabled right-[3em] opacity-50" role="button" onClick={() => setKeyword('')}>{content?.search_clear}</span>
						<span className="search-panel__close absolute items-center font-bold flex right-1" role="button">
							<Close className="h-[1em]" onClick={() => props.onToggleSearchBox()} />
						</span>
					</div>
				</div>
			</div>
			<div className="py-3 container hidden">
				<p className="font-bold">0 results</p>
				<p className="mb-0" dangerouslySetInnerHTML={{__html: content?.search_no_result_1}} />
			</div>
			<div className="search-panel__loading py-3 container hidden text-center">
				<Loading className="svg text-primary" />
			</div>
			{keyword === '' ? (
				<div className="container px-g lg:px-g pt-3">
					<div className="flex flex-wrap ">
						<h4 className="w-full lg:w-1/3 lg:mb-2 font-normal order-1  text-base px-0 mb-1">{content?.popular_keywords_heading}</h4>
						<h4 className="w-full lg:w-2/3 lg:mb-2 mb-1 font-normal order-3 lg:order-2  text-base px-0 lg:px-g">{content?.popular_products_heading}</h4>
						<div className="w-full lg:w-1/3 order-2 mb-3">
							{keywords && keywords.map((word) => (
								<span className="search-panel__tag p-1 me-1 inline-block mb-1 rounded bg-gray-400 text-gray-600">{word}</span>
							))}
						</div>
						<div className='w-full lg:w-2/3 flex order-4 flex-wrap'>
							{!dummy ? (
									<>
										{popProducts.length > 0 && popProducts.map((product) => {
											{/* @ts-ignore */}
											const { title, featuredImgUrl, url } = product;
											return (
												<SearchProductCard
													title={title}
													img={featuredImgUrl}
													url={url} 
													classes="mb-1 order-4 w-full lg:w-1/4" />
											)
										})}
									</>
								) : (
									<>
										<SearchProductCard title="Bali Bronzing Foam in two lines" img="https://via.placeholder.com/444x558" classes="mb-1 order-4 w-full lg:w-1/4" />
										<SearchProductCard title="Bali Bronzing Foam in two lines" img="https://via.placeholder.com/444x558" classes="mb-1 order-4 w-full lg:w-1/4" />
										<SearchProductCard title="Bali Bronzing Foam in two lines" img="https://via.placeholder.com/444x558" classes="mb-1 order-4 w-full lg:w-1/4" />
										<SearchProductCard title="Bali Bronzing Foam in two lines" img="https://via.placeholder.com/444x558" classes="mb-4 order-4 w-full lg:w-1/4" />
									</>
								)
							}
							
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
