import React, { useState, useEffect, useCallback, useRef } from 'react';
import { EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { PrevButton, NextButton } from '~/components/carousel/EmblaCarouselArrowButtons';
import ChevronNext from '~/images/icons/chevron-down.svg';
import ChevronPrev from '~/images/icons/chevron-up.svg';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import Play from '~/images/icons/play.svg';
import { useIsVisible } from "~/hooks/useIsVisible";

interface ImageSlide {
	id: number
	src: string
}

type PropType = {
	slides: ImageSlide[]
	bottomBadge?: string
	activeImageIndex: number
	videoStack: {
		video_url: string
		video_thumbnail: {
			url: string
		}
	}
}

const useMediaQuery = (query) => {
	const [matches, setMatches] = useState(false);
  
	useEffect(() => {
	  const media = window.matchMedia(query);
	  if (media.matches !== matches) {
		setMatches(media.matches);
	  }
	  const listener = () => setMatches(media.matches);
	  media.addListener(listener);
	  return () => media.removeListener(listener);
	}, [matches, query]);
  
	return matches;
};

const ProductImageCarousel: React.FC<PropType> = ({ slides: slideBoxes, bottomBadge, activeImageIndex, videoStack }) => {
	const isDesktop = useMediaQuery('(min-width: 769px)');
	const [selectedIndex, setSelectedIndex] = useState(activeImageIndex);
	const [scrollProgress, setScrollProgress] = useState(0);
	const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true, align: 'start'});
	let slides = slideBoxes;
	// if (slides.length <= 8 && slides.length > 7) {
	// 	slides.push(slides[slides.length / 2]);
	// }
	const slidesCount = slides.length + (videoStack?.video_thumbnail?.url ? 1 : 0);
	const { isVisible, targetRef } = useIsVisible(
        {
            root: null,
            rootMargin: "200px",
            threshold: 0.1,
        },
        false,
    );

	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		setSelectedIndex(activeImageIndex);
		onThumbClick(activeImageIndex);
	}, [activeImageIndex]);

	const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
		align: 'start',
		dragFree: true,
		loop: false,
		axis: 'y',
	});

	const pdpImagePrev = () => {
		if (!emblaMainApi || !emblaThumbsApi) return;
		// emblaThumbsApi.scrollPrev();
		emblaMainApi.scrollPrev();
	};

	const pdpImageNext = () => {
		if (!emblaMainApi || !emblaThumbsApi) return;
		// emblaThumbsApi.scrollNext();
		emblaMainApi.scrollNext();
	};

	const onThumbClick = (index: number) => {
		if (!emblaMainApi || !emblaThumbsApi) return;
		emblaMainApi.scrollTo(index);
	};

	const onSelect = useCallback(() => {
		if (!emblaMainApi || !emblaThumbsApi) return;
		const index = emblaMainApi.selectedScrollSnap();
		setSelectedIndex(index);
		emblaThumbsApi.scrollTo(index);
		
		// Force the active thumb into view
		thumbRefs.current[index]?.scrollIntoView({
			block: 'nearest',
			behavior: 'smooth',
		});
	}, [emblaMainApi, emblaThumbsApi]);

	const onScroll = useCallback((emblaMainApi: EmblaCarouselType) => {
		const progress = Math.max(0, Math.min(1, emblaMainApi.scrollProgress()));
		setScrollProgress(progress * 100);
	}, []);

	useEffect(() => {
		if (!emblaMainApi) return;
		onSelect();
		emblaMainApi.on('select', onSelect);
		emblaMainApi.on('reInit', onSelect);
		emblaMainApi.on('select', onScroll);
		emblaMainApi.on('reInit', onScroll);
		emblaMainApi.on('scroll', onScroll);

	}, [emblaMainApi, onSelect, onScroll]);

	const startVideoOnMouseMove = useCallback(async () => {
		console.log('startVideoOnMouseMove');
        try {
            await videoRef.current.play();
        } catch (e) {
        // do nothing
        }
    }, []);

    const stopVideoOnMove = useCallback(() => {
        try {
            videoRef.current.pause();
        } catch (e) {
        // do nothing
        }
    }, []);

	useEffect(() => {
        if (isVisible) {
            startVideoOnMouseMove();
        } else {
            stopVideoOnMove();
        }
    }, [isVisible, startVideoOnMouseMove, stopVideoOnMove]);

	const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

	return (
		<div className="flex w-full lg:w-7/12 lg:sticky lg:top-[115px] lg:self-start">
			<div className="lg:overflow-hidden lg:w-[100px] lg:basis-[100px] lg:order-2 px-0 lg:px-0 hidden lg:block">
				<div className={`carousel w-full hidden lg:flex items-center`}>
					<Carousel.Wrapper className={`w-full flex flex-col items-center md:h-[430px] [@media(min-width:1200px)]:h-[570px] lg:justify-center`} emblaApi={emblaThumbsApi}>
						<Carousel.Inner emblaRef={emblaThumbsRef} className={`flex flex-col`} innerClass={`lg:h-[430px]`}>
							{slides.map((slide, index) => (
								<div className={` max-w-[70px] flex flex-[0_0_70px] mb-2`} key={index}>
									<button 
										type="button" 
										ref={(el) => { thumbRefs.current[index] = el; }}
										className={`${selectedIndex === index ? 'border border-primary' : 'border border-transparent'} `} 
										onClick={() => onThumbClick(index)} 
										aria-label="View product thumbnail">
										{isDesktop && (
											<picture>
												<source srcSet={`${slide.src.replace('1140x1140', '150x150').replace('/public', '/150x').replace('_text_', `${index + 1}`)}`} media="(min-width: 769px)" />
												<img loading="lazy" alt={`Thumbnail image of Product Image ${index}`} className="w-[70px]" src={`${slide.src.replace('1140x1140', '150x150').replace('/public', '/150x').replace('_text_', `${index + 1}`)}`} width={70} height={70} />
											</picture>
										)}
									</button>
								</div>
							))}
							{videoStack?.video_thumbnail?.url && (
								<div className={` max-w-[70px] flex flex-[0_0_70px] my-1 relative`} key={slides.length}>
									<button 
										type="button" 
										ref={(el) => { thumbRefs.current[slides.length] = el; }}
										className={`${selectedIndex === slides.length ? 'border border-primary' : ''} `} 
										onClick={() => onThumbClick(slides.length)} 
										aria-label="View product thumbnail">
										{isDesktop && (
											<>
												<picture>
													<source srcSet={`${videoStack?.video_thumbnail?.url || slides[0].src.replace('1140x1140', '150x150').replace('/public', '/150x').replace('_text_', `${slides.length + 1}`)}`} media="(min-width: 769px)" />
													<img alt={`Thumbnail image of Product Video`} className="w-[70px]" src={`${videoStack?.video_thumbnail?.url || slides[0].src.replace('1140x1140', '150x150').replace('/public', '/150x').replace('_text_', `${slides.length + 1}`)}`} width={70} height={70} />
												</picture>
												<div className="absolute inset-0 flex items-center justify-center">
													<Play className="svg fill-gray-100 h-[2em] fill-sm" />
												</div>
											</>
										)}
									</button>
								</div>
							)}
						</Carousel.Inner>
						<Carousel.Navigation>
							{slides.length > 5 && (	
								<>
									<PrevButton
										onClick={pdpImagePrev}
										className="carousel__gallery-thumb w-[70px] h-[70px] text-body bg-white left-auto right-auto md:-top-[25px] [@media(min-width:1200px)]:-top-[10px]"
									>
										<ChevronPrev className="w-g h-g svg--current-color" />
									</PrevButton>
									<NextButton
										onClick={pdpImageNext}
										className="carousel__gallery-thumb mt-auto w-[70px] h-[70px] text-body bg-white left-auto right-auto md:-bottom-[25px] [@media(min-width:1200px)]:-bottom-[10px]"
									>
										<ChevronNext className="w-g h-g svg--current-color" />
									</NextButton>
								</>
							)}
						</Carousel.Navigation>
					</Carousel.Wrapper>
				</div>
			</div>
			<div className="product-image-carousel__container w-full lg:w-6/12 lg:flex-1 lg:order-2 px-0 lg:px-g">
				<div className="carousel mb-1 lg:mb-0 lg:sticky aspect-ratio overflow-hidden">
					<Carousel.Wrapper emblaApi={emblaMainApi}>
						<Carousel.Inner emblaRef={emblaMainRef} className="w-full">
							{slides.map((slide, index) => (
								<div className="flex-grow-0 flex-shrink-0 basis-[97.5%] w-[97.5%] pr-[4px] lg:pr-0 lg:basis-full lg:w-full" key={index}>
									<picture className="flex items-center justify-center">
										<source srcSet={`${slide.src.replace('_text_', `Slide ${index + 1}`)}`} media="(min-width: 992px)" />
										<img loading={index === 0 ? 'eager' : 'lazy'} height="367" width="367" 
											// @ts-ignore
											fetchpriority={index === 0 ? 'high' : 'low'} className="block w-full rounded-md lg:rounded-none" src={`${slide.src.replace('1140x1140', '614x614').replace('/public', '/592x').replace('_text_', `Slide ${index + 1}`)}`} alt={`slide ${index + 1}`} />
									</picture>
								</div>
							))}
							{videoStack?.video_url && (
								<div ref={targetRef as any} className="flex-grow-0 flex-shrink-0 basis-[97.5%] w-[97.5%] pr-[4px] lg:pr-0 lg:basis-full lg:w-full flex items-center" key={slides.length}>
									<video width="320" height="240"  className="w-full h-auto max-w-full" muted={true} playsInline={true} loop={true} autoPlay ref={videoRef} >
										<source src={videoStack?.video_url} type="video/mp4" />
										Your browser does not support the video tag.
									</video>
								</div>
							)}
						</Carousel.Inner>
						{bottomBadge && (<span className="bg-black absolute text-white p-1 w-full text-center left-0 right-0 bottom-0">{bottomBadge}</span>)}
					</Carousel.Wrapper>
				</div>
				<div className="px-g lg:hidden">
					<div className="carousel__progress bg-gray-400">
						<div
							className="carousel__progress--scroll bg-gray-500"
							style={{ left: `${scrollProgress}%`, width: `${((1 / slides.length) * 100) + 2.5}%` }} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductImageCarousel;
