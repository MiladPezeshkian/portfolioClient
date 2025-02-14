// src/components/Animations/ParticleBackground.jsx
import { motion } from "framer-motion";

// <<<<<<< Tabnine <<<<<<<
import PropTypes from "prop-types"; //+
const ParticleBackground = ({ particleCount = 50 }) => {
  const particles = Array.from({ length: particleCount });

  return (
    <div className="particle-container">
      {particles.map((_, index) => (
        <motion.div
          key={index}
          className="particle"
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
          }}
          transition={{
            duration: 2 + Math.random() * 4,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            width: "2px",
            height: "2px",
            background: "rgba(100, 255, 218, 0.7)",
            borderRadius: "50%",
          }}
        />
      ))}
    </div>
  );
}; //+
//+
ParticleBackground.propTypes = {
  //+
  particleCount: PropTypes.number, //+
};
// >>>>>>> Tabnine >>>>>>>// {"conversationId":"01810a17-3858-45b2-937c-df218ade680b","source":"instruct"}

export default ParticleBackground;
