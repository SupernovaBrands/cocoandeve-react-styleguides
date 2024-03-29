/* global Cart */
import dynamic from 'next/dynamic';
import React from 'react';
import PropTypes from 'prop-types';

// import { debounce } from '@/modules/utils';

import SvgPlus from '@/images/icons/plus.svg';
import SvgMinus from '@/images/icons/minus.svg';
const { debounce } = dynamic(() => import('@/modules/utils'), {
    ssr: false,
});
export default class QuantityBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			prevQuantity: props.quantity,
			quantity: `${props.quantity}`,
			lastStock: false,
		};

		this.debounceChangeQuantity = debounce(this.changeQuantity, 500);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.quantity && prevState.prevQuantity !== nextProps.quantity) {
			if (nextProps.productStock <= nextProps.quantity) {
				return {
					prevQuantity: nextProps.quantity,
					quantity: `${nextProps.quantity}`,
				};
			}
			return {
				prevQuantity: nextProps.quantity,
				quantity: `${nextProps.quantity}`,
				lastStock: false,
			};
		}
		if (nextProps.productStock <= prevState.quantity) {
			return {
				prevQuantity: nextProps.quantity,
				quantity: `${nextProps.productStock}`,
				lastStock: true,
			};
		}
		return {
			lastStock: false,
		};
	}

	onAddQuantity = (e) => {
		e.preventDefault();

		const qty = parseInt(this.state.quantity, 10);
		this.setState({ quantity: qty + 1 });
		/*
		if (qty < 99) {
			this.setState(
				{ quantity: qty + 1 },
				() => {
					this.debounceChangeQuantity();
					const inventory = this.props.productStock;
					const id = this.props.productId;
					if (inventory && id) {
						let remaining = inventory;
						if (this.props.isPdp) {
							const itemInCart = Cart.getItem(id);
							if (itemInCart) {
								remaining -= itemInCart.quantity;
							}
						}
						if (this.state.quantity === remaining) {
							this.setState({ lastStock: true });
						}
					}
				},
			);
		}
		*/
	}

	onSubtractQuantity = (e) => {
		e.preventDefault();
		const qty = parseInt(this.state.quantity, 10);
		const min = this.props.allowZero ? 0 : 1;
		this.setState(
			{ quantity: qty - 1 }
		);
		/*
		if (this.state.quantity > min) {
			this.setState(
				{ quantity: qty - 1 },
				() => {
					this.debounceChangeQuantity();
					const inventory = this.props.productStock;
					if (inventory) {
						const remaining = inventory;
						if (this.state.quantity < remaining && !this.props.isLastStock) {
							this.setState({ lastStock: false });
						}
					}
				},
			);
		}
		*/
	}

	onFocus = (e) => {
		const $el = $(e.target);
		setTimeout(function () {
			$el.select();
		}, 50);
	}

	onChangeQuantity = (e) => {
		const { target: { value }, nativeEvent } = e;
		const qty = parseInt(value, 10);
		if (nativeEvent.data === 'e') return;
		const min = this.props.allowZero ? 0 : 1;
		if (value === '' || qty < min) {
			this.setState(
				{ quantity: `${min}` },
			);
		} else if (!Number.isNaN(qty) && qty <= 99) {
			this.setState(
				{ quantity: `${qty}` },
				() => {
					this.debounceChangeQuantity();
				},
			);
		}
	}

	changeQuantity = () => {
		this.props.onChangeQuantity(this.state.quantity, (newQty) => {
			this.setState({ quantity: `${newQty}` });
		});
	}

	render() {
		return (
			<div className="quantity-box d-flex">
				<button
					className="input-group-text bg-transparent border-end-0 rounded-0 rounded-start border-dark flex-grow-0"
					type="button"
					aria-label="Add Subtract"
					disabled={!this.props.editable || this.state.prevQuantity === 0}
					onClick={this.onSubtractQuantity}
					data-cy="cart-subtract-quantity-icon"
				>
					<SvgMinus className="svg" />
				</button>
				<input
					type="number"
					name={this.props.name}
					className="form-control border-start-0 border-end-0 rounded-0 p-0 text-center flex-grow-0 bg-transparent text-body border-dark font-size-dt-lg"
					value={this.state.quantity}
					onChange={this.onChangeQuantity}
					onFocus={this.onFocus}
					readOnly={!this.props.editable}
					aria-label="quantity input"
				/>
				<button
					className="input-group-text bg-transparent rounded-0 rounded-end  border-start-0 border-dark flex-grow-0"
					type="button"
					aria-label="Add Quantity"
					disabled={!this.props.editable || this.state.lastStock}
					onClick={this.onAddQuantity}
					data-cy="cart-add-quantity-icon"
				>
					<SvgPlus className="svg" />
				</button>
			</div>
		);
	}
}

QuantityBox.propTypes = {
	name: PropTypes.string.isRequired,
	editable: PropTypes.bool.isRequired,
	quantity: PropTypes.number.isRequired,
	onChangeQuantity: PropTypes.func,
	allowZero: PropTypes.bool,
	productId: PropTypes.number.isRequired,
	productStock: PropTypes.number.isRequired,
	isLastStock: PropTypes.bool.isRequired,
	isPdp: PropTypes.bool,
};

QuantityBox.defaultProps = {
	onChangeQuantity: () => {},
	allowZero: true,
};
