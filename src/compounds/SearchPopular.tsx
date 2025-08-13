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
								// if (store === 'au' && handle === 'daily-essentials-bundle') {
								// 	featuredImageUrl = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/d1fe49e9-80c4-47cd-3c96-c27f2a578700/public';
								// }
								// if (store === 'au' && handle === 'tan-masters-kit') {
								// 	featuredImageUrl = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/f7a07e54-75c2-4834-3bfd-00bd9188a300/public';
								// }
								// if (store === 'eu' && handle === 'hair-revival-set') {
								// 	featuredImageUrl = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/5e4131b1-37c9-4e58-7e23-d56aac5e9600/public';
								// }
								// if (store === 'au' && handle === 'tan-masters-kit') {
								// 	featuredImageUrl = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/f7a07e54-75c2-4834-3bfd-00bd9188a300/public';
								// }
								if (store === 'eu' && handle === 'hair-revival-set') {
									featuredImageUrl = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/5e4131b1-37c9-4e58-7e23-d56aac5e9600/public';
								}
								// if (store === 'int' && handle === 'hair-revival-set') {
								// 	featuredImageUrl = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/7f8c59cc-00b2-4c2e-29bb-7a84435cdd00/public';
								// }
								// if (store === 'my' && handle === 'hair-revival-set') {
								// 	featuredImageUrl = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/c28d622f-45cc-49ce-d5c2-0dbd6c1f9100/public';
								// }
								if (['my', 'uk', 'eu', 'au'].includes(store) && handle === 'clean-slate-set') {
									featuredImageUrl = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/2d6596e4-f344-4968-c8b9-6b2530881000/public';
								}
								if (store === 'int' && handle === 'clean-slate-set') {
									featuredImageUrl = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/271b3156-1d41-4f82-4824-a82722030500/public';
								}
								if (store === 'eu' && handle === 'sunny-honey-bali-bronzing-self-tan-set') {
									featuredImageUrl = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/9f406164-c10f-4f00-6a01-b4c9401dd200/public';
								}
								if (store === 'eu' && handle === 'bali-bae-self-tan-set') {
									featuredImageUrl = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/67f1b020-5e23-4c02-7d8c-e762222db500/public';
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
