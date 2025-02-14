// EditModal.jsx
import PropTypes from "prop-types";
import styles from "./CurrentSemsterController.module.css";
import { FiX, FiTrash2 } from "react-icons/fi";

const EditModal = ({
  editingCell,
  pendingChanges,
  handleCellEdit,
  handleClearCell,
  discardChanges,
  closeModal,
}) => {
  const cellKey = `${editingCell.day}-${editingCell.time}`;
  const cellPendingData = pendingChanges[cellKey] || {
    course: "",
    location: "",
  };

  return (
    <div className={styles.editModal}>
      <div className={styles.modalCard}>
        <div className={styles.modalHeader}>
          <h3>
            Edit {editingCell.day} - {editingCell.time}
          </h3>
          <button className={styles.closeButton} onClick={closeModal}>
            <FiX />
          </button>
        </div>

        <div className={styles.inputGroup}>
          <label>Course Name</label>
          <input
            type="text"
            value={cellPendingData.course}
            onChange={(e) =>
              handleCellEdit(
                editingCell.day,
                editingCell.time,
                "course",
                e.target.value
              )
            }
            className={styles.inputField}
            placeholder="Enter course name"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Room/Location</label>
          <input
            type="text"
            value={cellPendingData.location}
            onChange={(e) =>
              handleCellEdit(
                editingCell.day,
                editingCell.time,
                "location",
                e.target.value
              )
            }
            className={styles.inputField}
            placeholder="Enter location"
          />
        </div>

        <div className={styles.modalFooter}>
          <button
            className={styles.clearButton}
            onClick={() => {
              handleClearCell(editingCell.day, editingCell.time);
            }}
          >
            <FiTrash2 /> Clear Fields
          </button>
          <div className={styles.actionButtons}>
            <button className={styles.discardButton} onClick={discardChanges}>
              Discard
            </button>
            <button className={styles.saveButton} onClick={closeModal}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

EditModal.propTypes = {
  editingCell: PropTypes.shape({
    day: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
  pendingChanges: PropTypes.object.isRequired,
  handleCellEdit: PropTypes.func.isRequired,
  handleClearCell: PropTypes.func.isRequired,
  discardChanges: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default EditModal;
