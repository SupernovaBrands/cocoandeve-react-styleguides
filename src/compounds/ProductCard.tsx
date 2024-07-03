import Link from "next/link";
import YotpoStar from "~/components/YotpoStars";
import { Button } from "../components";
import { useRef, useState, useEffect } from "react";
import { formatMoney, getCookie } from "~/modules/utils";

const DEFAULT_LABEL = 'Add To Cart';

const Pricing = ({ props }) => {
    return (
        <>
            <span className={`border-x border-x-transparent product-card-btn__text lg:w-auto block ${props.carousel ? 'w-1/2 text-nowrap text-left py-[.8125em]' : 'w-full text-center lg:text-left'}`}>
                { !props.addingItem &&  (props.label ? props.label : DEFAULT_LABEL) }
                { props.addingItem && <span className="spinner-border spinner-border-sm text-white ml-1 !w-[15px] !h-[15px]" role="status" /> }
            </span>
            <span className={`border-x border-x-transparent product-card-btn__prices lg:w-auto block ${props.carousel ? 'w-1/2 text-right py-[.8125em]' : 'w-full text-center lg:text-right'}`}>
                {props.comparePrice && (<span className="line-through mr-25 font-normal">{props.comparePrice}</span>)}
                <span className="">{props.price}</span>
            </span>
        </>
    )
};

const WaitlistButton = (props:any) => {
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
        <Button onClick={handleWaitlist} buttonClass={`${props.className ?? ''} border border-[transparent] lg:border-0 flex lg:flex-row btn-sm md:text-base btn-primary rounded-full mb-1 sm:px-0 px-0 ${props.carousel ? 'items-center justify-between !py-0 !px-g mb-1 justify-between' : 'sm:flex-col sm:text-sm lg:justify-between lg:!px-g'} lg:py-[14px]`}>
            <Pricing props={data} />
        </Button>
    )
};

const LaunchButton = (props: any) => {
    const handleLaunchWaitlist = () => {
        props.setLaunchWLModal({
            open: true,
            handle: props.product.handle,
            variantId: props.selectedVariant?.id.replace('gid://shopify/ProductVariant/', ''),
        });
    };
    const data = {...props, ...{ label: 'Waitlist Me' }};
    return (
        <Button onClick={handleLaunchWaitlist} buttonClass={`${props.className ?? ''} border border-[transparent] lg:border-0 flex lg:flex-row btn-sm md:text-base btn-primary rounded-full mb-1 sm:px-0 px-0 ${props.carousel ? 'items-center justify-between !py-0 !px-g mb-1 justify-between' : 'sm:flex-col sm:text-sm lg:justify-between lg:!px-g'} lg:py-[14px]`}>
            <Pricing props={data} />
        </Button>
    )
}

const AddToCartButton = (props:any) => {
    const { className, addToCart, selectedVariant, preOrders } = props;
    const [addingItem, setAddingItem] = useState(false);
    const [ctaLabel, setCtaLabel] = useState(props.label);

    const onAddItem = async (e) => {
        if (typeof addToCart === 'function') {
            setAddingItem(true);
            await addToCart({
                id: selectedVariant.id,
                quantity: 1,
                handle: selectedVariant?.product?.handle,
                title: selectedVariant.title,
            });
            setAddingItem(false);
        }
    }

    useEffect(() => {
        if (preOrders && selectedVariant) {
            const { group1, group2, group3 } = preOrders;
            if (group1.enabled && selectedVariant && group1.variantIds.includes(selectedVariant.id.replace('gid://shopify/ProductVariant/', ''))) {
                setCtaLabel(group1.cta);
            } else if (group2.enabled && selectedVariant && group2.variantIds.includes(selectedVariant.id.replace('gid://shopify/ProductVariant/', ''))) {
                setCtaLabel(group2.cta);
            } else if (group3.enabled && selectedVariant && group3.variantIds.includes(selectedVariant.id.replace('gid://shopify/ProductVariant/', ''))) {
                setCtaLabel(group3.cta);
            } else {
                setCtaLabel(props.label);
            }
        }
    }, [selectedVariant, preOrders]);

    return (
        <Button onClick={onAddItem} buttonClass={`${props.className ?? ''} product-card-btn border border-[transparent] lg:border-0 flex lg:flex-row btn-sm md:text-base btn-primary rounded-full mb-1 sm:px-0 px-0 ${props.carousel ? 'items-center justify-between !py-0 !px-g mb-1' : 'sm:flex-col sm:text-sm lg:justify-between lg:!px-g'} lg:py-[14px]`}>
            <Pricing props={{...props, addingItem, selectedVariant, preOrders, ...{ label: ctaLabel } }}/>
        </Button>
    );
};

const SwatchOverlay = (props:any) => {
    const spanEl = useRef(null);
    const swatchLabel = useRef(null);
    const [swatchAvailable, setSwatchAvailable] = useState(true);
    const { product, addToCart, preOrders, generalSetting, label } = props;
    const [price, setPrice] = useState(props.price);
    const [comparePrice, setComparePrice] = useState(props.comparePrice);
    let labelText = '';

    let firstAvailable: any;
    const autoTicks = generalSetting?.auto_tick_variant.split(',').map((v) => parseInt(v, 10)) || [];
    if (autoTicks && autoTicks.length > 0) {
        firstAvailable = product?.variants?.nodes.find((obj) => (autoTicks.includes(parseInt(obj.id.replace('gid://shopify/ProductVariant/', ''))))) || null;
    }
    // if (product.handle === 'super-nourishing-coconut-fig-hair-masque') console.log('selectedVariant', firstAvailable);
    if (firstAvailable === null || !firstAvailable?.availableForSale) {
        firstAvailable = props.swatch.data.find((swatchData:any) => swatchData.available) || { id: 0 };
    }
    const [selectedVariant, setSelectedVariant] = useState(firstAvailable || null);

    if (label) {
        labelText = label;
    } else {
        labelText = props.swatch.label;
    }

    const changeSwatch = (e:any) => {
        const spanEls = e.target.closest('.product-variant-swatch').querySelectorAll('span');
        spanEls.forEach((span:any) => {
            span.classList.remove('border-primary');
            span.classList.add('border-white');
        });
        e.target.classList.remove('border-white');
        e.target.classList.add('border-primary');
        const targetText = e.target.getAttribute('data-val');
        swatchLabel.current.textContent = targetText;
        const available = e.target.getAttribute('data-avail');
        const id = e.target.getAttribute('data-id');
        const selectedSwatch = product?.variants?.nodes?.find((node:any) => node.id === id);
        if (selectedSwatch) {
            setSelectedVariant(selectedSwatch);
        }
        if (available === 'true') {
            setSwatchAvailable(true);
        } else {
            setSwatchAvailable(false);
        }
    };

    useEffect(() => {
        const region = getCookie('region');
        if (selectedVariant.compareAtPrice) {
            setComparePrice(formatMoney(parseFloat(selectedVariant.compareAtPrice.amount) * 100, false, region));
        } else {
            setComparePrice(null);
        }
        setPrice(formatMoney(parseFloat(selectedVariant.price.amount) * 100, false, region));
    }, [selectedVariant]);

    return (
        <>
            {props.quizResult && (() => {
                const resultVariant = props.product.variants.nodes.find((node) => node.sku === props.quizResultSku);
                const { selectedOptions } = resultVariant;
                const color = selectedOptions?.find((s) => s.name === 'Color');
                return resultVariant && (
                    <>
                        {color && (
                            <div className="my-1 flex justify-center items-center">
                                <div className={`block variant-swatch border-2 border-white ${color.value?.toLowerCase()} mr-1`} /> {color.value}
                            </div>
                        )}
                        {resultVariant.availableForSale && (
                            <AddToCartButton preOrders={preOrders} comparePrice={comparePrice} price={price} selectedVariant={selectedVariant} carousel={props.carousel} addToCart={addToCart} className="button-overlay z-[1] w-full mb-0"/>
                        )}
                        {!resultVariant.availableForSale && (
                            <WaitlistButton setWaitlistData={props.setWaitlistData} product={props.product} selectedVariant={selectedVariant} comparePrice={comparePrice} price={price} carousel={props.carousel} className="button-overlay z-[1] w-full mb-0" />
                        )}
                    </>
                )
            })()}

            {!props.quizResult && (
                <>
                    <AddToCartButton comparePrice={comparePrice} price={price} carousel={props.carousel} selectedVariant={selectedVariant} className="btn-choose mb-1" label={labelText} addToCart={false}/>
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
                                {props.swatch.data.length > 0 && props.swatch.data.map((item:any, i:any) => (
                                    <li key={`swatch-card-${item.id}`} className={`w-1/4 product-variant-swatch__item ${item.available ? 'available' : 'oos'} ${selectedVariant.id === item.id ? 'active' : ''}`} data-available={item.available ? 'available': ''}>
                                        <span onClick={changeSwatch} ref={spanEl} data-id={item.id} data-val={item.label} data-avail={item.availableForSale} className={`block variant-swatch mx-auto border-2 ${ selectedVariant.id === item.id ? 'border-primary' : 'border-white'} ${item.value.replace('&-', '').replace(':-limited-edition!', '')} ${item.available ? '' : 'oos'}`}></span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* <AddToCartButton comparePrice={props.comparePrice} price={props.price} carousel={props.carousel} className="button-overlay z-[1] w-full mb-0"/> */}
                        {swatchAvailable && (
                            <AddToCartButton label={label} preOrders={preOrders} comparePrice={comparePrice} price={price} selectedVariant={selectedVariant} carousel={props.carousel} addToCart={addToCart} className="button-overlay z-[1] w-full mb-0"/>
                        )}
                        {!swatchAvailable && (
                            <WaitlistButton setWaitlistData={props.setWaitlistData} product={props.product} selectedVariant={selectedVariant} comparePrice={comparePrice} price={price} carousel={props.carousel} className="button-overlay z-[1] w-full mb-0" />
                        )}
                    </div>
                </>
            )}
        </>
    );
};

const isKit = (title:string) => {
	const productTitle = title.toLowerCase();
	return productTitle.includes('tanning goddess') || productTitle.includes('kit') || productTitle.includes('set') || productTitle.includes('bundle') || productTitle.includes('duo')
}

const ProductCardTall = (props:any) => {
    const { abtestBtn, smSingleStar, addToCart, trackEvent, carousel, eventNameOnClick, preOrders, generalSetting, label } = props;
    const [skus, setSkus] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const { product } = props;

    const autoTicks = generalSetting?.auto_tick_variant.split(',').map((v) => parseInt(v, 10)) || [];

    // if (isLaunchWL) console.log('isLaunchWL', product.handle, isLaunchWL);
    const trackLink = () => {
        if (carousel) {
            trackEvent('carousel_product', {
                category: 'Clickout',
                target: product.handle,
            });
        }

        if (eventNameOnClick) {
            trackEvent(eventNameOnClick, {
                category: 'Clickout',
                target: product.handle,
            });
        }

        trackEvent('product_card_click', {
            category: 'Clickout',
            target: product.handle,
        });
    }

    useEffect(() => {
        if (product && product.productType !== 'HERO') {
            setSkus(product.variants.nodes.map((node:any) => node.sku));
        } else if (product && product.variants) {
            if (isKit(product.title)) {
                setSkus(product.variants.nodes.map((node:any) => node.sku));
            } else {
                const single = product.variants.nodes.filter((node:any) => {
                    return !isKit(node.title)
                })
                setSkus(single.map((node:any) => node.sku));
            }
        }
    }, [product, selectedVariant]);

    useEffect(() => {
        let defaultVariant = null;
        if (autoTicks && autoTicks.length > 0) {
            defaultVariant = product?.variants?.nodes.find((obj) => (autoTicks.includes(parseInt(obj.id.replace('gid://shopify/ProductVariant/', ''))))) || null;
        }
        if (defaultVariant === null) defaultVariant = product?.variants?.nodes.sort((x, y) => y.availableForSale - x.availableForSale)[0];
        setSelectedVariant(defaultVariant || null);
    }, []);

    // if (product.handle === 'double-cleanser-set') console.log('p', product);
    // if (product.handle === 'sunny-honey-bali-bronzing-self-tan-set') console.log('p2', product);

	return !props.useCardTemplate ? (
        <div key={props.keyName} className={`${props.className} ${!props.className ? 'w-3/4 md:w-1/4 pr-4 pl-4 text-center' : ''}`}>
            <a onClick={trackLink} href={props.product.handle ? `/products/${props.product.handle}` : '#'} className="rounded-t product-card--img block">
                <picture className="!pt-2 embed-responsive before:pt-[100%] block relative rounded-t">
                    {props.product.srcSet && <source srcSet={props.product.srcSet} media="(min-width: 992px)" />}
                    {props.product.src && <img src={props.product.src} className="bg-pink-light embed-responsive-item fit--cover !max-w-[108%] !w-[108%] !h-[108%] !top-[-4%] !left-[-4%] !right-auto rounded-t !pt-2" alt="Image Alt" loading="lazy" />}
                    {props.showTip && (
                        <>
                            <span className="absolute text-white font-xs p-1 hidden lg:block">👻 Get 3 for 2 with code: HALLOWEEN 👻</span>
                            <span className="absolute text-white font-xs p-1 block lg:hidden rounded">👻 3 for 2</span>
                        </>
                    )}
                    {props.product.imgHover && (
                        <picture className="!pt-2 embed-responsive-item fit--cover !max-w-[108%] !w-[108%] !h-[108%] !top-[-4%] !left-[-4%] rounded-t img--hover hidden lg:block">
                            {props.product.imgHover && <img src={props.product.imgHover} className="embed-responsive-item fit--cover !max-w-[108%] !w-[108%] !h-[108%] !top-[-4%] !left-[-4%] rounded-t" alt="Image Alt" loading="lazy" />}
                        </picture>
                    )}
                </picture>
            </a>

            { props.product.badgeText && (<span className="min-w-[3.375em] leading-[1.25] badge rounded py-[0.33333em] px-[0.83333em] bg-white absolute font-normal text-sm text-body top-[.41667em] left-[1.04167em] lg:top-[.83333em] lg:left-[2.08333em]">{props.product.badgeText}</span>) }
            <div className={`pt-2 pb-0 ${props.sustainability ? 'px-1' : 'px-25'} ${props.quizResult ? 'lg:px-2' : 'lg:px-1'} relative grow flex flex-col bg-pink-light rounded-b`}>
                <div className="review-stars__number flex justify-center mb-1">
                    <YotpoStar sustainability={props.sustainability} smSingleStar={smSingleStar} sku={skus.join(',')} productId={props.product.productId} productHandle={props.product.handle} showTotal={true} />
                </div>
                <p className={`product-title__text grow flex flex-col justify-center h-100 text-lg ${props.shopArticle ? 'lg:min-h-[3.125em] text-sm leading-[1.25]' : ''} ${props.quizResult ? 'mb-0' : 'mb-1'} ${props.carousel ? `${props.sustainability ? 'lg:min-h-[3.225em]' : 'min-h-[2.5em] lg:min-h-[3.125em]'} ${props.product.title.length > 40 ? 'lg:mx-0' : 'lg:mx-[0.625rem]'}` : 'px-0 lg:px-0'} ${props.quizResult ? '!min-h-0' : ''}`}>
                    <a onClick={trackLink} href={props.product.handle ? `/products/${props.product.handle}` : '#'} className="product-card__title text-body text-base lg:text-lg hover:text-body">{props.product.title}</a>
                </p>
                {!props.isLaunchWL && !props.product.swatch && selectedVariant?.availableForSale && (
                    <AddToCartButton quizResult={props.quizResult} quizResultSku={props.quizResultSku} preOrders={preOrders} comparePrice={props.product.comparePrice} price={props.product.price} carousel={props.carousel} selectedVariant={selectedVariant} product={props.product} addToCart={addToCart} label={label}/>
                )}

                {!props.isLaunchWL && props.product.swatch && props.product.availableForSale &&
                    <SwatchOverlay generalSetting={generalSetting} quizResult={props.quizResult} quizResultSku={props.quizResultSku} preOrders={preOrders} setWaitlistData={props.setWaitlistData} swatch={props.product.swatch} price={props.product.price} comparePrice={props.product.comparePrice} carousel={props.carousel} product={props.product} addToCart={addToCart} label={label}/>
                }
                {!props.isLaunchWL && !props.product.availableForSale && (
                    <WaitlistButton setWaitlistData={props.setWaitlistData} product={props.product} comparePrice={props.product.comparePrice} price={props.product.price} carousel={props.carousel} />
                )}

                {!props.isLaunchWL && !props.product.swatch && !selectedVariant?.availableForSale && props.product.availableForSale && (
                    <WaitlistButton setWaitlistData={props.setWaitlistData} product={props.product} comparePrice={props.product.comparePrice} price={props.product.price} carousel={props.carousel} />
                )}

                {props.isLaunchWL && (
                    <LaunchButton selectedVariant={selectedVariant} setLaunchWLModal={props.setLaunchWLModal} product={props.product} comparePrice={props.product.comparePrice} price={props.product.price} carousel={props.carousel} />
                )}
                {/* {props.quizResult && (
                    <QuizResultButton product={props.product} sku={props.quizResultSku} addToCart={addToCart} />
                )} */}
            </div>
        </div>
	) : (
		<div key={props.keyName} className={`${props.className} carousel-item ${props.activeIndex === props.product.index ? 'active ' : ''} ${props.itemMovingNext ? 'carousel-item-next carousel-item-start ' : ''} ${props.itemMovingPrev ? 'carousel-item-prev carousel-item-end ' : ''}`}>
			<img className="img-fluid" src={`//via.placeholder.com/600x400?text=${props.product.label}`} alt={`slide ${props.product.index}`}/>
		</div>
	);
};

export default ProductCardTall;
