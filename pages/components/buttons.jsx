// import Button from '../../src/components/button';
import Button from 'react-bootstrap/Button';

export default function Buttons() {
	return (
		<div>
			<h1>Buttons</h1>
			<Button className="mb-2">Button</Button>
			<br />
			<Button className="mb-2" variant="outline-primary">Button</Button>
			<br />
			<Button className="mb-2" size="lg">Button</Button>
			<br />
			<Button className="mb-2" variant="outline-primary" size="lg">Button</Button>
			<br />
			<Button className="mb-2">Button</Button>
			<br />
			<Button className="mb-2">Button</Button>
		</div>
	);
}
