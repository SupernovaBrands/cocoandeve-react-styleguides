import Help from '../../src/images/icons/help.svg';

const ProductSubscription = (props) => {
    return (
        <div className="no-gutters__in-container align-items-center px-2 mb-2 media d-flex product-subscription">
            <div className="media-body me-g ps-lg-1">
                <span className="text-primary">Save 20% off + free shipping</span><br />when you subscribe!
                <div className="input-group col d-flex justify-content-center px-0 px-lg-g">
                    <div className="custom-control custom-checkbox custom-checkbox--subscription col d-flex mt-1 align-items-center">
                        <input type="checkbox" name="subscription" className="custom-control-input" id="subscriptionCheckbox0" />
                        <label className="custom-control-label fw-bold" aria-label="Product Subscription" htmlFor="subscriptionCheckbox">I want to subscribe!</label>
                        <a className="text-primary ms-1 d-inline-flex" data-offset-lg="110" data-offset="0" data-container="body" data-toggle="popover" data-placement="top" data-placement-md="right" data-content="Never run out of your hair must-haves, with free shipping on top of that.<br/><br/>Cancel anytime with no hassle! ❤️" data-html="true">
                            <Help className="svg fill-primary" />
                        </a>
                    </div>
                </div>
            </div>
            <picture className="d-block">
                <source srcSet="https://via.placeholder.com/154x110/EFADBA" media="(min-width: 992px)" />
                <img src="https://via.placeholder.com/104x110/EFADBA" alt="Placeholder" />
            </picture>
        </div>
    );
};

export default ProductSubscription;

