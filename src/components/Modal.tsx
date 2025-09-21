import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Overlay = styled(motion.div)`position: fixed;`;
const ModalContainer = styled(motion.div)`transform: none;`;
const CartContainer = styled(motion.div)`transform: translate(0, 0); height: 100vh`;

const modalVariant = {
	initial: { opacity: 0 },
	isOpen: { opacity: 1 },
	exit: { opacity: 0 }
};

const containerVariant = {
	initial: { top: '-50%', transition: { type: 'spring' } },
	isOpen: { top: 'auto' },
	exit: { top: '-50%' }
};

const horizontalVariant = {
	initial: { left: 'auto', right: '-50%', transition: { type: 'spring' } },
	isOpen: { left: 'auto', right: '0%' },
	exit: { left: 'auto', right: '-50%' }
}

const Modal = (props: any) => {
	const { handleClose, children, isOpen, className, cartDrawer, withoutPadding, backdropClasses, contentClass, slideIn, modalComp } = props;

	const handleCloseWithBlur = () => {
		handleClose();

		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur();
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);


	useEffect(() => {
		if (!isOpen) return;

		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				handleCloseWithBlur();
			}
		};

		window.addEventListener("keydown", handleEsc);
		return () => window.removeEventListener("keydown", handleEsc);
	}, [isOpen, handleClose]);

	if (!slideIn && (modalComp === 'newsletter' || modalComp === 'sweepstakes')) {
		containerVariant.initial = { top: '0', transition: { type: 'spring' } };
		containerVariant.exit = { top: '0' };
		horizontalVariant.initial = { left: 'auto', right: '0', transition: { type: 'spring' } };
		horizontalVariant.exit = { left: 'auto', right: '0' }
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<Overlay
					exit={'exit'}
					initial={'initial'}
					animate={'isOpen'}
					variants={modalVariant}
					onClick={handleClose}
					className={`modal-backdrop top-0 left-0 w-[100vw] h-[100vh] z-[1040] ${backdropClasses ?? ''}`}>
					{!cartDrawer && (
						<div className="fixed top-0 left-0 z-[1050] w-full h-full outline-0 overflow-x-hidden overflow-y-auto" onClick={handleClose}>
							<ModalContainer className={`relative w-auto flex items-center mx-auto ${className} ${withoutPadding ? '' : 'px-g lg:px-0'}`} variants={containerVariant} onClick={handleClose}>
								<div className={`modal-content ${contentClass ?? ''}`} onClick={(e) => e.stopPropagation()}>{children}</div>
							</ModalContainer>
						</div>
					)}
					{cartDrawer && <CartContainer className={`w-full absolute ${className} px-0`} variants={horizontalVariant} onClick={(e) => e.stopPropagation()}>
						{/* <Close onClick={handleClose} className="w-[14px] h-[14px] absolute right-[14px] top-[14px]"/> */}
						{children}
					</CartContainer>}
				</Overlay>
			)}
		</AnimatePresence>
	);
};

export default Modal;
