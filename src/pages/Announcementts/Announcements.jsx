// Announcements.jsx
import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./Announcements.module.css";
import {
  FiAlertTriangle,
  FiClock,
  FiStar,
  FiHeart,
  FiArchive,
  FiDownloadCloud,
} from "react-icons/fi";

const mockData = {
  data: [
    {
      id: "1",
      title: "System Upgrade Announcement",
      content:
        "Major platform upgrade scheduled for June 15th. Expect 2 hours downtime.",
      category: "update",
      priority: "high",
      publishedAt: "2024-06-01T09:00:00Z",
      stats: { likes: 45 },
      isArchived: false,
    },
    {
      id: "2",
      title: "New Feature Release",
      content: "Introducing advanced analytics dashboard for user insights",
      category: "feature",
      priority: "medium",
      publishedAt: "2024-06-10T14:30:00Z",
      stats: { likes: 28 },
      isArchived: false,
    },
  ],
  pagination: { total: 5, page: 1, pageSize: 10 },
};

const Announcements = () => {
  const [data, setData] = useState({
    announcements: [],
    loading: true,
    error: null,
  });
  const [likes, setLikes] = useState({});

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
    });
  }, []);

  const CategoryBadge = ({ category }) => {
    const categoryStyles = {
      update: { color: "var(--teal)", icon: <FiStar size={20} /> },
      security: { color: "var(--error)", icon: <FiAlertTriangle size={20} /> },
      maintenance: { color: "var(--warning)", icon: <FiArchive size={20} /> },
      feature: { color: "var(--success)", icon: <FiDownloadCloud size={20} /> },
      default: {
        color: "var(--text-secondary)",
        icon: <FiDownloadCloud size={20} />,
      },
    };

    const { color, icon } = categoryStyles[category] || categoryStyles.default;

    return (
      <div
        className={styles.categoryBadge}
        style={{ backgroundColor: color }}
        data-aos="fade-left"
        data-aos-delay="300"
      >
        {icon}
        <span className={styles.badgeText}>{category}</span>
      </div>
    );
  };

  const loadData = useCallback(async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const processedData = mockData.data.map((item) => ({
        ...item,
        publishedAt: new Date(item.publishedAt),
        stats: {
          ...item.stats,
          likes: item.stats.likes + (likes[item.id] || 0),
        },
      }));

      setData((prev) => ({
        ...prev,
        announcements: processedData,
        loading: false,
        error: null,
      }));
    } catch (error) {
      setData((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to load announcements. Please try later.",
      }));
    }
  }, [likes]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
    setData((prev) => ({
      ...prev,
      announcements: prev.announcements.map((item) =>
        item.id === id
          ? {
              ...item,
              stats: {
                ...item.stats,
                likes: item.stats.likes + (likes[id] ? -1 : 1),
              },
            }
          : item
      ),
    }));
  };

  if (data.error) {
    return (
      <div className={styles.errorContainer} data-aos="zoom-in">
        <FiAlertTriangle className={styles.errorIcon} />
        <h3 className={styles.errorTitle}>Connection Error</h3>
        <p className={styles.errorMessage}>{data.error}</p>
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.gradientBackground} />
      <div className={styles.container}>
        <header
          className={styles.header}
          data-aos="fade-down"
          data-aos-easing="ease-out-cubic"
        >
          <h1 className={styles.title}>
            <span className={styles.titleAccent}>System</span>
            Announcements
            <div className={styles.titleUnderline} />
          </h1>
          <p className={styles.subtitle}>
            Important updates and maintenance notices
          </p>
        </header>

        {data.loading ? (
          <div className={styles.loadingGrid}>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={styles.skeletonCard}
                data-aos="fade-up"
                data-aos-delay={i * 150}
              >
                <div className={styles.skeletonHeader} />
                <div className={styles.skeletonBody} />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.grid}>
            {data.announcements.map((announcement, index) => (
              <article
                key={announcement.id}
                className={`${styles.card} ${
                  announcement.isArchived ? styles.archived : ""
                }`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
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

                <div className={styles.interactionBar}>
                  <button
                    className={`${styles.likeButton} ${
                      likes[announcement.id] ? styles.liked : ""
                    }`}
                    onClick={() => handleLike(announcement.id)}
                    data-aos="zoom-in"
                    data-aos-delay="200"
                  >
                    <FiHeart className={styles.heartIcon} />
                    <span className={styles.likeCount}>
                      {announcement.stats.likes}
                    </span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

Announcements.propTypes = {
  category: PropTypes.string,
};

export default Announcements;
