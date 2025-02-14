// ContactHeader.jsx
import styles from "./contact.module.css";

const ContactHeader = () => {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>
        <span className={styles.titleUnderline}>Contact</span>
      </h2>
      <p className={styles.subtitle}>
        Let&apos;s Innovate Together - Connect for Research Collaborations &amp;
        Academic Discourse
      </p>
    </div>
  );
};

export default ContactHeader;
