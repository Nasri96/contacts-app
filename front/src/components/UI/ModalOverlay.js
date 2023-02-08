import { createPortal } from "react-dom";
import styles from "./ModalOverlay.module.css";
import Modal from "./Modal";

const ModalOverlay = (props) => {
    const modalOverlayDOM = document.querySelector("#modalOverlay");
    const modalContainerDOM = document.querySelector("#modalContainer");

    return (
        <>
            {createPortal(<div onClick={props.onClickCancel} className={styles.modalOverlay}></div>, modalOverlayDOM)}
            {createPortal(<Modal title={props.title} text={props.text} onClickCancel={props.onClickCancel} onClickConfirm={props.onClickConfirm} />, modalContainerDOM)}
        </>
    )
}

export default ModalOverlay;