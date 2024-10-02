import { Button } from '~/components/index';
const UpsellPdp = (props) => {
	return (
        <form className={`product-upsell flex flex-wrap items-center p-0 ${props.className ? props.className : ''}`}>
            <figure className="flex grow mb-0">
                <picture className="w-1/3 lg:pr-g sm:pr-hg">
                    <source srcSet="https://via.placeholder.com/274x274.jpg/EFADBA" media="(min-width: 992px)" />
                    <img src="https://via.placeholder.com/236x236.jpg/EFADBA" className="w-full" />
                </picture>
                <figcaption className="w-2/3 flex flex-col mx-0 justify-around lg:justify-between p-0 text-base sm:ml-1 lg:ml-0">
                    <span className="mt-0 mb-25 font-bold">{props?.title}</span>
                    <p className="mb-25">{props?.content}</p>
                    <span className="mb-25 text-primary">
                        <span className="line-through text-body mr-25 whitespace-no-wrap">{props.comparePrice}</span>
                        <span className="font-bold mr-25 whitespace-no-wrap">{props.price}</span>
                    </span>
                    <div className="flex shrink-0">
                        <Button label="Button" lg={false} buttonClass="bg-transparent hover:bg-primary hover:text-white border-primary text-primary">Add to cart</Button>
                    </div>
                </figcaption>
            </figure>
        </form>
	);
};

export default UpsellPdp;
