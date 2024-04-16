
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

const ProductVariant: React.FC<VariantProp> = (props) => (
	<div key={props.keyName} className={`product-variant custom-radio ${props.className}`}>
		<input id={props.id} className="custom-control-input peer/variant" type="radio" name="product-variant" value={props.id} data-inventory={props.inventory} defaultChecked={props.checked} data-id={props.dataID} />
		<label htmlFor={props.id} className={`custom-control-label before:peer-checked/variant:shadow-[inset_0px_0px_0px_2px_white]`}>
			{props.children}
			<p className="mb-0 font-size-sm font-bold">
				{props.compare && <span className="line-through text-body mr-25 text-nowrap lg:text-[1.25em] lg:leading-[1.25em]">{props.compare}</span> }
				<span className="text-primary mr-25 text-nowrap lg:text-[1.25em] lg:leading-[1.25em]"> {props.price} </span>
				{props.compare && <span className="text-primary text-nowrap lg:text-[1.25em] lg:leading-[1.25em] hidden lg:inline"> (SAVE 30%) </span>}
			</p>
		</label>
	</div>
);

ProductVariant.defaultProps = {
	subscription: false,
	className: '',
	compare: '',
	checked: false
}

const Product = { Variant: ProductVariant, Swatch, Notes  };

export default Product;
