import { Container } from "react-bootstrap";
import ProductCard from "@/compounds/ProductCard"; 
import { Col, Row } from "react-bootstrap";

const ProductCards = () => {
	return (
		<Container className="px-g">
			<h1>Product Card</h1>
            <Row>
                <Col md={3} className="col-9 product-card text-center mb-5 position-relative">
                    <ProductCard 
                        src="https://via.placeholder.com/243x243" 
                        srcSet="https://via.placeholder.com/243x243"
                        title="Sunny Honey Bronzing Bundle"
                        comparePrice="34.90"
                        price="24.90"
                        button={true}
                    />
                </Col>
                <Col md={3} className="col-9 product-card text-center mb-5 position-relative">
                    <ProductCard 
                        src="https://via.placeholder.com/243x243" 
                        srcSet="https://via.placeholder.com/243x243"
                        title="Miracle Hair"
                        comparePrice="34.90"
                        price="24.90"
                        style={true}
                        icon={true}
                    />
                </Col>
                <Col md={3} className="col-9 product-card text-center mb-5 position-relative">
                    <ProductCard 
                        src="https://via.placeholder.com/243x243" 
                        srcSet="https://via.placeholder.com/243x243"
                        title="Sunny Honey Bronzing Bundle"
                        comparePrice="34.90"
                        price="24.90"
                        shade={true}
                    />
                </Col>
		    </Row>
		</Container>
	);
};

export default ProductCards;