import { useEffect, useRef } from "react";

const TooltipSoldout = (props) => {
	const tooltipOos = useRef(null);
	useEffect(() => {
		setTimeout(() => {
			tooltipOos.current?.classList.add('show');
			setTimeout(() => {
				tooltipOos.current?.classList.remove('show');
			}, 5000);
		}, 2000);
		return () => {};
	}, []);
	return (
		<div ref={tooltipOos} className={`tooltip tooltip--sold-out bg-secondary p-1 rounded-1 ms-1 col-5 col-lg-3 text-white text-center ${props.className}`}>
			{props.children}
		</div>
	);
};

export default TooltipSoldout;
