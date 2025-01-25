// Card.js
import PropTypes from "prop-types";
import styles from "./Card.module.css";

function Card({ image, title, subtitle, description }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} loading="lazy" />
        <div className={styles.imageOverlay} />
      </div>
      <div className={styles.content}>
        <header className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardSubtitle}>{subtitle}</p>
        </header>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    </article>
  );
}

Card.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Card;
