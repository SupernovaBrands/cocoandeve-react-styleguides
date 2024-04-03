import InstagramCard from "@/components/InstagramCard";

const InstagramCards = () => {
	return (
		<div className="container">
			<h1>Instagram Card</h1>
            <div className="flex flex-wrap">
                <InstagramCard
					classes="mb-2 w-1/8 lg:w-1/4 px-g"
					videoUrl='https://cdn.shopify.com/videos/c/o/v/1a172216adc3439d8b10c43574075247.mp4'
					author='Meredith Langosh'
					product='Sunny Honey Bali Bronzing Foam'
					url='/'
				/>
				<InstagramCard
					classes="mb-2 w-1/8 lg:w-1/4 px-g"
					videoUrl='https://cdn.shopify.com/videos/c/o/v/949ea964f27e4bcc982b596cca694036.mp4'
					author='Meredith Langosh'
					product='Sunny Honey Bali Bronzing Foam'
					url='/'
				/>
            </div>
		</div>
	)
}

export default InstagramCards;