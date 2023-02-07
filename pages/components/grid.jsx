import { Col, Container, Row } from "react-bootstrap";

export default function Grid() {
	const cssGrid = `
	.col {
		height: 100vh;
	}
	.col:before {
		content: "";
		display: block;
		background-color: rgba(0,123,255,0.5);
		height: 100%;
	}`;
	return (
		<div className="mobile-wrapper">
			<style>{cssGrid}</style>
			<Container className="mt-4">
				<Row>
					<Col></Col>
					<Col></Col>
					<Col></Col>
					<Col></Col>
					<Col className="d-none d-lg-block"></Col>
					<Col className="d-none d-lg-block"></Col>
					<Col className="d-none d-lg-block"></Col>
					<Col className="d-none d-lg-block"></Col>
					<Col className="d-none d-lg-block"></Col>
					<Col className="d-none d-lg-block"></Col>
					<Col className="d-none d-lg-block"></Col>
					<Col className="d-none d-lg-block"></Col>
				</Row>
			</Container>
		</div>
	);
}
