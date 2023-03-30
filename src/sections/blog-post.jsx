const BlogPostSection = (props) => {
	return (
        <li className="col-12 col-lg-6">
            <article className="post-card mb-4 mb-lg-2">
                <figure className="mb-2 no-gutters__in-container">
                    <a href={props.item.link} className="hover-overlay d-block">
                        <picture>
                            <source srcSet={props.item.srcSet} media="(min-width: 992px)" />
                            <img src={props.item.src} className="w-100" />
                        </picture>
                    </a>
                </figure>
                <time className="d-block mb-1">{props.item.date}</time>
                <h3><a href={props.item.link} className="link-secondary">{props.item.title}</a></h3>
                <p className="mt-1 mb-0">{props.item.subtitle}</p>
            </article>
        </li>
	);
};

export default BlogPostSection;
