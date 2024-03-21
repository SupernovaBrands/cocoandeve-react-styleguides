import Search from '../../src/images/icons/search.svg';
import ChevronDown from '../../src/images/icons/chevron-down.svg';
import Spin from '../../src/images/icons/spin.svg';

export default function Buttons() {
	return (
		<div className="container my-4">
			<h1>Buttons</h1>
			<button className="bg-primary hover:bg-primary-darken rounded border border-transparent font-bold text-white py-[9px] px-[28px] mb-2">
				Button
			</button>
			<br />
			<button className="bg-transparent hover:bg-primary hover:text-white rounded border border-primary font-bold text-primary py-[9px] px-[28px] mb-2">
				Button
			</button>
			<br />
			<button className="bg-primary hover:bg-primary-darken rounded border border-transparent font-bold text-white py-[9px] px-[28px] mb-2">
				Button a tag
			</button>
			<br />
			<button className="bg-primary hover:bg-primary-darken rounded border border-transparent font-bold text-white py-[9px] px-[28px] flex items-center">
				Button With icon <span className='ml-[5px]'><Search className="h-[12px]" fill="white"/></span>
			</button>
			<br />
			<button className="bg-primary hover:bg-primary-darken rounded border border-transparent font-bold text-white py-[9px] px-[28px] flex items-center">
				Shop <span className='ml-[5px]'><ChevronDown className="h-[12px]" fill="white"/></span>
			</button>
			<br />
			<button className="bg-primary hover:bg-primary-darken rounded-lg border-2 border-primary font-bold text-white py-[13px] px-[54px] mb-2">
				Button Large
			</button>
			<br />
			<button className="bg-primary hover:bg-primary-darken rounded-lg border-2 border-transparent font-bold text-white py-[13px] px-[54px] mb-2">
				<Spin className="animate-spin h-[16px] w-[16px] text-white" fill="white"/>
			</button>
			<br />
			<button className="bg-transparent hover:bg-primary hover:text-white rounded-lg border-2 border-primary font-bold text-primary py-[13px] px-[54px] mb-2">
				Button Large
			</button>
			<br />
			<button className="bg-primary hover:bg-primary-darken w-full rounded border border-transparent font-bold text-white py-[9px] px-[28px] mb-2">
				Button Block
			</button>
			<br />
			<button className="bg-transparent hover:bg-primary hover:text-white w-full rounded border border-primary font-bold text-primary py-[9px] px-[28px] mb-2">
				Button Block
			</button>
			<br />
			<button className="bg-primary hover:bg-primary-darken w-full rounded-lg border border-transparent font-bold text-white py-[13px] px-[54px] mb-2">
				Button Large Block
			</button>
			<br />
			<button className="bg-transparent hover:bg-primary hover:text-white w-full rounded-lg border-2 border-primary font-bold text-primary py-[13px] px-[54px] mb-2">
				Button Large Block
			</button>
		</div>
	);
}
