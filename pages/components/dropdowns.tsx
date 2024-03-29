import { Container } from "react-bootstrap";
import DropdownStore from '@/components/DropdownStore';

const Dropdowns = (props: any) => {
	return (
		<div className="container mt-4">
			<h1>Dropdown</h1>
			<div className="w-1/6">
            	<DropdownStore direction='dropdown' />
			</div>
		</div>
	);
};

export default Dropdowns;