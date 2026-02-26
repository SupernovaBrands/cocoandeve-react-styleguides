/* global Cart */
import React from 'react';
import PropTypes from 'prop-types';

import { debounce } from '~/modules/utils';

import SvgPlus from '~/images/icons/plus.svg';
import SvgMinus from '~/images/icons/minus.svg';
// const { debounce } = dynamic(() => import('~/modules/utils'), {
//     ssr: false,
// });
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
		if (prevState.updateQuantity) {
			return {
				quantity: nextProps.quantity,
				updateQuantity: false,
			}
		}
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
		this.setState(
			{ quantity: qty + 1 },
			() => {
				this.debounceChangeQuantity();
			},
		);

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
		if (this.state.quantity > min) {
			this.setState(
				{ quantity: qty - 1 >= 0 ? qty - 1 : 0 },
				() => {
					this.debounceChangeQuantity();
				},
			);
		}
	}

	onFocus = (e) => {
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

	changeQuantity = async () => {
		await this.props.onChangeQuantity(this.state.quantity);
		this.setState({updateQuantity: true});
	}

	render() {
		return (
			<div className="quantity-box flex border border-[#A3A3A3] min-h-[50px]">
				<button
					className="quantity-box__button px-[16px] py-[12px] grow-0"
					type="button"
					aria-label="Add Subtract"
					disabled={!this.props.editable || this.state.prevQuantity === 0}
					onClick={this.onSubtractQuantity}
					data-cy="cart-subtract-quantity-icon"
				>
					{/* <SvgMinus className={`svg w-[1em] ${!this.props.editable ? 'fill-gray-500' : ''}`} /> */}
					<span>-</span>
				</button>
				<input
					type="number"
					name={this.props.name}
					className="text-body border-dark text-center text-[14px] lg:text-[14px] w-[2em] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-0 p-0"
					min={0}
					value={this.state.quantity}
					onChange={this.onChangeQuantity}
					onFocus={this.onFocus}
					readOnly={!this.props.editable}
					aria-label="quantity input"
				/>
				<button
					className="quantity-box__button px-[16px] py-[12px]"
					type="button"
					aria-label="Add Quantity"
					disabled={!this.props.editable || this.state.lastStock}
					onClick={this.onAddQuantity}
					data-cy="cart-add-quantity-icon"
				>
					{/* <SvgPlus className={`svg w-[1em] ${!this.props.editable ? 'fill-gray-500' : ''}`} /> */}
					<span>+</span>
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
	productId: PropTypes.number,
	productStock: PropTypes.number,
	isLastStock: PropTypes.bool.isRequired,
	isPdp: PropTypes.bool,
};

QuantityBox.defaultProps = {
	onChangeQuantity: () => {},
	allowZero: true,
};
