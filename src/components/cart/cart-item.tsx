/* global tStrings tSettings */
// @ts-nocheck
import '@/config';
// import dynamic from 'next/dynamic';
const tSettings = global.config.tSettings;
const tStrings = global.config.tStrings;

import React from 'react';
import PropTypes from 'prop-types';

import ConditionWrapper from '@/components/cart/condition-wrapper';
import QuantityBox from '@/components/cart/quantity-box';
import SvgTrash from '@/images/icons/trash.svg';
import SvgRecurring from '@/images/icons/recurring.svg';
import SvgChevronDown from '@/images/icons/chevron-down.svg';
import { kebabCase, formatMoney } from '@/modules/utils';
// const { kebabCase, formatMoney } = dynamic(() => import('@/modules/utils'), {
//     ssr: false,
// });

type CartItemProps = {
	item: any;
	isLastStock: boolean;
	onChangeVariant: Function;
	onChangeQuantity: Function;
	onRemoveItem: Function;
	productId: number;
	productStock: number;
}

export default class CartItem extends React.Component {
	constructor(props: CartItemProps) {
		super(props);
		this.state = {
			editingVariant: false,
			isAccordionOpen: props.item.openAccordion || false,
		};
	}

	onSelectVariant(variant: any, swatchIndex: number) {
		this.setState({
			editingVariant: false,
		})
	}

	onRemoveItem = () => {
		//@ts-ignore
		this.props.onRemoveItem(this.props.item);
		//@ts-ignore
		const item = this.props.item;
		if (item.properties && item.properties._swell_redemption_token) {
			document.dispatchEvent(new CustomEvent('SwellRemoveItemToCart'));
		}
	}

	variantSubtitle = (item) => {
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
		return subtitles;
	}

	onAccordionOpen = () => {
		this.setState((prevState) => ({
			//@ts-ignore
			isAccordionOpen: !prevState.isAccordionOpen,
		}));
	}

	productTitle = (item) => {
		// add handle for multiple swatch type product ex. glow-essentials-bundle
		const { swatches } = item;
		if (swatches.length >= 2) {
			return item.merchandise.product.title;
		}
		return item.merchandise.product.title.replace('1x ', '');
	}

	extractId = (id) => {
		const arrString = id.split('?')[0].split('/');
		return arrString[arrString.length - 1];
	}

	render() {
		const { item } = this.props;
		const { editingVariant, isAccordionOpen } = this.state;

		// current change
		const { swatches, variants, selectedSwatch } = item;
		const showSwatches = variants && variants.length > 1 && !item.isFreeItem;
		const isMultiOptions = item.swatches.length > 1;

		// for now using settings
		const subtitles = this.variantSubtitle(item);

		console.log(item.merchandise, 'testing');
		return (
			<li className="cart-item" data-mod={item.modified}>
				<figure className="flex flex-wrap py-1 mb-0 items-start -mx-2">
					<ConditionWrapper
						condition={!item.isFreeItem}
						wrapper={(children: any) => <a href={item.url} className="w-1/4 pl-2 pr-0">{children}</a>}
					>
						<picture className={item.isFreeItem ? 'w-1/4' : ''}>
							<img src={item.merchandise.product.featuredImage.url} className="w-full" alt={item.merchandise.product.title} loading="lazy" width="78" height="78" />
						</picture>
					</ConditionWrapper>
					<figcaption className="w-3/4 px-2">
						<div className="flex items-start no-gutters justify-between">
							<p className="mb-1 font-bold w-2/3 pl-0">
								{item.isFreeItem && item.originalPrice >= 0 ? (
									<ConditionWrapper
										condition={item.isFreeItem}
										wrapper={(children) => <a href={`/products/${item.merchandise.product.handle}`} className="text-black hover:text-primary">{children}</a>}
									>
										{ item.isFreeItem && (`FREE ${item.merchandise.product.title.replace('FREE', '').replace('Free', '').trim()}`) }
									</ConditionWrapper>
								)
									: (
										<ConditionWrapper
											condition={!item.isFreeItem}
											wrapper={(children) => <a href={`/products/${item.merchandise.product.handle}`} className="text-black hover:text-primary">{children}</a>}
										>
											{ !item.isFreeItem && (`${this.productTitle(item)}`) }
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
							{item.isFreeItem && item.properties && item.properties._swell_redemption_token && (<button className="cart-item__remove btn-unstyled text-body flex" type="button" aria-label="Remove" onClick={this.onRemoveItem} data-cy="cart-remove-icon"><SvgTrash className="svg w-[1em]" /></button>)}
							{!item.isFreeItem && (<button className="cart-item__remove btn-unstyled text-body flex" type="button" aria-label="Remove" onClick={this.onRemoveItem} data-cy="cart-remove-icon"><SvgTrash className="svg w-[1em]" /></button>)}

						</div>

						<ConditionWrapper
							condition={isMultiOptions}
							wrapper={(children) => (
								<div className="pb-1">
									<a onClick={this.onAccordionOpen} className={`${!isAccordionOpen ? 'collapsed' : ''} d-inline-block text-primary text-underline card-header p-0 border-b-[1px]-0 position-relative pr-2 mb-1`} data-toggle="collapse" href={`#cart-drawer__shade-${this.extractId(item.id)}`} role="button" aria-expanded={isAccordionOpen} aria-controls={`#cart-drawer__shade-${this.extractId(item.id)}`}>
										{isAccordionOpen ? 'Hide details' : 'Show details'}
										<SvgChevronDown className="svg chevron-down ml-1" width="12" height="12" />
									</a>
									<div className={`${isAccordionOpen ? 'd-block' : 'd-none'} collapse text-body`} id={`cart-drawer__shade-${this.extractId(item.id)}`}>
										{children}
									</div>
								</div>
							)}
						>

							{swatches.map((opt, index) => {
								const options = item.merchandise.selectedOptions.filter((option) => option.name.toLowerCase() !== 'size');
								const selected = options.filter((option, ind) => option.name.toLowerCase() !== 'size' && index === ind)
									.map((option) => option.value).join();

								const itemSub = subtitles.length > 0 ? subtitles[index] : false;

								return (
									<div key={opt.id} className={`mb-1 ${isMultiOptions && index === 0 ? 'border-b-[1px] border-bg-primary-light-second' : ''}`}>

										{isMultiOptions && itemSub && itemSub.split('///').map((sub, ind) => {
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
											{showSwatches && opt.values.map((val) => {
												const o = [...selectedSwatch];
												o[index] = val;
												const variant = variants.find((vari) => {
													const selectedVaries = vari.selectedOptions.filter((option) => option.name.toLowerCase() !== 'size');
													const selectedVari = selectedVaries.map((option) => option.value);
													return selectedVari.join() === o.join();
												});

												return variant && (
													<button
														key={`${opt.id}-${kebabCase(val)}`}
														className={`variant-swatch pr-0 mr-1 ${kebabCase(val)} ${selected === val && 'border border-primary'} ${!variant.availableForSale ? 'oos' : ''}`}
														type="button"
														tabIndex={-1}
														disabled={!variant.availableForSale || editingVariant !== false}
														aria-label={kebabCase(val)}
														onClick={() => this.onSelectVariant(variant, index)}
													/>
												);
											})}

											{editingVariant === index && (
												<span className="spinner-border spinner-border-sm text-primary ml-1" role="status" />
											)}

											<span className={editingVariant === index ? 'd-none' : 'font-size-sm'}>
												{` - ${selected.replace(': limited edition!', '')} ${opt.name}`}
											</span>
										</p>
									</div>

								);
							})}

						</ConditionWrapper>

						{item.attributes && item.attributes.map((itm) => !itm.key.startsWith('_') && (<p key={itm.key} className="mb-1">{`${itm.key}: ${itm.value}`}</p>))}

						<div className="flex items-center justify-between">
							<QuantityBox
								name="quantity-box"
								editable={!item.isFreeItem}
								quantity={item.quantity}
								onChangeQuantity={(newQty, callback) => this.props.onChangeQuantity(item, newQty, callback)}
								isLastStock={this.props.isLastStock}
								productId={this.props.productId}
								productStock={this.props.productStock}
								isModified={item.modified}
								originalQuantity={item.original_quantity}
							/>
							{item.isFreeItem && !item.isManualGwp && parseFloat(item.cost.amountPerQuantity.amount) > 0
								? (
									<div className="flex flex-col text-right">
										{item.comparePrice > 0 && <span className="line-through">{formatMoney(item.comparePrice)}</span>}
										{!item.comparePrice && <span className="line-through">{formatMoney(item.originalPrice)}</span>}
										<strong>
											Free
										</strong>
									</div>
								)
								: (
									<div className="flex flex-col text-right">
										{item.comparePrice > 0 && (
											<span className="line-through">{formatMoney(item.comparePrice)}</span>)}
										<strong>
											{item.originalPrice > 0 && !item.modifiedDiscountedPrice ? formatMoney(item.originalPrice) : 'Free'}
											{item.recurring && (item.period)}
										</strong>
									</div>
								)}
						</div>

						{(this.props.isLastStock) && (
							<p className="mt-1 mb-0 text-danger">Oh nuts! You got the last one!</p>)}
					</figcaption>
				</figure>

				{item.showPreorderNotif && (
					<span className="d-block mb-2">{tStrings.estimated_delivery_text}</span>
				)}
				{item.showPreorderNotif_2 && (
					<span className="d-block mb-2">{tStrings.estimated_delivery_text_2}</span>
				)}
			</li>
		);
	}
}

CartItem.propTypes = {
	item: PropTypes.object.isRequired,
	isLastStock: PropTypes.bool.isRequired,
	onChangeVariant: PropTypes.func.isRequired,
	onChangeQuantity: PropTypes.func.isRequired,
	onRemoveItem: PropTypes.func.isRequired,
	productId: PropTypes.number.isRequired,
	productStock: PropTypes.number.isRequired,
};
