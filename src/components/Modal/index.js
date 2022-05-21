import React from "react";

const Modal = ({ children, showModal, toggleModal }) => {
  return (
    <div className={`modal ${showModal ? "modal-open" : ""}`}>
      <div className="modal-content ">
        <span
          className="close"
          onClick={() => {
            toggleModal();
          }}
        >
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
