import Link from "next/link";
import { Button } from "../components";
import { useState } from "react";

const WaitlistButton = (props: any) => {
    return (
        <Button buttonClass={`${props.className ?? ''} btn-primary border-0 w-full px-2`} onClick={props.onClick}>
            <span className='text-center'>
                Waitlist Me
            </span>
        </Button>
    );
};

const AddToCartButton = (props: any) => {
    let label = props.label ? props.label : 'Add To Cart';
    label = ['dev', 'us'].includes(props.store) ? label.replace('Color', 'Colour') : label;

    const [addingItem, setAddingItem] = useState(false);
    const onAddItem = async () => {
        setAddingItem(true);
        await props.onClick({ item: props.variantId, quantity: 1, title: props.title, handle: props.handle });
        setAddingItem(false);
    };

    return (
        <Button disabled={!props.available} buttonClass={`${props.className ?? ''} btn-primary border-0 sm:w-[164px] md:w-[216px] px-2 py-g`} onClick={onAddItem}>
            { !addingItem && <span className='text-center'>
                {props.available ? label : 'Out of Stock'}
            </span> }
            { addingItem && <span className="spinner-border spinner-border-sm text-white ml-1 !w-[15px] !h-[15px]" role="status" /> }
        </Button>
    );
};

const SwatchOverlay = (props:any) => {
    const availableSwatch = props.swatch.data.find((d:any) => d.available) || props.swatch.data[0];
    const [selectedSwatch, setSelectedSwatch] = useState(availableSwatch)
    const { waitlistData, setWaitlistData, item } = props;
    const { image, title, handle, store } = props;

    const changeSwatch = (item:any) => {
        setSelectedSwatch(item);
        props.onChangeSwatch(item);
    }

    return (
        <>
            <AddToCartButton comparePrice={props.comparePrice} price={props.price} available={true} store={store} className="btn-choose" label={props.swatch.label === 'Choose Tangle Tamer' ? 'Add To Cart' : props.swatch.label} title={props.title || ''}/>
            <div className="swatch-overlay flex-col items-center justify-end pb-0 absolute bg-white px-0 border border-primary rounded">
                <div className="text-center w-full pt-2 lg:pb-2 pb-2 lg:px-1">
                    <label className="block mb-2 px-1">
                        {props.swatch.title && <strong>{props.swatch.title}: </strong>}
                        <span data-swatch-label>{props.swatch.data[0]?.label}</span>
                    </label>
                    <ul className="list-unstyled product-variant-swatch flex justify-center">
                        {props.swatch.data.length > 0 && props.swatch.data.map((item:any, i:number) => (
                            <li key={item.id} onClick={() => changeSwatch(item)} className={`w-1/4 product-variant-swatch__item ${item.available ? 'available' : ''} ${selectedSwatch.id === item.id ? 'active' : ''}`} data-available={item.available ? 'available': ''}>
                                <span data-id={item.id} data-val={item.label} className={`before:m-[1px] block variant-swatch mx-auto ${ selectedSwatch.id === item.id ? 'border border-primary' : ''} ${item.value} ${item.available ? '' : 'oos'}`}></span>
                            </li>
                        ))}
                    </ul>
                </div>
                { selectedSwatch.available && <AddToCartButton comparePrice={props.comparePrice} price={props.price} store={store} className="button-overlay z-[1]" available={selectedSwatch.available} variantId={selectedSwatch.id} onClick={props.onClick} title={props.title || ''}/> }
                { !selectedSwatch.available && <WaitlistButton onClick={() => setWaitlistData({ ...waitlistData, open: true, title: title, image: image, handle: handle })}/> }
            </div>
        </>
    );
};

const ProductCardUpsell = (props:any) => {
    const { store, item: { image, title, handle, price, comparePrice }, waitlistData, setWaitlistData } = props;
    const featuredImage = image || 'https://cdn.shopify.com/s/files/1/0286/1327/9779/products/MasqueTravelSize_614x614.jpg?v=1644810671'

    const [activePrice, setPrice] = useState(price);
    const [activeComparePrice, setComparePrice] = useState(comparePrice);

    const onChangeSwatch = (item:any) => {
        setPrice(item.price);
        setComparePrice(item.comparePrice);
    }

    return (
        <>
            <div className={`min-w-[80%] md:min-w-[30%] lg:w-4/12 ${props.item.active} product-card grow px-hg lg:px-g product-upsell-2`}>
                <div className="item-third lg:pl-0 flex grow flex-col bg-pink-light text-body relative h-full no-underline hover:no-underline hover:text-black">
                    {props.item.step && <span className="rounded p-25 top-[0.83333em] left-[2.08333em] bg-white absolute z-10 font-normal font-size-sm product-card__tag text-black">{props.item.step}</span> }
                    <picture className="block relative w-full ratio ratio-1x1 mx-auto my-0 lg:mx-0">
                        <source srcSet={featuredImage} media="(min-width: 992px)" />
                        <Link href={`/products/${handle}`} className="no-underline hover:no-underline text-black hover:text-black">
                            <img className="object-cover absolute w-full h-full top-0 bottom-0 left-0 bg-pink-light align-middle" alt={`upsell ${title}`} src={featuredImage} />
                        </Link>
                    </picture>
                    <div className="product-card__content pb-2 relative grow flex flex-col px-hg lg:px-2 lg:px-3 bg-pink-light items-center h-full min-h-[18.75em] lg:min-h-0">
                        <p className="product-card__title font-bold text-center text-black h4 w-full min-h-[2.5em] mb-1">
                            <Link href={`/products/${handle}`} className="no-underline hover:no-underline text-black hover:text-black font-bold lg:text-lg">{props.item.title}</Link>
                        </p>
                        <p className="product-card__desc text-center font-normal flex flex-col mb-[1rem]">
                            <Link href={`/products/${handle}`} className="no-underline hover:no-underline text-black hover:text-black">{props.item.text}</Link>
                        </p>
                        <p className="text-center flex flex-row grow justify-center items-end mb-[1rem]">
                                {activeComparePrice &&
                                    <span className="line-through h4 m-1">{activeComparePrice}</span>
                                }
                                <span className="text-primary h4 my-1">{activePrice}</span>
                        </p>
                        {!props.item.swatch && props.item.available && (
                            <AddToCartButton {...props.item} store={store} onClick={props.item.onAddItem} variantId={props.item.id} title={props.title || ''}/>
                        )}

                        {!props.item.swatch && !props.item.available &&
                            <WaitlistButton onClick={() => setWaitlistData({ ...waitlistData, open: true, title: title, image: image, handle: handle })}/> }

                        {props.item.swatch &&
                            <SwatchOverlay setWaitlistData={setWaitlistData} store={store} waitlistData={waitlistData} onChangeSwatch={onChangeSwatch} {...props.item} onClick={props.item.onAddItem}/>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCardUpsell;
