// Announcements.jsx
import { useState, useEffect, useCallback } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import AnnouncementCard from "./AnnouncementCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import styles from "./Announcements.module.css";

// آدرس API (در صورت نیاز می‌توانید از متغیرهای محیطی استفاده کنید)
const API_URL = "https://drfathiserver.onrender.com/api/v1/announcement";

const Announcements = () => {
  const [data, setData] = useState({
    announcements: [],
    loading: true,
    error: null,
  });
  const [likes, setLikes] = useState({});

  // فعال‌سازی AOS برای انیمیشن‌های اسکرول
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
    });
  }, []);

  // تابع بارگذاری داده از سرور
  const loadData = useCallback(async () => {
    // شروع درخواست: فعال کردن حالت لودینگ
    setData({ announcements: [], loading: true, error: null });
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        credentials: "include", // در صورت نیاز به ارسال کوکی‌ها
      });

      if (!response.ok) {
        // دریافت پیام خطا از سرور در صورت پاسخ ناموفق
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to load announcements.");
      }

      const responseData = await response.json();
      // فرض بر این است که سرور داده‌ها را به صورت { data: { announcements: [...] } } برمی‌گرداند
      const processedData = responseData.data.announcements.map((item) => ({
        ...item,
        // اگر از mongoose استفاده می‌کنید، ممکن است آیتم دارای فیلد _id باشد؛ به همین دلیل آن را به id نگاشت می‌کنیم
        id: item._id || item.id,
        publishedAt: new Date(item.publishedAt),
      }));

      setData({ announcements: processedData, loading: false, error: null });
    } catch (error) {
      setData({
        announcements: [],
        loading: false,
        error: error.message || "Something went wrong.",
      });
    }
  }, []);

  // اجرای تابع loadData هنگام mount شدن کامپوننت
  useEffect(() => {
    loadData();
  }, [loadData]);

  // هندل کردن عملیات لایک کردن یک اعلان (تغییر حالت لایک به صورت محلی)
  const handleLike = (id) => {
    const isLiked = likes[id];
    setLikes((prev) => ({ ...prev, [id]: !isLiked }));

    setData((prev) => ({
      ...prev,
      announcements: prev.announcements.map((item) =>
        item.id === id
          ? {
              ...item,
              stats: {
                ...item.stats,
                likes: item.stats.likes + (isLiked ? -1 : 1),
              },
            }
          : item
      ),
    }));
  };

  // در صورت بروز خطا، نمایش پیام مناسب
  if (data.error) {
    return (
      <div className={styles.errorContainer} data-aos="zoom-in">
        <div className={styles.errorIconWrapper}>
          {/* می‌توانید از یک آیکون مناسب نیز استفاده کنید */}
          <span className={styles.errorIcon}>!</span>
        </div>
        <h3 className={styles.errorTitle}>Connection Error</h3>
        <p className={styles.errorMessage}>{data.error}</p>
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.gradientBackground} />
      <div className={styles.container}>
        <header
          className={styles.header}
          data-aos="fade-down"
          data-aos-easing="ease-out-cubic"
        >
          <h1 className={styles.title}>
            <span className={styles.titleAccent}>System</span> Announcements
            <div className={styles.titleUnderline} />
          </h1>
          <p className={styles.subtitle}>
            Important updates and maintenance notices
          </p>
        </header>

        {data.loading ? (
          // نمایش اسپینر در زمان بارگذاری داده‌ها
          <div className={styles.loadingContainer}>
            <LoadingSpinner />
          </div>
        ) : (
          <div className={styles.grid}>
            {data.announcements.map((announcement, index) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                delay={index * 100}
                isLiked={!!likes[announcement.id]}
                onLike={() => handleLike(announcement.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Announcements;
