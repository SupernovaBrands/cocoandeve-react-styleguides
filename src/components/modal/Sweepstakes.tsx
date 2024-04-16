import InputCountry from '~/components/InputCountry';
import CloseButton from '~/components/modal/CloseButton';
import Button from '~/components/Button';

interface SweepstakesData {
	src: string
	srcSet: string
	title: string
	subtitle: string
}

type SweepstakesProp = {
	handleClose: () => void
	data: SweepstakesData
}

const Sweepstakes: React.FC<SweepstakesProp> = ({ handleClose, data }) => (
	<div className="modal-content mx-g lg:mx-4">
		<div className="modal-body px-0 py-0">
			<picture className="w-full lg:hidden">
				<source srcSet={data.srcSet} media="(min-width: 992px)" />
				<img src={data.src} className="w-full h-full" alt="Sweepstakes mobile banner" />
			</picture>
			<div className="px-3 lg:px-4 py-3 lg:py-4 bg-pink-light">
				<div className="flex flex-wrap -mx-hg lg:-mx-g justify-end lg:mb-g mb-0">
					<div className="hidden lg:block w-3/4 lg:w-7/12 lg:pl-0 text-center pr-0 lg:pr-g">
						<h2 className="modal--sweepstakes__title h1 mb-0 text-bold mt-1 lg:mt-1 lg:mb-0 text-body">{data.title}</h2>
						<p className="lg:mb-0 lg:mt-1 text-gray-600" dangerouslySetInnerHTML={{ __html: data.subtitle }} />
					</div>
					<div className="lg:hidden w-full pl-0 lg:pl-0 text-center pr-0 lg:pr-g">
						<h2 className="modal--sweepstakes__title h2 mb-1 text-bold mt-1 lg:mt-1 lg:mb-0 text-body">{data.title}</h2>
						<p className="lg:mb-0 lg:mt-1 font-size-sm mb-1 text-gray-600" dangerouslySetInnerHTML={{ __html: data.subtitle }} />
					</div>
				</div>
				<div id="waitlist-page" className="flex flex-wrap justify-end" data-page-type="Sweepstakes" data-form-id="#sweepstakes-popup__form" data-email-form="#sweepstakes__email">
					<form id="sweepstakes-popup__form" data-page="sweeptakes" className="modal--sweepstakes__form lg:w-7/12 lg:pl-0 mt-1 lg:mt-0" data-thank-you-message="You’re in!">
						<div className="relative flex items-stretch w-full mb-25">
							<input id="sweepstakes__email" data-regsource="sweepstakes" data-page="sweepstakes" className="block w-full bg-white text-gray-800" type="email" value="" placeholder="Email" />
						</div>
						<input type="checkbox" name="tos" className="hidden" value="true" checked />
						<div className="text-center mb-25 sweepstakes-popup__separator">and / or</div>
						<div className="relative flex items-stretch w-full mb-g">
							<InputCountry id="modal--sweepstakes__country" className="bg-white" />
							<input className="block w-full py-g px-2 mb-1 -ml-[1px] bg-white border-l-0 rounded-tl-none rounded-bl-none" type="phone" value="" placeholder="Phone number" />
						</div>
						<Button id="sweepstakes__submit" buttonClass="btn-primary w-full">Register now</Button>
						<p className="hidden lg:block sweepstakes-popup__toc text-center mb-1 mt-1 font-size-sm text-gray-600">By signing up you agree to receive exclusive offers via email/SMS, for more information see our <a href="/pages/privacy-policy-new" className="text-primary underline font-size-sm">Privacy Policy</a></p>
						<p className="lg:hidden sweepstakes-popup__toc text-center mb-1 mt-1 font-size-xs text-gray-600">By signing up you agree to receive exclusive offers via email/SMS, for more information see our <a href="/pages/privacy-policy-new" className="text-primary underline font-size-xs">Privacy Policy</a></p>
					</form>
				</div>
			</div>
			<CloseButton handleClose={handleClose} />
		</div>
	</div>
);

export default Sweepstakes;
