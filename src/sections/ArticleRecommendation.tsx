import { Col, Row } from "react-bootstrap";

const RecommendationCard = (props) => {
	return (
		<figure className="relative w-full lg:w-1/3 flex grow  lg:px-g sm:px-hg mb-[1rem]">
			<picture>
				<img src={props.data.src} alt={props.data.title} className="w-full" />
			</picture>
			<figcaption className="w-4/6 ms-1">
				<p className="h3 mb-1">{props.data.title}</p>
				<p className="mb-0">{props.data.desc}</p>
			</figcaption>
		</figure>
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
		<div className="w-full my-4">
			<div className="bg-pink-light p-3 no-gutters__in-container mx-[-15px]">
				<p className="h1 text-center mb-1">You may also like</p>
				<div className="flex flex-wrap mt-3 mb-0">
					{RECOMMENDATIONS.map((data) => (
						<RecommendationCard key={data.id} data={data} />
					))}
				</div>
			</div>
		</div>
	);
};

export default ArticleRecommendation;
