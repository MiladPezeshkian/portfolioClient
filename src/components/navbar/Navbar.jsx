import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
        setIsMobileDropdownOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <div className={styles.container}>
        {/* Animated Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoPart}>Dr.</span>
          <span className={styles.logoPart}>Parastoo</span>
          <span className={styles.logoPart}>Fathi</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className={styles.navList}>
          <li>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>
          </li>

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
                  Current Semester
                </Link>
              </li>
              <li>
                <Link to="/previous" className={styles.dropdownLink}>
                  Previous Semester
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/research" className={styles.navLink}>
              Research
            </Link>
          </li>
          <li>
            <Link to="/publications" className={styles.navLink}>
              Publications
            </Link>
          </li>
          <li>
            <Link to="/contact" className={styles.navLink}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/announcements" className={styles.navLink}>
              Announcements
            </Link>
          </li>
        </ul>

        {/* Mobile Navigation */}
        <button
          className={`${styles.menuToggle} ${isMenuOpen ? styles.active : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className={styles.menuBar} />
          <span className={styles.menuBar} />
          <span className={styles.menuBar} />
        </button>

        <div
          className={`${styles.mobileNav} ${isMenuOpen ? styles.active : ""}`}
        >
          <ul>
            <li>
              <Link
                to="/"
                className={styles.mobileLink}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>

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
                    to="/teaching/current"
                    className={styles.mobileDropdownLink}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Current Semester
                  </Link>
                </li>
                <li>
                  <Link
                    to="/teaching/previous"
                    className={styles.mobileDropdownLink}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Previous Semester
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                to="/research"
                className={styles.mobileLink}
                onClick={() => setIsMenuOpen(false)}
              >
                Research
              </Link>
            </li>
            <li>
              <Link
                to="/publications"
                className={styles.mobileLink}
                onClick={() => setIsMenuOpen(false)}
              >
                Publications
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={styles.mobileLink}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/announcements"
                className={styles.mobileLink}
                onClick={() => setIsMenuOpen(false)}
              >
                Announcements
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
