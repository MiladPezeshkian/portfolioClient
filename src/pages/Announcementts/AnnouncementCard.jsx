// AnnouncementCard.jsx
import PropTypes from "prop-types";
import { FiClock } from "react-icons/fi";
import CategoryBadge from "./CategoryBadge";
import styles from "./Announcements.module.css";

const AnnouncementCard = ({ announcement, delay }) => {
  return (
    <article
      className={`${styles.card} ${
        announcement.isArchived ? styles.archived : ""
      }`}
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <CategoryBadge category={announcement.category} />

      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>{announcement.title}</h2>
        <time className={styles.time}>
          <FiClock className={styles.clockIcon} />
          {announcement.publishedAt.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
      </div>

      <p className={styles.cardContent}>{announcement.content}</p>
    </article>
  );
};

AnnouncementCard.propTypes = {
  announcement: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    publishedAt: PropTypes.instanceOf(Date).isRequired,
    isArchived: PropTypes.bool.isRequired,
  }).isRequired,
  delay: PropTypes.number.isRequired,
};

export default AnnouncementCard;
