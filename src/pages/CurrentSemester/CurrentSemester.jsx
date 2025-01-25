import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./CurrentSemester.module.css";
import { FiClock, FiBook, FiMapPin, FiUser, FiSlash } from "react-icons/fi";

const timetableData = [
  {
    time: "8:00 - 10:00",
    days: {
      Sat: { course: "Research Seminar", location: "Conference Hall" },
      Sun: null,
      Mon: { course: "Advanced AI", location: "Room 301" },
      Tue: { course: "Neural Networks", location: "Lab B2" },
      Wed: { course: "Data Mining", location: "Lab A1" },
      Thu: { course: "Cloud Computing", location: "Room 415" },
      Fri: null,
    },
  },
  {
    time: "10:00 - 12:00",
    days: {
      Sat: { course: "Machine Learning", location: "Lab C3" },
      Sun: null,
      Mon: { course: "Deep Learning", location: "Room 302" },
      Tue: { course: "Computer Vision", location: "Lab D4" },
      Wed: null,
      Thu: { course: "Big Data Analytics", location: "Data Lab" },
      Fri: null,
    },
  },
  {
    time: "12:00 - 14:00",
    days: {
      Sat: null,
      Sun: { course: "Lunch Break", location: "Cafeteria" },
      Mon: { course: "Natural Language Processing", location: "NLP Lab" },
      Tue: null,
      Wed: { course: "Reinforcement Learning", location: "AI Lab" },
      Thu: null,
      Fri: { course: "Project Workshop", location: "Innovation Hub" },
    },
  },
  {
    time: "14:00 - 16:00",
    days: {
      Sat: null,
      Sun: { course: "Ethics in AI", location: "Room 201" },
      Mon: null,
      Tue: { course: "Robotics", location: "Robotics Lab" },
      Wed: { course: "IoT Systems", location: "IoT Lab" },
      Thu: { course: "Edge Computing", location: "Lab E5" },
      Fri: null,
    },
  },
  {
    time: "16:00 - 18:00",
    days: {
      Sat: null,
      Sun: null,
      Mon: { course: "Advanced Algorithms", location: "Room 303" },
      Tue: { course: "Cyber Security", location: "SecLab" },
      Wed: { course: "Blockchain", location: "Crypto Lab" },
      Thu: null,
      Fri: { course: "Team Projects", location: "Collaboration Zone" },
    },
  },
  {
    time: "18:00 - 20:00",
    days: {
      Sat: { course: "Guest Lecture", location: "Auditorium" },
      Sun: null,
      Mon: null,
      Tue: { course: "Special Topics", location: "Room 202" },
      Wed: null,
      Thu: { course: "Thesis Guidance", location: "Research Center" },
      Fri: null,
    },
  },
];

const CurrentSemester = () => {
  const getCurrentSemester = () => {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // چون ماه‌ها از صفر شروع می‌شوند
    const year = currentDate.getFullYear();

    if (month >= 9 && month <= 12) {
      return `Fall Semester ${year}`;
    } else if (month >= 1 && month <= 5) {
      return `Spring Semester ${year}`;
    } else {
      return `Summer Semester ${year}`;
    }
  };

  const [isMobile, setIsMobile] = useState(false);
  const daysOfWeek = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    if (!isMobile) {
      AOS.init({
        duration: 800,
        once: true,
        easing: "ease-out-cubic",
      });
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const renderDesktopView = () => (
    <table className={styles.timetable}>
      <thead>
        <tr>
          <th className={styles.timeColumn}>
            <div className={styles.columnHeader}>
              <FiClock className={styles.columnIcon} />
              <span>Time Slot</span>
            </div>
          </th>
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
        {timetableData.map((row, rowIndex) => (
          <tr
            key={row.time}
            data-aos={!isMobile ? "fade-up" : undefined}
            data-aos-delay={rowIndex * 30}
            className={styles.tableRow}
          >
            <td className={styles.timeCell}>
              <div className={styles.timeWrapper}>
                <FiClock className={styles.timeIcon} />
                <span className={styles.timeText}>{row.time}</span>
              </div>
            </td>

            {daysOfWeek.map((day) => (
              <td
                key={day}
                className={`${styles.courseCell} ${
                  ["Fri", "Sat"].includes(day) ? styles.weekend : ""
                }`}
              >
                <div className={styles.cellContent}>
                  {row.days[day] ? (
                    <div className={styles.courseCard}>
                      <div className={styles.courseHeader}>
                        <FiBook className={styles.courseIcon} />
                        <div className={styles.courseInfo}>
                          <h3 className={styles.courseTitle}>
                            {row.days[day].course}
                          </h3>
                          <div className={styles.courseMeta}>
                            <span className={styles.courseLocation}>
                              <FiMapPin className={styles.metaIcon} />
                              {row.days[day].location}
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
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderMobileView = () => (
    <div className={styles.mobileContainer}>
      {timetableData.map((row, index) => (
        <div key={index} className={styles.mobileTimeCard}>
          <div className={styles.mobileTimeHeader}>
            <FiClock className={styles.mobileTimeIcon} />
            <span>{row.time}</span>
          </div>

          {daysOfWeek.map((day) => (
            <div key={day} className={styles.mobileDayCard}>
              <div className={styles.mobileDayHeader}>
                <span className={styles.mobileDayLabel}>{day}</span>
                <span className={styles.mobileDayStatus}>
                  {["Fri", "Sat"].includes(day) ? "Weekend" : "Academic Day"}
                </span>
              </div>

              {row.days[day] ? (
                <div className={styles.mobileCourseCard}>
                  <div className={styles.mobileCourseContent}>
                    <FiBook className={styles.mobileCourseIcon} />
                    <div className={styles.mobileCourseInfo}>
                      <h4 className={styles.mobileCourseTitle}>
                        {row.days[day].course}
                      </h4>
                      <div className={styles.mobileCourseMeta}>
                        <FiMapPin className={styles.mobileMetaIcon} />
                        <span>{row.days[day].location}</span>
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
          ))}
        </div>
      ))}
    </div>
  );

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
                {`${getCurrentSemester()} • Dr. Parastoo Fathi`}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div
        className={styles.tableContainer}
        data-aos={!isMobile ? "zoom-in" : undefined}
      >
        {isMobile ? renderMobileView() : renderDesktopView()}
      </div>
    </section>
  );
};

export default CurrentSemester;
