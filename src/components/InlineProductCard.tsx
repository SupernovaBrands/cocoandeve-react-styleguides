import { useEffect, useRef, useState } from 'react';
import PlusCircle from '~/images/icons/plus-circle.svg';


const InlineProductCard = (props: any) => {
    const { product, generalSetting, addToCart, trackEvent, store, formatMoney } = props;
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [addingItem, setAddingItem] = useState(false);
    const [swatchOpen, setSwatchOpen] = useState(false);

    const useOutsideClick = (callback) => {
        const ref = useRef(null);
        useEffect(() => {
            const handleClick = (event) => {
                const isSwatch = event.target.classList.contains('swatch-wrapper-video-card')
                || event.target.classList.contains('variant-swatch') 
                || event.target.classList.contains('button__video-upsell') || event.target.closest('svg')?.classList.contains('button__video-upsell-svg');
                // console.log('isSwatch', event.target);
                if (isSwatch) {
                    return false;
                } else if (ref.current && (!ref.current?.contains(event.target))) {
                    callback();
                }
            };
            document.addEventListener('click', handleClick);
            return () => {
                document.removeEventListener('click', handleClick);
            };
        }, [ref]);

        return ref;
    };

    useEffect(() => {
        const autoTicks = generalSetting?.auto_tick_variant?.split(',').map((v) => parseInt(v, 10)) || [];
        let defaultVariant = null;
        if (autoTicks && autoTicks.length > 0) {
            defaultVariant = product?.variants?.nodes.find((obj) => (autoTicks.includes(parseInt(obj.id.replace('gid://shopify/ProductVariant/', ''))))) || null;
        }
        const variantNodes = product?.variants?.nodes;
        if (defaultVariant === null) defaultVariant = variantNodes?.sort((x, y) => y.availableForSale - x.availableForSale)[0];
        setSelectedVariant(defaultVariant || null);
    }, [product]);

    const onAddItem = async (e) => {
        if (product.swatch && !swatchOpen) {
            // console.log('open swatch');
            setSwatchOpen(true);
            return false;
        }
        if (!selectedVariant.availableForSale) return false;
        if (typeof addToCart === 'function') {
            setAddingItem(true);
            await addToCart({
                id: selectedVariant.id,
                quantity: 1,
                handle: selectedVariant?.product?.handle,
                title: selectedVariant.title,
            });
            setAddingItem(false);
            if (typeof trackEvent === 'function') {
                trackEvent('haircare_lp', {
                    category: 'Add to Cart',
                    target: 'add_to_cart_haircare_lp',
                    product: selectedVariant?.product?.handle,
                });
            }
        }
        return false;
    }

    // if (product?.handle === 'sunny-honey-bali-bronzing-self-tan-set') console.log('selected variant', product);

    const handleClickOutside = () => {
        setSwatchOpen(false);
    }

    const spanEl = useRef(null);
    const swatchLabel = useRef(null);
    const ref = useOutsideClick(handleClickOutside);
    const [swatchSelected, setSwatchSelected] = useState({
        label: ''
    });

    // console.log('swatch box open', product?.swatch);
    // const swatchSelected = product?.swatch?.data?.find((sData) => sData.id === selectedVariant.id) || product?.swatch?.data[0];

    useEffect(() => {
        if (product?.swatch && product?.swatch?.data?.length > 0 && selectedVariant) {
            const swatchSel = product?.swatch?.data?.find((sData) => sData.id === selectedVariant.id) || product?.swatch?.data[0];
            setSwatchSelected(swatchSel);
        }
    }, [product, selectedVariant])

    const changeSwatch = (e:any) => {
        // const [swatchAvailable, setSwatchAvailable] = useState(true);
        const spanEls = e.target.closest('.swatch-wrapper-video-card').querySelectorAll('span');
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
        // if (available === 'true') {
        //     setSwatchAvailable(true);
        // } else {
        //     setSwatchAvailable(false);
        // }
    };

    return (product && selectedVariant) && (
        <div className="relative">
            {swatchOpen && (
                <div className="swatch-wrapper-video-card w-auto bg-white absolute left-[.5rem] right-[.5rem] bottom-[calc(100%-30px)] py-[1rem] rounded-t-[2rem] min-h-[129px]">
                    <div className="block mb-[.625em] text-center px-1">
                        {product.swatch?.style && <strong>Style: </strong>}
                        {product.swatch?.shade && <strong>Shade: </strong>}
                        {product.swatch?.tangleTamer && <strong>Type: </strong>}
                        {product.swatch?.scent && <strong>Scent: </strong>}
                        {product.swatch?.variant && <strong>Variant: </strong>}
                        <strong ref={swatchLabel} data-swatch-label>{swatchSelected.label}</strong>
                    </div>
                    <ul className="list-unstyled flex justify-center px-[44px]">
                    {product?.swatch && product?.swatch?.data.map((item, index) => {
                        return <li key={`swatch-card-${item.id}`} className={`w-auto lg:w-1/4 product-variant-swatch__item mx-hg ${item.available ? 'available' : 'oos'} ${selectedVariant.id === item.id ? 'active' : ''}`} data-available={item.available ? 'available': ''}>
                                <span onClick={changeSwatch} ref={spanEl} data-id={item.id} data-val={item.label} data-avail={item.availableForSale} className={`block variant-swatch mx-auto border-2 ${ selectedVariant.id === item.id ? 'border-primary' : 'border-white'} ${item.value.replace('&-', '').replace(':-limited-edition!', '')} ${item.available ? '' : 'oos'}`}></span>
                            </li>
                    })}
                    </ul>
                </div>
            )}
            <figure className="relative z-[1] p-[.5rem] bg-gray-400 rounded-[1.25rem] mt-[.75rem] grid grid-cols-[68px_auto_40px] gap-[1rem] items-center">
                <a href={`/products/${product.handle}`}>
                    <img width={68} height={64} className="rounded-[.5rem]" src={product.src.replace('public', '86x')} />
                </a>
                <div className="flex flex-col justify-between">
                    <p className="text-sm mb-[.5rem]">{product.title}</p>
                    <div className="flex">
                        {selectedVariant.compareAtPrice && selectedVariant.compareAtPrice.amount && 
                            (<span className="line-through mr-[.25rem] text-gray-500">{formatMoney(store, parseFloat(selectedVariant.compareAtPrice.amount) * 100)}</span>)}
                        {selectedVariant.price && selectedVariant.price.amount && <span className="font-bold">{formatMoney(store, parseFloat(selectedVariant.price.amount) * 100)}</span>}
                    </div>
                </div>
                <button ref={ref} onClick={onAddItem} disabled={!product.swatch && !selectedVariant.availableForSale} className={`h-4 w-4 button__video-upsell rounded-full flex items-center justify-center ${addingItem ? 'bg-white' : `${generalSetting?.bfcm_cta_bg_color === 'bg-dark' ? 'bg-dark' : 'bg-primary'}`}`} type="button">
                    {/* {!addingItem && <PlusCircle className={`button__video-upsell-svg svg fill-primary hover:fill-primary-dark h-full w-full ${selectedVariant.availableForSale ? '' : 'opacity-[.5]'}`} />} */}
                    {!addingItem && (
                        <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.21453 6.82377V10.5438H3.76653V6.82377H0.0705313V4.37577H3.76653V0.679769H6.21453V4.37577H9.93453V6.82377H6.21453Z" fill="white"/>
                        </svg>
                    )}
                    {addingItem && <span className={`spinner-border spinner-border-sm ${generalSetting?.bfcm_cta_bg_color === 'bg-dark' ? 'text-dark' : 'text-primary'} !w-4 !h-4`} role="status" />}
                </button>
            </figure>
        </div>
    );
};

export default InlineProductCard;