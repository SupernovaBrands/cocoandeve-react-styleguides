import { useEffect, useState } from "react";
import { Button } from "../components";

const BundleVariantCard = (props) => {
    const { showLaunchWaitlist, swatchType, slides, bundleKey, optionSelected, store, formatMoney, activeVariant, saving, productStrapi, optionValue, variantDescriptionText, addToCart, productShopify, trackEvent, addToCartAnalytics, cart, currency, bgColor, textColor } = props;
    // console.log('set slides', slides[productStrapi?.images.length - 1]);
    const [addingItem, setAddingItem] = useState(false);

    const [currentVariant, setCurrentVariant] = useState(activeVariant);

    const [imageSrc, setImageSrc] = useState('');

    const onAddItem = async (e) => {
        if (typeof addToCart === 'function') {
            setAddingItem(true);
            let activeProduct = productShopify;
            const id = currentVariant.bundleId ? `gid://shopify/ProductVariant/${currentVariant.bundleId?.value}` : currentVariant.id;
            try {
                if (currentVariant.bundleId) {
                    const productBundle = await fetch(`/api/getVariantInfo?variant=${currentVariant.bundleId.value}`);
                    const productBundleJson = await productBundle.json();
                    const { node: bundle } = productBundleJson;
                    activeProduct = bundle?.product;
                }
            } catch {
                console.log('something wrong on fetching bundle');
            }

            await addToCart({
                id,
                quantity: 1,
                handle: activeProduct?.handle,
                title: activeProduct?.title,
            });
            if (typeof trackEvent === 'function') {
                try {
                    trackEvent('pdp', {
                        category: "Add to Cart",
                        target: "add_to_cart_pdp",
                        product: activeProduct?.handle,
                    });
                    addToCartAnalytics(cart.id, activeProduct?.handle, id, currency, 1);
                } catch (e:any) {
                    console.log('error', e);
                }
            }
            setAddingItem(false);
        }
    }

    const hardcodeImages = {
        'bronzing-self-tanner-drops': {
            au: {
                medium: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/f44857b0-8dfe-4373-4abc-7087f47ecb00/320x',
                default: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/1c91fe5f-e66d-4efa-13b9-6dbb4b33c100/320x',
            },
        },
        'antioxidant-glow-cream': {
            us: {
                medium: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/a422995d-643e-4cb0-146f-b97ce9613700/320x',
                default: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/a2d3750e-60b3-4ab6-b57b-8b84c1025300/320x',
            },
            ca: {
                medium: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/7df2104a-c639-466a-10a7-351ffee2d800/320x',
                default: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/a2d3750e-60b3-4ab6-b57b-8b84c1025300/320x',
            },
        },
    };

    const getHardcodedImage = (handle, store, selectedValue) => {
        const isValid =
            (handle === 'bronzing-self-tanner-drops' && store === 'au') ||
            (handle === 'antioxidant-glow-cream' && store === 'us') ||
            (handle === 'antioxidant-glow-cream' && store === 'ca');

        if (!isValid) return null;

        const storeImages = hardcodeImages[handle]?.[store];
        if (!storeImages) return null;

        return selectedValue === 'medium' ? storeImages.medium : storeImages.default;
    };

    const onChangeOption = (e) => {
        const [optionType, optionName] = bundleKey.split(':');
        const selectedValue = e.target.value.toLowerCase();

        const bundleGroup = productShopify.variants.edges.filter((node) => {
            return node.node.selectedOptions.find((op) => op.name === optionType && op.value === optionName);
        });
        const selectedVar = bundleGroup.find((b) => {
            return b.node.selectedOptions.find((s) => s.value.toLowerCase().replace(' ', '-') === e.target.value);
        });

        if (selectedVar) setCurrentVariant(selectedVar.node);

        const customImage = getHardcodedImage(productShopify.handle, store, selectedValue);
        if (customImage) {
            setImageSrc(customImage);
        }
    };

    const option2 = productShopify?.options.find(
        (op) => currentVariant.selectedOptions.find((c) => c.name === op.name && swatchType.includes(c.name.toLowerCase()))
    )?.values || [];

    const bundleImg = slides[slides.length - 1];
    const urlSet = productStrapi?.bundle_handle || null;

    useEffect(() => {
        const selectedValue = currentVariant.selectedOptions[1]?.value.toLowerCase();
        const customImage = getHardcodedImage(productShopify.handle, store, selectedValue);

        if (customImage) {
            setImageSrc(customImage);
        } else {
            const src = bundleImg?.src?.replace('public', '320x');
            if (src) {
                setImageSrc(src);
            }
        }
    }, [bundleImg]);

    return  (
        <>
        <p className="lg:text-lg font-bold mb-1 mt-3 lg:mt-4">Save with Bundles</p>
        <div className="overflow-hidden mb-3 bg-gray-400 rounded-[32px] relative">
            {saving && <span className={`min-w-[3.375em] leading-[1.25] badge rounded-[8px] border-black py-[0.33333em] px-[0.83333em] bg-body absolute font-normal text-sm text-white top-[1.04167em] left-[1.04167em] lg:top-[1em] lg:left-[1em]`}>{saving}</span>}
            <div className="float-left">
                <figure className="flex">
                    {urlSet && bundleImg && (
                        <a href={`/products/${urlSet}`} className="block w-[34.7%] lg:w-[26.38%]">
                            <img className="w-full h-full object-cover" src={imageSrc} alt={`Save with Bundles ${optionValue.replace('1x ', '')}`} />
                        </a>
                    )}

                    {!urlSet && bundleImg && (
                        <img alt={`Save with Bundles ${optionValue.replace('1x ', '')}`} className="w-[34.7%] lg:w-[26.38%] object-cover" src={imageSrc} />
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
                            {option2.length > 0 && !currentVariant.title.includes('Silky Hair') && (
                                <div className="option-select relative mb-[8px] lg:mb-0 lg:w-auto lg:mr-25 border-white">
                                    <select aria-label="Select Bundle Option" onChange={onChangeOption} className="custom-select lg:min-w-[125px] appearance-none rounded-full bg-white max-h-[44px] lg:max-h-[44px] w-full px-2 text-sm py-0" defaultValue={optionSelected}>
                                        {option2.map((op, i) => <option key={`option-select-${i}`} value={op.toLowerCase().replace(' ', '-')}>{op.replace('Antioxidant Glow', '')}</option>)}
                                    </select>
                                </div>
                            )}
                            <Button disabled={!currentVariant.availableForSale || showLaunchWaitlist} onClick={onAddItem} buttonClass={`min-h-[42px] lg:mb-0 border-gray-500 px-2 text-sm lg:text-base ${bgColor === 'bg-dark' ? 'bg-dark hover:bg-dark border-dark hover:text-white' : 'bg-primary hover:bg-primary border-primary btn-primary'} text-white w-full lg:w-auto items-center product-card-btn border flex lg:flex-row btn-sm rounded-full mb-1 py-0 ${addingItem ? 'justify-center min-w-[150px]' : 'justify-between'} !mb-0 ${!currentVariant.availableForSale || showLaunchWaitlist ? '!justify-center' : ''}`}>
                                {(!currentVariant.availableForSale || showLaunchWaitlist) && 'Out of Stock'}
                                {!showLaunchWaitlist && currentVariant.availableForSale && !addingItem && (
                                    <>
                                        <span className="pt-[3px]">
                                            {currentVariant.compareAtPrice && <span className="line-through mr-25 font-normal">{formatMoney(store, parseFloat(currentVariant.compareAtPrice.amount) * 100)}</span>}
                                            <span className="">{formatMoney(store, parseFloat(currentVariant.price.amount) * 100)}</span>
                                        </span>
                                        <span className="min-h-[42px] pl-2 lg:ml-1 lg:pl-g block flex items-center border-white border-l pt-[3px]">Add</span>
                                    </>
                                )}
                                {currentVariant.availableForSale && addingItem && <span className={`spinner-border spinner-border-sm text-white !w-[15px] !h-[15px]`} role="status" />}
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