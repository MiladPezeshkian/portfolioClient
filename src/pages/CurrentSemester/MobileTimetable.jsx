// MobileTimetable.jsx
import PropTypes from "prop-types";
import styles from "./CurrentSemester.module.css";
import { FiClock, FiBook, FiMapPin, FiUser, FiSlash } from "react-icons/fi";

/**
 * کامپوننت MobileTimetable
 *
 * نمایش جدول زمان‌بندی به‌صورت موبایل با استفاده از کارت‌های ریسپانسیو.
 *
 * @param {Array} timetableData - آرایه‌ای شامل اطلاعات زمان‌بندی (زمان و روزها)
 * @param {Array} daysOfWeek - آرایه‌ای از نام‌های روز (مقدار پیش‌فرض: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"])
 */
const MobileTimetable = ({
  timetableData,
  daysOfWeek = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
}) => {
  // بررسی وجود داده در timetableData؛ در صورت عدم وجود، پیام مناسبی نمایش داده می‌شود.
  if (!Array.isArray(timetableData) || timetableData.length === 0) {
    return <p className={styles.noData}>No timetable available.</p>;
  }

  return (
    <div className={styles.mobileContainer}>
      {timetableData.map((row, rowIndex) => {
        // ترکیب زمان و ایندکس برای ایجاد یک key یکتا
        const key = `${row.time}-${rowIndex}`;
        return (
          <div key={key} className={styles.mobileTimeCard}>
            {/* هدر زمان */}
            <div className={styles.mobileTimeHeader}>
              <FiClock className={styles.mobileTimeIcon} />
              <span>{row.time}</span>
            </div>

            {/* رندر کردن اطلاعات هر روز */}
            {daysOfWeek.map((day) => {
              // دریافت اطلاعات سلول مربوط به روز جاری؛ در صورت عدم وجود، یک شیء خالی به عنوان مقدار پیش‌فرض استفاده می‌شود.
              const cellData = row?.days?.[day] || {};
              const courseName = cellData.course || "N/A";
              const location = cellData.location || "Unknown";

              return (
                <div key={day} className={styles.mobileDayCard}>
                  <div className={styles.mobileDayHeader}>
                    <span className={styles.mobileDayLabel}>{day}</span>
                    <span className={styles.mobileDayStatus}>
                      {["Fri", "Sat"].includes(day)
                        ? "Weekend"
                        : "Academic Day"}
                    </span>
                  </div>

                  {cellData.course ? (
                    <div className={styles.mobileCourseCard}>
                      <div className={styles.mobileCourseContent}>
                        <FiBook className={styles.mobileCourseIcon} />
                        <div className={styles.mobileCourseInfo}>
                          <h4 className={styles.mobileCourseTitle}>
                            {courseName}
                          </h4>
                          <div className={styles.mobileCourseMeta}>
                            <FiMapPin className={styles.mobileMetaIcon} />
                            <span>{location}</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.mobileProfessor}>
                        <FiUser className={styles.mobileProfessorIcon} />
                        <span>Prof. Fathi</span>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.mobileNoClass}>
                      <FiSlash className={styles.mobileSlashIcon} />
                      <span>No Class</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

MobileTimetable.propTypes = {
  timetableData: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string.isRequired,
      days: PropTypes.object.isRequired,
    })
  ).isRequired,
  daysOfWeek: PropTypes.arrayOf(PropTypes.string),
};

export default MobileTimetable;
