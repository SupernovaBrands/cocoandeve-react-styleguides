import PlusCircle from '../../src/images/icons/plus-circle.svg';

const UpsellBlog = (props) => {
	return (
        <form className="upsell d-flex align-items-center">
            <figure className="d-flex flex-grow-1 mb-0">
                <picture className="flex-shrink-0">
                    <source srcSet="https://via.placeholder.com/112x136.jpg/EFADBA" media="(min-width: 992px)" />
                    <img src="https://via.placeholder.com/150x208.jpg/EFADBA" className="w-100" />
                </picture>
                <figcaption className="d-flex flex-column">
                    <span className="upsell__title">{props.title}</span>
                    <span className="upsell__price text-primary flex-grow-1">
                        <span className="compare">{props.comparePrice}</span>
                        {props.price}
                        <span className="save">{props.save}</span>
                    </span>
                    <button className="btn btn-outline-primary align-self-start d-lg-none">Add to cart</button>
                </figcaption>
            </figure>
            <a className="d-none d-lg-flex flex-column flex-shrink-0 align-items-center" role="button">
                <PlusCircle className="svg text-primary" />
                <span className="upsell__atc-text">Add to cart</span>
            </a>
        </form>
	);
};

export default UpsellBlog;
