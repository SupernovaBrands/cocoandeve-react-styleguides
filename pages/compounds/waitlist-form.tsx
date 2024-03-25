import ProductWaitlist from "@/compounds/product-waitlist-oos"; 

const WaitlistForm = () => {
	return (
		<div className="container mt-4 mb-2 px-g">
			<h1 className="mb-1">Waitlist Form</h1>
			<div className="row mt-3">
				<h2 className="w-full lg:w-1/4">OOS Product</h2>
				<div className="w-full w-2/5">
					<ProductWaitlist title="Restocking Jan 2022" content="Our products have been a worldwide hit and we can't keep up with the stock. But we are on it, sign up and we will notify you when it’s available!" button="Join the waitlist" />
				</div>
			</div>
		</div>
	);
};

export default WaitlistForm;