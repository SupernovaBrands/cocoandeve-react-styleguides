import { useEffect, useState } from 'react';
import ProductBannerSlider from './ProductBannerSlider';

const ProductBanner = (props: any) => {
    const { contentData } = props;
    const [comparisonImages, setComparisonImages] = useState(null);

    useEffect(() => {
        if (contentData) {
            const { first_image, second_image } = contentData;
            if (first_image?.url && second_image?.url) {
                setComparisonImages({ first_image, second_image });
            }
        }
    }, []);
	return (
        <div className={`product__banner flex mx-0 mb-0 flex-wrap ${props.background} ${props.reverse ? 'flex-row-reverse' : ''}`}>
            <div className={`product__banner-left w-full ${props.textContentClasses ? props.textContentClasses : 'lg:grid-cols-[1fr_repeat(6,_[_col-start_]_minmax(0,_70px))]'} lg:w-1/2 grid gap-x-[30px] pb-4 lg:pb-4 content-center py-4 px-g ${props.reverse ? 'flex-row-reverse lg:pr-0 lg:pl-g' : 'lg:pl-0 lg:pr-g'}`}>
                <div className={`product__banner-content ${props.textContentBoxClasses ? props.textContentBoxClasses : 'lg:col-start-[col-start_1] lg:col-end-[span_5] mb-0'}`}>
                    {props.children}
                </div>
            </div>
            <div className="product__banner-right w-full lg:w-1/2 px-0 relative">
                {comparisonImages ? (
                    <div className="product-banner__image w-full">
                        <ProductBannerSlider {...comparisonImages} />
                    </div>
                ) : (
                    <>
                        <picture className="block pt-[86%] w-full overflow-hidden">
                            <source
                                srcSet={props.src}
                                media="(min-width: 992px)" width="1362" height="1162"/>
                            <img
                                src={props.src}
                                className="embed-responsive-item object-cover h-full w-full" loading="lazy" height="357" width="414" alt={props.alt || "Product banner image"} />
                        </picture>
                    </>
                )}
            </div>
        </div>
	);
};

export default ProductBanner;
