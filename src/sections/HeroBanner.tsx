
import React, { useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import { DotButton, useDotButton } from '~/components/carousel/EmblaCarouselDotButton';
import Autoplay from 'embla-carousel-autoplay';
import Modal from "~/components/Modal";
import TermCondition from '~/components/modal/TermCondition';
import useHomepage from '../hooks/useHomepage';
import Link from 'next/link';

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
	const { isStyleguide, region, tcPopups } = props;
	const [isLoadingComp, setIsLoadingComp] = useState(true);
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: true, delay: 3000 })
	]);
	const { selectedIndex: idx1, onDotButtonClick: onClick1 } = useDotButton(emblaApi);
	const { data, slideShows, isLoading: isLoadingHomepage } = useHomepage(region || 'dev');
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
						<Carousel.Inner emblaRef={emblaRef} className="">
							{slides.map((slide: any, index: number) => (
								<div className="flex-grow-0 flex-shrink-0 w-full basis-full" key={index}>
									<Link onClick={() => { props.trackEvent('hero_banner_click', {category: 'Clickout'}) }} href={slide?.slide_link || ''} className="flex items-center justify-center">
										<picture className='lg:px-g pt-[111.83575%] lg:pt-[38.17708%] relative block w-full overflow-hidden'>
											<source srcSet={slide?.image?.url} media="(min-width: 1601px)" width="1920" height="733" />
											<source srcSet={slide?.image?.url} media="(min-width: 1401px)" width="1600" height="611" />
											<source srcSet={slide?.image?.url} media="(min-width: 1201px)" width="1400" height="534" />
											<source srcSet={slide?.image?.url} media="(min-width: 1025px)" width="1200" height="458" />
											<source srcSet={slide?.image?.url} media="(min-width: 992px)" width="1140" height="435" />
											<img className="block absolute left-0 right-0 bottom-0 object-cover top-0 w-full h-full" src={slide?.mobile_image?.url} alt={`slide ${index + 1}`} width="414" height="926" />
										</picture>
									</Link>
								</div>
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
										/>
									</li>
								))}
							</ol>
						)}
						</Carousel.Navigation>
					</Carousel.Wrapper>
				) : (
					<div className='bg-shimmer pt-[111.83575%] lg:pt-[38.17708%]'></div>
				)}
			</section>
			{!isLoadingComp && tcPopups?.enabled && (
				<>
					<div className="pt-1 text-center lg:text-left container">
						<a className="py-2 underline text-primary text-sm" role="button" onClick={() => handleOpenModal()}>Terms & Conditions</a>
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
