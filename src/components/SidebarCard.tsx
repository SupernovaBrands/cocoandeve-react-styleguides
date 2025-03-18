import Link from "next/link";
import parse from 'html-react-parser';

const SidebarCard = ({ data }) => (
	<article className="post-card flex mb-0 mr-g lg:mr-0">
		<a href={data.link} className="shrink-0 mr-g">
			<picture>
				<source srcSet={data.srcSet} media="(min-width: 992px)" />
				<img src={data.src} className="rounded" loading="lazy" alt={data.alt} width={96} height={96} />
			</picture>
		</a>
		<figcaption className="flex flex-col">
			<h3 className="mb-1">
				<a href={data.link} className="text-body-color hover:text-primary font-size-md">{data.title}</a>
			</h3>
			<span className="font-size-md">{parse(data.desc.replace(/<[^>]*>?/gm, ''))}</span>
		</figcaption>
	</article>
);

export default SidebarCard;
