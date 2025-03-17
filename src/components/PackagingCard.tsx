const PackagingCard = (props: any) => (
	<div className={`sustainability-card ${props.className ? props.className : ''}`}>
		<picture className="embed-responsive max-h-[105.5px] sm-2:max-h-[8.193rem] before:pt-[58.06452%] lg:before:pt-[49.31507%] lg:max-h-[7.938rem]">
			<source srcSet={props.srcSet} media="(min-width: 992px)" />
			<img className="embed-responsive-item fit--cover rounded-t" alt="Img Alt" src={props.src} loading="lazy" />
		</picture>
		<div className="p-[1rem] min-h-[315px] lg:min-h-[288px] bg-gray-100 rounded-b">
			{props.children}
		</div>
	</div>
);

export default PackagingCard;
