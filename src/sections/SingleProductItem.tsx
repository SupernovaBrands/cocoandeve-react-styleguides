const SingleProductItem = (props: any) => {
    const { data } = props;
    return (
        <>
            <div className={`container px-0 text-center py-3 lg:pb-0 lg:px-0 mb-4 lg:mb-5 lg:pb-4`}>
                <h2 className="text-xl lg:text-2xl text-center mb-g lg:mb-1 mx-5 lg:mx-0 ">{data?.heading}</h2>
                <p className='mb-g mx-4 lg:mx-0 '>{data?.subheading}</p>

                <div className="flex mx-0 mb-0 flex-wrap bg-primary-light flex-col-reverse lg:flex-row ">
                    <div className="product__banner-left w-full lg:grid-cols-[1fr_repeat(6,_[_col-start_]_minmax(0,_70px))] lg:w-1/2 grid gap-x-[30px] pb-4 lg:pb-4 content-center py-4 px-g lg:pl-0 lg:pr-g">
                        <picture className="block pt-[86%] w-full overflow-hidden rounded-[32px]">
                            <source
                                srcSet={data.src_desktop}
                                media="(min-width: 992px)" width="1362" height="1162"/>
                            <img
                                src={data.src_mobile}
                                className="embed-responsive-item object-cover h-full w-full" loading="lazy" height="357" width="414" alt={"Product banner and comparison image"} />
                        </picture>
                    </div>
                    <div className="product__banner-right w-full lg:w-1/2 px-0 relative">
                        wdwe
                    </div>
                </div>
            </div>
        </>
    );
}

export default SingleProductItem;