const QuizReward = () => {
	return (
		<section className="container text-center mt-4 lg:mt-5 mb-1 lg:mb-0">
			<p className="h1 mb-g lg:mb-3">Discover more</p>
			<div className="flex flex-wrap -mx-hg lg:-mx-g">
				<figure className="w-full lg:w-1/2 px-g mb-g lg:mb-0 block relative">
					<picture className="block">
						<source srcSet="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/a51bcbe7-e43e-4762-4a41-916d00416b00/1140x" media="(min-width: 992px)" />
						<img className="w-full rounded" src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/56f87000-b2e4-4813-a00f-d7a0eee86c00/828x" loading="lazy" />
					</picture>
					<figcaption className="absolute left-[1.25em] top-2/4 lg:top-0 lg:left-0 lg:right-0 -translate-y-1/2 lg:transform-none text-left lg:text-center px-g lg:px-0 lg:mt-4 lg:pt-1 pb-g lg:pb-0 w-3/5 lg:w-full items-center [flex-flow:column] justify-center">
						<p className="text-lg lg:text-2xl mb-g mb-lg-2 font-bold">Tan Quiz</p>
						<p className="text-sm mb-g lg:mb-2">Find the perfect solution for your skin’s needs <br className="hidden lg:block"/>in just a few steps</p>
						<a href="/pages/self-tan-quiz" className="inline-block align-middle text-center select-none border py-1 px-3 leading-normal no-underline bg-primary text-white hover:primary-dark hover:text-white hover:no-underline rounded-full lg:py-g lg:px-5 font-bold">Take the Quiz</a>
					</figcaption>
				</figure>
				<figure className="w-full lg:w-1/2 px-g mb-g lg:mb-0 block relative rounded">
					<picture className="block">
						<source srcSet="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/4fe29e0c-7f31-4457-1192-4b0e9ba18400/public" media="(min-width: 992px)" />
						<img className="w-full rounded" src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/f7753bfb-0638-4c83-81c9-12ab67a3f600/828x" loading="lazy" />
					</picture>
					<figcaption className="absolute left-[1.25em] top-2/4 lg:top-0 lg:left-0 lg:right-0 -translate-y-1/2 lg:transform-none text-left lg:text-center px-g lg:px-0 lg:mt-4 lg:pt-1 pb-g lg:pb-0 w-3/5 lg:w-full items-center [flex-flow:column] justify-center">
						<p className="text-lg lg:text-2xl mb-g mb-lg-2 font-bold">Earn points, reap rewards</p>
						<p className="text-sm mb-g lg:mb-2">Sign up for our reward program and stack up your <br className="hidden lg:block"/>points for free product.</p>
						<a href="/pages/reward" className="inline-block align-middle text-center select-none border py-1 px-3 leading-normal no-underline bg-primary text-white hover:primary-dark hover:text-white hover:no-underline rounded-full lg:py-g lg:px-5 font-bold">Join Now</a>
					</figcaption>
				</figure>
			</div>
		</section>
	)
}

export default QuizReward;
