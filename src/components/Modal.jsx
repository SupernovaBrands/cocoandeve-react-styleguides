import React from "react";
// import { animated } from "react-spring";
import Modal from '@bdenzer/react-modal';

const Modal = (props) => (
	<Modal closeModal={props.closeModal} shouldShowModal={props.shouldShowModal}>
        This is some text inside the modal
    </Modal>
);

export default Modal;
