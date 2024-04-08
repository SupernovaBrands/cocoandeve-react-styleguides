import { Container } from "react-bootstrap";
import DropdownStore from '@/components/DropdownStore';

const Dropdowns = (props: any) => {
	return (
		<div className="container mt-4">
			<h1 className="mb-1">Dropdown</h1>
			<div className="w-1/2">
            	<DropdownStore direction='dropdown' labelClass="text-primary" />
			</div>
		</div>
	);
};

export default Dropdowns;