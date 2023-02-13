const UpsellPdp = (props) => {
	return (
        <form className={props.cls}>
            <figure className="d-flex flex-grow-1 mb-0 row">
                <picture className="col-4">
                    <source srcSet="https://via.placeholder.com/274x274.jpg/EFADBA" media="(min-width: 992px)" />
                    <img src="https://via.placeholder.com/236x236.jpg/EFADBA" className="w-100" />
                </picture>
                <figcaption className="col-8 d-flex flex-column mx-0 justify-content-around justify-content-lg-between p-0 font-size-base">
                    <span className="mt-0 mb-25 fw-bold">That’s A Wrap Bundle</span>
                    <p className="mb-25">Like A Virgin Coconut Hair Masque, Two-tiered Tangle Tamer.</p>
                    <span className="mb-25 text-primary">
                        <span className="text-linethrough text-body mr-25 text-nowrap">£139.90</span>
                        <span className="fw-bold mr-25 text-nowrap">£129.90</span>
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
