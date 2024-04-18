
const SearchProductCard = (props: any) => {
	const  { url, title, img } = props
	return (
		<figure className={`relative w-full  flex lg:flex-col mb-2 order-4 lg:px-g ${props.classes ? props.classes : 'lg:w-1/4'}`}>
			<a href={url} className="w-1/4 lg:w-full px-0">
				<picture>
					<img src={img} alt="Placeholder" className="d-block w-100" />
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