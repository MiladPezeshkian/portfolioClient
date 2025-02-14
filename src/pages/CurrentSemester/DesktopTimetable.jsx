// DesktopTimetable.jsx
import PropTypes from "prop-types";
import styles from "./CurrentSemester.module.css";
import { FiClock, FiBook, FiMapPin, FiUser, FiSlash } from "react-icons/fi";

/**
 * نمایش جدول زمان‌بندی به‌صورت دسکتاپ
 *
 * @param {Array} timetableData - آرایه‌ای شامل اطلاعات زمان‌بندی (زمان و روزها)
 * @param {Array} daysOfWeek - آرایه‌ای از نام‌های روز (به صورت پیش‌فرض: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"])
 * @param {boolean} isMobile - برای کنترل انیمیشن‌های AOS در نمایش دسکتاپ
 */
const DesktopTimetable = ({ timetableData, daysOfWeek, isMobile }) => {
  // بررسی وجود داده در timetableData؛ در صورت عدم وجود، پیام مناسبی نمایش می‌دهد.
  if (!Array.isArray(timetableData) || timetableData.length === 0) {
    return <p className={styles.noData}>No timetable available.</p>;
  }

  return (
    <table className={styles.timetable}>
      <thead>
        <tr>
          {/* ستون زمان‌بندی */}
          <th className={styles.timeColumn}>
            <div className={styles.columnHeader}>
              <FiClock className={styles.columnIcon} />
              <span>Time Slot</span>
            </div>
          </th>
          {/* رندر کردن عنوان هر روز */}
          {daysOfWeek.map((day, index) => (
            <th
              key={day}
              className={styles.dayHeader}
              data-aos={!isMobile ? "fade-left" : undefined}
              data-aos-delay={index * 50}
            >
              <div className={styles.dayHeaderContent}>
                <span className={styles.dayAbbr}>{day}</span>
                <span className={styles.dayStatus}>
                  {["Fri", "Sat"].includes(day) ? "Weekend" : "Academic Day"}
                </span>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timetableData.map((row, rowIndex) => {
          // استفاده از row.time یا در صورت عدم وجود از rowIndex به عنوان key
          const key = row.time || rowIndex;
          return (
            <tr
              key={key}
              data-aos={!isMobile ? "fade-up" : undefined}
              data-aos-delay={rowIndex * 30}
              className={styles.tableRow}
            >
              {/* سلول زمان */}
              <td className={styles.timeCell}>
                <div className={styles.timeWrapper}>
                  <FiClock className={styles.timeIcon} />
                  <span className={styles.timeText}>{row.time}</span>
                </div>
              </td>

              {/* رندر کردن سلول‌های هر روز */}
              {daysOfWeek.map((day) => {
                // استفاده از optional chaining برای اطمینان از وجود داده
                const cellData = row?.days?.[day];
                console.log(cellData);
                return (
                  <td
                    key={day}
                    className={`${styles.courseCell} ${
                      ["Fri", "Sat"].includes(day) ? styles.weekend : ""
                    }`}
                  >
                    <div className={styles.cellContent}>
                      {cellData &&
                      cellData.course !== "" &&
                      cellData.location !== "" ? (
                        <div className={styles.courseCard}>
                          <div className={styles.courseHeader}>
                            <FiBook className={styles.courseIcon} />
                            <div className={styles.courseInfo}>
                              <h3 className={styles.courseTitle}>
                                {cellData.course}
                              </h3>
                              <div className={styles.courseMeta}>
                                <span className={styles.courseLocation}>
                                  <FiMapPin className={styles.metaIcon} />
                                  {cellData.location}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className={styles.professorBadge}>
                            <FiUser className={styles.professorIcon} />
                            Prof. Fathi
                          </div>
                        </div>
                      ) : (
                        <div className={styles.noClass}>
                          <FiSlash className={styles.slashIcon} />
                          <span className={styles.noClassText}>
                            No Scheduled Class
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

DesktopTimetable.propTypes = {
  timetableData: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string.isRequired,
      days: PropTypes.object.isRequired,
    })
  ).isRequired,
  daysOfWeek: PropTypes.arrayOf(PropTypes.string),
  isMobile: PropTypes.bool.isRequired,
};

DesktopTimetable.defaultProps = {
  daysOfWeek: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
};

export default DesktopTimetable;
