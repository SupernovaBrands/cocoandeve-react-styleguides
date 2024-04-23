
const SearchProductCard = (props: any) => {
	const  { url, title, img } = props
	return (
		<figure className={`relative w-full flex lg:flex-col mb-2 order-4 lg:px-g ${props.classes ? props.classes : 'lg:w-1/4'}`}>
			<a href={url} className="px-0 max-w-none flex-none">
				<picture>
					<source srcSet={img.replace('/public', '/320x')} media="(min-width: 992px)" width="170" height="211" />
					<img src={img.replace('/public', '/192x')} alt={title} className="block w-full max-h-[none] object-cover lg:h-[211px]" loading="lazy" width="96" height="85" />
				</picture>
			</a>
			<figcaption className="flex-grow-1 flex flex-column align-self-center w-full items-center">
				<form className="product-card-form flex-grow-1 flex flex-column h-full ml-g lg:ml-0 items-center">
					<input type="hidden" name="id" value="variantId" />
					<input type="hidden" name="quantity" value="1" />
					<a href="#" className="block font-bold text-body mb-0 mt-0 lg:mt-2">{title}</a>
				</form>
			</figcaption>
		</figure>
	)
}

export default SearchProductCard;