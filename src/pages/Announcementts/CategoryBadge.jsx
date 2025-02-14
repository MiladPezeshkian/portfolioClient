import PropTypes from "prop-types";
import {
  FiBookOpen,
  FiCalendar,
  FiAlertTriangle,
  FiSearch,
  FiVolume2,
  FiCpu,
} from "react-icons/fi";
import styles from "./Announcements.module.css";

// نگاشت آیکون‌ها براساس مقدار رشته‌ای موجود در فیلد icon مدل
const iconMapping = {
  book: <FiBookOpen size={20} />,
  calendar: <FiCalendar size={20} />,
  alert: <FiAlertTriangle size={20} />,
  research: <FiSearch size={20} />,
  megaphone: <FiVolume2 size={20} />,
  system: <FiCpu size={20} />,
};

// نگاشت رنگ‌ها بر اساس نام دسته‌بندی (در صورت عدم ارائه‌ی colorCode در مدل)
const categoryColorMapping = {
  "University News": "#1565C0",
  "Course Schedule": "#FF9800",
  "Exam Timetable": "#D32F2F",
  "Research Announcement": "#00796B",
  "Job Opportunity": "#2E7D32",
  " Workshop": "#F9A825",
  "Study Materials": "#6A1B9A",
  "Syllabus Changes": "#455A64",
};

const CategoryBadge = ({ category }) => {
  // اگر category از نوع رشته است، آن را به شیء تبدیل می‌کنیم
  const cat =
    typeof category === "string"
      ? {
          name: category,
          icon: "system",
          colorCode: categoryColorMapping[category] || "#558076",
        }
      : category;

  const badgeColor =
    cat.colorCode || categoryColorMapping[cat.name] || "#558076";
  const IconComponent = iconMapping[cat.icon] || iconMapping["system"];

  return (
    <div
      className={styles.categoryBadge}
      style={{ backgroundColor: badgeColor }}
      data-aos="fade-left"
      data-aos-delay="300"
    >
      {IconComponent}
      <span className={styles.badgeText}>{cat.name}</span>
    </div>
  );
};

CategoryBadge.propTypes = {
  category: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      name: PropTypes.oneOf([
        "University News",
        "Academic Programs",
        "Educational Workshops",
        "Research Opportunities",
        "Academic Events",
        "Urgent Announcements",
        "System Updates",
      ]).isRequired,
      colorCode: PropTypes.string,
      icon: PropTypes.oneOf([
        "book",
        "calendar",
        "alert",
        "research",
        "megaphone",
        "system",
      ]).isRequired,
      priority: PropTypes.number,
    }),
  ]).isRequired,
};

export default CategoryBadge;
