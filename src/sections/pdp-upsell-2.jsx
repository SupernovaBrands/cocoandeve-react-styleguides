import { Container, Row } from 'react-bootstrap';
import CarouselCustom from "@/components/CarouselCustom";

const PdpUpsell2 = (props) => {

    const items = [
		{
            active: "active d-lg-flex",
            step: "Step 1",
            nextStep: "Step 2",
            title: "Deluxe Exfoliating Mitt",
            text: "Exfoliates and lifts dead skin cells to preps skin for the perfect, streak-free self-tan",
            nexttitle: "Sunny Honey Bali Bronzing Bundle",
            nexttext: "Perfects and bronzes skin with a gorgeous self-tan without the bad tan smells, and orange tones! ",
            compare_price: "$44.90",
            price: "$34.90",
        },
        {
            active: "d-lg-flex",
            swatch_shade: "true",
            step: "Step 2",
            nextStep: "Step 3",
            title: "Sunny Honey Bali Bronzing Bundle",
            text: "Perfects and bronzes skin with a gorgeous self-tan without the bad tan smells, and orange tones!",
            nexttitle: "Antioxidant Face Tanning Micromist",
            nexttext: "Innovative micromist technology allows for an even, hands-free face-tanning experience for a flawless, long-lasting glow.",
            compare_price: "$44.90",
            price: "$34.90"
        },
        {
            active: "d-lg-flex",
            step: "Step 3",
            nextStep: "Step 1",
            title: "Antioxidant Face Tanning Micromist",
            text: "Innovative micromist technology allows for an even, hands-free face-tanning experience for a flawless, long-lasting glow.",
            nexttitle: "Deluxe Exfoliating Mitt",
            nexttext: "Exfoliates and lifts dead skin cells to preps skin for the perfect, streak-free self-tan",
            compare_price: "$44.90",
            price: "$34.90",
            last: "true"
        }
	];

    return (
        <div className="product-upsell-2 py-5">
            <Container>
                <h2 className="h1 col-12 text-center mb-3">Shop the routine</h2>
                <CarouselCustom id="ShopTheRoutineCarousel" productCardUpsell={true} useCardTemplate={true} items={items} slideNumber={4} className="col-12 col-md-4" roundedControl={false} colLgGrid={3} useRow={true} hideControls={true}  />
            </Container>
        </div>
    );
};

export default PdpUpsell2;