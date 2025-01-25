import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FiDownload,
  FiExternalLink,
  FiFileText,
  FiArrowUpRight,
} from "react-icons/fi";
import styles from "./Publications.module.css";

const publicationsData = [
  {
    id: 1,
    title: "Self-Adaptive Architectures in Distributed Systems",
    authors: ["Parastoo Fathi", "John Doe"],
    journal: "IEEE Transactions on Software Engineering",
    year: 2023,
    doi: "10.1109/TSE.2023.123456",
    downloadUrl: "/papers/adaptive-architectures.pdf",
    award: "Best Paper Award",
  },
  {
    id: 2,
    title: "Ethical AI Frameworks for Biomedical Applications",
    authors: ["Parastoo Fathi", "Jane Smith"],
    journal: "Nature Machine Intelligence",
    year: 2022,
    doi: "10.1038/s42256-022-00545-w",
    downloadUrl: "/papers/ethical-ai.pdf",
    featured: true,
  },
];

const Publications = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
    });
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.gradientBackground} />

      <div className={styles.container}>
        <header
          className={styles.header}
          data-aos="fade-up"
          data-aos-easing="ease-out-cubic"
        >
          <h1 className={styles.title}>
            <span className={styles.titleAccent}>Research</span>
            Publications
            <div className={styles.titleUnderline} />
          </h1>
          <p className={styles.subtitle}>
            Peer-reviewed journal articles and conference proceedings
          </p>
        </header>

        <div className={styles.grid}>
          {publicationsData.map((publication, index) => (
            <article
              key={publication.id}
              className={`${styles.card} ${
                publication.featured ? styles.featured : ""
              }`}
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              {publication.award && (
                <div className={styles.awardBadge}>
                  <FiArrowUpRight />
                  {publication.award}
                </div>
              )}

              <div className={styles.cardHeader}>
                <FiFileText className={styles.docIcon} />
                <h2 className={styles.paperTitle}>{publication.title}</h2>
              </div>

              <div className={styles.metaGrid}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Authors</span>
                  <p className={styles.metaValue}>
                    {publication.authors.join(", ")}
                  </p>
                </div>

                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Journal</span>
                  <p className={styles.metaValue}>{publication.journal}</p>
                </div>

                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Year</span>
                  <p className={styles.metaValue}>{publication.year}</p>
                </div>

                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>DOI</span>
                  <a
                    href={`https://doi.org/${publication.doi}`}
                    className={styles.doiLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {publication.doi}
                    <FiExternalLink className={styles.linkIcon} />
                  </a>
                </div>
              </div>

              <div className={styles.actions}>
                <a
                  href={publication.downloadUrl}
                  download
                  className={styles.downloadButton}
                >
                  <FiDownload className={styles.downloadIcon} />
                  Download PDF
                  <div className={styles.buttonHover} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;
