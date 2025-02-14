// InfoCards.jsx
import InfoCard from "./InfoCard";
import styles from "./contact.module.css";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";

const InfoCards = () => {
  return (
    <div
      className={styles.infoContainer}
      data-aos="fade-left"
      data-aos-delay="300"
    >
      <InfoCard
        icon={<FiMapPin className={styles.cardIcon} />}
        title="Strategic Location"
        content={[
          "Faculty of ECE",
          "University of Kurdistan",
          "Sanandaj, Iran",
        ]}
      />
      <InfoCard
        icon={<FiMail className={styles.cardIcon} />}
        title="Digital Reach"
        content={[
          <a
            key="email1"
            href="mailto:p.fathi@uok.ac.ir"
            className={styles.link}
          >
            p.fathi@uok.ac.ir
          </a>,
          <a
            key="email2"
            href="mailto:parastoo.fathi@gmail.com"
            className={styles.link}
          >
            parastoo.fathi@gmail.com
          </a>,
        ]}
      />
      <InfoCard
        icon={<FiPhone className={styles.cardIcon} />}
        title="Acoustic Connection"
        content={[
          <a key="phone" href="tel:+988733454000" className={styles.link}>
            +98 87 3345 4000
          </a>,
          <span key="ext" className={styles.extension}>
            Ext: 2214
          </span>,
        ]}
      />
    </div>
  );
};

export default InfoCards;
