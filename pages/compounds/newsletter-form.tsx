import { Container } from "react-bootstrap";
import Form from "@/compounds/footer-newsletter-form";

const NewsletterForm = () => {
	return (
		<div className="container mt-4">
			<h1>Newsletter Form</h1>
			<div className="flex flex-wrap mt-4">
				<div className="w-full lg:w-1/3">
					<Form />
				</div>
			</div>
		</div>
	);
};

export default NewsletterForm;