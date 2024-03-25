
type PropType = {
	children: React.ReactNode
	className: string
	emblaRef: any
};

const Inner: React.FC<PropType> = (props) => {
	const { emblaRef, children } = props;
	return (
		<div className="overflow-hidden" ref={emblaRef}>
			<div className="flex carousel__container touch-pan-y lg:-mx-g">
				{children}
			</div>
		</div>
	);
};

export default Inner;
