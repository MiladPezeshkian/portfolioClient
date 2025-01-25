// Research.jsx
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./Research.module.css";
import {
  FiDownload,
  FiExternalLink,
  FiStar,
  FiDatabase,
  FiUsers,
  FiAward,
} from "react-icons/fi";

const RESEARCH_DATA = [
  {
    id: "AI-2023",
    meta: {
      category: "AI Research",
      status: "Published",
      timeline: "2020-Present",
    },
    title: "Adaptive Neural Systems",
    description: "Self-optimizing architectures for distributed environments",
    metrics: {
      downloads: 4521,
      stars: 1284,
      contributors: 23,
      citations: 2450,
    },
    resources: {
      paper: "/research/AI-2023.pdf",
      demo: "https://demo.adaptive-neural.com",
      code: "https://github.com/adaptive-neural",
      dataset: "https://data.adaptive-neural.com",
    },
  },
];

function Research() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
    });
  }, []);

  const handleViewDetails = (projectId) => {
    navigate(`/research/${projectId}`);
  };

  const MetricCard = ({ icon, value, label }) => (
    <div className={styles.metricCard} data-aos="zoom-in">
      <div className={styles.metricIcon}>{icon}</div>
      <div className={styles.metricContent}>
        <span className={styles.metricValue}>{value.toLocaleString()}</span>
        <span className={styles.metricLabel}>{label}</span>
      </div>
    </div>
  );

  MetricCard.propTypes = {
    icon: PropTypes.element.isRequired,
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  };

  const ResourceButton = ({ icon, label, url }) => (
    <a
      href={url}
      className={styles.resourceButton}
      target="_blank"
      rel="noopener noreferrer"
      data-aos="fade-up"
    >
      <span className={styles.buttonIcon}>{icon}</span>
      <span className={styles.buttonText}>{label}</span>
      <div className={styles.buttonGlow} />
    </a>
  );

  ResourceButton.propTypes = {
    icon: PropTypes.element.isRequired,
    label: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  };

  return (
    <section className={styles.section} id="research">
      <div className={styles.header} data-aos="fade-down">
        <h1 className={styles.title}>Advanced Research Hub</h1>
        <p className={styles.subtitle}>
          Innovative solutions with measurable impact
        </p>
      </div>

      <div className={styles.grid}>
        {RESEARCH_DATA.map((project, index) => (
          <article
            key={project.id}
            className={styles.card}
            data-aos="fade-up"
            data-aos-delay={index * 150}
          >
            <div className={styles.cardHeader}>
              <div className={styles.meta}>
                <span className={styles.category}>{project.meta.category}</span>
                <span className={styles.timeline}>{project.meta.timeline}</span>
              </div>
              <span className={styles.status}>{project.meta.status}</span>
            </div>

            <div className={styles.content}>
              <h2 className={styles.projectTitle}>{project.title}</h2>
              <p className={styles.projectDescription}>{project.description}</p>

              <div className={styles.metricsGrid}>
                <MetricCard
                  icon={<FiDownload />}
                  value={project.metrics.downloads}
                  label="Downloads"
                />
                <MetricCard
                  icon={<FiStar />}
                  value={project.metrics.stars}
                  label="GitHub Stars"
                />
                <MetricCard
                  icon={<FiUsers />}
                  value={project.metrics.contributors}
                  label="Contributors"
                />
                <MetricCard
                  icon={<FiAward />}
                  value={project.metrics.citations}
                  label="Citations"
                />
              </div>

              <div className={styles.resources}>
                <ResourceButton
                  icon={<FiDownload />}
                  label="Download Paper"
                  url={project.resources.paper}
                />
                <ResourceButton
                  icon={<FiExternalLink />}
                  label="Live Demo"
                  url={project.resources.demo}
                />
                <ResourceButton
                  icon={<FiStar />}
                  label="View Code"
                  url={project.resources.code}
                />
                <ResourceButton
                  icon={<FiDatabase />}
                  label="Get Dataset"
                  url={project.resources.dataset}
                />
              </div>

              <button
                className={styles.detailButton}
                onClick={() => handleViewDetails(project.id)}
              >
                View Full Details
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Research;
