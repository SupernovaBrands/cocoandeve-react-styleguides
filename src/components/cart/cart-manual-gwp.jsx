/* global tStrings */

import React from 'react';
import PropTypes from 'prop-types';

import { isItemIdInKey } from '@/modules/utils';

import SvgChevronPrev from '@/images/icons/chevron-prev.svg';
import SvgChevronNext from '@/images/icons/chevron-next.svg';

export default class CartManualGwp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showScroll: false,
		};

		if (props.items && props.items.length > 3) {
			this.state.showScroll = true;
		}
	}

	scroll = (direction) => {
		const el = this.scrollRef;
		const left = el.scrollLeft;
		const offset = direction === 'left' ? -116 : 116;
		el.scrollTo({ left: left + offset });
	}

	markText = (price) => ({ __html: `${tStrings.items_worth} ${price}` });

	render() {
		const {
			title,
			maxSelected,
			selectedKey,
			items,
			onAddItem,
			onRemoveItem,
			loading,
			processingId,
		} = this.props;
		return (
			<div className="manual-gwp position-relative">
				<p className="font-size-base fw-bold mb-0">{title}</p>
				<p className="font-size-base text-gray-600">{`${selectedKey.length}/${maxSelected} ${tStrings.items_selected}`}</p>
				<button className={`position-absolute btn-unstyled text-primary manual-gwp__left ${this.state.showScroll ? '' : 'd-none'}`} aria-hidden="true" type="button" onClick={() => this.scroll('left')}>
					<SvgChevronPrev className="svg" />
					<span className="d-none">Left</span>
				</button>
				<button className={`position-absolute btn-unstyled text-primary manual-gwp__right ${this.state.showScroll ? '' : 'd-none'}`} aria-hidden="true" type="button" onClick={() => this.scroll('right')}>
					<SvgChevronNext className="svg" />
					<span className="d-none">Right</span>
				</button>
				<ul className="list-unstyled manual-gwp__container d-flex mb-0 text-center" ref={(r) => { this.scrollRef = r; }}>
					{items.map((item) => {
						const isLoading = loading && processingId === item.id;
						const isSelected = !!(selectedKey && selectedKey.find((key) => isItemIdInKey(key, item.id)));
						return (
							<li key={item.id} className="manual-gwp__item d-flex flex-column mr-2">
								<figure className="mb-0">
									<picture className="d-block">
										<img src={item.image} alt={item.title} className="w-100 overflow-hidden rounded-circle" loading="lazy" />
									</picture>
									<figcaption className="position-relative mt-n1" dangerouslySetInnerHTML={this.markText(item.price)} />
								</figure>
								<p className="flex-grow-1 my-1 font-size-base">{item.title}</p>
								<button
									type="button"
									className={`btn btn-sm btn-block px-1 btn-${isSelected ? 'primary' : 'outline-primary'}`}
									onClick={() => {
										if (isSelected) {
											onRemoveItem(item.id);
										} else { onAddItem(item.id); }
									}}
									data-cy="cart-addfreegift-btn"
								>
									{isLoading && (
										<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
									)}
									{!isLoading && (isSelected ? tStrings.items_manual_remove : tStrings.items_manual_add)}
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

CartManualGwp.propTypes = {
	title: PropTypes.string.isRequired,
	maxSelected: PropTypes.number.isRequired,
	selectedKey: PropTypes.array.isRequired,
	items: PropTypes.array.isRequired,
	onAddItem: PropTypes.func.isRequired,
	onRemoveItem: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	processingId: PropTypes.number.isRequired,
};
