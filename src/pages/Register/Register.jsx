import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavLink from "../../components/NavLink/NavLink";
import Footer from "../../components/Footer/Footer";
import Spinner from "../../components/Spinner/Spinner"; // کامپوننت اسپینر
import RecaptchaComponent from "../../components/RecaptchaComponent";
const imgPath = "../../imgs/side2.webp"; // Adjust path if necessary

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false); // برای نمایش اسپینر
  const [error, setError] = useState(""); // برای نمایش ارور‌ها
  const [verify, setVerify] = useState(false); // وضعیت reCAPTCHA
  const navigate = useNavigate(); // برای ریدایرکت
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setLoading(false);
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "https://aiwebpage-server.onrender.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        navigate("/login"); // موفقیت‌آمیز، ریدایرکت به صفحه لاگین
      } else {
        setError(result.message || "An error occurred");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // اسپینر را متوقف کنید
    }
  };

  // تابع برای مدیریت وضعیت تایید reCAPTCHA

  return (
    <>
      <NavLink />
      <div className="flex flex-col md:flex-row min-h-screen relative">
        {/* نمایش اسپینر هنگام لودینگ */}
        {loading && <Spinner />}

        {/* Image Section */}
        <div className="md:w-1/2 bg-[#CCE5E9] flex justify-center items-center">
          <img
            src={imgPath}
            alt="Phone with shopping cart"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 flex justify-center items-center p-6 md:p-12 bg-white">
          <div className="w-full max-w-lg">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Create an account
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-600">
              Enter your details below
            </p>

            {/* نمایش ارور */}
            {error && (
              <div className="text-red-500 mb-4 text-sm sm:text-base md:text-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  className="block text-sm sm:text-base md:text-lg font-medium text-gray-700 mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base md:text-lg"
                  placeholder="Name"
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-sm sm:text-base md:text-lg font-medium text-gray-700 mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base md:text-lg"
                  placeholder="Email"
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-sm sm:text-base md:text-lg font-medium text-gray-700 mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base md:text-lg"
                  placeholder="Password"
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-sm sm:text-base md:text-lg font-medium text-gray-700 mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base md:text-lg"
                  placeholder="Confirm Password"
                />
              </div>

              {/* کامپوننت reCAPTCHA */}
              <RecaptchaComponent onVerified={setVerify} />

              <button
                type="submit"
                className={`w-full py-3 px-5 rounded-lg mt-6 transition text-base sm:text-lg md:text-xl ${
                  verify
                    ? "bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
                disabled={!verify || loading} // دکمه فقط وقتی فعال است که reCAPTCHA تایید شده باشد
              >
                {loading ? <Spinner /> : "Create Account"}
              </button>
            </form>

            <p className="mt-8 text-sm sm:text-base text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
