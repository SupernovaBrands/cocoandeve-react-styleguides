import ChevronDownIcon from '@/images/icons/chevron-down.svg';
import { useState } from 'react';

const Accordion = (props: any) => {
	console.log('props', props);
	interface Accordion {
		id: number;
		title: string;
		text: string;
	};
	const { data } = props;
	return (
		<div className="border-t border-b border-gray-500 accordion w-full accordion-flush" id="accordionSimple">
			{data.map((d: Accordion) => (
				<div key={d.id} className="accordion-item border-t border-b border-gray-500">
					<div className={`cursor-pointer flex w-full justify-between items-center text-primary hover:text-primary-darken hover:underline pt-[12px] pb-[12px] ${props.openIndex === d.id ? 'border-b border-gray-500' : ''}`} onClick={() => props.onClick(d.id)}>
						<span>{d.title}</span>
						<ChevronDownIcon className={`transform transition-transform h-[12px] w-[12px] ${props.openIndex === d.id ? 'rotate-180' : ''}`}/>
					</div>
					<div className={`transition-all overflow-hidden ${props.openIndex === d.id ? 'duration-1000 max-h-screen' : 'duration-75 max-h-0'}`}>
						<p className="pt-1 pb-1">{d.text}</p>
					</div>
				</div>
			))}
		</div>
	)
};

export default Accordion;
