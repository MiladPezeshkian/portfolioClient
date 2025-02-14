import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Login.module.css";
import FloatingProfessor from "../../components/Animations/FloatingProfessor";
import AuthContext from "../../contexts/AuthContext.jsx";
import Animation from "../../components/Animations/ParticleBackground.jsx";
const Login = () => {
  const { login, error: authError, isLogin } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef();

  useEffect(() => {
    if (isLogin) {
      navigate("/admin-dashboard");
    }
  }, [isLogin, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch(
        `https://drfathiserver.onrender.com/api/v1/professors/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      console.log(response.json);

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Login failed");
      }

      login();
      navigate("/admin-dashboard");
    } catch (err) {
      setErrors({
        server: err.message || "Server error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={containerRef}
    >
      <div className={styles.background}>
        <Animation />

        <div className={styles.gradient} />
        <div className={styles.particles}>
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className={styles.particle}
              style={{
                animationDelay: `${i * 0.2}s`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        className={styles.card}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <div className={styles.header}>
          <FloatingProfessor className={styles.professorAnimation} />
          <h1 className={styles.title}>
            <span className={styles.titleMain}>Admin Portal</span>
            <span className={styles.titleSub}>System Control Center</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <AnimatePresence>
            {(errors.server || authError) && (
              <motion.div
                className={styles.serverError}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {errors.server || authError}
              </motion.div>
            )}
          </AnimatePresence>

          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email"
              className={`${styles.input} ${errors.email ? styles.error : ""}`}
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            {errors.email && (
              <div className={styles.errorMessage}>{errors.email}</div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              className={`${styles.input} ${
                errors.password ? styles.error : ""
              }`}
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            {errors.password && (
              <div className={styles.errorMessage}>{errors.password}</div>
            )}
          </div>

          <motion.button
            type="submit"
            className={styles.submitButton}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className={styles.spinner} />
            ) : (
              <>
                <span>Login</span>
                <div className={styles.buttonGlow} />
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Login;
