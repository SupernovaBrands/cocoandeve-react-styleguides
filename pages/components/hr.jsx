import { Container } from "react-bootstrap";

const Hrs = (props) => {
	return (
		<Container className="mt-4">
			<h3>HR</h3>
            <div className="row">
                <div className="col">
                    <hr />
                </div>
            </div>

            <h3>HR primary color</h3>
            <div className="row">
                <div className="col-6 col-lg-2">
                    <hr className="hr--primary my-3" />
                </div>
            </div>
		</Container>
	);
};

export default Hrs;