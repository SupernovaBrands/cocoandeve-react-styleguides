// import Link from "next/link";
import { Button } from "../components";
import { useRef, useState } from "react";

const WaitlistButton = (props: any) => {
    return (
        <Button buttonClass={`${props.className ?? ''} btn-primary border-0 w-full max-w-[calc(13.5em+2px)] px-2`} onClick={props.onClick}>
            <span className='text-center'>
                Waitlist Me
            </span>
        </Button>
    );
};

const AddToCartButton = (props: any) => {
    let label = props.label ? props.label : 'Add To Cart';
    label = !['us'].includes(props.store) ? label.replace('Color', 'Colour') : label;

    const [addingItem, setAddingItem] = useState(false);
    const onAddItem = async () => {
        if (typeof props.onClick === 'function') {
            setAddingItem(true);
            await props.onClick({ item: props.variantId, quantity: 1, title: props.title, handle: props.handle });
            setAddingItem(false);
        }
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
    const swatchLabel = useRef(null);

    const changeSwatch = (item:any, e: any) => {
        setSelectedSwatch(item);
        props.onChangeSwatch(item);
        const targetText = e.target.getAttribute('data-val');
        if (swatchLabel) swatchLabel.current.textContent = targetText;
    }

    return (
        <>
            <AddToCartButton comparePrice={props.comparePrice} price={props.price} available={true} store={store} className="btn-choose" label={props.swatch.label} title={props.title || ''}/>
            <div className="swatch-overlay flex-col items-center justify-end pb-0 absolute bg-white px-0 border border-primary rounded">
                <div className="text-center w-full pt-2 lg:pb-2 pb-2 lg:px-1">
                    <label className="block mb-2 px-1">
                        {props.swatch.title && <strong>{props.swatch.title.replace('Tangle Tamer', 'Type')}: </strong>}
                        <span ref={swatchLabel} data-swatch-label>{props.swatch.data[0]?.label}</span>
                    </label>
                    <ul className="list-unstyled product-variant-swatch flex justify-center">
                        {props.swatch.data.length > 0 && props.swatch.data.map((item:any, i:number) => (
                            <li key={item.id} className={`w-1/4 product-variant-swatch__item ${item.available ? 'available' : ''} ${selectedSwatch.id === item.id ? 'active' : ''}`} data-available={item.available ? 'available': ''}>
                                <span onClick={(e) => changeSwatch(item, e)} data-id={item.id} data-val={item.label} className={`before:m-[1px] block variant-swatch mx-auto ${ selectedSwatch.id === item.id ? 'border border-primary' : ''} ${item.value} ${item.available ? '' : 'oos'}`}></span>
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

const LaunchButton = (props: any) => {
    const handleLaunchWaitlist = (e) => {
        e.preventDefault();
        const data = {
            open: true,
            handle: props.product.handle,
            variantId: props.product.id,
            tags: props.product.tags,
            productId: props.product.productId,
        }
        if (props.launchBox === 1) {
            props.setLaunchWLModal(data);
        } else if (props.launchBox === 2) {
            props.setLaunchWLModal2(data);
        } else if (props.launchBox === 3) {
            props.setLaunchWLModal3(data);
        }
    };
    return (
        <Button type="button" buttonClass={`${props.className ?? ''} btn-primary border-0 sm:w-[164px] md:w-[216px] px-2 py-g`} onClick={handleLaunchWaitlist}>
            Waitlist Me
        </Button>
    )
}

const ProductCardSideUpsell = (props:any) => {
    const { store, item: { image, title, handle, price, comparePrice }, waitlistData, setWaitlistData, isLaunchWL, launchBox, setLaunchWLModal, setLaunchWLModal2, setLaunchWLModal3 } = props;
    const featuredImage = image || 'https://cdn.shopify.com/s/files/1/0286/1327/9779/products/MasqueTravelSize_614x614.jpg?v=1644810671'

    const [activePrice, setPrice] = useState(price);
    const [activeComparePrice, setComparePrice] = useState(comparePrice);

    const onChangeSwatch = (item:any) => {
        setPrice(item.price);
        setComparePrice(item.comparePrice);
    }

    return (
        <>
            <div className={`${props.index === 0 ? 'mr-hg' : 'mx-hg'} ${props.index} lg:min-w-0 ${props.item.active} product-card grow product-upsell-2 flex-[0_0_165px]`}>
                <div className={`w-[165px] mr-0  item-third lg:pl-0 flex grow flex-col bg-pink-light text-body relative h-full no-underline hover:no-underline hover:text-black`}>
                    {props.item.step && <span className="rounded p-25 top-[0.83333em] left-[2.08333em] bg-white absolute z-10 font-normal font-size-sm product-card__tag text-black">{props.item.step}</span> }
                    <a href={`/products/${handle}`} className="no-underline hover:no-underline text-black hover:text-black">
                        <picture className="block relative w-full ratio ratio-1x1 mx-auto my-0 lg:mx-0 max-w-[9.0625em] lg:max-w-none">
                            <source srcSet={featuredImage.replace('public', '520x')} media="(min-width: 992px)" />
                            <img className="object-cover absolute w-[107.5%] h-[107.5%] -left-[1px] lg:left-0 lg:w-[108%] lg:h-[108%] -top-[3.8%] bg-pink-light align-middle" alt={`upsell ${title}`} src={featuredImage.replace('public', '592x')} />
                        </picture>
                    </a>
                    <div className="product-card__content pb-2 relative grow flex flex-col px-[10px] lg:px-2 lg:px-3 bg-pink-light items-center h-full min-h-[18.75em] lg:min-h-0">
                        <p className="product-card__title font-bold text-center text-black h4 w-full min-h-[2.5em] mb-1">
                            <a href={`/products/${handle}`} className="no-underline hover:no-underline text-black hover:text-black font-bold lg:text-lg">{props.item.title}</a>
                        </p>
                        <p className="text-center flex flex-row grow justify-center items-end mb-[1rem]">
                                {activeComparePrice &&
                                    <span className="line-through h4 m-1">{activeComparePrice}</span>
                                }
                                <span className="text-primary h4 my-1">{activePrice}</span>
                        </p>
                        {!isLaunchWL && !props.item.swatch && props.item.available && (
                            <AddToCartButton {...props.item} store={store} onClick={props.item.onAddItem} variantId={props.item.id} title={props.title || ''}/>
                        )}

                        {!isLaunchWL && !props.item.swatch && !props.item.available &&
                            <WaitlistButton onClick={() => setWaitlistData({ ...waitlistData, open: true, title: title, image: image, handle: handle })}/> }

                        {!isLaunchWL && props.item.swatch &&
                            <SwatchOverlay setWaitlistData={setWaitlistData} store={store} waitlistData={waitlistData} onChangeSwatch={onChangeSwatch} {...props.item} onClick={props.item.onAddItem}/>
                        }
                        {isLaunchWL && (
                            <LaunchButton product={props.item} launchBox={launchBox} setLaunchWLModal={setLaunchWLModal} setLaunchWLModal2={setLaunchWLModal2} setLaunchWLModal3={setLaunchWLModal3} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCardSideUpsell;
