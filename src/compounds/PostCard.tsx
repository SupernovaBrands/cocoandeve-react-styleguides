import PostTag from "~/components/PostTag";
import ChevronNext from '~/images/icons/chevron-next.svg';
import Link from "next/link";
import parse from 'html-react-parser';
import ConditionWrapper from "~/components/cart/condition-wrapper";

type PropType = {
	className: string
	data: any
	template?: string
	imgClass?: boolean
	textPrimary?: boolean
	textClass?: string
	height?: string
	pictureClass?: string
	carousel?: boolean
	showSubtext?: boolean
}

const PostCard: React.FC<PropType> = (props) => {
	const { className, data, template, imgClass, textPrimary, textClass, height, pictureClass, showSubtext } = props;
	return (
		<article className={`${className}`}>
			<figure className={`border border-secondary-light ${template === 'blog' || template === 'pdp' ? '' : 'post-card mb-4 lg:mb-0 bg-white h-full'} ${template === 'article' ? 'lg:mx-0 sm:-mx-g !h-auto lg:!h-full !mb-0' : ''} h-auto lg:h-full flex flex-col ${height} rounded-[2rem]`}>
				{data.img && (
					<a href={data.handle ?? '#'} className={`relative block hover:after:bg-white hover:after:bg-opacity-20 after:content-[''] after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:transition-colors after:duration-150 after:ease-in-out`} aria-label={data.title}>
						<picture className={`${template === 'article' || imgClass ? 'embed-responsive' : ''} ${pictureClass}`}>
							{data.srcSet && (<source srcSet={data.srcSet} media="(min-width: 992px)" width="568" height="298"/>)}
							<img src={data.img} className={`rounded-t-[2rem] w-full ${pictureClass ? 'object-cover absolute w-full h-full top-0 bottom-0 left-0 align-middle' : ''} ${template === 'article' || imgClass ? 'embed-responsive-item' : ''} ${template === 'pdp' ? 'h-[178px] md:h-[298px]' : ''} object-cover`} alt={data.title} width="382" height="178"/>
						</picture>
					</a>
				)}
				<a href={data.handle ?? '#'} className="no-underline hover:no-underline flex flex-col flex-grow" aria-label={data.title}>
					<figcaption className={`${template === 'blog' || template === 'pdp' || template === 'article' ? 'p-2 flex-grow flex' : 'flex-grow'} flex flex-col ${textClass}`}>
						<div className={`${template === 'article' ? 'badge-blog' : ''} ${template === 'blog' ? 'badge-blog' : ''}`}>
							{data.tags.length > 0 && (
								<>
									{data.tags.map((item: string, index: number) => (
										<PostTag widthClass={template === 'blog' ? 'min-w-[3.375em]' : ''} paddingClass={`${template === 'pdp' ? 'py-[.5em] px-[1em] mr-[4px]' : ''} ${template === 'blog' || template === 'article' ? 'py-[.375em] px-[.75em]' : ''}`} key={`article-tag-${item}-${index}`} tag={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</PostTag>
									))}
								</>
							)}
						</div>
						<p className={`font-bold text-lg ${template === 'blog' ? 'blog-post__card' : ''} ${template === 'article' ? 'hover:text-primary hover:underline' : 'hover:no-underline'} mt-2 leading-[1.25!important] ${showSubtext ? 'mb-1 lg:mb-[1rem]' : 'mb-[1rem]'} block text-body hover:text-body`}>{data.title}</p>
						{showSubtext && (
							<div className={`group-hover:text-primary-darken post-card__description ${template === 'article' ? 'text-body hover:text-body mt-0 px-3 mb-0 pb-1' : ''} ${textClass} ${template === 'blog' ? 'blog-card__desc mb-[1rem]' : `sm:grow-0 ${showSubtext ? '' : 'lg:flex-grow'}`} ${textPrimary ? 'text-primary hover:text-primary-darken hover:no-underline' : 'text-body'} flex flex-col ${template === 'pdp' ? 'mb-[32px] lg:mb-2' : ''}`}>
								{ template === 'pdp' && data.description && (
									parse(data.description)
								)}
								{template !== 'pdp' && data.description && (
									parse(data.description.replace(/<[^>]*>?/gm, ''))
								)}
							</div>
						)}
						{template === 'blog' || template === 'pdp' || template === 'article' ? (
							<span className={`btn btn-outline-primary self-start hover:no-underline leading-[1.25!important] mt-0 mb-0 flex rounded-full ${showSubtext ? 'lg:py-[14px] lg:px-[53px]' : 'lg:mt-auto'}`} aria-label={data.title}>Read more</span>
						) : (
							<span className="inline-block px-3 pb-2 block no-underline hover:underline leading-[1.25!important] rounded-full" aria-label={data.title}>Read more <ChevronNext className="svg inline-block font-size-xs fill-primary" /></span>
						)}
						{/* content */}
					</figcaption>
				</a>
			</figure>
		</article>
	)
};

export default PostCard;
