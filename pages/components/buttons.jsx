import Button from 'react-bootstrap/Button';

export default function Buttons() {
	return (
		<div className="container my-4">
			<h1>Buttons</h1>
			<Button className="mb-2">Button</Button>
			<br />
			<Button className="mb-2" variant="outline-primary">Button</Button>
			<br />
			<Button className="mb-2" size="lg">Button</Button>
			<br />
			<Button className="mb-2" variant="outline-primary" size="lg">Button</Button>
			<br />
			<Button className="mb-2" size="lg"><span className="spinner-border spinner-border-sm" /></Button>
		</div>
	);
}
