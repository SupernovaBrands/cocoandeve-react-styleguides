type PropType = {
	tag: string
	children: React.ReactNode
}

const PostTag: React.FC<PropType> = (props) => {
	const { tag, children } = props;
	let className = 'bg-gray-400 text-gray-600 hover:text-gray-600';
	if (tag === 'hair') className = 'bg-secondary-light text-gray-600 hover:text-gray-600 hover:bg-secondary-dark';
	else if (tag === 'tan') className = 'bg-yellow-light text-gray-600 hover:text-gray-600 hover:bg-yellow-dark';
	else if (tag === 'suncare') className = 'bg-suncare-blue text-white hover:text-white';
	else if (tag === 'body') className = 'bg-blue text-white hover:text-white hover:bg-blue-dark';
	else if (tag === 'skin') className = 'bg-skincare-orange text-white hover:text-white hover:bg-skincare-orange-dark';
	else if (tag === 'new') className = 'bg-secondary text-white hover:text-white';
	else if (tag === 'hot') className = 'bg-primary text-white hover:text-white';
	return (
		<a href={`/blogs/news/tagged/${tag}`} className={`no-underline hover:no-underline font-normal text-center inline-block rounded ${className}`}>{children}</a>
	)
};

export default PostTag;
