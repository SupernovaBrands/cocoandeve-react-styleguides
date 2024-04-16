import ProductCarousel from '~/sections/ProductCarousel';
const ProductCarousels = () => {

	const PRODUCTS = [
		{
			id: 1,
			src: '//via.placeholder.com/520x520/FFF2F4',
			srcSet: '//via.placeholder.com/520x520/FFF2F4',
			title: 'Sunny Honey Bronzing Bundle',
			comparePrice: '$34.90',
			price: '$24.90',
			productId: 4543113265187,
		},
		{
			id: 2,
			src: 'https://via.placeholder.com/520x520/FFF2F4',
			srcSet: 'https://via.placeholder.com/520x520/FFF2F4',
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
		},
		{
			src: 'https://via.placeholder.com/520x520/FFF2F4',
			srcSet: 'https://via.placeholder.com/520x520/FFF2F4',
			title: 'Sunny Honey Bronzing Bundle',
			comparePrice: '$34.90',
			price: '$24.90',
			productId: 4543113265187,
			swatch: {
				label: 'Choose Shade',
				shade: true,
				data: [
					{ id: 32068891541539, value: 'medium', label: 'Medium', available: false},
					{ id: 32068891607075, value: 'dark', label: 'Dark', available: true},
					{ id: 32068891639843, value: 'ultra-dark', label: 'Ultra Dark', available: true},
				]
			}
		},
		{
			id: 4,
			src: '//via.placeholder.com/520x520/FFF2F4',
			srcSet: '//via.placeholder.com/520x520/FFF2F4',
			title: 'Sunny Honey Bronzing Bundle',
			comparePrice: '$34.90',
			price: '$24.90',
			productId: 4543113265187,
		},
		{
			id: 5,
			src: '//via.placeholder.com/520x520/FFF2F4',
			srcSet: '//via.placeholder.com/520x520/FFF2F4',
			title: 'Sunny Honey Bronzing Bundle',
			comparePrice: '$34.90',
			price: '$24.90',
			productId: 4543113265187,
		},
		{
			src: 'https://via.placeholder.com/520x520/FFF2F4',
			srcSet: 'https://via.placeholder.com/520x520/FFF2F4',
			title: 'Sunny Honey Bronzing Bundle',
			comparePrice: '$34.90',
			price: '$24.90',
			productId: 4543113265187,
			swatch: {
				label: 'Choose Shade',
				shade: true,
				data: [
					{ id: 32068891541539, value: 'medium', label: 'Medium', available: false},
					{ id: 32068891607075, value: 'dark', label: 'Dark', available: true},
					{ id: 32068891639843, value: 'ultra-dark', label: 'Ultra Dark', available: true},
				]
			}
		}
	];
	return (
		<>
			<div className="container px-g mt-4">
				<h1 className="mb-1">Product Carousel</h1>
			</div>
			<ProductCarousel products={PRODUCTS} />
		</>
	);
};

export default ProductCarousels;
