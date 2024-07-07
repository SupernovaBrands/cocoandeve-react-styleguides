import PostTag from "~/components/PostTag";
import ChevronNext from '~/images/icons/chevron-next.svg';
import Link from "next/link";
import parse from 'html-react-parser';

type PropType = {
	className: string
	data: any
	template?: string
	imgClass?: boolean
	textPrimary?: boolean
	textClass?: string
	height?: string
	pictureClass?: string
}

const PostCard: React.FC<PropType> = ({ className, data, template, imgClass, textPrimary, textClass, height, pictureClass }) => (
	<div className={`${className}`}>
		<figure className={`${template === 'blog' || template === 'pdp' ? 'border border-secondary-light mb-[2rem !important]' : 'post-card mb-4 lg:mb-0 bg-white h-full'} flex flex-col ${height}`}>
			{data.img && (
				<a href={data.handle ?? '#'} className={`${template === 'article' ? 'mb-2' : ''} relative block hover:after:bg-white hover:after:bg-opacity-20 after:content-[''] after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:transition-colors after:duration-150 after:ease-in-out`} aria-label={data.title}>
					<picture className={`${template === 'article' || imgClass ? 'embed-responsive' : ''} ${pictureClass}`}>
						{data.srcSet && (<source srcSet={data.srcSet} media="(min-width: 992px)" width="568" height="298"/>)}
						<img src={data.img} className={`w-full ${pictureClass ? 'object-cover absolute w-full h-full top-0 bottom-0 left-0 align-middle' : ''} ${template === 'article' || imgClass ? 'embed-responsive-item' : ''} ${template === 'pdp' ? 'h-[178px] md:h-[298px]' : ''} object-cover`} alt={data.title} width="382" height="178"/>
					</picture>
				</a>
			)}
			<figcaption className={`${template === 'blog' || template === 'pdp' ? 'p-2' : 'flex-grow'} flex flex-col ${textClass}`}>
				<div className={`${template === 'article' ? 'post-card__tags px-3 mb-2 hidden' : ''} ${template === 'blog' ? 'badge-blog' : ''}`}>
					{data.tags.length > 0 && (
						<>
							{data.tags.map((item: string, index: number) => (
								<PostTag widthClass={template === 'blog' ? 'min-w-[3.375em]' : ''} paddingClass={template === 'pdp' ? 'py-[.5em] px-[1em] mr-[4px]' : ''} key={`article-tag-${item}-${index}`} tag={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</PostTag>
							))}
						</>
					)}
				</div>
				<a href={data.handle ?? '#'} className={`h2 ${template === 'article' ? 'px-3' : 'mt-2'} leading-[1.25!important] mb-1 block text-body hover:text-body hover:no-underline`}>{data.title}</a>
				<p className={`${template === 'article' ? 'mt-1 px-3 mb-0 pb-1' : ''} ${textClass} ${template === 'blog' ? 'mb-[1rem]' : 'sm:grow-0 lg:flex-grow'} ${textPrimary ? 'text-primary' : ''} flex flex-col ${template === 'pdp' ? 'mb-2' : ''}`}>
					{ template === 'pdp' && <a href={data.handle ?? '#'} className="text-primary hover:text-primary-dark hover:no-underline">
						{data.description && (
							parse(data.description)
						)}
					</a> }
					{template !== 'pdp' && data.description && (
						parse(data.description.replace(/<[^>]*>?/gm, ''))
					)}
				</p>
				{template === 'blog' || template === 'pdp' ? (
					<a href={data.handle ?? '#'} className="btn btn-outline-primary self-start hover:no-underline leading-[1.25!important]" aria-label={data.title}>Read more</a>
				) : (
					<a href={data.handle ?? '#'} className="inline-block px-3 pb-2 block no-underline hover:underline leading-[1.25!important]" aria-label={data.title}>Read more <ChevronNext className="svg inline-block font-size-xs fill-primary" /></a>
				)}
			</figcaption>
		</figure>
	</div>
);

export default PostCard;
