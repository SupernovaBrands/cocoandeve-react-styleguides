import Modal from "@/components/Modal";
import ModalWaitlist from "@/components/modal/Waitlist";
import ModalNewsletter from "@/components/modal/Newsletter";
import { useState } from "react";
import Sweepstakes from "@/components/modal/Sweepstakes";
import CheckoutUpsell from "@/components/modal/CheckoutUpsell";

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
		title: 'Oh coco-nuts!',
		desc: 'Our <strong>Miracle Hair Elixir</strong>  has become a worldwide hit and we\'re struggling to keep up with the demand. But don\'t worry, we\'re on it! Sign up to join the waitlist.',
		date: 'RESTOCKING 6th OCTOBER',
		invalidEmail: 'Invalid Email Address',
		email: 'Enter your email',
		ctaText: 'Yes, notify me!'
	};

	const UPSELLS = [
		{
			id: 1,
			name: 'Like A Virgin Hair Masque',
			price: '$44.90',
			crossedPrice: '$34.90',
			img: 'https://via.placeholder.com/115x115'
		},
		{
			id: 2,
			name: 'Like A Virgin Hair Masque',
			price: '$44.90',
			crossedPrice: '$34.90',
			img: 'https://via.placeholder.com/115x115'
		},
		{
			id: 3,
			name: 'Like A Virgin Hair Masque',
			price: '$44.90',
			crossedPrice: '$34.90',
			img: 'https://via.placeholder.com/115x115'
		}
	];


	return (
		<div className="container mt-4">
			<h1 className="mb-1">Modal Waitlist</h1>
			<button onClick={() => handlOpenModal(true)} className="bg-primary hover:bg-primary-darken rounded border border-transparent font-bold text-white py-[9px] px-[28px] mb-4">
				Launch Modal
			</button>
			<Modal className="modal-lg" isOpen={isOpen} handleClose={() => handlOpenModal(false)}>
				<ModalWaitlist data={MODAL_WAITLIST} handleClose={() => handlOpenModal(false)} />
			</Modal>

			<h1 className="mb-1">Modal Newsletter</h1>
			<button onClick={() => handlOpenModal2(true)} className="bg-primary hover:bg-primary-darken rounded border border-transparent font-bold text-white py-[9px] px-[28px] mb-4">
				Launch Modal
			</button>
			<Modal className="modal-lg lg:min-w-[48.1875em]" isOpen={modal2} handleClose={() => handlOpenModal2(false)}>
				<ModalNewsletter handleClose={() => handlOpenModal2(false)} />
			</Modal>

			<h1 className="mb-1">Sweepstakes Signup Popup</h1>
			<button onClick={() => handlOpenModal3(true)} className="bg-primary hover:bg-primary-darken rounded border border-transparent font-bold text-white py-[9px] px-[28px] mb-4">
				Launch Modal
			</button>
			<Modal className="modal-lg" isOpen={modal3} handleClose={() => handlOpenModal3(false)}>
				{/* <ModalWaitlist data={MODAL_WAITLIST_TEST} handleClose={() => handlOpenModal2(false)} /> */}
				<Sweepstakes handleClose={() => handlOpenModal3(false)} />
			</Modal>

			<h1 className="mb-1">Exit Intent</h1>
			<button onClick={() => handlOpenModal4(true)} className="bg-primary hover:bg-primary-darken rounded border border-transparent font-bold text-white py-[9px] px-[28px] mb-4 hidden lg:block">
				Launch Modal
			</button>
			<Modal className="modal-lg" isOpen={modal4} handleClose={() => handlOpenModal4(false)}>
				{/* <ModalWaitlist data={MODAL_WAITLIST_TEST} handleClose={() => handlOpenModal2(false)} /> */}
				{/* <Sweepstakes handleClose={() => handlOpenModal4(false)} /> */}
				exit intentm modal
			</Modal>

			<h1 className="mb-1">Birthday</h1>
			<button onClick={() => handlOpenModal5(true)} className="bg-primary hover:bg-primary-darken rounded border border-transparent font-bold text-white py-[9px] px-[28px] mb-4">
				Launch Modal
			</button>
			<Modal className="modal-lg" isOpen={modal5} handleClose={() => handlOpenModal5(false)}>
				{/* <ModalWaitlist data={MODAL_WAITLIST_TEST} handleClose={() => handlOpenModal2(false)} /> */}
				birthday modal
			</Modal>


			<h1 className="mb-1">Checkout Upsell</h1>
			<button onClick={() => handlOpenModal6(true)} className="bg-primary hover:bg-primary-darken rounded border border-transparent font-bold text-white py-[9px] px-[28px] mb-4">
				Launch Modal
			</button>
			<Modal className="modal lg:max-w-[24.063rem] mx-auto text-center" isOpen={modal6} handleClose={() => handlOpenModal6(false)}>
				<CheckoutUpsell handleClose={() => handlOpenModal6(false)} title="Exclusive Offer Awaits!" description="Get additional discounted products now" products={UPSELLS} />
			</Modal>

		</div>
	);
};

export default Modals;
