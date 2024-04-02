import React, { Component, ChangeEvent, KeyboardEvent } from 'react';
import PropTypes from 'prop-types';

interface Props {
    isApplied: boolean;
    code?: string;
    isAutoDiscount: boolean;
    loading: boolean;
    error: string;
    errorExtra?: boolean;
    discAmount: any;
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
                <div className="my-2">
                    <div className={`${hasCode ? 'hidden' : 'flex'} flex-nowrap py-1`}>
                        <input
                            type="text"
                            ref={this.textInput}
                            name="discount"
                            className="block appearance-none w-3/4 py-1 px-2 mr-1 text-base leading-normal bg-gray-400 text-gray-800 border-0 rounded outline-none mb-0"
                            placeholder="Enter discount code"
                            value={code}
                            onChange={this.onTextChange}
                            onKeyUp={this.onKeyUp}
                            readOnly={loading}
                            aria-label="Discount code input"
                        />
                        <button
                            className="w-1/4 bg-transparent hover:bg-primary hover:text-white rounded border border-primary font-bold text-primary py-[9px] px-[5px]"
                            type="button"
                            onClick={this.applyDiscount}
                            disabled={!code}
                        >
                            {loading ? <div className="spinner-border" role="status" /> : 'Apply'}
                        </button>
                    </div>
                    {hasCode && <input type="hidden" name="discount" value={code} />}
                    {/* Display applied discounts */}
                    {/* Error message */}
                    {errorExtra && <p className="small text-danger mt-1 mb-0">Custom error message</p>}
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
