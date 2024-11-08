import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import useAuth from "../hook/useAuth";

const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { isLogin } = useAuth();
  useEffect(() => {
    if (!isLogin) return;
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://introduction-of-ai-server.onrender.com/api/v1/auth/me",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data.data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isEditing, isLogin]);
  return (
    <UserInfoContext.Provider
      value={{ userData, loading, error, setIsEditing }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

UserInfoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserInfoContext;
