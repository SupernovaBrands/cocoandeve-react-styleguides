import Accordion from 'react-bootstrap/Accordion';

const Accordions = () => (
	<div className="container my-4">
		<h1>Accordion</h1>
		<Accordion defaultActiveKey="" flush className="border-top border-bottom">
			<Accordion.Item eventKey="0">
				<Accordion.Button className="text-primary">Accordion Item #1</Accordion.Button>
				<Accordion.Body className="px-0">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
					pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item eventKey="1">
				<Accordion.Button className="px-0 py-1 text-primary">Accordion Item #2</Accordion.Button>
				<Accordion.Body className="px-0">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
					pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	</div>
);

export default Accordions;
