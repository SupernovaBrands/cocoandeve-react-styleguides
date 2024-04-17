const BlogPostSection = (props) => {
	return (
        <article className="w-full lg:w-1/2 post-card mb-4 lg:mb-2 lg:px-g sm:px-hg">
            <figure className="mb-2 no-gutters__in-container sm:-mx-g lg:mx-0">
                <a href={props.item.link} className="hover-overlay block">
                    <picture>
                        <source srcSet={props.item.srcSet} media="(min-width: 992px)" />
                        <img src={props.item.src} className="w-full" />
                    </picture>
                </a>
            </figure>
            <time className="block mb-1">{props.item.date}</time>
            <h3><a href={props.item.link} className="text-body-color hover:text-primary">{props.item.title}</a></h3>
            <p className="mt-1 mb-0">{props.item.subtitle}</p>
        </article>
	);
};

export default BlogPostSection;
