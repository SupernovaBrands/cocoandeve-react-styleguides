import PostTag from "@/components/PostTag";
import Link from "next/link";

type PropType = {
	className: string
	data: any
}

const PostCard: React.FC<PropType> = ({ className, data }) => (
	<article className={`${className}`}>
		<figure className="mb-2 border border-secondary-light h-full flex flex-col">
			{data.img && (
				<Link href={data.handle ?? '#'} className="relative block hover:after:bg-white hover:after:bg-opacity-20 after:content-[''] after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:transition-colors after:duration-150 after:ease-in-out" aria-label={data.title}>
					<picture>
						{data.srcSet && (<source srcSet={data.srcSet} media="(min-width: 992px)" />)}
						<img src={data.img} className="w-full" alt={data.title} />
					</picture>
				</Link>
			)}
			<figcaption className="p-2 flex flex-col grow">
				{data.tags.length > 0 && (
					<p className="mb-0">
						{data.tags.map((item: string) => (
							<PostTag tag={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</PostTag>
						))}
					</p>
				)}
				<Link href={data.handle ?? '#'} className="h2 mt-2 mb-1 block text-body">{data.title}</Link>
				<p className="flex flex-col grow">{data.description}</p>
				<Link href={data.handle ?? '#'} className="btn btn-outline-primary self-start hover:no-underline" aria-label={data.title}>Read more</Link>
			</figcaption>
		</figure>
	</article>
);

export default PostCard;
