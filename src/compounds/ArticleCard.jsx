import Link from "next/link";

const ArticleCard = (props) => {
	return (
		<div className={`${props.className} ${props.useCarousel ? 'carousel-item' : 'mb-4 mb-lg-3'} ${props.useCarousel && props.activeIndex === props.item.index ? 'active ' : ''} ${props.itemMovingNext ? 'carousel-item-next carousel-item-start ' : ''} ${props.itemMovingPrev ? 'carousel-item-prev carousel-item-end ' : ''}`} as="article">
			<figure className={`border border-secondary-light ${props.useCarousel ? '' : 'mb-2 no-gutters__in-container'}`}>
				<Link href="./templates/article" aria-label={props.item.title}>
					<img src={props.item.src} className="w-100" alt={props.item.title} />
				</Link>
				<figcaption className="p-2">
					{props.item.tags.map((tag) => (
						<span class={`badge badge--square badge-blog ${tag.class} fw-normal me-1`}>{tag.label}</span>
					))}
					<p className="h2 mt-2">{props.item.title}</p>
					{props.item.desc && (
						<p>{props.item.desc}</p>
					)}
					<Link href="#" className="btn btn-outline-primary" aria-label={props.item.title}>read more</Link>
				</figcaption>
			</figure>
		</div>
	);
};

export default ArticleCard;
