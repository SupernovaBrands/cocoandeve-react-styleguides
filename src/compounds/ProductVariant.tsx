
type SwatchProp = {
	hideSwatch?: boolean
	children: React.ReactNode
	className?: string
	shadeData?: any
	selectedSwatch: string
}
const Swatch: React.FC<SwatchProp> = (props) => {
	return props.hideSwatch ? <></> : (
		<div className={`product-swatch mb-1 ${props.className}`}>
			{props.children}
			{props.shadeData && props.shadeData.map((s: any, index: number) => {
				return s.id === props.selectedSwatch ?
					(<p key={`${s.id}-swatch-${index}`} className={`font-size-sm w-full mt-2 mb-0 swatch-label-${s.id}`} dangerouslySetInnerHTML={{ __html: s.text }} />)
				: <></>;
			})}
		</div>
	);
};

Swatch.defaultProps = {
	hideSwatch: false,
	className: '',
}

type NotesProp = {
	notes: string[]
}

const Notes: React.FC<NotesProp> = (props) => {
	return props.notes.length > 0 ? (
		<div className="notes">
			{props.notes.map((note,index) => (
				<p key={`note-${index}`} className="product-variant__description mb-1 font-size-sm">{note}</p>
			))}
        </div>
	) : <></>;
}

type VariantProp = {
	className?: string
	id: string
	inventory: string
	checked?: boolean
	dataID: string
	subscription?: boolean
	children: React.ReactNode
	price: string
	compare?: string
	keyName?: string
}

const ProductVariant: React.FC<VariantProp> = (props) => {
	return (
		<div key={props.keyName} className={`product-variant custom-radio w-full relative ${props.className}`}>
            <input id={props.id} className="custom-control-input absolute left-0 -z-[1] w-2 h-2 opacity-0" type="radio" name="product-variant" value={props.id} data-inventory={props.inventory} defaultChecked={props.checked} data-id={props.dataID} />
            <label htmlFor={props.id} className={`border-0 lg:border lg:border-gray-600 inline-block p-0 pl-[2em] relative mb-0 align-top custom-control-label w-full lg:py-2 lg:pr-2 rounded ${props.checked ? 'border-primary' : ''} ${props.checked ? 'before:border-primary before:bg-primary before:text-white' : 'before:border-gray-500'} before:top-0`}>
				{props.children}
				<p className="mb-0 font-size-sm font-bold">
                    {props.compare && <span className="line-through text-body me-25 text-nowrap">{props.compare}</span> }
                    <span className="text-primary me-25 text-nowrap">{props.price}</span>
                </p>
            </label>
        </div>
	);
};

ProductVariant.defaultProps = {
	subscription: false,
	className: '',
	compare: null,
	checked: false
}

const Product = { Variant: ProductVariant, Swatch, Notes  };

export default Product;
