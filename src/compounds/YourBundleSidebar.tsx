import PercentageSmall from '~/images/icons/percentage-small.svg';
import DeliverySmall from '~/images/icons/delivery-small.svg';
import ChevronUp from '~/images/icons/chevron-up.svg';
import { formatMoney, getCartId } from "~/modules/utils";
import { Button } from "../components";
import { useEffect, useState } from 'react';

const ItemCard = (props) => {
    const { item, placeholder, store, index, bundleDiscount, setItemSelected, itemSelected, setIsOpen } = props;
    const reducedPrice = item.price - (bundleDiscount / 100) * item.price;
    const editItem = (idx) => {
        const items = [...itemSelected];
        items.splice(idx, 1);
        setItemSelected(items);
        setIsOpen(false);
    };
    return (
        <li className={`flex mb-[1rem] ${placeholder ? 'opacity-[.5]' : ''}`}>
            <span className="inline-block font-bold mr-[.5rem] mt-[.5rem]">{index + 1}</span>
            <figure className="flex rounded-[1rem] bg-white p-[.5rem] w-full">
                {placeholder && <div className="w-[3rem] h-[3rem] rounded-[.5rem] bg-gray-400" />}
                {!placeholder && <img src={item.src} width={48} height={48} className="w-[3rem] h-[3rem] rounded-[.5rem]" />}
                <figcaption className="ml-[.5rem]">
                    <h4 className="font-bold text-sm leading-[normal] mb-[.25rem] mr-25">{item.title}</h4>
                    {!placeholder && (
                        <>
                            <div className="flex mb-[.25rem]">
                                <span className="line-through mr-1">{formatMoney(item.price, false, store)}</span>
                                <span className="font-bold">{formatMoney(reducedPrice, false, store)}</span>
                            </div>
                            <span onClick={() => editItem(index)} className="text-underline text-primary font-bold cursor-pointer">Edit</span>
                        </>
                    )}
                </figcaption>
            </figure>
        </li>
    )
};

const YourBundleSidebar = (props: any) => {
    const { bundleSize, bundleDiscount, itemSelected, store, setItemSelected, type, addToCart, strapiData, minItem, maxItem } = props;
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
        
        if (selected.length < minItem || selected.length > maxItem) return false;

        setProcessing(true);
        const groupId = Date.now();
        const varIds = selected.map(v => v.id.replace('gid://shopify/ProductVariant/', ''));
        const gIds = selected.map((v, idx, row) => {
            return {
                merchandiseId: v.id,
                attributes: [
                    { key: '_campaign_type', value: 'build_your_own_bundle' },
                    { key: '_make_your_own_kit', value: 'yes' },
                    { key: '_make_your_own_kit_removable', value: idx === 0 ? 'yes' : 'no' },
                    { key: '_make_your_own_kit_editable', value: 'no' },
                    { key: '_make_your_own_kit_type', value: type },
                    // { key: '_make_your_own_kit_ids', value: varIds.join(',') },
                    { key: '_make_your_own_kit_group', value: `${groupId}` },
                    // { key: '_make_your_own_kit_notes', value: `${bundleDiscount}% Discount - Bundle of ${row.length}`}
                ]
            }
        });

        console.log('gIds', gIds);
        
        const multipleAdd = await addToCart({
            id: null,
            quantity: 1,
            attributes: [],
            sellingPlanId: null,
            title: null,
            handle: null,
            bubble: true,
            updateCart: true,
            ids: gIds
        });

        console.log('multiple add', multipleAdd);

        if (multipleAdd) setItemSelected([]);
        setProcessing(false);
    };
    
    const variantSelected = selected.filter((sel) => sel.id !== null);
    const originalPrice = selected.filter(it => it.id !== null && it.price).reduce((n, { price }) => n + parseInt(price, 10), 0);
    const reducedPrice = originalPrice - (bundleDiscount / 100) * originalPrice;

    return (
        <aside className={`lg:ml-[25px] lg:sticky lg:top-[230px] ${isOpen ? 'before:content-[""] before:h-full before:w-full before:top-0 before:bottom-0 before:left-0 before:right-0 before:bg-black before:z-[9999] before:opacity-[.6] before:fixed lg:before:content-[none]' : ''}`}>
            <div className={`lg:bg-primary-light lg:py-4 lg:px-2 lg:rounded-[2rem] ${isOpen ? 'fixed bottom-0 right-0 left-0 z-[9999] flex flex-col justify-end h-full' : 'mb-[1rem] lg:mb-0'} lg:static`}>
                <div className={`flex bg-primary-light ${isOpen ? 'static rounded-t-[2rem] pt-4 pb-[1rem]' : 'pt-2 fixed pb-[2rem]'} left-0 right-0 bottom-0 justify-between px-2 z-[1] lg:static lg:p-0`}>
                    <p className="text-center lg:mb-[1rem] text-lg flex items-center lg:justify-center lg:w-full">
                        <span className="font-bold lg:block">{strapiData?.sidebar_title}</span>
                        <span className="ml-[.5rem] text-sm py-[.25rem] px-[.75rem] bg-white rounded-[.5rem] lg:hidden">{bundleDiscount}% OFF</span>
                    </p>
                    <div className="lg:hidden flex items-center text-primary font-bold" onClick={() => setIsOpen(!isOpen)}>
                        <span className="mr-[.5rem] inline-block">View</span>
                        <ChevronUp className={`w-g h-g svg--current-color ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                </div>
                <div className="flex-wrap justify-center mb-[1rem] items-center hidden lg:flex">
                    {reducedPrice > 0 && <span className="line-through text-lg mr-[.5rem] text-gray-600 opacity-[.5]">{formatMoney(originalPrice, false, store)}</span>}
                    <span className="text-lg mr-[.5rem] font-bold">{formatMoney(reducedPrice, false, store)}</span>
                    <span className="text-sm py-[.25rem] px-[.75rem] bg-white rounded-[.5rem]">{bundleDiscount}% OFF</span>
                </div>
                <div className={`${isOpen ? 'overflow-y-scroll lg:overflow-y-hidden' : 'hidden pt-[1rem]'} bg-primary-light px-2 lg:p-0 lg:block`}>
                    <div className="flex mb-2">
                        <PercentageSmall className="flex-[0_0_20px]" />
                        <p className="ml-[.5rem] text-sm">{strapiData?.sidebar_desc}</p>
                    </div>
                    <ol>
                        {selected.map((item, index) => (
                            <ItemCard setIsOpen={setIsOpen} itemSelected={itemSelected} setItemSelected={setItemSelected} bundleDiscount={bundleDiscount} key={`sidebar--item-${index}`} item={item} placeholder={item.placeholder} store={store} index={index} />
                        ))}
                    </ol>
                    <Button onClick={processCheckout} disabled={variantSelected.length !== bundleSize || processing} buttonClass={`mt-2 rounded-full border-primary bg-primary text-white w-full flex ${processing ? 'justify-center min-h-[50px]' : 'justify-between'} items-center lg:block px-g`}>
                        {processing && <span className="spinner-border spinner-border-sm text-white !w-[18px] !h-[18px] lg:!w-[1rem] lg:!h-[1rem]" role="status" />}
                        {!processing && (
                            <>
                                <span>{`${variantSelected.length}/${bundleSize} Selected`}</span>
                                <ul className="flex lg:hidden">
                                    <li>{reducedPrice > 0 && <span className="line-through mr-[.5rem] font-normal">{formatMoney(originalPrice, false, store)}</span>}</li>
                                    <li><span className="">{formatMoney(reducedPrice, false, store)}</span></li>
                                </ul>
                            </>
                        )}
                    </Button>
                    <div className="flex mt-2">
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
        </aside>            
    );
};

export default YourBundleSidebar;