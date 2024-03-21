export default function Grid() {
	const cssGrid = `
	.col {
		height: 100vh;
	}
	.col:before {
		content: "";
		display: block;
		background-color: rgba(0,123,255,0.5);
		height: 100%;
	}`;
	return (
		<div className="mobile-wrapper">
			<style jsx>{cssGrid}</style>
			<h1>GRID</h1>
			<div className="container mt-4">
				<div className="flex flex-wrap">
					<div className="col flex-grow max-w-full flex-1 pr-[15px] pl-[15px]"></div>
					<div className="col flex-grow max-w-full flex-1 pr-[15px] pl-[15px]"></div>
					<div className="col flex-grow max-w-full flex-1 pr-[15px] pl-[15px]"></div>
					<div className="col flex-grow max-w-full flex-1 pr-[15px] pl-[15px]"></div>
					<div className="col flex-grow max-w-full flex-1 pr-[15px] pl-[15px] hidden lg:block"></div>
					<div className="col flex-grow max-w-full flex-1 pr-[15px] pl-[15px] hidden lg:block"></div>
					<div className="col flex-grow max-w-full flex-1 pr-[15px] pl-[15px] hidden lg:block"></div>
					<div className="col flex-grow max-w-full flex-1 pr-[15px] pl-[15px] hidden lg:block"></div>
					<div className="col flex-grow max-w-full flex-1 pr-[15px] pl-[15px] hidden lg:block"></div>
					<div className="col flex-grow max-w-full flex-1 pr-[15px] pl-[15px] hidden lg:block"></div>
					<div className="col flex-grow max-w-full flex-1 pr-[15px] pl-[15px] hidden lg:block"></div>
					<div className="col flex-grow max-w-full flex-1 pr-[15px] pl-[15px] hidden lg:block"></div>
				</div>
			</div>
		</div>
	);
}
