// AdminDashboard.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, Outlet, matchPath } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiBook,
  FiArchive,
  FiMessageSquare,
  FiFileText,
  FiActivity,
  FiMenu,
  FiX,
} from "react-icons/fi";
import styles from "./Admin.module.css";

/**
 * کامپوننت سایدبار ادمین
 */
const AdminSidebar = ({
  isCollapsed,
  onToggleSidebar,
  isMobileView,
  isMobileMenuOpen,
  onToggleMobileMenu,
}) => {
  const location = useLocation();

  const sections = [
    {
      path: "home-control",
      label: "Dashboard",
      icon: <FiHome className={styles.navIcon} />,
    },
    {
      path: "announcements-control",
      label: "Announcements",
      icon: <FiActivity className={styles.navIcon} />,
    },
    {
      path: "current-semester",
      label: "Current Semester",
      icon: <FiBook className={styles.navIcon} />,
    },
    {
      path: "previous-semesters",
      label: "Previous Semesters",
      icon: <FiArchive className={styles.navIcon} />,
    },
    {
      path: "articles",
      label: "Articles",
      icon: <FiFileText className={styles.navIcon} />,
    },

    {
      path: "messages",
      label: "Messages",
      icon: <FiMessageSquare className={styles.navIcon} />,
    },
  ];

  const isActiveRoute = (path) =>
    matchPath({ path: `/admin-dashboard/${path}` }, location.pathname);

  return (
    <div
      className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""} ${
        isMobileView && isMobileMenuOpen ? styles.mobileActive : ""
      }`}
    >
      <div className={styles.sidebarHeader}>
        {!isCollapsed && (
          <div className={styles.logoContainer}>
            <span className={styles.logo}>Admin Portal</span>
          </div>
        )}
        {/* دکمه تغییر وضعیت سایدبار در دسکتاپ */}
        {!isMobileView && (
          <button
            className={styles.toggleButton}
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </button>
        )}
      </div>
      <nav className={styles.navMenu}>
        {sections.map((section) => (
          <Link
            key={section.path}
            to={`/admin-dashboard/${section.path}`}
            className={`${styles.navItem} ${
              isActiveRoute(section.path) ? styles.active : ""
            }`}
            aria-current={isActiveRoute(section.path) ? "page" : undefined}
            onClick={isMobileView ? onToggleMobileMenu : undefined}
          >
            {section.icon}
            {!isCollapsed && (
              <span className={styles.navLabel}>{section.label}</span>
            )}
            <div className={styles.activeIndicator} />
          </Link>
        ))}
      </nav>
    </div>
  );
};

AdminSidebar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  onToggleSidebar: PropTypes.func.isRequired,
  isMobileView: PropTypes.bool.isRequired,
  isMobileMenuOpen: PropTypes.bool.isRequired,
  onToggleMobileMenu: PropTypes.func.isRequired,
};

/**
 * کامپوننت اصلی داشبورد ادمین
 */
const AdminDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // مدیریت تغییر اندازه صفحه
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobileView(mobile);
      if (!mobile) {
        setIsMobileMenuOpen(false);
        setIsCollapsed(false); // در دسکتاپ حالت تاشو به حالت باز برگردد
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // توابع تغییر وضعیت سایدبار و منوی موبایل
  const toggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <div className={styles.adminContainer}>
      {/* دکمه همبرگر در حالت موبایل */}
      {isMobileView && (
        <button
          className={styles.mobileMenuTrigger}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}

      <AdminSidebar
        isCollapsed={isCollapsed}
        onToggleSidebar={toggleSidebar}
        isMobileView={isMobileView}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={toggleMobileMenu}
      />

      {/* Overlay در حالت موبایل برای بستن منو */}
      {isMobileView && isMobileMenuOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={toggleMobileMenu}
          role="button"
          aria-label="Close mobile menu"
        />
      )}

      <main className={styles.contentArea}>
        <div className={styles.contentWrapper}>
          {/* محتوای روت‌های تو در تو (Nested Routes) */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
