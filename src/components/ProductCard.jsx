import Search from '../../src/images/icons/new.svg';

const ProductCard = (props) => {
	return (
        <div>
            {props.icon &&
                <div className="circle-badge position-absolute rounded-circle bg-primary d-flex p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 447 207">
                        <text id="badge-tex-new" transform="translate(0 155)" fill="#fff" font-size="207" font-family="sofia-pro" className="font-weight-bold">
                        <tspan x="0" y="0">new!</tspan>
                        </text>
                    </svg>
                </div>
            }
            <picture>
                <source srcSet={props.srcSet} />
                <img src={props.src} className="w-100" alt="Image Alt" />
            </picture>
            <div className="pt-2 pb-0 position-relative px-2">
                <div className="d-flex justify-content-center">
                    <div className="react-yotpo-star" data-product-id="4543113265187"></div>
                </div>
                <p className="product-card__title d-flex flex-column justify-content-center h4 h-100 font-weight-normal">
                    <a href="#" className="text-dark">{props.title}</a>
                </p>
                <p className="text-center">
                    <span className="text-linethrough h4 m-1">${props.comparePrice}</span><span className="text-primary h4">${props.price}</span>
                </p>
                {props.style && 
                    <div>
                        <button type="button" className="btn btn-lg btn-primary btn-choose btn-block">Choose Style</button>
                        <div className="swatch-overlay flex-column align-items-center justify-content-end w-100 pb-0 px-2 position-absolute">
                            <div className="text-center w-100 py-2">
                                <label className="mb-2"><strong>Style: </strong><span data-swatch-label>Girl Print: Limited edition!</span></label>
                                <ul className="list-unstyled product-variant-swatch d-flex justify-content-center">
                                    <li className="product-variant-swatch__item available active col-3" data-available="available">
                                        <span data-id="32068891607075" data-val="Girl Print" className="d-block variant-swatch girl-print mx-auto border-primary"></span>
                                    </li>
                                    <li className="product-variant-swatch__item available col-3" data-available="available">
                                        <span data-id="32068891639843" data-val="Print Leaf" className="d-block variant-swatch leaf-print mx-auto"></span>
                                    </li>
                                </ul>
                            </div>
                            <button type="button" className="btn btn-lg btn-primary add-to-cart btn-block">
                                Add To Cart
                            </button>
                        </div>
                    </div>
                }
                {props.button && 
                <button type="button" className="btn btn-lg btn-primary add-to-cart btn-block">
                    Add To Cart
                </button>
                }
                {props.shade &&
                    <div>
                        <button type="button" className="btn btn-lg btn-primary btn-choose btn-block">Choose Shade</button>
                        <div className="swatch-overlay flex-column align-items-center justify-content-end w-100 pb-0 px-2 position-absolute">
                            <div className="text-center w-100 py-2">
                                <label className="mb-2"><strong>Shade: </strong><span data-swatch-label>Dark</span></label>
                                <ul className="list-unstyled product-variant-swatch d-flex justify-content-center">
                                    <li className="product-variant-swatch__item available col-3" data-available="available">
                                        <span data-id="32068891541539" data-val="Medium" className="d-block variant-swatch medium border-primary"></span>
                                    </li>
                                    <li className="product-variant-swatch__item available active col-3" data-available="available">
                                        <span data-id="32068891607075" data-val="Dark" className="d-block variant-swatch dark"></span>
                                    </li>
                                    <li className="product-variant-swatch__item available col-3" data-available="available">
                                        <span data-id="32068891639843" data-val="Ultra Dark" className="d-block variant-swatch ultra-dark"></span>
                                    </li>
                                </ul>
                            </div>
                            <button type="button" className="btn btn-lg btn-primary btn-block add-to-cart">
                                Add To Cart
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
	);
};

export default ProductCard;
