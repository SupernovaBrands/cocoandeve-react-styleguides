import Link from "next/link";
import New from '~/images/icons/new.svg';
import YotpoStar from "~/components/YotpoStars";

const AddToCartButton = (props) => {
    return (
        <button type="button" class="btn btn-lg btn-primary add-to-cart btn-block px-0 align-items-center product-card-btn  mb-1">
            <span class="product-card-btn__text">Add to Cart</span>
            <span class="product-card-btn__prices d-none border-0">
                <span class="text-linethrough">{props.comparePrice}</span>
                <span class="">{props.price}</span>
            </span>
        </button>
    );
};

const SwatchOverlay = (props) => {
    return (
        <>
            <button type="button" class="btn btn-choose btn-lg btn-primary  btn-block px-0 product-card-btn mb-1 w-100">
                <span class="product-card-btn__text">Add to Cart</span>
                <span class="product-card-btn__prices d-none border-0">
                    <span class="text-linethrough">{props.comparePrice}</span>
                    <span class="">{props.price}</span>
                </span>
            </button>
            <div className="swatch-overlay flex-column align-items-center justify-content-end pb-0 position-absolute">
                <div className="text-center w-100 pt-2 pb-lg-2 px-0 py-1">
                    <label className="mb-2">
                        {props.swatch.style && <strong>Style: </strong>}
                        {props.swatch.shade && <strong>Shade: </strong>}
                        <span data-swatch-label>{props.swatch.data[0].label}</span>
                    </label>
                    <ul className="list-unstyled product-variant-swatch d-flex justify-content-center">
                        {props.swatch.data.length > 0 && props.swatch.data.map((item, i) => (
                            <li key={item.id} className={`col-3 product-variant-swatch__item ${item.available ? 'available' : ''} ${i === 0 ? 'active' : ''}`} data-available={item.available ? 'available': ''}>
                                <span data-id={item.id} data-val={item.label} className={`d-block variant-swatch mx-auto ${ i === 0 ? 'border-primary' : ''} ${item.value} ${item.available ? '' : 'oos'}`}></span>
                            </li>
                        ))}
                    </ul>
                </div>
                <button type="button" class="btn btn-lg btn-primary add-to-cart btn-block px-0 product-card-btn">
                    <span class="product-card-btn__text">Add to Cart</span>
                    <span class="product-card-btn__prices d-none">
                        <span class="text-linethrough">{props.comparePrice}</span>
                        <span class="">{props.price}</span>
                    </span>
                </button>
            </div>
        </>
    );
};

const ProductCardTall = (props) => {
    const { abtestBtn } = props;
	return !props.useCardTemplate ? (
        <div className={`${props.className} ${props.useCarousel ? 'carousel-item' : ''} ${!props.className ? 'col-9 col-md-3 product-card text-center' : ''} ${props.useCarousel && props.activeIndex === props.product.index ? 'active ' : ''} ${props.itemMovingNext ? 'carousel-item-next carousel-item-start ' : ''} ${props.itemMovingPrev ? 'carousel-item-prev carousel-item-end ' : ''}`}>
            <Link href="#" className="product-card__img-link rounded-top">
                <picture className="d-block position-relative">
                    <source srcSet={props.product.srcSet} />
                    <img src={props.product.src} className="w-100" alt="Image Alt" loading="lazy" />
                    {props.showTip && (
                        <>
                            <span class="product-card__image-tip position-absolute text-white font-size-xs p-1 d-none d-lg-block">👻 Get 3 for 2 with code: HALLOWEEN 👻</span>
                            <span class="product-card__image-tip position-absolute text-white font-size-xs p-1 d-block d-lg-none rounded">👻 3 for 2</span>
                        </>
                    )}
                </picture>
            </Link>
            {props.icon &&
                <div className="circle-badge position-absolute rounded-circle bg-primary d-flex p-1">
                    <New className="fw-bold" />
                </div>
            }
            <div className="product-card__content pt-2 pb-0 px-1 position-relative flex-grow-1 d-flex flex-column">
                <div className="d-flex justify-content-center mb-1">
                    <YotpoStar productId={props.product.productId} showTotal={false} />
                </div>
                <p className="product-card__title flex-grow-1 d-flex flex-column justify-content-center h4 h-100 fw-normal">
                    <Link href="#" className="text-dark">{props.product.title}</Link>
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
