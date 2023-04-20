import { Col, Row } from "react-bootstrap";

const ProductBanner = (props) => {
	return (
        <Row className={`product-banner ${props.background} mx-0 mb-4 ${props.reverse ? 'product-banner__d-reverse' : ''}`}>
            <Col lg={6} className={`product-banner__text py-4 ${props.textTop ? 'product-banner__text-top' : ''}`}>
                <div className={`product-banner__text-wrapper ${props.paddingTop ? props.paddingTop : ''}`}>
                    {props.children}
                </div>
            </Col>
            <Col lg={6} className="product-banner__image px-0">
                <picture className="ratio ratio-6x7 h-100">
                    <source
                        srcSet={props.srcSet}
                        media="(min-width: 992px)" />
                    <img
                        src={props.src}
                        className="embed-responsive-item" loading="lazy" />
                </picture>
            </Col>
        </Row>
	);
};

export default ProductBanner;
