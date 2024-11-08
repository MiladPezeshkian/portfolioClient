import { useContext } from "react";
import UserInfoContext from "../context/UserInfoContext";

export const useUserInfo = () => {
  return useContext(UserInfoContext);
};
