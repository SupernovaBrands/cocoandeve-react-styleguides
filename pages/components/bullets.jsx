import { Container } from "react-bootstrap";

export default function Bullets() {
	return (
		<Container>
			<h1>CAROUSEL BULLETS</h1>
			<div class="position-relative mb-3">
                <ol class="carousel-indicators carousel-indicators--primary">
                    <li data-bs-target="#carouselndicators" data-bs-slide-to="0" class="active rounded-circle border-0"></li>
                    <li data-bs-target="#carouselIndicators" data-bs-slide-to="1" class="rounded-circle border-0"></li>
                    <li data-bs-target="#carouselIndicators" data-bs-slide-to="2" class="rounded-circle border-0"></li>
                </ol>
            </div>

            <h1>CAROUSEL BULLETS WHITE</h1>
            <div class="position-relative mb-3">
                <ol class="carousel-indicators">
                    <li data-bs-target="#carouselndicators" data-bs-slide-to="0" class="active rounded-circle border-0"></li>
                    <li data-bs-target="#carouselIndicators" data-bs-slide-to="1" class="rounded-circle border-0"></li>
                    <li data-bs-target="#carouselIndicators" data-bs-slide-to="2" class="rounded-circle border-0"></li>
                </ol>
            </div>
		</Container>
	);
}
