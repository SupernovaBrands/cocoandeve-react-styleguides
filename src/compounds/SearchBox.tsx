import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
// import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';
import Close from '~/images/icons/close.svg';
import Loading from '~/images/icons/loading.svg';
import Search from '~/images/icons/search-thin.svg';
import SearchProductCard from './SearchProductCard';
// import { getFeaturedImages } from '~/modules/utils';
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
	const { content, dummy, trackEvent, openAccountBox, getFeaturedImgMeta, store } = props;
	const [keyword, setKeyword] = useState('');
	const [keywords, setKeywords] = useState([]);
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState([]);
	const [popProducts, setPopProducts] = useState([]);
	const [init, setInit] = useState(false);
	// const [featuredImgs, setFeaturedImgs] = useState([]);
	const orderHandles = [
		'super-nourishing-coconut-fig-hair-masque',
		'repairing-restoring-hair-mask',
		'hydrating-shampoo',
		'shampoo-conditioner-set',
		'hydrating-conditioner',
		'leave-in-conditioner',
		'clean-scalp-treatment',
		'miracle-elixir-hair-oil-treatment',
		'sunny-honey-bali-bronzing-self-tan-mousse',
		'sunny-honey-bali-bronzing-self-tan-set',
		'bali-bae-self-tan-set',
		'bronzing-self-tanner-drops',
	];

	const onChange = (e) => {
		e.target.value;
		setKeyword(e.target.value);
	}

	useEffect(() => {
		if (keyword !== '' ) {
			setLoading(true);
			const delayDebounceFn = setTimeout(() => {
				setResult();
			}, 750);
			return () => clearTimeout(delayDebounceFn);
		} else if (!init){
			setContent();
			setProducts([]);
			setInit(true);
		}

		try {
			if (keyword !== '') {
				trackEvent('search_keyword', {
					category: 'Search Box',
					search_term: keyword,
				});
			}
		} catch (e) {
			console.log(e);
		}
	}, [keyword]);

	const tagsSort = (a, b) => {
		const isBestSellerA = a.tags.includes('Best Sellers');
		const isBestSellerB = b.tags.includes('Best Sellers');
		if (isBestSellerA && !isBestSellerB) {
			return -1;
		}

		if (!isBestSellerA && isBestSellerB) {
			return 1;
		}

		return 0;
	};

	const handleSort = (a, b) => {
		const indexNumA = orderHandles.indexOf(a.handle);
		const indexNumB = orderHandles.indexOf(b.handle);

		if (indexNumA >= 0 && indexNumB < 0) {
			return -1;
		}

		if (indexNumA < 0 && indexNumB >= 0) {
			return 1;
		}

		if (indexNumA >= 0 && indexNumB >= 0) {
			return (indexNumA > indexNumB) ? 0 : -1;
		}

		return 0;
	};

	async function setResult () {
		const exclusion = content?.search_exclusion?.split(',') || '';
		setLoading(true);
		if (keyword.trim() === '') {
			setLoading(false);
		}
		if (/^[^a-zA-Z0-9]+$/.test(keyword)) {
			setProducts([]);
		}

		fetch(`/api/predictiveSearch?q=${keyword}`).then(
			res => {
				res?.json().then(data => {
					const productsData = data?.products;
					if (productsData.length > 0) {
						const keywordLower = keyword.toLowerCase();
						productsData.sort((x, y) => (x.availableForSale === y.availableForSale)? 0 : x.availableForSale? -1 : 1);
						const uniqueHandle = productsData.filter((value, index, self) => index === self.findIndex((t) => (
							t.handle === value.handle
						)))
						const productFiltered = uniqueHandle.filter((i) => {
							const title = i.title.toLowerCase();
							// const tags = i.tags.map((t: string) => t.toLowerCase());
							// const tagsString = tags.join(',');
							return (i.productType === 'HERO' || i.productType === 'BUNDLE') &&
								// (title.toLowerCase().includes(keywordLower) || tagsString.includes(keywordLower)) &&
								!title.includes('vip') && exclusion.indexOf(i.handle) === -1;
						});
						productFiltered.sort(tagsSort);
						productFiltered.sort(handleSort);
						const uniqueCombined = productFiltered.filter((i) => !exclusion.includes(i.handle));
						let uniqueFiltered = uniqueCombined.filter((uniq) => !uniq.tags.includes('nosearch'));

						if (uniqueFiltered.length > 0) {
							uniqueFiltered = uniqueFiltered.map((item) => {
								// let featuredImg = featuredImgs.find((img) => img.handle === item.handle)
								// 	? featuredImgs.find((img) => img.handle === item.handle).featured_image_url : null;
								// featuredImg = (featuredImg === null) ? item.featuredImage?.url?.replace('.jpg', '_320x.jpg') : featuredImg;
								const { img } = getFeaturedImgMeta(item, store);
								return {
									title: item.title,
									handle: item.handle,
									featuredImgUrl: img || '',
									url: `/products/${item.handle}`,
									product: item,
								};
							});
							uniqueFiltered.forEach((item, i) => {
								if (item.handle === 'pro-youth-hair-scalp-mask') {
									uniqueFiltered.splice(i, 1);
									uniqueFiltered.unshift(item);
								}
							});
							setProducts(uniqueFiltered);
							setLoading(false);
						} else {
							setProducts([]);
						}
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
			const pInfos = handles.map(async (handle) => await fetch(`/api/getProductInfo?handle=${handle}`, {cache: 'force-cache'}).then((r) => r.json()));
			const popProducts = await Promise.all(pInfos);
			popProducts.map((data) => {
				const { product } = data;
				if (product) {
					// console.log('');
					const { img } = getFeaturedImgMeta(product, store);
					// const featuredImg = featuredImgs.find((img) => img.handle === product.handle)
					// 	? featuredImgs.find((img) => img.handle === product.handle).featured_image_url : null;
					if (img) {
						pProducts.push({
							...product,
							featuredImgUrl: img,
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

	// useEffect(() => {
	// 	getFeaturedImages().then((dataImg) => setFeaturedImgs(dataImg));
	// }, []);

	const options: EmblaOptionsType = {
		loop: false,
		slidesToScroll: 2,
		active: false,
		breakpoints: {
			'(min-width: 768px)': { active: true },
		},
	};
	const [emblaRef8, emblaApi8] = useEmblaCarousel({ align: 'start', ...options});
	const {
		prevBtnDisabled: prevDisabled8,
		nextBtnDisabled: nextDisabled8,
		onPrevButtonClick: arrowClickPrev8,
		onNextButtonClick: arrowClickNext8
	} = usePrevNextButtons(emblaApi8);
	// const autoPlayClick8 = controlAutoplay(emblaApi8);

	useEffect(() => {
		if (props.openSearchBox) document.body.classList.add('!overflow-y-hidden');
		else document.body.classList.remove('!overflow-y-hidden');
	}, [props.openSearchBox]);

	return (
		<div className={`${openAccountBox ? 'z-[990]' : 'z-[1020]'} search-panel fixed lg:absolute w-full overflow-hidden h-full bg-white mt-lg-0 block transition-all duration-500 ease-in-out lg:left-auto ${props.openSearchBox ? 'left-0 opacity-100 lg:h-auto' : 'left-[100%] opacity-0 lg:h-0'}`}>
			<div className="border-b border-gray-400 w-full border-t">
				<div className="bg-white px-g">
					<div className="container relative flex items-center px-0 lg:px-g">
						<Search className="absolute h2 mb-0 z-[1000] h-[1em]" />
						<input type="text" placeholder={content?.search_input_placeholder} name="q" className="w-full py-2 pl-4 lg:pl-4 border-0 focus:outline-none" aria-label="search" onChange={onChange} value={keyword} />
						<span className={`search-panel__clear absolute items-center disabled right-[3em] ${keyword === '' ? 'opacity-50' : ''}`} role="button" onClick={() => setKeyword('')}>{content?.search_clear}</span>
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
												trackEvent={trackEvent}
												store={store}
											/>
										))}
									</Carousel.Inner>
									{products.length > 6 && (
										<Carousel.Navigation>
											<PrevButton
												onClick={arrowClickPrev8}
												disabled={prevDisabled8}
												className={`hidden lg:flex lg:right-[3%] lg:left-auto lg:top-auto lg:bottom-auto lg:w-2 lg:h-2 text-body ${prevDisabled8 ? 'opacity-50 pointer-events-none' : ''}`}
											>
												<span className="bg-white w-2 h-2 absolute z-[-1] flex justify-center items-center">
													<ChevronPrev className="w-g h-g svg--current-color" />
												</span>
											</PrevButton>
											<NextButton
												onClick={arrowClickNext8}
												disabled={nextDisabled8}
												className={`hidden lg:flex lg:right-0 lg:top-auto lg:bottom-auto lg:w-2 lg:h-2 text-body lg:-mr-[3px] ${nextDisabled8 ? 'opacity-50 pointer-events-none' : ''}`}
											>
												<span className="bg-white w-2 h-2 absolute z-[-1] flex justify-center items-center">
													<ChevronNext className="w-[1rem] h-[1rem] svg--current-color" />
												</span>
											</NextButton>
										</Carousel.Navigation>
									)}
								</Carousel.Wrapper>
							</div>
						</div>
					</div>
					{content?.search_footer_note && (
						<p dangerouslySetInnerHTML={{
							__html: content?.search_footer_note.replace('d-lg-none', 'lg:hidden').replace('d-none d-lg-inline', 'hidden lg:inline').replace('text-underline', 'underline')
						}} />
					)}
				</div>
			)}
		</div>
	);
};

export default SearchBox;
