import React, { useState, useRef, useEffect } from 'react';

import { isItemIdInKey } from '~/modules/utils';

import SvgChevronPrev from '~/images/icons/chevron-prev.svg';
import SvgChevronNext from '~/images/icons/chevron-next.svg';
import Button from '../Button';

const CartManualGwp = (props:any) => {
	const [showScroll, setShowScroll] = useState(false);
	const scrollRef = useRef(null);
	const [adding, setAdding] = useState(false);
	const [processingId, setProcessingId] = useState([]);
	const {
		title,
		maxSelected,
		selectedKey,
		items,
		onAddItem,
		onRemoveItem,
	} = props;
	
	useEffect(() => {
		if (items?.length > 3) {
			setShowScroll(true);
		}
	}, [props])
	

	const scroll = (direction:any) => {
		const el = scrollRef.current;
		const left = el.scrollLeft;
		const offset = direction === 'left' ? -116 : 116;
		el.scrollTo({ left: left + offset });
	}

	const markText = (price:any) => ({ __html: `Worth ${price}` });

	const removeItem = async (id:any) => {
		setAdding(true);
		setProcessingId(id);
		await onRemoveItem(id);
		setAdding(false);
		setProcessingId(null);
	}

	const addItem = async (id:any) => {
		setAdding(true);
		setProcessingId(id);
		await onAddItem(id);
		setAdding(false);
		setProcessingId(null);
	}

	return (
			<div className="manual-gwp relative mt-2">
				<p className="text-base font-bold mb-0">{title}</p>
				<p className="text-base text-gray-600">{`${selectedKey.length}/${maxSelected} item${selectedKey.length > 1 ? 's' : ''} selected`}</p>
				{showScroll && (
					<>
						<button className={`absolute btn-unstyled text-primary manual-gwp__left ${showScroll ? '' : 'hidden'}`} aria-hidden="true" type="button" onClick={() => scroll('left')}>
							<SvgChevronPrev className="svg" />
							<span className="hidden">Left</span>
						</button>
						<button className={`absolute btn-unstyled text-primary manual-gwp__right ${showScroll ? '' : 'hidden'}`} aria-hidden="true" type="button" onClick={() => scroll('right')}>
							<SvgChevronNext className="svg" />
							<span className="hidden">Right</span>
						</button>
					</>
				)}
				<ul className="list-unstyled manual-gwp__container flex mb-0 text-center mt-[1rem] mb-2" ref={scrollRef}>
					{items?.filter((item) => item?.variantId !== '' && item?.handle !== '' && item?.enabledItem)?.map((item:any, index:number) => {
						const isLoading = adding && processingId === item.id;
						const isSelected = !!(selectedKey && selectedKey.find((key:any) => isItemIdInKey(key, item.id)));
						return (
							<li key={`${item.id}-${index}`} className="manual-gwp__item flex flex-col mr-2 w-[6em] relative max-w-[6em]">
								<figure className="mb-0">
									<picture className="block">
										<img src={item.image} alt={item.title} className="w-full overflow-hidden rounded-full" loading="lazy" />
									</picture>
									<figcaption className="relative -mt-1 bg-gray-400 text-xs rounded-h" dangerouslySetInnerHTML={markText(item.price ?? '$0')} />
								</figure>
								<p className="grow my-1 text-base h-full font-bold">{item.label}</p>
								<Button
									lg={false}
								    buttonClass={`${!isSelected ? 'hover:text-primary hover:bg-transparent lg:hover:bg-primary lg:hover:text-white' : ''} disabled:hover:bg-transparent disabled:hover:text-primary btn-outline-primary p-1 ${isSelected || isLoading ? 'bg-primary text-white hover:bg-primary' : ''}`}
									onClick={() => {
										if (!adding) {
											if (isSelected) {
												removeItem(item.variantId || item.id);
											} else { addItem(item.variantId || item.id); }
										}
									}}
									disabled={adding}
									data-cy="cart-addfreegift-btn"
								>
									{isLoading && (
										<span className="spinner-border spinner-border-sm !w-[15px] !h-[15px]" role="status" aria-hidden="true" />
									)}
									{!isLoading && (isSelected ? 'Remove' : 'Add')}
								</Button>
							</li>
						);
					})}
				</ul>
			</div>
	);
}

export default CartManualGwp;
