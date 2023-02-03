import CarouselLoop from "@/components/CarouselLoop";
import CarouselCustom from "@/components/CarouselCustom";
import { Carousel, Container } from "react-bootstrap";

import Prev from '../../src/images/icons/chevron-prev.svg';
import Next from '../../src/images/icons/chevron-next.svg';

export default function Carousels() {
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
			<h1 className="mt-5">CAROUSEL WITH BULLETS PRIMARY COLOR</h1>
			<h1 className="mt-5">CAROUSEL WITH BULLETS BODY COLOR</h1>
			<h1 className="mt-5">CAROUSEL WITH CONTROLS</h1>
			<h1 className="mt-5">CAROUSEL WITH GROUPED CONTROLS</h1>
			<h1 className="mt-5">CAROUSEL LOOP 3 ITEMS</h1>

			<h1 className="mt-5">CAROUSEL LOOP 4 ITEMS</h1>
			{/* <CarouselCustom id="loop1" slideNumber={4} centered={false} className="col-12 col-md-4" /> */}

			<h1 className="mt-5">CAROUSEL LOOP 4 ITEMS CENTERED</h1>
			<CarouselCustom id="loop2" slideNumber={4} centered={true} className="col-9 col-md-3" />
		</Container>
	);
}
