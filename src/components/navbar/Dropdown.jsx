// Dropdown.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";

const Dropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <li
      className={styles.dropdownItem}
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <button
        className={styles.navLink}
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
      >
        Teaching
        <span className={styles.dropdownArrow} aria-hidden="true" />
      </button>
      <ul
        className={`${styles.dropdownMenu} ${
          isDropdownOpen ? styles.show : ""
        }`}
        role="menu"
      >
        <li>
          <Link to="/current" className={styles.dropdownLink}>
            Semester Schedule
          </Link>
        </li>
        <li>
          <Link to="/previous" className={styles.dropdownLink}>
            Previous Semesters classes
          </Link>
        </li>
      </ul>
    </li>
  );
};

export default Dropdown;
