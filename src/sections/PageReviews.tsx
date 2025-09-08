import { useEffect } from 'react';
import PageReviewCard from '~/compounds/PageReviewCard';

const PageReviews = (props: any) => {
    const { reviewsData } = props;

    useEffect(() => {
        console.log('reviewsData1', reviewsData);
    }, [])

    return <>
        {reviewsData && (
            <div className="lg:bg-gray-400 lg:pt-[60px] lg:pb-[60px]">
                <div className='page-reviews container pt-[30px] lg:pt-[0] px-g lg:px-0' >
                    <PageReviewCard data={reviewsData} />
                </div>
            </div>
        )}
    </>
}

export default PageReviews;