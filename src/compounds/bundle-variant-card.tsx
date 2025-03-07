import { useState } from "react";
import { Button } from "../components";

const BundleVariantCard = (props) => {
    const { bundleKey, optionSelected, store, formatMoney, activeVariant, saving, productStrapi, optionValue, variantDescriptionText, addToCart, selectedVariant, productShopify, trackEvent, addToCartAnalytics, cart, currency } = props;
    // console.log('set saving', saving);
    const [addingItem, setAddingItem] = useState(false);
    
    const [currentVariant, setCurrentVariant] = useState(activeVariant);
    
    const onAddItem = async (e) => {
        if (typeof addToCart === 'function') {
            const id = currentVariant.bundleId ? `gid://shopify/ProductVariant/${currentVariant.bundleId?.value}` : currentVariant.id;
            setAddingItem(true);
            await addToCart({
                id,
                quantity: 1,
                handle: productShopify?.handle,
                title: productShopify.title,
            });
            if (typeof trackEvent === 'function') {
                try {
                    trackEvent('pdp', {
                        category: "Add to Cart",
                        target: "add_to_cart_pdp",
                        product: productShopify?.handle,
                    });
        
                    addToCartAnalytics(cart.id, productShopify?.handle, selectedVariant?.id, currency, 1);
                } catch (e:any) {
                    console.log('error', e);
                }
            }
            setAddingItem(false);
        }
    }

    const onChangeOption = (e) => {
        const [optionType, optionName] = bundleKey.split(':');
        const bundleGroup = productShopify.variants.edges.filter((node) => {
            return node.node.selectedOptions.find((op) => op.name === optionType && op.value === optionName);
        });
        const selectedVar = bundleGroup.find((b) => {
            return b.node.selectedOptions.find((s) => s.value.toLowerCase().replace(' ', '-') === e.target.value);
        });

        if (selectedVar) setCurrentVariant(selectedVar.node);
    };

    const bundleImg = productStrapi?.images[productStrapi?.images.length - 1];
    const option2 = productShopify?.options[1]?.values || [];
    const bundleUrl = productStrapi?.bundle_handle || null;

    // hardcoded url for selected PDPs
    const urlTargets = {
        'sunny-honey-bali-bronzing-self-tan-mousse': {
            bundleUrl: 'sunny-honey-bali-bronzing-self-tan-set'
        },
        'super-nourishing-coconut-fig-hair-masque': {
            bundleUrl: 'silky-hair-set'
        },
        'tripeptide-hair-density-serum': {
            bundleurl: 'fine-hair-rescue-set'
        },
        'super-hydrating-shampoo-conditioner-set': {
            bundleUrl: null
        },
        'antioxidant-face-tanning-micromist': {
            bundleUrl: 'tan-masters-kit'
        },
    };

    const urlSet = urlTargets[productShopify.handle]?.bundleUrl || null;

    return (
        <>
        <p className="lg:text-lg font-bold mb-1 mt-3 lg:mt-4">Save with Bundles</p>
        <div className="overflow-hidden mb-3 bg-gray-400 rounded-[32px] relative">
            <span className={`min-w-[3.375em] leading-[1.25] badge rounded-[8px] border-black py-[0.33333em] px-[0.83333em] bg-body absolute font-normal text-sm text-white top-[1.04167em] left-[1.04167em] lg:top-[1em] lg:left-[1em]`}>{saving}</span>
            <div className="float-left">
                <figure className="flex">
                    {urlSet && bundleImg && (
                        <a href={`/products/${urlSet}`} className="block w-[34.7%] lg:w-[26.38%]">
                            <img className="w-full h-full object-cover" src={bundleImg.url.replace('public', '320x')} />
                        </a>
                    )}
                    
                    {!urlSet && bundleImg && (
                        <img className="w-[34.7%] lg:w-[26.38%] object-cover" src={bundleImg.url.replace('public', '320x')} />    
                    )}
                    <figcaption className="min-h-[100%] w-[65.3%] lg:w-[73.62%] float-right px-[0.6em] py-[1rem] lg:p-[1rem] flex flex-col">
                        <div className="mb-25 lg:mb-[1rem]">
                            {!urlSet && <p className="text-body mb-25 lg:mb-[.5rem] block font-bold">{optionValue.replace('1x ', '')}</p>}
                            {urlSet && (
                                <a className="text-body mb-25 lg:mb-[.5rem] block font-bold" href={`/products/${urlSet}`}>
                                    {optionValue.replace('1x ', '')}
                                </a>
                            )}
                            {variantDescriptionText && variantDescriptionText.length > 0 && (
                                <div className="text-sm mb-25 lg:mb-0">
                                    {variantDescriptionText.map((el, i) => {
                                        return el !== '' && (<p key={`bundle-description-${i}`} dangerouslySetInnerHTML={{__html: el}} />);
                                    })}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col lg:flex-row">
                            {option2.length > 0 && (
                                <div className="option-select relative mb-[8px] lg:mb-0 lg:w-auto lg:mr-25">
                                    <select onChange={onChangeOption} className="custom-select lg:min-w-[125px] appearance-none rounded-full bg-white max-h-[42px] lg:max-h-[44px] w-full px-2 text-sm py-0" defaultValue={optionSelected}>
                                        {option2.map((op, i) => <option key={`option-select-${i}`} value={op.toLowerCase().replace(' ', '-')}>{op}</option>)}
                                    </select>
                                </div>
                            )}
                            <Button disabled={!currentVariant.availableForSale} onClick={onAddItem} buttonClass={`min-h-[42px] lg:mb-0 border-gray-500 px-2 bg-white text-body w-full lg:w-auto items-center product-card-btn border border-[transparent] flex lg:flex-row btn-sm btn-primary hover:bg-white rounded-full mb-1 py-0 ${addingItem ? 'justify-center min-w-[150px]' : 'justify-between'} !mb-0`}>
                                {!currentVariant.availableForSale && 'Out of Stock'}
                                {currentVariant.availableForSale && !addingItem && (
                                    <>
                                        <span className="pt-[3px]">
                                            {currentVariant.compareAtPrice && <span className="line-through mr-25">{formatMoney(store, parseFloat(currentVariant.compareAtPrice.amount) * 100)}</span>}
                                            <span className="">{formatMoney(store, parseFloat(currentVariant.price.amount) * 100)}</span>
                                        </span>
                                        <span className="min-h-[42px] pl-2 lg:ml-1 lg:pl-g block flex items-center border-gray-500 border-l">
                                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.6 5.3V8.4H3.56V5.3H0.48V3.26H3.56V0.18H5.6V3.26H8.7V5.3H5.6Z" fill="#151515"/>
                                            </svg>
                                        </span>
                                    </>
                                )}
                                {currentVariant.availableForSale && addingItem && <span className="spinner-border spinner-border-sm text-body !w-[15px] !h-[15px]" role="status" />}
                            </Button>
                        </div>
                    </figcaption>
                </figure>
            </div>
        </div>
        </>
    );
};

export default BundleVariantCard;