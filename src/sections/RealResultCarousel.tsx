// import RealResultCarousel from "~/sections/RealResultCarousel";
import { EmblaOptionsType } from 'embla-carousel';
import TabNav from '~/components/TabNav';
import TabContent from '~/components/TabContent';
import { useState, useEffect, useRef } from 'react';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import InstagramCard from '~/components/InstagramCard';
import Link from 'next/link';
const options: EmblaOptionsType = {
	loop: true,
};

const RealResultCarousel = (props: any) => {

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

	//tab 5
	const [emblaRef5, emblaApi5] = useEmblaCarousel({ align: 'start', ...options}, [
		Autoplay({ playOnInit: false, delay: 3000 })
	]);

	const { videos, store } = props;

	return (
		<div className="instagram-reels container my-3 lg:my-4 text-center">
			<p className="instagram-reels__title h1 mb-2">Real Results</p>
            <div className="row">
                <div className="text-center instagram-reels__video-container">
					<div className="lg:flex lg:flex-wrap lg:justify-between">
						
						{ !props.show && (<ul className="instagram-reels__nav list-style-none mx-auto flex flex-wrap border-b-0 text-center mb-3 justify-center">
							<li key={`all`}><TabNav className={`pt-[6px] px-g lg:text-lg ${activeTab === 'all' ? 'instagram-reels__nav--active text-body' : 'text-gray-600'}`} title='All' active={activeTab === 'all'} onNavChange={() => setActiveTab('all')} /></li>
							<li key={`hair`}><TabNav className={`pt-[6px] px-g lg:text-lg ${activeTab === 'hair' ? 'instagram-reels__nav--active text-body' : 'text-gray-600'}`} title='Hair' active={activeTab === 'hair'} onNavChange={() => setActiveTab('hair')} /></li>
							<li key={`tan`}><TabNav className={`pt-[6px] px-g lg:text-lg ${activeTab === 'tan' ? 'instagram-reels__nav--active text-body' : 'text-gray-600'}`} title={store === 'ca' ? 'Tan' : 'Tan & SPF'} active={activeTab === 'tan'} onNavChange={() => setActiveTab('tan')} /></li>
							<li key={`skincare`}><TabNav className={`pt-[6px] px-g lg:text-lg ${activeTab === 'skin' ? 'instagram-reels__nav--active text-body' : 'text-gray-600'}`} title='Skin' active={activeTab === 'skin'} onNavChange={() => setActiveTab('skin')} /></li>
							<li key={`body`}><TabNav className={`pt-[6px] px-g lg:text-lg ${activeTab === 'body' ? 'instagram-reels__nav--active text-body' : 'text-gray-600'}`} title='Body' active={activeTab === 'body'} onNavChange={() => setActiveTab('body')} /></li>
						</ul>) }
						{props.smallerTest && (
							<a href="/pages/reviews" className="mb-3 btn btn-lg btn-outline-primary rounded-full border-2 hover:no-underline lg:px-[1.625em] lg:py-[.5em] hidden lg:inline-block">See All</a>
						)}
					</div>
                    <div className='px-hg'>
						<TabContent active={activeTab === 'all'}>
							<Carousel.Wrapper emblaApi={emblaApi1} className="-mx-hg">
								<Carousel.Inner emblaRef={emblaRef1} className="lg:-mx-g lg:!transform-none">
									{videos.map((data: any, i: number) => (
										<InstagramCard
											key={`all-${data.url}-${i}`}
											classes="instagram-reels__card flex-grow-0 flex-shrink-0 w-3/4 basis-3/4 lg:w-1/4 lg:basis-1/4 mb-0 px-hg lg:px-g lg:!transform-none"
											videoUrl={data.url}
											author={data.username}
											product={data.product}
											url={data.url}
											index={i}
											title={data.title}
										/>
									))}
								</Carousel.Inner>
							</Carousel.Wrapper>
						</TabContent>
						<TabContent active={activeTab === 'hair'}>
							<Carousel.Wrapper emblaApi={emblaApi2} className="-mx-hg">
								<Carousel.Inner emblaRef={emblaRef2} className="lg:-mx-g lg:!transform-none">
									{videos.filter((data: any) => data.category === 'hair').map((data: any, i: number) => (
										<InstagramCard
											key={`hair-${data.url}-${i}`}
											classes="instagram-reels__card flex-grow-0 flex-shrink-0 w-3/4 basis-3/4 lg:w-1/4 lg:basis-1/4 mb-0 px-hg lg:px-g lg:!transform-none"
											videoUrl={data.url}
											author={data.username}
											product={data.product}
											url={data.url}
											title={data.title}
										/>
									))}
								</Carousel.Inner>
							</Carousel.Wrapper>
						</TabContent>
						<TabContent active={activeTab === 'tan'}>
							<Carousel.Wrapper emblaApi={emblaApi3} className="-mx-hg">
								<Carousel.Inner emblaRef={emblaRef3} className="lg:-mx-g lg:!transform-none">
									{videos.filter((data: any) => data.category === 'tan_spf').map((data: any, i: number) => (
										<InstagramCard
											key={`tan-${data.url}-${i}`}
											classes="instagram-reels__card flex-grow-0 flex-shrink-0 w-3/4 basis-3/4 lg:w-1/4 lg:basis-1/4 mb-0 px-hg lg:px-g lg:!transform-none"
											videoUrl={data.url}
											author={data.username}
											product={data.product}
											url={data.url}
											title={data.title}
										/>
									))}
								</Carousel.Inner>
							</Carousel.Wrapper>
						</TabContent>
						<TabContent active={activeTab === 'skin'}>
							<Carousel.Wrapper emblaApi={emblaApi4} className="-mx-hg">
								<Carousel.Inner emblaRef={emblaRef4} className="lg:-mx-g lg:!transform-none">
									{videos.filter((data: any) => data.category === 'skin').map((data: any, i: number) => (
										<InstagramCard
											key={`body-${data.url}-${i}`}
											classes="instagram-reels__card flex-grow-0 flex-shrink-0 w-3/4 basis-3/4 lg:w-1/4 lg:basis-1/4 mb-0 px-hg lg:px-g lg:!transform-none"
											videoUrl={data.url}
											author={data.username}
											product={data.product}
											url={data.url}
											title={data.title}
										/>
									))}
								</Carousel.Inner>
							</Carousel.Wrapper>
						</TabContent>
						<TabContent active={activeTab === 'body'}>
							<Carousel.Wrapper emblaApi={emblaApi4} className="-mx-hg">
								<Carousel.Inner emblaRef={emblaRef5} className="lg:-mx-g lg:!transform-none">
									{videos.filter((data: any) => data.category === 'body').map((data: any, i: number) => (
										<InstagramCard
											key={`body-${data.url}-${i}`}
											classes="instagram-reels__card flex-grow-0 flex-shrink-0 w-3/4 basis-3/4 lg:w-1/4 lg:basis-1/4 mb-0 px-hg lg:px-g lg:!transform-none"
											videoUrl={data.url}
											author={data.username}
											product={data.product}
											url={data.url}
											title={data.title}
										/>
									))}
								</Carousel.Inner>
							</Carousel.Wrapper>
						</TabContent>
						<a href="/pages/reviews" className="instagram-reels__button btn btn-lg btn-outline-primary rounded-full border-2 hover:no-underline px-[3.375em] py-[.8125em] mt-3 hidden lg:inline-block">
							{props.smallerTest && 'See All'}
							{!props.smallerTest && 'See All Results'}
						</a>
                    </div>
                </div>
			</div>
		</div>
	);
};

export default RealResultCarousel;
