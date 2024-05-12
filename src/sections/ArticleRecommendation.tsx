import parse from 'html-react-parser';

const RecommendationCard = (props) => {
	return (
		<li className="w-full lg:w-1/3 lg:px-g sm:px-hg">
			<figure className="flex mb-[1rem]">
				<div className="w-1/4 p-0">
					<picture>
						<img src={props.data.src} alt={props.data.title} className="w-full object-cover h-full" />
					</picture>
				</div>
				
				<figcaption className="ml-1 w-3/4 px-0">
					<p className="h3 mb-1">{props.data.title}</p>
					<span className="mb-0">{parse(props.data.desc)}</span>
				</figcaption>
			</figure>
		</li>
	);
};

const ArticleRecommendation = (props) => {

	const { popularArticles } = props;

	return (
		<div className="w-full my-4">
			<div className="bg-pink-light p-3 no-gutters__in-container mx-[-15px]">
				<p className="h1 text-center mb-1">You may also like</p>
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
