type PropType = {
	tag: string
	children: React.ReactNode
	paddingClass?: any,
	widthClass?: any
}

const PostTag: React.FC<PropType> = (props) => {
	const { tag, children, paddingClass, widthClass } = props;
	const handleTag = (e: any, tag: string) => {
		const linkedTags = ['hair', 'tan', 'skin', 'body'];
		let tagUrl = tag === 'suncare' ? 'tan' : tag;
		if (linkedTags.includes(tagUrl)) {
			e.preventDefault();
			window.location.href = `/blogs/news/tagged/${tagUrl}`;
		}
	}
	let className = 'bg-gray-400 text-gray-600 hover:text-gray-600';
	if (tag.toLowerCase() === 'hair') className = 'bg-secondary-light text-gray-600 hover:text-gray-600 hover:bg-secondary-dark';
	else if (tag.toLowerCase() === 'tan') className = 'bg-yellow-light text-gray-600 hover:text-gray-600 hover:bg-yellow-dark';
	else if (tag.toLowerCase() === 'suncare') className = 'bg-suncare-blue text-white hover:text-white';
	else if (tag.toLowerCase() === 'body') className = 'bg-blue text-white hover:text-white hover:bg-blue-dark';
	else if (tag.toLowerCase() === 'skin') className = 'bg-skincare-orange text-white hover:text-white hover:bg-skincare-orange-dark';
	else if (tag.toLowerCase() === 'new') className = 'bg-secondary text-white hover:text-white';
	else if (tag.toLowerCase() === 'hot') className = 'bg-primary text-white hover:text-white';
	return (
		<span onClick={(e) => handleTag(e, tag)} className={`${paddingClass} cursor-pointer inline-block badge no-underline hover:no-underline font-normal text-center mr-25 rounded ${className} ${widthClass}`}>{children}</span>
	)
};

export default PostTag;
