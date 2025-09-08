import SvgFull from '~/images/icons/star-full.svg';
import { Button } from "../components";

const ProductCardLoading = (props) => {
    return (
        <div key={props.keyName} className={`${props.className} lg:hidden`}>
            <a className="rounded-t product-card--img block">
                <picture className={`!pt-2 embed-responsive before:pt-[100%] block relative rounded-t bg-shimmer bg-pink-light`}>
                    <img className="embed-responsive-item fit--cover !max-w-[108%] !w-[108%] !h-[108%] !top-[-4%] !left-[-4%] !right-auto rounded-t !pt-2" />
                </picture>
            </a>
            <div className={`pt-2 pb-0 px-1 lg:px-1 relative grow flex flex-col rounded-b`}>
                <div className="review-stars__number flex justify-center mb-1">
                    <div className={`flex items-center bg-shimmer min-w-[120px] w-full`}>
                        <a href={`/products`} className="">
                            <SvgFull role="presentation" className={`svg hidden`} />
                        </a>
                        <a href={`/products/${props?.productHandle}?write-a-review=true`} className='h-100 before:pt-[15px]'>
                            <span className="ml-25 lg:hidden text-[#a3a3a3]"></span>
                            <span className="ml-25 text-body"></span>
                        </a>
                    </div>
                </div>
                <p className='product-title__text grow flex flex-col justify-center h-100 text-lg mb-1 px-0 lg:px-0 bg-shimmer before:pt-[15px]'></p>
                <Button buttonClass={`pt-[30.77px] bg-shimmer product-card-btn border border-[transparent] lg:border-0 flex rounded-full mb-1 sm:px-0`} />
            </div>
        </div>
    )
}

export default ProductCardLoading;