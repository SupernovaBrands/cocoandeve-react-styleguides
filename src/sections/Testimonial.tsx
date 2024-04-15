const Testimonial = (props) => {
    return (
        <li className="col-auto flex-[0_0_auto] w-auto max-w-full relative lg:px-g sm:px-hg">
            <picture>
                <source srcSet={props.srcSet} media="(min-width: 992px)" />
                <img className="w-full align-middle inline" alt="Img Alt" src={props.src} loading="lazy" />
            </picture>
        </li>
    );
};

export default Testimonial;