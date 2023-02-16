const UpsellPdp = (props) => {
	return (
        <form className="product-upsell d-flex align-items-center p-0 mb-3">
            <figure className="d-flex flex-grow-1 mb-0 row">
                <picture className="col-4">
                    <source srcSet="https://via.placeholder.com/274x274.jpg/EFADBA" media="(min-width: 992px)" />
                    <img src="https://via.placeholder.com/236x236.jpg/EFADBA" className="w-100" />
                </picture>
                <figcaption className="col-8 d-flex flex-column mx-0 justify-content-around justify-content-lg-between p-0 font-size-base">
                    <span className="mt-0 mb-25 fw-bold">{props.title}</span>
                    <p className="mb-25">{props.content}</p>
                    <span className="mb-25 text-primary">
                        <span className="text-linethrough text-body mr-25 text-nowrap">{props.comparePrice}</span>
                        <span className="fw-bold mr-25 text-nowrap">{props.price}</span>
                    </span>
                    <div className="d-flex flex-shrink-0">
                        <button type="submit" className="btn btn-outline-primary">Add to cart</button>
                    </div>
                </figcaption>
            </figure>
        </form>
	);
};

export default UpsellPdp;
