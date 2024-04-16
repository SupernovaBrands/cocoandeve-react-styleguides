import CloseButton from '~/components/modal/CloseButton';
import Button from '~/components/Button';

interface ExitIntentData {
	src: string
	title: string
	desc1: string
	desc2: string
	text: string
}

type ExitIntentProp = {
	handleClose: () => void
	data: ExitIntentData
}

const ExitIntent: React.FC<ExitIntentProp> = ({ handleClose, data }) => (
	<div className="modal-content">
		<div className="modal-body p-0">
			<figure className="m-0 relative">
				<img src={data.src} className="w-full" />
				<figcaption className="absolute text-white p-3 lg:p-4 flex flex-col justify-center text-center top-0 bottom-0 right-0">
					<p className="exit-intent-popup__title font-bold mb-2 text-[1.875rem] leading-[2.344rem]" dangerouslySetInnerHTML={{ __html: data.title }} />
					<p className="flex items-center">
						<span className="text-lg font-bold mr-g mb-25" dangerouslySetInnerHTML={{ __html: data.desc1 }} />
						<span className="text-[4rem] leading-[3.125rem] font-bold">{data.desc2}</span>
					</p>
					<p className="exit-intent-popup__text h4 mb-1">{data.text}</p>
					<Button>Count me in</Button>
				</figcaption>
			</figure>
			<CloseButton handleClose={handleClose} className="text-white" />
		</div>
	</div>
);

export default ExitIntent;
