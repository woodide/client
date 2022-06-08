import React from "react";
import ReactModal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "80vh",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
ReactModal.setAppElement("#root");

function Modal({ children, isOpen, onClose,className }) {
  return (
    <ReactModal
      isOpen={isOpen}
      className={className}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {children}
    </ReactModal>
  );
}

export default Modal;
