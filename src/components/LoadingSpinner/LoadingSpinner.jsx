import PropTypes from "prop-types";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = ({ size = "medium", isFullPage = true }) => {
  const sizeClass = {
    small: styles["spinner-small"],
    medium: styles["spinner-medium"],
    large: styles["spinner-large"],
  }[size];

  return (
    <div
      className={`${styles["spinner-container"]} ${
        isFullPage ? styles["full-page"] : ""
      }`}
    >
      <div className={`${styles.spinner} ${sizeClass}`}>
        <div className={styles["spinner-inner"]}>
          <div
            className={`${styles["spinner-disc"]} ${styles["spinner-disc-1"]}`}
          ></div>
          <div
            className={`${styles["spinner-disc"]} ${styles["spinner-disc-2"]}`}
          ></div>
          <div
            className={`${styles["spinner-disc"]} ${styles["spinner-disc-3"]}`}
          ></div>
        </div>
        <div className={styles["spinner-text"]}>
          <span className={styles["loading-text"]}>
            L<span>o</span>a<span>d</span>i<span>n</span>g
          </span>
          <div className={styles["progress-dots"]}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large", "xl"]),
  isFullPage: PropTypes.bool,
};

export default LoadingSpinner;
