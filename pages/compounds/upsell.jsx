import { Container } from "react-bootstrap";
import UpsellBlog from "@/components/upsell-blog";
import UpsellPdp from "@/components/upsell-pdp"; 

const Upsell = () => {
	return (
		<Container className="mt-4">
			<h1>Upsell</h1>
		    <h2 className="mt-4">Blog</h2>
            <div className="row">
                <div className="col-12 col-lg-4">
                    <UpsellBlog />
                </div>
		    </div>
			<h2 className="mt-4">PDP</h2>
			<div className="row">
				<div className="col-12 col-lg-5">
					<UpsellPdp cls="product-upsell d-flex align-items-center p-0 mb-3" />
					<UpsellPdp cls="product-upsell d-flex align-items-center p-0 mb-3" />
				</div>
			</div>
		</Container>
	);
};

export default Upsell;