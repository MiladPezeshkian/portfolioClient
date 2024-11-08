import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import NavLink from "../components/NavLink/NavLink";
import Spinner from "../components/spinnerOnlyComponents/Spinner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [timer, setTimer] = useState(120);
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleCodeChange = (e) => {
    if (e.target.value.length <= 5) {
      setInputCode(e.target.value);
    }
  };
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSendCode = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://server-shop-p7jv.onrender.com/api/v1/auth/forgotPassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          errorMessage || "Failed to send the code. Please try again."
        );
      }
      setCodeSent(true);
      setCanResend(false);
      setTimer(120);
      setStep(2);
    } catch (error) {
      console.error("Error:", error.message);
      alert(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (inputCode.length !== 5) {
      alert("Please enter a valid 5-digit code.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://server-shop-p7jv.onrender.com/api/v1/auth/checkCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code: inputCode }),
        }
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Invalid code. Please try again.");
      }
      setStep(3);
    } catch (error) {
      console.error("Error:", error.message);
      alert(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://server-shop-p7jv.onrender.com/api/v1/auth/resetPassword",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            passwordConfirm: confirmPassword,
          }),
        }
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          errorMessage || "Failed to reset password. Please try again."
        );
      }
      alert("Password reset successful. You can now log in.");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error.message);
      alert(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (timer > 0 && codeSent) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [timer, codeSent]);

  return (
    <>
      <NavLink />
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-r from-blue-200 to-blue-500 py-10 px-4 sm:px-6 lg:px-8">
        <div className="relative w-full max-w-lg space-y-10 bg-white p-8 rounded-lg shadow-lg transition transform hover:scale-105">
          {/* لایه overlay برای نمایش اسپینر بدون حذف محتوای اصلی */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
              <Spinner />
            </div>
          )}

          {/* مرحله 1: وارد کردن ایمیل */}
          {step === 1 && (
            <div>
              <h2 className="text-center text-5xl font-extrabold text-gray-900">
                Forgot Password
              </h2>
              <p className="mt-4 text-center text-lg text-gray-700">
                Enter your email address and we&apos;ll send you a code to reset
                your password.
              </p>

              <div className="mt-6">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 transition"
                />
                <button
                  onClick={handleSendCode}
                  className="mt-6 w-full py-3 text-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-md hover:from-green-500 hover:to-blue-500 focus:outline-none focus:ring-4 focus:ring-green-400 transition"
                  disabled={isLoading}
                >
                  Send Code
                </button>
              </div>
            </div>
          )}

          {/* مرحله 2: تایید کد */}
          {step === 2 && (
            <div>
              <h2 className="text-center text-5xl font-extrabold text-gray-900">
                Verify Code
              </h2>
              <p className="mt-4 text-center text-lg text-gray-700">
                Enter the 5-digit verification code sent to your email.
              </p>
              <div className="mt-6">
                <input
                  type="text"
                  placeholder="Enter code"
                  value={inputCode}
                  onChange={handleCodeChange}
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 transition"
                />
                <button
                  onClick={handleVerifyCode}
                  className="mt-6 w-full py-3 text-xl font-semibold text-white bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-md hover:from-blue-500 hover:to-green-500 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
                >
                  Verify Code
                </button>
                <div className="mt-4 text-center">
                  {timer > 0 ? (
                    <p className="text-lg font-semibold text-gray-600">
                      Resend code in: {Math.floor(timer / 60)}:
                      {timer % 60 < 10 ? "0" : ""}
                      {timer % 60}
                    </p>
                  ) : (
                    <button
                      onClick={handleSendCode}
                      className="text-lg font-semibold text-blue-500 hover:underline"
                      disabled={!canResend}
                    >
                      Resend Code
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* مرحله 3: ریست پسورد */}
          {step === 3 && (
            <div>
              <h2 className="text-center text-5xl font-extrabold text-gray-900">
                Reset Password
              </h2>
              <p className="mt-4 text-center text-lg text-gray-700">
                Enter your new password below.
              </p>

              <div className="mt-6">
                <input
                  type="password"
                  placeholder="New password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 transition"
                />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="w-full mt-4 px-5 py-4 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 transition"
                />
                <button
                  onClick={handleResetPassword}
                  className="mt-6 w-full py-3 text-xl font-semibold text-white bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-md hover:from-blue-500 hover:to-green-500 focus:outline-none focus:ring-4 focus:ring-green-400 transition"
                >
                  Reset Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
