const PostCard = (props) => {
	return (
		<article className={`post-card ${props.className}`}>
			{props.src && (
				<figure className="mb-2 no-gutters__in-container">
					<img src={props.src} className="w-100" />
				</figure>
			)}
			{props.children}
		</article>
	);
};

export default PostCard;
