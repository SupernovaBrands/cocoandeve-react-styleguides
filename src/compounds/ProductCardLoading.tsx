const ProductCardLoading = (props) => {
    return (
        <div key={props.keyName} className={`${props.className} lg:hidden`}>
            <a className="rounded-t product-card--img block">
                <picture className={`!pt-2 embed-responsive before:pt-[160%] block relative rounded-t rounded-b bg-shimmer bg-pink-light`}>
                    <img className="embed-responsive-item fit--cover !max-w-[108%] !w-[108%] !h-[108%] !top-[-4%] !left-[-4%] !right-auto rounded-t !pt-2" />
                </picture>
            </a>
            <div className={`pt-2 pb-0 px-1 lg:px-1 relative grow flex flex-col rounded-b`}>

            </div>
        </div>
    )
}

export default ProductCardLoading;