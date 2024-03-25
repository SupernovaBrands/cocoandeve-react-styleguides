// import ProductImageCarousel from "@/components/ProductImageCarousel";
// import { Container, Row } from "react-bootstrap";

import ProductImageCarousel from "@/components/ProductImageCarousel";
import { EmblaOptionsType } from 'embla-carousel'
const ProductImageCarousels = () => {
	const OPTIONS: EmblaOptionsType = { loop: true, align: 'start'}
	const SLIDE_COUNT = 10
	const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
	return (
		<div className="container px-g mt-4">
			<h1 className="mb-1">Product Image Carousel</h1>
			<div className="flex flex-wrap -mx-g">
				<div className="w-full lg:w-7/12">
					<ProductImageCarousel slides={SLIDES} options={OPTIONS}/>
				</div>
			</div>
		</div>
	)
}

export default ProductImageCarousels;
