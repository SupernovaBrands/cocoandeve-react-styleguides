const ProductCardLoading = (props) => {
    return (
        <div key={props.keyName} className={`${props.className} lg:hidden`}>
            <div className="bg-shimmer pt-[190%] rounded"></div>
        </div>
    )
}

export default ProductCardLoading;