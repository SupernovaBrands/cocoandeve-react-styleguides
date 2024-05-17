import SearchProductCard from "./SearchProductCard";

const PopularProducts = (props: any) => {
	const { content, keywords, onClickTag, dummy, popProducts } = props;
	return (
		<div className="container px-g lg:px-g pt-3 max-h-[calc(100vh-16rem)] lg:max-h-none overflow-y-scroll lg:overflow-hidden">
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
								const { title, featuredImgUrl, url } = product;
								return (
									<SearchProductCard
										key={`spc-${title}`}
										title={title}
										img={featuredImgUrl}
										url={url}
										classes="mb-1 order-4 w-full lg:w-1/4" />
								)
							})}
						</>
					) : (
						<>
							<SearchProductCard key={`spc-ph1`} title="Bali Bronzing Foam in two lines" img="https://via.placeholder.com/444x558" classes="mb-1 order-4 w-full lg:w-1/4" />
							<SearchProductCard key={`spc-ph2`} title="Bali Bronzing Foam in two lines" img="https://via.placeholder.com/444x558" classes="mb-1 order-4 w-full lg:w-1/4" />
							<SearchProductCard key={`spc-ph3`} title="Bali Bronzing Foam in two lines" img="https://via.placeholder.com/444x558" classes="mb-1 order-4 w-full lg:w-1/4" />
							<SearchProductCard key={`spc-ph4`} title="Bali Bronzing Foam in two lines" img="https://via.placeholder.com/444x558" classes="mb-4 order-4 w-full lg:w-1/4" />
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default PopularProducts;
