import { Container } from "react-bootstrap";

const NewsletterForm = () => {
	return (
		<Container className="mt-4">
			<h1>Newsletter Form</h1>
            <div className="row mt-4">
                <div className="col-12 col-lg-4">
                    <form>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Enter your email" aria-label="Enter your email" />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button">Subscribe</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
		</Container>
	);
};

export default NewsletterForm;