// src/components/Animations/FloatingDocument.jsx
import { motion } from "framer-motion";
import PropTypes from "prop-types";
const FloatingDocument = ({ className }) => (
  <motion.div
    className={className}
    animate={{
      y: [-10, 10, -10],
      rotateZ: [-2, 2, -2],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <svg
      width="120"
      height="150"
      viewBox="0 0 120 150"
      fill="none"
      stroke="#64ffda"
      strokeWidth="2"
    >
      <path d="M20 5H100V145H20V5Z" strokeLinecap="round" />
      <path d="M30 15H90M30 25H90M30 35H70" />
      <path d="M40 60H80V80H40zM40 100H80V120H40z" strokeLinejoin="round" />
    </svg>
  </motion.div>
);
FloatingDocument.propTypes = {
  className: PropTypes.string,
};
export default FloatingDocument;
