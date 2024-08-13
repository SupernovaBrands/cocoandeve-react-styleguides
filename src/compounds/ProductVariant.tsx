
type SwatchProp = {
	hideSwatch?: boolean
	children: React.ReactNode
	className?: string
	keyName?: string
	shadeData?: any
	selectedSwatch: string
	textClassName?: string
	activeVariant?: any
	mobileCta?: boolean
	swatchType?: any
}
const Swatch: React.FC<SwatchProp> = (props) => {
	const sTan = ['medium','dark','ultra-dark'];
	const shadesTan = props.shadeData ? props.shadeData.filter((s:any) => sTan.includes(s.id)) : [];

	return props.hideSwatch ? <></> : (
		<div key={props.keyName} className={`product-swatch mb-1 ${props.className}`}>
			{props.children}
			{props.shadeData && props.shadeData.map((s: any, index: number) => {
				const isPod = !['antioxidant glow cream', 'refill pod', 'antioxidant glow cream + refill pod'].includes(s.id) || props.mobileCta;
				return s.id === props.selectedSwatch && isPod && !props.activeVariant?.title?.includes('Silky Hair') ?
					(<p key={`${s.id}-swatch-${index}`} className={`${props.textClassName} w-full text-sm ${shadesTan.length ? 'mt-[1.25rem] md:mt-[19px] lg:mt-[19px]' : 'mt-1 lg:mt-[9px]'} mb-0 swatch-label-${s.id}`} dangerouslySetInnerHTML={{ __html: s.text }} />)
				: <p key={`${s.id}-swatch-${index}`} className="hidden"/>;
			})}
		</div>
	);
};

Swatch.defaultProps = {
	hideSwatch: false,
	className: '',
	textClassName: '',
}

type NotesProp = {
	notes: string[]
}

const Notes: React.FC<NotesProp> = (props) => {
	return props.notes.length > 0 ? (
		<div className="notes">
			{props.notes.map((note,index) => (
				<p key={`note-${index}`} className="product-variant__description mb-1 text-sm">{note}</p>
			))}
        </div>
	) : <></>;
}

type VariantProp = {
	className?: string
	onChange?: Function
	id: string
	inventory?: string
	checked?: boolean
	dataID?: string
	subscription?: boolean
	children: React.ReactNode
	price: string
	saving?: string
	compare?: string
	keyName?: string
	isAdditional?: boolean
}

const ProductVariant: React.FC<VariantProp> = (props) => {
	return (
		<div key={props.keyName} className={`product-variant custom-radio ${props.className}`}>
			<input id={props.id} onChange={(e) => props.onChange(e)} className="custom-control-input peer/variant" type="radio" name="product-variant" value={props.id} data-is-additional={props.isAdditional} data-inventory={props.inventory} defaultChecked={props.checked} data-id={props.dataID} />
			<label htmlFor={props.id} className={`custom-control-label before:peer-checked/variant:shadow-[inset_0px_0px_0px_2px_white]`}>
				{props.children}
				{!props.subscription && <p className="mb-1 font-bold">
					{props.compare && <span className="line-through text-body mr-[.25rem] text-nowrap lg:text-[1.25em] lg:leading-[1.25em] sm:hidden lg:inline">{props.compare}</span> }
					<span className="mr-[.25rem] text-nowrap lg:text-[1.25em] lg:leading-[1.25em] sm:hidden lg:inline"> {props.price}</span>
					{props.compare && <span className="text-primary text-nowrap lg:text-[1.25em] lg:leading-[1.25em] hidden lg:inline font-normal"> {props.saving ? props.saving : '(Save 30%)'} </span>}
				</p>}
			</label>
		</div>
	)
};

ProductVariant.defaultProps = {
	subscription: false,
	className: '',
	compare: null,
	checked: false
}

const Product = { Variant: ProductVariant, Swatch, Notes  };

export default Product;
