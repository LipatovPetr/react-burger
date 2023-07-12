import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";
import { useDispatch } from "react-redux";

export default function ModalOverlay({ popupClosed }) {
  const dispatch = useDispatch();

  const handleOverlayClick = () => {
    popupClosed();
  };

  return <div className={styles.overlay} onClick={handleOverlayClick}></div>;
}
