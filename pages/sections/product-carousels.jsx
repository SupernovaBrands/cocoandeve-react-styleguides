import Link from "next/link";
import { Container, Tabs, Tab } from "react-bootstrap";
import CarouselCustom from "@/components/CarouselCustom";
import YotpoStar from "@/components/YotpoStars";

export default function ProductCarousels() {
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
						<h2>What is Lorem Ipsum?</h2>
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
					</Tab>
					<Tab eventKey="bestsellers" title="Bestsellers" tabClassName="nav-link text-decoration-none h4 mb-0 font-weight-normal">
						<CarouselCustom id="bestsellersCarousel" slideNumber={4} centered={true} className="col-9 col-md-3" />
					</Tab>
					<Tab eventKey="value-sets" title="Value Sets" tabClassName="nav-link text-decoration-none h4 mb-0 font-weight-normal">
						<h2>Where can I get some?</h2>
						<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
					</Tab>
				</Tabs>
				<div className="text-center">
					<Link href="#" className="btn btn-lg btn-outline-primary mt-4">Shop All</Link>
				</div>
			</Container>
		</>
	);
};
