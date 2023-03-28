/* global tStrings tSettings */
const tSettings = global.config.tSettings;
const tStrings = global.config.tStrings;

import React from 'react';
import PropTypes from 'prop-types';

import SvgTag from '@/images/icons/tag.svg';
import SvgGift from '@/images/icons/gift.svg';
import SvgCloseCircle from '@/images/icons/close-circle.svg';
import { isSwellCode, formatMoney } from '@/modules/utils';
import { Collapse, Button } from 'react-bootstrap';

export default class CartDiscountForm extends React.Component {
	constructor(props) {
		super(props);
		this.textInput = React.createRef();
		this.focusTextInput = this.focusTextInput.bind(this);
		this.state = {
			code: '',
			prevCode: '',
			error: '',
			openForm: false,
		};
	}

	componentDidMount() {
		if (this.props.code) {
			this.setState({ code: this.props.code, prevCode: this.props.code });
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (prevState.prevCode !== nextProps.code) {
			return {
				prevCode: nextProps.code,
				code: nextProps.code,
				error: nextProps.error,
			};
		}

		return {
			error: nextProps.error,
		};
	}

	onTextChange = (e) => {
		const { target: { value } } = e;
		this.setState({ code: value });
	}

	onKeyUp = (e) => {
		if (e.keyCode === 13) {
			this.applyDiscount(e);
		}
	}

	applyDiscount = (e) => {
		console.log('e', e);
		e.stopPropagation();
		this.setState((prevState) => ({ code: prevState.code.trim() }), () => {
			this.props.onApply(this.state.code);
			this.state.code = this.props.code;
		});
	}

	removeDiscount = (e) => {
		e.stopPropagation();
		this.props.onRemove();
	}

	removeGiftCard = (e) => {
		e.stopPropagation();
		this.props.onRemoveGiftCard();
	}

	focusTextInput() {
		console.log();
		this.setState({ openForm: !this.state.openForm });
		setTimeout(() => {
			// this.textInput.current.focus();
		}, 300);
	}

	render() {
		const {
			isApplied,
			loading,
			isAutoDiscount,
			errorExtra,
			discAmount,
			appliedGiftCard,
		} = this.props;
		const {
			code,
			error,
			openForm,
		} = this.state;

		const hasCode = isApplied || !!appliedGiftCard.code;
		const isSwellDiscCode = isSwellCode(code);

		return hasCode ? (
			<div className="mt-2 d-flex flex-column align-items-start">
				<input type="hidden" name="discount" value={code} />
				<p className="font-size-xs text-muted mb-1">{appliedGiftCard.code !== '' && appliedGiftCard.lastCharacters ? 'Gift card applied' : tStrings.cart_discount_applied}</p>
				<div className="bg-light d-flex align-items-center d-inline-block p-1 text-black-50 rounded">
					{isSwellDiscCode && (
						<>
							<SvgGift className="svg mr-1" />
							{`${formatMoney(discAmount)} off`}
							<button className="btn-unstyled ml-1 text-black-50" onClick={this.removeDiscount} type="button" aria-label="Remove Discount" data-cy="cart-removepromo-icon">
								<SvgCloseCircle className="svg" />
								222
							</button>
						</>
					)}
					{!isSwellDiscCode && code !== '' && !isAutoDiscount && (
						<span className="mr-1">
							<SvgTag className="svg mr-1" />
							{code}
							{!isAutoDiscount && (
								<button className="btn-unstyled ml-1 text-black-50" onClick={this.removeDiscount} type="button" aria-label="Remove Discount" data-cy="cart-removepromo-icon">
									<SvgCloseCircle className="svg" />
								</button>
							)}
						</span>
					)}
					{!isSwellDiscCode && code !== '' && isAutoDiscount && (
						<span className="mr-1">
							<SvgTag className="svg mr-1" />
							{code}
							{!isAutoDiscount && (
								<button className="btn-unstyled ml-1 text-black-50" onClick={this.removeDiscount} type="button" aria-label="Remove Discount" data-cy="cart-removepromo-icon">
									<SvgCloseCircle className="svg" />
								</button>
							)}
						</span>
					)}
					{appliedGiftCard.code && appliedGiftCard.lastCharacters && (
						<span className="mr-1">
							<SvgGift className="svg font-size-sm mr-1" />
							{appliedGiftCard.lastCharacters}
							<button className="btn-unstyled ml-1 text-black-50" onClick={this.removeGiftCard} type="button" aria-label="Remove Gift" data-cy="cart-removegift-icon">
								<SvgCloseCircle className="svg" />
								789
							</button>
						</span>
					)}
					{appliedGiftCard.code && appliedGiftCard.lastCharacters && (
						<span className="mr-1">
							<SvgGift className="svg font-size-sm mr-1" />
							{appliedGiftCard.lastCharacters}
							<button className="btn-unstyled ml-1 text-black-50" onClick={this.removeGiftCard} type="button" aria-label="Remove Gift" data-cy="cart-removegift-icon">
								<SvgCloseCircle className="svg" />
								456
							</button>
						</span>
					)}
				</div>
				{errorExtra && (
					<p className="small text-danger mt-1 mb-0">{tSettings.custom_error_codes_msg}</p>
				)}
			</div>
		) : (
			<div className="mt-2">
				<a onClick={this.focusTextInput} className={`text-body text-underline cart-drawer__discount-toggle ${!error ? 'collapsed' : ''}`} data-toggle="collapse" href="#cart-drawer__discount-form" role="button" aria-expanded={!!error} aria-controls="cart-drawer__discount-form" data-cy="applypromo-text">{tStrings.cart_discount_text}</a>
				<Collapse in={openForm}>
					<div className="input-group py-1">
						<input type="text" ref={this.textInput} name="discount" className="form-control text-body border-right-0" placeholder={tStrings.cart_discount_input} value={code} onChange={this.onTextChange} onKeyUp={this.onKeyUp} readOnly={loading} data-cy="cart-discount" aria-label={tStrings.cart_discount_input} />
						<button className="btn btn-link border border-left-0 rounded-left-0 font-weight-bold d-flex align-items-center" type="button" onClick={this.applyDiscount} disabled={!code} data-cy="cart-apply-btn">
							{loading ? (<div className="spinner-border" role="status" />) : tStrings.cart_discount_apply}
						</button>
					</div>
				</Collapse>
			</div>
		);
	}
}

CartDiscountForm.propTypes = {
	isApplied: PropTypes.bool.isRequired,
	code: PropTypes.string,
	isAutoDiscount: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	error: PropTypes.string.isRequired,
	errorExtra: PropTypes.bool,
	discAmount: PropTypes.string,
	onApply: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
	appliedGiftCard: PropTypes.object,
	onRemoveGiftCard: PropTypes.func.isRequired,
};

CartDiscountForm.defaultProps = {
	appliedGiftCard: {},
};
