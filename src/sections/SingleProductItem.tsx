const SingleProductItem = (props: any) => {
    const { data } = props;
    return (
        <>
            <div className={`container px-0 text-center py-3 lg:pb-0 lg:px-0 mb-0 lg:pb-4`}>
                <h2 className="text-xl lg:text-2xl text-center mb-g lg:mb-1 mx-5 lg:mx-0 ">{'Always wanted to try Coco & Eve?'}</h2>
                <p className='mb-g mx-4 lg:mx-0 lg:mb-3'>{'Enjoy FREE mini version of some of our bestsellers—just pay shipping.'}</p>

                <div className="flex mx-0 mb-0 flex-wrap lg:flex-row-reverse flex-row ">
                    <div className="single-product-item__left  w-full  lg:w-1/2 grid gap-x-[30px] content-center pt-0 pb-4 px-g lg:max-w-none lg:flex lg:flex-wrap mb-0 lg:mx-0;">
                        <picture className="block w-full rounded-[32px] overflow-hidden">
                            <source
                                srcSet={data?.img_desk?.url || null}
                                media="(min-width: 992px)" width="1362" height="1162"/>
                            <img
                                src={data?.img_mob?.url || null}
                                className="object-cover h-full w-full" loading="lazy" height="357" width="414" alt={"Product banner and comparison image"} />
                        </picture>
                    </div>
                    <div className="single-product-item__right text-left w-full lg:w-1/2 relative   mb-0 mx-auto   flex justify-center lg:block">
                        <div className="rounded-[32px] bg-white  p-[16px] pt-[20px] lg:my-[30px] lg:p-[30px] max-w-[315px] lg:max-w-[570px] mt-[-85px] lg:mr-[-90px] lg:ml-auto">
                            <div className="flex mb-[8px] items-center"><h2 className="h4 lg:text-xl lg:font-bold mb-0">{data?.product_title || ''}</h2> <span className="block mx-1 text-sm">•</span> <span className="text-sm">5ml</span></div>
                            <p className="text-sm mb-[8px] lg:mb-[16px] lg:max-w-[410px]">{data?.description}</p>
                            <ul className="text-sm  list-check page-product-list ">
                                {data?.list?.split('\n').map((li: any) => {
                                    return (
                                        <li className="lg:!mb-[10px]">{li}</li>
                                    )
                                })}
                            </ul>
                            <a href={data?.button_url} className="btn btn-large btn-primary mt-[20px] rounded-[32px] w-full p-g lg:max-w-[236px] font-normal">{data?.button_label || ''}</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SingleProductItem;