import React from "react";

const animatedOpenButton = ({ children, handlClick }) => {
  return (
    <div
      onClick={handlClick}
    >
      {children}
    </div>
  );
};

export default animatedOpenButton;
