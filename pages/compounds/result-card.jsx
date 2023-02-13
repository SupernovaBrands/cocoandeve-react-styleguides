import { Container } from "react-bootstrap";
import FiveStars from '../../src/images/icons/five-stars.svg';

const ResultCard = () => {
	return (
		<Container className="mt-4">
			<h1>Result Card</h1>
            <div className="row">
                <div className="result-card col-lg-3">
                    <picture>
                        <source srcSet="https://via.placeholder.com/570x340" media="(min-width: 992px)"/>
                        <source srcSet="https://via.placeholder.com/276x197.jpg/EFADBA"/>
                        <img className="w-100" alt="/" src="https://via.placeholder.com/276x197.jpg/EFADBA" />
                    </picture>
                    <div className="p-2 bg-white h-100">
                        <p className="d-flex justify-content-between align-items-center mb-0">
                            {/* <FiveStars /> */}
                            <span className="badge bg-primary mb-1 mt-1">Body</span>
                        </p>
                        <p>
                            <strong>Product:&nbsp;</strong>
                            <a href="#" title="Sunny Honey Bali Bronzing Foam" tabIndex="0" className="text-underline">
                                Bali Bronzing Foam (Dark)
                            </a>
                        </p>
                        <p>"I struggle with cellulite so wanted to try this 3 step process Glow Figure range! After using the products my skin was a lot softer, smoother and had more glow! They have an amazing lychee sent and contain unique patented cellushape techno formula which gives a reduction in cellulite. What more could a girl ask for! 😛💕🙌🏼"</p>
                        <p className="text-underline font-weight-bold">@kaylaazjones</p>
                    </div>
                </div>
            </div>
		</Container>
	);
};

export default ResultCard;