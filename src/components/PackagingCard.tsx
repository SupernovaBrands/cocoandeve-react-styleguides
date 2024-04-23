const PackagingCard = (props: any) => (
	<div className={`sustainability-card ${props.className ? props.className : ''}`}>
		<picture>
			<source srcSet={props.srcSet} media="(min-width: 992px)" />
			<img className="w-full" alt="Img Alt" src={props.src} loading="lazy" />
		</picture>
		<div className="p-2 h-full bg-primary-light">
			{props.children}
		</div>
	</div>
);

export default PackagingCard;
