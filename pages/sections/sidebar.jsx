import Link from "next/link";
import { Carousel, Col, Container, Row } from "react-bootstrap";

export default function Sidebar() {
	return (
		<div className="mobile-sidebar">
			<Container>
				<h1>Sidebar</h1>
				<Row>
					<Col md={12} lg={4}>
						<aside className="blog-grid__sidebar sidebar position-lg-sticky col-12 d-lg-block mb-4 mb-lg-0 align-self-start">
						<h4 class="mb-3 h1">POPULAR READS</h4>
								<Carousel className="slide carousel--sidebar" interval={null}>
									<Carousel.Item>
										<article class="post-card mb-2 mb-lg-3">
											<h3><a href="/cocoandeve-styleguides/docs/templates/article.html" class="link-primary">5 things you’re doing wrong with your hair care routine</a></h3>
											<p class="mt-1 mb-0">Give these myths the brush off for a healthy scalp & shiny hair!</p>
										</article>
										<article class="post-card mb-2 mb-lg-3">
											<h3><a href="/cocoandeve-styleguides/docs/templates/article.html" class="link-secondary">5 things you’re doing wrong with your hair care routine</a></h3>
											<p class="mt-1 mb-0">Give these myths the brush off for a healthy scalp & shiny hair!</p>
										</article>
									</Carousel.Item>
									<Carousel.Item>
										<article class="post-card mb-2 mb-lg-0">
											<h3><a href="/cocoandeve-styleguides/docs/templates/article.html" class="link-secondary">5 things you’re doing wrong with your hair care routine</a></h3>
											<p class="mt-1 mb-0">Give these myths the brush off for a healthy scalp & shiny hair!</p>
										</article>
									</Carousel.Item>
								</Carousel>
						</aside>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
