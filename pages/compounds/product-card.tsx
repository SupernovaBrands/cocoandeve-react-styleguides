import ProductCard from "@/compounds/ProductCard";

const ProductCards = () => {
    const product1 = {
        src: 'https://via.placeholder.com/520x520/FFF2F4',
        srcSet: 'https://via.placeholder.com/520x520/FFF2F4',
        title: 'Sunny Honey Bronzing Bundle',
        comparePrice: '$34.90',
        price: '$24.90',
        productId: 4543113265187,
    };
    const product2 = {
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
    };
    const product3 = {
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
    };
	return (
		<div className="container px-g">
			<h1>Product Card</h1>
            <div className="flex flex-wrap -mx-1 lg:-mx-2 mt-4">
                <ProductCard
                    product={product1}
                    className="relative mb-5 flex flex-col w-1/2 md:w-1/3 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
                    button={true}
                />
                <ProductCard
                    product={product2}
                    className="relative mb-5 flex flex-col w-1/2 md:w-1/3 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
                    icon={true}
                />
                <ProductCard
                    product={product3}
                    className="relative mb-5 flex flex-col w-1/2 md:w-1/3 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
                />
            </div>
            <div className="flex flex-wrap -mx-1 lg:-mx-2">
                <ProductCard
                    product={product1}
                    className="relative mb-5 flex flex-col w-1/2 md:w-1/4 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
                    button={true}
                />
                <ProductCard
                    product={product2}
                    className="relative mb-5 flex flex-col w-1/2 md:w-1/4 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
                    icon={true}
                />
                <ProductCard
                    product={product3}
                    className="relative mb-5 flex flex-col w-1/2 md:w-1/4 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
                />
		    </div>
		</div>
	);
};

export default ProductCards;
