import { Container } from "react-bootstrap";
import PDPBanner from "@/compounds/product-banner";

const ProductBanner = () => {
  return (
    <div>
      <Container className="container mt-4 mb-2 px-g">
        <h1>Product Banner</h1>
      </Container>
      <PDPBanner />
    </div>
  );
};

export default ProductBanner;
