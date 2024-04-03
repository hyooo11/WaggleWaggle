import styled from "./Modal.module.css";

const Modal = ({ closeModal, children }) => {
  return (
    <div onClick={closeModal} className={styled.modalWrap}>
      <div className={styled.modalContent}>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
