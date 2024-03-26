const Testimonial = (props) => {
    return (
        <picture className="w-1/3 lg:w-1/5 pr-4 pl-4 pt-3 pb-3">
            <source srcSet={props.srcSet} />
            <img className="max-w-full" alt="Img Alt" src={props.src} />
        </picture>
    );
};

export default Testimonial;