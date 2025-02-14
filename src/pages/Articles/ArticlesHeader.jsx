// ArticlesHeader.jsx
import styles from "./Articles.module.css";

const ArticlesHeader = () => {
  return (
    <header
      className={styles.header}
      data-aos="fade-up"
      data-aos-easing="ease-out-cubic"
    >
      <h1 className={styles.title}>
        <span className={styles.titleAccent}>Research</span> Articless
        <div className={styles.titleUnderline} />
      </h1>
      <p className={styles.subtitle}>
        Peer-reviewed journal articles and conference proceedings
      </p>
    </header>
  );
};

export default ArticlesHeader;
