import { Button } from "../components";
import { useRef, useState, useEffect } from "react";
import { formatMoney, getCookie } from "~/modules/utils";

const DEFAULT_LABEL = 'Add';

const AddToCartButton = (props:any) => {
    const { label, available, product, itemSelected, setItemSelected, selectedVariant, maxItem, className } = props;
    
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

    const disabled = selected.includes(selectedVariant?.id) || selected.length >= maxItem || !available;

    return (
        <Button disabled={disabled} onClick={onAddItem} buttonClass={`${className ?? ''} -mt-25 !mb-0 h-5 lg:h-auto block lg:inline-block w-full product-card-btn border border-[transparent] lg:border-0 btn-sm md:text-base btn-primary rounded-full mb-[.75rem] sm:px-0 px-0 sm:flex-col sm:text-sm lg:justify-between lg:px-[2.8125rem] font-normal`}>
            {/* <Pricing store={props.store} selectedVariant={selectedVariant} hideCent={false} collectionTemplate={props.collectionTemplate} props={{...props, btnLabel, addingItem, selectedVariant, preOrders, ...{ label: ctaLabel } }} /> */}
            {label && `${label}`}
            {!label && (selected.includes(selectedVariant?.id) ? 'Added' : DEFAULT_LABEL)}
        </Button>
    );
};

const SwatchOverlay = (props:any) => {
    const spanEl = useRef(null);
    const swatchLabel = useRef(null);
    const [swatchAvailable, setSwatchAvailable] = useState(true);
    const { maxItem, setItemSelected, itemSelected, product, addToCart, preOrders, generalSetting, label, store, handleShade } = props;
    
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

    return (
        <>
            <AddToCartButton
                product={product}
                itemSelected={itemSelected}
                setItemSelected={setItemSelected}
                selectedVariant={selectedVariant}
                maxItem={maxItem}
                className="btn-choose"
                available={true}
                label={product.swatch.label}
            />
            <div className={`!w-auto px-0 swatch-overlay !left-[-1px] !right-[-1px] bottom-[-1px] flex-col items-center justify-end pb-0 absolute bg-white lg:px-0 border border-primary rounded-[20px] lg:rounded-[26px]`}>
                <div className={`text-center w-full pt-2 lg:pb-2 pb-1 lg:px-0`}>
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
                            <li key={`swatch-card-${item.id}`} className={`${props.sideUpsell ? 'w-[42px]' : 'w-auto lg:w-1/4'} product-variant-swatch__item ${item.available ? 'available' : 'oos'} ${selectedVariant.id === item.id ? 'active' : ''}`} data-available={item.available ? 'available': ''}>
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
                    available={swatchAvailable}
                    label={!swatchAvailable ? 'Out of Stock' : null}
                />
            </div>
        </>
    );
};

const BundleCard = (props:any) => {
    const { setProductData, keyName, className, product, setItemSelected, itemSelected, generalSetting, store, bundleDiscount, maxItem } = props;
    // const [skus, setSkus] = useState([]);
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

    const reducedPrice = product.priceInCent - (bundleDiscount / 100) * product.priceInCent;

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

    // if (product.handle === 'masque-towelwrap') console.log('selectedVariant?.availableForSale', product);

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
            <div className={`pt-0 pb-[.5rem] lg:pb-[1rem] px-[.5rem] lg:px-[1rem] relative text-center bg-pink-light rounded-b-[1.5em] lg:rounded-b-[2em] product-card__content`}>
                <div className="flex items-center justify-center relative">
                    {product.swatch && (
                        <SwatchOverlay
                            maxItem={maxItem}
                            itemSelected={itemSelected}
                            setItemSelected={setItemSelected}
                            handleShade={handleShade} store={store} generalSetting={generalSetting} swatch={props.product.swatch} product={props.product} />
                    )}
                    {!product.swatch && (
                        <AddToCartButton
                            product={product}
                            itemSelected={itemSelected}
                            setItemSelected={setItemSelected}
                            selectedVariant={selectedVariant}
                            maxItem={maxItem}
                            available={selectedVariant?.availableForSale}
                            label={!selectedVariant?.availableForSale ? 'Out of Stock' : null}
                        />
                    )}
                </div>

                <p className={`text-sm text-center min-h-[70px] px-0 lg:px-0 lg:min-h-[56px] flex flex-col justify-center`}>
                    <a href={product.handle ? `/products/${product.handle}` : '#'} className={`text-sm lg:text-base mt-[.75rem] lg:mt-[1rem] product-card__title text-body hover:text-body w-full text-center`}>
                        {product.title}
                    </a>
                </p>
                <a onClick={(e) => openModal(e)} href={product.handle ? `/products/${product.handle}` : '#'} className="font-bold text-sm lg:text-base text-underline underline-offset-[4px] inline-block my-[.75rem]">
                    View Details
                </a>
                <div className="flex justify-center text-sm lg:text-base">
                    <span className="text-gray-600 line-through">{formatMoney(product.priceInCent, false, store)}</span>
                    <span className="font-bold ml-[.25rem]">{formatMoney(reducedPrice, false, store)}</span>
                </div>
            </div>
        </div>
	);
};

export default BundleCard;
