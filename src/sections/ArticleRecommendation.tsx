import parse from 'html-react-parser';

const RecommendationCard = (props) => {
	return (
		<li className="w-[90%] flex-shrink-0 lg:flex-shrink-1 basis-[90%] lg:w-1/3 lg:basis-1/3 lg:px-g sm:px-hg">
			<figure className="flex mb-0 lg:w-full">
				<div className="relative w-1/4 p-0 flex-[0_0_96px]">
					<a href={props.data.link} className="hover-overlay blog-upsell relative block" aria-label={props.data.title}>
						<picture className="embed-responsive m-0">
							<img src={props.data.src.replace('public', '192x')} alt={props.data.title} className="object-cover absolute w-full h-full top-0 bottom-0 left-0 align-middle rounded" />
						</picture>
					</a>
				</div>
				
				<figcaption className="pl-g w-3/4 px-0 flex-[0_0_70%]">
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
		<div className="w-full mt-4 mb-4 lg:px-0 lg:mt-5 sm:px-hg">
			<div className="bg-pink-light px-g lg:px-3 py-3 no-gutters__in-container lg:mx-0 sm:-mx-g lg:rounded">
				<p className="font-bold text-xl lg:text-2xl text-body text-center mb-2 lg:mb-3">You may also like</p>
				<ul className="flex flex-nowrap mb-0 lg:-mx-g sm:-mx-hg overflow-scroll no-scrollbar lg:overflow-hidden">
					{popularArticles.map((data) => (
						<RecommendationCard key={data.id} data={data} />
					))}
				</ul>
			</div>
		</div>
	);
};

export default ArticleRecommendation;
