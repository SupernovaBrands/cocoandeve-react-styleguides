import PercentageSmall from '~/images/icons/percentage-small.svg';
import DeliverySmall from '~/images/icons/delivery-small.svg';
import PercentOffDisabled from '~/images/icons/percent-off-circle.svg';
import PercentOffEnabled from '~/images/icons/circle-check-pink.svg';
import ChevronUp from '~/images/icons/chevron-up.svg';
import SvgTrash from '~/images/icons/trash.svg';
import { formatMoney, getCartId } from "~/modules/utils";
import { Button } from "../components";
import { useEffect, useState } from 'react';

const STEP = [
    { label: '10%' },
    { label: '15%' },
    { label: '20%' }
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
        <li className={`flex bg-white rounded-[4px] relative aspect-square xl:w-[80px] xl:h-[80px] ${placeholder && index >= Math.min(Math.max(itemSelected.length + 1, 2), maxItem) ? 'lg:hidden' : ''}`}>
            {/* <span className="inline-block font-bold mr-[.5rem] mt-[.5rem] text-lg">{index + 1}</span> */}
            {/* {placeholder && <div className="w-[3rem] h-[3rem] rounded-[.5rem] bg-gray-400" />} */}
            {!placeholder && (
                <div className={`relative aspect-1/1 rounded-[4px]`}>
                    <button onClick={() => editItem(index)} aria-label={`Edit Bundle Item ${index}`} className='absolute -top-[.5rem] -right-[.5rem] z-[1]'>
                        <svg className="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" rx="12" fill="white" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2.25C6.61522 2.25 2.25 6.61522 2.25 12C2.25 17.3848 6.61522 21.75 12 21.75C17.3848 21.75 21.75 17.3848 21.75 12C21.75 6.61522 17.3848 2.25 12 2.25ZM10.2803 9.21967C9.98744 8.92678 9.51256 8.92678 9.21967 9.21967C8.92678 9.51256 8.92678 9.98744 9.21967 10.2803L10.9393 12L9.21967 13.7197C8.92678 14.0126 8.92678 14.4874 9.21967 14.7803C9.51256 15.0732 9.98744 15.0732 10.2803 14.7803L12 13.0607L13.7197 14.7803C14.0126 15.0732 14.4874 15.0732 14.7803 14.7803C15.0732 14.4874 15.0732 14.0126 14.7803 13.7197L13.0607 12L14.7803 10.2803C15.0732 9.98744 15.0732 9.51256 14.7803 9.21967C14.4874 8.92678 14.0126 8.92678 13.7197 9.21967L12 10.9393L10.2803 9.21967Z" fill="#D62E55" />
                        </svg>
                    </button>
                    <img src={item.src} width={80} height={80} className="w-full border border-primary rounded-[4px]" />
                </div>
            )}
            {placeholder && (
                <div className="border border-dashed border-gray-500 flex justify-center flex-1 items-center flex-col relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect x="12.5996" y="4" width="16" height="1.2" rx="0.6" transform="rotate(90 12.5996 4)" fill="#151515" />
                        <rect x="4" y="11.4004" width="16" height="1.2" rx="0.6" fill="#151515" />
                    </svg>
                    {/* {index > 0 && (
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
                    )} */}
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
        [...Array(Math.max(bundleSize, 4))].forEach(() => {
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
                    // { key: '_make_your_own_kit_order_index', value: idx.toString() },
                    // { key: '_make_your_own_kit_removable', value: idx === (row.length - 1) ? 'yes' : 'no' },
                    // { key: '_make_your_own_kit_editable', value: 'no' },
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
        const groupedGIds = Object.values(gIds.reduce((acc, item) => {
            const key = item.merchandiseId;
            if (!acc[key]) {
                acc[key] = { ...item, quantity: 1 };
            } else {
                acc[key].quantity += 1;
            }
            return acc;
        }, {} as Record<string, any>));

        const multipleAdd = await addToCart({
            id: null,
            quantity: 1,
            attributes: [],
            sellingPlanId: null,
            title: null,
            handle: null,
            bubble: true,
            updateCart: true,
            ids: groupedGIds.reverse()
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

    // console.log('strapiData', strapiData);
    return (
        <>
            <div className={`w-full lg:sticky lg:top-[230px] xl:top-[115px] ${isOpen ? 'before:content-[""] before:h-full before:w-full before:top-0 before:bottom-0 before:left-0 before:right-0 before:bg-black before:z-[9999] before:opacity-[.6] before:fixed lg:before:content-[none]' : ''}`}>
                <style>{btnInlineStyle}</style>
                <div className={`lg:bg-gray-400 lg:p-2 ${isOpen ? 'fixed bottom-0 right-0 left-0 z-[9999] flex flex-col justify-end h-full lg:h-auto' : ''} lg:static`}>
                    <div className={`${!isOpen ? 'shadow-[0px_-4px_3px_rgba(0,0,0,0.1)]' : ''} lg:shadow-none flex bg-gray-400 ${isOpen ? 'static pt-2 pb-0' : 'pt-2 fixed pb-[1.75rem]'}  left-0 right-0 bottom-0 justify-between px-2 z-[1] lg:static lg:p-0`}>
                        <div className="text-center lg:mb-[.25rem] text-lg flex items-center lg:justify-center lg:w-full">
                            <span className="font-bold lg:block">{strapiData?.sidebar_title}</span>
                            {!isOpen && (
                                <div className="ml-[.5rem] text-sm py-[.25rem] px-[.75rem] bg-primary-light text-body lg:bg-white rounded-[.5rem] lg:hidden h-[26px]">
                                    <span className="relative top-[1px] font-bold">{itemSelected.length > 0 ? `Saving ${bundleDiscount}%` : `${bundleDiscount}% OFF`}</span>
                                </div>
                            )}
                        </div>
                        <div className="lg:hidden flex items-start lg:items-center text-primary font-bold text-sm lg:mb-0" onClick={() => setIsOpen(!isOpen)}>
                            <span className="mr-[.5rem] inline-block top-[2px] relative">View ({itemSelected.length})</span>
                            <ChevronUp className={`w-g h-g svg--current-color ${isOpen ? 'rotate-180' : ''}`} />
                        </div>
                    </div>

                    <div className={`${isOpen ? 'overflow-y-scroll lg:overflow-visible' : 'hidden pt-[1rem]'} bg-gray-400 px-2 lg:p-0 lg:flex lg:flex-col`}>
                        {/* <p className="text-sm pt-[.25rem]">Add 2 items to unlock 10% OFF</p> */}
                        <div className="flex pt-[.25rem] pb-[1rem] lg:pt-0 items-center lg:justify-center lg:order-1">
                            {/* <PercentageSmall className="flex-[0_0_20px] mr-[.5rem] " /> */}
                            {itemSelected.length <= 1 && <p className="text-sm">{strapiData?.sidebar_desc}</p>}
                            {itemSelected.length === 2 && <p className="text-sm">Add 3 items to unlock 15% OFF</p>}
                            {itemSelected.length === 3 && <p className="text-sm">Add 4 or more items to unlock 20% OFF</p>}
                            {itemSelected.length >= 4 && <p className="text-sm">Done! You reach 20% OFF!</p>}
                        </div>
                        <div className="progress-bar lg:order-2 min-h-[42px]">
                            <div className="relative h-[5px] w-[calc(100%-18px)] bg-[#CFCFCF] rounded-[5px]">
                                <div className={`absolute top-0 left-0 h-full bg-primary rounded-[5px] transition-all duration-100 
                                    ${itemSelected.length === 0 ? 'w-[1px]' : ''}
                                    ${itemSelected.length === 1 ? 'w-[2.5%] md:w-[1%] lg:w-[5%] xl:w-[4%]' : ''}
                                    ${itemSelected.length === 2 ? 'w-[9%] max-w-[26px] md:w-[4%] lg:w-[12.5%]' : ''}
                                    ${itemSelected.length === 3 ? 'w-[50%] md:w-[47.5%] lg:w-[51%] xl:w-[52.5%]' : ''}
                                    ${itemSelected.length > 3 ? 'w-full' : ''}
                                `}
                                    // style={{
                                    //     width: itemSelected.length === 0 ? '1px'
                                    //         : itemSelected.length === 1 ? '2.5%'
                                    //             : itemSelected.length === 2 ? '9%'
                                    //                 : itemSelected.length === 3 ? '50%'
                                    //                     : '100%'
                                    // }}
                                />
                                <div className={`absolute -top-[7.5px] flex flex-col items-center left-0`}>
                                    {itemSelected.length >= 2 ? <PercentOffEnabled className="w-[20px] h-[20px]" /> : <PercentOffDisabled className="w-[20px] h-[20px]" />}
                                    <span className="text-sm mt-[.25rem] whitespace-nowrap">10% OFF</span>
                                </div>
                                <div className={`absolute -top-[7.5px] flex flex-col items-center left-[45%] lg:left-[40%] xl:left-[42.5%]`}>
                                    {itemSelected.length >= 3 ? <PercentOffEnabled className="w-[20px] h-[20px]" /> : <PercentOffDisabled className="w-[20px] h-[20px]" />}
                                    <span className="text-sm mt-[.25rem] whitespace-nowrap">15% OFF</span>
                                </div>
                                <div className={`absolute -top-[7.5px] flex flex-col items-center -right-[5.5%] md:-right-[2.5%] lg:-right-[11.5%] xl:-right-[8.5%]`}>
                                    {itemSelected.length >= 4 ? <PercentOffEnabled className="w-[20px] h-[20px]" /> : <PercentOffDisabled className="w-[20px] h-[20px]" />}
                                    <span className="text-sm mt-[.25rem] whitespace-nowrap">20% OFF</span>
                                </div>
                            </div>
                        </div>
                        <ol className={`grid grid-cols-4 gap-[.5rem] lg:order-3 ${itemSelected.length > 1 ? 'lg:items-center' : 'lg:justify-start'} lg:gap-[.5rem] lg:grid-cols-3 pt-2`}>
                            {selected.map((item, index) => (
                                <ItemCard maxItem={maxItem} setIsOpen={setIsOpen} itemSelected={itemSelected} setItemSelected={setItemSelected} bundleDiscount={bundleDiscount} key={`sidebar--item-${index}`} item={item} placeholder={item.placeholder} store={store} index={index} isLast={index === selected.length - 1} />
                            ))}
                        </ol>
                        {variantSelected.length >= minItem && (
                            <div className="flex-wrap lg:justify-center items-center my-2 flex lg:order-4 lg:mt-2 lg:mb-0">
                                {itemsReduced > 0 && <span className="line-through text-lg mr-[.5rem] text-gray-600 opacity-[.5]">{formatMoney(origPrice, false, store)}</span>}
                                <span className="text-lg mr-[.5rem] font-bold">{formatMoney(itemsReduced, false, store)}</span>
                                <span className="text-sm font-bold py-[.25rem] px-[.75rem] bg-primary-light rounded-[.5rem]">{bundleDiscount}% OFF</span>
                            </div>
                        )}
                        <Button onClick={processCheckout} disabled={variantSelected.length < minItem || variantSelected.length > maxItem || processing} buttonClass={`mt-2 rounded-none border-primary bg-primary text-white w-full flex ${processing ? 'min-h-[50px]' : ''} justify-center items-center lg:block px-g font-normal lg:font-bold btn--sidebar lg:order-6`}>
                            {processing && <span className="spinner-border spinner-border-sm text-white !w-[18px] !h-[18px] lg:!w-[1rem] lg:!h-[1rem]" role="status" />}
                            {!processing && (
                                <>
                                    <span className="btn--sidebar-label">
                                        {/* {`${variantSelected.length >= 2 ? 'Add to Cart' : `${variantSelected.length}/${bundleSize} Selected`}`} */}
                                        {variantSelected.length >= 2 && 'Add Bundle to Cart'}
                                        {variantSelected.length < 2 && (<>
                                            <span className="hidden lg:inline">Add to Cart</span>
                                            <span className="lg:hidden">Add Bundle to Cart</span>
                                        </>)}
                                    </span>
                                    <span className="btn--sidebar-atc">Add Bundle to Cart</span>
                                    {/* <ul className="flex lg:hidden">
                                        <li>{itemsReduced > 0 && <span className="line-through mr-[.5rem] font-normal">{formatMoney(origPrice, false, store)}</span>}</li>
                                        <li><span className="">{formatMoney(itemsReduced, false, store)}</span></li>
                                    </ul> */}
                                </>
                            )}
                        </Button>
                        <div className="flex mt-2 lg:order-7">
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