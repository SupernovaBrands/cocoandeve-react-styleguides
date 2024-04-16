import CarouselCustom from "~/components/CarouselCustom";

const PdpUpsell2 = (props) => {

    const items = [
		{
            active: "active d-lg-flex",
            step: "Step 1",
            nextStep: "Step 2",
            title: "Deluxe Exfoliating Mitt",
            text: "Exfoliates and lifts dead skin cells to preps skin for the perfect, streak-free self-tan",
            nexttitle: "Sunny Honey Bali Bronzing Bundle",
            nexttext: "Perfects and bronzes skin with a gorgeous self-tan without the bad tan smells, and orange tones!",
            compare_price: "$44.90",
            price: "$34.90",
        },
        {
            active: "active d-lg-flex",
            step: "Step 2",
            nextStep: "Step 3",
            title: "Sunny Honey Bali Bronzing Bundle",
            text: "Perfects and bronzes skin with a gorgeous self-tan without the bad tan smells, and orange tones!",
            nexttitle: "Sunny Honey Bali Bronzing Bundle",
            nexttext: "Innovative micromist technology allows for an even, hands-free face-tanning experience for a flawless, long-lasting glow.",
            compare_price: "$44.90",
            price: "$34.90",
        },
        {
            active: "active d-lg-flex",
            step: "Step 3",
            nextStep: "Step 2",
            title: "Antioxidant Face Tanning Micromist",
            text: "Innovative micromist technology allows for an even, hands-free face-tanning experience for a flawless, long-lasting glow.",
            nexttitle: "Sunny Honey Bali Bronzing Bundle",
            nexttext: "Perfects and bronzes skin with a gorgeous self-tan without the bad tan smells, and orange tones! ",
            compare_price: "$44.90",
            price: "$34.90",
        }
	];

    return (
        <div className="product-upsell-2 py-5">
            <div className="container">
                <h2 className="h1 col-12 text-center mb-3">Shop the routine</h2>
                <CarouselCustom id="ShopTheRoutineCarousel" productCardUpsell={true} useCardTemplate={true} items={items} slideNumber={4} className="w-full md:w-1/3" carouselClass="carousel--product-preview" roundedControl={false} colLgGrid={3} hideControls={true}  />
            </div>
        </div>
    );
};

export default PdpUpsell2;