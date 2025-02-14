// PreviousSemester.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SemesterCard from "./SemesterCard";
import styles from "./PreviousSemester.module.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const API_URL = "https://drfathiserver.onrender.com/api/v1/prevSemester";

const PreviousSemester = () => {
  const [loading, setLoading] = useState(true);
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchSemesters = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL, {
          signal: abortController.signal,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("prev", data);
        // بررسی ساختار داده دریافتی و استخراج آرایه‌ی ترم‌ها
        let semestersArray = [];
        if (Array.isArray(data)) {
          semestersArray = data;
        } else if (Array.isArray(data.semesters)) {
          semestersArray = data.semesters;
        } else if (Array.isArray(data.data)) {
          semestersArray = data.data;
        } else {
          semestersArray = [];
        }
        setSemesters(semestersArray);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch semesters:", err);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSemesters();

    // لغو درخواست در صورت انصراف (Unmount) کامپوننت
    return () => {
      abortController.abort();
    };
  }, []);

  // حالت بارگذاری (Loading)
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={styles.mainTitle}
        >
          Academic Archive
          <span className={styles.subTitle}>Past Semesters Records</span>
        </motion.h2>
        <div>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // حالت خطا (Error)
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={styles.mainTitle}
        >
          Academic Archive
          <span className={styles.subTitle}>Past Semesters Records</span>
        </motion.h2>
        <div className={styles.errorMessage}>
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  // حالت نمایش داده‌های دریافت شده (Success)
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
          {semesters.map((semester, index) => (
            <SemesterCard
              key={index} // استفاده از index به عنوان کلید
              semester={semester}
              isActive={selectedSemester?.id === semester.id}
              onClick={() =>
                setSelectedSemester(
                  selectedSemester?.id === semester.id ? null : semester
                )
              }
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PreviousSemester;
