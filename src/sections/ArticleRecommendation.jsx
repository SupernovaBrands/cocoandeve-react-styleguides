import { Col, Row } from "react-bootstrap";

const RecommendationCard = (props) => {
	return (
		<Col lg={4} className="d-flex" as="figure">
			<picture>
				<img src={props.data.src} alt={props.data.title} />
			</picture>
			<figcaption className="ms-1">
				<p className="h3">{props.data.title}</p>
				<p className="mb-0">{props.data.desc}</p>
			</figcaption>
		</Col>
	);
};

const ArticleRecommendation = () => {
	const RECOMMENDATIONS = [
		{
			id: 1,
			title: '6 Scalp Care Myths – Busted!',
			desc: 'Give these myths the brush off for a healthy scalp & shiny hair!',
			src: 'https://via.placeholder.com/96x96.jpg/EFADBA'
		},
		{
			id: 2,
			title: 'Nailed It! How to Self-Tan Those Tricky Bits',
			desc: 'Don’t let cheeto hands give...',
			src: 'https://via.placeholder.com/96x96.jpg/EFADBA'
		},
		{
			id: 3,
			title: '6 Scalp Care Myths – Busted!',
			desc: 'Give these myths the brush off for a healthy scalp & shiny hair!',
			src: 'https://via.placeholder.com/96x96.jpg/EFADBA'
		}
	];
	return (
		<Col className="my-4">
			<div className="bg-pink-light p-3 no-gutters__in-container">
				<p className="h1 text-center">You may also like</p>
				<Row className="mt-3 mb-0">
					{RECOMMENDATIONS.map((data) => (
						<RecommendationCard key={data.id} data={data} />
					))}
				</Row>
			</div>
		</Col>
	);
};

export default ArticleRecommendation;
