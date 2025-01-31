import parse from 'html-react-parser';
const tStrings = global.config.tStrings;

const YotpoReviewTab = (props) => {
    const { setActiveTab, activeTab, className, total, totalQa } = props;
    return (
        <ul className={`flex w-full border-[#f5dadf] border-b mt-3 ${className ?? ''}`} role="tablist">
			<li className={`nav-item text-center grow-0 pb-1 -mb-[1px] ${activeTab === 'review' ? 'border-b-[2px] border-primary' : ''}`}>
				<a onClick={() => setActiveTab('review')} className={`${activeTab === 'review' ? 'active font-bold' : ''} nav-link border-0 text-body !text-dark text-decoration-none pt-0 pb-1 px-2`} id="yotpo-widget__reviews-tab" role="tab" aria-controls="yotpo-widget__reviews" aria-selected="true">
					{parse(`${tStrings.yotpo.reviews}${total ? `<span className="review__tab-review-total"> (${total})</span>`: ''}`)}
				</a>
		    </li>
			<li className={`nav-item text-center grow-0 pb-1 -mb-[1px] ${activeTab === 'question' ? 'border-b-[2px] border-primary' : ''}`}>
				<a onClick={() => setActiveTab('question')} className={`${activeTab === 'question' ? 'active font-bold' : ''} nav-link border-0 text-body !text-dark text-decoration-none pt-0 pb-1 px-2`} id="yotpo-widget__questions-tab" aria-controls="yotpo-widget__questions" aria-selected="false">
					{parse(`${tStrings.yotpo.questions}${totalQa ? `<span className="review__tab-qa-total"> (${totalQa})</span>` : ''}`)}
				</a>
			</li>
		</ul>
    );
};

export default YotpoReviewTab;