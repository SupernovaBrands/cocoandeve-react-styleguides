import ChevronDown from '@/images/icons/chevron-down.svg';
import Close from '@/images/icons/close.svg';
const Sweepstakes = (props: any) => {
	const { handleClose, data } = props;
	return (
		<div className="modal-content rounded-[20px] relative overflow-hidden mx-g lg:mx-4">
			<div className="modal-body px-0 py-0">
				<picture className="w-100 lg:hidden">
					<source srcSet="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/90d9a664-debc-4d42-8de7-bf77c6f94f00/public" media="(min-width: 992px)" />
					<img src="https://via.placeholder.com/690x414/FFF2F4" className="w-full h-full" alt="Sweepstakes mobile banner" />
				</picture>
				<div className="px-3 lg:px-4 py-3 lg:py-4 bg-pink-light">
					<div className="modal--sweepstakes__heading flex flex-wrap justify-end lg:mb-g mb-0">
						<div className="hidden lg:block w-3/4 lg:w-3/5 lg:pl-0 text-center pr-0 lg:pr-g">
							<h2 className="modal--sweepstakes__title h1 mb-0 text-bold mt-1 lg:mt-1 lg:mb-0 text-body">Win $500 of products</h2>
							<p className="lg:mb-0 lg:mt-1 text-gray-600">and exclusive savings on our Black Friday <br />Deals and future offers!</p>
						</div>
						<div className="lg:hidden w-full pl-0 lg:pl-0 text-center pr-0 lg:pr-g">
							<h2 className="modal--sweepstakes__title h2 mb-1 text-bold mt-1 lg:mt-1 lg:mb-0 text-body">Win $500 of products</h2>
							<p className="lg:mb-0 lg:mt-1 font-size-sm mb-1 text-gray-600">and exclusive savings on our Black Friday <br />Deals and future offers!</p>
						</div>
					</div>
					<div id="waitlist-page" className="flex flex-wrap justify-end" data-page-type="Sweepstakes" data-form-id="#sweepstakes-popup__form" data-email-form="#sweepstakes__email">
						<form id="sweepstakes-popup__form" data-page="sweeptakes" className="modal--sweepstakes__form lg:w-3/5 lg:pl-0 mt-1 lg:mt-0" data-thank-you-message="You’re in!">
							<div className="relative flex items-stretch w-full mb-25">
								<input id="sweepstakes__email" data-regsource="sweepstakes" data-page="sweepstakes" className="block appearance-none w-full bg-white text-gray-800 rounded px-[14px] py-[14px]" type="email" value="" placeholder="Email" />
							</div>
							<input type="checkbox" name="tos" className="hidden" value="true" checked />
							<div className="text-center mb-25 sweepstakes-popup__separator">and / or</div>
							<div className="relative flex items-stretch w-full mb-g">
								<label htmlFor="sweepstakes-popup__country" className="input-group-addon relative text-center rounded appearance-none bg-white border-r-0 h-[50px] w-[77px] lg:w-[87px] flex items-center pr-2">
									<span className="absolute sweepstakes-popup__country-label items-center bg-white pl-g">+65</span>
									<ChevronDown className="w-[12px] h-[12px] right-1 absolute" />
									<select id="modal--sweepstakes__country" className="inline-block h-[50px] w-[50px] align-middle opacity-0">
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
								<input className="block appearance-none w-full rounded border-l-0 bg-white " type="phone" value="" placeholder="Phone number" />
							</div>
							<button type="submit" id="sweepstakes__submit" className="bg-primary hover:bg-primary-darken w-full rounded border-0 border-transparent font-bold text-white py-g">Register now</button>
							<p className="hidden lg:block sweepstakes-popup__toc text-center mb-1 mt-1 font-size-sm text-gray-600">By signing up you agree to receive exclusive offers via email/SMS, for more information see our <a href="/pages/privacy-policy-new" className="text-primary underline">Privacy Policy</a></p>
							<p className="lg:hidden sweepstakes-popup__toc text-center mb-1 mt-1 font-size-xs text-gray-600">By signing up you agree to receive exclusive offers via email/SMS, for more information see our <a href="/pages/privacy-policy-new" className="text-primary underline">Privacy Policy</a></p>
						</form>
					</div>
				</div>
				<Close onClick={handleClose} className="cursor-pointer svg--current-color w-[14px] h-[14px] absolute right-[14px] top-[14px] "/>
			</div>
		</div>
	);
};

export default Sweepstakes;
