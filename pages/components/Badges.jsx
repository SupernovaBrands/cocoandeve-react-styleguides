import { Container } from 'react-bootstrap';
import Badges from 'react-bootstrap/Badge';

export default function Buttons() {
	return (
		<Container className="mt-4">
			<h1>Badges</h1>
			<div className="d-flex flex-column align-items-start">
				<Badges bg="secondary">Tan</Badges>
				<Badges bg="secondary" className="mb-1 mt-1">Hair</Badges>
			</div>
		</Container>
	)
}
