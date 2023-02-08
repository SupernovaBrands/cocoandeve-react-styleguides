import { Container } from "react-bootstrap";

const ProductWaitlist = (props) => {
	return (
		<form id="product-waitlist-form-oos" className="product-waitlist-form-oos bg-pink-light px-g py-2 order-lg-2 mt-3 mb-3 rounded">
            <h3 className="text-center h2">Restocking Jan 2022</h3>
            <p className="text-center font-size-sm px-lg-3 mb-1">Our products have been a worldwide hit and we can't keep up with the stock. But we are on it, sign up and we will notify you when it’s available!</p>
            <div className="input-group rounded">
                <input type="email" name="email" className="form-control text-body border-right-0 rounded-right-0 rounded bg-white" placeholder="Enter your email" />
                <button className="btn btn-primary rounded  mt-1 mt-lg-0 py-1 col-12 col-lg-auto" type="submit">Join the waitlist</button>
            </div>
        </form>
	);
};

export default ProductWaitlist;