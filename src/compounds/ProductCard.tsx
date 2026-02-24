import YotpoStar from "~/components/YotpoStars";
import { Button } from "../components";
import { useRef, useState, useEffect, useMemo, memo, useCallback } from "react";
import { formatMoney } from "~/modules/utils";
import parse from 'html-react-parser';
import Eye from '~/images/icons/eye.svg';

interface PricingProps {
    buttonData: {
        btnLabel?: string;
        label?: string;
        sideUpsell?: boolean;
        addingItem?: boolean;
        comparePrice?: string;
        price?: string;
        carousel?: boolean;
        collectionTemplate?: boolean;
    };
    collectionTemplate?: boolean;
    hideCent: boolean;
    selectedVariant?: any;
    store?: string;
}

const DEFAULT_LABEL = 'Add To Cart';
const DEFAULT_LABEL_SIDE_UPSELL = 'Add';

const PARSED_DEFAULT_LABEL = parse(DEFAULT_LABEL);
const PARSED_DEFAULT_LABEL_SIDE_UPSELL = parse(DEFAULT_LABEL_SIDE_UPSELL);

const ConditionalWrap = ({condition, wrap, children, elseWrap}) => condition ? wrap(children) : elseWrap(children);

const Pricing = memo(({ buttonData, collectionTemplate, hideCent, selectedVariant, store }: PricingProps) => {
    let label = buttonData.btnLabel ? buttonData.btnLabel : buttonData.label;
    let textColor = 'text-white';
    label = buttonData.sideUpsell ? DEFAULT_LABEL_SIDE_UPSELL : label;

    const parsedLabel = useMemo(() => {
        if (!label || label === DEFAULT_LABEL) return PARSED_DEFAULT_LABEL;
        if (label === DEFAULT_LABEL_SIDE_UPSELL) return PARSED_DEFAULT_LABEL_SIDE_UPSELL;
        return parse(label);
    }, [label]);

    // const displayPrice = hideCent && selectedVariant?.price
    //     ? formatMoney(Math.trunc(parseFloat(selectedVariant.price.amount)) * 100, false, store)
    //     : buttonData.price;

    // const displayComparePrice = buttonData.comparePrice
    //     ? (hideCent && selectedVariant?.compareAtPrice
    //         ? formatMoney(Math.trunc(parseFloat(selectedVariant.compareAtPrice.amount)) * 100, false, store)
    //         : buttonData.comparePrice)
    //     : null;

    return (
        <>
            <span className={`${collectionTemplate ? 'border-x border-x-transparent' : ''} product-card-btn__text lg:w-full flex justify-center ${buttonData.carousel || buttonData.collectionTemplate ? 'w-full text-nowrap text-center py-[.8125em]' : buttonData.sideUpsell ? 'w-full lg:w-full text-center text-sm' : 'w-full text-center lg:text-left'}`}>
                {!buttonData.addingItem && parsedLabel}
                {buttonData.addingItem && <span className={`${textColor} spinner-border spinner-border-sm ml-1 !w-[15px] !h-[15px]`} role="status" />}
            </span>
            {/* <span className={`${collectionTemplate ? 'border-x border-x-transparent' : ''} product-card-btn__prices lg:w-auto flex ${buttonData.carousel || buttonData.collectionTemplate ? 'w-auto text-right py-[.8125em]' : buttonData.sideUpsell ? 'w-full lg:w-full text-center text-sm' : 'w-full text-center lg:text-right'}`}>
                {displayComparePrice && (
                    <span className="line-through mr-25 font-normal">{displayComparePrice}</span>
                )}
                <span>{displayPrice}</span>
            </span> */}
        </>
    );
});

// const Pricing = ({ props, collectionTemplate, hideCent, selectedVariant, store }) => {
//     let label = props.btnLabel ? props.btnLabel : props.label;
//     // label = collectionTemplate ? label : label?.replace('Add', 'Add to Cart').replace('Waitlist', 'Waitlist Me');

//     let textColor = 'text-white';
//     label = props.sideUpsell ? DEFAULT_LABEL_SIDE_UPSELL : label;

//     const parsedLabel = useMemo(() => parse(label || DEFAULT_LABEL), [label]);

//     return (
//         <>
//             <span className={`${collectionTemplate ? 'border-x border-x-transparent' : ''} product-card-btn__text lg:w-auto flex ${props.carousel || props.collectionTemplate ? 'w-auto text-nowrap text-left py-[.8125em]' : props.sideUpsell ? 'w-full lg:w-full text-center text-sm' : 'w-full text-center lg:text-left'} `}>
//                 { !props.addingItem && parsedLabel }
//                 { props.addingItem && <span className={`${textColor} spinner-border spinner-border-sm ml-1 !w-[15px] !h-[15px]`} role="status" /> }
//             </span>
//             <span className={`${collectionTemplate ? 'border-x border-x-transparent' : ''} product-card-btn__prices lg:w-auto flex ${props.carousel || props.collectionTemplate ? 'w-auto text-right py-[.8125em]' : props.sideUpsell ? 'w-full lg:w-full text-center text-sm' : 'w-full text-center lg:text-right'}`}>
//                 {props.comparePrice && (<span className="line-through mr-25 font-normal">
//                     {hideCent && selectedVariant && selectedVariant.compareAtPrice ? formatMoney(Math.trunc(parseFloat(selectedVariant.compareAtPrice.amount)) * 100, false, store) : props.comparePrice}
//                 </span>)}
//                 <span className="">{
//                     hideCent && selectedVariant && selectedVariant.price ? formatMoney(Math.trunc(parseFloat(selectedVariant.price.amount)) * 100, false, store) : props.price}
//                 </span>
//             </span>
//         </>
//     )
// };

const WaitlistButton = memo((props: any) => {
    const handleWaitlist = useCallback(() => {
        props.setWaitlistData({
            open: true,
            title: props.product.title,
            image: props.product.src,
            handle: props.product.handle,
            date: props.selectedVariant?.waitlistPopupDate?.value || '',
            productId: props.selectedVariant?.id?.replace('gid://shopify/ProductVariant/', ''),
        });
    }, [props.product, props.selectedVariant]);

    const defaultText = 'Waitlist Me';
    const WAITLIST_LABEL = `<span class="lg:hidden">Waitlist</span><span class="hidden lg:inline">${defaultText}</span>`;

    const buttonData = useMemo(() => ({
        label: WAITLIST_LABEL,
        comparePrice: props.comparePrice,
        price: props.price,
        carousel: props.carousel,
        collectionTemplate: props.collectionTemplate,
        sideUpsell: props.sideUpsell,
    }), [props.comparePrice, props.price, props.carousel, props.collectionTemplate, props.sideUpsell]);

    return (
        <Button onClick={handleWaitlist} buttonClass={`${props.className ?? ''} border border-[transparent] ${props.sustainability ? '' : 'lg:border-0'} flex flex-row btn-sm md:text-base ${props.bgClass ? props.bgClass : 'btn-primary'} ${props.textClass ? props.textClass : ''} rounded-0 mb-1 sm:px-0 px-0 ${props.carousel || props.collectionTemplate ? 'items-center justify-center !py-0 !px-g mb-1 justify-between' : 'sm:flex-col sm:text-sm lg:justify-between lg:!px-g'} font-normal`}>
            <Pricing store={props.store} selectedVariant={props.selectedVariant} collectionTemplate={props.collectionTemplate} buttonData={buttonData} hideCent={true} />
        </Button>
    );
});

const LaunchButton = memo((props: any) => {
    const handleLaunchWaitlist = useCallback(() => {
        const data = {
            open: true,
            handle: props.product.handle,
            variantId: props.selectedVariant?.id.replace('gid://shopify/ProductVariant/', ''),
            tags: props.product.tags,
            productId: props.selectedVariant?.id.replace('gid://shopify/ProductVariant/', ''),
        };
        if (props.launchBox === 1) props.setLaunchWLModal(data);
        else if (props.launchBox === 2) props.setLaunchWLModal2(data);
        else if (props.launchBox === 3) props.setLaunchWLModal3(data);
    }, [props.product, props.selectedVariant, props.launchBox]);

    const defaultText = 'Waitlist Me';
    const LAUNCH_LABEL = `<span class="lg:hidden">Waitlist</span><span class="hidden lg:inline">${defaultText}</span>`;
    const buttonData = useMemo(() => ({
        label: LAUNCH_LABEL,
        comparePrice: props.comparePrice,
        price: props.price,
        carousel: props.carousel,
        collectionTemplate: props.collectionTemplate,
        sideUpsell: props.sideUpsell,
    }), [props.comparePrice, props.price, props.carousel, props.collectionTemplate, props.sideUpsell]);

    return (
        <Button onClick={handleLaunchWaitlist} buttonClass={`${props.className ?? ''} border border-[transparent] ${props.sustainability ? '' : 'lg:border-0'} flex flex-row btn-sm md:text-base ${props.bgClass ? props.bgClass : 'btn-primary'} ${props.textClass ? props.textClass : ''} rounded-0 mb-1 sm:px-0 px-0 ${props.carousel || props.collectionTemplate ? 'items-center justify-between !py-0 !px-g mb-1 justify-between' : 'sm:flex-col sm:text-sm lg:justify-between lg:!px-g'} font-normal`}>
            <Pricing store={props.store} selectedVariant={props.selectedVariant} collectionTemplate={props.collectionTemplate} buttonData={buttonData} hideCent={true} />
        </Button>
    );
});

const AddToCartButton = memo((props: any) => {
    const { className, addToCart, selectedVariant, preOrders, sideUpsell, trackEvent, bgClass, textClass } = props;
    const [addingItem, setAddingItem] = useState(false);

    const ctaLabel = useMemo(() => {
        if (preOrders && selectedVariant?.id) {
            const variantId = selectedVariant.id.replace('gid://shopify/ProductVariant/', '');
            const { group1, group2, group3 } = preOrders;

            if (group1.enabled && group1.variantIds.includes(variantId)) return group1.cta;
            if (group2.enabled && group2.variantIds.includes(variantId)) return group2.cta;
            if (group3.enabled && group3.variantIds.includes(variantId)) return group3.cta;
        }
        return sideUpsell ? DEFAULT_LABEL_SIDE_UPSELL : DEFAULT_LABEL;
    }, [selectedVariant?.id, preOrders, sideUpsell]);

    const onAddItem = useCallback(async () => {
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
    }, [addToCart, selectedVariant, sideUpsell, trackEvent]);

    const buttonData = useMemo(() => ({
        btnLabel: props.label,
        label: ctaLabel,
        addingItem,
        comparePrice: props.comparePrice,
        price: props.price,
        carousel: props.carousel,
        collectionTemplate: props.collectionTemplate,
        sideUpsell: props.sideUpsell,
    }), [props.label, ctaLabel, addingItem, props.comparePrice, props.price, props.carousel, props.collectionTemplate, props.sideUpsell]);

    return (
        <Button onClick={onAddItem} buttonClass={`${props.className ?? ''} product-card-btn border border-[transparent] ${props.sustainability ? '' : 'lg:border-0'} flex flex-row btn-sm md:text-base ${bgClass ? bgClass : 'btn-primary'} ${textClass ? textClass : ''} rounded-0 mb-1 sm:px-0 px-0 ${props.carousel || props.collectionTemplate ? 'items-center justify-between !py-0 !px-g mb-1' : props.sideUpsell ? 'flex flex-col sm:text-sm lg:flex-col lg:justify-center lg:py-[5px]' : 'sm:flex-col sm:text-sm lg:justify-between !px-g'} font-normal`}>
            <Pricing
                store={props.store}
                selectedVariant={selectedVariant}
                hideCent={false}
                collectionTemplate={props.collectionTemplate}
                buttonData={buttonData}
            />
        </Button>
    );
});

const SwatchOverlay = memo((props: any) => {
    const swatchLabel = useRef(null);
    const [swatchAvailable, setSwatchAvailable] = useState(true);
    const [hasUserSelectedSwatch, setHasUserSelectedSwatch] = useState(false);
    const { product, addToCart, preOrders, generalSetting, label, store, handleShade } = props;

    const firstAvailable = useMemo(() => {
        const autoTicks = generalSetting?.auto_tick_variant?.split(',').map((v) => parseInt(v, 10)) || [];
        let first: any = null;

        if (autoTicks.length > 0) {
            first = product?.variants?.nodes.find((obj) =>
                autoTicks?.includes(parseInt(obj.id.replace('gid://shopify/ProductVariant/', '')))
            ) || null;
        }

        if (first === null || !first?.availableForSale) {
            first = props.swatch.data.find((swatchData: any) => swatchData.available) || { id: 0 };
        }

        return first;
    }, [product, generalSetting, store, props.swatch.data]);

    const [selectedVariant, setSelectedVariant] = useState(firstAvailable || null);

    useEffect(() => {
        if (!hasUserSelectedSwatch && firstAvailable) {
            setSelectedVariant(firstAvailable);
            setSwatchAvailable(firstAvailable.id !== 0 && firstAvailable.availableForSale !== false);
        }
    }, [firstAvailable, hasUserSelectedSwatch]);

    const { price, comparePrice } = useMemo(() => {
        const derivedPrice = selectedVariant?.price
            ? formatMoney(parseFloat(selectedVariant?.price.amount) * 100, false, store)
            : formatMoney(0, false, store);
        const derivedComparePrice = selectedVariant?.compareAtPrice
            ? formatMoney(parseFloat(selectedVariant.compareAtPrice.amount) * 100, false, store)
            : null;
        return { price: derivedPrice, comparePrice: derivedComparePrice };
    }, [selectedVariant, store]);

    useEffect(() => {
        if (!hasUserSelectedSwatch && (firstAvailable?.id === 0) && props.swatch?.data?.length > 0) {
            setSelectedVariant(props.swatch.data[0]);
            setSwatchAvailable(false);
        }
    }, [firstAvailable, props.swatch?.data, hasUserSelectedSwatch]);

    const changeSwatch = useCallback((e: any) => {
        const id = e.target.getAttribute('data-id');
        const available = e.target.getAttribute('data-avail') === 'true';
        const targetText = e.target.getAttribute('data-val');

        const selectedSwatch = product?.variants?.nodes?.find((node: any) => node.id === id);
        if (selectedSwatch) {
            setSelectedVariant(selectedSwatch);
            setHasUserSelectedSwatch(true);
            props.onVariantChange?.(selectedSwatch);
        }
        setSwatchAvailable(available);

        if (swatchLabel.current) swatchLabel.current.textContent = targetText;

    }, [product, store, handleShade]);

    const swatchSelected = props.swatch.data.find((sData) => sData.id === selectedVariant?.id) || props.swatch.data[0];

    if (props.quizResult) {
        const resultVariant = props.product.variants.nodes.find((node) => node.sku === props.quizResultSku);
        if (!resultVariant) return null;

        const color = resultVariant.selectedOptions?.find((s) => s.name === 'Color');

        return (
            <>
                {color && (
                    <div className="my-1 flex justify-center items-center">
                        <div className={`block variant-swatch border-2 border-white ${color.value?.toLowerCase()} mr-1`} /> {color.value}
                    </div>
                )}
                {resultVariant.availableForSale ? (
                    <AddToCartButton store={store} bgClass={props.bgClass} textClass={props.textClass} sustainability={props.sustainability} collectionTemplate={props.collectionTemplate} preOrders={preOrders} comparePrice={comparePrice} price={price} selectedVariant={selectedVariant} carousel={props.carousel} addToCart={addToCart} className="button-overlay z-[1] w-full mb-0" />
                ) : (
                    <WaitlistButton store={store} bgClass={props.bgClass} textClass={props.textClass} sustainability={props.sustainability} collectionTemplate={props.collectionTemplate} setWaitlistData={props.setWaitlistData} product={props.product} selectedVariant={resultVariant} comparePrice={comparePrice} price={price} carousel={props.carousel} className="button-overlay z-[1] w-full mb-0" />
                )}
            </>
        );
    }

    let labelText = label === DEFAULT_LABEL ? label : props.swatch.label;
    labelText = `<span class="lg:hidden">${DEFAULT_LABEL}</span><span class="hidden lg:inline">${labelText}</span>`;

    return (
        <>
            <AddToCartButton store={store} bgClass={props.bgClass} textClass={props.textClass} sustainability={props.sustainability} collectionTemplate={props.collectionTemplate} comparePrice={comparePrice} price={price} carousel={props.carousel} selectedVariant={selectedVariant} className="btn-choose mb-1 lg:mb-0" label={labelText} addToCart={false} sideUpsell={props.sideUpsell} trackEvent={props?.trackEvent} />
            <div className={`!w-auto px-0 swatch-overlay ${props.sideUpsell ? 'left-[5px] lg:left-[5px] right-[5px] lg:right-[5px]' : 'left-0 right-0'} bottom-[35px] lg:bottom-[.75rem] flex-col items-center justify-end pb-0 absolute bg-white lg:px-0 border border-primary`}>
                <div className={`text-center w-full pt-2 lg:pb-2 pb-1 ${props.sideUpsell ? 'lg:px-0' : 'lg:px-1'}`}>
                    <div className="block mb-[.625em]">
                        {props.swatch.style && <strong>Style: </strong>}
                        {props.swatch.shade && <strong>Shade: </strong>}
                        {props.swatch.tangleTamer && <strong>Type: </strong>}
                        {props.swatch.scent && <strong>Scent: </strong>}
                        {props.swatch.variant && <strong>Variant: </strong>}
                        <span ref={swatchLabel} data-swatch-label>{swatchSelected.label}</span>
                    </div>
                    <ul className="list-unstyled product-variant-swatch flex justify-center lg:gap-g">
                        {props.swatch.data.map((item: any) => (
                            <li key={`swatch-card-${item.id}`} className={`${props.sideUpsell ? 'w-[42px]' : 'w-auto'} product-variant-swatch__item ${item.available ? 'available' : 'oos'} ${selectedVariant?.id === item.id ? 'active' : ''}`} data-available={item.available ? 'available' : ''}>
                                <span
                                    onClick={changeSwatch}
                                    data-id={item.id}
                                    data-val={item.label}
                                    data-avail={item.availableForSale}
                                    className={`block variant-swatch mx-auto border-2 ${selectedVariant?.id === item.id ? 'border-primary' : 'border-white'} ${item.value.replace('&-', '').replace(':-limited-edition!', '')} ${item.available ? '' : 'oos'}`}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                {swatchAvailable ? (
                    <AddToCartButton store={store} bgClass={props.bgClass} textClass={props.textClass} sustainability={props.sustainability} collectionTemplate={props.collectionTemplate} label={label} preOrders={preOrders} comparePrice={comparePrice} price={price} selectedVariant={selectedVariant} carousel={props.carousel} addToCart={addToCart} className="button-overlay z-[1] w-full mb-0" sideUpsell={props.sideUpsell} trackEvent={props?.trackEvent || null} />
                ) : (
                    <WaitlistButton store={store} bgClass={props.bgClass} textClass={props.textClass} sustainability={props.sustainability} collectionTemplate={props.collectionTemplate} setWaitlistData={props.setWaitlistData} product={props.product} selectedVariant={selectedVariant} comparePrice={comparePrice} price={price} carousel={props.carousel} className="button-overlay z-[1] w-full mb-0" sideUpsell={props.sideUpsell} />
                )}
            </div>
        </>
    );
});

const isKit = (title:string) => {
	const productTitle = title?.toLowerCase();
	return productTitle.includes('tanning goddess') || productTitle.includes('kit') || productTitle.includes('set') || productTitle.includes('bundle') || productTitle.includes('duo')
}

const ProductCardButton = (props: any) => {
    const { className, ...rest } = props;

    return (
        <>
            {!rest.isLaunchWL && !rest.product.swatch && rest.effectivelyAvailable && (
                    <AddToCartButton {...rest} />
                )}

                {!rest.isLaunchWL && rest.product.swatch && (
                    <SwatchOverlay
                        {...rest}
                        swatch={rest.product.swatch}
                    />
                )}

                {!rest.isLaunchWL && !rest.product.swatch && !rest.effectivelyAvailable && (
                    <WaitlistButton {...rest} />
                )}

                {props.isLaunchWL && (
                    <LaunchButton {...rest} />
                )}
        </>
    );
}

const ProductCard = (props: any) => {
    const { style, clickShowPopup, abtestBtn, smSingleStar, addToCart, trackEvent, carousel, eventNameOnClick, preOrders, generalSetting, label, store, smSingleStarAllDevice, sideUpsell, badge } = props;
    const { product } = props;

    const autoTicks = useMemo(
        () => generalSetting?.auto_tick_variant?.split(',').map((v) => parseInt(v, 10)) || [],
        [generalSetting?.auto_tick_variant]
    );

    const [selectedVariant, setSelectedVariant] = useState(() => {
        const variantNodes = product?.variants?.nodes;
        if (!variantNodes) return null;

        if (autoTicks.length > 0) {
            const match = variantNodes.find((obj) =>
                autoTicks?.includes(parseInt(obj.id.replace('gid://shopify/ProductVariant/', '')))
            );
            if (match) return match;
        }
        return [...variantNodes].sort((x, y) => Number(y.availableForSale) - Number(x.availableForSale))[0] || null;
    });

    const skus = useMemo(() => {
        if (!product?.variants?.nodes) return [];

        if (product.variants.nodes[0]?.reviewSku) {
            return [product.variants.nodes[0].reviewSku.value];
        }

        const nodes = product.variants.nodes;
        if (isKit(product.title) || product.productType === 'HERO') {
            return nodes.map((node: any) => node.sku);
        }

        return nodes.filter((node: any) => {
            const t = node?.title?.toLowerCase();
            if (!t) return true;
            return !t.includes('bundle') && !t.includes('kit') && !t.includes('set');
        }).map((node: any) => node.sku);
    }, [product]);

    const { productImage, productHoverImage } = useMemo(() => {
        let image = props.product.src;
        let hoverImage = props.product.imgHover;

        return { productImage: image, productHoverImage: hoverImage };
    }, [product.handle, store, props.product.src, props.product.imgHover]);

    const [shade, setShade] = useState('');

    const handleShade = useCallback((val) => setShade(val), []);

    const shadeImages = useMemo(() => {
        return { productImage, productHoverImage };
    }, [shade, product.handle, store, productImage, productHoverImage]);

    const effectivelyAvailable = !product.availableForSale ? false : selectedVariant?.availableForSale ?? false;

    const trackLink = useCallback(() => {
        if (typeof trackEvent !== 'function') return;
        if (carousel) trackEvent('carousel_product', { category: 'Clickout', target: product.handle });
        if (eventNameOnClick) trackEvent(eventNameOnClick, { category: 'Clickout', target: product.handle });
        trackEvent('product_card_click', { category: 'Clickout', target: product.handle });
    }, [trackEvent, carousel, eventNameOnClick, product.handle]);

    const filterIncludes = props.collectionTemplate ? ['collection-pdp', 'collection'] : ['pdp', 'collection-pdp'];
    const customTitle = useMemo(() => props.customProductTitle?.customTitles?.find(
            (row) => row.handle === product?.handle && row.enabled_item && filterIncludes?.includes(row.options)
        )?.title || null,
        [props.customProductTitle, product?.handle, filterIncludes]
    );

    const openModal = useCallback((e) => {
        e.preventDefault();
        props.setProductData({
            open: true,
            handle: product.handle,
            selectedVariant,
            swatch: product.swatch,
        });
    }, [product, selectedVariant, props.setProductData]);

    const price = selectedVariant?.price ? formatMoney(Math.trunc(parseFloat(selectedVariant.price.amount)) * 100, false, store) : formatMoney(0, false, store);
    const comparePrice = selectedVariant?.compareAtPrice ? formatMoney(Math.trunc(parseFloat(selectedVariant.compareAtPrice.amount)) * 100, false, store) : null;

    const handleVariantChange = useCallback((variant) => {
        setSelectedVariant(variant);
    }, []);

    return !props.useCardTemplate ? (
        <div style={style} key={props.keyName} className={`product-card ${props.carousel ? 'product-card__carousel' : ''} ${props.className} ${!props.className ? 'w-3/4 md:w-1/4 pr-4 pl-4 text-center' : ''}`}>
            <div className="relative group">
                <ConditionalWrap
                    condition={clickShowPopup}
                    wrap={children => <p role="button" className={`product-card--img block ${badge === false ? 'artical-detail' : ''}`} onClick={openModal}>{children}</p>}
                    elseWrap={children => <a onClick={trackLink} href={props.product.handle ? `/products/${props.product.handle}` : '#'} className="product-card--img block">{children}</a>}
                >
                    <picture className={`w-full h-full max-w-full left-0 embed-responsive lg:aspect-[278/312] before:pt-[100%] lg:before:pt-[112%] block relative ${!props.product.src ? 'bg-shimmer' : ''} bg-pink-light`}>
                        {shadeImages.productImage && <source srcSet={shadeImages.productImage} media="(min-width: 992px)" />}
                        {shadeImages.productImage && (
                            //@ts-ignore
                            <img src={shadeImages.productImage} width={540} height={540} className="bg-pink-light embed-responsive-item fit--cover !max-w-full !w-full !h-full !top-0 !left-0 !right-auto lg:!w-full lg:!h-full lg:!max-w-full lg:!top-0 lg:!left-0 lg:!right-0" alt={product?.title} loading={props.isAboveFold ? "eager" : "lazy"} fetchpriority={props.isAboveFold ? "high" : "auto"} />
                        )}

                        {props.showTip && (
                            <>
                                <span className="absolute text-white font-xs p-1 hidden lg:block">👻 Get 3 for 2 with code: HALLOWEEN 👻</span>
                                <span className="absolute text-white font-xs p-1 block lg:hidden">👻 3 for 2</span>
                            </>
                        )}
                        {shadeImages.productHoverImage && !shadeImages.productHoverImage.includes('shopify/assets/no-image') && (
                            <picture className="w-full h-full max-w-full left-0 embed-responsive-item fit--cover img--hover hidden lg:block">
                                <img src={shadeImages.productHoverImage} width={540} height={540} className="embed-responsive-item fit--cover !max-w-full !w-full !h-full !top-0 !left-0 lg:!w-full lg:!h-full lg:!max-w-full lg:!top-0 lg:!left-0 lg:!right-0" alt={`${product?.title} - alternate view`} loading="lazy"
                                    //@ts-ignore
                                    fetchpriority="auto" />
                            </picture>
                        )}
                    </picture>
                    
                </ConditionalWrap>
                <div className="absolute left-[.75rem] right-[.75rem] bottom-[.75rem]
                    opacity-0 translate-y-[.75rem]
                    transition-all duration-300
                    [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0">
                        <ProductCardButton
                            {...props}
                            store={store}
                            generalSetting={generalSetting}
                            preOrders={preOrders}
                            addToCart={addToCart}
                            trackEvent={trackEvent}
                            label={label}
                            selectedVariant={selectedVariant}
                            effectivelyAvailable={effectivelyAvailable}
                            handleShade={handleShade}
                            comparePrice={props.product.comparePrice}
                            price={props.product.price}
                            onVariantChange={handleVariantChange}
                        />
                </div>

                {/* Badges */}
                {props.product.activeBadges?.length === 0 && props.product.badgeText && !props.sideUpsell && (
                    <span className={`min-w-[3.375em] leading-normal badge rounded-[2px] py-[2px] px-[0.5rem] ${props.product?.badgeBgColor ? props.product?.badgeBgColor : 'bg-white'} absolute font-normal text-sm ${props.product?.badgeTextColor ? props.product?.badgeTextColor : 'text-body'} top-[.5rem] left-[.5rem] lg:top-[.75rem] lg:left-[.75rem] ${props.sideUpsell ? 'lg:top-[8px]' : ''} product-card__badge`} style={{ fontSize: props.landingPageTemplate ? '12px' : `${props.product?.badgeMobileFontSize}px` }}>
                        {props.product.badgeText}
                    </span>
                )}
                {props.product.activeBadges && !props.sideUpsell && (
                    <div className={`absolute top-[.5rem] left-[.5rem] lg:top-[.75rem] lg:left-[.75rem] text-left flex flex-wrap ${props.product?.badgeDirection === 'verical' || props.product?.badge_direction === 'vertical' ? 'flex-col items-start' : ''}`}>
                        {props.product.activeBadges.map((badge) => (
                            <span key={badge.badge_text} className={`min-w-[3.375em] leading-normal badge rounded-[2px] py-[2px] px-[.5rem] font-normal product-card__badge mr-[4px] mb-[4px] ${badge?.badge_bg_color ? badge?.badge_bg_color : 'bg-white'} ${badge?.badge_text_color ? badge?.badge_text_color : 'text-body'}`} style={{ fontSize: props.landingPageTemplate ? '12px' : `${props.product?.badgeMobileFontSize}px` }}>
                                {badge.badge_text}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {clickShowPopup && (
                <p role="button" onClick={(e) => openModal(e)} className={`${badge === false ? 'artical-detail--link' : 'lg:min-w-[3.375em] badge'} cursor-pointer inline-flex rounded-[1.5rem] py-[.125rem] lg:py-[0.25rem] px-[.5rem] lg:px-[.75rem] bg-white absolute font-normal text-xs lg:text-sm text-primary top-[.5rem] right-[.5rem] lg:right-[1rem] lg:top-[1rem] mr-[.5rem] lg:mr-[1rem] product-card__badge`}>
                    <span className={`mr-1 ${badge === false ? 'hidden' : 'hidden lg:inline'}`}>Details</span>
                    <Eye className="artical-detail--svg svg h-[1rem] w-[1rem]" />
                </p>
            )}

            {/* Content */}
            <div className={`pt-0 pb-0 relative grow flex flex-col product-card__content lg:px-[.75rem]`}>
                <p className={`product-title__text pt-[.5rem] lg:pt-[1rem] lg:pb-[.25rem] pr-25 lg:pr-1 text-left grow flex flex-col items-start justify-center lg:justify-start h-100 ${props.shopArticle ? 'lg:min-h-[3.125em] lg:text-sm sm:text-lg leading-[1.25] lg:mb-[1rem!important] sm:mb-[10px!important]' : 'text-lg'} ${props.quizResult ? 'mb-0' : ''} ${props.carousel ? `${props.sustainability ? 'lg:min-h-[62.5px]' : ''} ${props.product.title.length > 40 ? 'lg:mx-0' : 'lg:mx-[0.625rem]'}` : 'px-0 lg:px-0'} ${props.quizResult ? '!min-h-0' : ''} ${props.homePage ? 'lg:min-h-[3.125em]' : ''} lg:min-h-[auto]`}>
                    <ConditionalWrap
                        condition={clickShowPopup}
                        wrap={children => <span role="button" className="text-sm leading-[18px] hover:underline lg:text-base product-card__title text-body hover:text-body w-full mb-[3px]" onClick={openModal}>{children}</span>}
                        elseWrap={children => <a onClick={trackLink} href={props.product.handle ? `/products/${props.product.handle}?c=product-title` : '#'} className={`${props.shopArticle ? 'hover:text-body lg:text-sm sm:text-lg hover:[text-decoration-line:underline!important] [text-decoration-line:none!important]' : props.sideUpsell ? 'lg:text-[16px] text-[16px]' : 'text-sm lg:text-base'} leading-[18px] product-card__title text-body hover:text-body w-full mb-[3px]`}>{children}</a>}
                    >
                        {customTitle ?? props.product.title}
                    </ConditionalWrap>
                </p>

                <div className="review-stars__number min-h-[18px] flex justify-between pb-[.5rem] items-center">
                    {skus.length > 0 && (
                        <YotpoStar hideUnderline={props.hideUnderline} sustainability={props.sustainability} smSingleStar={smSingleStar} smSingleStarAllDevice={smSingleStarAllDevice} sku={skus.join(',')} productId={props.product.productId} productHandle={props.product.handle} showTotal={true} />
                    )}
                    {selectedVariant && (
                        <div className="flex items-center text-[14px] leading-[18px] lg:text-base lg:leading-[28px]">
                            {comparePrice && <span className="line-through pr-[.25rem] lg:pr-[.5rem] text-gray-600">{comparePrice}</span>}
                            <span className={`font-bold ${comparePrice ? 'text-primary' : 'text-body'}`}>{price}</span>
                        </div>
                    )}
                </div>

                <div className="lg:hidden">
                    <ProductCardButton
                        {...props}
                        store={store}
                        generalSetting={generalSetting}
                        preOrders={preOrders}
                        addToCart={addToCart}
                        trackEvent={trackEvent}
                        label={label}
                        selectedVariant={selectedVariant}
                        effectivelyAvailable={effectivelyAvailable}
                        handleShade={handleShade}
                        comparePrice={props.product.comparePrice}
                        price={props.product.price}
                        onVariantChange={handleVariantChange}
                    />
                </div>
            </div>
        </div>
    ) : (
        <div key={props.keyName} className={`${props.className} carousel-item ${props.activeIndex === props.product.index ? 'active ' : ''} ${props.itemMovingNext ? 'carousel-item-next carousel-item-start ' : ''} ${props.itemMovingPrev ? 'carousel-item-prev carousel-item-end ' : ''}`}>
            <img className="img-fluid" src={`//via.placeholder.com/600x400?text=${props.product.label}`} alt={`slide ${props.product.index}`} />
        </div>
    );
};

export default ProductCard;
