// SkeletonCard.jsx
import PropTypes from "prop-types";
import styles from "./Announcements.module.css";

const SkeletonCard = ({ delay }) => {
  return (
    <div
      className={styles.skeletonCard}
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className={styles.skeletonHeader} />
      <div className={styles.skeletonBody} />
    </div>
  );
};

SkeletonCard.propTypes = {
  delay: PropTypes.number.isRequired,
};

export default SkeletonCard;
