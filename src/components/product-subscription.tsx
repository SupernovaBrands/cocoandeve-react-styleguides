import CheckBox from './CheckBox';
import Help from '../../src/images/icons/help.svg';

const ProductSubscription = (props) => {

    return (
        <div className="sm:-mx-2 lg:-mx-0 no-gutters__in-container items-center px-2 mb-2 media flex product-subscription lg:rounded-sm">
            <div className="media-body ml-0 lg:pl-1">
                <span className="text-primary">Save 20% off + free shipping</span><br />when you subscribe!
                <div className="input-group w-full flex justify-left px-0 lg:px-0">
                    <CheckBox labelClass="flex justify-left my-1 relative pl-3" label={`I want to subscribe`} id="subscribe" checked={false}/>

                    {/* <div className="custom-control custom-checkbox custom-checkbox--subscription flex w-full mt-1 items-center">
                        <input type="checkbox" name="subscription" className="custom-control-input" id="subscriptionCheckbox0" />
                        <label className="custom-control-label font-bold" aria-label="Product Subscription" htmlFor="subscriptionCheckbox">I want to subscribe!</label>
                        <a className="text-primary ml-1 inline-flex" data-offset-lg="110" data-offset="0" data-container="body" data-toggle="popover" data-placement="top" data-placement-md="right" data-content="Never run out of your hair must-haves, with free shipping on top of that.<br/><br/>Cancel anytime with no hassle! ❤️" data-html="true">
                            <Help className="svg fill-primary" />
                        </a>
                    </div> */}
                </div>
            </div>
            <picture className="block ml-1">
                <source srcSet="https://via.placeholder.com/154x110/EFADBA" media="(min-width: 992px)" />
                <img src="https://via.placeholder.com/104x110/EFADBA" alt="Placeholder" />
            </picture>
        </div>
    );
};

export default ProductSubscription;
