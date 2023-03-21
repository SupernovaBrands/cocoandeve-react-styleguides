import Link from "next/link";
import New from '@/images/icons/new.svg';
import YotpoStar from "@/components/YotpoStars";
import BadgeCircleImage from "@/components/BadgeCircleImg";
import Badges from 'react-bootstrap/Badge';

const AddToCartButton = () => {
    return (
        <button type="button" className="btn btn-lg btn-primary add-to-cart btn-block px-0 mb-1 w-100">
            Add To Cart
        </button>
    );
};

const SwatchOverlay = (props) => {
    return (
        <>
            <button type="button" className="w-100 btn btn-lg btn-primary btn-choose btn-block mb-1">{props.swatch.label}</button>
            <div className="swatch-overlay flex-column align-items-center justify-content-end w-100 pb-0 px-2 position-absolute">
                <div className="text-center w-100 py-2">
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
                <AddToCartButton />
            </div>
        </>
    );
};

const ProductCard = (props) => {
	return !props.useCardTemplate ? (
        <div className={`${props.className} ${props.useCarousel ? 'carousel-item' : ''} col-9 col-md-3 product-card text-center ${props.useCarousel && props.activeIndex === props.product.index ? 'active ' : ''} ${props.itemMovingNext ? 'carousel-item-next carousel-item-start ' : ''} ${props.itemMovingPrev ? 'carousel-item-prev carousel-item-end ' : ''}`}>
            {props.icon &&
                <div className="circle-badge position-absolute rounded-circle bg-primary d-flex p-1">
                    <New className="fw-bold" />
                </div>
            }
            {props.product.badgeText && (
                <Badges bg="white" className="badge position-absolute fw-normal font-size-sm text-body">{props.product.badgeText}</Badges>
            )}
            <Link href="#">
                <picture>
                    <source srcSet={props.product.srcSet} />
                    <img src={props.product.src} className="w-100" alt="Image Alt" loading="lazy" />
                </picture>
                {props.product.badgeImg && (
                    <BadgeCircleImage className="">
                        <img alt="25% Off" className="w-100" src="../badge-25.svg" />
                    </BadgeCircleImage>
                )}
            </Link>
            <div className="product-card__content pt-2 pb-0 position-relative flex-grow-1 d-flex flex-column px-2">
                <div className="d-flex justify-content-center mb-1">
                    <YotpoStar productId={props.product.productId} showTotal={false} />
                </div>
                <p className="product-card__title flex-grow-1 d-flex flex-column justify-content-center h4 h-100 fw-normal">
                    <Link href="#" className="text-dark">{props.product.title}</Link>
                </p>
                <p className="text-center">
                    <span className="text-linethrough h4 m-1">{props.product.comparePrice}</span>
                    <span className="text-primary h4">{props.product.price}</span>
                </p>
                {!props.product.swatch && (
                    <AddToCartButton />
                )}
                {props.product.swatch &&
                    <SwatchOverlay swatch={props.product.swatch} />
                }
            </div>
        </div>
	) : (
		<div className={`${props.className} carousel-item ${props.activeIndex === props.product.index ? 'active ' : ''} ${props.itemMovingNext ? 'carousel-item-next carousel-item-start ' : ''} ${props.itemMovingPrev ? 'carousel-item-prev carousel-item-end ' : ''}`}>
			<img className="img-fluid" src={`//via.placeholder.com/600x400?text=${props.product.label}`} alt={`slide ${props.product.index}`}/>
		</div>
	);
};

export default ProductCard;
