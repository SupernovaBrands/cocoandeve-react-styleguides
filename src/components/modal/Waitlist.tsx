import Close from '@/images/icons/close.svg';

const Waitlist = (props: any) => {
	const { handleClose, data } = props;
	return (
		<div className="modal-content overflow-hidden bg-pink-light px-g relative">
			<Close onClick={handleClose} className="cursor-pointer w-[14px] h-[14px] absolute right-[14px] top-[14px]"/>
			<div className="modal-body pt-0 pb-3 px-3 lg:py-5 lg:px-2">
				<div className="flex flex-wrap items-center justify-center">
					<div className="w-full lg:w-1/2 text-center">
						<img alt="Waitlist Popup" className="waitlist-popup-image w-full max-w-[250px] md:max-w-none" loading="lazy" src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/b653f2b3-08b7-421c-351a-3a5b70a27e00/public" />
					</div>
					<div className="w-full lg:w-1/2 text-center mt-n1 mt-lg-0">
						<strong className="waitlist-popup__title mb-1 text-xl lg:text-2xl">{data.title}</strong>
						<p className="text-gray-600 mb-1" dangerouslySetInnerHTML={{ __html: data.desc }} />
						{data.date && (<strong className="mt-2">{data.date}</strong>)}
						<div className="relative flex items-stretch w-full mt-2 flex-col">
							<label htmlFor="email-waitlist" id="waitlistPopupInput" className="sr-only">waitlist popup input</label>
							<input id="email-waitlist" type="email" placeholder={data.email} className="border-0 mr-0 block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 rounded" aria-label="waitlistPopupInput" />
							<small className="mt-1 hidden">Invalid Email Address</small>
							<button type="submit" className="bg-primary hover:bg-primary-darken w-full rounded border-0 border-transparent font-bold text-white py-g">{data.ctaText}</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Waitlist;
