
const ProductBanner = (props) => {
	return (
        <div className={`flex mx-0 mb-4 flex-wrap ${props.background} ${props.reverse ? 'flex-row-reverse' : ''}`}>
            <div className={`w-full ${props.textContentClasses ? props.textContentClasses : 'lg:grid-cols-[1fr_repeat(6,_[_col-start_]_minmax(0,_70px))]'} lg:w-1/2 grid gap-x-[30px]  content-center py-4 px-g ${props.reverse ? 'flex-row-reverse lg:pr-0 lg:pl-g' : 'lg:pl-0 lg:pr-g'}`}>
                <div className={`${props.textContentBoxClasses ? props.textContentBoxClasses : 'lg:col-start-[col-start_1] lg:col-end-[span_5]'}`}>
                    {props.children}
                </div>
            </div>
            <div className="w-full lg:w-1/2 px-0 relative">
                <picture className="ratio ratio-6x7 h-100">
                    <source
                        srcSet={props.srcSet}
                        media="(min-width: 992px)" />
                    <img
                        src={props.src}
                        className="embed-responsive-item" loading="lazy" />
                </picture>
            </div>
        </div>
	);
};

export default ProductBanner;
