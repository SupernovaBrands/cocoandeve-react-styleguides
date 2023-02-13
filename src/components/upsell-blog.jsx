const UpsellBlog = () => {
	return (
        <form className="upsell d-flex align-items-center">
            <figure className="d-flex flex-grow-1 mb-0">
                <picture className="flex-shrink-0">
                    <source srcSet="https://via.placeholder.com/112x136.jpg/EFADBA" media="(min-width: 992px)" />
                    <img src="https://via.placeholder.com/150x208.jpg/EFADBA" className="w-100" />
                </picture>
                <figcaption className="d-flex flex-column">
                    <span className="upsell__title">That’s a wrap bundle</span>
                    <span className="upsell__price text-primary flex-grow-1">
                        <span className="compare">£XX.XX</span>
                        £XX.XX
                        <span className="save">(Save 20%)</span>
                    </span>
                    <button className="btn btn-outline-primary align-self-start d-lg-none">Add to cart</button>
                </figcaption>
            </figure>
            <a className="d-none d-lg-flex flex-column flex-shrink-0 align-items-center" role="button">
                {/* <img className="svg text-primary" src="icons/plus-circle.svg" replace-to-svg /> */}
                <span className="upsell__atc-text">Add to cart</span>
            </a>
        </form>
	);
};

export default UpsellBlog;
