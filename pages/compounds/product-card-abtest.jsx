import { Container } from "react-bootstrap";
import ProductCard from "@/compounds/product-card-abtest"; 
import { Col, Row } from "react-bootstrap";

const ProductCardAbtest = () => {
	return (
		<Container className="px-g">
			<h1>Product Card AB Test</h1>
            <Row className="mt-4">
                <ProductCard 
                    src="https://via.placeholder.com/243x243" 
                    srcSet="https://via.placeholder.com/243x243"
                    subtitle="Like A Virgin"
                    title="Hair Masque"
                    price="$24.90"
                    compare_price="$34.90"
                    swatch_style={true}
                />
                <ProductCard 
                    src="https://via.placeholder.com/243x243" 
                    srcSet="https://via.placeholder.com/243x243"
                    subtitle="Sunny Honey"
                    title="Bali Bronzing Foam"
                    price="$24.90"
                    compare_price="$34.90"
                    swatch_shade={true}
                />
                <ProductCard 
                    src="https://via.placeholder.com/243x243" 
                    srcSet="https://via.placeholder.com/243x243"
                    subtitle="Glow Figure"
                    title="Bali Bod Bundle"
                    price="$24.90"
                    compare_price="$34.90"
                    cart_btn={true}
                />
		    </Row>
		</Container>
	);
};

export default ProductCardAbtest;