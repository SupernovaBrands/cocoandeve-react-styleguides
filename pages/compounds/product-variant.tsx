import Product from "@/compounds/ProductVariant";
import Help from '@/images/icons/help.svg';
import { useState } from "react";

const ProductVariants = () => {
	const [shade, setShade] = useState('medium');

	const swatchChange = (event: any) => {
		const shade = event.target.getAttribute('data-value');
		setShade(shade);
	};

	const shadeData = [
		{
			id: 'medium',
			text: '<b>Medium</b> - Subtle glow, lighter skin tones'
		},
		{
			id: 'dark',
			text: '<b>Dark</b> - Subtle glow, lighter skin tones'
		},
		{
			id: 'ultra-dark',
			text: '<b>Ultra Dark</b> - Subtle glow, lighter skin tones'
		},
	];

	const notes = ['1x Masque + Brush', '1x Other items', '1x No shade swatch test'];
	const notes2 = ['1x Masque + Brush', '1x Other items', '1x Super Hydrating Shampoo (250ml)'];

	return (
		<div className="container mt-4 mb-2 px-g">
			<h1>Product Variant</h1>
			<div className="flex flex-wrap mt-3">
				<form className="product-form w-full lg:w-2/5">
					<Product.Variant
						id="1x-sunny-honey-bali-bronzing-foam"
						checked={true}
						inventory="10"
						dataID="32068892426275"
						price="$44.90"
						className="mb-1"
					>
						<p className="mb-1 font-bold">
							1x Sunny Honey Bali Bronzing Foam
						</p>
						<p className="product-variant__description mb-1 font-size-sm">1x Masque + Brush</p>
						<Product.Swatch shadeData={shadeData} selectedSwatch={shade}>
							<button onClick={swatchChange} type="button" className={`variant-swatch medium me-2 border-[2px] ${shade === 'medium' ? 'border-primary' : 'border-white'}`} data-value="medium" data-id="32068891541539" />
							<button onClick={swatchChange} type="button" className={`variant-swatch dark me-2 border-[2px] ${shade === 'dark' ? 'border-primary' : 'border-white'}`} data-value="dark" data-id="32068891607075" />
							<button onClick={swatchChange} type="button" className={`variant-swatch ultra-dark border-[2px] ${shade === 'ultra-dark' ? 'border-primary' : 'border-white'}`} data-value="ultra-dark" data-id="32068891639843" />
						</Product.Swatch>
					</Product.Variant>

					<Product.Variant
						id="1x-sunny-honey-bali-bronzing-bundle"
						inventory="10"
						dataID="32068892426275"
						price="$44.90"
						compare="$89.80"
						className="mb-1"
					>
						<p className="mb-1 font-bold">
							1x Sunny Honey Bali Bronzing Bundle
							<span className="bg-primary text-white rounded font-normal font-size-sm px-1 inline-block lg:hidden py-[2px]">Save 30%</span>
						</p>
						<p className="product-variant__description mb-1 font-size-sm">1x Masque + Brush</p>
						<p className="product-variant__description mb-1 font-size-sm">1x Other items</p>
						<p className="product-variant__description mb-1 font-size-sm">1x Ultra dark OOS waitlist, dark oos</p>
						<Product.Swatch shadeData={shadeData} selectedSwatch={shade}>
							<button onClick={swatchChange} type="button" className={`variant-swatch medium me-2 border-[2px] ${shade === 'medium' ? 'border-primary' : 'border-white'}`} data-value="medium" data-id="32068891541539" />
							<button onClick={swatchChange} type="button" className={`oos variant-swatch dark me-2 border-[2px] ${shade === 'dark' ? 'border-primary' : 'border-white'}`} data-value="dark" data-id="32068891607075" />
							<button onClick={swatchChange} type="button" className={`oos variant-swatch ultra-dark border-[2px] ${shade === 'ultra-dark' ? 'border-primary' : 'border-white'}`} data-value="ultra-dark" data-id="32068891639843" />
						</Product.Swatch>
					</Product.Variant>

					<Product.Variant
						id="1x-product-variant-bronzing-face-drops"
						inventory="10"
						dataID="32068892426275"
						price="$44.90"
						compare="$89.80"
						className="mb-3"
					>
						<p className="mb-1 font-bold">
							Bronzing Face Drops <span className="bg-primary text-white rounded font-normal font-size-sm px-1 inline-block lg:hidden py-[2px]">Save 30%</span>
						</p>
						<Product.Notes notes={notes} />
					</Product.Variant>

					<Product.Variant
						id="1x-product-variant-shampoo-conditioner-set"
						inventory="10"
						dataID="32068892426275"
						price="$44.90"
						compare="$89.80"
						className="mb-3"
					>
						<p className="mb-1 font-bold flex items-center">
							Subscription (20% OFF) <span className="bg-primary text-white rounded font-normal font-size-sm px-1 inline-block lg:hidden py-[2px] ml-25">Save 30%</span>
							<a className="text-primary ms-1" data-container="body" data-toggle="popover" data-placement="top" data-content="<strong>No fuss and frizz, just good hair days ahead.</strong><br/>Keep your hair routine in check and never run out of your washday must-haves every month and free shipping on top of that.<br/><br/>Cancel anytime, and come back when you're ready. ❤️" data-html="true">
								<Help className="svg svg--current-color" />
							</a>
						</p>
						<p className="mb-1 font-bold ">Monthly Subscription</p>
						<Product.Notes notes={notes2} />

					</Product.Variant>


				</form>
			</div>
		</div>
	);
}

export default ProductVariants;
