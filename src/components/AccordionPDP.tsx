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
		const afterClick = () => {
			const scrollDiv = globalThis.document.getElementById(`accordionSimple`).offsetTop + 41;
			globalThis.window.scrollTo({ top: scrollDiv - 100, behavior: 'smooth'});
		}

		props.onClick(id, afterClick);
	}

	return (
		<div className="border-t-0 border-b-0 md:border-t md:border-b border-gray-500 accordion w-full accordion-flush" id="accordionSimple">
			{data.map((d: Accordion, index: number) => (
				<div key={d.id} className={`accordion-item border-t border-b border-gray-500 ${index === data.length - 1 ? 'pb-3 lg:pb-0' : ''}`}>
					<div id={`accordion-${d.id}`} className={`cursor-pointer flex w-full justify-between items-center ${props.openIndex === d.id ? `pt-3 md:pt-[1.875rem] ${index === 0 ?  'pb-3' : 'pb-3'}` : 'py-3 md:py-[1.875rem]'} ${props.openIndex === d.id ? 'border-gray-500 accordion-opened' : ''}`} onClick={() => onClick(d.id)}>
						<strong className="text-body no-underline">{d.title}</strong>
						{ props.openIndex === d.id && <MinusIcon className={`transform transition-transform h-[16px] w-[16px] mb-[3px]`}/> }
						{ props.openIndex !== d.id && <PlusIcon className={`transform transition-transform h-[16px] w-[16px] mb-[3px]`}/> }
					</div>
					<div className={`accordion-content ${props.openIndex === d.id ? 'accordion-content--open' : 'accordion-content--close'}`}>
						{ d.text && <div className="pt-0 pb-1 text-sm" dangerouslySetInnerHTML={{ __html: d.text }}></div> }
						{ d.component && <div className={`pt-0 pb-3 text-sm`}>{ d.component }</div>}
					</div>
				</div>
			))}
		</div>
	)
};

export default AccordionPDP;
