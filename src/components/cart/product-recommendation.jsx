/* global tStrings */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
	formatMoney,
} from '~mod/utils';

const ShopifyUpsell = (props) => {
	const { productId } = props;
	const [init, setInit] = useState(false);
	const [recommended, setRecommended] = useState([]);
	const MAX_REQUEST = 10;
	useEffect(() => {
		const getProductsRecommendation = async () => {
			try {
				await fetch(`/recommendations/products.json?section_id=product-recommendations&product_id=${productId}&limit=${MAX_REQUEST}`)
					.then((response) => response.json())
					.then((resp) => {
						const recommendedFiltered = resp.products.filter((prod) => !prod.title.toLowerCase().includes('vip'));
						const noFree = recommendedFiltered.filter((item) => !item.title.toLowerCase().includes('free'));
						const imgFeatured = noFree.filter((itemImg) => itemImg.featured_image !== null);
						setRecommended(imgFeatured);
						setInit(true);
					});
			} catch (err) {
				console.log('error while fetching recommendation data', err);
			}
		};

		getProductsRecommendation();
	}, []);

	return !init ? (
		<div className="d-flex justify-content-center mt-4">
			<div className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
		</div>
	) : (
		<>
			{recommended.length > 0 && (
				<>
					<p className=" fw-bold  product-upsell__title mb-2">{tStrings.upsellHeading}</p>
					<ul className="list-unstyled mb-0 order-lg-2 product__recommendation-shopify">
						{recommended.slice(0, 2).map((item) => {
							const firstAvailableVariant = item.variants.find((variant) => variant.available);
							return (
								<li className="mb-2">
									<form className="upsell product-upsell d-flex align-items-center p-0" data-variant-id={firstAvailableVariant.id}>
										<figure className="d-flex flex-grow-1 mb-0 row">
											<picture className="col-4">
												<source srcSet={item.featured_image.replace('.jpg', '_274x274_crop_center.jpg')} media="(min-width: 992px)" width="137" height="137" />
												<img src={item.featured_image.replace('.jpg', '_236x236_crop_center.jpg')} className="w-100 h-100" alt="Upsell on product page" width="118" height="118" />
											</picture>
											<figcaption className="col-8 d-flex flex-column mx-0 justify-content-around justify-content-lg-between py-0 font-size-base">
												<a href={item.url} className="mt-0 mb-25 fw-bold text-body">{item.title}</a>
												{item.tags.includes('Tan') && firstAvailableVariant.option2 && (
													<p className="mb-25">{firstAvailableVariant.option2}</p>
												)}
												<span className="mb-25 text-primary">
													{firstAvailableVariant.compare_at_price && (
														<span className="text-linethrough text-body mr-25 text-nowrap">{formatMoney(firstAvailableVariant.compare_at_price)}</span>
													)}
													<strong className="mr-25 text-nowrap">{formatMoney(firstAvailableVariant.price)}</strong>
												</span>
												<div className="d-flex flex-shrink-0">
													<button type="button" className={`btn btn-outline-primary ${firstAvailableVariant.available ? 'upsell_addbtn' : ''}`} data-id={firstAvailableVariant.id}>{firstAvailableVariant.available ? tStrings.addToCart : tStrings.soldOut}</button>
												</div>
											</figcaption>
										</figure>
									</form>
								</li>
							);
						})}
					</ul>
				</>
			)}
		</>
	);
};

ShopifyUpsell.propTypes = {
	productId: PropTypes.number.isRequired,
};

export default ShopifyUpsell;
