import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

// یک Hook برای استفاده از AuthContext
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
