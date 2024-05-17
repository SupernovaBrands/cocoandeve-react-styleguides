import Link from "next/link";
import YotpoStar from "~/components/YotpoStars";
import { Button } from "../components";
import { useRef, useState } from "react";

const Pricing = ({ props }) => (
    <>
        <span className={`lg:w-1/2 block ${props.carousel ? 'w-1/2 text-nowrap text-left py-[.8125em]' : 'w-full text-center lg:text-left'}`}>{props.label ? props.label : 'Add to Cart'}</span>
        <span className={`lg:w-1/2 block ${props.carousel ? 'w-1/2 text-right py-[.8125em]' : 'w-full text-center lg:text-right'}`}>
            {props.comparePrice && (<span className="line-through mr-25 font-normal">{props.comparePrice}</span>)}
            <span className="">{props.price}</span>
        </span>
    </>
);

const WaitlistButton = (props) => {
    const handleWaitlist = () => {
        props.setWaitlistData({
            open: true,
            title: props.product.title,
            image: props.product.srcSet,
            handle: props.product.handle,
        });
    };
    const data = {...props, ...{ label: 'Waitlist Me' }};
    return (
        <Button onClick={handleWaitlist} buttonClass={`${props.className ?? ''} 2 border-1 border-primary flex lg:flex-row btn-sm md:text-base btn-primary rounded-full mb-1 sm:px-0 px-0 ${props.carousel ? 'items-center justify-between !py-0 !px-g mb-1' : 'sm:flex-col sm:text-sm lg:justify-between lg:!px-g'}`}>
            <Pricing props={data} />
        </Button>
    )
};

const AddToCartButton = (props) => {
    const { className } = props;
    return (
        <Button buttonClass={`${props.className ?? ''} 1 border-1 border-primary flex lg:flex-row btn-sm md:text-base btn-primary rounded-full mb-1 sm:px-0 px-0 ${props.carousel ? 'items-center justify-between !py-0 !px-g mb-1' : 'sm:flex-col sm:text-sm lg:justify-between lg:!px-g'}`}>
            <Pricing props={props} />
        </Button>
    );
};

const SwatchOverlay = (props) => {
    const spanEl = useRef(null);
    const swatchLabel = useRef(null);
    const [swatchAvailable, setSwatchAvailable] = useState(true);
    const changeSwatch = (e) => {
        const spanEls = e.target.closest('.product-variant-swatch').querySelectorAll('span');
        spanEls.forEach((span) => {
            span.classList.remove('border-primary');
            span.classList.add('border-white');
        });
        e.target.classList.remove('border-white');
        e.target.classList.add('border-primary');
        const targetText = e.target.getAttribute('data-val');
        swatchLabel.current.textContent = targetText;

        const available = e.target.getAttribute('data-avail');
        if (available === 'true') {
            setSwatchAvailable(true);
        } else {
            setSwatchAvailable(false);
        }
    };
    const firstAvailable = props.swatch.data.find((swatchData) => swatchData.available) || { id: 0 };
    return (
        <>
            <AddToCartButton comparePrice={props.comparePrice} price={props.price} carousel={props.carousel} className="btn-choose mb-1" label={props.swatch.label}/>
            <div className="!w-auto px-0 swatch-overlay left-25 lg:left-1 right-25 lg:right-1 flex-col items-center justify-end pb-0 absolute bg-white lg:px-0 border border-primary rounded-t bottom-[35px]">
                <div className="text-center w-full pt-2 lg:pb-2 pb-1 lg:px-1">
                    <label className="block mb-2">
                        {props.swatch.style && <strong>Style: </strong>}
                        {props.swatch.shade && <strong>Shade: </strong>}
                        {props.swatch.tangleTamer && <strong>Type: </strong>}
                        {props.swatch.scent && <strong>Scent: </strong>}
                        <span ref={swatchLabel} data-swatch-label>{props.swatch.data[0].label}</span>
                    </label>
                    <ul className="list-unstyled product-variant-swatch flex justify-center">
                        {props.swatch.data.length > 0 && props.swatch.data.map((item:any, i) => (
                            <li key={`swatch-card-${item.id}`} className={`w-1/4 product-variant-swatch__item ${item.available ? 'available' : ''} ${firstAvailable.id === item.id ? 'active' : ''}`} data-available={item.available ? 'available': ''}>
                                <span onClick={changeSwatch} ref={spanEl} data-id={item.id} data-val={item.label} data-avail={item.availableForSale} className={`block variant-swatch mx-auto border-2 ${ firstAvailable.id === item.id ? 'border-primary' : 'border-white'} ${item.value.replace('&-', '')} ${item.available ? '' : 'oos'}`}></span>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* <AddToCartButton comparePrice={props.comparePrice} price={props.price} carousel={props.carousel} className="button-overlay z-[1] w-full mb-0"/> */}
                {swatchAvailable && (
                    <AddToCartButton comparePrice={props.comparePrice} price={props.price} carousel={props.carousel} className="button-overlay z-[1] w-full mb-0"/>
                )}
                {!swatchAvailable && (
                    <WaitlistButton setWaitlistData={props.setWaitlistData} product={props.product} comparePrice={props.product.comparePrice} price={props.product.price} carousel={props.carousel} className="button-overlay z-[1] w-full mb-0" />
                )}

            </div>
        </>
    );
};

const ProductCardTall = (props) => {
    const { abtestBtn, smSingleStar } = props;
	return !props.useCardTemplate ? (
        <div key={props.keyName} className={`${props.className} ${!props.className ? 'w-3/4 md:w-1/4 pr-4 pl-4 text-center' : ''}`}>
            <Link href={props.product.handle ? `/products/${props.product.handle}` : '#'} className="!pt-2 rounded-t bg-pink-light">
                <picture className="embed-responsive before:pt-[100%] block relative aspect-square bg-pink-light rounded-t">
                    {props.product.srcSet && <source srcSet={props.product.srcSet} media="(min-width: 992px)" />}
                    {props.product.src && <img src={props.product.src} className="embed-responsive-item fit--cover !max-w-[108%] !w-[108%] !h-[108%] !top-[-4%] !left-[-4%] rounded-t" alt="Image Alt" loading="lazy" />}
                    {props.showTip && (
                        <>
                            <span className="absolute text-white font-xs p-1 hidden lg:block">👻 Get 3 for 2 with code: HALLOWEEN 👻</span>
                            <span className="absolute text-white font-xs p-1 block lg:hidden rounded">👻 3 for 2</span>
                        </>
                    )}
                </picture>
            </Link>
            { props.product.badgeText && (<span className="min-w-[3.375em] leading-[1.25] badge rounded py-[0.33333em] px-[0.83333em] bg-white absolute font-normal text-sm text-body top-[.41667em] left-[1.04167em] lg:top-[.83333em] lg:left-[2.08333em]">{props.product.badgeText}</span>) }
            <div className="pt-2 pb-0 px-25 lg:px-1 relative grow flex flex-col bg-pink-light rounded-b">
                <div className="flex justify-center mb-1">
                    <YotpoStar smSingleStar={smSingleStar} sku={props.product?.variants?.nodes[0]?.sku} productId={props.product.productId} showTotal={true} />
                </div>
                <p className={`grow flex flex-col justify-center h-100 text-lg mb-1 ${props.carousel ? `${!props.sustainability ?? 'min-h-[2.5em]'} lg:mx-[0.625rem]` : 'px-0 lg:px-0'}`}>
                    <Link href={props.product.handle ? `/products/${props.product.handle}` : '#'} className="text-body text-base lg:text-lg hover:text-body">{props.product.title}</Link>
                </p>
                {!props.product.swatch && props.product.availableForSale && (
                    <AddToCartButton comparePrice={props.product.comparePrice} price={props.product.price} carousel={props.carousel} />
                )}

                {props.product.swatch && props.product.availableForSale &&
                    <SwatchOverlay setWaitlistData={props.setWaitlistData} swatch={props.product.swatch} price={props.product.price} comparePrice={props.product.comparePrice} carousel={props.carousel} product={props.product} />
                }
                {!props.product.availableForSale && (
                    <WaitlistButton setWaitlistData={props.setWaitlistData} product={props.product} comparePrice={props.product.comparePrice} price={props.product.price} carousel={props.carousel} />
                )}
            </div>
        </div>
	) : (
		<div key={props.keyName} className={`${props.className} carousel-item ${props.activeIndex === props.product.index ? 'active ' : ''} ${props.itemMovingNext ? 'carousel-item-next carousel-item-start ' : ''} ${props.itemMovingPrev ? 'carousel-item-prev carousel-item-end ' : ''}`}>
			<img className="img-fluid" src={`//via.placeholder.com/600x400?text=${props.product.label}`} alt={`slide ${props.product.index}`}/>
		</div>
	);
};

export default ProductCardTall;
