const ProductCardQuiz = (props: any) => {
	const title = props.quizSetting?.quiz_title || 'Find the perfect solution for your <br className="hidden lg:block"/>skin’s needs in just a few steps';
    // console.log('quiz setting', props.quizSetting);
	return (
		<figure className={props.className ?? ''}>
            <a href="/pages/self-tan-quiz">
                <picture className="block">
                    <source srcSet={props.imgDt} media="(min-width: 992px)" />
                    <img className="w-full rounded-[24px] lg:rounded-[32px]" src={props.imgMb} loading="lazy" alt="Illustration of a person taking a quiz to find their perfect self-tan solution" width={384} height={72} />
                </picture>
                <figcaption className="absolute left-[5em] top-2/4 lg:top-0 lg:left-0 lg:right-0 -translate-y-1/2 lg:transform-none text-left lg:text-center pl-25 pr-g lg:px-0 lg:mt-4 lg:pt-0 pb-0 lg:pb-0 w-[75%] lg:w-full items-center [flex-flow:column] justify-center">
                    <p className="lg:text-xl mb-0 lg:mb-25 font-bold text-body w-full">Tan Quiz</p>
                    <p className="hidden lg:block text-sm lg:text-base mb-g lg:mb-1 text-body"
                        dangerouslySetInnerHTML={{
							__html: ['us'].includes(props.store) ? title.replace('colour', 'color') : title,
						}}
                    />
                    <span className={`hidden lg:inline-block align-middle text-center select-none border py-1 px-3 leading-normal no-underline ${props.ctaBgColor === 'bg-dark' ? 'bg-dark border-dark hover:bg-dark' : 'bg-primary border-primary hover:primary-dark' } text-white hover:text-white hover:no-underline rounded-full lg:py-[7px] lg:px-[28px] min-w-[157px]`}>Take the Quiz</span>
                    <svg className="lg:hidden absolute right-[24px] -translate-y-1/2 top-2/4" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="-0.5" y="0.5" width="31" height="31" rx="15.5" transform="matrix(-1 0 0 1 31 0)" fill="white"></rect><rect x="-0.5" y="0.5" width="31" height="31" rx="15.5" transform="matrix(-1 0 0 1 31 0)" stroke="#D62E55"></rect><path d="M13.269 11.0793L18.9258 16.7362L13.269 22.393L14.4004 23.5244L21.1886 16.7362L14.4004 9.94796L13.269 11.0793Z" fill="#D62E55" stroke="#D62E55"></path></svg>
                </figcaption>
            </a>
		</figure>
	);
};

export default ProductCardQuiz;
