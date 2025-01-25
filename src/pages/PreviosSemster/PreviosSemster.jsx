import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./PreviousSemester.module.css";

const previousSemestersData = [
  {
    id: 1,
    year: 2014,
    season: "Fall",
    students: 245,
    courses: [
      "Advanced Algorithm Design",
      "Distributed Systems",
      "Machine Learning Fundamentals",
      "Database Optimization",
      "Cloud Computing Basics",
    ],
  },
  {
    id: 2,
    year: 2015,
    season: "Spring",
    students: 128,
    courses: [
      "Deep Learning Applications",
      "Big Data Analytics",
      "Network Security",
      "IoT Systems Architecture",
      "Advanced Cloud Patterns",
    ],
  },
  // ... سایر ترم‌ها
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1 },
  }),
};

const PreviousSemester = () => {
  const [selectedSemester, setSelectedSemester] = useState(null);

  return (
    <div className={styles.container}>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={styles.mainTitle}
      >
        Academic Archive
        <span className={styles.subTitle}>Past Semesters Records</span>
      </motion.h2>

      <div className={styles.grid}>
        <AnimatePresence>
          {previousSemestersData.map((semester) => (
            <motion.div
              key={semester.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              className={`${styles.card} ${
                selectedSemester?.id === semester.id ? styles.active : ""
              }`}
              onClick={() =>
                setSelectedSemester(
                  selectedSemester?.id === semester.id ? null : semester
                )
              }
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
                    <span className={styles.number}>
                      {semester.courses.length}
                    </span>
                    <span className={styles.label}>Courses</span>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {selectedSemester?.id === semester.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={styles.coursesList}
                  >
                    <ul>
                      {semester.courses.map((course, index) => (
                        <motion.li
                          key={course}
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
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PreviousSemester;
