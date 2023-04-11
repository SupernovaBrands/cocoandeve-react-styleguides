import { Container } from "react-bootstrap";
import TestimonialCarousel from "@/sections/TestimonialCarousel";

const TestimonialSection = () => {
    const carouselItems = [
        {
            index: 0,
			label: 'Slide 1',
            quote: 'Not only is this vegan masque Peta-approved it’s also pined after by many beauty moguls and bloggers',
            srcSet: '//cdn.shopify.com/s/files/1/0075/2163/2309/files/The_Times_logo_wrodmark_2x_8b53f186-43fd-470b-9043-146897718362_x50.png?v=1591087122',
            src: '//cdn.shopify.com/s/files/1/0075/2163/2309/files/The_Times_logo_wrodmark_2x_8b53f186-43fd-470b-9043-146897718362_x25.png?v=1591087122'
        },
        {
            index: 1,
			label: 'Slide 2',
            quote: 'Not only is this vegan masque Peta-approved it’s also pined after by many beauty moguls and bloggers',
            srcSet: '//cdn.shopify.com/s/files/1/0075/2163/2309/files/Glamour_2x_1_x50.png?v=1591087107',
            src: '//cdn.shopify.com/s/files/1/0075/2163/2309/files/Glamour_2x_1_x25.png?v=1591087107'
        },
        {
            index: 2,
			label: 'Slide 3',
            quote: 'Not only is this vegan masque Peta-approved it’s also pined after by many beauty moguls and bloggers',
            srcSet: '//cdn.shopify.com/s/files/1/0075/2163/2309/files/Harpers_Bazaar_logo_logotype_2x_65a7f362-98ec-471c-876e-f7a614a9d237_x50.png?v=1591087114',
            src: '//cdn.shopify.com/s/files/1/0075/2163/2309/files/Harpers_Bazaar_logo_logotype_2x_65a7f362-98ec-471c-876e-f7a614a9d237_x25.png?v=1591087114'
        },
        {
            index: 3,
			label: 'Slide 4',
            quote: 'Not only is this vegan masque Peta-approved it’s also pined after by many beauty moguls and bloggers',
            srcSet: '//cdn.shopify.com/s/files/1/0075/2163/2309/files/The_Times_logo_wrodmark_2x_8b53f186-43fd-470b-9043-146897718362_x50.png?v=1591087122',
            src: '//cdn.shopify.com/s/files/1/0075/2163/2309/files/The_Times_logo_wrodmark_2x_8b53f186-43fd-470b-9043-146897718362_x25.png?v=1591087122'
        }
    ]
    return (
		<>
			<h1>Testimonials Carousel</h1>
            <section className="testimonials-carousel bg-light mt-4 py-4">
                <Container className="container text-center">
                    <h2 className="h1 mb-0">As seen in</h2>
                    <TestimonialCarousel id="testimonialsCarousel" indicatorClass="carousel-indicators--black" items={carouselItems} indicatorBorder={true} customArrows={true} />
                </Container>
            </section>
			
		</>
	);
}

export default TestimonialSection;