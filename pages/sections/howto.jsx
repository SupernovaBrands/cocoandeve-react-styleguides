import { Container } from "react-bootstrap";
import HowToCarousel from "@/sections/HowTo";

const HowToSection = () => {

    return (
		<>
			<Container className="mb-5">
        <h1 className="mt-4">Video Carousel</h1>
        <h3 className="py-2">3 Items Centered and loop</h3>
        <HowToCarousel />
      </Container>
		</>
	);
}

export default HowToSection;