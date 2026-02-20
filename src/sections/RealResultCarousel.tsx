// import RealResultCarousel from "~/sections/RealResultCarousel";
// import dynamic from 'next/dynamic';
import { EmblaOptionsType } from 'embla-carousel';
import TabNav from '~/components/TabNav';
// import TabContent from '~/components/TabContent';
import { useState, useEffect, useMemo, useCallback } from 'react';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
// const Carousel = dynamic(() => import('~/components/carousel/EmblaCarouselMulti'), {
//   loading: () => <div>Loading...</div>
// });
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import InstagramCard from '~/components/InstagramCard';
// import Link from 'next/link';

const options: EmblaOptionsType = {
	loop: true,
};

const RealResultCarousel = (props: any) => {

	const [activeTab, setActiveTab] = useState('all');

	// update to universal carousel, update content only when tab changedd
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{ align: 'start', ...options },
		[Autoplay({ playOnInit: false, delay: 3000 })]
	);

	//tab 1
	// const [emblaRef1, emblaApi1] = useEmblaCarousel(
	// 	activeTab === 'all' ? { align: 'start', ...options } : null,
	// 	activeTab === 'all' ? [Autoplay({ playOnInit: false, delay: 3000 })] : []
	// );

	// //tab 2
	// // const [emblaRef2, emblaApi2] = useEmblaCarousel({ align: 'start', ...options}, [
	// // 	Autoplay({ playOnInit: false, delay: 3000 })
	// // ]);
	// const [emblaRef2, emblaApi2] = useEmblaCarousel(
	// 	activeTab === 'hair' ? { align: 'start', ...options } : null,
	// 	activeTab === 'hair' ? [Autoplay({ playOnInit: false, delay: 3000 })] : []
	// );

	// //tab 3
	// // const [emblaRef3, emblaApi3] = useEmblaCarousel({ align: 'start', ...options}, [
	// // 	Autoplay({ playOnInit: false, delay: 3000 })
	// // ]);
	// const [emblaRef3, emblaApi3] = useEmblaCarousel(
	// 	activeTab === 'tan' ? { align: 'start', ...options } : null,
	// 	activeTab === 'tan' ? [Autoplay({ playOnInit: false, delay: 3000 })] : []
	// );

	// //tab 4
	// // const [emblaRef4, emblaApi4] = useEmblaCarousel({ align: 'start', ...options}, [
	// // 	Autoplay({ playOnInit: false, delay: 3000 })
	// // ]);
	// const [emblaRef4, emblaApi4] = useEmblaCarousel(
	// 	activeTab === 'skin' ? { align: 'start', ...options } : null,
	// 	activeTab === 'skin' ? [Autoplay({ playOnInit: false, delay: 3000 })] : []
	// );

	// //tab 5
	// // const [emblaRef5, emblaApi5] = useEmblaCarousel({ align: 'start', ...options}, [
	// // 	Autoplay({ playOnInit: false, delay: 3000 })
	// // ]);
	// const [emblaRef5, emblaApi5] = useEmblaCarousel(
	// 	activeTab === 'body' ? { align: 'start', ...options } : null,
	// 	activeTab === 'body' ? [Autoplay({ playOnInit: false, delay: 3000 })] : []
	// );

	const { videos, store, generalSetting } = props;
	// const allTab = useMemo(() => videos.filter((data) => data.enabled_all), [videos]);
	// const hairTab = useMemo(() => videos.filter((data) => data.enabled_hair), [videos]);
	// const tanSpfTab = useMemo(() => videos.filter((data) => data.enabled_tanspf), [videos]);
	// const skinTab = useMemo(() => videos.filter((data) => data.enabled_skin), [videos]);
	// const bodyTab = useMemo(() => videos.filter((data) => data.enabled_body), [videos]);
	const tabs = useMemo(() => ({
		all: videos.filter((data) => data.enabled_all),
		hair: videos.filter((data) => data.enabled_hair),
		tan: videos.filter((data) => data.enabled_tanspf),
		skin: videos.filter((data) => data.enabled_skin),
		body: videos.filter((data) => data.enabled_body),
	}), [videos]);

	const concatVideos = useCallback((videos) => {
		if (videos.length >= 4 || videos.length === 0) {
			return videos;
		}
		
		const result = [...videos];
		const loopTimes = 4 - videos.length;
		
		for (let i = 1; i <= loopTimes; i++) {
			videos.forEach((obj) => {
				result.push({ ...obj, review_url: `${obj.review_url}#t=${i * 5}` });
				if (result.length >= 4) return;
			});
			if (result.length >= 4) break;
		}
		
		return result;
	}, []);

	const currentVideos = useMemo(() => 
		concatVideos(tabs[activeTab] || []),
		[activeTab, tabs]
	);

	useEffect(() => {
		emblaApi?.scrollTo(0);
	}, [activeTab, emblaApi]);

	return (
		<div className="instagram-reels container my-3 text-center px-0 lg:px-g lg:mt-5">
			<p className="instagram-reels__title text-xl lg:text-2xl font-bold mb-2">Real Results</p>
			<div className="row">
                <div className="text-center instagram-reels__video-container pl-hg lg:px-25">
					<div className="lg:flex lg:flex-wrap lg:justify-between lg:items-center lg:mb-3">
						
						{ !props.show && (<ul className="instagram-reels__nav gap-[.5rem] lg:gap-[.375rem] hide-scrollbar list-style-none mx-auto flex border-b-0 text-center justify-start px-hg flex-nowrap overflow-scroll mb-[1rem] lg:mb-0 lg:overflow-hidden lg:mx-0 lg:px-0">
							<li className="flex items-center" key={`all`}><TabNav className={`whitespace-nowrap py-25 lg:py-1 px-2 lg:text-base lg:leading-[25px] ${activeTab === 'all' ? 'instagram-reels__nav--active font-normal lg:bg-body lg:text-white lg:focus:text-white lg:visited:text-white lg:hover:text-white' : 'text-gray-600'}`} title='All' active={activeTab === 'all'} onNavChange={() => setActiveTab('all')} ctaBgColor={generalSetting?.bfcm_cta_bg_color} ctaTextColor={generalSetting?.bfcm_cta_text_color} /></li>
							<li className="flex items-center" key={`hair`}><TabNav className={`whitespace-nowrap py-25 lg:py-1 px-2 lg:text-base lg:leading-[25px] ${activeTab === 'hair' ? 'instagram-reels__nav--active font-normal lg:bg-body lg:text-white lg:focus:text-white lg:visited:text-white lg:hover:text-white' : 'text-gray-600'}`} title='Hair' active={activeTab === 'hair'} onNavChange={() => setActiveTab('hair')} ctaBgColor={generalSetting?.bfcm_cta_bg_color} ctaTextColor={generalSetting?.bfcm_cta_text_color} /></li>
							<li className="flex items-center" key={`tan`}><TabNav className={`whitespace-nowrap py-25 lg:py-1 px-2 lg:text-base lg:leading-[25px] ${activeTab === 'tan' ? 'instagram-reels__nav--active font-normal lg:bg-body lg:text-white lg:focus:text-white lg:visited:text-white lg:hover:text-white' : 'text-gray-600'}`} title={store === 'ca' ? 'Tan' : 'Tan & SPF'} active={activeTab === 'tan'} onNavChange={() => setActiveTab('tan')} ctaBgColor={generalSetting?.bfcm_cta_bg_color} ctaTextColor={generalSetting?.bfcm_cta_text_color} /></li>
							<li className="flex items-center" key={`skincare`}><TabNav className={`whitespace-nowrap py-25 lg:py-1 px-2 lg:text-base lg:leading-[25px] ${activeTab === 'skin' ? 'instagram-reels__nav--active font-normal lg:bg-body lg:text-white lg:focus:text-white lg:visited:text-white lg:hover:text-white' : 'text-gray-600'}`} title='Skin' active={activeTab === 'skin'} onNavChange={() => setActiveTab('skin')} ctaBgColor={generalSetting?.bfcm_cta_bg_color} ctaTextColor={generalSetting?.bfcm_cta_text_color} /></li>
							<li className="flex items-center" key={`body`}><TabNav className={`whitespace-nowrap py-25 lg:py-1 px-2 lg:text-base lg:leading-[25px] ${activeTab === 'body' ? 'instagram-reels__nav--active font-normal lg:bg-body lg:text-white lg:focus:text-white lg:visited:text-white lg:hover:text-white' : 'text-gray-600'}`} title='Body' active={activeTab === 'body'} onNavChange={() => setActiveTab('body')} ctaBgColor={generalSetting?.bfcm_cta_bg_color} ctaTextColor={generalSetting?.bfcm_cta_text_color} /></li>
						</ul>) }
						<a href="/pages/reviews" className={`font-bold leading-2 text-body text-underline underline-offset-[.25rem] ${generalSetting?.bfcm_cta_bg_color === 'bg-dark' ? 'border-dark text-dark hover:bg-dark hover:text-white' : '' } hover:no-underline p-[1rem] hidden lg:inline-block`}>See All</a>
					</div>
                    <div className='px-hg'>
						{/* <TabContent active={activeTab === 'all'}> */}
							<Carousel.Wrapper emblaApi={emblaApi} className="-mx-hg">
								<Carousel.Inner emblaRef={emblaRef} className="lg:-mx-[.5rem] lg:!transform-none">
									{currentVideos.map((data: any, i: number) => (
										<InstagramCard
											key={`all-${data.item_id}-${i}`}
											classes="instagram-reels__card flex-grow-0 flex-shrink-0 w-[175px] basis-[175px] lg:w-1/4 lg:basis-1/4 mb-0 px-[.375rem] lg:px-[.5rem] lg:!transform-none"
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
						{/* </TabContent> */}
						{/* <TabContent active={activeTab === 'hair'}>
							<Carousel.Wrapper emblaApi={emblaApi} className="-mx-hg">
								<Carousel.Inner emblaRef={emblaRef} className="lg:-mx-g lg:!transform-none">
									{currentVideos.map((data: any, i: number) => (
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
						</TabContent> */}
						{/* <TabContent active={activeTab === 'tan'}>
							<Carousel.Wrapper emblaApi={emblaApi} className="-mx-hg">
								<Carousel.Inner emblaRef={emblaRef} className="lg:-mx-g lg:!transform-none">
									{currentVideos.map((data: any, i: number) => (
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
						</TabContent> */}
						{/* <TabContent active={activeTab === 'skin'}>
							<Carousel.Wrapper emblaApi={emblaApi} className="-mx-hg">
								<Carousel.Inner emblaRef={emblaRef} className="lg:-mx-g lg:!transform-none">
									{currentVideos.map((data: any, i: number) => (
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
						</TabContent> */}
						{/* <TabContent active={activeTab === 'body'}>
							<Carousel.Wrapper emblaApi={emblaApi} className="-mx-hg">
								<Carousel.Inner emblaRef={emblaRef} className="lg:-mx-g lg:!transform-none">
									{currentVideos.map((data: any, i: number) => (
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
						</TabContent> */}
						<a href="/pages/reviews" className={`instagram-reels__button font-bold text-body text-underline underline-offset-[.25rem] p-[1rem] ${generalSetting?.bfcm_cta_bg_color ? 'border-dark text-dark hover:bg-dark hover:text-white' : ''} hover:no-underline mt-[1rem] lg:hidden inline-block`}>
						See All
						</a>
                    </div>
                </div>
			</div>
		</div>
	);
};

export default RealResultCarousel;
