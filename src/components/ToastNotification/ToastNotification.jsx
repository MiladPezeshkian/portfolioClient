import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  FiCheckCircle,
  FiAlertTriangle,
  FiInfo,
  FiXCircle,
  FiX,
} from "react-icons/fi";
import clsx from "clsx";
import styles from "./ToastNotification.module.css";

const ToastNotification = ({
  type = "info",
  message,
  onClose,
  duration = 5000,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose && onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  if (!visible) return null;

  const iconMap = {
    success: <FiCheckCircle className={styles.successIcon} />,
    error: <FiXCircle className={styles.errorIcon} />,
    warning: <FiAlertTriangle className={styles.warningIcon} />,
    info: <FiInfo className={styles.infoIcon} />,
  };

  return (
    <div className={clsx(styles.toastContainer, styles[type])}>
      {iconMap[type]}
      <span className={styles.message}>{message}</span>
      <button onClick={() => setVisible(false)} className={styles.closeButton}>
        <FiX />
      </button>
    </div>
  );
};

ToastNotification.propTypes = {
  type: PropTypes.oneOf(["success", "error", "warning", "info"]).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  duration: PropTypes.number,
};

export default ToastNotification;
