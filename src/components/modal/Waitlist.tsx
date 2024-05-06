import Button from '../Button';
import CloseButton from './CloseButton';

interface WatilistData {
	image: string
	title: string
	desc: string
	date: string
	email: string
	ctaText: string
	invalidEmail: string
}

type WaitlistProp = {
	handleClose: () => void
	data: WatilistData
}

const Waitlist: React.FC<WaitlistProp> = ({ handleClose, data }) => (
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
					<strong className="mb-1 text-xl lg:text-2xl">{data.title}</strong>
					<p className="text-gray-600 mb-g text-base" dangerouslySetInnerHTML={{ __html: data.desc }} />
					{data.date && (<strong className="mt-2">{data.date}</strong>)}
					<div className="relative flex items-stretch w-full mt-2 flex-col">
						<label htmlFor="email-waitlist" id="waitlistPopupInput" className="sr-only">waitlist popup input</label>
						<input id="email-waitlist" type="email" placeholder={data.email} className="block w-full mb-1 bg-white text-gray-800" aria-label="waitlistPopupInput" />
						<small className="mt-1 hidden">Invalid Email Address</small>
						<Button type="submit" className="btn-primary w-full rounded font-bold py-g">{data.ctaText}</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default Waitlist;
