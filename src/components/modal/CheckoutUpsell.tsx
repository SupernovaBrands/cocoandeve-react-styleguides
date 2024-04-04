import React, { ChangeEvent } from 'react';
import PercentSquare from '@/images/icons/percent-square.svg';
import Button from '@/components/Button';
import CloseButton from './CloseButton';

interface Product {
	name: string
	src: string
	srcSet: string
	price: string
	crossedPrice?: string
	id: number
}
type CheckoutUpsellProps = {
	title: string
	description: string
	products: Product[]
	handleClose: (e: ChangeEvent<HTMLInputElement>) => void;
}
const CheckoutUpsell: React.FC<CheckoutUpsellProps> = ({ title, description, products, handleClose }) => (
	<div className="modal-content bg-white relative -mx-g border lg:border-0">
		<CloseButton handleClose={handleClose} />
		<div className="modal-body text-center px-3 lg:px-4 py-4">
			<PercentSquare className="svg svg--current-color mb-3 h-[2.25em] text-body mx-auto" />
			<p className="text-xl mb-0 font-bold">{title}</p>
			<p className="mb-3 mx-n1">{description}</p>
			{products.map((product) => {
				return (
					<form action="" className="flex mb-3">
						<figure className="flex grow mb-0">
							<a href="#" className="flex-shrink-0">
								<picture className="block">
									<source srcSet={product.srcSet} media="(min-width: 992px)" />
									<img src={product.src} alt="" className="w-full" />
								</picture>
							</a>
							<figcaption className="flex grow flex-col pl-g text-left py-1 justify-center pr-1 lg:pr-2">
								<span className="font-bold font-size-sm mb-2">{product.name}</span>
								<Button lg={false} buttonClass="flex btn-primary rounded-full font-size-sm justify-between p-1">
									<span className="product-card-btn__text font-normal">Add</span>
									<span className="product-card-btn__prices font-normal">
										{product.crossedPrice && (<span className="line-through mr-25">{product.crossedPrice}</span>)}
										<span className="">{product.price}</span>
									</span>
								</Button>
							</figcaption>
						</figure>
					</form>
				);
			})}
		</div>
	</div>
);

export default CheckoutUpsell;
