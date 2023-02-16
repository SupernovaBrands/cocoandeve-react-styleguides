import { Container } from "react-bootstrap";
import ProductVariant from "@/compounds/product-variant";

const ProductVariants = () => {

  let swatches = [
    {
      "label": "Medium",
      "title": "Subtle glow, lighter skin tones"
    },
    {
      "label": "Dark",
      "title": "Subtle glow, lighter skin tones"
    },
    {
      "label": "Ultra Dark",
      "title": "Subtle glow, lighter skin tones"
    },
  ]

  return (
    <Container className="mt-4 mb-2 px-g">
      <h1>Product Variant</h1>
      <div className="row mt-3">
        <form className="product-form col-12 col-lg-5">
          <ProductVariant
            id="product-variant-1-x-sunny-honey-bali-bronzing-foam"
            name="product-variant"
            title="1x Sunny Honey Bali Bronzing Foam"
            value="1-x-sunny-honey-bali-bronzing-foam"
            checked={true}
            inventory="10"
            dataID="32068892426275"
            variant_description="1x Masque + Brush"
            price="$44.90"
            swatches={swatches}
            swatch_medium="variant-swatch medium me-2 border-primary"
            swatch_dark="variant-swatch dark me-2"
            swatch_ultra_dark="variant-swatch ultra-dark"
          />
          <ProductVariant
            id="product-variant-1-x-sunny-honey-bali-bronzing-bundle"
            name="product-variant"
            title="1x Sunny Honey Bali Bronzing Bundle"
            value="1-x-sunny-honey-bali-bronzing-bundle"
            compare={true}
            save="(SAVE 30%)"
            inventory="10"
            dataID="32068892426275"
            variant_description="1x Masque + Brush"
            note="Ultra dark OOS waitlist, dark oos"
            price="$44.90"
            comparePrice="$89.80"
            swatches={swatches}
            swatch_medium="variant-swatch medium me-2 border-primary"
            swatch_dark="variant-swatch dark me-2 oos"
            swatch_ultra_dark="variant-swatch ultra-dark oos waitlist"
          />
          <ProductVariant
            id="product-variant-bronzing-face-drops"
            name="product-variant"
            title="Bronzing Face Drops"
            value="bronzing-face-drops"
            compare={true}
            save="(SAVE 30%)"
            inventory="10"
            dataID="32068892426275"
            variant_description="1x Masque + Brush"
            note="No shade swatch test"
            price="$44.90"
            comparePrice="$89.80"
			      hideSwatch={true}
          />
		  <ProductVariant
            id="product-variant-shampoo-conditioner-set"
			      title_subscription="Monthly Subscription"
            name="product-variant"
            title="Subscription (20% OFF)"
            value="shampoo-conditioner-set"
			      classes="product-variant--subscription"
            compare={true}
            save="(SAVE 30%)"
            inventory="10"
            dataID="32068892426275"
            variant_description="1x Masque + Brush"
            note="Super Hydrating Shampoo (250ml)"
            price="$44.90"
            comparePrice="$89.80"
            hideSwatch={true}
            subscription={true}
          />
        </form>
      </div>
    </Container>
  );
};

export default ProductVariants;
