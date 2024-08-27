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
	handleSubmit: any
	dateRef: any
	monthRef: any
}
const Birthday: React.FC<BirthdayProp> = ({handleClose, data, handleSubmit, dateRef, monthRef}) => (
	<div className="modal-content bg-primary-light-second">
		<div className="modal-body p-0">
			<CloseButton handleClose={handleClose} className="text-black" />
			<div className="flex flex-wrap justify-content-end p-0 mx-0">
				<picture className="w-full lg:w-1/2 p-0">
					<source srcSet={data.srcSet} media="(min-width: 992px)" />
					<img src={data.src} className="w-full" />
				</picture>
				<form onSubmit={handleSubmit} className="w-full lg:w-1/2 lg:pt-5 pb-5 px-3 lg:px-4">
					<h2 className="h1 text-center mb-1">{data.title}</h2>
					<p className="font-size-sm mb-3 text-center">{data.desc}</p>
					<div className="flex flex-wrap -mx-hg lg:-mx-g px-g">
						<div className="relative flex flex-wrap items-stretch mb-1 w-5/12 lg:w-1/2 pr-hg lg:pr-g pl-0">
							<input ref={dateRef} className="relative block grow shrink w-[1%] bg-gray-400" type="number" placeholder="Date" min="1" max="31" />
						</div>
						<div className="relative flex flex-wrap items-stretch mb-1 w-7/12 lg:w-1/2 pl-0">
							<select ref={monthRef} className="custom-select" defaultValue="">
								<option value="">Month</option>
		                        <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
		                    </select>
		            	</div>
		            </div>
					<div className="flex flex-wrap -mx-hg lg:-mx-g px-g">
						<Button type="submit" buttonClass="btn-primary mr-lg-g w-full border-0">Submit</Button>
					</div>
				</form>
			</div>
		</div>
	</div>
);

export default Birthday
