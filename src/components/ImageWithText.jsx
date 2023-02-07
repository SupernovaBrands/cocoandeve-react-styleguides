import { Col } from "react-bootstrap";

const ImageWithText = (props) => {
	return (
		<figure className={`imagewtext row position-relative align-items-center mb-lg-2 mt-5 ${props.reverse ? 'flex-row-reverse' : ''}`}>
			<Col xs={12} lg={8} className="order-lg-last">
				<div className="no-gutters__in-container">
					<picture>
						<source srcSet={props.srcSet} media="(min-width: 992px)" />
						<img src={props.src} className="w-100" />
					</picture>
				</div>
			</Col>
			<Col xs={12} lg={4} as="figcaption">
				<div className={`imagewtext__content text-start mt-lg-0 p-2 pt-lg-3 pb-lg-3 ${props.reverse ? 'imagewtext--reverse ps-lg-3' : 'pe-lg-3'}`}>
					{props.children}
				</div>
			</Col>
		</figure>
	);
};

export default ImageWithText;
