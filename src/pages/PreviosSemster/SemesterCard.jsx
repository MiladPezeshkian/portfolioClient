// SemesterCard.jsx
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./PreviousSemester.module.css";

// انیمیشن‌های کارت
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// انیمیشن‌های آیتم‌های لیست
const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1 },
  }),
};

const SemesterCard = ({ semester, isActive, onClick }) => {
  return (
    <motion.div
      key={semester.id}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      className={`${styles.card} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    >
      <div className={styles.cardContent}>
        <div className={styles.yearBadge}>
          <span className={styles.year}>{semester.year}</span>
          <span className={styles.season}>{semester.season}</span>
        </div>

        <div className={styles.stats}>
          <div className={styles.students}>
            <span className={styles.number}>{semester.students}</span>
            <span className={styles.label}>Students</span>
          </div>

          <div className={styles.coursesCount}>
            <span className={styles.number}>{semester.courses.length}</span>
            <span className={styles.label}>Courses</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.coursesList}
          >
            <ul>
              {semester.courses.map((course, index) => (
                <motion.li
                  key={`${course}-${index}`}
                  variants={listItemVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                >
                  {course}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// SemesterCard.jsx (اصلاح propTypes)
SemesterCard.propTypes = {
  semester: PropTypes.shape({
    id: PropTypes.number, // اجباری نیست
    year: PropTypes.number.isRequired,
    season: PropTypes.string.isRequired,
    students: PropTypes.number.isRequired,
    courses: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SemesterCard;
