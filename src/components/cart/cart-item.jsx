/* global tStrings tSettings */
import '@/config';
import dynamic from 'next/dynamic';
const tSettings = global.config.tSettings;
const tStrings = global.config.tStrings;

import React from 'react';
import PropTypes from 'prop-types';

import ConditionWrapper from '@/components/cart/condition-wrapper';
import QuantityBox from '@/components/cart/quantity-box';

// import {
// 	formatMoney,
// 	kebabCase,
// } from '@/modules/utils';

import SvgTrash from '@/images/icons/trash.svg';
import SvgRecurring from '@/images/icons/recurring.svg';
import SvgChevronDown from '@/images/icons/chevron-down.svg';
const { kebabCase, formatMoney } = dynamic(() => import('@/modules/utils'), {
    ssr: false,
});
export default class CartItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editingVariant: false,
			isAccordionOpen: props.item.openAccordion || false,
		};
	}

	onSelectVariant(variant, swatchIndex) {
		this.setState({
			editingVariant: false,
		})
		/*
		const dataText = document.querySelector('#variant_quantity').innerText;
		const dataInv = JSON.parse(dataText);
		const itemProps = this.props.item;
		const lastStock = dataInv.filter((item) => item.id === variant.id && itemProps.quantity > item.quantity);

		if (variant.availableForSale) {
			this.setState({
				editingVariant: variant.id !== this.props.item.merchandise.id ? swatchIndex : false,
			}, () => {
				if (this.state.editingVariant !== false) {
					this.props.onChangeVariant(this.props.item, variant.id, lastStock, variant);
					this.setState({ editingVariant: false, isAccordionOpen: true });
				}
			});
		}
		*/
	}

	onRemoveItem = () => {
		this.props.onRemoveItem(this.props.item);
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

		return (
			<li className="cart-item" data-mod={item.modified}>
				<figure className="row py-2 mb-0 align-items-start">
					<ConditionWrapper
						condition={!item.isFreeItem}
						wrapper={(children) => <a href={item.url} className="col-3">{children}</a>}
					>
						<picture className={item.isFreeItem ? 'col-3' : ''}>
							<img src={item.merchandise.product.featuredImage.url} className="w-100" alt={item.merchandise.product.title} loading="lazy" width="78" height="78" />
						</picture>
					</ConditionWrapper>
					<figcaption className="col-9">
						<div className="d-flex align-items-start no-gutters justify-content-between">
							<p className="mb-1 fw-bold col-8 ps-0">
								{item.isFreeItem && item.originalPrice >= 0 ? (
									<ConditionWrapper
										condition={item.isFreeItem}
										wrapper={(children) => <a href={`/products/${item.merchandise.product.handle}`} className="link-secondary">{children}</a>}
									>
										{ item.isFreeItem && tSettings.locale === 'fr' && (`${item.merchandise.product.title.replace('OFFERT', '').replace('Offert', '').trim()} OFFERT`) }

										{ item.isFreeItem && tSettings.locale === 'de' && (`GRATIS ${item.merchandise.product.title.replace('GRATIS', '').replace('Gratis', '').trim()}`) }

										{ item.isFreeItem && tSettings.locale.includes('en') && (`FREE ${item.merchandise.product.title.replace('FREE', '').replace('Free', '').trim()}`) }
									</ConditionWrapper>
								)
									: (
										<ConditionWrapper
											condition={!item.isFreeItem}
											wrapper={(children) => <a href={`/products/${item.merchandise.product.handle}`} className="link-secondary">{children}</a>}
										>
											{ !item.isFreeItem && (`${this.productTitle(item)}`) }
											{`${item.recurring ? ' Subscriptions' : ''}`}
										</ConditionWrapper>
									)}
								{item.recurring && (
									<span className="text-primary mt-1 d-flex font-italic font-size-sm fw-normal">
										<SvgRecurring className="svg mr-1" />
										{' '}
										{item.recurringMessage}
									</span>
								)}
							</p>
							{item.isFreeItem && item.properties && item.properties._swell_redemption_token && (<button className="cart-item__remove btn-unstyled text-body d-flex" type="button" aria-label="Remove" onClick={this.onRemoveItem} data-cy="cart-remove-icon"><SvgTrash className="svg" /></button>)}
							{!item.isFreeItem && (<button className="cart-item__remove btn-unstyled text-body d-flex" type="button" aria-label="Remove" onClick={this.onRemoveItem} data-cy="cart-remove-icon"><SvgTrash className="svg" /></button>)}

						</div>

						<ConditionWrapper
							condition={isMultiOptions}
							wrapper={(children) => (
								<div className="pb-1">
									<a onClick={this.onAccordionOpen} className={`${!isAccordionOpen ? 'collapsed' : ''} d-inline-block text-primary text-underline card-header p-0 border-bottom-0 position-relative pr-2 mb-1`} data-toggle="collapse" href={`#cart-drawer__shade-${this.extractId(item.id)}`} role="button" aria-expanded={isAccordionOpen} aria-controls={`#cart-drawer__shade-${this.extractId(item.id)}`}>
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
									<div key={opt.id} className={`mb-1 ${isMultiOptions && index === 0 ? 'border-bottom border-bg-primary-light-second' : ''}`}>

										{isMultiOptions && itemSub && itemSub.split('///').map((sub, ind) => {
											if (ind + 1 < itemSub.split('///').length) {
												return (
													<p className="font-size-sm mb-1 pb-1 border-bottom border-bg-primary-light-second">{sub}</p>
												);
											}
											return (
												<p className="font-size-sm mb-1 pb-1">{sub}</p>
											);
										})}

										<p className="d-flex mb-1 align-items-center">

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
														className={`variant-swatch pr-0 mr-1 ${kebabCase(val)} ${selected === val && 'border-primary'} ${!variant.availableForSale ? 'oos' : ''}`}
														type="button"
														tabIndex="-1"
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

						<div className="d-flex align-items-center justify-content-between">
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
									<div className="d-flex flex-column text-right">
										{item.comparePrice > 0 && <span className="text-linethrough">{formatMoney(item.comparePrice)}</span>}
										{!item.comparePrice && <span className="text-linethrough">{formatMoney(item.originalPrice)}</span>}
										<strong>
											Free
										</strong>
									</div>
								)
								: (
									<div className="d-flex flex-column text-right">
										{item.comparePrice > 0 && (
											<span className="text-linethrough">{formatMoney(item.comparePrice)}</span>)}
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
