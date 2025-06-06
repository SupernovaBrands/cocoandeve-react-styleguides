import React, { useState, useEffect, Component, ChangeEvent, KeyboardEvent, useRef } from 'react';
import Button from '../Button';
import SvgPercent from '~/images/icons/percent-square.svg';
import MenuBannerDecorative from '~/images/icons/menu-banner-decoration.svg';
import DiscountTag from '~/images/icons/tag.svg';
import CloseIcon from '~/images/icons/close-circle.svg';

export const CartDiscountForm = (props:any) => {
    const stateData = {
        code: props.code || '',
        prevCode: '',
        error: props.error || '',
        openForm: false,
        loading: null,
        hasCode: props.isApplied || !!props.appliedGiftCard.code,
        applyBanner: false,
        applyCode: false,
        isApplied: props.isApplied || false,
        appliedGiftCard: props.appliedGiftCard || {code: ''},
        discountBanner: props.discountBanner || {enable: false, code_banner_content: ''},
    };

    const [state, setState] = useState(stateData);
    const [discInput, setDiscInput] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        const { isApplied, error } = props;
        if (!isApplied && error) {
            setState({ ...state, code: '', error: '' });
            props.onApply('', false);
        }
    }, []);

    useEffect(() => {
        const stateData = {
            ...state,
            code: props.code || '',
            prevCode: props.code || '',
            error: props.error,
            isApplied: props.isApplied,
            appliedGiftCard: props.appliedGiftCard,
            discountBanner: props.discountBanner,
            hasCode: props.isApplied || !!props.appliedGiftCard.code,
        };
        setState(stateData);
    }, [props]);

    useEffect(() => {
        setState({ ...state, error: '' });
    }, []);

    const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setState({ ...state, code: value });
        setDiscInput(e.target.value);
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
        if (state.code && state.code?.trim() !== '' && !state.loading) {
            setState({ ...state, code: state.code.trim(), loading: true, applyCode: true });
        }
        if (discInput && discInput.trim() !== '' && !state.loading) {
            setState({ ...state, code: discInput.trim(), loading: true, applyCode: true})
        }
    };

    const removeDiscount = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setState({...state, loading: true});
        await props.onRemove();
        setState({...state, loading: false, code: '', isApplied: false, error: ''});
        if (inputRef) inputRef.current.value = '';
        setDiscInput('');
    };

    const removeGiftCard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        props.onRemoveGiftCard();
    };

    const applyBanner = async (e:any) => {
		e.stopPropagation();
		const c = props?.discountBanner?.code_banner_code || '';
		setState({ ...state, code: c.trim(), loading: true, applyBanner: true });
	}

    const applyCodeBanner = async () => {
        const apply:any = await props.onApply(state.code, true);
        if (apply && !apply.discountData?.isValid && apply.discountData?.error && !apply.needRemoveCode) {
            props.onApply('', false);
        }
        setState({ ...state, code: state.code || '', loading: false, applyBanner: false });
    }

    const applyCode = async () => {
        const apply:any = await props.onApply(state.code, true);
        if (apply && !apply.discountData?.isValid && apply.discountData?.error && !apply.needRemoveCode) {
            props.onApply('', false);
        }
        setState({...state, code: state.code || '', loading: false, applyCode: false});
    }

    useEffect(() => {
        if (state.applyBanner && state.code) {
            applyCodeBanner();
        }
        if (state.applyCode && state.code) {
            applyCode();
        }
    }, [state]);

    return (
        <>
            <div className="py-g cart-drawer__discount-form">
                <div className={`${state.hasCode ? 'hidden' : 'flex'} flex-nowrap py-0`}>
                    <input
                        ref={inputRef}
                        type="text"
                        name="discount"
                        className={`field block appearance-none w-3/4 border mr-1 text-base leading-normal border rounded-h outline-none mb-0 ${state.code ? 'border-0 bg-gray-400' : 'focus:border-black border-black bg-white'}`}
                        placeholder="Enter promo code here"
                        onChange={onTextChange}
                        onKeyUp={onKeyUp}
                        onKeyDown={onKeyUp}
                        aria-label="Discount code input"
                        readOnly={state.loading}
                    />
                    <Button
                        lg={false}
                        buttonClass={`w-1/4 px-1 min-w-[100px] ${discInput ? 'btn-outline-primary hover:underline hover:bg-white hover:text-primary' : 'border-black text-black'}`}
                        onClick={applyDiscount}
                        disabled={!discInput}
                        >
                        {state.loading ? <div className="spinner-border !w-[25px] !h-[25px]" role="status" /> : 'Apply'}
                    </Button>
                </div>
                { state.hasCode && <div className="mt-0 flex flex-col items-start mb-0 md:mb-25">
                    <p className="text-xs text-gray-500 mb-1">Promo code applied </p>
                    <div className="bg-gray-100 items-center inline-flex px-1 py-1 text-[#00000080] rounded-h">
                        <DiscountTag className="svg text-gray-100 fill-[#00000080]"></DiscountTag>
                        <span className="mx-1 text-base">
                            {state.code?.toUpperCase()}
                        </span>
                        { !state.loading && <CloseIcon className="svg text-gray-100 fill-[#00000080] mr-1" onClick={(e:any) => removeDiscount(e)}></CloseIcon> }
                        { state.loading && <span className="spinner-border spinner-border-sm text-[#00000080] mr-1 !w-[12px] !h-[12px] mr-1" role="status" /> }
                    </div>
                </div> }
                { !state.isApplied && state.error && <p className="text-primary mt-1 text-[14px]">{state.error}</p> }
                {state.discountBanner?.enable && !state.hasCode && (
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
