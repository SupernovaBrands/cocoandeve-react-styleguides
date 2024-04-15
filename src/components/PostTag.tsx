type PropType = {
	tag: string
	children: React.ReactNode
}

const PostTag: React.FC<PropType> = (props) => {
	const { tag, children } = props;
	let className = 'bg-gray-400 text-gray-600';
	if (tag === 'hair') className = 'bg-secondary-light text-gray-600';
	else if (tag === 'tan') className = 'bg-yellow-light text-gray-600';
	else if (tag === 'suncare') className = 'bg-suncare-blue text-white';
	else if (tag === 'body') className = 'bg-blue text-white';
	else if (tag === 'skin') className = 'bg-skincare-orange text-white';
	else if (tag === 'new') className = 'bg-secondary text-white';
	else if (tag === 'hot') className = 'bg-primary text-white';
	return (
		<span className={`align-baseline whitespace-nowrap text-center inline-block leading-base px-[.5em] py-[2px] rounded ${className} mr-1 mb-25 min-w-[3.375em]`}>{children}</span>
	)
};

export default PostTag;
