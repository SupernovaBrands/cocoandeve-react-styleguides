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

	const { videos, store, generalSetting } = props;
	const allTab = videos.filter((data) => data.enabled_all);
	const hairTab = videos.filter((data: any) => data.enabled_hair);
	const tanSpfTab = videos.filter((data: any) => data.enabled_tanspf);
	const skinTab = videos.filter((data: any) => data.enabled_skin);
	const bodyTab = videos.filter((data: any) => data.enabled_body);

	const concatVideos = (videos) => {
		if (videos.length > 0 && videos.length < 4) {
			const loopTimes = 4 - videos.length;
			for (let i=1; i<=loopTimes; i++) {
				videos.forEach((obj) => videos.push({...obj, ...{ review_url: `${obj.review_url}#t=${i * 5}`}}));
				if ( videos.length >= 4 ) break;
			}
		}
		return videos;
	};

	return (
		<div className="instagram-reels container my-3 text-center px-0 lg:px-g lg:mt-5">
			<p className="instagram-reels__title text-xl lg:text-2xl font-bold mb-2">Real Results</p>
			<div className="row">
                <div className="text-center instagram-reels__video-container pl-hg lg:pl-0">
					<div className="lg:flex lg:flex-wrap lg:justify-between">
						
						{ !props.show && (<ul className="instagram-reels__nav hide-scrollbar list-style-none mx-auto flex border-b-0 text-center justify-start px-hg flex-nowrap overflow-scroll mb-g lg:overflow-hidden lg:mx-0 lg:px-0">
							<li key={`all`}><TabNav className={`bg-gray-400 mr-1 whitespace-nowrap rounded-full py-25 lg:py-1 px-2 lg:text-base ${activeTab === 'all' ? 'instagram-reels__nav--active font-normal bg-primary' : 'text-gray-600'}`} title='All' active={activeTab === 'all'} onNavChange={() => setActiveTab('all')} ctaBgColor={generalSetting?.bfcm_cta_bg_color} ctaTextColor={generalSetting?.bfcm_cta_text_color} /></li>
							<li key={`hair`}><TabNav className={`bg-gray-400 mr-1 whitespace-nowrap rounded-full py-25 lg:py-1 px-2 lg:text-base ${activeTab === 'hair' ? 'instagram-reels__nav--active font-normal bg-primary' : 'text-gray-600'}`} title='Hair' active={activeTab === 'hair'} onNavChange={() => setActiveTab('hair')} ctaBgColor={generalSetting?.bfcm_cta_bg_color} ctaTextColor={generalSetting?.bfcm_cta_text_color} /></li>
							<li key={`tan`}><TabNav className={`bg-gray-400 mr-1 whitespace-nowrap rounded-full py-25 lg:py-1 px-2 lg:text-base ${activeTab === 'tan' ? 'instagram-reels__nav--active font-normal bg-primary' : 'text-gray-600'}`} title={store === 'ca' ? 'Tan' : 'Tan & SPF'} active={activeTab === 'tan'} onNavChange={() => setActiveTab('tan')} ctaBgColor={generalSetting?.bfcm_cta_bg_color} ctaTextColor={generalSetting?.bfcm_cta_text_color} /></li>
							<li key={`skincare`}><TabNav className={`bg-gray-400 mr-1 whitespace-nowrap rounded-full py-25 lg:py-1 px-2 lg:text-base ${activeTab === 'skin' ? 'instagram-reels__nav--active font-normal bg-primary' : 'text-gray-600'}`} title='Skin' active={activeTab === 'skin'} onNavChange={() => setActiveTab('skin')} ctaBgColor={generalSetting?.bfcm_cta_bg_color} ctaTextColor={generalSetting?.bfcm_cta_text_color} /></li>
							<li key={`body`}><TabNav className={`bg-gray-400 mr-1 whitespace-nowrap rounded-full py-25 lg:py-1 px-2 lg:text-base ${activeTab === 'body' ? 'instagram-reels__nav--active font-normal bg-primary' : 'text-gray-600'}`} title='Body' active={activeTab === 'body'} onNavChange={() => setActiveTab('body')} ctaBgColor={generalSetting?.bfcm_cta_bg_color} ctaTextColor={generalSetting?.bfcm_cta_text_color} /></li>
						</ul>) }
						<a href="/pages/reviews" className={`mb-3 btn btn-lg ${generalSetting?.bfcm_cta_bg_color === 'bg-dark' ? 'border-dark text-dark hover:bg-dark hover:text-white' : 'btn-outline-primary' } rounded-full border-2 hover:no-underline lg:px-[1.625em] lg:py-[.5em] hidden lg:inline-block`}>See All</a>
					</div>
                    <div className='px-hg'>
						<TabContent active={activeTab === 'all'}>
							<Carousel.Wrapper emblaApi={emblaApi1} className="-mx-hg">
								<Carousel.Inner emblaRef={emblaRef1} className="lg:-mx-g lg:!transform-none">
									{concatVideos(allTab).map((data: any, i: number) => (
										<InstagramCard
											key={`all-${data.item_id}-${i}`}
											classes="instagram-reels__card flex-grow-0 flex-shrink-0 w-[175px] basis-[175px] lg:w-1/4 lg:basis-1/4 mb-0 px-hg lg:px-g lg:!transform-none"
											videoUrl={data.review_url}
											author={data.username}
											product={data.product_link}
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
									{concatVideos(hairTab).map((data: any, i: number) => (
										<InstagramCard
											key={`hair-${data.item_id}-${i}`}
											classes="instagram-reels__card flex-grow-0 flex-shrink-0 w-[175px] basis-[175px] lg:w-1/4 lg:basis-1/4 mb-0 px-hg lg:px-g lg:!transform-none"
											videoUrl={data.review_url}
											author={data.username}
											product={data.product_link}
											url={data.url}
											index={i}
											title={data.title}
										/>
									))}
								</Carousel.Inner>
							</Carousel.Wrapper>
						</TabContent>
						<TabContent active={activeTab === 'tan'}>
							<Carousel.Wrapper emblaApi={emblaApi3} className="-mx-hg">
								<Carousel.Inner emblaRef={emblaRef3} className="lg:-mx-g lg:!transform-none">
									{concatVideos(tanSpfTab).map((data: any, i: number) => (
										<InstagramCard
											key={`tan-and-spf-${data.item_id}-${i}`}
											classes="instagram-reels__card flex-grow-0 flex-shrink-0 w-[175px] basis-[175px] lg:w-1/4 lg:basis-1/4 mb-0 px-hg lg:px-g lg:!transform-none"
											videoUrl={data.review_url}
											author={data.username}
											product={data.product_link}
											url={data.url}
											index={i}
											title={data.title}
										/>
									))}
								</Carousel.Inner>
							</Carousel.Wrapper>
						</TabContent>
						<TabContent active={activeTab === 'skin'}>
							<Carousel.Wrapper emblaApi={emblaApi4} className="-mx-hg">
								<Carousel.Inner emblaRef={emblaRef4} className="lg:-mx-g lg:!transform-none">
									{concatVideos(skinTab).map((data: any, i: number) => (
										<InstagramCard
											key={`skin-${data.item_id}-${i}`}
											classes="instagram-reels__card flex-grow-0 flex-shrink-0 w-[175px] basis-[175px] lg:w-1/4 lg:basis-1/4 mb-0 px-hg lg:px-g lg:!transform-none"
											videoUrl={data.review_url}
											author={data.username}
											product={data.product_link}
											url={data.url}
											index={i}
											title={data.title}
										/>
									))}
								</Carousel.Inner>
							</Carousel.Wrapper>
						</TabContent>
						<TabContent active={activeTab === 'body'}>
							<Carousel.Wrapper emblaApi={emblaApi4} className="-mx-hg">
								<Carousel.Inner emblaRef={emblaRef5} className="lg:-mx-g lg:!transform-none">
									{concatVideos(bodyTab).map((data: any, i: number) => (
										<InstagramCard
											key={`body-${data.item_id}-${i}`}
											classes="instagram-reels__card flex-grow-0 flex-shrink-0 w-[175px] basis-[175px] lg:w-1/4 lg:basis-1/4 mb-0 px-hg lg:px-g lg:!transform-none"
											videoUrl={data.review_url}
											author={data.username}
											product={data.product_link}
											url={data.url}
											index={i}
											title={data.title}
										/>
									))}
								</Carousel.Inner>
							</Carousel.Wrapper>
						</TabContent>
						<a href="/pages/reviews" className={`instagram-reels__button btn btn-lg ${generalSetting?.bfcm_cta_bg_color ? 'border-dark text-dark hover:bg-dark hover:text-white' : 'btn-outline-primary'} rounded-full border-2 hover:no-underline px-[4em] py-[.8125em] mt-g lg:hidden inline-block`}>
						See All
						</a>
                    </div>
                </div>
			</div>
		</div>
	);
};

export default RealResultCarousel;
