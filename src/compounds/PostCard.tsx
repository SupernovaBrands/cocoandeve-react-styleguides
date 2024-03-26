import PostTag from "@/components/PostTag";
import { Button } from "@/components/index";
import Link from "next/link";

type PropType = {
	className: string
	data: any
}

const PostCard: React.FC<PropType> = (props) => {
	const { className, data } = props;
	return (
		<article className={`${className}`}>
			<figure className="mb-2 no-gutters__in-container border border-secondary-light h-full flex flex-col">
				{data.img && (
					<Link href={data.handle ?? '#'} className="hover-overlay d-block" aria-label={data.title}>
						<picture>
							{data.srcSet && (<source srcSet={data.srcSet} media="(min-width: 992px)" />)}
							<img src={data.img} className="w-100" alt={data.title} />
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
					<Link href={data.handle ?? '#'} className="h2 mt-2 mb-1 d-block text-body">{data.title}</Link>
					<p className="flex flex-col grow">{data.description}</p>
					<Link href={data.handle ?? '#'} className="inline-block font-bold text-center align-middle text-primary bg-white border border-primary self-start hover:bg-primary hover:text-white hover:no-underline py-[9px] px-[28px] leading-base rounded" aria-label={data.title}>Read more</Link>
				</figcaption>
			</figure>
		</article>
	);
};

export default PostCard;
