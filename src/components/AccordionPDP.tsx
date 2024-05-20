import PlusIcon from '~/images/icons/plus.svg';
import MinusIcon from '~/images/icons/minus.svg';
import { Component, useState } from 'react';

const AccordionPDP = (props: any) => {
	interface Accordion {
		id: number;
		title: string;
		text: string;
		component: any;
	};
	const { data } = props;
	const onClick = (id:any) => {
		globalThis.document.getElementById(`accordion-${id}`).scrollIntoView();
		props.onClick(id)
	}

	return (
		<div className="border-t-0 border-b-0 md:border-t md:border-b border-gray-500 accordion w-full accordion-flush" id="accordionSimple">
			{data.map((d: Accordion) => (
				<div key={d.id} className="accordion-item border-t border-b border-gray-500">
					<div id={`accordion-${d.id}`} className={`cursor-pointer flex w-full justify-between items-center py-3 md:py-2 ${props.openIndex === d.id ? 'border-b border-gray-500 accordion-opened' : ''}`} onClick={() => onClick(d.id)}>
						<span className="text-body no-underline font-bold">{d.title}</span>
						{ props.openIndex === d.id && <MinusIcon className={`transform transition-transform h-[15px] w-[15px]`}/> }
						{ props.openIndex !== d.id && <PlusIcon className={`transform transition-transform h-[15px] w-[15px]`}/> }
					</div>
					<div className={`transition-all overflow-hidden ${props.openIndex === d.id ? 'duration-1000' : 'duration-75 max-h-0'}`}>
						{ d.text && <div className="pt-1 pb-1 text-sm" dangerouslySetInnerHTML={{ __html: d.text }}></div> }
						{ d.component && <div className="pt-1 pb-1 text-sm">{ d.component }</div>}
					</div>
				</div>
			))}
		</div>
	)
};

export default AccordionPDP;
