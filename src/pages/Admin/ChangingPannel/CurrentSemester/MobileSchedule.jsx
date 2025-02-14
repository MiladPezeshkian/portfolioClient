// MobileSchedule.jsx
import PropTypes from "prop-types";
import styles from "./CurrentSemsterController.module.css";
import { FiEdit } from "react-icons/fi";

const MobileSchedule = ({
  timeSlots,
  daysOfWeek,
  pendingChanges,
  schedule,
  setEditingCell,
}) => {
  return (
    <div className={styles.mobileSchedule}>
      {timeSlots.map((time) => (
        <div key={time} className={styles.mobileTimeSlot}>
          <h4 className={styles.mobileTimeHeader}>{time}</h4>
          <div className={styles.mobileDayGrid}>
            {daysOfWeek.map((day) => {
              const cellKey = `${day}-${time}`;
              const pendingCourse = (
                pendingChanges[cellKey]?.course ?? ""
              ).trim();
              const pendingLocation = (
                pendingChanges[cellKey]?.location ?? ""
              ).trim();
              const scheduleEntry =
                schedule?.timetable?.find((t) => t.time === time)?.days?.[
                  day
                ] || {};
              const scheduleCourse = (scheduleEntry.course ?? "").trim();
              const scheduleLocation = (scheduleEntry.location ?? "").trim();

              const courseText = pendingCourse || scheduleCourse;
              const locationText = pendingLocation || scheduleLocation;

              return (
                <div
                  key={day}
                  className={styles.mobileDayCard}
                  onClick={() => setEditingCell({ day, time })}
                >
                  <div className={styles.mobileDayLabel}>{day}</div>
                  <div className={styles.mobileCourseContent}>
                    {courseText || locationText ? (
                      <>
                        <div className={styles.mobileCourseTitle}>
                          {courseText}
                        </div>
                        <div className={styles.mobileLocation}>
                          {locationText}
                        </div>
                      </>
                    ) : (
                      <div className={styles.mobileEmptyCell}>
                        <FiEdit size={14} />
                        <span>No Scheduled Class</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

MobileSchedule.propTypes = {
  timeSlots: PropTypes.array.isRequired,
  daysOfWeek: PropTypes.array.isRequired,
  pendingChanges: PropTypes.object.isRequired,
  schedule: PropTypes.object,
  setEditingCell: PropTypes.func.isRequired,
};

export default MobileSchedule;
