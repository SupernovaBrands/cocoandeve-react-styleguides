import React, { useState } from "react";
import OpenModalButton from "./OpenModalButton";
import ModalOverlay from "./ModalOverlay";
import styled from "styled-components";


const ModalContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    color: #5c3aff;
  }
`;

const Modal = () => {
  const [isOpen, toggle] = useState(false);
  const handlOpenModal = (open) => {
    toggle(open);
  };

  return (
    <div className="container mt-4">
      <OpenModalButton handlClick={() => handlOpenModal(true)}>Open</OpenModalButton>
      <ModalOverlay isOpen={isOpen} handleClose={() => handlOpenModal(false)}>
        <ModalContent>
          <h1> Awesome modal </h1>
        </ModalContent>
      </ModalOverlay>
    </div>
  );
};

export default Modal;
