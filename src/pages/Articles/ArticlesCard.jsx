// src/Pages/Articles/ArticlesCard.jsx
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import {
  FiDownload,
  FiExternalLink,
  FiFileText,
  FiArrowUpRight,
} from "react-icons/fi";
import styles from "./Articles.module.css";

const ArticleCard = ({ article, delay }) => {
  if (!article) return null;

  // ایجاد مسیر دانلود PDF
  const downloadUrl = article.pdfPath ? `/${article.pdfPath}` : "#";

  return (
    <motion.article
      className={`${styles.card} ${article.featured ? styles.featured : ""}`}
      data-aos="fade-up"
      data-aos-delay={delay}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {article.award && article.award.trim() && (
        <div className={styles.awardBadge}>
          <FiArrowUpRight />
          {article.award}
        </div>
      )}

      <div className={styles.cardHeader}>
        <FiFileText className={styles.docIcon} />
        <h2 className={styles.paperTitle}>{article.title || "No Title"}</h2>
      </div>

      <div className={styles.metaGrid}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Authors</span>
          <p className={styles.metaValue}>
            {article.authors && article.authors.length > 0
              ? article.authors.join(", ")
              : "Unknown"}
          </p>
        </div>

        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Journal</span>
          <p className={styles.metaValue}>
            {article.journal || "Not Specified"}
          </p>
        </div>

        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Year</span>
          <p className={styles.metaValue}>{article.year || "N/A"}</p>
        </div>

        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>DOI</span>
          {article.doi ? (
            <a
              href={`https://doi.org/${article.doi}`}
              className={styles.doiLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {article.doi}
              <FiExternalLink className={styles.linkIcon} />
            </a>
          ) : (
            <p className={styles.metaValue}>No DOI</p>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        {article.pdfPath ? (
          <a
            href={`https://drfathiserver.onrender.com${downloadUrl}`}
            download
            className={styles.downloadButton}
          >
            <FiDownload className={styles.downloadIcon} />
            Download PDF
            <div className={styles.buttonHover} />
          </a>
        ) : (
          <p className={styles.noPdf}>No PDF Available</p>
        )}
      </div>
    </motion.article>
  );
};

ArticleCard.propTypes = {
  article: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.string),
    journal: PropTypes.string,
    year: PropTypes.number,
    doi: PropTypes.string,
    pdfPath: PropTypes.string,
    award: PropTypes.string,
    featured: PropTypes.bool,
  }).isRequired,
  delay: PropTypes.number.isRequired,
};

export default ArticleCard;
