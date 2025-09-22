import axiosInstance from "@/services/axiosInstance";
import { clearUserProfile } from "./userSlice";
import type { Dispatch } from "redux";
import { LOGOUT_API, USER_ID } from "@/utils/constants";
import { toast } from "react-toastify";
import { handleIsLogin } from "../login/loginSlice";

export const handleLogOutFromBE = (navigate: (path: string) => void) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axiosInstance.post(LOGOUT_API);
      if (response.status === 200) {
        dispatch(clearUserProfile());
        dispatch(handleIsLogin(false));
        localStorage.removeItem(USER_ID);
        toast.success(response?.data?.message || "Logout successful !");
        navigate("/");
      }
    } catch (error) {
      console.error("Error clear user profile:", error);
    }
  };
};
