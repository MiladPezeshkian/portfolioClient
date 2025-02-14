import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import MobileDropdown from "./MobileDropdown";
import styles from "./style.module.css";

const MobileMenu = ({ isMenuOpen, setIsMenuOpen, isLogin, handleLogout }) => {
  return (
    <>
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

      <div className={`${styles.mobileNav} ${isMenuOpen ? styles.active : ""}`}>
        {/* <button
          className={styles.closeBtn}
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
        >
          <FaTimes />
        </button> */}

        <nav className={styles.mobileContent}>
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
            <MobileDropdown setIsMenuOpen={setIsMenuOpen} />

            <li>
              <Link
                to="/Articles"
                className={styles.mobileLink}
                onClick={() => setIsMenuOpen(false)}
              >
                Articles
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

            {isLogin && (
              <li>
                <div className={styles.mobileAuth}>
                  <Link
                    to="/admin-dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className={styles.mobileProfile}
                  >
                    <FaUser /> Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className={styles.mobileLogout}
                  >
                    Log Out
                  </button>
                </div>{" "}
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

MobileMenu.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  setIsMenuOpen: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default MobileMenu;
