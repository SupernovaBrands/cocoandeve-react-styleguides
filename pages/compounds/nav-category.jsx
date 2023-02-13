import { Container } from "react-bootstrap";

const NewsletterForm = () => {
	return (
		<Container>
            <div className="row">
                <div className="col text-center mb-2 mt-2 nav-category">
                    <ul className="nav justify-content-center align-items-center">
                        <li className="nav-item">
                            <a href="#" className="nav-link active pb-0 pt-0">ALL</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link pb-0 pt-0">HAIR</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link pb-0 pt-0">TAN</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link pb-0 pt-0">BODY</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link pb-0 pt-0">HOW TO'S</a>
                        </li>
                    </ul>
                </div>
            </div>
		</Container>
	);
};

export default NewsletterForm;