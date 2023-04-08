import { Container } from "react-bootstrap";
import ProductCard from "@/compounds/ProductCard";
import { Row } from "react-bootstrap";

const ProductCards = () => {
    const product1 = {
        src: 'https://via.placeholder.com/243x243',
        srcSet: 'https://via.placeholder.com/243x243',
        title: 'Sunny Honey Bronzing Bundle',
        comparePrice: '$34.90',
        price: '$24.90',
        productId: 4543113265187,
    };
    const product2 = {
        src: 'https://via.placeholder.com/243x243',
        srcSet: 'https://via.placeholder.com/243x243',
        title: 'Miracle Hair',
        comparePrice: '$34.90',
        price: '$24.90',
        productId: 4543113265187,
        swatch: {
            label: 'Choose Style',
            style: true,
            data: [
                { id: 32068891607075, value: 'girl-print', label: 'Girl Print: Limited edition!', available: true},
                { id: 32068891639843, value: 'leaf-print', label: 'Leaf Print', available: true},
            ]
        }
    };
    const product3 = {
        src: 'https://via.placeholder.com/243x243',
        srcSet: 'https://via.placeholder.com/243x243',
        title: 'Sunny Honey Bronzing Bundle',
        comparePrice: '$34.90',
        price: '$24.90',
        productId: 4543113265187,
        swatch: {
            label: 'Choose Shade',
            shade: true,
            data: [
                { id: 32068891541539, value: 'medium', label: 'Medium', available: true},
                { id: 32068891607075, value: 'dark', label: 'Dark', available: true},
                { id: 32068891639843, value: 'ultra-dark', label: 'Ultra Dark', available: true},
            ]
        }
    };
	return (
		<Container className="px-g">
			<h1>Product Card</h1>
            <Row>
                <ProductCard
                    product={product1}
                    className="position-relative mb-5 col-9 col-md-3 product-card text-center"
                    button={true}
                />
                <ProductCard
                    product={product2}
                    className="position-relative mb-5 col-9 col-md-3 product-card text-center"
                    icon={true}
                />
                <ProductCard
                    product={product3}
                    className="position-relative mb-5 col-9 col-md-3 product-card text-center"
                />
		    </Row>
		</Container>
	);
};

export default ProductCards;
