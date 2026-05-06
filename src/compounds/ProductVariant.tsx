
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
}
const Swatch: React.FC<SwatchProp> = ({
	hideSwatch = false,
	className = '',
	textClassName = '',
	keyName,
	shadeData,
	selectedSwatch,
	children,
	mobileCta,
	activeVariant,
}: SwatchProp) => {
	const sTan = ['medium','dark','ultra-dark'];
	const shadesTan = shadeData ? shadeData.filter((s:any) => sTan.includes(s.id)) : [];

	return hideSwatch ? <></> : (
		<div key={keyName} className={`product-swatch ${mobileCta ? '' : 'flex'} mb-[1rem] lg:mb-0 overflow-x-auto hide-scrollbar ${className}`}>
			{children}
			{mobileCta && shadeData && shadeData.map((s: any, index: number) => {
				const isPod = ['antioxidant glow cream', 'refill pod', 'antioxidant glow cream + refill pod'].includes(s.id);
				return s.id === selectedSwatch && !isPod && !activeVariant?.title?.includes('Silky Hair') ?
					(<p key={`${s.id}-swatch-${index}`} className={`${textClassName} w-full text-sm ${shadesTan.length ? 'mt-[1.25rem] md:mt-[19px] lg:mt-[19px]' : 'mt-1 lg:mt-[9px]'} mb-0 product__swatch-label lg:hidden swatch-label-${s.id}`} dangerouslySetInnerHTML={{ __html: s.text }} />)
				: <p key={`${s.id}-swatch-${index}`} className="hidden"/>;
			})}
		</div>
	);
};

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
	checkType?: string
	isAdditional?: boolean
}

const ProductVariant: React.FC<VariantProp> = ({
	subscription = false,
	className = '',
	compare = null,
	checked = false,
	keyName,
	id,
	onChange,
	isAdditional,
	inventory,
	dataID,
	children,
	price,
	saving,
	checkType = 'radio',
}: VariantProp) => {
	return (
		<div key={keyName} className={`product-variant custom-radio ${className}`}>
			<input id={id} aria-label={id} onChange={(e) => onChange(e)} className="custom-control-input peer/variant" type={checkType} name="product-variant" value={id} data-is-additional={isAdditional} data-inventory={inventory} defaultChecked={checked} data-id={dataID} />
			<div className={`custom-control-label border-0 border-color-[#fff] before:peer-checked/variant:shadow-[inset_0px_0px_0px_2px_white] before:!content-none !pl-0`}>
				{children}
				{!subscription && <p className="mb-1 font-bold product__pricing-dt">
					{compare && <span className="line-through text-body mr-[.25rem] text-nowrap lg:text-[1.25em] lg:leading-[1.25em] sm:hidden lg:inline">{compare}</span> }
					<span className="mr-[.25rem] text-nowrap lg:text-[1.25em] lg:leading-[1.25em] sm:hidden lg:inline"> {price}</span>
					{compare && <span className="text-primary text-nowrap lg:text-[1.25em] lg:leading-[1.25em] hidden lg:inline font-normal"> {saving ? saving : '(Save 30%)'} </span>}
				</p>}
			</div>
		</div>
	)
};

const Product = { Variant: ProductVariant, Swatch, Notes  };

export default Product;
