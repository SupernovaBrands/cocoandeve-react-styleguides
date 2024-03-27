const Sidebar = (props) => {
	return (
		<div className="w-full lg:w-1/3 px-g">
			<aside className="blog-grid__sidebar sidebar lg:sticky w-full lg:block mb-4 lg:mb-0 self-start">
				<div className="no-gutters__in-container">
					<h4 className="mb-3 h1 mb-1">POPULAR READS</h4>
					<div className="">
						<div className="mb-0 pb-1">
							<div className="">
								<article className="post-card mb-2 lg:mb-3">
									<h3><a href="/cocoandeve-styleguides/docs/templates/article.html" className="text-body-color hover:text-primary">5 things you’re doing wrong with your hair care routine</a></h3>
									<p className="mt-1 mb-0">Give these myths the brush off for a healthy scalp & shiny hair!</p>
								</article>
								<article className="post-card mb-2 lg:mb-3">
									<h3><a href="/cocoandeve-styleguides/docs/templates/article.html" className="text-body-color hover:text-primary">5 things you’re doing wrong with your hair care routine</a></h3>
									<p className="mt-1 mb-0">Give these myths the brush off for a healthy scalp & shiny hair!</p>
								</article>
							</div>
							<div className="">
								<article className="post-card mb-2 lg:mb-0">
									<h3><a href="/cocoandeve-styleguides/docs/templates/article.html" className="text-body-color hover:text-primary">5 things you’re doing wrong with your hair care routine</a></h3>
									<p className="mt-1 mb-0">Give these myths the brush off for a healthy scalp & shiny hair!</p>
								</article>
							</div>
						</div>
					</div>
				</div>
			</aside>
		</div>
	);
};

export default Sidebar;
