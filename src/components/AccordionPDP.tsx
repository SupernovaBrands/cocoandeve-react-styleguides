import PlusIcon from '~/images/icons/plus.svg';
import MinusIcon from '~/images/icons/minus.svg';
import { Component, useState } from 'react';

const AccordionPDP = (props: any) => {
	interface Accordion {
		id: number;
		title: string;
		text: string;
		component: any;
		children?: any;
		isBundlePage?: boolean
	};

	const scrollToId = (id, targetEl) => {
		if (!isDesktop && !targetEl.classList.contains('ingredients--list')) globalThis.document.getElementById(`accordion-${id}`)?.scrollIntoView({ behavior: 'smooth' })
	}
	const { data, isDesktop } = props;
	const onClick = (id:any, targetEl: any) => {
		const afterClick = () => {
			const scrollDiv = globalThis.document.getElementById(`accordionSimple`).offsetTop + 41;
			if (!isDesktop) globalThis.window.scrollTo({ top: scrollDiv - 100, behavior: 'smooth'});
		}

		props.onClick(id, afterClick);
		setTimeout(() => scrollToId(id, targetEl), 150)
	}

	const scrollToView = (id, targetEl) => scrollToId(id, targetEl);

	return (
		<div className={`border-t-0 border-b-0 ${!props.isBundlePage ? 'md:border-t md:border-b' : ''} border-gray-500 accordion w-full accordion-flush`} id="accordionSimple">
			{data.map((d: Accordion, index: number) => (
				<div key={d.id} className={`accordion-item scroll-mt-[10px] border-t border-b border-gray-500`} onClick={(e) => scrollToView(d.id, e.target)}>
					<div id={`accordion-${d.id}`} className={`scroll-mt-[10px] cursor-pointer flex w-full justify-between items-center ${props.openIndex === d.id ? `pt-3 md:pt-[1.875rem] ${index === 0 ?  'pb-3' : 'pb-3'}` : 'py-3 md:py-[1.875rem]'} ${props.openIndex === d.id ? 'border-gray-500 accordion-opened' : ''}`} onClick={(e) => onClick(d.id, e.target)}>
						<strong className="text-body no-underline">{d.title}</strong>
						{ props.openIndex === d.id && <MinusIcon className={`transform transition-transform h-[.75em] w-[.75em] mb-[3px]`}/> }
						{ props.openIndex !== d.id && <PlusIcon className={`transform transition-transform h-[.75em] w-[.75em] mb-[3px]`}/> }
					</div>
					<div className={`accordion-content ${props.openIndex === d.id ? 'accordion-content--open' : 'accordion-content--close'}`}>
						{ d.text && <div className="pt-0 pb-1 text-sm" dangerouslySetInnerHTML={{ __html: d.text }}></div> }
						{ d.component && <div className={`pt-0 text-sm`}>{ d.component }</div>}
						{ d.children && <div className={`pt-0 pb-3 text-sm`}>{ d.children }</div>}
					</div>
				</div>
			))}
		</div>
	)
};

export default AccordionPDP;
