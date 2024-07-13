import parse from 'html-react-parser';

const RecommendationCard = (props) => {
	return (
		<li className="w-full lg:w-1/3 lg:px-g sm:px-hg">
			<figure className="flex mb-[1rem]">
				<div className="relative w-1/4 p-0 flex-[0_0_25%]">
					<a href={props.data.link} className="hover-overlay blog-upsell relative block" aria-label={props.data.title}>
						<picture className="embed-responsive m-0">
							<img src={props.data.src} alt={props.data.title} className="object-cover absolute w-full h-full top-0 bottom-0 left-0 align-middle" />
						</picture>
					</a>
				</div>
				
				<figcaption className="ml-1 w-3/4 px-0 flex-[0_0_75%]">
					<p className="h3 mb-1">
						<a href={props.data.link} className="text-body hover:text-body">{props.data.title}</a>
					</p>
					<>{parse(props.data.desc.replace(/<[^>]*>?/gm, ''))}</>
				</figcaption>
			</figure>
		</li>
	);
};

const ArticleRecommendation = (props) => {

	const { popularArticles } = props;

	return (
		<div className="w-full my-4 lg:px-g sm:px-hg">
			<div className="bg-pink-light p-3 no-gutters__in-container lg:mx-0 sm:-mx-g">
				<p className="h1 text-center mb-1 leading-[1.25!important]">You may also like</p>
				<ul className="flex flex-wrap mt-3 mb-0 lg:-mx-g sm:-mx-hg">
					{popularArticles.map((data) => (
						<RecommendationCard key={data.id} data={data} />
					))}
				</ul>
			</div>
		</div>
	);
};

export default ArticleRecommendation;
