import Link from "next/link";
import YotpoStar from "~/components/YotpoStars";
import { Button } from "../components";
import { useRef, useState, useEffect } from "react";
import { formatMoney, getCookie } from "~/modules/utils";

const DEFAULT_LABEL = 'Add To Cart';

const Pricing = ({ props, collectionTemplate }) => {
    const label = props.btnLabel ? props.btnLabel : props.label;
    return (
        <>
            <span className={`${collectionTemplate ? 'border-x border-x-transparent' : ''} product-card-btn__text lg:w-auto block ${props.carousel ? 'w-1/2 text-nowrap text-left py-[.8125em]' : props.sideUpsell ? 'w-full lg:w-full text-center text-sm' : 'w-full text-center lg:text-left'} `}>
                { !props.addingItem &&  (label ? label : DEFAULT_LABEL) }
                { props.addingItem && <span className="spinner-border spinner-border-sm text-white ml-1 !w-[15px] !h-[15px]" role="status" /> }
            </span>
            <span className={`${collectionTemplate ? 'border-x border-x-transparent' : ''} product-card-btn__prices lg:w-auto block ${props.carousel ? 'w-1/2 text-right py-[.8125em]' : props.sideUpsell ? 'w-full lg:w-full text-center text-sm' : 'w-full text-center lg:text-right'}`}>
                {props.comparePrice && (<span className="line-through mr-25 font-normal">{props.comparePrice}</span>)}
                <span className="">{props.price}</span>
            </span>
        </>
    )
};

const WaitlistButton = (props:any) => {
    const handleWaitlist = () => {
        // console.log('set waitlist data', props);
        props.setWaitlistData({
            open: true,
            title: props.product.title,
            image: props.product.src,
            handle: props.product.handle,
            date: props.selectedVariant?.waitlistPopupDate?.value || '',
            productId: props.selectedVariant?.id?.replace('gid://shopify/ProductVariant/', ''),
        });
    };
    const data = {...props, ...{ label: 'Waitlist Me' }};
    return (
        <Button onClick={handleWaitlist} buttonClass={`${props.className ?? ''} border border-[transparent] ${props.sustainability ? '' : 'lg:border-0'} flex lg:flex-row btn-sm md:text-base btn-primary rounded-full mb-1 sm:px-0 px-0 ${props.carousel ? 'items-center justify-between !py-0 !px-g mb-1 justify-between' : 'sm:flex-col sm:text-sm lg:justify-between lg:!px-g'} lg:py-[14px]`}>
            <Pricing collectionTemplate={props.collectionTemplate} props={data} />
        </Button>
    )
};

const LaunchButton = (props: any) => {
    const handleLaunchWaitlist = () => {
        const data = {
            open: true,
            handle: props.product.handle,
            variantId: props.selectedVariant?.id.replace('gid://shopify/ProductVariant/', ''),
            tags: props.product.tags,
            productId: props.selectedVariant?.id.replace('gid://shopify/ProductVariant/', ''), // props.product?.id?.replace('gid://shopify/Product/', ''),
        }
        if (props.launchBox === 1) {
            props.setLaunchWLModal(data);
        } else if (props.launchBox === 2) {
            props.setLaunchWLModal2(data);
        } else if (props.launchBox === 3) {
            props.setLaunchWLModal3(data);
        }
    };
    const data = {...props, ...{ label: 'Waitlist Me' }};
    return (
        <Button onClick={handleLaunchWaitlist} buttonClass={`${props.className ?? ''} border border-[transparent] ${props.sustainability ? '' : 'lg:border-0'} flex lg:flex-row btn-sm md:text-base btn-primary rounded-full mb-1 sm:px-0 px-0 ${props.carousel ? 'items-center justify-between !py-0 !px-g mb-1 justify-between' : 'sm:flex-col sm:text-sm lg:justify-between lg:!px-g'} lg:py-[14px]`}>
            <Pricing collectionTemplate={props.collectionTemplate} props={data} />
        </Button>
    )
}

const AddToCartButton = (props:any) => {
    const { className, addToCart, selectedVariant, preOrders, sideUpsell, trackEvent } = props;
    const [addingItem, setAddingItem] = useState(false);
    const [ctaLabel, setCtaLabel] = useState(props.label);
    const btnLabel = props.label;

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
            if (sideUpsell && typeof trackEvent === 'function') {
                trackEvent('pdp_upsell', {
                    category: 'Add to Cart',
                    target: 'add_to_cart_pdp_upsell',
                    product: selectedVariant?.product?.handle,
                });
            }
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
        <Button onClick={onAddItem} buttonClass={`${props.className ?? ''} product-card-btn border border-[transparent] ${props.sustainability ? '' : 'lg:border-0'} flex lg:flex-row btn-sm md:text-base btn-primary rounded-full mb-1 sm:px-0 px-0 ${props.carousel ? 'items-center justify-between !py-0 !px-g mb-1' : props.sideUpsell ? 'flex flex-col sm:text-sm lg:flex-col lg:justify-center lg:py-[5px]' : 'sm:flex-col sm:text-sm lg:justify-between lg:!px-g'} lg:py-[14px]`}>
            <Pricing collectionTemplate={props.collectionTemplate} props={{...props, btnLabel, addingItem, selectedVariant, preOrders, ...{ label: ctaLabel } }} />
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
    const labelText = label === 'Add' ? label : props.swatch.label;
    let firstAvailable: any;
    const autoTicks = generalSetting?.auto_tick_variant?.split(',').map((v) => parseInt(v, 10)) || [];
    if (autoTicks && autoTicks.length > 0) {
        firstAvailable = product?.variants?.nodes.find((obj) => (autoTicks.includes(parseInt(obj.id.replace('gid://shopify/ProductVariant/', ''))))) || null;
    }
    if (firstAvailable === null || !firstAvailable?.availableForSale) {
        firstAvailable = props.swatch.data.find((swatchData:any) => swatchData.available) || { id: 0 };
    }
    const [selectedVariant, setSelectedVariant] = useState(firstAvailable || null);

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

    const swatchSelected = props.swatch.data.find((sData) => sData.id === selectedVariant.id) || props.swatch.data[0];

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
                            <AddToCartButton sustainability={props.sustainability} collectionTemplate={props.collectionTemplate} preOrders={preOrders} comparePrice={comparePrice} price={price} selectedVariant={selectedVariant} carousel={props.carousel} addToCart={addToCart} className="button-overlay z-[1] w-full mb-0"/>
                        )}
                        {!resultVariant.availableForSale && (
                            <WaitlistButton sustainability={props.sustainability} collectionTemplate={props.collectionTemplate} setWaitlistData={props.setWaitlistData} product={props.product} selectedVariant={selectedVariant} comparePrice={comparePrice} price={price} carousel={props.carousel} className="button-overlay z-[1] w-full mb-0" />
                        )}
                    </>
                )
            })()}

            {!props.quizResult && (
                <>
                    <AddToCartButton sustainability={props.sustainability} collectionTemplate={props.collectionTemplate} comparePrice={comparePrice} price={price} carousel={props.carousel} selectedVariant={selectedVariant} className="btn-choose mb-1" label={labelText} addToCart={false} sideUpsell={props.sideUpsell} trackEvent={props?.trackEvent} />
                    <div className={`!w-auto px-0 swatch-overlay ${props.sideUpsell ? 'left-[5px] lg:left-[5px] right-[5px] lg:right-[5px] bottom-[35px]' : 'left-25 lg:left-1 right-25 lg:right-1 bottom-[35px]'} flex-col items-center justify-end pb-0 absolute bg-white lg:px-0 border border-primary rounded-t`}>
                        <div className={`text-center w-full pt-2 lg:pb-2 pb-1 ${props.sideUpsell ? 'lg:px-0' : 'lg:px-1'}`}>
                            <label className="block mb-[.625em]">
                                {props.swatch.style && <strong>Style: </strong>}
                                {props.swatch.shade && <strong>Shade: </strong>}
                                {props.swatch.tangleTamer && <strong>Type: </strong>}
                                {props.swatch.scent && <strong>Scent: </strong>}
                                {props.swatch.variant && <strong>Variant: </strong>}
                                <span ref={swatchLabel} data-swatch-label>{swatchSelected.label}</span>
                            </label>
                            <ul className="list-unstyled product-variant-swatch flex justify-center">
                                {props.swatch.data.length > 0 && props.swatch.data.map((item:any, i:any) => (
                                    <li key={`swatch-card-${item.id}`} className={`${props.sideUpsell ? 'w-[42px]' : 'w-1/4'} product-variant-swatch__item ${item.available ? 'available' : 'oos'} ${selectedVariant.id === item.id ? 'active' : ''}`} data-available={item.available ? 'available': ''}>
                                        <span onClick={changeSwatch} ref={spanEl} data-id={item.id} data-val={item.label} data-avail={item.availableForSale} className={`block variant-swatch mx-auto border-2 ${ selectedVariant.id === item.id ? 'border-primary' : 'border-white'} ${item.value.replace('&-', '').replace(':-limited-edition!', '')} ${item.available ? '' : 'oos'}`}></span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* <AddToCartButton comparePrice={props.comparePrice} price={props.price} carousel={props.carousel} className="button-overlay z-[1] w-full mb-0"/> */}
                        {swatchAvailable && (
                            <AddToCartButton sustainability={props.sustainability} collectionTemplate={props.collectionTemplate} label={label} preOrders={preOrders} comparePrice={comparePrice} price={price} selectedVariant={selectedVariant} carousel={props.carousel} addToCart={addToCart} className="button-overlay z-[1] w-full mb-0" sideUpsell={props.sideUpsell} trackEvent={props?.trackEvent || null} />
                        )}
                        {!swatchAvailable && (
                            <WaitlistButton sustainability={props.sustainability} collectionTemplate={props.collectionTemplate} setWaitlistData={props.setWaitlistData} product={props.product} selectedVariant={selectedVariant} comparePrice={comparePrice} price={price} carousel={props.carousel} className="button-overlay z-[1] w-full mb-0" sideUpsell={props.sideUpsell} />
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
    const { abtestBtn, smSingleStar, addToCart, trackEvent, carousel, eventNameOnClick, preOrders, generalSetting, label, store, smSingleStarAllDevice, sideUpsell } = props;
    const [skus, setSkus] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const { product } = props;
    const autoTicks = generalSetting?.auto_tick_variant?.split(',').map((v) => parseInt(v, 10)) || [];
    const trackLink = () => {
        if (typeof trackEvent === 'function') {
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
    }

    useEffect(() => {
        if (product && product.productType !== 'HERO') {
            const skus_ = isKit(product.title)
                ? product.variants.nodes.map((node:any) => node.sku)
                : product.variants.nodes.filter((node: any) => !node.title.toLowerCase().includes('bundle') && !node.title.toLowerCase().includes('kit') && !node.title.toLowerCase().includes('set')).map((node:any) => node.sku);
            setSkus(skus_);
        } else if (product && product.variants) {
            if (isKit(product.title)) {
                setSkus(product.variants.nodes.map((node:any) => node.sku));
            } else {
                const single = product.variants.nodes.filter((node:any) => {
                    return !node.title.toLowerCase().includes('bundle') && !node.title.toLowerCase().includes('kit') && !node.title.toLowerCase().includes('set')
                })
                setSkus(single.map((node:any) => node.sku));
            }
        }
    }, [product, selectedVariant]);

    useEffect(() => {
        // console.log('product-card');
        let defaultVariant = null;
        if (autoTicks && autoTicks.length > 0) {
            defaultVariant = product?.variants?.nodes.find((obj) => (autoTicks.includes(parseInt(obj.id.replace('gid://shopify/ProductVariant/', ''))))) || null;
        }
        const variantNodes = product?.variants?.nodes;
        if (defaultVariant === null && !product.swatch) defaultVariant = variantNodes.sort((x, y) => y.availableForSale - x.availableForSale)[0];
        setSelectedVariant(defaultVariant || null);
    }, []);

    //Hardcode Product Card Images
    let productSrcSet = props.product.srcSet;
    let productSrc = props.product.src;
    let productImgHover = props.product.imgHover;

    if ((store === 'my' || store === 'uk' || store === 'int' || store === 'au' || store === 'eu' || store === 'us') && props.product.handle === 'daily-essentials-bundle') {
        let img = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/503a39e9-27b7-4278-c850-1d015cb06000/public';
        let imgHover = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/2e6b3d13-538a-4983-7560-c1f42e4c6400/public';
		productSrcSet = img.includes('imagedelivery.net') ? img.replace('public', '540x') : img.replace('.jpg', '_540x.jpg').replace('.png', '_540x.png');
		productSrc = img.includes('imagedelivery.net') ? img.replace('public', '592x') : img.replace('.jpg', '_384x.jpg').replace('.png', '_384x.png');
        productImgHover = imgHover.includes('imagedelivery.net') ? imgHover.replace('public', '540x') : imgHover.replace('.jpg', '_540x.jpg').replace('.png', '_540x.png');
	}
	if ((store === 'my' || store === 'uk' || store === 'int' || store === 'au' || store === 'eu' || store === 'us') && props.product.handle === 'super-hydration-kit') {
		let img = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/764f5eec-ddf2-4ead-e1c6-88a0ab395200/public';
		let imgHover = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/f825e183-9dac-4f2b-ee1a-bf0711f67400/public';
        productSrcSet = img.includes('imagedelivery.net') ? img.replace('public', '540x') : img.replace('.jpg', '_540x.jpg').replace('.png', '_540x.png');
		productSrc = img.includes('imagedelivery.net') ? img.replace('public', '592x') : img.replace('.jpg', '_384x.jpg').replace('.png', '_384x.png');
        productImgHover = imgHover.includes('imagedelivery.net') ? imgHover.replace('public', '540x') : imgHover.replace('.jpg', '_540x.jpg').replace('.png', '_540x.png');
	}
	if ((store === 'my' || store === 'uk' || store === 'int' || store === 'au' || store === 'eu' || store === 'us') && props.product.handle === 'deep-condition-bundle') {
		let img = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/10045f09-b506-4fc1-c28a-b1ced8673800/public';
		let imgHover = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/6175c52d-3cd8-49e1-0c70-46254c2caa00/public';
        productSrcSet = img.includes('imagedelivery.net') ? img.replace('public', '540x') : img.replace('.jpg', '_540x.jpg').replace('.png', '_540x.png');
		productSrc = img.includes('imagedelivery.net') ? img.replace('public', '592x') : img.replace('.jpg', '_384x.jpg').replace('.png', '_384x.png');
        productImgHover = imgHover.includes('imagedelivery.net') ? imgHover.replace('public', '540x') : imgHover.replace('.jpg', '_540x.jpg').replace('.png', '_540x.png');
	}
    if ((store === 'my') && props.product.handle === 'sweet-repair-scalp-massager') {
		let imgHover = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/9e2adedd-3cc1-4e3d-8bd0-43d5b6ba0d00/public';
        productImgHover = imgHover.includes('imagedelivery.net') ? imgHover.replace('public', '540x') : imgHover.replace('.jpg', '_540x.jpg').replace('.png', '_540x.png');
	}

	return !props.useCardTemplate ? (
        <div key={props.keyName} className={`${props.className} ${!props.className ? 'w-3/4 md:w-1/4 pr-4 pl-4 text-center' : ''}`}>
            <a onClick={trackLink} href={props.product.handle ? `/products/${props.product.handle}` : '#'} className="rounded-t product-card--img block">
                <picture className={`!pt-2 embed-responsive before:pt-[100%] block relative rounded-t ${!productSrc ? 'bg-shimmer' : ''} bg-pink-light`}>
                    {productSrcSet && <source srcSet={productSrcSet} media="(min-width: 992px)" />}
                    {productSrc && <img src={productSrc} className="bg-pink-light embed-responsive-item fit--cover !max-w-[108%] !w-[108%] !h-[108%] !top-[-4%] !left-[-4%] !right-auto rounded-t !pt-2" alt="Image Alt" loading="lazy" />}

                    {props.showTip && (
                        <>
                            <span className="absolute text-white font-xs p-1 hidden lg:block">👻 Get 3 for 2 with code: HALLOWEEN 👻</span>
                            <span className="absolute text-white font-xs p-1 block lg:hidden rounded">👻 3 for 2</span>
                        </>
                    )}
                    {productImgHover && (
                        <picture className="!pt-2 embed-responsive-item fit--cover rounded-t img--hover hidden lg:block">
                            {productImgHover && <img src={productImgHover} className="embed-responsive-item fit--cover !max-w-[108%] !w-[108%] !h-[108%] !top-[-4%] !left-[-4%] rounded-t" alt="Image Alt" loading="lazy" />}
                        </picture>
                    )}
                </picture>
            </a>

            { props.product.badgeText && (<span className={`min-w-[3.375em] leading-[1.25] badge rounded py-[0.33333em] px-[0.83333em] bg-white absolute font-normal text-sm text-body top-[.41667em] left-[1.04167em] lg:top-[.83333em] lg:left-[2.08333em] ${props.sideUpsell ? 'lg:top-[8px]' : ''}`}>{props.product.badgeText}</span>) }
            <div className={`pt-2 pb-0 ${props.sustainability ? 'px-1' : ''} ${props.carousel && !props.shopArticle ? 'px-1' : 'px-25'} ${props.quizResult ? 'lg:px-2' : props.sideUpsell ? 'lg:px-[5px]' : 'lg:px-1'} relative grow flex flex-col bg-pink-light rounded-b`}>
                <div className="review-stars__number flex justify-center mb-1">
                    {skus.length > 0 && (<YotpoStar sustainability={props.sustainability} smSingleStar={smSingleStar} smSingleStarAllDevice={smSingleStarAllDevice} sku={skus.join(',')} productId={props.product.productId} productHandle={props.product.handle} showTotal={true} />)}
                </div>
                <p className={`product-title__text grow flex flex-col justify-center h-100 ${props.shopArticle ? 'lg:min-h-[3.125em] lg:text-sm sm:text-lg leading-[1.25] lg:mb-[1rem!important] sm:mb-[10px!important]' : 'text-lg'} ${props.quizResult ? 'mb-0' : 'mb-1'} ${props.carousel ? `${props.sustainability ? 'lg:min-h-[62.5px]' : ''} ${props.product.title.length > 40 ? 'lg:mx-0' : 'lg:mx-[0.625rem]'}` : 'px-0 lg:px-0'} ${props.quizResult ? '!min-h-0' : ''} ${props.homePage ? 'lg:min-h-[3.125em]' : ''}`}>
                    <a onClick={trackLink} href={props.product.handle ? `/products/${props.product.handle}` : '#'} className={`${props.shopArticle ? 'hover:text-body lg:text-sm sm:text-lg hover:[text-decoration-line:underline!important] [text-decoration-line:none!important]' : props.sideUpsell ? 'lg:text-[16px] text-[16px]' : 'lg:text-lg text-base'} product-card__title text-body hover:text-body"`}>{props.product.title}</a>
                </p>
                {!props.isLaunchWL && !props.product.swatch && selectedVariant?.availableForSale && (
                    <AddToCartButton sustainability={props.sustainability} collectionTemplate={props.collectionTemplate} quizResult={props.quizResult} quizResultSku={props.quizResultSku} preOrders={preOrders} comparePrice={props.product.comparePrice} price={props.product.price} carousel={props.carousel} selectedVariant={selectedVariant} product={props.product} addToCart={addToCart} label={label} sideUpsell={props.sideUpsell} trackEvent={trackEvent || null}/>
                )}

                {!props.isLaunchWL && props.product.swatch && props.product.availableForSale &&
                    <SwatchOverlay sustainability={props.sustainability} collectionTemplate={props.collectionTemplate} generalSetting={generalSetting} quizResult={props.quizResult} quizResultSku={props.quizResultSku} preOrders={preOrders} setWaitlistData={props.setWaitlistData} swatch={props.product.swatch} price={props.product.price} comparePrice={props.product.comparePrice} carousel={props.carousel} product={props.product} addToCart={addToCart} label={label} sideUpsell={props.sideUpsell} trackEvent={trackEvent || null}/>
                }
                {!props.isLaunchWL && !props.product.availableForSale && (
                    <WaitlistButton selectedVariant={selectedVariant} sustainability={props.sustainability} collectionTemplate={props.collectionTemplate} setWaitlistData={props.setWaitlistData} product={props.product} comparePrice={props.product.comparePrice} price={props.product.price} carousel={props.carousel} sideUpsell={props.sideUpsell} />
                )}

                {!props.isLaunchWL && !props.product.swatch && !selectedVariant?.availableForSale && props.product.availableForSale && (
                    <WaitlistButton selectedVariant={selectedVariant} sustainability={props.sustainability} collectionTemplate={props.collectionTemplate} setWaitlistData={props.setWaitlistData} product={props.product} comparePrice={props.product.comparePrice} price={props.product.price} carousel={props.carousel} sideUpsell={props.sideUpsell} />
                )}

                {props.isLaunchWL && (
                    <LaunchButton launchBox={props.launchBox} sustainability={props.sustainability} collectionTemplate={props.collectionTemplate} selectedVariant={selectedVariant} setLaunchWLModal={props.setLaunchWLModal} setLaunchWLModal2={props.setLaunchWLModal2} setLaunchWLModal3={props.setLaunchWLModal3} product={props.product} comparePrice={props.product.comparePrice} price={props.product.price} carousel={props.carousel} sideUpsell={props.sideUpsell} />
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
