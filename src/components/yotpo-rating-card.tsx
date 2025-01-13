import ReviewStar from '~/components/review-star';
import Button from './Button';
const tStrings = global.config.tStrings;

const YotpoRatingCard = (props) => {
    const { score, total, totalQa, handleForm } = props;
    return (
        <div className="yotpo-widget__rating-sidebar hidden">
            <div className="items-center lg:justify-center leading-[1.25]">
                <span className="yotpo-widget__score text-[2.8125em] mr-25">{score ? score.toFixed(1) : 0}</span>
                <div className="lg:flex lg:ml-1">
                    <ReviewStar score={score} />
                    <span className="lg:ml-1 block yotpo-widget__total mt-25 lg:mt-0 lg:ml-1">
                        {`${total} ${total > 1 ? tStrings.yotpo.reviews : tStrings.yotpo.review}, ${totalQa} ${tStrings.yotpo.qnas}`}
                    </span>
                </div>
            </div>
            <div className="px-hg md:px-g w-full">
                <Button onClick={() => handleForm('review')}
                    type="button"
                    lg={false}
                    buttonClass="btn-outline-primary w-full px-0 bg-transparent">
                        Write A Review
                </Button>
            </div>
            <div className="px-hg md:px-g w-full">
                <Button onClick={() => handleForm('question')}
                    type="button"
                    lg={false}
                    buttonClass="btn-outline-primary w-full px-0 bg-transparent">
                        Ask A Question
                </Button>
            </div>
        </div>
    );
};

export default YotpoRatingCard;