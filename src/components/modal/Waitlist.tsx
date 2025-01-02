import parse from 'html-react-parser';
import useGlobalSettings from '~/hooks/useGlobalSettings';
import Button from '../Button';
// import CloseButton from './CloseButton';
// import usePreview from '~/hooks/usePreview';
import { useEffect, useRef, useState } from 'react';
import { subscribeBluecoreWaitlist, validateEmail } from '~/modules/utils';
import Close from '~/images/icons/close.svg';
import {
	getCookie,
	setCookie,
} from '~/modules/utils';

interface WatilistData {
	image: string|undefined
	open: boolean
	title: string
	handle: string|undefined
	date?: string
	productId?: any
}

type WaitlistProp = {
	store: string,
	handleClose: () => void
	data: WatilistData,
	trackBluecoreEvent?: any,
	bluecoreProductWaitlist?: any,
	waitlistPdp?: any,
}

const Waitlist: React.FC<WaitlistProp> = ({ store, handleClose, data, trackBluecoreEvent, bluecoreProductWaitlist, waitlistPdp }) => {
	const [formError, setFormError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [restockType, setRestockType] = useState(null);
	const [formDescription, setFormDescription] = useState(null);
	const [formTitle, setFormTitle] = useState(null);

	const inputRef = useRef(null);
	const globalSettings = useGlobalSettings();
	// const { isPreview } = usePreview();
    // const store = (isPreview) ? 'dev' : 'us';
    const waitlistPopup = globalSettings?.data?.ThemeSettings.find((t: any) => t.__component === 'theme.product-waitlist-popup');
    const waitlistPopupData = waitlistPopup?.waitlistPopup?.waitlistPopup[store];
	const [stockDate, setStockDate] = useState(data.date);

	// console.log('pdp waitlist data strapi', waitlistPopupData);

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
			setCookie(`waitlist_${data.handle}`, true, 1);
		} else {
			setSuccess(false);
			setFormError(true);
		}

		try {
			if (data) {
				bluecoreProductWaitlist({email, productTitle: data.title, productId: data.productId });
			}
		} catch(e) {
			console.log(e, 'error');
		}
	};

	useEffect(() => {
		if (getCookie(`waitlist_${data.handle}`)) {
			setSuccess(true);
		}
	}, [])

	useEffect(() => {
		const handleFocus = () => {
			if (inputRef.current && !success) {
				inputRef.current.focus();
			}
		};
	
		const focusTimeout = setTimeout(handleFocus, 300);
		const observer = new MutationObserver(() => {
			if (inputRef.current) {
				handleFocus();
				observer.disconnect();
			}
		});
	
		observer.observe(document.body, { childList: true, subtree: true });
	
		if (inputRef.current) {
			handleFocus();
		}
	
		return () => {
			observer.disconnect();
			clearTimeout(focusTimeout);
		};
	  }, [success]);

	
	const currId = parseInt(data.productId, 10) || 0;
	
	useEffect(() => {
		// const wlPdpData = waitlistPdp[0]?.waitlistPdp[store];
		if (currId !== 0 && waitlistPdp !== null) {
			const variantIds = waitlistPdp.vrt_waitlist_form_varid_cs?.split(',').map((v) => parseInt(v.trim(), 10)) || [];
			const variantIds2 = waitlistPdp.vrt_waitlist_form_varid_cs_2?.split(',').map((v) => parseInt(v.trim(), 10)) || [];
			const variantIds3 = waitlistPdp.vrt_waitlist_form_varid_cs_3?.split(',').map((v) => parseInt(v.trim(), 10)) || [];
			const variantIds4 = waitlistPdp.vrt_waitlist_form_varid_cs_4?.split(',').map((v) => parseInt(v.trim(), 10)) || [];
			const variantIds5 = waitlistPdp.vrt_waitlist_form_varid_cs_5?.split(',').map((v) => parseInt(v.trim(), 10)) || [];

			if (variantIds.includes(currId)) {
				setStockDate(waitlistPdp.vrt_waitlist_form_title_cs);
				setRestockType(waitlistPdp?.vrt_waitlist_restock_type || null);
				setFormDescription(waitlistPdp?.vrt_waitlist_form_description_cs);
				setFormTitle(waitlistPdp?.vrt_waitlist_form_title_cs);
			} else if (variantIds2.includes(currId)) {
				// data.waitlistTitle = props.vrt_waitlist_form_title_cs_2;
				// data.formDescription = props.vrt_waitlist_form_description_cs_2;
				setStockDate(waitlistPdp.vrt_waitlist_form_title_cs_2);
				setRestockType(waitlistPdp?.vrt_waitlist_restock_type_2 || null);
				setFormDescription(waitlistPdp?.vrt_waitlist_form_description_cs_2);
				setFormTitle(waitlistPdp?.vrt_waitlist_form_title_cs_2);
			} else if (variantIds3.includes(currId)) {
				// data.waitlistTitle = props.vrt_waitlist_form_title_cs_3;
				// data.formDescription = props.vrt_waitlist_form_description_cs_3;
				setStockDate(waitlistPdp.vrt_waitlist_form_title_cs_3);
				setRestockType(waitlistPdp?.vrt_waitlist_restock_type_3 || null);
				setFormDescription(waitlistPdp?.vrt_waitlist_form_description_cs_3);
				setFormTitle(waitlistPdp?.vrt_waitlist_form_title_cs_3);
			} else if (variantIds4.includes(currId)) {
				// data.waitlistTitle = props.vrt_waitlist_form_title_cs_4;
				// data.formDescription = props.vrt_waitlist_form_description_cs_4;
				setStockDate(waitlistPdp.vrt_waitlist_form_title_cs_4);
				setRestockType(waitlistPdp?.vrt_waitlist_restock_type_4 || null);
				setFormDescription(waitlistPdp?.vrt_waitlist_form_description_cs_4);
				setFormTitle(waitlistPdp?.vrt_waitlist_form_title_cs_4);
			} else if (variantIds5.includes(currId)) {
				// data.waitlistTitle = props.vrt_waitlist_form_title_cs_5;
				// data.formDescription = props.vrt_waitlist_form_description_cs_5;
				setStockDate(waitlistPdp.vrt_waitlist_form_title_cs_5);
				setRestockType(waitlistPdp?.vrt_waitlist_restock_type_5 || null);
				setFormDescription(waitlistPdp?.vrt_waitlist_form_description_cs_5);
				setFormTitle(waitlistPdp?.vrt_waitlist_form_title_cs_5);
			} else {
				setFormDescription(waitlistPdp?.vrt_waitlist_form_description);
			}
		} else {
			setFormDescription(waitlistPdp?.vrt_waitlist_form_description);
		}
	}, [data.open]);

	return (
		<div className="modal-content bg-pink-light lg:px-g test">
			{/* <CloseButton handleClose={handleClose} className="!font-size-sm" /> */}
			<Close onClick={handleClose} className={`svg--current-color cursor-pointer close absolute font-size-sm w-[14px] h-[14px] top-[1em] right-[1em]`}/>
			<div className="modal-body pt-0 pb-3 px-3 lg:py-5 lg:px-2">
				<div className="flex flex-wrap items-center justify-center lg:-mx-1">
					<div className="w-full lg:w-1/2 lg:px-g text-center">
						{data.image &&
							<img alt="Waitlist Popup" className="waitlist-popup-image mx-auto w-full max-w-[15.625rem] md:max-w-none" src={data.image.replace('592x', 'public').replace('540x', 'public')} />
						}
					</div>
					<form noValidate onSubmit={handleSubmit} className="w-full lg:w-1/2 lg:px-g text-center -mt-1 lg:mt-0" data-product-id={data?.productId}>
						{globalSettings && !globalSettings.isLoading && (
							<>
								{!success && (
									<>
										{stockDate && stockDate !== '' && (
											<strong className="block mb-[1rem] text-xl lg:text-2xl">{stockDate}</strong>
										)}
										{!stockDate && (
											<strong className="block mb-[1rem] text-xl lg:text-2xl">
												{/* {waitlistPdp?.vrt_waitlist_form_title} */}
												{['no'].includes(restockType) && (formTitle === null || formTitle === '') ? 'OUT OF STOCK' : waitlistPdp?.vrt_waitlist_form_title}
											</strong>
										)}
										<p className="text-gray-600 mb-[1rem] text-base aa">
											{restockType === 'yes' && parse(`Our <strong>${data.title}</strong> has become a worldwide hit and we're struggling to keep up with the demand. But don't worry, we're on it! Sign up to join the waitlist.`)}
											{restockType === 'no' && parse(`Our <strong>${data.title}</strong> has been such a hit that it's sold out and unfortunately, we won’t be restocking it. We appreciate your support and hope you'll explore our other amazing products!`)}
											{/* {restockType === null && parse(`Our <strong>${data.title}</strong> ${waitlistPopupData.waitlist_popup_form_description_2}`)} */}
											{!['yes', 'no'].includes(restockType) && parse(`${formDescription?.replace('{{productName}}', `<strong>${data.title}</strong>`)}`)}
										</p>

										
									</>
								)}
								{success && !isNonOOs && (
									<>
										<p className="text-xl lg:text-2xl font-bold mb-0">
											{!['yes', 'no'].includes(restockType) && parse(`${waitlistPdp?.vrt_waitlist_form_title_thanks}`)}
											{['yes', 'no'].includes(restockType) && `YOU'LL HEAR FROM US SOON`}
										</p>
										<p className="text-gray-600">
											{!['yes', 'no'].includes(restockType) && parse(`${waitlistPdp?.vrt_waitlist_form_description_thanks.replace('{{productName}}', `<strong>${data.title}</strong>`)}`)}
											{['yes', 'no'].includes(restockType) && ('in the meantime.. sit back, relax, hair masque & chill!')}
										</p>
										{/* {stockDate && stockDate !== '' && (
											<p className="font-bold mb-[1rem] mt-2">{stockDate}</p>
										)} */}
									</>
								)}
								{success && isNonOOs && (
									<>
										<p className="text-xl lg:text-2xl font-bold mb-0">{isNonOOs.waitlist_popup_form_title_thanks}</p>
										<p className="text-gray-600"
											dangerouslySetInnerHTML={{ __html: `${isNonOOs.waitlist_popup_form_description_thanks} <strong>${data.title}</strong> is back!` }}
										/>
										{/* {stockDate && stockDate !== '' && (
											<p className="font-bold mb-[1rem] mt-2">{stockDate}</p>
										)} */}
									</>
								)}
								{restockType !== 'no' && (
									<div className={`relative flex items-stretch w-full flex-col ${success ? 'hidden mt-4' : 'mt-2'}`}>
										<label htmlFor="email-waitlist" id="waitlistPopupInput" className="sr-only">waitlist popup input</label>
										<input ref={inputRef} autoComplete="off" id="email-waitlist" type="email" placeholder={waitlistPopupData.email_placeholder} className="block w-full rounded-[4px] bg-white text-gray-800 px-[1em] py-[14px] border border-gray-400" aria-label="waitlistPopupInput" />
										{formError && <span className="mt-1 font-size-sm text-primary">{waitlistPopupData.email_invalid}</span>}
										<Button disabled={success} type="submit" buttonClass="btn-primary border-0 w-full mt-1 rounded-[4px] font-bold py-g">{waitlistPopupData.waitlist_popup_form_submit}</Button>
									</div>
								)}
							</>
						)}
					</form>
				</div>
			</div>
		</div>
	)
};

export default Waitlist;
