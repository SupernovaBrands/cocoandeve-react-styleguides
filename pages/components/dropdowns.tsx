import { Container } from "react-bootstrap";
import DropdownStore from '@/components/DropdownStore';

const Dropdowns = (props: any) => {
	return (
		<div className="container mt-4">
			<h1>Dropdown</h1>
            <DropdownStore />
		</div>
	);
};

export default Dropdowns;