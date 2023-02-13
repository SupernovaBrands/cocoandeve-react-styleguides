import { Container } from "react-bootstrap";
import ProductVariant from "@/components/product-variant";

const ProductVariants = () => {
  return (
    <Container className="mt-4 mb-2 px-g">
      <h1>Product Variant</h1>
      <div className="row mt-3">
        <form className="product-form col-12 col-lg-5">
          <ProductVariant
            input_id="product-variant-1-x-sunny-honey-bali-bronzing-foam"
            name="product-variant"
            title="1x Sunny Honey Bali Bronzing Foam"
            value="1-x-sunny-honey-bali-bronzing-foam"
            checked={true}
            data_id="32068892426275"
            swatch_medium="variant-swatch medium me-2 border-primary"
            swatch_dark="variant-swatch dark me-2"
            swatch_ultra_dark="variant-swatch ultra-dark"
          />
          <ProductVariant
            input_id="product-variant-1-x-sunny-honey-bali-bronzing-bundle"
            name="product-variant"
            title="1x Sunny Honey Bali Bronzing Bundle"
            value="1-x-sunny-honey-bali-bronzing-bundle"
            compare={true}
            note="Ultra dark OOS waitlist, dark oos"
            swatch_medium="variant-swatch medium me-2 border-primary"
            swatch_dark="variant-swatch dark me-2 oos"
            swatch_ultra_dark="variant-swatch ultra-dark oos waitlist"
          />
          <ProductVariant
            input_id="product-variant-bronzing-face-drops"
            name="product-variant"
            title="Bronzing Face Drops"
            value="bronzing-face-drops"
            compare={true}
            note="No shade swatch test"
			hideSwatch={true}
          />
		  <ProductVariant
            input_id="product-variant-shampoo-conditioner-set"
			title_subscription="Monthly Subscription"
            name="product-variant"
            title="Subscription (20% OFF)"
            value="shampoo-conditioner-set"
			classes="product-variant--subscription"
            compare={true}
            note="Super Hydrating Shampoo (250ml)"
			hideSwatch={true}
			subscription={true}
          />
        </form>
      </div>
    </Container>
  );
};

export default ProductVariants;
