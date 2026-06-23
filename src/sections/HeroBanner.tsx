
import React, { useEffect, useMemo, useState } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import { DotButton, useDotButton } from '~/components/carousel/EmblaCarouselDotButton';
import Autoplay from 'embla-carousel-autoplay';
import dynamic from 'next/dynamic';
// import Modal from "~/components/Modal";
// import TermCondition from '~/components/modal/TermCondition';
const Modal = dynamic(() => import('~/components/Modal'));
const TermCondition = dynamic(() => import('~/components/modal/TermCondition'));
import Link from 'next/link';


const options: EmblaOptionsType = {
	loop: true,
};

const SLIDES = [
	{
		mobile_image: {
			url: "https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_d265bc14-4f75-42fd-9ab0-edc9c10b268f_722x.jpg?v=1772038620"
		},
		image: {
			url: "https://cdn.shopify.com/s/files/1/0286/1327/9779/files/public_62a2f115-b4f2-4093-a41b-a7b54b360369_1920x.jpg?v=1772038639"
		}
	},
];

const ImageBanner = (props: any) => {
	const { index, slide, trackEvent } = props;
	const isFirstSlide = index === 0;

	// Helper: append Shopify CDN transform params to any CDN URL.
	// width = pixel width, format=webp for modern compression, quality to tune file size.
	const cdn = (url: string, width: number, quality = 80) => {
		if (!url) return url;
		const sep = url.includes('?') ? '&' : '?';
		return `${url}${sep}width=${width}&format=webp&quality=${quality}`;
	};

	const desktopUrl = slide?.image_desktop?.url;
	const mobileUrl = slide?.image_mobile?.url;

	return (
		<div className="flex-grow-0 flex-shrink-0 w-full basis-full" key={index}>
			<Link onClick={() => { trackEvent('hero_banner_click', { category: 'Clickout' }) }} href={slide?.slide_url || ''} className="flex items-center justify-center">
				<picture className='lg:px-g pt-[111.83575%] lg:pt-[38.17708%] relative block w-full overflow-hidden'>
					<source srcSet={cdn(desktopUrl, 1920)} media="(min-width: 1601px)" width="1920" height="733" />
					<source srcSet={cdn(desktopUrl, 1600)} media="(min-width: 1401px)" width="1600" height="611" />
					<source srcSet={cdn(desktopUrl, 1400)} media="(min-width: 1201px)" width="1400" height="534" />
					<source srcSet={cdn(desktopUrl, 1200)} media="(min-width: 1025px)" width="1200" height="458" />
					<source srcSet={cdn(desktopUrl, 1140)} media="(min-width: 992px)" width="1140" height="435" />
					<img
						// @ts-ignore
						fetchpriority={isFirstSlide ? "high" : undefined}
						loading={isFirstSlide ? "eager" : "lazy"}
						className="block absolute left-0 right-0 bottom-0 object-cover top-0 w-full h-full"
						src={cdn(mobileUrl, 722)}
						alt={`slide ${index + 1}`}
						width="414"
						height="926"
						decoding="async"
					/>
				</picture>
			</Link>
		</div>
	)
};

const HeroBanner = (props: any) => {
	const { isStyleguide, region, tcPopups } = props;
	const slideData = props?.slideData?.hpSlideshow?.hpSlideshow?.[region]?.slideshows;
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: true, delay: 6000 })
	]);
	const { selectedIndex: idx1, onDotButtonClick: onClick1 } = useDotButton(emblaApi);
	useEffect(() => {
		if (!emblaApi) return;
		const autoplay = emblaApi?.plugins()?.autoplay;
		if (!autoplay) return;
	}, [emblaApi]);

	const [isOpen, setIsOpen] = useState(false);
	const handleOpenModal = () => {
		setIsOpen(!isOpen);
	}

	// let slides = [];
	// if (isStyleguide) {
	// 	slides = SLIDES;
	// } else {
	// 	slides = slideData?.filter((slide: any) => slide?.enabled_item) || [];
	// }

	const slides = useMemo(() => {
		if (isStyleguide) return SLIDES;
		return slideData?.filter((slide: any) => slide?.enabled_item) || [];
	}, [isStyleguide, slideData]);

	return (
		<>
			<section>
				{slides && slides.length === 1 && (
					<>
						{slides.map((slide: any, index: number) => (
							<ImageBanner key={index} index={index} slide={slide} trackEvent={props.trackEvent} />
						))}
					</>
				)}
				{slides && slides.length > 1 && (
					<Carousel.Wrapper emblaApi={emblaApi}>
						<Carousel.Inner emblaRef={emblaRef} className="">
							{slides.map((slide: any, index: number) => (
								<ImageBanner key={index} index={index} slide={slide} trackEvent={props.trackEvent} />
							))}
						</Carousel.Inner>
						<Carousel.Navigation>
							{slides.length > 1 && (
								<ol className="carousel__dots justify-end">
									{slides.map((_: any, index: number) => (
										<li key={index} className={`border border-white ${index === idx1 ? ' bg-white' : ''}`}>
											<DotButton
												onClick={() => onClick1(index)}
												className="carousel__dot"
												aria-label={`Go to slide ${index + 1}`}
											/>
										</li>
									))}
								</ol>
							)}
						</Carousel.Navigation>
					</Carousel.Wrapper>
				)}
				{slides && slides.length === 0 && <div className='bg-shimmer pt-[111.83575%] lg:pt-[38.17708%]'></div>}
			</section>
			{tcPopups?.enabled && (
				<>
					<div className="pt-1 text-center lg:text-left container lg:px-2">
						<button className="underline text-body text-sm" onClick={() => handleOpenModal()}>Terms & Conditions</button>
					</div>
					<Modal backdropClasses="lg:overflow-y-hidden" className="modal modal-dialog-centered !px-1 lg:!px-0 mt-0" isOpen={isOpen} handleClose={() => handleOpenModal()}>
						<TermCondition content={tcPopups} handleClose={() => handleOpenModal()} />
					</Modal>
				</>
			)}
		</>
	);
};

export default HeroBanner;
