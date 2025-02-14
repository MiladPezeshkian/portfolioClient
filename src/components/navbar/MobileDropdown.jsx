// MobileDropdown.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./style.module.css";

const MobileDropdown = ({ setIsMenuOpen }) => {
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  return (
    <li>
      <button
        className={`${styles.mobileLink} ${styles.dropdownTrigger}`}
        onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
        aria-expanded={isMobileDropdownOpen}
      >
        Teaching
        <span className={styles.dropdownChevron} aria-hidden="true" />
      </button>
      <ul
        className={`${styles.mobileDropdown} ${
          isMobileDropdownOpen ? styles.show : ""
        }`}
      >
        <li>
          <Link
            to="/current"
            className={styles.mobileDropdownLink}
            onClick={() => setIsMenuOpen(false)}
          >
            Semester Schedule
          </Link>
        </li>
        <li>
          <Link
            to="/previous"
            className={styles.mobileDropdownLink}
            onClick={() => setIsMenuOpen(false)}
          >
            Previous Semesters classes
          </Link>
        </li>
      </ul>
    </li>
  );
};

MobileDropdown.propTypes = {
  setIsMenuOpen: PropTypes.func.isRequired,
};

export default MobileDropdown;
