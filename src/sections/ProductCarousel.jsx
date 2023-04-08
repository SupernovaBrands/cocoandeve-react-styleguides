import Link from "next/link";
import { Container, Tabs, Tab } from "react-bootstrap";
import CarouselCustom from "@/components/CarouselCustom";

const ProductCarousel = (props) => {
	const bestSellers = [
		{
			label: 'Slide 1',
			title: 'Bronzing Face Drops',
			productId: 4543113265187,
			comparePrice: '$44.90',
			price: '$134.90',
			srcSet: 'https://via.placeholder.com/540x540',
			src: 'https://via.placeholder.com/243x243',
			badgeImg: true,
			swatch: {
				label: 'Choose Style',
				style: true,
				data: [
					{ id: 32068891607075, value: 'girl-print', label: 'Girl Print: Limited edition!', available: false},
					{ id: 32068891639843, value: 'leaf-print', label: 'Leaf Print', available: true},
				]
			}
		},
		{
			label: 'Slide 2',
			title: 'Sunny Honey Bali Bronzing Foam',
			productId: 4543113265187,
			comparePrice: '$144.90',
			price: '$134.90',
			badgeImg: true,

			srcSet: 'https://via.placeholder.com/540x540',
			src: 'https://via.placeholder.com/243x243',
			swatch: {
				label: 'Choose Style',
				style: true,
				data: [
					{ id: 32068891607075, value: 'girl-print', label: 'Girl Print: Limited edition!', available: false},
					{ id: 32068891639843, value: 'leaf-print', label: 'Leaf Print', available: true},
				]
			}
		},
		{
			label: 'Slide 3',
			title: 'Like A Virgin Hair Masque',
			productId: 4543113265187,
			comparePrice: '$44.90',
			price: '$34.90',
			srcSet: 'https://via.placeholder.com/540x540',
			src: 'https://via.placeholder.com/243x243',
			badgeText: 'New'
		},
		{
			label: 'Slide 4',
			title: 'Sunny Honey Bali Bronzing Bundle',
			productId: 4543113265187,
			comparePrice: '$44.90',
			price: '$34.90',
			srcSet: 'https://via.placeholder.com/540x540',
			src: 'https://via.placeholder.com/243x243',
		}
	];
	const newTab = [
		{
			label: 'Slide 1',
			title: 'Bronzing Face Drops',
			productId: 4543113265187,
			comparePrice: '$44.90',
			price: '$134.90',
			srcSet: 'https://via.placeholder.com/540x540',
			src: 'https://via.placeholder.com/243x243',
			badgeText: 'New',
			swatch: {
				label: 'Choose Shade',
				shade: true,
				data: [
					{ id: 32068891541539, value: 'medium', label: 'Medium', available: true},
					{ id: 32068891607075, value: 'dark', label: 'Dark', available: true},
					{ id: 32068891639843, value: 'ultra-dark', label: 'Ultra Dark', available: true},
				]
			}
		},
		{
			label: 'Slide 2',
			title: 'Sunny Honey Bali Bronzing Foam',
			productId: 4543113265187,
			comparePrice: '$144.90',
			price: '$134.90',
			srcSet: 'https://via.placeholder.com/540x540',
			src: 'https://via.placeholder.com/243x243',
			swatch: {
				label: 'Choose Style',
				style: true,
				data: [
					{ id: 32068891607075, value: 'girl-print', label: 'Girl Print: Limited edition!', available: false},
					{ id: 32068891639843, value: 'leaf-print', label: 'Leaf Print', available: true},
				]
			}
		},
		{
			label: 'Slide 3',
			title: 'Like A Virgin Hair Masque',
			productId: 4543113265187,
			comparePrice: '$44.90',
			price: '$34.90',
			srcSet: 'https://via.placeholder.com/540x540',
			src: 'https://via.placeholder.com/243x243',
		},
		{
			label: 'Slide 4',
			title: 'Sunny Honey Bali Bronzing Bundle',
			productId: 4543113265187,
			comparePrice: '$44.90',
			price: '$34.90',
			badgeImg: true,
			srcSet: 'https://via.placeholder.com/540x540',
			src: 'https://via.placeholder.com/243x243',
		}
	];
	return (
		<Container as="section" className="product-carousel pt-4 pb-4">
			<Tabs
				defaultActiveKey="bestsellers"
				id="product-carousel-tab"
				className="nav nav-tabs mx-auto nav-tabs--product text-center mb-2 justify-content-center"
			>
				<Tab eventKey="new" title="New" tabClassName="nav-link text-decoration-none h4 mb-0 fw-normal">
					<CarouselCustom productCard={true} items={newTab} id="newsCarousel" slideNumber={4} centered={true} className="position-relative mb-5 col-9 col-md-3 product-card text-center" />
				</Tab>
				<Tab eventKey="bestsellers" title="Bestsellers" tabClassName="nav-link text-decoration-none h4 mb-0 fw-normal">
					<CarouselCustom productCard={true} items={bestSellers} id="bestsellersCarousel" slideNumber={4} centered={true} className="position-relative mb-5 col-9 col-md-3 product-card text-center" />
				</Tab>
				<Tab eventKey="value-sets" title="Value Sets" tabClassName="nav-link text-decoration-none h4 mb-0 fw-normal">
					<CarouselCustom productCard={true} items={newTab} id="valueSetsCarousel" slideNumber={4} centered={true} className="position-relative mb-5 col-9 col-md-3 product-card text-center" />
				</Tab>
			</Tabs>
			<div className="text-center">
				<Link href="#" className="btn btn-lg btn-outline-primary mt-4">Shop All</Link>
			</div>
		</Container>
	);
};

export default ProductCarousel;
