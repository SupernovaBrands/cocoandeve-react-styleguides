import CarouselFull from "@/components/CarouselFull";

const HeroBanner = (props) => {
	let carouselItems = [];
	for (let i = 0; i < 2; i++) {
		carouselItems.push({
			img: 'https://via.placeholder.com/375x419.jpg/EFADBA',
            srcSet: 'https://via.placeholder.com/1280x489.jpg/2596be',
			index: i,
			label: `Slide ${i + 1}`
		});
	};
	
	return (
		<CarouselFull id="hero-banner" items={carouselItems} indicatorClass="carousel-indicators--right" indicatorBorder={true} />
	);
};

export default HeroBanner;
