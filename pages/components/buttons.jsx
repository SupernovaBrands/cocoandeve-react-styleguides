import Button from 'react-bootstrap/Button';
import SearchAbtest from '../../src/images/icons/search-abtest.svg';
import ChevronDown from '../../src/images/icons/chevron-down.svg';

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
			<br />
			<Button className="mb-2">
				Button with icon <SearchAbtest className="svg font-size-s"/>
			</Button>
			<br />
			<Button className="mb-2">Shop <ChevronDown className="svg font-size-xs"/></Button>
			<br />
			<Button className="mb-2" size="lg">Button Large</Button>
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
