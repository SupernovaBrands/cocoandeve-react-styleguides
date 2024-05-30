interface QuizImg {
	id: number
	url: string
}
interface QuizSetting {
	quiz_button_cta: string
	quiz_button_url: string
	quiz_image_desktop: QuizImg
	quiz_image_mobile: QuizImg
	quiz_title: string
}

type PropType = {
	quizSetting: QuizSetting,
}

const ProductCardQuiz: React.FC<PropType> = ({quizSetting}) => {
	return (
		<figure className="w-full md:w-1/3 mb-5 px-0 lg:px-g text-left lg:text-center relative">
			<picture className="block m-0 h-full">
				<source media="(min-width:768px)" srcSet={quizSetting.quiz_image_desktop.url} />
				<img alt="Tan Quiz" className="w-full h-full" src={quizSetting.quiz_image_mobile.url} loading="lazy" />
			</picture>
			<figcaption className="absolute px-2 lg:px-3 product-card--quiz__banner-bottom bottom-[50%] lg:bottom-0 left-0 right-0 transform translate-y-[50%] lg:transform-none">
				<p className="text-primary font-size-lg font-bold mb-1 lg:mb-2"
					dangerouslySetInnerHTML={{
						__html: quizSetting.quiz_title
					}}
				/>
				<a href={quizSetting.quiz_button_url} className="inline-block font-bold py-[13px] rounded-full border-2 border-primary lg:mb-2 px-g lg:px-4 bg-white text-primary hover:no-underline">{quizSetting.quiz_button_cta}</a>
			</figcaption>
		</figure>
	);
};

export default ProductCardQuiz;
