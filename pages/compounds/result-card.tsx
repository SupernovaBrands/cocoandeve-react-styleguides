import { Container } from "react-bootstrap";
import ResultCard from "@/compounds/result-card";

const ResultCards = () => {
	const REVIEW = {
		src: 'https://via.placeholder.com/276x197.jpg/EFADBA',
		srcSet: 'https://via.placeholder.com/570x340',
		badge: 'Body',
		title: 'Bali Bronzing Foam (Dark)',
		author: '@kaylaazjones',
		badgeColor: 'bali-bod-blue',
		comment: 'I struggle with cellulite so wanted to try this 3 step process Glow Figure range! After using the products my skin was a lot softer, smoother and had more glow! They have an amazing lychee sent and contain unique patented cellushape techno formula which gives a reduction in cellulite. What more could a girl ask for! 😛💕🙌🏼'
	};

	return (
		<div className="container mt-4">
			<h1 className="mb-1">Result Card</h1>
			<div className="row">
				<ResultCard item={REVIEW} wrapper="col-9 lg:w-1/3" />
			</div>
		</div>
	);
};

export default ResultCards;
