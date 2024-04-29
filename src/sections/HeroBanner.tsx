
import React, { useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import { DotButton, useDotButton } from '~/components/carousel/EmblaCarouselDotButton';
import Autoplay from 'embla-carousel-autoplay';
import Modal from "~/components/Modal";
import TermCondition from '~/components/modal/TermCondition';
import useHomepage from '../hooks/useHomepage';

const options: EmblaOptionsType = {
	loop: true,
};

const SLIDES = [
	{
		mobile_image: {
			url: "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/1a1b1bcf-b955-488b-028f-e8899fe1e400/public"
		},
		image: {
			url: "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/ee973277-9d5b-42dc-21d5-ad82a8589f00/public"
		}
	},
];

const HeroBanner = (props: any) => {
	const { isStyleguide } = props;
	const [isLoadingComp, setIsLoadingComp] = useState(true);
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: true, delay: 3000 })
	]);
	const { selectedIndex: idx1, onDotButtonClick: onClick1 } = useDotButton(emblaApi);
	const { data, slideShows, isLoading: isLoadingHomepage } = useHomepage();
	useEffect(() => {
		if (!emblaApi) return;
		const autoplay = emblaApi?.plugins()?.autoplay;
		if (!autoplay) return;
	}, [emblaApi]);

	const [isOpen, setIsOpen] = useState(false);
	const handleOpenModal = () => {
		setIsOpen(!isOpen);
	}

	useEffect(() => {
		setIsLoadingComp(false);
	}, []);

	let slides = [];
	if (isStyleguide) {
		slides = SLIDES;
	} else {
		slides = slideShows.filter((slide) => slide.show);
	}

	return (
		<>
			<section>
				{!isLoadingHomepage && slides && slides.length > 0 ? (
					<Carousel.Wrapper emblaApi={emblaApi}>
						<Carousel.Inner emblaRef={emblaRef} className="lg:-mx-g">
							{slides.map((slide: any, index: number) => (
								<div className="flex-grow-0 flex-shrink-0 w-full basis-full" key={index}>
									<div className="flex items-center justify-center">
										<picture>
											<source srcSet={slide?.image?.url} media="(min-width: 1025px)" width="1200" height="458" />
											<img className="block w-full" src={slide?.mobile_image?.url} alt={`slide ${index + 1}`} />
										</picture>
									</div>
								</div>
							))}
						</Carousel.Inner>
						<Carousel.Navigation>
						<ol className="carousel__dots justify-end">
								{slides.map((_: any, index: number) => (
									<li key={index} className={`border border-white ${index === idx1 ? ' bg-white' : ''}`}>
										<DotButton
											onClick={() => onClick1(index)}
											className="carousel__dot"
										/>
									</li>
								))}
							</ol>
						</Carousel.Navigation>
					</Carousel.Wrapper>
				) : (
					<></>
				)}
			</section>
			{!isLoadingComp && (
				<>
					<div className="pt-1 text-center lg:text-left container">
						<a className="py-2 underline text-primary text-sm" role="button" onClick={() => handleOpenModal()}>Terms and Conditions</a>
					</div>
					<Modal className="modal-lg" isOpen={isOpen}>
						<TermCondition handleClose={() => handleOpenModal()} />
					</Modal>
				</>
			)}
		</>
	);
};

export default HeroBanner;
