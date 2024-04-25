import Link from "next/link";
import parse from 'html-react-parser';

const SidebarCard = ({ data }) => (
	<article className="post-card flex mb-3">
		<Link href={data.link} className="shrink-0 mr-1">
			<picture>
				<source srcSet={data.srcSet} media="(min-width: 992px)" />
				<img src={data.src} loading="lazy" alt={data.alt} width={96} height={96} />
			</picture>
		</Link>
		<figcaption className="flex flex-col">
			<h3 className="mb-1">
				<Link href={data.link} className="text-body-color hover:text-primary font-size-md">{data.title}</Link>
			</h3>
			<span className="font-size-md">{parse(data.desc)}</span>
		</figcaption>
	</article>
);

export default SidebarCard;
