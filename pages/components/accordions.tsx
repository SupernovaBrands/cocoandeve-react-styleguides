import { Disclosure, Transition } from '@headlessui/react'
import { useRef, useState } from 'react';
import ChevronDownIcon from '@/images/icons/chevron-down.svg';
const Accordions = () => {
	const buttonRefs = useRef([]);
	const openedRef = useRef(null);
	const [disclosureState, setDisclosureState] = useState(0);
	const handleDisclosureChange = (state: number) => {
		const clickedButton = buttonRefs.current[state];
		if (clickedButton === openedRef.current) {
			openedRef.current = null;
		return;
		}
		if (Boolean(openedRef.current?.getAttribute("data-value"))) {
			openedRef.current?.click();
		}
		openedRef.current = clickedButton;
	};

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
	return (
		<div className="container my-4">
			<h1>Accordion</h1>
			<div className="border-t border-b border-gray-500 accordion w-full accordion-flush" id="accordionSimple">
				{data.map((d) => (
					<Disclosure key={d.id} as="div" className="accordion-item border-t border-b border-gray-500">
						{({ open }) => (
							<>
								<Disclosure.Button className={`flex w-full justify-between items-center text-left text-primary hover:text-primary-darken hover:underline pt-[12px] pb-[12px] ${open ? 'border-b border-gray-500' : ''}`} onClick={() => handleDisclosureChange(d.id)} data-value={open} ref={(ref) => { buttonRefs.current[d.id] = ref }}>
									<span>{d.title}</span>
									<ChevronDownIcon
										className={`${
											open ? 'rotate-180 transform' : ''
										} h-[12px] w-[12px] text-purple-500`}
									/>
								</Disclosure.Button>
								{/* <Transition
										enter="transition duration-100 ease-out"
										enterFrom="transform scale-95 opacity-0"
										enterTo="transform scale-100 opacity-100"
										leave="transition duration-75 ease-out"
										leaveFrom="transform scale-100 opacity-100"
										leaveTo="transform scale-95 opacity-0"
								> */}
									<Disclosure.Panel className="leading-base pt-1 pb-1">
										{d.text}
									</Disclosure.Panel>
								{/* </Transition> */}
							</>
						)}
					</Disclosure>
				))}
			</div>
		</div>
	);
};

export default Accordions;
