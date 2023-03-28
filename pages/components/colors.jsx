import { Container } from "react-bootstrap";

const Colors = (props) => {
	return (
		<Container className="mt-4">
			<h1>Colors</h1>
            <h2>Primary</h2>
            <div className="row">
                <div className="col-6 col-lg-2 mb-3 box-primary">Primary</div>
                <div className="col-6 col-lg-2 mb-3 box-primary-light">Primary Light</div>
                <div className="col-6 col-lg-2 mb-3 box-primary-dark">Primary Dark</div>
            </div>
            <h2>Secondary</h2>
            <div className="row">
                <div className="col-6 col-lg-2 mb-3 box-secondary">Secondary</div>
                <div className="col-6 col-lg-2 mb-3 box-secondary-light">Secondary Light</div>
            </div>
            <h2>Brand</h2>
            <div className="row">
                <div className="col-6 col-lg-2 mb-3 box-sh-purple">SH Purple</div>
                <div className="col-6 col-lg-2 mb-3 box-sh-purple-light">SH Purple Light</div>
                <div className="col-6 col-lg-2 mb-3 box-bali-bod-blue">Bali Bod Blue</div>
                <div className="col-6 col-lg-2 mb-3 box-bali-bod-blue-light">Bali Bod Blue Light</div>
                <div className="col-6 col-lg-2 mb-3 box-sh-orange">SH Orange</div>
                <div className="col-6 col-lg-2 mb-3 box-sh-orange-light">SH Orange Light</div>
                <div className="col-6 col-lg-2 mb-3 box-green-light">Green Light</div>
                <div className="col-6 col-lg-2 mb-3 box-yellow-light">Yellow Light</div>
                <div className="col-6 col-lg-2 mb-3 box-pink-light">Pink Light</div>
            </div>
            <h2>Body</h2>
            <div className="row">
                <div className="col-6 col-lg-2 mb-3 box-body-color">Body</div>
                <div className="col-6 col-lg-2 mb-3 box-secondary-body">Secondary Body</div>
            </div>
            <h2>Others</h2>
            <div className="row">
                <div className="col-6 col-lg-2 mb-3 box-gray-500">Input Placeholder</div>
                <div className="col-6 col-lg-2 mb-3 box-gray-400">Input Border</div>
                <div className="col-6 col-lg-2 mb-3 box-gray-100">Input Disabled Bg / Upsell bg</div>
            </div>
		</Container>
	);
};

export default Colors;