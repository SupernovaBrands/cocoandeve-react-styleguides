import { Container } from "react-bootstrap";
import Form from "@/compounds/newsletter-form";

const NewsletterForm = () => {
	return (
        <div className="mobile-wrapper">
		    <Container className="mt-4">
                <h1>Newsletter Form</h1>
                <div className="row mt-4">
                    <div className="col-12 col-lg-4">
                        <Form />
                    </div>
                </div>
            </Container>
        </div>
	);
};

export default NewsletterForm;