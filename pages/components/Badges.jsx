import { Col, Container, Row } from 'react-bootstrap';
import Badges from 'react-bootstrap/Badge';

export default function Buttons() {
	return (
		<Container className="mt-4">
			<h1>Badges</h1>
			<div className="d-flex flex-column align-items-start">
				<Badges bg="sh-purple" className="mb-1 mt-1">Tan</Badges>
				<Badges bg="secondary" className="mb-1 mt-1">Hair</Badges>
				<Badges bg="bali-bod-blue" className="mb-1 mt-1">Body</Badges>
			</div>
			<p className="my-4">Circle Badge with svg</p>
			<Row>
				<Col xs={9} lg={3} className="pt-4">
					<picture class="circle-badge position-absolute rounded-circle bg-primary d-flex p-1">

					</picture>
				</Col>
			</Row>
		</Container>
	)
}
