import CloseButton from '~/components/modal/CloseButton';
import Button from '~/components/Button';

interface ExitIntentData {
	bg_image: any
	title: string
	upto_text: string
	off_text: string
	extra_text: string
	button_url: string
	button_text: string
	text_color: string
}

type ExitIntentProp = {
	handleClose: () => void
	data: ExitIntentData
}

const ExitIntent: React.FC<ExitIntentProp> = ({ handleClose, data }) => (
	<div className="modal-content flex flex-col w-full outline-0">
		<div className="modal-body p-0">
			<figure className="m-0 relative">
				<img src={data?.bg_image?.url} className="w-full" />
				<figcaption className={`absolute p-3 lg:p-4 flex flex-col justify-center text-center top-0 bottom-0 right-0 ${data?.text_color ? data?.text_color : 'text-body'}`}>
					<p className="exit-intent-popup__title font-bold mb-2 text-[1.875rem] leading-[2.344rem]" dangerouslySetInnerHTML={{ __html: data.title }} />
					<p className="flex items-center">
						<span className="text-lg font-bold mr-g mb-25" dangerouslySetInnerHTML={{ __html: data.upto_text }} />
						<span className="text-[4rem] leading-[3.125rem] font-bold">{data.off_text}</span>
					</p>
					<p className="exit-intent-popup__text h4 mb-1">{data.extra_text}</p>
					<a className='w-full items-center rounded font-bold btn-primary px-3 py-1 md:px-4 md:py-g border-0 border-primary no-underline hover:border-primary hover:text-white hover:no-underline inline-flex justify-center relative' href={data.button_url}>{data.button_text}</a>
				</figcaption>
			</figure>
			<CloseButton handleClose={handleClose} className="fill-[#fff] h-[1em!important] text-sm [width:auto!important]" />
		</div>
	</div>
);

export default ExitIntent;
