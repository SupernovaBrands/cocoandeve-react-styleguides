const Testimonial = (props) => {
    return (
        <li className="col-auto lg:px-g sm:px-hg">
            <picture>
                <source srcSet={props.srcSet} media="(min-width: 992px)" />
                <img className="w-full" alt="Img Alt" src={props.src} loading="lazy" />
            </picture>
        </li>
    );
};

export default Testimonial;