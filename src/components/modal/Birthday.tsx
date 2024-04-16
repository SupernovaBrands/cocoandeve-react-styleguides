import CloseButton from '~/components/modal/CloseButton';
import Button from '../Button';

interface BirthdayData {
	src: string
	srcSet: string
	title: string
	desc: string
}

type BirthdayProp = {
	handleClose: () => void
	data: BirthdayData
}
const Birthday: React.FC<BirthdayProp> = ({handleClose, data}) => (
	<div className="modal-content bg-primary-light-second">
		<div className="modal-body p-0">
			<CloseButton handleClose={handleClose} className="text-black" />
			<div className="flex flex-wrap justify-content-end p-0 mx-0">
				<picture className="w-full lg:w-1/2 p-0">
					<source srcSet={data.srcSet} media="(min-width: 992px)" />
					<img src={data.src} className="w-full" />
				</picture>
				<form className="w-full lg:w-1/2 lg:pt-5 pb-5 px-3 lg:px-4">
					<h2 className="h1 text-center mb-1">{data.title}</h2>
					<p className="font-size-sm mb-3 text-center">{data.desc}</p>
					<div className="flex flex-wrap -mx-hg lg:-mx-g px-g">
						<div className="relative flex flex-wrap items-stretch mb-1 w-5/12 lg:w-1/2 pr-hg lg:pr-g pl-0">
							<input className="relative block grow shrink w-[1%] bg-gray-400" type="number" placeholder="Date" />
						</div>
						<div className="relative flex flex-wrap items-stretch mb-1 w-7/12 lg:w-1/2 pl-0">
							<select className="custom-select">
								<option selected>Select</option>
		                        <option>1</option>
		                        <option>2</option>
		                        <option>3</option>
		                    </select>
		            	</div>
		            </div>
					<div className="flex flex-wrap -mx-hg lg:-mx-g px-g">
						<Button buttonClass="btn-primary mr-lg-g w-full border-0">Submit</Button>
					</div>
				</form>
			</div>
		</div>
	</div>
);

export default Birthday
