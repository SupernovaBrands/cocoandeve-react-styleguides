import { Container } from "react-bootstrap";
import CarouselCustom from "@/components/CarouselCustom";

const HowToCarousel = (props) => {
	const items = [
		{
			label: 'Slide 1',
			title: 'Multi-masking #selfcaresunday with Janet Amrani 1',
			srcSet: 'https://via.placeholder.com/720x720',
			src: 'https://via.placeholder.com/592x592',
		},
        {
			label: 'Slide 2',
			title: 'Multi-masking #selfcaresunday with Janet Amrani 2',
			srcSet: 'https://via.placeholder.com/720x720',
			src: 'https://via.placeholder.com/592x592',
		},
        {
			label: 'Slide 3',
			title: 'Multi-masking #selfcaresunday with Janet Amrani 3',
			srcSet: 'https://via.placeholder.com/720x720',
			src: 'https://via.placeholder.com/592x592',
		}
	];
	
	return (
		<section className="how-to bg-primary-light py-2 no-gutters__in-container mb-5">
			<h2 className="text-center h1 py-2 py-lg-1 mb-0">The Ultimate “HOW TO”s</h2>
			<CarouselCustom videoCard={true} items={items} id="howToCarousel" slideNumber={3} colLgGrid={4} className="col-9 col-md-4" />
		</section>
	);
};

export default HowToCarousel;
