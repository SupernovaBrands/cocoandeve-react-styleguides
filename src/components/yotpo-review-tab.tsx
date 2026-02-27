import parse from 'html-react-parser';
const tStrings = global.config.tStrings;

const YotpoReviewTab = (props) => {
    const { setActiveTab, activeTab, className, total, totalQa } = props;
    return (
        <ul className={`flex w-full border-[#CECECE] border-b mt-3 ${className ?? ''}`}>
			<li className={`nav-item text-center grow-0 pb-1 -mb-[1px] ${activeTab === 'review' ? 'border-b-[2px] border-dark' : ''}`}>
				<a onClick={() => setActiveTab('review')} className={`${activeTab === 'review' ? 'active font-bold' : ''} nav-link border-0 text-body !text-dark text-decoration-none pt-0 pb-1 px-2`} id="yotpo-widget__reviews-tab" role="button" tabIndex={0} aria-controls="yotpo-widget__reviews" aria-selected="true">
					{tStrings.yotpo.reviews}
					<span className="hidden yotpo-review-tab__total-review">({total})</span>
				</a>
		    </li>
			<li className={`nav-item text-center grow-0 pb-1 -mb-[1px] ${activeTab === 'question' ? 'border-b-[2px] border-dark' : ''}`}>
				<a onClick={() => setActiveTab('question')} className={`${activeTab === 'question' ? 'active font-bold' : ''} nav-link border-0 text-body !text-dark text-decoration-none pt-0 pb-1 px-2`} id="yotpo-widget__questions-tab" role="button" tabIndex={0} aria-controls="yotpo-widget__questions" aria-selected="false">
					{tStrings.yotpo.questions}
					<span className="hidden yotpo-review-tab__total-question">({totalQa})</span>
				</a>
			</li>
		</ul>
    );
};

export default YotpoReviewTab;