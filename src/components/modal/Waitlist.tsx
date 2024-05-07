import useGlobalSettings from '~/hooks/useGlobalSettings';
import Button from '../Button';
import CloseButton from './CloseButton';
import usePreview from '~/hooks/usePreview';

interface WatilistData {
	image: string|undefined
	open: boolean
	title: string
}

type WaitlistProp = {
	handleClose: () => void
	data: WatilistData
}

const Waitlist: React.FC<WaitlistProp> = ({ handleClose, data }) => {
	const globalSettings = useGlobalSettings();
	const { isPreview } = usePreview();
    const store = (isPreview) ? 'dev' : 'us';
    const waitlistPopup = globalSettings?.data?.ThemeSettings.find((t: any) => t.__component === 'theme.product-waitlist-popup');
    const waitlistPopupData = waitlistPopup?.waitlistPopup?.waitlistPopup[store];
	console.log('waitlistPopupData', waitlistPopupData);
	return globalSettings && !globalSettings.isLoading && (
		<div className="modal-content bg-pink-light lg:px-g">
			<CloseButton handleClose={handleClose} />
			<div className="modal-body pt-0 pb-3 px-3 lg:py-5 lg:px-2">
				<div className="flex flex-wrap items-center justify-center">
					<div className="w-full lg:w-1/2 lg:px-g text-center">
						{data.image &&
							<img alt="Waitlist Popup" className="waitlist-popup-image mx-auto w-full max-w-[15.625rem] md:max-w-none" src={data.image} />
						}
					</div>
					<div className="w-full lg:w-1/2 lg:px-g text-center mt-n1 mt-lg-0">
						<strong className="mb-1 text-xl lg:text-2xl">{waitlistPopupData.waitlist_popup_form_title}</strong>
						<p className="text-gray-600 mb-g text-base" dangerouslySetInnerHTML={{ __html: `Our <strong>${data.title}</strong> ${waitlistPopupData.waitlist_popup_form_description_2}` }} />
						{/* {waitlistPopupData.date && (<strong className="mt-2">{waitlistPopupData.date}</strong>)} */}
						<div className="relative flex items-stretch w-full mt-2 flex-col">
							<label htmlFor="email-waitlist" id="waitlistPopupInput" className="sr-only">waitlist popup input</label>
							<input id="email-waitlist" type="email" placeholder={waitlistPopupData.email_placeholder} className="block w-full mb-1 bg-white text-gray-800" aria-label="waitlistPopupInput" />
							<small className="mt-1 hidden">{waitlistPopupData.email_invalid}</small>
							<Button type="submit" className="btn-primary w-full rounded font-bold py-g">{waitlistPopupData.waitlist_popup_form_submit}</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
};

export default Waitlist;
