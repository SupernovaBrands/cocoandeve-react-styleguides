import Modal from "~/components/Modal";
import ModalWaitlist from "~/components/modal/Waitlist";
import ModalNewsletter from "~/components/modal/Newsletter";
import { useRef, useState } from "react";
import Sweepstakes from "~/components/modal/Sweepstakes";
import CheckoutUpsell from "~/components/modal/CheckoutUpsell";
import Button from "~/components/Button";
import Birthday from "~/components/modal/Birthday";
import ExitIntent from "~/components/modal/ExitIntent";

const Modals = () => {
	const [isOpen, toggle] = useState(false);
	const handlOpenModal = (open: boolean) => {
		toggle(open);
	};

	const [modal2, toggleModal2] = useState(false);
	const handlOpenModal2 = (open: boolean) => {
		toggleModal2(open);
	};

	const [modal3, toggleModal3] = useState(false);
	const handlOpenModal3 = (open: boolean) => {
		toggleModal3(open);
	};

	const [modal4, toggleModal4] = useState(false);
	const handlOpenModal4 = (open: boolean) => {
		toggleModal4(open);
	};

	const [modal5, toggleModal5] = useState(false);
	const handlOpenModal5 = (open: boolean) => {
		toggleModal5(open);
	};

	const [modal6, toggleModal6] = useState(false);
	const handlOpenModal6 = (open: boolean) => {
		toggleModal6(open);
	};

	const MODAL_WAITLIST = {
		image: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/b653f2b3-08b7-421c-351a-3a5b70a27e00/public',
		open: false,
		title: 'Oh coco-nuts!',
		handle: 'shampoo-conditioner-set'
	};

	const UPSELLS = [
		{
			id: 1,
			name: 'Like A Virgin Hair Masque',
			price: '$44.90',
			crossedPrice: '$34.90',
			src: 'https://via.placeholder.com/115x115',
			srcSet: 'https://via.placeholder.com/115x115'
		},
		{
			id: 2,
			name: 'Like A Virgin Hair Masque',
			price: '$44.90',
			crossedPrice: '$34.90',
			src: 'https://via.placeholder.com/115x115',
			srcSet: 'https://via.placeholder.com/115x115'
		},
		{
			id: 3,
			name: 'Bali Buffing Sugar',
			price: '$44.90',
			crossedPrice: '$34.90',
			src: 'https://via.placeholder.com/115x115',
			srcSet: 'https://via.placeholder.com/115x115'
		}
	];

	const MODAL_NEWSLETTER = {
		"nbp_img": {
			"alt": "welcomepopup_2_mobile_1_764x332_crop_center.png",
			"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/3391e840-d687-4451-4640-8a1987e58200/public"
		},
		"nbp_code": "",
		"nbp_desc": "Get <b> 10% OFF*</b> your first order plus first access to new product launches, exclusive offers, expert tips and routines.",
		"nbp_note": "Receive exclusive offers via email or recurring automated marketing messages. For more info see our <a class=\"font-weight-bold text-underline text-dark\" href=\"/pages/privacy-policy\">Privacy Policy</a>. Message frequency varies. Msg &amp; data rates may apply. Sign up not required for purchase.*Excludes travel size items and accessories.",
		"nbp_img_lg": {
			"alt": "welcomepopup_1_.Desktoppng_1428x940_crop_center.png",
			"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/3baf7c71-89aa-481a-962d-d06e75017700/public"
		},
		"nbp_submit": "Submit",
		"nbp_enabled": false,
		"nbp_heading": "Join the club",
		"nbp_smsbump": "7580145",
		"floating_btn": "Want 10% off?",
		"nbp_bg_color": "bg-yellow-light",
		"nbp_email_ph": "Email",
		"nbp_phone_ph": "Phone",
		"nbp_completed": "🎉<br>Sign-up successful! ",
		"nbp_heading_2": "& get 10% OFF*!",
		"nbp_desc_color": "text-dark",
		"nbp_heading_color": "text-dark",
		"nbp_completed_desc": "Use code for your gift!",
		"nbp_heading_2_color": "text-dark",
		"nbp_comliance_position": "above_cta"
	};

	const MODAL_SWEEPSTAKE = {
		src: 'https://via.placeholder.com/690x414/FFF2F4',
		srcSet: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/90d9a664-debc-4d42-8de7-bf77c6f94f00/public',
		title: 'Win $500 of products',
		subtitle: 'and exclusive savings on our Black Friday <br />Deals and future offers!',
		sweepstakes_popup_title: '',
		sweepstakes_popup_desc: '',
		sweepstakes_popup_img_lg: '',
		sweepstakes_popup_img: '',
		sweepstakes_foot_note: '',
		sweepstakes_popup_email: '',
		sweepstakes_popup_phone: '',
		smsbump: '',
		sweepstakes_popup_thank_title: '',
		sweepstakes_popup_thank_title_color: '',
		sweepstakes_popup_thank_desc: '',
		sweepstakes_popup_thank_desc_color: '',
		sweepstakes_popup_thank_shopnow_url: '',
		sweepstakes_popup_thank_shopnow: '',
	};

	const BIRTHDAY_DATA = {
		src: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/Mobile_29349535-f982-4299-8c2c-ce6aa5b74ae7.png',
		srcSet: 'https://cdn.shopify.com/s/files/1/0286/1327/9779/files/DT_db2c8f07-cfcd-47af-b159-d2507acf8e92.png',
		title: 'Don’t forget your birthday gift!',
		desc: 'Tell us your birthday and enjoy $10 off to celebrate!',
	};

	const EXIT_INTENT = {
		src: 'https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/d17ae0b2-d981-4cab-7c69-d70ea2ab7e00/public',
		title: 'OUR BIGGEST<br />SALE EVER',
		desc1: 'UP<br />TO',
		desc2: '50% OFF',
		text: 'Dont’s miss out!'
	};

	const dateRef = useRef(null);
	const monthRef = useRef(null);


	return (
		<div className="container mt-4">
			<h1 className="mb-1">Modal Waitlist</h1>
			<Button lg={false} onClick={() => handlOpenModal(true)}>Launch modal</Button>
			<Modal className="modal-lg lg:max-w-[43.125rem] modal-dialog-centered" isOpen={isOpen} handleClose={() => handlOpenModal(false)}>
				<ModalWaitlist store={'dev'} data={MODAL_WAITLIST} handleClose={() => handlOpenModal(false)} />
			</Modal>

			<h1 className="mt-4 mb-1">Modal Newsletter</h1>
			<Button lg={false} onClick={() => handlOpenModal2(true)}>Launch modal</Button>
			<Modal className="modal-lg lg:min-w-[48.1875em]" isOpen={modal2} handleClose={() => handlOpenModal2(false)}>
				<ModalNewsletter store={'dev'} handleClose={() => handlOpenModal2(false)} data={MODAL_NEWSLETTER} />
			</Modal>

			<h1 className="mt-4 mb-1">Sweepstakes Signup Popup</h1>
			<Button lg={false} onClick={() => handlOpenModal3(true)}>Launch modal</Button>
			<Modal className="modal-lg modal-dialog-centered" isOpen={modal3} handleClose={() => handlOpenModal3(false)}>
				{/* <ModalWaitlist data={MODAL_WAITLIST_TEST} handleClose={() => handlOpenModal2(false)} /> */}
				<Sweepstakes handleClose={() => handlOpenModal3(false)} data={MODAL_SWEEPSTAKE} />
			</Modal>

			<h1 className="mt-4 mb-1 hidden lg:block">Exit Intent</h1>
			<div className="hidden lg:block">
				<Button lg={false} onClick={() => handlOpenModal4(true)}>Launch Modal</Button>
			</div>
			<Modal className="modal lg:max-w-[39.375rem]" isOpen={modal4} handleClose={() => handlOpenModal4(false)}>
				<ExitIntent handleClose={() => handlOpenModal4(false)} data={EXIT_INTENT} />
			</Modal>

			<h1 className="mt-4 mb-1">Birthday</h1>
			<Button lg={false} onClick={() => handlOpenModal5(true)}>Launch Modal</Button>
			<Modal className="modal-lg" isOpen={modal5} handleClose={() => handlOpenModal5(false)}>
				<Birthday handleClose={() => handlOpenModal5(false)} data={BIRTHDAY_DATA} handleSubmit={() => handlOpenModal5(false)} dateRef={dateRef} monthRef={monthRef} />
			</Modal>


			<h1 className="mt-4 mb-1">Checkout Upsell</h1>
			<Button lg={false} onClick={() => handlOpenModal6(true)}>Launch Modal</Button>
			<Modal className="modal lg:max-w-[24.063rem] mx-auto text-center" isOpen={modal6} handleClose={() => handlOpenModal6(false)}>
				<CheckoutUpsell handleClose={() => handlOpenModal6(false)} title="Exclusive Offer Awaits!" description="Get additional discounted products now" products={UPSELLS} />
			</Modal>

		</div>
	);
};

export default Modals;
