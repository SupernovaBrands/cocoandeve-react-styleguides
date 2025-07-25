import parse from 'html-react-parser';
import { useState, useEffect } from "react";
import CountriesOptions from "~/components/countries-options";
import CheckBox from "~/components/CheckBox";
import { validateEmail, validatePhone } from "~/modules/utils";
import {
	getCookie,
	setCookie,
} from '~/modules/utils';

type waitlistProps = {
	multiOption: boolean;
	formId: string;
	waitlistTitle: string;
	waitlistTitle1: string;
	waitlistTitle2: string;
	waitlistTitle3: string;
	waitlistTitle4: string;
	formDescription: string;
	formDescription1: string;
	formDescription2: string;
	formDescription3: string;
	formDescription4: string;
	titleThanks: string;
	formDescriptionThanks: string;
}

const ProductWaitlist = (props: any) => {
	const [tos, setTos] = useState(false);
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
	const [phoneError, setPhoneError] = useState(false);
    const [phoneCode, setPhoneCode] = useState('+65');
	const [showSuccess, setShowSuccess] = useState(false);
	const [validForm, setValidForm] = useState(false);
	const [restockType, setRestockType] = useState(null);
	const OOS = 'OUT OF STOCK';

	//@ts-ignore
	const [data, setData] = useState<waitlistProps>({});

    const submitForm = (e:any) => {
        e.preventDefault();
        props.onSubmitWaitlist({email, phoneCode, phoneNumber, smsBump: data.formId, fallback: () => {
            setShowSuccess(true);
			setCookie(`waitlist_${props.handle}`, true, 1);
        }});
    }

	const changeTos = (e:any) => {
		setTos(e.target.checked);
	}

    const changePhone = (e:any) => {
        const val = e.target.value;

        setPhoneNumber(val);
        if (val && val.length > 4 && !validatePhone(val)) {
            setPhoneError(true);
        } else {
            setPhoneError(false);
        }
    }


	const changeEmail = (e:any) => {
        const val = e.target.value;
        setEmail(val);
        if (val && val.length > 2 && !validateEmail(val)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    }

	const changePhoneCode = (e:any) => {
		if (e) {
			setPhoneCode(`+${e}`);
		}
	}

    useEffect(() => {
        if (!emailError && !phoneError && tos && (email || phoneNumber)) {
            setValidForm(true);
        } else {
            setValidForm(false);
        }
    }, [email, phoneNumber, phoneCode, tos]);


	useEffect(() => {
		data.multiOption = false;
		const wlTans = props.vrt_phandles_tans?.split(',') || [];
		const wlWrap = props.vrt_phandles_wraps?.split(',') || [];
		const wlHair = props.vrt_phandles_hairs?.split(',') || [];
		const wlBody = props.vrt_phandles_body?.split(',') || [];
		const wlComingSoon = props.vrt_phandles_cs?.split(',') || [];

		if (wlComingSoon.includes(props.handle)) {
			data.formId = props.vrt_cs_smsbumpid;
			data.multiOption = true;
			data.waitlistTitle = props.vrt_waitlist_form_title_cs;
			data.waitlistTitle1 = props.vrt_waitlist_form_title_cs_2;
			data.waitlistTitle2 = props.vrt_waitlist_form_title_cs_3;
			data.waitlistTitle3 = props.vrt_waitlist_form_title_cs_4;
			data.waitlistTitle4 = props.vrt_waitlist_form_title_cs_5;
			data.formDescription = props.vrt_waitlist_form_description_cs;
			data.formDescription1 = props.vrt_waitlist_form_description_cs_2;
			data.formDescription2 = props.vrt_waitlist_form_description_cs_3;
			data.formDescription3 = props.vrt_waitlist_form_description_cs_4;
			data.formDescription4 = props.vrt_waitlist_form_description_cs_5;
			data.titleThanks = props.vrt_waitlist_form_title_thanks_cs;
			data.formDescriptionThanks = props.vrt_waitlist_form_desc_thanks_cs;
		} else if (wlTans.includes(props.handle)) {
			data.formId = props.vrt_tan_smsbumpid;
			data.waitlistTitle = props.vrt_waitlist_form_title;
			data.formDescription = props.vrt_waitlist_form_description;
			data.titleThanks = props.vrt_waitlist_form_title_thanks;
			data.formDescriptionThanks = props.vrt_waitlist_form_description_thanks;
		} else if (wlWrap.includes(props.handle)){
			data.formId = props.vrt_wrap_smsbumpid;
			data.waitlistTitle = props.vrt_waitlist_form_title_wrap;
			data.formDescription = props.vrt_waitlist_form_description_wrap;
			data.titleThanks = props.vrt_waitlist_form_title_thanks_wrap;
			data.formDescriptionThanks = props.vrt_waitlist_form_description_thanks_wrap;
		} else if (wlHair.includes(props.handle)) {
			data.formId = props.vrt_hair_smsbumpid;
			data.waitlistTitle = props.vrt_waitlist_form_title_hair;
			data.formDescription = props.vrt_waitlist_form_description_hair;
			data.titleThanks = props.vrt_waitlist_form_title_thanks_hair;
			data.formDescriptionThanks = props.vrt_waitlist_form_description_thanks_hair;
		} else if (wlBody.includes(props.handle)) {
			data.formId = props.vrt_body_smsbumpid;
			data.waitlistTitle = props.vrt_waitlist_form_title_body;
			data.formDescription = props.vrt_waitlist_form_description_body;
			data.titleThanks = props.vrt_waitlist_form_title_thanks_body;
			data.formDescriptionThanks = props.vrt_waitlist_form_description_thanks_body;
		} else {
			data.formId = props.vrt_smsbumpid;
			data.waitlistTitle = props.vrt_waitlist_form_title;
			data.formDescription = props.vrt_waitlist_form_description;
			data.titleThanks = props.vrt_waitlist_form_title_thanks;
			data.formDescriptionThanks = props.vrt_waitlist_form_description_thanks;
		}

		setData({...data});

		if (getCookie(`waitlist_${props.handle}`)) {
			setShowSuccess(true);
		}
	}, []);

	useEffect(() => {
		if (props.selectedVariant) {
			// default title & description is first message
			const wlComingSoon = props.vrt_phandles_cs?.split(',') || [];
			if (wlComingSoon.includes(props.handle)) {
				data.waitlistTitle = props.vrt_waitlist_form_title;
				data.formDescription = props.vrt_waitlist_form_description;
			}



			const variantId = parseInt(props.selectedVariant.id.replace('gid://shopify/ProductVariant/', ''), 10) || 0;

			const variantId1 = props.vrt_waitlist_form_varid_cs?.split(',').map((v) => parseInt(v.trim(), 10)) || [];
			const variantIds2 = props.vrt_waitlist_form_varid_cs_2?.split(',').map((v) => parseInt(v.trim(), 10)) || [];
			const variantIds3 = props.vrt_waitlist_form_varid_cs_3?.split(',').map((v) => parseInt(v.trim(), 10)) || [];
			const variantIds4 = props.vrt_waitlist_form_varid_cs_4?.split(',').map((v) => parseInt(v.trim(), 10)) || [];
			const variantIds5 = props.vrt_waitlist_form_varid_cs_5?.split(',').map((v) => parseInt(v.trim(), 10)) || [];

			if (variantId1.includes(variantId)) {
				data.waitlistTitle = props?.vrt_waitlist_restock_type === 'no' && !props.vrt_waitlist_form_title_cs ? OOS : props.vrt_waitlist_form_title_cs;
				data.formDescription = props.vrt_waitlist_form_description_cs;
				setRestockType(props?.vrt_waitlist_restock_type || null);
			} else if (variantIds2.includes(variantId)) {
				data.waitlistTitle = props?.vrt_waitlist_restock_type_2 === 'no' && !props.vrt_waitlist_form_title_cs_2 ? OOS : props.vrt_waitlist_form_title_cs_2;
				data.formDescription = props.vrt_waitlist_form_description_cs_2;
				setRestockType(props?.vrt_waitlist_restock_type_2 || null);
			} else if (variantIds3.includes(variantId)) {
				data.waitlistTitle = props?.vrt_waitlist_restock_type_3 === 'no' && !props.vrt_waitlist_form_title_cs_3 ? OOS : props.vrt_waitlist_form_title_cs_3;
				data.formDescription = props.vrt_waitlist_form_description_cs_3;
				setRestockType(props?.vrt_waitlist_restock_type_3 || null);
			} else if (variantIds4.includes(variantId)) {
				data.waitlistTitle = props?.vrt_waitlist_form_title_cs_4 === 'no' && !props.vrt_waitlist_form_title_cs_4 ? OOS : props.vrt_waitlist_form_title_cs_4;
				data.formDescription = props.vrt_waitlist_form_description_cs_4;
				setRestockType(props?.vrt_waitlist_restock_type_4 || null);
			} else if (variantIds5.includes(variantId)) {
				data.waitlistTitle = props?.vrt_waitlist_form_title_cs_5 === 'no' && !props.vrt_waitlist_form_title_cs_5 ? OOS : props.vrt_waitlist_form_title_cs_5;
				data.formDescription = props.vrt_waitlist_form_description_cs_5;
				setRestockType(props?.vrt_waitlist_restock_type_5 || null);
			} else {
				setRestockType(null);
			}
			setData({...data});
		}
	}, [props.selectedVariant.id]);

	return (
		<>
			{ !showSuccess && <div ref={props.forwardRef} className="w-full p-3 mb-3 rounded-lg bg-pink-light" data-product-id={props.productId}>
				<p className="font-bold mb-2 text-[1.5em] lg:text-lg">{data.waitlistTitle ?? 'Join the waitlist'}</p>
				{/* <p className="mb-2" dangerouslySetInnerHTML={{__html: data.formDescription ?? "Be the first to know when <strong>Sunny Honey Bali Bronzing Foam in medium shade</strong> is back in stock." }}></p> */}
				<p className="mb-2">
					{restockType === null && parse(data.formDescription?.replace('{{productName}}', 'product') ?? "Be the first to know when <strong>Sunny Honey Bali Bronzing Foam in medium shade</strong> is back in stock.")}
					{restockType === 'yes' && `Our product has become a worldwide hit and we're struggling to keep up with the demand. But don't worry, we're on it! Sign up to join the waitlist.`}
					{restockType === 'no' && `Our product has been such a hit that it's sold out and unfortunately, we won’t be restocking it. We appreciate your support and hope you'll explore our other amazing products!`}
				</p>
				{/* <form data-pdp="false" data-product-id="product-id"> */}
				{restockType !== 'no' && (
					<>
						{ !props.hide_phone && <><div className="row">
							<div className="relative flex items-stretch w-full mb-g">
								<label htmlFor="waitlist-phone" className="border-r max-w-[5em] px-2 text-base font-normal leading-normal text-gray-900 text-center bg-gray-300  border-gray-100 rounded block appearance-none w-full text-gray-800  border-gray-200  bg-white pr-0 relative flex-auto min-w-[0] mb-0 rounded-tr-none rounded-br-none">
									<CountriesOptions onChangeFilter={changePhoneCode}/>
									<div className="flex h-full items-center border-l-gray-400">
										<span className="mr-1 text-gray-800">{phoneCode}</span>
										<svg className="h-[1em] font-size-sm" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.6 22.6"><path d="M1.9 5.4l9.4 9.4 9.4-9.4 1.9 1.9-11.3 11.3L0 7.3l1.9-1.9z"></path></svg>
									</div>
								</label>
								<input onChange={(e:any) => changePhone(e)} id="waitlist-phone" className="placeholder:text-gray-800 focus:outline-none block border-none appearance-none w-full py-[13px] px-2 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded border-left-1 rounded-tl-none rounded-bl-none" type="tel" placeholder="Phone number" aria-label="phone" />
							</div>
							{/* { phoneError && <small className="col-12 text-primary phone-error">Please enter a valid phone number</small> } */}
						</div>
						<span className="block mb-g text-center w-full ">- Or -</span></>}
						<div className="row">
							<div className="relative flex items-stretch w-full flex-grow max-w-full flex-1 mb-1">
								<input onChange={(e:any) => changeEmail(e)} className="placeholder:text-gray-800 focus:outline-none block appearance-none w-full py-[13px] px-2 text-base leading-normal bg-white text-gray-800 rounded-h border-left-1" type="email" name="email" aria-label="email" placeholder="Enter your email" />
							</div>
							{/* { emailError && <small className="col-12 text-primary email-error">Please enter a valid email address</small> } */}
						</div>
						<div className="flex flex-wrap items-center justify-start">
						<div className="-mt-1 w-full">
							<CheckBox boxSmall={true} onChange={changeTos} borderLight={true} labelClass="flex justify-content-center my-1 relative pl-[25px] font-size-sm mt-2" id="agreement-waitlist" checked={tos}>
								<span className="text-xs">I agree to the <a className="text-xs text-body underline" href="/pages/privacy-policy" target="_blank">Privacy Policy</a></span>
							</CheckBox>
							{/* {!tos && <small className="block w-full text-primary terms-error -mt-1 text-center">You have not agreed to the Privacy Policy & ToS</small>} */}
						</div>
						</div>
						<div className="flex my-1">
							<input onClick={submitForm} disabled={!validForm} className={`${!validForm ? 'opacity-[0.65]' : ''} inline-block align-middle text-center select-none border whitespace-no-wrap  px-3  no-underline  leading-tight text-base bg-blue-600 hover:bg-blue-600 w-full bg-primary text-white py-1 font-bold pt-[13px] pb-[13px] rounded-[8px]`} type="button" value="Submit" />
						</div>
						<p className="text-xs">Receive exclusive offers via email or automated marketing SMS (4/mth). For more info see our <a className="link-secondary text-underline text-xs text-body underline" target="_blank" href="/pages/privacy-policy" aria-label="Privacy Policy">Privacy Policy</a>. Opt out any time. Msg & data rates may apply. Consent not required for purchase.</p>
					{/* </form> */}
					</>
				)}
				{restockType === 'no' && (
					<div className="flex my-1">
						<a className="btn btn-primary btn-lg w-full hover:bg-primary-dark py-[13px] no-underline hover:text-white hover:no-underline border:primary" href="/collections/all">Shop other products</a>
					</div>
				)}
			</div> }
			{ showSuccess && <div className="w-100 p-3 mb-3 rounded">
				<p className="font-bold mb-2 text-[1.5em] lg:text-lg">{data.titleThanks ?? `YOU'LL HEAR FROM US SOON`}</p>
				<p className="font-size-sm mb-2">
					{!['yes', 'no'].includes(restockType) && parse(data.formDescriptionThanks?.replace('{{productName}}', 'product') || '')}
					{['yes', 'no'].includes(restockType) && 'in the meantime.. sit back, relax, hair masque & chill!'}
				</p>
				<a href="/collections/all" className="btn btn-primary btn-lg w-full hover:bg-primary-dark py-[13px] no-underline hover:text-white hover:no-underline">Shop other products</a>
			</div> }
		</>
	);
};

export default ProductWaitlist;
