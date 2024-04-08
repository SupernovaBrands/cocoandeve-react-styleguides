import ProductImageCarousel from "@/components/ProductImageCarousel";
import { EmblaOptionsType } from 'embla-carousel'
const ProductImageCarousels = () => {
	const SLIDES = [
		{ id: 1, src: 'https://via.placeholder.com/1140x1140/EFADBA?text=_text_' },
		{ id: 2, src: 'https://via.placeholder.com/1140x1140/EFADBA?text=_text_' },
		{ id: 3, src: 'https://via.placeholder.com/1140x1140/EFADBA?text=_text_' },
		{ id: 4, src: 'https://via.placeholder.com/1140x1140/EFADBA?text=_text_' },
		{ id: 5, src: 'https://via.placeholder.com/1140x1140/EFADBA?text=_text_' },
		{ id: 6, src: 'https://via.placeholder.com/1140x1140/EFADBA?text=_text_' },
		{ id: 7, src: 'https://via.placeholder.com/1140x1140/EFADBA?text=_text_' },
		{ id: 8, src: 'https://via.placeholder.com/1140x1140/EFADBA?text=_text_' },
		{ id: 9, src: 'https://via.placeholder.com/1140x1140/EFADBA?text=_text_' },
		{ id: 10, src: 'https://via.placeholder.com/1140x1140/EFADBA?text=_text_' },
	];
	return (
		<div className="container px-g mt-4">
			<h1 className="mb-1">Product Image Carousel</h1>
			<div className="flex flex-wrap -mx-g">
				<div className="w-full lg:w-7/12">
					<ProductImageCarousel slides={SLIDES} bottomBadge="👻 Get 3 for 2 with code: HALLOWEEN 👻" />
				</div>
			</div>
		</div>
	)
}

export default ProductImageCarousels;
