import CarouselCustom from "@/components/CarouselCustom";
import CarouselFull from "@/components/CarouselFull";
import { Carousel, Container } from "react-bootstrap";

export default function Carousels() {
	let carouselItems = [];
	for (let i = 0; i < 3; i++) {
		carouselItems.push({
			img: 'https://via.placeholder.com/300x100',
			srcSet: 'https://via.placeholder.com/300x100',
			index: i,
			label: `Slide ${i + 1}`
		});
	};

	let carouselCustomItems = [];
	for (let y = 0; y < 5; y++) {
		const idx = y + 1;
		const labelIndex = idx > 5 ? idx - 5 : idx;
		carouselCustomItems.push({
			label: `Slide ${labelIndex}`,

		});
	};

	return (
		<Container className="pb-4">
			<h1 className="mb-3">CAROUSEL WITH BULLETS</h1>
			<Carousel id="carouselWithBullets" interval={null} controls={true}>
				<Carousel.Item>
					<img className="d-block w-100" src="https://via.placeholder.com/300x100?text=1" alt="First slide" />
				</Carousel.Item>
				<Carousel.Item>
					<img className="d-block w-100" src="https://via.placeholder.com/300x100?text=2" alt="Second slide" />
				</Carousel.Item>
				<Carousel.Item>
					<img className="d-block w-100" src="https://via.placeholder.com/300x100?text=3" alt="Last slide" />
				</Carousel.Item>
			</Carousel>
			<h1 className="mb-3">CAROUSEL WITH RIGHT BULLETS INDICATORS</h1>
			<CarouselFull id="indicatorRight" items={carouselItems} indicatorClass="carousel-indicators--right" indicatorBorder={true} />

			<h1 className="mt-5">CAROUSEL WITH BULLETS PRIMARY COLOR</h1>
			<CarouselFull id="indicatorPrimary" items={carouselItems} indicatorClass="carousel-indicators--primary" indicatorBorder={false} />

			<h1 className="mt-5">CAROUSEL WITH BULLETS BODY COLOR</h1>
			<CarouselFull id="indicatorBody" items={carouselItems} indicatorClass="carousel-indicators--body" indicatorBorder={false} />

			<h1 className="mt-5">CAROUSEL WITH CONTROLS</h1>
			<CarouselFull id="indicatorAndControls" items={carouselItems} indicatorBorder={false} customArrows={true} />

			<h1 className="mt-5">CAROUSEL WITH GROUPED CONTROLS</h1>
			<CarouselFull id="groupedControls" items={carouselItems} indicatorBorder={false} customArrows={true} groupedControls={true} />

			<h1 className="mt-5">CAROUSEL LOOP 3 ITEMS</h1>
			<CarouselCustom id="loop1" productCard={true} useCardTemplate={true} items={carouselCustomItems} slideNumber={5} className="col-12 col-md-4" roundedControl={true} colLgGrid={3} useRow={true} />

			<h1 className="mt-5">CAROUSEL LOOP 4 ITEMS</h1>
			<CarouselCustom id="loop2" productCard={true} useCardTemplate={true} items={carouselCustomItems} slideNumber={5} className="col-12 col-md-3" roundedControl={true} colLgGrid={4} useRow={true} />

			{/* <h1 className="mt-5">CAROUSEL LOOP 5 ITEMS</h1>
			<CarouselCustom id="loop2" productCard={true} useCardTemplate={true} items={carouselCustomItems} slideNumber={5} className="col-12 col-lg-1o5" roundedControl={true} colLgGrid={5} useRow={true} /> */}

			<h1 className="mt-5">CAROUSEL LOOP 4 ITEMS CENTERED</h1>
			<CarouselCustom id="loop3" productCard={true} useCardTemplate={true} items={carouselCustomItems} slideNumber={5} centered={true} className="col-9 col-md-3" />
		</Container>
	);
}
