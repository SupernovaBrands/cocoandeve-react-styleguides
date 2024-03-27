const Testimonial = (props) => {
    return (
        <picture className="flex justify-center w-1/3 lg:w-1/6 px-g pt-3 pb-3">
            <source srcSet={props.srcSet} />
            <img className="max-w-full" alt="Img Alt" src={props.src} />
        </picture>
    );
};

export default Testimonial;