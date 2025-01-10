import { useState } from "react";
import { Button } from "../components";

const BundleVariantCard = (props) => {
    const { bundleKey, optionSelected, store, formatMoney, activeVariant, saving, productStrapi, optionValue, variantDescriptionText, addToCart, selectedVariant, productShopify, trackEvent, addToCartAnalytics, cart, currency } = props;
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
    console.log('productShopify', productShopify);
    const option2 = productShopify?.options[1]?.values || [];

    return (
        <>
        <p className="lg:text-lg font-bold mb-1">Save with Bundles</p>
        <div className="overflow-hidden mb-3 bg-gray-400 rounded-[32px]">
            <div className="float-left">
                <figure className="flex">
                    {/* <a href="#" className="block w-[34.7%] lg:w-[26.38%]">
                        <img className="w-full h-full object-cover" src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/3ad79a5a-19b2-446e-ea5e-82a7ea5bfe00/320x" />
                    </a> */}
                    {bundleImg && (
                        <img className="w-[34.7%] lg:w-[26.38%] object-cover" src={bundleImg.url.replace('public', '320x')} />    
                    )}
                    <figcaption className="min-h-[100%] w-[65.3%] lg:w-[73.62%] float-right p-1 lg:p-2 flex flex-col">
                        <div className="mb-25 lg:mb-1">
                            <p className="text-body mb-25 block font-bold">{optionValue}</p>
                            {variantDescriptionText && variantDescriptionText.length > 0 && (
                                <div className="text-sm">
                                    {variantDescriptionText.map((el, i) => {
                                        return el !== '' && (<p key={`bundle-description-${i}`} dangerouslySetInnerHTML={{__html: el}} />);
                                    })}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col lg:flex-row">
                            {option2.length > 0 && (
                                <div className="option-select relative mb-1 lg:mb-0 lg:w-auto lg:mr-25">
                                    <select onChange={onChangeOption} className="custom-select lg:min-w-[125px] appearance-none rounded-full bg-white max-h-[42px] w-full px-2 lg:text-sm py-0" defaultValue={optionSelected}>
                                        {option2.map((op, i) => <option key={`option-select-${i}`} value={op.toLowerCase().replace(' ', '-')}>{op}</option>)}
                                    </select>
                                </div>
                            )}
                            <Button disabled={!currentVariant.availableForSale} onClick={onAddItem} buttonClass={`min-h-[42px] lg:mb-0 border-gray-500 px-2 bg-white text-body w-full lg:w-auto items-center product-card-btn border border-[transparent] flex lg:flex-row btn-sm btn-primary hover:bg-white rounded-full mb-1 sm:text-sm py-0 ${addingItem ? 'justify-center min-w-[150px]' : 'justify-between'}`}>
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