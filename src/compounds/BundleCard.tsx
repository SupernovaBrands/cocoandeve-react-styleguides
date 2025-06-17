import { Button } from "../components";
import { useRef, useState, useEffect } from "react";
import { formatMoney, getCookie } from "~/modules/utils";

// const DEFAULT_LABEL = '<span class="lg:hidden">Add</span><span class="hidden lg:inline">Add To Cart</span>';
const DEFAULT_LABEL = 'Add';

// const Pricing = ({ props, collectionTemplate, hideCent, selectedVariant, store }) => {
//     let label = props.btnLabel ? props.btnLabel : props.label;
//     // label = collectionTemplate ? label : label?.replace('Add', 'Add to Cart').replace('Waitlist', 'Waitlist Me');
//     return (
//         <>
//             <span className={`${collectionTemplate ? 'border-x border-x-transparent' : ''} product-card-btn__text lg:w-auto flex ${props.carousel || props.collectionTemplate ? 'w-auto text-nowrap text-left py-[.8125em]' : props.sideUpsell ? 'w-full lg:w-full text-center text-sm' : 'w-full text-center lg:text-left'} `}>
//                 { !props.addingItem &&  parse(label ? label : DEFAULT_LABEL) }
//                 { props.addingItem && <span className="spinner-border spinner-border-sm text-white ml-1 !w-[15px] !h-[15px]" role="status" /> }
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

// const WaitlistButton = (props:any) => {
//     const handleWaitlist = () => {
//         // console.log('set waitlist data', props);
//         props.setWaitlistData({
//             open: true,
//             title: props.product.title,
//             image: props.product.src,
//             handle: props.product.handle,
//             date: props.selectedVariant?.waitlistPopupDate?.value || '',
//             productId: props.selectedVariant?.id?.replace('gid://shopify/ProductVariant/', ''),
//         });
//     };
//     const defaultText = 'Waitlist Me';
//     const data = {...props, ...{ label: `<span class="lg:hidden">Waitlist</span><span class="hidden lg:inline">${defaultText}</span>` }};
//     return (
//         <Button onClick={handleWaitlist} buttonClass={`${props.className ?? ''} border border-[transparent] ${props.sustainability ? '' : 'lg:border-0'} flex flex-row btn-sm md:text-base btn-primary rounded-full mb-1 sm:px-0 px-0 ${props.carousel || props.collectionTemplate ? 'items-center justify-between !py-0 !px-g mb-1 justify-between' : 'sm:flex-col sm:text-sm lg:justify-between lg:!px-g'} font-normal`}>
//             <Pricing store={props.store} selectedVariant={props.selectedVariant} collectionTemplate={props.collectionTemplate} props={data} hideCent={true}/>
//         </Button>
//     )
// };

const AddToCartButton = (props:any) => {
    const { product, itemSelected, setItemSelected, selectedVariant, maxItem } = props;
    // const [addingItem, setAddingItem] = useState(false);
    // const [ctaLabel, setCtaLabel] = useState(props.label);
    // const btnLabel = props.label;
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        if (itemSelected.length > 0) {
            const ids = [];
            itemSelected.map((item) => ids.push(item.id));
            setSelected(ids);
        } else {
            setSelected([]);
        }
    }, [itemSelected]);

    const onAddItem = () => {
        if (selected.includes(selectedVariant.id)) return false;
        // const variantSelected = 
        // console.log('selected variant', selectedVariant);
        // if (typeof addToCart === 'function') {
        //     setAddingItem(true);
        //     await addToCart({
        //         id: selectedVariant.id,
        //         quantity: 1,
        //         handle: selectedVariant?.product?.handle,
        //         title: selectedVariant.title,
        //         attributes: [{
        //             key: '_make_your_own_kit',
        //             value: 'yes'
        //         },{
        //             key: '_make_your_own_kit_type',
        //             value: 'hair'
        //         }]
        //     });
        //     setAddingItem(false);
        //     if (sideUpsell && typeof trackEvent === 'function') {
        //         trackEvent('pdp_upsell', {
        //             category: 'Add to Cart',
        //             target: 'add_to_cart_pdp_upsell',
        //             product: selectedVariant?.product?.handle,
        //         });
        //     }
        // }
        // console.log('selectedVariant', selectedVariant);
        setItemSelected((prev) => {
            const prevData = [...prev];
            prevData.push({
                src: product.src,
                srcSet: product.srcSet,
                title: selectedVariant.title,
                id: selectedVariant.id,
                price: product.priceInCent,
                comparePrice: product.comparePriceInCent
            });
            return prevData;
        })
        return false;
    }

    // useEffect(() => {
    //     if (preOrders && selectedVariant) {
    //         const { group1, group2, group3 } = preOrders;
    //         if (group1.enabled && selectedVariant && group1.variantIds.includes(selectedVariant.id.replace('gid://shopify/ProductVariant/', ''))) {
    //             setCtaLabel(group1.cta);
    //         } else if (group2.enabled && selectedVariant && group2.variantIds.includes(selectedVariant.id.replace('gid://shopify/ProductVariant/', ''))) {
    //             setCtaLabel(group2.cta);
    //         } else if (group3.enabled && selectedVariant && group3.variantIds.includes(selectedVariant.id.replace('gid://shopify/ProductVariant/', ''))) {
    //             setCtaLabel(group3.cta);
    //         } else {
    //             let ctaLabel = DEFAULT_LABEL;
    //             if (props.sideUpsell) ctaLabel = DEFAULT_LABEL_SIDE_UPSELL;
    //             setCtaLabel(`${ctaLabel}`);
    //             // setCtaLabel(props.label);
    //         }
    //     }
    // }, [selectedVariant, preOrders]);

    // useEffect(() => {
    //     let ctaLabel = DEFAULT_LABEL;
    //     if (props.sideUpsell) ctaLabel = DEFAULT_LABEL_SIDE_UPSELL;
    //     setCtaLabel(`${ctaLabel}`);
    // }, [])
    const disabled = selected.includes(selectedVariant.id) || selected.length >= maxItem;

    return (
        <Button disabled={disabled} onClick={onAddItem} buttonClass={`${props.className ?? ''} -mt-25 h-full lg:h-auto block lg:inline-block w-full lg:w-auto product-card-btn border border-[transparent] lg:border-0 btn-sm md:text-base btn-primary rounded-full mb-[.75rem] sm:px-0 px-0 sm:flex-col sm:text-sm lg:justify-between lg:px-[2.8125rem] font-normal`}>
            {/* <Pricing store={props.store} selectedVariant={selectedVariant} hideCent={false} collectionTemplate={props.collectionTemplate} props={{...props, btnLabel, addingItem, selectedVariant, preOrders, ...{ label: ctaLabel } }} /> */}
            {disabled ? 'Added' : DEFAULT_LABEL}
        </Button>
    );
};

// const SwatchOverlay = (props:any) => {
//     const spanEl = useRef(null);
//     const swatchLabel = useRef(null);
//     const [swatchAvailable, setSwatchAvailable] = useState(true);
//     const { product, addToCart, preOrders, generalSetting, label, store, handleShade } = props;
//     const [price, setPrice] = useState(props.price);
//     const [comparePrice, setComparePrice] = useState(props.comparePrice);
//     let labelText = label === 'Add' ? label : props.swatch.label;
//     labelText = `<span class="lg:hidden">Add</span><span class="hidden lg:inline">${labelText}</span>`;
    
//     let firstAvailable: any;
//     const autoTicks = generalSetting?.auto_tick_variant?.split(',').map((v) => parseInt(v, 10)) || [];
//     if (autoTicks && autoTicks.length > 0) {
//         firstAvailable = product?.variants?.nodes.find((obj) => (autoTicks.includes(parseInt(obj.id.replace('gid://shopify/ProductVariant/', ''))))) || null;
//     }
//     if (firstAvailable === null || !firstAvailable?.availableForSale) {
//         firstAvailable = props.swatch.data.find((swatchData:any) => swatchData.available) || { id: 0 };
//     }
//     // if (product.handle === 'bronzing-self-tanner-drops' && ['dev', 'us'].includes(store)) {
//     //     let swatch = props.swatch.data.find((swatchData:any) => swatchData.value === 'medium');
//     //     if (swatch.availableForSale) {
//     //         firstAvailable = swatch;
//     //     }
//     // }
//     if (product.handle === 'bronzing-self-tanner-drops' && ['au'].includes(store)) {
//         let swatch = props.swatch.data.find((swatchData:any) => swatchData.value === 'dark');
//         if (swatch.availableForSale) {
//             firstAvailable = swatch;
//         }
//     }
//     const [selectedVariant, setSelectedVariant] = useState(firstAvailable || null);

//     const changeSwatch = (e:any) => {
//         const spanEls = e.target.closest('.product-variant-swatch').querySelectorAll('span');
//         spanEls.forEach((span:any) => {
//             span.classList.remove('border-primary');
//             span.classList.add('border-white');
//         });
//         e.target.classList.remove('border-white');
//         e.target.classList.add('border-primary');
//         const targetText = e.target.getAttribute('data-val');
//         swatchLabel.current.textContent = targetText;
//         const available = e.target.getAttribute('data-avail');
//         const id = e.target.getAttribute('data-id');
//         const selectedSwatch = product?.variants?.nodes?.find((node:any) => node.id === id);
//         if (selectedSwatch) {
//             setSelectedVariant(selectedSwatch);
//         }
//         if (available === 'true') {
//             setSwatchAvailable(true);
//         } else {
//             setSwatchAvailable(false);
//         }

//         if (product.handle === 'bronzing-self-tanner-drops' && ['dev', 'au'].includes(store)) {
//             handleShade(targetText.toLowerCase())
//         }
//     };

//     useEffect(() => {
//         const region = getCookie('region');
//         if (selectedVariant.compareAtPrice) {
//             setComparePrice(formatMoney(parseFloat(selectedVariant.compareAtPrice.amount) * 100, false, region));
//         } else {
//             setComparePrice(null);
//         }
//         setPrice(formatMoney(parseFloat(selectedVariant.price.amount) * 100, false, region));
//     }, [selectedVariant]);

//     const swatchSelected = props.swatch.data.find((sData) => sData.id === selectedVariant.id) || props.swatch.data[0];

//     return (
//         <>
//             {props.quizResult && (() => {
//                 const resultVariant = props.product.variants.nodes.find((node) => node.sku === props.quizResultSku);
//                 const { selectedOptions } = resultVariant;
//                 const color = selectedOptions?.find((s) => s.name === 'Color');
//                 return resultVariant && (
//                     <>
//                         {color && (
//                             <div className="my-1 flex justify-center items-center">
//                                 <div className={`block variant-swatch border-2 border-white ${color.value?.toLowerCase()} mr-1`} /> {color.value}
//                             </div>
//                         )}
//                         {resultVariant.availableForSale && (
//                             <AddToCartButton store={store} sustainability={props.sustainability} collectionTemplate={props.collectionTemplate} preOrders={preOrders} comparePrice={comparePrice} price={price} selectedVariant={selectedVariant} carousel={props.carousel} addToCart={addToCart} className="button-overlay z-[1] w-full mb-0"/>
//                         )}
//                         {!resultVariant.availableForSale && (
//                             <WaitlistButton store={store} sustainability={props.sustainability} collectionTemplate={props.collectionTemplate} setWaitlistData={props.setWaitlistData} product={props.product} selectedVariant={resultVariant} comparePrice={comparePrice} price={price} carousel={props.carousel} className="button-overlay z-[1] w-full mb-0" />
//                         )}
//                     </>
//                 )
//             })()}

//             {!props.quizResult && (
//                 <>
//                     <AddToCartButton store={store} sustainability={props.sustainability} collectionTemplate={props.collectionTemplate} comparePrice={comparePrice} price={price} carousel={props.carousel} selectedVariant={selectedVariant} className="btn-choose mb-1" label={labelText} addToCart={false} sideUpsell={props.sideUpsell} trackEvent={props?.trackEvent} />
//                     <div className={`!w-auto px-0 swatch-overlay ${props.sideUpsell ? 'left-[5px] lg:left-[5px] right-[5px] lg:right-[5px] bottom-[35px]' : 'left-[8px] lg:left-1 right-[8px] lg:right-1 bottom-[35px]'} flex-col items-center justify-end pb-0 absolute bg-white lg:px-0 border border-primary rounded-t`}>
//                         <div className={`text-center w-full pt-2 lg:pb-2 pb-1 ${props.sideUpsell ? 'lg:px-0' : 'lg:px-1'}`}>
//                             <label className="block mb-[.625em]">
//                                 {props.swatch.style && <strong>Style: </strong>}
//                                 {props.swatch.shade && <strong>Shade: </strong>}
//                                 {props.swatch.tangleTamer && <strong>Type: </strong>}
//                                 {props.swatch.scent && <strong>Scent: </strong>}
//                                 {props.swatch.variant && <strong>Variant: </strong>}
//                                 <span ref={swatchLabel} data-swatch-label>{swatchSelected.label}</span>
//                             </label>
//                             <ul className="list-unstyled product-variant-swatch flex justify-center">
//                                 {props.swatch.data.length > 0 && props.swatch.data.map((item:any, i:any) => (
//                                     <li key={`swatch-card-${item.id}`} className={`${props.sideUpsell ? 'w-[42px]' : 'w-auto lg:w-1/4'} product-variant-swatch__item ${item.available ? 'available' : 'oos'} ${selectedVariant.id === item.id ? 'active' : ''}`} data-available={item.available ? 'available': ''}>
//                                         <span onClick={changeSwatch} ref={spanEl} data-id={item.id} data-val={item.label} data-avail={item.availableForSale} className={`block variant-swatch mx-auto border-2 ${ selectedVariant.id === item.id ? 'border-primary' : 'border-white'} ${item.value.replace('&-', '').replace(':-limited-edition!', '')} ${item.available ? '' : 'oos'}`}></span>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                         {/* <AddToCartButton store={store} comparePrice={props.comparePrice} price={props.price} carousel={props.carousel} className="button-overlay z-[1] w-full mb-0"/> */}
//                         {swatchAvailable && (
//                             <AddToCartButton store={store} sustainability={props.sustainability} collectionTemplate={props.collectionTemplate} label={label} preOrders={preOrders} comparePrice={comparePrice} price={price} selectedVariant={selectedVariant} carousel={props.carousel} addToCart={addToCart} className="button-overlay z-[1] w-full mb-0" sideUpsell={props.sideUpsell} trackEvent={props?.trackEvent || null} />
//                         )}
//                         {!swatchAvailable && (
//                             <WaitlistButton store={store} sustainability={props.sustainability} collectionTemplate={props.collectionTemplate} setWaitlistData={props.setWaitlistData} product={props.product} selectedVariant={selectedVariant} comparePrice={comparePrice} price={price} carousel={props.carousel} className="button-overlay z-[1] w-full mb-0" sideUpsell={props.sideUpsell} />
//                         )}
//                     </div>
//                 </>
//             )}
//         </>
//     );
// };

// const isKit = (title:string) => {
// 	const productTitle = title.toLowerCase();
// 	return productTitle.includes('tanning goddess') || productTitle.includes('kit') || productTitle.includes('set') || productTitle.includes('bundle') || productTitle.includes('duo')
// }

const BundleCard = (props:any) => {
    const { keyName, className, product, setItemSelected, itemSelected, generalSetting, store, bundleDiscount, maxItem } = props;
    // const [skus, setSkus] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [shade, setShade] = useState('');
    const [productImage, setProductImage] = useState(product.src);
    const [productHoverImage, setProductHoverImage] = useState(product.imgHover);
    const autoTicks = generalSetting?.auto_tick_variant?.split(',').map((v) => parseInt(v, 10)) || [];
    // const handleShade = (val) => {
    //     setShade(val)
    // }
    // const trackLink = () => {
    //     if (typeof trackEvent === 'function') {
    //         if (carousel) {
    //             trackEvent('carousel_product', {
    //                 category: 'Clickout',
    //                 target: product.handle,
    //             });
    //         }

    //         if (eventNameOnClick) {
    //             trackEvent(eventNameOnClick, {
    //                 category: 'Clickout',
    //                 target: product.handle,
    //             });
    //         }

    //         trackEvent('product_card_click', {
    //             category: 'Clickout',
    //             target: product.handle,
    //         });
    //     }
    // }

    useEffect(() => {
        // if (product && product.productType !== 'HERO') {
        //     const skus_ = isKit(product.title)
        //         ? product.variants.nodes.map((node:any) => node.sku)
        //         : product.variants.nodes.filter((node: any) => !node.title.toLowerCase().includes('bundle') && !node.title.toLowerCase().includes('kit') && !node.title.toLowerCase().includes('set')).map((node:any) => node.sku);
        //     if (product.variants.nodes[0]?.reviewSku) {
        //         setSkus([product.variants.nodes[0]?.reviewSku.value]);
        //     } else {
        //         setSkus(skus_);
        //     }
        // } else if (product && product.variants) {
        //     if (isKit(product.title)) {
        //         if (product.variants.nodes[0]?.reviewSku) {
        //             setSkus([product.variants.nodes[0]?.reviewSku.value]);
        //         } else {
        //             setSkus(product.variants.nodes.map((node:any) => node.sku));
        //         }
        //     } else {
        //         const single = product.variants.nodes.filter((node:any) => {
        //             return !node.title.toLowerCase().includes('bundle') && !node.title.toLowerCase().includes('kit') && !node.title.toLowerCase().includes('set')
        //         })
        //         if (product.variants.nodes[0]?.reviewSku) {
        //             setSkus([product.variants.nodes[0]?.reviewSku.value]);
        //         } else {
        //             setSkus(single.map((node:any) => node.sku));
        //         }
        //     }
        // }

        // https://app.clickup.com/t/86ergy8je
        if (!product.availableForSale && selectedVariant?.availableForSale) {
            selectedVariant.availableForSale = false;
        }
    }, [product, selectedVariant]);

    useEffect(() => {
        let defaultVariant = null;
        if (autoTicks && autoTicks.length > 0) {
            defaultVariant = product?.variants?.nodes.find((obj) => (autoTicks.includes(parseInt(obj.id.replace('gid://shopify/ProductVariant/', ''))))) || null;
        }
        const variantNodes = product?.variants?.nodes;
        if (defaultVariant === null) defaultVariant = variantNodes.sort((x, y) => y.availableForSale - x.availableForSale)[0];
        setSelectedVariant(defaultVariant || null);
    }, []);

    useEffect(() => {
        // if (product.handle === 'bronzing-self-tanner-drops' && ['dev', 'us'].includes(store)) {
        //     setShade('medium');
        // } else if (product.handle === 'bronzing-self-tanner-drops' && ['au'].includes(store)) {
        //     setShade('dark');
        // }

        if (product.handle === 'bronzing-self-tanner-drops' && ['au'].includes(store)) {
            setShade('dark');
        }
    }, []);

    useEffect(() => {
        // if (product.handle === 'bronzing-self-tanner-drops' && ['dev', 'us'].includes(store)) {
        //     const medImg = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/825b3d6e-4a4a-44d5-a993-c75e89aca800/540x';
        //     const darkImg = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/e9f74cf3-1826-41a6-dde2-70b4fd315100/540x';
        //     if (shade === 'medium') {
        //         setProductImage(medImg);
        //         setProductHoverImage(darkImg)
        //     } else {
        //         setProductImage(darkImg);
        //         setProductHoverImage(medImg)
        //     }
        // }

        if (product.handle === 'bronzing-self-tanner-drops' && ['au'].includes(store)) {
            const darkImg = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/11f0acb0-5f8a-459e-9d31-6f706061df00/540x';
            const medImg = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/e9f74cf3-1826-41a6-dde2-70b4fd315100/public';
            if (shade === 'medium') {
                setProductImage(medImg);
                setProductHoverImage(darkImg)
            } else {
                setProductImage(darkImg);
                setProductHoverImage(medImg)
            }
        }
    }, [shade]);

    const reducedPrice = product.priceInCent - (bundleDiscount / 100) * product.priceInCent;

	return (
        <div key={keyName} className={`product-card ${className} ${!className ? 'w-3/4 md:w-1/4 pr-4 pl-4 text-center' : ''}`}>
            <a href={product.handle ? `/products/${product.handle}` : '#'} className="rounded-t-[1.5em] lg:rounded-t-[2em] product-card--img block">
                <picture className={`w-full h-full max-w-full left-0 embed-responsive before:pt-[100%] block relative rounded-t-[1.5em] lg:rounded-t-[2em] ${!props.product.src ? 'bg-shimmer' : ''} bg-pink-light`}>
                    {productImage && <source srcSet={productImage} media="(min-width: 992px)" />}
                    {productImage && <img src={productImage} className="bg-pink-light embed-responsive-item fit--cover !max-w-[97.5%] !w-[97.5%] !h-[97.5%] !top-[-2.5%] !left-[2.5px] !right-auto lg:!max-h-[calc(100%-1rem)] lg:!w-full lg:!h-full lg:!max-w-full lg:!top-0 lg:!left-0 lg:!right-0 rounded-t !pt-g lg:!pt-hg" alt="" loading="lazy" />}
                    {productHoverImage && !productHoverImage.includes('shopify/assets/no-image') && (
                        <picture className="w-full h-full max-w-full left-0 embed-responsive-item fit--cover rounded-t-[1.5em] lg:rounded-t-[2em] img--hover hidden lg:block">
                            {productHoverImage && <img src={productHoverImage} className="embed-responsive-item fit--cover !max-w-[97.5%] !w-[97.5%] !h-[97.5%] !top-[-2.5%] !left-[2.5px] lg:!max-h-[calc(100%-1rem)] lg:!w-full lg:!h-full lg:!max-w-full lg:!top-0 lg:!left-0 lg:!right-0 rounded-t" alt="" loading="lazy" />}
                        </picture>
                    )}
                </picture>
            </a>

            { product.badgeText && !product.badgeText.includes('% OFF') && (<span className={`min-w-[3.375em] leading-[1.25] badge rounded-[.5em] py-[0.33333em] px-[0.83333em] ${props.product?.badgeBgColor ? props.product?.badgeBgColor : 'bg-white'} absolute font-normal text-xs lg:text-sm ${props.product?.badgeTextColor ? props.product?.badgeTextColor : 'text-body'} top-[12.5px] left-[17.5px] lg:left-3 lg:top-g product-card__badge`}>{product.badgeText}</span>) }
            <div className={`pt-0 pb-[1rem] px-[.5rem] lg:px-[1rem] relative text-center bg-pink-light rounded-b-[1.5em] lg:rounded-b-[2em] product-card__content`}>
                {!product.swatch && selectedVariant?.availableForSale && (
                    <AddToCartButton
                        product={product}
                        itemSelected={itemSelected}
                        setItemSelected={setItemSelected}
                        selectedVariant={selectedVariant}
                        maxItem={maxItem}
                    />
                )}

                <p className={`text-sm text-center min-h-[54px] px-0 lg:px-0 lg:min-h-4 flex flex-col justify-center`}>
                    <a href={product.handle ? `/products/${product.handle}` : '#'} className={`'text-sm lg:text-base' product-card__title text-body hover:text-body w-full text-center"`}>
                        {product.title}
                    </a>
                </p>
                <a href={product.handle ? `/products/${product.handle}` : '#'} className="font-bold text-sm text-underline inline-block my-[.75rem]">View Details</a>
                <div className="flex justify-center">
                    <span className="text-gray-600 line-through">{formatMoney(product.priceInCent, false, store)}</span>
                    <span className="font-bold ml-[.25rem]">{formatMoney(reducedPrice, false, store)}</span>
                </div>
            </div>
        </div>
	);
};

export default BundleCard;
