const Testimonial = (props) => {
    return (
        <picture className="flex justify-center w-1/3 lg:w-1/6 px-g sm:px-hg lg:pt-3 lg:pb-3 sm:pt-2 sm:pb-2">
            <source srcSet={props.srcSet} />
            <img className="max-w-full" alt="Img Alt" src={props.src} />
        </picture>
    );
};

export default Testimonial;