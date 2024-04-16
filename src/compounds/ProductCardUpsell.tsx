const AddToCartButton = (props: any) => {
    const { className, label } = props;
    return (
        <button type="button" className={`${className ? className : 'mb-2'} w-[210px!important] max-width-[210px] flex sm:flex-col md:flex-row bg-primary hover:bg-primary-dark text-white text-base inline-block align-middle text-center select-none border font-bold whitespace-no-wrap rounded sm:py-1 lg:py-g leading-normal no-underline px-3`}>
            <span className="w-full block text-base text-center">{label ?? 'Add to Cart'}</span>
        </button>
    );
};

const SwatchOverlay = (props) => {
    return (
        <>
            <AddToCartButton comparePrice={props.comparePrice} price={props.price} className="btn-choose mb-2" label="Choose Scent"/>
            <div className="swatch-overlay w-[209px!important] flex-col items-center justify-end pb-0 absolute bg-white px-0 border border-primary rounded-t-lg bottom-[35px]">
                <div className="text-center w-full pt-2 lg:pb-2 pb-1 lg:px-1">
                    <label className="block mb-2">
                        {props.swatch.style && <strong>Style: </strong>}
                        {props.swatch.shade && <strong>Shade: </strong>}
                        <span data-swatch-label>{props.swatch.data[0].label}</span>
                    </label>
                    <ul className="list-unstyled product-variant-swatch flex justify-center">
                        {props.swatch.data.length > 0 && props.swatch.data.map((item, i) => (
                            <li key={item.id} className={`w-1/4 product-variant-swatch__item ${item.available ? 'available' : ''} ${i === 0 ? 'active' : ''}`} data-available={item.available ? 'available': ''}>
                                <span data-id={item.id} data-val={item.label} className={`before:m-[1px] block variant-swatch mx-auto ${ i === 0 ? 'border border-primary' : ''} ${item.value} ${item.available ? '' : 'oos'}`}></span>
                            </li>
                        ))}
                    </ul>
                </div>
                <AddToCartButton comparePrice={props.comparePrice} price={props.price} className="button-overlay z-[1] mb-0"/>
            </div>
        </>
    );
};

const ProductCardUpsell = (props) => {
    return (
        <div className={`sm:min-w-[310px] w-full lg:w-1/3 ${props.item.active} product-card grow px-1 lg:px-g`}>
            <div className="item-third lg:pl-0 flex grow flex-col bg-pink-light text-body relative h-full no-underline hover:no-underline hover:text-black">
                <span className="rounded p-25 top-[0.83333em] left-[2.08333em] bg-white absolute z-10 font-normal font-size-sm product-card__tag text-black">{props.item.step}</span>
                <picture className="block relative w-full ratio ratio-1x1 mx-auto my-0 lg:mx-0">
                    <source srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/products/MasqueTravelSize_614x614.jpg?v=1644810671" media="(min-width: 992px)" />
                    <a href="#" className="no-underline hover:no-underline text-black hover:text-black">
                        <img className="object-cover absolute w-full h-full top-0 bottom-0 left-0 px-3 bg-pink-light align-middle" alt="Image Alt" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/products/MasqueTravelSize_614x614.jpg?v=1644810671" />
                    </a>
                </picture>
                <div className="product-card__content pb-0 relative grow flex flex-col px-2 lg:px-3 bg-pink-light items-center h-full">
                    <p className="product-card__title font-bold text-center text-black h4 w-full min-h-[2.5em] mb-1">
                        <a href="#" className="no-underline hover:no-underline text-black hover:text-black font-bold lg:text-lg">{props.item.title}</a>
                    </p>
                    <p className="product-card__desc text-center font-normal flex flex-col mb-[1rem]">
                        <a href="#" className="no-underline hover:no-underline text-black hover:text-black">{props.item.text}</a>
                    </p>
                    <p className="text-center flex flex-row grow justify-center items-end mb-[1rem]">
                            {props.item.comparePrice &&
                                <span className="line-through h4 m-1">{props.item.comparePrice}</span>
                            }
                            <span className="text-primary h4 my-1">{props.item.price}</span>
                    </p>
                    {!props.item.swatch && (
                        <AddToCartButton comparePrice={props.item.comparePrice} price={props.item.price} />
                    )}

                    {props.item.swatch &&
                        <SwatchOverlay swatch={props.item.swatch} price={props.item.price} comparePrice={props.item.comparePrice}/>
                    }
                </div>
            </div>
            {/* <div className="item-third lg:pl-0 flex lg:hidden grow flex-col bg-pink-light relative h-full no-underline hover:no-underline hover:text-black">
                <span className="badge badge--square bg-white absolute font-normal font-size-sm product-card__tag text-black">{props.item.nextStep}</span>
                <picture className="ratio ratio-1x1 mx-auto my-0 lg:mx-0">
                    <source srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/products/MasqueTravelSize_614x614.jpg?v=1644810671" media="(min-width: 992px)" />
                    <img className="embed-responsive-item px-3 bg-pink-light" alt="Image Alt" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/products/MasqueTravelSize_614x614.jpg?v=1644810671" />
                </picture>
                <div className="product-card__content pb-0 relative grow flex flex-col px-2 lg:px-3 bg-pink-light">
                    <p className="product-card__title font-bold text-center text-black h4 w-full min-h-[2.5em] mb-1">{props.item.nexttitle}</p>
                    <p className="product-card__desc text-center font-normal flex flex-col">{props.item.nexttext}</p>
                    <p className="text-center flex flex-row grow justify-content-center items-end">
                        {props.item.comparePrice &&
                            <span className="line-through h4 m-1">{props.item.comparePrice}</span>
                        }
                        <span className="text-primary h4 my-1">{props.item.price}</span>
                    </p>
                    <button type="button" className="product-card__button w-full mx-auto btn btn-lg add-to-cart btn-block px-0 btn-primary mb-2 text-primary">
                        Add To Cart
                    </button>
                </div>
            </div> */}
        </div>
    );
};

export default ProductCardUpsell;
