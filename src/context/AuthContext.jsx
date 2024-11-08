import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false); // پیش‌فرض لاگین نیست
  const [error, setError] = useState(null); // وضعیت برای ذخیره خطا

  // فقط وقتی کاربر لاگین کرده وضعیت لاگین رو چک کن
  useEffect(() => {
    // اگر لاگین نکرده بود، درخواست ارسال نکن

    const checkLoginStatus = async () => {
      try {
        const response = await fetch(
          "https://introduction-of-ai-server.onrender.com/api/v1/auth/islogin",
          {
            method: "GET", // نوع درخواست
            credentials: "include", // برای ارسال کوکی‌ها (اگر نیاز دارید)
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json(); // تبدیل پاسخ به JSON
        if (data.isAuthenticated) {
          setIsLogin(true); // کاربر لاگین است
        } else {
          setIsLogin(false); // کاربر لاگین نیست
          setError(null); // خطا را پاک کن
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLogin(false); // فرض کنیم کاربر لاگین نیست
        setError("Unable to check login status"); // خطا را ثبت کن
      }
    };

    checkLoginStatus(); // در صورتی که کاربر لاگین کرده، درخواست چک کردن ارسال بشه
  }, [isLogin]);

  // تابع ورود
  const login = () => {
    setIsLogin(true); // وقتی کاربر لاگین می‌کنه، وضعیت رو به لاگین تغییر بده
    setError(null); // خطا رو پاک کن
  };

  // تابع خروج
  const logout = () => {
    setIsLogin(false);
    navigate("/login");
  };

  // چک کردن وضعیت خطا برای ریدایرکت
  useEffect(() => {
    if (!isLogin && error) {
      navigate("/login");
    }
  }, [isLogin, error, navigate]);

  return (
    <AuthContext.Provider value={{ isLogin, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
