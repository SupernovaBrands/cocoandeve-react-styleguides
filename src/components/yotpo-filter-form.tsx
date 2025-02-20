import SvgSearch from '~/images/icons/search.svg';

const tStrings = global.config.tStrings;
const YotpoFilterForm = (props) => {
    const {onFilterChange, customFilter, id, className, hideFilters} = props;
    return (
        <div id={ id ?? 'yotpoFilterForm'} className={`${className ?? ''}`}>
            <p className="font-bold mb-1 lg:mb-2">{tStrings.yotpo.filterReviews}</p>
			<div className="input-group lg:w-1/2 px-0 flex flex-nowrap">
                <input
					type="text"
					name="free_text_search"
					className="rounded-r rounded-l-none block appearance-none w-full py-1 lg:py-[17px] px-[17px] text-base leading-[1.25] bg-gray-400 text-gray-800 border-0 outline-none mb-0"
					aria-label="Search reviews"
					placeholder={`Search`}
					onKeyPress={(e) => {
						onFilterChange();
					}}
				/>
				<div className="input-group-append flex">
					<button type="button" className="rounded-l w-[50px] max-w-[50px] max-h-[54px] input-group-text border bg-white  h-full rounded-0 flex justify-center items-center border-gray-400" aria-label="Submit search" onClick={() => onFilterChange()}>
						{/* <SvgSearch className="svg size-1em" /> */}
						<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M23.7068 22.7928L16.8818 15.9678C18.2038 14.3349 18.9998 12.2599 18.9998 9.99992C18.9998 4.76197 14.7378 0.5 9.49988 0.5C4.26193 0.5 0 4.76193 0 9.99988C0 15.2378 4.26197 19.4998 9.49992 19.4998C11.7599 19.4998 13.8349 18.7038 15.4678 17.3818L22.2928 24.2068C22.4878 24.4018 22.7438 24.4998 22.9998 24.4998C23.2558 24.4998 23.5118 24.4018 23.7068 24.2068C24.0978 23.8158 24.0978 23.1838 23.7068 22.7928ZM9.49992 17.4998C5.36395 17.4998 2 14.1359 2 9.99988C2 5.8639 5.36395 2.49995 9.49992 2.49995C13.6359 2.49995 16.9998 5.8639 16.9998 9.99988C16.9998 14.1359 13.6359 17.4998 9.49992 17.4998Z" fill="#D62E55"/>
						</svg>

					</button>
				</div>
			</div>

			<div className="flex flex-wrap mt-1 w-full review__filter-form-inputs mx-0">
				<div className="w-1/2 lg:w-full pl-0 pr-0 pl-0 pr-1 lg:px-0">
					<select className="rounded custom-select mb-0 lg:my-1 border-0 text-sm lg:text-base h-[2.5rem] lg:h-[3.125]" name="scores" onChange={() => { onFilterChange(); }}>
						<option value="">{tStrings.yotpo.rating}</option>
					    <option value="5">5 Stars</option>
						<option value="4">4 Stars</option>
						<option value="3">3 Stars</option>
						<option value="2">2 Stars</option>
						<option value="1">1 Star</option>
					</select>
				</div>
				<div className="w-1/2 lg:w-full pr-0 pl-1 lg:px-0">
					<select className="rounded custom-select mb-0 lg:my-1 border-0 text-sm lg:text-base h-[2.5rem] lg:h-[3.125]" name="pictured" onChange={() => { onFilterChange(); }}>
						<option value="">{tStrings.yotpo.imageVideo}</option>
						<option value="true">{tStrings.yotpo.withImageVideo}</option>
					</select>
				</div>
				{customFilter.filter((q) => !hideFilters.includes(q.slug)).map((q, i) => q.filter !== '' && (
					<div key={q.slug} className={`w-1/2 lg:w-full pr-0 lg:px-0 ${i % 2 === 0 ? 'pl-0 pr-1' : 'pl-1'}`}>
						<select className="rounded custom-select my-1 border-0 text-sm lg:text-base h-[2.5rem] lg:h-[3.125]" name={q.slug} onChange={() => { onFilterChange(); }}>
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