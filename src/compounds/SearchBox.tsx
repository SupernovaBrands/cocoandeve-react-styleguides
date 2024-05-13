import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';
import Close from '~/images/icons/close.svg';
import Loading from '~/images/icons/loading.svg';
import Search from '~/images/icons/search-thin.svg';
import SearchProductCard from './SearchProductCard';
import { getFeaturedImages } from '~/modules/utils';
import PopularProducts from './SearchPopular';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
	controlAutoplay,
} from '~/components/carousel/EmblaCarouselArrowButtons';
import ChevronNext from '~/images/icons/chevron-next.svg';
import ChevronPrev from '~/images/icons/chevron-prev.svg';

const SearchBox = (props: any) => {
	const { content, dummy } = props;
	const [keyword, setKeyword] = useState('');
	const [keywords, setKeywords] = useState([]);
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState([]);
	const [popProducts, setPopProducts] = useState([]);
	const [featuredImgs, setFeaturedImgs] = useState([]);
	const onChange = (e) => {
		e.target.value;
		setKeyword(e.target.value);
	}

	useEffect(() => {
		if (keyword !== '') setResult();
		else setContent();
	}, [keyword]);

	async function setResult () {
		setLoading(true);
		if (keyword.trim() === '') {
			setLoading(false);
		}
		if (/^[^a-zA-Z0-9]+$/.test(keyword)) {
			setProducts([]);
		}

		fetch(`/api/search?q=${keyword}`).then(
			res => {
				res?.json().then(data => {
					const productsData = data?.products;
					if (productsData.length > 0) {
						const keywordLower = keyword.toLowerCase();
						productsData.sort((x, y) => (x.availableForSale === y.availableForSale)? 0 : x.availableForSale? -1 : 1);
						const filteredByKey = productsData.filter((item) => {
							if (item.handle === 'bali-bod-bundle-body-scrub-mask-cream') {
								console.log('item', item);
							}
							const tags = item.tags.map((t: string) => t.toLowerCase());
							const tagsString = tags.join(',');
							return item.title.toLowerCase().includes(keywordLower) || tagsString.includes(keywordLower);
						})
						const productsWithImgs = filteredByKey.map((item) => {
							let featuredImg = featuredImgs.find((img) => img.handle === item.handle)
								? featuredImgs.find((img) => img.handle === item.handle).featured_image_url : null;
							featuredImg = (featuredImg === null) ? item.featuredImage?.url?.replace('.jpg', '_320x.jpg') : featuredImg;
							return {
								...item,
								featuredImgUrl: featuredImg || '',
							}
						});
						setProducts(productsWithImgs.filter((item) => item.featuredImgUrl && item.featuredImgUrl !== ''));
					} else {
						setProducts([]);
					}
					setLoading(false);
				})
			}
		)
	}

	const setContent = async () => {
		if (content?.popular_keywords && content?.popular_keywords !== '') {
			const words = content?.popular_keywords.split(',');
			setKeywords(words);
		}

		if (content?.search_popular_handles && content.search_popular_handles !== '') {
			const handles = content.search_popular_handles.split(',');
			const pProducts = [];
			const pInfos = handles.map(async (handle) => await fetch(`/api/getProductInfo?handle=${handle}`).then((r) => r.json()));
			const popProducts = await Promise.all(pInfos);
			popProducts.map((data) => {
				const { product } = data;
				if (product) {
					const featuredImg = featuredImgs.find((img) => img.handle === product.handle)
						? featuredImgs.find((img) => img.handle === product.handle).featured_image_url : null;
					if (featuredImg) {
						pProducts.push({
							...product,
							featuredImgUrl: featuredImg,
							url: `/products/${product.handle}`,
						});
					}
				}
			});
			if (pProducts.length > 0) setPopProducts(pProducts);
		}
	}

	const onClickTag = (word) => {
		setKeyword(word);
	};

	useEffect(() => {
		if (keyword !== '') {
			setResult();
		} else {
			setProducts([]);
		}
	}, [keyword]);

	useEffect(() => {
		getFeaturedImages().then((dataImg) => setFeaturedImgs(dataImg));
	}, []);

	useEffect(() => {
		setContent();
	}, [featuredImgs]);

	const options: EmblaOptionsType = {
		loop: false,
		slidesToScroll: 2,
		active: false,
		breakpoints: {
			'(min-width: 768px)': { active: true },
		},
	};
	const [emblaRef8, emblaApi8] = useEmblaCarousel({ align: 'start', ...options}, [
		Autoplay({ playOnInit: false, delay: 3000 })
	]);
	const {
		prevBtnDisabled: prevDisabled8,
		nextBtnDisabled: nextDisabled8,
		onPrevButtonClick: arrowClickPrev8,
		onNextButtonClick: arrowClickNext8
	} = usePrevNextButtons(emblaApi8);
	const autoPlayClick8 = controlAutoplay(emblaApi8);

	return (
		<div className={`z-[1020] search-panel fixed lg:absolute w-full overflow-hidden h-full lg:h-auto bg-white mt-lg-0 ${props.openSearchBox ? 'block' : 'hidden'}`}>
			<div className="border-b border-gray-400 w-full border-t">
				<div className="bg-white px-g">
					<div className="container relative flex items-center px-0 lg:px-g">
						<Search className="absolute text-lg mb-0 z-[1000] h-[1em]" />
						<input type="text" placeholder={content?.search_input_placeholder} name="q" className="w-full py-2 pl-4 lg:pl-4 border-0 focus:outline-none" aria-label="search" onChange={onChange} value={keyword} />
						<span className="search-panel__clear absolute items-center disabled right-[3em] opacity-50" role="button" onClick={() => setKeyword('')}>{content?.search_clear}</span>
						<span className="search-panel__close absolute items-center font-bold flex right-0 lg:right-[1em]" role="button">
							<Close className="h-[1em]" onClick={() => props.onToggleSearchBox()} />
						</span>
					</div>
				</div>
			</div>
			{!loading && keyword !== '' && products.length <= 0 && (
				<div className="py-3 container">
					<p className="font-bold mb-g">0 results</p>
					<p className="mb-0" dangerouslySetInnerHTML={{__html: content?.search_no_result_1.replace('$keyword', keyword)}} />
				</div>
			)}
			{loading && (
				<div className="search-panel__loading py-3 container text-center">
					<Loading className="svg text-primary fill-primary h-[3.375em] mx-auto" />
				</div>
			)}
			{keyword === '' && <PopularProducts content={content} keywords={keywords} onClickTag={onClickTag} dummy={dummy} popProducts={popProducts}/>}

			{!loading && keyword !== '' && products.length > 0 && (
				<div className="container lg:mt-2 px-hg lg:px-g lg:mb-3 max-h-[calc(100vh-16rem)] lg:max-h-none overflow-y-scroll lg:overflow-hidden">
					<div className="flex flex-wrap lg:-mx-g">
						<h4 className="container mx-auto mt-2 lg:mt-0 text-base mb-1 px-hg lg:px-g">{products.length === 1 ? `${products.length} result` : `${products.length} results`}</h4>
						<div className="container flex flex-wrap order-2 search__carousel px-0">
							<div className="container px-0 lg:px-g">
								<Carousel.Wrapper emblaApi={emblaApi8} className="lg:w-full">
									<Carousel.Inner emblaRef={emblaRef8} className="lg:-mx-g">
										{products.map((item, index) => (
											<SearchProductCard
												url={item.handle}
												key={`s1--${index}`}
												title={item?.title}
												img={item?.featuredImgUrl}
												classes="carousel__slide flex-grow-0 flex-shrink-0 w-full basis-full lg:w-1/6 lg:basis-1/6 px-hg lg:px-g"
											/>
										))}
									</Carousel.Inner>
									{products.length > 6 && (
										<Carousel.Navigation>
											<PrevButton
												onClick={() => autoPlayClick8(arrowClickPrev8)}
												disabled={prevDisabled8}
												className={`hidden lg:flex lg:right-[3%] lg:left-auto lg:top-auto lg:bottom-auto lg:w-2 lg:h-2 text-body ${prevDisabled8 ? 'opacity-50 pointer-events-none' : ''}`}
											>
												<span className="bg-white w-2 h-2 absolute z-[-1] flex justify-center items-center">
													<ChevronPrev className="w-g h-g svg--current-color" />
												</span>
											</PrevButton>
											<NextButton
												onClick={() => autoPlayClick8(arrowClickNext8)}
												disabled={nextDisabled8}
												className={`hidden lg:flex lg:right-0 lg:top-auto lg:bottom-auto lg:w-2 lg:h-2 text-body ${nextDisabled8 ? 'opacity-50 pointer-events-none' : ''}`}
											>
												<span className="bg-white w-2 h-2 absolute z-[-1] flex justify-center items-center">
													<ChevronNext className="w-g h-g svg--current-color" />
												</span>
											</NextButton>
										</Carousel.Navigation>
									)}
								</Carousel.Wrapper>
							</div>
						</div>
					</div>
					<p>Not what you're looking for?
						<br className="lg:hidden" />
						<span className="hidden lg:inline">&nbsp;</span>
						Check our <a href="/collections/all" className="text-underline">shop all page</a>
					</p>
				</div>
			)}
		</div>
	);
};

export default SearchBox;
