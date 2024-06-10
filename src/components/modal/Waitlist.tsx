import useGlobalSettings from '~/hooks/useGlobalSettings';
import Button from '../Button';
import CloseButton from './CloseButton';
import usePreview from '~/hooks/usePreview';
import { useRef, useState } from 'react';
import { subscribeBluecoreWaitlist, validateEmail } from '~/modules/utils';

interface WatilistData {
	image: string|undefined
	open: boolean
	title: string
	handle: string|undefined
}

type WaitlistProp = {
	handleClose: () => void
	data: WatilistData,
	trackBluecoreEvent?: any,
}

const Waitlist: React.FC<WaitlistProp> = ({ handleClose, data, trackBluecoreEvent }) => {
	const [formError, setFormError] = useState(false);
	const [success, setSuccess] = useState(false);

	const inputRef = useRef(null);
	const globalSettings = useGlobalSettings();
	const { isPreview } = usePreview();
    const store = (isPreview) ? 'dev' : 'us';
    const waitlistPopup = globalSettings?.data?.ThemeSettings.find((t: any) => t.__component === 'theme.product-waitlist-popup');
    const waitlistPopupData = waitlistPopup?.waitlistPopup?.waitlistPopup[store];

	const waitlistNonOOS = globalSettings?.data?.ThemeSettings.filter((setting) => setting.__component === 'theme.waitlist-non-oos');
	const wlNoOOS = [];
	if (waitlistNonOOS && waitlistNonOOS.length > 0) {
		waitlistNonOOS.forEach((data:any) => {
			const waitlistData = data?.waitlistNonOos?.waitlistNonOos?.[store];
			if (waitlistData && waitlistData?.enabled) wlNoOOS.push(waitlistData);
		});
	}

	const isNonOOs = wlNoOOS.find(
		(item) => item.waitlist_popup_handles?.includes(data.handle),
	);
	const handleSubmit = (e:any) => {
		e.preventDefault();
		const email = inputRef.current.value;
		if (validateEmail(email) && data.handle) {
			const regSource = isNonOOs ? 'launch_waitlist' : 'waitlist';
			subscribeBluecoreWaitlist(email, data.handle, '', `${regSource}_${data.handle}`, '', true);
			setSuccess(true);
			setFormError(false);
		} else {
			setSuccess(false);
			setFormError(true);
		}

		try {
			trackBluecoreEvent(email, data.handle);
		} catch(e) {
			console.log(e, 'error');
		}
	};
	return (
		<div className="modal-content bg-pink-light lg:px-g">
			<CloseButton handleClose={handleClose} />
			<div className="modal-body pt-0 pb-3 px-3 lg:py-5 lg:px-2">
				<div className="flex flex-wrap items-center justify-center">
					<div className="w-full lg:w-1/2 lg:px-g text-center">
						{data.image &&
							<img alt="Waitlist Popup" className="waitlist-popup-image mx-auto w-full max-w-[15.625rem] md:max-w-none" src={data.image.replace('592x', 'public').replace('540x', 'public')} />
						}
					</div>
					<form onSubmit={handleSubmit} className="w-full lg:w-1/2 lg:px-g text-center -mt-1 mt-lg-0">
						{globalSettings && !globalSettings.isLoading && (
							<>
								{!success && (
									<>
										<strong className="block mb-g text-xl lg:text-2xl">{waitlistPopupData.waitlist_popup_form_title}</strong>
										<p className="text-gray-600 mb-g text-base" dangerouslySetInnerHTML={{ __html: `Our <strong>${data.title}</strong> ${waitlistPopupData.waitlist_popup_form_description_2}` }} />
									</>
								)}
								{success && !isNonOOs && (
									<>
										<p className="h1 mb-0">{waitlistPopupData.waitlist_popup_form_title_thanks}</p>
										<p className="text-gray-600"
											dangerouslySetInnerHTML={{ __html: `${waitlistPopupData.waitlist_popup_form_description_thanks} <strong>${data.title}</strong> is back` }}
										/>
									</>
								)}
								{success && isNonOOs && (
									<>
										<p className="h1 mb-0">{isNonOOs.waitlist_popup_form_title_thanks}</p>
										<p className="text-gray-600"
											dangerouslySetInnerHTML={{ __html: `${isNonOOs.waitlist_popup_form_description_thanks} <strong>${data.title}</strong> is back` }}
										/>
									</>
								)}
								<div className={`relative flex items-stretch w-full flex-col ${success ? 'mt-4' : 'mt-2'}`}>
									<label htmlFor="email-waitlist" id="waitlistPopupInput" className="sr-only">waitlist popup input</label>
									<input ref={inputRef} id="email-waitlist" type="email" placeholder={waitlistPopupData.email_placeholder} className="block w-full bg-white text-gray-800" aria-label="waitlistPopupInput" />
									{formError && <span className="mt-1 font-size-sm">{waitlistPopupData.email_invalid}</span>}
									<Button disabled={success} type="submit" buttonClass="btn-primary border-0 w-full mt-1 rounded font-bold py-g">{waitlistPopupData.waitlist_popup_form_submit}</Button>
								</div>
							</>
						)}
					</form>
				</div>
			</div>
		</div>
	)
};

export default Waitlist;
