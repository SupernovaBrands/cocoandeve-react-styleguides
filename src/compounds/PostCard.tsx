import PostTag from "~/components/PostTag";
import ChevronNext from '~/images/icons/chevron-next.svg';
import Link from "next/link";
import parse from 'html-react-parser';

type PropType = {
	className: string
	data: any
}

const PostCard: React.FC<PropType> = ({ className, data }) => (
	<div className={`${className}`}>
		<article className="post-card mb-4 lg:mb-0 bg-white no-gutters__in-container h-full">
			<figure className="mb-2">
				{data.img && (
					<Link href={data.handle ?? '#'} className="relative block hover:after:bg-white hover:after:bg-opacity-20 after:content-[''] after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:transition-colors after:duration-150 after:ease-in-out" aria-label={data.title}>
						<picture>
							{data.srcSet && (<source srcSet={data.srcSet} media="(min-width: 992px)" />)}
							<img src={data.img} className="w-full" alt={data.title} />
						</picture>
					</Link>
				)}
			</figure>
			<div className="post-card__tags px-3 mb-2">
				{data.tags.length > 0 && (
					<>
						{data.tags.map((item: string) => (
							<PostTag tag={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</PostTag>
						))}
					</>
				)}
			</div>
			<Link href={data.handle ?? '#'} className="h2 px-3 mb-1 block text-body hover:text-primary">{data.title}</Link>
			<div className="mt-1 mb-0 px-3 pb-1">
				{parse(data.description)}
			</div>
			<Link href={data.handle ?? '#'} className="inline-block px-3 pb-2 block no-underline hover:underline" aria-label={data.title}>Read more <ChevronNext className="svg inline-block font-size-xs fill-primary" /></Link>
		</article>
	</div>
);

export default PostCard;
