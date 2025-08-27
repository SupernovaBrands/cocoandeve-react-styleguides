const SingleProductItem = (props: any) => {
    const { data } = props;
    return (
        <>
            <div className={`container px-0 text-center py-3 lg:pb-0 lg:px-0 mb-4 lg:pb-4`}>
                <h2 className="text-xl lg:text-2xl text-center mb-g lg:mb-1 mx-5 lg:mx-0 ">{'Always wanted to try Coco & Eve?'}</h2>
                <p className='mb-g mx-4 lg:mx-0 lg:mb-3'>{'Enjoy FREE mini version of some of our bestsellers—just pay shipping.'}</p>

                <div className="flex mx-0 mb-0 flex-wrap lg:flex-row-reverse flex-row ">
                    <div className="single-product-item__left  w-full  lg:w-1/2 grid gap-x-[30px] content-center pt-0 pb-4 px-g lg:max-w-none lg:flex lg:flex-wrap mb-0 lg:mx-0;">
                        <picture className="block w-full rounded-[32px]">
                            <source
                                srcSet={data.src_desktop}
                                media="(min-width: 992px)" width="1362" height="1162"/>
                            <img
                                src={data.src_mobile}
                                className="object-cover h-full w-full" loading="lazy" height="357" width="414" alt={"Product banner and comparison image"} />
                        </picture>
                    </div>
                    <div className="single-product-item__right text-left w-full lg:w-1/2 relative max-w-[315px] mt-[-60px] mb-0 mx-auto p-4 rounded-[32px] bg-white p-[16px] lg:mr-[-90px] lg:max-w-[570px] lg:ml-0 lg:my-[30px] lg:p-[30px]">
                        <h2 className="h4 lg:text-xl lg:font-bold mb-[8px] block">Like A Virgin Hair Masque • 5ml</h2>
                        <p className="text-sm mb-[8px] lg:mb-[16px]">Our best-selling self tan with a soft tanning mitt and kabuki brush for a perfect fuss-free application.</p>
                        <ul className="text-sm  list-check ">
                            <li className="lg:mb-[8px]">Blurs pigmentation and perfects skin.</li>
                            <li className="lg:mb-[8px]">Tropical mango and guava scent (no biscuit smell!)</li>
                            <li className="lg:mb-[8px]">Lightweight, non-sticky formula.</li>
                            <li className="lg:mb-[8px]">Fast-drying and develops in just 2 hours.</li>
                            <li>Color guide technology for an even finish.</li>
                        </ul>
                        <a href="/" className="btn btn-large btn-primary mt-[24px] rounded-[32px] w-full p-g">Get Offer</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SingleProductItem;