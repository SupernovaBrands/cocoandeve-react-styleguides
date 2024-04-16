import CloseButton from '~/components/modal/CloseButton';
import InputCountry from '~/components/InputCountry';
import Button from '~/components/Button';
import Paste from '~/images/icons/paste.svg';
import { useState } from 'react';

interface NewsletterData {
	src: string
	srcSet: string
	title: string
	subtitle: string
	desc: string
	tc: string
}

type NewsletterProp = {
	handleClose: () => void
	data: NewsletterData
}

const Newsletter: React.FC<NewsletterProp> = ({ handleClose, data }) => {
	const [submitted, setSubmitted] = useState(false);
	const handleForm = () => {
		// submit form here
		setSubmitted(true);
	};
	return (
		<div className="modal-content bg-secondary">
			<picture className="absolute w-full lg:h-full lg:w-auto">
				<source srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/Rectangle_2241.png?v=1696414159" media="(min-width: 992px)" />
				<img src="https://cdn.shopify.com/s/files/1/0073/5186/1332/files/newsletter-bigger-mobile.png?v=1646639302" className="w-full lg:w-auto" />
			</picture>
			<div className="modal-body px-0 pb-3 pt-[10em] lg:pt-4 lg:pb-3">
				<CloseButton handleClose={handleClose} className="text-white" />
				<div className="flex flex-wrap justify-end mx-0">
					{!submitted && (
						<form className="lg:w-1/2 lg:pr-4 pr-3 pl-3 lg:pl-0">
							<h2 className="h1 text-center text-white mb-0">{data.title}</h2>
							<p className="font-size-lg text-white font-weight-bold text-center mb-g font-bold leading-[1.563rem]">{data.subtitle}</p>
							<p className="text-white font-size-sm mb-g text-center">{data.desc}</p>
							<div className="relative flex items-stretch w-full mb-0">
								<input id="modal--newsletter__email" className="block w-full mb-0 bg-white" type="email" placeholder="Email" aria-label="email" />
							</div>
							<p className="text-center text-white mb-1 mt-1">and / or</p>
							<div className="relative flex items-stretch w-full">
								<InputCountry id="modal--newsletter__country" />
								<input id="modal--newsletter__phone" className="block w-full mb-1 -ml-[1px] bg-white border-l-0 rounded-tl-none rounded-bl-none" type="tel" placeholder="Phone number" aria-label="phone" />
							</div>
							<Button type="submit" buttonClass="w-full btn-primary border-0 relative" onClick={handleForm}>Submit</Button>
							<p className="font-size-xs text-white mt-g text-center mb-0 mx-1">{data.tc}</p>
						</form>
					)}
					{submitted && (
						<div className="modal--newsletter__completed lg:w-1/2 pr-4 pl-4 flex items-center justify-center min-h-[25em]">
							<div className="flex flex-wrap justify-center items-center">
								<h2 className="h1 text-center text-white">🎉<br />Sign-up successful! </h2>
								<h3 className="text-center text-white mb-g">Use code for your gift!</h3>
								<Button buttonClass="w-full border-0 bg-white text-primary inline-flex justify-center items-center relative">
									COPY: FREEWRAP <Paste className="svg--current-color ml-25" />
								</Button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
};

export default Newsletter;
