import Link from "next/link";

const SearchProductCard = (props: any) => {
	const  { url, title, img, trackEvent, store, subtitle } = props;
	let featuredImageUrl = img;

	const tracking = () => {
		trackEvent('search_product', {
			category: "Clickout",
			target: url,
		});

		trackEvent('product_card_click', {
			category: "Clickout",
			target: url,
		});
	}

	return (
		<figure className={`relative w-full flex lg:flex-col mb-2 order-4 lg:px-g ${props.classes ? props.classes : 'lg:w-1/4'}`}>
			<a onClick={tracking} href={`/products/${url}`} className={`${props.popularItem ? '' : 'px-hg'} lg:px-0 max-w-[25%] lg:max-w-none flex-none`}>
				<picture>
					<source srcSet={featuredImageUrl.replace('/public', '/320x').replace('.jpg', '_320x.jpg').replace('.png', '_320x.png')} media="(min-width: 992px)" width="170" height="211" />
					<img src={featuredImageUrl.replace('/public', '/192x').replace('.jpg', '_192x.jpg').replace('.png', '_192x.png')} alt={title} className="block w-full h-[85px] lg:w-full max-h-[5.3125em] lg:max-h-none object-cover lg:h-[211px]" loading="lazy" width="96" height="85" />
				</picture>
			</a>
			<figcaption className="flex-grow-1 flex align-self-center w-full items-center">
				<form className="product-card-form flex-grow-1 flex flex-col h-full ml-g lg:ml-0">
					<input type="hidden" name="id" value="variantId" />
					<input type="hidden" name="quantity" value="1" />
					<a onClick={tracking} href={`/products/${url}`} className="block font-bold text-body mb-0 mt-0 lg:mt-2 hover:text-body">{title}</a>
					{subtitle && (
						<p className="text-sm italic text-gray-600">
							Set is available on this product page.
						</p>
					)}
				</form>
			</figcaption>
		</figure>
	)
}

export default SearchProductCard;
