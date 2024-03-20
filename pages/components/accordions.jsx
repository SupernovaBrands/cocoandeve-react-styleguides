import { Disclosure } from '@headlessui/react'
// import { ChevronUpIcon } from '@heroicons/react/20/solid'
const Accordions = () => (
	<div className="container my-4">
		<h1>Accordion</h1>
		<Disclosure>
			{({ open }) => (
				<>
					<Disclosure.Button className="flex w-full justify-between text-left">
						<span className="text-primary hover:text-primary-darken hover:underline">Collapsible #1</span>
						{/* <ChevronUpIcon
						className={`${
							open ? 'rotate-180 transform' : ''
						} h-5 w-5 text-purple-500`}
						/> */}
					</Disclosure.Button>
					<Disclosure.Panel className="leading-base">
					Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
		<Disclosure as="div" className="mt-2">
			{({ open }) => (
				<>
					<Disclosure.Button className="flex w-full justify-between text-left">
						<span className="text-primary hover:text-primary-darken hover:underline">Collapsible #2</span>
						{/* <ChevronUpIcon
						className={`${
							open ? 'rotate-180 transform' : ''
						} h-5 w-5 text-purple-500`}
						/> */}
					</Disclosure.Button>
					<Disclosure.Panel className="leading-base">
					Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
		<Disclosure as="div" className="mt-2">
			{({ open }) => (
				<>
					<Disclosure.Button className="flex w-full justify-between text-left">
						<span className="text-primary hover:text-primary-darken hover:underline">Collapsible #2</span>
						{/* <ChevronUpIcon
						className={`${
							open ? 'rotate-180 transform' : ''
						} h-5 w-5 text-purple-500`}
						/> */}
					</Disclosure.Button>
					<Disclosure.Panel className="leading-base">
					Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	</div>
);

export default Accordions;
