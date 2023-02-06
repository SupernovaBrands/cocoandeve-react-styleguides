import { Container } from "react-bootstrap";

export default function Typography() {
	return (
		<Container>
			<h1>Typography | H1 | Header</h1>
			<p className="h1">H1 | Header 1 using class</p>
			<h2>H2 | Header 2</h2>
			<p className="h2">H2 | Header 2 using class</p>
			<h3>H3 | Header 3</h3>
			<p className="h3">H3 | Header 3 using class</p>
			<h4>H4 | Header 4</h4>
			<p className="h4">H4 | Header 4 using class</p>
			<p>Body</p>
		</Container>
	);
};
