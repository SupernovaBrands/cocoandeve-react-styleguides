const ProductCardUpsell = (props) => {
    return (
        <div className={`col-12 col-lg-4 carousel-item ${props.item.active} awais-test product-card flex-grow-1`}>
            <a href="#" className="item-third ps-lg-0 d-flex flex-grow-1 flex-column bg-pink-light text-body position-relative">
                <span className="badge badge--square bg-white position-absolute fw-normal font-size-sm product-card__tag text-black">{props.item.step}</span>
                <picture className="ratio ratio-6x7 mx-auto my-0 mx-lg-0">
                    <source srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/products/MasqueTravelSize_614x614.jpg?v=1644810671" media="(min-width: 992px)" />
                    <img className="embed-responsive-item px-3 bg-pink-light" alt="Image Alt" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/products/MasqueTravelSize_614x614.jpg?v=1644810671" />
                </picture>
                <div className="product-card__content pb-0 position-relative flex-grow-1 d-flex flex-column px-2 px-lg-3 bg-pink-light">
                    <p className="product-card__title fw-bold text-center text-dark h4">{props.item.title}</p>
                    <p className="product-card__desc text-center fw-normal d-flex flex-column">{props.item.text}</p>
                    <p className="text-center d-flex flex-row flex-grow-1 justify-content-center align-items-end">
                        {props.item.compare_price &&
                            <span className="text-linethrough h4 m-1">{props.item.compare_price}</span>
                        }
                        <span className="text-primary h4 my-1">{props.item.price}</span>
                    </p>
                    {props.item.swatch_shade ? (
                        <>
                            <button type="button" className="product-card__button w-100 mx-auto btn btn-lg btn-primary mb-2 btn-block px-0 btn-choose">Choose Shade</button>
                            <div className="swatch-overlay flex-column align-items-center justify-content-end w-100 pb-0 position-absolute mx-auto mb-2 h-auto">
                                <div className="text-center w-100 pt-2 pb-lg-2">
                                    <label className="mb-2"><strong>Shade: </strong><span data-swatch-label>Dark</span></label>
                                    <ul className="list-unstyled product-variant-swatch d-flex justify-content-center mb-1 mb-lg-1">
                                        <li className="product-variant-swatch__item available col-3 p-0 " data-available="available">
                                            <span data-id="32068891541539" data-val="Medium" className="mx-auto d-block variant-swatch medium oos"></span>
                                        </li>
                                        <li className="product-variant-swatch__item available active col-3 p-0 " data-available="available">
                                            <span data-id="32068891607075" data-val="Dark" className="d-block border-primary mx-auto variant-swatch dark"></span>
                                        </li>
                                        <li className="product-variant-swatch__item available col-3 p-0 " data-available="available">
                                            <span data-id="32068891639843" data-val="Ultra Dark" className="d-block mx-auto variant-swatch ultra-dark"></span>
                                        </li>
                                    </ul>
                                </div>
                                <button type="button" className="product-card__button w-100 mx-auto btn btn-lg btn-primary btn-block add-to-cart px-0">
                                    Add To Cart
                                </button>
                            </div>
                        </>
                    ) : (
                    <button type="button" className="product-card__button w-100 mx-auto btn btn-lg add-to-cart btn-block px-0 mb-2 btn-primary">
                        Add To Cart
                    </button>
                    )}
                </div>
            </a>
            <div className="item-third ps-lg-0 d-flex d-lg-none flex-grow-1 flex-column bg-pink-light position-relative">
                <span className="badge badge--square bg-white position-absolute fw-normal font-size-sm product-card__tag text-black">{props.item.nextStep}</span>
                <picture className="ratio ratio-6x7 mx-auto my-0 mx-lg-0">
                    <source srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/products/MasqueTravelSize_614x614.jpg?v=1644810671" media="(min-width: 992px)" />
                    <img className="embed-responsive-item px-3 bg-pink-light" alt="Image Alt" src="https://cdn.shopify.com/s/files/1/0286/1327/9779/products/MasqueTravelSize_614x614.jpg?v=1644810671" />
                </picture>
                <div className="product-card__content pb-0 position-relative flex-grow-1 d-flex flex-column px-2 px-lg-3 bg-pink-light">
                    <p className="product-card__title fw-bold text-center text-dark h4">{props.item.nexttitle}</p>
                    <p className="product-card__desc text-center fw-normal d-flex flex-column">{props.item.nexttext}</p>
                    <p className="text-center d-flex flex-row flex-grow-1 justify-content-center align-items-end">
                        {props.item.compare_price &&
                            <span className="text-linethrough h4 m-1">{props.item.compare_price}</span>
                        }
                        <span className="text-primary h4 my-1">{props.item.price}</span>
                    </p>
                    <button type="button" className="product-card__button w-100 mx-auto btn btn-lg add-to-cart btn-block px-0 btn-primary mb-2 text-primary">
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCardUpsell;
