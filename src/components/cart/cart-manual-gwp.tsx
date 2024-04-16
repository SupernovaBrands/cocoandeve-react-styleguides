/* global tStrings */
// @ts-nocheck
import dynamic from 'next/dynamic';
import React from 'react';
import PropTypes from 'prop-types';

import { isItemIdInKey } from '~/modules/utils';
const tStrings = global.config.tStrings;

import SvgChevronPrev from '~/images/icons/chevron-prev.svg';
import SvgChevronNext from '~/images/icons/chevron-next.svg';
import Button from '../Button';
// const { isItemIdInKey } = dynamic(() => import('~/modules/utils'), {
//     ssr: false,
// });
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

	markText = (price) => ({ __html: `Worth ${price}` });

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
			<div className="manual-gwp relative mt-2">
				<p className="text-base font-bold mb-0">{title}</p>
				<p className="text-base text-gray-600">{`${selectedKey.length}/${maxSelected} ${tStrings.items_selected}`}</p>
				<button className={`absolute btn-unstyled text-primary manual-gwp__left ${this.state.showScroll ? '' : 'hidden'}`} aria-hidden="true" type="button" onClick={() => this.scroll('left')}>
					<SvgChevronPrev className="svg" />
					<span className="hidden">Left</span>
				</button>
				<button className={`absolute btn-unstyled text-primary manual-gwp__right ${this.state.showScroll ? '' : 'hidden'}`} aria-hidden="true" type="button" onClick={() => this.scroll('right')}>
					<SvgChevronNext className="svg" />
					<span className="hidden">Right</span>
				</button>
				<ul className="list-unstyled manual-gwp__container flex mb-0 text-center mt-1 mb-2" ref={(r) => { this.scrollRef = r; }}>
					{items.map((item) => {
						const isLoading = loading && processingId === item.id;
						const isSelected = !!(selectedKey && selectedKey.find((key) => isItemIdInKey(key, item.id)));
						return (
							<li key={item.id} className="manual-gwp__item flex flex-col mr-2 w-[6em] relative max-w-[6em]">
								<figure className="mb-0">
									<picture className="block">
										<img src={item.image} alt={item.title} className="w-full overflow-hidden rounded-full" loading="lazy" />
									</picture>
									<figcaption className="relative -mt-1 bg-gray-400 text-xs rounded" dangerouslySetInnerHTML={this.markText(item.price)} />
								</figure>
								<p className="grow my-1 text-base h-full">{item.title}</p>
								<Button
									lg={false}
								    buttonClass="btn-outline-primary"
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
								</Button>
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
