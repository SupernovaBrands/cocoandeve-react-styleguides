const Testimonial = (props) => {
    return (
        <picture className="col-4 col-lg-2 pt-3 pb-3">
            <source srcSet={props.srcSet} />
            <img className="mw-100" alt="Img Alt" src={props.src} />
        </picture>
    );
};

export default Testimonial;