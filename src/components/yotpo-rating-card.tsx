import ReviewStar from '~/components/review-star';
import Button from './Button';
const tStrings = global.config.tStrings;

const YotpoRatingCard = (props) => {
    const { score, total, totalQa, handleForm } = props;
    return (
        <div className="yotpo-widget__rating-sidebar flex flex-col lg:mr-3 rounded-[24px] lg:rounded-[32px] border border-gray-600 p-g lg:mb-3">
            <div className="items-center lg:justify-center leading-[1.25] flex mb-1">
                <span className="yotpo-widget__score text-[2.8125em] mr-25">{score ? score.toFixed(1) : 0}</span>
                <div className="lg:ml-1">
                    <ReviewStar score={score} />
                    <span className="block yotpo-widget__total mt-25 font-normal text-body">
                        {`${total} ${total > 1 ? tStrings.yotpo.reviews : tStrings.yotpo.review}, ${totalQa} ${tStrings.yotpo.qnas}`}
                    </span>
                </div>
            </div>
            <div className="px-0 w-full">
                <Button onClick={() => handleForm('review')}
                    type="button"
                    lg={false}
                    buttonClass="btn-outline-primary w-full px-0 bg-transparent rounded-full mb-g text-sm py-1 font-normal">
                        Write A Review
                </Button>
            </div>
            <div className="px-0 w-full">
                <Button onClick={() => handleForm('question')}
                    type="button"
                    lg={false}
                    buttonClass="btn-outline-primary w-full px-0 bg-transparent rounded-full text-sm py-1 font-normal">
                        Ask A Question
                </Button>
            </div>
        </div>
    );
};

export default YotpoRatingCard;