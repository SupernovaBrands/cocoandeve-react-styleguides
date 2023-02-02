const TooltipSoldout = (props) => {
	return (
		<div className={`tooltip tooltip--sold-out bg-secondary p-1 rounded-1 ms-1 col-5 col-lg-3 text-white text-center ${props.className}`}>
			{props.children}
		</div>
	);
};

export default TooltipSoldout;
