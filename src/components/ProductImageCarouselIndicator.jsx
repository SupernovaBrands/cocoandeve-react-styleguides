const ProductImageCarouselIndicator = (props) => {
	return (
		<div id={`product-image-carousel__indicator${props.num ? props.num : ''}`} className="product-image-carousel__indicator d-none d-lg-block carousel--swipe col-12 col-lg-1 order-lg-1 carousel slide carousel--loop mb-1 mb-lg-0 px-0 px-lg-g">
			{props.totalSlide > 5 && (
				<button className="carousel-indicator chevron-up btn-unstyled d-none d-lg-flex mx-auto mb-1 mb-lg-3 text-center align-items-center" href={`#product-image-carousel__indicator${props.num ? props.num : ''}`} data-bs-slide="prev" aria-hidden="true" disabled>
					{/* <img className="svg text-primary" src="icons/chevron-up.svg" replace-to-svg /> */}
				</button>
			)}

			<div className={`carousel-inner d-flex flex-nowrap flex-lg-column ${props.totalSlide > 5 ? '' : 'justify-content-center justify-content-lg-start'}`}>
				{props.totalSlide > 0 && [...Array(props.totalSlide)].map((e, i) => {
					const isLast = i === props.totalSlide - 1;
					const itemIndex = i + 1;
					return (
						<div key={i} className={`product-image-carousel__indicator__item carousel-item ${i === 0 ? 'active' : ''} col-12 px-lg-0 pb-lg-3 mw-100`}
							onClick={e => props.handleSelect(e, i)}>
							<button className={`btn-unstyled border d-block w-100 ${i === props.selectedIndex ? 'border-primary' : 'border-white'}`}>
								<picture className={`${isLast ? 'with-video' : ''}`}>
									<img className="w-100" src={`https://via.placeholder.com/150x150/EFADBA?text=${itemIndex}`} alt={`Slide ${itemIndex}`} />
									{/* {isLast && (
										<img className="svg text-white" src="icons/play.svg" />
									)} */}
								</picture>
							</button>
						</div>
					)
				})}
			</div>

			{props.totalSlide > 5 && (
				<button className="carousel-indicator chevron-down btn-unstyled d-none d-lg-flex mx-auto mt-1 mt-lg-3 text-center align-items-center" href={`#product-image-carousel__indicator${props.num ? props.num : ''}`} data-bs-slide="next" aria-hidden="true">
					{/* <img className="svg text-primary" src="icons/chevron-down.svg" replace-to-svg /> */}
				</button>
			)}
		</div>
	);
};

export default ProductImageCarouselIndicator;
