import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import Autoplay from 'embla-carousel-autoplay';
import { useState, useRef } from "react";
import {
    PrevButton,
    NextButton,
    usePrevNextButtons,
    controlAutoplay,
} from '~/components/carousel/EmblaCarouselArrowButtons';

import ChevronNext from '~/images/icons/chevron-next.svg';
import ChevronPrev from '~/images/icons/chevron-prev.svg';
import Modal from "~/components/Modal";
import Close from '~/images/icons/close.svg';

const HowToCarousel = (props) => {

    const { videoData, isLoading, title } = props;
	const [modal, setModal] = useState(false);
	const [videoSrc, setvideoSrc] = useState('');
	const handlOpenModal = (e) => {
		const dataSrc = e.currentTarget.getAttribute('data-src');
		setvideoSrc(dataSrc);
		setModal(true);
	};

	const handlCloseModal = (open: boolean) => {
		setModal(open);
	};

    const options: EmblaOptionsType = {
		loop: true,
		align: 'start'
	};

    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: false, delay: 3000 })
	]);

    const {
        prevBtnDisabled: prevDisabled7,
        nextBtnDisabled: nextDisabled7,
        onPrevButtonClick: arrowClickPrev,
		onNextButtonClick: arrowClickNext
    } = usePrevNextButtons(emblaApi);

    const autoPlayClick = controlAutoplay(emblaApi);

    const colors: Record<string, { bg: string; text: string }> = {
        new: { bg: 'bg-secondary', text: 'text-white' },
        tan: { bg: 'bg-yellow-light', text: 'text-gray-600' },
        hair: { bg: 'bg-secondary-light', text: 'text-gray-600' },
        body: { bg: 'bg-primary-light', text: 'text-gray-600' },
        hot: { bg: 'bg-primary', text: 'text-white' },
        featured: { bg: 'bg-gray-400', text: 'text-gray-600' },
    };

	return (
		<section className="how-to no-gutters__in-container mb-4">
			{title && (<h2 className="text-center h1 mb-0 h1 pb-2 lg:pb-3 pt-1 w-full">The Ultimate “HOW TO”s</h2>)}
			<Carousel.Wrapper emblaApi={emblaApi}>
				<Carousel.Inner emblaRef={emblaRef} className="lg:-mx-g">
					{videoData.map((item, index) => (
						<div className="carousel__slide flex-grow-0 flex-shrink-0 w-full basis-full lg:w-1/2 lg:basis-1/2 px-0 lg:px-g sm:px-0">
							<figure className="border border-secondary-light">
								{!isLoading && (
									<picture className="relative w-full aspect-[4/3] m-0 cursor-pointer" data-src={item.video_url} onClick={handlOpenModal}>
										<img className="w-full aspect-[4/3] max-h-[11.125em] lg:max-h-[18.625em] object-cover" alt="Image Alt" loading="lazy" src={item.src}/>
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 54"
											className="absolute text-white w-full size-[3.25em] lg:size-[4em] fill-white top-0 bottom-0 m-auto lg:w-full">
												<path d="M27 0a27 27 0 1027 27A27 27 0 0027 0zm11.371 27.86a1.929 1.929 0 01-.866.866v.01L22.076 36.45a1.929 1.929 0 01-2.791-1.736V19.286a1.929 1.929 0 012.791-1.726L37.5 25.274a1.928 1.928 0 01.871 2.586z"></path>
												</svg>
									</picture>
								)}
								<figcaption className="p-2 ">
									{ item.tags.length > 0 ? item.tags.map((tag) =>
										<span className={`${colors[tag.toLowerCase()].bg} ${colors[tag.toLowerCase()].text} badge-tag font-weight-normal mr-1 rounded capitalize inline-block badge text-center`}>{tag}</span>
									) : ''}
									<p className="h2 mt-2 blog-video-card__title mb-0 cursor-pointer"><a href="#" className="no-underline hover:underline hover:text-body h2 text-body" data-src={item.video_url} onClick={handlOpenModal}>{item.title}</a></p>
								</figcaption>
							</figure>
						</div>
					))}
				</Carousel.Inner>
				<Carousel.Navigation>
					<PrevButton
						onClick={() => autoPlayClick(arrowClickPrev)}
						disabled={prevDisabled7}
						className="-left-hg lg:-left-g"
					>
						<span className="carousel__button--direction shadow-md left-0 bg-white w-[3.75em] h-[3.75em] absolute z-[-1] flex justify-center items-center right-0 rounded-full">
							<ChevronPrev className="svg svg--current-color" />
						</span>
					</PrevButton>
					<NextButton
						onClick={() => autoPlayClick(arrowClickNext)}
						disabled={nextDisabled7}
						className="-right-hg lg:-right-g"
					>
						<span className="carousel__button--direction shadow-md right-0 bg-white w-[3.75em] h-[3.75em] absolute z-[-1] flex justify-center items-center rounded-full">
							<ChevronNext className="svg svg--current-color" />
						</span>
					</NextButton>
				</Carousel.Navigation>
			</Carousel.Wrapper>
			
			{!isLoading && (
				<Modal className="modal-lg p-0" isOpen={modal} handleClose={() => handlCloseModal(false)}>
					<div className="relative block w-full overflow-hidden embed-responsive-16by9">
						<iframe className="rounded-[20px] block absolute top-0 bottom-0 left-0 w-full h-full border-none" src={videoSrc}></iframe>
					</div>
					<button type="button" className="close opacity-60 absolute top-[24px] right-[24px]" onClick={() => handlCloseModal(false)}>
						<Close className="svg--current-color w-[24px] h-[24px]" />
					</button>
				</Modal>
			)}
		</section>
	);
};

export default HowToCarousel;
