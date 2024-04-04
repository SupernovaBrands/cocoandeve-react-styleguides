import React, { ChangeEvent } from 'react';
import Close from '@/images/icons/close.svg';
import PercentSquare from '@/images/icons/percent-square.svg';

interface Product {
	name: string
	img: string
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
	<div className="modal-content bg-white relative">
		<Close onClick={handleClose} className="svg cursor-pointer svg--current-color close absolute font-size-base w-g h-g top-[1em] right-[1em]"/>
		<div className="modal-body text-center px-3 lg:px-4 py-4">
			<PercentSquare className="svg svg--current-color mb-3 h-[2.25em] text-body mx-auto" />
			<p className="text-xl mb-0 font-bold">{title}</p>
			<p className="mb-3 mx-n1">{description}</p>
			{products.map((product) => {
				return (
					<form action="" className="flex mb-3">
						<figure className="flex mb-0">
							<a href="#" className="flex-shrink-0">
								<picture className="block">
									<source srcSet="https://via.placeholder.com/115x115" media="(min-width: 992px)" />
									<img src="https://via.placeholder.com/115x115" alt="" className="w-full" />
								</picture>
							</a>
							<figcaption className="flex flex-col pl-g text-left py-1 justify-center pr-1 lg:pr-2">
								<span className="font-bold font-size-sm mb-2">Like A Virgin Hair Masque</span>
								<button type="button" className="p-1 flex justify-between btn btn-choose btn-primary btn-block product-card-btn mb-0 font-size-sm font-weight-normal">
									<span className="product-card-btn__text">Add</span>
									<span className="product-card-btn__prices">
										<span className="text-linethrough">$44.90</span>
										<span className="">$34.90</span>
									</span>
								</button>
							</figcaption>
						</figure>
					</form>
				);
			})}
		</div>
	</div>
);

export default CheckoutUpsell;
