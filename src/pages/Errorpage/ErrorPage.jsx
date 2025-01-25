import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

const particles = Array(20).fill(null);

const ErrorPage = () => {
  return (
    <div className={styles.container}>
      {/* Animated Particles */}
      {particles.map((_, index) => (
        <motion.div
          key={index}
          className={styles.particle}
          initial={{
            scale: 0,
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            width: `${Math.random() * 6 + 4}px`,
            height: `${Math.random() * 6 + 4}px`,
          }}
        />
      ))}

      <motion.div
        className={styles.errorCode}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        404
      </motion.div>

      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Page Not Found
      </motion.h1>

      <motion.p
        className={styles.description}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        The page you are looking for might have been removed, had its name
        changed,
        <br />
        or is temporarily unavailable.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9 }}
      >
        <Link to="/" className={styles.homeButton}>
          <svg className={styles.icon} viewBox="0 0 24 24">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Return to Homepage
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
