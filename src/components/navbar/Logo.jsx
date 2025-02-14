// Logo.jsx
import { Link } from "react-router-dom";
import styles from "./style.module.css";

const Logo = () => {
  return (
    <Link to="/" className={styles.logo}>
      <span className={styles.logoPart}>Dr.</span>
      <span className={styles.logoPart}>Parasto</span>
      <span className={styles.logoPart}>Fathi</span>
    </Link>
  );
};

export default Logo;
