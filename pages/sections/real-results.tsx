// import RealResultCarousel from "@/sections/RealResultCarousel";
import { EmblaOptionsType } from 'embla-carousel';
import TabNav from '@/components/TabNav';
import TabContent from '@/components/TabContent';
import { useState } from 'react';
import Carousel from '@/components/carousel/EmblaCarouselMulti';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import InstagramCard from '@/components/InstagramCard';
const options: EmblaOptionsType = {
	loop: true,
};

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
]

const RealResult = () => {

	const [activeTab, setActiveTab] = useState('all');
	//tab 1
	const [emblaRef1, emblaApi1] = useEmblaCarousel({ align: 'start', ...options}, [
		Autoplay({ playOnInit: false, delay: 3000 })
	]);

	//tab 2
	const [emblaRef2, emblaApi2] = useEmblaCarousel({ align: 'start', ...options}, [
		Autoplay({ playOnInit: false, delay: 3000 })
	]);

	//tab 3
	const [emblaRef3, emblaApi3] = useEmblaCarousel({ align: 'start', ...options}, [
		Autoplay({ playOnInit: false, delay: 3000 })
	]);

	//tab 4
	const [emblaRef4, emblaApi4] = useEmblaCarousel({ align: 'start', ...options}, [
		Autoplay({ playOnInit: false, delay: 3000 })
	]);

	return (
		<div className="instagram-reels container my-3 my-lg-4 text-center">
			<p className="h1 mb-2">Real Results</p>
            <div className="row">
                <div>
                    <ul className="list-style-none mx-auto flex flex-wrap border-b-0 text-center mb-3 justify-center">
						<li><TabNav className={`py-[6px] px-g ${activeTab === 'all' ? 'text-body' : 'text-gray-600'}`} title='All' active={activeTab === 'all'} onNavChange={() => setActiveTab('all')} /></li>
						<li><TabNav className={`py-[6px] px-g ${activeTab === 'hair' ? 'text-body' : 'text-gray-600'}`} title='Hair' active={activeTab === 'hair'} onNavChange={() => setActiveTab('hair')} /></li>
                        <li><TabNav className={`py-[6px] px-g ${activeTab === 'tan' ? 'text-body' : 'text-gray-600'}`} title='Tan & SPF' active={activeTab === 'tan'} onNavChange={() => setActiveTab('tan')} /></li>
                        <li><TabNav className={`py-[6px] px-g ${activeTab === 'body' ? 'text-body' : 'text-gray-600'}`} title='Body' active={activeTab === 'body'} onNavChange={() => setActiveTab('body')} /></li>
                    </ul>
                    <div className='px-hg'>
						<TabContent active={activeTab === 'all'}>
							<Carousel.Wrapper emblaApi={emblaApi1} className="-mx-hg">
								<Carousel.Inner emblaRef={emblaRef1} className="lg:-mx-g lg:!transform-none">
									{SLIDE_VIDEOS.map((data) => (
										<InstagramCard
											classes="flex-grow-0 flex-shrink-0 w-3/4 basis-3/4 lg:w-1/4 lg:basis-1/4 mb-0 px-hg lg:px-g lg:!transform-none"
											videoUrl={data.videoUrl}
											author={data.author}
											product={data.product}
											url={data.url}
										/>
									))}
								</Carousel.Inner>
							</Carousel.Wrapper>
						</TabContent>
						<TabContent active={activeTab === 'hair'}>
							<Carousel.Wrapper emblaApi={emblaApi2} className="-mx-hg">
								<Carousel.Inner emblaRef={emblaRef2} className="lg:-mx-g lg:!transform-none">
									{SLIDE_VIDEOS.map((data) => (
										<InstagramCard
											classes="flex-grow-0 flex-shrink-0 w-3/4 basis-3/4 lg:w-1/4 lg:basis-1/4 mb-0 px-hg lg:px-g lg:!transform-none"
											videoUrl={data.videoUrl}
											author={data.author}
											product={data.product}
											url={data.url}
										/>
									))}
								</Carousel.Inner>
							</Carousel.Wrapper>
						</TabContent>
						<TabContent active={activeTab === 'tan'}>
							<Carousel.Wrapper emblaApi={emblaApi3} className="-mx-hg">
								<Carousel.Inner emblaRef={emblaRef3} className="lg:-mx-g lg:!transform-none">
									{SLIDE_VIDEOS.map((data) => (
										<InstagramCard
											classes="flex-grow-0 flex-shrink-0 w-3/4 basis-3/4 lg:w-1/4 lg:basis-1/4 mb-0 px-hg lg:px-g lg:!transform-none"
											videoUrl={data.videoUrl}
											author={data.author}
											product={data.product}
											url={data.url}
										/>
									))}
								</Carousel.Inner>
							</Carousel.Wrapper>
						</TabContent>
						<TabContent active={activeTab === 'body'}>
							<Carousel.Wrapper emblaApi={emblaApi4} className="-mx-hg">
								<Carousel.Inner emblaRef={emblaRef4} className="lg:-mx-g lg:!transform-none">
									{SLIDE_VIDEOS.map((data) => (
										<InstagramCard
											classes="flex-grow-0 flex-shrink-0 w-3/4 basis-3/4 lg:w-1/4 lg:basis-1/4 mb-0 px-hg lg:px-g lg:!transform-none"
											videoUrl={data.videoUrl}
											author={data.author}
											product={data.product}
											url={data.url}
										/>
									))}
								</Carousel.Inner>
							</Carousel.Wrapper>
						</TabContent>
                    </div>
                </div>
			</div>
		</div>
	);
};

export default RealResult;
