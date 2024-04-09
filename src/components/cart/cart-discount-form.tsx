import React, { Component, ChangeEvent, KeyboardEvent } from 'react';
import Button from '../Button';
import PropTypes from 'prop-types';
import SvgPercent from '@/images/icons/percent-square.svg';
import MenuBannerDecorative from '@/images/icons/menu-banner-decoration.svg';

interface Props {
    isApplied: boolean;
    code?: string;
    isAutoDiscount: boolean;
    loading: boolean;
    error: string;
    errorExtra?: boolean;
    discAmount: any;
	isEmptyCart: boolean;
    appliedGiftCard: {
        code?: string;
        lastCharacters?: string;
    };
    onApply: (code: string) => void;
    onRemove: () => void;
    onRemoveGiftCard: () => void;
}

interface State {
    code: string;
    prevCode: string;
    error: string;
    openForm: boolean;
}

export default class CartDiscountForm extends Component<Props, State> {
    private textInput = React.createRef<HTMLInputElement>();

    constructor(props: Props) {
        super(props);
        this.state = {
            code: props.code || '',
            prevCode: props.code || '',
            error: props.error,
            openForm: false,
        };
    }

    componentDidMount() {
        if (this.props.code) {
            this.setState({ code: this.props.code, prevCode: this.props.code });
        }
    }

    static getDerivedStateFromProps(nextProps: Props, prevState: State) {
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

    onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        this.setState({ code: value });
    };

    onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
			// @ts-ignore
            this.applyDiscount(e);
        }
    };

    applyDiscount = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        this.setState((prevState) => ({ code: prevState.code.trim() }), () => {
            this.props.onApply(this.state.code);
            this.setState({ code: this.props.code || '' });
        });
    };

    removeDiscount = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        this.props.onRemove();
    };

    removeGiftCard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        this.props.onRemoveGiftCard();
    };

    focusTextInput() {
        this.setState({ openForm: !this.state.openForm });
        setTimeout(() => {
            // this.textInput.current?.focus();
        }, 300);
    }

    render() {
        const { isApplied, loading, isAutoDiscount, errorExtra, discAmount, appliedGiftCard } = this.props;
        const { code } = this.state;
        const hasCode = isApplied || !!appliedGiftCard.code;
        // Assuming that SvgTag, SvgGift, and SvgCloseCircle are imported as React components

        return (
            <>
                <div className="mt-2 cart-drawer__discount-form">
                    <div className={`${hasCode ? 'hidden' : 'flex'} flex-nowrap py-1`}>
                        <input
                            type="text"
                            ref={this.textInput}
                            name="discount"
                            className={`field block appearance-none w-3/4 border mr-1 text-base leading-normal border rounded outline-none mb-0 ${code ? 'border-0 bg-gray-400' : 'focus:border-black border-black bg-white'}`}
                            placeholder="Enter discount code"
                            value={code}
                            onChange={this.onTextChange}
                            onKeyUp={this.onKeyUp}
                            readOnly={loading}
                            aria-label="Discount code input"
                        />
						<Button
							lg={false}
							buttonClass={`w-1/4 px-1 ${code ? 'btn-outline-primary hover:underline' : 'border-black text-black'}`}
                            onClick={this.applyDiscount}
                            disabled={!code}
							>
                            {loading ? <div className="spinner-border" role="status" /> : 'Apply'}
						</Button>
                    </div>
                    {hasCode && <input type="hidden" name="discount" value={code} />}
                    {/* Display applied discounts */}
                    {/* Error message */}
                    {errorExtra && <p className="small text-danger mt-1 mb-0">Custom error message</p>}
                </div>
                <div className="discount__banner relative m-0 flex px-g py-1 bg-pink-light mb-3">
					<SvgPercent className="text-primary svg percent svg--current-color h-[2em]" />
					<div className="mobile-nav__banner-content pl-g flex justify-between w-full">
						<p className="mb-0 font-size-sm">10% off on all bundles!<br />promocode: <b>AFTERPAY10</b></p>
						<span className="flex text-primary font-bold items-center hover:cursor-pointer">Use</span>
					</div>
					<MenuBannerDecorative className="svg absolute banner-decoration" />
				</div>
            </>
        );
    }
}

// @ts-ignore
CartDiscountForm.propTypes = {
    isApplied: PropTypes.bool.isRequired,
    code: PropTypes.string,
    isAutoDiscount: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    errorExtra: PropTypes.bool,
    discAmount: PropTypes.any,
    onApply: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    appliedGiftCard: PropTypes.shape({
        code: PropTypes.string,
        lastCharacters: PropTypes.string,
    }),
    onRemoveGiftCard: PropTypes.func.isRequired,
};

// @ts-ignore
CartDiscountForm.defaultProps = {
    appliedGiftCard: {},
};
