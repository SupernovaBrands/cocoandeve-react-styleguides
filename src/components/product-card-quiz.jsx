const ProductCardQuiz = (props) => {
    const { imageDesktop, imageMobile, title, textButton, addNewLine } = props;
    return (
        <div className="d-flex flex-column col-12 product-card product-card--quiz col-md-4 mb-5 px-0 px-lg-g text-sm-left text-lg-center">
            <picture className="m-0 h-100">
                <source media="(min-width:992px)" srcSet={imageDesktop}/>
                <img alt="Tan Quiz" className="fit--cover w-100" src={imageMobile} loading="lazy" />
            </picture>
            <div className="px-2 px-lg-3 pr-4 pr-lg-2 pt-g pt-lg-4 position-absolute text-sm-left text-lg-center">
                <p className="text-primary font-size-lg product-card--quiz__title font-weight-bold">{title}{addNewLine ? <br/> : ' '}three lines</p>
                <a href="#" className="btn btn-lg mb-2 px-2 bg-white border-primary text-primary">{textButton}</a>
            </div>
        </div>
    )
}

export default ProductCardQuiz;