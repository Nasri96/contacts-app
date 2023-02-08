import ModalOverlay from "./ModalOverlay";
import styles from "./Modal.module.css";
import Button from "./Button";

const Modal = ({ title, text, onClickCancel, onClickConfirm }) => {

    return (
        <div className={styles.modal}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.text}>{text}</p>
            <Button buttons={[{type: "primary", name: "Cancel", handler: onClickCancel}, {type: "primary", name: "Confirm", handler: onClickConfirm}]} />
        </div>
    )
}

export default Modal;