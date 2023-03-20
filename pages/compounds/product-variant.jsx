import { Container } from "react-bootstrap";
import { useState } from "react";
import ProductVariant from "@/compounds/product-variant";

const ProductVariants = () => {
  const [isMedium, setMedium] = useState(true);
  const [isDark, setDark] = useState(false);
  const [isUltra, setUltra] = useState(false);

  const swatchChange = (event) => {
    if(event.target.getAttribute("data-value") == "medium") {
      setMedium(true);
      setDark(false);
      setUltra(false);
    }
    else if(event.target.getAttribute("data-value") == "dark") {
      setMedium(false);
      setDark(true);
      setUltra(false);
    }
    else if(event.target.getAttribute("data-value") == "ultra-dark") {
      setMedium(false);
      setDark(false);
      setUltra(true);
    }
  }
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
            margin="mb-1"
            >
            <button onClick={swatchChange} type="button" className={`variant-swatch medium me-2 ${isMedium ? 'border-primary' : ''}`} data-value="medium" data-id="32068891541539"></button>
            <button onClick={swatchChange} type="button" className={`variant-swatch dark me-2 ${isDark ? 'border-primary' : ''}`} data-value="dark" data-id="32068891607075"></button>
            <button onClick={swatchChange} type="button" className={`variant-swatch ultra-dark ${isUltra ? 'border-primary' : ''}`} data-value="ultra-dark" data-id="32068891639843"></button>
            {isMedium && <p className="font-size-sm w-100 mt-2 mb-0 swatch-label-medium"><b>Medium</b> - Subtle glow, lighter skin tones</p>}
            {isDark && <p className="font-size-sm w-100 mt-2 mb-0 swatch-label-dark"><b>Dark</b> - Subtle glow, lighter skin tones</p>}
            {isUltra && <p className="font-size-sm w-100 mt-2 mb-0 swatch-label-ultra-dark"><b>Ultra Dark</b> - Subtle glow, lighter skin tones</p>}
            </ProductVariant>
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
            margin="mb-1"
          >
          <button onClick={swatchChange} type="button" className={`variant-swatch medium me-2 ${isMedium ? 'border-primary' : ''}`} data-value="medium" data-id="32068891541539"></button>
          <button onClick={swatchChange} type="button" className={`variant-swatch dark me-2 oos ${isDark ? 'border-primary' : ''}`} data-value="dark" data-id="32068891607075"></button>
          <button onClick={swatchChange} type="button" className={`variant-swatch ultra-dark oos waitlist ${isUltra ? 'border-primary' : ''}`} data-value="ultra-dark" data-id="32068891639843"></button>
					{isMedium && <p className="font-size-sm w-100 mt-2 mb-0 swatch-label-medium"><b>Medium</b> - Subtle glow, lighter skin tones</p>}
          {isDark && <p className="font-size-sm w-100 mt-2 mb-0 swatch-label-dark"><b>Dark</b> - Subtle glow, lighter skin tones</p>}
          {isUltra && <p className="font-size-sm w-100 mt-2 mb-0 swatch-label-ultra-dark"><b>Ultra Dark</b> - Subtle glow, lighter skin tones</p>}
          </ProductVariant>
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
            margin="mb-3"
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
            margin="mb-3"
          />
        </form>
      </div>
    </Container>
  );
};

export default ProductVariants;
