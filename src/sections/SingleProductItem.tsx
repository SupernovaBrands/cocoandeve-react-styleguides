const SingleProductItem = (props: any) => {
    const { data } = props;
    return (
        <>
            <div className={`container px-0 text-center py-3 lg:pb-0 lg:px-0 mb-4 lg:pb-4`}>
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
                    <div className="single-product-item__right text-left w-full lg:w-1/2 relative max-w-[315px] mt-[-60px] mb-0 mx-auto p-4 rounded-[32px] bg-white p-[16px] lg:mr-[-90px] lg:max-w-[570px] lg:ml-0 lg:my-[30px] lg:p-[30px]">
                        <h2 className="h4 lg:text-xl lg:font-bold mb-[8px] block">{data?.product_title || ''}</h2>
                        <p className="text-sm mb-[8px] lg:mb-[16px]">{data?.description}</p>
                        <ul className="text-sm  list-check ">
                            {data?.list?.split('\n').map((li: any) => {
                                return (
                                    <li className="lg:mb-[8px]">{li}</li>
                                )
                            })}``
                        </ul>
                        <a href={data?.button_url} className="btn btn-large btn-primary mt-[24px] rounded-[32px] w-full p-g">{data?.button_label || ''}</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SingleProductItem;