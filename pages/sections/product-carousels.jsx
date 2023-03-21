import Link from "next/link";
import { Container, Tabs, Tab } from "react-bootstrap";
import CarouselCustom from "@/components/CarouselCustom";
import YotpoStar from "@/components/YotpoStars";

export default function ProductCarousels() {
	let carouselCustomItems = [];
	for (let y = 0; y < 4; y++) {
		const idx = y + 1;
		const labelIndex = idx > 4 ? idx - 4 : idx;
		carouselCustomItems.push({
			label: `Slide ${labelIndex}`
		});
	};
	return (
		<>
			<Container className="px-g mt-4">
				<h1>Product Carousel</h1>
				{/* <YotpoStar productId={4543113265187} showTotal={false} /> */}
			</Container>
			<Container as="section" className="product-carousel pt-4 pb-4">
				<Tabs
					defaultActiveKey="bestsellers"
					id="uncontrolled-tab-example"
					className="nav nav-tabs mx-auto nav-tabs--product text-center mb-2 justify-content-center"
				>
					<Tab eventKey="new" title="New" tabClassName="nav-link text-decoration-none h4 mb-0 font-weight-normal">
						<CarouselCustom items={carouselCustomItems} id="valueSetsCarousel" slideNumber={4} centered={true} className="col-9 col-md-3" />
					</Tab>
					<Tab eventKey="bestsellers" title="Bestsellers" tabClassName="nav-link text-decoration-none h4 mb-0 font-weight-normal">
						<CarouselCustom items={carouselCustomItems} id="bestsellersCarousel" slideNumber={4} centered={true} className="col-9 col-md-3" />
					</Tab>
					<Tab eventKey="value-sets" title="Value Sets" tabClassName="nav-link text-decoration-none h4 mb-0 font-weight-normal">
						<CarouselCustom items={carouselCustomItems} id="valueSetsCarousel" slideNumber={4} centered={true} className="col-9 col-md-3" />
					</Tab>
				</Tabs>
				<div className="text-center">
					<Link href="#" className="btn btn-lg btn-outline-primary mt-4">Shop All</Link>
				</div>
			</Container>
		</>
	);
};
