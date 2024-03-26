// import PostCard from "@/compounds/PostCard";
import Link from "next/link";
import { useState } from "react";
import { Carousel, Col } from "react-bootstrap";

const Sidebar = (props) => {
	const [index, setIndex] = useState(0);
	const carouselHandle = (e) => {
		setIndex(parseInt(e.target.dataset.bsSlideTo));
	};
	const totalPosts = props.data.length;
	const totalCarouselItem = Math.round(totalPosts / 2);
	const arrayN = new Array(totalCarouselItem).fill('').map((_, i) => i);
	return (
		<Col md={12} lg={4}>
			<aside className="blog-grid__sidebar sidebar position-lg-sticky col-12 d-lg-block mb-4 mb-lg-0 align-self-start">
				<div className="no-gutters__in-container">
					<h4 className="mb-3 h1">POPULAR READS</h4>
					<div className="position-relative">
						{arrayN.length > 0 && (
							<>
								<ol className="carousel-indicators carousel-indicators--primary mb-0 d-lg-none">
									{arrayN.map((item, i) => (
										<li key={i} onClick={carouselHandle} data-bs-target=".carousel--sidebar" data-bs-slide-to={item} className={`rounded-circle ${index === i ? 'active' : ''}`}></li>
									))}
								</ol>
								{/* <Carousel activeIndex={index} className="carousel--sidebar" interval={null} controls={false} indicators={false}>
									{arrayN.map((item, i) => {
										const idx = item * 2;
										const sliced = props.data.slice(idx, (item + 1) * 2);
										return (
											<Carousel.Item key={i}>
												{sliced.map((data) => (
													<PostCard key={data.id} className="mb-2 mb-lg-3">
														<h3><Link href={data.link} className="link-secondary">{data.title}</Link></h3>
														<p className="mt-1 mb-0">{data.desc}</p>
													</PostCard>
												))}
											</Carousel.Item>
										);
									})}
								</Carousel> */}
							</>
						)}
					</div>
				</div>
			</aside>
		</Col>
	);
};

export default Sidebar;
