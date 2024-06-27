import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Overlay = styled(motion.div)`position: fixed;`;
const ModalContainer = styled(motion.div)`transform: translate(-50%, -50%);`;
const CartContainer = styled(motion.div)`transform: translate(0, 0); height: 100vh`;

const modalVariant = {
	initial: { opacity: 0 },
	isOpen: { opacity: 1 },
	exit: { opacity: 0 }
};

const containerVariant = {
	initial: { top: '-50%', transition: { type: 'spring' } },
	isOpen: { top: '50%' },
	exit: { top: '-50%' }
};

const horizontalVariant = {
	initial: { left: 'auto', right: '-50%', transition: { type: 'spring' } },
	isOpen: { left: 'auto', right: '0%' },
	exit: { left: 'auto', right: '-50%' }
}

const Modal = (props: any) => {
	const { handleClose, children, isOpen, className, cartDrawer, withoutPadding, backdropClasses } = props;

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

	return (
		<AnimatePresence>
			{isOpen && (
				<Overlay
					initial={'initial'}
					animate={'isOpen'}
					exit={'exit'}
					variants={modalVariant}
					onClick={handleClose}
					className={`modal-backdrop top-0 left-0 w-full h-full z-[1040] ${backdropClasses ?? ''}`}>
					{!cartDrawer && ( <ModalContainer className={`w-full absolute top-[50%] left-[50%] ${className} ${withoutPadding ? '' : 'px-g lg:px-0'}`} variants={containerVariant} onClick={(e) => e.stopPropagation()}>
						{children}
					</ModalContainer>
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
