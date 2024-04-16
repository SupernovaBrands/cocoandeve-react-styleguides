import PlusCircle from '~/images/icons/plus-circle.svg';

const UpsellBlog = (props) => {
	return (
        <form className="upsell flex items-center">
            <figure className="flex grow mb-0">
                <picture className="shrink-0">
                    <source srcSet="https://via.placeholder.com/112x136.jpg/EFADBA" media="(min-width: 992px)" />
                    <img src="https://via.placeholder.com/150x208.jpg/EFADBA" className="w-full" />
                </picture>
                <figcaption className="flex flex-col">
                    <span className="upsell__title">{props.title}</span>
                    <span className="upsell__price text-primary grow">
                        <span className="compare mr-[3px]">{props.comparePrice}</span>
                        {props.price}
                        <span className="save ml-[3px]">{props.save}</span>
                    </span>
                    <button className="bg-transparent lg:hidden self-start hover:bg-primary hover:text-white rounded border border-primary font-bold text-primary py-[9px] px-[28px] mb-2">
                        Add to cart
                    </button>
                </figcaption>
            </figure>
            <a className="hidden lg:flex flex-col shrink-0 items-center" role="button">
                <PlusCircle className="svg fill-primary h-[1em] hover:fill-primary-dark fill-sm" />
                <span className="upsell__atc-text">Add to cart</span>
            </a>
        </form>
	);
};

export default UpsellBlog;
