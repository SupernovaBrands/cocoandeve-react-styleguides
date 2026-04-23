import SearchProductCard from "./SearchProductCard";

const PopularProducts = (props: any) => {
	const { content, keywords, onClickTag, dummy, popProducts, store } = props;
	return (
		<div className="search--popular container px-g lg:px-g pt-3 max-h-[calc(100vh-16rem)] lg:max-h-none overflow-y-scroll lg:overflow-hidden">
			<div className="flex flex-wrap lg:-mx-g">
				<h4 className="w-full lg:w-1/3 lg:mb-2 font-normal order-1 text-base px-0 lg:px-g mb-1">{content?.popular_keywords_heading}</h4>
				<h4 className="w-full lg:w-2/3 lg:mb-2 mb-1 font-normal order-3 lg:order-2 text-gray-600 text-base px-0 lg:px-g">{content?.popular_products_heading}</h4>
				<div className="w-full lg:w-1/3 order-2 mb-3 lg:px-g">
					{keywords && keywords.map((word) => (
						<span key={`key-${word}`} onClick={() => onClickTag(word)} className="search-panel__tag cursor-pointer p-1 me-1 inline-block mb-1 rounded bg-gray-400 text-gray-600">{word}</span>
					))}
				</div>
				<div className='w-full lg:w-2/3 flex order-4 flex-wrap'>
					{!dummy ? (
						<>
							{popProducts.length > 0 && popProducts.map((product) => {
								const { title, handle } = product;
								let featuredImageUrl = product.featuredImgUrl;
								if (store === 'eu' && handle === 'hair-revival-set') {
									featuredImageUrl = 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_97f5a2d2-ccf4-4f13-9e5e-40c246bc935d.jpg?v=1772038243';
								}
								if (['my', 'uk', 'eu', 'au'].includes(store) && handle === 'clean-slate-set') {
									featuredImageUrl = 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_9296534d-a960-4c10-9c99-82ba4e5d8c6f.jpg?v=1772038262';
								}
								if (store === 'int' && handle === 'clean-slate-set') {
									featuredImageUrl = 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_03b6e47b-ea7c-4db3-8edc-7e02bee8514b.jpg?v=1772038281';
								}
								if (store === 'eu' && handle === 'sunny-honey-bali-bronzing-self-tan-set') {
									featuredImageUrl = 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_6cd46e55-8015-4c34-b853-4082b687277c.jpg?v=1772038303';
								}
								if (store === 'eu' && handle === 'bali-bae-self-tan-set') {
									featuredImageUrl = 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_64cdaa05-d417-4b44-a67b-eaece672355a.jpg?v=1772038323';
								}
								return (
									<SearchProductCard
										key={`spc-${title}`}
										title={title}
										img={featuredImageUrl}
										url={handle}
										popularItem={true}
										classes="mb-1 order-4 w-full lg:w-1/4" />
								)
							})}
						</>
					) : (
						<>
							<SearchProductCard popularItem={true} key={`spc-ph1`} title="Bali Bronzing Foam in two lines" img="https://via.placeholder.com/444x558" classes="mb-1 order-4 w-full lg:w-1/4" />
							<SearchProductCard popularItem={true} key={`spc-ph2`} title="Bali Bronzing Foam in two lines" img="https://via.placeholder.com/444x558" classes="mb-1 order-4 w-full lg:w-1/4" />
							<SearchProductCard popularItem={true} key={`spc-ph3`} title="Bali Bronzing Foam in two lines" img="https://via.placeholder.com/444x558" classes="mb-1 order-4 w-full lg:w-1/4" />
							<SearchProductCard popularItem={true} key={`spc-ph4`} title="Bali Bronzing Foam in two lines" img="https://via.placeholder.com/444x558" classes="mb-4 order-4 w-full lg:w-1/4" />
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default PopularProducts;
