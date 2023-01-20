import { Container } from "react-bootstrap";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export default function Breadcrumbs() {
	return (
		<Container>
			<Breadcrumb>
				<Breadcrumb.Item linkProps={{className: 'text-underline breadcrumb-item__link'}}>
					Blog
				</Breadcrumb.Item>
				<Breadcrumb.Item active>
					The 5 Rules Of Hair Masking
				</Breadcrumb.Item>
			</Breadcrumb>
		</Container>
	);
}
