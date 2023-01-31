import { Container } from "react-bootstrap";
import Tooltip from '@/components/Tooltip';

export default function Tooltips() {
	return (
		<Container className="mt-4 position-relative">
            <h1>Tooltips</h1>
            <Tooltip show={true} />
		</Container>
	);
}
