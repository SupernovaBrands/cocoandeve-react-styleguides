
import { useEffect, useState } from 'react';
import ProductBannerSlider from './ProductBannerSlider';
import ReviewStar from '~/components/review-star';

const PageReviewCard = (props:any) => {
    const { data } = props;
    
    useEffect(() => {
        const { data } = props;
        console.log('111', data);
    }, []);
    return (
        <div key={props.keyName} className='review-comparision-card px-hg flex lg:w-[100%] lg:basis-[100%] w-[90%] basis-[90%] relative flex-grow-0 flex-shrink-0'>
            <div className='flex w-[100%] basis-[100%] bg-gray-400 rounded-[32px]  flex-col-reverse lg:flex-row relative mb-0 lg:mb-0 flex-grow-0 flex-shrink-0  pl-[16px] pr-[16px] pt-[16px] lg:pt-0 lg:px-g text-center'>
                <div className='review-comparision-card__content w-[100%] lg:w-1/2 text-left align-items-center justify-center flex pt-[16px] lg:pt-[60px] pb-[16px] lg:pb-[60px] grow'>
                    <div className='flex content-start flex-wrap pl-[0] pr-[0] lg:pl-[20px] lg:pr-[0px] max-w-[440px]'>
                        <h3 className='grow-0 flex mb-[4px] lg:mb-[16px] lg:text-[20px]'>{data?.author}</h3>
                        <a href={`/products/${props?.productHandle}#write-a-review`} className=" grow-0 flex text-sm w-full block" aria-label="Write a review for this product">
                            <ReviewStar score="5" className={`flex grow-0`} />
                        </a>
                        <p className='flex mt-[16px] mb-[16px] lg:mt-[40px] lg:mb-[40px] lg:text-[20px] lg:leading-[25px] grow'>{data?.description}</p>
                        {/* <p>- {data?.author}</p> */}
                    </div>
                </div>
                <div className='review-comparision-card__image  w-[100%] lg:w-1/2'>
                    <picture className={`block w-full overflow-hidden`}>
                        <source
                            srcSet={data?.image?.url}
                            media="(min-width: 992px)" width="1362" height="1162"/>
                        <img
                            src={data?.image?.url}
                            className={`${props.imageClasses ?? ''} h-full w-full rounded-[32px]`} loading="lazy" height="357" width="414" alt={"Product banner and comparison image"} />
                    </picture>
                </div>
            </div>
        </div>
    );
}

export default PageReviewCard;