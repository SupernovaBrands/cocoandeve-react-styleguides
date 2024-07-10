import React, { useState, useEffect, Component, ChangeEvent, KeyboardEvent } from 'react';
import Button from '../Button';
import SvgPercent from '~/images/icons/percent-square.svg';
import MenuBannerDecorative from '~/images/icons/menu-banner-decoration.svg';
import DiscountTag from '~/images/icons/tag.svg';
import CloseIcon from '~/images/icons/close-circle.svg';

export const CartDiscountForm = (props:any) => {
    const stateData = {
        code: '',
        prevCode: '',
        error: '',
        openForm: false,
        loading: false,
        isApplied: false,
        appliedGiftCard: {code: ''},
        discountBanner: {enable: false, code_banner_content: ''},
    };

    const [state, setState] = useState(stateData);
    const { code } = state;
    const hasCode = state.isApplied || !!state.appliedGiftCard.code;

    useEffect(() => {
        if (props.code) {
            setState({ ...state, code: props.code, prevCode: props.code });
        }
        const { isApplied, error } = props;
        if (!isApplied && error) {
            setState({ ...state, code: '' });
            props.onApply('', false);
        }

        const stateData = {
            code: props.code || '',
            prevCode: props.code || '',
            error: props.error,
            openForm: false,
            loading: false,
            isApplied: props.isApplied,
            appliedGiftCard: props.appliedGiftCard,
            discountBanner: props.discountBanner,
        };

        setState(stateData);
    }, [props]);

    const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setState({ ...state, code: value });
    };

    const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
			// @ts-ignore
            applyDiscount(e);
            e.preventDefault();
            return false;
        }
    };

    const applyDiscount = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        if (state.code && !state.loading) {
            setState({ ...state, code: state.code.trim(), loading: true });
            const apply:any = await props.onApply(state.code, true);
            if (apply && !apply.discountData?.isValid && apply.discountData?.error) {
                props.onApply('', false);
            }
            setState({...state, code: state.code || '', loading: false});
        }
    };

    const removeDiscount = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setState({...state, loading: true});
        await props.onRemove();
        setState({...state, loading: false, code: '', isApplied: false, error: ''});
    };

    const removeGiftCard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        props.onRemoveGiftCard();
    };

    const applyBanner = async (e:any) => {
		e.stopPropagation();
		const c = props?.discountBanner?.code_banner_code || '';
		setState({ ...state, code: c.trim(), loading: true });
        const apply:any = await props.onApply(state.code, true);
        if (apply && !apply.discountData?.isValid && apply.discountData?.error) {
            props.onApply('', false);
        }
        setState({ ...state, code: state.code || '', loading: false });
	}

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
                        onChange={onTextChange}
                        onKeyUp={onKeyUp}
                        onKeyDown={onKeyUp}
                        aria-label="Discount code input"
                        readOnly={state.loading}
                    />
                    <Button
                        lg={false}
                        buttonClass={`w-1/4 px-1 min-w-[100px] ${code ? 'btn-outline-primary hover:underline' : 'border-black text-black'}`}
                        onClick={applyDiscount}
                        disabled={!code}
                        >
                        {state.loading ? <div className="spinner-border !w-[25px] !h-[25px]" role="status" /> : 'Apply'}
                    </Button>
                </div>
                { hasCode && <div className="mt-0 flex flex-col items-start mb-0 md:mb-25">
                    <p className="text-xs text-gray-500 mb-1">Promo code applied </p>
                    <div className="bg-gray-100 items-center inline-flex px-1 py-1 text-[#00000080] rounded-h">
                        <DiscountTag className="svg text-gray-100 fill-[#00000080]"></DiscountTag>
                        <span className="mx-1 text-base">
                            {code?.toUpperCase()}
                        </span>
                        { !state.loading && <CloseIcon className="svg text-gray-100 fill-[#00000080] mr-1" onClick={(e:any) => removeDiscount(e)}></CloseIcon> }
                        { state.loading && <span className="spinner-border spinner-border-sm text-[#00000080] mr-1 !w-[12px] !h-[12px] mr-1" role="status" /> }
                    </div>
                </div> }
                { !state.isApplied && state.error && <p className="text-primary text-sm my-1">{state.error}</p> }
                {state.discountBanner?.enable && !hasCode && (
                <div className="discount__banner relative m-0 md:mb-25 flex px-g py-1 bg-pink-light mt-1 hover:cursor-pointer w-[calc(100%-10px)]" onClick={applyBanner}>
                    <SvgPercent className="text-primary svg percent svg--current-color h-[2em]" />
                    <div className="mobile-nav__banner-content pl-g flex justify-between w-full">
                        <p className="mb-0 font-size-sm" dangerouslySetInnerHTML={{__html: state.discountBanner.code_banner_content}}/>
                        <span className="flex text-primary font-bold items-center hover:cursor-pointer">Use</span>
                    </div>
                    <MenuBannerDecorative className="svg absolute banner-decoration" />
                </div>
                )}
            </div>
        </>
    );

}

export default CartDiscountForm;