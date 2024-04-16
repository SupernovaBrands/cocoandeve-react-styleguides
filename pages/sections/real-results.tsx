import RealResultCarousel from '~/sections/RealResultCarousel';

const RealResult = () => {
	const SLIDE_VIDEOS = [
		{
			id: 1,
			videoUrl: 'https://cdn.shopify.com/videos/c/o/v/80ace9f8f186492bbe4b1fa00dca349a.mp4',
			product: 'Sunny Honey Bali Bronzing Foam',
			author: 'Meredith Langosh',
			url: '/'
		},
		{
			id: 2,
			videoUrl: 'https://cdn.shopify.com/videos/c/o/v/949ea964f27e4bcc982b596cca694036.mp4',
			product: 'Sunny Honey Bali Bronzing Foam',
			author: 'Meredith Langosh',
			url: '/'
		},
		{
			id: 3,
			videoUrl: 'https://cdn.shopify.com/videos/c/o/v/1a172216adc3439d8b10c43574075247.mp4',
			product: 'Sunny Honey Bali Bronzing Foam',
			author: 'Meredith Langosh',
			url: '/'
		},
		{
			id: 4,
			videoUrl: 'https://cdn.shopify.com/videos/c/o/v/57c3e426e86a4d499e50a0cfe8da171f.mp4',
			product: 'Sunny Honey Bali Bronzing Foam',
			author: 'Meredith Langosh',
			url: '/'
		},
		{
			id: 5,
			videoUrl: 'https://cdn.shopify.com/videos/c/o/v/80ace9f8f186492bbe4b1fa00dca349a.mp4',
			product: 'Sunny Honey Bali Bronzing Foam',
			author: 'Meredith Langosh',
			url: '/'
		},
		{
			id: 6,
			videoUrl: 'https://cdn.shopify.com/videos/c/o/v/949ea964f27e4bcc982b596cca694036.mp4',
			product: 'Sunny Honey Bali Bronzing Foam',
			author: 'Meredith Langosh',
			url: '/'
		},
	];
	return (
		<RealResultCarousel videos={SLIDE_VIDEOS} />
	);
};

export default RealResult;
