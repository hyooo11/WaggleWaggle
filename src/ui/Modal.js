import styled from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div className={styled.modalWrap}>
      <div className={styled.modalContent}>
        <div>{props.children}</div>
        <button onClick={props.closeModal} className={styled.closeBtn}>
          <img src="/media/icon/close-btn.png" alt="닫힘 버튼" />
        </button>
      </div>
    </div>
  );
};

export default Modal;
