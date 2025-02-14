import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(null); // مقدار اولیه `null`
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(
          `https://drfathiserver.onrender.com/api/v1/professors/islogin`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setIsLogin(data.isAuthenticated);
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLogin(false);
        setError("Unable to check login status");
      }
    };

    checkLoginStatus();
  }, []);

  const login = () => {
    setIsLogin(true);
    setError(null);
  };

  const logout = async () => {
    try {
      await fetch(
        `https://drfathiserver.onrender.com/api/v1/professors/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setIsLogin(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (isLogin === false && error) {
      navigate("/login");
    }
  }, [isLogin, error, navigate]);

  if (isLogin === null) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        <LoadingSpinner />
      </div>
    );
  }

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
