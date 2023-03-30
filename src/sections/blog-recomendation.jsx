import { Container } from "react-bootstrap";
import Next from '@/images/icons/chevron-next.svg';

const BlogRecomendationSection = (props) => {
	return (
        <li className="col-12 col-lg-4">
            <article className="post-card mb-4 mb-lg-0 bg-white no-gutters__in-container">
                <figure className="mb-2">
                    <a href={props.item.link} className="hover-overlay d-block">
                        <img src={props.item.src} className="w-100" />
                    </a>
                </figure>
                <div className="post-card__tags px-3 mb-2">
                    {props.item.tags.map((item, i) => (
                        <a href={item.link} key={i} className={`text-decoration-none rounded ${item.tag.toLowerCase()}`}>{item.tag}</a>
                    ))}
                </div>
                <h2 className="px-3">
                    <a href={props.item.link} className="link-secondary">
                        {props.item.title}
                    </a>
                </h2>
                <p className="mt-1 mb-0 px-3 pb-1">{props.item.subtitle}</p>
                <a href={props.item.link} className="px-3 pb-2 d-block">Read more <Next className="svg font-size-xs" /></a>
            </article>
        </li>
	);
};

export default BlogRecomendationSection;
