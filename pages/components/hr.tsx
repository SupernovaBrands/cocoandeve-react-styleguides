
const Hrs = (props) => {
	return (
		<div className="container mt-4">
			<h3 className="mb-1">HR</h3>
            <div className="flex flex-wrap">
                <div className="relative flex-grow max-w-full flex-1">
                    <hr className="my-2" />
                </div>
            </div>

            <h3 className="mb-1">HR primary color</h3>
            <div className="flex flex-wrap -mx-hg lg:-mx-g">
                <div className="w-1/2 lg:w-1/6 px-hg lg:px-g">
                    <hr className="text-primary my-3 border-t-2" />
                </div>
            </div>
		</div>
	);
};

export default Hrs;
