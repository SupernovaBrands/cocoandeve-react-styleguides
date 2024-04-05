// import CarouselCustom from "@/components/CarouselCustom";
import ImageWithText from "@/compounds/ImageWithText";
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import Play from '@/images/icons/play.svg';
import Close from '@/images/icons/close.svg';
import ChevronNext from '@/images/icons/chevron-next.svg';
import ChevronPrev from '@/images/icons/chevron-prev.svg';
import { useState, useRef } from "react";
import Carousel from '@/components/carousel/EmblaCarouselMulti';
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
	controlAutoplay,
} from '@/components/carousel/EmblaCarouselArrowButtons';
import Modal from "@/components/Modal";

const OurStoryTemplate = () => {
	const videoElem = useRef(null);
	const PAGE_TEMPLATE = {
		title: 'In a (coco) nutshell? We promise unBALIevably good hair and skin'
	};
	const CAROUSEL = [
		{
			className: 'w-3/4 md:w-1/4 lg:w-5/12 mt-5',
			id: 1,
			src: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/SheFinds_2x_db206aa6-bf80-4da2-b1e9-db5e9e32cd45_large.png?v=1590066932'
		},
		{
			className: 'col-9 col-md-3 col-lg-1o5',
			id: 2,
			src: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/BlinkBeauty_2x_b45041a0-50c8-49a6-91af-c477dd647e48_large.png?v=1590061807'
		},
		{
			className: 'col-9 col-md-3 col-lg-1o5 mt-5',
			id: 3,
			src: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/Fabulous_2x_4797d4b8-c77e-4cf9-8039-850c6927f083_large.png?v=1590062349'
		},
		{
			className: 'col-9 col-md-3 col-lg-1o5',
			id: 4,
			src: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/Glamour_2x_967b006f-fe8b-4520-8399-e9af7ac1240f_large.png?v=1590062483'
		},
		{
			className: 'col-9 col-md-3 col-lg-1o5 mt-5',
			id: 5,
			src: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/HairAwards_2x_d848289b-029f-4e59-bade-babf3e997467_large.png?v=1590062402'
		},
		{
			className: 'col-9 col-md-3 col-lg-1o5',
			id: 6,
			src: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/Nylon_2x_897af936-0bdf-47e3-9d74-e59e4a8913a7_large.png?v=1590065473'
		},
		{
			className: 'col-9 col-md-3 col-lg-1o5 mt-5',
			id: 7,
			src: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/PureBeauty_gold_2x_60af1998-97f8-479a-b5a4-ce558e3ffb2e_large.png?v=1590065547'
		},
		{
			className: 'col-9 col-md-3 col-lg-1o5',
			id: 8,
			src: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/PureBeauty_silver_2x_4fb96895-a2f4-4fb3-980e-da7f237773c7_large.png?v=1590065519'
		}
	];
	// const [show, setShow] = useState(false);

	const [modal, setModal] = useState(false);
	const handlOpenModal = (open: boolean) => {
		setModal(open);
		if (videoElem) {
			if (modal) {
				videoElem.current?.play();
			} else {
				videoElem.current?.pause();
				if (videoElem && videoElem.current) videoElem.current.currentTime = 0;
			}
		}
	};

	const options: EmblaOptionsType = {
		loop: true,
	};
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: true, delay: 3000 })
	]);
	const {
		onPrevButtonClick: arrowClickPrev,
		onNextButtonClick: arrowClickNext
	} = usePrevNextButtons(emblaApi);
	const autoPlayClick = controlAutoplay(emblaApi);

	const VIDEO_URL = 'https://cdn.shopify.com/s/files/1/0028/8253/5533/files/Pop_Up_Video_Journalist_-_1_reexport_2.mp4?v=1634105075';
	return (
		<>
			<section className="page-banner-image flex relative justify-center items-center p-0">
				<h1 className="text-center absolute m-1 text-[2em] lg:text-[3.25em] text-white">{PAGE_TEMPLATE.title}</h1>
				<picture>
					<source srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/shutterstock_1458899696_1_5ae92fef-fad3-4f5d-9535-56a20209de68_1920X.jpg?v=1590066988" media="(min-width: 992px)" />
					<img src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/Screen_Shot_2021-04-14_at_19.10.49.png?v=1618402274" className="w-100" alt={PAGE_TEMPLATE.title} />
				</picture>
			</section>
			<section className="container text-center mt-5 mb-5">
				<h2 className="mb-1">Our Story</h2>
				<p className="mb-g">Our story begins among the volcanic beaches and lush rainforests of Bali. Aussie expat Emily spent countless holidays exploring the Island paradise. From searching for balance in Ubud, to indulging in the best massages one day, ultra-luxe day spa visits the next, Emily always found endless inspiration – and rejuvenation – in Bali.</p>
				<p className="mb-g">Hiking up a volcano at dawn one day, an idea took root. What if she could bottle that Bali magic, with beauty products that combined luscious tropical ingredients with serious science?</p>
				<p className="mb-g">Doing some digging, Emily discovered Bali really is Eden for beauty lovers, with an endless bounty of skin-and-hair-loving fruits and plants. The jewel in the crown? Raw virgin coconuts – with Indonesia being the world’s largest producer of this nourishing, revitalising superfruit.</p>
				<p className="mb-g">With the final seed planted and the hero ingredient chosen, Coco & Eve was born!</p>
				<ImageWithText
					src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/AboutUs_banner03_DT_2x_1000x_a2009ba0-e16e-404e-9e49-f2c1572890ab.jpg?v=1618403172"
					srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/AboutUs_banner03_DT_2x_dcddf728-2bc3-4e2b-9f01-4fb0b3366751_400x.jpg?v=1590061764">
					<h2 className="mb-2">We've spent years testing, developing and perfecting our formulas</h2>
					<p>We’re passionate about our customers, so we never use drying and damaging sulfates, phthalates or parabens, (unlike 98.9% of beauty products!). We also love our furry friends, so Coco & Eve is proudly 100% vegan and cruelty-free.</p>
				</ImageWithText>

				<ImageWithText
					reverse={true}
					src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/AboutUs_banner04_DT_2x_1000x_74c1ad4b-cb44-4123-a152-12d7495fbca4.jpg?v=1618404879"
					srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/AboutUs_banner04_DT_2x_6b055d51-178d-47e5-a6b1-c273f08a76aa_800x.jpg?v=1590061796">
					<h2 className="mb-2 h1">We've spent years testing, developing and perfecting our formulas</h2>
					<p>We’re passionate about our customers, so we never use drying and damaging sulfates, phthalates or parabens, (unlike 98.9% of beauty products!). We also love our furry friends, so Coco & Eve is proudly 100% vegan and cruelty-free.</p>
				</ImageWithText>
			</section>

			<section className="page-award-slider bg-yellow-light text-center pt-5 pb-5 overflow-hidden">
				<div className="px-hg lg:px-g w-full lg:w-1/3 ml-auto mr-auto">
					<h2 className="mb-1">We're #AwardWinning</h2>
					<p className="ml-auto mr-auto mb-5">With 18 beauty awards under our belt, our products speak for themselves. Here’s a look at how we get down.</p>
				</div>
				{/* <CarouselCustom id="loop2" imgLogo={true} items={CAROUSEL} slideNumber={4} roundedControl={true} centered={false} colLgGrid={5} useRow={false} /> */}
				<Carousel.Wrapper emblaApi={emblaApi} className="-mx-hg">
					<Carousel.Inner emblaRef={emblaRef} className="lg:-mx-g">
						{CAROUSEL.map((data, i) => {
							const odd = Math.abs(i % 2) == 1;
							return (
								<div className={`carousel__slide flex-grow-0 flex-shrink-0 w-3/4 basis-3/4 md:w-1/4 md:basis-1/4 lg:w-[20%] lg:basis-[20%] px-hg lg:px-g ${odd ? 'mt-5' : ''}`} key={data.id}>
									<div className="flex items-center justify-center">
										<img className="block w-full" src={data.src} alt={`slide ${data.id + 1}`} />
									</div>
								</div>
							)
						})}
					</Carousel.Inner>
					<Carousel.Navigation>
						<PrevButton
							onClick={() => autoPlayClick(arrowClickPrev)}
							className="lg:-left-0 w-[15%] opacity-90"
						>
							<span className="carousel__button--half-rounded left-0 lg:-left-[2.5em] bg-white w-full lg:w-[6.094em] h-[6.094em] absolute z-[-1] flex justify-center items-center right-0 rounded-tr-full rounded-br-full lg:rounded-full">
								<ChevronPrev className="w-[1.625em] h-[1.625em] svg--current-color lg:-mr-[2em]" />
							</span>
						</PrevButton>
						<NextButton
							onClick={() => autoPlayClick(arrowClickNext)}
							className="lg:-right-0 w-[15%] opacity-90"
						>
							<span className="carousel__button--half-rounded right-0 lg:-right-[2.5em] bg-white w-full lg:w-[6.094em] h-[6.094em] absolute z-[-1] flex justify-center items-center rounded-tl-full rounded-bl-full lg:rounded-full">
								<ChevronNext className="w-[1.625em] h-[1.625em] svg--current-color lg:-ml-[2em]" />
							</span>
						</NextButton>
					</Carousel.Navigation>
				</Carousel.Wrapper>
			</section>
			<section className="bg-body-light w-full justify-center lg:flex items-center p-0">
				<figure className="ml-auto lg:w-7/12 lg:basis-7/12 grow-0 p-0 relative mb-0">
					<picture className={`relative block cursor-pointer lg:z-[2]`} onClick={() => handlOpenModal(true)}>
						<source srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/AboutUs_banner05_DT_2x_eb45c1bd-6215-4dcf-8ded-c38f6931fe96_800x.jpg?v=1590061791" media="(min-width: 992px)" />
						<img src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/AboutUs_banner05_DT_2x_eb45c1bd-6215-4dcf-8ded-c38f6931fe96_800x.jpg?v=1590061791" className="w-full rounded-0" alt="Behind the scenes" />
						<div className="flex items-center absolute bottom-[35px] lg:bottom-[44px] left-[32px] lg:left-[48.8893px]">
							<Play className="svg--current-color w-[57px] h-[57px] lg:w-[88px] lg:h-[88px] text-white " />
							<span className="text-white font-bold text-[1.625em] lg:text-[2.75em] ml-1 lg:ml-g">Play Video</span>
						</div>
					</picture>
				</figure>
				<div className="container px-hg lg:absolute">
					<div className="flex flex-wrap mobile-wrapper -mx-hg lg:-mx-g px-hg">
						<div className="px-hg lg:px-g lg:w-1/3 pt-5 pb-5">
							<h4 className="mb-1">Behind the scenes</h4>
							<h2 className="mb-1">Take a sneak peak at our last shoot for Glow Figure!</h2>
						</div>
					</div>
				</div>
			</section>

			<Modal className="modal-lg" isOpen={modal} handleClose={() => handlOpenModal(false)}>
				<div className="relative">
					<video ref={videoElem} controls className="rounded-[20px]" autoPlay playsInline webkit-playsinline>
						<source src={VIDEO_URL} type="video/mp4" />
					</video>
				</div>
				<button type="button" className="close opacity-60 absolute top-[24px] right-[24px]" onClick={() => handlOpenModal(false)}>
					<Close className="svg--current-color w-[24px] h-[24px]" />
				</button>
			</Modal>

		</>
	);
};

export default OurStoryTemplate;
