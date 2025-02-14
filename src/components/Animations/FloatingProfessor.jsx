// src/components/Animations/FloatingProfessor.jsx
import { motion } from "framer-motion";
import PropTypes from "prop-types";
const FloatingProfessor = ({ className }) => (
  <motion.div
    className={className}
    animate={{
      y: [-10, 10, -10],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#64ffda"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  </motion.div>
);
FloatingProfessor.propTypes = {
  className: PropTypes.string,
};
export default FloatingProfessor;
