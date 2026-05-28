import useEmblaCarousel from 'embla-carousel-react';
import ProductCard from '~/compounds/ProductCard';

const DUMMY_PRODUCTS = [
	{ title: 'Bali Bronzing Foam in two lines', handle: 'bali-bronzing-foam-1', src: 'https://via.placeholder.com/444x558' },
	{ title: 'Bali Bronzing Foam in two lines', handle: 'bali-bronzing-foam-2', src: 'https://via.placeholder.com/444x558' },
	{ title: 'Bali Bronzing Foam in two lines', handle: 'bali-bronzing-foam-3', src: 'https://via.placeholder.com/444x558' },
	{ title: 'Bali Bronzing Foam in two lines', handle: 'bali-bronzing-foam-4', src: 'https://via.placeholder.com/444x558' },
];

const toProductModel = (p: any) => ({
	...p,
	src: p.src || p.featuredImgUrl || '',
	availableForSale: p.availableForSale ?? true,
	swatch: p.swatch || null,
});

const CARD_PROPS = {
	button: false,
	setWaitlistData: () => {},
	smSingleStar: false,
	carousel: true,
	addToCart: false,
};

const PopularProducts = (props: any) => {
	const { content, keywords, onClickTag, dummy, popProducts, store, trackEvent } = props;
	const [emblaRef] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' });

	const productList: any[] = dummy
		? DUMMY_PRODUCTS
		: (popProducts || []).map((product: any) => {
			let featuredImgUrl = product.featuredImgUrl;
			const { handle } = product;

			if (store === 'eu' && handle === 'hair-revival-set')
				featuredImgUrl = 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_97f5a2d2-ccf4-4f13-9e5e-40c246bc935d.jpg?v=1772038243';
			if (['my', 'uk', 'eu', 'au'].includes(store) && handle === 'clean-slate-set')
				featuredImgUrl = 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_9296534d-a960-4c10-9c99-82ba4e5d8c6f.jpg?v=1772038262';
			if (store === 'int' && handle === 'clean-slate-set')
				featuredImgUrl = 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_03b6e47b-ea7c-4db3-8edc-7e02bee8514b.jpg?v=1772038281';
			if (store === 'eu' && handle === 'bali-bae-self-tan-set')
				featuredImgUrl = 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_64cdaa05-d417-4b44-a67b-eaece672355a.jpg?v=1772038323';

			return { ...product, featuredImgUrl };
		});

	return (
		<div className="search--popular container px-g lg:px-g pt-3 max-h-[calc(100vh-16rem)] lg:max-h-none overflow-y-scroll lg:overflow-hidden">
			<div className="flex flex-wrap lg:-mx-g">
				<h4 className="w-full lg:w-1/3 lg:mb-2 font-bold order-1 text-base px-0 lg:px-g mb-1">{content?.popular_keywords_heading}</h4>
				<h4 className="w-full lg:w-2/3 lg:mb-2 mb-1 font-bold order-3 lg:order-2 text-gray-600 text-base px-0 lg:px-g">{content?.popular_products_heading}</h4>
				<div className="w-full lg:w-1/3 order-2 mb-3 lg:px-g">
					{keywords && keywords.map((word: string) => (
						<span key={`key-${word}`} onClick={() => onClickTag(word)} className="search-panel__tag cursor-pointer p-1 me-1 inline-block mb-1 rounded bg-gray-400 text-gray-600">{word}</span>
					))}
				</div>
				<div className="w-full lg:w-2/3 order-4">
					{/* Mobile: Embla carousel */}
					<div className="lg:hidden overflow-hidden" ref={emblaRef}>
						<div className="flex">
							{productList.map((p) => (
								<ProductCard
									key={`spc-m-${p.handle}`}
									keyName={`spc-m-${p.handle}`}
									product={toProductModel(p)}
									className="flex-shrink-0 w-[46%] px-[6px]"
									{...CARD_PROPS}
									trackEvent={trackEvent}
									store={store}
								/>
							))}
						</div>
					</div>
					{/* Desktop: flex grid */}
					<div className="hidden lg:flex flex-wrap">
						{productList.map((p) => (
							<ProductCard
								key={`spc-d-${p.handle}`}
								keyName={`spc-d-${p.handle}`}
								product={toProductModel(p)}
								className="mb-1 lg:w-1/3 lg:px-[8px]"
								{...CARD_PROPS}
								trackEvent={trackEvent}
								store={store}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PopularProducts;
