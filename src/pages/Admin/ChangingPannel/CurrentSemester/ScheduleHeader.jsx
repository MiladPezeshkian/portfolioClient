// ScheduleHeader.jsx
import PropTypes from "prop-types";
import styles from "./CurrentSemsterController.module.css";
import { FiCheckCircle } from "react-icons/fi";

const ScheduleHeader = ({ showSave, handleBulkSave, pendingChanges }) => {
  return (
    <header className={styles.appHeader}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.adminTitle}>
          <span>Schedule Master</span>
          <div className={styles.titleUnderline} />
        </h1>
        {showSave && (
          <button
            onClick={handleBulkSave}
            className={styles.bulkSaveBtn}
            disabled={Object.keys(pendingChanges).length === 0}
          >
            <FiCheckCircle className={styles.saveIcon} />
            Confirm All Changes
          </button>
        )}
      </div>
    </header>
  );
};

ScheduleHeader.propTypes = {
  showSave: PropTypes.bool.isRequired,
  handleBulkSave: PropTypes.func.isRequired,
  pendingChanges: PropTypes.object.isRequired,
};

export default ScheduleHeader;
