const ProductVariant = (props) => {
	return (
        <div className="product-variant custom-radio w-100 mb-1">
            <input id={props.id} className="custom-control-input" type="radio" name={props.name} value={props.value} data-inventory={props.inventory} checked={props.checked} data-id={props.dataID} />
            <label htmlFor={props.id} className="custom-control-label w-100 border py-2 pr-2 rounded mb-1">
                <p className="mb-1 fw-bold">
                    {props.title}
                </p>
                {props.title_subscription &&
                    <p className="mb-1 fw-bold">{props.title_subscription}</p>
                }
                {props.variant_description &&
                    <p className="product-variant__description mb-1 font-size-sm">{props.variant_description}</p>
                }
                {props.note &&
                <div className="notes">
                    <p className="product-variant__description mb-1 font-size-sm">1x Other items</p>
                    <p className="product-variant__description mb-1 font-size-sm">1x {props.note}</p>
                </div>
                }
                {!props.hideSwatch &&
                <div className="product-swatch mb-1">
                    <button type="button" className={props.swatch_medium} data-value="medium" data-id="32068891541539"></button>
					<button type="button" className={props.swatch_dark} data-value="dark" data-id="32068891607075"></button>
					<button type="button" className={props.swatch_ultra_dark} data-value="ultra-dark" data-id="32068891639843"></button>
                    {props.swatches.map((swatch) => (
                        <p className="font-size-sm w-100 mt-2 mb-0 swatch-label-medium"><b>{swatch.label}</b> - {swatch.title}</p>
                    ))}
					
					{/* <p className="font-size-sm w-100 mt-2 mb-0 swatch-label-dark d-none"><b>Dark</b> - Subtle glow, lighter skin tones</p>
					<p className="font-size-sm w-100 mt-2 mb-0 swatch-label-ultra-dark d-none"><b>Ultra Dark</b> - Subtle glow, lighter skin tones</p> */}
                </div>
                }
                <p className="product-variant__price-label mb-0 font-size-sm fw-bold">
                    {props.compare && <span className="text-linethrough mr-25 text-nowrap">{props.comparePrice}</span> }
                    <span className="text-primary mr-25 text-nowrap">{props.price}</span>
                    {props.compare && <span className="text-primary text-nowrap">{props.save}</span> }
                </p>
            </label>
        </div>
	);
};

export default ProductVariant;
