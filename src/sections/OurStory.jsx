import CarouselCustom from "@/components/CarouselCustom";
import ImageWithText from "@/compounds/ImageWithText";
import Play from '@/images/icons/play.svg';
import Close from '@/images/icons/close.svg';
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useRef } from "react";

const OurStoryTemplate = () => {
	const videoElem = useRef(null);
	const PAGE_TEMPLATE = {
		title: 'In a (coco) nutshell? We promise unBALIevably good hair and skin'
	};
	const CAROUSEL = [
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
		},
		{
			className: 'col-9 col-md-3 col-lg-1o5 mt-5',
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
		}
	];
	const [show, setShow] = useState(false);
	const handleOpen = () => {
		setShow(true);
	};
	const onShow = () => {
		if (videoElem !== null) {
			videoElem.current.load();
			videoElem.current.play();
		}
	};
	const handleClose = () => {
		if (videoElem !== null) {
			videoElem.current.pause();
			videoElem.current.currentTime = 0;
		}
		setShow(false);
	};

	const VIDEO_URL = 'https://cdn.shopify.com/s/files/1/0028/8253/5533/files/Pop_Up_Video_Journalist_-_1_reexport_2.mp4?v=1634105075';
	return (
		<>
			<section className="page-banner-image container-fluid d-flex position-relative justify-content-center align-items-center p-0">
				<h1 className="text-center position-absolute m-1 hero-font-size">{PAGE_TEMPLATE.title}</h1>
				<picture>
					<source srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/shutterstock_1458899696_1_5ae92fef-fad3-4f5d-9535-56a20209de68_1920X.jpg?v=1590066988" media="(min-width: 992px)" />
					<img src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/Screen_Shot_2021-04-14_at_19.10.49.png?v=1618402274" class="w-100" alt={PAGE_TEMPLATE.title} />
				</picture>
			</section>
			<section class="container text-center mt-5 mb-5">
				<h2>Our Story</h2>
				<p>Our story begins among the volcanic beaches and lush rainforests of Bali. Aussie expat Emily spent countless holidays exploring the Island paradise. From searching for balance in Ubud, to indulging in the best massages one day, ultra-luxe day spa visits the next, Emily always found endless inspiration – and rejuvenation – in Bali.</p>
				<p>Hiking up a volcano at dawn one day, an idea took root. What if she could bottle that Bali magic, with beauty products that combined luscious tropical ingredients with serious science?</p>
				<p>Doing some digging, Emily discovered Bali really is Eden for beauty lovers, with an endless bounty of skin-and-hair-loving fruits and plants. The jewel in the crown? Raw virgin coconuts – with Indonesia being the world’s largest producer of this nourishing, revitalising superfruit.</p>
				<p>With the final seed planted and the hero ingredient chosen, Coco & Eve was born!</p>
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

			<section className="page-award-slider text-center pt-5 pb-5 overflow-hidden">
				<div class="col-12 col-lg-4 ms-auto me-auto">
					<h2>We're #AwardWinning</h2>
					<p class="ms-auto me-auto mb-5">With 18 beauty awards under our belt, our products speak for themselves. Here’s a look at how we get down.</p>
				</div>
				<CarouselCustom id="loop2" imgLogo={true} items={CAROUSEL} slideNumber={4} roundedControl={true} centered={false} colLgGrid={5} useRow={false} />
			</section>
			<section className="page-video-banner container-fluid justify-content-center d-lg-flex align-items-center p-0">
				<figure className="video-card video-card--play-caption ms-auto col-lg-7 p-0 position-relative mb-0">
					<picture className="video-card__icon-left position-relative d-block" onClick={handleOpen}>
						<source srcset="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/AboutUs_banner05_DT_2x_eb45c1bd-6215-4dcf-8ded-c38f6931fe96_800x.jpg?v=1590061791" media="(min-width: 992px)" />
						<img src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/AboutUs_banner05_DT_2x_eb45c1bd-6215-4dcf-8ded-c38f6931fe96_800x.jpg?v=1590061791" class="w-100 rounded-0" alt="Behind the scenes" />
						<Play className="svg" />
					</picture>
					<span className="text-white fw-bold">Play Video</span>
				</figure>
				<div className="container">
					<div className="row mobile-wrapper">
						<div className="col-lg-4 pt-5 pb-5">
							<h4>Behind the scenes</h4>
							<h2>Take a sneak peak at our last shoot for Glow Figure!</h2>
						</div>
					</div>
				</div>
				<Modal show={show} onHide={handleClose} onShow={onShow} size="lg" dialogClassName="modal-dialog-centered video-modal">
					<div className="modal-body video-modal--body ratio ratio-16x9">
						<video ref={videoElem} controls>
							<source src={VIDEO_URL} type="video/mp4" />
						</video>
					</div>
					<button type="button" className="close position-absolute video-modal--icon btn-unstyled" data-dismiss="modal" aria-label="Close">
						<Close className="svg" />
					</button>
				</Modal>
			</section>

		</>
	);
};

export default OurStoryTemplate;
