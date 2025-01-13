import SvgSearch from '~/images/icons/search.svg';

const tStrings = global.config.tStrings;
const YotpoFilterForm = (props) => {
    const {onFilterChange, customFilter, id, className} = props;
    return (
        <div id={ id ?? 'yotpoFilterForm'} className={`${className ?? ''}`}>
            <p className="font-bold mb-2">{tStrings.yotpo.filterReviews}</p>
			<div className="input-group lg:w-1/2 px-0 flex flex-nowrap py-[2px]">
                <input
					type="text"
					name="free_text_search"
					className="block appearance-none w-full py-[15px] px-[17px] text-base leading-[1.25] bg-gray-400 text-gray-800 border-0 rounded-l-h rounded-r-none outline-none mb-0"
					aria-label="Search reviews"
					placeholder={tStrings.yotpo.searchReviews}
					onKeyPress={(e) => {
						onFilterChange();
					}}
				/>
				<div className="input-group-append flex">
					<button type="button" className="w-[50px] max-w-[50px] max-h-[50px] input-group-text border bg-white  h-full rounded-0 flex justify-center items-center border-gray-400" aria-label="Submit search" onClick={() => onFilterChange()}>
						<SvgSearch className="svg size-1em" />
					</button>
				</div>
			</div>

			<div className="flex flex-wrap mt-1 lg:-mx-g sm:-mx-hg w-full review__filter-form-inputs">
				<div className="w-1/2 lg:w-1/4 lg:px-g sm:px-hg review__filter-category review__filter-category-odd">
					<select className="custom-select my-1 border-dark" name="scores" onChange={() => { onFilterChange(); }}>
						<option value="">{tStrings.yotpo.rating}</option>
					    <option value="5">5 Stars</option>
						<option value="4">4 Stars</option>
						<option value="3">3 Stars</option>
						<option value="2">2 Stars</option>
						<option value="1">1 Star</option>
					</select>
				</div>
				<div className="w-1/2 lg:w-1/4 lg:px-g sm:px-hg review__filter-category">
					<select className="custom-select my-1 border-dark" name="pictured" onChange={() => { onFilterChange(); }}>
						<option value="">{tStrings.yotpo.imageVideo}</option>
						<option value="true">{tStrings.yotpo.withImageVideo}</option>
					</select>
				</div>
				{customFilter.map((q, i) => q.filter !== '' && (
					<div key={q.slug} className={`w-1/2 lg:w-1/4 lg:px-g sm:px-hg review__filter-category ${i % 2 === 0 ? 'review__filter-category-odd' : ''}`}>
						<select className="custom-select my-1 border-dark" name={q.slug} onChange={() => { onFilterChange(); }}>
							<option value="">{q.filter}</option>
							{q.options.map((o) => (
								<option key={o} value={o}>{o.replace('/', ' / ')}</option>
							))}
						</select>
					</div>
				))}
			</div>
		</div>
    );
};

export default YotpoFilterForm;