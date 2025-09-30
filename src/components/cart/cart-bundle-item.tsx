import '~/config';

import React from 'react';

import QuantityBox from '~/components/cart/quantity-box';
import SvgTrash from '~/images/icons/trash.svg';
import { formatMoney } from '~/modules/utils';

type CartBundleProps = {
	item?: any;
	onRemoveItem: any;
	store?: any;
    isBundleItem?: any;
    platform: string;
}

export const CartBundleItem = (props:CartBundleProps) => {
	const { platform, onRemoveItem, item,  store, isBundleItem } = props;
    const component = isBundleItem(item);
    const parsedComp = JSON.parse(component?.value || '[]') || [];

	const percentChange = ((item.priceAfterDiscounted - item.originalPrice) / item.originalPrice) * 100;
	const percentAmt = parseInt(Math.abs(percentChange).toFixed(0), 10);

	return parsedComp.length > 0 ? parsedComp.map((comp, index) => {
		const origPrice = parseInt(comp.oldPrice, 10);
		const newPrice = origPrice - (percentAmt / 100) * origPrice;
		return (
			<li key={`cart-bundle-item-${index}`} className={`cart-item ${item?.isLoading ? 'opacity-50 pointer-events-none' : ''}`} data-mod={item.modified}>
				<figure className="flex flex-wrap py-2 mb-0 items-start -mx-hg lg:-mx-g">
					<span className="w-3/12 px-hg lg:px-g">
						<picture>
							<img src={comp.image.replace('/public', '/150x')} className="w-full object-contain bg-pink-light h-[78px]" alt={`Bundle item of ${comp.title}`} loading="lazy" width="78" height="78" />
						</picture>
					</span>
					<figcaption className="w-9/12 px-hg lg:px-g">
						<div className="inline-flex badge rounded-[.5rem] py-[.125rem] px-[.5rem] lg:px-[.5rem] bg-primary font-normal text-xs text-white mb-25">
							<span className={`${platform === 'os-mac' || platform === 'os-ios' ? 'relative top-[1px]' : ''} ${platform === 'os-android' ? 'relative top-[1.5px]' : ''}`}>Bundle Builder Discount</span>
						</div>
						<div className="flex items-start no-gutters justify-between">
							<p className="mb-1 font-bold w-2/3 pl-0">
								<span className="text-black">
									{comp.title}
								</span>
							</p>
							{index === 0 && (
								<button className="cart-item__remove btn-unstyled text-body flex"
									type="button" aria-label="Remove"
									onClick={() => onRemoveItem(item)} data-cy="cart-remove-icon">
										<SvgTrash className="svg w-[1em]" />
								</button>
							)}
						</div>

						<div className="flex items-center justify-between">
							<QuantityBox
								name="quantity-box"
								editable={false}
								quantity={1}
								// onChangeQuantity={(newQty:number, callback:any) => onChangeQuantity(item, newQty, callback)}
								isLastStock={false}
								// productId={productId}
								// productStock={productStock}
								// isModified={item.modified}
								// originalQuantity={item.original_quantity}
								// allowZero={true}
							/>
							<div className="flex flex-col text-right">
								<>
									{parseInt(comp.oldPrice, 10) > 0 && <span className="line-through">{formatMoney(parseInt(comp.oldPrice, 10), false, store)}</span>}
									<strong>{formatMoney(newPrice)}</strong>
								</>
							</div>
						</div>
					</figcaption>
				</figure>

				{item.showPreorderNotif?.show && (
					<span className="block mb-2 text-sm">{item.showPreorderNotif?.note || ''}</span>
				)}
				{item.showPreorderNotif_2?.show && (
					<span className="block mb-2 text-sm">{item.showPreorderNotif_2?.note}</span>
				)}
				{item.showPreorderNotif_3?.show && (
					<span className="block mb-2 text-sm">{item.showPreorderNotif_3?.note}</span>
				)}
			</li>

			)
	}) : (<></>)
}

export default CartBundleItem;
