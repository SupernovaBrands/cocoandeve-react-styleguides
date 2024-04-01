const PackagingCard = (props: any) => {
	return (
		<div className={`sustainability-card ${props.className ? props.className : ''}`}>
			<picture>
				<img className="w-full" alt="Img Alt" src={props.src} loading="lazy" />
			</picture>
			<div className="p-2 h-full bg-primary-light">
				{props.children}
			</div>
		</div>
	);
};

export default PackagingCard;
