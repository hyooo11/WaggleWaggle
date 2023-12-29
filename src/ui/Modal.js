import styled from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div className={styled.modalWrap} >
      <div className={styled.modalContent}>
        <div>{props.children}</div>
        <button onClick={props.closeModal} className={styled.closeBtn}></button>
      </div>
    </div>
  );
};

export default Modal;