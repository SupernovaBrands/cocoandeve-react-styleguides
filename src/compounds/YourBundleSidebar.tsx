import PercentageSmall from '~/images/icons/percentage-small.svg';
import DeliverySmall from '~/images/icons/delivery-small.svg';
import ChevronUp from '~/images/icons/chevron-up.svg';
import SvgTrash from '~/images/icons/trash.svg';
import { formatMoney, getCartId } from "~/modules/utils";
import { Button } from "../components";
import { useEffect, useState } from 'react';

const STEP = [
    {label: '10%'},
    {label: '15%'},
    {label: '20%'}
]

const ItemCard = (props) => {
    const { item, placeholder, maxItem, index, isLast, bundleDiscount, setItemSelected, itemSelected, setIsOpen } = props;
    const reducedPrice = item.price - (bundleDiscount / 100) * item.price;
    const editItem = (idx) => {
        const items = [...itemSelected];
        items.splice(idx, 1);
        setItemSelected(items);
        if (items.length === 0) setIsOpen(false);
    };
    return (
        <li className={`
            flex 
            bg-white 
            
            rounded-[3px] 
            relative 
            lg:w-[85px] 
            ${itemSelected.length < 3 ? 'w-[80px] basis-[80px] h-[80px]' : 'w-full '} 
            ${itemSelected.length < 2 ? 'lg:h-[80px]' : 'lg:h-[82px]'} 
            ${!isLast ? `before:content-[""] 
                before:w-[.75rem] 
                before:bg-gray-500 
                before:absolute 
                before:top-[50%] 
                before:-right-[.75rem] 
                before:-translate-y-[50%] 
                before:h-[1px] 

                ${itemSelected.length < 2 ?
                    `
                    lg:before:h-[1px] 
                    lg:before:top-[50%] 
                    lg:before:-right-2 
                    lg:before:-translate-y-[50%] 
                    lg:before:w-2 
                    `
                : 
                    `
                    lg:before:w-[1px] 
                    lg:before:left-[50%] 
                    lg:before:right-auto 
                    lg:before:-translate-x-[50%] 
                    lg:before:h-2 
                    lg:before:top-auto 
                    lg:before:-bottom-3
                    `
                }
                ` : ''}
            `}>
            {/* <span className="inline-block font-bold mr-[.5rem] mt-[.5rem] text-lg">{index + 1}</span> */}
            {/* {placeholder && <div className="w-[3rem] h-[3rem] rounded-[.5rem] bg-gray-400" />} */}
            {!placeholder && (
                <div className={`relative aspect-1/1 ${itemSelected.length < 2 ? '' : 'lg:aspect-[85/82]'}`}>
                    <button onClick={() => editItem(index)} aria-label={`Edit Bundle Item ${index}`} className='absolute -top-[.5rem] -right-[.5rem]'>
                        <svg className="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" rx="12" fill="white" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2.25C6.61522 2.25 2.25 6.61522 2.25 12C2.25 17.3848 6.61522 21.75 12 21.75C17.3848 21.75 21.75 17.3848 21.75 12C21.75 6.61522 17.3848 2.25 12 2.25ZM10.2803 9.21967C9.98744 8.92678 9.51256 8.92678 9.21967 9.21967C8.92678 9.51256 8.92678 9.98744 9.21967 10.2803L10.9393 12L9.21967 13.7197C8.92678 14.0126 8.92678 14.4874 9.21967 14.7803C9.51256 15.0732 9.98744 15.0732 10.2803 14.7803L12 13.0607L13.7197 14.7803C14.0126 15.0732 14.4874 15.0732 14.7803 14.7803C15.0732 14.4874 15.0732 14.0126 14.7803 13.7197L13.0607 12L14.7803 10.2803C15.0732 9.98744 15.0732 9.51256 14.7803 9.21967C14.4874 8.92678 14.0126 8.92678 13.7197 9.21967L12 10.9393L10.2803 9.21967Z" fill="#D62E55" />
                        </svg>
                    </button>
                    <img src={item.src} width={80} height={80} className="w-full border border-primary rounded-[3px]" />
                </div>
            )}
            {placeholder && (
                <div className="border border-dashed border-gray-500 flex justify-between flex-1 items-center flex-col relative">
                    {index > 0 && (
                        <div className="w-full absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M16.5 10.5V6.75C16.5 4.26472 14.4853 2.25 12 2.25C9.51472 2.25 7.5 4.26472 7.5 6.75V10.5M6.75 21.75H17.25C18.4926 21.75 19.5 20.7426 19.5 19.5V12.75C19.5 11.5074 18.4926 10.5 17.25 10.5H6.75C5.50736 10.5 4.5 11.5074 4.5 12.75V19.5C4.5 20.7426 5.50736 21.75 6.75 21.75Z" stroke="#151515" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className={`font-bold mt-[.5rem] ${itemSelected.length >= 4 ? 'text-xs' : 'text-sm'}`}>
                                {index + 1 === 2 && STEP[0].label}
                                {index + 1 === 3 && STEP[1].label}
                                {index + 1 >= 4 && STEP[2].label}
                                &nbsp;off
                            </span>
                        </div>
                    )}
                    {/* <div>
                            
                        <p className="font-bold text-sm leading-[normal] mb-[.25rem] mr-25">{item.title.replace('/ Dark', '/ Dark Shade').replace('/ Medium', '/ Medium Shade').replace('/ Ultra Dark', '/ Ultra Dark Shade')}</p>
                        {!placeholder && (
                            <>
                                <div className="flex mb-[.25rem]">
                                    <span className="line-through mr-1">{formatMoney(item.comparePrice ? item.comparePrice : item.price, false, store)}</span>
                                    <span className="">{formatMoney(reducedPrice, false, store)}</span>
                                </div>    
                            </>
                        )}
                    </div> */}
                    {/* {!placeholder && (
                        <span onClick={() => editItem(index)} className="pr-1 text-underline text-primary font-bold cursor-pointer">
                            <SvgTrash className="svg w-[1em]" />
                        </span>
                    )} */}
                </div>
            )}
        </li>
    )
};

const YourBundleSidebar = (props: any) => {
    const { updateCartAttributes, parentProduct, bundleSize, bundleDiscount, itemSelected, store, setItemSelected, type, addToCart, strapiData, minItem, maxItem } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [processing, setProcessing] = useState(false);

    const [selected, setSelected] = useState(itemSelected);

    useEffect(() => {
        if (isOpen) document.body.classList.add('!overflow-y-hidden', 'lg:!overflow-y-scroll')
        else document.body.classList.remove('!overflow-y-hidden', 'lg:!overflow-y-scroll')
    }, [isOpen]);

    useEffect(() => {
        // if (itemSelected.length > 0) {
        const selectProducts = [];
        let counter = 1;
        [...Array(bundleSize)].forEach(() => {
            selectProducts.push({
                idx: counter++,
                id: null,
                img: null,
                title: 'Select Product',
                placeholder: true,
            });
        });

        if (itemSelected.length > 0) {
            itemSelected.map((item, index) => {
                selectProducts.splice(index, 1, item);
            });
            setSelected(selectProducts);
        } else {
            setSelected(selectProducts);
        }
        // }
    }, [itemSelected, bundleSize]);

    const processCheckout = async () => {

        // console.log('selected', selected);

        if (selected.length < minItem || selected.length > maxItem) return false;

        setProcessing(true);
        const groupId = Date.now();
        const gIds = selected.filter((sel) => sel.id !== null).reverse().map((v, idx, row) => {
            return {
                merchandiseId: v.id,
                attributes: [
                    { key: '_campaign_type', value: 'build_your_own_bundle' },
                    { key: '_make_your_own_kit', value: 'yes' },
                    { key: '_make_your_own_kit_removable', value: idx === (row.length - 1) ? 'yes' : 'no' },
                    { key: '_make_your_own_kit_editable', value: 'no' },
                    // { key: '_make_your_own_kit_type', value: `tab${type}` },
                    // { key: '_make_your_own_kit_ids', value: varIds.join(',') },
                    { key: '_make_your_own_kit_group', value: `${groupId}` },
                    { key: '_make_your_own_kit_discount', value: `${bundleDiscount}` },
                    { key: '_make_your_own_kit_notes', value: `${bundleDiscount}% Off - Bundle of ${row.length}` },
                    { key: '_make_your_own_kit_image', value: v.src.replace('320x', '150x') },
                    { key: '_make_your_own_kit_orig_price', value: v.comparePrice ? (v.comparePrice).toString() : (v.price).toString() },
                    { key: '_make_your_own_kit_new_price', value: (v.price - (bundleDiscount / 100) * v.price).toString() }
                ]
            }
        });

        const multipleAdd = await addToCart({
            id: null,
            quantity: 1,
            attributes: [],
            sellingPlanId: null,
            title: null,
            handle: null,
            bubble: true,
            updateCart: true,
            ids: gIds.reverse()
        });

        if (multipleAdd) {

            setItemSelected([]);
            if (parentProduct) {
                const attributes = [...multipleAdd.attributes, { key: '_bundle_kit_config', value: JSON.stringify(parentProduct) }]
                // console.log('new attributes', attributes);
                // await updateCartAttributes({store, cartId: multipleAdd.id, attributes })
                fetch('/api/cart/updateAttributes', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        value: parentProduct,
                        key: '_bundle_kit_config'
                    }),
                });
            }
        }
        setProcessing(false);
        setIsOpen(false);
    };

    const variantSelected = selected.filter((sel) => sel.id !== null);
    const originalPrice = selected.filter(it => it.id !== null && it.price).reduce((n, { price }) => n + parseInt(price, 10), 0);
    // const reducedPrice = originalPrice - (bundleDiscount / 100) * originalPrice;

    // let itemsOriginal = 0;
    let itemsReduced = 0;
    let origPrice = 0;
    selected.filter(it => it.id !== null && it.price).map((it) => {
        origPrice += (it.comparePrice ? it.comparePrice : it.price)

        // item price use compare if any, if not use regular price
        const itemPrice = it.comparePrice ? it.comparePrice : it.price;
        const priceInt = parseInt(itemPrice, 10);

        // const tOrig = (priceInt / 100).toFixed(2);
        const nPrice = priceInt - (bundleDiscount / 100) * priceInt;
        const tNew = (nPrice / 100).toFixed(2);
        // itemsOriginal += priceInt;
        itemsReduced += (parseFloat(tNew) * 100);
    })

    const btnInlineStyle = `
    .btn--sidebar-atc {
        display: none;
    }
    .btn--sidebar:not([disabled]):hover .btn--sidebar-label {
        display: none;
    }
    .btn--sidebar:not([disabled]):hover .btn--sidebar-atc {
        display: inline;
    }
    #gorgias-chat-container #chat-button {
        bottom: 65px !important;
    }
    `

    // console.log('itemSelected', itemSelected);
    return (
        <>
            <div className={`w-full lg:sticky lg:top-[230px] ${isOpen ? 'before:content-[""] before:h-full before:w-full before:top-0 before:bottom-0 before:left-0 before:right-0 before:bg-black before:z-[9999] before:opacity-[.6] before:fixed lg:before:content-[none]' : ''}`}>
                <style>{btnInlineStyle}</style>
                <div className={`lg:bg-gray-400 lg:p-2 ${isOpen ? 'fixed bottom-0 right-0 left-0 z-[9999] flex flex-col justify-end h-full lg:h-auto' : ''} lg:static`}>
                    <div className={`${!isOpen ? 'shadow-[0px_-4px_3px_rgba(0,0,0,0.1)]' : ''} lg:shadow-none flex bg-white lg:bg-gray-400 ${isOpen ? 'static pt-4 pb-[.5rem]' : 'pt-g fixed pb-[1rem]'}  left-0 right-0 bottom-0 justify-between px-2 z-[1] lg:static lg:p-0`}>
                        <div className="text-center lg:mb-[1rem] text-lg flex items-center lg:justify-center lg:w-full">
                            <span className="font-bold lg:block">{strapiData?.sidebar_title}</span>
                            {!isOpen && (
                                <div className="ml-[.5rem] text-sm py-[.25rem] px-[.75rem] bg-primary-light text-body lg:bg-white rounded-[.5rem] lg:hidden h-[26px]">
                                    <span className="relative top-[1px] font-bold">Saving {bundleDiscount}%</span>
                                </div>
                            )}
                        </div>
                        <div className="lg:hidden flex items-center text-primary font-bold text-sm" onClick={() => setIsOpen(!isOpen)}>
                            <span className="mr-[.5rem] inline-block top-[2px] relative">View ({itemSelected.length})</span>
                            <ChevronUp className={`w-g h-g svg--current-color ${isOpen ? 'rotate-180' : ''}`} />
                        </div>
                    </div>
                    
                    <div className={`${isOpen ? 'overflow-y-scroll lg:overflow-y-hidden' : 'hidden pt-[1rem]'} bg-white lg:bg-gray-400 px-2 lg:p-0 lg:flex lg:flex-col`}>
                        <div className="flex mb-2 items-center lg:justify-center lg:order-2">
                            {/* <PercentageSmall className="flex-[0_0_20px] mr-[.5rem] " /> */}
                            {itemSelected.length === 0 && <p className="text-sm">{strapiData?.sidebar_desc}</p>}
                            {itemSelected.length > 0 && itemSelected.length < maxItem && (<p className="text-sm">Add more to unlock {STEP[itemSelected.length - 1]?.label || ''} {itemSelected.length > 3 ? STEP[2].label : ''} off</p>)}
                        </div>
                        <ol className={`flex gap-[.75rem] lg:order-3 ${itemSelected.length > 1 ? 'lg:flex-col lg:items-center' : 'lg:justify-center'} lg:gap-2 `}>
                            {selected.map((item, index) => (
                                <ItemCard maxItem={maxItem} setIsOpen={setIsOpen} itemSelected={itemSelected} setItemSelected={setItemSelected} bundleDiscount={bundleDiscount} key={`sidebar--item-${index}`} item={item} placeholder={item.placeholder} store={store} index={index} isLast={index === selected.length - 1} />
                            ))}
                        </ol>
                        {variantSelected.length >= minItem && (
                            <div className="flex-wrap lg:justify-center items-center my-2 flex lg:order-1 lg:mt-0 lg:mb-1">
                                {itemsReduced > 0 && <span className="line-through text-lg mr-[.5rem] text-gray-600 opacity-[.5]">{formatMoney(origPrice, false, store)}</span>}
                                <span className="text-lg mr-[.5rem] font-bold">{formatMoney(itemsReduced, false, store)}</span>
                                <span className="text-sm font-bold py-[.25rem] px-[.75rem] bg-primary-light rounded-[.5rem]">{bundleDiscount}% OFF</span>
                            </div>
                        )}
                        <Button onClick={processCheckout} disabled={variantSelected.length < minItem || variantSelected.length > maxItem || processing} buttonClass={`mt-2 rounded-none border-primary bg-primary text-white w-full flex ${processing ? 'min-h-[50px]' : ''} justify-center items-center lg:block px-g font-normal lg:font-bold btn--sidebar lg:order-4`}>
                            {processing && <span className="spinner-border spinner-border-sm text-white !w-[18px] !h-[18px] lg:!w-[1rem] lg:!h-[1rem]" role="status" />}
                            {!processing && (
                                <>
                                    <span className="btn--sidebar-label">{`${variantSelected.length >= 2 ? 'Add to Cart' : `${variantSelected.length}/${bundleSize} Selected`}`}</span>
                                    <span className="btn--sidebar-atc">Add to Cart</span>
                                    {/* <ul className="flex lg:hidden">
                                        <li>{itemsReduced > 0 && <span className="line-through mr-[.5rem] font-normal">{formatMoney(origPrice, false, store)}</span>}</li>
                                        <li><span className="">{formatMoney(itemsReduced, false, store)}</span></li>
                                    </ul> */}
                                </>
                            )}
                        </Button>
                        <div className="flex mt-2 lg:order-5">
                            <DeliverySmall className="flex-[0_0_20px]" />
                            <p className="ml-[.5rem] text-sm mb-2 lg:mb-0"
                                dangerouslySetInnerHTML={{
                                    __html: strapiData?.sidebar_shipping,
                                }}
                            />
                        </div>
                        <p className="text-[#666] text-sm lg:hidden pb-4">
                            {strapiData?.sidebar_tos}
                        </p>
                    </div>
                </div>
                <p className="text-[#666] text-sm hidden lg:block mt-[1rem]">
                    {strapiData?.sidebar_tos}
                </p>
            </div>
        </>
    );
};

export default YourBundleSidebar;