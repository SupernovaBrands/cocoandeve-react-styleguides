import ChevronDown from '~/images/icons/chevron-down.svg';

type SelectCountryProp = {
	id: string
	className?: string
}
const InputCountry = (props: SelectCountryProp) => (
	<>
		<label htmlFor={props.id} className="input-group-addon border-0 relative py-g px-2 mb-1 block appearance-none bg-white rounded rounded-tr-none rounded-br-none h-[3.125rem] w-[5.063rem] lg:w-[5.688rem]">
			<span className={`absolute items-center ${props.className ?? ''}`}>+65</span>
			<ChevronDown className="w-[0.75rem] h-[0.75rem] right-25 absolute top-[50%] -translate-y-[50%]" />
			<select id={props.id} className="inline-block h-[3.125rem] w-full align-middle opacity-0">
				<option value="" disabled>Select Country</option>
				<option value="KH" data-code="855">Cambodia</option>
				<option value="HK" data-code="852">Hong Kong</option>
				<option value="IL" data-code="972">Israel</option>
				<option value="JP" data-code="81">Japan</option>
				<option value="KR" data-code="82">South Korea</option>
				<option value="LA" data-code="856">Laos</option>
				<option value="MO" data-code="853">Macau</option>
				<option value="MY" data-code="60">Malaysia</option>
				<option value="MV" data-code="960">Maldives</option>
				<option value="MM" data-code="95">Myanmar</option>
				<option value="PG" data-code="675">Papua New Guinea</option>
				<option value="PH" data-code="63">Philippines</option>
				<option value="RE" data-code="262">Réunion</option>
				<option value="RU" data-code="7">Russia</option>
				<option value="SG" data-code="65" selected>Singapore</option>
				<option value="LK" data-code="94">Sri Lanka</option>
				<option value="TW" data-code="886">Taiwan</option>
				<option value="TR" data-code="90">Turkey</option>
				<option value="VN" data-code="84">Vietnam</option>
			</select>
		</label>
	</>
);

export default InputCountry;
