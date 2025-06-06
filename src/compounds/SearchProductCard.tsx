import Link from "next/link";

const SearchProductCard = (props: any) => {
	const  { url, title, img, trackEvent, store } = props;
	let featuredImageUrl = img;

	if ((store === 'my' || store === 'uk' || store === 'int' || store === 'au' || store === 'eu' || store === 'ca') && url === 'daily-essentials-bundle') {
		featuredImageUrl = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/503a39e9-27b7-4278-c850-1d015cb06000/public';
	}
	if ((store === 'my' || store === 'uk' || store === 'int' || store === 'au' || store === 'eu' || store === 'ca') && url === 'deep-condition-bundle') {
		featuredImageUrl = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/10045f09-b506-4fc1-c28a-b1ced8673800/public';
	}
	// if (store === 'my' && url === 'hair-revival-set') {
	// 	featuredImageUrl = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/11a4d669-7e60-4441-1e07-ffbfeba9d800/public';
	// }
	if (['ca', 'us'].includes(store) && url === 'tan-masters-kit') {
		featuredImageUrl = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/c2f2fc94-076a-4866-f57c-5543acf89500/public';
	}
	if (store === 'au' && url === 'tan-masters-kit') {
		featuredImageUrl = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/4f464cde-27cb-45e0-8ede-62bb35015b00/public';
	}
	if (['au'].includes(store) && url === 'bronzing-self-tanner-drops') {
		featuredImageUrl = 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/11f0acb0-5f8a-459e-9d31-6f706061df00/public';
	}

	const tracking = () => {
		trackEvent('search_product', {
			category: "Clickout",
			target: url,
		});

		trackEvent('product_card_click', {
			category: "Clickout",
			target: url,
		});
	}

	return (
		<figure className={`relative w-full flex lg:flex-col mb-2 order-4 lg:px-g ${props.classes ? props.classes : 'lg:w-1/4'}`}>
			<a onClick={tracking} href={`/products/${url}`} className={`${props.popularItem ? '' : 'px-hg'} lg:px-0 max-w-[25%] lg:max-w-none flex-none`}>
				<picture>
					<source srcSet={featuredImageUrl.replace('/public', '/320x').replace('.jpg', '_320x.jpg').replace('.png', '_320x.png')} media="(min-width: 992px)" width="170" height="211" />
					<img src={featuredImageUrl.replace('/public', '/192x').replace('.jpg', '_192x.jpg').replace('.png', '_192x.png')} alt={title} className="block w-full h-[85px] lg:w-full max-h-[5.3125em] lg:max-h-none object-cover lg:h-[211px]" loading="lazy" width="96" height="85" />
				</picture>
			</a>
			<figcaption className="flex-grow-1 flex flex-column align-self-center w-full items-center">
				<form className="product-card-form flex-grow-1 flex flex-column h-full ml-g lg:ml-0 items-center">
					<input type="hidden" name="id" value="variantId" />
					<input type="hidden" name="quantity" value="1" />
					<a onClick={tracking} href={`/products/${url}`} className="block font-bold text-body mb-0 mt-0 lg:mt-2 hover:text-body">{title}</a>
				</form>
			</figcaption>
		</figure>
	)
}

export default SearchProductCard;
