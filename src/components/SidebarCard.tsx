import Link from "next/link";

const SidebarCard = ({ data }) => (
	<article className="post-card flex mb-3">
		<picture className="shrink-0 mr-1">
			<source srcSet={data.srcSet} media="(min-width: 992px)" />
			<Link href={data.link} className="flex grow">
				<img src={data.src} loading="lazy" alt={data.alt} width={90} height={90} />
			</Link>
		</picture>
		<figcaption className="flex flex-col font-size-sm">
			<h3 className="mb-1">
				<Link href={data.link} className="text-body-color hover:text-primary font-size-sm">{data.title}</Link>
			</h3>
			<p className="mb-0">{data.desc}</p>
		</figcaption>
	</article>
);

export default SidebarCard;
