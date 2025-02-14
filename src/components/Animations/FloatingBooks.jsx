// src/components/Animations/FloatingBooks.jsx
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const FloatingBooks = ({ className }) => {
  const books = [
    { x: "10%", y: "15%", size: 40 },
    { x: "80%", y: "20%", size: 35 },
    { x: "15%", y: "65%", size: 45 },
    { x: "50%", y: "40%", size: 50 },
  ];

  return (
    <div
      className={className}
      style={{
        pointerEvents: "none",
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      {books.map((book, index) => (
        <motion.div
          key={index}
          initial={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 0.85 }}
          animate={{
            // ترکیب حرکت عمودی، افقی، چرخش، تغییر اندازه و شفافیت
            y: [0, -50, 0],
            x: [0, 20, 0],
            rotate: [-10, 10, -10],
            scale: [1, 1.1, 1],
            opacity: [0.85, 1, 0.85],
          }}
          transition={{
            duration: 8 + index * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.4,
          }}
          style={{
            position: "absolute",
            left: book.x,
            top: book.y,
            width: `${book.size}px`,
            filter: "drop-shadow(0 0 12px rgba(100, 255, 218, 0.7))",
          }}
        >
          <svg
            viewBox="0 0 40 50"
            fill="url(#gradient)"
            stroke="url(#gradient)"
            strokeWidth="1.5"
          >
            <defs>
              {/* تعریف یک گرادیان برای ظاهر مدرن تر */}
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#64ffda" />
                <stop offset="100%" stopColor="#00d1b2" />
              </linearGradient>
            </defs>
            {/* استفاده از یک مستطیل با گوشه‌های گرد به جای path برای ظاهر بهتر */}
            <rect x="5" y="5" width="30" height="40" rx="3" ry="3" />
            {/* خطوط عمودی داخل کتاب */}
            <line x1="10" y1="5" x2="10" y2="45" />
            <line x1="15" y1="5" x2="15" y2="45" />
            <line x1="20" y1="5" x2="20" y2="45" />
            <line x1="25" y1="5" x2="25" y2="45" />
            <line x1="30" y1="5" x2="30" y2="45" />
            {/* خطوط افقی با شفافیت ملایم برای تقسیم بندی صفحات */}
            <line x1="5" y1="15" x2="35" y2="15" strokeOpacity="0.6" />
            <line x1="5" y1="25" x2="35" y2="25" strokeOpacity="0.6" />
            <line x1="5" y1="35" x2="35" y2="35" strokeOpacity="0.6" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

FloatingBooks.propTypes = {
  className: PropTypes.string,
};

export default FloatingBooks;
