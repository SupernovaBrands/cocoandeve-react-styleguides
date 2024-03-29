import Link from "next/link";
import YotpoStar from "@/components/YotpoStars";

const AddToCartButton = (props) => {
    const { className } = props;
    return (
        <button type="button" className={`${className ? className : 'mb-1'} flex sm:flex-col md:flex-row bg-primary hover:bg-primary-dark text-white text-base inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded-full sm:py-[2.5px] lg:py-12 leading-normal no-underline px-2`}>
            <span className="w-full lg:w-1/2 block text-base text-center lg:text-left">Add to Cart</span>
            <span className="w-full lg:w-1/2 block text-base text-center lg:text-right">
                <span className="line-through mr-25">{props.comparePrice}</span>
                <span className="">{props.price}</span>
            </span>
        </button>
    );
};

const SwatchOverlay = (props) => {
    return (
        <>
            <AddToCartButton comparePrice={props.comparePrice} price={props.price} className="btn-choose mb-1"/>
            <div className="swatch-overlay flex-col items-center justify-end pb-0 absolute bg-white px-0 border border-primary rounded-t-lg bottom-[35px]">
                <div className="text-center w-full pt-2 lg:pb-2 pb-1 lg:px-1">
                    <label className="block mb-2">
                        {props.swatch.style && <strong>Style: </strong>}
                        {props.swatch.shade && <strong>Shade: </strong>}
                        <span data-swatch-label>{props.swatch.data[0].label}</span>
                    </label>
                    <ul className="list-unstyled product-variant-swatch flex justify-center">
                        {props.swatch.data.length > 0 && props.swatch.data.map((item, i) => (
                            <li key={item.id} className={`w-1/4 product-variant-swatch__item ${item.available ? 'available' : ''} ${i === 0 ? 'active' : ''}`} data-available={item.available ? 'available': ''}>
                                <span data-id={item.id} data-val={item.label} className={`before:m-[1px] block variant-swatch mx-auto ${ i === 0 ? 'border border-primary' : ''} ${item.value} ${item.available ? '' : 'oos'}`}></span>
                            </li>
                        ))}
                    </ul>
                </div>
                <AddToCartButton comparePrice={props.comparePrice} price={props.price} className="button-overlay z-[1] w-full mb-0"/>
            </div>
        </>
    );
};

const ProductCardTall = (props) => {
    const { abtestBtn } = props;
	return !props.useCardTemplate ? (
        <div className={`${props.className} ${!props.className ? 'w-3/4 md:w-1/4 pr-4 pl-4 text-center' : ''}`}>
            { props.product.badgeText && (<span className="badge bg-white absolute font-normal text-sm text-body">{props.product.badgeText}</span>) }
            <Link href="#" className="rounded-t-lg bg-pink-light">
                <picture className="block relative aspect-square bg-pink-light rounded-t-lg">
                    <source srcSet={props.product.srcSet} />
                    <img src={props.product.src} className="w-full rounded-t-lg" alt="Image Alt" loading="lazy" />
                    {props.showTip && (
                        <>
                            <span className="product-card__image-tip position-absolute text-white font-xs p-1 hidden lg:block">👻 Get 3 for 2 with code: HALLOWEEN 👻</span>
                            <span className="product-card__image-tip position-absolute text-white font-xs p-1 block lg:hidden rounded">👻 3 for 2</span>
                        </>
                    )}
                </picture>
            </Link>
            <div className="pt-1 pb-0 px-1 relative grow flex flex-col bg-pink-light rounded-b-lg">
                <div className="flex justify-center mb-1">
                    <YotpoStar productId={props.product.productId} showTotal={true} />
                </div>
                <p className="grow flex flex-col justify-center h-100 px-2 text-lg mb-1">
                    <Link href="#" className="text-body text-base lg:text-lg hover:text-primary-dark">{props.product.title}</Link>
                </p>
                {!props.product.swatch && (
                    <AddToCartButton comparePrice={props.product.comparePrice} price={props.product.price} />
                )}

                {props.product.swatch &&
                    <SwatchOverlay swatch={props.product.swatch} price={props.product.price} comparePrice={props.product.comparePrice}/>
                }
            </div>
        </div>
	) : (
		<div className={`${props.className} carousel-item ${props.activeIndex === props.product.index ? 'active ' : ''} ${props.itemMovingNext ? 'carousel-item-next carousel-item-start ' : ''} ${props.itemMovingPrev ? 'carousel-item-prev carousel-item-end ' : ''}`}>
			<img className="img-fluid" src={`//via.placeholder.com/600x400?text=${props.product.label}`} alt={`slide ${props.product.index}`}/>
		</div>
	);
};

export default ProductCardTall;
