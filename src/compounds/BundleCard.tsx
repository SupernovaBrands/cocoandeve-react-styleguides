import { Button } from "../components";
import { useRef, useState, useEffect } from "react";
import { formatMoney, getSkus, removeObjectWithId } from "~/modules/utils";
import YotpoStar from "~/components/YotpoStars";
import Eye from '~/images/icons/eye.svg';

const DEFAULT_LABEL = '<p class="inline lg:hidden">Add</p><p class="hidden lg:inline">Add to Cart</p>';

const AddToCartButton = (props:any) => {
    const { store, reducedPrice, label, available, product, itemSelected, setItemSelected, selectedVariant, maxItem, className } = props;
    
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
        if (selected.includes(selectedVariant.id)) {
            const currentSelected = [...itemSelected];
            const newSelected = removeObjectWithId(currentSelected, selectedVariant.id);
            setItemSelected(newSelected);
            return false;
        }
        setItemSelected((prev) => {
            const prevData = [...prev];
            prevData.push({
                src: product.src,
                srcSet: product.srcSet,
                title: selectedVariant.title,
                id: selectedVariant.id,
                price: selectedVariant && selectedVariant.price ? parseFloat(selectedVariant.price.amount) * 100 : product.priceInCent,
                comparePrice: selectedVariant && selectedVariant.compareAtPrice ? parseFloat(selectedVariant.compareAtPrice?.amount) * 100 : null
            });
            return prevData;
        })
        return false;
    }

    // const disabled = selected.includes(selectedVariant?.id) || selected.length >= maxItem || !available;
    const disabled = !available;

    return (
        <Button disabled={disabled} onClick={onAddItem} buttonClass={`${className ?? ''} ${selected?.includes(selectedVariant?.id) ? 'opacity-[.6]' : ''} bg-gray-400 active:bg-gray-400 visited:bg-gray-400 hover:bg-gray-400 text-primary !mb-0 h-5 lg:h-[44px] lg:!min-h-[44px] block lg:inline-block w-full product-card-btn border border-[transparent] lg:border-0 btn-sm md:text-base btn-primary rounded-full mb-[.75rem] sm:flex-col sm:text-sm flex items-center px-[.75rem] justify-between lg:!p-g lg:flex lg:min-w-[137px] lg:justify-center`}>
            {/* <Pricing store={props.store} selectedVariant={selectedVariant} hideCent={false} collectionTemplate={props.collectionTemplate} props={{...props, btnLabel, addingItem, selectedVariant, preOrders, ...{ label: ctaLabel } }} /> */}
            {label && <span>{label}</span>}
            {!label && (selected.includes(selectedVariant?.id) ? <span>Added</span> : <span dangerouslySetInnerHTML={{
							__html: DEFAULT_LABEL,
						}}/>)}
            <div className="inline-flex justify-center text-sm lg:text-base lg:hidden">
                <span className="font-normal line-through">
                    {!selectedVariant && formatMoney(product.priceInCent, false, store)}
                    {selectedVariant && selectedVariant.price && formatMoney(parseFloat(selectedVariant.price?.amount) * 100, false, store)}
                </span>
                <span className="font-bold ml-[.25rem]">
                    {formatMoney(reducedPrice, false, store)}
                </span>
            </div>
        </Button>
    );
};

const SwatchOverlay = (props:any) => {
    const spanEl = useRef(null);
    const swatchLabel = useRef(null);
    const [swatchAvailable, setSwatchAvailable] = useState(true);
    const { maxItem, setItemSelected, reducedPrice, itemSelected, product, addToCart, preOrders, generalSetting, label, store, handleShade } = props;
    
    let firstAvailable: any;
    const autoTicks = generalSetting?.auto_tick_variant?.split(',').map((v) => parseInt(v, 10)) || [];
    if (autoTicks && autoTicks.length > 0) {
        firstAvailable = product?.variants?.nodes.find((obj) => (autoTicks.includes(parseInt(obj.id.replace('gid://shopify/ProductVariant/', ''))))) || null;
    }
    if (firstAvailable === null || !firstAvailable?.availableForSale) {
        firstAvailable = props.swatch.data.find((swatchData:any) => swatchData.available) || { id: 0 };
    }
    
    if (product.handle === 'bronzing-self-tanner-drops' && ['au'].includes(store)) {
        let swatch = props.swatch.data.find((swatchData:any) => swatchData.value === 'dark');
        if (swatch.availableForSale) {
            firstAvailable = swatch;
        }
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

        if (product.handle === 'bronzing-self-tanner-drops' && ['dev', 'au'].includes(store)) {
            handleShade(targetText.toLowerCase())
        }
    };

    const swatchSelected = props.swatch.data.find((sData) => sData.id === selectedVariant.id) || props.swatch.data[0];
    const itemAvailable = props.swatch.data.filter((d) => d.available);

    return (
        <>
            <AddToCartButton
                product={product}
                itemSelected={itemSelected}
                setItemSelected={setItemSelected}
                selectedVariant={selectedVariant}
                maxItem={maxItem}
                className="btn-choose"
                available={itemAvailable.length > 0}
                label={itemAvailable.length > 0 ? 'Choose' : 'Out of stock'}
                reducedPrice={reducedPrice}
                store={store}
            />
            <div className={`!w-auto px-0 swatch-overlay !left-[-1px] !right-[-1px] bottom-[-1px] flex-col items-center justify-end pb-0 absolute bg-white lg:px-0 border border-gray-400 rounded-[20px] lg:rounded-[26px]`}>
                <div className={`text-center w-full pt-2 lg:pb-2 pb-1 lg:px-0`}>
                    <label className="block mb-[.625em] text-sm">
                        {props.swatch.style && <strong>Style: </strong>}
                        {props.swatch.shade && <strong>Shade: </strong>}
                        {props.swatch.tangleTamer && <strong>Type: </strong>}
                        {props.swatch.scent && <strong>Scent: </strong>}
                        {props.swatch.variant && <strong>Variant: </strong>}
                        <span ref={swatchLabel} data-swatch-label>{swatchSelected.label}</span>
                    </label>
                    <ul className="list-unstyled product-variant-swatch flex justify-center">
                        {props.swatch.data.length > 0 && props.swatch.data.map((item:any, i:any) => (
                            <li key={`swatch-card-${item.id}`} className={`${props.sideUpsell ? 'w-[42px]' : 'w-auto lg:w-auto'} product-variant-swatch__item ${item.available ? 'available' : 'oos'} ${selectedVariant.id === item.id ? 'active' : ''}`} data-available={item.available ? 'available': ''}>
                                <span onClick={changeSwatch} ref={spanEl} data-id={item.id} data-val={item.label} data-avail={item.availableForSale} className={`block variant-swatch mx-auto border-2 ${ selectedVariant.id === item.id ? 'border-primary' : 'border-white'} ${item.value.replace('&-', '').replace(':-limited-edition!', '')} ${item.available ? '' : 'oos'}`}></span>
                            </li>
                        ))}
                    </ul>
                </div>
                <AddToCartButton
                    product={product}
                    itemSelected={itemSelected}
                    setItemSelected={setItemSelected}
                    selectedVariant={selectedVariant}
                    maxItem={maxItem}
                    available={itemAvailable.length > 0}
                    label={!swatchAvailable ? 'Add' : null}
                    reducedPrice={reducedPrice}
                    store={store}
                />
            </div>
        </>
    );
};

const BundleCard = (props:any) => {
    const { setProductData, keyName, className, product, setItemSelected, itemSelected, generalSetting, store, bundleDiscount, maxItem } = props;
    const [skus, setSkus] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [shade, setShade] = useState('');
    const [productImage, setProductImage] = useState(product.src);
    const [productHoverImage, setProductHoverImage] = useState(product.imgHover);
    const autoTicks = generalSetting?.auto_tick_variant?.split(',').map((v) => parseInt(v, 10)) || [];

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
        if (product.handle === 'bronzing-self-tanner-drops' && ['au'].includes(store)) {
            setShade('dark');
        }
    }, []);

    useEffect(() => {

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

    let originalPrice = product.priceInCent;
    if (selectedVariant && selectedVariant.price) {
        originalPrice = parseFloat(selectedVariant.price?.amount) * 100;
    }
    const reducedPrice = originalPrice - (bundleDiscount / 100) * originalPrice;

    const openModal = (e) => {
        e.preventDefault();
        setProductData({
            open: true,
            handle: product.handle,
            selectedVariant: selectedVariant,
            swatch: product.swatch
        });
    };

    const handleShade = (val) => {
        setShade(val)
    }

    useEffect(() => {
        const skus = getSkus(product);
        setSkus(skus);
    }, [product, selectedVariant]);

    // if (product.handle === 'bronzing-self-tanner-drops') console.log('selectedVariant?.availableForSale', selectedVariant);

	return (
        <div key={keyName} className={`product-card ${className} ${!className ? 'w-3/4 md:w-1/4 pr-4 pl-4 text-center' : ''}`}>
            <p role="button" aria-label={`View detail of product ${product.title}`} onClick={(e) => openModal(e)} className="cursor-pointer rounded-[1rem] lg:rounded-[2rem] product-card--img block lg:pb-[1rem]">
                <picture className={`w-full h-full lg:h-[calc(100%+1rem)] max-w-full left-0 embed-responsive before:pt-[100%] block relative rounded-[1rem] lg:rounded-[2rem] ${!props.product.src ? 'bg-shimmer' : ''} bg-pink-light`}>
                    {productImage && <source srcSet={productImage} media="(min-width: 992px)" />}
                    {productImage && <img src={productImage} className="bg-pink-light embed-responsive-item fit--cover !max-w-[97.5%] !w-[97.5%] !h-[97.5%] !top-[-2.5%] !left-[2.5px] !right-auto lg:!max-h-full lg:!w-full lg:!h-full lg:!max-w-full lg:!top-0 lg:!left-0 lg:!right-0 rounded-[1rem] lg:rounded-[2rem] !pt-g lg:!pt-0" alt="" loading="lazy" />}
                    {productHoverImage && !productHoverImage.includes('shopify/assets/no-image') && (
                        <picture className="w-full h-full max-w-full left-0 embed-responsive-item fit--cover rounded-[1rem] lg:rounded-[2rem] img--hover hidden lg:block">
                            {productHoverImage && <img src={productHoverImage} className="embed-responsive-item fit--cover !max-w-[97.5%] !w-[97.5%] !h-[97.5%] !top-[-2.5%] !left-[2.5px] lg:!max-h-full lg:!w-full lg:!h-full lg:!max-w-full lg:!top-0 lg:!left-0 lg:!right-0 rounded-[1rem] lg:rounded-[2rem]" alt="" loading="lazy" />}
                        </picture>
                    )}
                </picture>
            </p>

            { product.badgeText && !product.badgeText.includes('% OFF') && (<span className={`min-w-[3.375em] leading-[1.25] badge rounded-[.5em] py-[0.33333em] px-[0.83333em] ${props.product?.badgeBgColor ? props.product?.badgeBgColor : 'bg-white'} absolute font-normal text-xs lg:text-sm ${props.product?.badgeTextColor ? props.product?.badgeTextColor : 'text-body'} top-[12.5px] left-[17.5px] lg:left-3 lg:top-g product-card__badge`}>{product.badgeText}</span>) }
            <p role="button" onClick={(e) => openModal(e)} className={`cursor-pointer inline-flex lg:min-w-[3.375em] badge rounded-[1.5rem] py-[.125rem] lg:py-[0.25rem] px-[.5rem] lg:px-[.75rem] bg-white absolute font-normal text-xs lg:text-sm text-primary top-[.5rem] right-[.5rem] lg:right-[1rem] lg:top-[1rem] product-card__badge`}>
                <span className="mr-1 hidden lg:inline">Details</span>
                <Eye className="svg h-[1rem] w-[1rem]" />
            </p>
            <div className={`pt-0 relative product-card__content lg:px-[.5rem]`}>
                <p role="button" onClick={(e) => openModal(e)} className={`text-sm lg:text-base text-body hover:text-body w-full text-left min-h-[36px] px-0 lg:px-0 lg:min-h-[36px] flex flex-col mt-[.75rem] lg:mt-[1rem] mb-[.5rem] justify-center pr-[.5rem] lg:font-bold`}>
                    {product.title}
                </p>
                <div className="flex flex-col lg:flex-row lg:justify-between">
                    <div className="review-stars__number min-h-1 lg:min-h-[auto] flex justify-start mb-[.75rem] lg:mb-0 lg:flex-col">
                        {skus.length > 0 && (<YotpoStar showTotal={false} smSingleStar={true} smSingleStarAllDevice={false} sku={skus.join(',')} productId={product.productId} productHandle={null} />)}
                        <div className="mt-[.5rem] hidden lg:inline-flex justify-center text-sm lg:text-lg">
                            <span className="text-gray-600 font-normal line-through">
                                {!selectedVariant && formatMoney(product.priceInCent, false, store)}
                                {selectedVariant && selectedVariant.price && (formatMoney(parseFloat(selectedVariant.price?.amount) * 100, false, store))}
                            </span>
                            <span className="font-bold ml-[.5rem]">{formatMoney(reducedPrice, false, store)}</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-center relative">
                        {product.swatch && (
                            <SwatchOverlay
                                maxItem={maxItem}
                                itemSelected={itemSelected}
                                setItemSelected={setItemSelected}
                                reducedPrice={reducedPrice}
                                handleShade={handleShade} store={store} generalSetting={generalSetting} swatch={product.swatch} product={product} />
                        )}
                        {!product.swatch && (
                            <AddToCartButton
                                product={product}
                                itemSelected={itemSelected}
                                setItemSelected={setItemSelected}
                                selectedVariant={selectedVariant}
                                maxItem={maxItem}
                                store={store}
                                available={selectedVariant?.availableForSale}
                                label={!selectedVariant?.availableForSale ? 'Out of Stock' : null}
                                reducedPrice={reducedPrice}
                            />
                        )}
                    </div>
                </div>
                {/* <a onClick={(e) => openModal(e)} href={product.handle ? `/products/${product.handle}` : '#'} className="font-bold text-body text-sm lg:text-base text-underline underline-offset-[4px] inline-block my-[.75rem]">
                    View Details
                </a> */}
                {/* <div className="flex justify-center text-sm lg:text-base">
                    <span className="text-gray-600 line-through">{formatMoney(product.priceInCent, false, store)}</span>
                    <span className="font-bold ml-[.25rem]">{formatMoney(reducedPrice, false, store)}</span>
                </div> */}
            </div>
        </div>
	);
};

export default BundleCard;
