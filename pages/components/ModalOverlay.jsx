import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Close from '@/images/icons/close.svg';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;
const ModalContainer = styled(motion.div)`
  width: 50%;
  height: 50%;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
`;

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
const ModalOverlay = (props) => {
  const { handleClose, children, isOpen } = props;
  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={"initial"}
          animate={"isOpen"}
          exit={"exit"}
          variants={modalVariant}
		      onClick={handleClose}
        >
          <ModalContainer variants={containerVariant} onClick={(e) => e.stopPropagation()}>
            <Close
              onClick={handleClose}
              className="w-[14px] h-[14px] absolute right-[14px] top-[14px]"
            />
            {children}
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default ModalOverlay;
