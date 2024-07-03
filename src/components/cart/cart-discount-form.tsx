import React, { Component, ChangeEvent, KeyboardEvent } from 'react';
import Button from '../Button';
import PropTypes from 'prop-types';
import SvgPercent from '~/images/icons/percent-square.svg';
import MenuBannerDecorative from '~/images/icons/menu-banner-decoration.svg';
import DiscountTag from '~/images/icons/tag.svg';
import CloseIcon from '~/images/icons/close-circle.svg';

interface Props {
    isApplied: boolean;
    code?: string;
    isAutoDiscount: boolean;
    error: string;
    errorExtra?: boolean;
    discAmount: any;
	isEmptyCart: boolean;
    appliedGiftCard: {
        code?: string;
        lastCharacters?: string;
    };
    discountBanner: any;
    onApply: (code: string, updateCart: boolean) => void;
    onRemove: () => void;
    onRemoveGiftCard: () => void;
}

interface State {
    code: string;
    prevCode: string;
    error: string;
    openForm: boolean;
    loading: boolean;
}

export default class CartDiscountForm extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            code: props.code || '',
            prevCode: props.code || '',
            error: props.error,
            openForm: false,
            loading: false,
        };
    }

    componentDidMount() {
        if (this.props.code) {
            this.setState({ code: this.props.code, prevCode: this.props.code });
        }
        // const { isApplied, error } = this.props;
        // if (!isApplied && error) {
        //     this.setState({code: ''});
        //     this.props.onApply('', false);
        // }
    }

    // static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    //     if (prevState.prevCode !== nextProps.code) {
    //         return {
    //             prevCode: nextProps.code,
    //             code: nextProps.code,
    //             error: nextProps.error,
    //         };
    //     }

    //     return {
    //         error: nextProps.error,
    //     };
    // }

    onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        this.setState({ code: value });
    };

    onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
			// @ts-ignore
            this.applyDiscount(e);
            e.preventDefault();
            return false;
        }
    };

    applyDiscount = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        if (this.state.code) {
            this.setState((prevState) => ({ code: prevState.code.trim(), loading: true }), async () => {
                const apply:any = await this.props.onApply(this.state.code, true);
                if (apply && !apply.discountData?.isValid && apply.discountData?.error) {
                    this.props.onApply('', false);
                }
                this.setState({code: this.state.code || '', loading: false});
            });
        }
    };

    removeDiscount = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        this.setState({loading: true});
        await this.props.onRemove();
        this.setState({loading: false, code: ''});
    };

    removeGiftCard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        this.props.onRemoveGiftCard();
    };

    applyBanner = (e:any) => {
		e.stopPropagation();
		const c = this.props?.discountBanner?.code_banner_code || '';
		this.setState(() => ({ code: c.trim(), loading: true }), async () => {
            const apply:any = await this.props.onApply(this.state.code, true);
            if (apply && !apply.discountData?.isValid && apply.discountData?.error) {
                this.props.onApply('', false);
            }
            this.setState({ code: this.state.code || '', loading: false });
		});
	}

    render() {
        const { isApplied, error, appliedGiftCard, discountBanner } = this.props;
        const { code } = this.state;
        const hasCode = isApplied || !!appliedGiftCard.code;
        // Assuming that SvgTag, SvgGift, and SvgCloseCircle are imported as React components

        return (
            <>
                <div className="py-g cart-drawer__discount-form">
                    <div className={`${hasCode ? 'hidden' : 'flex'} flex-nowrap py-0`}>
                        <input
                            type="text"
                            name="discount"
                            className={`field block appearance-none w-3/4 border mr-1 text-base leading-normal border rounded-h outline-none mb-0 ${code ? 'border-0 bg-gray-400' : 'focus:border-black border-black bg-white'}`}
                            placeholder="Enter promo code here"
                            value={code}
                            onChange={this.onTextChange}
                            onKeyUp={this.onKeyUp}
                            onKeyDown={this.onKeyUp}
                            aria-label="Discount code input"
                            readOnly={this.state.loading}
                        />
						<Button
							lg={false}
							buttonClass={`w-1/4 px-1 min-w-[100px] ${code ? 'btn-outline-primary hover:underline' : 'border-black text-black'}`}
                            onClick={this.applyDiscount}
                            disabled={!code}
							>
                            {this.state.loading ? <div className="spinner-border !w-[25px] !h-[25px]" role="status" /> : 'Apply'}
						</Button>
                    </div>
                    { hasCode && <div className="mt-0 flex flex-col items-start mb-25">
                        <p className="text-xs text-gray-500 mb-1">Promo code applied </p>
                        <div className="bg-gray-100 items-center inline-flex px-1 py-[11.25px] text-[#00000080] rounded-h">
                            <DiscountTag className="svg text-gray-100 fill-[#00000080]"></DiscountTag>
                            <span className="mx-1 text-sm">
                                {code?.toUpperCase()}
                            </span>
                            { !this.state.loading && <CloseIcon className="svg text-gray-100 fill-[#00000080] mr-1" onClick={this.removeDiscount}></CloseIcon> }
                            { this.state.loading && <span className="spinner-border spinner-border-sm text-[#00000080] mr-1 !w-[12px] !h-[12px] mr-1" role="status" /> }
                        </div>
                    </div> }
                    { !isApplied && error && <p className="text-primary text-xs my-1">{error}</p> }
                    {discountBanner?.enable && !hasCode && (
                    <div className="discount__banner relative m-0 md:mb-25 flex px-g py-1 bg-pink-light mt-1 hover:cursor-pointer w-[calc(100%-10px)]" onClick={this.applyBanner}>
                        <SvgPercent className="text-primary svg percent svg--current-color h-[2em]" />
                        <div className="mobile-nav__banner-content pl-g flex justify-between w-full">
                            <p className="mb-0 font-size-sm" dangerouslySetInnerHTML={{__html: discountBanner.code_banner_content}}/>
                            <span className="flex text-primary font-bold items-center hover:cursor-pointer">Use</span>
                        </div>
                        <MenuBannerDecorative className="svg absolute banner-decoration" />
                    </div>
                    )}
                </div>
            </>
        );
    }
}

// @ts-ignore
CartDiscountForm.propTypes = {
    isApplied: PropTypes.bool,
    code: PropTypes.string,
    isAutoDiscount: PropTypes.bool,
    error: PropTypes.string,
    errorExtra: PropTypes.bool,
    discAmount: PropTypes.any,
    onApply: PropTypes.func,
    onRemove: PropTypes.func,
    appliedGiftCard: PropTypes.shape({
        code: PropTypes.string,
        lastCharacters: PropTypes.string,
    }),
    onRemoveGiftCard: PropTypes.func,
};

// @ts-ignore
CartDiscountForm.defaultProps = {
    appliedGiftCard: {},
};
