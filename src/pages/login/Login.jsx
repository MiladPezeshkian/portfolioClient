import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavLink from "../../components/NavLink/NavLink";
import Footer from "../../components/Footer/Footer";
import Spinner from "../../components/Spinner/Spinner";
import useAuth from "../../hook/useAuth"; // تغییر درست اینجا

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth(); // اینجا setUser را حذف کنید زیرا تابع login خودش کار را انجام می‌دهد
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://introduction-of-ai-server.onrender.com/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Login failed");
      }

      // ذخیره JWT در کوکی و به‌روزرسانی یوزر
      login();

      // هدایت به صفحه اصلی پس از لاگین موفق
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavLink />
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="md:w-1/2 flex items-center justify-center bg-blue-50 md:bg-transparent">
          <img
            src="../../imgs/side.webp"
            alt="Side"
            className="md:w-full w-3/4 object-cover md:object-contain"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center items-center p-6 md:p-16 bg-white">
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <h1
              className="md:text-4xl font-extrabold text-2xl bg-white bg-gradient-to-r from-slate-600 via-black to-blue-600 bg-clip-text text-transparent 
            hover:shadow-slate-400/50"
              style={{
                backgroundImage:
                  "linear-gradient(to right, slate 25%, white 40%, blue 55%, black 100%)",
              }}
            >
              Log in to LoneWalker.ai
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-center text-gray-700 mb-6"></p>
            {error && (
              <div className="text-red-500 mb-4 text-sm sm:text-base md:text-lg">
                {error}
              </div>
            )}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-lg sm:text-xl md:text-2xl font-medium mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 text-base sm:text-lg md:text-xl"
                type="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-lg sm:text-xl md:text-2xl font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 text-base sm:text-lg md:text-xl"
                type="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex justify-between items-center mb-6">
              <button
                type="submit"
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none text-base sm:text-lg md:text-xl"
                disabled={loading}
              >
                {loading ? <Spinner /> : "Log In"}
              </button>
              <Link
                to="/forgotPassword"
                className="text-red-500 hover:underline text-base sm:text-lg md:text-xl"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="text-center">
              <Link
                to="/signup"
                className="text-blue-500 hover:underline text-base sm:text-lg md:text-xl"
              >
                Create New Account
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
