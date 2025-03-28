import React, { useState, useEffect, useCallback, useRef } from 'react';
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
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
		emblaThumbsApi.scrollPrev();
		emblaMainApi.scrollPrev();
	};

	const pdpImageNext = () => {
		if (!emblaMainApi || !emblaThumbsApi) return;
		emblaThumbsApi.scrollNext();
		emblaMainApi.scrollNext();
	};

	const onThumbClick = (index: number) => {
		if (!emblaMainApi || !emblaThumbsApi) return;
		emblaMainApi.scrollTo(index);
	};

	const onSelect = useCallback(() => {
		if (!emblaMainApi || !emblaThumbsApi) return;
		setSelectedIndex(emblaMainApi.selectedScrollSnap());
		emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
	}, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

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
		console.log('isVisible', isVisible);
        if (isVisible) {
            startVideoOnMouseMove();
        } else {
            stopVideoOnMove();
        }
    }, [isVisible, startVideoOnMouseMove, stopVideoOnMove]);

	return (
		<>
			<div className="lg:w-1/12 lg:order-2 lg:sticky lg:top-[80px] px-0 lg:px-0 hidden lg:block">
				<div className={`carousel w-full hidden lg:flex items-center mt-[25px] `}>
					<Carousel.Wrapper className={`w-full flex flex-col items-center`} emblaApi={emblaThumbsApi}>
						<Carousel.Inner emblaRef={emblaThumbsRef} className={`flex flex-col h-[520px]`}>
							{slides.map((slide, index) => (
								<div className={` max-w-[70px] flex flex-[0_0_70px] ${index === 0 ? 'mb-0' : 'my-1'} rounded`} key={index}>
									<button type="button" className={`${selectedIndex === index ? 'border border-primary' : ''} rounded`} onClick={() => onThumbClick(index)}>
										{isDesktop && (
											<picture>
												<source srcSet={`${slide.src.replace('1140x1140', '150x150').replace('/public', '/150x').replace('_text_', `${index + 1}`)}`} media="(min-width: 769px)" />
												<img className="w-[70px] rounded b" src={`${slide.src.replace('1140x1140', '150x150').replace('/public', '/150x').replace('_text_', `${index + 1}`)}`} width={70} height={70} />
											</picture>
										)}
									</button>
								</div>
							))}
							{videoStack?.video_thumbnail?.url && (
								<div className={` max-w-[70px] flex flex-[0_0_70px] my-1 rounded relative`} key={slides.length}>
									<button type="button" className={`${selectedIndex === slides.length ? 'border border-primary' : ''} rounded`} onClick={() => onThumbClick(slides.length)}>
										{isDesktop && (
											<>
												<picture>
													<source srcSet={`${videoStack?.video_thumbnail?.url || slides[0].src.replace('1140x1140', '150x150').replace('/public', '/150x').replace('_text_', `${slides.length + 1}`)}`} media="(min-width: 769px)" />
													<img className="w-[70px] rounded b" src={`${videoStack?.video_thumbnail?.url || slides[0].src.replace('1140x1140', '150x150').replace('/public', '/150x').replace('_text_', `${slides.length + 1}`)}`} width={70} height={70} />
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
							{slides.length > 6 && (	
								<>
									<PrevButton
										onClick={pdpImagePrev}
										className="carousel__gallery-thumb w-5 h-5 rounded-full shadow-lg text-primary bg-white left-auto right-auto top-[-25px]"
									>
										<ChevronPrev className="w-g h-g svg--current-color" />
									</PrevButton>
									<NextButton
										onClick={pdpImageNext}
										className="carousel__gallery-thumb mt-auto w-5 h-5 rounded-full shadow-lg text-primary bg-white left-auto right-auto bottom-[-25px]"
									>
										<ChevronNext className="w-g h-g svg--current-color" />
									</NextButton>
								</>
							)}
						</Carousel.Navigation>
					</Carousel.Wrapper>
				</div>
			</div>
			<div className="product-image-carousel__container w-full lg:w-6/12 lg:order-2 lg:sticky lg:top-[80px] px-0 lg:px-g">
				<div className="carousel mb-1 lg:mb-2 lg:sticky aspect-ratio overflow-hidden">
					<Carousel.Wrapper emblaApi={emblaMainApi}>
						<Carousel.Inner emblaRef={emblaMainRef} className="w-full">
							{slides.map((slide, index) => (
								<div className="flex-grow-0 flex-shrink-0 basis-[97.5%] w-[97.5%] pr-[4px] lg:pr-0 lg:basis-full lg:w-full" key={index}>
									<picture className="flex items-center justify-center">
										<source srcSet={`${slide.src.replace('_text_', `Slide ${index + 1}`)}`} media="(min-width: 992px)" />
										<img height="367" width="367" fetchPriority={index > -1 ? 'high' : 'low'} className="block w-full rounded-md lg:rounded-none" src={`${slide.src.replace('1140x1140', '614x614').replace('/public', '/592x').replace('_text_', `Slide ${index + 1}`)}`} alt={`slide ${index + 1}`} />
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
		</>
	);
};

export default ProductImageCarousel;
