export default function Grid() {
	const cssGrid = `
	.col{
		height: 100vh;
	}
	.col:before {
		content: "";
		display: block;
		background-color: rgba(0,123,255,0.5);
		height: 100%;
	}`;
	return (
		<div className="mobile-wrapper pl-[7.5px] pr-[7.5px]">
			<style jsx>{cssGrid}</style>
			<h1 className="mb-1">GRID</h1>
			<div className="container">
				<div className="grid lg:grid-cols-12 grid-cols-4 lg:gap-3 gap-[15px]">
					<div className="col"></div>
					<div className="col"></div>
					<div className="col"></div>
					<div className="col"></div>
					<div className="col hidden lg:block"></div>
					<div className="col hidden lg:block"></div>
					<div className="col hidden lg:block"></div>
					<div className="col hidden lg:block"></div>
					<div className="col hidden lg:block"></div>
					<div className="col hidden lg:block"></div>
					<div className="col hidden lg:block"></div>
					<div className="col hidden lg:block"></div>
				</div>
			</div>
		</div>
	);
}
