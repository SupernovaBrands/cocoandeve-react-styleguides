import { Container } from "react-bootstrap";
import UpsellBlog from "@/compounds/upsell-blog";
import UpsellPdp from "@/compounds/upsell-pdp"; 

const Upsell = () => {
	return (
		<Container className="mt-4">
			<h1>Upsell</h1>
		    <h2 className="mt-4">Blog</h2>
            <div className="row">
                <div className="col-12 col-lg-4">
                    <UpsellBlog title="That’s a wrap bundle" comparePrice="£XX.XX" price="£XX.XX" save="(Save 20%)" />
                </div>
		    </div>
			<h2 className="mt-4">PDP</h2>
			<div className="row">
				<div className="col-12 col-lg-5">
					<UpsellPdp title="That’s A Wrap Bundle" content="Like A Virgin Coconut Hair Masque, Two-tiered Tangle Tamer." comparePrice="£139.90" price="£129.90" />
					<UpsellPdp title="That’s A Wrap Bundle" content="Like A Virgin Coconut Hair Masque, Two-tiered Tangle Tamer." comparePrice="£139.90" price="£129.90" />
				</div>
			</div>
		</Container>
	);
};

export default Upsell;