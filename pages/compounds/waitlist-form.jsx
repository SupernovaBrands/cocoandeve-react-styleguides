import { Container } from "react-bootstrap";
import ProductWaitlist from "@/compounds/product-waitlist-oos"; 

const WaitlistForm = () => {
	return (
		<Container className="mt-4">
			<h1>Waitlist Form</h1>
			<div className="row mt-3">
				<h2 className="col-12">OOS Product</h2>
				<div className="col-12 col-lg-5">
					<ProductWaitlist title="Restocking Jan 2022" content="Our products have been a worldwide hit and we can't keep up with the stock. But we are on it, sign up and we will notify you when it’s available!" button="Join the waitlist" />
				</div>
			</div>
		</Container>
	);
};

export default WaitlistForm;