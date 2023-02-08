import { Container } from "react-bootstrap";
import ProductWaitlist from "@/components/product-waitlist-oos"; 

const WaitlistForm = () => {
	return (
		<Container className="mt-4">
			<h1>Waitlist Form</h1>
            <h2 className="col-12">OOS Product</h2>
			<div className="col-12 col-lg-5">
                <ProductWaitlist />
			</div>
		</Container>
	);
};

export default WaitlistForm;