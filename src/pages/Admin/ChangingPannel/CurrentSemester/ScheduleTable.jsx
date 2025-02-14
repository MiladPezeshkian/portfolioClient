// ScheduleTable.jsx
import PropTypes from "prop-types";
import styles from "./CurrentSemsterController.module.css";

const ScheduleTable = ({
  timeSlots,
  daysOfWeek,
  renderCellContent,
  pendingChanges,
  setEditingCell,
}) => {
  return (
    <table className={styles.scheduleTable}>
      <colgroup>
        <col style={{ width: "140px" }} />
        {daysOfWeek.map((day) => (
          <col key={day} style={{ minWidth: "160px" }} />
        ))}
      </colgroup>
      <thead>
        <tr>
          <th className={styles.timeColumn}>Time Slot</th>
          {daysOfWeek.map((day) => (
            <th key={day} className={styles.dayColumn}>
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeSlots.map((time) => (
          <tr key={time}>
            <td className={styles.timeCell}>{time}</td>
            {daysOfWeek.map((day) => (
              <td
                key={day}
                className={`${styles.scheduleCell} ${
                  pendingChanges[`${day}-${time}`] ? styles.pendingCell : ""
                }`}
                onClick={() => setEditingCell({ day, time })}
              >
                {renderCellContent(day, time)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

ScheduleTable.propTypes = {
  timeSlots: PropTypes.array.isRequired,
  daysOfWeek: PropTypes.array.isRequired,
  renderCellContent: PropTypes.func.isRequired,
  pendingChanges: PropTypes.object.isRequired,
  setEditingCell: PropTypes.func.isRequired,
};

export default ScheduleTable;
