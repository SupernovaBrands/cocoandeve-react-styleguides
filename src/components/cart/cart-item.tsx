import '~/config';
const tSettings = global.config.tSettings;
const tStrings = global.config.tStrings;

import React, { useState, useEffect } from 'react';

import ConditionWrapper from '~/components/cart/condition-wrapper';
import QuantityBox from '~/components/cart/quantity-box';
import SvgTrash from '~/images/icons/trash.svg';
import SvgRecurring from '~/images/icons/recurring.svg';
import SvgChevronDown from '~/images/icons/chevron-down.svg';
import { capitalizeString, kebabCase, formatMoney } from '~/modules/utils';

type CartItemProps = {
	item?: any;
	isLastStock: boolean;
	onChangeVariant: Function;
	onChangeQuantity: Function;
	onRemoveItem: any;
	productId: number;
	productStock: number;
	useShopifyVariantInfo?: any;
	store?: any;
}


export const CartItem = (props:CartItemProps) => {
	const { onChangeQuantity, onRemoveItem,
		onChangeVariant, productStock,
		productId, item, isLastStock,
		useShopifyVariantInfo, store } = props;

	const { swatches, variants, selectedSwatch, attributes } = item;
	const isMultiOptions = item.swatches.length > 1 && !item.merchandise.product.isProductBundleApp?.value;

	const componentsJson = attributes.find((attr) => attr.key === '_components')
	const componentImage = attributes.find((attr) => attr.key === '_image')

	let components = null;
	let component = null;
	if (componentsJson) {
		components = JSON.parse(componentsJson.value);
		component = components[0];
	}

	const [hideItem, setHideItem] = useState(false);
	const [editingVariant, setEditingVariant] = useState(null);
	const [isAccordionOpen, setIsAccordionOpen] = useState(false);
	const [selectedVariant, setSelectedVariant] = useState(selectedSwatch || []);
	const [featuredImageUrl, setFeaturedImageUrl] = useState(item?.featuredImageUrl || '');
	const [subtitles, setSubtitles] = useState([]);

	const onSelectVariant = async (variant: any, swatchValue: any, index: number) => {
		setEditingVariant(index);
		setSelectedVariant([swatchValue]);
		await onChangeVariant(item.id, variant.id, item.quantity, item);
		setEditingVariant(null);
	}

	const variantSubtitle = () => {
		let subtitles = [];
		if (item.merchandise.product.handle === tSettings.bundleHandle1) {
			subtitles = tSettings.bundleSubHandle1.split(',');
		} else if (item.merchandise.product.handle === tSettings.bundleHandle2) {
			subtitles = tSettings.bundleSubHandle2.split(',');
		} else if (item.handle === tSettings.bundleHandle3) {
			subtitles = tSettings.bundleSubHandle3.split(',');
		} else if (item.handle === tSettings.bundleHandle4) {
			subtitles = tSettings.bundleSubHandle4.split(',');
		}
		setSubtitles(subtitles);
	}

	const onAccordionOpen = () => {
		// setOnAcco((prevState:any) => ({
		// 	//@ts-ignore
		// 	isAccordionOpen: !prevState.isAccordionOpen,
		// }));
	}

	const productTitle = (item:any) => {
		// add handle for multiple swatch type product ex. glow-essentials-bundle
		if (item.merchandise.title.toLowerCase() === 'default title') {
			return capitalizeString(item.merchandise.product.title);
		}

		if (store === 'my' && item.merchandise.title === 'Daily Essentials Set') {
			return capitalizeString(item.merchandise.title);
		}

		const { swatches } = item;
		if (swatches.length >= 2 && !item.merchandise.product.isProductBundleApp?.value) {
			return capitalizeString(item.merchandise.title.split('/')[0]);
		}
		return capitalizeString(item.merchandise.product.title.split('/')[0].replace('1x ', ''));
	}

	const extractId = (id:string) => {
		const arrString = id.split('?')[0].split('/');
		return arrString[arrString.length - 1];
	}

	useEffect(() => {
		if (item) {
			variantSubtitle();
		}
	}, [item]);

	useEffect(() => {
		let featuredImage = item?.featuredImageUrl || '';
		if (useShopifyVariantInfo && item.merchandise?.image?.url) {
			featuredImage = item.merchandise?.image?.url;
		} else {
			if (store === 'my' && item.merchandise.product.handle === 'masque-towelwrap') {
				featuredImage = 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_e9cb40b2-9b22-481b-9cf0-f6a8d5628347.jpg?v=1772037749';
			}

			if ((store === 'my' || store === 'uk' || store === 'eu' || store === 'au') && item.merchandise.product.handle === 'clean-slate-set') {
				featuredImage = 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_44559ed8-85ec-40a1-9193-b12a85f50a7a.jpg?v=1772037770';
			}

			if (store === 'int' && item.merchandise.product.handle === 'clean-slate-set') {
				featuredImage = 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_878ce412-fae5-4b17-b2c7-cdfd50c95682.jpg?v=1772037792';
			}

			if ((store === 'my' || store === 'dev') && item.merchandise.product.handle === 'sweet-scalp-set') {
				featuredImage = 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_051e9d3f-6619-48f3-92a7-c46b2fa78d8e.jpg?v=1772037812';
			}

			if ((store === 'eu') && item.merchandise.product.handle === 'sunny-honey-bali-bronzing-self-tan-set') {
				featuredImage = 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_14bcf2e0-fc14-42fc-9c4a-0c067fa6a40b.jpg?v=1772037842';
			}

			if ((store === 'eu') && item.merchandise.product.handle === 'bali-bae-self-tan-set') {
				featuredImage = 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_dd372d4f-d256-412e-9507-f4dc5d731340.jpg?v=1772037864';
			}

			if ((store === 'my' || store === 'uk' || store === 'int' || store === 'au' || store === 'eu') && item.merchandise.product.handle === 'detox-nourish-set') {
				item.featuredImageUrl = 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_a077878d-c77b-44b8-878f-1cb03a31a8b7.jpg?v=1772037888';
				featuredImage = 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_a077878d-c77b-44b8-878f-1cb03a31a8b7.jpg?v=1772037888';
			}

			if (store === 'au' && item.merchandise.product.handle === 'super-hydrating-shampoo-conditioner-limited-edition-set') {
				featuredImage = 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_ac0ac9b3-0c0a-4e3b-a27d-b686e2d95980.jpg?v=1772037951';
			}
			if (store === 'us' && item.merchandise.product.handle === 'detox-nourish-set') {
				featuredImage = 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_4279b1fc-feb1-406b-85b6-4e1450cfff95.jpg?v=1772037973';
			}

			if (['ca'].includes(store) && item.merchandise.product.handle === 'golden-hour-set' && selectedVariant[0].toLowerCase() === 'medium') {
				featuredImage = 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_f3892614-a042-466a-8268-8fca468e9ac9.jpg?v=1772037996';
			}

			if (['au'].includes(store) && item.merchandise.product.handle === 'golden-hour-set' && selectedVariant[0].toLowerCase() === 'dark') {
				featuredImage = 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_20ab9884-e1bf-425e-86e9-908ee9148e97.jpg?v=1772038027&width=320';
			}
		}

		setFeaturedImageUrl(featuredImage);
	}, []);

	const groupSwatches = (data) => {
		if (!item.merchandise.product.isProductBundleApp?.value) {
			return data;
		}
		const grouped = Object.values(
			data.reduce((acc, item) => {
				if (!acc[item.name]) {
				acc[item.name] = { ...item };
				} else {
				// gabungkan id
				acc[item.name].id += "|" + item.id;
				// ambil intersection values
				acc[item.name].values = acc[item.name].values.filter(v =>
					item.values.includes(v)
				);
				}
				return acc;
			}, {})
		);
		return grouped;
	}


	useEffect(() => {
		setSelectedVariant(selectedSwatch);
	}, [selectedSwatch]);

	const isUpsell = (item:any) => {
		try {
			return item.attributes.find((props:any) => props.key === '_front_upsell');
		} catch {
			return null
		}
	}

	const showSwatches = variants && variants.length > 1 && !item.isFreeItem;

	return (
		<li className={`cart-item ${item?.isLoading ? 'opacity-50 pointer-events-none' : ''}`} data-mod={item.modified}>
		<figure className="flex flex-wrap py-2 mb-0 items-start -mx-hg lg:-mx-g">
			<ConditionWrapper
				condition={!item.isFreeItem}
				wrapper={(children: any) => !isUpsell(item) ? <a href={item.url} className="w-3/12 px-hg lg:px-g">{children}</a> : <span className="w-3/12 px-hg lg:px-g">{children}</span>}
			>
				{!componentImage?.value && (<picture className={item.isFreeItem ? 'w-3/12 px-hg lg:px-g' : ''}>
					{item.featuredImageUrl ? (
						<img src={featuredImageUrl.replace('/public', '/150x')} className="w-full object-contain bg-pink-light h-[70px]" alt={item.merchandise.product.title} loading="lazy" width="78" height="78" />
					) : (
						<img src={item.merchandise?.product?.featuredImage?.url || ''} className="w-full object-contain bg-pink-light h-[70px]" alt={item.merchandise.product.title} loading="lazy" width="78" height="78" />
					)}
				</picture>)}
				{componentImage?.value && <picture className={item.isFreeItem ? 'w-3/12 px-hg lg:px-g' : ''}>
					<img src={componentImage?.value} className="w-full object-contain bg-pink-light h-[78px]" alt={component?.title} loading="lazy" width="78" height="78" />
				</picture>}
			</ConditionWrapper>
			<figcaption className="w-9/12 px-hg lg:px-g">
				<div className="flex items-start no-gutters justify-between">
					<p className="mb-1 font-bold w-2/3 pl-0">
						{item.isFreeItem && item.originalPrice >= 0 ? (
							<ConditionWrapper
								condition={item.isFreeItem}
								wrapper={(children:any) => <span className="text-black">{children}</span>}
							>
								{ item.isFreeItem && !component && (`${item.merchandise.product.title.replace('FREE', '').replace('Free', '').trim()}`) }
								{ item.isFreeItem && component && (`${component.title?.replace('FREE', '').replace('Free', '').trim()}`) }
							</ConditionWrapper>
						)
							: (
								<ConditionWrapper
									condition={!item.isFreeItem}
									wrapper={(children: any) => {
										if (item.disableCartItemLink || !isUpsell(item)) {
											return (
												<span className="text-black">
													{children}
												</span>
											);
										} else {
											return (
												<a href={`/products/${item.merchandise.product.handle}`} className="text-black hover:text-primary">
													{children}
												</a>
											);
										}
									}}
								>
									{ !item.isFreeItem && !component && (`${productTitle(item)}`) }
									{ !item.isFreeItem && component && (`${component?.title}`) }
									{`${item.recurring ? ' Subscriptions' : ''}`}
								</ConditionWrapper>
							)}

						{item.recurring && (
							<span className="text-primary mt-1 flex font-italic text-sm font-normal">
								<SvgRecurring className="svg mr-1" />
								{' '}
								{item.recurringMessage}
							</span>
						)}

					</p>
					{item.isFreeItem && item.attributes && item.attributes.findIndex((e:any) => (e.key === '_campaign_type' && ['auto_gwp', 'discount_code'].includes(e.value)) || e.key === '_free_sample') > -1 && (
						<button className="cart-item__remove btn-unstyled text-body flex"
								type="button" aria-label="Remove"
								onClick={() => onRemoveItem(item, item.attributes)} data-cy="cart-remove-icon">
									<SvgTrash className="svg w-[1em]" />
						</button>)}
					{item.isFreeItem && item.attributes && item.attributes.findIndex((e:any) => e.key === '_swell_redemption_token') > -1 && (
						<button className="cart-item__remove btn-unstyled text-body flex"
								type="button" aria-label="Remove"
								onClick={() => onRemoveItem(item)} data-cy="cart-remove-icon">
									<SvgTrash className="svg w-[1em]" />
						</button>)}
					{!item.isFreeItem && (<button className="cart-item__remove btn-unstyled text-body flex"
						type="button" aria-label="Remove"
						onClick={() => onRemoveItem(item)} data-cy="cart-remove-icon">
							<SvgTrash className="svg w-[1em]" />
					</button>)}

				</div>

				<ConditionWrapper
					condition={isMultiOptions}
					wrapper={(children:any) => (
						<div className="pb-1">
							<a onClick={onAccordionOpen} className={`${!isAccordionOpen ? 'collapsed' : ''} d-inline-block text-primary text-underline card-header p-0 border-b-[1px]-0 position-relative pr-2 mb-1`} data-toggle="collapse" href={`#cart-drawer__shade-${extractId(item.id)}`} role="button" aria-expanded={isAccordionOpen} aria-controls={`#cart-drawer__shade-${extractId(item.id)}`}>
								{isAccordionOpen ? 'Hide details' : 'Show details'}
								<SvgChevronDown className="svg chevron-down ml-1" width="12" height="12" />
							</a>
							<div className={`${isAccordionOpen ? 'd-block' : 'd-none'} collapse text-body`} id={`cart-drawer__shade-${extractId(item.id)}`}>
								{children}
							</div>
						</div>
					)}
				>
					{groupSwatches(swatches).map((opt:any, index:number) => {
						const options = item.merchandise.selectedOptions.filter((option:any) => option.name.toLowerCase() !== 'size');
						const selected = options.filter((option:any, ind:any) => option.name.toLowerCase() !== 'size' && index === ind)
							.map((option:any) => option.value).join();

						const itemSub = subtitles.length > 0 ? subtitles[index] : false;

						return (
							<div key={opt.id} className={`mb-1 ${isMultiOptions && index === 0 ? 'border-b-[1px] border-bg-primary-light-second' : ''}`}>

								{isMultiOptions && itemSub && itemSub.split('///').map((sub:any, ind:number) => {
									if (ind + 1 < itemSub.split('///').length) {
										return (
											<p className="font-size-sm mb-1 pb-1 border-b-[1px] border-bg-primary-light-second">{sub}</p>
										);
									}
									return (
										<p className="font-size-sm mb-1 pb-1">{sub}</p>
									);
								})}

								<p className="flex mb-1 items-center">

									{!showSwatches && (
										<i className={`d-block variant-swatch ${kebabCase(selected)}`} />
									)}
									{showSwatches && opt.values.map((val:any) => {
										const o = [...selectedVariant];
										o[index] = val;
										const variant = variants.find((vari:any) => {
											const selectedVaries = vari.selectedOptions.filter((option:any) => option.name.toLowerCase() !== 'size');
											const selectedVari = selectedVaries.map((option:any) => option.value);
											return selectedVari.join() === o.join();
										});

										return variant && (
											<button
												key={`${opt.id}-${kebabCase(val)}`}
												className={`variant-swatch pr-0 mr-1 ${kebabCase(val)} ${selected === val ? 'border-2 border-primary selected' : 'border-2 border-white' } ${!variant.availableForSale ? 'oos' : ''}`}
												type="button"
												tabIndex={-1}
												disabled={!variant.availableForSale}
												aria-label={kebabCase(val)}
												onClick={() => selectedVariant[0] !== val ? onSelectVariant(variant, val, index) : null }
											/>
										);
									})}

									{editingVariant === index && (
										<span className="spinner-border spinner-border-sm text-primary ml-1 !w-[20px] !h-[20px]" role="status" />
									)}

									{item.merchandise.product.handle !== 'antioxidant-glow-cream' && (
									<span className={editingVariant === index ? 'hidden' : 'font-size-sm'}>
										{` - ${selected.replace(': limited edition!', '')} ${opt.name}`}
									</span>)}
								</p>
								{item.merchandise.product.handle === 'antioxidant-glow-cream' && (
									<div className={editingVariant === index ? 'hidden' : 'font-size-sm'}>
										{`${selected.replace(': limited edition!', '')} ${opt.name}`}
									</div>
								)}
							</div>

						);
					})}

				</ConditionWrapper>

				{item.attributes && item.attributes.map((itm:any) => !itm.key.startsWith('_') && (<p key={itm.key} className="mb-1">{`${itm.key}: ${itm.value}`}</p>))}

				<div className="flex items-center justify-between">
					<QuantityBox
						name="quantity-box"
						editable={component ? false : !item.isFreeItem}
						quantity={item.quantity}
						onChangeQuantity={(newQty:number, callback:any) => onChangeQuantity(item, newQty, callback)}
						isLastStock={isLastStock}
						productId={productId}
						productStock={component ? 10000 : productStock}
						isModified={item.modified}
						originalQuantity={component ? item.quantity : item.original_quantity}
						allowZero={true}
					/>
					{item.isFreeItem && !item.isManualGwp && parseFloat(item.cost.amountPerQuantity.amount) > 0
						? (
							<div className="flex flex-col text-right">
								{item.comparePrice > 0 && <span className="line-through">{formatMoney(item.comparePrice, false, store)}</span>}
								{!item.comparePrice && <span className="line-through">{formatMoney(item.originalPrice, false, store)}</span>}
								<strong>
									Free
								</strong>
							</div>
						)
						: (
							<div className="flex flex-col text-right">
								{item.comparePrice > 0
									? (<span className="line-through">{formatMoney(item.comparePrice, false, store)}</span>)
									: item.totalDiscountAmount > 0 && (<span className="line-through">{formatMoney(item.originalPrice, false, store)}</span>)}
								<strong>
									{item.totalDiscountAmount > 0 && item.priceAfterDiscounted > 0
										? formatMoney(item.priceAfterDiscounted, false, store)
										: item.originalPrice > 0 && !item.modifiedDiscountedPrice ? formatMoney(item.originalPrice, false, store) : 'Free'}

									{item.recurring && (item.period)}
								</strong>
							</div>
						)}
				</div>

				{(isLastStock) && (
					<p className="mt-1 mb-0 text-danger">Oh nuts! You got the last one!</p>)}
			</figcaption>
		</figure>

		{item.showPreorderNotif?.show && (
			<span className="block mb-2 text-sm">{item.showPreorderNotif?.note || ''}</span>
		)}
		{item.showPreorderNotif_2?.show && (
			<span className="block mb-2 text-sm">{item.showPreorderNotif_2?.note}</span>
		)}
		{item.showPreorderNotif_3?.show && (
			<span className="block mb-2 text-sm">{item.showPreorderNotif_3?.note}</span>
		)}
	</li>

	)
}

export default CartItem;
