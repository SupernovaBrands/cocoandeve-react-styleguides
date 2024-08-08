import CloseButton from "./CloseButton";
import CloseCircleDark from '~/images/icons/close-circle-dark.svg';

const Terms = (props: any) => {
	const { handleClose, tcPopups } = props;
	let data = {
		title: 'Terms & Conditions',
		body: '<p className="font-size-sm mb-g">FREE DEEP PORE CLEANSER</p><p className="font-size-sm mb-0">Offer is valid from 5pm AEDT on Thursday 14 April 2022 until 5pm AEDT on Tuesday 26 April 2022. Offer is not applicable to purchases made prior to the start or after the end of this promo period. Offer entitle customers to a free full-sized Deep Pore Cleanser when the code CLEANSER is applied to purchases made through our website <a href="http://www.cocoandeve.com"><span className="s1">www.cocoandeve.com</span></a>. Offer excludes the purchase of gift cards. Minimum spend of USD $50 is required. Offer may not be valid in conjunction with any other discount, code, free gift or promotion. Stocks are limited. We reserve the right to substitute a different product, or otherwise terminate or modify the offer, at any time. Our standard Terms &amp; Conditions apply: </p>'
	}
	if (tcPopups) data = {...data, ...tcPopups};
	return (
		<div className="modal-content mx-1 rounded-none lg:p-1 bg-white">
			<div className="modal-header px-2 py-[1rem]">
				<h2 className="mb-0 pt-1">{tcPopups.title}</h2>
				<CloseButton handleClose={handleClose} className="text-body !w-[1.625em] !h-[1.625em]">
					<CloseCircleDark className="svg--current-color text-body" />
				</CloseButton>
			</div>
			<div className="modal-body px-2 pb-2 pt-0" dangerouslySetInnerHTML={{__html: tcPopups.body}} />
		</div>
	);
};

export default Terms;
