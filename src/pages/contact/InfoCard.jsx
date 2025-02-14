// InfoCard.jsx
import React from "react";
import PropTypes from "prop-types";
import styles from "./Contact.module.css";

const InfoCard = ({ icon, title, content }) => {
  return (
    <div className={styles.infoCard}>
      <div className={styles.cardGlow} />
      {icon}
      <h3 className={styles.infoTitle}>{title}</h3>
      <div className={styles.infoContent}>
        {content.map((item, index) =>
          typeof item === "string" ? (
            <p key={index}>{item}</p>
          ) : (
            <React.Fragment key={index}>{item}</React.Fragment>
          )
        )}
      </div>
    </div>
  );
};

InfoCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.node, PropTypes.string])
  ).isRequired,
};

export default InfoCard;
