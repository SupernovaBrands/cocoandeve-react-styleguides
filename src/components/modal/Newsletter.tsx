import Close from '@/images/icons/close.svg';
import ChevronDown from '@/images/icons/chevron-down.svg';

const Newsletter = (props: any) => {
	const { handleClose, data } = props;
	return (
		<div className="modal-content rounded-[20px] bg-secondary relative overflow-hidden">
			<picture className="absolute w-full lg:h-100 lg:w-auto">
				<source srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/Rectangle_2241.png?v=1696414159" media="(min-width: 992px)" />
				<img src="https://cdn.shopify.com/s/files/1/0073/5186/1332/files/newsletter-bigger-mobile.png?v=1646639302" className="w-full lg:w-auto" />
			</picture>
			<picture className="absolute w-full hidden">
				<source srcSet="https://us.cocoandeve.com/cdn/shop/files/Web_pop_up_Tan_Desktop_2_1428x940_crop_center.png?v=1697783798" media="(min-width: 992px)" />
				<img src="https://us.cocoandeve.com/cdn/shop/files/Web_pop_up_Tan_Mobile_2_764x332_crop_center.png?v=1697783796" className="w-full" />
			</picture>
			<div className="modal-body px-0 pb-3 pt-[10em] lg:pt-4 lg:pb-3">
				<Close onClick={handleClose} className="cursor-pointer svg--current-color w-[14px] h-[14px] absolute right-[14px] top-[14px] text-white"/>
				<div className="flex flex-wrap justify-end mx-0">
					<form className="modal--newsletter__form lg:w-1/2 lg:pr-4 pr-3 pl-3 lg:pl-0">
						<h2 className="modal--newsletter__title h1 text-center text-white mb-0">Join the club</h2>
						<p className="font-size-lg text-white font-weight-bold text-center mb-g font-bold leading-[25px]">&amp; get a FREE hair wrap!</p>
						<p className="text-white font-size-sm mb-g text-center">Get a FREE hair wrap on your first order, plus first access to new product launches, exclusive offers, routines, and beauty tips.</p>
						<div className="relative flex items-stretch w-full mb-0">
							<input id="modal--newsletter__email" className="block appearance-none w-full pt-g pb-g px-2 mb-0 bg-white rounded" type="email" placeholder="Email" aria-label="email" />
						</div>
						<p className="text-center modal--newsletter__separator text-white mb-1 mt-1">and / or</p>
						<div className="relative flex items-stretch w-full">
							<label htmlFor="modal--newsletter__country" className="input-group-addon relative py-g px-2 mb-1 block appearance-none bg-white rounded rounded-tr-none rounded-br-none h-[50px] w-[81px] lg:w-[91px]">
								<span className="absolute modal--newsletter__country-label items-center">+65</span>
								<ChevronDown className="w-[12px] h-[12px] right-25 absolute" />

								<select id="modal--newsletter__country" className="inline-block h-[50px] w-[50px] align-middle opacity-0">
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
							<input id="modal--newsletter__phone" className="block appearance-none w-full py-g px-2 mb-1 bg-white rounded border-l-0 rounded-tl-none rounded-bl-none" type="tel" placeholder="Phone number" aria-label="phone" />
						</div>
						<input type="submit" className="bg-primary hover:bg-primary-darken w-full rounded border-0 border-transparent font-bold text-white py-g" value="Submit" />
						<p className="font-size-xs text-white mt-g text-center mb-0 mx-1">Receive exclusive offers via email or automated marketing SMS (4/mth). For more info see our Privacy Policy (opt out any time). Msg &amp; data rates may apply. Consent not required for purchase.</p>
					</form>
					<div className="modal--newsletter__completed lg:w-1/2 pr-4 pl-4 hidden items-center justify-center">
						<div className="flex flex-wrap justify-center">
							<h2 className="modal--newsletter__title h1 text-center text-white">🎉<br />Sign-up successful! </h2>
							<h3 className="modal--newsletter__title text-center text-white mb-g">Use code for your gift!</h3>
							<button className="bg-primary hover:bg-primary-darken w-full rounded border-0 border-transparent font-bold text-white py-g">COPY: FREEWRAP <svg width="13" height="15" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg"><path d="M8.111 15H2.516a2.346 2.346 0 0 1-2.344-2.344v-7.94a2.346 2.346 0 0 1 2.344-2.343H8.11a2.346 2.346 0 0 1 2.344 2.344v7.94A2.346 2.346 0 0 1 8.111 15ZM2.516 3.545c-.647 0-1.172.526-1.172 1.172v7.94c0 .645.525 1.171 1.172 1.171H8.11c.646 0 1.172-.526 1.172-1.172v-7.94c0-.645-.526-1.171-1.172-1.171H2.516Zm10.283 7.646V2.344A2.346 2.346 0 0 0 10.455 0H3.951a.586.586 0 1 0 0 1.172h6.504c.646 0 1.172.526 1.172 1.172v8.847a.586.586 0 1 0 1.172 0Z" fill="#F4436C"></path></svg></button>
						</div>
					</div>
                </div>
            </div>
        </div>
	);
};

export default Newsletter;
