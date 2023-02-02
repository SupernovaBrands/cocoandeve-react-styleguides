import ProductImageCarousel from "@/components/ProductImageCarousel";
import { Container, Row } from "react-bootstrap";

const ProductImageCarousels = () => {
	return (
		<Container className="px-g mt-4">
			<h1>Product Image Carousel</h1>
			<Row>
				<ProductImageCarousel totalSlide={8} />
			</Row>
		</Container>
	)
}

export default ProductImageCarousels;
