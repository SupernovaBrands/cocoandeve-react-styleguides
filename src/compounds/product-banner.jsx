import { Col, Row } from "react-bootstrap";

const ProductBanner = (props) => {
	return (
        <Row className={`product-banner ${props.background} row mx-0 mb-4 ${props.reverse ? 'flex-row-reverse' : ''}`}>
            <Col lg={6} className={`product-banner__text ${props.reverse ? 'pe-4' : ''}`}>
                <div className="product-banner__text-wrapper">
                    {props.children}
                </div>
            </Col>
            <Col className="product-banner__image px-0">
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
