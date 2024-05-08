import { useState } from "react";
import ProductCard from "~/compounds/ProductCard";

const ProductCards = () => {
    const [waitlistData, setWaitlistData] = useState({
        open: false,
        title: '',
        image: '',
        handle: undefined,
    });
    const product1 = {
        availableForSale: true,
        src: 'https://via.placeholder.com/520x520/FFF2F4',
        srcSet: 'https://via.placeholder.com/520x520/FFF2F4',
        title: 'Like a Virgin Hair Masque',
        comparePrice: '$34.90',
        price: '$24.90',
        productId: 4543113265187,
        variants: {
            nodes: [
                { sku: 'CE0000072020' }
            ]
        }
    };
    const product2 = {
        availableForSale: true,
        src: 'https://via.placeholder.com/520x520/FFF2F4',
        srcSet: 'https://via.placeholder.com/520x520/FFF2F4',
        title: 'Like a Virgin Hair Masque Like a Virgin Hair Masque',
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
        },
        variants: {
            nodes: [
                { sku: 'CE0000072020' }
            ]
        }
    };
    const product3 = {
        availableForSale: true,
        src: 'https://via.placeholder.com/520x520/FFF2F4',
        srcSet: 'https://via.placeholder.com/520x520/FFF2F4',
        title: 'Like a Virgin Hair Masque',
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
        },
        variants: {
            nodes: [
                { sku: 'CE0000072020' }
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
                    setWaitlistData={setWaitlistData}
                />
                <ProductCard
                    product={product2}
                    className="relative mb-5 flex flex-col w-1/2 md:w-1/3 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
                    icon={true}
                    setWaitlistData={setWaitlistData}
                />
                <ProductCard
                    product={product3}
                    className="relative mb-5 flex flex-col w-1/2 md:w-1/3 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
                    setWaitlistData={setWaitlistData}
                />
            </div>
            <div className="flex flex-wrap -mx-1 lg:-mx-2">
                <ProductCard
                    product={product1}
                    className="relative mb-5 flex flex-col w-1/2 md:w-1/4 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
                    button={true}
                    setWaitlistData={setWaitlistData}
                />
                <ProductCard
                    product={product2}
                    className="relative mb-5 flex flex-col w-1/2 md:w-1/4 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
                    icon={true}
                    setWaitlistData={setWaitlistData}
                />
                <ProductCard
                    product={product3}
                    className="relative mb-5 flex flex-col w-1/2 md:w-1/4 pr-hg pl-hg lg:pr-g lg:pl-g text-center"
                    setWaitlistData={setWaitlistData}
                />
		    </div>
		</div>
	);
};

export default ProductCards;
