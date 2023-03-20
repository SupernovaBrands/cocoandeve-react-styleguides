const ProductWaitlist = (props) => {
	return (
		<form id="product-waitlist-form-oos" className="product-waitlist-form-oos bg-pink-light px-g py-2 order-lg-2 mt-3 mb-3 rounded">
            <h3 className="text-center h2">{props.title}</h3>
            <p className="text-center font-size-sm px-lg-3 mb-1">{props.content}</p>
            <div className="input-group rounded">
                <input type="email" name="email" className="form-control text-body border-right-0 rounded-right-0 rounded bg-white" placeholder="Enter your email" />
                <button className="btn btn-primary rounded ms-0 me-0 mt-lg-0 py-1 col-12 col-lg-auto" type="submit">{props.button}</button>
            </div>
        </form>
	);
};

export default ProductWaitlist;