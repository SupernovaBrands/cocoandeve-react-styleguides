const PageBanner = ({ content }) => {
    return (
        <>
            <figure className="w-full relative items-center px-0 mb-0">
                <picture className={``}>
                    <source srcSet={content?.img_desk?.url} media="(min-width: 992px)" />
                    <img src={content?.img_mob?.url?.replace('/public', '/540x')} className="w-full" alt="Collection Banner" width="375" height="200" fetchPriority="high"/>
                </picture>
                <figcaption className="w=full flex lg:visible absolute w-auto items-center my-auto top-0 bottom-0">
                    <h1 className="hidden mb-0"
                        dangerouslySetInnerHTML={{ __html: content?.title ?? 'Shop All' }}
                    />
                </figcaption>
            </figure>
        </>
    );
}

export default PageBanner;