import PlusIcon from '@/images/icons/plus.svg';
import MinusIcon from '@/images/icons/minus.svg';

const Accordion = (props: any) => {
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
					<div className={`cursor-pointer flex w-full justify-between items-center py-2 ${props.openIndex === d.id ? 'border-b border-gray-500' : ''}`} onClick={() => props.onClick(d.id)}>
						<span className="text-body no-underline font-bold">{d.title}</span>
						{ props.openIndex === d.id && <MinusIcon className={`transform transition-transform size-1em`}/> }
						{ props.openIndex !== d.id && <PlusIcon className={`transform transition-transform size-1em`}/> }
					</div>
					<div className={`transition-all overflow-hidden ${props.openIndex === d.id ? 'duration-1000' : 'duration-75 max-h-0'}`}>
						<div className="pt-1 pb-1 text-sm" dangerouslySetInnerHTML={{ __html: d.text }}></div>
					</div>
				</div>
			))}
		</div>
	)
};

export default Accordion;
