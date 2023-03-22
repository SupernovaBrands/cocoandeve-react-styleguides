import { Container, Tabs, Tab } from "react-bootstrap";
import ProductCarousel from "@/sections/ProductCarousel";

export default function ProductCarousels() {
	return (
		<>
			<Container className="px-g mt-4">
				<h1>Product Carousel</h1>
			</Container>
			<ProductCarousel />
		</>
	);
};
