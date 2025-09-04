
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
                <div className='flex flex-wrap pl-[0] pr-[0] lg:pl-[30px] lg:pr-[30px] max-w-[440px]'>
                    <h3 className='mb-[4px] lg:mb-[16px] '>{data?.product_title}</h3>
                    <a href={`/products/${props?.productHandle}#write-a-review`} className="text-sm w-full block" aria-label="Write a review for this product">
                        <ReviewStar score="5" className={`flex`} />
                    </a>
                    <p className='mt-[16px] mb-[16px] lg:mt-[40px] lg:mb-[40px]'>{data?.description}</p>
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