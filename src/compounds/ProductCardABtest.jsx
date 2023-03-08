import { Col } from "react-bootstrap";

const ProductCardABtest = (props) => {
	return (
        <Col md={3} className={`${props.hideMobile ? 'd-none d-lg-flex' : 'd-flex'} flex-column col-6 product-card product-card-abtest mb-2`}>
            <a href="#" aria-label="Product link">
                <picture>
                    <source srcSet={props.srcSet} />
                    <img src={props.src} className="w-100" alt="Image Alt" />
                </picture>
            </a>
            <div className="d-flex mb-1"></div>
            <div className="pt-1 pb-0 position-relative flex-grow-1 d-flex flex-column">
                <p className="product-card__title flex-grow-1 d-flex flex-column h-100 fw-normal mb-1">
                    <span className="text-dark font-size-sm font-size-dt-base mb-25">{props.subtitle}</span>
                    <a href="#" className="text-dark h4 fw-bold text-decoration-none">{props.title}</a>
                </p>
                <p className="mb-1">
                    <span className="text-primary me-1">{props.price}</span>
                    {props.compare_price &&
                        <span className="text-linethrough text-muted ">{props.compare_price}</span>
                    }
                </p>

                {props.swatch_style &&
                    <div>
                        <button type="button" className="btn btn-lg btn-primary btn-choose btn-block px-0 w-100">Choose Style</button>
                        <div className="swatch-overlay flex-column align-items-center justify-content-end w-100 pb-0 position-absolute">
                            <div className="text-center w-100 pt-2 pb-lg-2">
                                <label className="mb-2"><strong>Style: </strong><span data-swatch-label>Girl Print: Limited edition!</span></label>
                                <ul className="list-unstyled product-variant-swatch d-flex justify-content-center">
                                    <li className="product-variant-swatch__item available active col-3 p-0" data-available="available">
                                        <span data-id="32068891607075" data-val="Girl Print"
                                            className="d-block border-primary mx-auto  variant-swatch girl-print"></span>
                                    </li>
                                    <li className="product-variant-swatch__item available col-3 p-0" data-available="available">
                                        <span data-id="32068891639843" data-val="Print Leaf"
                                            className="d-block mx-auto  variant-swatch leaf-print"></span>
                                    </li>
                                </ul>
                            </div>
                            <button type="button" className="btn btn-lg btn-primary add-to-cart btn-block px-0 w-100">
                                Add To Cart
                            </button>
                        </div>
                    </div>
                }
                {props.swatch_shade &&
                    <div>
                        <button type="button" className="btn btn-lg btn-primary btn-choose btn-block px-0 w-100">Choose Shade</button>
                        <div className="swatch-overlay flex-column align-items-center justify-content-end w-100 pb-0 position-absolute">
                            <div className="text-center w-100 pt-2 pb-lg-2">
                                <label className="mb-2"><strong>Shade: </strong><span data-swatch-label>Dark</span></label>
                                <ul className="list-unstyled product-variant-swatch d-flex justify-content-center">
                                    <li className="product-variant-swatch__item available col-3 p-0" data-available="available">
                                        <span data-id="32068891541539" data-val="Medium" className="d-block variant-swatch medium"></span>
                                    </li>
                                    <li className="product-variant-swatch__item available active col-3 p-0" data-available="available">
                                        <span data-id="32068891607075" data-val="Dark"
                                            className="d-block border-primary mx-auto variant-swatch dark"></span>
                                    </li>
                                    <li className="product-variant-swatch__item available col-3 p-0" data-available="available">
                                        <span data-id="32068891639843" data-val="Ultra Dark"
                                            className="d-block mx-auto  variant-swatch ultra-dark"></span>
                                    </li>
                                </ul>
                            </div>
                            <button type="button" className="btn btn-lg btn-primary btn-block add-to-cart w-100">
                                Add To Cart
                            </button>
                        </div>
                    </div>
                }
                {props.cart_btn &&
                    <button type="button" className="btn btn-lg btn-primary add-to-cart btn-block px-0">
                        Add To Cart
                    </button>
                   
                }
            </div>
        </Col>
	);
};

export default ProductCardABtest;
