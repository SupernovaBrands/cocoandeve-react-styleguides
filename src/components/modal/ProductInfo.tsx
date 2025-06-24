import { Button } from "../../components";
import Close from '~/images/icons/close.svg';

const ProductInfo = (props: any) => {
    const { data, store, handleClose } = props;
    console.log('modal data', data);
    const onAddItem = () => {
        console.log('adding item from modal');
    };
    return (
        <div className="modal-content bg-white px-g pb-g pt-5 rounded-[.5rem] lg:p-4">
            <Close onClick={handleClose} className={`svg--current-color cursor-pointer close absolute font-size-sm w-[12px] h-[12px] top-[1rem] right-[1rem]`} />
            <div className="flex flex-wrap">
                <div className="w-full lg:w-1/2">
                    <img src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/9c6105b9-8b26-4fdf-9449-5da043f91400/public" className="w-full" />
                </div>
                <div className="w-full lg:w-1/2">
                    <h4>Sunny Honey Bali Bronzing Foam (200ml)</h4>
                    <p>Our best-selling self tan with a soft tanning mitt and kabuki brush for a perfect fuss-free application.</p>
                    <Button onClick={onAddItem} buttonClass={`h-[50px] block lg:inline-block w-full lg:w-auto product-card-btn border border-[transparent] lg:border-0 btn-sm md:text-base btn-primary rounded-full mb-[.75rem] sm:px-0 px-0 sm:flex-col sm:text-sm lg:justify-between lg:px-[2.8125rem] font-normal`}>
                        Add to Cart
                    </Button>
                    <p>Our best-selling self tan with a soft tanning mitt and kabuki brush for a perfect fuss-free application.</p>
                    <p>Our best-selling self tan with a soft tanning mitt and kabuki brush for a perfect fuss-free application.</p>
                    <p>Our best-selling self tan with a soft tanning mitt and kabuki brush for a perfect fuss-free application.</p>
                    <p>Our best-selling self tan with a soft tanning mitt and kabuki brush for a perfect fuss-free application.</p>
                    <p>Our best-selling self tan with a soft tanning mitt and kabuki brush for a perfect fuss-free application.</p>
                    <p>Our best-selling self tan with a soft tanning mitt and kabuki brush for a perfect fuss-free application.</p>
                    <p>Our best-selling self tan with a soft tanning mitt and kabuki brush for a perfect fuss-free application.</p>
                    <p>Our best-selling self tan with a soft tanning mitt and kabuki brush for a perfect fuss-free application.</p>
                    <p>Our best-selling self tan with a soft tanning mitt and kabuki brush for a perfect fuss-free application.</p>
                    <p>Our best-selling self tan with a soft tanning mitt and kabuki brush for a perfect fuss-free application.</p>
                    
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;