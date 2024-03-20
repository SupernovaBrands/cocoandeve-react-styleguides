
import { useState } from 'react';
import ChevronDownIcon from '@/images/icons/chevron-down.svg';
const Accordions = () => {
	const [openIndex, setOpenIndex] = useState(0);

	const data = [{
		id: 1,
		title: 'Collapsible #1',
		text: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.'
	},{
		id: 2,
		title: 'Collapsible #2',
		text: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.'
	},{
		id: 3,
		title: 'Collapsible #3',
		text: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.'
	}];
	const toggleCard = (id: number) => {
		if (id === openIndex) {
			setOpenIndex(0);
		} else {
			setOpenIndex(id);
		}
	};
	return (
		<div className="container my-4">
			<h1>Accordion</h1>
			<div className="border-t border-b border-gray-500 accordion w-full accordion-flush" id="accordionSimple">
				{data.map((d) => (
					<div key={d.id} className="accordion-item border-t border-b border-gray-500">
						<div className={`cursor-pointer flex w-full justify-between items-center text-primary hover:text-primary-darken hover:underline pt-[12px] pb-[12px] ${openIndex === d.id ? 'border-b border-gray-500' : ''}`} onClick={() => toggleCard(d.id)}>
							<span>{d.title}</span>
							<ChevronDownIcon className={`transform transition-transform h-[12px] w-[12px] ${openIndex === d.id ? 'rotate-180' : ''}`}/>
						</div>
						<div className={`transition-all overflow-hidden ${openIndex === d.id ? 'duration-1000 max-h-screen' : 'duration-75 max-h-0'}`}>
							<p className="pt-1 pb-1">{d.text}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Accordions;
