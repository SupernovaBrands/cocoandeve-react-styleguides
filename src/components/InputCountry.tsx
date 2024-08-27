import React, { useState } from "react";
import ChevronDown from '~/images/icons/chevron-down.svg';

const InputCountry = (props: any) => {
	const { store } = props;
	const [defaultVal, setDefaultVal] = useState<string>('SG');
	const onSelecChange = (e) => {
		const code = e.target.options[e.target.selectedIndex].dataset.code;
		props.handleCode(code);
	}
	return (
		<>
			<label htmlFor={props.id} className={`input-group-addon border border-[#f5f5f5] lg:border-r-2 relative py-[14px] px-[16px] mb-0 block appearance-none ${props.className ? props.className : 'bg-white'} rounded rounded-tr-none rounded-br-none h-[3.125rem] w-[5.063rem] ${props.comp === 'sms-subs' ? 'lg:w-[74px]' : 'lg:w-[5.688rem]'}`}>
				<span className={`absolute items-center`}>+{props.activeCountry}</span>
				<ChevronDown className={`${props.chevronCls ? props.chevronCls : 'fill-gray-600 w-[0.75em] h-[0.75em] right-[10px] absolute top-[50%] translate-y-[50%]'}`} />
				<select id={props.id} className={`${props.selectCls ? props.selectCls : '' } inline-block h-[3.125rem] w-full align-middle opacity-0`} onChange={onSelecChange} defaultValue={defaultVal}>
					<option value="" disabled>Select Country</option>
					{store === 'us' && (
						<option value="US" data-code="1" selected>United States</option>
					)}
					{store === 'au' && (
						<>
							<option value="AU" data-code="61" selected>Australia</option>
							<option value="NZ" data-code="64">New Zealand</option>
						</>
					)}
					{store === 'ca' && (
						<option value="CA" data-code="1">Canada</option>
					)}
					{store === 'uk' && (
						<>
							<option value="NO" data-code="47">Norway</option>
							<option value="CH" data-code="41">Switzerland</option>
							<option value="AE" data-code="971">United Arab Emirates&nbsp;&nbsp;</option>
							<option value="GB" data-code="44" selected>United Kingdom</option>
						</>
					)}
					{store === 'my' && (
						<>
							<option value="HK" data-code="852">Hong Kong SAR&nbsp;&nbsp;</option>
							<option value="MO" data-code="853">Macao SAR</option>
							<option value="MY" data-code="60" selected>Malaysia</option>
							<option value="PH" data-code="63">Philippines</option>
							<option value="SG" data-code="65">Singapore</option>
						</>
					)}
					{(store === 'int' || store === 'dev') && (
						<>
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
						</>
					)}
					{store === 'eu' && (
						<>
							<option value="AT" data-code="43">Austria</option>
							<option value="BE" data-code="32">Belgium</option>
							<option value="BG" data-code="359">Bulgaria</option>
							<option value="HR" data-code="385">Croatia</option>
							<option value="CZ" data-code="420">Czechia</option>
							<option value="DK" data-code="45">Denmark</option>
							<option value="EE" data-code="372">Estonia</option>
							<option value="FI" data-code="358">Finland</option>
							<option value="FR" data-code="33" selected>France</option>
							<option value="DE" data-code="49">Germany</option>
							<option value="GR" data-code="30">Greece</option>
							<option value="HU" data-code="36">Hungary</option>
							<option value="IE" data-code="353">Ireland</option>
							<option value="IT" data-code="39">Italy</option>
							<option value="LV" data-code="371">Latvia</option>
							<option value="LU" data-code="352">Luxembourg</option>
							<option value="MC" data-code="377">Monaco</option>
							<option value="NL" data-code="31">Netherlands</option>
							<option value="PL" data-code="48">Poland</option>
							<option value="PT" data-code="351">Portugal</option>
							<option value="SK" data-code="421">Slovakia</option>
							<option value="SI" data-code="386">Slovenia</option>
							<option value="ES" data-code="34">Spain</option>
							<option value="SE" data-code="46">Sweden</option>
						</>
					)}
				</select>
			</label>
		</>
	)
};

export default InputCountry;
