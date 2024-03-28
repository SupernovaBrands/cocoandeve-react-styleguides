
const SearchProductCard = (props: any) => {
    return (
        <figure className={`relative w-full lg:w-1/4 flex lg:flex-col mb-2 order-4 lg:px-g`}>
            <a href="" className="w-1/4 lg:w-full px-0">
                <picture>
                    <img src="https://via.placeholder.com/444x558" alt="Placeholder" className="d-block w-100" />
                </picture>
            </a>
            <figcaption className="flex-grow-1 flex flex-column align-self-center w-100 ml-1 items-center">
                <form className="product-card-form flex-grow-1 d-flex flex-column h-100">
                    <input type="hidden" name="id" value="variantId" />
                    <input type="hidden" name="quantity" value="1" />
                    <a href="#" className="block font-bold text-body mb-0 mt-0 lg:mt-2">{props.title}</a>
                </form>
            </figcaption>
        </figure>
    )
}

export default SearchProductCard;