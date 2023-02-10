import Button from 'react-bootstrap/Button';
import Search from '../../src/images/icons/search.svg';
import ChevronDown from '../../src/images/icons/chevron-down.svg';

export default function Buttons() {
	return (
		<div className="container my-4">
			<h1>Buttons</h1>
			<Button className="mb-2">Button</Button>
			<br />
			<Button className="mb-2" variant="outline-primary">Button</Button>
			<br />
			<Button className="mb-2">Button a tag</Button>
			<br />
			<Button className="mb-2">
				Button With icon <Search className="svg font-size-xs" fill="white"/>
			</Button>
			<br />
			<Button className="mb-2">Shop <ChevronDown className="svg font-size-xs" fill="white"/></Button>
			<br />
			<Button className="mb-2" size="lg">Button Large</Button>
			<br />
			<Button className="mb-2" size="lg"><span className="spinner-border spinner-border-sm" /></Button>
			<br />
			<Button className="mb-2" variant="outline-primary" size="lg">Button Large</Button>
			<br />
			<div className="d-grid gap-2">
				<Button variant="primary">
					Button
				</Button>
			</div>
			<br />
			<div className="d-grid gap-2">
				<Button variant="outline-primary">
					Button
				</Button>
			</div>
			<br />
			<div className="d-grid gap-2">
				<Button variant="primary" size="lg">
					Button
				</Button>
			</div>
			<br />
			<div className="d-grid gap-2">
				<Button variant="outline-primary" size="lg">
					Button
				</Button>
			</div>
		</div>
	);
}
