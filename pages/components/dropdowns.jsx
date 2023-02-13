import { Container } from "react-bootstrap";
import DropdownStore from '@/components/DropdownStore';

const Dropdowns = (props) => {
	return (
		<Container className="mt-4">
			<h1>Dropdown</h1>
            <DropdownStore />
		</Container>
	);
};

export default Dropdowns;