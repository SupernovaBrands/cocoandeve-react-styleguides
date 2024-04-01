
const RangeBanner = (props: any) => {
    const { content } = props;
    return (
        <figure className="relative items-center px-0 lg:pb-3 pb-0 mb-0">
            <picture>
                <source srcSet={content?.desktop} media="(min-width: 992px)" />
                <img src={content?.mobile} className="w-100" alt="Collection Banner" />
            </picture>
            <figcaption className="w-full d-flex lg:hidden absolute items-center my-auto top-0 bottom-0">
                <h1 className="hidden mb-0">Shop All</h1>
            </figcaption>
        </figure>
    );
}

export default RangeBanner;