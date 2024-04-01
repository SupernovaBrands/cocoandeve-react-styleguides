type PropType = {

}

const ProductCardQuiz: React.FC<PropType> = () => {
	return (
		<figure className="w-full md:w-1/3 mb-5 px-0 lg:px-g text-left lg:text-center relative">
			<picture className="block m-0 h-full">
				<source media="(min-width:768px)" srcSet="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/51044131-cf56-4365-600c-fd4cfe1cb100/public" />
				<img alt="Tan Quiz" className="w-full h-full" src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/056be8f1-8cac-4d94-21ae-7db98d4e5a00/public" loading="lazy" />
			</picture>
			<figcaption className="absolute px-2 lg:px-3 product-card--quiz__banner-bottom bottom-[50%] lg:bottom-0 left-0 right-0 transform translate-y-[50%] lg:transform-none">
				<p className="text-primary font-size-lg font-bold mb-1 lg:mb-2">Your true colour match<br /> is 90 seconds away!</p>
				<a href="#" className="inline-block font-bold py-[13px] rounded-full border-2 border-primary lg:mb-2 px-g lg:px-4 bg-white text-primary hover:no-underline">Find my Match</a>
			</figcaption>
		</figure>
	);
};

export default ProductCardQuiz;
