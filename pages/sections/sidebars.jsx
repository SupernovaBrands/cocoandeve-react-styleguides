import Sidebar from "@/sections/Sidebar";
import { Container, Row } from "react-bootstrap";

export default function Sidebars() {
	const SIDEBAR_DATA = [
		{
			id: 1,
			link: '/templates/article',
			title: '5 things you’re doing wrong with your hair care routine',
			desc: 'Give these myths the brush off for a healthy scalp & shiny hair!'
		},
		{
			id: 2,
			link: '/templates/article',
			title: '5 things you’re doing wrong with your hair care routine',
			desc: 'Give these myths the brush off for a healthy scalp & shiny hair!'
		},
		{
			id: 3,
			link: '/templates/article',
			title: '5 things you’re doing wrong with your hair care routine',
			desc: 'Give these myths the brush off for a healthy scalp & shiny hair!'
		}
	];
	return (
		<div className="mobile-sidebar">
			<Container>
				<h1>SIDEBAR</h1>
				<Row>
					<Sidebar data={SIDEBAR_DATA} />
				</Row>
			</Container>
		</div>
	);
};
