import { useState, useEffect } from "react";
import Logo from "../Navbar/Logo.jsx";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import styles from "./style.module.css";
import useAuth from "../../hooks/useAuth.jsx";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLogin, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://drfathiserver.onrender.com/api/v1/professors/logout`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Logout failed");
      logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      {/* نمایش لودینگ اسپینر به صورت overlay زمانی که در حال بارگذاری هستیم */}
      {loading && (
        <div className={styles.loadingOverlay}>
          <LoadingSpinner />
        </div>
      )}
      <div className={styles.container}>
        <Logo />
        <NavLinks isLogin={isLogin} handleLogout={handleLogout} />
        <MobileMenu
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          isLogin={isLogin}
          handleLogout={handleLogout}
        />
      </div>
    </nav>
  );
};

export default Navbar;
