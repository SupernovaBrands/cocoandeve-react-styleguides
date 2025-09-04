
import { useEffect, useState } from 'react';
import ProductBannerSlider from './ProductBannerSlider';
import ReviewStar from '~/components/review-star';

const PageReviewCard = (props:any) => {
    const { data } = props;
    const [comparisonImages, setComparisonImages] = useState(null);
    
    useEffect(() => {
        if (data) {
            const { first_image, second_image } = data;
            if (first_image?.url && second_image?.url) {
                setComparisonImages({ first_image, second_image });
            }
        }
    }, []);
    return (
        <div key={props.keyName} className='bg-gray-400 rounded-[32px] review-comparision-card flex-col-reverse lg:flex-row relative mb-0 lg:mb-0 flex-grow-0 flex-shrink-0 flex lg:w-[100%] lg:basis-[100%] w-[90%] basis-[90%] pl-[16px] pr-[16px] pt-[16px] lg:pt-0 lg:px-g text-center'>
            <div className='review-comparision-card__content w-[100%] lg:w-1/2 text-left align-items-center justify-center flex pt-[16px] lg:pt-[60px] pb-[16px] lg:pb-[60px]'>
                <div className='flex flex-wrap pl-[0] pr-[0] lg:pl-[20px] lg:pr-[0px] max-w-[440px]'>
                    <svg className='absolute left-[50px] top-[17px] hidden lg:block' xmlns="http://www.w3.org/2000/svg" width="53" height="40" fill="none"><g clip-path="url(#a)" opacity=".3"><path fill="#F0BCC8" d="m21.36.485 7.212 4.182c-2.243 3.151-3.758 5.333-4.546 6.545-.788 1.273-2 3.455-3.636 6.727-1.576 3.212-2.728 6.546-3.394 9.94-.667 3.454-1.03 7.272-1.03 11.576H.693c0-7.455 2.363-14.97 7.03-22.485C12.45 9.515 16.935 4 21.36.485Zm22.848 0 7.212 4.182c-2.242 3.151-3.758 5.333-4.545 6.545-.788 1.273-2 3.455-3.637 6.727-1.636 3.212-2.727 6.546-3.394 10-.666 3.455-1.03 7.273-1.03 11.576H23.602c0-7.515 2.363-15.03 7.03-22.485C35.3 9.515 39.844 4 44.208.485Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.026 0h52.121v40H.027z"/></clipPath></defs></svg>
                    <h3 className='mb-[4px] lg:mb-[16px] lg:text-[20px]'>{data?.product_title}</h3>
                    <a href={`/products/${props?.productHandle}#write-a-review`} className="text-sm w-full block" aria-label="Write a review for this product">
                        <ReviewStar score="5" className={`flex`} />
                    </a>
                    <p className='mt-[16px] mb-[16px] lg:mt-[40px] lg:mb-[40px] lg:text-[20px] lg:leading-[25px]'>{data?.description}</p>
                    <p>- {data?.author}</p>
                </div>
            </div>
            <div className='review-comparision-card__image  w-[100%] lg:w-1/2'>
                {comparisonImages && (
                    <div className="product-banner__image w-full h-full">
                        <ProductBannerSlider {...comparisonImages} isPageReview={true} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default PageReviewCard;