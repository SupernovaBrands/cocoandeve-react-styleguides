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

	const { swatches, variants, selectedSwatch } = item;
	const showSwatches = variants && variants.length > 1 && !item.isFreeItem;
	const isMultiOptions = item.swatches.length > 1;

	const [hideItem, setHideItem] = useState(false);
	const [editingVariant, setEditingVariant] = useState(null);
	const [isAccordionOpen, setIsAccordionOpen] = useState(false);
	const [selectedVariant, setSelectedVariant] = useState(selectedSwatch || []);
	const [featuredImageUrl, setFeaturedImageUrl] = useState(item?.featuredImageUrl || '');
	const [subtitles, setSubtitles] = useState([]);

	const onSelectVariant = async (variant: any, swatchValue: any, index: number) => {
		setEditingVariant(index);
		setSelectedVariant([swatchValue]);
		await onChangeVariant(item.id, variant.id, item.quantity);
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
		if (swatches.length >= 2) {
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
				featuredImage = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/2e3e1c74-7d61-47fd-5a07-749bcd364900/public';
			}

			if ((store === 'my' || store === 'uk' || store === 'eu' || store === 'au') && item.merchandise.product.handle === 'clean-slate-set') {
				featuredImage = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/2d6596e4-f344-4968-c8b9-6b2530881000/public';
			}

			if (store === 'int' && item.merchandise.product.handle === 'clean-slate-set') {
				featuredImage = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/271b3156-1d41-4f82-4824-a82722030500/public';
			}

			if (store === 'au' && item.merchandise.product.handle === 'daily-essentials-bundle') {
				featuredImage = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/d1fe49e9-80c4-47cd-3c96-c27f2a578700/public';
			}

			if ((store === 'uk' || store === 'eu') && item.merchandise.product.handle === 'hair-revival-set') {
				featuredImage = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/47b28a5c-84f7-4b12-ec75-dd477a1feb00/public';
			}

			if (store === 'int' && item.merchandise.product.handle === 'hair-revival-set') {
				featuredImage = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/dcc547a9-dab9-4eea-bbc1-07e7645bab00/public';
			}

			if (store === 'my' && item.merchandise.product.handle === 'hair-revival-set') {
				featuredImage = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/11a4d669-7e60-4441-1e07-ffbfeba9d800/public';
			}

			if ((store === 'my' || store === 'dev') && item.merchandise.product.handle === 'sweet-scalp-set') {
				featuredImage = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/b708d084-8829-4e6d-cfeb-03a24148a800/public';
			}

			if ((store === 'eu') && item.merchandise.product.handle === 'sunny-honey-bali-bronzing-self-tan-set') {
				featuredImage = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/029c70f1-d5cf-45de-746a-891fdbd89d00/public';
			}

			if ((store === 'eu') && item.merchandise.product.handle === 'bali-bae-self-tan-set') {
				featuredImage = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/f4575694-2f11-43b0-6c36-179f0ee54300/public';
			}

			if ((store === 'my' || store === 'uk' || store === 'int' || store === 'au' || store === 'eu' || store === 'ca') && item.merchandise.product.handle === 'daily-essentials-bundle') {
				featuredImage = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/503a39e9-27b7-4278-c850-1d015cb06000/public';
			}

			if ((store === 'my' || store === 'uk' || store === 'int' || store === 'au' || store === 'eu' || store === 'ca') && item.merchandise.product.handle === 'deep-condition-bundle') {
				featuredImage = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/10045f09-b506-4fc1-c28a-b1ced8673800/public';
			}

			if ((store === 'my' || store === 'uk' || store === 'int' || store === 'au' || store === 'eu') && item.merchandise.product.handle === 'detox-nourish-set') {
				item.featuredImageUrl = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/7c0d8baa-c79c-43f7-5b87-a93540510d00/public';
				featuredImage = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/7c0d8baa-c79c-43f7-5b87-a93540510d00/public';
			}

			if ((store === 'my') && item.merchandise.title === 'Daily Essentials Set' && item.merchandise.product.handle === 'leave-in-conditioner') {
				featuredImage = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/503a39e9-27b7-4278-c850-1d015cb06000/public';
			}
			if (store === 'au' && item.merchandise.product.handle === 'super-hydrating-shampoo-conditioner-limited-edition-set') {
				featuredImage = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/8fce65c9-c57e-4401-71cd-313acd286200/public';
			}
			if (store === 'us' && item.merchandise.product.handle === 'detox-nourish-set') {
				featuredImage = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/7c0d8baa-c79c-43f7-5b87-a93540510d00/public';
			}
			if (['uk', 'ca', 'au'].includes(store) && item.merchandise.product.handle === 'tan-masters-kit') {
				featuredImage = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/197f3539-6c23-475f-b83b-5d6211561200/public';
			} 
		}

		setFeaturedImageUrl(featuredImage);
	}, []);

	useEffect(() => {
		setSelectedVariant(selectedSwatch);
	}, [selectedSwatch]);

	return (
		<li className={`cart-item ${item?.isLoading ? 'opacity-50 pointer-events-none' : ''}`} data-mod={item.modified}>
		<figure className="flex flex-wrap py-2 mb-0 items-start -mx-hg lg:-mx-g">
			<ConditionWrapper
				condition={!item.isFreeItem}
				wrapper={(children: any) => <a href={item.url} className="w-3/12 px-hg lg:px-g">{children}</a>}
			>
				<picture className={item.isFreeItem ? 'w-3/12 px-hg lg:px-g' : ''}>
					{item.featuredImageUrl ? (
						<img src={featuredImageUrl.replace('/public', '/150x')} className="w-full object-contain bg-pink-light h-[78px]" alt={item.merchandise.product.title} loading="lazy" width="78" height="78" />
					) : (
						<img src={item.merchandise?.product?.featuredImage?.url || ''} className="w-full object-contain bg-pink-light h-[78px]" alt={item.merchandise.product.title} loading="lazy" width="78" height="78" />
					)}
				</picture>
			</ConditionWrapper>
			<figcaption className="w-9/12 px-hg lg:px-g">
				<div className="flex items-start no-gutters justify-between">
					<p className="mb-1 font-bold w-2/3 pl-0">
						{item.isFreeItem && item.originalPrice >= 0 ? (
							<ConditionWrapper
								condition={item.isFreeItem}
								wrapper={(children:any) => <span className="text-black">{children}</span>}
							>
								{ item.isFreeItem && (`${item.merchandise.product.title.replace('FREE', '').replace('Free', '').trim()}`) }
							</ConditionWrapper>
						)
							: (
								<ConditionWrapper
									condition={!item.isFreeItem}
									wrapper={(children:any) => <a href={`/products/${item.merchandise.product.handle}`} className="text-black hover:text-primary">{children}</a>}
								>
									{ !item.isFreeItem && (`${productTitle(item)}`) }
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
					{item.isFreeItem && item.attributes && item.attributes.findIndex((e:any) => e.key === '_campaign_type' && ['auto_gwp', 'discount_code'].includes(e.value)) > -1 && (
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

					{swatches.map((opt:any, index:number) => {
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
						editable={!item.isFreeItem}
						quantity={item.quantity}
						onChangeQuantity={(newQty:number, callback:any) => onChangeQuantity(item, newQty, callback)}
						isLastStock={isLastStock}
						productId={productId}
						productStock={productStock}
						isModified={item.modified}
						originalQuantity={item.original_quantity}
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
