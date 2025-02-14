import PropTypes from "prop-types";
import { FiSun, FiMoon } from "react-icons/fi";
import styles from "./DarkModeToggle.module.css";

export const DarkModeToggle = ({ darkMode, setDarkMode }) => (
  <button
    onClick={() => setDarkMode(!darkMode)}
    className={`${styles.toggleButton} ${darkMode ? styles["dark-mode"] : ""}`}
  >
    {darkMode ? <FiSun /> : <FiMoon />}
    {darkMode ? "Light Mode" : "Dark Mode"}
  </button>
);

DarkModeToggle.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};
