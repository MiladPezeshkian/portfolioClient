import { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import PropTypes from "prop-types";
import Spinner from "./spinnerOnlyComponents/Spinner"; // فرض بر این است که Spinner موجود است

const RecaptchaComponent = ({ onVerified }) => {
  const [captchaToken, setCaptchaToken] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const [siteKey, setSiteKey] = useState(null);
  const [loading, setLoading] = useState(true); // حالت بارگذاری برای درخواست‌های API
  const [error, setError] = useState(null); // مدیریت خطاها

  // دریافت API Key و Site Key از سرور
  const fetchApiKeys = async () => {
    try {
      setLoading(true); // آغاز بارگذاری
      const response = await fetch(
        "https://server-shop-p7jv.onrender.com/api/v1/apikey"
      ); // درخواست به سرور شما
      const data = await response.json();
      // console.log(response);
      if (response.ok) {
        setApiKey(data.data.apikey); // دریافت و تنظیم API Key
        setSiteKey(data.data.sitekey); // دریافت و تنظیم Site Key
      } else {
        throw new Error("Failed to fetch API Key and Site Key");
      }
    } catch (err) {
      setError(err.message); // مدیریت خطا
    } finally {
      setLoading(false); // پایان بارگذاری
    }
  };

  useEffect(() => {
    fetchApiKeys(); // دریافت API Key و Site Key در ابتدای لود کامپوننت
  }, []);

  // زمانی که کاربر Captcha را تایید می‌کند، این تابع فراخوانی می‌شود
  const handleCaptchaChange = (token) => {
    if (token) {
      setCaptchaToken(token); // ذخیره توکن Captcha
      fetchData(token); // ارسال درخواست به سرور
    } else {
      console.log("Captcha verification failed.");
      setCaptchaToken(null); // در صورت عدم موفقیت، استیت خالی می‌شود
    }
  };

  // ارسال درخواست به سرور برای ارزیابی reCAPTCHA
  const fetchData = async (token) => {
    if (!apiKey || !siteKey) {
      console.error("API Key یا Site Key دریافت نشده است.");
      return;
    }
    // console.log(apiKey);
    const requestUrl = `https://recaptchaenterprise.googleapis.com/v1/projects/my-project-31334-1728335075357/assessments?key=${apiKey}`;
    try {
      const response = await fetch(requestUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: {
            token: token || captchaToken, // استفاده از توکن Captcha
            expectedAction: "USER_ACTION", // اکشن مورد انتظار
            siteKey: siteKey, // استفاده از Site Key دریافت شده
          },
        }),
      });
      if (response.ok) {
        const data = await response.json();

        // بررسی امتیاز و موفقیت در ارزیابی Captcha
        if (data.riskAnalysis.score > 0.5) {
          onVerified(true);
        } else {
          // console.log("Captcha verification failed with low score.");
          onVerified(false);
        }
      } else {
        throw new Error(`Error ${response.status}: Failed to verify captcha.`);
      }
    } catch (error) {
      // console.log("Error response:", error.response);
      setError("Error verifying captcha: " + error.message);

      setError("Error verifying captcha: " + error.message);
    }
  };

  return (
    <div className="recaptcha-component">
      {loading && <Spinner />} {/* نمایش Spinner هنگام بارگذاری */}
      {error && <p className="text-red-500">{error}</p>} {/* نمایش پیام خطا */}
      {!loading && siteKey && (
        <ReCAPTCHA
          sitekey={siteKey} // استفاده از Site Key دریافت‌شده
          onChange={handleCaptchaChange} // مدیریت تغییرات Captcha
        />
      )}
      {!loading && !siteKey && (
        <p className="text-red-500">Site Key not available.</p>
      )}
    </div>
  );
};

// مشخص کردن prop types برای اطمینان از استفاده صحیح
RecaptchaComponent.propTypes = {
  onVerified: PropTypes.func.isRequired, // onVerified باید یک تابع باشد و باید تعریف شود
};

export default RecaptchaComponent;
