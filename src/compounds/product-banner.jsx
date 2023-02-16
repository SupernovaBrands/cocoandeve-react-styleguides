const ProductBanner = (props) => {
	return (
        <div className="product-banner bg-yellow-light row mx-0 mb-4">
            <div className="product-banner__text col-12 col-lg-6 py-4">
                <div className="product-banner__text-wrapper">
                    <h2 className="h1 mb-2 mb-lg-4">Which Sunny Honey shade is right for me?</h2>
                    <h4 className="fw-normal mb-2 mb-lg-4"><b>Medium</b><br /> Gives skin a subtle glow. Great for lighter skin tones!</h4>
                    <h4 className="fw-normal mb-2 mb-lg-4"><b>Dark</b><br /> For a back from vacay bronze. Ideal for medium skin tones!</h4>
                    <h4 className="fw-normal mb-0"><b>Ultra Dark</b><br /> A deep, rich tan. For deeper skin tones!</h4>
                </div>
            </div>
            <div className="product-banner__image col-12 col-lg-6 px-0">
                <picture className="embed-responsive bg-shimmer h-100">
                    <source srcSet="https://cdn.shopify.com/s/files/1/0075/2163/2309/files/Rectangle_2x_5d1af986-b009-4369-b374-0d6a620bf81d_1440x.jpg?v=1585822408" media="(min-width: 992px)" />
                    <img
                        src="https://cdn.shopify.com/s/files/1/0075/2163/2309/files/Rectangle_2x_5d1af986-b009-4369-b374-0d6a620bf81d_828x.jpg?v=1585822408"
                        className="embed-responsive-item" />
                </picture>
            </div>
        </div>
	);
};

export default ProductBanner;
