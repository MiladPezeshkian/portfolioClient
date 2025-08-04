import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import DesktopTimetable from "./DesktopTimetable";
import MobileTimetable from "./MobileTimetable";
import styles from "./CurrentSemester.module.css";
import { FiClock } from "react-icons/fi";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const getCurrentSemester = () => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  if (month >= 9 && month <= 12) return `Fall Semester ${year}`;
  if (month >= 1 && month <= 5) return `Spring Semester ${year}`;
  return `Summer Semester ${year}`;
};

const CurrentSemester = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [timetableData, setTimetableData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    if (!isMobile) {
      AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://drfathiserver.onrender.com/api/v1/schedules/getall"
        );
        if (!response.ok) throw new Error("Failed to fetch timetable");
        const data = await response.json();
        console.log(data);
        if (
          data.status === "success" &&
          Array.isArray(data.data.schedules) &&
          data.data.schedules.length > 0
        ) {
          setTimetableData(
            Array.isArray(data.data.schedules[0].timetable)
              ? data.data.schedules[0].timetable
              : []
          );
        } else {
          setTimetableData([]);
        }
      } catch (err) {
        setError(err.message);
        setTimetableData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTimetable();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.headerContainer}>
        <div
          className={styles.header}
          data-aos={!isMobile ? "fade-down" : undefined}
        >
          <div className={styles.titleWrapper}>
            <FiClock className={styles.titleIcon} />
            <div className={styles.titleGroup}>
              <h1 className={styles.mainTitle}>Academic Schedule</h1>
              <h2 className={styles.subTitle}>
                {`${getCurrentSemester()} • Dr. milad pezeeshkian`}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div
        className={styles.tableContainer}
        data-aos={!isMobile ? "zoom-in" : undefined}
      >
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <p className={styles.error}>Error: {error}</p>
        ) : timetableData && timetableData.length > 0 ? (
          isMobile ? (
            <MobileTimetable timetableData={timetableData} />
          ) : (
            <DesktopTimetable timetableData={timetableData} />
          )
        ) : (
          <p>No timetable available</p>
        )}
      </div>
    </section>
  );
};

export default CurrentSemester;
