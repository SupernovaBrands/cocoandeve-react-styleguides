import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Overlay = styled(motion.div)`position: fixed;`;
const ModalContainer = styled(motion.div)`transform: translate(-50%, -50%);`;

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

const Modal = (props: any) => {
	const { handleClose, children, isOpen, className } = props;
	return (
		<AnimatePresence>
			{isOpen && (
				<Overlay
					initial={'initial'}
					animate={'isOpen'}
					exit={'exit'}
					variants={modalVariant}
					onClick={handleClose}
					className="modal-backdrop top-0 left-0 w-full h-full">
					<ModalContainer className={`w-full absolute top-[50%] left-[50%] ${className} px-g lg:px-0`} variants={containerVariant} onClick={(e) => e.stopPropagation()}>
						{/* <Close onClick={handleClose} className="w-[14px] h-[14px] absolute right-[14px] top-[14px]"/> */}
						{children}
					</ModalContainer>
				</Overlay>
			)}
		</AnimatePresence>
	);
};

export default Modal;
