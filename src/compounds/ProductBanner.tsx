
const ProductBanner = (props) => {
	return (
        <div className={`flex mx-0 mb-4 flex-wrap ${props.background} ${props.reverse ? 'flex-row-reverse' : ''}`}>
            <div className={`w-full ${props.textContentClasses ? props.textContentClasses : 'lg:grid-cols-[1fr_repeat(6,_[_col-start_]_minmax(0,_70px))]'} lg:w-1/2 grid gap-x-[30px]  content-center py-4 px-g ${props.reverse ? 'flex-row-reverse lg:pr-0 lg:pl-g' : 'lg:pl-0 lg:pr-g'}`}>
                <div className={`${props.textContentBoxClasses ? props.textContentBoxClasses : 'lg:col-start-[col-start_1] lg:col-end-[span_5]'}`}>
                    {props.children}
                </div>
            </div>
            <div className="w-full lg:w-1/2 px-0 relative">
                <picture className="block aspect-[6/7] max-h-[600px]">
                    <source
                        srcSet={props.srcSet}
                        media="(min-width: 992px)" width="1362" height="1162"/>
                    <img
                        src={props.src}
                        className="embed-responsive-item object-cover" loading="lazy" height="357" width="414"/>
                </picture>
            </div>
        </div>
	);
};

export default ProductBanner;
