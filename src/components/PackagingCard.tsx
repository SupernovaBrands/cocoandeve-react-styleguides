const PackagingCard = (props: any) => (
	<div className={`sustainability-card ${props.className ? props.className : ''}`}>
		<picture className="embed-responsive max-h-[7.507rem] sm-2:max-h-[8.193rem] before:pt-[58.06452%] lg:before:pt-[49.31507%] lg:max-h-[7.938rem]">
			<source srcSet={props.srcSet} media="(min-width: 992px)" />
			<img className="embed-responsive-item fit--cover" alt="Img Alt" src={props.src} loading="lazy" />
		</picture>
		<div className="p-2 min-h-[29.03rem] lg:min-h-[21.766rem] bg-primary-light">
			{props.children}
		</div>
	</div>
);

export default PackagingCard;
