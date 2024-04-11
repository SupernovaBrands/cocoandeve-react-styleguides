const Sidebar = (props) => {
	return (
		<div className="flex flex-wrap">
			<div className="w-full lg:w-1/3 lg:px-g sm:px-hg">
				<aside className="blog-post-grid__sidebar lg:sticky w-full mt-2 lg:mt-0 mb-0 lg:mb-auto self-end flex lg:block flex-wrap lg:px-g sm:px-hg">
					<section className="no-gutters__in-container sidebar order-2 bg-gray-400">
						<h2 className="mb-3 text-center hidden lg:block h1">Popular reads</h2>
						<div className="slide carousel--sidebar">
							<div className="carousel-inner mb-0 pb-1">
								<div className="carousel-item active">
									<article className="post-card flex grow mb-3">
										<picture className="shrink-0 mr-1">
											<source srcSet="//cdn.shopify.com/s/files/1/0243/8817/3888/products/PDP_BondBuildingPre-Shampoo_90x90_crop_center.jpg?v=1663207008" media="(min-width: 992px)" />
											<a href="/products/bond-building-pre-shampoo-treatment">
												<img src="//cdn.shopify.com/s/files/1/0243/8817/3888/products/PDP_BondBuildingPre-Shampoo_90x90_crop_center.jpg?v=1663207008" className="w-full" loading="lazy" alt="Bond Building Pre-Shampoo Treatment" />
											</a>
										</picture>
										<figcaption className="flex flex-col text-sm">
											<h3 className="mb-1"><a href="/cocoandeve-styleguides/docs/templates/article.html" className="text-body-color hover:text-primary text-sm">6 Scalp Care Myths – Busted!</a></h3>
											<p className="mb-0">Give these myths the brush off for a healthy scalp & shiny hair!</p>
										</figcaption>
									</article>
									<article className="post-card flex grow mb-3">
										<picture className="shrink-0 mr-1">
											<source srcSet="//cdn.shopify.com/s/files/1/0243/8817/3888/products/PDP_BondBuildingPre-Shampoo_90x90_crop_center.jpg?v=1663207008" media="(min-width: 992px)" />
											<a href="/products/bond-building-pre-shampoo-treatment">
												<img src="//cdn.shopify.com/s/files/1/0243/8817/3888/products/PDP_BondBuildingPre-Shampoo_90x90_crop_center.jpg?v=1663207008" className="w-full" loading="lazy" alt="Bond Building Pre-Shampoo Treatment" />
											</a>
										</picture>
										<figcaption className="flex flex-col text-sm">
											<h3 className="mb-1"><a href="/cocoandeve-styleguides/docs/templates/article.html" className="text-body-color hover:text-primary text-sm">6 Scalp Care Myths – Busted!</a></h3>
											<p className="mb-0">Give these myths the brush off for a healthy scalp & shiny hair!</p>
										</figcaption>
									</article>
								</div>
								<div className="carousel-item">
									<article className="post-card flex grow mb-0">
										<picture className="shrink-0 mr-1">
											<source srcSet="//cdn.shopify.com/s/files/1/0243/8817/3888/products/PDP_BondBuildingPre-Shampoo_90x90_crop_center.jpg?v=1663207008" media="(min-width: 992px)" />
											<a href="/products/bond-building-pre-shampoo-treatment">
												<img src="//cdn.shopify.com/s/files/1/0243/8817/3888/products/PDP_BondBuildingPre-Shampoo_90x90_crop_center.jpg?v=1663207008" className="w-full" loading="lazy" alt="Bond Building Pre-Shampoo Treatment" />
											</a>
										</picture>
										<figcaption className="flex flex-col text-sm">
											<h3 className="mb-1"><a href="/cocoandeve-styleguides/docs/templates/article.html" className="text-body-color hover:text-primary text-sm">6 Scalp Care Myths – Busted!</a></h3>
											<p className="mb-0">Give these myths the brush off for a healthy scalp & shiny hair!</p>
										</figcaption>
									</article>
								</div>
							</div>
						</div>
					</section>
				</aside>
			</div>
		</div>
	);
};

export default Sidebar;
