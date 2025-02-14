import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Dropdown from "./Dropdown";
import { FaUser } from "react-icons/fa";
import styles from "./style.module.css";

const NavLinks = ({ isLogin, handleLogout }) => {
  return (
    <div className={styles.navLinksWrapper}>
      <ul className={styles.navList}>
        <li>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
        </li>
        <Dropdown />
        <li></li>
        <li>
          <Link to="/Articles" className={styles.navLink}>
            Articles
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

        {isLogin && (
          <li>
            <div className={styles.authSection}>
              <Link to="/admin-dashboard" className={styles.profileLink}>
                <FaUser className={styles.profileIcon} />
              </Link>
              <button
                onClick={handleLogout}
                className={styles.logoutBtn}
                aria-label="Logout"
              >
                Log Out
              </button>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

NavLinks.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default NavLinks;
